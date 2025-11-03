import { useRef, RefObject } from 'react'
import { useMotionValue, useSpring, MotionValue } from 'framer-motion'

interface UseMagneticHoverOptions {
  /**
   * Strength of the magnetic effect (0 to 1)
   * @default 0.3
   */
  strength?: number

  /**
   * Spring stiffness
   * @default 150
   */
  stiffness?: number

  /**
   * Spring damping
   * @default 15
   */
  damping?: number

  /**
   * Enable/disable the effect
   * @default true
   */
  enabled?: boolean
}

interface UseMagneticHoverReturn<T extends HTMLElement> {
  ref: RefObject<T | null>
  x: MotionValue<number>
  y: MotionValue<number>
  onMouseMove: (e: React.MouseEvent<T>) => void
  onMouseLeave: () => void
}

/**
 * High-performance magnetic hover effect using Framer Motion springs
 *
 * Creates a subtle magnetic effect where elements follow the cursor.
 * Uses GPU-accelerated transforms for 60fps animations.
 *
 * Performance optimizations:
 * - Uses transform (GPU accelerated) instead of position
 * - Spring physics reduce jitter
 * - Automatic cleanup on unmount
 *
 * @example
 * const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticHover()
 *
 * <motion.button
 *   ref={ref}
 *   style={{ x, y }}
 *   onMouseMove={onMouseMove}
 *   onMouseLeave={onMouseLeave}
 * >
 *   Hover me!
 * </motion.button>
 *
 * @example
 * // Stronger magnetic effect
 * const magnetic = useMagneticHover({
 *   strength: 0.5,
 *   stiffness: 200,
 *   damping: 10
 * })
 */
export function useMagneticHover<T extends HTMLElement>({
  strength = 0.3,
  stiffness = 150,
  damping = 15,
  enabled = true,
}: UseMagneticHoverOptions = {}): UseMagneticHoverReturn<T> {
  const ref = useRef<T>(null)

  // Motion values for x and y position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Apply spring physics for smooth animation
  const springConfig = { stiffness, damping }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const onMouseMove = (e: React.MouseEvent<T>) => {
    if (!enabled || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    // Apply strength multiplier
    x.set(deltaX * strength)
    y.set(deltaY * strength)
  }

  const onMouseLeave = () => {
    // Reset to center position
    x.set(0)
    y.set(0)
  }

  return {
    ref,
    x: springX,
    y: springY,
    onMouseMove,
    onMouseLeave,
  }
}

/**
 * Hook for subtle magnetic effect on cards/buttons
 * Pre-configured for subtle UI interactions
 */
export function useMagneticCard<T extends HTMLElement>() {
  return useMagneticHover<T>({
    strength: 0.15,
    stiffness: 200,
    damping: 20,
  })
}

/**
 * Hook for strong magnetic effect on CTAs
 * Pre-configured for prominent buttons
 */
export function useMagneticButton<T extends HTMLElement>() {
  return useMagneticHover<T>({
    strength: 0.4,
    stiffness: 120,
    damping: 12,
  })
}
