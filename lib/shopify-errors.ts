/**
 * Shopify-Specific Error Classes and Handlers
 *
 * Provides comprehensive error handling for Shopify API interactions:
 * - Custom error types with retry logic
 * - Error classification for user-friendly messages
 * - Recovery suggestions for common issues
 *
 * Part of the reliability specialist improvements
 */

import { AppError, ErrorCode } from './errors'

/**
 * Error type classification for UI handling
 */
export type ShopifyErrorType =
  | 'rate_limit'
  | 'auth_failed'
  | 'session_expired'
  | 'network'
  | 'validation'
  | 'permission_denied'
  | 'resource_not_found'
  | 'graphql_error'
  | 'internal'
  | 'unknown'

/**
 * Detailed error information for UI display
 */
export interface ShopifyErrorInfo {
  type: ShopifyErrorType
  message: string
  userFriendlyMessage: string
  recoverable: boolean
  retryable: boolean
  suggestions: string[]
  technicalDetails?: string
  retryAfter?: number // milliseconds
}

/**
 * Base Shopify API Error
 */
export class ShopifyError extends AppError {
  public retryable: boolean = false
  public errorType: ShopifyErrorType = 'unknown'

  constructor(
    message: string,
    statusCode: number = 502,
    details?: unknown,
    retryable: boolean = false
  ) {
    super(ErrorCode.SHOPIFY_API_ERROR, message, statusCode, details)
    this.name = 'ShopifyError'
    this.retryable = retryable
  }

  /**
   * Get detailed error information for UI
   */
  getErrorInfo(): ShopifyErrorInfo {
    return classifyShopifyError(this)
  }
}

/**
 * Rate Limit Error - 429 Too Many Requests
 */
export class ShopifyRateLimitError extends ShopifyError {
  public errorType: ShopifyErrorType = 'rate_limit'

  constructor(
    public retryAfterSeconds: number = 2,
    message?: string
  ) {
    super(
      message || `Shopify API rate limit exceeded. Retry after ${retryAfterSeconds} seconds.`,
      429,
      { retryAfterSeconds },
      true
    )
    this.name = 'ShopifyRateLimitError'
    this.retryable = true
  }

  getRetryAfterMs(): number {
    return this.retryAfterSeconds * 1000
  }
}

/**
 * Authentication Failed - 401 Unauthorized
 */
export class ShopifyAuthenticationError extends ShopifyError {
  public errorType: ShopifyErrorType = 'auth_failed'

  constructor(message: string = 'Shopify authentication failed') {
    super(message, 401, undefined, false)
    this.name = 'ShopifyAuthenticationError'
  }
}

/**
 * Session Token Expired or Invalid
 */
export class ShopifySessionExpiredError extends ShopifyError {
  public errorType: ShopifyErrorType = 'session_expired'

  constructor(message: string = 'Shopify session has expired') {
    super(message, 401, undefined, false)
    this.name = 'ShopifySessionExpiredError'
  }
}

/**
 * Permission Denied - 403 Forbidden
 */
export class ShopifyPermissionError extends ShopifyError {
  public errorType: ShopifyErrorType = 'permission_denied'

  constructor(
    message: string = 'Insufficient permissions for this operation',
    public requiredScope?: string
  ) {
    super(message, 403, { requiredScope }, false)
    this.name = 'ShopifyPermissionError'
  }
}

/**
 * Resource Not Found - 404
 */
export class ShopifyResourceNotFoundError extends ShopifyError {
  public errorType: ShopifyErrorType = 'resource_not_found'

  constructor(
    public resourceType: string,
    public resourceId?: string
  ) {
    const message = resourceId
      ? `${resourceType} not found: ${resourceId}`
      : `${resourceType} not found`

    super(message, 404, { resourceType, resourceId }, false)
    this.name = 'ShopifyResourceNotFoundError'
  }
}

/**
 * GraphQL API Error
 */
export class ShopifyGraphQLError extends ShopifyError {
  public errorType: ShopifyErrorType = 'graphql_error'

