import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="space-y-4 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="text-slate-600">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Back to home
      </Link>
    </section>
  );
}
