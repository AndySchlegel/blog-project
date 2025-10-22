'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'

export default function ConditionalLayout ({ children }) {
  const pathname = usePathname()
  const isSiteAccessPage = pathname === '/site-access'

  if (isSiteAccessPage) {
    return children
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-[3fr_1fr]">
        <main className="space-y-10">{children}</main>
        <Sidebar />
      </div>
      <Footer />
    </>
  )
}
