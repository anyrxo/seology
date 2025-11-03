'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Globe, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { PremiumStatCard } from './PremiumStatCard'
import { PremiumActionCard, PremiumActionGrid } from './PremiumActionCard'
import { GlassCard } from '@/components/ui/glass-card'
import { Skeleton } from '@/components/ui/skeleton'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Welcome Header with gradient text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
          Welcome back, {userName}!
        </h1>
        <p className="text-sm sm:text-base text-gray-400">
          Here's what's happening with your SEO automation
        </p>

        {/* Decorative gradient orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Premium Stats Grid with stagger animation */}
      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <PremiumStatCard
          title="Sites Connected"
          value={stats.sitesCount}
          icon={Globe}
          trend={{
            value: stats.sitesCount > 0 ? 100 : 0,
            label: stats.sitesCount > 0 ? `${stats.sitesCount} active` : 'Get started',
            positive: true
          }}
          delay={0}
        />
        <PremiumStatCard
          title="Issues Detected"
          value={stats.activeIssuesCount}
          icon={AlertTriangle}
          trend={{
            value: stats.activeIssuesCount,
            label: stats.activeIssuesCount > 0 ? 'Needs attention' : 'All clear',
            positive: false
          }}
          delay={100}
        />
        <PremiumStatCard
          title="Fixes Applied"
          value={stats.fixesThisMonth}
          icon={CheckCircle}
          trend={{
            value: 15,
            label: 'This month',
            positive: true
          }}
          delay={200}
        />
        <PremiumStatCard
          title="Usage This Month"
          value={`${stats.usagePercent}%`}
          icon={BarChart3}
          trend={{
            value: stats.usagePercent,
            label: `${stats.fixesThisMonth}/${stats.fixLimit} fixes`,
            positive: stats.usagePercent < 80
          }}
          delay={300}
        />
      </motion.div>

      {/* Usage Progress Bar with premium styling */}
      {stats.usagePercent > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <GlassCard
            variant="medium"
            blur="xl"
            hover="glow"
            padding="md"
            animated={false}
            className="relative overflow-hidden"
          >
            {/* Gradient overlay based on usage */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 ${
                stats.usagePercent >= 90
                  ? 'bg-gradient-to-br from-red-500/10 to-rose-500/10 opacity-100'
                  : stats.usagePercent >= 70
                  ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-100'
                  : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-100'
              }`}
            />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Monthly Usage</h3>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className={`text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm ${
                    stats.usagePercent >= 90
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : stats.usagePercent >= 70
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}
                >
                  {stats.fixesThisMonth} / {stats.fixLimit} fixes
                </motion.span>
              </div>
              <Progress value={stats.usagePercent} className="h-2" />
              {stats.usagePercent >= 90 && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-red-400"
                >
                  You're approaching your monthly limit. Consider upgrading your plan.
                </motion.p>
              )}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Trend Chart with premium glass card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GlassCard
          variant="medium"
          blur="xl"
          hover="lift"
          padding="md"
          animated={false}
          className="relative overflow-hidden"
        >
          {/* Decorative gradient orbs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Issues & Fixes This Week
            </h2>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <AreaChart data={mockChartData}>
                <defs>
                  <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFixes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(17, 24, 39, 0.9)',
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(12px)',
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="issues"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorIssues)"
                />
                <Area
                  type="monotone"
                  dataKey="fixes"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorFixes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Premium Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <GlassCard variant="light" blur="xl" hover="none" padding="md" animated={false}>
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <PremiumActionGrid cols={3}>
            <PremiumActionCard
              title="Connect Your First Site"
              description="Start by connecting Shopify, WordPress, or any website"
              href="/dashboard/sites/connect"
              icon="🚀"
              gradient="blue"
            />
            <PremiumActionCard
              title="View Analytics"
              description="Track your SEO performance improvements"
              href="/dashboard/analytics"
              icon="📈"
              gradient="purple"
            />
            <PremiumActionCard
              title="Upgrade Plan"
              description="Get unlimited sites and fixes"
              href="/dashboard/billing"
              icon="⚡"
              gradient="orange"
            />
          </PremiumActionGrid>
        </GlassCard>
      </motion.div>

      {/* Recent Activity with premium cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <GlassCard variant="medium" blur="xl" hover="lift" padding="md" animated={false}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Recent Activity</h2>
            <Link
              href="/dashboard/sites"
              className="group text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-1 transition-all duration-300"
            >
              View All
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Link
                    href={`/dashboard/sites/${activity.id}`}
                    className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
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
                    <ArrowUpRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4"
              >
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </motion.div>
              <p className="text-gray-400 mb-2">No activity yet</p>
              <p className="text-sm text-gray-500">
                Connect a site to start seeing SEO automation in action
              </p>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Getting Started Checklist (for new users) with premium styling */}
      {stats.sitesCount === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <GlassCard
            variant="gradient"
            blur="xl"
            hover="glow"
            padding="md"
            animated={false}
            borderGradient
            className="relative overflow-hidden border-blue-500/30"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift" />

            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Getting Started
              </h2>
              <div className="space-y-3">
                <ChecklistItem completed={false} text="Connect your first site" delay={0.9} />
                <ChecklistItem completed={false} text="Run your first SEO analysis" delay={1.0} />
                <ChecklistItem completed={false} text="Apply AI-powered fixes" delay={1.1} />
                <ChecklistItem completed={false} text="Review your analytics" delay={1.2} />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </motion.div>
  )
}

function ChecklistItem({ completed, text, delay = 0 }: { completed: boolean; text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center space-x-3"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          completed
            ? 'border-green-500 bg-green-500 shadow-lg shadow-green-500/50'
            : 'border-gray-600 bg-transparent hover:border-blue-500'
        }`}
      >
        {completed && <span className="text-white text-xs">✓</span>}
      </motion.div>
      <span className={`${completed ? 'text-gray-400 line-through' : 'text-white'} transition-colors`}>
        {text}
      </span>
    </motion.div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-10 w-80 mb-2" variant="shimmer" />
        <Skeleton className="h-5 w-96" variant="shimmer" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-xl" variant="shimmer" />
              <Skeleton className="h-4 w-24" variant="shimmer" />
              <Skeleton className="h-8 w-20" variant="shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <Skeleton className="h-6 w-48 mb-6" variant="shimmer" />
        <Skeleton className="h-64 w-full rounded-lg" variant="shimmer" />
      </div>

      {/* Actions skeleton */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <Skeleton className="h-6 w-32 mb-4" variant="shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-12 w-12 rounded-xl" variant="shimmer" />
              <Skeleton className="h-5 w-40" variant="shimmer" />
              <Skeleton className="h-4 w-full" variant="shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
