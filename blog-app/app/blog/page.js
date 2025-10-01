'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

// Formatter instanziieren wir einmal, damit Server- und Client-Render denselben Zeitzonen-Output liefern
const dateFormatter = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin' })
const INITIAL_FORM = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: '',
  status: 'published'
}

export default function BlogPage () {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [categories, setCategories] = useState([])
  const [categoriesError, setCategoriesError] = useState('')
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [formErrors, setFormErrors] = useState({})
  const [formSuccess, setFormSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, loading: authLoading } = useAuth()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/posts?status=published&limit=100', {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Serverantwort fehlgeschlagen')
      }

      const result = await response.json()
      setPosts(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Fehler beim Laden der Blog-Posts:', error)
      setErrorMessage('Posts konnten nicht geladen werden. Bitte später erneut versuchen.')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    setCategoriesError('')

    try {
      const response = await fetch('/api/categories', {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Serverantwort fehlgeschlagen')
      }

      const result = await response.json()
      setCategories(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Fehler beim Laden der Kategorien:', error)
      setCategories([])
      setCategoriesError('Kategorien konnten nicht geladen werden. Bitte später erneut versuchen.')
    }
  }, [])

  useEffect(() => {
    // Beim ersten Rendern Posts und Kategorien laden
    fetchPosts()
    fetchCategories()
  }, [fetchPosts, fetchCategories])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})
    setFormSuccess('')

    try {
      const payload = {
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        category: formData.category,
        status: formData.status
      }

      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)

      if (tags.length > 0) {
        payload.tags = tags
      }

      if (payload.status === 'published') {
        payload.publishedAt = new Date().toISOString()
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()

      if (!response.ok) {
        setFormErrors(result.details || {})
        throw new Error(result.error || 'Speichern fehlgeschlagen.')
      }

      setFormData(INITIAL_FORM)
      setFormErrors({})
      setFormSuccess('Beitrag wurde gespeichert.')
      await fetchPosts()
    } catch (error) {
      console.error('Fehler beim Speichern des Posts:', error)
      setFormErrors((previous) => ({ ...previous, general: error.message }))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Client-seitige Filterung nach Titel oder Inhalt
  const filteredPosts = posts.filter((post) => {
    const haystack = `${post.title ?? ''} ${post.content ?? ''}`.toLowerCase()
    return haystack.includes(filter.toLowerCase())
  })

  if (loading) {
    return <div className="p-8">Lade Blog-Posts...</div>
  }

  if (errorMessage) {
    return (
      <div className="p-8">
        <p className="text-red-600 mb-4">{errorMessage}</p>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Erneut versuchen
        </button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Einfaches Suchfeld zur client-seitigen Filterung */}
      <input
        type="text"
        placeholder="Suche Posts..."
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <section className="mb-10 rounded border p-6">
        <h2 className="text-2xl font-semibold mb-4">Neuen Beitrag erstellen</h2>

        {authLoading && <p className="text-sm text-slate-600">Prüfe Anmeldestatus…</p>}

        {!authLoading && !user && (
          <div className="rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <p className="font-medium">Bitte anmelden, um Beiträge zu verfassen.</p>
            <p className="mt-2">
              <Link href="/login" className="font-semibold underline">Zum Login</Link>{' '}
              oder{' '}
              <Link href="/register" className="font-semibold underline">jetzt registrieren</Link>.
            </p>
          </div>
        )}

        {!authLoading && user && (
          <>
            {formSuccess && (
              <p className="mb-4 rounded bg-green-100 px-3 py-2 text-green-800">{formSuccess}</p>
            )}

            {formErrors.general && (
              <p className="mb-4 rounded bg-red-100 px-3 py-2 text-red-700">{formErrors.general}</p>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label htmlFor="title" className="mb-1 block font-medium">
                  Titel
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                  placeholder="Titel des Beitrags"
                  required
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
              </div>

              <div>
                <label htmlFor="excerpt" className="mb-1 block font-medium">
                  Kurzbeschreibung
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                  placeholder="Kurze Zusammenfassung (mind. 10 Zeichen)"
                  rows={2}
                  required
                />
                {formErrors.excerpt && <p className="mt-1 text-sm text-red-600">{formErrors.excerpt}</p>}
              </div>

              <div>
                <label htmlFor="content" className="mb-1 block font-medium">
                  Inhalt
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                  placeholder="Vollständiger Inhalt (mind. 50 Zeichen)"
                  rows={6}
                  required
                />
                {formErrors.content && <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="category" className="mb-1 block font-medium">
                    Kategorie
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="w-full rounded border p-2"
                    required
                  >
                    <option value="">Kategorie wählen…</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {categoriesError && <p className="mt-1 text-sm text-red-600">{categoriesError}</p>}
                  {formErrors.category && <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>}
                </div>

                <div>
                  <label htmlFor="status" className="mb-1 block font-medium">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full rounded border p-2"
                  >
                    <option value="draft">Entwurf</option>
                    <option value="published">Veröffentlicht</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="tags" className="mb-1 block font-medium">
                  Tags (optional)
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleFormChange}
                  className="w-full rounded border p-2"
                  placeholder="z.B. react, javascript"
                />
                {formErrors.tags && <p className="mt-1 text-sm text-red-600">{formErrors.tags}</p>}
              </div>

              <button
                type="submit"
                className="self-start rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                disabled={isSubmitting || categories.length === 0}
              >
                {isSubmitting ? 'Speichere…' : 'Beitrag speichern'}
              </button>
            </form>
          </>
        )}
      </section>

      <div className="grid gap-6">
        {filteredPosts.map((post) => {
          const summary = post.summary ?? `${post.excerpt ?? post.content?.substring(0, 160) ?? ''}...`
          const publishedDate = post.publishedAt ? dateFormatter.format(new Date(post.publishedAt)) : 'unveröffentlicht'

          return (
            <article key={post._id} className="border rounded p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

              <div className="text-gray-600 text-sm mb-4">
                {/* Fallbacks, falls im Seed noch kein Autor gesetzt wurde */}
                von {post.author?.name ?? 'Unbekannt'} • {publishedDate}
                {post.category?.name && (
                  <span className="ml-2 text-xs uppercase tracking-wide text-blue-600">
                    {post.category.name}
                  </span>
                )}
              </div>

              <p className="mb-4">{summary}</p>

              <div className="flex gap-2 mb-4 flex-wrap">
                {post.tags?.map((tag) => (
                  <span key={tag} className="bg-blue-100 px-2 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span>❤️ {post.metrics?.likes ?? 0} Likes</span>
                <a href={`/blog/${post.slug}`} className="text-blue-500">
                  Weiterlesen →
                </a>
              </div>
            </article>
          )
        })}

        {filteredPosts.length === 0 && (
          <div className="text-gray-500">Keine Posts gefunden.</div>
        )}
      </div>
    </div>
  )
}
