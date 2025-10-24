'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

function PostMetrics({ postId, initialLikes, initialViews }) {
  const [likes, setLikes] = useState(initialLikes);
  const [views, setViews] = useState(initialViews);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    if (isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      if (response.ok) {
        const result = await response.json();
        setLikes(result.data.likeCount);
        setIsLiked(result.data.liked);
      }
    } catch (error) {
      console.error('Fehler beim Liken:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm text-slate-500">
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="flex items-center gap-1.5 transition-all hover:scale-110 disabled:opacity-50"
      >
        <svg
          className={`h-5 w-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-red-500'}`}
          fill={isLiked ? 'currentColor' : 'none'}
          stroke={isLiked ? 'none' : 'currentColor'}
          strokeWidth={isLiked ? 0 : 2}
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        <span className={isLiked ? 'font-bold text-red-500' : ''}>{likes}</span>
      </button>
      <span className="flex items-center gap-1.5">
        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {views}
      </span>
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  day: '2-digit',
  month: 'long',
  year: 'numeric'
});

const INITIAL_FORM = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  status: 'published'
};

export default function BlogPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchQuery);
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading: authLoading } = useAuth();

  // Update filter when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      setFilter(searchQuery);
    }
  }, [searchQuery]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/posts?status=published&limit=100', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Serverantwort fehlgeschlagen');
      }

      const result = await response.json();
      setPosts(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Fehler beim Laden der Blog-Posts:', error);
      setErrorMessage('Posts konnten nicht geladen werden. Bitte später erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setCategoriesError('');

    try {
      const response = await fetch('/api/categories', {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error('Serverantwort fehlgeschlagen');
      }

      const result = await response.json();
      setCategories(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error('Fehler beim Laden der Kategorien:', error);
      setCategories([]);
      setCategoriesError('Kategorien konnten nicht geladen werden.');
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setFormSuccess('');

    try {
      const payload = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        status: formData.status
      };

      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (tags.length > 0) {
        payload.tags = tags;
      }

      if (payload.status === 'published') {
        payload.publishedAt = new Date().toISOString();
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        setFormErrors(result.details || {});
        throw new Error(result.error || 'Speichern fehlgeschlagen.');
      }

      setFormData(INITIAL_FORM);
      setFormErrors({});
      setFormSuccess('Beitrag wurde erfolgreich gespeichert!');
      await fetchPosts();
    } catch (error) {
      console.error('Fehler beim Speichern des Posts:', error);
      setFormErrors((previous) => ({ ...previous, general: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (!filter) return true;

    const searchTerm = filter.toLowerCase();
    const title = (post.title ?? '').toLowerCase();
    const content = (post.content ?? '').toLowerCase();
    const excerpt = (post.excerpt ?? '').toLowerCase();
    const category = (post.category?.name ?? '').toLowerCase();
    const tags = (post.tags ?? []).join(' ').toLowerCase();

    return title.includes(searchTerm) ||
           content.includes(searchTerm) ||
           excerpt.includes(searchTerm) ||
           category.includes(searchTerm) ||
           tags.includes(searchTerm);
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-lg font-medium text-slate-600">Lade Blog-Posts...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-6xl">⚠️</div>
          <p className="mb-6 text-lg text-red-600">{errorMessage}</p>
          <button
            onClick={fetchPosts}
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-16 pt-20 sm:pb-20 sm:pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl animation-delay-2000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm ring-1 ring-white/20 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="hidden sm:inline">Persönliche Erfahrungen & Projekt-Logs</span>
              <span className="sm:hidden">Tech Blog</span>
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:mb-6 sm:text-6xl lg:text-7xl">
              Mein Tech <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blog</span>
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-blue-100 sm:text-xl">
              Behind the Scenes meiner Projekte. Von ersten Ideen über Debugging-Sessions bis zum Production Deployment.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Suche nach Titel, Kategorie, Tags oder Inhalt..."
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-12 text-slate-900 shadow-lg transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
            />
            {filter && (
              <button
                onClick={() => setFilter('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors hover:text-slate-600"
                aria-label="Suche zurücksetzen"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {filter && filteredPosts.length > 0 && (
            <div className="mt-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden:
              </p>
              <div className="flex flex-wrap gap-2">
                {filteredPosts.slice(0, 5).map((post) => (
                  <Link
                    key={post._id}
                    href={`#post-${post._id}`}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200 transition-all hover:bg-blue-100 hover:scale-105"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {post.title}
                  </Link>
                ))}
                {filteredPosts.length > 5 && (
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                    +{filteredPosts.length - 5} weitere
                  </span>
                )}
              </div>
            </div>
          )}
          {filter && filteredPosts.length === 0 && (
            <p className="mt-2 text-sm text-slate-500">
              Keine Ergebnisse für &quot;{filter}&quot;
            </p>
          )}
        </div>

        {/* Create Post Section */}
        {user && (
          <section className="mb-12 overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Neuen Beitrag erstellen
              </h2>
            </div>

            <div className="p-8">
              {formSuccess && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-800 ring-1 ring-green-200">
                  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {formSuccess}
                </div>
              )}

              {formErrors.general && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 p-4 text-red-800 ring-1 ring-red-200">
                  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {formErrors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-6">
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-bold text-slate-700">
                    Titel
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="z.B. Mein Homelab Upgrade 2024"
                    required
                  />
                  {formErrors.title && <p className="mt-2 text-sm text-red-600">{formErrors.title}</p>}
                </div>

                <div>
                  <label htmlFor="excerpt" className="mb-2 block text-sm font-bold text-slate-700">
                    Kurzbeschreibung
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="Eine kurze Zusammenfassung..."
                    rows={3}
                    required
                  />
                  {formErrors.excerpt && <p className="mt-2 text-sm text-red-600">{formErrors.excerpt}</p>}
                </div>

                <div>
                  <label htmlFor="content" className="mb-2 block text-sm font-bold text-slate-700">
                    Inhalt
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="Dein Beitrag..."
                    rows={10}
                    required
                  />
                  {formErrors.content && <p className="mt-2 text-sm text-red-600">{formErrors.content}</p>}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="mb-2 block text-sm font-bold text-slate-700">
                      Kategorie
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      required
                    >
                      <option value="">Kategorie wählen…</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {categoriesError && <p className="mt-2 text-sm text-red-600">{categoriesError}</p>}
                    {formErrors.category && <p className="mt-2 text-sm text-red-600">{formErrors.category}</p>}
                  </div>

                  <div>
                    <label htmlFor="status" className="mb-2 block text-sm font-bold text-slate-700">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    >
                      <option value="draft">Entwurf</option>
                      <option value="published">Veröffentlicht</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="mb-2 block text-sm font-bold text-slate-700">
                    Tags (kommagetrennt)
                  </label>
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    value={formData.tags}
                    onChange={handleFormChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="docker, kubernetes, homelab"
                  />
                  {formErrors.tags && <p className="mt-2 text-sm text-red-600">{formErrors.tags}</p>}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSubmitting || categories.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Speichere...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Beitrag veröffentlichen
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>
        )}

        {!authLoading && !user && (
          <div className="mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white shadow-xl">
            <svg className="mx-auto mb-4 h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="mb-3 text-2xl font-bold">Beiträge erstellen</h3>
            <p className="mb-6 text-blue-100">Melde dich an, um eigene Blog-Beiträge zu verfassen und zu teilen.</p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/login"
                className="rounded-full border-2 border-white bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Anmelden
              </Link>
              <Link
                href="/register"
                className="rounded-full border-2 border-white bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Registrieren
              </Link>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {filteredPosts.map((post) => {
            const summary = post.summary ?? `${post.excerpt ?? post.content?.substring(0, 200) ?? ''}...`;
            const publishedDate = post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : 'Unveröffentlicht';

            return (
              <article
                key={post._id}
                id={`post-${post._id}`}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl scroll-mt-24"
              >
                <div className="p-8">
                  {/* Category Badge - Right Aligned */}
                  {post.category?.name && (
                    <div className="mb-4 flex justify-end">
                      <div className="inline-flex rounded-full bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 text-xs font-bold text-blue-700 ring-1 ring-blue-200/50">
                        {post.category.name}
                      </div>
                    </div>
                  )}

                  <h2 className="mb-4 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {post.title}
                  </h2>

                  <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {post.author?.name ?? 'Andy Schlegel'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {publishedDate}
                    </span>
                  </div>

                  <p className="mb-6 line-clamp-3 leading-relaxed text-slate-600">
                    {summary}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-all hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <PostMetrics postId={post._id} initialLikes={post.metrics?.likes ?? 0} initialViews={post.metrics?.views ?? 0} />

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3"
                    >
                      Weiterlesen
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
            <div className="mb-6 text-7xl">📝</div>
            <h3 className="mb-3 text-2xl font-bold text-slate-900">Keine Posts gefunden</h3>
            <p className="text-slate-600">
              {filter ? 'Versuche einen anderen Suchbegriff.' : 'Noch keine Blog-Posts verfügbar.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
