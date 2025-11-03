'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'ring' | 'bars'
  className?: string
}

export function Spinner({ size = 'md', variant = 'default', className }: SpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  if (variant === 'dots') {
    return <SpinnerDots size={size} className={className} />
  }

  if (variant === 'pulse') {
    return <SpinnerPulse size={size} className={className} />
  }

  if (variant === 'ring') {
    return <SpinnerRing size={size} className={className} />
  }

  if (variant === 'bars') {
    return <SpinnerBars size={size} className={className} />
  }

  return (
    <svg
      className={cn('animate-spin text-white', sizeClasses[size], className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

function SpinnerDots({ size = 'md', className }: Pick<SpinnerProps, 'size' | 'className'>) {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn('bg-white rounded-full', dotSizes[size])}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  )
}

function SpinnerPulse({ size = 'md', className }: Pick<SpinnerProps, 'size' | 'className'>) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <motion.div
        className="absolute inset-0 bg-white/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      />
      <div className={cn('bg-white rounded-full', sizeClasses[size])} />
    </div>
  )
}

function SpinnerRing({ size = 'md', className }: Pick<SpinnerProps, 'size' | 'className'>) {
  const sizeClasses = {
    xs: 'w-3 h-3 border-[1.5px]',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
    xl: 'w-12 h-12 border-4',
  }

  return (
    <div
      className={cn(
        'border-white/20 border-t-white rounded-full animate-spin',
        sizeClasses[size],
        className
      )}
    />
  )
}

function SpinnerBars({ size = 'md', className }: Pick<SpinnerProps, 'size' | 'className'>) {
  const barHeights = {
    xs: 'h-3',
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
    xl: 'h-12',
  }

  const barWidths = {
    xs: 'w-0.5',
    sm: 'w-1',
    md: 'w-1',
    lg: 'w-1.5',
    xl: 'w-2',
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className={cn('bg-white rounded-full', barWidths[size], barHeights[size])}
          animate={{
            scaleY: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

export { SpinnerDots, SpinnerPulse, SpinnerRing, SpinnerBars }
