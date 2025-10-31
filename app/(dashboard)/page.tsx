import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { UsageDashboardCard } from '@/components/usage/UsageDashboardCard'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your SEO automation
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Sites Connected"
          value="3"
          change="+1 this week"
          icon={CheckCircle2}
          trend="up"
        />
        <StatCard
          title="Fixes Applied"
          value="127"
          change="+23 today"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Issues Detected"
          value="45"
          change="-12 this week"
          icon={AlertCircle}
          trend="down"
        />
        <StatCard
          title="Pending Approvals"
          value="8"
          change="Requires action"
          icon={Clock}
          trend="neutral"
        />
      </div>

      {/* Usage Card */}
      <UsageDashboardCard />

      {/* Quick Actions */}
      <div className="rounded-lg border bg-white p-6 dark:bg-gray-950">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <QuickAction
            title="Connect New Site"
            description="Add Shopify, WordPress, or any platform"
            href="/dashboard/connect"
            icon="🔗"
          />
          <QuickAction
            title="View All Issues"
            description="See detected SEO problems across sites"
            href="/dashboard/sites"
            icon="🔍"
          />
          <QuickAction
            title="Approve Fixes"
            description="Review and approve pending changes"
            href="/dashboard/sites"
            icon="✅"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border bg-white p-6 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Link href="/dashboard/sites" className="text-sm text-green-600 hover:text-green-700">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          <ActivityItem
            site="example-store.myshopify.com"
            action="Fixed 15 missing meta descriptions"
            time="2 hours ago"
            status="success"
          />
          <ActivityItem
            site="myblog.com"
            action="Detected 8 broken internal links"
            time="5 hours ago"
            status="pending"
          />
          <ActivityItem
            site="example-store.myshopify.com"
            action="Updated 23 product alt tags"
            time="1 day ago"
            status="success"
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  trend,
}: {
  title: string
  value: string
  change: string
  icon: any
  trend: 'up' | 'down' | 'neutral'
}) {
  return (
    <div className="rounded-lg border bg-white p-6 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</div>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div
        className={`mt-2 text-sm ${
          trend === 'up'
            ? 'text-green-600'
            : trend === 'down'
            ? 'text-red-600'
            : 'text-gray-600'
        }`}
      >
        {change}
      </div>
    </div>
  )
}

function QuickAction({
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
    <Link
      href={href}
      className="group rounded-lg border bg-gray-50 p-4 transition-colors hover:border-green-500 hover:bg-green-50 dark:bg-gray-900 dark:hover:bg-green-900/10"
    >
      <div className="mb-2 text-2xl">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-3 flex items-center text-sm font-medium text-green-600 group-hover:text-green-700">
        Get started <ArrowRight className="ml-1 h-4 w-4" />
      </div>
    </Link>
  )
}

function ActivityItem({
  site,
  action,
  time,
  status,
}: {
  site: string
  action: string
  time: string
  status: 'success' | 'pending' | 'error'
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div
        className={`mt-1 h-2 w-2 rounded-full ${
          status === 'success'
            ? 'bg-green-500'
            : status === 'pending'
            ? 'bg-yellow-500'
            : 'bg-red-500'
        }`}
      />
      <div className="flex-1">
        <div className="font-medium">{site}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{action}</div>
      </div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  )
}
