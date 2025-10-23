'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogPostContent({ post }) {
  const [likes, setLikes] = useState(post.metrics?.likes ?? 0)
  const [views, setViews] = useState(post.metrics?.views ?? 0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)

  // Track view on mount
  useEffect(() => {
    const trackView = async () => {
      try {
        const response = await fetch(`/api/posts/${post._id}/view`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
          const result = await response.json()
          setViews(result.data.viewCount)
        }
      } catch (error) {
        console.error('Fehler beim Tracking der Ansicht:', error)
      }
    }

    trackView()
  }, [post._id])

  const handleLike = async () => {
    if (isLiking) return

    setIsLiking(true)
    try {
      const response = await fetch(`/api/posts/${post._id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (response.ok) {
        const result = await response.json()
        setLikes(result.data.likeCount)
        setIsLiked(result.data.liked)
      }
    } catch (error) {
      console.error('Fehler beim Liken:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const dateFormatter = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin' })

  const publishedDate = post.publishedAt
    ? dateFormatter.format(new Date(post.publishedAt))
    : 'unveröffentlicht'

  const updatedDate = post.updatedAt
    ? dateFormatter.format(new Date(post.updatedAt))
    : publishedDate

  const paragraphs = (post.content ?? '')
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const categorySlug = post.category?.slug
  const coverImage = typeof post.coverImage === 'string' ? post.coverImage : ''

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="space-y-10 p-8 md:p-12">
            <header className="space-y-4">
              <div className="flex items-center justify-between">
                <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-blue-600 transition-all hover:gap-2 hover:underline">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zur Übersicht
                </Link>

                {post.category?.name && (
                  <div className="inline-flex rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-xs font-bold text-blue-700 ring-1 ring-blue-200/50">
                    {post.category.name}
                  </div>
                )}
              </div>

              <h1 className="text-4xl font-black text-slate-900 md:text-5xl">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {post.author?.name ?? 'Unbekannt'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {publishedDate}
                </span>
              </div>

              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
                  {post.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 transition-all hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700">
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </header>

            {coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md">
                <Image
                  src={coverImage}
                  alt={`Coverbild für ${post.title}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 896px, 100vw"
                  unoptimized={coverImage.startsWith('http')}
                />
              </div>
            )}

            <div className="prose prose-slate max-w-none space-y-4 text-base leading-relaxed text-slate-700">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => <p key={`paragraph-${index}`}>{paragraph}</p>)
              ) : (
                <p className="text-slate-400">Für diesen Beitrag liegt noch kein Inhalt vor.</p>
              )}
            </div>

            <footer className="space-y-6 border-t border-slate-200 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm text-slate-500">Zuletzt aktualisiert: {updatedDate}</span>

                <div className="flex items-center gap-6">
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className="group flex items-center gap-2 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <svg
                      className={`h-6 w-6 transition-all ${isLiked ? 'text-red-500 fill-current scale-125' : 'text-red-500'}`}
                      fill={isLiked ? 'currentColor' : 'none'}
                      stroke={isLiked ? 'none' : 'currentColor'}
                      strokeWidth={isLiked ? 0 : 2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <span className={`font-semibold ${isLiked ? 'text-red-500' : 'text-slate-700'}`}>{likes}</span>
                  </button>

                  <div className="flex items-center gap-2 text-blue-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-semibold text-slate-700">{views}</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  )
}
