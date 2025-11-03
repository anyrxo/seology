'use client'

import { cn } from '@/lib/utils'

interface SkeletonTextProps {
  lines?: number
  className?: string
  lineHeight?: 'sm' | 'md' | 'lg'
  lastLineWidth?: string
}

export function SkeletonText({
  lines = 3,
  className,
  lineHeight = 'md',
  lastLineWidth = '60%',
}: SkeletonTextProps) {
  const heightClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'bg-white/10 rounded animate-pulse shimmer',
            heightClasses[lineHeight]
          )}
          style={{ width: i === lines - 1 ? lastLineWidth : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonParagraph() {
  return (
    <div className="space-y-4">
      <SkeletonText lines={3} />
      <SkeletonText lines={2} lastLineWidth="40%" />
    </div>
  )
}

export function SkeletonHeading({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizeClasses = {
    sm: 'h-4 w-32',
    md: 'h-5 w-40',
    lg: 'h-6 w-48',
    xl: 'h-8 w-64',
  }

  return (
    <div className={cn('bg-white/10 rounded animate-pulse shimmer', sizeClasses[size])} />
  )
}

export function SkeletonList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-2 h-2 bg-white/10 rounded-full shimmer flex-shrink-0" />
          <div className="h-4 bg-white/10 rounded flex-1 shimmer" />
        </div>
      ))}
    </div>
  )
}
