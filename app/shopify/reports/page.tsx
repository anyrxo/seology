/**
 * Shopify Reports Page
 * Show SEO improvements and analytics
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { sanitizeJSON } from '@/lib/sanitize'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'

interface Fix {
  id: string
  description: string
  type: string
  appliedAt: string
  beforeState: string
  afterState: string
  issue: {
    title: string
    pageUrl: string
  }
}

interface ReportData {
  totalFixes: number
  fixesThisWeek: number
  fixesThisMonth: number
  issuesResolved: number
  avgSeoScoreBefore: number
  avgSeoScoreAfter: number
  recentFixes: Fix[]
}

export default function ShopifyReportsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    fetch(`/api/shopify/reports?shop=${shop}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReport(data.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [shop])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">No report data available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <ShopifyNav shop={shop} />

      <main className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                SEO Reports
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Track your SEO improvements and impact
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Back to Dashboard"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Fixes Applied</div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {report.totalFixes}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fixes This Week</div>
          <div className="text-3xl font-bold text-green-600">
            {report.fixesThisWeek}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Issues Resolved</div>
          <div className="text-3xl font-bold text-blue-600">
            {report.issuesResolved}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg SEO Score</div>
          <div className="text-3xl font-bold text-purple-600">
            {report.avgSeoScoreAfter}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              (+{report.avgSeoScoreAfter - report.avgSeoScoreBefore})
            </span>
          </div>
        </div>
      </div>

      {/* Recent Fixes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Fixes
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {report.recentFixes.length === 0 ? (
            <div className="p-8 text-center text-gray-600 dark:text-gray-400">
              No fixes applied yet. Start by analyzing your products!
            </div>
          ) : (
            report.recentFixes.map((fix) => (
              <div key={fix.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {fix.issue.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {fix.description}
                    </p>
                    <a
                      href={fix.issue.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {fix.issue.pageUrl} →
                    </a>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(fix.appliedAt).toLocaleDateString()}
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                      Applied
                    </span>
                  </div>
                </div>

                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-2">
                      BEFORE
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-800">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {sanitizeJSON(fix.beforeState)}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-2">
                      AFTER
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded border border-green-200 dark:border-green-800">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {sanitizeJSON(fix.afterState)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

        {/* Impact Message */}
        {report.totalFixes > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🎉 Great Progress!
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              You've improved {report.issuesResolved} SEO issues across your store. SEO improvements typically take 2-4 weeks to show results in search rankings. Keep monitoring your analytics!
            </p>
          </div>
        )}
      </main>
    </>
  )
}
