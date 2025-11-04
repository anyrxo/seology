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
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <div className="text-300">✅</div>
            </div>
            <div className="flex-vertical">
              <h1 className="display-2 color-neutral-800">SEO Fixes</h1>
              <p className="text-200 color-neutral-600">
                Review, approve, and rollback automated SEO fixes
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
          <StatCard title="Total Fixes" value={stats.totalFixes} icon="✓" />
          <StatCard title="Pending Approval" value={stats.pendingFixes} icon="⏳" />
          <StatCard title="Applied This Month" value={stats.appliedThisMonth} icon="📊" />
          <StatCard title="Available Rollbacks" value={stats.availableRollbacks} icon="↩️" />
        </div>

        {/* Execution Mode Info */}
        <div className="card pd-32px---44px">
          <div className="flex-horizontal gap-column-24px align-center">
            <div className="card-icon-square _40px">
              <div className="text-600">{executionModeConfig.icon}</div>
            </div>
            <div className="flex-vertical flex-1">
              <div className="flex-horizontal gap-column-12px align-center mg-bottom-8px">
                <h3 className="text-300 bold color-neutral-800">Execution Mode:</h3>
                <div className="badge primary">
                  <div className="text-50 medium">{executionModeConfig.label}</div>
                </div>
              </div>
              <p className="text-200 color-neutral-600 mg-bottom-16px">
                {executionModeConfig.description}
              </p>
              <Link
                href="/dashboard/settings"
                className="text-100 medium color-accent-1"
              >
                Change Execution Mode →
              </Link>
            </div>
          </div>
        </div>

        {/* Fixes Table */}
        <div className="card pd-32px---24px">
          <div className="mg-bottom-24px">
            <h2 className="text-400 bold color-neutral-800">Recent Fixes</h2>
          </div>

          {fixes.length === 0 ? (
            <div className="flex-vertical gap-row-24px align-center text-center" style={{ padding: '64px 16px' }}>
              <div className="card-icon-square _40px neutral-icon">
                <div className="text-600">✨</div>
              </div>
              <h3 className="text-300 bold color-neutral-800">
                No fixes applied yet
              </h3>
              <p className="text-200 color-neutral-600 mg-bottom-16px">
                Once issues are detected, fixes will appear here for review or auto-application
              </p>
              <Link
                href="/dashboard/issues"
                className="btn-primary large"
              >
                View SEO Issues
              </Link>
            </div>
          ) : (
            <div className="w-layout-blockcontainer w-container">
              <div className="grid-1-column gap-row-12px">
                {fixes.map((fix) => (
                  <FixRow key={fix.id} fix={fix} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Rollback Safety Info */}
        <div className="card pd-32px---44px">
          <div className="flex-horizontal gap-column-16px align-center mg-bottom-24px">
            <div className="card-icon-square _40px">
              <RotateCcw className="w-5 h-5 color-accent-1" />
            </div>
            <h3 className="text-300 bold color-neutral-800">
              90-Day Rollback Protection
            </h3>
          </div>
          <p className="text-200 color-neutral-600 mg-bottom-32px">
            Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
          </p>
          <div className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px">
            {[
              { label: 'Before/After State Stored', description: 'Complete content backup', icon: '💾' },
              { label: 'One-Click Rollback', description: 'Instant reversion', icon: '⚡' },
              { label: 'Audit Trail', description: 'Full change history', icon: '📋' },
              { label: 'Automatic Cleanup', description: '90-day retention', icon: '🗑️' },
            ].map((item) => (
              <div key={item.label} className="card pd-24px">
                <div className="flex-vertical gap-row-12px">
                  <div className="card-icon-square _26px neutral-icon">
                    <div className="text-100">{item.icon}</div>
                  </div>
                  <p className="text-200 bold color-neutral-800">{item.label}</p>
                  <p className="text-100 color-neutral-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="card pd-24px">
      <div className="flex-horizontal space-between align-center mg-bottom-16px">
        <div className="card-icon-square _26px neutral-icon">
          <div className="text-200">{icon}</div>
        </div>
      </div>
      <div className="flex-vertical gap-row-12px">
        <p className="text-100 medium color-neutral-600">{title}</p>
        <div className="card-amount-container">
          <p className="display-2 color-neutral-800">{value}</p>
        </div>
      </div>
    </div>
  )
}

function FixRow({ fix }: { fix: Fix }) {
  const statusBadge = {
    PENDING: 'orange',
    APPLIED: 'green',
    ROLLED_BACK: 'neutral',
    FAILED: 'red',
  }[fix.status] || 'neutral'

  const daysLeftForRollback = fix.rollbackDeadline
    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div className="card pd-24px">
      <div className="flex-horizontal space-between align-center">
        <div className="flex-horizontal gap-column-16px align-center flex-1">
          <div className="card-icon-square _26px neutral-icon">
            <Settings className="w-3 h-3 color-neutral-600" />
          </div>
          <div className="flex-vertical gap-row-8px flex-1">
            <div className="flex-horizontal gap-column-12px align-center">
              <span className="text-200 medium color-neutral-800">{fix.type.replace(/_/g, ' ')}</span>
              <div className={`badge ${statusBadge}`}>
                <div className="text-50 medium">{fix.status}</div>
              </div>
            </div>
            <p className="text-100 color-neutral-600">{fix.description}</p>
            <div className="flex-horizontal gap-column-16px">
              <div className="flex-horizontal gap-column-8px align-center">
                <div className="text-50 color-neutral-600">Site:</div>
                <div className="text-50 medium color-neutral-800">{fix.connection.domain}</div>
              </div>
              {fix.appliedAt && (
                <div className="flex-horizontal gap-column-8px align-center">
                  <Clock className="w-3 h-3 color-neutral-600" />
                  <span className="text-50 color-neutral-600">
                    {new Date(fix.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              )}
              {daysLeftForRollback !== null && (
                <div className="text-50 color-accent-1">
                  {daysLeftForRollback > 0
                    ? `${daysLeftForRollback} days left to rollback`
                    : 'Rollback expired'}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-horizontal gap-column-12px">
          {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
            <button className="btn-secondary">
              <div className="flex-horizontal gap-column-6px align-center">
                <RotateCcw className="w-4 h-4" />
                <div>Rollback</div>
              </div>
            </button>
          ) : fix.status === 'PENDING' ? (
            <button className="btn-primary">
              <div className="flex-horizontal gap-column-6px align-center">
                <CheckCircle2 className="w-4 h-4" />
                <div>Approve</div>
              </div>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
