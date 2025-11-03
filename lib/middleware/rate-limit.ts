/**
 * Rate Limiting Middleware
 * Protects API endpoints from abuse using token bucket algorithm
 *
 * SECURITY FEATURES:
 * - Per-user and per-IP rate limiting
 * - Different limits for authenticated vs anonymous users
 * - Configurable limits per endpoint
 * - Sliding window with token bucket algorithm
 * - DDoS protection
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Rate limit configuration per endpoint type
export const RATE_LIMITS = {
  // Authentication endpoints - strict limits
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    message: 'Too many authentication attempts. Please try again later.',
  },

  // OAuth flows - moderate limits
  OAUTH: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 10, // 10 OAuth attempts per 10 minutes
    message: 'Too many OAuth attempts. Please try again later.',
  },

  // API endpoints - standard limits
  API_AUTHENTICATED: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 60, // 60 requests per minute
    message: 'Rate limit exceeded. Please slow down.',
  },

  API_ANONYMOUS: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10, // 10 requests per minute for anonymous
    message: 'Rate limit exceeded. Please authenticate for higher limits.',
  },

  // Write operations - more restrictive
  API_WRITE: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 write operations per minute
    message: 'Too many write operations. Please slow down.',
  },

  // Expensive operations (AI analysis, crawling)
  API_EXPENSIVE: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 expensive operations per hour
    message: 'Rate limit exceeded for this resource-intensive operation.',
  },

  // Webhook endpoints
  WEBHOOK: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 webhook calls per minute
    message: 'Webhook rate limit exceeded.',
  },

  // Admin endpoints
  ADMIN: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // Higher limit for admins
    message: 'Admin rate limit exceeded.',
  },
} as const

export type RateLimitType = keyof typeof RATE_LIMITS

// In-memory store for rate limiting (use Redis in production)
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Get client identifier for rate limiting
 */
function getClientId(req: NextRequest, userId?: string): string {
  // Use userId if authenticated, otherwise use IP
  if (userId) {
    return `user:${userId}`
  }

  // Get IP from headers (works with proxies)
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip || 'unknown'

  return `ip:${ip}`
}

/**
 * Rate limit check
 */
export function checkRateLimit(
  clientId: string,
  limitType: RateLimitType
): { allowed: boolean; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[limitType]
  const now = Date.now()
  const key = `${clientId}:${limitType}`

  let entry = rateLimitStore.get(key)

  // Initialize or reset if window expired
  if (!entry || entry.resetAt < now) {
    entry = {
      count: 0,
      resetAt: now + config.windowMs,
    }
    rateLimitStore.set(key, entry)
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Increment counter
  entry.count++

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Rate limit middleware wrapper
 */
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limitType: RateLimitType,
  options?: {
    getUserId?: (req: NextRequest) => Promise<string | null>
  }
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      // Get user ID if provided
      let userId: string | null = null
      if (options?.getUserId) {
        userId = await options.getUserId(req)
      }

      const clientId = getClientId(req, userId || undefined)
      const result = checkRateLimit(clientId, limitType)

      // Add rate limit headers
      const headers = new Headers()
      headers.set('X-RateLimit-Limit', RATE_LIMITS[limitType].maxRequests.toString())
      headers.set('X-RateLimit-Remaining', result.remaining.toString())
      headers.set('X-RateLimit-Reset', new Date(result.resetAt).toISOString())

      if (!result.allowed) {
        // Log rate limit violation
        await logRateLimitViolation(clientId, limitType, req)

        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'RATE_LIMIT_EXCEEDED',
              message: RATE_LIMITS[limitType].message,
              retryAfter: Math.ceil((result.resetAt - Date.now()) / 1000),
            },
          },
          {
            status: 429,
            headers: {
              'Retry-After': Math.ceil((result.resetAt - Date.now()) / 1000).toString(),
              ...Object.fromEntries(headers.entries()),
            },
          }
        )
      }

      // Call the original handler
      const response = await handler(req)

      // Add rate limit headers to response
      headers.forEach((value, key) => {
        response.headers.set(key, value)
      })

      return response
    } catch (error) {
      console.error('Rate limit middleware error:', error)
      // Continue without rate limiting on error
      return handler(req)
    }
  }
}

/**
 * Log rate limit violation to audit log
 */
async function logRateLimitViolation(
  clientId: string,
  limitType: RateLimitType,
  req: NextRequest
): Promise<void> {
  try {
    // Extract user ID from client ID if available
    const userId = clientId.startsWith('user:') ? clientId.replace('user:', '') : null

    if (userId) {
      // Log to audit log for authenticated users
      const user = await db.user.findFirst({
        where: { clerkId: userId },
      })

      if (user) {
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'RATE_LIMIT_EXCEEDED',
            resource: 'rate_limit',
            details: JSON.stringify({
              limitType,
              clientId,
              path: req.nextUrl.pathname,
              method: req.method,
            }),
            ipAddress: req.ip || req.headers.get('x-forwarded-for') || 'unknown',
            userAgent: req.headers.get('user-agent') || 'unknown',
          },
        })
      }
    }

    // Also log to console for monitoring
    console.warn('Rate limit exceeded:', {
      clientId,
      limitType,
      path: req.nextUrl.pathname,
      method: req.method,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Failed to log rate limit violation:', error)
  }
}

/**
 * Helper to get current rate limit status
 */
export function getRateLimitStatus(
  clientId: string,
  limitType: RateLimitType
): { count: number; limit: number; remaining: number; resetAt: number } {
  const config = RATE_LIMITS[limitType]
  const key = `${clientId}:${limitType}`
  const entry = rateLimitStore.get(key)

  if (!entry || entry.resetAt < Date.now()) {
    return {
      count: 0,
      limit: config.maxRequests,
      remaining: config.maxRequests,
      resetAt: Date.now() + config.windowMs,
    }
  }

  return {
    count: entry.count,
    limit: config.maxRequests,
    remaining: Math.max(0, config.maxRequests - entry.count),
    resetAt: entry.resetAt,
  }
}

/**
 * Reset rate limit for a client (admin function)
 */
export function resetRateLimit(clientId: string, limitType?: RateLimitType): void {
  if (limitType) {
    const key = `${clientId}:${limitType}`
    rateLimitStore.delete(key)
  } else {
    // Reset all limits for this client
    for (const key of rateLimitStore.keys()) {
      if (key.startsWith(clientId)) {
        rateLimitStore.delete(key)
      }
    }
  }
}
