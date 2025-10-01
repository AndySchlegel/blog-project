'use client';

export default function Error({ error, reset }) {
  return (
    <div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
      <h2 className="text-lg font-semibold">Something went wrong.</h2>
      <p className="text-sm">{error?.message || 'Please try again in a moment.'}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        Try again
      </button>
    </div>
  );
}
