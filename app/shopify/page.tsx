/**
 * Shopify App Main Entry Point
 * Smart router that checks onboarding status and redirects accordingly
 *
 * Flow:
 * - First-time users → /shopify/onboarding
 * - Returning users → /shopify/dashboard
 */

'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ShopifyAppEntryPoint() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!shop) {
        console.error('[Shopify Entry] No shop parameter provided')
        // If no shop, go to onboarding which will handle the error
        router.push('/shopify/onboarding')
        return
      }

      try {
        // Check if this shop has completed onboarding
        const response = await fetch(`/api/shopify/onboarding/status?shop=${shop}`)
        const data = await response.json()

        if (data.success && data.data.completed) {
          // User has completed onboarding → go to dashboard
          console.log('[Shopify Entry] Onboarding complete → redirecting to dashboard')
          router.push(`/shopify/dashboard?shop=${shop}`)
        } else {
          // User needs onboarding → go to onboarding
          console.log('[Shopify Entry] Onboarding needed → redirecting to onboarding')
          router.push(`/shopify/onboarding?shop=${shop}`)
        }
      } catch (error) {
        console.error('[Shopify Entry] Failed to check onboarding status:', error)
        // On error, default to onboarding (safer)
        router.push(`/shopify/onboarding?shop=${shop}`)
      } finally {
        setChecking(false)
      }
    }

    checkOnboardingStatus()
  }, [shop, router])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading SEOLOGY.AI...</p>
          <p className="text-sm text-gray-400 mt-2">Checking your account</p>
        </div>
      </div>
    )
  }

  return null
}
