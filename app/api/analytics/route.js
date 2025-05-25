import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function GET() {
  try {
    const analytics = await db.getAnalytics()

    // Ensure we return an object with default values if any property is undefined
    const sanitizedAnalytics = {
      totalVisits: analytics.totalVisits || 0,
      totalProducts: analytics.totalProducts || 0,
      totalContacts: analytics.totalContacts || 0,
      totalGalleryImages: analytics.totalGalleryImages || 0,
      monthlyVisits: analytics.monthlyVisits || {}
    }

    return NextResponse.json({
      success: true,
      data: sanitizedAnalytics
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch analytics",
      data: {
        totalVisits: 0,
        totalProducts: 0,
        totalContacts: 0,
        totalGalleryImages: 0,
        monthlyVisits: {}
      }
    }, { 
      status: 500 
    })
  }
}

export async function POST(request) {
  try {
    const { action } = await request.json()

    if (action === "visit") {
      const sessionData = {
        ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
        user_agent: request.headers.get("user-agent") || null,
        page_url: request.headers.get("referer") || null,
        referrer: request.headers.get("x-forwarded-referrer") || null,
        session_id: request.cookies.get("session")?.value || null
      }
      await db.incrementVisits(sessionData)
    }

    return NextResponse.json({
      success: true,
      message: "Analytics updated"
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to update analytics" 
    }, { 
      status: 500 
    })
  }
}
