import Link from 'next/link';
import PostList from '@/components/PostList';
import ButtonShowcase from '@/components/ButtonShowcase';
import { mockPosts } from '@/lib/mockPosts';

export default function Home() {
  const featuredPosts = mockPosts.slice(0, 3);

  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-600">Next.js App Router</p>
        <h1 className="text-4xl font-bold text-slate-900">Welcome to My Tech Blog</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Sharing knowledge about web development, React, and engineering practices. Explore the example routes,
          components, and styling strategies used to teach the Next.js 13+ App Router.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            Browse Posts →
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:border-blue-400 hover:text-blue-700"
          >
            Meet the Team
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Featured Posts</h2>
          <Link href="/posts" className="text-sm font-semibold text-blue-600 hover:underline">
            View all posts
          </Link>
        </header>
        <PostList posts={featuredPosts} />
      </section>

      <ButtonShowcase />
    </main>
  );
}
