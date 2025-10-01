'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const [lastSearch, setLastSearch] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLastSearch(term.trim());
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="nav-search">
          Search posts
        </label>
        <input
          id="nav-search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-white/70 focus:border-white focus:outline-none"
          type="search"
          placeholder="Search posts"
        />
        <button
          type="submit"
          className="rounded-md bg-white px-3 py-2 font-semibold text-gray-900 transition hover:bg-gray-200"
        >
          Go
        </button>
      </form>
      {lastSearch && (
        <p className="text-white/80">
          Simulated search for: <span className="font-semibold">{lastSearch}</span>
        </p>
      )}
    </div>
  );
}
