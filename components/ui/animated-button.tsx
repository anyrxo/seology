'use client'

import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useRipple } from '@/hooks/useRipple'
import { buttonTap } from '@/lib/animations'

const animatedButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-600 text-white shadow hover:bg-blue-700 focus-visible:ring-blue-500 hover:shadow-lg hover:shadow-blue-600/50',
        secondary:
          'bg-gray-700 text-white shadow-sm hover:bg-gray-600 focus-visible:ring-gray-500 hover:shadow-md',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500 hover:shadow-lg hover:shadow-red-600/50',
        outline:
          'border border-gray-700 bg-transparent hover:bg-gray-800 hover:text-white focus-visible:ring-gray-500',
        ghost: 'hover:bg-gray-800 hover:text-white',
        link: 'text-blue-500 underline-offset-4 hover:underline',
        success:
          'bg-green-600 text-white shadow-sm hover:bg-green-700 focus-visible:ring-green-500 hover:shadow-lg hover:shadow-green-600/50',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'>,
    VariantProps<typeof animatedButtonVariants> {
  asChild?: boolean
  isLoading?: boolean
  children?: React.ReactNode
  withRipple?: boolean
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      children,
      disabled,
      withRipple = true,
      onClick,
      ...props
    },
    ref
  ) => {
    const createRipple = useRipple()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withRipple && !disabled && !isLoading) {
        createRipple(e)
      }
      onClick?.(e)
    }

    if (asChild) {
      // When using asChild, we need to use a regular Slot without motion props
      return (
        <Slot
          className={cn(animatedButtonVariants({ variant, size, className }))}
          onClick={handleClick as unknown as React.MouseEventHandler<HTMLElement>}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(animatedButtonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        onClick={handleClick}
        whileTap={!disabled && !isLoading ? buttonTap : undefined}
        whileHover={
          !disabled && !isLoading
            ? {
                scale: 1.02,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
AnimatedButton.displayName = 'AnimatedButton'

export { AnimatedButton, animatedButtonVariants }
