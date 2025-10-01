'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const INITIAL_FORM = {
  email: '',
  password: ''
}

export default function LoginPage () {
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await login({
        email: formData.email,
        password: formData.password
      })
      router.push(callbackUrl)
    } catch (error) {
      console.error('Login fehlgeschlagen:', error)
      setErrorMessage(error.message || 'Login fehlgeschlagen.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded border bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Login</h1>

      {errorMessage && (
        <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="du@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Passwort
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird eingeloggt…' : 'Einloggen'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Noch keinen Account?{' '}
        <Link href="/register" className="font-semibold text-blue-600 hover:underline">
          Jetzt registrieren
        </Link>
      </p>
    </section>
  )
}
