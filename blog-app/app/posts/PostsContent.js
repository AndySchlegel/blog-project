'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostsContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [postsRes, categoriesRes] = await Promise.all([
          fetch('/api/posts?status=published&limit=100'),
          fetch('/api/categories')
        ]);

        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();

        setPosts(Array.isArray(postsData.data) ? postsData.data : []);
        setCategories(Array.isArray(categoriesData.data) ? categoriesData.data : []);
      } catch (error) {
        console.error('Fehler beim Laden:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = categoryFilter
    ? posts.filter(post => post.category?.slug === categoryFilter)
    : posts;

  const activeCategoryName = categoryFilter
    ? categories.find(cat => cat.slug === categoryFilter)?.name
    : null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-lg font-medium text-slate-600">Lade Posts...</p>
        </div>
      </div>
    );
  }

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
            <Link
              href="/posts"
              className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 transition hover:shadow-md ${
                !categoryFilter
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-blue-600'
                  : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-300'
              }`}
            >
              Alle
            </Link>
            {categories.map(cat => (
              <Link
                key={cat._id}
                href={`/posts?category=${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 transition hover:shadow-md ${
                  categoryFilter === cat.slug
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ring-blue-600'
                    : 'bg-white text-slate-700 ring-slate-200 hover:ring-slate-300'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          {activeCategoryName && (
            <p className="mt-4 text-sm text-slate-600">
              Zeige <span className="font-semibold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'Post' : 'Posts'} in "{activeCategoryName}"
            </p>
          )}
        </header>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map(post => (
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
                    unoptimized
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
        {filteredPosts.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            {categoryFilter ? (
              <>
                <div className="mb-4 text-6xl">🔍</div>
                <p className="mb-4 text-lg font-semibold text-slate-700">
                  Keine Posts in dieser Kategorie gefunden
                </p>
                <Link
                  href="/posts"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                >
                  Alle Posts anzeigen
                </Link>
              </>
            ) : (
              <p className="text-lg text-slate-600">
                Noch keine Posts verfügbar.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
