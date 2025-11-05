import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?redirect_url=/admin')
  }

  // Admin role check - re-enabled after DATABASE_URL fix
  let userEmail = 'Admin User'
  let isAdmin = false

  try {
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { role: true, email: true },
    })

    if (!user || user.role !== 'ADMIN') {
      redirect('/dashboard') // Not authorized
    }

    userEmail = user.email
    isAdmin = true
  } catch (error) {
    console.error('Admin layout auth error:', error)
    redirect('/dashboard')
  }

  const navItems = [
    { href: '/admin', icon: '📊', label: 'Dashboard' },
    { href: '/admin/users', icon: '👥', label: 'Users' },
    { href: '/admin/sites', icon: '🌐', label: 'Sites' },
    { href: '/admin/connection-requests', icon: '🔗', label: 'Connection Requests' },
    { href: '/admin/issues', icon: '⚠️', label: 'Issues' },
    { href: '/admin/jobs', icon: '⚙️', label: 'Jobs' },
    { href: '/admin/analytics', icon: '📈', label: 'Analytics' },
    { href: '/admin/broadcast', icon: '📢', label: 'Broadcast' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">SEOLOGY</h1>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <span className="text-xl">👤</span>
            <span className="font-medium">User View</span>
          </Link>

          <div className="px-4 py-2">
            <p className="text-xs text-gray-500">Logged in as:</p>
            <p className="text-sm text-gray-300 truncate">{userEmail}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
