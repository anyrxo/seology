'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowUpRight, CheckCircle2, Search } from 'lucide-react'

interface Issue {
  id: string
  type: string
  title: string
  severity: string
  pageUrl: string
  detectedAt: Date
  connection: {
    id: string
    domain: string
  }
  fixes: Array<{
    id: string
    status: string
  }>
}

interface Stats {
  totalIssues: number
  criticalIssues: number
  highIssues: number
  mediumIssues: number
}

interface IssuesByType {
  type: string
  _count: { type: number }
}

interface IssuesClientProps {
  issues: Issue[]
  stats: Stats
  issuesByType: IssuesByType[]
}

export function IssuesClient({ issues, stats, issuesByType }: IssuesClientProps) {
  return (
    <div className="bg-neutral-200 min-h-screen">
      <div className="container-default w-container">
        <div className="gap-row-24px">
          {/* Header */}
          <div className="gap-row-24px">
            <h1 className="display-2 color-neutral-800">SEO Issues</h1>
            <p className="text-200 color-neutral-600">
              Detected SEO problems across all your sites
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid-3-columns gap-row-24px" style={{ marginTop: '32px', marginBottom: '32px' }}>
            <StatCard
              title="Total Issues"
              value={stats.totalIssues}
              icon="🔍"
              colorClass="color-accent-1"
            />
            <StatCard
              title="Critical"
              value={stats.criticalIssues}
              icon="🚨"
              colorClass="color-neutral-800"
            />
            <StatCard
              title="High Priority"
              value={stats.highIssues}
              icon="⚠️"
              colorClass="color-neutral-800"
            />
            <StatCard
              title="Medium Priority"
              value={stats.mediumIssues}
              icon="📊"
              colorClass="color-neutral-800"
            />
          </div>

          {/* Issues Table Card */}
          <div className="card pd-32px---24px" style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="text-500 bold color-neutral-800">All Issues</h2>
            </div>

            {issues.length === 0 ? (
              <div style={{ padding: '64px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '24px' }}>🎉</div>
                <h3 className="text-300 bold color-neutral-800" style={{ marginBottom: '12px' }}>
                  No issues detected
                </h3>
                <p className="text-200 color-neutral-600" style={{ marginBottom: '32px' }}>
                  Connect a site and run a scan to detect SEO issues
                </p>
                <Link
                  href="/dashboard/sites"
                  className="btn-primary large"
                >
                  <Search className="h-5 w-5" style={{ marginRight: '8px' }} />
                  Connect Your First Site
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Severity</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Issue Type</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Description</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Page</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Site</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Detected</th>
                      <th className="text-100 color-neutral-600" style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((issue) => (
                      <IssueRow key={issue.id} issue={issue} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Issue Type Breakdown Grid */}
          <div className="grid-3-columns gap-row-24px">
            <div className="card pd-32px---24px">
              <h3 className="text-300 bold color-neutral-800" style={{ marginBottom: '24px' }}>Issue Types</h3>
              <div className="gap-row-24px">
                {issuesByType.length > 0 ? (
                  issuesByType.map((item) => (
                    <IssueTypeRow
                      key={item.type}
                      type={item.type.replace(/_/g, ' ')}
                      count={item._count.type}
                    />
                  ))
                ) : (
                  <>
                    <IssueTypeRow type="Missing Meta Tags" count={0} />
                    <IssueTypeRow type="Broken Links" count={0} />
                    <IssueTypeRow type="Missing Alt Text" count={0} />
                    <IssueTypeRow type="Slow Page Speed" count={0} />
                    <IssueTypeRow type="Duplicate Content" count={0} />
                  </>
                )}
              </div>
            </div>

            <div className="card pd-32px---24px">
              <h3 className="text-300 bold color-neutral-800" style={{ marginBottom: '24px' }}>How It Works</h3>
              <div className="gap-row-24px">
                <HowItWorksStep icon="🔍" title="Automatic Scanning" description="We crawl your site and detect SEO issues using AI" />
                <HowItWorksStep icon="🤖" title="AI Analysis" description="Claude AI analyzes each issue and generates fixes" />
                <HowItWorksStep icon="✅" title="Auto-Apply" description="Fixes are applied automatically based on your execution mode" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, colorClass }: { title: string; value: number; icon: string; colorClass: string }) {
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
      <p className={`text-500 bold ${colorClass}`}>{value}</p>
    </div>
  )
}

function IssueRow({ issue }: { issue: Issue }) {
  const severityBadge = {
    CRITICAL: 'badge red',
    HIGH: 'badge orange',
    MEDIUM: 'badge orange',
    LOW: 'badge green',
  }[issue.severity] || 'badge'

  return (
    <tr style={{ borderTop: '1px solid #e5e7eb' }}>
      <td style={{ padding: '16px' }}>
        <span className={severityBadge}>
          {issue.severity}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-200 color-neutral-800">{issue.type.replace(/_/g, ' ')}</span>
      </td>
      <td style={{ padding: '16px', maxWidth: '300px' }}>
        <span className="text-100 color-neutral-600" style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'block'
        }}>{issue.title}</span>
      </td>
      <td style={{ padding: '16px', maxWidth: '200px' }}>
        <a
          href={issue.pageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-100 color-accent-1"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block'
          }}
        >
          {issue.pageUrl}
        </a>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 color-neutral-600">{issue.connection.domain}</span>
      </td>
      <td style={{ padding: '16px' }}>
        <span className="text-100 color-neutral-600">
          {new Date(issue.detectedAt).toLocaleDateString()}
        </span>
      </td>
      <td style={{ padding: '16px' }}>
        {issue.fixes.length > 0 ? (
          <span className="text-100 color-accent-1 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Fixed
          </span>
        ) : (
          <button className="btn-secondary" style={{ fontSize: '14px', padding: '8px 16px' }}>
            Create Fix
          </button>
        )}
      </td>
    </tr>
  )
}

function IssueTypeRow({ type, count }: { type: string; count: number }) {
  return (
    <div className="flex-horizontal space-between align-center" style={{
      padding: '12px 16px',
      background: '#f9fafb',
      borderRadius: '8px'
    }}>
      <span className="text-200 color-neutral-800">{type}</span>
      <span className="text-200 bold color-neutral-600">{count}</span>
    </div>
  )
}

function HowItWorksStep({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex-horizontal align-center" style={{ gap: '16px' }}>
      <div style={{ fontSize: '32px', flexShrink: 0 }}>{icon}</div>
      <div>
        <p className="text-200 bold color-neutral-800" style={{ marginBottom: '4px' }}>{title}</p>
        <p className="text-100 color-neutral-600">{description}</p>
      </div>
    </div>
  )
}
