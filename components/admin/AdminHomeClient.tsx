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
    <div className="flex-vertical gap-row-32px">
      {/* Header */}
      <div className="flex-horizontal space-between align-center">
        <div className="flex-vertical gap-row-8px">
          <h1 className="display-2 color-neutral-800">Admin Dashboard</h1>
          <p className="text-200 color-neutral-600">System overview and real-time monitoring</p>
        </div>
        <div className="card pd-16px">
          <div className="text-100 color-neutral-600 mg-bottom-8px">System Time</div>
          <div className="text-300 medium color-neutral-800">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* KPI Cards with Trends */}
      <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          trend={stats.userTrend}
          icon="👥"
          color="text-blue-400"
          bgColor="bg-gray-900"
          borderColor="border-blue-800"
        />
        <StatCard
          title="Active Sites"
          value={stats.totalConnections}
          trend={stats.connectionTrend}
          icon="🔗"
          color="text-green-400"
          bgColor="bg-gray-900"
          borderColor="border-green-800"
        />
        <StatCard
          title="Active Issues"
          value={stats.activeIssues}
          trend={0}
          icon="⚠️"
          color="text-orange-400"
          bgColor="bg-gray-900"
          borderColor="border-orange-800"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          trend={stats.fixTrend}
          icon="💰"
          color="text-purple-400"
          bgColor="bg-gray-900"
          borderColor="border-purple-800"
        />
      </div>

      {/* Charts Row */}
      <div className="grid-2-columns _1-column-mbl gap-row-24px gap-column-12px">
        {/* User Growth Chart */}
        <div className="card pd-24px">
          <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">User Growth (30 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e9f1" />
              <XAxis dataKey="date" stroke="#828aa3" />
              <YAxis stroke="#828aa3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e6e9f1',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="New Users"
                stroke="#3d73ff"
                strokeWidth={2}
                dot={{ fill: '#3d73ff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Distribution */}
        <div className="card pd-24px">
          <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={planDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6e9f1" />
              <XAxis dataKey="plan" stroke="#828aa3" />
              <YAxis stroke="#828aa3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e6e9f1',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Users" fill="#3d73ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Stats & System Health */}
      <div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-12px">
        {/* Platform Distribution */}
        <div className="card pd-24px">
          <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">Platform Breakdown</h2>
          <div className="flex-vertical gap-row-16px">
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
                <div key={platform.platform} className="flex-vertical gap-row-8px">
                  <div className="flex-horizontal space-between align-center">
                    <div className="flex-horizontal gap-column-8px align-center">
                      <span className="text-200">{emoji}</span>
                      <span className="text-200 medium color-neutral-800">{platform.platform}</span>
                    </div>
                    <span className="text-100 color-neutral-600">{platform.count}</span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar green"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-50 color-neutral-500">{percentage}% of total</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="card pd-24px">
          <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">System Health</h2>
          <div className="flex-vertical gap-row-16px">
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
        <div className="card pd-24px">
          <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">Quick Stats</h2>
          <div className="flex-vertical gap-row-16px">
            <QuickStat label="Total Issues" value={stats.totalIssues} />
            <QuickStat label="Fixed Issues" value={stats.appliedFixes} />
            <QuickStat label="Active Issues" value={stats.activeIssues} />
            <QuickStat label="Success Rate" value={`${((stats.appliedFixes / stats.totalFixes) * 100).toFixed(1)}%`} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid-2-columns _1-column-mbl gap-row-24px gap-column-12px">
        {/* Recent Users */}
        <div className="card pd-24px">
          <div className="flex-horizontal space-between align-center mg-bottom-24px">
            <h2 className="text-400 medium color-neutral-800">Recent Users</h2>
            <Link
              href="/admin/users"
              className="text-100 medium color-accent-1"
            >
              View All →
            </Link>
          </div>
          <div className="flex-vertical gap-row-12px">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="card pd-16px hover-card-link"
              >
                <div className="flex-horizontal space-between align-center">
                  <div className="flex-horizontal gap-column-12px align-center">
                    <div className="card-icon-square _40px">
                      <div className="text-200 medium color-neutral-800">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-vertical gap-row-4px">
                      <p className="text-200 medium color-neutral-800">{user.name}</p>
                      <p className="text-100 color-neutral-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex-vertical gap-row-4px" style={{ alignItems: 'flex-end' }}>
                    <div className="text-100 color-neutral-600">{user.connectionsCount} sites</div>
                    <div className="text-50 color-neutral-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Connections */}
        <div className="card pd-24px">
          <div className="flex-horizontal space-between align-center mg-bottom-24px">
            <h2 className="text-400 medium color-neutral-800">Recent Connections</h2>
            <Link
              href="/admin/sites"
              className="text-100 medium color-accent-1"
            >
              View All →
            </Link>
          </div>
          <div className="flex-vertical gap-row-12px">
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
                  className="card pd-16px hover-card-link"
                >
                  <div className="flex-horizontal space-between align-center">
                    <div className="flex-horizontal gap-column-12px align-center">
                      <div className="text-300">{platformEmoji}</div>
                      <div className="flex-vertical gap-row-4px">
                        <p className="text-200 medium color-neutral-800">{connection.displayName}</p>
                        <p className="text-100 color-neutral-600">{connection.userEmail}</p>
                      </div>
                    </div>
                    <div className="text-50 color-neutral-500">
                      {new Date(connection.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* System Activity Feed */}
      <div className="card pd-24px">
        <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">System Activity Feed</h2>
        <div className="flex-vertical gap-row-8px" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {systemActivity.map((log) => (
            <div
              key={log.id}
              className="card pd-16px hover-card-link"
            >
              <div className="flex-horizontal space-between align-start">
                <div className="flex-horizontal gap-column-12px align-start">
                  <div className="text-200">{getActionIcon(log.action)}</div>
                  <div className="flex-vertical gap-row-4px">
                    <p className="text-100 medium color-neutral-800">{log.action}</p>
                    <p className="text-50 color-neutral-600">{log.userEmail}</p>
                  </div>
                </div>
                <div className="text-50 color-neutral-500" style={{ whiteSpace: 'nowrap' }}>
                  {getTimeAgo(new Date(log.createdAt))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card pd-24px">
        <h2 className="text-400 medium color-neutral-800 mg-bottom-24px">Quick Actions</h2>
        <div className="grid-4-columns _1-column-tablet gap-row-16px gap-column-12px">
          <AdminActionCard
            title="Manage Users"
            description="View and manage user accounts"
            href="/admin/users"
            icon="👥"
            color="blue"
          />
          <AdminActionCard
            title="Monitor Sites"
            description="Track connected sites"
            href="/admin/sites"
            icon="🌐"
            color="green"
          />
          <AdminActionCard
            title="Job Queue"
            description="Monitor background jobs"
            href="/admin/jobs"
            icon="⚙️"
            color="primary"
          />
          <AdminActionCard
            title="Analytics"
            description="Detailed system metrics"
            href="/admin/analytics"
            icon="📈"
            color="orange"
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
  const trendIcon = isPositive ? '↑' : '↓'

  return (
    <div className="card pd-24px">
      <div className="flex-horizontal space-between align-center mg-bottom-16px">
        <div className="card-icon-square _40px">
          <div className="text-300">{icon}</div>
        </div>
        {trend !== 0 && (
          <div className={`badge ${isPositive ? 'green' : 'red'}`}>
            <div className="text-50 medium">
              {trendIcon} {Math.abs(trend).toFixed(1)}%
            </div>
          </div>
        )}
      </div>
      <div className="flex-vertical gap-row-12px">
        <div className="text-100 medium color-neutral-600">{title}</div>
        <div className="card-amount-container">
          <div className="display-2 color-neutral-800">{value}</div>
        </div>
      </div>
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
  const statusBadge = {
    healthy: 'green',
    warning: 'orange',
    error: 'red',
  }

  return (
    <div className="flex-horizontal space-between align-center">
      <div className="flex-horizontal gap-column-8px align-center">
        <div className={`badge ${statusBadge[status]}`}>
          <div className="text-50 medium">{status === 'healthy' ? '✓' : status === 'warning' ? '!' : '✕'}</div>
        </div>
        <span className="text-100 color-neutral-600">{label}</span>
      </div>
      <span className="text-200 medium color-neutral-800">{value}</span>
    </div>
  )
}

function QuickStat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex-horizontal space-between align-center">
      <span className="text-100 color-neutral-600">{label}</span>
      <span className="text-200 medium color-neutral-800">{value}</span>
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
  color: 'blue' | 'green' | 'primary' | 'orange'
}) {
  return (
    <Link
      href={href}
      className="card pd-24px hover-card-link"
    >
      <div className="flex-vertical gap-row-16px">
        <div className={`badge ${color}`}>
          <div className="text-300">{icon}</div>
        </div>
        <div className="flex-vertical gap-row-8px">
          <h3 className="text-200 medium color-neutral-800">{title}</h3>
          <p className="text-100 color-neutral-600">{description}</p>
        </div>
        <div className="flex-horizontal gap-column-8px align-center">
          <span className="text-100 medium color-accent-1">View details</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: '#3d73ff' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
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
