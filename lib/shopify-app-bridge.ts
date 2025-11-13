/**
 * Shopify App Bridge Utility
 * Type-safe wrapper for Shopify App Bridge functionality
 *
 * Documentation: https://shopify.dev/docs/api/app-bridge-library
 */

// Type definitions for Shopify App Bridge global object
interface ShopifyToast {
  show: (message: string, options?: { isError?: boolean; duration?: number }) => void
}

interface ShopifyModal {
  show: (options: {
    title: string
    message: string
    primaryAction?: {
      label: string
      destructive?: boolean
      onAction?: () => void
    }
    secondaryAction?: {
      label: string
      onAction?: () => void
    }
  }) => Promise<{ action: 'primary' | 'secondary' | 'close' }>
}

interface ShopifyConfig {
  apiKey: string
  shop: string
  host: string
  locale: string
}

interface ShopifyRedirect {
  admin: (path: string) => void
  remote: (url: string) => void
}

interface ShopifySaveBarAction {
  label: string
  loading?: boolean
  disabled?: boolean
  onAction: () => void
}

interface ShopifySaveBar {
  show: (options: {
    saveAction: ShopifySaveBarAction
    discardAction: ShopifySaveBarAction
  }) => void
  hide: () => void
}

interface ShopifyTitleBarButton {
  label: string
  onAction: () => void
}

interface ShopifyTitleBar {
  update: (options: {
    buttons?: {
      primary?: ShopifyTitleBarButton[]
      secondary?: ShopifyTitleBarButton[]
    }
  }) => void
}

interface ShopifyAppBridge {
  toast: ShopifyToast
  modal: ShopifyModal
  config: ShopifyConfig
  idToken: () => Promise<string>
  loading: (isLoading: boolean) => void
  resourcePicker: (options: {
    type: 'product' | 'collection' | 'variant'
    multiple?: boolean
  }) => Promise<any[]>
  redirect: ShopifyRedirect
  saveBar: ShopifySaveBar
  titleBar: ShopifyTitleBar
  // Legacy app.init method (deprecated but may be used by some pages)
  app?: {
    init: (config: { apiKey: string; shop: string }) => void
  }
}

// NOTE: Window type is extended globally - DO NOT duplicate this declaration in other files
// Import this module in any file that needs to access window.shopify
declare global {
  interface Window {
    shopify?: ShopifyAppBridge
  }
}

/**
 * Check if App Bridge is available
 */
export function isAppBridgeAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.shopify
}

/**
 * Get the Shopify App Bridge instance
 * Throws error if App Bridge is not loaded
 */
export function getAppBridge(): ShopifyAppBridge {
  if (!isAppBridgeAvailable()) {
    throw new Error('Shopify App Bridge is not loaded. Make sure the script is included in the page.')
  }
  return window.shopify!
}

/**
 * Show a toast notification
 * Falls back to console.log if App Bridge is not available
 *
 * @example
 * showToast('Product updated successfully')
 * showToast('Failed to update product', { isError: true })
 */
export function showToast(message: string, options?: { isError?: boolean; duration?: number }): void {
  if (isAppBridgeAvailable()) {
    try {
      window.shopify!.toast.show(message, options)
    } catch (error) {
      console.error('Failed to show toast:', error)
      // Fallback to console
      if (options?.isError) {
        console.error(`[ERROR] ${message}`)
      } else {
        console.log(`[SUCCESS] ${message}`)
      }
    }
  } else {
    // Fallback for non-embedded context or when App Bridge fails to load
    if (options?.isError) {
      console.error(`[ERROR] ${message}`)
    } else {
      console.log(`[SUCCESS] ${message}`)
    }
  }
}

/**
 * Show a success toast notification
 *
 * @example
 * showSuccessToast('Agent created successfully')
 */
export function showSuccessToast(message: string): void {
  showToast(message, { isError: false })
}

/**
 * Show an error toast notification
 *
 * @example
 * showErrorToast('Failed to delete agent')
 */
export function showErrorToast(message: string): void {
  showToast(message, { isError: true })
}

/**
 * Show a confirmation modal
 * Falls back to window.confirm() if App Bridge is not available
 *
 * @example
 * const confirmed = await confirmDialog({
 *   title: 'Delete Agent',
 *   message: 'Are you sure you want to delete this agent? This action cannot be undone.',
 *   primaryAction: { label: 'Delete', destructive: true },
 *   secondaryAction: { label: 'Cancel' }
 * })
 */
