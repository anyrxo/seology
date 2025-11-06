'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  Globe,
  Info,
  LineChart,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { MetricCard } from '@/components/ui/MetricCard'
import { ProgressCircle } from '@/components/ui/ProgressCircle'
import { LineChart as Chart } from '@/components/charts/LineChart'
import { Badge } from '@/components/ui/badge'

// Type definitions
interface Connection {
  id: string
  domain: string
  displayName: string | null
  platform: string
  status: string
  healthStatus: string
  pageCount: number
  issueCount: number
  lastCrawlAt: string | null
  lastAnalysisAt: string | null
  lastSync: string | null
  createdAt: string
  updatedAt: string
}

interface Stats {
  healthScore: number
  totalIssues: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
  lowIssues: number
  totalFixes: number
  fixSuccessRate: number
  totalPages: number
}

interface Issue {
  id: string
  type: string
  severity: string
  title: string
  description: string
  pageUrl: string
  status: string
  details: string
  detectedAt: string
  createdAt: string
  fixes: Array<{
    id: string
    status: string
    createdAt: string
  }>
}

interface Fix {
  id: string
  status: string
  type: string
  targetUrl: string | null
  changesMade: string | null
  beforeState: string
  afterState: string
  canRollback: boolean
  createdAt: string
  appliedAt: string | null
  issue: {
    id: string
    type: string
    title: string
    severity: string
    pageUrl: string
  } | null
}

interface ActivityItem {
  id: string
  type: 'issue_detected' | 'fix_applied'
  timestamp: string
  data: {
    type: string
    severity?: string
    title?: string
    pageUrl?: string
    status?: string
  }
}

interface HealthHistoryItem {
  date: string
  score: number
  performance: number
  seo: number
  accessibility: number
}

interface IssueResolutionTrendItem {
  [key: string]: string | number
  date: string
  detected: number
  fixed: number
}

interface QuickFixSuggestion {
  id: string
  type: string
  severity: string
  title: string
  description: string
  pageUrl: string
}

interface IssueByCategoryItem {
  category: string
  count: number
}

interface IssuesBySeverity {
  CRITICAL: number
  HIGH: number
  MEDIUM: number
  LOW: number
}

interface HealthHistoryItem {
  [key: string]: string | number
  date: string
  score: number
  performance: number
  seo: number
  accessibility: number
}

interface SiteData {
  connection: Connection
  stats: Stats
  issues: Issue[]
  fixes: Fix[]
  recentActivity: ActivityItem[]
  healthHistory: HealthHistoryItem[]
  issueResolutionTrend: IssueResolutionTrendItem[]
  quickFixSuggestions: QuickFixSuggestion[]
  issuesByCategory: IssueByCategoryItem[]
  issuesBySeverity: IssuesBySeverity
  executionMode: string
}

interface SiteDetailsClientProps {
  siteData: SiteData
  initialTab?: string
}

