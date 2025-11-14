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
import { shopifyFetch } from '@/lib/shopify-fetch'

export default function ShopifyAppEntryPoint() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const shop = searchParams.get('shop')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Debug: Log all URL parameters
      console.log('[Shopify Entry] Current URL:', window.location.href)
      console.log('[Shopify Entry] All URL params:', Object.fromEntries(searchParams.entries()))

      if (!shop) {
        console.error('[Shopify Entry] No shop parameter provided')

        // Try to get shop from sessionStorage (set by AppBridgeProvider)
        const storedShop = sessionStorage.getItem('shopify_shop')
        console.log('[Shopify Entry] Stored shop from session:', storedShop)

        if (storedShop) {
          // Redirect with shop parameter
          const params = new URLSearchParams(window.location.search)
          params.set('shop', storedShop)
          router.push(`/shopify?${params.toString()}`)
          return
        }

        // If no shop anywhere, show error
        router.push('/shopify/onboarding')
        return
      }

      // CRITICAL: Check if app is embedded in Shopify FIRST before making any API calls
      const host = searchParams.get('host')
      const isEmbedded = window.top !== window.self // Check if in iframe

      console.log('[Shopify Entry] Embedded check:', { host, isEmbedded, hasHost: !!host })

      // Helper function to build URLs with all required params
      const buildShopifyUrl = (path: string) => {
        const params = new URLSearchParams()
        params.set('shop', shop)
        if (host) params.set('host', host) // CRITICAL: Preserve host to keep app embedded
        return `${path}?${params.toString()}`
      }

      // If NOT embedded and no host parameter, redirect to OAuth installation
      // This MUST happen BEFORE any API calls because API calls need App Bridge session tokens
      if (!isEmbedded && !host) {
        console.log('[Shopify Entry] ⚠️ App not embedded - redirecting to OAuth installation')
        console.log('[Shopify Entry] You must install the app via Shopify Admin to use it')
        const installUrl = `/api/auth/shopify?shop=${shop}`
        console.log('[Shopify Entry] Redirecting to:', installUrl)
        // Use window.top to break out of any iframe (prevents "refused to connect" error)
        if (window.top) {
          window.top.location.href = installUrl
        } else {
          window.location.href = installUrl
        }
        // Stop execution here
        setChecking(false)
        return
      }

      // At this point, we know the app is embedded
      console.log('[Shopify Entry] ✅ App is properly embedded, checking onboarding status')

      try {
        // Check if this shop has completed onboarding
        // IMPORTANT: Must use shopifyFetch to manually inject session token
        // App Bridge v4 only auto-injects tokens for Shopify's APIs, not custom backends
        const response = await shopifyFetch(`/api/shopify/onboarding/status?shop=${shop}`)

        // If we get 401 or 404, it means authentication failed - redirect to OAuth
        if (response.status === 401 || response.status === 404) {
          console.log(`[Shopify Entry] ⚠️ Authentication failed (${response.status}) - app needs to be installed`)
          console.log('[Shopify Entry] Redirecting to OAuth installation flow')
          // Use window.top to break out of iframe
          if (window.top) {
            window.top.location.href = `/api/auth/shopify?shop=${shop}`
          } else {
            window.location.href = `/api/auth/shopify?shop=${shop}`
          }
          setChecking(false)
          return
        }

        const data = await response.json()

        if (data.success && data.data.completed) {
          // User has completed onboarding → go to dashboard
          console.log('[Shopify Entry] Onboarding complete → redirecting to dashboard')
          router.push(buildShopifyUrl('/shopify/dashboard'))
        } else {
          // User needs onboarding → go to onboarding
          console.log('[Shopify Entry] Onboarding needed → redirecting to onboarding')
          router.push(buildShopifyUrl('/shopify/onboarding'))
        }
      } catch (error) {
        console.error('[Shopify Entry] Failed to check onboarding status:', error)
        // On error, try OAuth installation
        console.log('[Shopify Entry] Error occurred, redirecting to OAuth installation')
        // Use window.top to break out of iframe
        if (window.top) {
          window.top.location.href = `/api/auth/shopify?shop=${shop}`
        } else {
          window.location.href = `/api/auth/shopify?shop=${shop}`
        }
      } finally {
        setChecking(false)
      }
    }

    checkOnboardingStatus()
  }, [shop, router, searchParams])

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
