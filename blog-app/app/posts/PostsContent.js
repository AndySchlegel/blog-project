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
      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-12">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text pb-2 text-4xl font-extrabold leading-tight text-transparent sm:mb-6 sm:text-6xl">
            Tech Knowledge Base
          </h1>
          <p className="mx-auto flex max-w-3xl items-center justify-center gap-2 text-base font-medium text-slate-700 sm:text-xl">
            <svg className="h-5 w-5 flex-shrink-0 text-blue-600 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline">Von AWS bis Self-Hosting: Praxisnahe Guides, die wirklich funktionieren.</span>
            <span className="sm:hidden">Praxisnahe Tech Guides</span>
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 sm:mt-3 sm:text-base">
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
              Zeige <span className="font-semibold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'Post' : 'Posts'} in &quot;{activeCategoryName}&quot;
            </p>
          )}
        </header>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category Badge - Right Aligned */}
                {post.category && (
                  <div className="mb-4 flex justify-end">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                      {post.category.name}
                    </span>
                  </div>
                )}

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
