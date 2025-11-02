import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get system stats
  const [
    totalUsers,
    totalConnections,
    totalIssues,
    totalFixes,
    recentUsers,
    recentConnections,
    systemActivity,
  ] = await Promise.all([
    db.user.count(),
    db.connection.count(),
    db.issue.count(),
    db.fix.count(),
    db.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        connections: true,
      },
    }),
    db.connection.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: true,
      },
    }),
    db.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15,
      include: {
        user: true,
      },
    }),
  ])

  // Calculate active issues
  const activeIssues = await db.issue.count({
    where: { status: { not: 'FIXED' } },
  })

  // Calculate pending fixes
  const pendingFixes = await db.fix.count({
    where: { status: 'PENDING' },
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          icon="👥"
          color="text-blue-400"
          bgColor="bg-blue-900/20"
          borderColor="border-blue-700"
        />
        <StatCard
          title="Total Connections"
          value={totalConnections.toString()}
          icon="🔗"
          color="text-green-400"
          bgColor="bg-green-900/20"
          borderColor="border-green-700"
        />
        <StatCard
          title="Active Issues"
          value={activeIssues.toString()}
          icon="⚠️"
          color="text-yellow-400"
          bgColor="bg-yellow-900/20"
          borderColor="border-yellow-700"
        />
        <StatCard
          title="Pending Fixes"
          value={pendingFixes.toString()}
          icon="⏳"
          color="text-purple-400"
          bgColor="bg-purple-900/20"
          borderColor="border-purple-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Users</h2>
            <Link
              href="/admin/users"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{user.name || user.email}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {user.connections.length} sites
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Connections */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Connections</h2>
            <Link
              href="/admin/sites"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentConnections.map((connection) => {
              const platformEmoji = {
                SHOPIFY: '🛍️',
                WORDPRESS: '📝',
                WIX: '🎨',
                CUSTOM: '⚡',
              }[connection.platform] || '🌐'

              return (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{platformEmoji}</div>
                    <div>
                      <p className="text-white font-medium">
                        {connection.displayName || connection.domain}
                      </p>
                      <p className="text-gray-400 text-sm">{connection.user.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(connection.createdAt).toLocaleDateString()}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* System Activity Log */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">System Activity</h2>
        <div className="space-y-2">
          {systemActivity.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-3 bg-gray-800/50 rounded border border-gray-700/50 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">{getActionIcon(log.action)}</div>
                <div>
                  <p className="text-white text-sm font-medium">{log.action}</p>
                  <p className="text-gray-400 text-xs">{log.user.email}</p>
                  {log.details && (
                    <p className="text-gray-500 text-xs mt-1">
                      {JSON.stringify(JSON.parse(log.details), null, 0).slice(0, 100)}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {getTimeAgo(log.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AdminActionCard
            title="Manage Users"
            description="View and manage user accounts"
            href="/admin/users"
            icon="👥"
            color="bg-blue-600 hover:bg-blue-700"
          />
          <AdminActionCard
            title="View All Sites"
            description="Monitor connected sites and platforms"
            href="/admin/sites"
            icon="🌐"
            color="bg-green-600 hover:bg-green-700"
          />
          <AdminActionCard
            title="System Analytics"
            description="Detailed system metrics and charts"
            href="/admin/analytics"
            icon="📈"
            color="bg-purple-600 hover:bg-purple-700"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
  bgColor,
  borderColor,
}: {
  title: string
  value: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
}) {
  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function AdminActionCard({
  title,
  description,
  href,
  icon,
  color,
}: {
  title: string
  description: string
  href: string
  icon: string
  color: string
}) {
  return (
    <Link
      href={href}
      className={`${color} rounded-lg p-6 text-white transition-colors group`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium">
        Go to {title}
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  )
}

function getActionIcon(action: string): string {
  const icons: Record<string, string> = {
    CONNECTION_CREATED: '🔗',
    SHOPIFY_CONNECTED: '🛍️',
    SITE_ANALYZED: '🔍',
    FIX_APPLIED: '✅',
    CONNECTION_UPDATED: '✏️',
    CONNECTION_DELETED: '🗑️',
  }
  return icons[action] || '📝'
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(date).toLocaleDateString()
}
