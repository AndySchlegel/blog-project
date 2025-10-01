import { notFound } from 'next/navigation';
import { getPostById, mockPosts } from '@/lib/mockPosts';

export function generateStaticParams() {
  return mockPosts.map((post) => ({ id: String(post.id) }));
}

export default function PostPage({ params }) {
  const post = getPostById(params.id);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>
        <div className="text-sm text-slate-500">
          By <span className="font-semibold text-slate-700">{post.author}</span> • {post.date}
        </div>
      </header>
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        <p className="font-semibold">Dynamic route recap</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><code className="rounded bg-blue-200 px-1 text-xs">app/posts/[id]/page.js</code> maps to <code className="rounded bg-blue-200 px-1 text-xs">/posts/123</code>.</li>
          <li><code className="rounded bg-blue-200 px-1 text-xs">params.id</code> is always a string.</li>
          <li><code className="rounded bg-blue-200 px-1 text-xs">notFound()</code> renders <code className="rounded bg-blue-200 px-1 text-xs">not-found.js</code>.</li>
        </ul>
      </section>
    </article>
  );
}
