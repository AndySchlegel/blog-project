'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Erfolgreich angemeldet! 🎉');
        setEmail('');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Netzwerkfehler. Bitte versuche es später erneut.');
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative">
        {/* Newsletter Section - Only visible on mobile (hidden on lg+ where sidebar shows) */}
        <div className="border-b border-white/10 lg:hidden">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                Bleib auf dem Laufenden
              </h3>
              <p className="mb-6 text-sm text-slate-300 md:text-base">
                Neue Tutorials, Cloud-Tipps und DevOps-Tricks direkt in dein Postfach. Keine Spam, versprochen!
              </p>

              <form onSubmit={handleNewsletterSubmit} className="mx-auto max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="deine@email.de"
                    required
                    disabled={status === 'loading'}
                    className="flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 backdrop-blur-sm transition-all focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                    style={{ color: '#ffffff' }}
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                    ) : (
                      'Abonnieren'
                    )}
                  </button>
                </div>

                {message && (
                  <div className={`mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm ${
                    status === 'success'
                      ? 'bg-green-500/20 text-green-200 ring-1 ring-green-500/30'
                      : 'bg-red-500/20 text-red-200 ring-1 ring-red-500/30'
                  }`}>
                    {status === 'success' ? (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-2xl font-bold shadow-xl">
                  A
                </div>
                <div>
                  <div className="text-xl font-bold">Andy&apos;s Tech Hub</div>
                  <div className="text-sm text-blue-200">DevOps & Cloud Engineering</div>
                </div>
              </div>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-300">
                Von AWS Zertifizierungen bis Self-Hosting: Praktische Guides, die wirklich funktionieren.
                Keine Theorie - nur echte Projekte und echte Lösungen.
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/AndySchlegel" target="_blank" rel="noopener noreferrer"
                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"
                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer"
                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-200">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-slate-300 transition hover:text-white">Home</Link></li>
                <li><Link href="/posts" className="text-slate-300 transition hover:text-white">Knowledge Base</Link></li>
                <li><Link href="/blog" className="text-slate-300 transition hover:text-white">Blog</Link></li>
                <li><Link href="/about" className="text-slate-300 transition hover:text-white">About Me</Link></li>
                <li><Link href="/contact" className="text-slate-300 transition hover:text-white">Contact</Link></li>
              </ul>
            </div>

            {/* Topics */}
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-200">Topics</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-300">AWS & Cloud</span></li>
                <li><span className="text-slate-300">DevOps & CI/CD</span></li>
                <li><span className="text-slate-300">Homelab & NAS</span></li>
                <li><span className="text-slate-300">Self-Hosting</span></li>
                <li><span className="text-slate-300">Networking</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
              <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
                <p className="text-slate-400">
                  &copy; {currentYear} Andy&apos;s Tech Hub. Made with ❤️ and lots of ☕
                </p>
                <div className="flex items-center gap-3 text-xs">
                  <Link href="/impressum" className="text-slate-400 transition-colors hover:text-white">
                    Impressum
                  </Link>
                  <span className="text-slate-600">•</span>
                  <Link href="/datenschutz" className="text-slate-400 transition-colors hover:text-white">
                    Datenschutz
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Built with</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">Next.js 15</span>
                  <span>•</span>
                  <span className="font-semibold text-white">React 19</span>
                  <span>•</span>
                  <span className="font-semibold text-white">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
