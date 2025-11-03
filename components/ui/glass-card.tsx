import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({
  variant = 'medium',
  blur = 'xl',
  children,
  className = '',
  hover = false
}: GlassCardProps) {
  const variants = {
    light: 'bg-white/5 border-white/10',
    medium: 'bg-white/10 border-white/20',
    heavy: 'bg-white/20 border-white/30',
  }

  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
  }

  return (
    <div className={cn(
      variants[variant],
      blurs[blur],
      'rounded-2xl border shadow-2xl transition-all duration-300',
      hover && 'hover:bg-white/15 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
      className
    )}>
      {children}
    </div>
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
