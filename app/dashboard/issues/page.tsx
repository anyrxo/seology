import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function IssuesPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

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
          <select className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white">
            <option>All Sites</option>
            <option>All Severities</option>
            <option>All Types</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Scan All Sites
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <IssueStatCard title="Total Issues" value="0" severity="all" />
        <IssueStatCard title="Critical" value="0" severity="critical" />
        <IssueStatCard title="Warning" value="0" severity="warning" />
        <IssueStatCard title="Info" value="0" severity="info" />
      </div>

      {/* Issues Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold text-white">All Issues</h2>
        </div>

        {/* Empty State */}
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No issues detected yet
          </h3>
          <p className="text-gray-400 mb-6">
            Connect a site and run a scan to detect SEO issues
          </p>
          <a
            href="/dashboard/sites"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Connect Your First Site
          </a>
        </div>

        {/* Table Header (hidden when empty) */}
        {/* <div className="overflow-x-auto">
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
              <tr className="border-t border-gray-800 hover:bg-gray-800">
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-900 text-red-200">
                    Critical
                  </span>
                </td>
                <td className="px-6 py-4 text-white">Missing Meta Description</td>
                <td className="px-6 py-4 text-gray-400">Product page is missing meta description</td>
                <td className="px-6 py-4 text-gray-400">/products/example</td>
                <td className="px-6 py-4 text-gray-400">example.com</td>
                <td className="px-6 py-4 text-gray-400">2 hours ago</td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300">Create Fix</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>

      {/* Issue Type Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Issue Types</h3>
          <div className="space-y-3">
            <IssueTypeRow type="Missing Meta Tags" count={0} />
            <IssueTypeRow type="Broken Links" count={0} />
            <IssueTypeRow type="Missing Alt Text" count={0} />
            <IssueTypeRow type="Slow Page Speed" count={0} />
            <IssueTypeRow type="Duplicate Content" count={0} />
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
