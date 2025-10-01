import { apiHandler } from '@/lib/apiHandler'
import Post from '@/models/Post'
import Comment from '@/models/Comment'
import User from '@/models/User'
import Category from '@/models/Category'

export const GET = apiHandler(async () => {
  const [
    totalPosts,
    publishedPosts,
    totalComments,
    totalUsers,
    popularPosts,
    latestPosts,
    categoryAggregation
  ] = await Promise.all([
    Post.countDocuments(),
    Post.countDocuments({ status: 'published' }),
    Comment.countDocuments({ status: 'approved' }),
    User.countDocuments(),
    Post.find({ status: 'published' })
      .sort({ 'metrics.views': -1 })
      .limit(5)
      .select('title slug metrics.views metrics.likes publishedAt')
      .lean(),
    Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(5)
      .select('title slug publishedAt')
      .lean(),
    Post.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
  ])

  const categoryIds = categoryAggregation.filter(item => item._id).map(item => item._id)
  const categoryMap = categoryIds.length
    ? await Category.find({ _id: { $in: categoryIds } }).select('name slug').lean()
    : []

  const categoryStats = categoryAggregation.map((entry) => {
    const categoryInfo = categoryMap.find(cat => cat._id.toString() === entry._id?.toString())
    return {
      categoryId: entry._id,
      count: entry.count,
      name: categoryInfo?.name ?? 'Unbekannt',
      slug: categoryInfo?.slug ?? null
    }
  })

  return Response.json({
    success: true,
    data: {
      overview: {
        totalPosts,
        publishedPosts,
        totalComments,
        totalUsers
      },
      popularPosts,
      latestPosts,
      categoryStats
    }
  })
})
