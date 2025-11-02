'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
import NotificationCenter from '@/components/notifications/NotificationCenter'

interface SidebarLink {
  href: string
  label: string
  icon: string
}

const sidebarLinks: SidebarLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
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

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">SEOLOGY.AI</div>
          </Link>
          <NotificationCenter />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-4 py-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Your Account</p>
            <p className="text-xs text-gray-400 truncate">Manage profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}
