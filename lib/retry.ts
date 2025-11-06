/**
 * Retry Logic with Exponential Backoff
 *
 * Handles transient failures and rate limiting for API requests
 */

import { logger } from './logger'

export interface RetryError extends Error {
  status?: number
  retryAfter?: number
}

export interface RetryOptions {
  maxAttempts?: number
  initialDelay?: number
  maxDelay?: number
  factor?: number
  shouldRetry?: (error: RetryError) => boolean
}

const DEFAULT_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 30000, // 30 seconds
  factor: 2, // Exponential factor
  shouldRetry: (error: RetryError) => {
    // Retry on network errors or 429 (rate limit) or 5xx server errors
    if (error.message?.includes('fetch failed') || error.message?.includes('network')) {
      return true
    }
    if (error.status === 429 || (error.status && error.status >= 500 && error.status < 600)) {
      return true
    }
    return false
  },
}

/**
 * Sleep for a given duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  let lastError: RetryError = new Error('Unknown error') as RetryError

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error: unknown) {
      // Type guard to ensure error is RetryError
      const retryError = error instanceof Error ? error as RetryError : new Error(String(error)) as RetryError
      lastError = retryError

      // Check if we should retry
      if (!opts.shouldRetry(retryError)) {
        throw retryError
      }

      // Don't retry on last attempt
      if (attempt === opts.maxAttempts) {
        break
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        opts.initialDelay * Math.pow(opts.factor, attempt - 1),
        opts.maxDelay
      )

      // Check for Retry-After header (for rate limiting)
      let actualDelay = delay
      if (retryError.retryAfter) {
        // retryAfter is in seconds, convert to ms
        actualDelay = Math.min(retryError.retryAfter * 1000, opts.maxDelay)
      }

      logger.warn('API', `Retry attempt ${attempt}/${opts.maxAttempts} after ${actualDelay}ms`, {
        attempt,
        maxAttempts: opts.maxAttempts,
        delay: actualDelay,
        error: retryError.message,
        status: retryError.status,
      })

      await sleep(actualDelay)
    }
  }

  throw lastError
}

/**
 * Retry with custom backoff for Shopify API
 * Handles Shopify-specific rate limiting
 */
export async function retryShopifyRequest<T>(
  fn: () => Promise<Response>
): Promise<T> {
  return retry(
    async () => {
      const response = await fn()

      // Handle 429 Rate Limit
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const error = new Error('Shopify API rate limit exceeded') as RetryError
        error.status = 429
        error.retryAfter = retryAfter ? parseInt(retryAfter) : 2 // Default 2 seconds

        throw error
      }

      // Handle other errors
      if (!response.ok) {
        const errorText = await response.text()
        const error = new Error(
          `Shopify API error (${response.status}): ${errorText}`
        ) as RetryError
        error.status = response.status
        throw error
      }

      return response.json()
    },
    {
      maxAttempts: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      shouldRetry: (error: RetryError) => {
        // Always retry rate limits and server errors
        return error.status === 429 || (error.status !== undefined && error.status >= 500 && error.status < 600)
      },
    }
  )
}