export async function confirmDialog(options: {
  title: string
  message: string
  primaryAction?: {
    label: string
    destructive?: boolean
  }
  secondaryAction?: {
    label: string
  }
}): Promise<boolean> {
  if (isAppBridgeAvailable()) {
    try {
      const result = await window.shopify!.modal.show(options)
      return result.action === 'primary'
    } catch (error) {
      console.error('Failed to show modal:', error)
      // Fallback to native confirm
      return window.confirm(`${options.title}\n\n${options.message}`)
    }
  } else {
    // Fallback to native confirm for non-embedded context
    return window.confirm(`${options.title}\n\n${options.message}`)
  }
}

/**
 * Show loading indicator
 * No-op if App Bridge is not available
 *
 * @example
 * setLoading(true)
 * await performOperation()
 * setLoading(false)
 */
export function setLoading(isLoading: boolean): void {
  if (isAppBridgeAvailable()) {
    try {
      window.shopify!.loading(isLoading)
    } catch (error) {
      console.error('Failed to set loading state:', error)
    }
  }
}

/**
 * Wait for App Bridge to be available
 * Retries up to maxAttempts times with a delay between attempts
 *
 * @param maxAttempts - Maximum number of attempts (default: 50)
 * @param delayMs - Delay between attempts in milliseconds (default: 100)
 * @returns true if App Bridge becomes available, false otherwise
 */
export async function waitForAppBridge(maxAttempts = 50, delayMs = 100): Promise<boolean> {
  console.log('[waitForAppBridge] Waiting for App Bridge to initialize...')

  for (let i = 0; i < maxAttempts; i++) {
    if (isAppBridgeAvailable()) {
      console.log(`[waitForAppBridge] ✅ App Bridge available after ${i} attempts (${i * delayMs}ms)`)
      return true
    }

    if (i % 10 === 0 && i > 0) {
      console.log(`[waitForAppBridge] Still waiting... (attempt ${i}/${maxAttempts})`)
    }

    await new Promise((resolve) => setTimeout(resolve, delayMs))
  }

  console.error(`[waitForAppBridge] ❌ App Bridge not available after ${maxAttempts} attempts (${maxAttempts * delayMs}ms)`)
  console.error('[waitForAppBridge] Make sure App Bridge script is loaded and app is embedded in Shopify')
  return false
}

/**
 * Get session token for authenticated API requests
 * Waits for App Bridge to be ready before attempting to get token
 *
 * @example
 * const token = await getSessionToken()
 * fetch('/api/shopify/products', {
 *   headers: { 'Authorization': `Bearer ${token}` }
 * })
 */
export async function getSessionToken(): Promise<string | null> {
  // Wait for App Bridge to be available
  const isReady = await waitForAppBridge()
  if (!isReady) {
    console.error('App Bridge not available after waiting')
    return null
  }

  try {
    return await window.shopify!.idToken()
  } catch (error) {
    console.error('Failed to get session token:', error)
    return null
  }
}

/**
 * Get shop configuration
 * Returns null if App Bridge is not available
 *
 * @example
 * const config = getShopConfig()
 * console.log(config.shop) // 'my-store.myshopify.com'
 */
export function getShopConfig(): ShopifyConfig | null {
  if (isAppBridgeAvailable()) {
    try {
      return window.shopify!.config
    } catch (error) {
      console.error('Failed to get shop config:', error)
      return null
    }
  }
  return null
}

/**
 * Open resource picker (products, collections, variants)
 *
 * @example
 * const products = await openResourcePicker({ type: 'product', multiple: true })
 * console.log(products) // [{ id: 'gid://...', title: '...' }]
 */
export async function openResourcePicker(options: {
  type: 'product' | 'collection' | 'variant'
  multiple?: boolean
}): Promise<any[] | null> {
  if (isAppBridgeAvailable()) {
    try {
      return await window.shopify!.resourcePicker(options)
    } catch (error) {
      console.error('Failed to open resource picker:', error)
      return null
    }
  }
  return null
}

/**
 * Make an authenticated API request with session token
 * Automatically adds Authorization header with session token
 * Throws descriptive errors for different failure scenarios
 *
 * @example
 * const data = await authenticatedFetch<{ products: Product[] }>('/api/shopify/products?shop=my-store.myshopify.com')
 * console.log(data.products)
 */
