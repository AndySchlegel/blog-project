import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { validateCategoryPayload } from '@/lib/validators'
import Category from '@/models/Category'
import Post from '@/models/Post'

function resolveFilter (idOrSlug) {
  if (mongoose.isValidObjectId(idOrSlug)) {
    return { _id: idOrSlug }
  }
  return { slug: idOrSlug }
}

export const GET = apiHandler(async (request, { params }) => {
  const category = await Category.findOne(resolveFilter(params.id))
    .lean({ virtuals: true })

  if (!category) {
    throw new ApiError('Kategorie wurde nicht gefunden.', 404)
  }

  return Response.json({ success: true, data: category })
})

export const PUT = apiHandler(async (request, { params }) => {
  const payload = await request.json()
  const validation = validateCategoryPayload(payload)

  if (!validation.valid) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, validation.errors)
  }

  const update = {
    name: payload.name,
    description: payload.description,
    icon: payload.icon
  }

  if (payload.isVisible !== undefined) {
    update.isVisible = payload.isVisible
  }

  if (payload.slug) {
    update.slug = payload.slug
  }

  if (payload.parent !== undefined) {
    if (!payload.parent) {
      update.parent = null
    } else if (mongoose.isValidObjectId(payload.parent)) {
      update.parent = payload.parent
    } else {
      const parent = await Category.findOne({ slug: payload.parent }).select('_id')
      if (!parent) {
        throw new ApiError('Neue Elternkategorie existiert nicht.', 400)
      }
      update.parent = parent._id
    }
  }

  const category = await Category.findOneAndUpdate(resolveFilter(params.id), update, {
    new: true,
    runValidators: true
  }).lean({ virtuals: true })

  if (!category) {
    throw new ApiError('Kategorie wurde nicht gefunden.', 404)
  }

  return Response.json({ success: true, data: category })
})

export const DELETE = apiHandler(async (request, { params }) => {
  const category = await Category.findOne(resolveFilter(params.id))
  if (!category) {
    throw new ApiError('Kategorie wurde nicht gefunden.', 404)
  }

  const hasPosts = await Post.exists({ category: category._id })
  if (hasPosts) {
    throw new ApiError('Kategorie kann nicht gelöscht werden, solange Posts darauf verweisen.', 409)
  }

  await Category.deleteOne({ _id: category._id })

  return Response.json({ success: true, message: 'Kategorie gelöscht.' })
})
