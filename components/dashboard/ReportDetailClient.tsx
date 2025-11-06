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
  BarChart3,
  Target,
  Sparkles,
  FileBarChart,
} from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format as formatDate, parseISO } from 'date-fns'

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
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json')

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

  const downloadReport = (format: 'json' | 'csv' | 'pdf') => {
    if (!report) return

    if (format === 'json') {
      const content = JSON.stringify(report, null, 2)
      const blob = new Blob([content], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seology-report-${formatDate(parseISO(report.date), 'yyyy-MM-dd')}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else {
      // Trigger API call for CSV or PDF generation
      window.open(`/api/reports/${reportId}/export?format=${format}`, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="w-layout-blockcontainer container-default w-container">
        <div className="grid-1-column gap-row-32px">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <p className="text-200 text-gray-400">Loading report...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="w-layout-blockcontainer container-default w-container">
        <div className="grid-1-column gap-row-32px">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card pd-48px text-center bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-400 bold text-white mb-4">Failed to Load Report</h2>
            <p className="text-200 text-gray-400 mb-8">
              {error || 'Report not found'}
            </p>
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const formatDateString = (dateString: string) => {
    return formatDate(parseISO(dateString), 'EEEE, MMMM d, yyyy')
  }

  const formatTime = (dateString: string) => {
    return formatDate(parseISO(dateString), 'h:mm a')
  }

  const getExecutionModeBadge = (mode: string) => {
    const config = {
      AUTOMATIC: { bg: 'green', icon: Zap },
      PLAN: { bg: 'blue', icon: Target },
      APPROVE: { bg: 'orange', icon: CheckCircle2 },
    }
    return config[mode as keyof typeof config] || { bg: 'neutral', icon: FileText }
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
    return icons[type] || icons.default
  }

  const modeConfig = getExecutionModeBadge(report.executionMode)
  const ModeIcon = modeConfig.icon

  // Prepare chart data
  const chartData = report.siteReports.map(site => ({
    name: site.siteName.substring(0, 15) + (site.siteName.length > 15 ? '...' : ''),
    'Issues Found': site.issuesFound,
    'Issues Fixed': site.issuesFixed,
    Pending: site.issuesPending,
  }))

  const scoreData = report.siteReports.map(site => ({
    name: site.siteName.substring(0, 15) + (site.siteName.length > 15 ? '...' : ''),
    Before: site.seoScoreBefore,
    After: site.seoScoreAfter,
  }))

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-vertical gap-row-16px"
        >
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-2 text-100 medium text-blue-400 hover:text-blue-300 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </Link>

          <div className="flex-horizontal space-between align-center flex-wrap gap-row-16px">
            <div className="flex-horizontal gap-column-16px align-center">
              <div className="card-icon-square _56px">
                <FileBarChart className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <div className={`badge ${modeConfig.bg} mg-bottom-8px`}>
                  <ModeIcon className="w-3 h-3" />
                  <div className="text-50 medium">{report.executionMode}</div>
                </div>
                <h1 className="display-1 text-white">
                  {formatDateString(report.date)}
                </h1>
                <p className="text-200 text-gray-400">
                  Generated at {formatTime(report.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex-horizontal gap-column-12px">
              <div className="relative group">
                <button
                  onClick={() => downloadReport(exportFormat)}
                  className="button-wrapper hover-effect inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl text-white font-medium transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Executive Summary Stats */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          <StatCard
            title="Sites Scanned"
            value={report.sitesScanned}
            icon={<Globe className="w-5 h-5" />}
            gradient="from-blue-500/20 to-cyan-500/20"
            color="blue"
          />
          <StatCard
            title="Issues Fixed"
            value={report.issuesFixed}
            icon={<CheckCircle2 className="w-5 h-5" />}
            gradient="from-green-500/20 to-emerald-500/20"
            color="green"
          />
          <StatCard
            title="Pending Review"
            value={report.issuesPending}
            icon={<Clock className="w-5 h-5" />}
            gradient="from-orange-500/20 to-red-500/20"
            color="orange"
          />
          <StatCard
            title="SEO Score Change"
            value={`${report.seoScoreChange >= 0 ? '+' : ''}${report.seoScoreChange}`}
            icon={report.seoScoreChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            gradient={report.seoScoreChange >= 0 ? "from-green-500/20 to-emerald-500/20" : "from-red-500/20 to-pink-500/20"}
            color={report.seoScoreChange >= 0 ? "green" : "red"}
          />
        </motion.div>

        {/* Traffic Impact Banner */}
        {report.estimatedTrafficImpact > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card pd-32px bg-gradient-to-br from-purple-600 to-blue-600 border border-purple-500/20 shadow-2xl shadow-purple-500/20"
          >
            <div className="flex-horizontal gap-column-24px align-center">
              <div className="card-icon-square _56px bg-white/20">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-400 bold text-white mg-bottom-8px">
                  Estimated Traffic Impact: +{report.estimatedTrafficImpact}%
                </h2>
                <p className="text-200 text-white/80">
                  These fixes are projected to increase your organic traffic based on historical data and SEO best practices
                </p>
              </div>
              <div className="card pd-24px bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="text-50 text-white/70 mg-bottom-4px">Pages Analyzed</div>
                <div className="display-2 text-white">{report.pagesAnalyzed}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Charts Section */}
        {report.siteReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid-2-columns _1-column-tablet gap-column-24px gap-row-24px"
          >
            {/* Issues Breakdown Chart */}
            <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
                <div className="card-icon-square _40px">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-300 bold text-white">Issues Breakdown</h3>
                  <p className="text-50 text-gray-500">By site</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
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
                  <Bar dataKey="Issues Found" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Issues Fixed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Pending" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* SEO Score Improvement Chart */}
            <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
                <div className="card-icon-square _40px">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-300 bold text-white">SEO Score Improvement</h3>
                  <p className="text-50 text-gray-500">Before vs After</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={scoreData}>
                  <defs>
                    <linearGradient id="beforeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="afterGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="Before"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#beforeGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="After"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#afterGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Fixes Applied Section */}
        {report.fixesApplied.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-400 bold text-white">
                Fixes Applied ({report.fixesApplied.length})
              </h2>
            </div>
            <div className="flex-vertical gap-row-12px">
              {report.fixesApplied.map((fix, index) => (
                <FixCard
                  key={fix.id}
                  fix={fix}
                  index={index}
                  expanded={expandedFix === fix.id}
                  onToggle={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
                  getFixTypeIcon={getFixTypeIcon}
                  status="applied"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Pending Approval Section */}
        {report.pendingApproval.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card pd-32px---24px bg-gradient-to-br from-orange-500/10 via-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-orange-500/20 shadow-lg shadow-orange-500/5"
          >
            <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-400 bold text-white">
                Pending Approval ({report.pendingApproval.length})
              </h2>
            </div>
            <div className="flex-vertical gap-row-12px">
              {report.pendingApproval.map((fix, index) => (
                <FixCard
                  key={fix.id}
                  fix={fix}
                  index={index}
                  expanded={expandedFix === fix.id}
                  onToggle={() => setExpandedFix(expandedFix === fix.id ? null : fix.id)}
                  getFixTypeIcon={getFixTypeIcon}
                  status="pending"
                  onApprove={() => handleApproveFix(fix.id)}
                  approving={approvingFix === fix.id}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Site Breakdown */}
        {report.siteReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-400 bold text-white">Site Breakdown</h2>
            </div>
            <div className="flex-vertical gap-row-16px">
              {report.siteReports.map((site, index) => (
                <motion.div
                  key={site.siteId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="card pd-24px bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex-horizontal space-between align-center mg-bottom-16px">
                    <div className="flex-vertical gap-row-8px">
                      <h3 className="text-200 bold text-white">{site.siteName}</h3>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-100 text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition-colors"
                      >
                        {site.url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex-horizontal gap-column-8px align-center">
                      <span className="text-100 text-gray-500">SEO Score:</span>
                      <span className="text-200 medium text-white">{site.seoScoreBefore}</span>
                      {site.seoScoreAfter !== site.seoScoreBefore && (
                        <>
                          <span className="text-gray-600">→</span>
                          <span className="text-200 bold text-green-400">{site.seoScoreAfter}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid-4-columns _2-columns-mbl gap-row-16px gap-column-12px">
                    <div className="flex-vertical gap-row-4px">
                      <span className="text-50 text-gray-500">Pages Scanned</span>
                      <span className="text-200 medium text-white">{site.pagesScanned}</span>
                    </div>
                    <div className="flex-vertical gap-row-4px">
                      <span className="text-50 text-gray-500">Issues Found</span>
                      <span className="text-200 medium text-white">{site.issuesFound}</span>
                    </div>
                    <div className="flex-vertical gap-row-4px">
                      <span className="text-50 text-gray-500">Issues Fixed</span>
                      <span className="text-200 medium text-green-400">{site.issuesFixed}</span>
                    </div>
                    <div className="flex-vertical gap-row-4px">
                      <span className="text-50 text-gray-500">Pending</span>
                      <span className="text-200 medium text-orange-400">{site.issuesPending}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activity Timeline */}
        {report.activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
              <div className="card-icon-square _40px">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-400 bold text-white">Activity Timeline</h2>
            </div>
            <div className="flex-vertical gap-row-12px">
              {report.activities.map((activity, index) => {
                const statusConfig = {
                  success: { color: 'bg-green-500', icon: CheckCircle2 },
                  warning: { color: 'bg-orange-500', icon: AlertCircle },
                  error: { color: 'bg-red-500', icon: AlertCircle },
                }
                const config = statusConfig[activity.status]
                const StatusIcon = config.icon

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.03 }}
                    className="flex-horizontal gap-column-16px align-start"
                  >
                    <div className={`w-8 h-8 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <StatusIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-200 text-white mg-bottom-4px">{activity.description}</p>
                      <span className="text-50 text-gray-500">{formatTime(activity.timestamp)}</span>
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
            transition={{ delay: 0.8 }}
            className="card pd-32px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg"
          >
            <div className="flex-horizontal gap-column-24px align-center">
              <div className="card-icon-square _56px">
                <RotateCcw className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-300 bold text-white mg-bottom-8px">
                  Rollback Snapshot Available
                </h3>
                <p className="text-200 text-gray-400">
                  All changes from this report can be rolled back within 90 days
                </p>
              </div>
              <Link
                href={`/dashboard/snapshots/${report.snapshotId}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30"
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

// Stat Card Component
interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  gradient: string
  color: string
}

function StatCard({ title, value, icon, gradient, color }: StatCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`card pd-24px relative overflow-hidden bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
    >
      <div className={`card-icon-square _40px text-${color}-400 mg-bottom-16px`}>{icon}</div>
      <div className="flex-vertical gap-row-8px">
        <div className="text-100 medium text-gray-400">{title}</div>
        <div className="display-2 text-white">{value}</div>
      </div>
    </motion.div>
  )
}

// Fix Card Component
interface FixCardProps {
  fix: Fix
  index: number
  expanded: boolean
  onToggle: () => void
  getFixTypeIcon: (type: string) => any
  status: 'applied' | 'pending'
  onApprove?: () => void
  approving?: boolean
}

function FixCard({ fix, index, expanded, onToggle, getFixTypeIcon, status, onApprove, approving }: FixCardProps) {
  const Icon = getFixTypeIcon(fix.type)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`card pd-20px ${status === 'pending' ? 'bg-orange-500/5 border border-orange-500/20' : 'bg-white/[0.02] border border-white/5'} hover:border-white/20 transition-all`}
    >
      <div className="flex-horizontal space-between align-start gap-column-16px">
        <div className="flex-horizontal gap-column-16px align-start flex-1">
          <div className={`card-icon-square _40px ${status === 'applied' ? '' : 'orange-icon'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-vertical gap-row-8px flex-1">
            <div className="flex-horizontal space-between align-center">
              <h3 className="text-200 medium text-white">{fix.description}</h3>
              {status === 'applied' && (
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              )}
            </div>
            {fix.page && (
              <div className="flex-horizontal gap-column-8px align-center">
                <ExternalLink className="w-3 h-3 text-gray-500" />
                <span className="text-50 text-gray-500">{fix.page}</span>
              </div>
            )}
            <div className={`badge small ${status === 'applied' ? 'green' : 'orange'}`}>
              <div className="text-50 medium">{fix.impact}</div>
            </div>
          </div>
        </div>

        <div className="flex-horizontal gap-column-8px">
          {(fix.before || fix.after) && (
            <button
              onClick={onToggle}
              className="card-icon-square _32px hover-effect"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
          {status === 'pending' && onApprove && (
            <button
              onClick={onApprove}
              disabled={approving}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:opacity-50 text-white rounded-xl text-100 medium transition-all shadow-lg shadow-green-600/20"
            >
              {approving ? 'Approving...' : 'Approve'}
            </button>
          )}
        </div>
      </div>

      {/* Before/After Comparison */}
      <AnimatePresence>
        {expanded && (fix.before || fix.after) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mg-top-16px pt-16px border-t border-white/10"
          >
            <div className="grid-2-columns _1-column-mbl gap-column-16px">
              {fix.before && (
                <div className="flex-vertical gap-row-8px">
                  <div className="text-100 medium text-gray-400">Before</div>
                  <div className="card pd-16px bg-red-500/10 border border-red-500/20">
                    <code className="text-50 text-gray-300 break-all">{fix.before}</code>
                  </div>
                </div>
              )}
              {fix.after && (
                <div className="flex-vertical gap-row-8px">
                  <div className="text-100 medium text-gray-400">After</div>
                  <div className="card pd-16px bg-green-500/10 border border-green-500/20">
                    <code className="text-50 text-gray-300 break-all">{fix.after}</code>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
