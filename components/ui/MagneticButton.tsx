'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useOptimizedMousePosition, useHoverSupport, usePrefersReducedMotion, ANIMATION_DURATION } from '@/lib/animation-performance'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
  disabled?: boolean
}

/**
 * Optimized Magnetic Button with performance enhancements:
 * - Throttled mouse tracking (60fps)
 * - Respects reduced motion preferences
 * - Disabled on touch-only devices
 * - GPU-accelerated transforms
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const supportsHover = useHoverSupport()
  const prefersReducedMotion = usePrefersReducedMotion()

  // Only enable magnetic effect on hover-capable devices
  const enableMagnetic = supportsHover && !prefersReducedMotion && !disabled

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Gentle spring for smooth magnetic effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enableMagnetic || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Reduced magnetic strength (0.2 -> 0.15) for subtler effect
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const baseClasses = `
    inline-flex items-center justify-center px-8 py-4 rounded-xl
    font-bold text-lg transition-all
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${variant === 'primary'
      ? 'bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]'
      : 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60'
    }
    ${className}
  `

  const motionProps = {
    style: enableMagnetic ? { x: springX, y: springY } : {},
    whileHover: !prefersReducedMotion && !disabled ? { scale: 1.05 } : {},
    whileTap: !prefersReducedMotion && !disabled ? { scale: 0.95 } : {},
    transition: {
      scale: { duration: ANIMATION_DURATION.FAST / 1000 },
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  }

  if (href && !disabled) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
