/**
 * Example: Shopify Chat Integration
 *
 * Complete example showing how to integrate the enhanced Shopify chat
 * with all Next.js 14 optimizations
 */

import { Suspense } from 'react'
import { ShopifyChatStreaming } from '@/components/shopify/ShopifyChatStreaming'

// ==================== SERVER COMPONENT ====================

/**
 * Server Component - Fetch initial data
 * This runs on the server and can use database directly
 */
async function ShopifyAppData({ shop }: { shop: string }) {
  'use server'

  const { db } = await import('@/lib/db')

  // Fetch connection data (will be cached)
  const connection = await db.connection.findFirst({
    where: {
      domain: shop,
      platform: 'SHOPIFY',
      status: 'CONNECTED',
    },
    select: {
      id: true,
      domain: true,
      user: {
        select: {
          plan: true,
          executionMode: true,
        },
      },
    },
  })

  if (!connection) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Store Not Connected
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please connect your Shopify store to use the SEO Assistant.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Store info banner */}
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            {connection.domain}
          </span>
          <span className="text-xs text-blue-600 dark:text-blue-400">
            {connection.user.plan} Plan
          </span>
          <span className="text-xs text-blue-600 dark:text-blue-400">
            {connection.user.executionMode} Mode
          </span>
        </div>
      </div>

      {/* Chat component */}
      <ShopifyChatStreaming />
    </div>
  )
}

// ==================== CLIENT WRAPPER ====================

/**
 * Client Component - Main page wrapper
 * Handles loading states and errors
 */
export default function ShopifyAppPage({
  searchParams,
}: {
  searchParams: { shop?: string }
}) {
  const shop = searchParams.shop

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Invalid Shop Parameter
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please access this page from your Shopify admin.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Loading fallback with Suspense */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading SEO Assistant...
              </p>
            </div>
          </div>
        }
      >
        <ShopifyAppData shop={shop} />
      </Suspense>
    </div>
  )
}

// ==================== CACHE WARMING EXAMPLE ====================

/**
 * Example: Warm cache on app installation
 * Call this when a new store connects
 */
export async function onShopifyAppInstall(connectionId: string) {
  const { warmCache } = await import('@/lib/cache-manager')

  // Pre-populate caches for better first-load performance
  await warmCache(connectionId, {
    warmProducts: true,
    warmIssues: true,
    warmFixes: true,
  })

  console.log(`Cache warmed for connection ${connectionId}`)
}

// ==================== CACHE INVALIDATION EXAMPLE ====================

/**
 * Example: Invalidate cache when products change
 * Call this from Shopify webhooks
 */
export async function onProductUpdate(productId: string, connectionId: string) {
  const { SmartCacheInvalidator } = await import('@/lib/cache-manager')

  // Invalidate all caches related to this product
  SmartCacheInvalidator.invalidateProductUpdate(productId, connectionId)

  console.log(`Cache invalidated for product ${productId}`)
}

/**
 * Example: Invalidate cache when fixes are applied
 */
export async function onFixApplied(connectionId: string) {
  const { SmartCacheInvalidator } = await import('@/lib/cache-manager')

  // Invalidate fixes and store context caches
  SmartCacheInvalidator.invalidateFixUpdate(connectionId)

  console.log(`Cache invalidated after fix applied`)
}

// ==================== PERFORMANCE MONITORING EXAMPLE ====================

/**
 * Example: Track chat performance metrics
 */
export async function trackChatPerformance(
  userId: string,
  metrics: {
    firstTokenTime: number
    totalTime: number
    tokenCount: number
  }
) {
  const { db } = await import('@/lib/db')

  // Store metrics in audit log for analytics
  await db.auditLog.create({
    data: {
      userId,
      action: 'CHAT_PERFORMANCE',
      resource: 'chat',
      resourceId: userId,
      details: JSON.stringify({
        metric: 'shopify_chat_stream',
        firstTokenTime: metrics.firstTokenTime,
        totalTime: metrics.totalTime,
        tokenCount: metrics.tokenCount,
        timestamp: new Date().toISOString(),
      }),
    },
  })

  // Alert if performance is degraded
  if (metrics.firstTokenTime > 1000) {
    console.warn('⚠️ Slow first token time:', metrics.firstTokenTime, 'ms')
    // Send alert to monitoring system
  }

  if (metrics.totalTime > 3000) {
    console.warn('⚠️ Slow total response time:', metrics.totalTime, 'ms')
    // Send alert to monitoring system
  }
}

// ==================== RATE LIMIT MONITORING EXAMPLE ====================

/**
 * Example: Monitor rate limit usage
 */
export async function monitorRateLimits() {
  const { getRateLimitStats } = await import('@/lib/rate-limiter')

  const stats = getRateLimitStats()

  // Log stats for monitoring
  console.log('Rate Limit Statistics:', {
    totalBuckets: stats.length,
    lowTokens: stats.filter((s) => s.percentage < 20).length,
    criticalTokens: stats.filter((s) => s.percentage < 10).length,
  })

  // Alert on critical rate limits
  const critical = stats.filter((s) => s.percentage < 10)
  if (critical.length > 0) {
    console.warn('⚠️ Critical rate limits:', critical)
    // Send alert to monitoring system
  }
}

// ==================== CACHE STATISTICS EXAMPLE ====================

/**
 * Example: Monitor cache performance
 */
export async function monitorCachePerformance() {
  const { getCacheStatistics } = await import('@/lib/cache-manager')

  const stats = getCacheStatistics()

  console.log('Cache Statistics:', {
    totalCaches: stats.totalCaches,
    averageHitRate: `${(stats.averageHitRate * 100).toFixed(1)}%`,
    topPerformers: stats.topHits.slice(0, 5),
    needsOptimization: stats.topMisses.slice(0, 5),
  })

  // Alert on low cache hit rate
  if (stats.averageHitRate < 0.7) {
    console.warn('⚠️ Low cache hit rate:', stats.averageHitRate)
    // Consider adjusting cache TTLs or warming strategy
  }
}

// ==================== ADMIN DASHBOARD EXAMPLE ====================

/**
 * Example: Admin dashboard showing all metrics
 */
export async function AdminChatMetricsDashboard() {
  const { getCacheStatistics } = await import('@/lib/cache-manager')
  const { getRateLimitStats } = await import('@/lib/rate-limiter')
  const { db } = await import('@/lib/db')

  // Gather all metrics
  const [cacheStats, rateLimitStats, recentChats] = await Promise.all([
    getCacheStatistics(),
    getRateLimitStats(),
    db.auditLog.findMany({
      where: { action: 'CHAT_MESSAGE' },
      take: 100,
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Shopify Chat Metrics</h1>

      {/* Cache Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Cache Performance</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {cacheStats.totalCaches}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Caches
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">
              {(cacheStats.averageHitRate * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Hit Rate
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">
              {cacheStats.topHits.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tracked Keys
            </div>
          </div>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Rate Limits</h2>
        <div className="space-y-2">
          {rateLimitStats.slice(0, 10).map((stat) => (
            <div
              key={stat.key}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <span className="text-sm font-mono">{stat.key}</span>
              <div className="flex items-center gap-4">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      stat.percentage > 70
                        ? 'bg-green-500'
                        : stat.percentage > 30
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.tokens}/{stat.maxTokens}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total chat messages: {recentChats.length}
        </div>
      </div>
    </div>
  )
}
