import Link from 'next/link';
import PostList from '@/components/PostList';
import Pagination from '@/components/Pagination';
import { getPaginatedPosts, mockPosts } from '@/lib/mockPosts';

export default function PostsPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const { items, currentPage, totalPages } = getPaginatedPosts(page, 6);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">All Posts</h1>
        <p className="text-slate-600">
          This page demonstrates file-based routing, server components, and array mapping. The mock data lives in
          <code className="ml-2 rounded bg-slate-200 px-2 py-1 text-xs">lib/mockPosts.js</code> to mirror a future database.
        </p>
        <p className="text-sm text-slate-500">
          Total articles in mock data: <span className="font-semibold text-slate-700">{mockPosts.length}</span>
        </p>
      </header>
      <PostList posts={items} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        <p className="font-semibold">Teaching tip</p>
        <p>
          Ask students what happens when they forget the <code className="mx-1 rounded bg-blue-200 px-1 text-xs">key</code> prop
          inside <code className="mx-1 rounded bg-blue-200 px-1 text-xs">map()</code>. Compare using IDs vs. indices and discuss
          how React reconciles lists.
        </p>
      </div>
      <Link href="/posts/1" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
        Jump to a dynamic post example →
      </Link>
    </section>
  );
}
