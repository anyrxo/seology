'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, RotateCcw, Settings } from 'lucide-react'

interface Fix {
  id: string
  type: string
  description: string
  status: string
  appliedAt: Date | null
  rollbackDeadline: Date | null
  connection: {
    id: string
    domain: string
  }
}

interface Stats {
  totalFixes: number
  pendingFixes: number
  appliedThisMonth: number
  availableRollbacks: number
}

interface FixesClientProps {
  fixes: Fix[]
  stats: Stats
  executionMode: string
}

export function FixesClient({ fixes, stats, executionMode }: FixesClientProps) {
  const executionModeConfig = {
    AUTOMATIC: {
      label: 'Automatic',
      description: 'Fixes are applied automatically without approval. All changes include 90-day rollback.',
      icon: '⚡'
    },
    PLAN: {
      label: 'Plan Mode',
      description: 'Our AI creates a plan of all fixes. You approve once, and all fixes execute together.',
      icon: '📋'
    },
    APPROVE: {
      label: 'Approve Mode',
      description: 'Each fix requires individual approval before application. Maximum control.',
      icon: '✋'
    },
  }[executionMode] || {
    label: executionMode,
    description: '',
    icon: '⚙️'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10">
          <div className="text-2xl">✅</div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">SEO Fixes</h1>
          <p className="text-gray-400">
            Review, approve, and rollback automated SEO fixes
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Fixes" value={stats.totalFixes} icon="✓" />
        <StatCard title="Pending Approval" value={stats.pendingFixes} icon="⏳" />
        <StatCard title="Applied This Month" value={stats.appliedThisMonth} icon="📊" />
        <StatCard title="Available Rollbacks" value={stats.availableRollbacks} icon="↩️" />
      </div>

      {/* Execution Mode Info */}
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 flex-shrink-0">
            <div className="text-3xl">{executionModeConfig.icon}</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">Execution Mode:</h3>
              <div className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {executionModeConfig.label}
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {executionModeConfig.description}
            </p>
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
            >
              Change Execution Mode →
            </Link>
          </div>
        </div>
      </div>

      {/* Fixes Table */}
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">Recent Fixes</h2>
        </div>

        {fixes.length === 0 ? (
          <div className="flex flex-col items-center text-center py-16">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 mb-6">
              <div className="text-3xl">✨</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No fixes applied yet
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Once issues are detected, fixes will appear here for review or auto-application
            </p>
            <Link
              href="/dashboard/issues"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
            >
              View SEO Issues
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {fixes.map((fix) => (
              <FixRow key={fix.id} fix={fix} />
            ))}
          </div>
        )}
      </div>

      {/* Rollback Safety Info */}
      <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
            <RotateCcw className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">
            90-Day Rollback Protection
          </h3>
        </div>
        <p className="text-gray-400 mb-8 max-w-3xl">
          Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Before/After State Stored', description: 'Complete content backup', icon: '💾' },
            { label: 'One-Click Rollback', description: 'Instant reversion', icon: '⚡' },
            { label: 'Audit Trail', description: 'Full change history', icon: '📋' },
            { label: 'Automatic Cleanup', description: '90-day retention', icon: '🗑️' },
          ].map((item) => (
            <div key={item.label} className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
                  <div className="text-lg">{item.icon}</div>
                </div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10">
          <div className="text-base">{icon}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}

function FixRow({ fix }: { fix: Fix }) {
  const statusBadge = {
    PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    APPLIED: 'bg-green-500/10 text-green-400 border-green-500/20',
    ROLLED_BACK: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    FAILED: 'bg-red-500/10 text-red-400 border-red-500/20',
  }[fix.status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'

  const daysLeftForRollback = fix.rollbackDeadline
    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:scale-[1.01] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl border border-white/10 flex-shrink-0">
            <Settings className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex flex-col gap-2 flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-white">{fix.type.replace(/_/g, ' ')}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge}`}>
                {fix.status}
              </div>
            </div>
            <p className="text-sm text-gray-400 line-clamp-1">{fix.description}</p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="text-xs text-gray-500">Site:</div>
                <div className="text-xs font-medium text-gray-300">{fix.connection.domain}</div>
              </div>
              {fix.appliedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-500">
                    {new Date(fix.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {daysLeftForRollback !== null && (
                <div className="text-xs text-blue-400">
                  {daysLeftForRollback > 0
                    ? `${daysLeftForRollback} days left to rollback`
                    : 'Rollback expired'}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
            <button className="px-4 py-2 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <div className="text-sm font-medium">Rollback</div>
              </div>
            </button>
          ) : fix.status === 'PENDING' ? (
            <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <div className="text-sm font-medium">Approve</div>
              </div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
