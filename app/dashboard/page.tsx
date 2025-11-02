import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.firstName || 'there'}!
        </h1>
        <p className="text-gray-400">
          Here's what's happening with your SEO automation
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Sites Connected"
          value="0"
          icon="🌐"
          trend="+0%"
          trendUp={true}
        />
        <StatCard
          title="Issues Detected"
          value="0"
          icon="⚠️"
          trend="+0%"
          trendUp={false}
        />
        <StatCard
          title="Fixes Applied"
          value="0"
          icon="✓"
          trend="+0%"
          trendUp={true}
        />
        <StatCard
          title="Usage This Month"
          value="0/500"
          icon="📊"
          trend="Free Plan"
          trendUp={true}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Connect Your First Site"
            description="Start by connecting Shopify, WordPress, or any website"
            href="/dashboard/sites"
            icon="🚀"
          />
          <QuickActionCard
            title="View Documentation"
            description="Learn how to get the most out of SEOLOGY.AI"
            href="/docs.html"
            icon="📚"
          />
          <QuickActionCard
            title="Upgrade Plan"
            description="Get unlimited sites and fixes"
            href="/dashboard/billing"
            icon="⚡"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No activity yet</p>
          <p className="text-sm text-gray-600">
            Connect a site to start seeing SEO automation in action
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
}: {
  title: string
  value: string
  icon: string
  trend: string
  trendUp: boolean
}) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span
          className={`text-sm font-medium ${
            trendUp ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {trend}
        </span>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string
  description: string
  href: string
  icon: string
}) {
  return (
    <a
      href={href}
      className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors group"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </a>
  )
}
