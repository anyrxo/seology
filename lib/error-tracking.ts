/**
 * Error Tracking & Logging Utilities
 *
 * Centralized error handling and tracking for the Shopify app
 */

import { db } from './db'

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Error categories
 */
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  RATE_LIMIT = 'rate_limit',
  API_ERROR = 'api_error',
  DATABASE_ERROR = 'database_error',
  VALIDATION_ERROR = 'validation_error',
  NETWORK_ERROR = 'network_error',
  UNKNOWN = 'unknown',
}

/**
 * Error log entry
 */
export interface ErrorLog {
  type: string
  message: string
  stack?: string
  endpoint: string
  shop: string
  userId: string
  category: ErrorCategory
  severity: ErrorSeverity
  timestamp: Date
  context?: Record<string, unknown>
  requestId?: string
  statusCode?: number
}

/**
 * Track and log an error
 */
export async function logError(
  error: Error,
  context: {
    endpoint: string
    shop: string
    userId: string
    category?: ErrorCategory
    severity?: ErrorSeverity
    requestId?: string
    statusCode?: number
    additionalInfo?: Record<string, unknown>
  }
): Promise<void> {
  try {
    // Determine category and severity if not provided
    const category = context.category || categorizeError(error, context.statusCode)
    const severity = context.severity || determineSeverity(category, context.statusCode)

    const errorLog: ErrorLog = {
      type: error.name,
      message: error.message,
      stack: error.stack,
      endpoint: context.endpoint,
      shop: context.shop,
      userId: context.userId,
      category,
      severity,
      timestamp: new Date(),
      context: context.additionalInfo,
      requestId: context.requestId,
      statusCode: context.statusCode,
    }

    // Store in database via APIUsageLog
    await db.aPIUsageLog.create({
      data: {
        userId: context.userId,
        model: 'N/A',
        endpoint: context.endpoint,
        shop: context.shop,
        status: 'error',
        errorMessage: `[${category}] ${error.message}`,
        totalTokens: 0,
        inputTokens: 0,
        outputTokens: 0,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
        timestamp: new Date(),
      },
    })

    // Log to console based on severity
    if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH) {
      console.error(`[${severity.toUpperCase()} ERROR] ${context.endpoint}:`, {
        category,
        message: error.message,
        shop: context.shop,
        userId: context.userId,
        stack: error.stack,
      })

      // Could trigger alerts here (Slack, email, etc.)
      await sendAlert(errorLog)
    } else {
      console.warn(`[${severity.toUpperCase()} ERROR] ${context.endpoint}:`, {
        category,
        message: error.message,
      })
    }
  } catch (loggingError) {
    // Never let error tracking break the app
    console.error('[Error Tracking] Failed to log error:', loggingError)
  }
}

/**
 * Categorize an error based on type and status code
 */
function categorizeError(error: Error, statusCode?: number): ErrorCategory {
  // Check by status code first
  if (statusCode) {
    if (statusCode === 401) return ErrorCategory.AUTHENTICATION
    if (statusCode === 403) return ErrorCategory.AUTHORIZATION
    if (statusCode === 429) return ErrorCategory.RATE_LIMIT
    if (statusCode >= 400 && statusCode < 500) return ErrorCategory.VALIDATION_ERROR
    if (statusCode >= 500) return ErrorCategory.API_ERROR
  }

  // Check by error name/message
  const errorName = error.name.toLowerCase()
  const errorMessage = error.message.toLowerCase()

  if (errorName.includes('auth') || errorMessage.includes('unauthorized')) {
    return ErrorCategory.AUTHENTICATION
  }

  if (errorName.includes('forbidden') || errorMessage.includes('permission')) {
    return ErrorCategory.AUTHORIZATION
  }

  if (errorMessage.includes('rate limit') || errorMessage.includes('throttle')) {
    return ErrorCategory.RATE_LIMIT
  }

  if (errorMessage.includes('prisma') || errorMessage.includes('database')) {
    return ErrorCategory.DATABASE_ERROR
  }

  if (errorMessage.includes('network') || errorMessage.includes('fetch failed')) {
    return ErrorCategory.NETWORK_ERROR
  }

  if (errorMessage.includes('graphql') || errorMessage.includes('api')) {
    return ErrorCategory.API_ERROR
  }

  return ErrorCategory.UNKNOWN
}

