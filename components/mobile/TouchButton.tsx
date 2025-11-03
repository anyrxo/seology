'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useHaptic } from '@/lib/hooks/use-touch'

interface TouchButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  haptic?: boolean
  children: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function TouchButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  haptic = true,
  className,
  onClick,
  disabled,
  children,
  ...props
}: TouchButtonProps) {
  const { lightTap } = useHaptic()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (haptic) {
      lightTap()
    }

    onClick?.(e)
  }

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-blue-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800 border-gray-700',
    outline: 'bg-transparent text-white border-gray-600 hover:bg-gray-800 active:bg-gray-700',
    ghost: 'bg-transparent text-white hover:bg-gray-800 active:bg-gray-700 border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-red-600',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-touch',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
  }

  const { type, name, value, form, formAction, formEncType, formMethod, formNoValidate, formTarget, ...restProps } = props

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      name={name}
      value={value}
      form={form}
      formAction={formAction}
      formEncType={formEncType}
      formMethod={formMethod}
      formNoValidate={formNoValidate}
      formTarget={formTarget}
      aria-label={restProps['aria-label']}
      aria-describedby={restProps['aria-describedby']}
      aria-pressed={restProps['aria-pressed']}
      aria-expanded={restProps['aria-expanded']}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center',
        'font-medium rounded-xl',
        'border',
        'transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950',
        // Touch-friendly
        'min-w-touch',
        'active:translate-y-px',
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
        // Full width
        fullWidth && 'w-full',
        // Variants
        variants[variant],
        // Sizes
        sizes[size],
        className
      )}
    >
      {/* Ripple effect container */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
