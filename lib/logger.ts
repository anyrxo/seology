/**
 * Centralized Logging System with Pino
 *
 * Production-grade structured logging with Pino backend
 * Provides different levels, optional persistence, and domain-specific loggers
 */

import pino from 'pino'

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRITICAL'
export type LogCategory =
  | 'AUTH'
  | 'DATABASE'
  | 'API'
  | 'AI'
  | 'CREDITS'
  | 'ADMIN'
  | 'JOBS'
  | 'PAYMENT'
  | 'SHOPIFY'
  | 'WEBHOOK'
  | 'GENERAL'

// Type for primitive log values
type LogPrimitive = string | number | boolean | null | undefined

// Type for structured log data (non-circular)
export type LogData = Record<string, LogPrimitive | LogPrimitive[] | Record<string, LogPrimitive>>

// Type for credit balance information
export interface CreditBalance {
  monthlyCredits: number
  monthlyUsed: number
  monthlyRemaining: number
  purchasedCredits: number
  totalAvailable: number
  isUnlimited: boolean
}

// Type for API request body
export type RequestBody = Record<string, LogPrimitive | LogPrimitive[]>

interface LogEntry {
  timestamp: Date
  level: LogLevel
  category: LogCategory
  message: string
  data?: LogData
  userId?: string
  error?: Error
}

