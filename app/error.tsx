'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-6">
            <AlertTriangle className="h-16 w-16 text-red-400" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-4xl font-bold text-white">
          Something went wrong!
        </h1>
        <p className="mb-8 text-lg text-gray-400">
          We encountered an unexpected error while processing your request. Our team has been notified and is working on a fix.
        </p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-gray-400">Error Details:</p>
            <pre className="overflow-x-auto text-xs text-red-400">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-2 text-xs text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            size="lg"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <a href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go to Homepage
            </a>
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500">
            If this problem persists, please{' '}
            <a
              href="mailto:support@seology.ai"
              className="text-blue-400 hover:text-blue-300"
            >
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
