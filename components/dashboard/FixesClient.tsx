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
      description: 'Claude AI creates a plan of all fixes. You approve once, and all fixes execute together.',
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
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="gap-row-24px">
            <h1 className="display-2 color-neutral-800">SEO Fixes</h1>
            <p className="text-200 color-neutral-600">
              Review, approve, and rollback automated SEO fixes
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid-3-columns gap-row-24px" style={{ marginTop: '32px', marginBottom: '32px' }}>
            <StatCard title="Total Fixes" value={stats.totalFixes} icon="✓" />
            <StatCard title="Pending Approval" value={stats.pendingFixes} icon="⏳" />
            <StatCard title="Applied This Month" value={stats.appliedThisMonth} icon="📊" />
            <StatCard title="Available Rollbacks" value={stats.availableRollbacks} icon="↩️" />
          </div>

          {/* Execution Mode Info */}
          <div className="card pd-32px---44px" style={{ marginBottom: '32px' }}>
            <div className="flex-horizontal align-center gap-column-24px">
              <div className="card-icon-square _40px flex-horizontal" style={{
                width: '64px',
                height: '64px',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '32px' }}>{executionModeConfig.icon}</span>
              </div>
              <div className="flex-vertical" style={{ flex: 1 }}>
                <h3 className="text-300 bold color-neutral-800 mg-bottom-8px">
                  Execution Mode: <span className="primary-badge light">{executionModeConfig.label}</span>
                </h3>
                <p className="text-200 medium color-neutral-600 mg-bottom-16px">
                  {executionModeConfig.description}
                </p>
                <Link
                  href="/dashboard/settings"
                  className="text-100 medium color-accent-1 hover-opacity-85"
                  style={{ textDecoration: 'none' }}
                >
                  Change Execution Mode →
                </Link>
              </div>
            </div>
          </div>

          {/* Fixes Table */}
          <div className="card pd-32px---24px" style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="text-500 bold color-neutral-800">Recent Fixes</h2>
            </div>

            {fixes.length === 0 ? (
              <div style={{ padding: '64px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>✨</div>
                <h3 className="text-300 bold color-neutral-800" style={{ marginBottom: '12px' }}>
                  No fixes applied yet
                </h3>
                <p className="text-200 color-neutral-600" style={{ marginBottom: '32px' }}>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Status</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Fix Type</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Description</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Site</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Applied</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Rollback</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixes.map((fix) => (
                      <FixRow key={fix.id} fix={fix} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Rollback Safety Info */}
          <div className="rt-component-section card pd-32px---44px">
            <div className="flex-horizontal align-center gap-column-16px mg-bottom-24px">
              <div className="card-icon-square _40px flex-horizontal" style={{ flexShrink: 0 }}>
                <RotateCcw className="h-5 w-5" />
              </div>
              <h3 className="text-300 bold color-neutral-800">
                90-Day Rollback Protection
              </h3>
            </div>
            <p className="text-200 medium color-neutral-600 mg-bottom-32px">
              Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
            </p>
            <div className="grid-2-columns gap-row-24px gap-column-24px">
              {[
                { label: 'Before/After State Stored', description: 'Complete content backup', icon: '💾' },
                { label: 'One-Click Rollback', description: 'Instant reversion', icon: '⚡' },
                { label: 'Audit Trail', description: 'Full change history', icon: '📋' },
                { label: 'Automatic Cleanup', description: '90-day retention', icon: '🗑️' },
              ].map((item) => (
                <div key={item.label} className="card pd-24px">
                  <div className="flex-horizontal align-start gap-column-12px">
                    <div className="card-icon-square _26px neutral-icon flex-horizontal" style={{ flexShrink: 0 }}>
                      <span style={{ fontSize: '14px' }}>{item.icon}</span>
                    </div>
                    <div className="flex-vertical">
                      <p className="text-200 bold color-neutral-800 mg-bottom-4px">{item.label}</p>
                      <p className="text-100 medium color-neutral-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="card pd-32px---24px">
      <div className="card-icon-square neutral-icon flex-horizontal mg-bottom-16px" style={{
        width: '48px',
        height: '48px'
      }}>
        <span style={{ fontSize: '24px' }}>{icon}</span>
      </div>
      <div className="flex-vertical">
        <p className="text-100 medium color-neutral-600 mg-bottom-8px">{title}</p>
        <div className="card-amount-container green">
          <p className="text-600 bold color-accent-1">{value}</p>
        </div>
      </div>
    </div>
  )
}

function FixRow({ fix }: { fix: Fix }) {
  const statusBadge = {
    PENDING: 'color-badge orange',
    APPLIED: 'color-badge green',
    ROLLED_BACK: 'neutral-badge neutral-300',
    FAILED: 'color-badge red',
  }[fix.status] || 'neutral-badge'

  const daysLeftForRollback = fix.rollbackDeadline
    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <tr style={{ borderTop: '1px solid var(--neutral--300)' }}>
      <td style={{ padding: '16px' }}>
        <span className={statusBadge}>
          {fix.status}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <div className="flex-horizontal gap-column-12px justify-start">
          <div className="card-icon-square _26px neutral-icon flex-horizontal" style={{ flexShrink: 0 }}>
            <Settings className="h-3 w-3" />
          </div>
          <span className="text-200 medium color-neutral-800">{fix.type.replace(/_/g, ' ')}</span>
        </div>
      </td>
      <td style={{ padding: '16px', maxWidth: '300px' }}>
        <span className="text-100 medium color-neutral-600" style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block'
        }}>{fix.description}</span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 medium color-neutral-600">{fix.connection.domain}</span>
      </td>
      <td style={{ padding: '16px' }}>
        <div className="flex-horizontal gap-column-8px justify-start">
          <Clock className="h-4 w-4 color-neutral-600" />
          <span className="text-100 medium color-neutral-600">
            {fix.appliedAt ? new Date(fix.appliedAt).toLocaleDateString() : 'Not applied'}
          </span>
        </div>
      </td>
      <td style={{ padding: '16px' }}>
        <span className={`text-100 medium ${daysLeftForRollback && daysLeftForRollback > 0 ? 'color-accent-1' : 'color-neutral-600'}`}>
          {daysLeftForRollback !== null
            ? daysLeftForRollback > 0
              ? `${daysLeftForRollback} days left`
              : 'Expired'
            : 'N/A'}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <div className="flex-horizontal gap-column-12px justify-start">
          {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
            <button className="btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
              <RotateCcw className="h-3 w-3" style={{ display: 'inline', marginRight: '6px' }} />
              Rollback
            </button>
          ) : fix.status === 'PENDING' ? (
            <button className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
              <CheckCircle2 className="h-3 w-3" style={{ display: 'inline', marginRight: '6px' }} />
              Approve
            </button>
          ) : (
            <span className="text-100 color-neutral-600">-</span>
          )}
        </div>
      </td>
    </tr>
  )
}
