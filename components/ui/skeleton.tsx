'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  shimmer?: boolean
  variant?: 'pulse' | 'shimmer' | 'wave'
}

export function Skeleton({
  className,
  shimmer = true,
  variant = 'shimmer'
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md bg-white/5 backdrop-blur-sm',
        variant === 'pulse' && 'animate-pulse',
        className
      )}
    >
      {/* Shimmer effect */}
      {shimmer && variant === 'shimmer' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {/* Wave effect */}
      {variant === 'wave' && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0"
          style={{
            animation: 'shimmer 2s ease-in-out infinite',
            backgroundSize: '200% 100%',
          }}
        />
      )}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 space-y-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
      <Skeleton className="h-4 w-1/4 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  )
}
