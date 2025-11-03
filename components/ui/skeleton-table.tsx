'use client'

import { cn } from '@/lib/utils'

interface SkeletonTableProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  className?: string
}

export function SkeletonTable({
  rows = 5,
  columns = 4,
  showHeader = true,
  className,
}: SkeletonTableProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      {showHeader && (
        <div className="flex gap-4 pb-3 border-b border-white/10">
          {Array.from({ length: columns }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-white/10 rounded shimmer"
              style={{ width: i === 0 ? '30%' : '100%' }}
            />
          ))}
        </div>
      )}

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 animate-pulse"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          {Array.from({ length: columns }).map((_, j) => (
            <div
              key={j}
              className="h-10 bg-white/10 rounded shimmer flex-1"
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex gap-4 animate-pulse">
      {Array.from({ length: columns }).map((_, j) => (
        <div key={j} className="h-10 bg-white/10 rounded shimmer flex-1" />
      ))}
    </div>
  )
}

export function SkeletonTableCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-white/10 rounded w-32 shimmer" />
        <div className="h-9 bg-white/10 rounded w-24 shimmer" />
      </div>
      <SkeletonTable rows={5} columns={4} />
    </div>
  )
}
