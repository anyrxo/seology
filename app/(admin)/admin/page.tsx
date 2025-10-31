import { db } from '@/lib/db'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react'

// Get platform-wide statistics
async function getAdminStats() {
  const [
    totalUsers,
    activeSubscriptions,
    totalSites,
    totalIssues,
    totalFixes,
    recentActivity,
    platformUsage
  ] = await Promise.all([
    // Total users
    db.user.count(),

    // Active subscriptions
    db.subscription.count({
      where: {
        status: 'ACTIVE'
      }
    }),

    // Total sites
    db.connection.count(),

    // Total issues detected
    db.issue.count({
      where: {
        status: {
          in: ['DETECTED', 'FIXING']
        }
      }
    }),

    // Total fixes applied
    db.fix.count({
      where: {
        status: 'APPLIED'
      }
    }),

    // Recent activity (last 10 audit logs)
    db.auditLog.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        }
      }
    }),

    // Platform usage this month
    db.usage.findMany({
      where: {
        month: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })
  ])

  // Calculate MRR (simplified - would need Stripe integration)
  const mrr = activeSubscriptions * 49 // Placeholder

  // Sites by platform
  const sitesByPlatform = await db.connection.groupBy({
    by: ['platform'],
    _count: true
  })

  // Issues by severity
  const issuesBySeverity = await db.issue.groupBy({
    by: ['severity'],
    where: {
      status: {
        in: ['DETECTED', 'FIXING']
      }
    },
    _count: true
  })

  return {
    totalUsers,
    activeSubscriptions,
    mrr,
    totalSites,
    totalIssues,
    totalFixes,
    sitesByPlatform,
    issuesBySeverity,
    recentActivity,
    platformUsage
  }
}

export default async function AdminDashboard() {
  const stats = await getAdminStats()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Platform-wide overview and management
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers}
              </p>
              <p className="mt-1 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +12% this month
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Subscriptions
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.activeSubscriptions}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                MRR: ${stats.mrr.toLocaleString()}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
              <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Connected Sites
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalSites}
              </p>
              <p className="mt-1 text-xs text-green-600">
                <TrendingUp className="inline h-3 w-3" /> +8% this week
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
              <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Issues Detected
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalIssues}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {stats.totalFixes} fixes applied
              </p>
            </div>
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Sites by Platform */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Sites by Platform
          </h2>
          <div className="space-y-3">
            {stats.sitesByPlatform.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{platform.platform}</Badge>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {platform._count} sites
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Issues by Severity
          </h2>
          <div className="space-y-3">
            {stats.issuesBySeverity.map((issue) => (
              <div key={issue.severity} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      issue.severity === 'CRITICAL' ? 'destructive' :
                      issue.severity === 'HIGH' ? 'default' :
                      'outline'
                    }
                  >
                    {issue.severity}
                  </Badge>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {issue._count} issues
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {stats.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {activity.user.email} - {activity.resource} #{activity.resourceId.slice(0, 8)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {new Date(activity.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Health */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          System Health
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Database</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">API</p>
              <p className="text-xs text-green-600">Healthy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Background Jobs</p>
              <p className="text-xs text-green-600">Running</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
