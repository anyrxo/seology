'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Loader2, LucideIcon } from 'lucide-react'
import { useHaptic } from '@/lib/hooks/use-haptic'

interface MobileButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  haptic?: boolean
  hapticPattern?: 'light' | 'medium' | 'heavy'
  children: ReactNode
}

export function MobileButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  haptic = true,
  hapticPattern = 'light',
  disabled,
  className = '',
  onClick,
  children,
  ...props
}: MobileButtonProps) {
  const { vibrate } = useHaptic()

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-600/30 border border-blue-400/20',
    secondary: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg shadow-purple-600/30 border border-purple-400/20',
    outline: 'bg-transparent border-2 border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white hover:bg-blue-500/10',
    ghost: 'bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-white',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-600/30 border border-red-400/20',
    success: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-600/30 border border-green-400/20',
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-5 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Haptic feedback
    if (haptic) {
      vibrate(hapticPattern)
    }

    // Call original onClick
    onClick?.(e)
  }

  const buttonProps = {
    type: 'button' as const,
    disabled: disabled || loading,
    onClick: handleClick,
    className: `
      relative
      inline-flex items-center justify-center gap-2
      rounded-xl
      font-semibold
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed
      active:translate-y-0.5
      ${variants[variant]}
      ${sizes[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `,
  }

  return (
    <motion.button
      {...buttonProps}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Loading spinner */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-inherit rounded-xl"
        >
          <Loader2 className={`${iconSizes[size]} animate-spin`} />
        </motion.div>
      )}

      {/* Content */}
      <span className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
      </span>
    </motion.button>
  )
}

/**
 * Floating Action Button (FAB) for mobile
 */
export function FloatingActionButton({
  icon: Icon,
  onClick,
  variant = 'primary',
  haptic = true,
  className = '',
  ...props
}: {
  icon: LucideIcon
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  haptic?: boolean
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { vibrate } = useHaptic()

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-600/50',
    secondary: 'bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-600/50',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-600/50',
  }

  const handleClick = () => {
    if (haptic) {
      vibrate('medium')
    }
    onClick?.()
  }

  const fabProps = {
    type: 'button' as const,
    onClick: handleClick,
    className: `
      fixed bottom-20 right-4 md:bottom-6 md:right-6
      w-14 h-14 md:w-16 md:h-16
      rounded-full
      flex items-center justify-center
      text-white
      ${variants[variant]}
      z-50
      transition-all duration-200
      active:translate-y-1
      ${className}
    `,
  }

  return (
    <motion.button
      {...fabProps}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
    </motion.button>
  )
}

/**
 * Button group for mobile
 */
export function MobileButtonGroup({
  buttons,
  orientation = 'horizontal',
  fullWidth = false,
}: {
  buttons: Array<{
    label: string
    onClick: () => void
    variant?: MobileButtonProps['variant']
    icon?: LucideIcon
    disabled?: boolean
  }>
  orientation?: 'horizontal' | 'vertical'
  fullWidth?: boolean
}) {
  return (
    <div
      className={`
        flex gap-2
        ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {buttons.map((button, index) => (
        <MobileButton
          key={index}
          variant={button.variant}
          icon={button.icon}
          onClick={button.onClick}
          disabled={button.disabled}
          fullWidth={fullWidth}
          className={orientation === 'horizontal' ? 'flex-1' : ''}
        >
          {button.label}
        </MobileButton>
      ))}
    </div>
  )
}
