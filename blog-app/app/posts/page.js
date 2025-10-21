import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import Category from '@/models/Category';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

async function getPosts() {
  await dbConnect();
  const posts = await Post.find({ status: 'published' })
    .populate('category', 'name slug')
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .lean();

  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    author: post.author ? { ...post.author, _id: post.author._id.toString() } : null,
    category: post.category ? { ...post.category, _id: post.category._id.toString() } : null,
    publishedAt: post.publishedAt?.toISOString() || null,
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null
  }));
}

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return categories.map(cat => ({
    ...cat,
    _id: cat._id.toString()
  }));
}

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text pb-2 text-6xl font-extrabold leading-tight text-transparent">
            Tech Knowledge Base
          </h1>
          <p className="mx-auto max-w-3xl text-xl font-medium text-slate-700">
            🚀 Von AWS bis Self-Hosting: Praxisnahe Guides, die wirklich funktionieren.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            Keine Theorie-Wüste. Echte Tutorials mit Code, Screenshots und Troubleshooting-Tipps.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <span
                key={cat._id}
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </header>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Cover Image */}
              {post.coverImage && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Category Badge */}
                  {post.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm">
                      {post.category.name}
                    </span>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  {post.title}
                </h2>

                <p className="mb-4 line-clamp-3 text-sm text-slate-600">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>{post.readTime || 5} Min Lesezeit</span>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <p className="text-lg text-slate-600">
              Noch keine Posts verfügbar. Führe <code className="rounded bg-slate-100 px-2 py-1 text-sm">npm run seed:full</code> aus.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
