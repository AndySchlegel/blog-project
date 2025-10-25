'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function BlogPostContent({ post }) {
  const router = useRouter()
  const [likes, setLikes] = useState(post.metrics?.likes ?? 0)
  const [views, setViews] = useState(post.metrics?.views ?? 0)
  const [isLiked, setIsLiked] = useState(false)
  const [isLiking, setIsLiking] = useState(false)
  const [backUrl, setBackUrl] = useState('/blog')

  // Determine back URL and track view on mount
  useEffect(() => {
    // Check if we came from home page
    const previousPage = sessionStorage.getItem('previous-page')
    if (previousPage === '/') {
      setBackUrl('/')
    }

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
    <article className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-6 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="space-y-6 p-6 sm:p-6 md:space-y-10 md:p-8 lg:p-12">
            <header className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={() => {
                    // Restore scroll position based on where we came from
                    if (backUrl === '/') {
                      const savedPosition = sessionStorage.getItem('home-scroll-position')
                      if (savedPosition) {
                        sessionStorage.setItem('restore-scroll', savedPosition)
                      }
                      sessionStorage.removeItem('previous-page')
                      sessionStorage.removeItem('home-scroll-position')
                    } else {
                      const savedPosition = sessionStorage.getItem('blog-scroll-position')
                      if (savedPosition) {
                        sessionStorage.setItem('restore-scroll', savedPosition)
                      }
                      sessionStorage.removeItem('blog-scroll-position')
                    }
                    router.push(backUrl)
                  }}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
                  style={{ color: '#ffffff' }}
                >
                  <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zur Übersicht
                </button>

                {post.category?.name && (
                  <div className="inline-flex w-fit rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-xs font-bold text-blue-700 ring-1 ring-blue-200/50">
                    {post.category.name}
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-black text-slate-900 sm:text-4xl md:text-5xl">{post.title}</h1>

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

            <footer className="space-y-6 border-t border-slate-200 pt-6 sm:pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-slate-500 sm:text-sm">Zuletzt aktualisiert: {updatedDate}</span>

                <div className="flex items-center gap-4 sm:gap-6">
                  <button
                    onClick={handleLike}
                    disabled={isLiking}
                    className="group flex items-center gap-2 transition-all hover:scale-110 disabled:opacity-50"
                  >
                    <svg
                      className={`h-5 w-5 transition-all sm:h-6 sm:w-6 ${isLiked ? 'text-red-500 fill-current scale-125' : 'text-red-500'}`}
                      fill={isLiked ? 'currentColor' : 'none'}
                      stroke={isLiked ? 'none' : 'currentColor'}
                      strokeWidth={isLiked ? 0 : 2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <span className={`text-sm font-semibold sm:text-base ${isLiked ? 'text-red-500' : 'text-slate-700'}`}>{likes}</span>
                  </button>

                  <div className="flex items-center gap-2 text-blue-500">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm font-semibold text-slate-700 sm:text-base">{views}</span>
                  </div>
                </div>
              </div>

              {/* Back to overview button at the bottom */}
              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={() => {
                    // Restore scroll position based on where we came from
                    if (backUrl === '/') {
                      const savedPosition = sessionStorage.getItem('home-scroll-position')
                      if (savedPosition) {
                        sessionStorage.setItem('restore-scroll', savedPosition)
                      }
                      sessionStorage.removeItem('previous-page')
                      sessionStorage.removeItem('home-scroll-position')
                    } else {
                      const savedPosition = sessionStorage.getItem('blog-scroll-position')
                      if (savedPosition) {
                        sessionStorage.setItem('restore-scroll', savedPosition)
                      }
                      sessionStorage.removeItem('blog-scroll-position')
                    }
                    router.push(backUrl)
                  }}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:w-auto"
                  style={{ color: '#ffffff' }}
                >
                  <svg className="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zur Übersicht
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </article>
  )
}
