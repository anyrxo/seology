'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-300 backdrop-blur-sm',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border-white/20 hover:bg-white/15 hover:shadow-lg hover:shadow-white/10',
        success: 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/40 hover:from-emerald-500/30 hover:to-green-500/30 hover:shadow-lg hover:shadow-emerald-500/30',
        warning: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/40 hover:from-amber-500/30 hover:to-yellow-500/30 hover:shadow-lg hover:shadow-amber-500/30',
        danger: 'bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 border-red-500/40 hover:from-red-500/30 hover:to-rose-500/30 hover:shadow-lg hover:shadow-red-500/30',
        info: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/40 hover:from-blue-500/30 hover:to-cyan-500/30 hover:shadow-lg hover:shadow-blue-500/30',
        neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30',
        outline: 'bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5',
        gradient: 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/40 hover:from-indigo-500/30 hover:via-purple-500/30 hover:to-pink-500/30 hover:shadow-lg hover:shadow-purple-500/30',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean
  dot?: boolean
  dismissible?: boolean
  onDismiss?: () => void
  glow?: boolean
}

function Badge({
  className,
  variant,
  size,
  pulse = false,
  dot = false,
  dismissible = false,
  onDismiss,
  glow = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        glow && 'animate-pulse',
        'relative',
        className
      )}
      {...props}
    >
      {/* Animated dot indicator */}
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                variant === 'success' && 'bg-green-400',
                variant === 'warning' && 'bg-yellow-400',
                variant === 'danger' && 'bg-red-400',
                variant === 'info' && 'bg-blue-400',
                (!variant || variant === 'default' || variant === 'outline') && 'bg-white'
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex rounded-full h-1.5 w-1.5',
              variant === 'success' && 'bg-green-400',
              variant === 'warning' && 'bg-yellow-400',
              variant === 'danger' && 'bg-red-400',
              variant === 'info' && 'bg-blue-400',
              (!variant || variant === 'default' || variant === 'outline') && 'bg-white'
            )}
          />
        </span>
      )}

      {/* Badge content */}
      <span>{children}</span>

      {/* Dismissible X button */}
      {dismissible && onDismiss && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          className="ml-0.5 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export { Badge, badgeVariants }
