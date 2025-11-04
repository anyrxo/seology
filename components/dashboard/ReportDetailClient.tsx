'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
  Globe,
  FileText,
  Zap,
  Image as ImageIcon,
  Code,
  ExternalLink,
} from 'lucide-react'

interface Fix {
  id: string
  type: string
  description: string
  status: string
  impact: string
  appliedAt?: string
  before?: string
  after?: string
  page?: string
}

interface SiteReport {
  siteId: string
  siteName: string
  url: string
  pagesScanned: number
  issuesFound: number
  issuesFixed: number
  issuesPending: number
  seoScoreBefore: number
  seoScoreAfter: number
}

interface Activity {
  type: string
  description: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
}

interface ReportDetail {
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
  fixesApplied: Fix[]
  pendingApproval: Fix[]
  siteReports: SiteReport[]
  activities: Activity[]
  snapshotId?: string
}

interface ReportDetailClientProps {
  reportId: string
}

export function ReportDetailClient({ reportId }: ReportDetailClientProps) {
  const [report, setReport] = useState<ReportDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedFix, setExpandedFix] = useState<string | null>(null)
  const [approvingFix, setApprovingFix] = useState<string | null>(null)

  useEffect(() => {
    fetchReport()
  }, [reportId])

  const fetchReport = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/reports/${reportId}`)
      const data = await response.json()

      if (data.success) {
        setReport(data.data)
      } else {
        setError(data.error?.message || 'Failed to load report')
      }
    } catch (err) {
      setError('Failed to load report')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveFix = async (fixId: string) => {
    setApprovingFix(fixId)
    try {
      const response = await fetch(`/api/reports/${reportId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fixId }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh report to show updated status
        await fetchReport()
      } else {
        alert(data.error?.message || 'Failed to approve fix')
      }
    } catch (err) {
      alert('Failed to approve fix')
    } finally {
      setApprovingFix(null)
    }
  }

  const downloadReport = () => {
    if (!report) return
    const content = JSON.stringify(report, null, 2)
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${report.date}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="dashboard-container pd-64px">
        <div className="max-width-1200px mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
            <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="dashboard-container pd-64px">
        <div className="max-width-1200px mx-auto">
          <div className="card pd-24px text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-300 bold mb-2">Failed to Load Report</h2>
            <p className="text-200 mb-6" style={{ color: 'var(--neutral--600)' }}>
              {error || 'Report not found'}
            </p>
            <Link
              href="/dashboard/reports"
              className="button primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const getExecutionModeBadge = (mode: string) => {
    const colors = {
      AUTOMATIC: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      PLAN: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      APPROVE: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    }
    return colors[mode as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  const getFixTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      'meta-tags': FileText,
      'image-optimization': ImageIcon,
      'structured-data': Code,
      'performance': Zap,
      'content': FileText,
      default: FileText,
    }
    const Icon = icons[type] || icons.default
    return <Icon className="w-5 h-5" />
  }

  return (
    <div className="dashboard-container pd-64px">
      <div className="max-width-1200px mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 text-200 mb-4 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--neutral--600)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-6 h-6" style={{ color: 'var(--primary--500)' }} />
                <h1 className="text-400 bold" style={{ color: 'var(--neutral--800)' }}>
                  {formatDate(report.date)}
                </h1>
              </div>
              <p className="text-200" style={{ color: 'var(--neutral--600)' }}>
                Generated at {formatTime(report.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`badge ${getExecutionModeBadge(report.executionMode)}`}>
                {report.executionMode}
              </span>
              <button
                onClick={downloadReport}
                className="button secondary small inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="card pd-20px"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary--100)' }}>
                <Globe className="w-5 h-5" style={{ color: 'var(--primary--500)' }} />
              </div>
              <div>
                <div className="text-300 bold" style={{ color: 'var(--neutral--800)' }}>
                  {report.sitesScanned}
                </div>
                <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                  Sites Scanned
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card pd-20px"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--success--100)' }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success--500)' }} />
              </div>
              <div>
                <div className="text-300 bold" style={{ color: 'var(--neutral--800)' }}>
                  {report.issuesFixed}
                </div>
                <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                  Issues Fixed
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card pd-20px"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--warning--100)' }}>
                <Clock className="w-5 h-5" style={{ color: 'var(--warning--500)' }} />
              </div>
              <div>
                <div className="text-300 bold" style={{ color: 'var(--neutral--800)' }}>
                  {report.issuesPending}
                </div>
                <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                  Pending
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card pd-20px"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg" style={{ backgroundColor: report.seoScoreChange >= 0 ? 'var(--success--100)' : 'var(--error--100)' }}>
                {report.seoScoreChange >= 0 ? (
                  <TrendingUp className="w-5 h-5" style={{ color: 'var(--success--500)' }} />
                ) : (
                  <TrendingDown className="w-5 h-5" style={{ color: 'var(--error--500)' }} />
                )}
              </div>
              <div>
                <div className="text-300 bold" style={{ color: 'var(--neutral--800)' }}>
                  {report.seoScoreChange >= 0 ? '+' : ''}{report.seoScoreChange}
                </div>
                <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                  SEO Score
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Traffic Impact Banner */}
        {report.estimatedTrafficImpact > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card pd-24px mb-8"
            style={{
              background: 'linear-gradient(135deg, var(--primary--500) 0%, var(--primary--600) 100%)',
              color: 'white',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-white/20">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <div className="text-300 bold mb-1">
                  Estimated Traffic Impact: +{report.estimatedTrafficImpact}%
                </div>
                <p className="text-200 opacity-90">
                  These fixes are projected to increase your organic traffic based on historical data
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Fixes Applied Section */}
        {report.fixesApplied.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card pd-24px mb-8"
          >
            <h2 className="text-300 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Fixes Applied ({report.fixesApplied.length})
            </h2>
            <div className="space-y-3">
              {report.fixesApplied.map((fix, index) => (
                <motion.div
                  key={fix.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  style={{ borderColor: 'var(--neutral--300)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--success--100)' }}>
                        {getFixTypeIcon(fix.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                            {fix.description}
                          </h3>
                          <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success--500)' }} />
                        </div>
                        {fix.page && (
                          <div className="flex items-center gap-2 mb-2">
                            <ExternalLink className="w-3 h-3" style={{ color: 'var(--neutral--500)' }} />
                            <span className="text-100" style={{ color: 'var(--neutral--600)' }}>
                              {fix.page}
                            </span>
                          </div>
                        )}
                        <span className="badge small" style={{ backgroundColor: 'var(--success--100)', color: 'var(--success--700)' }}>
                          {fix.impact}
                        </span>
                      </div>
                    </div>

                    {(fix.before || fix.after) && (
                      <button
                        onClick={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
                        className="button secondary small"
                      >
                        {expandedFix === fix.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Before/After Comparison */}
                  <AnimatePresence>
                    {expandedFix === fix.id && (fix.before || fix.after) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 pt-4 border-t"
                        style={{ borderColor: 'var(--neutral--300)' }}
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          {fix.before && (
                            <div>
                              <div className="text-100 bold mb-2" style={{ color: 'var(--neutral--700)' }}>
                                Before
                              </div>
                              <div
                                className="p-3 rounded-lg font-mono text-sm"
                                style={{ backgroundColor: 'var(--error--100)', color: 'var(--neutral--800)' }}
                              >
                                {fix.before}
                              </div>
                            </div>
                          )}
                          {fix.after && (
                            <div>
                              <div className="text-100 bold mb-2" style={{ color: 'var(--neutral--700)' }}>
                                After
                              </div>
                              <div
                                className="p-3 rounded-lg font-mono text-sm"
                                style={{ backgroundColor: 'var(--success--100)', color: 'var(--neutral--800)' }}
                              >
                                {fix.after}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pending Approval Section */}
        {report.pendingApproval.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card pd-24px mb-8"
          >
            <h2 className="text-300 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Pending Approval ({report.pendingApproval.length})
            </h2>
            <div className="space-y-3">
              {report.pendingApproval.map((fix, index) => (
                <motion.div
                  key={fix.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4"
                  style={{ borderColor: 'var(--warning--300)', backgroundColor: 'var(--warning--50)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--warning--100)' }}>
                        {getFixTypeIcon(fix.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-200 bold mb-1" style={{ color: 'var(--neutral--800)' }}>
                          {fix.description}
                        </h3>
                        {fix.page && (
                          <div className="flex items-center gap-2 mb-2">
                            <ExternalLink className="w-3 h-3" style={{ color: 'var(--neutral--500)' }} />
                            <span className="text-100" style={{ color: 'var(--neutral--600)' }}>
                              {fix.page}
                            </span>
                          </div>
                        )}
                        <span className="badge small" style={{ backgroundColor: 'var(--warning--100)', color: 'var(--warning--700)' }}>
                          {fix.impact}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApproveFix(fix.id)}
                      disabled={approvingFix === fix.id}
                      className="button primary small"
                    >
                      {approvingFix === fix.id ? 'Approving...' : 'Approve'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Site Reports */}
        {report.siteReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card pd-24px mb-8"
          >
            <h2 className="text-300 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Site Breakdown
            </h2>
            <div className="space-y-4">
              {report.siteReports.map((site, index) => (
                <motion.div
                  key={site.siteId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border rounded-lg p-4"
                  style={{ borderColor: 'var(--neutral--300)' }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-200 bold mb-1" style={{ color: 'var(--neutral--800)' }}>
                        {site.siteName}
                      </h3>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-100 inline-flex items-center gap-1 hover:opacity-70 transition-opacity"
                        style={{ color: 'var(--primary--500)' }}
                      >
                        {site.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-100" style={{ color: 'var(--neutral--600)' }}>
                        SEO Score:
                      </span>
                      <span className="text-200 bold" style={{ color: 'var(--neutral--700)' }}>
                        {site.seoScoreBefore}
                      </span>
                      {site.seoScoreAfter !== site.seoScoreBefore && (
                        <>
                          <span style={{ color: 'var(--neutral--500)' }}>→</span>
                          <span className="text-200 bold" style={{ color: 'var(--success--500)' }}>
                            {site.seoScoreAfter}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                        Pages Scanned
                      </div>
                      <div className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                        {site.pagesScanned}
                      </div>
                    </div>
                    <div>
                      <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                        Issues Found
                      </div>
                      <div className="text-200 bold" style={{ color: 'var(--neutral--800)' }}>
                        {site.issuesFound}
                      </div>
                    </div>
                    <div>
                      <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                        Issues Fixed
                      </div>
                      <div className="text-200 bold" style={{ color: 'var(--success--500)' }}>
                        {site.issuesFixed}
                      </div>
                    </div>
                    <div>
                      <div className="text-100" style={{ color: 'var(--neutral--600)' }}>
                        Pending
                      </div>
                      <div className="text-200 bold" style={{ color: 'var(--warning--500)' }}>
                        {site.issuesPending}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activities Timeline */}
        {report.activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card pd-24px mb-8"
          >
            <h2 className="text-300 bold mb-4" style={{ color: 'var(--neutral--800)' }}>
              Activity Timeline
            </h2>
            <div className="space-y-3">
              {report.activities.map((activity, index) => {
                const statusColors = {
                  success: 'var(--success--500)',
                  warning: 'var(--warning--500)',
                  error: 'var(--error--500)',
                }
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: statusColors[activity.status] }}
                    />
                    <div className="flex-1">
                      <p className="text-200" style={{ color: 'var(--neutral--800)' }}>
                        {activity.description}
                      </p>
                      <span className="text-100" style={{ color: 'var(--neutral--500)' }}>
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Rollback Snapshot */}
        {report.snapshotId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card pd-24px"
            style={{ borderColor: 'var(--neutral--300)' }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral--200)' }}>
                <RotateCcw className="w-6 h-6" style={{ color: 'var(--neutral--600)' }} />
              </div>
              <div className="flex-1">
                <h3 className="text-200 bold mb-1" style={{ color: 'var(--neutral--800)' }}>
                  Rollback Snapshot Available
                </h3>
                <p className="text-100" style={{ color: 'var(--neutral--600)' }}>
                  All changes from this report can be rolled back within 90 days
                </p>
              </div>
              <Link
                href={`/dashboard/snapshots/${report.snapshotId}`}
                className="button secondary small"
              >
                View Snapshot
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
