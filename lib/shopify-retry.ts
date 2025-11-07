/**
 * Shopify API Retry Logic with Exponential Backoff
 *
 * Provides intelligent retry mechanisms for Shopify API calls:
 * - Exponential backoff with jitter
 * - Rate limit handling
 * - Configurable retry strategies
 * - Error classification for retry decisions
 *
 * Part of the reliability specialist improvements
 */

import {
  isShopifyErrorRetryable,
  getShopifyRetryDelay,
  ShopifyRateLimitError,
} from './shopify-errors'

/**
 * Retry options configuration
 */
export interface RetryOptions {
  /** Maximum number of retry attempts (default: 3) */
  maxRetries?: number

  /** Initial delay in milliseconds (default: 1000) */
  initialDelay?: number

  /** Maximum delay in milliseconds (default: 10000) */
  maxDelay?: number

  /** Backoff multiplier for exponential backoff (default: 2) */
  backoffMultiplier?: number

  /** Whether to add jitter to prevent thundering herd (default: true) */
  useJitter?: boolean

  /** Custom function to determine if error should be retried */
  shouldRetry?: (error: Error, attemptNumber: number) => boolean

  /** Custom function to calculate retry delay */
  getRetryDelay?: (error: Error, attemptNumber: number) => number

  /** Callback called before each retry attempt */
  onRetry?: (error: Error, attemptNumber: number, delay: number) => void

  /** Callback called when max retries exceeded */
  onMaxRetriesExceeded?: (error: Error) => void
}

/**
 * Retry context information
 */
export interface RetryContext {
  attemptNumber: number
  maxRetries: number
  lastError?: Error
  totalDelay: number
}

/**
 * Default retry options
 */
const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  useJitter: true,
  shouldRetry: isShopifyErrorRetryable,
  getRetryDelay: (error, attempt) => {
    // Use Shopify-specific delay if available
    const shopifyDelay = getShopifyRetryDelay(error, attempt)
    if (shopifyDelay) return shopifyDelay

    // Fallback to exponential backoff
    const baseDelay = 1000
    return Math.min(baseDelay * Math.pow(2, attempt - 1), 10000)
  },
  onRetry: () => {},
  onMaxRetriesExceeded: () => {},
}

/**
 * Add jitter to delay to prevent thundering herd problem
 */
function addJitter(delay: number, jitterFactor: number = 0.1): number {
  const jitter = delay * jitterFactor * Math.random()
  return Math.round(delay + jitter)
}

/**
 * Retry a function with exponential backoff
 *
 * @example
 * ```typescript
 * const result = await retryWithBackoff(
 *   () => shopifyGraphQL(shop, token, query),
 *   { maxRetries: 3, initialDelay: 1000 }
 * )
 * ```
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options }
  const context: RetryContext = {
    attemptNumber: 0,
    maxRetries: opts.maxRetries,
    totalDelay: 0,
  }

  let lastError: Error | undefined

  for (let attempt = 1; attempt <= opts.maxRetries + 1; attempt++) {
    context.attemptNumber = attempt

    try {
      // Attempt the function
      const result = await fn()
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      lastError = err
      context.lastError = err

      // Check if we've exhausted retries
      if (attempt > opts.maxRetries) {
        opts.onMaxRetriesExceeded(err)
        throw err
      }

      // Check if error should be retried
      if (!opts.shouldRetry(err, attempt)) {
        throw err
      }

      // Calculate retry delay
      let delay = opts.getRetryDelay(err, attempt)

      // Apply jitter if enabled
      if (opts.useJitter) {
        delay = addJitter(delay)
      }

      // Cap delay at maxDelay
      delay = Math.min(delay, opts.maxDelay)

      context.totalDelay += delay

      // Log retry attempt
      console.log(
        `[Shopify Retry] Attempt ${attempt}/${opts.maxRetries} failed. Retrying in ${delay}ms...`,
        {
          error: err.message,
          errorType: err.constructor.name,
          delay,
          totalDelay: context.totalDelay,
        }
      )

      // Call onRetry callback
      opts.onRetry(err, attempt, delay)

      // Wait before retrying
      await sleep(delay)
    }
  }

  // This should never be reached, but TypeScript needs it
  throw lastError || new Error('Retry loop completed without result')
}

/**
 * Retry a function with rate limit handling
 *
 * Specifically designed for Shopify rate limits.
 * Uses the Retry-After header value when available.
 *
 * @example
 * ```typescript
 * const result = await retryWithRateLimit(
 *   () => shopifyGraphQL(shop, token, query)
 * )
 * ```
 */
