'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

/**
 * Dashflow X Premium Button Component Library
 *
 * Features:
 * - 4 button variants: primary, secondary, ghost, icon
 * - 5 size variants: sm, md, lg, xl, icon
 * - Framer Motion animations (scale, lift, glow, rotation)
 * - Loading states with spinner
 * - Icon support (left/right)
 * - Ripple effect on click
 * - Full accessibility (ARIA, keyboard nav)
 * - Dark mode support
 * - Touch-friendly (min 44px tap targets)
 */

// Button variants using class-variance-authority
const dashflowButtonVariants = cva(
  // Base styles
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden touch-manipulation",
  {
    variants: {
      variant: {
        // Primary: Gradient blue to purple with glow effect
        primary: [
          "bg-gradient-to-r from-[#3d7fff] to-[#4b5dff]",
          "border border-[#3961d9]",
          "text-white",
          "shadow-[0_1px_4px_0_rgba(74,58,255,0.26)]",
          "hover:shadow-[0_2px_16px_1px_rgba(74,58,255,0.3)]",
          "hover:scale-[1.02]",
          "active:scale-[0.98]",
          "focus-visible:ring-[#4b5dff]",
          "dark:border-[#4b5dff]",
          "dark:shadow-[0_1px_4px_0_rgba(74,58,255,0.4)]",
          "dark:hover:shadow-[0_2px_16px_1px_rgba(74,58,255,0.5)]",
        ].join(" "),

        // Secondary: Glass-morphism style with border
        secondary: [
          "bg-white/90 dark:bg-white/10",
          "backdrop-blur-md",
          "border border-neutral-200 dark:border-white/20",
          "text-neutral-800 dark:text-white",
          "shadow-[0_2px_4px_0_rgba(20,20,43,0.04)]",
          "hover:bg-white dark:hover:bg-white/20",
          "hover:border-neutral-300 dark:hover:border-white/30",
          "hover:shadow-[0_2px_6px_0_rgba(20,20,43,0.1)]",
          "hover:scale-[1.02]",
          "active:scale-[0.98]",
          "focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
        ].join(" "),

        // Ghost: Transparent with smooth fill on hover
        ghost: [
          "bg-transparent",
          "border border-neutral-300/50 dark:border-white/20",
          "text-neutral-800 dark:text-white",
          "hover:bg-neutral-100 dark:hover:bg-white/10",
          "hover:border-neutral-400 dark:hover:border-white/40",
          "hover:shadow-sm",
          "active:scale-[0.98]",
          "focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
        ].join(" "),

        // Icon: Circular button with icon only
        icon: [
          "bg-white/90 dark:bg-white/10",
          "backdrop-blur-md",
          "border border-neutral-200 dark:border-white/20",
          "text-neutral-700 dark:text-white",
          "shadow-[0_2px_4px_0_rgba(20,20,43,0.04)]",
          "hover:bg-gradient-to-br hover:from-[#3d7fff] hover:to-[#4b5dff]",
          "hover:text-white",
          "hover:border-[#3961d9] dark:hover:border-[#4b5dff]",
          "hover:shadow-[0_2px_12px_0_rgba(74,58,255,0.3)]",
          "hover:scale-110 hover:rotate-3",
          "active:scale-95 active:rotate-0",
          "focus-visible:ring-[#4b5dff]",
        ].join(" "),
      },
      size: {
        sm: "h-9 px-3 text-xs gap-1.5 min-w-[44px]",
        md: "h-10 px-4 text-sm gap-2 min-w-[44px]",
        lg: "h-12 px-6 text-base gap-2.5 min-w-[44px]",
        xl: "h-14 px-8 text-lg gap-3 min-w-[44px]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface DashflowButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof dashflowButtonVariants> {
  children?: React.ReactNode
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  ripple?: boolean
  ariaLabel?: string
}

interface Ripple {
  x: number
  y: number
  id: number
}

/**
 * Primary Button Component
 * Gradient background with glow effect and smooth scale animation
 */
export const DashflowButtonPrimary = React.forwardRef<HTMLButtonElement, DashflowButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      ripple = true,
      disabled,
      onClick,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([])
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(ref, () => buttonRef.current!)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple && buttonRef.current && !disabled && !isLoading) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const id = Date.now()

        setRipples(prev => [...prev, { x, y, id }])

        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id))
        }, 600)
      }

      if (!disabled && !isLoading && onClick) {
        onClick(event)
      }
    }

    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={buttonRef}
        className={cn(dashflowButtonVariants({ variant, size, className }))}
        disabled={isDisabled}
        onClick={handleClick}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        {/* Left icon */}
        {leftIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button content */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading && loadingText ? loadingText : children}
        </span>

        {/* Right icon */}
        {rightIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Gradient overlay on hover */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-[#4b5dff] to-[#3d7fff] rounded-full opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </motion.button>
    )
  }
)
DashflowButtonPrimary.displayName = "DashflowButtonPrimary"

