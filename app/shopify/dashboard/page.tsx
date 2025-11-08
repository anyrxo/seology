/**
 * Shopify Dashboard Page
 * Main dashboard with Atlas dark theme and Shopify navigation
 */

'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'

interface DashboardStats {
  productCount: number
  issueCount: number
  fixesApplied: number
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
  planName: string
  usageStats: {
    fixesUsed: number
    fixesLimit: number
    aiCreditsUsed: number
    aiCreditsLimit: number
  }
}

interface RecentActivity {
  id: string
  type: 'AUDIT' | 'FIX' | 'ROLLBACK'
  description: string
  timestamp: Date
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
}

interface ActivityAPIResponse {
  id: string
  type: 'AUDIT' | 'FIX' | 'ROLLBACK'
  description: string
  timestamp: string | Date
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
}

export default function ShopifyDashboardPage() {
  const searchParams = useSearchParams()
  const shop = searchParams.get('shop')

  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (shop) {
      fetchDashboardData()
    }
  }, [shop])

  const fetchDashboardData = async () => {
    try {
      // Fetch context (stats)
      const contextResponse = await fetch(`/api/shopify/context?shop=${shop}`)
      if (contextResponse.ok) {
        const contextData = await contextResponse.json()
        if (contextData.success) {
          // Map API response to dashboard stats format
          setStats({
            productCount: contextData.data.productCount || 0,
            issueCount: contextData.data.issueCount || 0,
            fixesApplied: contextData.data.fixesApplied || 0,
            executionMode: contextData.data.executionMode || 'PLAN',
            planName: contextData.data.planName || 'GROWTH',
            usageStats: {
              fixesUsed: contextData.data.credits?.used || 0,
              fixesLimit: contextData.data.credits?.limit || 5000,
              aiCreditsUsed: contextData.data.credits?.used || 0,
              aiCreditsLimit: contextData.data.credits?.limit || 5000,
            },
          })
        }
      }

      // Fetch real activity feed from database
      const activityResponse = await fetch(`/api/shopify/activity?shop=${shop}&limit=10`)
      if (activityResponse.ok) {
        const activityData = await activityResponse.json()
        if (activityData.success) {
          setRecentActivity(activityData.data.map((item: ActivityAPIResponse) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          })))
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#191A1B]">
        <p className="text-white">Missing shop parameter</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#191A1B]">
      {/* Navigation Sidebar */}
      <ShopifyAppNav />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Page Header */}
        <div className="bg-[#262A2B] border-b border-gray-700 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white text-2xl font-semibold mb-1">Dashboard</h1>
            <p className="text-gray-400 text-sm">Overview of your store's SEO performance</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Products */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-1">Total Products</div>
                <div className="text-white text-3xl font-semibold">
                  {loading ? '...' : stats?.productCount || 0}
                </div>
              </div>

              {/* Issues */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-1">Active Issues</div>
                <div className="text-white text-3xl font-semibold">
                  {loading ? '...' : stats?.issueCount || 0}
                </div>
              </div>

              {/* Fixes Applied */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-1">Fixes Applied</div>
                <div className="text-white text-3xl font-semibold">
                  {loading ? '...' : stats?.fixesApplied || 0}
                </div>
              </div>

              {/* Execution Mode */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    stats?.executionMode === 'AUTOMATIC' ? 'bg-green-600/20' :
                    stats?.executionMode === 'PLAN' ? 'bg-blue-600/20' : 'bg-purple-600/20'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      stats?.executionMode === 'AUTOMATIC' ? 'bg-green-500' :
                      stats?.executionMode === 'PLAN' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-1">Execution Mode</div>
                <div className="text-white text-xl font-semibold">
                  {loading ? '...' : stats?.executionMode || 'PLAN'}
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fixes Usage */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Fixes Usage</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Used this month</span>
                    <span className="text-white font-medium">
                      {stats?.usageStats?.fixesUsed || 0} / {stats?.usageStats?.fixesLimit || 500}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          ((stats?.usageStats?.fixesUsed || 0) / (stats?.usageStats?.fixesLimit || 500)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs">
                    {(stats?.usageStats?.fixesLimit || 500) - (stats?.usageStats?.fixesUsed || 0)} fixes remaining
                  </div>
                </div>
              </div>

              {/* AI Credits Usage */}
              <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">AI Credits</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Used this month</span>
                    <span className="text-white font-medium">
                      {stats?.usageStats?.aiCreditsUsed || 0} / {stats?.usageStats?.aiCreditsLimit || 100}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-600 to-teal-600 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          ((stats?.usageStats?.aiCreditsUsed || 0) / (stats?.usageStats?.aiCreditsLimit || 100)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-gray-400 text-xs">
                    {(stats?.usageStats?.aiCreditsLimit || 100) - (stats?.usageStats?.aiCreditsUsed || 0)} credits remaining
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#262A2B] border border-gray-700 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.length === 0 ? (
                  <p className="text-gray-400 text-sm">No recent activity</p>
                ) : (
                  recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 bg-[#191A1B] border border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            activity.type === 'AUDIT'
                              ? 'bg-blue-600/20'
                              : activity.type === 'FIX'
                              ? 'bg-green-600/20'
                              : 'bg-purple-600/20'
                          }`}
                        >
                          {activity.type === 'AUDIT' && (
                            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          )}
                          {activity.type === 'FIX' && (
                            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {activity.type === 'ROLLBACK' && (
                            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{activity.description}</div>
                          <div className="text-gray-400 text-xs">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'SUCCESS'
                              ? 'bg-green-600/20 text-green-500'
                              : activity.status === 'PENDING'
                              ? 'bg-yellow-600/20 text-yellow-500'
                              : 'bg-red-600/20 text-red-500'
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-[#262A2B] border border-gray-700 hover:border-blue-500 rounded-lg p-6 text-left transition-all group">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Run Audit</h4>
                <p className="text-gray-400 text-sm">Analyze your store for SEO issues</p>
              </button>

              <button className="bg-[#262A2B] border border-gray-700 hover:border-green-500 rounded-lg p-6 text-left transition-all group">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600/30 transition-colors">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Apply Fixes</h4>
                <p className="text-gray-400 text-sm">Review and apply pending fixes</p>
              </button>

              <button className="bg-[#262A2B] border border-gray-700 hover:border-purple-500 rounded-lg p-6 text-left transition-all group">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-2">Ask AI Assistant</h4>
                <p className="text-gray-400 text-sm">Get SEO recommendations and help</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
