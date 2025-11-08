/**
 * Shopify Settings Page
 * Configure execution mode and app preferences
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShopifyAppNav } from '@/components/shopify/ShopifyAppNav'
import { SaveBar, useSaveBar } from '@/components/shopify/SaveBar'
import { showSuccessToast, showErrorToast } from '@/lib/shopify-app-bridge'

type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

export default function ShopifySettingsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [executionMode, setExecutionMode] = useState<ExecutionMode>('PLAN')
  const [originalMode, setOriginalMode] = useState<ExecutionMode>('PLAN')
  const [loading, setLoading] = useState(true)

  const { hasChanges, setHasChanges, saving, save, discard } = useSaveBar({
    onSave: async () => {
      try {
        const response = await fetch('/api/shopify/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shop, executionMode }),
        })

        const data = await response.json()

        if (data.success) {
          setOriginalMode(executionMode)
          showSuccessToast('Settings saved successfully!')
        } else {
          showErrorToast('Failed to save settings: ' + (data.error?.message || 'Unknown error'))
          throw new Error('Save failed')
        }
      } catch (error) {
        console.error('Error saving settings:', error)
        showErrorToast('Failed to save settings')
        throw error
      }
    },
    onDiscard: () => {
      setExecutionMode(originalMode)
    },
  })

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
          const mode = data.data.executionMode || 'PLAN'
          setExecutionMode(mode)
          setOriginalMode(mode)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [shop])

  const handleModeChange = (mode: ExecutionMode) => {
    setExecutionMode(mode)
    setHasChanges(mode !== originalMode)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#191A1B]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <>
      <SaveBar show={hasChanges} onSave={save} onDiscard={discard} loading={saving} />
      <div className="min-h-screen bg-[#191A1B] flex">
        <ShopifyAppNav />
        <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8" role="banner">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Settings
              </h1>
              <p className="text-gray-400">
                Configure how SEOLOGY.AI handles SEO fixes
              </p>
            </div>
            <button
              onClick={() => router.push(`/shopify/dashboard?shop=${shop}`)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              ← Back to Dashboard
            </button>
          </div>
        </header>

        {/* Execution Mode Settings */}
      <div className="bg-[#262A2B] border border-white/5 hover:border-white/10 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Execution Mode
        </h2>
        <p className="text-gray-400 mb-6">
          Choose how you want SEOLOGY.AI to handle SEO fixes
        </p>

        <div className="space-y-4">
          {/* Automatic Mode */}
          <button
            onClick={() => handleModeChange('AUTOMATIC')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'AUTOMATIC'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'AUTOMATIC'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}
                  >
                    {executionMode === 'AUTOMATIC' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Automatic
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded">
                    FASTEST
                  </span>
                </div>
                <p className="text-sm text-gray-400 ml-7">
                  AI automatically detects and applies all SEO fixes without asking. Best for hands-off optimization.
                </p>
              </div>
            </div>
          </button>

          {/* Plan Mode */}
          <button
            onClick={() => handleModeChange('PLAN')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'PLAN'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'PLAN'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}
                  >
                    {executionMode === 'PLAN' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Plan
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded">
                    RECOMMENDED
                  </span>
                </div>
                <p className="text-sm text-gray-400 ml-7">
                  AI creates a batch of fixes, you review and approve all at once. Balance between speed and control.
                </p>
              </div>
            </div>
          </button>

          {/* Approve Mode */}
          <button
            onClick={() => handleModeChange('APPROVE')}
            className={`w-full text-left p-6 border-2 rounded-lg transition-all ${
              executionMode === 'APPROVE'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      executionMode === 'APPROVE'
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}
                  >
                    {executionMode === 'APPROVE' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Approve Each
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-400 rounded">
                    MOST CONTROL
                  </span>
                </div>
                <p className="text-sm text-gray-400 ml-7">
                  AI suggests fixes one by one, you manually approve each before it's applied. Maximum control.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-300 mb-2">
          ℹ️ About Execution Modes
        </h3>
        <ul className="text-sm text-blue-400 space-y-2">
          <li>• You can change modes anytime</li>
          <li>• All fixes can be rolled back within 90 days</li>
          <li>• AI-generated fixes are reviewed for quality before application</li>
          <li>• Your products are never deleted, only optimized</li>
        </ul>
      </div>
        </main>
      </div>
    </>
  )
}
