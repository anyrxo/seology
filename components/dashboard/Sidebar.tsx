'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import NotificationCenter from '@/components/notifications/NotificationCenter'

interface SidebarLink {
  href: string
  label: string
  icon: string
}

const sidebarLinks: SidebarLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/chat', label: 'AI Chat', icon: '💬' },
  { href: '/dashboard/ai-analysis', label: 'AI Analysis', icon: '🤖' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/sites', label: 'Sites', icon: '🌐' },
  { href: '/dashboard/issues', label: 'Issues', icon: '⚠️' },
  { href: '/dashboard/fixes', label: 'Fixes', icon: '✓' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
  { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 border border-gray-800 rounded-lg text-white hover:bg-gray-800 transition-colors min-h-touch min-w-touch"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, Mobile slide-in */}
      <aside
        className={`
          flex flex-col w-64 bg-gray-900 border-r border-gray-800 h-screen z-40
          fixed lg:sticky lg:top-0
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-4 sm:p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="text-lg sm:text-2xl font-bold text-white truncate">
                SEOLOGY.AI
              </div>
            </Link>
            <div className="hidden lg:block">
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto no-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-lg transition-colors
                  min-h-touch
                  ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                `}
              >
                <span className="text-xl flex-shrink-0">{link.icon}</span>
                <span className="font-medium text-sm sm:text-base">{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-3 sm:p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-3 sm:px-4 py-3">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Your Account</p>
              <p className="text-xs text-gray-400 truncate">Manage profile</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
