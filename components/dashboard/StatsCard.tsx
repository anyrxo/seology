'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  className?: string
  delay?: number
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  delay = 0,
  loading = false,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className={cn('card pd-24px', className)}>
        <div className="flex-vertical gap-row-12px">
          <div className="skeleton-box card-icon-square _26px" />
          <div className="skeleton-box text-100" style={{ width: '60%' }} />
          <div className="skeleton-box text-300" style={{ width: '40%' }} />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className={cn('card pd-24px hover-card-link group', className)}
    >
      {/* Header with icon and trend badge */}
      <div className="w-layout-hflex flex-horizontal space-between align-center mg-bottom-16px">
        <motion.div
          className="card-icon-square _40px"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="w-5 h-5 color-accent-1" />
        </motion.div>

        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (delay / 1000) + 0.2 }}
            className={cn(
              'badge',
              trend.positive ? 'green' : 'red'
            )}
          >
            <div className="flex-horizontal gap-column-4px align-center">
              <span className="text-50 medium">
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Title */}
      <div className="rt-text-block text-100 medium color-neutral-600 mg-bottom-12px">
        {title}
      </div>

      {/* Value in card-amount-container */}
      <div className="w-layout-hflex flex-horizontal space-between align-center">
        <motion.div
          className={cn(
            'card-amount-container',
            trend?.positive ? 'green' : trend?.positive === false ? 'red' : ''
          )}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: (delay / 1000) + 0.1, duration: 0.5 }}
        >
          <div className="display-2 color-neutral-800">{value}</div>
        </motion.div>

        {trend && (
          <span className="text-50 color-neutral-500 medium">{trend.label}</span>
        )}
      </div>
    </motion.div>
  )
}

// Alternative compact version using Dashflow X pd-16px cards
export function CompactStatsCard({
  title,
  value,
  icon: Icon,
  className,
}: Omit<StatsCardProps, 'trend' | 'delay' | 'loading'>) {
  return (
    <div className={cn('card pd-16px hover-card-link', className)}>
      <div className="w-layout-hflex flex-horizontal gap-column-12px align-center">
        <div className="card-icon-square _26px neutral-icon">
          <Icon className="w-4 h-4 color-accent-1" />
        </div>
        <div className="flex-vertical flex-1">
          <p className="text-50 color-neutral-600 truncate">{title}</p>
          <p className="text-200 bold color-neutral-800">{value}</p>
        </div>
      </div>
    </div>
  )
}

// Alternative card with larger padding using pd-32px---24px
export function LargeStatsCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: Omit<StatsCardProps, 'delay' | 'loading'>) {
  return (
    <div className={cn('card pd-32px---24px hover-card-link', className)}>
      <div className="flex-vertical gap-row-24px">
        {/* Header */}
        <div className="w-layout-hflex flex-horizontal space-between align-center">
          <div className="card-icon-square _40px">
            <Icon className="w-6 h-6 color-accent-1" />
          </div>
          {trend && (
            <div className={cn('badge', trend.positive ? 'green' : 'red')}>
              <div className="text-50 medium">
                {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-vertical gap-row-8px">
          <div className="rt-text-block text-200 medium color-neutral-600">{title}</div>
          <div className="card-amount-container green">
            <div className="display-1 color-neutral-800">{value}</div>
          </div>
          {trend && (
            <div className="text-100 color-neutral-500">{trend.label}</div>
          )}
        </div>
      </div>
    </div>
  )
}

// Mini stat card with pd-22px---18px variant
export function MiniStatsCard({
  title,
  value,
  icon: Icon,
  className,
}: Omit<StatsCardProps, 'trend' | 'delay' | 'loading'>) {
  return (
    <div className={cn('card pd-22px---18px', className)}>
      <div className="flex-vertical gap-row-12px">
        <div className="flex-horizontal gap-column-8px align-center">
          <div className="card-icon-square _26px">
            <Icon className="w-4 h-4 color-accent-1" />
          </div>
          <span className="text-100 medium color-neutral-600">{title}</span>
        </div>
        <div className="text-300 bold color-neutral-800">{value}</div>
      </div>
    </div>
  )
}

// Grid of stats cards using Dashflow X grid classes
interface StatsGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}

export function StatsGrid({ children, cols = 4, className }: StatsGridProps) {
  const gridCols = {
    1: 'grid-1-column',
    2: 'grid-2-columns',
    3: 'grid-3-columns',
    4: 'grid-4-columns _1-column-tablet',
  }

  return (
    <div className={cn(gridCols[cols], 'gap-row-24px gap-column-12px', className)}>
      {children}
    </div>
  )
}
