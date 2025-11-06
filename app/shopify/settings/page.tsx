/**
 * Shopify Settings Page
 * Configure execution mode and app preferences
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from '@/lib/toast'

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

export default function ShopifySettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('PLAN')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!shop) {
      setLoading(false)
      return
    }

    // Fetch current settings
    fetch(`/api/shopify/settings?shop=${shop}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExecutionMode(data.data.executionMode || 'PLAN')
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [shop])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/shopify/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shop, executionMode }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Settings saved successfully!')
      } else {
        toast.error('Failed to save settings: ' + (data.error?.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Configure how SEOLOGY.AI handles SEO fixes
            </p>
          </div>
          <button
            onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Execution Mode Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Execution Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose how you want SEOLOGY.AI to handle SEO fixes
        </p>

        <div className="space-y-4">
          {/* Automatic Mode */}
          <button
            onClick={() => setExecutionMode('AUTOMATIC')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'AUTOMATIC'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'AUTOMATIC'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {executionMode === 'AUTOMATIC' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Automatic
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded">
                    FASTEST
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                  AI automatically detects and applies all SEO fixes without asking. Best for hands-off optimization.
                </p>
              </div>
            </div>
          </button>

          {/* Plan Mode */}
          <button
            onClick={() => setExecutionMode('PLAN')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'PLAN'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'PLAN'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {executionMode === 'PLAN' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Plan
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                  AI creates a batch of fixes, you review and approve all at once. Balance between speed and control.
                </p>
              </div>
            </div>
          </button>

          {/* Approve Mode */}
          <button
            onClick={() => setExecutionMode('APPROVE')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'APPROVE'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'APPROVE'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {executionMode === 'APPROVE' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Approve Each
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded">
                    MOST CONTROL
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
                  AI suggests fixes one by one, you manually approve each before it's applied. Maximum control.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
          ℹ️ About Execution Modes
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
          <li>• You can change modes anytime</li>
          <li>• All fixes can be rolled back within 90 days</li>
          <li>• AI-generated fixes are reviewed for quality before application</li>
          <li>• Your products are never deleted, only optimized</li>
        </ul>
      </div>
    </div>
  )
}
