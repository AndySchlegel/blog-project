import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import Post from '@/models/Post'
import User from '@/models/User'

export const POST = apiHandler(async (request, { params }) => {
  const resolvedParams = await params
  const body = await request.json()
  let userId = body.userId

  if (!userId) {
    const fallback = await User.findOne().select('_id')
    if (!fallback) {
      throw new ApiError('Es wird ein User benötigt, bevor Likes gespeichert werden können.', 400)
    }
    userId = fallback._id
  }

  if (!mongoose.isValidObjectId(userId)) {
    throw new ApiError('User-ID ist ungültig.', 400)
  }

  const postFilter = mongoose.isValidObjectId(resolvedParams.id) ? { _id: resolvedParams.id } : { slug: resolvedParams.id }
  const post = await Post.findOne(postFilter)
  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  const alreadyLiked = post.likedBy.some(id => id.toString() === userId.toString())

  if (alreadyLiked) {
    post.likedBy = post.likedBy.filter(id => id.toString() !== userId.toString())
    post.metrics.likes = Math.max(0, post.metrics.likes - 1)
  } else {
    post.likedBy.push(userId)
    post.metrics.likes += 1
  }

  await post.save()

  return Response.json({
    success: true,
    data: {
      liked: !alreadyLiked,
      likeCount: post.metrics.likes
    }
  })
})
