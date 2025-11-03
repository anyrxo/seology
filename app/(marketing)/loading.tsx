import { Loader2 } from 'lucide-react'

export default function MarketingLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
        <p className="text-lg font-medium text-white">Loading...</p>
      </div>
    </div>
  )
}
