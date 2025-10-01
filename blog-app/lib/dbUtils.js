import mongoose from 'mongoose'
import Post from '@/models/Post'
import Category from '@/models/Category'

// Liefert veröffentlichte Posts inklusive Kategorie und Autor
export async function getPublishedPosts ({ limit = 10, page = 1 } = {}) {
  const skip = (page - 1) * limit
  const posts = await Post.find({ status: 'published' })
    .populate('author', 'name avatar')
    .populate('category', 'name slug')
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean({ virtuals: true })

  const total = await Post.countDocuments({ status: 'published' })
  return { posts, total }
}

// Lädt einen Post anhand von Slug oder ObjectId
export async function getPostByIdentifier (identifier) {
  const filter = mongoose.isValidObjectId(identifier) ? { _id: identifier } : { slug: identifier }
  return Post.findOne(filter)
    .populate('author', 'name avatar email')
    .populate('category', 'name slug')
    .lean({ virtuals: true })
}

// Hilfsfunktion für ähnliche Posts nach Kategorie/Tag
export async function getRelatedPosts (postId, limit = 3) {
  const post = await Post.findById(postId).select('category tags')
  if (!post) return []

  const query = {
    _id: { $ne: postId },
    status: 'published'
  }

  if (post.category) {
    query.category = post.category
  }

  if (post.tags?.length) {
    query.tags = { $in: post.tags }
  }

  return Post.find(query)
    .populate('author', 'name')
    .populate('category', 'name slug')
    .sort({ publishedAt: -1 })
    .limit(limit)
    .lean({ virtuals: true })
}

export async function getCategoryOverview () {
  const categories = await Category.find({ isVisible: true })
    .sort({ name: 1 })
    .lean()

  return categories
}
