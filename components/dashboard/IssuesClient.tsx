'use client'

import Link from 'next/link'
import { AlertTriangle, ArrowUpRight, CheckCircle2, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeInUp } from '@/lib/animations'

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
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px">
              <div className="text-300">🔍</div>
            </div>
            <div className="flex-vertical">
              <h1 className="display-2 color-neutral-800">SEO Issues</h1>
              <p className="text-200 color-neutral-600">
                Detected SEO problems across all your sites
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid-4-columns _1-column-tablet gap-row-24px gap-column-12px"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItem}>
            <StatCard
              title="Total Issues"
              value={stats.totalIssues}
              icon="🔍"
              colorClass="color-accent-1"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              title="Critical"
              value={stats.criticalIssues}
              icon="🚨"
              colorClass="color-neutral-800"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              title="High Priority"
              value={stats.highIssues}
              icon="⚠️"
              colorClass="color-neutral-800"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              title="Medium Priority"
              value={stats.mediumIssues}
              icon="📊"
              colorClass="color-neutral-800"
            />
          </motion.div>
        </motion.div>

        {/* Issues List */}
        <div className="card pd-32px---24px">
          <div className="mg-bottom-24px">
            <h2 className="text-400 bold color-neutral-800">All Issues</h2>
          </div>

          {issues.length === 0 ? (
            <div className="flex-vertical gap-row-24px align-center text-center" style={{ padding: '64px 16px' }}>
              <div className="card-icon-square _40px neutral-icon">
                <div className="text-600">🎉</div>
              </div>
              <h3 className="text-300 bold color-neutral-800">
                No issues detected
              </h3>
              <p className="text-200 color-neutral-600 mg-bottom-16px">
                Connect a site and run a scan to detect SEO issues
              </p>
              <Link
                href="/dashboard/sites"
                className="btn-primary large"
              >
                <div className="flex-horizontal gap-column-8px align-center">
                  <Search className="w-5 h-5" />
                  <div>Connect Your First Site</div>
                </div>
              </Link>
            </div>
          ) : (
            <motion.div
              className="grid-1-column gap-row-12px"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {issues.map((issue) => (
                <motion.div key={issue.id} variants={staggerItem}>
                  <IssueRow issue={issue} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Issue Type Breakdown & How It Works */}
        <div className="grid-2-columns _1-column-mbl gap-row-24px gap-column-12px">
          <div className="card pd-32px---24px">
            <h3 className="text-300 bold color-neutral-800 mg-bottom-24px">Issue Types</h3>
            <div className="grid-1-column gap-row-12px">
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
            <h3 className="text-300 bold color-neutral-800 mg-bottom-24px">How It Works</h3>
            <div className="flex-vertical gap-row-24px">
              <HowItWorksStep icon="🔍" title="Automatic Scanning" description="We crawl your site and detect SEO issues using AI" />
              <HowItWorksStep icon="🤖" title="AI Analysis" description="Our AI analyzes each issue and generates fixes" />
              <HowItWorksStep icon="✅" title="Auto-Apply" description="Fixes are applied automatically based on your execution mode" />
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
      <div className="flex-horizontal space-between align-center mg-bottom-16px">
        <div className="card-icon-square _26px neutral-icon">
          <div className="text-200">{icon}</div>
        </div>
      </div>
      <div className="flex-vertical gap-row-12px">
        <p className="text-100 medium color-neutral-600">{title}</p>
        <div className="card-amount-container">
          <p className={`display-2 ${colorClass}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function IssueRow({ issue }: { issue: Issue }) {
  const severityBadge = {
    CRITICAL: 'red',
    HIGH: 'orange',
    MEDIUM: 'orange',
    LOW: 'green',
  }[issue.severity] || 'neutral'

  return (
    <div className="card pd-24px">
      <div className="flex-horizontal space-between align-center">
        <div className="flex-horizontal gap-column-16px align-center flex-1">
          <div className="card-icon-square _26px neutral-icon">
            <AlertTriangle className="w-3 h-3 color-neutral-600" />
          </div>
          <div className="flex-vertical gap-row-8px flex-1">
            <div className="flex-horizontal gap-column-12px align-center">
              <span className="text-200 medium color-neutral-800">{issue.type.replace(/_/g, ' ')}</span>
              <div className={`badge ${severityBadge}`}>
                <div className="text-50 medium">{issue.severity}</div>
              </div>
            </div>
            <p className="text-100 color-neutral-600">{issue.title}</p>
            <div className="flex-horizontal gap-column-16px">
              <div className="flex-horizontal gap-column-8px align-center">
                <div className="text-50 color-neutral-600">Site:</div>
                <div className="text-50 medium color-neutral-800">{issue.connection.domain}</div>
              </div>
              <a
                href={issue.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-horizontal gap-column-4px align-center text-50 medium color-accent-1"
              >
                View Page <ArrowUpRight className="w-3 h-3" />
              </a>
              <div className="text-50 color-neutral-600">
                Detected {new Date(issue.detectedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-horizontal gap-column-12px">
          {issue.fixes.length > 0 ? (
            <div className="flex-horizontal gap-column-8px align-center">
              <CheckCircle2 className="w-4 h-4 color-accent-1" />
              <span className="text-100 medium color-accent-1">Fixed</span>
            </div>
          ) : (
            <button className="btn-secondary">
              Create Fix
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function IssueTypeRow({ type, count }: { type: string; count: number }) {
  return (
    <div className="card pd-16px">
      <div className="flex-horizontal space-between align-center">
        <span className="text-200 medium color-neutral-800">{type}</span>
        <div className="badge primary">
          <div className="text-50 medium">{count}</div>
        </div>
      </div>
    </div>
  )
}

function HowItWorksStep({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex-horizontal gap-column-16px align-start">
      <div className="card-icon-square _40px neutral-icon">
        <div className="text-300">{icon}</div>
      </div>
      <div className="flex-vertical gap-row-4px">
        <p className="text-200 bold color-neutral-800">{title}</p>
        <p className="text-100 color-neutral-600">{description}</p>
      </div>
    </div>
  )
}
