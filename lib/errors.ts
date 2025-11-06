/**
 * Centralized Error Handling System
 *
 * Provides standardized error types, handlers, and utilities for:
 * - API error responses
 * - Error logging and monitoring
 * - User-friendly error messages
 * - Security error tracking
 */

import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Standard API error codes
 */
export enum ErrorCode {
  // Authentication & Authorization (4xx)
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',

  // Input Validation (4xx)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_SHOP_PARAMETER = 'INVALID_SHOP_PARAMETER',

  // Resources (4xx)
  NOT_FOUND = 'NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  CONNECTION_NOT_FOUND = 'CONNECTION_NOT_FOUND',
  SHOP_NOT_CONNECTED = 'SHOP_NOT_CONNECTED',

  // Business Logic (4xx)
  DUPLICATE_RESOURCE = 'DUPLICATE_RESOURCE',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  USAGE_LIMIT_EXCEEDED = 'USAGE_LIMIT_EXCEEDED',
  PLAN_LIMIT_REACHED = 'PLAN_LIMIT_REACHED',

  // External Services (5xx)
  SHOPIFY_API_ERROR = 'SHOPIFY_API_ERROR',
  STRIPE_API_ERROR = 'STRIPE_API_ERROR',
  CLAUDE_API_ERROR = 'CLAUDE_API_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',

  // Rate Limiting (429)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',

  // Server Errors (5xx)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',

  // Security (4xx/5xx)
  CSRF_TOKEN_INVALID = 'CSRF_TOKEN_INVALID',
  CSRF_TOKEN_EXPIRED = 'CSRF_TOKEN_EXPIRED',
  HMAC_VERIFICATION_FAILED = 'HMAC_VERIFICATION_FAILED',
  WEBHOOK_SIGNATURE_INVALID = 'WEBHOOK_SIGNATURE_INVALID',
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
}

/**
 * Custom error class with code and metadata
 */
export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: unknown,
    public isOperational: boolean = true
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Authentication/Authorization Errors
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access', details?: unknown) {
    super(ErrorCode.UNAUTHORIZED, message, 401, details)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden', details?: unknown) {
    super(ErrorCode.FORBIDDEN, message, 403, details)
    this.name = 'ForbiddenError'
  }
}

/**
 * Validation Errors
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: unknown) {
    super(ErrorCode.VALIDATION_ERROR, message, 400, details)
    this.name = 'ValidationError'
  }
}

/**
 * Resource Errors
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource', details?: unknown) {
    super(ErrorCode.NOT_FOUND, `${resource} not found`, 404, details)
    this.name = 'NotFoundError'
  }
}

export class ConnectionNotFoundError extends AppError {
  constructor(shop?: string) {
    super(
      ErrorCode.CONNECTION_NOT_FOUND,
      shop ? `Connection not found for shop: ${shop}` : 'Connection not found',
      404,
      { shop }
    )
    this.name = 'ConnectionNotFoundError'
  }
}

/**
 * Rate Limiting Errors
 */
export class RateLimitError extends AppError {
  constructor(
    message: string = 'Rate limit exceeded',
    public retryAfter?: number,
    details?: unknown
  ) {
    super(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429, details)
    this.name = 'RateLimitError'
  }
}

/**
 * External API Errors
 */
export class ShopifyAPIError extends AppError {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.SHOPIFY_API_ERROR, message, 502, details)
    this.name = 'ShopifyAPIError'
  }
}

export class StripeAPIError extends AppError {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.STRIPE_API_ERROR, message, 502, details)
    this.name = 'StripeAPIError'
  }
}

export class ClaudeAPIError extends AppError {
  constructor(message: string, details?: unknown) {
    super(ErrorCode.CLAUDE_API_ERROR, message, 502, details)
    this.name = 'ClaudeAPIError'
  }
}

/**
 * Security Errors
 */
export class CSRFError extends AppError {
  constructor(message: string = 'CSRF token validation failed') {
    super(ErrorCode.CSRF_TOKEN_INVALID, message, 403)
    this.name = 'CSRFError'
  }
}

export class HMACVerificationError extends AppError {
  constructor(message: string = 'HMAC signature verification failed') {
    super(ErrorCode.HMAC_VERIFICATION_FAILED, message, 403)
    this.name = 'HMACVerificationError'
  }
}

export class WebhookSignatureError extends AppError {
  constructor(message: string = 'Webhook signature verification failed') {
    super(ErrorCode.WEBHOOK_SIGNATURE_INVALID, message, 403)
    this.name = 'WebhookSignatureError'
  }
}

/**
 * Error response interface for API routes
 */
export interface ErrorResponse {
  success: false
  error: {
    code: ErrorCode | string
    message: string
    details?: unknown
    timestamp?: string
    requestId?: string
  }
}

/**
 * Success response interface for API routes
 */
export interface SuccessResponse<T = unknown> {
  success: true
  data: T
  meta?: {
    page?: number
    limit?: number
    total?: number
    [key: string]: unknown
  }
}

/**
 * API response type (success or error)
 */
