import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const dateFormatter = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin' })

async function fetchPostBySlug (slug) {
  const headerList = headers()
  const host = headerList.get('host')
  const forwardedProtocol = headerList.get('x-forwarded-proto')

  if (!host) {
    throw new Error('Host header fehlt, Blogpost kann nicht geladen werden.')
  }

  const protocol = forwardedProtocol ?? (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
  const response = await fetch(`${protocol}://${host}/api/posts/${slug}`, {
    cache: 'no-store'
  })

  if (response.status === 404) {
    notFound()
  }

  if (!response.ok) {
    throw new Error('Blogpost konnte nicht geladen werden.')
  }

  const payload = await response.json()
  return payload.data
}

export default async function BlogPostPage ({ params }) {
  const post = await fetchPostBySlug(params.slug)

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
    <article className="space-y-10 rounded border border-slate-200 bg-white p-8 shadow-sm">
      <header className="space-y-4">
        <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:underline">
          ← Zurück zur Übersicht
        </Link>

        <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span>von {post.author?.name ?? 'Unbekannt'}</span>
          <span>•</span>
          <span>{publishedDate}</span>
          {post.category?.name && (
            <>
              <span>•</span>
              <Link
                href={categorySlug ? `/blog?category=${encodeURIComponent(categorySlug)}` : '/blog'}
                className="text-blue-600 hover:underline"
              >
                {post.category.name}
              </Link>
            </>
          )}
        </div>

        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-slate-200">
          <Image
            src={coverImage}
            alt={`Coverbild für ${post.title}`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 768px, 100vw"
            unoptimized={coverImage.startsWith('http')}
          />
        </div>
      )}

      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => <p key={`paragraph-${index}`}>{paragraph}</p>)
        ) : (
          <p>Für diesen Beitrag liegt noch kein Inhalt vor.</p>
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
        <span>Zuletzt aktualisiert: {updatedDate}</span>
        <span>
          ❤️ {post.metrics?.likes ?? 0} Likes • 👀 {post.metrics?.views ?? 0} Views
        </span>
      </footer>
    </article>
  )
}
