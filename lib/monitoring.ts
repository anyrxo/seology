/**
 * Performance Monitoring & Analytics System
 *
 * Tracks API performance, errors, GraphQL costs, and rate limits
 * for comprehensive observability of the Shopify app.
 *
 * Features:
 * - API call performance tracking
 * - GraphQL query cost monitoring
 * - Rate limit health monitoring
 * - Error logging and alerting
 * - Usage analytics aggregation
 */

import { db } from './db'

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

/**
 * Performance metric for API calls
 */
export interface PerformanceMetric {
  endpoint: string
  method: string
  duration: number
  timestamp: Date
  shop: string
  userId: string
  success: boolean
  error?: string
  graphqlCost?: number
  statusCode?: number
  userAgent?: string
}

/**
 * GraphQL query cost tracking
 */
export interface GraphQLCostMetric {
  shop: string
  query: string // First 100 chars for identification
  cost: number
  duration: number
  throttleStatus: {
    currentlyAvailable: number
    maximumAvailable: number
    restoreRate: number
  }
  timestamp: Date
  userId?: string
}

/**
 * Rate limit health status
 */
export interface RateLimitStatus {
  shop: string
  currentlyAvailable: number
  maximumAvailable: number
  restoreRate: number
  percentAvailable: number
  timestamp: Date
  nearLimit: boolean // < 20% available
  atRisk: boolean // < 10% available
}

/**
 * Error context for tracking
 */
export interface ErrorContext {
  endpoint: string
  shop: string
  userId: string
  method?: string
  statusCode?: number
  requestId?: string
  additionalInfo?: Record<string, any>
}

/**
 * Performance summary for analytics
 */
export interface PerformanceSummary {
  period: 'hour' | 'day' | 'week' | 'month'
  totalCalls: number
  successfulCalls: number
  failedCalls: number
  avgDuration: number
  p50Duration: number
  p95Duration: number
  p99Duration: number
  totalCost: number
  avgCost: number
  errors: {
    type: string
    count: number
  }[]
  slowestEndpoints: {
    endpoint: string
    avgDuration: number
    count: number
  }[]
  costliestQueries: {
    query: string
    avgCost: number
    count: number
  }[]
}

// =============================================================================
// API PERFORMANCE TRACKING
// =============================================================================

/**
 * Track an API call and its performance
 *
 * Wraps an async operation and logs performance metrics
 *
 * @example
 * const result = await trackAPICall(
 *   '/api/shopify/products',
 *   shop,
 *   userId,
 *   async () => {
 *     return await fetchProducts()
 *   }
 * )
 */
export async function trackAPICall<T>(
  endpoint: string,
  shop: string,
  userId: string,
  operation: () => Promise<T>,
  options?: {
    method?: string
    userAgent?: string
  }
): Promise<T> {
  const startTime = Date.now()
  let success = true
  let error: string | undefined
  let statusCode: number | undefined

  try {
    const result = await operation()
    statusCode = 200
    return result
  } catch (e) {
    success = false

    // Extract status code if available
    if (e && typeof e === 'object' && 'status' in e) {
      const errWithStatus = e as { status?: number }
      statusCode = errWithStatus.status
    }

    error = e instanceof Error ? e.message : 'Unknown error'
    throw e
  } finally {
    const duration = Date.now() - startTime

    // Log metric asynchronously (don't block response)
    logPerformanceMetric({
      endpoint,
      method: options?.method || 'API',
      duration,
      timestamp: new Date(),
      shop,
      userId,
      success,
      error,
      statusCode,
      userAgent: options?.userAgent,
    }).catch(err => {
      // Fail silently to avoid disrupting app flow
      console.error('[Monitoring] Failed to log performance metric:', err)
    })
  }
}

/**
 * Log a performance metric to database
 */
