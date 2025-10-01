import { apiHandler } from '@/lib/apiHandler'
import { unsetSessionCookie } from '@/lib/auth'

export const POST = apiHandler(async () => {
  const response = Response.json({ success: true, message: 'Abgemeldet.' })
  return unsetSessionCookie(response)
})
