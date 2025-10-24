'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedPostCard({ post, index }) {
  const handleClick = () => {
    // Save current page as 'home' so we can return here
    sessionStorage.setItem('previous-page', '/');
    sessionStorage.setItem('home-scroll-position', window.scrollY.toString());
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      {post.coverImage && (
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Featured Badge */}
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
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

        <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {post.excerpt}
        </p>

        {/* Meta with Gradient Button */}
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime || 5} Min
          </span>

          <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl" style={{ color: '#ffffff' }}>
            Weiterlesen
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gradient Border on Hover */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
    </Link>
  );
}
