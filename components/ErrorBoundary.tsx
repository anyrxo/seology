/**
 * Error Boundary Component
 *
 * Catches React errors and displays fallback UI
 * Prevents entire app from crashing due to component errors
 */

'use client'

import React, { Component, ReactNode } from 'react'
import { logError } from '@/lib/errors'

interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error to monitoring service
    logError(error, {
      componentStack: errorInfo.componentStack,
      type: 'react-error-boundary',
    })

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Custom fallback
      if (this.props.fallback) {
        if (typeof this.props.fallback === 'function') {
          return this.props.fallback(this.state.error, this.reset)
        }
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="mb-2 text-center text-xl font-semibold text-neutral-900">
              Something went wrong
            </h2>

            <p className="mb-6 text-center text-sm text-neutral-600">
              We encountered an unexpected error. Please try again.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 rounded-lg bg-neutral-100 p-4">
                <summary className="cursor-pointer text-sm font-medium text-neutral-700">
                  Error Details
                </summary>
                <pre className="mt-2 overflow-auto text-xs text-red-600">
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={this.reset}
                className="flex-1 rounded-lg bg-brand-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary-600 focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Async Error Boundary for Next.js Server Components
 * Wraps async components to catch errors
 */
export function AsyncErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-neutral-900">
                Failed to load content
              </h3>
              <p className="mt-2 text-sm text-neutral-600">
                Please refresh the page to try again
              </p>
            </div>
          </div>
        )
      }
    >
      {children}
    </ErrorBoundary>
  )
}

/**
 * Feature Error Boundary
 * Wraps specific features to prevent one feature from breaking the entire page
 */
export function FeatureErrorBoundary({
  children,
  featureName,
}: {
  children: ReactNode
  featureName: string
}) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
              <svg
                className="h-5 w-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h4 className="text-sm font-semibold text-neutral-900">
                {featureName} temporarily unavailable
              </h4>
              <p className="mt-1 text-sm text-neutral-600">
                This feature encountered an error. Other features should continue to work normally.
              </p>

              {process.env.NODE_ENV === 'development' && (
                <p className="mt-2 text-xs text-red-600">{error.message}</p>
              )}

              <button
                onClick={reset}
                className="mt-3 text-sm font-medium text-brand-primary-600 hover:text-brand-primary-700"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}
      onError={(error) => {
        logError(error, { featureName, type: 'feature-error' })
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
