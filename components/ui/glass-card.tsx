'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy' | 'gradient' | 'glow'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children: React.ReactNode
  className?: string
  hover?: 'none' | 'lift' | 'glow' | 'scale'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  borderGradient?: boolean
}

export function GlassCard({
  variant = 'medium',
  blur = 'xl',
  children,
  className = '',
  hover = 'lift',
  padding = 'md',
  animated = true,
  borderGradient = false
}: GlassCardProps) {
  const variants = {
    light: 'bg-white/5 border-white/10 shadow-lg',
    medium: 'bg-white/10 border-white/20 shadow-xl',
    heavy: 'bg-white/20 border-white/30 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white/10 via-white/5 to-transparent border-white/20 shadow-xl',
    glow: 'bg-white/5 border-white/10 shadow-glow',
  }

  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
  }

  const hoverEffects = {
    none: '',
    lift: 'hover:-translate-y-1 hover:shadow-2xl',
    glow: 'hover:shadow-glow hover:border-white/30',
    scale: 'hover:scale-[1.02]',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  }

  const Component = animated ? motion.div : 'div'
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      }
    : {}

  return (
    <Component
      className={cn(
        'relative rounded-xl border transition-all duration-300',
        variants[variant],
        blurs[blur],
        hoverEffects[hover],
        paddings[padding],
        borderGradient && 'before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-br before:from-purple-500/50 before:via-pink-500/50 before:to-blue-500/50 before:-z-10',
        className
      )}
      {...motionProps}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  )
}

interface GlassPanelProps extends GlassCardProps {
  innerGlow?: boolean
  shimmer?: boolean
}

export function GlassPanel({
  children,
  className = '',
  innerGlow = false,
  shimmer = false,
  ...props
}: GlassPanelProps) {
  return (
    <GlassCard className={cn('relative overflow-hidden group', className)} {...props}>
      {/* Inner glow on hover */}
      {innerGlow && (
        <div className="
          absolute inset-0
          bg-gradient-to-br from-white/0 via-white/5 to-white/0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        " />
      )}

      {/* Shimmer effect */}
      {shimmer && (
        <div className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/10 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
          pointer-events-none
        " />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </GlassCard>
  )
}

interface FloatingGlassProps extends GlassCardProps {
  floatAnimation?: boolean
}

export function FloatingGlass({
  children,
  className = '',
  floatAnimation = true,
  ...props
}: FloatingGlassProps) {
  return (
    <GlassCard
      className={cn(
        'shadow-2xl shadow-black/50',
        floatAnimation && 'animate-float',
        className
      )}
      {...props}
    >
      {children}
    </GlassCard>
  )
}
