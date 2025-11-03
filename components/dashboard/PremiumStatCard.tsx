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
          'group relative h-full overflow-hidden rounded-3xl transition-all duration-500',
          'bg-white/10 backdrop-blur-2xl border border-white/20',
          'hover:bg-white/15 hover:border-white/30 hover:shadow-2xl',
          className
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Title */}
          <h3 className="text-sm font-medium text-white/60 mb-6 uppercase tracking-wider">
            {title}
          </h3>

          {/* Value - HUGE */}
          <div className="mb-4">
            <motion.p
              className="text-6xl sm:text-7xl font-bold text-white tabular-nums tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (delay / 1000) + 0.1,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {value}
            </motion.p>
          </div>

          {/* Trend label */}
          {trend && (
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-medium",
                trend.positive ? "text-emerald-300" : "text-amber-300"
              )}>
                {trend.label}
              </span>
            </div>
          )}
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
