'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    href: '/posts',
    label: 'Knowledge',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    href: '/blog',
    label: 'Blog',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    href: '/about',
    label: 'About',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  }
];

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white shadow-lg transition-transform group-hover:scale-110">
              A
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-slate-900">Andy&apos;s Tech Hub</div>
              <div className="text-xs text-slate-500">DevOps & Cloud</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <SearchBar />

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className={`hidden rounded-xl px-4 py-2 text-sm font-medium transition-all sm:block ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    pathname === '/login'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  style={pathname === '/login' ? { color: '#ffffff' } : {}}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    pathname === '/register'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  style={pathname === '/register' ? { color: '#ffffff' } : {}}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-slate-200 md:hidden">
        <ul className="flex items-center justify-around py-2">
          {links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="scale-110">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
