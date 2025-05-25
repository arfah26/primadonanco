import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET(request, { params }) {
  try {
    const product = db.getProduct(params.id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const updatedProduct = db.updateProduct(params.id, body)

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedProduct = db.deleteProduct(params.id)

    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
