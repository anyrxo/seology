'use client'

import { cn } from '@/lib/utils'

interface SkeletonCardProps {
  className?: string
  showIcon?: boolean
  iconPosition?: 'left' | 'top'
  lines?: number
}

export function SkeletonCard({
  className,
  showIcon = true,
  iconPosition = 'left',
  lines = 2,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse',
        className
      )}
    >
      {iconPosition === 'top' ? (
        <div className="space-y-4">
          {showIcon && (
            <div className="w-12 h-12 bg-white/10 rounded-lg shimmer" />
          )}
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-1/2 shimmer" />
            <div className="h-6 bg-white/10 rounded w-1/3 shimmer" />
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className="h-3 bg-white/10 rounded shimmer"
                style={{ width: i === lines - 1 ? '60%' : '100%' }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {showIcon && (
            <div className="w-12 h-12 bg-white/10 rounded-lg shimmer flex-shrink-0" />
          )}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-1/2 shimmer" />
            <div className="h-6 bg-white/10 rounded w-2/3 shimmer" />
            {Array.from({ length: lines }).map((_, i) => (
              <div
                key={i}
                className="h-3 bg-white/10 rounded shimmer"
                style={{ width: i === lines - 1 ? '60%' : '100%' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function SkeletonMetricCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-white/10 rounded w-24 shimmer" />
        <div className="w-10 h-10 bg-white/10 rounded-lg shimmer" />
      </div>
      <div className="space-y-2">
        <div className="h-8 bg-white/10 rounded w-32 shimmer" />
        <div className="flex items-center gap-2">
          <div className="h-4 bg-white/10 rounded w-16 shimmer" />
          <div className="h-4 bg-white/10 rounded w-12 shimmer" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonStatsGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonMetricCard key={i} />
      ))}
    </div>
  )
}