async function logPerformanceMetric(metric: PerformanceMetric): Promise<void> {
  try {
    await db.aPIUsageLog.create({
      data: {
        userId: metric.userId,
        model: 'N/A', // Not Claude API
        endpoint: metric.endpoint,
        shop: metric.shop,
        latencyMs: metric.duration,
        status: metric.success ? 'success' : 'error',
        errorMessage: metric.error,
        totalTokens: 0,
        inputTokens: 0,
        outputTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: metric.graphqlCost || 0,
        timestamp: metric.timestamp,
      },
    })
  } catch (error) {
    console.error('[Monitoring] Failed to save performance metric:', error)
    // Don't throw - monitoring failures shouldn't break the app
  }
}

// =============================================================================
// GRAPHQL COST TRACKING
// =============================================================================

/**
 * Track GraphQL query cost
 *
 * Records query cost and rate limit status for optimization
 */
export async function trackGraphQLCost(
  metric: GraphQLCostMetric
): Promise<void> {
  try {
    // Log to database
    await db.aPIUsageLog.create({
      data: {
        userId: metric.userId || 'system',
        model: 'graphql',
        endpoint: 'shopify_graphql',
        shop: metric.shop,
        latencyMs: metric.duration,
        status: 'success',
        totalCost: metric.cost,
        inputCost: 0,
        outputCost: 0,
        totalTokens: metric.cost, // Use cost as tokens for GraphQL
        inputTokens: 0,
        outputTokens: 0,
        resourceType: 'graphql_query',
        timestamp: metric.timestamp,
      },
    })

    // Check for rate limit alerts
    const rateLimitStatus = calculateRateLimitStatus(
      metric.shop,
      metric.throttleStatus
    )

    if (rateLimitStatus.atRisk || rateLimitStatus.nearLimit) {
      await alertOnRateLimit(metric.shop, rateLimitStatus)
    }
  } catch (error) {
    console.error('[Monitoring] Failed to track GraphQL cost:', error)
  }
}

/**
 * Calculate rate limit status
 */
function calculateRateLimitStatus(
  shop: string,
  throttleStatus: GraphQLCostMetric['throttleStatus']
): RateLimitStatus {
  const { currentlyAvailable, maximumAvailable, restoreRate } = throttleStatus
  const percentAvailable = (currentlyAvailable / maximumAvailable) * 100

  return {
    shop,
    currentlyAvailable,
    maximumAvailable,
    restoreRate,
    percentAvailable,
    timestamp: new Date(),
    nearLimit: percentAvailable < 20,
    atRisk: percentAvailable < 10,
  }
}

/**
 * Alert on rate limit issues
 */
async function alertOnRateLimit(
  shop: string,
  status: RateLimitStatus
): Promise<void> {
  const severity = status.atRisk ? 'CRITICAL' : 'WARNING'

  console.warn(`[RATE LIMIT ${severity}] ${shop}:`, {
    available: status.currentlyAvailable,
    maximum: status.maximumAvailable,
    percent: status.percentAvailable.toFixed(2) + '%',
    restoreRate: status.restoreRate,
  })

  // Could send Slack/email alerts here in production
  // For now, just log to console
}

// =============================================================================
// ERROR TRACKING
// =============================================================================

/**
 * Track an error with context
 */
export async function trackError(
  error: Error,
  context: ErrorContext
): Promise<void> {
  try {
    const errorLog = {
      type: error.name,
      message: error.message,
      stack: error.stack,
      endpoint: context.endpoint,
      shop: context.shop,
      userId: context.userId,
      timestamp: new Date(),
      context: context.additionalInfo,
    }

    // Log to database (could use a separate ErrorLog table)
    await db.aPIUsageLog.create({
      data: {
        userId: context.userId,
        model: 'N/A',
        endpoint: context.endpoint,
        shop: context.shop,
        status: 'error',
        errorMessage: error.message,
        totalTokens: 0,
        inputTokens: 0,
        outputTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
        timestamp: new Date(),
      },
    })

    // Alert on critical errors
    if (
      error.name === 'AuthenticationError' ||
      error.name === 'RateLimitError' ||
      context.statusCode === 401 ||
      context.statusCode === 403 ||
      context.statusCode === 429
    ) {
      console.error(`[CRITICAL ERROR] ${context.endpoint}:`, errorLog)
      // Could send alerts here
    }
  } catch (err) {
    console.error('[Monitoring] Failed to track error:', err)
  }
}

