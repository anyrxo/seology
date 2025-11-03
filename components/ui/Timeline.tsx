'use client'

import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  id: string
  title: string
  description?: string
  timestamp: Date | string
  icon?: LucideIcon
  iconColor?: string
  iconBgColor?: string
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {items.map((item, index) => {
        const Icon = item.icon
        const isLast = index === items.length - 1

        return (
          <div key={item.id} className="relative flex gap-4">
            {/* Vertical line */}
            {!isLast && (
              <div className="absolute left-5 top-10 h-full w-px bg-gray-800" />
            )}

            {/* Icon */}
            <div
              className={cn(
                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
                item.iconBgColor || 'bg-gray-900',
                item.iconColor || 'border-gray-700'
              )}
            >
              {Icon && <Icon className="h-5 w-5" />}
            </div>

            {/* Content */}
            <div className="flex-1 pt-1.5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-400">{item.description}</p>
                  )}
                </div>
                <time className="shrink-0 text-xs text-gray-500">
                  {typeof item.timestamp === 'string'
                    ? item.timestamp
                    : item.timestamp.toLocaleString()}
                </time>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
