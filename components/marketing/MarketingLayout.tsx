'use client'

import Header from './Header'
import { Footer } from './Footer'

/**
 * MarketingLayout Component
 * Main layout for marketing pages with:
 * - Header (clean navigation)
 * - Main content area
 * - Footer (no newsletter)
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      {/* Navigation - Clean Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer - Clean, No Newsletter */}
      <Footer />
    </div>
  )
}
