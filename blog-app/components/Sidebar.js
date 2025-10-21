'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

const categoryIcons = {
  'aws-cloud': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'devops': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'homelab': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  'networking': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  'tools': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'certifications': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
};

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
      {/* Categories Card */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Kategorien
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Filtern nach Thema
          </p>
        </div>

        {error && (
          <div className="p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <ul className="space-y-1 p-4">
          {categories.map((category) => (
            <li key={category._id}>
              <Link
                href={`/posts?category=${encodeURIComponent(category.slug)}`}
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700"
              >
                {categoryIcons[category.slug] || (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                )}
                <span className="flex-1">{category.name}</span>
                <svg className="h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </li>
          ))}
          {categories.length === 0 && !error && (
            <li className="px-4 py-8 text-center text-sm text-slate-400">
              Noch keine Kategorien
            </li>
          )}
        </ul>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Quick Stats */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white shadow-lg">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider opacity-90">Tech Stack</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">AWS</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-4/5 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Docker</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-full rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Linux</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-4/5 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Kubernetes</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-3/5 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-900">
          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {['aws', 'docker', 'synology', 'tailscale', 'traefik', 'n8n', 'homelab', 'linux'].map((tag) => (
            <span
              key={tag}
              className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-all hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
