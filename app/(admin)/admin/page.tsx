import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import AdminHomeClient from '@/components/admin/AdminHomeClient'

export default async function AdminDashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get comprehensive system stats
  const [
    totalUsers,
    totalConnections,
    totalIssues,
    totalFixes,
    activeIssues,
    pendingFixes,
    appliedFixes,
    recentUsers,
    recentConnections,
    systemActivity,
    usersByPlan,
    connectionsByPlatform,
  ] = await Promise.all([
    db.user.count(),
    db.connection.count(),
    db.issue.count(),
    db.fix.count(),
    db.issue.count({ where: { status: { notIn: ['FIXED', 'IGNORED'] } } }),
    db.fix.count({ where: { status: 'PENDING' } }),
    db.fix.count({ where: { status: 'APPLIED' } }),
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
      take: 20,
      include: {
        user: true,
      },
    }),
    db.user.groupBy({
      by: ['plan'],
      _count: true,
    }),
    db.connection.groupBy({
      by: ['platform'],
      _count: true,
    }),
  ])

  // Get user growth for last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const userGrowth = await db.$queryRaw<Array<{ date: Date; count: bigint }>>`
    SELECT DATE(created_at) as date, COUNT(*)::int as count
    FROM "User"
    WHERE created_at >= ${thirtyDaysAgo}
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `

  // Get revenue data (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const revenueData = await db.user.groupBy({
    by: ['plan', 'createdAt'],
    _count: true,
    where: {
      createdAt: { gte: sevenDaysAgo },
    },
  })

  // Calculate total revenue
  const planPrices = { STARTER: 29, GROWTH: 99, SCALE: 299 }
  const totalRevenue = usersByPlan.reduce((sum, sub) => {
    return sum + (planPrices[sub.plan as keyof typeof planPrices] || 0) * sub._count
  }, 0)

  // Previous period comparison
  const sixtyDaysAgo = new Date()
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)

  const [prevPeriodUsers, prevPeriodConnections, prevPeriodFixes] = await Promise.all([
    db.user.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    db.connection.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    db.fix.count({
      where: {
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
        status: 'APPLIED',
      },
    }),
  ])

  const currentPeriodUsers = await db.user.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  })
  const currentPeriodConnections = await db.connection.count({
    where: { createdAt: { gte: thirtyDaysAgo } },
  })
  const currentPeriodFixes = await db.fix.count({
    where: { createdAt: { gte: thirtyDaysAgo }, status: 'APPLIED' },
  })

  const userTrend = prevPeriodUsers > 0
    ? ((currentPeriodUsers - prevPeriodUsers) / prevPeriodUsers) * 100
    : 100
  const connectionTrend = prevPeriodConnections > 0
    ? ((currentPeriodConnections - prevPeriodConnections) / prevPeriodConnections) * 100
    : 100
  const fixTrend = prevPeriodFixes > 0
    ? ((currentPeriodFixes - prevPeriodFixes) / prevPeriodFixes) * 100
    : 100

  return (
    <AdminHomeClient
      stats={{
        totalUsers,
        totalConnections,
        totalIssues,
        totalFixes,
        activeIssues,
        pendingFixes,
        appliedFixes,
        totalRevenue,
        userTrend,
        connectionTrend,
        fixTrend,
      }}
      recentUsers={recentUsers.map(u => ({
        id: u.id,
        name: u.name || u.email,
        email: u.email,
        plan: u.plan,
        connectionsCount: u.connections.length,
        createdAt: u.createdAt.toISOString(),
      }))}
      recentConnections={recentConnections.map(c => ({
        id: c.id,
        platform: c.platform,
        displayName: c.displayName || c.domain,
        domain: c.domain,
        userEmail: c.user.email,
        createdAt: c.createdAt.toISOString(),
      }))}
      systemActivity={systemActivity.map(log => ({
        id: log.id,
        action: log.action,
        userEmail: log.user.email,
        userName: log.user.name,
        details: log.details,
        createdAt: log.createdAt.toISOString(),
      }))}
      userGrowthData={userGrowth.map(row => ({
        date: row.date.toISOString().split('T')[0],
        count: Number(row.count),
      }))}
      planDistribution={usersByPlan.map(p => ({
        plan: p.plan,
        count: p._count,
      }))}
      platformDistribution={connectionsByPlatform.map(p => ({
        platform: p.platform,
        count: p._count,
      }))}
    />
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
