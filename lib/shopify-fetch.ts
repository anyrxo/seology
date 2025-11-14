/**
 * Shopify-aware fetch wrapper
 * Manually retrieves session token from App Bridge and injects into requests
 *
 * IMPORTANT: App Bridge v4's automatic injection ONLY works for Shopify's GraphQL API.
 * For custom backend APIs, we must manually retrieve and inject tokens.
 *
 * Reference: https://shopify.dev/docs/apps/build/authentication-authorization/session-tokens
 */

/**
 * Wait for App Bridge to be available
 */
async function waitForAppBridge(maxWaitMs = 5000): Promise<boolean> {
  if (typeof window === 'undefined') return false

  const startTime = Date.now()
  while (Date.now() - startTime < maxWaitMs) {
    if (window.shopify?.idToken) {
      console.log('[ShopifyFetch] ✅ App Bridge is ready')
      return true
    }
    // Wait 100ms before checking again
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.warn('[ShopifyFetch] ⚠️ App Bridge not available after waiting')
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
 * Fetch with manual session token injection for Shopify embedded apps
 *
 * CRITICAL: This is required because App Bridge v4's automatic injection
 * only works for Shopify's APIs, not custom backend APIs.
 */
export async function shopifyFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get session token
  const sessionToken = await getSessionToken()

  // Add Authorization header if we have a session token
  const headers = new Headers(options.headers || {})
  if (sessionToken) {
    headers.set('Authorization', `Bearer ${sessionToken}`)
    console.log('[ShopifyFetch] ✅ Added session token to request:', url)
  } else {
    console.warn('[ShopifyFetch] ⚠️ No session token available for request:', url)
    console.warn('[ShopifyFetch] This usually means the app is not embedded in Shopify')
    // The request will likely fail with 401/404
  }

  // Make request with updated headers
  return fetch(url, {
    ...options,
    headers,
  })
}
