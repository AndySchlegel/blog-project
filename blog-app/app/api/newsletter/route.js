import { apiHandler, ApiError } from '@/lib/apiHandler'
import { validateNewsletterPayload } from '@/lib/validators'
import NewsletterSubscriber from '@/models/NewsletterSubscriber'

export const GET = apiHandler(async (request) => {
  const url = new URL(request.url)
  const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 200)

  const subscribers = await NewsletterSubscriber.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean()

  return Response.json({ success: true, data: subscribers })
})

export const POST = apiHandler(async (request) => {
  const payload = await request.json()
  const validation = validateNewsletterPayload(payload)

  if (!validation.valid) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, validation.errors)
  }

  const existing = await NewsletterSubscriber.findOne({ email: payload.email.toLowerCase() })
  if (existing) {
    if (existing.unsubscribedAt) {
      existing.unsubscribedAt = null
      existing.confirmedAt = new Date()
      await existing.save()
      return Response.json({ success: true, data: existing })
    }
    throw new ApiError('Diese Email ist bereits registriert.', 409)
  }

  const subscriber = await NewsletterSubscriber.create({
    email: payload.email,
    name: payload.name,
    tags: (payload.tags || []).map(tag => tag.toLowerCase()),
    confirmedAt: payload.confirmed === true ? new Date() : null
  })

  return Response.json({ success: true, data: subscriber }, { status: 201 })
})
