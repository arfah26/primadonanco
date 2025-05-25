import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export function createSession(user) {
  const sessionData = {
    userId: user.id,
    username: user.username,
    role: user.role,
    createdAt: Date.now(),
  }

  return btoa(JSON.stringify(sessionData))
}

export function getSession() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) return null

    const sessionData = JSON.parse(atob(sessionCookie.value))

    // Check if session is expired (24 hours)
    if (Date.now() - sessionData.createdAt > 24 * 60 * 60 * 1000) {
      return null
    }

    return sessionData
  } catch (error) {
    return null
  }
}

export function requireAuth() {
  const session = getSession()
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"))
  }
  return session
}

export function logout() {
  const response = NextResponse.redirect(
    new URL("/admin/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  )
  response.cookies.delete("session")
  return response
}
