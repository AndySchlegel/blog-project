import { apiHandler, ApiError } from '@/lib/apiHandler'
import User from '@/models/User'
import { hashPassword, signToken, setSessionCookie } from '@/lib/auth'

export const POST = apiHandler(async (request) => {
  const payload = await request.json()
  const name = payload.name?.trim()
  const email = payload.email?.toLowerCase().trim()
  const password = payload.password
  const passwordConfirm = payload.passwordConfirm

  const errors = {}

  if (!name || name.length < 2) {
    errors.name = 'Name muss mindestens 2 Zeichen haben.'
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = 'Bitte eine gültige E-Mail-Adresse angeben.'
  }

  if (!password || password.length < 6) {
    errors.password = 'Passwort muss mindestens 6 Zeichen haben.'
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = 'Passwörter stimmen nicht überein.'
  }

  if (Object.keys(errors).length > 0) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, errors)
  }

  const existing = await User.findOne({ email }).lean()
  if (existing) {
    throw new ApiError('Für diese E-Mail existiert bereits ein Account.', 409)
  }

  const hashedPassword = await hashPassword(password)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  const token = signToken({ sub: user._id.toString(), email: user.email })

  const response = Response.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }
  }, { status: 201 })

  return setSessionCookie(response, token)
})
