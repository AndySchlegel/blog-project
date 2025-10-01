import PostCard from './PostCard';

export default function PostList({ posts }) {
  if (!posts.length) {
    return (
      <p className="rounded-md border border-dashed border-gray-300 p-6 text-center text-gray-500">
        No posts yet. Try adding some content or checking back later.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
