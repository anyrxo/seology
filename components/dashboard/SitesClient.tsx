'use client'

import { useSites } from '@/lib/hooks/useSites'
import Link from 'next/link'
import { useState } from 'react'
import { Grid, List, Search, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSkeleton } from '@/components/ui/loading'
import { Badge } from '@/components/ui/badge'

type ViewMode = 'grid' | 'list'

interface Site {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  activeIssues: number
  totalFixes: number
  lastSync: Date | null
}

interface SiteCardProps {
  id: string
  platform: string
  displayName: string | null
  domain: string
  status: string
  activeIssues: number
  totalFixes: number
  lastSync: string | null
}

export function SitesClient() {
  const { sites, isLoading } = useSites()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'issues'>('name')

  // Filter and sort sites
  const filteredSites = sites
    .filter((site) => {
      const matchesSearch = site.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.domain.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterStatus === 'all' || site.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return (a.displayName || a.domain).localeCompare(b.displayName || b.domain)
      } else if (sortBy === 'status') {
        return a.status.localeCompare(b.status)
      } else {
        return b.activeIssues - a.activeIssues
      }
    })

  if (isLoading) {
    return <SitesSkeleton />
  }

  if (sites.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sites</h1>
          <p className="text-gray-400">
            Manage your connected websites and e-commerce stores
          </p>
        </div>
        <Link href="/dashboard/sites/connect">
          <Button className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Connect New Site
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="border-gray-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search sites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter by Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="CONNECTED">Connected</option>
              <option value="PENDING">Pending</option>
              <option value="ERROR">Error</option>
              <option value="DISCONNECTED">Disconnected</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'status' | 'issues')}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="name">Sort by Name</option>
              <option value="status">Sort by Status</option>
              <option value="issues">Sort by Issues</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing {filteredSites.length} of {sites.length} sites
      </div>

      {/* Sites Grid/List */}
      {filteredSites.length === 0 ? (
        <Card className="border-gray-800">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">No sites found matching your filters</p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={{
                ...site,
                lastSync: site.lastSync ? site.lastSync.toString() : null
              }}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSites.map((site) => (
            <SiteListItem
              key={site.id}
              site={{
                ...site,
                lastSync: site.lastSync ? site.lastSync.toString() : null
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function SiteCard({ site }: { site: SiteCardProps }) {
  const platformEmojis: Record<string, string> = {
    SHOPIFY: '🛍️',
    WORDPRESS: '📝',
    WIX: '🎨',
    CUSTOM: '⚡',
  }
  const platformEmoji = (platformEmojis[site.platform as keyof typeof platformEmojis]) || '🌐'

  return (
    <Link href={`/dashboard/sites/${site.id}`}>
      <Card className="border-gray-800 hover:border-blue-500 transition-all duration-300 group hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{platformEmoji}</div>
              <div>
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {site.displayName || site.domain}
                </h3>
                <p className="text-gray-500 text-sm">{site.domain}</p>
              </div>
            </div>
            <StatusBadge status={site.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div>
              <div className="text-gray-400 text-xs mb-1">Active Issues</div>
              <div className="text-white text-xl font-bold">{site.activeIssues}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">Total Fixes</div>
              <div className="text-white text-xl font-bold">{site.totalFixes}</div>
            </div>
          </div>

          {site.lastSync && (
            <div className="mt-4 text-gray-500 text-xs">
              Last synced: {new Date(site.lastSync).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function SiteListItem({ site }: { site: SiteCardProps }) {
  const platformEmojis: Record<string, string> = {
    SHOPIFY: '🛍️',
    WORDPRESS: '📝',
    WIX: '🎨',
    CUSTOM: '⚡',
  }
  const platformEmoji = (platformEmojis[site.platform as keyof typeof platformEmojis]) || '🌐'

  return (
    <Link href={`/dashboard/sites/${site.id}`}>
      <Card className="border-gray-800 hover:border-blue-500 transition-colors group">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="text-2xl">{platformEmoji}</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                  {site.displayName || site.domain}
                </h3>
                <p className="text-gray-500 text-sm">{site.domain}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Issues</div>
                <div className="text-lg font-bold text-white">{site.activeIssues}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Fixes</div>
                <div className="text-lg font-bold text-white">{site.totalFixes}</div>
              </div>
              <StatusBadge status={site.status} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    CONNECTED: { bg: 'bg-green-900', text: 'text-green-200', label: 'Connected' },
    PENDING: { bg: 'bg-yellow-900', text: 'text-yellow-200', label: 'Pending' },
    ERROR: { bg: 'bg-red-900', text: 'text-red-200', label: 'Error' },
    DISCONNECTED: { bg: 'bg-gray-700', text: 'text-gray-400', label: 'Disconnected' },
  }[status] || { bg: 'bg-gray-700', text: 'text-gray-400', label: status }

  return (
    <Badge className={`${statusConfig.bg} ${statusConfig.text} text-xs font-semibold px-2 py-1`}>
      {statusConfig.label}
    </Badge>
  )
}

function EmptyState() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sites</h1>
        <p className="text-gray-400">
          Manage your connected websites and e-commerce stores
        </p>
      </div>

      <Card className="border-gray-800">
        <CardContent className="p-12">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🌐</div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              No sites connected yet
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your first website to start automating SEO fixes with Claude AI
            </p>

            <Link href="/dashboard/sites/connect">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Connect Your First Site
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Automatic Scanning"
          description="We crawl your site and detect SEO issues automatically"
          icon="🔍"
        />
        <FeatureCard
          title="AI-Powered Fixes"
          description="Claude AI generates and applies fixes for every issue"
          icon="🤖"
        />
        <FeatureCard
          title="90-Day Rollback"
          description="Safely revert any changes with one click"
          icon="↩️"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Card className="border-gray-800">
      <CardContent className="p-6">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="text-white font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function SitesSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <LoadingSkeleton className="h-8 w-32 mb-2" />
        <LoadingSkeleton className="h-4 w-96" />
      </div>
      <LoadingSkeleton className="h-16 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="border-gray-800">
            <CardContent className="p-6">
              <LoadingSkeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
