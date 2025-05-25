import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let products = await db.getProducts({ category })

    return NextResponse.json({
      success: true,
      data: products || [], // Ensure we always return an array
    })
  } catch (error) {
    console.error("Products error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch products",
      data: [] // Return empty array on error
    }, { 
      status: 500 
    })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json({ 
        success: false, 
        error: "Name and description are required",
        data: null
      }, { 
        status: 400 
      })
    }

    const newProduct = await db.addProduct(body)

    if (!newProduct) {
      return NextResponse.json({
        success: false,
        error: "Failed to create product",
        data: null
      }, { 
        status: 500 
      })
    }

    return NextResponse.json({
      success: true,
      data: newProduct,
    }, { 
      status: 201 
    })
  } catch (error) {
    console.error("Products error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to create product",
      data: null
    }, { 
      status: 500 
    })
  }
}
