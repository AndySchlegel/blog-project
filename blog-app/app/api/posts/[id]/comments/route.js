import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { parsePaginationParams, buildPagination } from '@/lib/pagination'
import { validateCommentPayload } from '@/lib/validators'
import Comment from '@/models/Comment'
import Post from '@/models/Post'
import User from '@/models/User'

export const GET = apiHandler(async (request, { params }) => {
  const { page, limit } = parsePaginationParams(request, { page: 1, limit: 10 })
  const url = new URL(request.url)
  const parentParam = url.searchParams.get('parent')
  const status = url.searchParams.get('status') || 'approved'
  const postId = params.id

  const postFilter = mongoose.isValidObjectId(postId) ? { _id: postId } : { slug: postId }
  const post = await Post.findOne(postFilter).select('_id')
  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  const query = {
    post: post._id,
    status
  }

  if (parentParam) {
    if (!mongoose.isValidObjectId(parentParam)) {
      throw new ApiError('Parent-ID ist ungültig.', 400)
    }
    query.parentComment = parentParam
  } else {
    query.parentComment = null
  }

  const skip = (page - 1) * limit

  const [comments, total] = await Promise.all([
    Comment.find(query)
      .populate('author', 'name avatar')
      .populate({
        path: 'replies',
        populate: {
          path: 'author',
          select: 'name avatar'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true }),
    Comment.countDocuments(query)
  ])

  return Response.json({
    success: true,
    data: comments,
    pagination: buildPagination({ page, limit, total })
  })
})

export const POST = apiHandler(async (request, { params }) => {
  const body = await request.json()
  const validation = validateCommentPayload({ ...body, postId: params.id })

  if (!validation.valid) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, validation.errors)
  }

  const postFilter = mongoose.isValidObjectId(params.id) ? { _id: params.id } : { slug: params.id }
  const post = await Post.findOne(postFilter).select('_id')
  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  let authorId = body.authorId
  if (!authorId) {
    const fallbackUser = await User.findOne().select('_id')
    if (!fallbackUser) {
      throw new ApiError('Es wird ein User benötigt, bevor Kommentare erstellt werden können.', 400)
    }
    authorId = fallbackUser._id
  }

  if (!mongoose.isValidObjectId(authorId)) {
    throw new ApiError('Autor-ID ist ungültig.', 400)
  }

  const comment = await Comment.create({
    content: body.content,
    author: authorId,
    post: post._id,
    parentComment: body.parentComment ?? null,
    status: body.status || 'approved'
  })

  const populated = await Comment.findById(comment._id)
    .populate('author', 'name avatar')
    .populate({
      path: 'replies',
      populate: { path: 'author', select: 'name avatar' }
    })
    .lean({ virtuals: true })

  return Response.json({ success: true, data: populated }, { status: 201 })
})
