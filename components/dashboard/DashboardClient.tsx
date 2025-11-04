'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'
import { ActivityTimeline, type ActivityItem } from './ActivityTimeline'
import { LineChartPlaceholder, BarChartPlaceholder } from './ChartPlaceholder'
import { DashflowDataTable, type TableColumn } from './DashflowDataTable'
import { SEOWorkflowMap } from './SEOWorkflowMap'
import { LiveActivityFeed } from './LiveActivityFeed'
import { IssueSeverityCards, IssueSummary } from './IssueSeverityCards'
import { AnimatedCounter, TrendIndicator } from './AnimatedCounter'
import { motion } from 'framer-motion'
import {
  Globe,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Link2,
  BarChart3,
  Rocket,
  ArrowRight,
  Sparkles,
  Clock,
  Search,
  Zap
} from 'lucide-react'

// Mock data for demonstration (will be replaced with real data from API)
const mockActivityData: ActivityItem[] = [
  {
    id: '1',
    type: 'fix',
    title: 'Fixed missing meta description',
    description: 'Updated meta description for product page',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
    siteName: 'My Store',
    status: 'success',
  },
  {
    id: '2',
    type: 'issue',
    title: 'New SEO issue detected',
    description: 'Missing alt text on 3 images',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    siteName: 'My Blog',
    status: 'warning',
  },
  {
    id: '3',
    type: 'scan',
    title: 'Site scan completed',
    description: 'Analyzed 45 pages',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    siteName: 'My Store',
    status: 'success',
  },
]

interface IssueRow extends Record<string, unknown> {
  id: string
  type: string
  page: string
  severity: string
  detected: string
}

interface FixRow extends Record<string, unknown> {
  id: string
  description: string
  site: string
  status: string
  applied: string
}

const issueColumns: TableColumn<IssueRow>[] = [
  { key: 'type', label: 'Type', sortable: true },
  { key: 'page', label: 'Page', sortable: true },
  {
    key: 'severity',
    label: 'Severity',
    sortable: true,
    render: (value) => {
      const severity = String(value)
      return (
        <div className={`badge ${severity === 'High' ? 'red' : severity === 'Medium' ? 'orange' : 'neutral'}`}>
          <div className="text-50 medium">{severity}</div>
        </div>
      ) as React.ReactNode
    },
  },
  { key: 'detected', label: 'Detected', sortable: true },
]

const fixColumns: TableColumn<FixRow>[] = [
  { key: 'description', label: 'Fix', sortable: true },
  { key: 'site', label: 'Site', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (value) => {
      const status = String(value)
      return (
        <div className={`badge ${status === 'Applied' ? 'green' : 'neutral'}`}>
          <div className="text-50 medium">{status}</div>
        </div>
      ) as React.ReactNode
    },
  },
  { key: 'applied', label: 'Applied', sortable: true },
]

const mockRecentIssues: IssueRow[] = [
  {
    id: '1',
    type: 'Missing meta description',
    page: '/products/item-1',
    severity: 'High',
    detected: '2 hours ago',
  },
  {
    id: '2',
    type: 'Missing alt text',
    page: '/blog/post-1',
    severity: 'Medium',
    detected: '5 hours ago',
  },
  {
    id: '3',
    type: 'Broken link',
    page: '/about',
    severity: 'Low',
    detected: '1 day ago',
  },
]

const mockRecentFixes: FixRow[] = [
  {
    id: '1',
    description: 'Added meta description',
    site: 'My Store',
    status: 'Applied',
    applied: '30 min ago',
  },
  {
    id: '2',
    description: 'Fixed broken link',
    site: 'My Blog',
    status: 'Applied',
    applied: '2 hours ago',
  },
  {
    id: '3',
    description: 'Updated page title',
    site: 'My Store',
    status: 'Applied',
    applied: '5 hours ago',
  },
]

