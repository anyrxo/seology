/**
 * Shopify App Onboarding Flow
 * First-time setup wizard for merchants installing SEOLOGY
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ExecutionMode } from '@prisma/client'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

export default function ShopifyOnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [step, setStep] = useState(1)
  const [selectedMode, setSelectedMode] = useState<ExecutionMode | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const handleModeSelect = (mode: ExecutionMode) => {
    setSelectedMode(mode)
    setError(null)
  }

  const handleContinue = async () => {
    if (!selectedMode) {
      setError('Please select an execution mode to continue')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Save the selected execution mode
      const response = await fetch('/api/shopify/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: selectedMode, shop }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error?.message || 'Failed to save settings')
      }

      // Move to next step
      setStep(2)
    } catch (error) {
      console.error('Error saving execution mode:', error)
      setError(error instanceof Error ? error.message : 'Connection failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    try {
      // Mark onboarding as complete
      await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true, shop }),
      })
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }

    // Redirect to main dashboard
    router.push(`/shopify/dashboard?shop=${shop}`)
  }

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <header className="text-center mb-8" role="banner">
            <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to SEOLOGY.AI
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Let's get your store optimized for search engines
            </p>
          </header>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Setup</span>
          </div>
          <div className="w-24 h-0.5 bg-gray-300 mx-4" />
          <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Complete</span>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Choose Your SEO Automation Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                How would you like SEOLOGY to handle SEO fixes?
              </p>
            </div>

            {/* Mode Options */}
            <div className="space-y-4">
              {/* Automatic Mode */}
              <button
                onClick={() => handleModeSelect('AUTOMATIC')}
                disabled={loading}
                data-mode="AUTOMATIC"
                data-selected={selectedMode === 'AUTOMATIC'}
                aria-selected={selectedMode === 'AUTOMATIC'}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'AUTOMATIC'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 border-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Automatic
                      </h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Recommended</span>
                      <button
                        type="button"
                        data-tooltip="AUTOMATIC"
                        onMouseEnter={() => setShowTooltip('AUTOMATIC')}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="relative ml-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {showTooltip === 'AUTOMATIC' && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                            Automatically applies all fixes without approval
                          </div>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      SEOLOGY applies all SEO fixes automatically without approval. Best for hands-off automation.
                    </p>
                  </div>
                </div>
              </button>

              {/* Plan Mode */}
              <button
                onClick={() => handleModeSelect('PLAN')}
                disabled={loading}
                data-mode="PLAN"
                data-selected={selectedMode === 'PLAN'}
                aria-selected={selectedMode === 'PLAN'}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'PLAN'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 border-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Plan
                      </h3>
                      <button
                        type="button"
                        data-tooltip="PLAN"
                        onMouseEnter={() => setShowTooltip('PLAN')}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="relative ml-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {showTooltip === 'PLAN' && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                            Creates batch of fixes, review once, apply together
                          </div>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      SEOLOGY creates a batch of fixes, you review the plan once, then all fixes apply together.
                    </p>
                  </div>
                </div>
              </button>

              {/* Approve Mode */}
              <button
                onClick={() => handleModeSelect('APPROVE')}
                disabled={loading}
                data-mode="APPROVE"
                data-selected={selectedMode === 'APPROVE'}
                aria-selected={selectedMode === 'APPROVE'}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'APPROVE'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 border-primary'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Approve
                      </h3>
                      <button
                        type="button"
                        data-tooltip="APPROVE"
                        onMouseEnter={() => setShowTooltip('APPROVE')}
                        onMouseLeave={() => setShowTooltip(null)}
                        className="relative ml-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {showTooltip === 'APPROVE' && (
                          <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap">
                            Review and approve each fix individually
                          </div>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Review and approve each SEO fix individually before it's applied. Maximum control.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                All Set!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                SEOLOGY is now analyzing your store for SEO opportunities.
                <br />
                You'll start seeing results in a few moments.
              </p>
            </div>
            <button
              onClick={handleComplete}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
      </main>
    </>
  )
}
