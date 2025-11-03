'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
      <Card className={cn('border-gray-800', className)}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-8 w-8 bg-gray-800 rounded-lg" />
            <div className="h-4 w-20 bg-gray-800 rounded" />
            <div className="h-8 w-24 bg-gray-800 rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      <Card
        className={cn(
          'border-gray-800 hover:border-blue-500/50 transition-all duration-300 group cursor-default',
          className
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>

            {trend && (
              <div
                className={cn(
                  'flex items-center space-x-1 text-sm font-medium',
                  trend.positive ? 'text-green-400' : 'text-red-400'
                )}
              >
                <svg
                  className={cn(
                    'h-4 w-4',
                    trend.positive ? 'rotate-0' : 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>

          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-white tabular-nums">{value}</p>

            {trend && (
              <span className="text-xs text-gray-500 mb-1">{trend.label}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Alternative compact version
export function CompactStatsCard({
  title,
  value,
  icon: Icon,
  className,
}: Omit<StatsCardProps, 'trend' | 'delay' | 'loading'>) {
  return (
    <div
      className={cn(
        'flex items-center space-x-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors',
        className
      )}
    >
      <div className="p-2 bg-blue-500/10 rounded-lg">
        <Icon className="h-5 w-5 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 truncate">{title}</p>
        <p className="text-xl font-bold text-white tabular-nums">{value}</p>
      </div>
    </div>
  )
}

// Grid of stats cards
interface StatsGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}

export function StatsGrid({ children, cols = 4, className }: StatsGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4 sm:gap-6', gridCols[cols], className)}>
      {children}
    </div>
  )
}
