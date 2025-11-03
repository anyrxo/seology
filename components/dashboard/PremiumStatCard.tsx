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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <div
        className={cn(
          'group relative h-full overflow-hidden rounded-3xl transition-all duration-500',
          'bg-white/10 backdrop-blur-2xl border border-white/20',
          'hover:bg-white/20 hover:border-white/40 hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,0.3)]',
          className
        )}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-transparent transition-all duration-700 pointer-events-none" />

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-10">
          {/* Title with better spacing */}
          <h3 className="text-xs font-bold text-white/70 mb-8 uppercase tracking-[0.2em] leading-none">
            {title}
          </h3>

          {/* Value - MASSIVE and BEAUTIFUL */}
          <div className="mb-6">
            <motion.p
              className="text-7xl sm:text-8xl lg:text-9xl font-black text-white tabular-nums tracking-tighter leading-none"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (delay / 1000) + 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100
              }}
            >
              {value}
            </motion.p>
          </div>

          {/* Trend label with icon */}
          {trend && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (delay / 1000) + 0.4 }}
              className="flex items-center gap-2"
            >
              <span className={cn(
                "text-base font-semibold",
                trend.positive ? "text-emerald-300" : "text-amber-300"
              )}>
                {trend.label}
              </span>
            </motion.div>
          )}
        </div>

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
