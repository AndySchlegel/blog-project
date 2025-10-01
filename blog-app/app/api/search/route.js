import { apiHandler, ApiError } from '@/lib/apiHandler'
import Post from '@/models/Post'
import Category from '@/models/Category'

export const GET = apiHandler(async (request) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('q')
  const type = url.searchParams.get('type') || 'all'

  if (!query || query.trim().length < 2) {
    throw new ApiError('Suchbegriff muss mindestens zwei Zeichen enthalten.', 400)
  }

  const regex = new RegExp(query, 'i')
  const response = {}

  if (type === 'all' || type === 'posts') {
    response.posts = await Post.find({
      status: 'published',
      $or: [
        { title: regex },
        { excerpt: regex },
        { tags: regex }
      ]
    })
      .populate('author', 'name')
      .populate('category', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(10)
      .lean({ virtuals: true })
  }

  if (type === 'all' || type === 'tags') {
    const tagAggregation = await Post.aggregate([
      { $match: { status: 'published', tags: regex } },
      { $unwind: '$tags' },
      { $match: { tags: regex } },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])

    response.tags = tagAggregation.map(entry => ({ name: entry._id, count: entry.count }))
  }

  if (type === 'all' || type === 'categories') {
    response.categories = await Category.find({
      isVisible: true,
      $or: [
        { name: regex },
        { description: regex }
      ]
    })
      .select('name slug description')
      .sort({ name: 1 })
      .limit(10)
      .lean()
  }

  return Response.json({ success: true, data: response })
})