export function SiteDetailsClient({ siteData, initialTab }: SiteDetailsClientProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { connection, stats, issues, fixes, recentActivity, healthHistory, issueResolutionTrend, quickFixSuggestions, issuesByCategory, issuesBySeverity, executionMode } = siteData

  // Platform icons and colors
  const platformConfig = {
    SHOPIFY: { icon: '🛍️', color: 'from-green-500 to-emerald-600', name: 'Shopify' },
    WORDPRESS: { icon: '📝', color: 'from-blue-500 to-indigo-600', name: 'WordPress' },
    WIX: { icon: '🎨', color: 'from-purple-500 to-pink-600', name: 'Wix' },
    GITHUB: { icon: '🐙', color: 'from-gray-600 to-gray-800', name: 'GitHub' },
    CUSTOM: { icon: '⚡', color: 'from-orange-500 to-red-600', name: 'Custom' },
  }

  const platform = platformConfig[connection.platform as keyof typeof platformConfig] || platformConfig.CUSTOM

  // Status badge config
  const statusConfig = {
    CONNECTED: { label: 'Connected', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    PENDING: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    ERROR: { label: 'Error', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
    DISCONNECTED: { label: 'Disconnected', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  }

  const status = statusConfig[connection.status as keyof typeof statusConfig] || statusConfig.DISCONNECTED

  // Health status color
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  // Filter issues
  const filteredIssues = issues.filter((issue: Issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || issue.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter
    return matchesSearch && matchesSeverity && matchesStatus
  })

  return (
    <div className="space-y-6 p-6">
      {/* Hero Section */}
      <div className="space-y-4">
        {/* Back button */}
        <Link
          href="/dashboard/sites"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sites
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Favicon / Platform Icon */}
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg',
              `bg-gradient-to-br ${platform.color}`
            )}>
              {platform.icon}
            </div>

            {/* Site Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">
                  {connection.displayName || connection.domain}
                </h1>
                <Badge className={cn('border', status.color)}>
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href={`https://${connection.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {connection.domain}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="h-4 w-4" />
                  Last scan: {connection.lastCrawlAt ? new Date(connection.lastCrawlAt).toLocaleDateString() : 'Never'}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20">
              <RefreshCw className="h-4 w-4" />
              Scan Now
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium transition-colors">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-600 text-white border border-white/10 hover:border-red-600 rounded-xl font-medium transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Health Score - Large Circular */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Large Health Score */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <ProgressCircle
                value={stats.healthScore}
                size={120}
                strokeWidth={8}
                showValue
                className={getHealthColor(stats.healthScore)}
              />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-400">Health Score</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.healthScore >= 80 ? 'Excellent' : stats.healthScore >= 60 ? 'Good' : stats.healthScore >= 40 ? 'Fair' : 'Poor'}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <MetricCard
              title="Total Pages"
              value={stats.totalPages}
              icon={FileText}
              iconColor="bg-blue-500/10 text-blue-400"
              variant="compact"
            />
            <MetricCard
              title="Open Issues"
              value={stats.totalIssues}
              icon={AlertCircle}
              iconColor="bg-yellow-500/10 text-yellow-400"
              variant="compact"
              change={
                stats.totalIssues > 0
                  ? { value: stats.criticalIssues, label: 'critical', type: 'decrease' }
                  : undefined
              }
            />
            <MetricCard
              title="Fixes Applied"
              value={stats.totalFixes}
              icon={CheckCircle2}
              iconColor="bg-green-500/10 text-green-400"
              variant="compact"
              change={{ value: stats.fixSuccessRate, label: 'success', type: 'increase' }}
            />
            <MetricCard
              title="Health Trend"
              value={`${stats.healthScore >= 75 ? '+' : ''}${Math.round((stats.healthScore - 70) / 7)}%`}
              icon={TrendingUp}
              iconColor="bg-purple-500/10 text-purple-400"
              variant="compact"
              change={{ value: 7, label: 'vs last week', type: stats.healthScore >= 75 ? 'increase' : 'decrease' }}
            />
          </div>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="issues">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Issues ({stats.totalIssues})
          </TabsTrigger>
          <TabsTrigger value="fixes">
            <Wrench className="h-4 w-4 mr-2" />
            Fixes ({stats.totalFixes})
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <LineChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Critical Issues"
              value={stats.criticalIssues}
              icon={Shield}
              iconColor="bg-red-500/10 text-red-400"
              description="Requires immediate attention"
            />
            <MetricCard
              title="High Priority"
              value={stats.highIssues}
              icon={AlertCircle}
              iconColor="bg-orange-500/10 text-orange-400"
              description="Should be fixed soon"
            />
            <MetricCard
              title="Medium Priority"
              value={stats.mediumIssues}
              icon={Info}
              iconColor="bg-yellow-500/10 text-yellow-400"
              description="Minor improvements"
            />
            <MetricCard
              title="Low Priority"
              value={stats.lowIssues}
              icon={CheckCircle2}
              iconColor="bg-blue-500/10 text-blue-400"
              description="Optimization opportunities"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Issue Resolution Trend */}
            <Chart
              title="Issue Resolution (Last 7 Days)"
              data={issueResolutionTrend}
              lines={[
                { dataKey: 'detected', name: 'Detected', color: '#F59E0B' },
                { dataKey: 'fixed', name: 'Fixed', color: '#10B981' },
              ]}
              xAxisKey="date"
              height={300}
            />

            {/* Health Score History */}
            {healthHistory.length > 0 && (
              <Chart
                title="Health Score History"
                data={healthHistory}
                lines={[
                  { dataKey: 'score', name: 'Overall', color: '#3B82F6' },
                  { dataKey: 'performance', name: 'Performance', color: '#8B5CF6' },
                  { dataKey: 'seo', name: 'SEO', color: '#10B981' },
                ]}
                xAxisKey="date"
                height={300}
              />
            )}
          </div>

          {/* Issue Breakdown by Category */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Issue Breakdown by Category</h3>
            <div className="space-y-3">
              {issuesByCategory.slice(0, 5).map((item: IssueByCategoryItem) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-white">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(item.count / stats.totalIssues) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white min-w-[2rem] text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Fix Suggestions */}
          {quickFixSuggestions.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Quick Fix Suggestions</h3>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  High Impact
                </Badge>
              </div>
              <div className="space-y-3">
                {quickFixSuggestions.map((issue: QuickFixSuggestion) => (
                  <div
                    key={issue.id}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <SeverityBadge severity={issue.severity} />
                          <h4 className="text-sm font-semibold text-white">{issue.title}</h4>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{issue.description}</p>
                        <p className="text-xs text-gray-500">
                          <Globe className="h-3 w-3 inline mr-1" />
                          {issue.pageUrl}
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                        Fix Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Recent Activity Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity: ActivityItem, index: number) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    activity.type === 'issue_detected'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-green-500/10 text-green-400'
                  )}>
                    {activity.type === 'issue_detected' ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">
                      {activity.type === 'issue_detected' ? 'Issue Detected' : 'Fix Applied'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.type === 'issue_detected'
                        ? `${activity.data.title} on ${activity.data.pageUrl}`
                        : `${activity.data.type} - ${activity.data.status}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-6 mt-6">
          {/* Filters */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Severity Filter */}
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DETECTED">Detected</option>
              </select>
            </div>
          </Card>

          {/* Severity Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{issuesBySeverity.CRITICAL}</p>
                  <p className="text-xs text-gray-400">Critical</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{issuesBySeverity.HIGH}</p>
                  <p className="text-xs text-gray-400">High</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Info className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{issuesBySeverity.MEDIUM}</p>
                  <p className="text-xs text-gray-400">Medium</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{issuesBySeverity.LOW}</p>
                  <p className="text-xs text-gray-400">Low</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Issues List */}
          {filteredIssues.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Issues Found</h3>
                <p className="text-sm text-gray-400">
                  {searchQuery || severityFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Your site is in great shape!'}
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredIssues.map((issue: Issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Fixes Tab */}
        <TabsContent value="fixes" className="space-y-6 mt-6">
          {/* Fix Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Fixes"
              value={stats.totalFixes}
              icon={Wrench}
              iconColor="bg-blue-500/10 text-blue-400"
            />
            <MetricCard
              title="Success Rate"
              value={`${stats.fixSuccessRate}%`}
              icon={CheckCircle2}
              iconColor="bg-green-500/10 text-green-400"
              change={{ value: stats.fixSuccessRate - 85, label: 'vs average', type: stats.fixSuccessRate >= 85 ? 'increase' : 'decrease' }}
            />
            <MetricCard
              title="Execution Mode"
              value={executionMode}
              icon={Zap}
              iconColor="bg-purple-500/10 text-purple-400"
              description="Current automation mode"
            />
          </div>

          {/* Fixes List */}
          {fixes.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Fixes Yet</h3>
                <p className="text-sm text-gray-400">
                  Fixes will appear here once issues are resolved
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {fixes.map((fix: Fix) => (
                <FixCard key={fix.id} fix={fix} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 mt-6">
          {/* Coming Soon Placeholder */}
          <Card className="p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Advanced Analytics Coming Soon</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                We're working on comprehensive analytics including traffic trends, keyword rankings, and performance metrics.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Site Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={connection.displayName || connection.domain}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Execution Mode</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="AUTOMATIC">Automatic - Apply fixes immediately</option>
                  <option value="PLAN">Plan - Review and approve all fixes at once</option>
                  <option value="APPROVE">Approve - Review each fix individually</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Scan Frequency</label>
                <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual Only</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-500/20">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Disconnect Site</p>
                  <p className="text-xs text-gray-400 mt-1">Remove this site from Seology.AI</p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Disconnect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">Delete Site</p>
                  <p className="text-xs text-gray-400 mt-1">Permanently delete all data for this site</p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Delete Site</h3>
                  <p className="text-sm text-gray-400">This action cannot be undone</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6">
                Are you sure you want to delete <strong>{connection.displayName || connection.domain}</strong>? All data, issues, and fixes will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors">
                  Delete Site
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Severity Badge Component
function SeverityBadge({ severity }: { severity: string }) {
  const config = {
    CRITICAL: { label: 'Critical', className: 'bg-red-500/10 text-red-400 border-red-500/20' },
    HIGH: { label: 'High', className: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    MEDIUM: { label: 'Medium', className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    LOW: { label: 'Low', className: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  }

  const badge = config[severity as keyof typeof config] || config.LOW

  return (
    <Badge className={cn('border text-xs', badge.className)}>
      {badge.label}
    </Badge>
  )
}

// Issue Card Component
function IssueCard({ issue }: { issue: any }) {
  const [expanded, setExpanded] = useState(false)

  let details
  try {
    details = typeof issue.details === 'string' ? JSON.parse(issue.details) : issue.details
  } catch {
    details = { recommendation: 'No recommendation available' }
  }

  return (
    <Card className="p-5 hover:border-blue-500/50 transition-all cursor-pointer" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <SeverityBadge severity={issue.severity} />
                <h4 className="text-sm font-semibold text-white">{issue.title}</h4>
              </div>
              <p className="text-xs text-gray-400">{issue.description}</p>
            </div>
            <ChevronRight className={cn(
              'h-5 w-5 text-gray-400 transition-transform flex-shrink-0',
              expanded && 'rotate-90'
            )} />
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {issue.pageUrl}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(issue.detectedAt).toLocaleDateString()}
            </span>
          </div>

          {expanded && details.recommendation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 border-t border-white/10"
            >
              <p className="text-xs font-medium text-gray-400 mb-2">Recommendation:</p>
              <p className="text-sm text-gray-300">{details.recommendation}</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                Apply Fix
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}

// Fix Card Component
function FixCard({ fix }: { fix: any }) {
  const [showDetails, setShowDetails] = useState(false)

  const statusConfig = {
    PENDING: { label: 'Pending', icon: Clock, className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    APPLIED: { label: 'Applied', icon: CheckCircle2, className: 'bg-green-500/10 text-green-400 border-green-500/20' },
    FAILED: { label: 'Failed', icon: X, className: 'bg-red-500/10 text-red-400 border-red-500/20' },
    ROLLED_BACK: { label: 'Rolled Back', icon: RotateCcw, className: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
  }

  const status = statusConfig[fix.status as keyof typeof statusConfig] || statusConfig.PENDING
  const StatusIcon = status.icon

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', status.className.split(' ')[0])}>
          <StatusIcon className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-semibold text-white">{fix.type}</h4>
                <Badge className={cn('border text-xs', status.className)}>
                  {status.label}
                </Badge>
              </div>
              {fix.issue && (
                <p className="text-xs text-gray-400">Fixed: {fix.issue.title}</p>
              )}
              {fix.targetUrl && (
                <p className="text-xs text-gray-500 mt-1">
                  <Globe className="h-3 w-3 inline mr-1" />
                  {fix.targetUrl}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {fix.canRollback && fix.status === 'APPLIED' && (
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Rollback">
                  <RotateCcw className="h-4 w-4 text-gray-400" />
                </button>
              )}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronRight className={cn(
                  'h-4 w-4 text-gray-400 transition-transform',
                  showDetails && 'rotate-90'
                )} />
              </button>
            </div>
          </div>

          {fix.appliedAt && (
            <p className="text-xs text-gray-500">
              Applied {new Date(fix.appliedAt).toLocaleString()}
            </p>
          )}

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-3 border-t border-white/10 space-y-3"
            >
              {fix.changesMade && (
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2">Changes Made:</p>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-300 font-mono">{fix.changesMade}</p>
                  </div>
                </div>
              )}

              {fix.beforeState && fix.afterState && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-2">Before:</p>
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <pre className="text-xs text-gray-300 overflow-x-auto">{fix.beforeState}</pre>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 mb-2">After:</p>
                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <pre className="text-xs text-gray-300 overflow-x-auto">{fix.afterState}</pre>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}
