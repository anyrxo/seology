import { auth } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ success?: string; error?: string }>
}

export default async function SiteDetailPage({ params, searchParams }: PageProps) {
  const { userId } = await auth()
  const { id } = await params
  const search = await searchParams

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Get connection with full details
  const connection = await db.connection.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      issues: {
        orderBy: { detectedAt: 'desc' },
        take: 100,
      },
      fixes: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      metrics: {
        orderBy: { date: 'desc' },
        take: 30,
      },
      crawls: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      _count: {
        select: {
          issues: true,
          fixes: true,
        },
      },
    },
  })

  if (!connection) {
    notFound()
  }

  const platformEmoji = {
    SHOPIFY: '🛍️',
    WORDPRESS: '📝',
    WIX: '🎨',
    CUSTOM: '⚡',
  }[connection.platform] || '🌐'

  const statusColor = {
    CONNECTED: 'bg-green-900 text-green-200',
    PENDING: 'bg-yellow-900 text-yellow-200',
    ERROR: 'bg-red-900 text-red-200',
    DISCONNECTED: 'bg-gray-700 text-gray-400',
  }[connection.status] || 'bg-gray-700 text-gray-400'

  const activeIssues = connection.issues.filter((i) => i.status !== 'FIXED')
  const criticalIssues = activeIssues.filter((i) => i.severity === 'CRITICAL')
  const highIssues = activeIssues.filter((i) => i.severity === 'HIGH')

  return (
    <div className="space-y-8">
      {/* Success/Error Messages */}
      {search.success === 'shopify_connected' && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 flex items-start">
          <svg
            className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-green-200 font-semibold mb-1">
              Shopify Store Connected Successfully!
            </h4>
            <p className="text-green-300 text-sm">
              You can now analyze your store for SEO issues and apply AI-powered fixes.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <Link
          href="/dashboard/sites"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center mb-4"
        >
          ← Back to Sites
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">{platformEmoji}</div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {connection.displayName || connection.domain}
              </h1>
              <div className="flex items-center space-x-3">
                <p className="text-gray-400">{connection.domain}</p>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
                  {connection.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <AnalyzeButton connectionId={connection.id} />
            <DeleteSiteButton connectionId={connection.id} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={activeIssues.length.toString()}
          icon="⚠️"
          color="text-yellow-400"
        />
        <StatCard
          title="Critical"
          value={criticalIssues.length.toString()}
          icon="🔴"
          color="text-red-400"
        />
        <StatCard
          title="Fixes Applied"
          value={connection._count.fixes.toString()}
          icon="✓"
          color="text-green-400"
        />
        <StatCard
          title="Last Scan"
          value={connection.lastSync ? 'Today' : 'Never'}
          icon="🔍"
          color="text-blue-400"
        />
      </div>

      {/* Magic Script Section (for CUSTOM platform) */}
      {connection.platform === 'CUSTOM' && <MagicScriptSection siteId={connection.id} />}

      {/* Issues Section */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">SEO Issues</h2>
          <div className="flex items-center space-x-2">
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
              <option>All Severities</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
              <option>All Types</option>
              <option>Missing Meta</option>
              <option>Broken Links</option>
              <option>Missing Alt Text</option>
              <option>Poor Structure</option>
            </select>
          </div>
        </div>

        {activeIssues.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Issues Found</h3>
            <p className="text-gray-400 mb-6">
              {connection.lastSync
                ? 'Your site is SEO optimized!'
                : 'Run your first analysis to detect issues'}
            </p>
            {!connection.lastSync && <AnalyzeButton connectionId={connection.id} />}
          </div>
        ) : (
          <div className="space-y-4">
            {activeIssues.slice(0, 10).map((issue) => {
              const details = JSON.parse(issue.details)
              return (
                <IssueCard
                  key={issue.id}
                  severity={issue.severity}
                  title={details.title}
                  description={details.description}
                  pageUrl={issue.pageUrl}
                  recommendation={details.recommendation}
                  status={issue.status}
                />
              )
            })}
            {activeIssues.length > 10 && (
              <p className="text-center text-gray-400 text-sm pt-4">
                And {activeIssues.length - 10} more issues...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Recent Fixes Section */}
      {connection.fixes.length > 0 && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Fixes</h2>
          <div className="space-y-3">
            {connection.fixes.slice(0, 5).map((fix) => (
              <FixCard
                key={fix.id}
                type={fix.type}
                targetUrl={fix.targetUrl || 'N/A'}
                status={fix.status}
                appliedAt={fix.appliedAt}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: string
  icon: string
  color: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function IssueCard({
  severity,
  title,
  description,
  pageUrl,
  recommendation,
  status,
}: {
  severity: string
  title: string
  description: string
  pageUrl: string
  recommendation: string
  status: string
}) {
  const severityColors = {
    CRITICAL: 'bg-red-900 text-red-200',
    HIGH: 'bg-orange-900 text-orange-200',
    MEDIUM: 'bg-yellow-900 text-yellow-200',
    LOW: 'bg-blue-900 text-blue-200',
  }

  const severityColor = severityColors[severity as keyof typeof severityColors] || 'bg-gray-700 text-gray-400'

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${severityColor}`}>
              {severity}
            </span>
            <h3 className="text-white font-semibold">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-2">{description}</p>
          <p className="text-gray-500 text-xs">
            Page: <span className="text-blue-400">{pageUrl}</span>
          </p>
        </div>
      </div>
      <div className="bg-gray-900 border border-gray-700 rounded p-3 mt-3">
        <p className="text-xs text-gray-400 mb-1">Recommendation:</p>
        <p className="text-sm text-gray-300">{recommendation}</p>
      </div>
    </div>
  )
}

function FixCard({
  type,
  targetUrl,
  status,
  appliedAt,
}: {
  type: string
  targetUrl: string
  status: string
  appliedAt: Date | null
}) {
  const statusColors = {
    PENDING: 'bg-yellow-900 text-yellow-200',
    APPLIED: 'bg-green-900 text-green-200',
    ROLLED_BACK: 'bg-gray-700 text-gray-400',
    FAILED: 'bg-red-900 text-red-200',
  }

  const statusColor = statusColors[status as keyof typeof statusColors] || 'bg-gray-700 text-gray-400'

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex-1">
        <p className="text-white font-medium text-sm">{type}</p>
        <p className="text-gray-500 text-xs">{targetUrl}</p>
      </div>
      <div className="flex items-center space-x-3">
        {appliedAt && (
          <span className="text-gray-500 text-xs">
            {new Date(appliedAt).toLocaleDateString()}
          </span>
        )}
        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  )
}

function AnalyzeButton({ connectionId }: { connectionId: string }) {
  return (
    <form action={`/api/sites/${connectionId}/analyze`} method="POST">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Analyze Site
      </button>
    </form>
  )
}

function DeleteSiteButton({ connectionId }: { connectionId: string }) {
  return (
    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
      Delete Site
    </button>
  )
}

function MagicScriptSection({ siteId }: { siteId: string }) {
  const scriptCode = `<!-- SEOLOGY.AI Magic Script -->
<script src="https://cdn.seology.ai/magic.js" data-site-id="${siteId}"></script>
<!-- End SEOLOGY.AI -->`

  return (
    <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
      <div className="flex items-start space-x-4 mb-4">
        <svg
          className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-white font-semibold mb-2">Installation Script</h3>
          <p className="text-blue-200 text-sm mb-4">
            Add this script to your website's <code className="bg-blue-800 px-2 py-1 rounded">&lt;head&gt;</code> tag to enable automatic SEO fixes
          </p>
          <pre className="bg-gray-950 border border-gray-700 rounded p-4 text-sm text-gray-300 overflow-x-auto">
            {scriptCode}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(scriptCode)}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  )
}
