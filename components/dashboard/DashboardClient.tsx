'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LoadingSkeleton } from '@/components/ui/loading'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardClient({ userName }: { userName: string }) {
  const { stats, isLoading } = useDashboardStats()

  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  const mockChartData = [
    { name: 'Mon', issues: 12, fixes: 10 },
    { name: 'Tue', issues: 15, fixes: 13 },
    { name: 'Wed', issues: 8, fixes: 8 },
    { name: 'Thu', issues: 18, fixes: 16 },
    { name: 'Fri', issues: 14, fixes: 12 },
    { name: 'Sat', issues: 6, fixes: 5 },
    { name: 'Sun', issues: 9, fixes: 7 },
  ]

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here's what's happening with your SEO automation
        </p>
      </div>

      {/* Stats Grid with Animations */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Sites Connected"
          value={stats.sitesCount}
          icon="🌐"
          trend={stats.sitesCount > 0 ? `${stats.sitesCount} active` : 'Get started'}
          trendUp={true}
          delay={0}
        />
        <StatCard
          title="Issues Detected"
          value={stats.activeIssuesCount}
          icon="⚠️"
          trend={stats.activeIssuesCount > 0 ? 'Needs attention' : 'All clear'}
          trendUp={false}
          delay={100}
        />
        <StatCard
          title="Fixes Applied"
          value={stats.fixesThisMonth}
          icon="✓"
          trend="This month"
          trendUp={true}
          delay={200}
        />
        <StatCard
          title="Usage This Month"
          value={`${stats.usagePercent}%`}
          icon="📊"
          trend={`${stats.fixesThisMonth}/${stats.fixLimit} fixes`}
          trendUp={true}
          delay={300}
        />
      </div>

      {/* Usage Progress Bar */}
      {stats.usagePercent > 0 && (
        <Card className="border-gray-800">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Monthly Usage</h3>
                <span className={`text-sm font-medium ${
                  stats.usagePercent >= 90 ? 'text-red-400' :
                  stats.usagePercent >= 70 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {stats.fixesThisMonth} / {stats.fixLimit} fixes
                </span>
              </div>
              <Progress value={stats.usagePercent} className="h-2" />
              {stats.usagePercent >= 90 && (
                <p className="text-xs text-red-400">
                  You're approaching your monthly limit. Consider upgrading your plan.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trend Chart */}
      <Card className="border-gray-800">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Issues & Fixes This Week</h2>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFixes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="issues" stroke="#ef4444" fillOpacity={1} fill="url(#colorIssues)" />
              <Area type="monotone" dataKey="fixes" stroke="#10b981" fillOpacity={1} fill="url(#colorFixes)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-gray-800">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <QuickActionCard
              title="Connect Your First Site"
              description="Start by connecting Shopify, WordPress, or any website"
              href="/dashboard/sites/connect"
              icon="🚀"
            />
            <QuickActionCard
              title="View Analytics"
              description="Track your SEO performance improvements"
              href="/dashboard/analytics"
              icon="📈"
            />
            <QuickActionCard
              title="Upgrade Plan"
              description="Get unlimited sites and fixes"
              href="/dashboard/billing"
              icon="⚡"
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-gray-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
            <Link
              href="/dashboard/sites"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center"
            >
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity) => (
                <Link
                  key={activity.id}
                  href={`/dashboard/sites/${activity.id}`}
                  className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {{
                        SHOPIFY: '🛍️',
                        WORDPRESS: '📝',
                        WIX: '🎨',
                        CUSTOM: '⚡',
                      }[activity.platform] || '🌐'}
                    </div>
                    <div>
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {activity.displayName || activity.domain}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {activity.issuesCount} active issues • {activity.fixesCount} fixes this month
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No activity yet</p>
              <p className="text-sm text-gray-600">
                Connect a site to start seeing SEO automation in action
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Getting Started Checklist (for new users) */}
      {stats.sitesCount === 0 && (
        <Card className="border-blue-700 bg-blue-900/10">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-400" />
              Getting Started
            </h2>
            <div className="space-y-3">
              <ChecklistItem completed={false} text="Connect your first site" />
              <ChecklistItem completed={false} text="Run your first SEO analysis" />
              <ChecklistItem completed={false} text="Apply AI-powered fixes" />
              <ChecklistItem completed={false} text="Review your analytics" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  delay = 0,
}: {
  title: string
  value: number | string
  icon: string
  trend: string
  trendUp: boolean
  delay?: number
}) {
  return (
    <Card
      className="border-gray-800 hover:border-blue-500/50 transition-all duration-300 animate-in slide-in-from-bottom"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl sm:text-2xl">{icon}</span>
          <span
            className={`text-xs sm:text-sm font-medium flex items-center ${
              trendUp ? 'text-green-500' : 'text-yellow-500'
            }`}
          >
            {trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span className="hidden xs:inline">{trend}</span>
          </span>
        </div>
        <h3 className="text-gray-400 text-xs sm:text-sm mb-1">{title}</h3>
        <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{value}</p>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <Link
      href={href}
      className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group hover:scale-105 min-h-touch"
    >
      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{icon}</div>
      <h3 className="text-white text-sm sm:text-base font-semibold mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm">{description}</p>
    </Link>
  )
}

function ChecklistItem({ completed, text }: { completed: boolean; text: string }) {
  return (
    <div className="flex items-center space-x-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          completed
            ? 'border-green-500 bg-green-500'
            : 'border-gray-600 bg-transparent'
        }`}
      >
        {completed && <span className="text-white text-xs">✓</span>}
      </div>
      <span className={completed ? 'text-gray-400 line-through' : 'text-white'}>
        {text}
      </span>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <LoadingSkeleton className="h-8 w-64 mb-2" />
        <LoadingSkeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-gray-800">
            <CardContent className="p-6">
              <LoadingSkeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-gray-800">
        <CardContent className="p-6">
          <LoadingSkeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
