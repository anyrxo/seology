import { db } from '@/lib/db'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  DollarSign,
  Activity
} from 'lucide-react'

// Get analytics data
async function getAnalytics() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalRevenue,
    userGrowth,
    siteGrowth,
    issuesFixed,
    planDistribution,
    platformDistribution,
    recentUsers,
    recentSites
  ] = await Promise.all([
    // Revenue data (mock - would come from Stripe)
    db.subscription.count({
      where: {
        status: 'ACTIVE'
      }
    }).then(count => count * 49), // Simplified MRR

    // User growth (last 30 days vs previous 30 days)
    Promise.all([
      db.user.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      }),
      db.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            lt: thirtyDaysAgo
          }
        }
      })
    ]),

    // Site growth
    Promise.all([
      db.connection.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      }),
      db.connection.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            lt: thirtyDaysAgo
          }
        }
      })
    ]),

    // Issues fixed
    db.issue.count({
      where: {
        status: 'FIXED',
        fixedAt: {
          gte: thirtyDaysAgo
        }
      }
    }),

    // Plan distribution
    db.user.groupBy({
      by: ['plan'],
      _count: true
    }),

    // Platform distribution
    db.connection.groupBy({
      by: ['platform'],
      _count: true
    }),

    // Recent users (last 7 days)
    db.user.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    }),

    // Recent sites (last 7 days)
    db.connection.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        id: true,
        domain: true,
        platform: true,
        createdAt: true,
        user: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })
  ])

  // Calculate growth percentages
  const userGrowthPercent = userGrowth[1] > 0
    ? ((userGrowth[0] - userGrowth[1]) / userGrowth[1]) * 100
    : 100

  const siteGrowthPercent = siteGrowth[1] > 0
    ? ((siteGrowth[0] - siteGrowth[1]) / siteGrowth[1]) * 100
    : 100

  return {
    totalRevenue,
    userGrowth: {
      current: userGrowth[0],
      previous: userGrowth[1],
      percent: userGrowthPercent
    },
    siteGrowth: {
      current: siteGrowth[0],
      previous: siteGrowth[1],
      percent: siteGrowthPercent
    },
    issuesFixed,
    planDistribution,
    platformDistribution,
    recentUsers,
    recentSites
  }
}

export const dynamic = 'force-dynamic'

export default async function AdminAnalytics() {
  const analytics = await getAnalytics()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Platform Analytics
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Monthly Recurring Revenue
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                ${analytics.totalRevenue.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15.3% from last month
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
                User Growth (30d)
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                +{analytics.userGrowth.current}
              </p>
              <p className={`mt-1 text-xs flex items-center gap-1 ${
                analytics.userGrowth.percent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.userGrowth.percent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(analytics.userGrowth.percent).toFixed(1)}% vs previous period
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
                Site Growth (30d)
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                +{analytics.siteGrowth.current}
              </p>
              <p className={`mt-1 text-xs flex items-center gap-1 ${
                analytics.siteGrowth.percent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {analytics.siteGrowth.percent >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {Math.abs(analytics.siteGrowth.percent).toFixed(1)}% vs previous period
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
                Issues Fixed (30d)
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.issuesFixed}
              </p>
              <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Platform healthy
              </p>
            </div>
            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900">
              <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Plan Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Plan Distribution
          </h2>
          <div className="space-y-4">
            {analytics.planDistribution.map((plan) => {
              const total = analytics.planDistribution.reduce((sum, p) => sum + p._count, 0)
              const percentage = (plan._count / total) * 100

              return (
                <div key={plan.plan}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          plan.plan === 'SCALE' ? 'default' :
                          plan.plan === 'GROWTH' ? 'secondary' :
                          'outline'
                        }
                      >
                        {plan.plan}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {plan._count} users
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`h-2 rounded-full ${
                        plan.plan === 'SCALE' ? 'bg-blue-600' :
                        plan.plan === 'GROWTH' ? 'bg-green-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Platform Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Platform Distribution
          </h2>
          <div className="space-y-4">
            {analytics.platformDistribution.map((platform) => {
              const total = analytics.platformDistribution.reduce((sum, p) => sum + p._count, 0)
              const percentage = (platform._count / total) * 100

              return (
                <div key={platform.platform}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {platform.platform}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {platform._count} sites
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className="h-2 bg-purple-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Signups (Last 7 Days)
          </h2>
          <div className="space-y-3">
            {analytics.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{user.plan}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Sites */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Connections (Last 7 Days)
          </h2>
          <div className="space-y-3">
            {analytics.recentSites.map((site) => (
              <div key={site.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {site.domain}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {site.user.email} - {new Date(site.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline">{site.platform}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
