/**
 * Rate Limiting System
 *
 * Implements token bucket algorithm for rate limiting:
 * - API route rate limiting
 * - Shopify API rate limit handling
 * - Claude AI request throttling
 * - Per-user and per-IP rate limiting
 */

import { RateLimitError } from './errors'

/**
 * Rate limiter configuration
 */
export interface RateLimiterConfig {
  /**
   * Maximum number of requests allowed in the window
   */
  maxRequests: number

  /**
   * Time window in milliseconds
   */
  windowMs: number

  /**
   * Unique identifier for the rate limiter (e.g., 'api:global', 'shopify:shop123')
   */
  keyPrefix?: string

  /**
   * Custom error message
   */
  message?: string
}

/**
 * Token bucket for rate limiting
 */
interface TokenBucket {
  tokens: number
  lastRefill: number
  maxTokens: number
  refillRate: number // tokens per millisecond
}

/**
 * In-memory store for rate limit data
 * In production, use Redis or similar distributed cache
 */
const rateLimitStore = new Map<string, TokenBucket>()

/**
 * Cleanup interval - remove old entries every 5 minutes
 */
const CLEANUP_INTERVAL = 5 * 60 * 1000

let cleanupTimer: NodeJS.Timeout | null = null

/**
 * Start cleanup timer
 */
function startCleanup() {
  if (cleanupTimer) return

  cleanupTimer = setInterval(() => {
    const now = Date.now()
    const expirationTime = 10 * 60 * 1000 // 10 minutes

    for (const [key, bucket] of rateLimitStore.entries()) {
      if (now - bucket.lastRefill > expirationTime) {
        rateLimitStore.delete(key)
      }
    }
  }, CLEANUP_INTERVAL)

  // Don't keep the process running just for cleanup
  if (cleanupTimer.unref) {
    cleanupTimer.unref()
  }
}

/**
 * Get or create token bucket
 */
function getTokenBucket(key: string, config: RateLimiterConfig): TokenBucket {
  let bucket = rateLimitStore.get(key)

  if (!bucket) {
    bucket = {
      tokens: config.maxRequests,
      lastRefill: Date.now(),
      maxTokens: config.maxRequests,
      refillRate: config.maxRequests / config.windowMs,
    }
    rateLimitStore.set(key, bucket)
    startCleanup()
  }

  return bucket
}

/**
 * Refill tokens based on time elapsed
 */
function refillTokens(bucket: TokenBucket): void {
  const now = Date.now()
  const timePassed = now - bucket.lastRefill
  const tokensToAdd = timePassed * bucket.refillRate

  bucket.tokens = Math.min(bucket.maxTokens, bucket.tokens + tokensToAdd)
  bucket.lastRefill = now
}

/**
 * Check if request is allowed under rate limit
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimiterConfig
): { allowed: boolean; remaining: number; resetAt: Date; retryAfter?: number } {
  const key = config.keyPrefix ? `${config.keyPrefix}:${identifier}` : identifier
  const bucket = getTokenBucket(key, config)

  refillTokens(bucket)

  const allowed = bucket.tokens >= 1
  if (allowed) {
    bucket.tokens -= 1
  }

  const remaining = Math.floor(bucket.tokens)
  const resetAt = new Date(bucket.lastRefill + config.windowMs)
  const retryAfter = allowed ? undefined : Math.ceil((1 - bucket.tokens) / bucket.refillRate)

  return {
    allowed,
    remaining,
    resetAt,
    retryAfter,
  }
}

/**
 * Rate limit middleware for API routes
 */
export async function rateLimit(
  identifier: string,
  config: RateLimiterConfig
): Promise<void> {
  const result = checkRateLimit(identifier, config)

  if (!result.allowed) {
    throw new RateLimitError(
      config.message || 'Too many requests, please try again later',
      result.retryAfter,
      {
        remaining: result.remaining,
        resetAt: result.resetAt,
      }
    )
  }
}

/**
 * Get rate limit headers for API response
 */
