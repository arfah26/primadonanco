import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET() {
  try {
    const gallery = db.getGallery()

    return NextResponse.json({
      success: true,
      data: gallery,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.title || !body.image) {
      return NextResponse.json({ success: false, error: "Title and image are required" }, { status: 400 })
    }

    const newImage = db.addGalleryImage(body)

    return NextResponse.json(
      {
        success: true,
        data: newImage,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to add gallery image" }, { status: 500 })
  }
}
