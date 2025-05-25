import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET() {
  try {
    const gallery = await db.getGallery() // Added await

    return NextResponse.json({
      success: true,
      data: gallery,
    })
  } catch (error) {
    console.error("API Error fetching gallery:", error) // Added console.error
    return NextResponse.json({ success: false, error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.title || !body.image) {
      return NextResponse.json({ success: false, error: "Title and image are required" }, { status: 400 })
    }

    const newImage = await db.addGalleryImage(body) // Added await

    return NextResponse.json(
      {
        success: true,
        data: newImage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API Error adding gallery image:", error) // Added console.error
    return NextResponse.json({ success: false, error: "Failed to add gallery image" }, { status: 500 })
  }
}
