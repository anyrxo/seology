/**
 * Shopify Error Alert Component
 *
 * User-friendly error display with recovery actions
 * - Inline error alerts for API failures
 * - Toast-style notifications for background errors
 * - Context-aware suggestions based on error type
 *
 * Part of the reliability specialist improvements
 */

'use client'

import React, { useState } from 'react'
import {
  classifyShopifyError,
  type ShopifyErrorInfo,
} from '@/lib/shopify-errors'

/**
 * Props for ErrorAlert component
 */
interface ErrorAlertProps {
  error: Error
  onRetry?: () => void | Promise<void>
  onDismiss?: () => void
  className?: string
  variant?: 'inline' | 'toast'
  showDetails?: boolean
}

/**
 * User-friendly error alert with recovery actions
 */
export function ErrorAlert({
  error,
  onRetry,
  onDismiss,
  className = '',
  variant = 'inline',
  showDetails = process.env.NODE_ENV === 'development',
}: ErrorAlertProps): React.ReactElement {
  const [isRetrying, setIsRetrying] = useState(false)
  const errorInfo = classifyShopifyError(error)

  const handleRetry = async () => {
    if (!onRetry) return

    setIsRetrying(true)
    try {
      await onRetry()
      // If retry succeeds, dismiss the alert
      onDismiss?.()
    } catch (err) {
      // Retry failed, keep showing error
      console.error('Retry failed:', err)
    } finally {
      setIsRetrying(false)
    }
  }

  if (variant === 'toast') {
    return (
      <ToastErrorAlert
        errorInfo={errorInfo}
        error={error}
        isRetrying={isRetrying}
        onRetry={handleRetry}
        onDismiss={onDismiss}
        showDetails={showDetails}
        className={className}
      />
    )
  }

  return (
    <InlineErrorAlert
      errorInfo={errorInfo}
      error={error}
      isRetrying={isRetrying}
      onRetry={handleRetry}
      onDismiss={onDismiss}
      showDetails={showDetails}
      className={className}
    />
  )
}

/**
 * Props for error alert variants
 */
interface ErrorAlertVariantProps {
  errorInfo: ShopifyErrorInfo
  error: Error
  isRetrying: boolean
  onRetry?: () => void
  onDismiss?: () => void
  showDetails: boolean
  className: string
}

/**
 * Inline error alert (embedded in page)
 */
function InlineErrorAlert({
  errorInfo,
  error,
  isRetrying,
  onRetry,
  onDismiss,
  showDetails,
  className,
}: ErrorAlertVariantProps): React.ReactElement {
  const { type, userFriendlyMessage, retryable, suggestions } = errorInfo
  const colors = getColorClasses(type)

  return (
    <div className={`rounded-lg border p-4 ${colors.border} ${colors.bg} ${className}`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${colors.iconBg}`}>
          {getIcon(type, colors.icon)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${colors.title}`}>
            {getErrorTitle(type)}
          </h4>
          <p className={`mt-1 text-sm ${colors.text}`}>
            {userFriendlyMessage}
          </p>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className={`mt-2 space-y-1 text-sm ${colors.text}`}>
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technical details */}
          {showDetails && (
            <details className="mt-2">
              <summary className={`cursor-pointer text-xs ${colors.text} opacity-75 hover:opacity-100`}>
                Technical details
              </summary>
              <pre className="mt-1 overflow-auto text-xs opacity-75">
                {error.message}
              </pre>
            </details>
          )}

          {/* Actions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {retryable && onRetry && (
              <button
                onClick={onRetry}
                disabled={isRetrying}
                className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${colors.button}`}
              >
                {isRetrying ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Retrying...
                  </>
                ) : (
                  'Try Again'
                )}
              </button>
            )}

            {onDismiss && (
              <button
                onClick={onDismiss}
                className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.dismissButton}`}
              >
                Dismiss
              </button>
            )}
          </div>
        </div>

        {/* Close button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 rounded-md p-1 hover:bg-black/5 focus:outline-none focus:ring-2 ${colors.icon}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Toast-style error alert (floating notification)
 */
function ToastErrorAlert({
  errorInfo,
  error,
  isRetrying,
  onRetry,
  onDismiss,
  showDetails,
  className,
}: ErrorAlertVariantProps): React.ReactElement {
  const { type, userFriendlyMessage, retryable } = errorInfo
  const colors = getColorClasses(type)

  return (
    <div
      className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${colors.bg} ${className}`}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colors.iconBg}`}>
              {getIcon(type, colors.icon, 'h-5 w-5')}
            </div>
          </div>

          {/* Content */}
          <div className="ml-3 flex-1">
            <p className={`text-sm font-medium ${colors.title}`}>
              {getErrorTitle(type)}
            </p>
            <p className={`mt-1 text-sm ${colors.text}`}>
              {userFriendlyMessage}
            </p>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              {retryable && onRetry && (
                <button
                  onClick={onRetry}
                  disabled={isRetrying}
                  className={`text-sm font-medium underline focus:outline-none disabled:opacity-50 ${colors.actionText}`}
                >
                  {isRetrying ? 'Retrying...' : 'Try Again'}
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className={`text-sm font-medium underline focus:outline-none ${colors.actionText}`}
                >
                  Dismiss
                </button>
              )}
            </div>
          </div>

          {/* Close button */}
          {onDismiss && (
            <div className="ml-4 flex flex-shrink-0">
              <button
                onClick={onDismiss}
                className={`inline-flex rounded-md focus:outline-none focus:ring-2 ${colors.icon}`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Get icon based on error type
 */
function getIcon(type: string, colorClass: string, sizeClass: string = 'h-6 w-6'): React.ReactElement {
  const className = `${sizeClass} ${colorClass}`

  switch (type) {
    case 'rate_limit':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'auth_failed':
    case 'session_expired':
    case 'permission_denied':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    case 'network':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
      )
    case 'resource_not_found':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
  }
}

/**
 * Get color classes based on error type
 */
function getColorClasses(type: string) {
  if (type === 'rate_limit') {
    return {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      iconBg: 'bg-yellow-100',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      text: 'text-yellow-800',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      dismissButton: 'border border-yellow-300 bg-white text-yellow-700 hover:bg-yellow-50 focus:ring-yellow-500',
      actionText: 'text-yellow-700 hover:text-yellow-800',
    }
  }

  if (type === 'auth_failed' || type === 'session_expired' || type === 'permission_denied') {
    return {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      iconBg: 'bg-orange-100',
      icon: 'text-orange-600',
      title: 'text-orange-900',
      text: 'text-orange-800',
      button: 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
      dismissButton: 'border border-orange-300 bg-white text-orange-700 hover:bg-orange-50 focus:ring-orange-500',
      actionText: 'text-orange-700 hover:text-orange-800',
    }
  }

  if (type === 'network') {
    return {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      text: 'text-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      dismissButton: 'border border-blue-300 bg-white text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
      actionText: 'text-blue-700 hover:text-blue-800',
    }
  }

  // Default (red) for errors, validation, unknown
  return {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconBg: 'bg-red-100',
    icon: 'text-red-600',
    title: 'text-red-900',
    text: 'text-red-800',
    button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    dismissButton: 'border border-red-300 bg-white text-red-700 hover:bg-red-50 focus:ring-red-500',
    actionText: 'text-red-700 hover:text-red-800',
  }
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
    case 'permission_denied':
      return 'Permission Denied'
    case 'network':
      return 'Connection Error'
    case 'resource_not_found':
      return 'Not Found'
    case 'validation':
      return 'Invalid Input'
    case 'graphql_error':
      return 'API Error'
    default:
      return 'Error'
  }
}
