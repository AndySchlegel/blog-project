'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
}

function RegisterPageContent () {
  const { register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setGeneralError('')
    setErrors({})

    if (formData.password !== formData.passwordConfirm) {
      setErrors({ passwordConfirm: 'Passwörter stimmen nicht überein.' })
      setIsSubmitting(false)
      return
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm
      })

      if (result?.name) {
        router.push(callbackUrl)
      }
    } catch (error) {
      console.error('Registrierung fehlgeschlagen:', error)
      setGeneralError(error.message || 'Registrierung fehlgeschlagen.')
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-black text-slate-900 sm:text-3xl">Account erstellen</h1>
          <p className="text-xs text-slate-600 sm:text-sm">Registriere dich für Zugriff auf alle Features</p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8" suppressHydrationWarning>
          {generalError && (
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 ring-1 ring-red-200">
              <svg className="h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium text-red-800">{generalError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
            <div suppressHydrationWarning>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Dein Name"
                required
                minLength={2}
                suppressHydrationWarning
              />
              {errors.name && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
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
              {errors.email && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
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
                placeholder="Mindestens 6 Zeichen"
                required
                minLength={6}
                suppressHydrationWarning
              />
              {errors.password && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="mb-2 block text-sm font-semibold text-slate-700">
                Passwort bestätigen
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Passwort erneut eingeben"
                required
                suppressHydrationWarning
              />
              {errors.passwordConfirm && (
                <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.passwordConfirm}
                </p>
              )}
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
                  Registriere…
                </span>
              ) : (
                'Account anlegen'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Bereits registriert?{' '}
          <Link href="/login" className="font-bold text-blue-600 transition-colors hover:text-purple-600">
            Zum Login
          </Link>
        </p>
      </section>
    </div>
  )
}

function RegisterPageFallback () {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-12">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-slate-200" />
          <div className="mb-2 mx-auto h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mx-auto h-4 w-56 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="animate-pulse space-y-5 rounded-3xl bg-white p-8 shadow-xl">
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-20 rounded-xl bg-slate-200" />
          <div className="h-12 rounded-xl bg-slate-200" />
        </div>
      </section>
    </div>
  )
}

export default function RegisterPage () {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<RegisterPageFallback />}>
        <RegisterPageContent />
      </Suspense>
    </div>
  )
}
