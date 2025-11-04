'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Inbox,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  ArrowRight,
  Filter,
  Search,
  Eye,
  ThumbsUp,
  Download,
  RotateCcw,
  Sparkles,
  BarChart3
} from 'lucide-react'

interface DailyReport {
  id: string
  date: string
  reportType: string
  executionMode: string
  sitesScanned: number
  pagesAnalyzed: number
  issuesFound: number
  issuesFixed: number
  issuesPending: number
  imagesOptimized: number
  estimatedTrafficImpact: number
  seoScoreChange: number
  dashboardViewed: boolean
  emailSent: boolean
  createdAt: string
}

interface ReportStats {
  total: number
  unread: number
  thisWeek: number
  thisMonth: number
}

export function ReportsClient() {
  const [reports, setReports] = useState<DailyReport[]>([])
  const [stats, setStats] = useState<ReportStats>({ total: 0, unread: 0, thisWeek: 0, thisMonth: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchReports()
  }, [filter])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      const url = filter === 'unread' ? '/api/reports?unread=true' : '/api/reports'
      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setReports(data.data)

        // Calculate stats
        const unreadCount = data.data.filter((r: DailyReport) => !r.dashboardViewed).length
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

        setStats({
          total: data.data.length,
          unread: unreadCount,
          thisWeek: data.data.filter((r: DailyReport) => new Date(r.createdAt) > weekAgo).length,
          thisMonth: data.data.filter((r: DailyReport) => new Date(r.createdAt) > monthAgo).length
        })
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredReports = reports.filter(report => {
    if (searchQuery) {
      return report.date.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  if (isLoading) {
    return <ReportsLoadingSkeleton />
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="flex-horizontal space-between align-center">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <div className="text-300">📬</div>
            </div>
            <div>
              <h1 className="text-400 bold" style={{ color: 'var(--neutral--800)' }}>
                Automation Reports
              </h1>
              <p className="text-100" style={{ color: 'var(--neutral--600)' }}>
                Daily automation summaries and insights
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4-columns _1-column-tablet gap-column-12px gap-row-12px">
          <motion.div
            className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex-horizontal space-between align-center mg-bottom-12px">
              <div className="card-icon-square _26px">
                <FileText className="w-4 h-4" style={{ color: 'var(--accent--primary-1)' }} />
              </div>
              <div className="badge green">
                <div className="text-50 medium">All time</div>
              </div>
            </div>
            <div className="text-100 medium" style={{ color: 'var(--neutral--600)' }}>Total Reports</div>
            <div className="display-2" style={{ color: 'var(--neutral--800)' }}>{stats.total}</div>
          </motion.div>

          <motion.div
            className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex-horizontal space-between align-center mg-bottom-12px">
              <div className="card-icon-square _26px neutral-icon">
                <Inbox className="w-4 h-4" style={{ color: 'var(--system--orange-300)' }} />
              </div>
              {stats.unread > 0 && (
                <div className="badge orange">
                  <div className="text-50 medium">{stats.unread} new</div>
                </div>
              )}
            </div>
            <div className="text-100 medium" style={{ color: 'var(--neutral--600)' }}>Unread</div>
            <div className="display-2" style={{ color: 'var(--neutral--800)' }}>{stats.unread}</div>
          </motion.div>

          <motion.div
            className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex-horizontal space-between align-center mg-bottom-12px">
              <div className="card-icon-square _26px">
                <Calendar className="w-4 h-4" style={{ color: 'var(--system--blue-300)' }} />
              </div>
              <div className="badge blue">
                <div className="text-50 medium">7 days</div>
              </div>
            </div>
            <div className="text-100 medium" style={{ color: 'var(--neutral--600)' }}>This Week</div>
            <div className="display-2" style={{ color: 'var(--neutral--800)' }}>{stats.thisWeek}</div>
          </motion.div>

          <motion.div
            className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10"
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div className="flex-horizontal space-between align-center mg-bottom-12px">
              <div className="card-icon-square _26px">
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--system--green-300)' }} />
              </div>
              <div className="badge green">
                <div className="text-50 medium">30 days</div>
              </div>
            </div>
            <div className="text-100 medium" style={{ color: 'var(--neutral--600)' }}>This Month</div>
            <div className="display-2" style={{ color: 'var(--neutral--800)' }}>{stats.thisMonth}</div>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
          <div className="flex-horizontal space-between align-center gap-column-16px flex-wrap">
            <div className="flex-horizontal gap-column-8px">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium text-100 transition-all ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                style={filter !== 'all' ? { color: 'var(--neutral--700)' } : {}}
              >
                All Reports
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium text-100 transition-all ${
                  filter === 'unread'
                    ? 'bg-orange-600 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                style={filter !== 'unread' ? { color: 'var(--neutral--700)' } : {}}
              >
                Unread ({stats.unread})
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'var(--neutral--600)' }} />
              <input
                type="text"
                placeholder="Search by date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-4 py-2 min-w-[250px]"
                style={{
                  backgroundColor: 'var(--neutral--300)',
                  borderColor: 'var(--neutral--500)',
                  color: 'var(--neutral--800)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="grid-1-column gap-row-16px">
          <AnimatePresence mode="popLayout">
            {filteredReports.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card pd-48px text-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100/10 mb-6">
                  <Inbox className="w-8 h-8" style={{ color: 'var(--system--blue-300)' }} />
                </div>
                <h3 className="text-300 bold mg-bottom-8px" style={{ color: 'var(--neutral--800)' }}>
                  No Reports Yet
                </h3>
                <p className="text-100 mg-bottom-24px" style={{ color: 'var(--neutral--600)' }}>
                  Your daily automation reports will appear here once automation runs
                </p>
                <Link
                  href="/dashboard/settings"
                  className="button-primary w-button inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enable Daily Automation</span>
                </Link>
              </motion.div>
            ) : (
              filteredReports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} onRefresh={fetchReports} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

interface ReportCardProps {
  report: DailyReport
  index: number
  onRefresh: () => void
}

function ReportCard({ report, index, onRefresh }: ReportCardProps) {
  const formattedDate = new Date(report.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/dashboard/reports/${report.id}`}>
        <div className="card pd-24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
          <div className="flex-horizontal space-between align-center gap-column-16px flex-wrap">
            {/* Left: Report Info */}
            <div className="flex-horizontal gap-column-16px align-center flex-1">
              <div className={`card-icon-square _40px ${!report.dashboardViewed ? '' : 'neutral-icon'}`}>
                <FileText className="w-5 h-5" style={{ color: report.dashboardViewed ? 'var(--neutral--600)' : 'var(--accent--primary-1)' }} />
              </div>

              <div className="flex-1">
                <div className="flex-horizontal gap-column-8px align-center mg-bottom-4px">
                  <h3 className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                    Daily Report - {formattedDate}
                  </h3>
                  {!report.dashboardViewed && (
                    <div className="badge orange">
                      <div className="text-50 medium">New</div>
                    </div>
                  )}
                  <div className={`badge ${report.executionMode === 'AUTOMATIC' ? 'green' : 'blue'}`}>
                    <div className="text-50 medium">{report.executionMode}</div>
                  </div>
                </div>

                <div className="flex-horizontal gap-column-16px flex-wrap text-100" style={{ color: 'var(--neutral--600)' }}>
                  <span className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {report.sitesScanned} sites
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {report.pagesAnalyzed} pages
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {report.issuesFound} issues
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {report.issuesFixed} fixed
                  </span>
                  {report.issuesPending > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {report.issuesPending} pending
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Metrics & Action */}
            <div className="flex-horizontal gap-column-24px align-center">
              {/* SEO Score Change */}
              {report.seoScoreChange > 0 && (
                <div className="text-center">
                  <div className="text-100 medium mg-bottom-4px" style={{ color: 'var(--neutral--600)' }}>
                    SEO Score
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--system--green-300)' }} />
                    <span className="text-200 bold" style={{ color: 'var(--system--green-300)' }}>
                      +{report.seoScoreChange.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {/* Traffic Impact */}
              {report.estimatedTrafficImpact > 0 && (
                <div className="text-center">
                  <div className="text-100 medium mg-bottom-4px" style={{ color: 'var(--neutral--600)' }}>
                    Est. Traffic
                  </div>
                  <div className="text-200 bold" style={{ color: 'var(--accent--primary-1)' }}>
                    +{report.estimatedTrafficImpact.toFixed(1)}%
                  </div>
                </div>
              )}

              {/* View Button */}
              <div className="flex items-center gap-2 text-100 font-medium group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent--primary-1)' }}>
                <span>View Report</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function ReportsLoadingSkeleton() {
  return (
    <div className="container-default w-container">
      <div className="grid-1-column gap-row-32px">
        <div className="skeleton-box" style={{ height: '80px', width: '100%' }}></div>
        <div className="grid-4-columns _1-column-tablet gap-column-12px">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card pd-24px">
              <div className="skeleton-box" style={{ height: '60px', width: '100%' }}></div>
            </div>
          ))}
        </div>
        <div className="skeleton-box" style={{ height: '60px', width: '100%' }}></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-box" style={{ height: '120px', width: '100%' }}></div>
        ))}
      </div>
    </div>
  )
}
