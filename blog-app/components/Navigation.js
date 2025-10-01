'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { useAuth } from '@/contexts/AuthContext';

const links = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
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
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="text-2xl font-bold">Tech Blog</Link>
          <ul className="flex items-center gap-6 text-sm md:text-base">
            {links.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition hover:text-blue-300 ${
                      isActive ? 'text-blue-400 underline underline-offset-4' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <SearchBar />
          <div className="flex items-center gap-4 text-sm md:text-base">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`transition hover:text-blue-300 ${pathname.startsWith('/dashboard') ? 'text-blue-400 underline underline-offset-4' : 'text-white'}`}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded border border-white px-3 py-1 text-sm transition hover:border-blue-400 hover:text-blue-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`transition hover:text-blue-300 ${pathname.startsWith('/login') ? 'text-blue-400 underline underline-offset-4' : 'text-white'}`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`transition hover:text-blue-300 ${pathname.startsWith('/register') ? 'text-blue-400 underline underline-offset-4' : 'text-white'}`}
                >
                  Registrieren
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
