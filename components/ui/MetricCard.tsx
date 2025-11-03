'use client'

import * as React from 'react'
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from './card'
import { ProgressCircle } from './ProgressCircle'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
    type?: 'increase' | 'decrease' | 'neutral'
  }
  icon?: LucideIcon
  iconColor?: string
  progress?: number // 0-100
  description?: string
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-400',
  progress,
  description,
  className,
  variant = 'default',
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return null

    const type = change.type || (change.value > 0 ? 'increase' : change.value < 0 ? 'decrease' : 'neutral')

    if (type === 'increase') return <TrendingUp className="h-4 w-4" />
    if (type === 'decrease') return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  const getTrendColor = () => {
    if (!change) return ''

    const type = change.type || (change.value > 0 ? 'increase' : change.value < 0 ? 'decrease' : 'neutral')

    if (type === 'increase') return 'text-green-400 bg-green-400/10'
    if (type === 'decrease') return 'text-red-400 bg-red-400/10'
    return 'text-gray-400 bg-gray-400/10'
  }

  if (variant === 'compact') {
    return (
      <Card className={cn('p-4', className)}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs text-gray-400">{title}</p>
            <p className="text-xl font-bold text-white">{value}</p>
          </div>
          {Icon && (
            <div className={cn('rounded-lg p-2', iconColor)}>
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </Card>
    )
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">{title}</p>
              {Icon && (
                <div className={cn('rounded-lg p-2', iconColor)}>
                  <Icon className="h-5 w-5" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">{value}</p>

              {progress !== undefined && (
                <div className="space-y-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{progress}% of goal</p>
                </div>
              )}

              {change && (
                <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium', getTrendColor())}>
                  {getTrendIcon()}
                  <span>{Math.abs(change.value)}%</span>
                  <span className="text-gray-400">{change.label}</span>
                </div>
              )}

              {description && (
                <p className="text-xs text-gray-500">{description}</p>
              )}
            </div>
          </div>

          {progress !== undefined && (
            <ProgressCircle value={progress} size={80} strokeWidth={6} showValue />
          )}
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium', getTrendColor())}>
              {getTrendIcon()}
              <span>{Math.abs(change.value)}%</span>
              <span className="text-gray-400">{change.label}</span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn('rounded-lg p-3', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  )
}
