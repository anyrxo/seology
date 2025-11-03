'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './card'
import { useCountUp } from '@/hooks/useCountUp'
import { cardHoverGlow, iconBounce } from '@/lib/animation-enhancements'

interface EnhancedStatCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    label?: string
  }
  description?: string
  className?: string
  loading?: boolean
  animated?: boolean
}

export function EnhancedStatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  loading = false,
  animated = true,
}: EnhancedStatCardProps) {
  const isPositiveTrend = trend && trend.value >= 0
  const isNumericValue = typeof value === 'number'

  // Use counter animation for numeric values
  const counter = useCountUp({
    end: isNumericValue ? value : 0,
    duration: 2000,
    startOnView: true,
  })

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-2">
          <motion.div
            className="h-4 w-20 rounded bg-gray-800"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="h-8 w-32 rounded bg-gray-800"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1,
            }}
          />
          <motion.div
            className="h-3 w-24 rounded bg-gray-800"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      variants={animated ? cardHoverGlow : undefined}
      initial="rest"
      whileHover="hover"
      className="h-full"
    >
      <Card className={cn('p-6 h-full', className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <div className="flex items-baseline gap-2">
              {animated && isNumericValue ? (
                <motion.p
                  ref={counter.ref}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-3xl font-bold text-white tabular-nums"
                >
                  {counter.value}
                </motion.p>
              ) : (
                <p className="text-3xl font-bold text-white">{value}</p>
              )}
              {trend && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className={cn(
                    'flex items-center text-sm font-medium',
                    isPositiveTrend ? 'text-green-400' : 'text-red-400'
                  )}
                >
                  <motion.div
                    animate={
                      animated
                        ? {
                            y: isPositiveTrend ? [-2, 0, -2] : [2, 0, 2],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {isPositiveTrend ? (
                      <TrendingUp className="mr-1 h-4 w-4" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4" />
                    )}
                  </motion.div>
                  {Math.abs(trend.value)}%
                </motion.span>
              )}
            </div>
            {(description || trend?.label) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-xs text-gray-500"
              >
                {trend?.label || description}
              </motion.p>
            )}
          </div>
          {Icon && (
            <motion.div
              variants={animated ? iconBounce : undefined}
              initial="rest"
              whileHover="hover"
              className="rounded-lg bg-blue-500/10 p-3"
            >
              <Icon className="h-6 w-6 text-blue-400" />
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
