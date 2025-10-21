'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewsletterSignup from './NewsletterSignup';

const categoryIcons = {
  'aws-cloud': '☁️',
  'devops': '🔧',
  'homelab': '🏠',
  'networking': '🔒',
  'tools': '🛠️',
  'certifications': '🏆'
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
            <span className="text-2xl">📂</span>
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
                <span className="text-xl">{categoryIcons[category.slug] || '📌'}</span>
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
        <h3 className="mb-4 text-sm font-bold text-slate-900">🏷️ Popular Tags</h3>
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