export async function retryWithRateLimit<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  return retryWithBackoff(fn, {
    maxRetries: 3,
    shouldRetry: (error) => {
      // Always retry rate limit errors
      if (error instanceof ShopifyRateLimitError) {
        return true
      }
      // Use default Shopify error retry logic
      return isShopifyErrorRetryable(error)
    },
    getRetryDelay: (error, attempt) => {
      // Use rate limit delay if available
      if (error instanceof ShopifyRateLimitError) {
        return error.getRetryAfterMs()
      }
      // Fallback to Shopify-specific delays
      return getShopifyRetryDelay(error, attempt)
    },
    onRetry: (error, attempt, delay) => {
      if (error instanceof ShopifyRateLimitError) {
        console.warn(
          `[Shopify Rate Limit] Hit rate limit. Waiting ${delay}ms before retry ${attempt}`
        )
      }
    },
    ...options,
  })
}

/**
 * Retry a GraphQL query with smart error handling
 *
 * @example
 * ```typescript
 * const result = await retryGraphQL(
 *   () => shopifyGraphQL(shop, token, query, variables)
 * )
 * ```
 */
export async function retryGraphQL<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  return retryWithBackoff(fn, {
    maxRetries: 2, // GraphQL errors usually shouldn't be retried as much
    shouldRetry: (error) => {
      const message = error.message.toLowerCase()

      // Don't retry validation/auth errors
      if (
        message.includes('validation') ||
        message.includes('unauthorized') ||
        message.includes('forbidden') ||
        message.includes('not found')
      ) {
        return false
      }

      // Retry rate limits and network errors
      if (
        message.includes('rate limit') ||
        message.includes('network') ||
        message.includes('timeout')
      ) {
        return true
      }

      // Use default retry logic
      return isShopifyErrorRetryable(error)
    },
    ...options,
  })
}

/**
 * Batch retry - retry multiple operations with shared backoff
 *
 * Useful for batch operations where one failure shouldn't stop all retries
 *
 * @example
 * ```typescript
 * const results = await batchRetry([
 *   () => updateProduct(1),
 *   () => updateProduct(2),
 *   () => updateProduct(3),
 * ])
 * ```
 */
export async function batchRetry<T>(
  operations: Array<() => Promise<T>>,
  options: RetryOptions = {}
): Promise<Array<{ success: boolean; data?: T; error?: Error }>> {
  const results: Array<{ success: boolean; data?: T; error?: Error }> = []

  for (const operation of operations) {
    try {
      const data = await retryWithBackoff(operation, options)
      results.push({ success: true, data })
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      results.push({ success: false, error: err })
    }
  }

  return results
}

/**
 * Circuit breaker pattern for Shopify API calls
 *
 * Prevents cascading failures by temporarily stopping requests
 * after a threshold of failures is reached
 */
export class CircuitBreaker {
  private failureCount = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}

  async execute<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
    // Check circuit state
    if (this.state === 'open') {
      const timeSinceFailure = Date.now() - this.lastFailureTime

      if (timeSinceFailure < this.timeout) {
        throw new Error(
          `Circuit breaker is open. Try again in ${
            Math.ceil((this.timeout - timeSinceFailure) / 1000)
          } seconds.`
        )
      }

      // Try half-open state
      this.state = 'half-open'
    }

    try {
      const result = await retryWithBackoff(fn, options)

      // Success - reset circuit
      this.failureCount = 0
      this.state = 'closed'

      return result
    } catch (error) {
      this.failureCount++
      this.lastFailureTime = Date.now()

      // Open circuit if threshold exceeded
      if (this.failureCount >= this.threshold) {
        this.state = 'open'
        console.error(
          `[Circuit Breaker] Circuit opened after ${this.failureCount} failures`
        )
      }

      throw error
    }
  }

  getState(): 'closed' | 'open' | 'half-open' {
    return this.state
  }

  reset(): void {
    this.failureCount = 0
    this.lastFailureTime = 0
    this.state = 'closed'
  }
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Create a retryable version of a function
 *
 * @example
 * ```typescript
 * const retryableGraphQL = createRetryable(
 *   (shop, token, query) => shopifyGraphQL(shop, token, query),
 *   { maxRetries: 3 }
 * )
 *
 * const result = await retryableGraphQL(shop, token, query)
 * ```
 */
export function createRetryable<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: RetryOptions = {}
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    return retryWithBackoff(() => fn(...args), options)
  }
}
