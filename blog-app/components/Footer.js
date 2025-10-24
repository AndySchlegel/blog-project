import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getUTCFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative">
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
