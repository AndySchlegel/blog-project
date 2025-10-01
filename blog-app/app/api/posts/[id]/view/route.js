import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import Post from '@/models/Post'

export const POST = apiHandler(async (request, { params }) => {
  const filter = mongoose.isValidObjectId(params.id) ? { _id: params.id } : { slug: params.id }
  const post = await Post.findOne(filter)

  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  post.metrics.views += 1
  await post.save()

  return Response.json({ success: true, data: { viewCount: post.metrics.views } })
})
