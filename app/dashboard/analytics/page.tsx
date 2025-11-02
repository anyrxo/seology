import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AnalyticsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Mock data - in production, fetch from database
  const analyticsData = {
    issuesFixed: 247,
    timeSaved: '18.5 hrs',
    seoScoreImprovement: '+34%',
    pagesOptimized: 156,
    weeklyData: [
      { week: 'Week 1', issues: 45, fixes: 38 },
      { week: 'Week 2', issues: 52, fixes: 48 },
      { week: 'Week 3', issues: 38, fixes: 35 },
      { week: 'Week 4', issues: 61, fixes: 58 },
    ],
    issueBreakdown: [
      { type: 'Missing Meta Tags', count: 89, percentage: 36 },
      { type: 'Missing Alt Text', count: 64, percentage: 26 },
      { type: 'Poor Headings', count: 45, percentage: 18 },
      { type: 'Broken Links', count: 32, percentage: 13 },
      { type: 'Other', count: 17, percentage: 7 },
    ],
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-semibold mb-3">
          📊 Analytics Dashboard
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          SEO Performance Analytics
        </h1>
        <p className="text-gray-400">
          Track your SEO improvements powered by Claude AI
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          label="Issues Fixed by AI"
          value={analyticsData.issuesFixed.toString()}
          change="+23% vs last month"
          icon="✅"
          gradient="from-green-600 to-emerald-600"
        />
        <MetricCard
          label="Time Saved"
          value={analyticsData.timeSaved}
          change="Automated by Claude"
          icon="⏱️"
          gradient="from-blue-600 to-cyan-600"
        />
        <MetricCard
          label="SEO Score Growth"
          value={analyticsData.seoScoreImprovement}
          change="Since using AI"
          icon="📈"
          gradient="from-purple-600 to-pink-600"
        />
        <MetricCard
          label="Pages Optimized"
          value={analyticsData.pagesOptimized.toString()}
          change="Across all sites"
          icon="🌐"
          gradient="from-orange-600 to-red-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Weekly Activity
          </h2>
          <div className="space-y-4">
            {analyticsData.weeklyData.map((week, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">{week.week}</span>
                  <span className="text-white text-sm font-medium">
                    {week.fixes} / {week.issues} fixed
                  </span>
                </div>
                <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all"
                    style={{ width: `${(week.fixes / week.issues) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issue Breakdown */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Issue Types Breakdown
          </h2>
          <div className="space-y-4">
            {analyticsData.issueBreakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm">{item.type}</span>
                  <span className="text-white text-sm font-medium">
                    {item.count} ({item.percentage}%)
                  </span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                      idx === 0
                        ? 'bg-red-500'
                        : idx === 1
                        ? 'bg-orange-500'
                        : idx === 2
                        ? 'bg-yellow-500'
                        : idx === 3
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Impact Section */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700 rounded-lg p-8">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl">
              🤖
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-3">
              Claude AI Impact Summary
            </h2>
            <p className="text-blue-200 mb-4">
              Over the past 30 days, Claude AI has automatically analyzed your websites,
              detected SEO issues, and applied intelligent fixes without any manual work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900/50 rounded-lg p-4 border border-blue-700/50">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {analyticsData.issuesFixed}
                </div>
                <div className="text-sm text-gray-300">
                  Issues automatically fixed by Claude AI
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-purple-700/50">
                <div className="text-3xl font-bold text-purple-400 mb-1">98.5%</div>
                <div className="text-sm text-gray-300">
                  Fix success rate (automated)
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-pink-700/50">
                <div className="text-3xl font-bold text-pink-400 mb-1">2.3s</div>
                <div className="text-sm text-gray-300">
                  Average analysis time per page
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent AI Actions */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent AI Actions</h2>
          <Link
            href="/dashboard/fixes"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          <AIActionCard
            action="Fixed missing meta descriptions"
            site="store.shopify.com"
            time="2 minutes ago"
            impact="high"
          />
          <AIActionCard
            action="Added alt text to 15 images"
            site="myblog.wordpress.com"
            time="18 minutes ago"
            impact="medium"
          />
          <AIActionCard
            action="Optimized heading structure"
            site="company-website.com"
            time="1 hour ago"
            impact="medium"
          />
          <AIActionCard
            action="Fixed 8 broken links"
            site="store.shopify.com"
            time="3 hours ago"
            impact="high"
          />
        </div>
      </div>

      {/* SEO Score Trends */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          SEO Score Trends (30 Days)
        </h2>
        <div className="relative h-64">
          <svg className="w-full h-full" viewBox="0 0 800 250">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 50}
                x2="800"
                y2={i * 50}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="4"
              />
            ))}
            {/* Score line */}
            <polyline
              points="0,200 200,180 400,150 600,120 800,80"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Data points */}
            {[
              { x: 0, y: 200 },
              { x: 200, y: 180 },
              { x: 400, y: 150 },
              { x: 600, y: 120 },
              { x: 800, y: 80 },
            ].map((point, idx) => (
              <circle
                key={idx}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#3B82F6"
                stroke="#1D4ED8"
                strokeWidth="2"
              />
            ))}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex items-center justify-between mt-4 text-gray-400 text-sm">
            <span>Day 1</span>
            <span>Day 8</span>
            <span>Day 15</span>
            <span>Day 22</span>
            <span>Day 30</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  label,
  value,
  change,
  icon,
  gradient,
}: {
  label: string
  value: string
  change: string
  icon: string
  gradient: string
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      <p className="text-green-400 text-xs font-medium">{change}</p>
    </div>
  )
}

function AIActionCard({
  action,
  site,
  time,
  impact,
}: {
  action: string
  site: string
  time: string
  impact: 'high' | 'medium' | 'low'
}) {
  const impactColor = {
    high: 'text-green-400',
    medium: 'text-yellow-400',
    low: 'text-blue-400',
  }[impact]

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <p className="text-white font-medium">{action}</p>
          <p className="text-gray-400 text-sm">{site}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-medium ${impactColor}`}>
          {impact.toUpperCase()} IMPACT
        </p>
        <p className="text-gray-500 text-xs">{time}</p>
      </div>
    </div>
  )
}
