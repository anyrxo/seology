/**
 * Shopify-aware fetch wrapper
 * Automatically includes session token for embedded apps
 */

/**
 * Wait for App Bridge to be available
 */
async function waitForAppBridge(maxWaitMs = 5000): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const startTime = Date.now()
  while (Date.now() - startTime < maxWaitMs) {
    if (window.shopify?.idToken) {
      console.log('[ShopifyFetch] App Bridge is ready')
      return true
    }
    // Wait 100ms before checking again
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.warn('[ShopifyFetch] App Bridge not available after waiting')
  return false
}

/**
 * Get session token from Shopify App Bridge
 */
async function getSessionToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  try {
    // Wait for App Bridge to be available
    const isReady = await waitForAppBridge()
    if (!isReady || !window.shopify?.idToken) {
      console.warn('[ShopifyFetch] App Bridge not available - app may not be embedded')
      return null
    }

    // Get session token from App Bridge
    const token = await window.shopify.idToken()
    console.log('[ShopifyFetch] ✅ Session token retrieved')
    return token
  } catch (error) {
    console.error('[ShopifyFetch] Failed to get session token:', error)
    return null
  }
}

/**
 * Fetch with automatic session token injection for Shopify embedded apps
 * Falls back to regular fetch if not embedded
 */
export async function shopifyFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get session token if available
  const sessionToken = await getSessionToken()

  // Add Authorization header if we have a session token
  const headers = new Headers(options.headers || {})
  if (sessionToken) {
    headers.set('Authorization', `Bearer ${sessionToken}`)
    console.log('[ShopifyFetch] ✅ Added session token to request:', url)
  } else {
    console.warn('[ShopifyFetch] ⚠️ No session token available for request:', url)
    console.warn('[ShopifyFetch] This usually means the app is not embedded in Shopify')

    // If no session token and we're making an API call, the request will likely fail
    // The calling code should handle this by redirecting to OAuth
  }

  // Make request with updated headers
  return fetch(url, {
    ...options,
    headers,
  })
}

// Type definition for window.shopify is in lib/shopify-app-bridge.ts
