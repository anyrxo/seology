import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, Globe, TrendingUp, AlertCircle } from 'lucide-react'

export default function SitesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Sites</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your connected websites and SEO automation
          </p>
        </div>
        <Link href="/dashboard/connect">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="mr-2 h-4 w-4" />
            Connect Site
          </Button>
        </Link>
      </div>

      {/* Sites Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SiteCard
          name="Example Store"
          domain="example-store.myshopify.com"
          platform="Shopify"
          status="connected"
          issuesCount={12}
          fixesApplied={45}
          lastSync="2 hours ago"
        />
        <SiteCard
          name="My Blog"
          domain="myblog.com"
          platform="WordPress"
          status="connected"
          issuesCount={8}
          fixesApplied={23}
          lastSync="5 hours ago"
        />
        <SiteCard
          name="Portfolio Site"
          domain="portfolio.example.com"
          platform="Custom"
          status="analyzing"
          issuesCount={0}
          fixesApplied={0}
          lastSync="Just now"
        />
      </div>

      {/* Empty State (when no sites) */}
      {/* <EmptyState /> */}
    </div>
  )
}

function SiteCard({
  name,
  domain,
  platform,
  status,
  issuesCount,
  fixesApplied,
  lastSync,
}: {
  name: string
  domain: string
  platform: string
  status: 'connected' | 'analyzing' | 'error'
  issuesCount: number
  fixesApplied: number
  lastSync: string
}) {
  return (
    <Link
      href={`/dashboard/sites/${domain}`}
      className="group rounded-lg border bg-white p-6 transition-all hover:border-green-500 hover:shadow-lg dark:bg-gray-950"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
            <Globe className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold group-hover:text-green-600">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{domain}</p>
          </div>
        </div>
      </div>

      {/* Platform Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
          {platform}
        </span>
      </div>

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <AlertCircle className="h-4 w-4" />
            Issues
          </div>
          <div className="mt-1 text-2xl font-bold">{issuesCount}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="h-4 w-4" />
            Fixes
          </div>
          <div className="mt-1 text-2xl font-bold">{fixesApplied}</div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              status === 'connected'
                ? 'bg-green-500'
                : status === 'analyzing'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          />
          <span className="text-sm capitalize text-gray-600 dark:text-gray-400">
            {status}
          </span>
        </div>
        <span className="text-xs text-gray-500">Last sync: {lastSync}</span>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12">
      <Globe className="mb-4 h-12 w-12 text-gray-400" />
      <h3 className="mb-2 text-lg font-semibold">No sites connected</h3>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Get started by connecting your first website
      </p>
      <Link href="/dashboard/connect">
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Connect Your First Site
        </Button>
      </Link>
    </div>
  )
}
