'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Globe,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Sparkles,
  ArrowRight,
  Plus,
  Zap,
  Activity,
  Clock,
  Target,
} from 'lucide-react'
import { AnimatedCounter } from './AnimatedCounter'
import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface DashboardData {
  user: {
    name: string
    email: string
    plan: string
    executionMode: string
  }
  stats: {
    totalSites: number
    totalIssuesOpen: number
    totalFixesApplied: number
    aiCreditsUsed: number
    aiCreditsLimit: number
    issuesTrend: number
    fixesTrend: number
  }
  connections: Array<{
    id: string
    domain: string
    displayName: string | null
    platform: string
    healthStatus: string
    pageCount: number
    issueCount: number
    lastCrawlAt: string | null
  }>
  recentActivity: Array<{
    id: string
    type: 'fix' | 'issue' | 'scan' | 'connection' | 'analysis'
    title: string
    description: string
    timestamp: string
    siteName: string
    status: 'success' | 'warning' | 'error' | 'info'
  }>
  insights: Array<{
    id: string
    type: string
    title: string
    description: string
    recommendation: string
    priority: string
    estimatedImpact: number | null
    siteName: string
  }>
  metrics: {
    traffic: Array<{ date: string; value: number }>
    issues: Array<{ date: string; value: number }>
    fixes: Array<{ date: string; value: number }>
    health: Array<{
      date: string
      overall: number
      technical: number
      content: number
      performance: number
    }>
  }
  notifications: Array<{
    id: string
    type: string
    title: string
    message: string
    createdAt: string
  }>
}

