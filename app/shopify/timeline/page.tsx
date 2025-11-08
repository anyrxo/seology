/**
 * Shopify Timeline Page - Fix History Timeline with Checkpoints
 * Atlas dark theme UI (#191A1B, #262A2B)
 */

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { sanitizeJSON, escapeHTML } from '@/lib/sanitize'
import { toast, confirmDialog } from '@/lib/toast'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import {
  Clock,
  GitBranch,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Bookmark,
  RotateCcw,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronRight,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'

interface Fix {
  id: string
  type: string
  description: string
  targetUrl: string | null
  status: 'PENDING' | 'APPLIED' | 'ROLLED_BACK' | 'FAILED'
  appliedAt: string | null
  beforeState: string
  afterState: string
  impactMetrics: string
  issue: {
    title: string
    type: string
    severity: string
  } | null
}

interface TimelineCheckpoint {
  id: string
  name: string
  description: string | null
  type: string
  totalProducts: number
  totalIssues: number
  totalFixes: number
  avgSeoScore: number | null
  canRollback: boolean
  branchName: string | null
  createdAt: string
}

interface TimelineData {
  fixes: Fix[]
  checkpoints: TimelineCheckpoint[]
}

export default function TimelinePage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [timelineData, setTimelineData] = useState<TimelineData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [groupBy, setGroupBy] = useState<'day' | 'week' | 'month'>('day')
  const [selectedFix, setSelectedFix] = useState<Fix | null>(null)
  const [showCheckpointModal, setShowCheckpointModal] = useState(false)
  const [checkpointName, setCheckpointName] = useState('')
  const [checkpointDescription, setCheckpointDescription] = useState('')
  const [isRollingBack, setIsRollingBack] = useState(false)

  const fetchTimelineData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/shopify/timeline?shop=${shop}`)
      const data = await response.json()
      if (data.success) {
        setTimelineData(data.data)
      }
    } catch (error) {
      console.error('Error fetching timeline:', error)
    } finally {
      setLoading(false)
    }
  }, [shop])

  useEffect(() => {
    if (shop) {
      fetchTimelineData()
    }
  }, [shop, fetchTimelineData])

  const createCheckpoint = async () => {
    try {
      const response = await fetch(`/api/shopify/checkpoints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shop,
          name: checkpointName,
          description: checkpointDescription,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setShowCheckpointModal(false)
        setCheckpointName('')
        setCheckpointDescription('')
        fetchTimelineData()
      }
    } catch (error) {
      console.error('Error creating checkpoint:', error)
    }
  }

  const restoreCheckpoint = async (checkpointId: string) => {
    const confirmed = await confirmDialog('Are you sure you want to restore to this checkpoint? This will rollback all fixes applied after this point.')
    if (!confirmed) return

    try {
      const response = await fetch(`/api/shopify/checkpoints/${checkpointId}/restore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success(`Successfully restored to checkpoint. ${data.data.fixesRolledBack} fixes rolled back.`)
        fetchTimelineData()
      } else {
        toast.error(data.error?.message || 'Failed to restore checkpoint')
      }
    } catch (error) {
      console.error('Error restoring checkpoint:', error)
      toast.error('Failed to restore checkpoint')
    }
  }

  const branchFromCheckpoint = async (checkpointId: string) => {
    const branchName = window.prompt('Enter branch name:')
    if (!branchName) return

    try {
      const response = await fetch(`/api/shopify/checkpoints/${checkpointId}/branch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, branchName }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success('Branch created successfully!')
        fetchTimelineData()
      } else {
        toast.error(data.error?.message || 'Failed to create branch')
      }
    } catch (error) {
      console.error('Error creating branch:', error)
      toast.error('Failed to create branch')
    }
  }

  const exportTimeline = () => {
    if (!timelineData) return

    const dataStr = JSON.stringify(timelineData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `timeline-${shop}-${new Date().toISOString()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getImpactIndicator = (fix: Fix) => {
    try {
      const metrics = JSON.parse(fix.impactMetrics)
      const impact = metrics.estimatedImpact || 'medium'

      if (impact === 'high') {
        return <TrendingUp className="w-4 h-4 text-green-600" />
      } else if (impact === 'low') {
        return <TrendingDown className="w-4 h-4 text-gray-400" />
      }
      return <Minus className="w-4 h-4 text-yellow-600" />
    } catch {
      return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getFixTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'title': 'bg-blue-500',
      'meta': 'bg-purple-500',
      'image': 'bg-green-500',
      'alt_text': 'bg-teal-500',
      'description': 'bg-indigo-500',
      'SEO_OPTIMIZATION': 'bg-pink-500',
    }
    return colors[type] || 'bg-gray-500'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle2 className="w-3 h-3" /> Applied
        </span>
      case 'ROLLED_BACK':
        return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full dark:bg-orange-900/20 dark:text-orange-400">
          <RotateCcw className="w-3 h-3" /> Rolled Back
        </span>
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
          <AlertCircle className="w-3 h-3" /> Pending
        </span>
      case 'FAILED':
        return <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-900/20 dark:text-red-400">
          <XCircle className="w-3 h-3" /> Failed
        </span>
      default:
        return null
    }
  }

  const filteredFixes = timelineData?.fixes.filter(fix => {
    const matchesSearch = searchQuery === '' ||
      fix.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fix.issue?.title.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === 'all' || fix.type === filterType
    const matchesStatus = filterStatus === 'all' || fix.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  }) || []

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#191A1B]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#191A1B]">
      <ShopifyAppNav />
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Fix History Timeline
              </h1>
              <p className="text-gray-400">
                Track all SEO fixes with checkpoints and branching
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportTimeline}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#262A2B] border border-gray-700 rounded-lg hover:border-blue-500 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setShowCheckpointModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Bookmark className="w-4 h-4" />
                Create Checkpoint
              </button>
            </div>
          </div>
        </header>

      {/* Filters */}
      <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search fixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="title">Title Fixes</option>
            <option value="meta">Meta Fixes</option>
            <option value="image">Image Fixes</option>
            <option value="alt_text">Alt Text Fixes</option>
            <option value="SEO_OPTIMIZATION">SEO Optimization</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="APPLIED">Applied</option>
            <option value="PENDING">Pending</option>
            <option value="ROLLED_BACK">Rolled Back</option>
            <option value="FAILED">Failed</option>
          </select>

          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as 'day' | 'week' | 'month')}
            className="px-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="day">Group by Day</option>
            <option value="week">Group by Week</option>
            <option value="month">Group by Month</option>
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>

          <div className="space-y-6">
            {/* Checkpoints and Fixes */}
            {timelineData?.checkpoints.map((checkpoint, idx) => {
              const checkpointDate = new Date(checkpoint.createdAt)
              const fixesAfterCheckpoint = filteredFixes.filter(fix => {
                if (!fix.appliedAt) return false
                const fixDate = new Date(fix.appliedAt)
                return fixDate <= checkpointDate
              })

              return (
                <div key={checkpoint.id}>
                  {/* Checkpoint */}
                  <div className="relative flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <Bookmark className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 bg-purple-900/20 rounded-lg p-4 border-2 border-purple-700 backdrop-blur-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {checkpoint.name}
                            </h3>
                            <span className="text-xs text-purple-400 font-medium">
                              {checkpoint.type.replace(/_/g, ' ')}
                            </span>
                            {checkpoint.branchName && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-900/40 text-blue-300 rounded border border-blue-700">
                                <GitBranch className="w-3 h-3" />
                                {checkpoint.branchName}
                              </span>
                            )}
                          </div>
                          {checkpoint.description && (
                            <p className="text-sm text-gray-400 mb-3">
                              {checkpoint.description}
                            </p>
                          )}
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Products:</span>
                              <span className="ml-2 font-medium text-white">
                                {checkpoint.totalProducts}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Issues:</span>
                              <span className="ml-2 font-medium text-white">
                                {checkpoint.totalIssues}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Fixes:</span>
                              <span className="ml-2 font-medium text-white">
                                {checkpoint.totalFixes}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-400">Avg Score:</span>
                              <span className="ml-2 font-medium text-white">
                                {checkpoint.avgSeoScore || 0}%
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 mt-2">
                            {new Date(checkpoint.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {checkpoint.canRollback && (
                            <button
                              onClick={() => restoreCheckpoint(checkpoint.id)}
                              className="px-3 py-1 text-sm text-purple-300 bg-purple-900/40 rounded hover:bg-purple-900/60 border border-purple-700 transition-all"
                            >
                              Restore
                            </button>
                          )}
                          <button
                            onClick={() => branchFromCheckpoint(checkpoint.id)}
                            className="px-3 py-1 text-sm text-blue-300 bg-blue-900/40 rounded hover:bg-blue-900/60 border border-blue-700 transition-all"
                          >
                            Branch
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixes before this checkpoint */}
                  {fixesAfterCheckpoint.length > 0 && idx === 0 && (
                    <div className="ml-12 space-y-4 mb-6">
                      {fixesAfterCheckpoint.slice(0, 5).map((fix) => (
                        <div
                          key={fix.id}
                          onClick={() => setSelectedFix(fix)}
                          className="relative flex items-start gap-4 cursor-pointer hover:bg-[#191A1B] rounded-lg p-3 transition-colors border border-transparent hover:border-gray-700"
                        >
                          <div className={`flex-shrink-0 w-3 h-3 ${getFixTypeColor(fix.type)} rounded-full mt-1.5`}></div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-white">
                                  {fix.description}
                                </h4>
                                {fix.issue && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {fix.issue.title}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                {getImpactIndicator(fix)}
                                {getStatusBadge(fix.status)}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {fix.appliedAt ? new Date(fix.appliedAt).toLocaleString() : 'Not applied'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Recent fixes without checkpoint */}
            {filteredFixes.filter(fix => {
              if (!timelineData?.checkpoints.length) return true
              if (!fix.appliedAt) return false
              const latestCheckpoint = timelineData.checkpoints[0]
              const fixDate = new Date(fix.appliedAt)
              const checkpointDate = new Date(latestCheckpoint.createdAt)
              return fixDate > checkpointDate
            }).map((fix) => (
              <div
                key={fix.id}
                onClick={() => setSelectedFix(fix)}
                className="relative flex items-start gap-4 cursor-pointer hover:bg-[#191A1B] rounded-lg p-3 transition-colors border border-transparent hover:border-gray-700"
              >
                <div className={`flex-shrink-0 w-10 h-10 ${getFixTypeColor(fix.type)} rounded-full flex items-center justify-center z-10 shadow-lg`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">
                        {fix.description}
                      </h4>
                      {fix.issue && (
                        <p className="text-xs text-gray-400 mt-1">
                          {fix.issue.title}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {getImpactIndicator(fix)}
                      {getStatusBadge(fix.status)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {fix.appliedAt ? new Date(fix.appliedAt).toLocaleString() : 'Not applied'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFixes.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                No fixes found. Start analyzing products to see your timeline!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Checkpoint Modal */}
      {showCheckpointModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Create Checkpoint
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Checkpoint Name
                </label>
                <input
                  type="text"
                  value={checkpointName}
                  onChange={(e) => setCheckpointName(e.target.value)}
                  placeholder="e.g., Before holiday season changes"
                  className="w-full px-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={checkpointDescription}
                  onChange={(e) => setCheckpointDescription(e.target.value)}
                  placeholder="Add notes about this checkpoint..."
                  rows={3}
                  className="w-full px-4 py-2 bg-[#191A1B] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCheckpointModal(false)
                  setCheckpointName('')
                  setCheckpointDescription('')
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#191A1B] border border-gray-700 rounded-lg hover:border-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={createCheckpoint}
                disabled={!checkpointName}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diff Viewer Modal */}
      {selectedFix && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#262A2B] border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#262A2B] border-b border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {selectedFix.description}
                  </h2>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(selectedFix.status)}
                    <span className="text-sm text-gray-400">
                      {selectedFix.appliedAt ? new Date(selectedFix.appliedAt).toLocaleString() : 'Not applied'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFix(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Before
                  </h3>
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <pre className="text-sm text-gray-100 whitespace-pre-wrap break-words font-mono">
                      {sanitizeJSON(selectedFix.beforeState)}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    After
                  </h3>
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                    <pre className="text-sm text-gray-100 whitespace-pre-wrap break-words font-mono">
                      {sanitizeJSON(selectedFix.afterState)}
                    </pre>
                  </div>
                </div>
              </div>

              {selectedFix.status === 'APPLIED' && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <button
                    onClick={async () => {
                      const confirmed = await confirmDialog('Are you sure you want to rollback this fix?')
                      if (!confirmed) return

                      setIsRollingBack(true)
                      try {
                        const response = await fetch(`/api/shopify/fixes/${selectedFix.id}/rollback`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ shop })
                        })
                        const data = await response.json()

                        if (data.success) {
                          toast.success('Fix rolled back successfully!')
                          setSelectedFix(null)
                          fetchTimelineData()
                        } else {
                          toast.error(data.error?.message || 'Rollback failed')
                        }
                      } catch (error) {
                        console.error('Rollback error:', error)
                        toast.error('Network error during rollback')
                      } finally {
                        setIsRollingBack(false)
                      }
                    }}
                    disabled={isRollingBack}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isRollingBack ? 'Rolling back...' : 'Rollback This Fix'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </main>
    </div>
  )
}
