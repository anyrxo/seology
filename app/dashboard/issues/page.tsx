import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import Link from 'next/link'
import { Severity, Prisma } from '@prisma/client'

export default async function IssuesPage({
  searchParams,
}: {
  searchParams: { severity?: string; type?: string; connectionId?: string }
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
  const where: Prisma.IssueWhereInput = {
    connection: {
      userId: dbUser.id,
    },
    status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
  }

  // Add severity filter with proper type checking
  if (searchParams.severity) {
    const severityUpper = searchParams.severity.toUpperCase()
    if (Object.values(Severity).includes(severityUpper as Severity)) {
      where.severity = severityUpper as Severity
    }
  }

  if (searchParams.type) {
    where.type = searchParams.type
  }

  if (searchParams.connectionId) {
    where.connectionId = searchParams.connectionId
  }

  // Get issues
  const issues = await db.issue.findMany({
    where,
    include: {
      connection: true,
      fixes: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
    take: 100,
  })

  // Get all connections for filter
  const connections = await db.connection.findMany({
    where: { userId: dbUser.id },
    select: { id: true, domain: true, displayName: true },
  })

  // Calculate stats
  const totalIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
    },
  })

  const criticalIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'CRITICAL',
    },
  })

  const highIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'HIGH',
    },
  })

  const mediumIssues = await db.issue.count({
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
      severity: 'MEDIUM',
    },
  })

  // Get issue type breakdown
  const issuesByType = await db.issue.groupBy({
    by: ['type'],
    where: {
      connection: { userId: dbUser.id },
      status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] },
    },
    _count: { type: true },
    orderBy: { _count: { type: 'desc' } },
    take: 5,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">SEO Issues</h1>
          <p className="text-gray-400">
            Detected SEO problems across all your sites
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/sites"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            Scan Sites
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <IssueStatCard title="Total Issues" value={totalIssues.toString()} severity="all" />
        <IssueStatCard title="Critical" value={criticalIssues.toString()} severity="critical" />
        <IssueStatCard title="High" value={highIssues.toString()} severity="warning" />
        <IssueStatCard title="Medium" value={mediumIssues.toString()} severity="info" />
      </div>

      {/* Issues Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">All Issues</h2>
        </div>

        {issues.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No issues detected yet
            </h3>
            <p className="text-gray-400 mb-6">
              Connect a site and run a scan to detect SEO issues
            </p>
            <Link
              href="/dashboard/sites"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Connect Your First Site
            </Link>
          </div>
        ) : (
          /* Issues Table */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-gray-400 text-sm">
                <tr>
                  <th className="text-left px-6 py-3">Severity</th>
                  <th className="text-left px-6 py-3">Issue Type</th>
                  <th className="text-left px-6 py-3">Description</th>
                  <th className="text-left px-6 py-3">Page</th>
                  <th className="text-left px-6 py-3">Site</th>
                  <th className="text-left px-6 py-3">Detected</th>
                  <th className="text-left px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => {
                  const severityColors = {
                    CRITICAL: 'bg-red-900 text-red-200',
                    HIGH: 'bg-orange-900 text-orange-200',
                    MEDIUM: 'bg-yellow-900 text-yellow-200',
                    LOW: 'bg-blue-900 text-blue-200',
                  }

                  return (
                    <tr key={issue.id} className="border-t border-gray-800 hover:bg-gray-800">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severityColors[issue.severity]}`}>
                          {issue.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">{issue.type.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate">{issue.title}</td>
                      <td className="px-6 py-4 text-gray-400 max-w-xs truncate">
                        <a href={issue.pageUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                          {issue.pageUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{issue.connection.domain}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(issue.detectedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {issue.fixes.length > 0 ? (
                          <span className="text-green-400 text-sm">Fixed</span>
                        ) : (
                          <button className="text-blue-400 hover:text-blue-300">Create Fix</button>
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

      {/* Issue Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Issue Types</h3>
          <div className="space-y-3">
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

        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="text-white font-medium">Automatic Scanning</p>
                <p>We crawl your site and detect SEO issues using AI</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-white font-medium">AI Analysis</p>
                <p>Claude AI analyzes each issue and generates fixes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-white font-medium">Auto-Apply</p>
                <p>Fixes are applied automatically based on your execution mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IssueStatCard({
  title,
  value,
  severity,
}: {
  title: string
  value: string
  severity: 'all' | 'critical' | 'warning' | 'info'
}) {
  const colors = {
    all: 'bg-gray-800 text-white',
    critical: 'bg-red-900 text-red-200',
    warning: 'bg-yellow-900 text-yellow-200',
    info: 'bg-blue-900 text-blue-200',
  }

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${colors[severity]}`}>{value}</p>
    </div>
  )
}

function IssueTypeRow({ type, count }: { type: string; count: number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-300">{type}</span>
      <span className="text-gray-500 font-semibold">{count}</span>
    </div>
  )
}
