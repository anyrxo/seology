'use client'

import React, { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LucideIcon, ArrowRight, ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

// ============================================================================
// 1. GLASS CARD - Base glass-morphism card with backdrop blur
// ============================================================================

interface GlassCardProps {
  variant?: 'light' | 'medium' | 'heavy' | 'gradient' | 'glow'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  hover?: 'none' | 'lift' | 'glow' | 'scale'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  borderGradient?: boolean
  shimmer?: boolean
  innerGlow?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>
}

export function GlassCard({
  variant = 'medium',
  blur = 'xl',
  hover = 'lift',
  padding = 'md',
  animated = true,
  borderGradient = false,
  shimmer = false,
  innerGlow = false,
  className = '',
  children,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: GlassCardProps) {
  const variants = {
    light: 'bg-white/5 dark:bg-gray-900/30 border-white/10 dark:border-gray-700/30 shadow-lg',
    medium: 'bg-white/10 dark:bg-gray-900/40 border-white/20 dark:border-gray-700/40 shadow-xl',
    heavy: 'bg-white/20 dark:bg-gray-900/50 border-white/30 dark:border-gray-700/50 shadow-2xl',
    gradient: 'bg-gradient-to-br from-white/10 via-white/5 to-transparent dark:from-gray-900/40 dark:via-gray-900/20 border-white/20 dark:border-gray-700/40 shadow-xl',
    glow: 'bg-white/5 dark:bg-gray-900/30 border-white/10 dark:border-gray-700/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
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
    lift: 'hover:-translate-y-1 hover:shadow-2xl transition-all duration-300',
    glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:border-white/30 dark:hover:border-purple-500/50 transition-all duration-300',
    scale: 'hover:scale-[1.02] transition-all duration-300',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  }

  const Component = animated ? motion.div : 'div'
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
      }
    : {}

  if (animated) {
    return (
      <motion.div
        {...animationProps}
        className={cn(
          'relative rounded-xl border overflow-hidden group',
          variants[variant],
          blurs[blur],
          hoverEffects[hover],
          paddings[padding],
          className
        )}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Border gradient overlay */}
        {borderGradient && (
          <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude'
            }}
          />
        )}

        {/* Inner glow effect */}
        {innerGlow && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {/* Shimmer effect */}
        {shimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'relative rounded-xl border overflow-hidden group',
        variants[variant],
        blurs[blur],
        hoverEffects[hover],
        paddings[padding],
        className
      )}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Border gradient overlay */}
      {borderGradient && (
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      )}

      {/* Inner glow effect */}
      {innerGlow && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Shimmer effect */}
      {shimmer && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// ============================================================================
// 2. STAT CARD - Mini glass card for statistics with trend indicators
// ============================================================================

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    label?: string
    positive?: boolean
  }
  color?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  className?: string
  delay?: number
  loading?: boolean
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
  className,
  delay = 0,
  loading = false,
  onClick,
}: StatCardProps) {
  const colorVariants = {
    blue: {
      bg: 'from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30',
      shadow: 'group-hover:shadow-blue-500/20',
      text: 'text-blue-400 group-hover:text-blue-300',
      border: 'border-blue-500/30',
    },
    purple: {
      bg: 'from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30',
      shadow: 'group-hover:shadow-purple-500/20',
      text: 'text-purple-400 group-hover:text-purple-300',
      border: 'border-purple-500/30',
    },
    green: {
      bg: 'from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30',
      shadow: 'group-hover:shadow-green-500/20',
      text: 'text-green-400 group-hover:text-green-300',
      border: 'border-green-500/30',
    },
    red: {
      bg: 'from-red-500/20 to-rose-500/20 group-hover:from-red-500/30 group-hover:to-rose-500/30',
      shadow: 'group-hover:shadow-red-500/20',
      text: 'text-red-400 group-hover:text-red-300',
      border: 'border-red-500/30',
    },
    orange: {
      bg: 'from-orange-500/20 to-amber-500/20 group-hover:from-orange-500/30 group-hover:to-amber-500/30',
      shadow: 'group-hover:shadow-orange-500/20',
      text: 'text-orange-400 group-hover:text-orange-300',
      border: 'border-orange-500/30',
    },
    cyan: {
      bg: 'from-cyan-500/20 to-sky-500/20 group-hover:from-cyan-500/30 group-hover:to-sky-500/30',
      shadow: 'group-hover:shadow-cyan-500/20',
      text: 'text-cyan-400 group-hover:text-cyan-300',
      border: 'border-cyan-500/30',
    },
  }

  if (loading) {
    return (
      <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-10 bg-white/10 dark:bg-gray-800/50 rounded-xl" />
          <div className="h-4 w-20 bg-white/10 dark:bg-gray-800/50 rounded" />
          <div className="h-8 w-24 bg-white/10 dark:bg-gray-800/50 rounded" />
        </div>
      </div>
    )
  }

  const colors = colorVariants[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      onClick={onClick}
      className={cn(onClick && 'cursor-pointer')}
    >
      <div
        className={cn(
          'relative overflow-hidden bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6 group hover:bg-white/10 dark:hover:bg-gray-900/50 hover:border-white/20 dark:hover:border-gray-700/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
          className
        )}
      >
        {/* Gradient overlay on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
          colors.bg
        )} />

        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            {/* Icon with gradient background */}
            <motion.div
              className={cn(
                'p-2.5 sm:p-3 bg-gradient-to-br rounded-xl transition-all duration-300 shadow-lg',
                colors.bg,
                colors.shadow
              )}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className={cn('h-5 w-5 sm:h-6 sm:w-6 transition-colors', colors.text)} />
            </motion.div>

            {/* Trend badge */}
            {trend && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (delay / 1000) + 0.2 }}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border',
                  trend.positive !== false
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                )}
              >
                {trend.positive !== false ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                <span>{Math.abs(trend.value)}%</span>
              </motion.div>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-2 group-hover:text-gray-300 dark:group-hover:text-gray-400 transition-colors">
            {title}
          </h3>

          <div className="flex items-end justify-between">
            <motion.p
              className="text-3xl sm:text-4xl font-bold text-white tabular-nums"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (delay / 1000) + 0.1, duration: 0.5 }}
            >
              {value}
            </motion.p>

            {trend?.label && (
              <span className="text-xs text-gray-500 dark:text-gray-600 mb-1 font-medium">
                {trend.label}
              </span>
            )}
          </div>

          {/* Bottom gradient line */}
          <div className={cn(
            'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            colors.text
          )} />
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// 3. ACTION CARD - Interactive card for quick actions with hover effects
// ============================================================================

