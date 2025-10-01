'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Response not ok');
        }
        const result = await response.json();
        setCategories(Array.isArray(result.data) ? result.data : []);
      } catch (fetchError) {
        console.error('Fehler beim Laden der Kategorien:', fetchError);
        setError('Kategorien konnten nicht geladen werden.');
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="flex flex-col gap-6">
      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Kategorien</h2>
        <p className="mt-2 text-sm text-gray-600">
          Wähle eine Kategorie, um die API-Filter zu testen.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <ul className="mt-4 space-y-2 text-sm text-blue-600">
          {categories.map((category) => (
            <li key={category._id}>
              <Link href={`/posts?category=${encodeURIComponent(category.slug)}`} className="hover:underline">
                {category.name}
              </Link>
            </li>
          ))}
          {categories.length === 0 && !error && (
            <li className="text-gray-400">Noch keine Kategorien</li>
          )}
        </ul>
      </section>
      <NewsletterSignup />
    </aside>
  );
}
