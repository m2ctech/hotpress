import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("appwrite-session")
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard/user", "/dashboard/journalist", "/dashboard/admin"]

  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If trying to access protected route without auth, redirect to login
  if (isProtectedRoute && !authCookie) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If already logged in and trying to access auth pages, redirect to dashboard
  if (authCookie && (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register"))) {
    return NextResponse.redirect(new URL("/dashboard/user", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
