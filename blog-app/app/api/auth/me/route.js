import { apiHandler, ApiError } from '@/lib/apiHandler'
import { getAuthenticatedUser } from '@/lib/auth'

export const GET = apiHandler(async (request) => {
  const user = await getAuthenticatedUser(request)

  if (!user) {
    throw new ApiError('Nicht authentifiziert.', 401)
  }

  return Response.json({
    success: true,
    data: user
  })
})
