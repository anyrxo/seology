'use client'

/**
 * Onboarding Step 6: Apply First Fix
 */

import { useState, useEffect } from 'react'

interface FirstFixStepProps {
  connectionId?: string
  issueId?: string
  executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  onNext: () => void
  onBack: () => void
}

export function FirstFixStep({ connectionId, issueId, executionMode, onNext, onBack }: FirstFixStepProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Auto-start applying fix after 1 second
    const timer = setTimeout(() => {
      setIsApplying(true)

      // Simulate fix application
      setTimeout(() => {
        setIsApplying(false)
        setIsComplete(true)
      }, 3000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-5xl mb-6">
        {isApplying ? '🔧' : isComplete ? '✅' : '🎯'}
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">
        {isApplying
          ? 'Applying Your First Fix'
          : isComplete
          ? 'Fix Applied Successfully!'
          : 'Ready to Fix Your First Issue?'}
      </h2>
      <p className="text-gray-400 mb-8">
        {isApplying
          ? 'Our AI is making changes to your site...'
          : isComplete
          ? 'Your site is now one step closer to perfect SEO'
          : 'Watch SEOLOGY.AI automatically fix an SEO issue'}
      </p>

      {!isComplete && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8 text-left">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Missing Meta Description
              </h3>
              <p className="text-sm text-gray-400">/products/widget</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
              HIGH
            </span>
          </div>

          {isApplying && (
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                Analyzing page content with AI...
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                Generating optimized meta description...
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                Applying changes to your site...
              </div>
            </div>
          )}

          {!isApplying && (
            <div className="bg-gray-900 rounded p-4">
              <p className="text-sm text-gray-400 mb-2">Fix to be applied:</p>
              <p className="text-sm text-gray-300">
                Add meta description: "Discover our premium widget with advanced features.
                Perfect for businesses looking to optimize their workflow."
              </p>
            </div>
          )}
        </div>
      )}

      {isComplete && (
        <>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              🎉 Congratulations!
            </h3>
            <p className="text-gray-300">
              You've successfully fixed your first SEO issue with SEOLOGY.AI. Your product
              page now has an optimized meta description that will improve click-through
              rates from search results.
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-white mb-3">What just happened:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">1.</span>
                Our AI analyzed your page content
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">2.</span>
                Generated an SEO-optimized meta description
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">3.</span>
                {executionMode === 'AUTOMATIC'
                  ? 'Automatically applied the fix to your live site'
                  : executionMode === 'PLAN'
                  ? 'Created a fix plan for your approval'
                  : 'Saved the fix for your manual approval'}
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">4.</span>
                Logged the change for easy rollback if needed
              </li>
            </ul>
          </div>
        </>
      )}

      <div className="flex justify-between">
        {!isComplete && (
          <button
            onClick={onBack}
            disabled={isApplying}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            ← Back
          </button>
        )}
        {isComplete && (
          <>
            <div />
            <button
              onClick={onNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Finish Setup →
            </button>
          </>
        )}
      </div>
    </div>
  )
}
