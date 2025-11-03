'use client'

/**
 * Infinite Scroll Sites List
 * Loads more sites as user scrolls
 */

import { motion } from 'framer-motion'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, ExternalLink, Settings, TrendingUp, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { SkeletonCard } from '@/components/ui/skeleton-card'

interface Site {
  id: string
  url: string
  platform: 'SHOPIFY' | 'WORDPRESS' | 'MAGICJS'
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR'
  issueCount: number
  fixCount: number
  lastCrawledAt?: Date
  healthScore?: number
}

export function InfiniteSitesList() {
  const {
    data: sites,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMoreRef,
  } = useInfiniteScroll<Site>('/api/sites', {
    limit: 10,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} showIcon iconPosition="left" lines={2} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">Failed to load sites</h3>
        <p className="text-white/60 text-sm">{error.message}</p>
      </div>
    )
  }

  if (sites.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <Globe className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="text-white font-semibold mb-2">No sites connected</h3>
        <p className="text-white/60 text-sm mb-6">
          Connect your first site to start optimizing your SEO
        </p>
        <Button variant="primary" asChild>
          <Link href="/dashboard/sites/connect">Connect Site</Link>
        </Button>
      </div>
    )
  }

  const platformColors = {
    SHOPIFY: 'bg-green-500/20 text-green-400 border-green-500/30',
    WORDPRESS: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    MAGICJS: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }

  const statusColors = {
    ACTIVE: 'bg-green-500/20 text-green-400',
    INACTIVE: 'bg-gray-500/20 text-gray-400',
    ERROR: 'bg-red-500/20 text-red-400',
  }

  return (
    <div className="space-y-4">
      {/* Sites List */}
      {sites.map((site, index) => (
        <motion.div
          key={site.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors group"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Site Info */}
            <div className="flex items-center gap-4 flex-1">
              {/* Icon */}
              <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                <Globe className="w-6 h-6 text-white/60" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold truncate">{site.url}</h3>
                  <Badge
                    variant="outline"
                    className={platformColors[site.platform]}
                  >
                    {site.platform}
                  </Badge>
                  <div
                    className={`w-2 h-2 rounded-full ${statusColors[site.status]}`}
                  />
                </div>

                <div className="flex items-center gap-4 text-sm">
                  {/* Issues */}
                  <span className="text-white/60">
                    <span className="text-yellow-400 font-semibold">
                      {site.issueCount}
                    </span>{' '}
                    issues
                  </span>

                  {/* Fixes */}
                  <span className="text-white/60">
                    <span className="text-green-400 font-semibold">
                      {site.fixCount}
                    </span>{' '}
                    fixes
                  </span>

                  {/* Health Score */}
                  {site.healthScore !== undefined && (
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold">
                        {site.healthScore}%
                      </span>
                    </div>
                  )}

                  {/* Last Crawled */}
                  {site.lastCrawledAt && (
                    <span className="text-white/40 text-xs">
                      Updated{' '}
                      {new Date(site.lastCrawledAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                leftIcon={<ExternalLink className="w-4 h-4" />}
              >
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex"
                >
                  Visit
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                leftIcon={<Settings className="w-4 h-4" />}
              >
                <Link href={`/dashboard/sites/${site.id}`}>Manage</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-3 text-white/60">
            <Spinner size="sm" />
            <span className="text-sm">Loading more sites...</span>
          </div>
        </div>
      )}

      {/* Intersection Observer Target */}
      {hasMore && !isLoadingMore && (
        <div ref={loadMoreRef} className="h-10" aria-hidden="true" />
      )}

      {/* End of List */}
      {!hasMore && sites.length > 0 && (
        <div className="text-center py-8">
          <p className="text-white/40 text-sm">
            You've reached the end of the list
          </p>
        </div>
      )}
    </div>
  )
}
