/**
 * Shopify-aware fetch wrapper
 * Automatically includes session token for embedded apps
 */

/**
 * Get session token from Shopify App Bridge
 */
async function getSessionToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  try {
    // Check if App Bridge is available
    if (!window.shopify?.idToken) {
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
    console.log('[ShopifyFetch] Added session token to request:', url)
  } else {
    console.log('[ShopifyFetch] No session token available, making unauthenticated request:', url)
  }

  // Make request with updated headers
  return fetch(url, {
    ...options,
    headers,
  })
}

// Type definition for window.shopify is in lib/shopify-app-bridge.ts