  constructor(
    message: string,
    public graphQLErrors: Array<{
      message: string
      path?: string[]
      extensions?: { code?: string }
    }>,
    retryable: boolean = false
  ) {
    super(message, 400, { graphQLErrors }, retryable)
    this.name = 'ShopifyGraphQLError'
  }

  getFirstErrorCode(): string | undefined {
    return this.graphQLErrors[0]?.extensions?.code
  }
}

/**
 * Network/Connection Error
 */
export class ShopifyNetworkError extends ShopifyError {
  public errorType: ShopifyErrorType = 'network'

  constructor(message: string = 'Network error while connecting to Shopify') {
    super(message, 503, undefined, true)
    this.name = 'ShopifyNetworkError'
    this.retryable = true
  }
}

/**
 * Validation Error - Invalid Input
 */
export class ShopifyValidationError extends ShopifyError {
  public errorType: ShopifyErrorType = 'validation'

  constructor(
    message: string,
    public validationErrors?: Array<{
      field: string[]
      message: string
    }>
  ) {
    super(message, 400, { validationErrors }, false)
    this.name = 'ShopifyValidationError'
  }
}

/**
 * Classify any error into Shopify error info
 */
export function classifyShopifyError(error: Error): ShopifyErrorInfo {
  // Handle known Shopify error types
  if (error instanceof ShopifyRateLimitError) {
    return {
      type: 'rate_limit',
      message: error.message,
      userFriendlyMessage: 'Shopify rate limit reached. Please wait a moment.',
      recoverable: true,
      retryable: true,
      suggestions: [
        `Wait ${error.retryAfterSeconds} seconds before retrying`,
        'Reduce the frequency of requests',
        'The system will automatically retry',
      ],
      retryAfter: error.getRetryAfterMs(),
      technicalDetails: `Rate limit exceeded. Retry after ${error.retryAfterSeconds}s`,
    }
  }

  if (error instanceof ShopifyAuthenticationError) {
    return {
      type: 'auth_failed',
      message: error.message,
      userFriendlyMessage: 'Unable to authenticate with Shopify.',
      recoverable: true,
      retryable: false,
      suggestions: [
        'Reconnect your Shopify store',
        'Check that the app is still installed',
        'Verify your store credentials',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifySessionExpiredError) {
    return {
      type: 'session_expired',
      message: error.message,
      userFriendlyMessage: 'Your Shopify session has expired.',
      recoverable: true,
      retryable: false,
      suggestions: [
        'Reload the page to create a new session',
        'Re-open the app from your Shopify admin',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifyPermissionError) {
    return {
      type: 'permission_denied',
      message: error.message,
      userFriendlyMessage: 'This action requires additional permissions.',
      recoverable: false,
      retryable: false,
      suggestions: [
        'Contact your store administrator',
        error.requiredScope
          ? `Required permission: ${error.requiredScope}`
          : 'Check that the app has the necessary permissions',
        'You may need to reinstall the app with correct scopes',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifyResourceNotFoundError) {
    return {
      type: 'resource_not_found',
      message: error.message,
      userFriendlyMessage: `The requested ${error.resourceType} was not found.`,
      recoverable: false,
      retryable: false,
      suggestions: [
        'Verify the resource exists in Shopify',
        'The resource may have been deleted',
        'Refresh the page to see updated data',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifyGraphQLError) {
    const code = error.getFirstErrorCode()
    return {
      type: 'graphql_error',
      message: error.message,
      userFriendlyMessage: 'An error occurred while communicating with Shopify.',
      recoverable: true,
      retryable: error.retryable,
      suggestions: [
        error.retryable ? 'Try again in a moment' : 'Check your input and try again',
        'Contact support if this persists',
      ],
      technicalDetails: code ? `GraphQL Error: ${code}` : error.message,
    }
  }

  if (error instanceof ShopifyNetworkError) {
    return {
      type: 'network',
      message: error.message,
      userFriendlyMessage: 'Unable to connect to Shopify.',
      recoverable: true,
      retryable: true,
      suggestions: [
        'Check your internet connection',
        'Shopify may be experiencing issues',
        'The system will automatically retry',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifyValidationError) {
    return {
      type: 'validation',
      message: error.message,
      userFriendlyMessage: 'The provided data is invalid.',
      recoverable: true,
      retryable: false,
      suggestions: [
        'Check the highlighted fields',
        'Ensure all required information is provided',
        'Verify the format of your input',
      ],
      technicalDetails: error.message,
    }
  }

  if (error instanceof ShopifyError) {
    return {
      type: error.errorType,
      message: error.message,
      userFriendlyMessage: 'An error occurred with Shopify.',
      recoverable: true,
      retryable: error.retryable,
      suggestions: error.retryable
        ? ['Try again in a moment', 'Contact support if this persists']
        : ['Contact support for assistance'],
      technicalDetails: error.message,
    }
  }

  // Classify generic errors
  const message = error.message.toLowerCase()

  // Rate limit detection
  if (message.includes('rate limit') || message.includes('429')) {
    return {
      type: 'rate_limit',
      message: error.message,
      userFriendlyMessage: 'Too many requests. Please wait a moment.',
      recoverable: true,
      retryable: true,
      suggestions: [
        'Wait 1-2 seconds before retrying',
        'The system will automatically retry',
      ],
      technicalDetails: error.message,
    }
  }

  // Authentication errors
  if (
    message.includes('unauthorized') ||
    message.includes('authentication') ||
    message.includes('401')
  ) {
    return {
      type: 'auth_failed',
      message: error.message,
      userFriendlyMessage: 'Authentication failed.',
      recoverable: true,
      retryable: false,
      suggestions: [
        'Reconnect your Shopify store',
        'Verify app installation',
      ],
      technicalDetails: error.message,
    }
  }

  // Session errors
  if (message.includes('session') || message.includes('token')) {
    return {
      type: 'session_expired',
      message: error.message,
      userFriendlyMessage: 'Your session has expired.',
      recoverable: true,
      retryable: false,
      suggestions: ['Reload the page', 'Re-open the app from Shopify admin'],
      technicalDetails: error.message,
    }
  }

  // Network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('econnrefused') ||
    message.includes('etimedout')
  ) {
    return {
      type: 'network',
      message: error.message,
      userFriendlyMessage: 'Network connection error.',
      recoverable: true,
      retryable: true,
      suggestions: [
        'Check your internet connection',
        'Try again in a moment',
      ],
      technicalDetails: error.message,
    }
  }

  // Validation errors
  if (message.includes('validation') || message.includes('invalid')) {
    return {
      type: 'validation',
      message: error.message,
      userFriendlyMessage: 'Invalid input provided.',
      recoverable: true,
      retryable: false,
      suggestions: ['Check your input and try again'],
      technicalDetails: error.message,
    }
  }

  // Default unknown error
  return {
    type: 'unknown',
    message: error.message,
    userFriendlyMessage: 'An unexpected error occurred.',
    recoverable: true,
    retryable: false,
    suggestions: [
      'Try again',
      'Contact support if the issue persists',
    ],
    technicalDetails: error.message,
  }
}

/**
 * Determine if a Shopify error is retryable
 */
export function isShopifyErrorRetryable(error: Error): boolean {
  if (error instanceof ShopifyError) {
    return error.retryable
  }

  const info = classifyShopifyError(error)
  return info.retryable
}

/**
 * Get retry delay for a Shopify error (in milliseconds)
 */
export function getShopifyRetryDelay(error: Error, attemptNumber: number = 1): number {
  if (error instanceof ShopifyRateLimitError) {
    return error.getRetryAfterMs()
  }

  const info = classifyShopifyError(error)

  if (info.retryAfter) {
    return info.retryAfter
  }

  // Exponential backoff: 1s, 2s, 4s, 8s (capped at 10s)
  const baseDelay = 1000
  const exponentialDelay = baseDelay * Math.pow(2, attemptNumber - 1)
  return Math.min(exponentialDelay, 10000)
}
