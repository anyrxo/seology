/**
 * Shopify-Enhanced Error Boundary
 *
 * Advanced error boundary with Shopify-specific error handling:
 * - Classifies Shopify errors (rate limits, auth, network, etc.)
 * - Provides context-aware recovery suggestions
 * - Displays user-friendly error messages
 * - Offers retry capabilities for retryable errors
 *
 * Part of the reliability specialist improvements
 */

'use client'

import React, { Component, ReactNode, ReactElement } from 'react'
import { logError } from '@/lib/errors'
import {
  classifyShopifyError,
  type ShopifyErrorInfo,
} from '@/lib/shopify-errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, errorInfo: ShopifyErrorInfo, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  onRetry?: () => void | Promise<void>
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ShopifyErrorInfo | null
  isRetrying: boolean
}

export class ShopifyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorInfo = classifyShopifyError(error)

    return {
      hasError: true,
      error,
      errorInfo,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to monitoring service
    logError(error, {
      componentStack: errorInfo.componentStack,
      type: 'shopify-error-boundary',
      errorType: this.state.errorInfo?.type,
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      isRetrying: false,
    })
  }

  retry = async (): Promise<void> => {
    this.setState({ isRetrying: true })

    try {
      // Call custom retry handler if provided
      if (this.props.onRetry) {
        await this.props.onRetry()
      }

      // Reset error state after successful retry
      this.reset()
    } catch (error) {
      // Retry failed, update error state
      const err = error instanceof Error ? error : new Error(String(error))
      const errorInfo = classifyShopifyError(err)

      this.setState({
        error: err,
        errorInfo,
        isRetrying: false,
      })
    }
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      // Custom fallback with error info
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.state.errorInfo, this.reset)
        }
        return this.props.fallback
      }

      // Default Shopify error UI
      return (
        <ShopifyErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          isRetrying={this.state.isRetrying}
          onReset={this.reset}
          onRetry={this.retry}
        />
      )
    }

    return this.props.children
  }
}

/**
 * Default error fallback UI for Shopify errors
 */
interface FallbackProps {
  error: Error
  errorInfo: ShopifyErrorInfo
  isRetrying: boolean
  onReset: () => void
  onRetry: () => void
}

function ShopifyErrorFallback({
  error,
  errorInfo,
  isRetrying,
  onReset,
  onRetry,
}: FallbackProps): React.ReactElement {
  const { type, userFriendlyMessage, recoverable, retryable, suggestions } = errorInfo

  // Icon based on error type
  const getIcon = () => {
    switch (type) {
      case 'rate_limit':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'auth_failed':
      case 'session_expired':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
      case 'network':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        )
      default:
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
    }
  }

  // Color scheme based on error type
  const getColorClasses = () => {
    if (type === 'rate_limit') {
      return {
        icon: 'bg-yellow-100 text-yellow-600',
        title: 'text-yellow-900',
        button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      }
    }
    if (type === 'auth_failed' || type === 'session_expired') {
      return {
        icon: 'bg-orange-100 text-orange-600',
        title: 'text-orange-900',
        button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
      }
    }
    return {
      icon: 'bg-red-100 text-red-600',
      title: 'text-red-900',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    }
  }

  const colors = getColorClasses()

  return (
    <div className="flex min-h-[400px] items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Icon */}
        <div className="mb-4 flex items-center justify-center">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.icon}`}>
            {getIcon()}
          </div>
        </div>

        {/* Title */}
        <h2 className={`mb-2 text-center text-xl font-semibold ${colors.title}`}>
          {getErrorTitle(type)}
        </h2>

        {/* User-friendly message */}
        <p className="mb-6 text-center text-sm text-neutral-600">
          {userFriendlyMessage}
        </p>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6 rounded-lg bg-neutral-50 p-4">
            <p className="mb-2 text-sm font-medium text-neutral-700">What to try:</p>
            <ul className="space-y-1 text-sm text-neutral-600">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technical details (dev mode only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 rounded-lg bg-neutral-100 p-4">
            <summary className="cursor-pointer text-sm font-medium text-neutral-700">
              Technical Details
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-neutral-600">
              Error Type: {type}{'\n'}
              Message: {error.message}{'\n'}
              {error.stack && `\nStack:\n${error.stack}`}
            </pre>
          </details>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          {retryable && (
            <button
              onClick={onRetry}
              disabled={isRetrying}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${colors.button}`}
            >
              {isRetrying ? (
                <span className="flex items-center justify-center">
                  <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Retrying...
                </span>
              ) : (
                'Try Again'
              )}
            </button>
          )}

          {recoverable && (
            <button
              onClick={onReset}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            >
              {retryable ? 'Dismiss' : 'Go Back'}
            </button>
          )}

          {type === 'session_expired' && (
            <button
              onClick={() => window.location.reload()}
              className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            >
              Reload App
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Get error title based on type
 */
function getErrorTitle(type: string): string {
  switch (type) {
    case 'rate_limit':
      return 'Rate Limit Reached'
    case 'auth_failed':
      return 'Authentication Failed'
    case 'session_expired':
      return 'Session Expired'
    case 'network':
      return 'Connection Error'
    case 'permission_denied':
      return 'Permission Denied'
    case 'resource_not_found':
      return 'Not Found'
    case 'validation':
      return 'Invalid Input'
    case 'graphql_error':
      return 'API Error'
    default:
      return 'Something Went Wrong'
  }
}

/**
 * Feature-level error boundary for Shopify features
 * Prevents one feature from breaking the entire page
 */
export function ShopifyFeatureErrorBoundary({
  children,
  featureName,
}: {
  children: ReactNode
  featureName: string
}): ReactElement {
  return (
    <ShopifyErrorBoundary
      fallback={(error, errorInfo, reset) => (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
              <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-neutral-900">
                {featureName} temporarily unavailable
              </h4>
              <p className="mt-1 text-sm text-neutral-600">
                {errorInfo.userFriendlyMessage}
              </p>

              {process.env.NODE_ENV === 'development' && (
                <p className="mt-2 text-xs text-red-600">{error.message}</p>
              )}

              {errorInfo.retryable && (
                <button
                  onClick={reset}
                  className="mt-3 text-sm font-medium text-brand-primary-600 hover:text-brand-primary-700"
                >
                  Try again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      onError={(error) => {
        logError(error, { featureName, type: 'shopify-feature-error' })
      }}
    >
      {children}
    </ShopifyErrorBoundary>
  )
}
