import { apiHandler, ApiError } from '@/lib/apiHandler'
import User from '@/models/User'
import { verifyPassword, signToken, setSessionCookie } from '@/lib/auth'

export const POST = apiHandler(async (request) => {
  const payload = await request.json()
  const email = payload.email?.toLowerCase().trim()
  const password = payload.password

  if (!email || !password) {
    throw new ApiError('Bitte E-Mail und Passwort angeben.', 400)
  }

  const user = await User.findOne({ email }).select('+password name email avatar')
  if (!user) {
    throw new ApiError('Ungültige Zugangsdaten.', 401)
  }

  const passwordMatches = await verifyPassword(password, user.password)
  if (!passwordMatches) {
    throw new ApiError('Ungültige Zugangsdaten.', 401)
  }

  const token = signToken({ sub: user._id.toString(), email: user.email })

  const response = Response.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  })

  return setSessionCookie(response, token)
})
