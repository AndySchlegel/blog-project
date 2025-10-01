import mongoose from 'mongoose'
import { apiHandler, ApiError } from '@/lib/apiHandler'
import { parsePaginationParams, buildPagination } from '@/lib/pagination'
import { validatePostPayload } from '@/lib/validators'
import Post from '@/models/Post'
import Category from '@/models/Category'
import { getAuthenticatedUser } from '@/lib/auth'

// Hilfsfunktion: Slug aus Titel ableiten und bei Kollision eindeutige Variante erzeugen
async function generateUniqueSlug (title, preferredSlug) {
  const base = (preferredSlug || title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)

  let slug = base || new mongoose.Types.ObjectId().toString()
  let counter = 1

  // Solange ein Post mit gleichem Slug existiert, Zahlen-Suffix anhängen
  while (await Post.exists({ slug })) {
    slug = `${base}-${counter}`
    counter += 1
  }

  return slug
}

// GET /api/posts – liefert gefilterte & paginierte Posts
export const GET = apiHandler(async (request) => {
  const url = new URL(request.url)
  const { page, limit } = parsePaginationParams(request, { page: 1, limit: 10 })
  const status = url.searchParams.get('status') || 'published'
  const categoryParam = url.searchParams.get('category')
  const tag = url.searchParams.get('tag')
  const search = url.searchParams.get('search')
  const featured = url.searchParams.get('featured')
  const sortParam = url.searchParams.get('sort') || '-publishedAt'

  const query = {}

  if (status !== 'all') {
    query.status = status
  }

  if (featured === 'true') {
    query.featured = true
  }

  if (categoryParam) {
    if (mongoose.isValidObjectId(categoryParam)) {
      query.category = categoryParam
    } else {
      const categoryDoc = await Category.findOne({ slug: categoryParam }).select('_id')
      if (!categoryDoc) {
        throw new ApiError('Kategorie wurde nicht gefunden.', 404)
      }
      query.category = categoryDoc._id
    }
  }

  if (tag) {
    query.tags = tag.toLowerCase()
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ]
  }

  const sort = sortParam.split(',').reduce((acc, segment) => {
    const trimmed = segment.trim()
    if (!trimmed) return acc
    if (trimmed.startsWith('-')) {
      acc[trimmed.slice(1)] = -1
    } else {
      acc[trimmed] = 1
    }
    return acc
  }, {})

  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    Post.find(query)
      .populate('author', 'name email avatar')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean({ virtuals: true }),
    Post.countDocuments(query)
  ])

  const pagination = buildPagination({ page, limit, total })

  return Response.json({
    success: true,
    data: posts,
    pagination
  })
})

// POST /api/posts – neuen Post anlegen (ohne Auth noch mit Fallback-User)
export const POST = apiHandler(async (request) => {
  const payload = await request.json()
  const validation = validatePostPayload(payload)

  if (!validation.valid) {
    throw new ApiError('Validierung fehlgeschlagen.', 400, validation.errors)
  }

  const authUser = await getAuthenticatedUser(request)
  if (!authUser) {
    throw new ApiError('Authentifizierung erforderlich, um Beiträge anzulegen.', 401)
  }

  // Kategorie sicherstellen (Akzeptiert ObjectId oder Slug)
  let categoryId = payload.category
  if (categoryId && !mongoose.isValidObjectId(categoryId)) {
    const matchedCategory = await Category.findOne({ slug: categoryId }).select('_id')
    if (!matchedCategory) {
      throw new ApiError('Kategorie existiert nicht.', 400)
    }
    categoryId = matchedCategory._id
  }

  if (!mongoose.isValidObjectId(categoryId)) {
    throw new ApiError('Kategorie-ID ist ungültig.', 400)
  }

  const authorId = authUser._id
  if (!mongoose.isValidObjectId(authorId)) {
    throw new ApiError('Authentifizierter Benutzer konnte nicht aufgelöst werden.', 400)
  }

  const slug = await generateUniqueSlug(payload.title, payload.slug)

  const post = await Post.create({
    title: payload.title,
    slug,
    excerpt: payload.excerpt ?? payload.content.substring(0, 150),
    content: payload.content,
    coverImage: payload.coverImage,
    author: authorId,
    category: categoryId,
    tags: (payload.tags || []).map(tag => tag.toLowerCase()),
    status: payload.status || 'draft',
    featured: Boolean(payload.featured),
    publishedAt: payload.status === 'published' ? (payload.publishedAt || new Date()) : null
  })

  const populated = await Post.findById(post._id)
    .populate('author', 'name email avatar')
    .populate('category', 'name slug')
    .lean({ virtuals: true })

  return Response.json({
    success: true,
    data: populated
  }, { status: 201 })
})
