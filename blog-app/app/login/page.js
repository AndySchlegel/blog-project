'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const INITIAL_FORM = {
  email: '',
  password: ''
}

function LoginPageContent () {
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
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12" suppressHydrationWarning>
      <section className="w-full max-w-md" suppressHydrationWarning>
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sm:mb-4 sm:h-16 sm:w-16">
            <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl">Willkommen zurück</h1>
          <p className="text-xs text-slate-600 sm:text-sm">Melde dich an, um fortzufahren</p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8" suppressHydrationWarning>
          {errorMessage && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 ring-1 ring-red-200">
              <svg className="h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
            <div suppressHydrationWarning>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="du@example.com"
                required
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                Passwort
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
                required
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              disabled={isSubmitting}
              style={{ color: '#ffffff' }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Wird eingeloggt…
                </span>
              ) : (
                'Einloggen'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Noch keinen Account?{' '}
          <Link href="/register" className="font-bold text-blue-600 transition-colors hover:text-purple-600">
            Jetzt registrieren
          </Link>
        </p>
      </section>
    </div>
  )
}

function LoginPageFallback () {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-slate-200" />
          <div className="mb-2 mx-auto h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mx-auto h-4 w-48 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="animate-pulse space-y-6 rounded-3xl bg-white p-8 shadow-xl">
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-12 rounded-xl bg-slate-200" />
        </div>
      </section>
    </div>
  )
}

export default function LoginPage () {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<LoginPageFallback />}>
        <LoginPageContent />
      </Suspense>
    </div>
  )
}