interface ActionCardProps {
  title: string
  description?: string
  icon: LucideIcon
  onClick?: () => void
  disabled?: boolean
  className?: string
  badge?: string
  badgeVariant?: 'success' | 'warning' | 'danger' | 'info' | 'default'
  showArrow?: boolean
  loading?: boolean
}

export function ActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  disabled = false,
  className,
  badge,
  badgeVariant = 'default',
  showArrow = true,
  loading = false,
}: ActionCardProps) {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      setIsPressed(true)
      onClick()
      setTimeout(() => setIsPressed(false), 300)
    }
  }

  if (loading) {
    return (
      <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6', className)}>
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-10 bg-white/10 dark:bg-gray-800/50 rounded-xl" />
          <div className="h-5 w-32 bg-white/10 dark:bg-gray-800/50 rounded" />
          <div className="h-4 w-48 bg-white/10 dark:bg-gray-800/50 rounded" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'relative overflow-hidden bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6 group transition-all duration-300',
        !disabled && 'cursor-pointer hover:bg-white/10 dark:hover:bg-gray-900/50 hover:border-white/20 dark:hover:border-purple-500/50 hover:shadow-2xl hover:-translate-y-1',
        disabled && 'opacity-50 cursor-not-allowed',
        isPressed && 'scale-95',
        className
      )}
    >
      {/* Ripple effect container */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Gradient overlay on hover */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          {/* Icon with rotation on hover */}
          <motion.div
            className="inline-flex p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300"
            whileHover={{ rotate: disabled ? 0 : 15 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={cn(
              'h-5 w-5 sm:h-6 sm:w-6 transition-colors',
              disabled ? 'text-gray-500' : 'text-blue-400 group-hover:text-blue-300'
            )} />
          </motion.div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                'text-base sm:text-lg font-semibold transition-colors',
                disabled ? 'text-gray-500' : 'text-white group-hover:text-blue-300'
              )}>
                {title}
              </h3>
              {badge && (
                <Badge variant={badgeVariant} size="sm">
                  {badge}
                </Badge>
              )}
            </div>
            {description && (
              <p className="text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-300 dark:group-hover:text-gray-400 transition-colors">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        {showArrow && !disabled && (
          <motion.div
            className="flex-shrink-0 ml-4"
            animate={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
          </motion.div>
        )}
      </div>

      {/* Bottom gradient line */}
      {!disabled && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </motion.div>
  )
}

// ============================================================================
// 4. INFO CARD - For displaying information with header, body, footer
// ============================================================================

interface InfoCardProps {
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  badge?: React.ReactNode
  icon?: LucideIcon
  variant?: 'default' | 'bordered' | 'elevated'
  collapsible?: boolean
  defaultExpanded?: boolean
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

export function InfoCard({
  title,
  description,
  children,
  footer,
  badge,
  icon: Icon,
  variant = 'default',
  collapsible = false,
  defaultExpanded = true,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const variants = {
    default: 'bg-white/5 dark:bg-gray-900/40 border-white/10 dark:border-gray-700/30',
    bordered: 'bg-white/10 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/40',
    elevated: 'bg-white/10 dark:bg-gray-900/50 border-white/20 dark:border-gray-700/40 shadow-2xl',
  }

  return (
    <div className={cn(
      'relative overflow-hidden backdrop-blur-xl border rounded-xl transition-all duration-300',
      variants[variant],
      className
    )}>
      {/* Inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      {(title || badge || Icon || collapsible) && (
        <div className={cn(
          'relative z-10 flex items-start justify-between p-4 sm:p-6 border-b border-white/10 dark:border-gray-700/20',
          collapsible && 'cursor-pointer hover:bg-white/5 dark:hover:bg-gray-900/50 transition-colors',
          headerClassName
        )}
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-3 flex-1">
            {Icon && (
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                <Icon className="h-5 w-5 text-blue-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {badge}
            {collapsible && (
              <motion.div
                animate={{ rotate: isExpanded ? 0 : -180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronUp className="h-5 w-5 text-gray-400" />
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      <motion.div
        initial={false}
        animate={{
          height: collapsible && !isExpanded ? 0 : 'auto',
          opacity: collapsible && !isExpanded ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className={cn('relative z-10 p-4 sm:p-6', bodyClassName)}>
          {children}
        </div>
      </motion.div>

      {/* Footer */}
      {footer && (
        <div className={cn(
          'relative z-10 p-4 sm:p-6 border-t border-white/10 dark:border-gray-700/20 bg-white/5 dark:bg-gray-900/30',
          footerClassName
        )}>
          {footer}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 5. SKELETON VARIANTS - Loading states for all card types
// ============================================================================

export function GlassCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6', className)}>
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-2/3 bg-white/10 dark:bg-gray-800/50 rounded" />
        <div className="h-4 w-full bg-white/10 dark:bg-gray-800/50 rounded" />
        <div className="h-4 w-4/5 bg-white/10 dark:bg-gray-800/50 rounded" />
      </div>
    </div>
  )
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6', className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-10 w-10 bg-white/10 dark:bg-gray-800/50 rounded-xl" />
        <div className="h-4 w-20 bg-white/10 dark:bg-gray-800/50 rounded" />
        <div className="h-8 w-24 bg-white/10 dark:bg-gray-800/50 rounded" />
      </div>
    </div>
  )
}

export function ActionCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl p-4 sm:p-6', className)}>
      <div className="animate-pulse space-y-3">
        <div className="h-10 w-10 bg-white/10 dark:bg-gray-800/50 rounded-xl" />
        <div className="h-5 w-32 bg-white/10 dark:bg-gray-800/50 rounded" />
        <div className="h-4 w-48 bg-white/10 dark:bg-gray-800/50 rounded" />
      </div>
    </div>
  )
}

export function InfoCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-700/30 rounded-xl overflow-hidden', className)}>
      <div className="p-4 sm:p-6 border-b border-white/10 dark:border-gray-700/20">
        <div className="animate-pulse space-y-2">
          <div className="h-5 w-32 bg-white/10 dark:bg-gray-800/50 rounded" />
          <div className="h-4 w-48 bg-white/10 dark:bg-gray-800/50 rounded" />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-full bg-white/10 dark:bg-gray-800/50 rounded" />
          <div className="h-4 w-4/5 bg-white/10 dark:bg-gray-800/50 rounded" />
          <div className="h-4 w-3/4 bg-white/10 dark:bg-gray-800/50 rounded" />
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 6. CARD GRID - Responsive grid for cards
// ============================================================================

interface CardGridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  className?: string
}

export function CardGrid({ children, cols = 3, className }: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4 sm:gap-6', gridCols[cols], className)}>
      {children}
    </div>
  )
}
