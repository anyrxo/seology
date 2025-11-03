import React from 'react'
import { cn } from '@/lib/utils'

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  gradient?: 'blue' | 'purple' | 'rainbow' | 'white'
  animated?: boolean
  borderWidth?: '1' | '2' | '3'
}

export function GradientBorder({
  children,
  className = '',
  gradient = 'rainbow',
  animated = false,
  borderWidth = '1'
}: GradientBorderProps) {
  const gradients = {
    blue: 'from-blue-500 via-blue-400 to-blue-600',
    purple: 'from-purple-500 via-pink-500 to-purple-600',
    rainbow: 'from-blue-500 via-purple-500 to-pink-500',
    white: 'from-white/50 via-white/70 to-white/50',
  }

  const borderWidths = {
    '1': 'p-[1px]',
    '2': 'p-[2px]',
    '3': 'p-[3px]',
  }

  return (
    <div className={cn('relative', borderWidths[borderWidth], 'rounded-2xl', className)}>
      {/* Animated gradient border */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-r rounded-2xl',
        gradients[gradient],
        animated && 'animate-spin-slow'
      )} />

      {/* Content background */}
      <div className="relative bg-black rounded-2xl h-full">
        {children}
      </div>
    </div>
  )
}

interface GradientOutlineProps {
  children: React.ReactNode
  className?: string
  gradient?: 'blue' | 'purple' | 'rainbow'
}

export function GradientOutline({
  children,
  className = '',
  gradient = 'rainbow'
}: GradientOutlineProps) {
  const gradients = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    rainbow: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
  }

  return (
    <div className={cn(
      'relative px-8 py-3',
      'bg-black',
      'border-2 border-transparent',
      'bg-clip-padding',
      'rounded-xl',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-r before:from-blue-500 before:to-purple-600',
      'before:rounded-xl before:p-[2px]',
      'before:-z-10',
      'hover:before:p-[3px]',
      'transition-all',
      className
    )}>
      {children}
    </div>
  )
}
