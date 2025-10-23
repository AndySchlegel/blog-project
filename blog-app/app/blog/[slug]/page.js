import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/BlogPostContent'

export const dynamic = 'force-dynamic'

async function fetchPostBySlug (slug) {
  const headerList = await headers()
  const host = headerList.get('host')
  const forwardedProtocol = headerList.get('x-forwarded-proto')
  const cookie = headerList.get('cookie')

  if (!host) {
    throw new Error('Host header fehlt, Blogpost kann nicht geladen werden.')
  }

  const protocol = forwardedProtocol ?? (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
  const response = await fetch(`${protocol}://${host}/api/posts/${slug}`, {
    cache: 'no-store',
    headers: {
      ...(cookie ? { cookie } : {})
    }
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
  const resolvedParams = await params
  const post = await fetchPostBySlug(resolvedParams.slug)

  return <BlogPostContent post={post} />
}
