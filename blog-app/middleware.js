import { NextResponse } from 'next/server'

export function middleware (request) {
  const { pathname } = request.nextUrl

  // Erlaube Zugriff auf die Passwort-Seite und deren Assets
  if (
    pathname === '/site-access' ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Prüfe ob der Site-Access-Cookie gesetzt ist
  const siteAccessToken = request.cookies.get('site-access-token')

  if (!siteAccessToken || siteAccessToken.value !== process.env.SITE_ACCESS_SECRET) {
    // Redirect zur Passwort-Seite
    const url = request.nextUrl.clone()
    url.pathname = '/site-access'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}
