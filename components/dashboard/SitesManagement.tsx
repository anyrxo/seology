'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Grid3x3,
  List,
  MoreVertical,
  RefreshCw,
  Settings,
  Trash2,
  Globe,
  ShoppingBag,
  FileText,
  Palette,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Filter,
  ArrowUpDown,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import ConnectStoreButton from './ConnectStoreButton'

interface Issue {
  id: string
  status: string
  type: string
  title: string
  severity: string
  detectedAt: Date
}

interface Connection {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  lastSync: Date | null
  issues: Issue[]
  _count: {
    issues: number
    fixes: number
  }
}

interface SitesManagementProps {
  connections: Connection[]
}

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'health' | 'issues' | 'lastSync'
type FilterPlatform = 'all' | 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM'
type FilterHealth = 'all' | 'excellent' | 'good' | 'fair' | 'poor'

export function SitesManagement({ connections }: SitesManagementProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [filterPlatform, setFilterPlatform] = useState<FilterPlatform>('all')
  const [filterHealth, setFilterHealth] = useState<FilterHealth>('all')
  const [showFilters, setShowFilters] = useState(false)

  // Calculate health score for a site
  const getHealthScore = (connection: Connection): number => {
    const totalIssues = connection._count.issues
    const totalFixes = connection._count.fixes

    if (totalIssues === 0 && totalFixes > 0) return 100
    if (totalIssues === 0) return 90

    const criticalIssues = connection.issues.filter(i => i.severity === 'CRITICAL').length
    const highIssues = connection.issues.filter(i => i.severity === 'HIGH').length
    const mediumIssues = connection.issues.filter(i => i.severity === 'MEDIUM').length

    let score = 100
    score -= criticalIssues * 15
    score -= highIssues * 10
    score -= mediumIssues * 5
    score -= (totalIssues - criticalIssues - highIssues - mediumIssues) * 2

    return Math.max(0, Math.min(100, score))
  }

  const getHealthCategory = (score: number): FilterHealth => {
    if (score >= 90) return 'excellent'
    if (score >= 70) return 'good'
    if (score >= 50) return 'fair'
    return 'poor'
  }

  // Filter and sort connections
  const filteredConnections = useMemo(() => {
    let filtered = connections.filter(conn => {
      // Search filter
      const matchesSearch = searchQuery === '' ||
        conn.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.domain.toLowerCase().includes(searchQuery.toLowerCase())

      // Platform filter
      const matchesPlatform = filterPlatform === 'all' || conn.platform === filterPlatform

      // Health filter
      const health = getHealthScore(conn)
      const healthCategory = getHealthCategory(health)
      const matchesHealth = filterHealth === 'all' || healthCategory === filterHealth

      return matchesSearch && matchesPlatform && matchesHealth
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.displayName || a.domain).localeCompare(b.displayName || b.domain)
        case 'health':
          return getHealthScore(b) - getHealthScore(a)
        case 'issues':
          return b._count.issues - a._count.issues
        case 'lastSync':
          if (!a.lastSync) return 1
          if (!b.lastSync) return -1
          return new Date(b.lastSync).getTime() - new Date(a.lastSync).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [connections, searchQuery, filterPlatform, filterHealth, sortBy])

  const toggleSiteSelection = (siteId: string) => {
    const newSelected = new Set(selectedSites)
    if (newSelected.has(siteId)) {
      newSelected.delete(siteId)
    } else {
      newSelected.add(siteId)
    }
    setSelectedSites(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedSites.size === filteredConnections.length) {
      setSelectedSites(new Set())
    } else {
      setSelectedSites(new Set(filteredConnections.map(c => c.id)))
    }
  }

  const clearSelection = () => {
    setSelectedSites(new Set())
  }

  if (connections.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header Section */}
        <div className="rt-component-section">
          <div className="w-layout-vflex flex-vertical gap-row-24px">
            {/* Title Row */}
            <div className="w-layout-hflex flex-horizontal space-between align-center">
              <div className="flex-horizontal gap-column-16px align-center">
                <div className="card-icon-square _40px">
                  <div className="text-300">🌐</div>
                </div>
                <div className="flex-vertical">
                  <h1 className="rt-component-heading-two text-500 bold text-white">
                    My Sites
                  </h1>
                  <p className="rt-text-block text-200 text-gray-400">
                    {filteredConnections.length} {filteredConnections.length === 1 ? 'site' : 'sites'} connected
                  </p>
                </div>
              </div>
              <ConnectStoreButton className="btn-primary large rt-button-font">
                <div className="flex-horizontal gap-column-6px">
                  <Plus className="w-5 h-5" />
                  <div>Add New Site</div>
                </div>
              </ConnectStoreButton>
            </div>

            {/* Search and Controls Row */}
            <div className="w-layout-hflex flex-horizontal space-between align-center gap-column-16px">
              {/* Search Bar */}
              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search sites by name or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500/50 focus:bg-white/10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex-horizontal gap-column-12px">
                {/* Filter Toggle */}
                <Button
                  variant="secondary"
                  size="default"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "gap-2",
                    showFilters && "bg-white/20 border-white/30"
                  )}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>

                {/* Sort Menu */}
                <DropdownMenu
                  trigger={
                    <Button variant="secondary" size="default" className="gap-2">
                      <ArrowUpDown className="w-4 h-4" />
                      Sort
                    </Button>
                  }
                  align="right"
                >
                  <DropdownMenuItem
                    onClick={() => setSortBy('name')}
                    className={cn(sortBy === 'name' && "bg-white/10")}
                  >
                    Sort by Name
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('health')}
                    className={cn(sortBy === 'health' && "bg-white/10")}
                  >
                    Sort by Health Score
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('issues')}
                    className={cn(sortBy === 'issues' && "bg-white/10")}
                  >
                    Sort by Issues
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortBy('lastSync')}
                    className={cn(sortBy === 'lastSync' && "bg-white/10")}
                  >
                    Sort by Last Scan
                  </DropdownMenuItem>
                </DropdownMenu>

                {/* View Toggle */}
                <div className="flex-horizontal gap-column-4px bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "p-2 rounded transition-all duration-200",
                      viewMode === 'grid'
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "p-2 rounded transition-all duration-200",
                      viewMode === 'list'
                        ? "bg-purple-500/20 text-purple-400"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="card pd-24px bg-white/5 border border-white/10 animate-in slide-in-from-top duration-200">
                <div className="flex-horizontal gap-column-24px flex-wrap">
                  {/* Platform Filter */}
                  <div className="flex-vertical gap-row-8px">
                    <label className="text-100 text-gray-400 font-medium">Platform</label>
                    <div className="flex-horizontal gap-column-8px flex-wrap">
                      {(['all', 'SHOPIFY', 'WORDPRESS', 'WIX', 'CUSTOM'] as const).map(platform => (
                        <button
                          key={platform}
                          onClick={() => setFilterPlatform(platform)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-50 font-medium transition-all duration-200",
                            filterPlatform === platform
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          {platform === 'all' ? 'All Platforms' : platform.charAt(0) + platform.slice(1).toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Health Filter */}
                  <div className="flex-vertical gap-row-8px">
                    <label className="text-100 text-gray-400 font-medium">Health Score</label>
                    <div className="flex-horizontal gap-column-8px flex-wrap">
                      {(['all', 'excellent', 'good', 'fair', 'poor'] as const).map(health => (
                        <button
                          key={health}
                          onClick={() => setFilterHealth(health)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-50 font-medium transition-all duration-200",
                            filterHealth === health
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                              : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          {health === 'all' ? 'All Scores' : health.charAt(0).toUpperCase() + health.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {(filterPlatform !== 'all' || filterHealth !== 'all') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFilterPlatform('all')
                        setFilterHealth('all')
                      }}
                      className="ml-auto"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedSites.size > 0 && (
          <div className="card pd-16px bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 animate-in slide-in-from-top duration-200">
            <div className="flex-horizontal space-between align-center">
              <div className="flex-horizontal gap-column-16px align-center">
                <Checkbox
                  checked={selectedSites.size === filteredConnections.length}
                  onChange={toggleSelectAll}
                />
                <span className="text-100 text-white font-medium">
                  {selectedSites.size} site{selectedSites.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex-horizontal gap-column-8px">
                <Button variant="secondary" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Bulk Scan
                </Button>
                <Button variant="danger" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </Button>
                <Button variant="ghost" size="sm" onClick={clearSelection}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sites Grid/List */}
        {filteredConnections.length === 0 ? (
          <div className="card pd-32px---44px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 text-center">
            <div className="flex-vertical gap-row-16px align-center justify-center py-12">
              <div className="card-icon-square _40px neutral-icon">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex-vertical gap-row-8px">
                <h3 className="text-300 bold text-white">No sites found</h3>
                <p className="text-100 text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setFilterPlatform('all')
                  setFilterHealth('all')
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid-3-columns gap-row-24px gap-column-12px">
            {filteredConnections.map(connection => (
              <SiteCard
                key={connection.id}
                connection={connection}
                healthScore={getHealthScore(connection)}
                isSelected={selectedSites.has(connection.id)}
                onToggleSelect={() => toggleSiteSelection(connection.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-vertical gap-row-12px">
            {filteredConnections.map(connection => (
              <SiteListItem
                key={connection.id}
                connection={connection}
                healthScore={getHealthScore(connection)}
                isSelected={selectedSites.has(connection.id)}
                onToggleSelect={() => toggleSiteSelection(connection.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Site Card Component (Grid View)
function SiteCard({
  connection,
  healthScore,
  isSelected,
  onToggleSelect
}: {
  connection: Connection
  healthScore: number
  isSelected: boolean
  onToggleSelect: () => void
}) {
  const platformConfig = {
    SHOPIFY: { icon: ShoppingBag, color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/40', text: 'text-green-400' },
    WORDPRESS: { icon: FileText, color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/40', text: 'text-blue-400' },
    WIX: { icon: Palette, color: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/40', text: 'text-purple-400' },
    CUSTOM: { icon: Zap, color: 'from-amber-500/20 to-yellow-500/20', border: 'border-amber-500/40', text: 'text-amber-400' },
  }

  const platform = platformConfig[connection.platform as keyof typeof platformConfig] || platformConfig.CUSTOM
  const PlatformIcon = platform.icon

  const statusConfig = {
    CONNECTED: { variant: 'success' as const, label: 'Connected', dot: true },
    PENDING: { variant: 'warning' as const, label: 'Pending', dot: true },
    ERROR: { variant: 'danger' as const, label: 'Error', dot: true },
    DISCONNECTED: { variant: 'danger' as const, label: 'Disconnected', dot: false },
  }
  const status = statusConfig[connection.status as keyof typeof statusConfig] || statusConfig.DISCONNECTED

  const healthColor =
    healthScore >= 90 ? 'text-green-400' :
    healthScore >= 70 ? 'text-blue-400' :
    healthScore >= 50 ? 'text-amber-400' : 'text-red-400'

  const healthRingColor =
    healthScore >= 90 ? 'stroke-green-500' :
    healthScore >= 70 ? 'stroke-blue-500' :
    healthScore >= 50 ? 'stroke-amber-500' : 'stroke-red-500'

  return (
    <div className="relative group">
      {/* Selection Checkbox */}
      <div
        className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onChange={onToggleSelect}
          className="bg-gray-900/90 border-white/20"
        />
      </div>

      <Link href={`/dashboard/sites/${connection.id}`} className="text-decoration-none block">
        <div className="card pd-24px hover-card-link relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Header */}
          <div className="w-layout-hflex flex-horizontal space-between align-start mg-bottom-16px relative z-10">
            <div className="flex-horizontal gap-column-12px align-center flex-1 min-w-0">
              <div className={cn(
                "card-icon-square _40px bg-gradient-to-br",
                platform.color,
                "border",
                platform.border
              )}>
                <PlatformIcon className={cn("w-5 h-5", platform.text)} />
              </div>
              <div className="flex-vertical flex-1 min-w-0">
                <h3 className="text-200 medium text-white mg-bottom-4px truncate">
                  {connection.displayName || connection.domain}
                </h3>
                <p className="rt-text-block text-100 text-gray-400 truncate">{connection.domain}</p>
              </div>
            </div>
            <Badge {...status} dot={status.dot} pulse={status.dot} size="sm">
              {status.label}
            </Badge>
          </div>

          <div className="divider card-small-divider mg-bottom-16px"></div>

          {/* Health Score - Circular Progress */}
          <div className="flex-horizontal justify-center mg-bottom-20px relative z-10">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/10"
                />
                {/* Progress circle */}
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  className={healthRingColor}
                  style={{
                    strokeDasharray: `${2 * Math.PI * 56}`,
                    strokeDashoffset: `${2 * Math.PI * 56 * (1 - healthScore / 100)}`,
                    transition: 'stroke-dashoffset 1s ease-in-out'
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={cn("text-500 bold", healthColor)}>{healthScore}</div>
                <div className="text-50 text-gray-400">Health</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="w-layout-vflex flex-vertical gap-row-12px mg-bottom-16px relative z-10">
            <div className="card pd-16px bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10">
              <div className="flex-horizontal space-between align-center">
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _26px bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-vertical">
                    <div className="text-50 text-gray-400">Active Issues</div>
                    <div className="text-200 bold text-white">{connection._count.issues}</div>
                  </div>
                </div>
                {connection.issues.filter(i => i.severity === 'CRITICAL').length > 0 && (
                  <Badge variant="danger" size="sm">
                    {connection.issues.filter(i => i.severity === 'CRITICAL').length} Critical
                  </Badge>
                )}
              </div>
            </div>

            <div className="card pd-16px bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10">
              <div className="flex-horizontal space-between align-center">
                <div className="flex-horizontal gap-column-12px align-center">
                  <div className="card-icon-square _26px bg-green-500/10 border border-green-500/30">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-vertical">
                    <div className="text-50 text-gray-400">Total Fixes</div>
                    <div className="text-200 bold text-white">{connection._count.fixes}</div>
                  </div>
                </div>
                {connection._count.fixes > 0 && (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                )}
              </div>
            </div>
          </div>

          {/* Last Sync */}
          {connection.lastSync && (
            <div className="flex-horizontal gap-column-8px align-center mg-bottom-12px relative z-10">
              <Clock className="w-4 h-4 text-gray-400" />
              <div className="text-50 text-gray-400">
                Last scanned {new Date(connection.lastSync).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Quick Actions Menu */}
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <DropdownMenu
              trigger={
                <button
                  className="p-2 rounded-lg bg-gray-900/90 border border-white/10 hover:bg-gray-800 transition-colors"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              }
              align="right"
            >
              <DropdownMenuItem className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Scan Now
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-red-400 focus:text-red-400">
                <Trash2 className="w-4 h-4" />
                Delete Site
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>
      </Link>
    </div>
  )
}

// Site List Item Component (List View)
function SiteListItem({
  connection,
  healthScore,
  isSelected,
  onToggleSelect
}: {
  connection: Connection
  healthScore: number
  isSelected: boolean
  onToggleSelect: () => void
}) {
  const platformConfig = {
    SHOPIFY: { icon: ShoppingBag, badge: 'Shopify', variant: 'success' as const },
    WORDPRESS: { icon: FileText, badge: 'WordPress', variant: 'info' as const },
    WIX: { icon: Palette, badge: 'Wix', variant: 'gradient' as const },
    CUSTOM: { icon: Zap, badge: 'Custom', variant: 'warning' as const },
  }

  const platform = platformConfig[connection.platform as keyof typeof platformConfig] || platformConfig.CUSTOM
  const PlatformIcon = platform.icon

  const statusConfig = {
    CONNECTED: { variant: 'success' as const, label: 'Connected', dot: true },
    PENDING: { variant: 'warning' as const, label: 'Pending', dot: true },
    ERROR: { variant: 'danger' as const, label: 'Error', dot: true },
    DISCONNECTED: { variant: 'danger' as const, label: 'Disconnected', dot: false },
  }
  const status = statusConfig[connection.status as keyof typeof statusConfig] || statusConfig.DISCONNECTED

  const healthColor =
    healthScore >= 90 ? 'text-green-400' :
    healthScore >= 70 ? 'text-blue-400' :
    healthScore >= 50 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="relative group">
      <Link href={`/dashboard/sites/${connection.id}`} className="text-decoration-none block">
        <div className="card pd-24px hover-card-link relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200 hover:border-blue-500/30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="flex-horizontal space-between align-center gap-column-24px relative z-10">
            {/* Left: Selection + Site Info */}
            <div className="flex-horizontal gap-column-16px align-center flex-1 min-w-0">
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onChange={onToggleSelect}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <PlatformIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />

              <div className="flex-vertical flex-1 min-w-0">
                <h3 className="text-200 medium text-white truncate">
                  {connection.displayName || connection.domain}
                </h3>
                <p className="text-100 text-gray-400 truncate">{connection.domain}</p>
              </div>
            </div>

            {/* Center: Metrics */}
            <div className="flex-horizontal gap-column-32px">
              {/* Platform Badge */}
              <div className="flex-vertical gap-row-4px items-center min-w-[80px]">
                <div className="text-50 text-gray-400">Platform</div>
                <Badge variant={platform.variant} size="sm">
                  {platform.badge}
                </Badge>
              </div>

              {/* Health Score */}
              <div className="flex-vertical gap-row-4px items-center min-w-[80px]">
                <div className="text-50 text-gray-400">Health</div>
                <div className={cn("text-300 bold", healthColor)}>{healthScore}</div>
              </div>

              {/* Issues */}
              <div className="flex-vertical gap-row-4px items-center min-w-[80px]">
                <div className="text-50 text-gray-400">Issues</div>
                <div className="flex-horizontal gap-column-4px align-center">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-200 bold text-white">{connection._count.issues}</span>
                </div>
              </div>

              {/* Fixes */}
              <div className="flex-vertical gap-row-4px items-center min-w-[80px]">
                <div className="text-50 text-gray-400">Fixes</div>
                <div className="flex-horizontal gap-column-4px align-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-200 bold text-white">{connection._count.fixes}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex-vertical gap-row-4px items-center min-w-[100px]">
                <div className="text-50 text-gray-400">Status</div>
                <Badge {...status} dot={status.dot} pulse={status.dot} size="sm">
                  {status.label}
                </Badge>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex-horizontal gap-column-8px opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu
                trigger={
                  <button
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4 text-white" />
                  </button>
                }
                align="right"
              >
                <DropdownMenuItem className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Scan Now
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-red-400 focus:text-red-400">
                  <Trash2 className="w-4 h-4" />
                  Delete Site
                </DropdownMenuItem>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

// Empty State Component
function EmptyState() {
  return (
    <div className="w-layout-blockcontainer container-default w-container">
      <div className="grid-1-column gap-row-32px">
        {/* Header */}
        <div className="rt-component-section">
          <div className="flex-horizontal gap-column-16px align-center">
            <div className="card-icon-square _40px neutral-icon">
              <Globe className="w-6 h-6" />
            </div>
            <div className="flex-vertical">
              <h1 className="rt-component-heading-two text-500 bold text-white mg-bottom-8px">
                My Sites
              </h1>
              <p className="rt-text-block text-200 text-gray-400">
                Manage your connected websites and e-commerce stores
              </p>
            </div>
          </div>
        </div>

        {/* Empty State Card */}
        <div className="rt-component-section card pd-32px---44px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="text-center inner-container _400px center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
              <div className="relative card-icon-square _40px" style={{ width: '120px', height: '120px' }}>
                <Globe className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <h2 className="text-400 bold text-white mg-bottom-12px">
              No sites connected yet
            </h2>
            <p className="rt-text-block text-200 text-gray-400 mg-bottom-32px max-w-md mx-auto">
              Connect your first website to start automating SEO fixes with SEOLOGY.AI. Choose from Shopify, WordPress, or custom sites.
            </p>

            <ConnectStoreButton>
              <Button variant="primary" size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Connect Your First Site
              </Button>
            </ConnectStoreButton>
          </div>
        </div>

        {/* Platform Options */}
        <div className="grid-3-columns gap-row-24px gap-column-12px">
          <PlatformCard
            icon={ShoppingBag}
            title="Shopify"
            description="Connect your Shopify store with one-click OAuth integration"
            color="from-green-500/20 to-emerald-500/20"
            border="border-green-500/40"
          />
          <PlatformCard
            icon={FileText}
            title="WordPress"
            description="Link your WordPress site using REST API or our plugin"
            color="from-blue-500/20 to-cyan-500/20"
            border="border-blue-500/40"
          />
          <PlatformCard
            icon={Zap}
            title="Custom Site"
            description="Use our Magic.js snippet for any custom website"
            color="from-amber-500/20 to-yellow-500/20"
            border="border-amber-500/40"
          />
        </div>

        {/* Features */}
        <div className="card pd-32px---24px bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-lg">
          <div className="flex-horizontal gap-column-12px align-center mg-bottom-24px">
            <div className="card-icon-square _40px bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-300 bold text-white">
              What happens after you connect?
            </h2>
          </div>
          <div className="grid-3-columns gap-column-24px">
            <div className="flex-vertical gap-row-12px">
              <div className="card-icon-square _40px bg-blue-500/10 border border-blue-500/30">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-200 medium text-white">Automatic Scanning</h3>
              <p className="text-100 text-gray-400">
                Our AI crawls your site and detects SEO issues automatically
              </p>
            </div>
            <div className="flex-vertical gap-row-12px">
              <div className="card-icon-square _40px bg-purple-500/10 border border-purple-500/30">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-200 medium text-white">AI-Powered Fixes</h3>
              <p className="text-100 text-gray-400">
                AI generates and applies fixes for every issue found
              </p>
            </div>
            <div className="flex-vertical gap-row-12px">
              <div className="card-icon-square _40px bg-green-500/10 border border-green-500/30">
                <RefreshCw className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-200 medium text-white">90-Day Rollback</h3>
              <p className="text-100 text-gray-400">
                Safely revert any changes with one click for 90 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Card Component
function PlatformCard({
  icon: Icon,
  title,
  description,
  color,
  border
}: {
  icon: React.ElementType
  title: string
  description: string
  color: string
  border: string
}) {
  return (
    <div className={cn(
      "card pd-24px bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      border
    )}>
      <div className="flex-vertical gap-row-16px">
        <div className={cn(
          "card-icon-square _40px bg-gradient-to-br border",
          color,
          border
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-vertical gap-row-8px">
          <h3 className="text-200 medium text-white">{title}</h3>
          <p className="rt-text-block text-100 text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
