import { NextResponse } from "next/server"
import db from "@/lib/database"
import { createSession } from "@/lib/auth"

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password are required" }, { status: 400 })
    }

    const user = db.getUser(username)

    if (!user || user.password !== password) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    const sessionToken = createSession(user)

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    })

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
