import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import User from '@/models/User'

const TOKEN_NAME = 'auth_token'
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7 // 7 Tage in Sekunden
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-me'
// Ermöglicht HTTP-Tests im Docker-Setup: in .env AUTH_COOKIE_SECURE=false setzen
const SECURE_COOKIES = process.env.AUTH_COOKIE_SECURE !== 'false' && process.env.NODE_ENV === 'production'

if (!process.env.JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET ist nicht gesetzt. Bitte in .env.local hinterlegen, bevor die App produktiv genutzt wird.')
}

export async function hashPassword (plainPassword) {
  return bcrypt.hash(plainPassword, 12)
}

export async function verifyPassword (plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export function signToken (payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken (token) {
  return jwt.verify(token, JWT_SECRET)
}

export function createSessionCookie (token) {
  let cookie = `${TOKEN_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${TOKEN_MAX_AGE}`
  if (SECURE_COOKIES) cookie += '; Secure'
  return cookie
}

export function clearSessionCookie () {
  let cookie = `${TOKEN_NAME}=deleted; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  if (SECURE_COOKIES) cookie += '; Secure'
  return cookie
}

export function extractTokenFromRequest (request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  const cookieHeader = request.headers.get('cookie')
  if (!cookieHeader) return null

  const cookiesArray = cookieHeader.split(';').map(cookie => cookie.trim())
  for (const cookie of cookiesArray) {
    if (cookie.startsWith(`${TOKEN_NAME}=`)) {
      return cookie.substring(TOKEN_NAME.length + 1)
    }
  }

  return null
}

export async function getUserFromToken (token) {
  if (!token) return null

  try {
    const payload = verifyToken(token)
    if (!payload?.sub) return null

    const user = await User.findById(payload.sub).select('name email avatar')
    return user ? user.toObject() : null
  } catch (error) {
    console.warn('Token konnte nicht validiert werden:', error.message)
    return null
  }
}

export async function getAuthenticatedUser (request) {
  const token = extractTokenFromRequest(request)
  return getUserFromToken(token)
}

export function setSessionCookie (response, token) {
  response.headers.append('Set-Cookie', createSessionCookie(token))
  return response
}

export function unsetSessionCookie (response) {
  response.headers.append('Set-Cookie', clearSessionCookie())
  return response
}

export async function getServerSession () {
  const store = cookies()
  const token = store.get(TOKEN_NAME)?.value
  return getUserFromToken(token)
}

export { TOKEN_NAME, TOKEN_MAX_AGE }
