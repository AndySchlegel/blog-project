import { Suspense } from 'react';
import PostsContent from './PostsContent';

export default function PostsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-lg font-medium text-slate-600">Lade Posts...</p>
        </div>
      </div>
    }>
      <PostsContent />
    </Suspense>
  );
}
