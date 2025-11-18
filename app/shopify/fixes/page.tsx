/**
 * Shopify Fixes Page - Atlas Dark Theme
 * View all SEO fixes applied to your Shopify store
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'

interface Fix {
  id: string
  description: string
  status: 'PENDING' | 'APPLIED' | 'FAILED' | 'ROLLED_BACK'
  appliedAt?: string
  createdAt: string
  issue?: {
    title: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    pageUrl: string
  }
}

export default function ShopifyFixesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [fixes, setFixes] = useState<Fix[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'applied' | 'failed' | 'rolled_back'>('all')
  const [error, setError] = useState<string | null>(null)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    fetchFixes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop])

  const fetchFixes = async () => {
    try {
      const response = await fetch(`/api/shopify/fixes?shop=${shop}`)
      const data = await response.json()

      if (data.success) {
        setFixes(data.data.fixes || [])
        setPendingCount(data.data.pendingCount || 0)
        setError(null)
      } else {
        setError(data.error?.message || 'Failed to load fixes')
      }
    } catch (error) {
      console.error('Error fetching fixes:', error)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredFixes = fixes.filter((fix) => {
    if (filter === 'all') return fix.status !== 'PENDING'
    if (filter === 'applied') return fix.status === 'APPLIED'
    if (filter === 'failed') return fix.status === 'FAILED'
    if (filter === 'rolled_back') return fix.status === 'ROLLED_BACK'
    return true
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-500/10'
      case 'HIGH':
        return 'text-orange-400 bg-orange-500/10'
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-500/10'
      case 'LOW':
        return 'text-blue-400 bg-blue-500/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED':
        return 'text-green-400 bg-green-500/10'
      case 'FAILED':
        return 'text-red-400 bg-red-500/10'
      case 'ROLLED_BACK':
        return 'text-orange-400 bg-orange-500/10'
      default:
        return 'text-gray-400 bg-gray-500/10'
    }
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
                SEO Fixes
              </h1>
              <p className="text-gray-400">
                View all SEO fixes applied to your store
              </p>
            </div>
            <div className="flex gap-3">
              {pendingCount > 0 && (
                <button
                  onClick={() => router.push(`/shopify/fixes/pending?shop=${shop}`)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {pendingCount} Pending Fixes
                </button>
              )}
              <button
                onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
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
                    Failed to Load Fixes
                  </h3>
                  <p className="text-red-400 mb-3">
                    {error}
                  </p>
                  <button
                    onClick={() => {
                      setError(null)
                      setLoading(true)
                      fetchFixes()
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          {!error && (
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
                }`}
              >
                All ({fixes.filter(f => f.status !== 'PENDING').length})
              </button>
              <button
                onClick={() => setFilter('applied')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'applied'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
                }`}
              >
                Applied ({fixes.filter(f => f.status === 'APPLIED').length})
              </button>
              <button
                onClick={() => setFilter('failed')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'failed'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
                }`}
              >
                Failed ({fixes.filter(f => f.status === 'FAILED').length})
              </button>
              <button
                onClick={() => setFilter('rolled_back')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'rolled_back'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-[#262A2B] text-gray-300 hover:bg-[#2D3233]'
                }`}
              >
                Rolled Back ({fixes.filter(f => f.status === 'ROLLED_BACK').length})
              </button>
            </div>
          )}
        </header>

        {/* Fixes List */}
        {!error && filteredFixes.length === 0 ? (
          <div className="bg-[#262A2B] rounded-lg shadow-lg p-8 text-center border border-white/5">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No Fixes Found</h3>
            <p className="text-gray-400">
              {fixes.length === 0
                ? 'No SEO fixes have been applied to your store yet.'
                : 'No fixes match the selected filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFixes.map((fix) => (
              <div
                key={fix.id}
                className="bg-[#262A2B] rounded-lg shadow-lg hover:shadow-xl transition-all border border-white/5 hover:border-white/10 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {fix.issue?.severity && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(fix.issue.severity)}`}>
                          {fix.issue.severity}
                        </span>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(fix.status)}`}>
                        {fix.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {fix.issue?.title || fix.description}
                    </h3>

                    {fix.issue?.pageUrl && (
                      <p className="text-sm text-gray-400 mb-3">
                        {fix.issue.pageUrl}
                      </p>
                    )}

                    <p className="text-sm text-gray-300 mb-3">
                      {fix.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {fix.appliedAt
                            ? `Applied ${new Date(fix.appliedAt).toLocaleDateString()}`
                            : `Created ${new Date(fix.createdAt).toLocaleDateString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
