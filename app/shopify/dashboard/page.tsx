/**
 * Shopify Dashboard - Main landing page after OAuth
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShopifyNav } from '@/components/shopify/ShopifyNav'
import { ShopifyChat } from '@/components/shopify/ShopifyChat'
import { AdvancedTooltip } from '@/components/ui/advanced-tooltip'
import {
  setContextualActions,
  clearContextualActions,
  setLoading,
} from '@/lib/shopify-app-bridge'

interface ShopifyOverview {
  totalProducts: number
  totalIssues: number
  appliedFixes: number
  avgScore: number
}

export default function ShopifyDashboardPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [overview, setOverview] = useState<ShopifyOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!shop) return

    setLoading(true)
    try {
      const res = await fetch(`/api/shopify/overview?shop=${shop}`)
      const data = await res.json()

      if (data.success) {
        setOverview(data.data)
        setError(null)
      } else {
        setError(data.error?.message || 'Failed to load dashboard data')
      }
    } catch (err) {
      console.error('Dashboard API error:', err)
      setError('Failed to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Set up contextual actions in title bar
    setContextualActions([
      {
        label: 'Refresh Data',
        onAction: () => fetchData(),
      },
    ])

    // Initial data fetch
    fetchData()

    // Cleanup contextual actions on unmount
    return () => clearContextualActions()
  }, [shop])

  if (loading) {
    return (
      <>
        <ShopifyNav shop={shop} />
        <main className="p-8 max-w-7xl mx-auto">
          <div className="space-y-8 animate-pulse">
            {/* Header skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-64"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg w-96"></div>
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-24"></div>
                      <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded w-20"></div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <ShopifyNav shop={shop} />
      <ShopifyChat />

      <main className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8" role="banner">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and optimize your store's search engine performance
          </p>
        </header>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-1">
                  Failed to Load Dashboard
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-3">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {overview && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Products Card */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-smooth p-6 cursor-pointer hover:-translate-y-2 relative overflow-hidden animate-fade-in-up stagger-delay-1" data-testid="stat-card">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {overview.totalProducts || 0}
                  </p>
                  <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    In catalog
                  </div>
                </div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* SEO Issues Card */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-smooth p-6 cursor-pointer hover:-translate-y-2 relative overflow-hidden animate-fade-in-up stagger-delay-2" data-testid="stat-card">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent dark:from-red-900/10 pointer-events-none"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                    SEO Issues
                    {(overview.totalIssues || 0) > 0 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 animate-pulse">
                        Action needed
                      </span>
                    )}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {overview.totalIssues || 0}
                  </p>
                  <div className="flex items-center text-xs text-red-600 dark:text-red-400 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                    </svg>
                    {(overview.totalIssues || 0) === 0 ? 'All clear!' : 'Requires attention'}
                  </div>
                </div>
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Fixes Applied Card */}
            <div className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-smooth p-6 cursor-pointer hover:-translate-y-2 relative overflow-hidden animate-fade-in-up stagger-delay-3" data-testid="stat-card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 pointer-events-none"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                    Fixes Applied
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {overview.appliedFixes || 0}
                  </p>
                  <div className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Optimizations live
                  </div>
                </div>
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="group bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-smooth p-6 relative overflow-hidden animate-fade-in-up stagger-delay-4 cursor-pointer hover:-translate-y-2" data-testid="stat-card">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 pointer-events-none"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg SEO Score</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {overview.avgScore || 0}%
                  </p>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${overview.avgScore || 0}%` }}
                    ></div>
                  </div>

                  {/* Score indicator */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {(overview.avgScore || 0) >= 80 ? '✨ Excellent' : (overview.avgScore || 0) >= 60 ? '👍 Good' : (overview.avgScore || 0) >= 40 ? '⚠️ Needs work' : '❌ Critical'}
                  </p>
                </div>

                {/* Circular progress indicator */}
                <div className="relative w-20 h-20 ml-4">
                  <svg className="transform -rotate-90 w-20 h-20">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - (overview.avgScore || 0) / 100)}`}
                      className="text-purple-600 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-purple-600">{overview.avgScore || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
              3 available
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={`/shopify/products?shop=${shop}`}
              className="group relative flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-smooth hover:shadow-lg hover:-translate-y-2 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 overflow-hidden animate-scale-in stagger-delay-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="relative flex-1">
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Analyze Products</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check SEO issues</p>
              </div>
              <svg className="relative w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href={`/shopify/reports?shop=${shop}`}
              className="group relative flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-green-500 dark:hover:border-green-500 transition-smooth hover:shadow-lg hover:-translate-y-2 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-900/10 overflow-hidden animate-scale-in stagger-delay-2"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="relative flex-1">
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">View Reports</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">SEO insights</p>
              </div>
              <svg className="relative w-5 h-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href={`/shopify/settings?shop=${shop}`}
              className="group relative flex items-center p-5 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-smooth hover:shadow-lg hover:-translate-y-2 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-900/10 overflow-hidden animate-scale-in stagger-delay-3"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="relative flex-1">
                <p className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Settings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure app</p>
              </div>
              <svg className="relative w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>

          {/* Enhanced empty state */}
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
              No recent activity yet. Start by analyzing your products to discover SEO optimization opportunities.
            </p>

            <a
              href={`/shopify/products?shop=${shop}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Analyze Products
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
