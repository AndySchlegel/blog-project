'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (term.trim()) {
      router.push(`/blog?search=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form className="hidden md:block" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="nav-search">
        Search posts
      </label>
      <div className="relative">
        <input
          id="nav-search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-2 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          type="search"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
          aria-label="Search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
