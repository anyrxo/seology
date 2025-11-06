'use client'

export function PendingFixesClient({ fixes, executionMode }: any) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Pending Fixes</h1>
      <p className="text-gray-400 mb-8">
        Component under construction - {fixes.length} fixes pending in {executionMode} mode
      </p>
      <div className="bg-white/5 rounded-xl p-6">
        <p className="text-gray-300">Full implementation coming soon...</p>
      </div>
    </div>
  )
}
