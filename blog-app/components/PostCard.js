import Image from 'next/image';
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {post.category}
        </span>
        <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
        <p className="flex-1 text-sm text-gray-600">{post.excerpt}</p>
        <div className="text-xs text-gray-500">
          <span>{post.author}</span> • <span>{post.date}</span>
        </div>
        <Link href={`/posts/${post.id}`} className="text-sm font-semibold text-blue-600 hover:underline">
          Read more →
        </Link>
      </div>
    </article>
  );
}
