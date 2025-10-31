import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  RefreshCw,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Play,
  AlertTriangle
} from 'lucide-react'

export default async function SiteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // TODO: Fetch site data from database
  const { id: siteId } = await params

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/sites">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Example Store</h1>
            <p className="text-gray-600 dark:text-gray-400">
              example-store.myshopify.com
            </p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Connected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Now
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" size="sm">
            <Play className="mr-2 h-4 w-4" />
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Issues"
          value="45"
          change="-12 this week"
          icon={AlertCircle}
          trend="down"
          color="red"
        />
        <StatCard
          title="Critical"
          value="8"
          change="Needs attention"
          icon={AlertTriangle}
          trend="neutral"
          color="orange"
        />
        <StatCard
          title="Fixes Applied"
          value="127"
          change="+23 today"
          icon={CheckCircle2}
          trend="up"
          color="green"
        />
        <StatCard
          title="Pending Approval"
          value="12"
          change="Awaiting review"
          icon={Clock}
          trend="neutral"
          color="blue"
        />
      </div>

      {/* Issues List */}
      <div className="rounded-lg border bg-white dark:bg-gray-950">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">SEO Issues</h2>
            <div className="flex items-center gap-2">
              <select className="h-9 rounded-lg border bg-gray-50 px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                <option>All Severities</option>
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select className="h-9 rounded-lg border bg-gray-50 px-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
                <option>All Categories</option>
                <option>Technical</option>
                <option>Content</option>
                <option>Links</option>
                <option>Performance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <IssueRow
            type="Missing Meta Description"
            page="/products/example-product"
            severity="high"
            impact={7}
            status="detected"
            detectedAt="2 hours ago"
          />
          <IssueRow
            type="Broken Internal Link"
            page="/collections/summer-sale"
            severity="critical"
            impact={9}
            status="fixing"
            detectedAt="5 hours ago"
          />
          <IssueRow
            type="Missing Alt Text"
            page="/products/new-arrival"
            severity="medium"
            impact={5}
            status="detected"
            detectedAt="1 day ago"
          />
          <IssueRow
            type="Duplicate H1 Tag"
            page="/about"
            severity="medium"
            impact={6}
            status="detected"
            detectedAt="1 day ago"
          />
          <IssueRow
            type="Missing Schema Markup"
            page="/products/featured-item"
            severity="low"
            impact={4}
            status="detected"
            detectedAt="2 days ago"
          />
        </div>
      </div>

      {/* Recent Fixes */}
      <div className="rounded-lg border bg-white p-6 dark:bg-gray-950">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Fixes</h2>
          <Link href={`/dashboard/sites/${siteId}/fixes`} className="text-sm text-green-600 hover:text-green-700">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          <FixRow
            type="Updated Meta Description"
            page="/products/example-1"
            appliedAt="2 hours ago"
            impact={7}
          />
          <FixRow
            type="Added Alt Text to 15 Images"
            page="/collections/new"
            appliedAt="5 hours ago"
            impact={6}
          />
          <FixRow
            type="Created 301 Redirect"
            page="/old-page → /new-page"
            appliedAt="1 day ago"
            impact={8}
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
  color,
}: {
  title: string
  value: string
  change: string
  icon: any
  trend: 'up' | 'down' | 'neutral'
  color: 'red' | 'orange' | 'green' | 'blue'
}) {
  const colorClasses = {
    red: 'text-red-600 bg-red-100 dark:bg-red-900/20',
    orange: 'text-orange-600 bg-orange-100 dark:bg-orange-900/20',
    green: 'text-green-600 bg-green-100 dark:bg-green-900/20',
    blue: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
  }

  return (
    <div className="rounded-lg border bg-white p-6 dark:bg-gray-950">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</div>
        <div className={`rounded-lg p-2 ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{change}</div>
    </div>
  )
}

function IssueRow({
  type,
  page,
  severity,
  impact,
  status,
  detectedAt,
}: {
  type: string
  page: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  impact: number
  status: 'detected' | 'fixing' | 'fixed' | 'failed'
  detectedAt: string
}) {
  const severityColors = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  }

  const statusColors = {
    detected: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    fixing: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
    fixed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  }

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{type}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${severityColors[severity]}`}>
            {severity}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{page}</p>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Impact</div>
        <div className="text-2xl font-bold text-green-600">{impact}/10</div>
      </div>
      <div className="text-sm text-gray-500">{detectedAt}</div>
      <Button size="sm" className="bg-green-600 hover:bg-green-700">
        View Fix
      </Button>
    </div>
  )
}

function FixRow({
  type,
  page,
  appliedAt,
  impact,
}: {
  type: string
  page: string
  appliedAt: string
  impact: number
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-4">
      <CheckCircle2 className="h-5 w-5 text-green-600" />
      <div className="flex-1">
        <div className="font-medium">{type}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{page}</div>
      </div>
      <div className="text-sm">
        <span className="text-gray-600 dark:text-gray-400">Impact: </span>
        <span className="font-semibold text-green-600">{impact}/10</span>
      </div>
      <div className="text-sm text-gray-500">{appliedAt}</div>
      <Button variant="outline" size="sm">
        Rollback
      </Button>
    </div>
  )
}
