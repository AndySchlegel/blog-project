import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { validateCategoryPayload } from '@/lib/validators'
import Category from '@/models/Category'

async function ensureParent (parentId) {
  if (!parentId) return null
  if (!mongoose.isValidObjectId(parentId)) {
    const parentBySlug = await Category.findOne({ slug: parentId }).select('_id')
    if (!parentBySlug) {
      throw new ApiError('Elternkategorie existiert nicht.', 400)
    }
    return parentBySlug._id
  }
  const parent = await Category.findById(parentId).select('_id')
  if (!parent) {
    throw new ApiError('Elternkategorie existiert nicht.', 400)
  }
  return parent._id
}

async function generateCategorySlug (name, preferredSlug) {
  const base = (preferredSlug || name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60)

  let slug = base || new mongoose.Types.ObjectId().toString()
  let counter = 1

  while (await Category.exists({ slug })) {
    slug = `${base}-${counter}`
    counter += 1
  }

  return slug
}

export const GET = apiHandler(async (request) => {
  const url = new URL(request.url)
  const includeHidden = url.searchParams.get('includeHidden') === 'true'
  const parent = url.searchParams.get('parent')

  const query = {}
  if (!includeHidden) {
    query.isVisible = true
  }

  if (parent) {
    const parentId = await ensureParent(parent)
    query.parent = parentId
  }

  const categories = await Category.find(query)
    .sort({ name: 1 })
    .lean({ virtuals: true })

  return Response.json({ success: true, data: categories })
})

export const POST = apiHandler(async (request) => {
  const payload = await request.json()
  const validation = validateCategoryPayload(payload)

  if (!validation.valid) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, validation.errors)
  }

  const parent = payload.parent ? await ensureParent(payload.parent) : null
  const slug = await generateCategorySlug(payload.name, payload.slug)

  const category = await Category.create({
    name: payload.name,
    slug,
    description: payload.description,
    icon: payload.icon,
    parent,
    isVisible: payload.isVisible !== undefined ? Boolean(payload.isVisible) : true
  })

  return Response.json({ success: true, data: category }, { status: 201 })
})
