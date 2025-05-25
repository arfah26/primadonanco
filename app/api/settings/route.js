import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache" // Import revalidatePath
import db from "@/lib/database"

export async function GET() {
  try {
    const settings = await db.getSettings() // Added await

    return NextResponse.json({
      success: true,
      data: settings,
    })
  } catch (error) {
    console.error("API Error fetching settings:", error) // Added console.error
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const updatedSettings = await db.updateSettings(body) // Added await

    // Revalidate paths that use these settings
    // Add all paths that might display content from settings
    revalidatePath("/") // Homepage
    revalidatePath("/about")
    revalidatePath("/contact")
    revalidatePath("/gallery")
    revalidatePath("/products")
    // If you have specific admin pages that display settings, revalidate them too.
    // revalidatePath("/admin") // Or more specific admin paths

    console.log("Revalidated paths: /, /about, /contact, /gallery, /products due to settings update.")

    return NextResponse.json({
      success: true,
      data: updatedSettings,
    })
  } catch (error) {
    console.error("API Error updating settings:", error)
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}
