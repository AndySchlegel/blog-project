import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    const { password } = await request.json()

    // Vergleiche das eingegebene Passwort mit dem in der .env.local gespeicherten
    const correctPassword = process.env.SITE_ACCESS_PASSWORD

    if (!correctPassword) {
      return NextResponse.json(
        { error: 'Server-Konfigurationsfehler: SITE_ACCESS_PASSWORD nicht gesetzt' },
        { status: 500 }
      )
    }

    if (password !== correctPassword) {
      return NextResponse.json(
        { error: 'Falsches Passwort' },
        { status: 401 }
      )
    }

    // Generiere ein Secret-Token für den Cookie
    const secret = process.env.SITE_ACCESS_SECRET || 'default-secret-change-me'

    // Erstelle Response mit Cookie
    const response = NextResponse.json({ success: true })

    // Setze Cookie für 30 Tage
    response.cookies.set('site-access-token', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 Tage
    })

    return response
  } catch (error) {
    console.error('Site access error:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}
