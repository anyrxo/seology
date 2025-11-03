/**
 * Caching utilities for SEOLOGY.AI
 *
 * Implements multi-layer caching strategy:
 * 1. In-memory cache (Node.js Map) - fastest, for small frequently accessed data
 * 2. Redis cache - distributed, for session data and API responses
 * 3. Database query result caching with React Query / SWR
 */

import { Redis } from 'ioredis'

type CacheValue = string | number | boolean | object | null

// Redis client singleton
let redis: Redis | null = null

export function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) {
    console.warn('REDIS_URL not configured. Caching will use in-memory fallback.')
    return null
  }

  if (!redis) {
    const redisUrl = process.env.REDIS_URL
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: true,
    })

    redis.on('error', (err) => {
      console.error('Redis connection error:', err)
    })

    redis.on('connect', () => {
      console.log('Redis connected successfully')
    })
  }

  return redis
}

// In-memory cache (for when Redis is unavailable)
class MemoryCache {
  private cache = new Map<string, { value: CacheValue; expiresAt: number }>()
  private maxSize = 100 // Prevent memory leaks

  set(key: string, value: CacheValue, ttlSeconds: number): void {
    // Implement LRU-like behavior
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey as string)
    }

    this.cache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    })
  }

  get(key: string): CacheValue {
    const item = this.cache.get(key)

    if (!item) return null

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Cleanup expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key)
      }
    }
  }
}

const memoryCache = new MemoryCache()

// Cleanup memory cache every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => memoryCache.cleanup(), 5 * 60 * 1000)
}

/**
 * Set a cached value
 */
export async function setCache(
  key: string,
  value: CacheValue,
  ttlSeconds: number = 300
): Promise<void> {
  const redis = getRedisClient()

  if (redis) {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value))
    } catch (error) {
      console.error('Redis set error, falling back to memory cache:', error)
      memoryCache.set(key, value, ttlSeconds)
    }
  } else {
    memoryCache.set(key, value, ttlSeconds)
  }
}

/**
 * Get a cached value
 */
export async function getCache<T = CacheValue>(key: string): Promise<T | null> {
  const redis = getRedisClient()

  if (redis) {
    try {
      const cached = await redis.get(key)
      return cached ? (JSON.parse(cached) as T) : null
    } catch (error) {
      console.error('Redis get error, falling back to memory cache:', error)
      return memoryCache.get(key) as T | null
    }
  } else {
    return memoryCache.get(key) as T | null
  }
}

/**
 * Delete a cached value
 */
export async function deleteCache(key: string): Promise<void> {
  const redis = getRedisClient()

  if (redis) {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('Redis delete error:', error)
    }
  }

  memoryCache.delete(key)
}

/**
 * Clear all cache (use with caution)
 */
export async function clearCache(pattern?: string): Promise<void> {
  const redis = getRedisClient()

  if (redis && pattern) {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error('Redis clear error:', error)
    }
  }

  if (!pattern) {
    memoryCache.clear()
  }
}

/**
 * Cache wrapper for expensive functions
 */
export async function cached<T extends CacheValue>(
  key: string,
  fn: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  // Try to get from cache first
  const cachedValue = await getCache<T>(key)

  if (cachedValue !== null) {
    return cachedValue
  }

  // Execute function and cache result
  const result = await fn()
  await setCache(key, result, ttlSeconds)

  return result
}

/**
 * Generate cache keys
 */
export const CacheKeys = {
  userStats: (userId: string) => `user:${userId}:stats`,
  siteIssues: (connectionId: string) => `connection:${connectionId}:issues`,
  siteFixes: (connectionId: string) => `connection:${connectionId}:fixes`,
  userConnections: (userId: string) => `user:${userId}:connections`,
  analytics: (connectionId: string, period: string) =>
    `analytics:${connectionId}:${period}`,
  adminStats: () => 'admin:stats',
  usageStats: (userId: string) => `usage:${userId}`,
}

/**
 * Invalidate related caches when data changes
 */
export async function invalidateUserCache(userId: string): Promise<void> {
  await Promise.all([
    deleteCache(CacheKeys.userStats(userId)),
    deleteCache(CacheKeys.userConnections(userId)),
    deleteCache(CacheKeys.usageStats(userId)),
  ])
}

export async function invalidateConnectionCache(connectionId: string): Promise<void> {
  await Promise.all([
    deleteCache(CacheKeys.siteIssues(connectionId)),
    deleteCache(CacheKeys.siteFixes(connectionId)),
    clearCache(`analytics:${connectionId}:*`),
  ])
}
