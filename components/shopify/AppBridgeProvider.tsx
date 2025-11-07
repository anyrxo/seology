'use client'

/**
 * Shopify App Bridge Provider
 * Initializes App Bridge for embedded apps and extracts shop parameter
 */

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get host parameter from URL (required for embedded apps)
    const host = new URLSearchParams(window.location.search).get('host')
    const shopParam = searchParams.get('shop')

    if (host) {
      // Store host for subsequent page loads (App Bridge needs this)
      sessionStorage.setItem('shopify_host', host)

      // Extract shop domain from host parameter
      // Host is base64 encoded: "shopname.myshopify.com/admin"
      try {
        const decodedHost = atob(host)
        const shop = decodedHost.split('/')[0] // Get "shopname.myshopify.com"

        // Store shop in session
        sessionStorage.setItem('shopify_shop', shop)

        // If current URL doesn't have shop parameter, add it
        if (!shopParam && shop) {
          const currentParams = new URLSearchParams(window.location.search)
          currentParams.set('shop', shop)
          currentParams.set('host', host)

          const newUrl = `${pathname}?${currentParams.toString()}`
          console.log('[AppBridge] Adding shop parameter to URL:', shop)
          router.replace(newUrl)
        }
      } catch (error) {
        console.error('[AppBridge] Failed to decode host parameter:', error)
      }
    }

    // Check if we're embedded
    const isEmbedded = window.top !== window.self

    if (isEmbedded) {
      console.log('[AppBridge] Running in embedded mode')

      // If we have shop in session but not in URL, restore it
      const storedShop = sessionStorage.getItem('shopify_shop')
      if (storedShop && !shopParam) {
        const currentParams = new URLSearchParams(window.location.search)
        currentParams.set('shop', storedShop)
        if (host) currentParams.set('host', host)

        const newUrl = `${pathname}?${currentParams.toString()}`
        console.log('[AppBridge] Restoring shop parameter from session:', storedShop)
        router.replace(newUrl)
      }
    }
  }, [pathname, searchParams, router])

  return <>{children}</>
}
