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
          <div className="card pd-32px---24px" style={{ marginBottom: '32px' }}>
            <div className="flex-horizontal align-center" style={{ gap: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                flexShrink: 0
              }}>
                {executionModeConfig.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="text-300 bold color-neutral-800" style={{ marginBottom: '8px' }}>
                  Execution Mode: <span className="color-accent-1">{executionModeConfig.label}</span>
                </h3>
                <p className="text-200 color-neutral-600" style={{ marginBottom: '16px' }}>
                  {executionModeConfig.description}
                </p>
                <Link
                  href="/dashboard/settings"
                  className="text-100 color-accent-1"
                  style={{ fontWeight: 500 }}
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
          <div className="card pd-32px---24px">
            <h3 className="text-300 bold color-neutral-800 flex-horizontal align-center" style={{ marginBottom: '24px', gap: '12px' }}>
              <RotateCcw className="h-6 w-6" />
              90-Day Rollback Protection
            </h3>
            <p className="text-200 color-neutral-600" style={{ marginBottom: '24px' }}>
              Every fix includes the original content state, allowing you to safely revert any changes within 90 days. After 90 days, rollback data is automatically cleaned up for compliance.
            </p>
            <div className="grid-3-columns gap-row-24px">
              {[
                { label: 'Before/After State Stored', description: 'Complete content backup' },
                { label: 'One-Click Rollback', description: 'Instant reversion' },
                { label: 'Audit Trail', description: 'Full change history' },
                { label: 'Automatic Cleanup', description: '90-day retention' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex-horizontal align-center"
                  style={{
                    gap: '12px',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px'
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 color-accent-1" style={{ flexShrink: 0 }} />
                  <div>
                    <p className="text-100 bold color-neutral-800" style={{ marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-100 color-neutral-600">{item.description}</p>
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
    <div className="card pd-24px">
      <div style={{
        width: '56px',
        height: '56px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '16px'
      }}>
        {icon}
      </div>
      <p className="text-100 color-neutral-600" style={{ marginBottom: '8px' }}>{title}</p>
      <p className="text-500 bold color-accent-1">{value}</p>
    </div>
  )
}

function FixRow({ fix }: { fix: Fix }) {
  const statusBadge = {
    PENDING: 'badge orange',
    APPLIED: 'badge green',
    ROLLED_BACK: 'badge',
    FAILED: 'badge red',
  }[fix.status] || 'badge'

  const daysLeftForRollback = fix.rollbackDeadline
    ? Math.max(0, Math.ceil((new Date(fix.rollbackDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <tr style={{ borderTop: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px' }}>
        <span className={statusBadge}>
          {fix.status}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-200 color-neutral-800">{fix.type.replace(/_/g, ' ')}</span>
      </td>
      <td style={{ padding: '16px', maxWidth: '300px' }}>
        <span className="text-100 color-neutral-600" style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block'
        }}>{fix.description}</span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 color-neutral-600">{fix.connection.domain}</span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 color-neutral-600">
          {fix.appliedAt ? new Date(fix.appliedAt).toLocaleDateString() : 'Not applied'}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 color-neutral-600">
          {daysLeftForRollback !== null
            ? daysLeftForRollback > 0
              ? `${daysLeftForRollback} days left`
              : 'Expired'
            : 'N/A'}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        {fix.status === 'APPLIED' && daysLeftForRollback && daysLeftForRollback > 0 ? (
          <button className="btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
            Rollback
          </button>
        ) : fix.status === 'PENDING' ? (
          <button className="btn-primary" style={{ fontSize: '14px', padding: '8px 16px' }}>
            Approve
          </button>
        ) : (
          <span className="text-100 color-neutral-600">-</span>
        )}
      </td>
    </tr>
  )
}
