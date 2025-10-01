import Link from 'next/link';

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <nav className="mt-8 flex items-center justify-between" aria-label="Pagination">
      <Link
        href={prevPage ? `/posts?page=${prevPage}` : '#'}
        className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
          prevPage ? 'bg-blue-600 text-white hover:bg-blue-500' : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
        aria-disabled={!prevPage}
      >
        Previous
      </Link>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={nextPage ? `/posts?page=${nextPage}` : '#'}
        className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
          nextPage ? 'bg-blue-600 text-white hover:bg-blue-500' : 'cursor-not-allowed bg-gray-200 text-gray-400'
        }`}
        aria-disabled={!nextPage}
      >
        Next
      </Link>
    </nav>
  );
}