export type APIResponse<T = unknown> = SuccessResponse<T> | ErrorResponse

/**
 * Convert error to user-friendly message
 */
export function getUserFriendlyMessage(error: Error | AppError): string {
  if (error instanceof AppError) {
    // Return the error message for operational errors
    if (error.isOperational) {
      return error.message
    }
  }

  // Specific error type handling
  if (error instanceof ValidationError) {
    return 'Please check your input and try again.'
  }

  if (error instanceof UnauthorizedError) {
    return 'Please sign in to continue.'
  }

  if (error instanceof ForbiddenError) {
    return 'You do not have permission to perform this action.'
  }

  if (error instanceof NotFoundError) {
    return 'The requested resource was not found.'
  }

  if (error instanceof RateLimitError) {
    return 'Too many requests. Please try again later.'
  }

  if (error instanceof ShopifyAPIError) {
    return 'Unable to connect to Shopify. Please try again later.'
  }

  if (error instanceof StripeAPIError) {
    return 'Payment processing error. Please try again.'
  }

  if (error instanceof ClaudeAPIError) {
    return 'AI service temporarily unavailable. Please try again.'
  }

  // Default message for unknown errors
  return 'An unexpected error occurred. Please try again.'
}

/**
 * Log error to monitoring service (Sentry, LogRocket, etc.)
 */
export function logError(error: Error | AppError, context?: Record<string, unknown>): void {
  // Console logging for development
  console.error('[ERROR]', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    ...(error instanceof AppError && {
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
      isOperational: error.isOperational,
    }),
    context,
    timestamp: new Date().toISOString(),
  })

  // TODO: Integrate with Sentry or other monitoring service
  // if (process.env.SENTRY_DSN) {
  //   Sentry.captureException(error, {
  //     extra: context,
  //   })
  // }
}

/**
 * Handle Zod validation errors
 */
export function handleZodError(error: ZodError<unknown>): ErrorResponse {
  const details = error.issues.map((err) => ({
    field: err.path.map((p: PropertyKey) => String(p)).join('.'),
    message: err.message,
    code: err.code,
  }))

  return {
    success: false,
    error: {
      code: ErrorCode.VALIDATION_ERROR,
      message: 'Validation failed',
      details,
      timestamp: new Date().toISOString(),
    },
  }
}

/**
 * Convert error to API error response
 */
export function toErrorResponse(error: Error | AppError, requestId?: string): ErrorResponse {
  if (error instanceof ZodError) {
    return handleZodError(error)
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
        requestId,
      },
    }
  }

  // Handle unknown errors
  return {
    success: false,
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
      details: process.env.NODE_ENV === 'development' ? { stack: error.stack } : undefined,
      timestamp: new Date().toISOString(),
      requestId,
    },
  }
}

/**
 * Convert error to Next.js response
 */
export function toNextResponse(error: Error | AppError, requestId?: string): NextResponse<ErrorResponse> {
  const statusCode = error instanceof AppError ? error.statusCode : 500
  const errorResponse = toErrorResponse(error, requestId)

  // Log non-operational errors
  if (!(error instanceof AppError) || !error.isOperational) {
    logError(error, { requestId })
  }

  return NextResponse.json(errorResponse, { status: statusCode })
}

/**
 * Success response helper
 */
export function successResponse<T>(data: T, meta?: Record<string, unknown>): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    meta,
  })
}

/**
 * Error handler middleware wrapper for API routes
 */
export function withErrorHandler<T extends (...args: unknown[]) => Promise<NextResponse>>(
  handler: T
): (...args: Parameters<T>) => Promise<NextResponse> {
  return async (...args: Parameters<T>): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      if (error instanceof Error) {
        return toNextResponse(error)
      }
      return toNextResponse(new Error('Unknown error occurred'))
    }
  }
}

/**
 * Assert condition or throw error
 */
export function assert(condition: unknown, error: AppError): asserts condition {
  if (!condition) {
    throw error
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number
    initialDelay?: number
    maxDelay?: number
    backoffFactor?: number
    shouldRetry?: (error: Error) => boolean
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options

  let lastError: Error | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')

      // Don't retry on last attempt or if shouldRetry returns false
      if (attempt === maxRetries || !shouldRetry(lastError)) {
        throw lastError
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(initialDelay * Math.pow(backoffFactor, attempt), maxDelay)

      console.warn(
        `[RETRY] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms...`,
        lastError.message
      )

      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }

  throw lastError
}

/**
 * Check if error is retryable
 */
export function isRetryableError(error: Error | AppError): boolean {
  if (error instanceof AppError) {
    // Retry on server errors and external API errors
    return error.statusCode >= 500 ||
           error.code === ErrorCode.SHOPIFY_API_ERROR ||
           error.code === ErrorCode.CLAUDE_API_ERROR ||
           error.code === ErrorCode.EXTERNAL_API_ERROR
  }

  // Retry on network errors
  return error.message.includes('ECONNREFUSED') ||
         error.message.includes('ETIMEDOUT') ||
         error.message.includes('ENOTFOUND')
}
