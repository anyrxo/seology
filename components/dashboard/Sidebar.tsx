'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { UserButton, SignOutButton } from '@clerk/nextjs'
import { Menu, X, LogOut } from 'lucide-react'
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
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white hover:bg-gray-800 transition-all shadow-lg"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop always visible, Mobile slide-in */}
      <aside
        className={`
          flex flex-col w-72 lg:w-64 bg-gray-900/98 backdrop-blur-xl border-r border-gray-800/50 h-screen z-40
          fixed lg:sticky lg:top-0
          transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-5 lg:p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="text-xl lg:text-2xl font-bold text-white truncate bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SEOLOGY.AI
              </div>
            </Link>
            <div className="hidden lg:block">
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-300 hover:bg-gray-800/80 hover:text-white'
                  }
                `}
              >
                <span className="text-xl flex-shrink-0">{link.icon}</span>
                <span className="font-semibold text-sm">{link.label}</span>
              </Link>
            )
          })}

          {/* Logout Button */}
          <SignOutButton redirectUrl="/">
            <button
              className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all text-gray-300 hover:bg-red-900/20 hover:text-red-400 border border-transparent hover:border-red-800/30"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-semibold text-sm">Sign Out</span>
            </button>
          </SignOutButton>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800/50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors">
            <UserButton afterSignOutUrl="/" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Your Account</p>
              <p className="text-xs text-gray-400 truncate">Manage profile</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
