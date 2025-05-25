import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET() {
  try {
    const settings = db.getSettings()

    return NextResponse.json({
      success: true,
      data: settings,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const updatedSettings = db.updateSettings(body)

    return NextResponse.json({
      success: true,
      data: updatedSettings,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}
