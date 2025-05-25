import { NextResponse } from "next/server"
import { getSession } from "./lib/auth"

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Check if the request is for admin pages (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    try {
      const session = getSession()

      if (!session) {
        // Redirect to login if no session
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      // Check if session is expired (24 hours)
      if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
        const response = NextResponse.redirect(new URL("/admin/login", request.url))
        response.cookies.delete("session")
        return response
      }

      // Allow access to admin pages
      return NextResponse.next()
    } catch (error) {
      // If there's an error reading the session, redirect to login
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
