/**
 * Cache Management Utilities
 *
 * Next.js 14 cache management with:
 * - Cache tag revalidation
 * - Cache statistics
 * - Smart invalidation strategies
 * - Performance monitoring
 */

import { revalidateTag, revalidatePath } from 'next/cache'
import { unstable_cache } from 'next/cache'

/**
 * Cache tag namespaces for organized cache management
 */
export const CacheTags = {
  STORE_CONTEXT: (connectionId: string) => `store-context-${connectionId}`,
  SHOPIFY_PRODUCTS: (connectionId: string) => `shopify-products-${connectionId}`,
  SHOPIFY_PRODUCT: (productId: string) => `shopify-product-${productId}`,
  ISSUES: (connectionId: string) => `issues-${connectionId}`,
  FIXES: (connectionId: string) => `fixes-${connectionId}`,
  USER_CREDITS: (userId: string) => `user-credits-${userId}`,
  ANALYTICS: (connectionId: string) => `analytics-${connectionId}`,
} as const

/**
 * Cache TTL (time-to-live) configurations in seconds
 */
export const CacheTTL = {
  SHORT: 60, // 1 minute - frequently changing data
  MEDIUM: 300, // 5 minutes - moderately stable data
  LONG: 3600, // 1 hour - stable data
  VERY_LONG: 86400, // 24 hours - rarely changing data
} as const

/**
 * Revalidate store context cache
 * Call this when products, issues, or fixes change
 */
export function revalidateStoreContext(connectionId: string): void {
  revalidateTag(CacheTags.STORE_CONTEXT(connectionId))
}

/**
 * Revalidate all caches for a connection
 * Call this when a connection is updated or disconnected
 */
export function revalidateConnection(connectionId: string): void {
  revalidateTag(CacheTags.STORE_CONTEXT(connectionId))
  revalidateTag(CacheTags.SHOPIFY_PRODUCTS(connectionId))
  revalidateTag(CacheTags.ISSUES(connectionId))
  revalidateTag(CacheTags.FIXES(connectionId))
  revalidateTag(CacheTags.ANALYTICS(connectionId))
}

/**
 * Revalidate user credits cache
 * Call this after credit consumption or plan changes
 */
export function revalidateUserCredits(userId: string): void {
  revalidateTag(CacheTags.USER_CREDITS(userId))
}

/**
 * Revalidate specific product cache
 * Call this when a product is updated
 */
export function revalidateProduct(productId: string, connectionId?: string): void {
  revalidateTag(CacheTags.SHOPIFY_PRODUCT(productId))

  if (connectionId) {
    // Also revalidate the products list for this connection
    revalidateTag(CacheTags.SHOPIFY_PRODUCTS(connectionId))
  }
}

/**
 * Revalidate issues cache
 * Call this when issues are detected, fixed, or deleted
 */
export function revalidateIssues(connectionId: string): void {
  revalidateTag(CacheTags.ISSUES(connectionId))
  // Also revalidate store context since it includes issue count
  revalidateTag(CacheTags.STORE_CONTEXT(connectionId))
}

/**
 * Revalidate fixes cache
 * Call this when fixes are applied, rolled back, or deleted
 */
export function revalidateFixes(connectionId: string): void {
  revalidateTag(CacheTags.FIXES(connectionId))
  // Also revalidate store context since it includes recent fixes
  revalidateTag(CacheTags.STORE_CONTEXT(connectionId))
}

/**
 * Revalidate path-based cache
 * Use for page-level invalidation
 */
export function revalidateShopifyApp(shop: string): void {
  revalidatePath(`/shopify?shop=${shop}`)
}

/**
 * Create a cached function with smart defaults
 */
export function createCachedFunction<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: {
    tags: string | string[] | ((...args: TArgs) => string[])
    revalidate?: number
    keyPrefix?: string
  }
) {
  // Normalize tags to always be an array
  const tags = typeof options.tags === 'function'
    ? undefined
    : Array.isArray(options.tags)
    ? options.tags
    : options.tags
    ? [options.tags]
    : undefined

  return unstable_cache(fn, [options.keyPrefix || fn.name], {
    revalidate: options.revalidate,
    tags,
  })
}

/**
 * Cache statistics interface
 */
interface CacheStats {
  hits: number
  misses: number
  hitRate: number
  averageLatency: number
  lastAccess: Date | null
}

/**
 * In-memory cache statistics tracker
 * In production, use Redis or similar for distributed stats
 */
class CacheStatsTracker {
  private stats = new Map<string, CacheStats>()

  recordHit(cacheKey: string, latency: number): void {
    const existing = this.stats.get(cacheKey) || {
      hits: 0,
      misses: 0,
      hitRate: 0,
      averageLatency: 0,
      lastAccess: null,
    }

    existing.hits++
    existing.averageLatency = (existing.averageLatency + latency) / 2
    existing.hitRate = existing.hits / (existing.hits + existing.misses)
    existing.lastAccess = new Date()

    this.stats.set(cacheKey, existing)
  }

