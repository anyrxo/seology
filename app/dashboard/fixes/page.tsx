import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'
import Link from 'next/link'

export default async function FixesPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user
  const dbUser = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    redirect('/sign-in')
  }

  // Build filters
  const where: Prisma.FixWhereInput = {
    connection: {
      userId: dbUser.id,
    },
  }

  if (searchParams.status) {
    where.status = searchParams.status.toUpperCase() as Prisma.EnumFixStatusFilter
  }

  // Get fixes
  const fixes = await db.fix.findMany({
    where,
    include: {
      connection: true,
      issue: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  // Calculate stats
  const totalFixes = await db.fix.count({
    where: { connection: { userId: dbUser.id } },
  })

  const pendingFixes = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'PENDING',
    },
  })

  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const appliedThisMonth = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'APPLIED',
      appliedAt: { gte: thisMonth },
    },
  })

  const now = new Date()
  const availableRollbacks = await db.fix.count({
    where: {
      connection: { userId: dbUser.id },
      status: 'APPLIED',
      rollbackDeadline: { gte: now },
    },
  })

  const executionModeLabels = {
    AUTOMATIC: 'Automatic',
    PLAN: 'Plan',
    APPROVE: 'Approve',
  }

  const executionModeDescriptions = {
    AUTOMATIC: 'Fixes are applied automatically without approval. All changes include 90-day rollback.',
    PLAN: 'Claude AI creates a plan of all fixes. You approve once, and all fixes execute together.',
    APPROVE: 'Each fix requires individual approval before application. Maximum control.',
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <FixStatCard
          title="Total Fixes"
          value={totalFixes.toString()}
          icon="✓"
          color="blue"
        />
        <FixStatCard
          title="Pending Approval"
          value={pendingFixes.toString()}
          icon="⏳"
          color="yellow"
        />
        <FixStatCard
          title="Applied This Month"
          value={appliedThisMonth.toString()}
          icon="📊"
          color="green"
        />
        <FixStatCard
          title="Available Rollbacks"
          value={availableRollbacks.toString()}
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
              Execution Mode: <span className="text-blue-300">{executionModeLabels[dbUser.executionMode]}</span>
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              {executionModeDescriptions[dbUser.executionMode]}
            </p>
            <Link
              href="/dashboard/settings"
              className="text-blue-300 hover:text-blue-200 text-sm font-medium"
            >
              Change Execution Mode →
            </Link>
          </div>
        </div>
      </div>

      {/* Fixes Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Fixes</h2>
        </div>

        {fixes.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No fixes applied yet
            </h3>
            <p className="text-gray-400 mb-6">
              Once issues are detected, fixes will appear here for review or auto-application
            </p>
            <Link
              href="/dashboard/issues"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View SEO Issues
            </Link>
          </div>
        ) : (
          /* Fixes Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-gray-400 text-sm">
                <tr>
                  <th className="text-left px-6 py-3">Status</th>
                  <th className="text-left px-6 py-3">Fix Type</th>
                  <th className="text-left px-6 py-3">Description</th>
                  <th className="text-left px-6 py-3">Site</th>
                  <th className="text-left px-6 py-3">Applied</th>
                  <th className="text-left px-6 py-3">Rollback</th>
                  <th className="text-left px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fixes.map((fix) => {
                  const statusColors = {
                    PENDING: 'bg-yellow-900 text-yellow-200',
                    APPLIED: 'bg-green-900 text-green-200',
                    ROLLED_BACK: 'bg-gray-700 text-gray-300',
                    FAILED: 'bg-red-900 text-red-200',
                  }

                  const daysLeftForRollback = fix.rollbackDeadline
                    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                    : null

                  return (
                    <tr key={fix.id} className="border-t border-gray-800 hover:bg-gray-800">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[fix.status]}`}>
                          {fix.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{fix.type.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{fix.description}</td>
                      <td className="px-6 py-4 text-gray-400">{fix.connection.domain}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {fix.appliedAt ? new Date(fix.appliedAt).toLocaleDateString() : 'Not applied'}
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {daysLeftForRollback !== null
                          ? daysLeftForRollback > 0
                            ? `${daysLeftForRollback} days left`
                            : 'Expired'
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
                          <button className="text-red-400 hover:text-red-300">Rollback</button>
                        ) : fix.status === 'PENDING' ? (
                          <button className="text-blue-400 hover:text-blue-300">Approve</button>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
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
