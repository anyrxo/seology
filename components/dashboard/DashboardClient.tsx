'use client'

import { useDashboardStats } from '@/lib/hooks/useDashboardStats'
import Link from 'next/link'
import { ActivityTimeline, type ActivityItem } from './ActivityTimeline'
import { LineChartPlaceholder, BarChartPlaceholder } from './ChartPlaceholder'
import { DashflowDataTable, type TableColumn } from './DashflowDataTable'
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
                <h1 className="rt-component-heading-two display-1 color-neutral-800">
                  Welcome back, {userName}!
                </h1>
                <p className="rt-text-block text-200 color-neutral-600">
                  Here's what's happening with your SEO automation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid using actual Dashflow X cards with card-icon-square and card-amount-container */}
        <div className="grid-4-columns _1-column-tablet gap-row-32px gap-column-12px">
          {/* Sites Connected Card */}
          <div className="card pd-24px">
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px">
                <div className="text-200">🌐</div>
              </div>
              <div className="badge green">
                <div className="text-50 medium">{stats.sitesCount > 0 ? 'Active' : 'Get started'}</div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px">
              <div className="text-100 medium color-neutral-600">Sites Connected</div>
              <div className="card-amount-container green">
                <div className="display-2 color-neutral-800">{stats.sitesCount}</div>
              </div>
            </div>
          </div>

          {/* Issues Detected Card */}
          <div className="card pd-24px---18px">
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
            <div className="flex-vertical gap-row-12px">
              <div className="text-100 medium color-neutral-600">Issues Detected</div>
              <div className={`card-amount-container ${stats.activeIssuesCount > 0 ? 'red' : 'green'}`}>
                <div className="display-2 color-neutral-800">{stats.activeIssuesCount}</div>
              </div>
            </div>
          </div>

          {/* Fixes Applied Card */}
          <div className="card pd-22px---18px">
            <div className="flex-horizontal space-between align-center mg-bottom-16px">
              <div className="card-icon-square _26px">
                <div className="text-200">✅</div>
              </div>
              <div className="badge green">
                <div className="text-50 medium">This month</div>
              </div>
            </div>
            <div className="flex-vertical gap-row-12px">
              <div className="text-100 medium color-neutral-600">Fixes Applied</div>
              <div className="card-amount-container green">
                <div className="display-2 color-neutral-800">{stats.fixesThisMonth}</div>
              </div>
            </div>
          </div>

          {/* Usage Card */}
          <div className="card pd-16px">
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
            <div className="flex-vertical gap-row-12px">
              <div className="text-100 medium color-neutral-600">Usage This Month</div>
              <div className={`card-amount-container ${stats.usagePercent >= 90 ? 'red' : 'green'}`}>
                <div className="display-2 color-neutral-800">{stats.usagePercent}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Progress Bar with card-icon-square */}
        {stats.usagePercent > 0 && (
          <div className="card pd-32px---24px">
            <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-16px">
              <div className="flex-horizontal gap-column-12px align-center">
                <div className="card-icon-square _40px">
                  <div className="text-300">📈</div>
                </div>
                <h3 className="text-300 bold color-neutral-800">Monthly Usage</h3>
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
              <p className="rt-text-block text-100 color-neutral-600 mg-top-12px">
                You're approaching your monthly limit. Consider upgrading your plan.
              </p>
            )}
          </div>
        )}

        {/* Quick Actions using Dashflow X buttons with card-icon-square */}
        <div className="rt-component-section card pd-32px---44px">
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-32px">
            <div className="card-icon-square _40px neutral-icon">
              <div className="text-300">⚡</div>
            </div>
            <h2 className="text-400 bold color-neutral-800">Quick Actions</h2>
          </div>
          <div className="w-layout-vflex flex-vertical gap-row-24px">
            <div className="grid-3-columns _1-column-mbl gap-row-24px gap-column-12px">
              <Link href="/dashboard/sites/connect" className="card pd-24px hover-card-link">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-300">🔗</div>
                  </div>
                  <div className="flex-vertical gap-row-8px">
                    <div className="text-200 bold color-neutral-800">Connect Site</div>
                    <div className="text-100 color-neutral-600">Link your first website</div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="card pd-24px hover-card-link">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px neutral-icon">
                    <div className="text-300">📊</div>
                  </div>
                  <div className="flex-vertical gap-row-8px">
                    <div className="text-200 bold color-neutral-800">View Analytics</div>
                    <div className="text-100 color-neutral-600">Track performance</div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/billing" className="card pd-24px hover-card-link">
                <div className="flex-vertical gap-row-16px">
                  <div className="card-icon-square _40px">
                    <div className="text-300">🚀</div>
                  </div>
                  <div className="flex-vertical gap-row-8px">
                    <div className="text-200 bold color-neutral-800">Upgrade Plan</div>
                    <div className="text-100 color-neutral-600">Unlock more features</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
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
        <div className="rt-component-section card pd-32px---24px">
          <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-24px">
            <div className="flex-horizontal gap-column-12px align-center">
              <div className="card-icon-square _40px">
                <div className="text-300">⏱️</div>
              </div>
              <h2 className="text-400 bold color-neutral-800">Recent Activity</h2>
            </div>
            <Link href="/dashboard/sites" className="rt-nav-text text-100 medium color-accent-1 hover-neutral-800">
              View All →
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
                <h3 className="text-300 bold color-neutral-800">Recent Issues</h3>
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
                <h3 className="text-300 bold color-neutral-800">Recent Fixes</h3>
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
          <div className="card pd-32px---44px">
            <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <div className="text-300">🎯</div>
              </div>
              <h2 className="text-300 bold color-neutral-800">
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
    <div className="card pd-16px">
      <div className="flex-horizontal gap-column-12px align-center">
        <div className="card-icon-square _26px neutral-icon">
          <div className="text-100">{icon}</div>
        </div>
        <div className={`checkbox ${completed ? 'checked' : ''}`}>
          {completed && <span className="text-50">✓</span>}
        </div>
        <span className={`text-100 medium ${completed ? 'color-neutral-500' : 'color-neutral-800'}`}>
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
