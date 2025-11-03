'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white/10 text-white border-white/20 hover:bg-white/15',
        success: 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30',
        danger: 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30',
        info: 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30',
        outline: 'bg-transparent text-white border-white/20 hover:border-white/40 hover:bg-white/5',
      },
    },
    defaultVariants: {
      variant: 'default',
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
}

function Badge({
  className,
  variant,
  pulse = false,
  dot = false,
  dismissible = false,
  onDismiss,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
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
