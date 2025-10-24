import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import FeaturedPostCard from '@/components/FeaturedPostCard';
import ScrollRestoration from '@/components/ScrollRestoration';

export const dynamic = 'force-dynamic';

async function getFeaturedPosts() {
  await dbConnect();
  const posts = await Post.find({ status: 'published', featured: true })
    .populate('category', 'name slug')
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  // Fully serialize to plain objects for client components
  return JSON.parse(JSON.stringify(posts.map(post => ({
    _id: post._id.toString(),
    title: post.title || '',
    excerpt: post.excerpt || '',
    slug: post.slug || '',
    coverImage: post.coverImage || null,
    readTime: post.readTime || 5,
    author: post.author ? {
      _id: post.author._id?.toString() || '',
      name: post.author.name || 'Unknown'
    } : null,
    category: post.category ? {
      _id: post.category._id?.toString() || '',
      name: post.category.name || '',
      slug: post.category.slug || ''
    } : null,
    publishedAt: post.publishedAt?.toISOString() || null,
    createdAt: post.createdAt?.toISOString() || null,
    updatedAt: post.updatedAt?.toISOString() || null
  }))));
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="min-h-screen">
      <ScrollRestoration />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-16 pt-24 sm:pb-20 sm:pt-32">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl animation-delay-4000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/20 sm:mb-8 sm:px-4 sm:py-2 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="hidden sm:inline">Java DevOps Engineer • AWS Certified • Homelab Enthusiast</span>
              <span className="sm:hidden">DevOps & Cloud</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:mb-8 sm:text-6xl lg:text-7xl xl:text-8xl">
              Von der Theorie
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                zur Praxis
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-blue-100 sm:mb-12 sm:text-xl lg:text-2xl">
              AWS, DevOps, Self-Hosting & Homelab.<br className="hidden sm:block" />
              Keine Marketing-Floskeln. Nur <span className="font-bold text-white">echte Projekte</span>,
              <span className="font-bold text-white"> echte Probleme</span>, echte Lösungen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/posts"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
                style={{ color: '#ffffff' }}
              >
                Zum Knowledge Hub
              </Link>

              <Link
                href="/blog"
                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
                style={{ color: '#ffffff' }}
              >
                Meine Projekte
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 text-center sm:mt-16 sm:grid-cols-4 sm:gap-8">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
                <div className="text-2xl font-bold text-white sm:text-3xl">12+</div>
                <div className="mt-1 text-xs text-blue-200 sm:text-sm">Tech Guides</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
                <div className="text-2xl font-bold text-white sm:text-3xl">3</div>
                <div className="mt-1 text-xs text-blue-200 sm:text-sm">AWS Certs</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
                <div className="text-2xl font-bold text-white sm:text-3xl">∞</div>
                <div className="mt-1 text-xs text-blue-200 sm:text-sm">Docker Container</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
                <div className="text-2xl font-bold text-white sm:text-3xl">24/7</div>
                <div className="mt-1 text-xs text-blue-200 sm:text-sm">Homelab Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-slate-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:mb-4 sm:text-4xl">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tutorials</span>
            </h2>
            <p className="text-base text-slate-600 sm:text-lg">Die beliebtesten Guides - battle-tested und production-ready</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post, index) => (
              <FeaturedPostCard key={post._id} post={post} index={index} />
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/posts"
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
              style={{ color: '#ffffff' }}
            >
              Alle Tutorials ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Tech Stack */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:mb-12">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Was du hier findest</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {/* AWS & Cloud */}
            <div className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">AWS & Cloud</h3>
              <p className="text-sm text-slate-600">Zertifizierungen, Best Practices, Real-World Setups</p>
            </div>

            {/* DevOps & Docker */}
            <div className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">DevOps & Docker</h3>
              <p className="text-sm text-slate-600">CI/CD, Container, Kubernetes, Infrastructure as Code</p>
            </div>

            {/* Homelab & NAS */}
            <div className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-400 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Homelab & NAS</h3>
              <p className="text-sm text-slate-600">Synology, Self-Hosting, Private Cloud</p>
            </div>

            {/* Networking */}
            <div className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">Networking</h3>
              <p className="text-sm text-slate-600">VPN, Reverse Proxy, Traefik, Tailscale</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
