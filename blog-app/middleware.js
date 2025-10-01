import { NextResponse } from 'next/server'

const TOKEN_NAME = 'auth_token'
const AUTH_ROUTES = ['/login', '/register']
const PROTECTED_ROUTES = ['/dashboard']

export function middleware (request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(TOKEN_NAME)?.value

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))

  if (!token && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*']
}
