'use client'

import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animated?: boolean
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animated = true
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl'
  }

  const defaultSizes = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '2.5rem', height: '2.5rem' },
    rectangular: { width: '100%', height: '10rem' },
    rounded: { width: '100%', height: '8rem' }
  }

  const sizes = {
    width: width || defaultSizes[variant].width,
    height: height || defaultSizes[variant].height
  }

  const Component = animated ? motion.div : 'div'

  return (
    <Component
      className={`
        bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        width: sizes.width,
        height: sizes.height,
        backgroundSize: '200% 100%',
      }}
      {...(animated ? {
        animate: {
          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }
      } : {})}
    />
  )
}

// Card skeleton for mobile
export function CardSkeleton() {
  return (
    <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="space-y-2">
            <Skeleton width={120} height={16} />
            <Skeleton width={80} height={12} />
          </div>
        </div>
        <Skeleton variant="rounded" width={60} height={24} />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Skeleton width="100%" height={12} />
        <Skeleton width="90%" height={12} />
        <Skeleton width="95%" height={12} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <Skeleton width={80} height={32} variant="rounded" />
        <Skeleton width={100} height={32} variant="rounded" />
      </div>
    </div>
  )
}

// List item skeleton for mobile
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 md:p-4 border-b border-gray-800/50">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1 space-y-2">
        <Skeleton width="70%" height={14} />
        <Skeleton width="50%" height={12} />
      </div>
      <Skeleton variant="circular" width={24} height={24} />
    </div>
  )
}

// Table row skeleton for mobile
export function TableRowSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 p-3 md:p-4 border-b border-gray-800/50">
      <div className="space-y-2">
        <Skeleton width="100%" height={12} />
        <Skeleton width="70%" height={10} />
      </div>
      <div className="space-y-2">
        <Skeleton width="80%" height={12} />
        <Skeleton width="60%" height={10} />
      </div>
      <div className="flex justify-end">
        <Skeleton variant="rounded" width={80} height={28} />
      </div>
    </div>
  )
}

// Site card skeleton
export function SiteCardSkeleton() {
  return (
    <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 md:p-5 space-y-4">
      {/* Header with favicon and title */}
      <div className="flex items-start gap-3">
        <Skeleton variant="rounded" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="80%" height={18} />
          <Skeleton width="60%" height={14} />
        </div>
        <Skeleton variant="circular" width={32} height={32} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-800/30">
        <div className="text-center space-y-2">
          <Skeleton width={40} height={24} className="mx-auto" />
          <Skeleton width={50} height={12} className="mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton width={40} height={24} className="mx-auto" />
          <Skeleton width={50} height={12} className="mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton width={40} height={24} className="mx-auto" />
          <Skeleton width={50} height={12} className="mx-auto" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Skeleton width="100%" height={36} variant="rounded" />
        <Skeleton width={100} height={36} variant="rounded" />
      </div>
    </div>
  )
}

// Issue card skeleton
export function IssueCardSkeleton() {
  return (
    <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 space-y-3">
      {/* Priority badge and status */}
      <div className="flex items-center justify-between">
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="rounded" width={70} height={24} />
      </div>

      {/* Title and description */}
      <div className="space-y-2">
        <Skeleton width="90%" height={16} />
        <Skeleton width="100%" height={12} />
        <Skeleton width="95%" height={12} />
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-3 pt-2">
        <Skeleton width={60} height={12} />
        <Skeleton width={80} height={12} />
      </div>

      {/* Action button */}
      <Skeleton width="100%" height={40} variant="rounded" />
    </div>
  )
}

// Dashboard stats skeleton
export function StatsCardSkeleton() {
  return (
    <div className="card bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 md:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton width={100} height={14} />
        <Skeleton variant="circular" width={36} height={36} />
      </div>
      <Skeleton width={80} height={32} />
      <div className="flex items-center gap-2">
        <Skeleton width={60} height={12} />
        <Skeleton width={40} height={12} />
      </div>
    </div>
  )
}

// Chat message skeleton
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <Skeleton variant="circular" width={36} height={36} />
      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <Skeleton
          width={isUser ? '80%' : '90%'}
          height={60}
          variant="rounded"
          className={isUser ? 'ml-auto' : ''}
        />
        <Skeleton width={80} height={10} />
      </div>
    </div>
  )
}

// Page header skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton width={200} height={28} />
          <Skeleton width={300} height={14} />
        </div>
        <Skeleton width={120} height={40} variant="rounded" className="hidden md:block" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Skeleton width={100} height={36} variant="rounded" />
        <Skeleton width={120} height={36} variant="rounded" />
        <Skeleton width={90} height={36} variant="rounded" />
      </div>
    </div>
  )
}

// Full page skeleton loader
export function PageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <PageHeaderSkeleton />

      {/* Mobile: Stack cards */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}