// Initialize Pino logger
const pinoLogger = pino({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV !== 'production' ? 'debug' : 'info'),

  // Pretty print in development, JSON in production
  transport: process.env.NODE_ENV !== 'production'
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
          singleLine: false,
        },
      }
    : undefined,

  // Base fields
  base: {
    env: process.env.NODE_ENV || 'development',
    revision: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
  },

  // Redact sensitive fields
  redact: {
    paths: [
      'accessToken',
      'password',
      'apiKey',
      'secret',
      'token',
      '*.accessToken',
      '*.password',
      '*.apiKey',
      '*.secret',
      '*.token',
    ],
    remove: true,
  },

  // Serialize errors
  serializers: {
    err: pino.stdSerializers.err,
  },
})

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production'
  private logToConsole = true
  private logToDatabase = process.env.LOG_TO_DATABASE === 'true'
  private pino = pinoLogger

  /**
   * Format log entry for console output
   */
  private formatConsoleLog(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString()
    const level = entry.level.padEnd(8)
    const category = entry.category.padEnd(10)
    const userId = entry.userId ? `[User: ${entry.userId.slice(0, 8)}]` : ''

    let output = `[${timestamp}] ${level} [${category}] ${userId} ${entry.message}`

    if (entry.data) {
      output += `\n  Data: ${JSON.stringify(entry.data, null, 2)}`
    }

    if (entry.error) {
      output += `\n  Error: ${entry.error.message}`
      if (entry.error.stack) {
        output += `\n  Stack: ${entry.error.stack}`
      }
    }

    return output
  }

  /**
   * Get console color based on log level
   */
  private getConsoleColor(level: LogLevel): string {
    switch (level) {
      case 'DEBUG':
        return '\x1b[36m' // Cyan
      case 'INFO':
        return '\x1b[32m' // Green
      case 'WARN':
        return '\x1b[33m' // Yellow
      case 'ERROR':
        return '\x1b[31m' // Red
      case 'CRITICAL':
        return '\x1b[35m' // Magenta
      default:
        return '\x1b[0m' // Reset
    }
  }

  /**
   * Output log entry to console using Pino
   */
  private outputToConsole(entry: LogEntry): void {
    if (!this.logToConsole) return

    // Map our log levels to Pino levels
    const pinoLevel = entry.level.toLowerCase() as 'debug' | 'info' | 'warn' | 'error'
    const level = entry.level === 'CRITICAL' ? 'fatal' : pinoLevel

    // Prepare log data
    const logData: Record<string, unknown> = {
      category: entry.category,
      ...(entry.data || {}),
      ...(entry.userId && { userId: entry.userId }),
      ...(entry.error && { err: entry.error }),
    }

    // Log using Pino
    this.pino[level](logData, entry.message)
  }

  /**
   * Persist log entry to database (async, non-blocking)
   */
  private async persistToDatabase(entry: LogEntry): Promise<void> {
    if (!this.logToDatabase) return

    try {
      const { db } = await import('./db')

      // Only persist ERROR and CRITICAL logs to database
      if (entry.level === 'ERROR' || entry.level === 'CRITICAL') {
        await db.auditLog.create({
          data: {
            userId: entry.userId || 'SYSTEM',
            action: `LOG_${entry.level}`,
            resource: entry.category.toLowerCase(),
            resourceId: 'N/A',
            details: JSON.stringify({
              message: entry.message,
              data: entry.data,
              error: entry.error ? {
                message: entry.error.message,
                stack: entry.error.stack,
              } : undefined,
              timestamp: entry.timestamp,
            }),
          },
        })
      }
    } catch (error) {
      // Silent fail - don't crash app if logging fails
      console.error('Failed to persist log to database:', error)
    }
  }

  /**
   * Core logging method
   */
  private log(
    level: LogLevel,
    category: LogCategory,
    message: string,
    options?: {
      data?: LogData
      userId?: string
      error?: Error
    }
  ): void {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      category,
      message,
      data: options?.data,
      userId: options?.userId,
      error: options?.error,
    }

    // Output to console
    this.outputToConsole(entry)

    // Persist to database (async, non-blocking)
    if (this.logToDatabase) {
      this.persistToDatabase(entry).catch(() => {
        // Silent fail
      })
    }
  }

  /**
   * DEBUG level - Development info
   */
  debug(category: LogCategory, message: string, data?: LogData): void {
    if (this.isDevelopment) {
      this.log('DEBUG', category, message, { data })
    }
  }

  /**
   * INFO level - General information
   */
  info(category: LogCategory, message: string, data?: LogData): void {
    this.log('INFO', category, message, { data })
  }

  /**
   * WARN level - Warning messages
   */
  warn(category: LogCategory, message: string, data?: LogData): void {
    this.log('WARN', category, message, { data })
  }

  /**
   * ERROR level - Error messages
   */
  error(
    category: LogCategory,
    message: string,
    error: Error,
    options?: { data?: LogData; userId?: string }
  ): void {
    this.log('ERROR', category, message, {
      error,
      data: options?.data,
      userId: options?.userId,
    })
  }

  /**
   * CRITICAL level - Critical system errors
   */
  critical(
    category: LogCategory,
    message: string,
    error: Error,
    options?: { data?: LogData; userId?: string }
  ): void {
    this.log('CRITICAL', category, message, {
      error,
      data: options?.data,
      userId: options?.userId,
    })
  }

  /**
   * Specialized logger for API requests
   */
  apiRequest(
    method: string,
    path: string,
    options?: {
      userId?: string
      statusCode?: number
      duration?: number
      body?: RequestBody
    }
  ): void {
    const message = `${method} ${path} ${options?.statusCode ? `- ${options.statusCode}` : ''}`

    this.info('API', message, {
      method,
      path,
      userId: options?.userId,
      statusCode: options?.statusCode,
      duration: options?.duration,
      body: options?.body as unknown as Record<string, LogPrimitive>,
    })
  }

  /**
   * Specialized logger for AI operations
   */
  aiOperation(
    operation: string,
    options?: {
      userId?: string
      model?: string
      tokens?: number
      duration?: number
      cost?: number
    }
  ): void {
    this.info('AI', `${operation}`, {
      operation,
      userId: options?.userId,
      model: options?.model,
      tokens: options?.tokens,
      duration: options?.duration,
      cost: options?.cost,
    })
  }

  /**
   * Specialized logger for credit operations
   */
  creditOperation(
    action: 'ADD' | 'CONSUME' | 'CHECK' | 'PURCHASE',
    userId: string,
    options?: {
      amount?: number
      balance?: CreditBalance
      reason?: string
    }
  ): void {
    this.info('CREDITS', `${action} credits for user`, {
      action,
      userId,
      amount: options?.amount,
      balance: options?.balance as unknown as Record<string, LogPrimitive>,
      reason: options?.reason,
    })
  }

  /**
   * Specialized logger for database operations
   */
  dbOperation(
    operation: string,
    table: string,
    options?: {
      duration?: number
      recordCount?: number
      error?: Error
    }
  ): void {
    if (options?.error) {
      this.error('DATABASE', `${operation} on ${table} failed`, options.error, {
        data: { operation, table, duration: options?.duration },
      })
    } else {
      this.debug('DATABASE', `${operation} on ${table}`, {
        operation,
        table,
        duration: options?.duration,
        recordCount: options?.recordCount,
      })
    }
  }
}

// Export singleton instance
export const logger = new Logger()

// Convenience exports
export const logDebug = logger.debug.bind(logger)
export const logInfo = logger.info.bind(logger)
export const logWarn = logger.warn.bind(logger)
export const logError = logger.error.bind(logger)
export const logCritical = logger.critical.bind(logger)
export const logApiRequest = logger.apiRequest.bind(logger)
export const logAiOperation = logger.aiOperation.bind(logger)
export const logCreditOperation = logger.creditOperation.bind(logger)
export const logDbOperation = logger.dbOperation.bind(logger)