  recordMiss(cacheKey: string): void {
    const existing = this.stats.get(cacheKey) || {
      hits: 0,
      misses: 0,
      hitRate: 0,
      averageLatency: 0,
      lastAccess: null,
    }

    existing.misses++
    existing.hitRate = existing.hits / (existing.hits + existing.misses)
    existing.lastAccess = new Date()

    this.stats.set(cacheKey, existing)
  }

  getStats(cacheKey?: string): Map<string, CacheStats> | CacheStats | null {
    if (cacheKey) {
      return this.stats.get(cacheKey) || null
    }
    return this.stats
  }

  clearStats(): void {
    this.stats.clear()
  }
}

export const cacheStatsTracker = new CacheStatsTracker()

/**
 * Wrapper for cached functions with statistics tracking
 */
export function withCacheStats<TArgs extends unknown[], TReturn>(
  cacheKey: string,
  fn: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const startTime = Date.now()

    try {
      const result = await fn(...args)
      const latency = Date.now() - startTime

      // Record hit if latency is very low (likely cached)
      if (latency < 50) {
        cacheStatsTracker.recordHit(cacheKey, latency)
      } else {
        cacheStatsTracker.recordMiss(cacheKey)
      }

      return result
    } catch (error) {
      cacheStatsTracker.recordMiss(cacheKey)
      throw error
    }
  }
}

/**
 * Smart cache invalidation based on entity relationships
 */
export class SmartCacheInvalidator {
  /**
   * Invalidate all caches related to a product update
   */
  static invalidateProductUpdate(productId: string, connectionId: string): void {
    revalidateProduct(productId, connectionId)
    revalidateStoreContext(connectionId)
  }

  /**
   * Invalidate all caches related to an issue update
   */
  static invalidateIssueUpdate(connectionId: string): void {
    revalidateIssues(connectionId)
    revalidateStoreContext(connectionId)
  }

  /**
   * Invalidate all caches related to a fix update
   */
  static invalidateFixUpdate(connectionId: string): void {
    revalidateFixes(connectionId)
    revalidateStoreContext(connectionId)
  }

  /**
   * Invalidate all caches related to a user plan change
   */
  static invalidateUserPlanChange(userId: string): void {
    revalidateUserCredits(userId)
    // Note: Also need to revalidate all connections for this user
    // This requires a database query, so implement as needed
  }

  /**
   * Invalidate all caches for a full data refresh
   */
  static invalidateAll(connectionId: string): void {
    revalidateConnection(connectionId)
  }
}

/**
 * Get cache statistics for monitoring
 */
export function getCacheStatistics(): {
  totalCaches: number
  averageHitRate: number
  topHits: Array<{ key: string; hitRate: number }>
  topMisses: Array<{ key: string; missRate: number }>
} {
  const allStats = cacheStatsTracker.getStats() as Map<string, CacheStats>
  const entries = Array.from(allStats.entries())

  if (entries.length === 0) {
    return {
      totalCaches: 0,
      averageHitRate: 0,
      topHits: [],
      topMisses: [],
    }
  }

  const totalHitRate =
    entries.reduce((sum, [, stats]) => sum + stats.hitRate, 0) / entries.length

  const topHits = entries
    .sort((a, b) => b[1].hitRate - a[1].hitRate)
    .slice(0, 10)
    .map(([key, stats]) => ({ key, hitRate: stats.hitRate }))

  const topMisses = entries
    .sort((a, b) => a[1].hitRate - b[1].hitRate)
    .slice(0, 10)
    .map(([key, stats]) => ({ key, missRate: 1 - stats.hitRate }))

  return {
    totalCaches: entries.length,
    averageHitRate: totalHitRate,
    topHits,
    topMisses,
  }
}

/**
 * Cache warming utility
 * Pre-populate caches for better performance
 */
export async function warmCache(
  connectionId: string,
  options?: {
    warmProducts?: boolean
    warmIssues?: boolean
    warmFixes?: boolean
  }
): Promise<void> {
  const { warmProducts = true, warmIssues = true, warmFixes = true } = options || {}

  // Import database functions
  const { db } = await import('@/lib/db')

  const tasks: Promise<unknown>[] = []

  if (warmProducts) {
    tasks.push(
      db.shopifyProduct.findMany({
        where: { connectionId },
        take: 50,
      })
    )
  }

  if (warmIssues) {
    tasks.push(
      db.issue.findMany({
        where: { connectionId, status: 'DETECTED' },
        take: 20,
      })
    )
  }

  if (warmFixes) {
    tasks.push(
      db.fix.findMany({
        where: { connectionId, status: 'APPLIED' },
        take: 20,
      })
    )
  }

  await Promise.all(tasks)
}
