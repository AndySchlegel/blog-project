import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import Category from '@/models/Category';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

async function getFeaturedPosts() {
  await dbConnect();
  const posts = await Post.find({ status: 'published', featured: true })
    .populate('category', 'name slug')
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  return posts.map(post => ({
    ...post,
    _id: post._id.toString(),
    author: post.author ? { ...post.author, _id: post.author._id.toString() } : null,
    category: post.category ? { ...post.category, _id: post.category._id.toString() } : null,
    publishedAt: post.publishedAt?.toISOString() || null,
  }));
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="min-h-screen">
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
                className="rounded-full border-2 border-white bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
              >
                Zum Knowledge Hub
              </Link>

              <Link
                href="/blog"
                className="rounded-full border-2 border-white bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
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
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
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

                    {/* Category Badge */}
                    {post.category && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-slate-900 backdrop-blur-sm">
                        {post.category.name}
                      </span>
                    )}

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
                  <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h3>

                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime || 5} Min
                    </span>

                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors group-hover:text-purple-600">
                      Lesen
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="/posts"
              className="rounded-full border-2 border-slate-600 bg-slate-600/10 px-6 py-3 font-bold text-slate-700 backdrop-blur-sm transition-all hover:scale-105 hover:bg-slate-600/20"
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
