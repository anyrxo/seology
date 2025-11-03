import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
        <p className="text-lg font-medium text-white">Loading...</p>
        <p className="mt-2 text-sm text-gray-400">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
