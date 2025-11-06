/**
 * Shopify App Onboarding Flow
 * First-time setup wizard for merchants installing SEOLOGY
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ExecutionMode } from '@prisma/client'

export default function ShopifyOnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [step, setStep] = useState(1)
  const [selectedMode, setSelectedMode] = useState<ExecutionMode | null>(null)
  const [loading, setLoading] = useState(false)

  const handleModeSelect = async (mode: ExecutionMode) => {
    setSelectedMode(mode)
    setLoading(true)

    try {
      // Save the selected execution mode
      const response = await fetch('/api/automation/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ executionMode: mode }),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      // Move to next step
      setStep(2)
    } catch (error) {
      console.error('Error saving execution mode:', error)
      alert('Failed to save settings. Please try again.')
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
        body: JSON.stringify({ completed: true }),
      })
    } catch (error) {
      console.error('Error completing onboarding:', error)
    }

    // Redirect to main dashboard
    router.push(`/shopify/dashboard?shop=${shop}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
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
        </div>

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
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'AUTOMATIC'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Automatic
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Recommended</span>
                    </h3>
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
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'PLAN'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Plan Mode
                    </h3>
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
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedMode === 'APPROVE'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Manual Approve
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Review and approve each SEO fix individually before it's applied. Maximum control.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {loading && (
              <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                Saving your preferences...
              </div>
            )}
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
    </div>
  )
}
