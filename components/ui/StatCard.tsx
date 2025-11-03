'use client'

import * as React from 'react'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './card'

interface StatCardProps {
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
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  loading = false,
}: StatCardProps) {
  const isPositiveTrend = trend && trend.value >= 0

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-800" />
          <div className="h-8 w-32 animate-pulse rounded bg-gray-800" />
          <div className="h-3 w-24 animate-pulse rounded bg-gray-800" />
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && (
              <span
                className={cn(
                  'flex items-center text-sm font-medium',
                  isPositiveTrend ? 'text-green-400' : 'text-red-400'
                )}
              >
                {isPositiveTrend ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {(description || trend?.label) && (
            <p className="text-xs text-gray-500">
              {trend?.label || description}
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>
        )}
      </div>
    </Card>
  )
}
