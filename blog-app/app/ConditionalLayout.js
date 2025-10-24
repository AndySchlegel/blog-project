'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default function ConditionalLayout ({ children }) {
  const pathname = usePathname()
  const isSiteAccessPage = pathname === '/site-access'

  // Pages where we don't want to show the sidebar
  const pagesWithoutSidebar = ['/login', '/register', '/impressum', '/datenschutz']
  const shouldShowSidebar = !pagesWithoutSidebar.includes(pathname)

  if (isSiteAccessPage) {
    return children
  }

  return (
    <>
      <Navigation />
      {shouldShowSidebar ? (
        <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-[3fr_1fr]">
          <main className="space-y-10">{children}</main>
          <aside className="hidden lg:block">
            <Sidebar />
          </aside>
        </div>
      ) : (
        <main className="space-y-10">{children}</main>
      )}
      <Footer />
    </>
  )
}