export function getRateLimitHeaders(
  identifier: string,
  config: RateLimiterConfig
): Record<string, string> {
  const result = checkRateLimit(identifier, config)

  return {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetAt.toISOString(),
    ...(result.retryAfter && {
      'Retry-After': Math.ceil(result.retryAfter / 1000).toString(),
    }),
  }
}

/**
 * Predefined rate limit configurations
 */
export const RateLimits = {
  /**
   * Global API rate limit: 100 requests per minute
   */
  API_GLOBAL: {
    maxRequests: 100,
    windowMs: 60 * 1000,
    keyPrefix: 'api:global',
    message: 'API rate limit exceeded. Please try again in a minute.',
  } as RateLimiterConfig,

  /**
   * Authentication endpoints: 5 requests per minute
   */
  API_AUTH: {
    maxRequests: 5,
    windowMs: 60 * 1000,
    keyPrefix: 'api:auth',
    message: 'Too many authentication attempts. Please try again later.',
  } as RateLimiterConfig,

  /**
   * Shopify API calls: 40 requests per second (2 requests per 50ms burst limit)
   */
  SHOPIFY_API: {
    maxRequests: 2,
    windowMs: 50,
    keyPrefix: 'shopify:api',
    message: 'Shopify API rate limit approached. Request queued.',
  } as RateLimiterConfig,

  /**
   * Shopify GraphQL Admin API: 50 points per second (cost-based)
   */
  SHOPIFY_GRAPHQL: {
    maxRequests: 50,
    windowMs: 1000,
    keyPrefix: 'shopify:graphql',
    message: 'Shopify GraphQL rate limit approached. Request queued.',
  } as RateLimiterConfig,

  /**
   * Claude AI API: 5 requests per minute per user
   */
  CLAUDE_API: {
    maxRequests: 5,
    windowMs: 60 * 1000,
    keyPrefix: 'claude:api',
    message: 'AI service rate limit reached. Please try again in a minute.',
  } as RateLimiterConfig,

  /**
   * File uploads: 10 uploads per minute
   */
  FILE_UPLOAD: {
    maxRequests: 10,
    windowMs: 60 * 1000,
    keyPrefix: 'api:upload',
    message: 'Upload rate limit exceeded. Please try again later.',
  } as RateLimiterConfig,

  /**
   * Webhook endpoints: 1000 requests per minute
   */
  WEBHOOK: {
    maxRequests: 1000,
    windowMs: 60 * 1000,
    keyPrefix: 'webhook',
    message: 'Webhook rate limit exceeded.',
  } as RateLimiterConfig,

  /**
   * Public API endpoints: 30 requests per minute
   */
  PUBLIC_API: {
    maxRequests: 30,
    windowMs: 60 * 1000,
    keyPrefix: 'api:public',
    message: 'Public API rate limit exceeded. Please try again later.',
  } as RateLimiterConfig,
} as const

/**
 * Get client identifier from request (IP or user ID)
 */
export function getClientIdentifier(
  req: Request,
  userId?: string
): string {
  // Prefer user ID if authenticated
  if (userId) {
    return `user:${userId}`
  }

  // Fall back to IP address
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'

  return `ip:${ip}`
}

/**
 * Shopify API rate limiter with leaky bucket algorithm
 * Handles Shopify's call limit system
 */
export class ShopifyRateLimiter {
  private callsAvailable: number
  private maxCalls: number
  private restoreRate: number // calls restored per second
  private lastCheck: number

  constructor(maxCalls = 40, restoreRate = 2) {
    this.maxCalls = maxCalls
    this.callsAvailable = maxCalls
    this.restoreRate = restoreRate
    this.lastCheck = Date.now()
  }

  /**
   * Update rate limit based on Shopify's response headers
   */
  updateFromHeaders(headers: Headers): void {
    const callLimit = headers.get('X-Shopify-Shop-Api-Call-Limit')
    if (callLimit) {
      const [used, max] = callLimit.split('/').map(Number)
      if (!isNaN(used) && !isNaN(max)) {
        this.callsAvailable = max - used
        this.maxCalls = max
        this.lastCheck = Date.now()
      }
    }
  }

