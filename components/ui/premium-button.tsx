import React from 'react'
import { cn } from '@/lib/utils'

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gradient' | 'outline' | 'glass' | 'glow'
  gradient?: 'blue' | 'purple' | 'rainbow'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export function PremiumButton({
  variant = 'gradient',
  gradient = 'rainbow',
  size = 'md',
  className = '',
  children,
  ...props
}: PremiumButtonProps) {
  const gradients = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    rainbow: 'from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }

  const variants = {
    gradient: cn(
      'relative overflow-hidden',
      'bg-gradient-to-r',
      gradients[gradient],
      'text-white font-semibold',
      'rounded-xl',
      'shadow-lg',
      gradient === 'blue' && 'shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60',
      gradient === 'purple' && 'shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60',
      gradient === 'rainbow' && 'shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60',
      'transition-all duration-300',
      'active:scale-95',
      'group'
    ),
    outline: cn(
      'relative overflow-hidden',
      'bg-black',
      'border-2',
      gradient === 'blue' && 'border-blue-500 text-blue-400 hover:bg-blue-500/10',
      gradient === 'purple' && 'border-purple-500 text-purple-400 hover:bg-purple-500/10',
      gradient === 'rainbow' && 'border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-border',
      'rounded-xl',
      'font-semibold',
      'transition-all duration-300',
      'active:scale-95',
      'group'
    ),
    glass: cn(
      'relative overflow-hidden',
      'bg-white/10 backdrop-blur-xl',
      'border border-white/20',
      'text-white font-semibold',
      'rounded-xl',
      'hover:bg-white/15 hover:border-white/30',
      'shadow-lg hover:shadow-glow',
      'transition-all duration-300',
      'active:scale-95',
      'group'
    ),
    glow: cn(
      'relative overflow-hidden',
      'bg-transparent',
      'border-2',
      gradient === 'blue' && 'border-blue-500 text-blue-400 shadow-glow-blue hover:shadow-glow-blue hover:bg-blue-500/10',
      gradient === 'purple' && 'border-purple-500 text-purple-400 shadow-glow-purple hover:shadow-glow-purple hover:bg-purple-500/10',
      gradient === 'rainbow' && 'border-purple-500 text-purple-400 shadow-glow-purple hover:shadow-glow-purple hover:bg-purple-500/10',
      'rounded-xl',
      'font-semibold',
      'transition-all duration-300',
      'active:scale-95',
      'group'
    ),
  }

  return (
    <button
      className={cn(variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/* Shine effect */}
      <div className="
        absolute inset-0
        bg-gradient-to-r from-transparent via-white/20 to-transparent
        -translate-x-full
        group-hover:translate-x-full
        transition-transform duration-700
        pointer-events-none
      " />
    </button>
  )
}

interface GradientLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  gradient?: 'blue' | 'purple' | 'rainbow'
  children: React.ReactNode
}

export function GradientLink({
  gradient = 'rainbow',
  className = '',
  children,
  ...props
}: GradientLinkProps) {
  const gradients = {
    blue: 'from-blue-400 to-blue-600',
    purple: 'from-purple-400 to-pink-600',
    rainbow: 'from-blue-400 via-purple-500 to-pink-600',
  }

  return (
    <a
      className={cn(
        'inline-block',
        'bg-gradient-to-r',
        gradients[gradient],
        'bg-clip-text text-transparent',
        'hover:opacity-80',
        'transition-opacity duration-200',
        'font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
