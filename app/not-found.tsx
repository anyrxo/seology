import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </h1>
          <div className="mt-4 text-2xl font-semibold text-white">
            Page Not Found
          </div>
        </div>

        {/* Description */}
        <p className="mb-8 text-lg text-gray-400">
          Oops! The page you&apos;re looking for seems to have wandered off. It might have been moved, deleted, or perhaps it never existed.
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for pages, sites, or issues..."
              className="w-full rounded-lg border border-gray-700 bg-gray-900 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="mb-4 text-sm text-gray-500">Quick Links</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/features" className="text-sm text-blue-400 hover:text-blue-300">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-blue-400 hover:text-blue-300">
              Documentation
            </Link>
            <Link href="mailto:support@seology.ai" className="text-sm text-blue-400 hover:text-blue-300">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
