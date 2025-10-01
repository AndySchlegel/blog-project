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
    <section className="mx-auto max-w-md rounded border bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Registrieren</h1>

      {generalError && (
        <p className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{generalError}</p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="Dein Name"
            required
            minLength={2}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

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
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
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
            placeholder="Mindestens 6 Zeichen"
            required
            minLength={6}
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="passwordConfirm" className="mb-1 block text-sm font-medium text-slate-700">
            Passwort bestätigen
          </label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
            placeholder="Passwort erneut eingeben"
            required
          />
          {errors.passwordConfirm && <p className="mt-1 text-xs text-red-600">{errors.passwordConfirm}</p>}
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registriere…' : 'Account anlegen'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-600">
        Bereits registriert?{' '}
        <Link href="/login" className="font-semibold text-blue-600 hover:underline">
          Zum Login
        </Link>
      </p>
    </section>
  )
}

function RegisterPageFallback () {
  return (
    <section className="mx-auto max-w-md rounded border bg-white p-8 shadow">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-200" />
        <div className="h-10 rounded bg-slate-200" />
      </div>
    </section>
  )
}

export default function RegisterPage () {
  return (
    <Suspense fallback={<RegisterPageFallback />}>
      <RegisterPageContent />
    </Suspense>
  )
}