// =============================================================================
// ANALYTICS AGGREGATION
// =============================================================================

/**
 * Get performance summary for a time period
 */
export async function getPerformanceSummary(
  shop: string,
  period: 'hour' | 'day' | 'week' | 'month' = 'day'
): Promise<PerformanceSummary> {
  const now = new Date()
  const startDate = new Date(now)

  // Calculate start date based on period
  switch (period) {
    case 'hour':
      startDate.setHours(now.getHours() - 1)
      break
    case 'day':
      startDate.setDate(now.getDate() - 1)
      break
    case 'week':
      startDate.setDate(now.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(now.getMonth() - 1)
      break
  }

  // Fetch logs from database
  const logs = await db.aPIUsageLog.findMany({
    where: {
      shop,
      timestamp: {
        gte: startDate,
      },
    },
    orderBy: {
      timestamp: 'desc',
    },
  })

  // Calculate statistics
  const totalCalls = logs.length
  const successfulCalls = logs.filter(l => l.status === 'success').length
  const failedCalls = totalCalls - successfulCalls

  // Duration stats
  const durations = logs
    .filter(l => l.latencyMs !== null)
    .map(l => l.latencyMs!)
    .sort((a, b) => a - b)

  const avgDuration = durations.length
    ? durations.reduce((sum, d) => sum + d, 0) / durations.length
    : 0

  const p50Duration = durations[Math.floor(durations.length * 0.5)] || 0
  const p95Duration = durations[Math.floor(durations.length * 0.95)] || 0
  const p99Duration = durations[Math.floor(durations.length * 0.99)] || 0

  // Cost stats
  const totalCost = logs.reduce((sum, l) => sum + (l.totalCost || 0), 0)
  const avgCost = totalCalls ? totalCost / totalCalls : 0

  // Error breakdown
  const errorCounts: Record<string, number> = {}
  logs
    .filter(l => l.status === 'error')
    .forEach(l => {
      const errorType = l.errorMessage?.split(':')[0] || 'Unknown'
      errorCounts[errorType] = (errorCounts[errorType] || 0) + 1
    })

  const errors = Object.entries(errorCounts).map(([type, count]) => ({
    type,
    count,
  }))

  // Slowest endpoints
  const endpointDurations: Record<string, { total: number; count: number }> = {}
  logs.forEach(l => {
    if (l.latencyMs) {
      if (!endpointDurations[l.endpoint]) {
        endpointDurations[l.endpoint] = { total: 0, count: 0 }
      }
      endpointDurations[l.endpoint].total += l.latencyMs
      endpointDurations[l.endpoint].count += 1
    }
  })

  const slowestEndpoints = Object.entries(endpointDurations)
    .map(([endpoint, { total, count }]) => ({
      endpoint,
      avgDuration: total / count,
      count,
    }))
    .sort((a, b) => b.avgDuration - a.avgDuration)
    .slice(0, 10)

  // Costliest queries (for GraphQL)
  const queryCosts: Record<string, { total: number; count: number }> = {}
  logs
    .filter(l => l.endpoint === 'shopify_graphql' && l.totalCost)
    .forEach(l => {
      const queryId = l.resourceType || 'unknown'
      if (!queryCosts[queryId]) {
        queryCosts[queryId] = { total: 0, count: 0 }
      }
      queryCosts[queryId].total += l.totalCost || 0
      queryCosts[queryId].count += 1
    })

  const costliestQueries = Object.entries(queryCosts)
    .map(([query, { total, count }]) => ({
      query,
      avgCost: total / count,
      count,
    }))
    .sort((a, b) => b.avgCost - a.avgCost)
    .slice(0, 10)

  return {
    period,
    totalCalls,
    successfulCalls,
    failedCalls,
    avgDuration,
    p50Duration,
    p95Duration,
    p99Duration,
    totalCost,
    avgCost,
    errors,
    slowestEndpoints,
    costliestQueries,
  }
}

/**
 * Get rate limit health for a shop
 */
export async function getRateLimitHealth(
  shop: string
): Promise<RateLimitStatus | null> {
  // Get the most recent GraphQL call to extract rate limit status
  const recentLog = await db.aPIUsageLog.findFirst({
    where: {
      shop,
      endpoint: 'shopify_graphql',
    },
    orderBy: {
      timestamp: 'desc',
    },
  })

  if (!recentLog) {
    return null
  }

  // In a real implementation, we'd parse the throttle status from metadata
  // For now, return estimated status based on cost
  const estimatedAvailable = Math.max(0, 1000 - (recentLog.totalCost || 0))

  return calculateRateLimitStatus(shop, {
    currentlyAvailable: estimatedAvailable,
    maximumAvailable: 1000,
    restoreRate: 50,
  })
}

/**
 * Get error rate for a time period
 */
export async function getErrorRate(
  shop: string,
  hours: number = 24
): Promise<number> {
  const startDate = new Date()
  startDate.setHours(startDate.getHours() - hours)

  const logs = await db.aPIUsageLog.findMany({
    where: {
      shop,
      timestamp: {
        gte: startDate,
      },
    },
    select: {
      status: true,
    },
  })

  const total = logs.length
  if (total === 0) return 0

  const errors = logs.filter(l => l.status === 'error').length
  return (errors / total) * 100
}

/**
 * Get average response time
 */
export async function getAvgResponseTime(
  shop: string,
  hours: number = 24
): Promise<number> {
  const startDate = new Date()
  startDate.setHours(startDate.getHours() - hours)

  const result = await db.aPIUsageLog.aggregate({
    where: {
      shop,
      timestamp: {
        gte: startDate,
      },
      latencyMs: {
        not: null,
      },
    },
    _avg: {
      latencyMs: true,
    },
  })

  return result._avg.latencyMs || 0
}

/**
 * Health check - aggregate system health
 */
export async function getSystemHealth(shop: string): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy'
  metrics: {
    errorRate: number
    avgResponseTime: number
    rateLimitHealth: RateLimitStatus | null
  }
  issues: string[]
}> {
  const [errorRate, avgResponseTime, rateLimitHealth] = await Promise.all([
    getErrorRate(shop),
    getAvgResponseTime(shop),
    getRateLimitHealth(shop),
  ])

  const issues: string[] = []
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'

  // Check error rate
  if (errorRate > 10) {
    issues.push(`High error rate: ${errorRate.toFixed(2)}%`)
    status = 'degraded'
  }
  if (errorRate > 25) {
    status = 'unhealthy'
  }

  // Check response time
  if (avgResponseTime > 2000) {
    issues.push(`Slow response time: ${avgResponseTime.toFixed(0)}ms`)
    status = status === 'unhealthy' ? 'unhealthy' : 'degraded'
  }
  if (avgResponseTime > 5000) {
    status = 'unhealthy'
  }

  // Check rate limits
  if (rateLimitHealth?.atRisk) {
    issues.push(`Rate limit critical: ${rateLimitHealth.percentAvailable.toFixed(1)}% available`)
    status = 'unhealthy'
  } else if (rateLimitHealth?.nearLimit) {
    issues.push(`Rate limit warning: ${rateLimitHealth.percentAvailable.toFixed(1)}% available`)
    status = status === 'unhealthy' ? 'unhealthy' : 'degraded'
  }

  return {
    status,
    metrics: {
      errorRate,
      avgResponseTime,
      rateLimitHealth,
    },
    issues,
  }
}