export function DashboardClient({ userName }: { userName: string }) {
  const { stats, isLoading, isError } = useDashboardStats()

  // Show error state if API failed
  if (isError && !isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-lg"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 mb-6">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Unable to load dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Please check your connection and try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
          >
            Refresh Page
          </button>
        </motion.div>
      </div>
    )
  }

  // Show loading skeleton
  if (isLoading || !stats) {
    return <DashboardSkeleton />
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Welcome Header using Dashflow X typography with Radiant UI components */}
        <div className="rt-component-section mg-bottom-48px">
          <div className="flex-vertical gap-row-12px">
            <div className="w-layout-hflex flex-horizontal gap-column-16px align-center">
              <div className="card-icon-square _40px neutral-icon">
                <div className="text-400">👋</div>
              </div>
              <div className="flex-vertical">
                <h1 className="rt-component-heading-two display-1 text-white">
                  Welcome back, {userName}!
                </h1>
                <p className="rt-text-block text-200 text-gray-400">
                  Here's what's happening with your SEO automation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Workflow Pipeline - Fluency-inspired real-time process visualization */}
        <SEOWorkflowMap />

        {/* Stats Grid using actual Dashflow X cards with card-icon-square and card-amount-container */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Sites Connected Card */}
          <motion.div
            className="card pd-24px relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px">
                <div className="text-200">🌐</div>
              </div>
              <div className="badge green">
                <div className="text-50 medium">{stats.sitesCount > 0 ? 'Active' : 'Get started'}</div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px relative z-10">
              <div className="text-100 medium text-gray-400">Sites Connected</div>
              <div className="card-amount-container green">
                <AnimatedCounter value={stats.sitesCount} className="display-2 text-white" />
              </div>
              {stats.sitesCount > 0 && (
                <TrendIndicator value={stats.sitesCount} direction="up" label="active" />
              )}
            </div>
          </motion.div>

          {/* Issues Detected Card */}
          <motion.div
            className="card pd-24px---18px relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px neutral-icon">
                <div className="text-200">🔍</div>
              </div>
              <div className={`badge ${stats.activeIssuesCount > 0 ? 'red' : 'green'}`}>
                <div className="text-50 medium">
                  {stats.activeIssuesCount > 0 ? 'Needs attention' : 'All clear'}
                </div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px relative z-10">
              <div className="text-100 medium text-gray-400">Issues Detected</div>
              <div className={`card-amount-container ${stats.activeIssuesCount > 0 ? 'red' : 'green'}`}>
                <AnimatedCounter value={stats.activeIssuesCount} className="display-2 text-white" />
              </div>
              {stats.activeIssuesCount > 0 && (
                <TrendIndicator value={stats.activeIssuesCount} direction="down" label="needs fixing" />
              )}
            </div>
          </motion.div>

          {/* Fixes Applied Card */}
          <motion.div
            className="card pd-22px---18px relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-green-500/10"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px">
                <div className="text-200">✅</div>
              </div>
              <div className="badge green">
                <div className="text-50 medium">This month</div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px relative z-10">
              <div className="text-100 medium text-gray-400">Fixes Applied</div>
              <div className="card-amount-container green">
                <AnimatedCounter value={stats.fixesThisMonth} className="display-2 text-white" />
              </div>
              {stats.fixesThisMonth > 0 && (
                <TrendIndicator value={stats.fixesThisMonth} direction="up" label="this month" />
              )}
            </div>
          </motion.div>

          {/* Usage Card */}
          <motion.div
            className="card pd-16px relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }
              }
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px neutral-icon">
                <div className="text-200">📊</div>
              </div>
              <div className={`badge ${stats.usagePercent < 80 ? 'green' : 'orange'}`}>
                <div className="text-50 medium">
                  {stats.fixesThisMonth}/{stats.fixLimit}
                </div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px relative z-10">
              <div className="text-100 medium text-gray-400">Usage This Month</div>
              <div className={`card-amount-container ${stats.usagePercent >= 90 ? 'red' : 'green'}`}>
                <AnimatedCounter value={stats.usagePercent} suffix="%" className="display-2 text-white" />
              </div>
              {stats.usagePercent > 0 && (
                <TrendIndicator
                  value={stats.usagePercent}
                  direction={stats.usagePercent >= 90 ? 'up' : 'neutral'}
                  label="of limit"
                />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Issue Severity Cards - Fluency-inspired severity breakdown */}
        {stats.activeIssuesCount > 0 && (
          <IssueSeverityCards
            counts={{
              critical: Math.floor(stats.activeIssuesCount * 0.2),
              warning: Math.floor(stats.activeIssuesCount * 0.5),
              info: Math.ceil(stats.activeIssuesCount * 0.3)
            }}
          />
        )}

        {/* Usage Progress Bar with card-icon-square */}
        {stats.usagePercent > 0 && (
          <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-16px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _40px">
                  <div className="text-300">📈</div>
                </div>
                <h3 className="text-300 bold text-white">Monthly Usage</h3>
              </div>
              <div className={`badge ${
                stats.usagePercent >= 90 ? 'red' :
                stats.usagePercent >= 70 ? 'orange' : 'green'
              }`}>
                <div className="text-100 medium">
                  {stats.fixesThisMonth} / {stats.fixLimit} fixes
                </div>
              </div>
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar ${
                    stats.usagePercent >= 90 ? 'red' :
                    stats.usagePercent >= 70 ? 'orange' : 'green'
                  }`}
                  style={{ width: `${stats.usagePercent}%` }}
                ></div>
              </div>
            </div>
            {stats.usagePercent >= 90 && (
              <p className="rt-text-block text-100 text-gray-400 mg-top-12px">
                You're approaching your monthly limit. Consider upgrading your plan.
              </p>
            )}
          </div>
        )}

        {/* Quick Actions using Dashflow X buttons with card-icon-square */}
        <div className="rt-component-section card pd-32px---44px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-32px">
            <div className="card-icon-square _40px neutral-icon">
              <div className="text-300">⚡</div>
            </div>
            <h2 className="text-400 bold text-white">Quick Actions</h2>
          </div>
          <div className="w-layout-vflex flex-vertical gap-row-24px">
            <div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-12px">
              <Link href="/dashboard/sites/connect" className="card pd-24px hover-card-link group relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-500/30">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-300">🔗</div>
                  </div>
                  <div className="flex-vertical gap-row-8px relative z-10">
                    <div className="text-200 bold text-white">Connect Site</div>
                    <div className="text-100 text-gray-400">Link your first website</div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="card pd-24px hover-card-link group relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/30">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px neutral-icon">
                    <div className="text-300">📊</div>
                  </div>
                  <div className="flex-vertical gap-row-8px relative z-10">
                    <div className="text-200 bold text-white">View Analytics</div>
                    <div className="text-100 text-gray-400">Track performance</div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/billing" className="card pd-24px hover-card-link group relative overflow-hidden bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-500/30">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-300">🚀</div>
                  </div>
                  <div className="flex-vertical gap-row-8px relative z-10">
                    <div className="text-200 bold text-white">Upgrade Plan</div>
                    <div className="text-100 text-gray-400">Unlock more features</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Activity & Issue Summary - Fluency-inspired real-time dashboard */}
        <div className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px">
          <LiveActivityFeed
            activities={mockActivityData.map(activity => ({
              id: activity.id,
              type: activity.type === 'fix' ? 'fix' : activity.type === 'issue' ? 'issue' : activity.type === 'scan' ? 'scan' : 'connection',
              title: activity.title,
              description: activity.description || '',
              site: activity.siteName || '',
              timestamp: activity.timestamp,
              severity: activity.status === 'warning' ? 'high' : activity.status === 'error' ? 'high' : 'low'
            }))}
            maxItems={6}
            showTimestamp={true}
            autoRefresh={false}
          />
          <IssueSummary
            counts={{
              critical: Math.floor(stats.activeIssuesCount * 0.2),
              warning: Math.floor(stats.activeIssuesCount * 0.5),
              info: Math.ceil(stats.activeIssuesCount * 0.3)
            }}
          />
        </div>

        {/* Analytics Charts Section - Dashflow X Style */}
        <div className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px">
          <LineChartPlaceholder
            title="SEO Performance"
            subtitle="Last 30 days"
            icon="📈"
            trend={{ value: 12.5, direction: 'up', label: 'vs last month' }}
          />
          <BarChartPlaceholder
            title="Fixes by Type"
            subtitle="This month"
            icon="🔧"
            value={stats.fixesThisMonth.toString()}
          />
        </div>

        {/* Recent Activity Timeline - Enhanced with ActivityTimeline component */}
        <div className="rt-component-section card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-24px">
            <div className="flex-horizontal gap-column-12px align-center">
              <div className="card-icon-square _40px">
                <div className="text-300">⏱️</div>
              </div>
              <h2 className="text-400 bold text-white">Recent Activity</h2>
            </div>
            <Link href="/dashboard/sites" className="rt-nav-text text-100 medium color-accent-1 hover-neutral-800">
              View All <ArrowRight className="inline w-4 h-4" />
            </Link>
          </div>
          <ActivityTimeline
            activities={mockActivityData}
            maxItems={5}
            showSiteName={true}
          />
        </div>

        {/* Recent Issues & Fixes Tables - Dashflow X Data Tables */}
        {stats.sitesCount > 0 && (
          <div className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px">
            {/* Recent Issues */}
            <div>
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-16px">
                <div className="card-icon-square _26px neutral-icon">
                  <div className="text-200">🔍</div>
                </div>
                <h3 className="text-300 bold text-white">Recent Issues</h3>
              </div>
              <DashflowDataTable
                data={mockRecentIssues}
                columns={issueColumns}
                emptyIcon="✨"
                emptyTitle="No issues found"
                emptyMessage="Great! Your sites are looking good."
                pageSize={5}
                showPagination={false}
              />
            </div>

            {/* Recent Fixes */}
            <div>
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-16px">
                <div className="card-icon-square _26px">
                  <div className="text-200">✅</div>
                </div>
                <h3 className="text-300 bold text-white">Recent Fixes</h3>
              </div>
              <DashflowDataTable
                data={mockRecentFixes}
                columns={fixColumns}
                emptyIcon="🔧"
                emptyTitle="No fixes yet"
                emptyMessage="Issues will be fixed automatically as they're detected."
                pageSize={5}
                showPagination={false}
              />
            </div>
          </div>
        )}

        {/* Getting Started Checklist with multiple card padding variants */}
        {stats.sitesCount === 0 && (
          <div className="card pd-32px---44px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
            <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <div className="text-300">🎯</div>
              </div>
              <h2 className="text-300 bold text-white">
                Getting Started
              </h2>
            </div>
            <div className="grid-2-columns gap-row-16px gap-column-12px">
              <ChecklistItem completed={false} text="Connect your first site" icon="🔗" />
              <ChecklistItem completed={false} text="Run your first SEO analysis" icon="🔍" />
              <ChecklistItem completed={false} text="Apply AI-powered fixes" icon="🤖" />
              <ChecklistItem completed={false} text="Review your analytics" icon="📊" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ChecklistItemProps {
  completed: boolean
  text: string
  icon: string
}

function ChecklistItem({ completed, text, icon }: ChecklistItemProps) {
  return (
    <div className="card pd-16px bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10">
      <div className="flex-horizontal gap-column-12px align-center">
        <div className="card-icon-square _26px neutral-icon">
          <div className="text-100">{icon}</div>
        </div>
        <div className={`checkbox ${completed ? 'checked' : ''}`}>
          {completed && <span className="text-50">✓</span>}
        </div>
        <span className={`text-100 medium ${completed ? 'text-gray-500' : 'text-gray-300'}`}>
          {text}
        </span>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header skeleton */}
        <div>
          <div className="skeleton-box" style={{ height: '48px', width: '400px', marginBottom: '12px' }}></div>
          <div className="skeleton-box" style={{ height: '24px', width: '320px' }}></div>
        </div>

        {/* Stats grid skeleton */}
        <div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card pd-24px">
              <div className="skeleton-box" style={{ height: '16px', width: '120px', marginBottom: '16px' }}></div>
              <div className="skeleton-box" style={{ height: '64px', width: '80px' }}></div>
            </div>
          ))}
        </div>

        {/* Actions skeleton */}
        <div className="card pd-32px---24px">
          <div className="skeleton-box" style={{ height: '32px', width: '160px', marginBottom: '32px' }}></div>
          <div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-12px">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton-box" style={{ height: '48px' }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
