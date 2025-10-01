'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage () {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  if (loading) {
    return <div className="rounded border bg-white p-8">Lade dein Dashboard…</div>
  }

  if (!user) {
    return (
      <div className="rounded border bg-white p-8 text-sm text-slate-600">
        <p>Du bist aktuell nicht eingeloggt.</p>
        <Link href="/login" className="mt-4 inline-block text-blue-600 hover:underline">
          Zum Login
        </Link>
      </div>
    )
  }

  return (
    <section className="space-y-6 rounded border bg-white p-8 shadow">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Hallo {user.name}</h1>
        <p className="text-sm text-slate-600">Hier hast du schnellen Zugriff auf deine Beiträge und Kontoinformationen.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800">Kontoinformationen</h2>
          <dl className="mt-3 space-y-2 text-sm text-slate-600">
            <div>
              <dt className="font-medium text-slate-700">Name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">E-Mail</dt>
              <dd>{user.email}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-800">Schnellzugriff</h2>
          <ul className="mt-3 space-y-2 text-sm text-blue-600">
            <li>
              <Link href="/blog" className="hover:underline">
                Blog-Beiträge durchsuchen
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Neuen Beitrag verfassen
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Abmelden
      </button>
    </section>
  )
}