export function DashboardClient({ data }: { data: DashboardData }) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('30d')

  const usagePercent = Math.round(
    (data.stats.aiCreditsUsed / data.stats.aiCreditsLimit) * 100
  )

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-vertical gap-row-12px"
        >
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <div className="text-400">👋</div>
            </div>
            <div className="flex-vertical">
              <h1 className="display-1 text-white">
                Welcome back, {data.user.name}!
              </h1>
              <p className="text-200 text-gray-400">
                Here's what's happening with your SEO automation
              </p>
            </div>
          </div>
        </motion.div>

        {/* Hero Stats Grid */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {/* Total Sites */}
          <StatCard
            title="Sites Connected"
            value={data.stats.totalSites}
            icon={<Globe className="w-5 h-5" />}
            trend={null}
            gradient="from-blue-500/20 to-cyan-500/20"
            color="blue"
          />

          {/* Issues Found */}
          <StatCard
            title="Issues Found"
            value={data.stats.totalIssuesOpen}
            icon={<AlertCircle className="w-5 h-5" />}
            trend={
              data.stats.issuesTrend !== 0
                ? {
                    value: data.stats.issuesTrend,
                    label: 'vs last week',
                    positive: data.stats.issuesTrend < 0,
                  }
                : null
            }
            gradient="from-orange-500/20 to-red-500/20"
            color="orange"
          />

          {/* Fixes Applied */}
          <StatCard
            title="Fixes Applied"
            value={data.stats.totalFixesApplied}
            icon={<CheckCircle2 className="w-5 h-5" />}
            trend={
              data.stats.fixesTrend !== 0
                ? {
                    value: data.stats.fixesTrend,
                    label: 'vs last week',
                    positive: data.stats.fixesTrend > 0,
                  }
                : null
            }
            gradient="from-green-500/20 to-emerald-500/20"
            color="green"
          />

          {/* AI Credits */}
          <StatCard
            title="AI Credits Used"
            value={`${data.stats.aiCreditsUsed}/${data.stats.aiCreditsLimit}`}
            icon={<Sparkles className="w-5 h-5" />}
            trend={null}
            gradient="from-purple-500/20 to-pink-500/20"
            color="purple"
            subtitle={`${usagePercent}% of monthly limit`}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
        >
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
            <div className="card-icon-square _40px">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-400 bold text-white">Quick Actions</h2>
          </div>
          <div className="grid-3-columns _1-column-mbl gap-row-16px gap-column-12px">
            <QuickActionCard
              icon={<Plus className="w-5 h-5" />}
              title="Add New Site"
              description="Connect another website"
              href="/dashboard/sites/connect"
              color="blue"
            />
            <QuickActionCard
              icon={<Activity className="w-5 h-5" />}
              title="Run AI Analysis"
              description="Scan for SEO issues"
              href="/dashboard/ai-analysis"
              color="purple"
            />
            <QuickActionCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="View Reports"
              description="Performance insights"
              href="/dashboard/reports"
              color="green"
            />
          </div>
        </motion.div>

        {/* Recent Activity Feed */}
        {data.recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal space-between align-center mg-bottom-24px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _40px">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-400 bold text-white">Recent Activity</h2>
              </div>
              <Link
                href="/dashboard/sites"
                className="text-100 medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-vertical gap-row-12px">
              <AnimatePresence>
                {data.recentActivity.slice(0, 8).map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="card pd-16px hover-card-link bg-white/[0.02] border border-white/5"
                  >
                    <div className="flex-horizontal gap-column-16px align-start">
                      <div
                        className={`card-icon-square _40px ${
                          activity.status === 'success'
                            ? ''
                            : activity.status === 'error'
                            ? 'red-icon'
                            : activity.status === 'warning'
                            ? 'orange-icon'
                            : 'neutral-icon'
                        }`}
                      >
                        <div className="text-200">
                          {activity.type === 'fix'
                            ? '✅'
                            : activity.type === 'issue'
                            ? '🔍'
                            : activity.type === 'scan'
                            ? '🔄'
                            : activity.type === 'connection'
                            ? '🔗'
                            : '🤖'}
                        </div>
                      </div>
                      <div className="flex-vertical flex-1 min-w-0">
                        <div className="flex-horizontal space-between align-center gap-column-12px mg-bottom-4px">
                          <p className="text-100 medium text-white truncate">
                            {activity.title}
                          </p>
                          <div
                            className={`badge ${
                              activity.status === 'success'
                                ? 'green'
                                : activity.status === 'error'
                                ? 'red'
                                : activity.status === 'warning'
                                ? 'orange'
                                : 'neutral'
                            }`}
                          >
                            <div className="text-50 medium">{activity.status}</div>
                          </div>
                        </div>
                        {activity.description && (
                          <p className="text-50 text-gray-400 mg-bottom-4px line-clamp-2">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex-horizontal gap-column-8px align-center">
                          <span className="text-50 text-gray-500">{activity.siteName}</span>
                          <span className="text-50 text-gray-600">•</span>
                          <span className="text-50 text-gray-500">
                            {formatDistanceToNow(parseISO(activity.timestamp), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Sites Overview Grid */}
        {data.connections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal space-between align-center mg-bottom-24px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _40px">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-400 bold text-white">Your Sites</h2>
              </div>
              <Link
                href="/dashboard/sites"
                className="text-100 medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                Manage Sites <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid-3-columns _1-column-tablet gap-row-16px gap-column-12px">
              {data.connections.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <Link
                    href={`/dashboard/sites/${site.id}`}
                    className="card pd-24px hover-card-link group bg-white/[0.02] border border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    <div className="flex-vertical gap-row-16px">
                      <div className="flex-horizontal space-between align-center">
                        <div className="card-icon-square _40px">
                          <div className="text-200">
                            {site.platform === 'SHOPIFY'
                              ? '🛍️'
                              : site.platform === 'WORDPRESS'
                              ? '📝'
                              : site.platform === 'GITHUB'
                              ? '💻'
                              : '🌐'}
                          </div>
                        </div>
                        <div
                          className={`badge ${
                            site.healthStatus === 'healthy'
                              ? 'green'
                              : site.healthStatus === 'warning'
                              ? 'orange'
                              : site.healthStatus === 'error'
                              ? 'red'
                              : 'neutral'
                          }`}
                        >
                          <div className="text-50 medium">
                            {site.healthStatus === 'healthy'
                              ? 'Healthy'
                              : site.healthStatus === 'warning'
                              ? 'Warning'
                              : site.healthStatus === 'error'
                              ? 'Issues'
                              : 'Unknown'}
                          </div>
                        </div>
                      </div>
                      <div className="flex-vertical gap-row-8px">
                        <h3 className="text-200 bold text-white truncate">
                          {site.displayName || site.domain}
                        </h3>
                        <p className="text-50 text-gray-400 truncate">{site.domain}</p>
                      </div>
                      <div className="flex-horizontal gap-column-16px">
                        <div className="flex-vertical gap-row-4px">
                          <span className="text-50 text-gray-500">Pages</span>
                          <span className="text-100 medium text-white">
                            {site.pageCount}
                          </span>
                        </div>
                        <div className="flex-vertical gap-row-4px">
                          <span className="text-50 text-gray-500">Issues</span>
                          <span className="text-100 medium text-white">
                            {site.issueCount}
                          </span>
                        </div>
                      </div>
                      {site.lastCrawlAt && (
                        <p className="text-50 text-gray-500">
                          Scanned{' '}
                          {formatDistanceToNow(parseISO(site.lastCrawlAt), {
                            addSuffix: true,
                          })}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Insights Panel */}
        {data.insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card pd-32px---24px bg-gradient-to-br from-purple-500/10 via-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-purple-500/20 shadow-lg shadow-purple-500/5"
          >
            <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-400 bold text-white">AI Recommendations</h2>
                <p className="text-100 text-gray-400">
                  Smart suggestions based on your site data
                </p>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px">
              {data.insights.slice(0, 3).map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="card pd-20px bg-white/[0.05] border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex-horizontal gap-column-16px align-start">
                    <div
                      className={`card-icon-square _40px ${
                        insight.priority === 'CRITICAL'
                          ? 'red-icon'
                          : insight.priority === 'HIGH'
                          ? 'orange-icon'
                          : ''
                      }`}
                    >
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="flex-vertical flex-1 gap-row-8px">
                      <div className="flex-horizontal space-between align-center">
                        <h3 className="text-200 medium text-white">{insight.title}</h3>
                        <div
                          className={`badge ${
                            insight.priority === 'CRITICAL'
                              ? 'red'
                              : insight.priority === 'HIGH'
                              ? 'orange'
                              : 'neutral'
                          }`}
                        >
                          <div className="text-50 medium">{insight.priority}</div>
                        </div>
                      </div>
                      <p className="text-100 text-gray-400 line-clamp-2">
                        {insight.description}
                      </p>
                      <p className="text-100 text-gray-300">{insight.recommendation}</p>
                      {insight.estimatedImpact && (
                        <div className="flex-horizontal gap-column-8px align-center">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-50 text-green-400 medium">
                            +{insight.estimatedImpact}% estimated traffic increase
                          </span>
                        </div>
                      )}
                      <span className="text-50 text-gray-500">{insight.siteName}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Performance Charts */}
        {data.metrics.traffic.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px"
          >
            {/* Traffic Chart */}
            <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex-horizontal space-between align-center mg-bottom-24px">
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _40px">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-300 bold text-white">Organic Traffic</h3>
                    <p className="text-50 text-gray-500">Last 30 days</p>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.metrics.traffic.map((m) => ({
                  date: format(parseISO(m.date), 'MMM d'),
                  traffic: m.value,
                }))}>
                  <defs>
                    <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="traffic"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#trafficGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Issues & Fixes Chart */}
            <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex-horizontal space-between align-center mg-bottom-24px">
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _40px">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-300 bold text-white">Issues vs Fixes</h3>
                    <p className="text-50 text-gray-500">Last 30 days</p>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={data.metrics.issues.map((m, i) => ({
                    date: format(parseISO(m.date), 'MMM d'),
                    issues: m.value,
                    fixes: data.metrics.fixes[i]?.value || 0,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="issues"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fixes"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Empty State - Getting Started */}
        {data.stats.totalSites === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card pd-48px text-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="card-icon-square _56px mx-auto mg-bottom-24px">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-400 bold text-white mg-bottom-12px">
              Get Started with SEOLOGY.AI
            </h2>
            <p className="text-200 text-gray-400 mg-bottom-32px max-w-2xl mx-auto">
              Connect your first website to start automatically detecting and fixing SEO
              issues with AI-powered automation.
            </p>
            <Link
              href="/dashboard/sites/connect"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
            >
              <Plus className="w-5 h-5" />
              Connect Your First Site
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Stat Card Component
interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend: {
    value: number
    label: string
    positive: boolean
  } | null
  gradient: string
  color: string
  subtitle?: string
}

function StatCard({ title, value, icon, trend, gradient, color, subtitle }: StatCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`card pd-24px relative overflow-hidden bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <div className="flex-horizontal space-between align-center mg-bottom-16px relative z-10">
        <div className={`card-icon-square _40px text-${color}-400`}>{icon}</div>
        {trend && (
          <div className={`badge ${trend.positive ? 'green' : 'red'}`}>
            <div className="flex-horizontal gap-column-4px align-center">
              {trend.positive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-50 medium">
                {Math.abs(trend.value)}%
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex-vertical gap-row-12px relative z-10">
        <div className="text-100 medium text-gray-400">{title}</div>
        <div className="display-2 text-white">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        {subtitle && <p className="text-50 text-gray-500">{subtitle}</p>}
        {trend && <p className="text-50 text-gray-500">{trend.label}</p>}
      </div>
    </motion.div>
  )
}

// Quick Action Card Component
interface QuickActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}

function QuickActionCard({ icon, title, description, href, color }: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="card pd-20px hover-card-link group bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex-horizontal gap-column-16px align-center">
        <div className={`card-icon-square _40px text-${color}-400`}>{icon}</div>
        <div className="flex-vertical gap-row-4px flex-1">
          <h3 className="text-200 medium text-white group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-50 text-gray-500">{description}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
      </div>
    </Link>
  )
}
