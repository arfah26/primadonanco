import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET() {
  try {
    const analytics = db.getAnalytics()

    return NextResponse.json({
      success: true,
      data: analytics,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { action } = await request.json()

    if (action === "visit") {
      db.incrementVisits()
    }

    return NextResponse.json({
      success: true,
      message: "Analytics updated",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update analytics" }, { status: 500 })
  }
}
