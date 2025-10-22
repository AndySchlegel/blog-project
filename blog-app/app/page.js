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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-20 pt-32">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl animation-delay-4000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              Java DevOps Engineer • AWS Certified • Homelab Enthusiast
            </div>

            {/* Main Heading */}
            <h1 className="mb-8 text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
              Von der Theorie
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                zur Praxis
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-blue-100 sm:text-2xl">
              AWS, DevOps, Self-Hosting & Homelab.<br />
              Keine Marketing-Floskeln. Nur <span className="font-bold text-white">echte Projekte</span>,
              <span className="font-bold text-white"> echte Probleme</span>, echte Lösungen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/posts"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 shadow-2xl transition-all hover:scale-105 hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Zum Knowledge Hub</span>
                <svg className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity group-hover:opacity-20" />
              </Link>

              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20"
              >
                <span>Meine Projekte</span>
                <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">12+</div>
                <div className="mt-1 text-sm text-blue-200">Tech Guides</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="mt-1 text-sm text-blue-200">AWS Certs</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">∞</div>
                <div className="mt-1 text-sm text-blue-200">Docker Container</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="mt-1 text-sm text-blue-200">Homelab Uptime</div>
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
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-slate-900">
              Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tutorials</span>
            </h2>
            <p className="text-lg text-slate-600">Die beliebtesten Guides - battle-tested und production-ready</p>
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
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              Alle Tutorials ansehen
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links / Tech Stack */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Was du hier findest</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '☁️', title: 'AWS & Cloud', desc: 'Zertifizierungen, Best Practices, Real-World Setups' },
              { icon: '🐳', title: 'DevOps & Docker', desc: 'CI/CD, Container, Kubernetes, Infrastructure as Code' },
              { icon: '🏠', title: 'Homelab & NAS', desc: 'Synology, Self-Hosting, Private Cloud' },
              { icon: '🔒', title: 'Networking', desc: 'VPN, Reverse Proxy, Traefik, Tailscale' }
            ].map((item, index) => (
              <div
                key={index}
                className="group rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-xl"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
