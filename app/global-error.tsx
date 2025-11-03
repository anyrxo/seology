'use client'

import { AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
          <div className="max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-500/10 p-6">
                <AlertTriangle className="h-16 w-16 text-red-400" />
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white">
              Critical Error
            </h1>
            <p className="mb-6 text-gray-400">
              A critical error has occurred. Please refresh the page or contact support if the problem persists.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 rounded-lg border border-gray-800 bg-gray-900 p-4 text-left">
                <p className="mb-2 text-sm font-semibold text-gray-400">Error:</p>
                <pre className="overflow-x-auto text-xs text-red-400">
                  {error.message}
                </pre>
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
