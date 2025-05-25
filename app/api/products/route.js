import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get("category")

    const filters = {}
    if (category) {
      filters.category = category
    }

    // Await the asynchronous call to getProducts and pass filters
    const products = await db.getProducts(filters)

    return NextResponse.json({
      success: true,
      data: products,
    })
  } catch (error) {
    console.error("API Error fetching products:", error) // Log the actual error server-side
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json({ success: false, error: "Name and description are required" }, { status: 400 })
    }

    const newProduct = db.addProduct(body)

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
