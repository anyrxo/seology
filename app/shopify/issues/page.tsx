/**
 * Shopify Issues Page - Atlas Dark Theme
 * View all detected SEO issues in your Shopify store
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import { SEOIssueCard, type SEOIssue, type SEOIssueSeverity } from '@/components/seo/SEOIssueCard'

type IssueSeverity = 'ALL' | SEOIssueSeverity

export default function ShopifyIssuesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [issues, setIssues] = useState<SEOIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<IssueSeverity>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [fixingIssueId, setFixingIssueId] = useState<string | null>(null)

  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    fetchIssues()
  }, [shop])

  const fetchIssues = async () => {
    try {
      const response = await fetch(`/api/shopify/issues?shop=${shop}`)
      const data = await response.json()

      if (data.success) {
        setIssues(data.data || [])
        setError(null)
      } else {
        setError(data.error?.message || 'Failed to load issues')
      }
    } catch (error) {
      console.error('Error fetching issues:', error)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFixIssue = async (issueId: string) => {
    setFixingIssueId(issueId)
    try {
      const response = await fetch('/api/shopify/fixes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, issueId }),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh issues list
        await fetchIssues()
      }
    } catch (error) {
      console.error('Error creating fix:', error)
    } finally {
      setFixingIssueId(null)
    }
  }

  const filteredIssues = issues.filter((issue) => {
    // Filter by severity
    if (filter !== 'ALL' && issue.severity !== filter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query)
      )
    }

    return true
  })

  const issueCountsBySeverity = {
    ALL: issues.length,
    critical: issues.filter(i => i.severity === 'critical').length,
    high: issues.filter(i => i.severity === 'high').length,
    medium: issues.filter(i => i.severity === 'medium').length,
    low: issues.filter(i => i.severity === 'low').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191A1B] flex">
        <ShopifyAppNav />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="h-8 bg-[#262A2B] rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-[#262A2B] rounded w-96 animate-pulse"></div>
          </div>

          <div className="flex gap-2 mb-8">
            <div className="h-10 bg-[#262A2B] rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-[#262A2B] rounded-lg w-32 animate-pulse"></div>
            <div className="h-10 bg-[#262A2B] rounded-lg w-32 animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#262A2B] rounded-lg shadow-lg p-6 animate-pulse border border-white/5">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-[#191A1B] rounded w-1/3"></div>
                    <div className="h-4 bg-[#191A1B] rounded w-1/2"></div>
                    <div className="h-4 bg-[#191A1B] rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#191A1B] flex">
      <ShopifyAppNav />

      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                SEO Issues
              </h1>
              <p className="text-gray-400">
                Detected SEO issues that need attention
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-300 mb-1">
                    Failed to Load Issues
                  </h3>
                  <p className="text-red-400 mb-3">
                    {error}
                  </p>
                  <button
                    onClick={() => {
                      setError(null)
                      setLoading(true)
                      fetchIssues()
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Overview */}
          {!error && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-[#262A2B] rounded-lg p-4 border border-white/5">
                <div className="text-sm text-gray-400 mb-1">Total Issues</div>
                <div className="text-3xl font-bold text-white">{issueCountsBySeverity.ALL}</div>
              </div>
              <div className="bg-[#262A2B] rounded-lg p-4 border border-red-500/20">
                <div className="text-sm text-red-400 mb-1">Critical</div>
                <div className="text-3xl font-bold text-red-400">{issueCountsBySeverity.critical}</div>
              </div>
              <div className="bg-[#262A2B] rounded-lg p-4 border border-orange-500/20">
                <div className="text-sm text-orange-400 mb-1">High</div>
                <div className="text-3xl font-bold text-orange-400">{issueCountsBySeverity.high}</div>
              </div>
              <div className="bg-[#262A2B] rounded-lg p-4 border border-yellow-500/20">
                <div className="text-sm text-yellow-400 mb-1">Medium</div>
                <div className="text-3xl font-bold text-yellow-400">{issueCountsBySeverity.medium}</div>
              </div>
              <div className="bg-[#262A2B] rounded-lg p-4 border border-blue-500/20">
                <div className="text-sm text-blue-400 mb-1">Low</div>
                <div className="text-3xl font-bold text-blue-400">{issueCountsBySeverity.low}</div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          {!error && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-[#262A2B] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Severity Filters */}
              <div className="flex gap-2 flex-wrap">
                {(['ALL', 'critical', 'high', 'medium', 'low'] as IssueSeverity[]).map((severity) => (
                  <button
                    key={severity}
                    onClick={() => setFilter(severity)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      filter === severity
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
                    }`}
                  >
                    {severity.toUpperCase()} ({issueCountsBySeverity[severity]})
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Issues List */}
        {!error && filteredIssues.length === 0 ? (
          <div className="bg-[#262A2B] rounded-lg shadow-lg p-8 text-center border border-white/5">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No Issues Found</h3>
            <p className="text-gray-400">
              {issues.length === 0
                ? 'Great! No SEO issues detected in your store.'
                : 'No issues match the selected filter or search query.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredIssues.map((issue) => (
              <SEOIssueCard
                key={issue.id}
                issue={issue}
                onFix={() => handleFixIssue(issue.id)}
                isFixing={fixingIssueId === issue.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
