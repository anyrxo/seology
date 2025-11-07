'use client'

/**
 * Shopify App Bridge Provider
 * Initializes App Bridge for embedded apps
 */

import { useEffect } from 'react'

export function AppBridgeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Get host parameter from URL (required for embedded apps)
    const host = new URLSearchParams(window.location.search).get('host')

    if (host) {
      // Store host for subsequent page loads (App Bridge needs this)
      sessionStorage.setItem('shopify_host', host)
    }

    // Check if we're embedded
    const isEmbedded = window.top !== window.self

    if (isEmbedded) {
      console.log('[AppBridge] Running in embedded mode')
    }
  }, [])

  return <>{children}</>
}
