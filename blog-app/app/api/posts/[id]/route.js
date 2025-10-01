import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { validatePostPayload } from '@/lib/validators'
import Post from '@/models/Post'
import Category from '@/models/Category'

function resolveIdentifierFilter (idOrSlug) {
  if (mongoose.isValidObjectId(idOrSlug)) {
    return { _id: idOrSlug }
  }
  return { slug: idOrSlug }
}

export const GET = apiHandler(async (request, { params }) => {
  const filter = resolveIdentifierFilter(params.id)
  const post = await Post.findOne(filter)
    .populate('author', 'name email avatar')
    .populate('category', 'name slug')
    .lean({ virtuals: true })

  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  return Response.json({ success: true, data: post })
})

export const PUT = apiHandler(async (request, { params }) => {
  const payload = await request.json()
  const filter = resolveIdentifierFilter(params.id)

  const post = await Post.findOne(filter)
  if (!post) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  // Validierung mit kombiniertem Objekt (bestehende Werte + Änderungen)
  if (payload.title || payload.content || payload.excerpt) {
    const partialValidation = validatePostPayload({
      title: payload.title ?? post.title,
      excerpt: payload.excerpt ?? post.excerpt,
      content: payload.content ?? post.content,
      category: payload.category ?? post.category,
      tags: payload.tags ?? post.tags
    })

    if (!partialValidation.valid) {
      throw new ApiError('Validierung fehlgeschlagen.', 400, partialValidation.errors)
    }
  }

  if (payload.category) {
    let categoryId = payload.category
    if (!mongoose.isValidObjectId(categoryId)) {
      const category = await Category.findOne({ slug: categoryId }).select('_id')
      if (!category) {
        throw new ApiError('Kategorie existiert nicht.', 400)
      }
      categoryId = category._id
    }
    post.category = categoryId
  }

  const updatableFields = ['title', 'excerpt', 'content', 'coverImage', 'status', 'featured']
  updatableFields.forEach((field) => {
    if (field in payload) {
      post[field] = field === 'featured' ? Boolean(payload[field]) : payload[field]
    }
  })

  if (payload.tags) {
    post.tags = payload.tags.map(tag => tag.toLowerCase())
  }

  if (payload.slug) {
    post.slug = payload.slug
  }

  if (payload.status === 'published' && !post.publishedAt) {
    post.publishedAt = new Date()
  }

  if (payload.status && payload.status !== 'published') {
    post.publishedAt = null
  }

  await post.save()

  const refreshed = await Post.findById(post._id)
    .populate('author', 'name email avatar')
    .populate('category', 'name slug')
    .lean({ virtuals: true })

  return Response.json({ success: true, data: refreshed })
})

export const DELETE = apiHandler(async (request, { params }) => {
  const filter = resolveIdentifierFilter(params.id)
  const deleted = await Post.findOneAndDelete(filter)

  if (!deleted) {
    throw new ApiError('Post wurde nicht gefunden.', 404)
  }

  return Response.json({ success: true, message: 'Post erfolgreich gelöscht.' })
})
