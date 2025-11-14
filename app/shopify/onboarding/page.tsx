/**
 * Shopify App Onboarding Flow - Atlas Style Minimal UI
 * Execution mode selection for SEOLOGY.AI
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { shopifyFetch } from '@/lib/shopify-fetch'

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'
type SEOScope = 'full' | 'products' | 'content' | 'technical'

interface AuditResult {
  totalResources: number
  issuesFound: number
  issues: Array<{
    resource: string
    resourceId: string
    resourceTitle: string
    issueType: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    description: string
    recommendation: string
  }>
  summary: {
    products: { total: number; issues: number }
    pages: { total: number; issues: number }
    blog: { total: number; issues: number }
    collections: { total: number; issues: number }
    technical: { issues: number }
  }
  aiInsights: string
  estimatedImpact: string
}

export default function ShopifyOnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [selectedMode, setSelectedMode] = useState<ExecutionMode | null>(null)
  const [selectedScope, setSelectedScope] = useState<SEOScope>('full')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null)
  const [chatEnabled, setChatEnabled] = useState(false)

  const handleNext = () => {
    if (!selectedMode) return
    setShowModal(true)
  }

  const handleProceed = async () => {
    if (!selectedMode || !shop) return

    setLoading(true)
    try {
      console.log('[Onboarding] ========== STARTING ONBOARDING ==========')
      console.log('[Onboarding] Shop parameter:', shop)
      console.log('[Onboarding] Selected mode:', selectedMode)
      console.log('[Onboarding] Step 1: Saving execution mode...')
      // 1. Save execution mode
      const modeResponse = await shopifyFetch(`/api/shopify/execution-mode?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          executionMode: selectedMode,
        }),
      })

      if (!modeResponse.ok) {
        const errorData = await modeResponse.json().catch(() => ({}))
        console.error('[Onboarding] Failed to save execution mode:', errorData)

        // If app not installed, redirect to OAuth installation
        if (errorData.error?.code === 'NOT_INSTALLED') {
          console.log('[Onboarding] App not installed, redirecting to install flow...')
          const installUrl = errorData.error?.redirectUrl || `/api/auth/shopify?shop=${shop}`
          console.log('[Onboarding] Redirect URL:', installUrl)
          window.location.href = installUrl
          // Don't throw error - we're redirecting
          setLoading(false)
          return
        }

        // For other errors, show the error message
        throw new Error(errorData.error?.message || 'Failed to save execution mode')
      }
      console.log('[Onboarding] ✅ Execution mode saved')

      console.log('[Onboarding] Step 2: Saving preferences...')
      // 2. Save user preferences (chat visibility and audit scope)
      const prefsResponse = await shopifyFetch(`/api/shopify/preferences?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiChatEnabled: chatEnabled,
          preferredAuditScope: selectedScope,
        }),
      })

      if (!prefsResponse.ok) {
        console.warn('[Onboarding] Failed to save preferences, continuing anyway')
      } else {
        console.log('[Onboarding] ✅ Preferences saved')
      }

      console.log('[Onboarding] Step 3: Running audit (this may take 1-3 minutes)...')
      // 3. Run initial audit with selected scope
      // IMPORTANT: Increase fetch timeout to match server timeout (5 minutes)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000) // 5 minutes

      try {
        const auditResponse = await shopifyFetch(`/api/shopify/audit?shop=${shop}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            options: {
              scope: selectedScope,
              limit: selectedScope === 'full' ? 30 : 50,
            },
          }),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (auditResponse.ok) {
          const auditData = await auditResponse.json()
          if (auditData.success) {
            setAuditResults(auditData.data)
            console.log(`[Onboarding] ✅ Audit complete: ${auditData.data.issuesFound} issues found`)
          } else {
            console.warn('[Onboarding] Audit returned success=false:', auditData)
          }
        } else {
          const errorData = await auditResponse.json().catch(() => ({}))
          console.error('[Onboarding] Audit failed:', errorData)
          // Continue anyway - audit failure shouldn't block onboarding
        }
      } catch (auditError) {
        clearTimeout(timeoutId)
        if (auditError instanceof Error && auditError.name === 'AbortError') {
          console.error('[Onboarding] Audit timed out after 5 minutes')
        } else {
          console.error('[Onboarding] Audit error:', auditError)
        }
        // Continue anyway - audit failure shouldn't block onboarding
      }

      console.log('[Onboarding] Step 4: Marking onboarding complete...')
      // 4. Mark onboarding as complete
      const onboardingResponse = await shopifyFetch(`/api/shopify/onboarding?shop=${shop}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      })

      if (!onboardingResponse.ok) {
        console.warn('[Onboarding] Failed to mark onboarding complete')
      } else {
        console.log('[Onboarding] ✅ Onboarding marked complete')
      }

      console.log('[Onboarding] Step 5: Redirecting...')
      // 5. Redirect to chat or dashboard
      if (chatEnabled) {
        console.log('[Onboarding] Redirecting to chat...')
        router.push(`/shopify/chat?shop=${shop}`)
      } else {
        console.log('[Onboarding] Redirecting to dashboard...')
        router.push(`/shopify/dashboard?shop=${shop}`)
      }
    } catch (error) {
      console.error('[Onboarding] Fatal error:', error)
      alert(`Onboarding error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`)
      setLoading(false)
    }
  }

  const getModeDetails = (mode: ExecutionMode) => {
    switch (mode) {
      case 'AUTOMATIC':
        return {
          title: 'Automatic',
          description: 'AI applies all SEO fixes instantly without approval. Best for hands-off automation.',
          badge: 'Recommended',
          emoji: '⚡',
        }
      case 'PLAN':
        return {
          title: 'Plan Mode',
          description: 'AI creates fix plans for batch approval. Review once, apply all together.',
          badge: null,
          emoji: '📋',
        }
      case 'APPROVE':
        return {
          title: 'Approve Each Fix',
          description: 'Review and approve each SEO fix individually. Maximum control over changes.',
          badge: null,
          emoji: '✓',
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#191A1B] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Bar Section */}
        <div className="bg-[#262A2B] rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-sm font-medium">Setup process</h2>
            <span className="text-gray-400 text-sm">0 of 1 steps completed</span>
          </div>
          <div className="w-full bg-[#191A1B] rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full w-0 transition-all duration-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-white text-2xl font-semibold mb-2">
              Choose your SEO automation mode
            </h1>
            <p className="text-gray-400 text-sm">
              How would you like SEOLOGY.AI to handle SEO fixes? Choose the option that best fits you.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {/* Option 1: Automatic (Recommended) */}
            <button
              onClick={() => setSelectedMode('AUTOMATIC')}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                selectedMode === 'AUTOMATIC'
                  ? 'border-white bg-white/5'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-lg font-medium">
                      ⚡ Automatic
                    </h3>
                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    AI applies all SEO fixes instantly without approval. Best for hands-off automation.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === 'AUTOMATIC'
                        ? 'border-white bg-white'
                        : 'border-gray-600'
                    }`}
                  >
                    {selectedMode === 'AUTOMATIC' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B]" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* Option 2: Plan Mode */}
            <button
              onClick={() => setSelectedMode('PLAN')}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                selectedMode === 'PLAN'
                  ? 'border-white bg-white/5'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-2">
                    📋 Plan Mode
                  </h3>
                  <p className="text-gray-400 text-sm">
                    AI creates fix plans for batch approval. Review once, apply all together.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === 'PLAN'
                        ? 'border-white bg-white'
                        : 'border-gray-600'
                    }`}
                  >
                    {selectedMode === 'PLAN' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B]" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* Option 3: Approve Mode */}
            <button
              onClick={() => setSelectedMode('APPROVE')}
              className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                selectedMode === 'APPROVE'
                  ? 'border-white bg-white/5'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white text-lg font-medium mb-2">
                    ✓ Approve Each Fix
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Review and approve each SEO fix individually. Maximum control over changes.
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedMode === 'APPROVE'
                        ? 'border-white bg-white'
                        : 'border-gray-600'
                    }`}
                  >
                    {selectedMode === 'APPROVE' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B]" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!selectedMode}
            className={`w-full py-4 rounded-lg font-medium transition-all ${
              selectedMode
                ? 'bg-[#242729] hover:bg-[#2d3134] text-white'
                : 'bg-[#242729]/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-[#1f2123] border border-gray-700 rounded-lg max-w-2xl w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold">
                Select products you would like to optimize:
              </h3>
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 mb-6">
              {/* From Onboarding Label */}
              <p className="text-gray-400 text-sm">from onboarding</p>

              {/* Selected Mode Summary */}
              <div>
                <h4 className="text-white text-sm font-medium mb-3">Selected automation mode:</h4>
                <div className="bg-[#262A2B] rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getModeDetails(selectedMode).emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium">
                          {getModeDetails(selectedMode).title}
                        </span>
                        {getModeDetails(selectedMode).badge && (
                          <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">
                            {getModeDetails(selectedMode).badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enable Chat Option */}
              <div>
                <h4 className="text-white text-sm font-medium mb-3">AI Assistant Access</h4>
                <button
                  onClick={() => setChatEnabled(!chatEnabled)}
                  disabled={loading}
                  className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                    chatEnabled
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-[#262A2B] hover:border-gray-500'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium">Enable AI Chat Assistant</span>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full text-[10px] font-medium">Recommended</span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      Chat directly with SEOLOGY AI to run audits, apply fixes, and get SEO recommendations. Just say "analyze my products" or "fix my store".
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      chatEnabled ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform m-0.5 ${
                        chatEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                </button>
              </div>

              {/* SEO Scope Selection */}
              <div>
                <h4 className="text-white text-sm font-medium mb-3">What would you like to optimize first?</h4>
                <div className="grid grid-cols-2 gap-3">
                  {/* Full Store Audit */}
                  <button
                    onClick={() => setSelectedScope('full')}
                    disabled={loading}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      selectedScope === 'full'
                        ? 'border-white bg-white/5'
                        : 'border-gray-700 bg-[#262A2B] hover:border-gray-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white text-sm font-medium flex items-center gap-2">
                        Complete Store Audit
                        <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-[10px] font-medium">Recommended</span>
                      </div>
                      <div className="text-gray-400 text-xs">Products, pages, blog, collections, technical SEO</div>
                    </div>
                    {selectedScope === 'full' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B] m-[3px]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                    )}
                  </button>

                  {/* Products Only */}
                  <button
                    onClick={() => setSelectedScope('products')}
                    disabled={loading}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      selectedScope === 'products'
                        ? 'border-white bg-white/5'
                        : 'border-gray-700 bg-[#262A2B] hover:border-gray-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white text-sm font-medium">Products Only</div>
                      <div className="text-gray-400 text-xs">Focus on product catalog SEO</div>
                    </div>
                    {selectedScope === 'products' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B] m-[3px]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                    )}
                  </button>

                  {/* Content & Pages */}
                  <button
                    onClick={() => setSelectedScope('content')}
                    disabled={loading}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      selectedScope === 'content'
                        ? 'border-white bg-white/5'
                        : 'border-gray-700 bg-[#262A2B] hover:border-gray-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white text-sm font-medium">Content & Pages</div>
                      <div className="text-gray-400 text-xs">Blog posts, pages, collections</div>
                    </div>
                    {selectedScope === 'content' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B] m-[3px]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                    )}
                  </button>

                  {/* Technical SEO */}
                  <button
                    onClick={() => setSelectedScope('technical')}
                    disabled={loading}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                      selectedScope === 'technical'
                        ? 'border-white bg-white/5'
                        : 'border-gray-700 bg-[#262A2B] hover:border-gray-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="w-10 h-10 bg-cyan-600 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-white text-sm font-medium">Technical SEO</div>
                      <div className="text-gray-400 text-xs">Speed, mobile, schema, redirects</div>
                    </div>
                    {selectedScope === 'technical' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-white bg-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#191A1B] m-[3px]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Store Connection */}
              <div className="bg-[#191A1B] rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-300 text-sm flex-1">
                    SEOLOGY will analyze selected products and provide AI-powered SEO recommendations based on your <strong className="text-white">{getModeDetails(selectedMode).title}</strong> mode.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={loading}
                className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Setting up...
                  </span>
                ) : chatEnabled ? (
                  'Proceed to Chat'
                ) : (
                  'Proceed to Dashboard'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
