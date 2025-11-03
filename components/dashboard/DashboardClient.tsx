'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, Globe, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'
import { PremiumStatCard } from './PremiumStatCard'
import { PremiumActionCard, PremiumActionGrid } from './PremiumActionCard'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardClient({ userName }: { userName: string }) {
  const { stats, isLoading } = useDashboardStats()

  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 sm:space-y-10"
    >
      {/* Welcome Header with gradient text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
          Welcome back, {userName}!
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          Here's what's happening with your SEO automation
        </p>
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
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Monthly Usage</h3>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className={`text-sm font-bold px-4 py-2 rounded-full ${
                    stats.usagePercent >= 90
                      ? 'bg-red-400/20 text-red-300 border border-red-400/30'
                      : stats.usagePercent >= 70
                      ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                      : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                  }`}
                >
                  {stats.fixesThisMonth} / {stats.fixLimit} fixes
                </motion.span>
              </div>
              <Progress value={stats.usagePercent} className="h-3" />
              {stats.usagePercent >= 90 && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-300"
                >
                  You're approaching your monthly limit. Consider upgrading your plan.
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Premium Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
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
        </div>
      </motion.div>

      {/* Recent Activity with premium cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <Link
              href="/dashboard/sites"
              className="group text-white/70 hover:text-white text-sm font-medium inline-flex items-center gap-1 transition-all duration-300"
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
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link
                    href={`/dashboard/sites/${activity.id}`}
                    className="group flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                        {{
                          SHOPIFY: '🛍️',
                          WORDPRESS: '📝',
                          WIX: '🎨',
                          CUSTOM: '⚡',
                        }[activity.platform] || '🌐'}
                      </div>
                      <div>
                        <p className="text-white text-lg font-semibold group-hover:text-blue-200 transition-colors">
                          {activity.displayName || activity.domain}
                        </p>
                        <p className="text-white/60 text-sm">
                          {activity.issuesCount} active issues • {activity.fixesCount} fixes this month
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-6 w-6 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-4"
              >
                <TrendingUp className="h-10 w-10 text-white/60" />
              </motion.div>
              <p className="text-white/80 text-lg mb-2">No activity yet</p>
              <p className="text-white/50">
                Connect a site to start seeing SEO automation in action
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Getting Started Checklist (for new users) with premium styling */}
      {stats.sitesCount === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-white" />
                Getting Started
              </h2>
              <div className="space-y-4">
                <ChecklistItem completed={false} text="Connect your first site" delay={0.8} />
                <ChecklistItem completed={false} text="Run your first SEO analysis" delay={0.9} />
                <ChecklistItem completed={false} text="Apply AI-powered fixes" delay={1.0} />
                <ChecklistItem completed={false} text="Review your analytics" delay={1.1} />
              </div>
            </div>
          </div>
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
      className="flex items-center space-x-4"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
          completed
            ? 'border-emerald-400 bg-emerald-400 shadow-lg shadow-emerald-400/50'
            : 'border-white/30 bg-white/5 hover:border-white/50'
        }`}
      >
        {completed && <span className="text-white text-sm font-bold">✓</span>}
      </motion.div>
      <span className={`text-lg ${completed ? 'text-white/50 line-through' : 'text-white'} transition-colors`}>
        {text}
      </span>
    </motion.div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      {/* Header skeleton */}
      <div>
        <Skeleton className="h-12 w-96 mb-3 bg-white/10 rounded-2xl" variant="shimmer" />
        <Skeleton className="h-6 w-80 bg-white/10 rounded-2xl" variant="shimmer" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32 bg-white/10 rounded-lg" variant="shimmer" />
              <Skeleton className="h-16 w-32 bg-white/10 rounded-lg" variant="shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* Actions skeleton */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
        <Skeleton className="h-8 w-40 mb-6 bg-white/10 rounded-2xl" variant="shimmer" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-16 w-16 rounded-2xl bg-white/10" variant="shimmer" />
              <Skeleton className="h-6 w-48 bg-white/10 rounded-lg" variant="shimmer" />
              <Skeleton className="h-4 w-full bg-white/10 rounded-lg" variant="shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
