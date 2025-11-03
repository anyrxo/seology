'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 focus-visible:ring-purple-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-indigo-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        secondary: "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 active:scale-95 focus-visible:ring-white/30 transition-all duration-300",
        outline: "border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/5 hover:shadow-lg hover:shadow-white/10 active:scale-95 focus-visible:ring-white/30 backdrop-blur-sm",
        ghost: "text-white hover:bg-white/10 active:scale-95 hover:shadow-inner",
        danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-2xl hover:shadow-red-500/50 active:scale-95 focus-visible:ring-red-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-rose-600 before:to-red-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        success: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-2xl hover:shadow-green-500/50 active:scale-95 focus-visible:ring-green-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-600 before:to-emerald-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        warning: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:shadow-2xl hover:shadow-yellow-500/50 active:scale-95 focus-visible:ring-yellow-500/50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-500 before:to-amber-400 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        link: "text-white underline-offset-4 hover:underline hover:text-purple-400 transition-colors",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        default: "h-10 px-4 py-2 gap-2",
        md: "h-10 px-4 gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
        xl: "h-14 px-8 text-lg gap-3",
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