  /**
   * Restore calls based on time elapsed
   */
  private restoreCalls(): void {
    const now = Date.now()
    const secondsElapsed = (now - this.lastCheck) / 1000
    const callsToRestore = secondsElapsed * this.restoreRate

    this.callsAvailable = Math.min(
      this.maxCalls,
      this.callsAvailable + callsToRestore
    )
    this.lastCheck = now
  }

  /**
   * Wait until a call is available
   */
  async waitForAvailableCall(cost = 1): Promise<void> {
    this.restoreCalls()

    if (this.callsAvailable >= cost) {
      this.callsAvailable -= cost
      return
    }

    // Calculate wait time
    const callsNeeded = cost - this.callsAvailable
    const waitMs = (callsNeeded / this.restoreRate) * 1000

    console.log(
      `[Shopify Rate Limit] Waiting ${Math.ceil(waitMs)}ms for ${cost} call(s)`
    )

    await new Promise((resolve) => setTimeout(resolve, waitMs))
    this.callsAvailable = cost
    this.lastCheck = Date.now()
  }

  /**
   * Get current status
   */
  getStatus(): {
    available: number
    max: number
    percentage: number
  } {
    this.restoreCalls()

    return {
      available: Math.floor(this.callsAvailable),
      max: this.maxCalls,
      percentage: (this.callsAvailable / this.maxCalls) * 100,
    }
  }
}

/**
 * Global Shopify rate limiters per shop
 */
const shopifyRateLimiters = new Map<string, ShopifyRateLimiter>()

/**
 * Get Shopify rate limiter for a shop
 */
export function getShopifyRateLimiter(shop: string): ShopifyRateLimiter {
  let limiter = shopifyRateLimiters.get(shop)

  if (!limiter) {
    limiter = new ShopifyRateLimiter()
    shopifyRateLimiters.set(shop, limiter)
  }

  return limiter
}

/**
 * Claude AI rate limiter with exponential backoff
 */
export class ClaudeRateLimiter {
  private static requestQueue: Array<{
    resolve: () => void
    timestamp: number
  }> = []
  private static processing = false

  /**
   * Wait for available Claude API slot
   */
  static async waitForSlot(userId: string): Promise<void> {
    // Check per-user rate limit
    await rateLimit(userId, RateLimits.CLAUDE_API)

    // Add to queue
    return new Promise((resolve) => {
      this.requestQueue.push({ resolve, timestamp: Date.now() })
      this.processQueue()
    })
  }

  private static async processQueue(): Promise<void> {
    if (this.processing || this.requestQueue.length === 0) {
      return
    }

    this.processing = true

    while (this.requestQueue.length > 0) {
      const request = this.requestQueue.shift()
      if (request) {
        request.resolve()
        // Minimum 200ms between requests
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
    }

    this.processing = false
  }
}

/**
 * Reset rate limit for identifier (admin/testing use only)
 */
export function resetRateLimit(identifier: string, keyPrefix?: string): void {
  const key = keyPrefix ? `${keyPrefix}:${identifier}` : identifier
  rateLimitStore.delete(key)
}

/**
 * Get all rate limit stats (admin use only)
 */
export function getRateLimitStats(): Array<{
  key: string
  tokens: number
  maxTokens: number
  percentage: number
}> {
  const stats: Array<{
    key: string
    tokens: number
    maxTokens: number
    percentage: number
  }> = []

  for (const [key, bucket] of rateLimitStore.entries()) {
    refillTokens(bucket)
    stats.push({
      key,
      tokens: Math.floor(bucket.tokens),
      maxTokens: bucket.maxTokens,
      percentage: (bucket.tokens / bucket.maxTokens) * 100,
    })
  }

  return stats.sort((a, b) => a.percentage - b.percentage)
}
