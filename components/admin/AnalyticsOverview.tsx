'use client'

/**
 * Enhanced Admin Analytics Overview Dashboard
 * Comprehensive platform analytics with dark theme and advanced visualizations
 */

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Link from 'next/link'

interface AnalyticsData {
  overview: {
    totalUsers: number
    newUsers: number
    totalConnections: number
    activeConnections: number
    totalIssues: number
    openIssues: number
    totalFixes: number
    appliedFixes: number
    failedFixes: number
    fixSuccessRate: number
    totalRevenue: number
  }
  subscriptions: Array<{ plan: string; count: number }>
  userGrowth: Array<{ date: string; count: number }>
  fixesOverTime: Array<{ date: string; count: number }>
  issuesByType: Array<{ type: string; count: number }>
  platformStats: Array<{ platform: string; count: number }>
  recentActivity: Array<{
    id: string
    action: string
    resource: string | null
    userEmail: string
    userName: string | null
    createdAt: string
  }>
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

export default function AnalyticsOverview() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)
  const [activeMetric, setActiveMetric] = useState<'users' | 'revenue' | 'fixes'>('users')

  useEffect(() => {
    fetchAnalytics()
  }, [days])

  async function fetchAnalytics() {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?days=${days}`)
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 p-8">
        <div className="max-w-md mx-auto text-center mt-20">
          <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Failed to Load Analytics</h2>
          <p className="text-gray-400 mb-6">Unable to fetch analytics data. Please try again later.</p>
          <button
            onClick={fetchAnalytics}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const { overview } = data

  const growthRate = overview.totalUsers > 0
    ? ((overview.newUsers / overview.totalUsers) * 100).toFixed(1)
    : '0.0'

  return (
    <div className="min-h-screen bg-gray-950 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Platform Analytics</h1>
          <p className="text-gray-400">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Refresh
          </button>
          <Link
            href="/admin"
            className="text-gray-400 hover:text-white flex items-center text-sm"
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={overview.totalUsers}
          subtitle={`+${overview.newUsers} new (${growthRate}%)`}
          color="blue"
          icon="👥"
        />
        <MetricCard
          title="Active Sites"
          value={overview.activeConnections}
          subtitle={`${overview.totalConnections} total`}
          color="green"
          icon="🌐"
        />
        <MetricCard
          title="Fixes Applied"
          value={overview.appliedFixes}
          subtitle={`${overview.fixSuccessRate.toFixed(1)}% success`}
          color="purple"
          icon="✓"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${overview.totalRevenue.toLocaleString()}`}
          subtitle="MRR"
          color="yellow"
          icon="💰"
        />
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PerformanceCard
          label="Active Issues"
          value={overview.openIssues}
          total={overview.totalIssues}
          status={overview.openIssues < overview.totalIssues * 0.3 ? 'good' : 'warning'}
        />
        <PerformanceCard
          label="Fix Success Rate"
          value={overview.appliedFixes}
          total={overview.totalFixes}
          status={overview.fixSuccessRate > 90 ? 'good' : overview.fixSuccessRate > 70 ? 'warning' : 'critical'}
        />
        <PerformanceCard
          label="Connection Health"
          value={overview.activeConnections}
          total={overview.totalConnections}
          status={overview.activeConnections > overview.totalConnections * 0.8 ? 'good' : 'warning'}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Growth Chart */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">User Growth Trend</h2>
            <span className="text-xs text-gray-500">Daily New Users</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data.userGrowth}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fixes Over Time */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Fixes Applied</h2>
            <span className="text-xs text-gray-500">Daily Fix Count</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.fixesOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Distribution */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Subscription Plans</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data.subscriptions}
                dataKey="count"
                nameKey="plan"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(props: { name?: string; percent?: number }) => {
                  const { name, percent } = props
                  return `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`
                }}
              >
                {data.subscriptions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Legend wrapperStyle={{ color: '#F3F4F6' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Issues */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Top Issue Types</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.issuesByType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis dataKey="type" type="category" width={150} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6',
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-6">Platform Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.platformStats.map((stat, index) => {
            const total = data.platformStats.reduce((sum, s) => sum + s.count, 0)
            const percentage = total > 0 ? ((stat.count / total) * 100).toFixed(1) : '0.0'
            const emoji = {
              SHOPIFY: '🛍️',
              WORDPRESS: '📝',
              WIX: '🎨',
              CUSTOM: '⚡',
            }[stat.platform] || '🌐'

            return (
              <div
                key={stat.platform}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center hover:border-purple-600 transition-colors"
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <p className="text-gray-400 text-sm font-medium mb-2">{stat.platform}</p>
                <p className="text-3xl font-bold text-white mb-1">{stat.count}</p>
                <p className="text-xs text-gray-500">{percentage}% of total</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.recentActivity.slice(0, 15).map((activity) => (
                <tr key={activity.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-semibold mr-3">
                        {(activity.userName || activity.userEmail).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {activity.userName || 'Unknown'}
                        </div>
                        <div className="text-xs text-gray-500">{activity.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300">
                      {activity.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {activity.resource || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(activity.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: number | string
  subtitle: string
  color: 'blue' | 'green' | 'purple' | 'yellow'
  icon: string
}

function MetricCard({ title, value, subtitle, color, icon }: MetricCardProps) {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-green-700',
    purple: 'from-purple-600 to-purple-700',
    yellow: 'from-yellow-600 to-yellow-700',
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <div className={`bg-gradient-to-r ${colorClasses[color]} p-4`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-white/90">{title}</h3>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="p-6">
        <p className="text-4xl font-bold text-white mb-2">{value}</p>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

interface PerformanceCardProps {
  label: string
  value: number
  total: number
  status: 'good' | 'warning' | 'critical'
}

function PerformanceCard({ label, value, total, status }: PerformanceCardProps) {
  const percentage = total > 0 ? (value / total) * 100 : 0

  const statusColors = {
    good: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    critical: 'from-red-500 to-red-600',
  }

  const statusBadge = {
    good: 'bg-green-900/50 text-green-300 border-green-700',
    warning: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
    critical: 'bg-red-900/50 text-red-300 border-red-700',
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{label}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="flex items-baseline space-x-2 mb-3">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-sm text-gray-500">/ {total}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${statusColors[status]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">{percentage.toFixed(1)}%</p>
    </div>
  )
}
