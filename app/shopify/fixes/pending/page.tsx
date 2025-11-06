/**
 * Shopify Pending Fixes Approval Page
 * Supports both PLAN mode (batch approval) and APPROVE mode (individual approval)
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { sanitizeJSON } from '@/lib/sanitize'

// ==================== TYPES ====================

interface Fix {
  id: string
  description: string
  changes: string
  status: 'PENDING' | 'APPLIED' | 'FAILED' | 'ROLLED_BACK'
  createdAt: string
  issue?: {
    id: string
    title: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    type: string
    pageUrl: string
    details: string
    impactScore?: number
    estimatedTraffic?: number
  }
  planId?: string
}

interface PendingPlan {
  id: string
  title: string
  description: string
  estimatedImpact: string
  createdAt: string
  fixes: Fix[]
}

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'
type TabType = 'plans' | 'individual'
type FilterSeverity = 'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

// ==================== MAIN COMPONENT ====================

export default function PendingFixesPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  // State
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('PLAN')
  const [activeTab, setActiveTab] = useState<TabType>('plans')
  const [loading, setLoading] = useState(true)
  const [pendingPlans, setPendingPlans] = useState<PendingPlan[]>([])
  const [individualFixes, setIndividualFixes] = useState<Fix[]>([])
  const [filterSeverity, setFilterSeverity] = useState<FilterSeverity>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFixes, setSelectedFixes] = useState<Set<string>>(new Set())
  const [processingAction, setProcessingAction] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState<Fix | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info')

  // Fetch execution mode and pending fixes
  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    Promise.all([fetchExecutionMode(), fetchPendingFixes()]).finally(() => {
      setLoading(false)
    })

    // Poll for updates every 10 seconds
    const interval = setInterval(() => {
      fetchPendingFixes()
    }, 10000)

    return () => clearInterval(interval)
  }, [shop])

  // Fetch execution mode
  const fetchExecutionMode = async () => {
    try {
      const response = await fetch(`/api/shopify/settings?shop=${shop}`)
      const data = await response.json()
      if (data.success) {
        setExecutionMode(data.data.executionMode)
        // Set default tab based on mode
        if (data.data.executionMode === 'APPROVE') {
          setActiveTab('individual')
        }
      }
    } catch (error) {
      console.error('Error fetching execution mode:', error)
    }
  }

  // Fetch pending fixes
  const fetchPendingFixes = async () => {
    try {
      const response = await fetch(`/api/shopify/fixes/pending?shop=${shop}`)
      const data = await response.json()

      if (data.success) {
        setPendingPlans(data.data.plans || [])
        setIndividualFixes(data.data.individualFixes || [])
      }
    } catch (error) {
      console.error('Error fetching pending fixes:', error)
    }
  }

  // Approve entire plan
  const approvePlan = async (planId: string) => {
    if (!confirm('Approve and apply all fixes in this plan?')) return

    setProcessingAction(planId)
    try {
      const response = await fetch('/api/shopify/fixes/approve-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, planId }),
      })

      const data = await response.json()

      if (data.success) {
        showToast('Plan approved successfully! Fixes are being applied.', 'success')
        await fetchPendingFixes()
      } else {
        showToast(data.error.message || 'Failed to approve plan', 'error')
      }
    } catch (error) {
      console.error('Error approving plan:', error)
      showToast('Failed to approve plan', 'error')
    } finally {
      setProcessingAction(null)
    }
  }

  // Reject plan
  const rejectPlan = async (planId: string) => {
    const reason = prompt('Please provide a reason for rejecting this plan:')
    if (!reason) return

    setProcessingAction(planId)
    try {
      const response = await fetch('/api/shopify/fixes/reject-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, planId, reason }),
      })

      const data = await response.json()

      if (data.success) {
        showToast('Plan rejected', 'info')
        await fetchPendingFixes()
      } else {
        showToast(data.error.message || 'Failed to reject plan', 'error')
      }
    } catch (error) {
      console.error('Error rejecting plan:', error)
      showToast('Failed to reject plan', 'error')
    } finally {
      setProcessingAction(null)
    }
  }

  // Approve individual fix
  const approveFix = async (fixId: string) => {
    setProcessingAction(fixId)
    try {
      const response = await fetch('/api/shopify/fixes/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, fixId }),
      })

      const data = await response.json()

      if (data.success) {
        showToast('Fix approved and applied successfully!', 'success')
        await fetchPendingFixes()
        setSelectedFixes(prev => {
          const next = new Set(prev)
          next.delete(fixId)
          return next
        })
      } else {
        showToast(data.error.message || 'Failed to approve fix', 'error')
      }
    } catch (error) {
      console.error('Error approving fix:', error)
      showToast('Failed to approve fix', 'error')
    } finally {
      setProcessingAction(null)
    }
  }

  // Reject individual fix
  const rejectFix = async (fixId: string) => {
    const reason = prompt('Please provide a reason for rejecting this fix:')
    if (!reason) return

    setProcessingAction(fixId)
    try {
      const response = await fetch('/api/shopify/fixes/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, fixId, reason }),
      })

      const data = await response.json()

      if (data.success) {
        showToast('Fix rejected', 'info')
        await fetchPendingFixes()
        setSelectedFixes(prev => {
          const next = new Set(prev)
          next.delete(fixId)
          return next
        })
      } else {
        showToast(data.error.message || 'Failed to reject fix', 'error')
      }
    } catch (error) {
      console.error('Error rejecting fix:', error)
      showToast('Failed to reject fix', 'error')
    } finally {
      setProcessingAction(null)
    }
  }

  // Bulk approve selected fixes
  const bulkApproveSelected = async () => {
    if (selectedFixes.size === 0) {
      showToast('No fixes selected', 'info')
      return
    }

    if (!confirm(`Approve ${selectedFixes.size} selected fixes?`)) return

    setProcessingAction('bulk')

    let successCount = 0
    let errorCount = 0

    for (const fixId of Array.from(selectedFixes)) {
      try {
        const response = await fetch('/api/shopify/fixes/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shop, fixId }),
        })

        const data = await response.json()
        if (data.success) {
          successCount++
        } else {
          errorCount++
        }
      } catch (error) {
        errorCount++
      }
    }

    showToast(`Approved ${successCount} of ${selectedFixes.size} fixes`, successCount > 0 ? 'success' : 'error')
    setSelectedFixes(new Set())
    await fetchPendingFixes()
    setProcessingAction(null)
  }

  // Show preview modal
  const showPreviewModal = (fix: Fix) => {
    setModalData(fix)
    setShowModal(true)
  }

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => setToastMessage(null), 5000)
  }

  // Toggle fix selection
  const toggleFixSelection = (fixId: string) => {
    setSelectedFixes(prev => {
      const next = new Set(prev)
      if (next.has(fixId)) {
        next.delete(fixId)
      } else {
        next.add(fixId)
      }
      return next
    })
  }

  // Filter fixes
  const getFilteredFixes = (fixes: Fix[]) => {
    return fixes.filter(fix => {
      // Filter by severity
      if (filterSeverity !== 'ALL' && fix.issue?.severity !== filterSeverity) {
        return false
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          fix.description.toLowerCase().includes(query) ||
          fix.issue?.title.toLowerCase().includes(query) ||
          fix.issue?.pageUrl.toLowerCase().includes(query)
        )
      }

      return true
    })
  }

  // ==================== RENDER ====================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const filteredIndividualFixes = getFilteredFixes(individualFixes)

  return (
    <>
      {/* Shopify Navigation Menu */}
      {/* @ts-expect-error - Shopify App Bridge web component */}
      <ui-nav-menu>
        <a href={`/shopify/dashboard?shop=${shop}`} rel="home">Dashboard</a>
        <a href={`/shopify/products?shop=${shop}`}>Products</a>
        <a href={`/shopify/fixes/pending?shop=${shop}`}>Pending Fixes</a>
        <a href={`/shopify/reports?shop=${shop}`}>SEO Reports</a>
        <a href={`/shopify/chat?shop=${shop}`}>AI Chat</a>
        <a href={`/shopify/settings?shop=${shop}`}>Settings</a>
        {/* @ts-expect-error - Shopify App Bridge web component */}
      </ui-nav-menu>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Pending Fixes
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Review and approve SEO fixes before they are applied to your store
          </p>
        </div>

        {/* Execution Mode Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              Mode: {executionMode === 'PLAN' ? 'Batch Approval' : 'Individual Approval'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        {executionMode === 'PLAN' && (
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'plans'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Pending Plans ({pendingPlans.length})
            </button>
            <button
              onClick={() => setActiveTab('individual')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'individual'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Individual Fixes ({individualFixes.length})
            </button>
          </div>
        )}

        {/* Filters and Search */}
        {(activeTab === 'individual' || executionMode === 'APPROVE') && (
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search fixes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Severity Filter */}
            <div className="flex gap-2">
              {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as FilterSeverity[]).map(severity => (
                <button
                  key={severity}
                  onClick={() => setFilterSeverity(severity)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    filterSeverity === severity
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>

            {/* Bulk Actions */}
            {selectedFixes.size > 0 && (
              <button
                onClick={bulkApproveSelected}
                disabled={processingAction === 'bulk'}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {processingAction === 'bulk' ? 'Processing...' : `Approve ${selectedFixes.size} Selected`}
              </button>
            )}
          </div>
        )}

        {/* Content */}
        {activeTab === 'plans' && executionMode === 'PLAN' ? (
          // Pending Plans View
          pendingPlans.length === 0 ? (
            <EmptyState
              icon="clipboard-list"
              title="No Pending Plans"
              description="All your fix plans have been approved or rejected."
            />
          ) : (
            <div className="space-y-6">
              {pendingPlans.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onApprove={() => approvePlan(plan.id)}
                  onReject={() => rejectPlan(plan.id)}
                  onShowPreview={showPreviewModal}
                  isProcessing={processingAction === plan.id}
                />
              ))}
            </div>
          )
        ) : (
          // Individual Fixes View
          filteredIndividualFixes.length === 0 ? (
            <EmptyState
              icon="check-circle"
              title={individualFixes.length === 0 ? 'No Pending Fixes' : 'No Matching Fixes'}
              description={individualFixes.length === 0
                ? 'All SEO fixes have been approved or no issues detected yet.'
                : 'Try adjusting your filters or search query.'}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredIndividualFixes.map(fix => (
                <FixCard
                  key={fix.id}
                  fix={fix}
                  onApprove={() => approveFix(fix.id)}
                  onReject={() => rejectFix(fix.id)}
                  onShowPreview={() => showPreviewModal(fix)}
                  onToggleSelect={() => toggleFixSelection(fix.id)}
                  isSelected={selectedFixes.has(fix.id)}
                  isProcessing={processingAction === fix.id}
                />
              ))}
            </div>
          )
        )}
      </div>

      {/* Preview Modal */}
      {showModal && modalData && (
        <PreviewModal
          fix={modalData}
          onClose={() => setShowModal(false)}
          onApprove={async () => {
            setShowModal(false)
            await approveFix(modalData.id)
          }}
          onReject={async () => {
            setShowModal(false)
            await rejectFix(modalData.id)
          }}
          isProcessing={processingAction === modalData.id}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}
    </>
  )
}

