'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'

interface AdminLink {
  href: string
  label: string
  icon: string
}

const adminLinks: AdminLink[] = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/sites', label: 'Sites', icon: '🌐' },
  { href: '/admin/jobs', label: 'Background Jobs', icon: '⚙️' },
  { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  { href: '/admin/broadcast', label: 'Broadcast', icon: '📢' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800 h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-white">ADMIN</div>
        </Link>
        <p className="text-xs text-gray-500 mt-1">SEOLOGY.AI Control Panel</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.label}</span>
            </Link>
          )
        })}

        {/* Divider */}
        <div className="pt-4 pb-2">
          <div className="border-t border-gray-800"></div>
        </div>

        {/* Back to Dashboard */}
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">Back to User Dashboard</span>
        </Link>
      </nav>

      {/* Admin Profile */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-3 px-4 py-3 bg-purple-900/20 rounded-lg border border-purple-700">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-200">Admin Mode</p>
            <p className="text-xs text-purple-400 truncate">Superuser Access</p>
          </div>
        </div>
      </div>
    </div>
  )
}