export async function authenticatedFetch<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getSessionToken()

  // If we have a session token, use it for authentication
  // Otherwise, fall back to shop parameter (for development/testing)
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  } else {
    // Log warning if no token available - this will likely fail on backend
    console.warn('No session token available for authenticated request')
  }

  let response: Response
  try {
    response = await fetch(url, {
      ...options,
      headers,
    })
  } catch (error) {
    // Network error - could not connect to server
    throw new Error(`Failed to fetch: ${error instanceof Error ? error.message : 'Network error'}`)
  }

  if (!response.ok) {
    // Try to get error details from response body
    let errorMessage = `${response.status} ${response.statusText}`
    try {
      const errorData = await response.json()
      if (errorData.error) {
        errorMessage = errorData.error
      }
    } catch {
      // Response body is not JSON, use status text
    }

    // Throw specific error based on status code
    if (response.status === 401) {
      throw new Error(`Unauthorized: ${errorMessage}`)
    } else if (response.status === 404) {
      throw new Error(`Not found: ${errorMessage}`)
    } else if (response.status >= 500) {
      throw new Error(`Server error (${response.status}): ${errorMessage}`)
    } else {
      throw new Error(`API request failed: ${errorMessage}`)
    }
  }

  return response.json()
}

/**
 * Retry a function with exponential backoff
 * Useful for handling transient failures
 *
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries (default: 3)
 * @param baseDelay - Base delay in milliseconds (default: 1000)
 * @returns Result of the function
 *
 * @example
 * const data = await withRetry(() => authenticatedFetch('/api/shopify/products'))
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // Don't retry on authentication errors (401) or not found (404)
      if (lastError.message.includes('Unauthorized') || lastError.message.includes('Not found')) {
        throw lastError
      }

      // Don't retry if this was the last attempt
      if (attempt === maxRetries) {
        break
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt)
      console.log(`Retrying after ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

/**
 * Navigate to a Shopify Admin page
 * Uses App Bridge navigation if available, falls back to direct URL
 *
 * @example
 * navigateToShopifyAdmin('products')
 * navigateToShopifyAdmin('products/123')
 */
export function navigateToShopifyAdmin(path: string): void {
  if (isAppBridgeAvailable()) {
    try {
      window.shopify!.redirect.admin(path)
    } catch (error) {
      console.error('App Bridge navigation failed:', error)
      // Fallback to direct URL (requires shop domain)
      const config = getShopConfig()
      if (config) {
        window.location.href = `https://${config.shop}/admin/${path}`
      }
    }
  } else {
    console.warn('App Bridge not available, cannot navigate')
  }
}

/**
 * Navigate to a product in Shopify Admin
 * Extracts numeric ID from GraphQL ID if needed
 *
 * @example
 * navigateToProduct('gid://shopify/Product/123')
 * navigateToProduct('123')
 */
export function navigateToProduct(productId: string): void {
  // Extract numeric ID from GraphQL GID if needed
  const numericId = productId.includes('/') ? productId.split('/').pop() : productId
  navigateToShopifyAdmin(`products/${numericId}`)
}

/**
 * Navigate to a collection in Shopify Admin
 *
 * @example
 * navigateToCollection('gid://shopify/Collection/456')
 */
export function navigateToCollection(collectionId: string): void {
  const numericId = collectionId.includes('/') ? collectionId.split('/').pop() : collectionId
  navigateToShopifyAdmin(`collections/${numericId}`)
}

/**
 * Set contextual action buttons in Shopify Admin title bar
 * Buttons appear in the top-right of the embedded app
 *
 * @example
 * setContextualActions([
 *   { label: 'Refresh Data', onAction: () => fetchData() },
 *   { label: 'Export Report', onAction: () => exportReport() }
 * ])
 */
export function setContextualActions(
  actions: Array<{
    label: string
    onAction: () => void
  }>
): void {
  if (isAppBridgeAvailable()) {
    try {
      window.shopify!.titleBar.update({
        buttons: {
          secondary: actions.map((action) => ({
            label: action.label,
            onAction: action.onAction,
          })),
        },
      })
    } catch (error) {
      console.error('Failed to set contextual actions:', error)
    }
  }
}

/**
 * Clear contextual action buttons
 */
export function clearContextualActions(): void {
  if (isAppBridgeAvailable()) {
    try {
      window.shopify!.titleBar.update({
        buttons: {
          secondary: [],
        },
      })
    } catch (error) {
      console.error('Failed to clear contextual actions:', error)
    }
  }
}