// ==================== CHILD COMPONENTS ====================

interface PlanCardProps {
  plan: PendingPlan
  onApprove: () => void
  onReject: () => void
  onShowPreview: (fix: Fix) => void
  isProcessing: boolean
}

function PlanCard({ plan, onApprove, onReject, onShowPreview, isProcessing }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false)

  let estimatedImpact: { trafficIncrease?: number; seoScoreIncrease?: number } = {}
  try {
    estimatedImpact = JSON.parse(plan.estimatedImpact)
  } catch (e) {
    // ignore
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {plan.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {plan.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">
                  {plan.fixes.length} fixes included
                </span>
              </div>
              {estimatedImpact.trafficIncrease && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    +{estimatedImpact.trafficIncrease}% estimated traffic
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Severity Breakdown */}
        <div className="mb-4 flex gap-2 flex-wrap">
          {getSeverityBreakdown(plan.fixes).map(({ severity, count, color }) => (
            <div key={severity} className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
              {count} {severity.toLowerCase()}
            </div>
          ))}
        </div>

        {/* Expand/Collapse */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <span>{expanded ? 'Hide' : 'View'} Fix Details</span>
          <svg className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Fixes List */}
        {expanded && (
          <div className="mt-4 space-y-3 border-t border-gray-200 dark:border-gray-700 pt-4">
            {plan.fixes.map(fix => (
              <div key={fix.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <SeverityBadge severity={fix.issue?.severity || 'LOW'} />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {fix.issue?.title || fix.description}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {fix.issue?.pageUrl}
                    </p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      {fix.description}
                    </p>
                  </div>
                  <button
                    onClick={() => onShowPreview(fix)}
                    className="ml-4 text-blue-600 hover:text-blue-700 text-xs font-medium whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? 'Approving...' : 'Approve Plan'}
          </button>
          <button
            onClick={onReject}
            disabled={isProcessing}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

interface FixCardProps {
  fix: Fix
  onApprove: () => void
  onReject: () => void
  onShowPreview: () => void
  onToggleSelect: () => void
  isSelected: boolean
  isProcessing: boolean
}

function FixCard({ fix, onApprove, onReject, onShowPreview, onToggleSelect, isSelected, isProcessing }: FixCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Checkbox */}
          <div className="flex-shrink-0 pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={onToggleSelect}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <SeverityBadge severity={fix.issue?.severity || 'LOW'} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {fix.issue?.type.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {fix.issue?.title || fix.description}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {fix.issue?.pageUrl}
                </p>
              </div>
              {fix.issue?.impactScore && (
                <div className="text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Impact Score</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {fix.issue.impactScore}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Fix:</strong> {fix.description}
              </p>
              {fix.issue?.estimatedTraffic && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>+{fix.issue.estimatedTraffic} visits/month estimated</span>
                </div>
              )}
            </div>

            {/* Before/After Preview */}
            {fix.issue?.details && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Issue Details</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {fix.issue.details.length > 200
                    ? `${fix.issue.details.substring(0, 200)}...`
                    : fix.issue.details}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onApprove}
                disabled={isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {isProcessing ? 'Approving...' : 'Approve'}
              </button>
              <button
                onClick={onReject}
                disabled={isProcessing}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Reject
              </button>
              <button
                onClick={onShowPreview}
                className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors text-sm font-medium"
              >
                View Details
              </button>
              <div className="flex-1"></div>
              <div className="text-xs text-gray-500 dark:text-gray-400 self-center">
                {new Date(fix.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PreviewModalProps {
  fix: Fix
  onClose: () => void
  onApprove: () => void
  onReject: () => void
  isProcessing: boolean
}

function PreviewModal({ fix, onClose, onApprove, onReject, isProcessing }: PreviewModalProps) {
  // Sanitize changes JSON before parsing
  const sanitizedChanges = sanitizeJSON(fix.changes)
  let changes: Record<string, unknown> = {}
  try {
    changes = JSON.parse(sanitizedChanges) as Record<string, unknown>
  } catch (e) {
    changes = { raw: fix.changes }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <SeverityBadge severity={fix.issue?.severity || 'LOW'} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {fix.issue?.title || fix.description}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {fix.issue?.pageUrl}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Issue Details */}
          {fix.issue?.details && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Issue Details</h3>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {fix.issue.details}
                </p>
              </div>
            </div>
          )}

          {/* Fix Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Proposed Fix</h3>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {fix.description}
              </p>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Implementation Details</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                {sanitizedChanges}
              </pre>
            </div>
          </div>

          {/* Impact Estimation */}
          {(fix.issue?.impactScore || fix.issue?.estimatedTraffic) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Estimated Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                {fix.issue.impactScore && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">SEO Impact Score</div>
                    <div className="text-3xl font-bold text-blue-600">{fix.issue.impactScore}</div>
                  </div>
                )}
                {fix.issue.estimatedTraffic && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Est. Traffic Increase</div>
                    <div className="text-3xl font-bold text-green-600">+{fix.issue.estimatedTraffic}/mo</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isProcessing ? 'Approving...' : 'Approve & Apply Fix'}
          </button>
          <button
            onClick={onReject}
            disabled={isProcessing}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Reject
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

function EmptyState({ icon, title, description }: EmptyStateProps) {
  const iconPaths: Record<string, string> = {
    'clipboard-list': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[icon]} />
      </svg>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors = {
    CRITICAL: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    HIGH: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    MEDIUM: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
    LOW: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${colors[severity as keyof typeof colors] || colors.LOW}`}>
      {severity}
    </span>
  )
}

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

function Toast({ message, type, onClose }: ToastProps) {
  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md`}>
        <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {type === 'success' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
          {type === 'error' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
          {type === 'info' && (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          )}
        </svg>
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Helper function to get severity breakdown
function getSeverityBreakdown(fixes: Fix[]) {
  const counts = fixes.reduce((acc, fix) => {
    const severity = fix.issue?.severity || 'LOW'
    acc[severity] = (acc[severity] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const colorMap = {
    CRITICAL: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    HIGH: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    MEDIUM: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
    LOW: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  }

  return Object.entries(counts).map(([severity, count]) => ({
    severity,
    count,
    color: colorMap[severity as keyof typeof colorMap] || colorMap.LOW,
  }))
}
