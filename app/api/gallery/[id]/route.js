import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function PUT(request, { params }) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.image) {
      return NextResponse.json({ success: false, error: "Title and image are required" }, { status: 400 })
    }

    const updatedImage = await db.updateGalleryImage(params.id, body)

    if (!updatedImage) {
      return NextResponse.json({ success: false, error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedImage,
      message: "Gallery image updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update gallery image" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const success = await db.deleteGalleryImage(params.id)

    if (!success) {
      return NextResponse.json({ success: false, error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Gallery image deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete gallery image" }, { status: 500 })
  }
}