/**
 * Determine error severity
 */
function determineSeverity(category: ErrorCategory, statusCode?: number): ErrorSeverity {
  // Critical errors
  if (
    category === ErrorCategory.AUTHENTICATION ||
    category === ErrorCategory.DATABASE_ERROR ||
    statusCode === 500 ||
    statusCode === 503
  ) {
    return ErrorSeverity.CRITICAL
  }

  // High severity
  if (
    category === ErrorCategory.AUTHORIZATION ||
    category === ErrorCategory.RATE_LIMIT ||
    statusCode === 429
  ) {
    return ErrorSeverity.HIGH
  }

  // Medium severity
  if (
    category === ErrorCategory.API_ERROR ||
    category === ErrorCategory.NETWORK_ERROR ||
    (statusCode && statusCode >= 500)
  ) {
    return ErrorSeverity.MEDIUM
  }

  // Low severity (validation errors, etc.)
  return ErrorSeverity.LOW
}

/**
 * Send alert for critical errors
 */
async function sendAlert(errorLog: ErrorLog): Promise<void> {
  // In production, this would send to Slack, PagerDuty, email, etc.
  // For now, just log
  console.error('🚨 ALERT: Critical error detected:', {
    category: errorLog.category,
    message: errorLog.message,
    shop: errorLog.shop,
    endpoint: errorLog.endpoint,
    timestamp: errorLog.timestamp,
  })

  // Could implement Slack webhook:
  // await fetch(process.env.SLACK_WEBHOOK_URL, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     text: `🚨 Critical Error in ${errorLog.endpoint}`,
  //     attachments: [{
  //       color: 'danger',
  //       fields: [
  //         { title: 'Shop', value: errorLog.shop },
  //         { title: 'Category', value: errorLog.category },
  //         { title: 'Message', value: errorLog.message },
  //       ]
  //     }]
  //   })
  // })
}

/**
 * Get error statistics for a shop
 */
export async function getErrorStats(
  shop: string,
  hours: number = 24
): Promise<{
  totalErrors: number
  errorsByCategory: Record<string, number>
  errorRate: number
  recentErrors: Array<{
    endpoint: string
    message: string
    timestamp: Date
  }>
}> {
  const startDate = new Date()
  startDate.setHours(startDate.getHours() - hours)

  const errors = await db.aPIUsageLog.findMany({
    where: {
      shop,
      status: 'error',
      timestamp: {
        gte: startDate,
      },
    },
    select: {
      endpoint: true,
      errorMessage: true,
      timestamp: true,
    },
    orderBy: {
      timestamp: 'desc',
    },
    take: 100,
  })

  const totalCalls = await db.aPIUsageLog.count({
    where: {
      shop,
      timestamp: {
        gte: startDate,
      },
    },
  })

  // Categorize errors
  const errorsByCategory: Record<string, number> = {}
  errors.forEach(error => {
    // Extract category from error message [category] format
    const match = error.errorMessage?.match(/\[([^\]]+)\]/)
    const category = match ? match[1] : 'unknown'
    errorsByCategory[category] = (errorsByCategory[category] || 0) + 1
  })

  return {
    totalErrors: errors.length,
    errorsByCategory,
    errorRate: totalCalls > 0 ? (errors.length / totalCalls) * 100 : 0,
    recentErrors: errors.slice(0, 10).map(e => ({
      endpoint: e.endpoint,
      message: e.errorMessage || 'Unknown error',
      timestamp: e.timestamp,
    })),
  }
}

/**
 * Wrapper to track API operations with error handling
 */
export async function withErrorTracking<T>(
  operation: () => Promise<T>,
  context: {
    endpoint: string
    shop: string
    userId: string
    requestId?: string
  }
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (error instanceof Error) {
      await logError(error, context)
    }
    throw error
  }
}
