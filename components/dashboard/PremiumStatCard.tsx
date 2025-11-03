'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PremiumStatCardProps {
  title: string
  value: string | number
  icon: LucideIcon | string
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  delay?: number
  className?: string
}

export function PremiumStatCard({
  title,
  value,
  icon,
  trend,
  delay = 0,
  className,
}: PremiumStatCardProps) {
  const IconComponent = typeof icon === 'string' ? null : icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <div
        className={cn(
          'group relative h-full overflow-hidden rounded-2xl transition-all duration-500',
          'bg-white/5 backdrop-blur-xl border border-white/10',
          'hover:bg-white/10 hover:border-white/20 hover:shadow-glow',
          className
        )}
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700 pointer-events-none" />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-6">
          <div className="flex items-start justify-between mb-4">
            {/* Icon with gradient background and glow */}
            <motion.div
              className={cn(
                'p-3 rounded-xl transition-all duration-300',
                'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
                'group-hover:from-blue-500/30 group-hover:to-purple-500/30',
                'group-hover:shadow-lg group-hover:shadow-blue-500/20',
                'backdrop-blur-sm border border-white/10'
              )}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              {IconComponent ? (
                <IconComponent className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
              ) : (
                <span className="text-2xl">{String(icon)}</span>
              )}
            </motion.div>

            {/* Trend badge */}
            {trend && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (delay / 1000) + 0.2 }}
                className={cn(
                  'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
                  'backdrop-blur-sm border transition-all duration-300',
                  trend.positive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30 group-hover:shadow-lg group-hover:shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30 group-hover:shadow-lg group-hover:shadow-amber-500/20'
                )}
              >
                <svg
                  className={cn(
                    'h-3 w-3 transition-transform group-hover:scale-110',
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

          {/* Title */}
          <h3 className="text-sm font-medium text-gray-400 mb-3 group-hover:text-gray-300 transition-colors">
            {title}
          </h3>

          {/* Value and trend label */}
          <div className="flex items-end justify-between">
            <motion.p
              className="text-4xl font-bold text-white tabular-nums tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: (delay / 1000) + 0.1,
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {value}
            </motion.p>

            {trend && (
              <span className="text-xs text-gray-500 mb-1.5 font-medium group-hover:text-gray-400 transition-colors">
                {trend.label}
              </span>
            )}
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    </motion.div>
  )
}

// Compact version for smaller spaces
export function CompactPremiumStatCard({
  title,
  value,
  icon,
  className,
}: Omit<PremiumStatCardProps, 'trend' | 'delay'>) {
  const IconComponent = typeof icon === 'string' ? null : icon

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group flex items-center gap-4 p-4 rounded-xl transition-all duration-300',
        'bg-white/5 backdrop-blur-xl border border-white/10',
        'hover:bg-white/10 hover:border-white/20 hover:shadow-glow',
        className
      )}
    >
      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
        {IconComponent ? (
          <IconComponent className="h-5 w-5 text-blue-400" />
        ) : (
          <span className="text-xl">{String(icon)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-400 truncate group-hover:text-gray-300 transition-colors">
          {title}
        </p>
        <p className="text-xl font-bold text-white tabular-nums">
          {value}
        </p>
      </div>
    </motion.div>
  )
}
