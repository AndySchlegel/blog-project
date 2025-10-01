import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import Comment from '@/models/Comment'

function ensureObjectId (value) {
  if (!mongoose.isValidObjectId(value)) {
    throw new ApiError('Kommentar-ID ist ungültig.', 400)
  }
  return value
}

export const PATCH = apiHandler(async (request, { params }) => {
  const id = ensureObjectId(params.id)
  const payload = await request.json()

  const comment = await Comment.findById(id)
  if (!comment) {
    throw new ApiError('Kommentar wurde nicht gefunden.', 404)
  }

  if (payload.content) {
    comment.content = payload.content
  }

  if (payload.status) {
    comment.status = payload.status
  }

  await comment.save()

  const populated = await Comment.findById(id)
    .populate('author', 'name avatar')
    .lean({ virtuals: true })

  return Response.json({ success: true, data: populated })
})

export const DELETE = apiHandler(async (request, { params }) => {
  const id = ensureObjectId(params.id)
  const deleted = await Comment.findByIdAndDelete(id)

  if (!deleted) {
    throw new ApiError('Kommentar wurde nicht gefunden.', 404)
  }

  return Response.json({ success: true, message: 'Kommentar gelöscht.' })
})
