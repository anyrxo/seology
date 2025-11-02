import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function FixesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">SEO Fixes</h1>
          <p className="text-gray-400">
            Review, approve, and rollback automated SEO fixes
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Applied</option>
            <option>Rolled Back</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FixStatCard
          title="Total Fixes"
          value="0"
          icon="✓"
          color="blue"
        />
        <FixStatCard
          title="Pending Approval"
          value="0"
          icon="⏳"
          color="yellow"
        />
        <FixStatCard
          title="Applied This Month"
          value="0"
          icon="📊"
          color="green"
        />
        <FixStatCard
          title="Available Rollbacks"
          value="0"
          icon="↩️"
          color="gray"
        />
      </div>

      {/* Execution Mode Info */}
      <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-700 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">⚙️</div>
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2">
              Execution Mode: <span className="text-blue-300">Automatic</span>
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Fixes are applied automatically without approval. All changes include 90-day rollback.
            </p>
            <a
              href="/dashboard/settings"
              className="text-blue-300 hover:text-blue-200 text-sm font-medium"
            >
              Change Execution Mode →
            </a>
          </div>
        </div>
      </div>

      {/* Fixes Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Fixes</h2>
        </div>

        {/* Empty State */}
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No fixes applied yet
          </h3>
          <p className="text-gray-400 mb-6">
            Once issues are detected, fixes will appear here for review or auto-application
          </p>
          <a
            href="/dashboard/issues"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View SEO Issues
          </a>
        </div>

        {/* Table Header (example - shown when there are fixes) */}
        {/* <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-gray-400 text-sm">
              <tr>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Fix Type</th>
                <th className="text-left px-6 py-3">Description</th>
                <th className="text-left px-6 py-3">Page</th>
                <th className="text-left px-6 py-3">Applied</th>
                <th className="text-left px-6 py-3">Rollback</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-800 hover:bg-gray-800">
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-200">
                    Applied
                  </span>
                </td>
                <td className="px-6 py-4 text-white">Meta Description</td>
                <td className="px-6 py-4 text-gray-400">Added optimized meta description</td>
                <td className="px-6 py-4 text-gray-400">/products/example</td>
                <td className="px-6 py-4 text-gray-400">2 hours ago</td>
                <td className="px-6 py-4 text-gray-400">88 days left</td>
                <td className="px-6 py-4">
                  <button className="text-red-400 hover:text-red-300">Rollback</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon="⚡"
          title="Automatic Mode"
          description="Fixes are applied instantly without approval"
        />
        <InfoCard
          icon="📋"
          title="Plan Mode"
          description="Review and approve all fixes in a single batch"
        />
        <InfoCard
          icon="✅"
          title="Approve Mode"
          description="Manually approve each fix before application"
        />
      </div>

      {/* Rollback Safety */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          90-Day Rollback Protection
        </h3>
        <p className="text-gray-400 mb-4">
          Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm">Before/After State Stored</p>
              <p className="text-gray-500 text-xs">Complete content backup</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm">One-Click Rollback</p>
              <p className="text-gray-500 text-xs">Instant reversion</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm">Audit Trail</p>
              <p className="text-gray-500 text-xs">Full change history</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400">✓</span>
            <div>
              <p className="text-white text-sm">Automatic Cleanup</p>
              <p className="text-gray-500 text-xs">90-day retention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FixStatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: string
  color: 'blue' | 'yellow' | 'green' | 'gray'
}) {
  const colors = {
    blue: 'text-blue-400',
    yellow: 'text-yellow-400',
    green: 'text-green-400',
    gray: 'text-gray-400',
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm font-medium ${colors[color]}`}>0%</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
