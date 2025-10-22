'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SiteAccessPage () {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/site-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (response.ok) {
        window.location.href = '/'
      } else {
        setErrorMessage(data.error || 'Falsches Passwort')
      }
    } catch (error) {
      console.error('Fehler:', error)
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <section className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Zugang geschuetzt
        </h1>
        <p className="mb-6 text-sm text-slate-600">
          Bitte gib das Passwort ein, um auf diese Website zuzugreifen.
        </p>

        {errorMessage && (
          <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter password"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Wird geprueft...' : 'Zugriff freischalten'}
          </button>
        </form>
      </section>
    </div>
  )
}
