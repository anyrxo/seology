'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-white/90 active:scale-95 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 focus-visible:ring-white/50",
        secondary: "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 active:scale-95 focus-visible:ring-white/30",
        outline: "border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 active:scale-95 focus-visible:ring-white/30",
        ghost: "text-white hover:bg-white/10 active:scale-95",
        danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 focus-visible:ring-red-500/50",
        success: "bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 focus-visible:ring-green-500/50",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600 active:scale-95 shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30 focus-visible:ring-yellow-500/50",
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    isLoading,
    leftIcon,
    rightIcon,
    ripple = true,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => buttonRef.current!)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const id = Date.now()

        setRipples(prev => [...prev, { x, y, id }])

        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id))
        }, 600)
      }

      onClick?.(event)
    }

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={buttonRef}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple effect */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
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
        )}

        {/* Left icon */}
        {leftIcon && !isLoading && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}

        {/* Button content */}
        <span className="relative z-10">{children}</span>

        {/* Right icon */}
        {rightIcon && !isLoading && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
