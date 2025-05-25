import { NextResponse } from "next/server"
import db from "@/lib/database"

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "First name, email, and message are required" },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    const newContact = await db.addContact(body) // Added await

    // In production, you would send email notification here
    console.log("New contact submission:", newContact)

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
      data: newContact,
    })
  } catch (error) {
    console.error("API Error submitting contact form:", error) // Added console.error
    return NextResponse.json({ success: false, error: "Failed to submit contact form" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contacts = await db.getContacts() // Added await

    return NextResponse.json({
      success: true,
      data: contacts,
    })
  } catch (error) {
    console.error("API Error fetching contacts:", error) // Added console.error
    return NextResponse.json({ success: false, error: "Failed to fetch contacts" }, { status: 500 })
  }
}
