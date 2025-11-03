'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Stats {
  totalUsers: number
  totalConnections: number
  totalIssues: number
  totalFixes: number
  activeIssues: number
  pendingFixes: number
  appliedFixes: number
  totalRevenue: number
  userTrend: number
  connectionTrend: number
  fixTrend: number
}

interface RecentUser {
  id: string
  name: string
  email: string
  plan: string
  connectionsCount: number
  createdAt: string
}

interface RecentConnection {
  id: string
  platform: string
  displayName: string
  domain: string
  userEmail: string
  createdAt: string
}

interface SystemActivity {
  id: string
  action: string
  userEmail: string
  userName: string | null
  details: string
  createdAt: string
}

interface UserGrowthData {
  date: string
  count: number
}

interface PlanDistribution {
  plan: string
  count: number
}

interface PlatformDistribution {
  platform: string
  count: number
}

interface AdminHomeClientProps {
  stats: Stats
  recentUsers: RecentUser[]
  recentConnections: RecentConnection[]
  systemActivity: SystemActivity[]
  userGrowthData: UserGrowthData[]
  planDistribution: PlanDistribution[]
  platformDistribution: PlatformDistribution[]
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export default function AdminHomeClient({
  stats,
  recentUsers,
  recentConnections,
  systemActivity,
  userGrowthData,
  planDistribution,
  platformDistribution,
}: AdminHomeClientProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">System overview and real-time monitoring</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">System Time</div>
          <div className="text-white font-mono">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* KPI Cards with Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          trend={stats.userTrend}
          icon="👥"
          color="text-blue-400"
          bgColor="bg-blue-900/20"
          borderColor="border-blue-700"
        />
        <StatCard
          title="Active Sites"
          value={stats.totalConnections}
          trend={stats.connectionTrend}
          icon="🔗"
          color="text-green-400"
          bgColor="bg-green-900/20"
          borderColor="border-green-700"
        />
        <StatCard
          title="Active Issues"
          value={stats.activeIssues}
          trend={0}
          icon="⚠️"
          color="text-yellow-400"
          bgColor="bg-yellow-900/20"
          borderColor="border-yellow-700"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          trend={stats.fixTrend}
          icon="💰"
          color="text-purple-400"
          bgColor="bg-purple-900/20"
          borderColor="border-purple-700"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">User Growth (30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="New Users"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Distribution */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="plan" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Users" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Stats & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Distribution */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Platform Breakdown</h2>
          <div className="space-y-4">
            {platformDistribution.map((platform) => {
              const total = platformDistribution.reduce((sum, p) => sum + p.count, 0)
              const percentage = ((platform.count / total) * 100).toFixed(1)
              const emoji = {
                SHOPIFY: '🛍️',
                WORDPRESS: '📝',
                WIX: '🎨',
                CUSTOM: '⚡',
              }[platform.platform] || '🌐'

              return (
                <div key={platform.platform}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-white font-medium">{platform.platform}</span>
                    </div>
                    <span className="text-gray-400">{platform.count}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{percentage}% of total</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">System Health</h2>
          <div className="space-y-4">
            <HealthIndicator
              label="API Status"
              status="healthy"
              value="All systems operational"
            />
            <HealthIndicator
              label="Database"
              status="healthy"
              value={`${stats.totalUsers + stats.totalConnections} records`}
            />
            <HealthIndicator
              label="Fix Success Rate"
              status={stats.appliedFixes / stats.totalFixes > 0.9 ? 'healthy' : 'warning'}
              value={`${((stats.appliedFixes / stats.totalFixes) * 100).toFixed(1)}%`}
            />
            <HealthIndicator
              label="Pending Jobs"
              status={stats.pendingFixes < 100 ? 'healthy' : 'warning'}
              value={`${stats.pendingFixes} jobs`}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <QuickStat label="Total Issues" value={stats.totalIssues} />
            <QuickStat label="Fixed Issues" value={stats.appliedFixes} />
            <QuickStat label="Active Issues" value={stats.activeIssues} />
            <QuickStat label="Success Rate" value={`${((stats.appliedFixes / stats.totalFixes) * 100).toFixed(1)}%`} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
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
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{user.connectionsCount} sites</div>
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
            {recentConnections.slice(0, 5).map((connection) => {
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
                      <p className="text-white font-medium">{connection.displayName}</p>
                      <p className="text-gray-400 text-sm">{connection.userEmail}</p>
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

      {/* System Activity Feed */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">System Activity Feed</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {systemActivity.map((log) => (
            <div
              key={log.id}
              className="flex items-start justify-between p-3 bg-gray-800/50 rounded border border-gray-700/50 hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">{getActionIcon(log.action)}</div>
                <div>
                  <p className="text-white text-sm font-medium">{log.action}</p>
                  <p className="text-gray-400 text-xs">{log.userEmail}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500 whitespace-nowrap">
                {getTimeAgo(new Date(log.createdAt))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <AdminActionCard
            title="Manage Users"
            description="View and manage user accounts"
            href="/admin/users"
            icon="👥"
            color="bg-blue-600 hover:bg-blue-700"
          />
          <AdminActionCard
            title="Monitor Sites"
            description="Track connected sites"
            href="/admin/sites"
            icon="🌐"
            color="bg-green-600 hover:bg-green-700"
          />
          <AdminActionCard
            title="Job Queue"
            description="Monitor background jobs"
            href="/admin/jobs"
            icon="⚙️"
            color="bg-purple-600 hover:bg-purple-700"
          />
          <AdminActionCard
            title="Analytics"
            description="Detailed system metrics"
            href="/admin/analytics"
            icon="📈"
            color="bg-yellow-600 hover:bg-yellow-700"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  trend,
  icon,
  color,
  bgColor,
  borderColor,
}: {
  title: string
  value: number | string
  trend: number
  icon: string
  color: string
  bgColor: string
  borderColor: string
}) {
  const isPositive = trend >= 0
  const trendColor = isPositive ? 'text-green-400' : 'text-red-400'
  const trendIcon = isPositive ? '↑' : '↓'

  return (
    <div className={`${bgColor} rounded-lg border ${borderColor} p-6 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl">{icon}</span>
        {trend !== 0 && (
          <div className={`flex items-center ${trendColor} text-sm font-semibold`}>
            {trendIcon} {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function HealthIndicator({
  label,
  status,
  value,
}: {
  label: string
  status: 'healthy' | 'warning' | 'error'
  value: string
}) {
  const statusColors = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className="text-gray-300">{label}</span>
      </div>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-semibold">{value}</span>
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
    WORDPRESS_CONNECTED: '📝',
    SITE_ANALYZED: '🔍',
    FIX_APPLIED: '✅',
    FIX_PENDING: '⏳',
    CONNECTION_UPDATED: '✏️',
    CONNECTION_DELETED: '🗑️',
    USER_CREATED: '👤',
    PLAN_UPGRADED: '⬆️',
  }
  return icons[action] || '📝'
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}
