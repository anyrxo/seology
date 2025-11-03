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
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
    >
      <Card
        className={cn(
          'relative border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:shadow-glow hover:-translate-y-1 transition-all duration-300 group cursor-default overflow-hidden',
          className
        )}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />

        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            {/* Icon with gradient background */}
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300" />
            </motion.div>

            {trend && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (delay / 1000) + 0.2 }}
                className={cn(
                  'flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm',
                  trend.positive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                )}
              >
                <svg
                  className={cn(
                    'h-3 w-3',
                    trend.positive ? 'rotate-0' : 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <span>{Math.abs(trend.value)}%</span>
              </motion.div>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">{title}</h3>

          <div className="flex items-end justify-between">
            <motion.p
              className="text-4xl font-bold text-white tabular-nums"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (delay / 1000) + 0.1, duration: 0.5 }}
            >
              {value}
            </motion.p>

            {trend && (
              <span className="text-xs text-gray-500 mb-1.5 font-medium">{trend.label}</span>
            )}
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
