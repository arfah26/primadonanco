import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function DELETE(request, { params }) {
  try {
    const deletedImage = db.deleteGalleryImage(params.id)

    if (!deletedImage) {
      return NextResponse.json({ success: false, error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 })
  }
}