/**
 * Secondary Button Component
 * Glass-morphism style with backdrop blur and lift effect
 */
export const DashflowButtonSecondary = React.forwardRef<HTMLButtonElement, DashflowButtonProps>(
  (
    {
      className,
      size = "md",
      children,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      onClick,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={ref}
        className={cn(dashflowButtonVariants({ variant: "secondary", size, className }))}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98, y: 0 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        {leftIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <span className="relative z-10">
          {isLoading && loadingText ? loadingText : children}
        </span>

        {rightIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </motion.button>
    )
  }
)
DashflowButtonSecondary.displayName = "DashflowButtonSecondary"

/**
 * Ghost Button Component
 * Transparent with border, smooth fill on hover
 */
export const DashflowButtonGhost = React.forwardRef<HTMLButtonElement, DashflowButtonProps>(
  (
    {
      className,
      size = "md",
      children,
      isLoading,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      onClick,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={ref}
        className={cn(dashflowButtonVariants({ variant: "ghost", size, className }))}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        {leftIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <span className="relative z-10">
          {isLoading && loadingText ? loadingText : children}
        </span>

        {rightIcon && !isLoading && (
          <span className="flex items-center" aria-hidden="true">
            {rightIcon}
          </span>
        )}

        {/* Background fill effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-white/10 dark:to-white/5 rounded-full opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </motion.button>
    )
  }
)
DashflowButtonGhost.displayName = "DashflowButtonGhost"

/**
 * Icon Button Component
 * Circular button with icon, glow and rotation on hover
 */
export const DashflowButtonIcon = React.forwardRef<HTMLButtonElement, DashflowButtonProps>(
  (
    {
      className,
      children,
      isLoading,
      disabled,
      onClick,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <motion.button
        ref={ref}
        className={cn(dashflowButtonVariants({ variant: "icon", size: "icon", className }))}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.1, rotate: 3 } : undefined}
        whileTap={!isDisabled ? { scale: 0.95, rotate: 0 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
        aria-label={ariaLabel || "Icon button"}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <span className="relative z-10 flex items-center justify-center">
            {children}
          </span>
        )}

        {/* Glow effect on hover */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-br from-[#3d7fff]/20 to-[#4b5dff]/20 rounded-full opacity-0 blur-md"
          whileHover={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
      </motion.button>
    )
  }
)
DashflowButtonIcon.displayName = "DashflowButtonIcon"

/**
 * Unified Dashflow Button Component
 * Main export that includes all variants
 */
export const DashflowButton = React.forwardRef<HTMLButtonElement, DashflowButtonProps>(
  (
    {
      variant = "primary",
      ...props
    },
    ref
  ) => {
    switch (variant) {
      case "secondary":
        return <DashflowButtonSecondary ref={ref} {...props} />
      case "ghost":
        return <DashflowButtonGhost ref={ref} {...props} />
      case "icon":
        return <DashflowButtonIcon ref={ref} {...props} />
      case "primary":
      default:
        return <DashflowButtonPrimary ref={ref} variant={variant} {...props} />
    }
  }
)
DashflowButton.displayName = "DashflowButton"

// Export button variants helper for custom styling
export { dashflowButtonVariants }
