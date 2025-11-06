/**
 * Shopify Dashboard - Main landing page after OAuth
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface ShopifyOverview {
  totalProducts: number
  totalIssues: number
  appliedFixes: number
  avgScore: number
}

// Extend Window for Shopify App Bridge
declare global {
  interface Window {
    shopify?: {
      app?: {
        init: (config: { apiKey: string; shop: string }) => void
      }
    }
  }
}

// Extend JSX to support ui-nav-menu web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-nav-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

export default function ShopifyDashboardPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')
  const [overview, setOverview] = useState<ShopifyOverview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Shopify App Bridge - script already loaded in layout
    if (typeof window !== 'undefined' && window.shopify?.app && shop) {
      const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID
      if (!apiKey) {
        console.error('NEXT_PUBLIC_SHOPIFY_CLIENT_ID environment variable is not set')
        return
      }
      window.shopify.app.init({
        apiKey: apiKey,
        shop: shop,
      })
    }

    // Fetch dashboard overview
    if (shop) {
      fetch(`/api/shopify/overview?shop=${shop}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOverview(data.data)
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [shop])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      {/* Shopify Navigation Menu - Modern ui-nav-menu web component */}
      {/* @ts-expect-error - Shopify App Bridge web component not in type definitions */}
      <ui-nav-menu>
        <a href={`/shopify/dashboard?shop=${shop}`} rel="home">Dashboard</a>
        <a href={`/shopify/products?shop=${shop}`}>Products</a>
        <a href={`/shopify/analytics?shop=${shop}`}>Analytics</a>
        <a href={`/shopify/timeline?shop=${shop}`}>Timeline</a>
        <a href={`/shopify/agents?shop=${shop}`}>AI Agents</a>
        <a href={`/shopify/monitor?shop=${shop}`}>Monitor</a>
        <a href={`/shopify/reports?shop=${shop}`}>SEO Reports</a>
        <a href={`/shopify/chat?shop=${shop}`}>AI Chat</a>
        <a href={`/shopify/settings?shop=${shop}`}>Settings</a>
        <a href={`/shopify/support?shop=${shop}`}>Support</a>
        {/* @ts-expect-error - Shopify App Bridge web component not in type definitions */}
      </ui-nav-menu>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor and optimize your store's search engine performance
          </p>
        </div>

        {/* Stats Grid */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overview.totalProducts || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">SEO Issues</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overview.totalIssues || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fixes Applied</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overview.appliedFixes || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg SEO Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {overview.avgScore || 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={`/shopify/products?shop=${shop}`}
              className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Analyze Products</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check SEO issues</p>
              </div>
            </a>

            <a
              href={`/shopify/reports?shop=${shop}`}
              className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">View Reports</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">SEO insights</p>
              </div>
            </a>

            <a
              href={`/shopify/settings?shop=${shop}`}
              className="flex items-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Settings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure app</p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            No recent activity yet. Start by analyzing your products!
          </p>
        </div>
      </div>
    </>
  )
}
