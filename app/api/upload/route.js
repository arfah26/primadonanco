import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises'; // For streaming file writes

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
    }

    // Check file type if needed, e.g., allow only images
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    // Generate a unique filename (timestamp + original name, sanitized)
    const originalFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_'); // Sanitize filename
    const uniqueFilename = `${Date.now()}-${originalFilename}`;
    const filePath = path.join(uploadDir, uniqueFilename);
    const publicPath = `/uploads/${uniqueFilename}`;

    // Stream the file to disk for efficiency with larger files
    // Convert ReadableStream to Node.js Readable stream if necessary, or use arrayBuffer for smaller files
    // For simplicity with Next.js edge/node compatibility, let's use arrayBuffer first
    // and consider streams if large file handling becomes an issue.

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    console.log(`File uploaded successfully: ${publicPath}`);

    return NextResponse.json({ success: true, path: publicPath });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ success: false, error: 'File upload failed.', details: error.message }, { status: 500 });
  }
}