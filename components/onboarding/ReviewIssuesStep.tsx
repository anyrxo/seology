'use client'

/**
 * Onboarding Step 4: Review Issues Found
 */

import { useState } from 'react'

interface ReviewIssuesStepProps {
  connectionId?: string
  onNext: (data: { firstIssueId?: string }) => void
  onBack: () => void
}

export function ReviewIssuesStep({ connectionId, onNext, onBack }: ReviewIssuesStepProps) {
  // Mock issues data
  const issues = [
    {
      id: '1',
      type: 'missing_meta_description',
      severity: 'HIGH',
      title: 'Missing Meta Description',
      page: '/products/widget',
      impact: 'Lower click-through rates from search results',
    },
    {
      id: '2',
      type: 'missing_alt_text',
      severity: 'MEDIUM',
      title: 'Images Missing Alt Text',
      page: '/about',
      impact: 'Reduced accessibility and image SEO',
    },
    {
      id: '3',
      type: 'broken_link',
      severity: 'CRITICAL',
      title: 'Broken Internal Link',
      page: '/blog/post-1',
      impact: 'Poor user experience and crawl errors',
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-500 bg-red-500/10 border-red-500/20'
      case 'HIGH':
        return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'MEDIUM':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      default:
        return 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-3xl font-bold text-white mb-2">We Found {issues.length} Issues</h2>
        <p className="text-gray-400">
          Here's what our AI discovered on your site
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-gray-800 rounded-lg border border-gray-700 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {issue.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{issue.page}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                  issue.severity
                )}`}
              >
                {issue.severity}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              <span className="text-gray-500">Impact:</span> {issue.impact}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">
          ✨ Good news!
        </h3>
        <p className="text-gray-300">
          SEOLOGY.AI can automatically fix all of these issues for you. In the next step,
          you'll choose how you want fixes to be applied.
        </p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={() => onNext({ firstIssueId: issues[0]?.id })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
