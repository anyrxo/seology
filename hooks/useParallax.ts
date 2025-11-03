import { useRef, useEffect } from 'react'
import { useScroll, useTransform, MotionValue, useSpring } from 'framer-motion'

interface UseParallaxOptions {
  /**
   * Speed multiplier for parallax effect
   * Positive values move down on scroll, negative move up
   * @default 0.5
   */
  speed?: number

  /**
   * Enable smooth spring animation
   * @default true
   */
  smooth?: boolean

  /**
   * Spring stiffness (only if smooth is true)
   * @default 100
   */
  stiffness?: number

  /**
   * Spring damping (only if smooth is true)
   * @default 30
   */
  damping?: number

  /**
   * Offset range for the parallax effect
   * @default [-100, 100]
   */
  range?: [number, number]
}

interface UseParallaxReturn {
  ref: React.RefObject<HTMLDivElement | null>
  y: MotionValue<number>
}

/**
 * High-performance parallax scroll effect using Framer Motion
 *
 * Uses transform: translateY for GPU acceleration and smooth 60fps scrolling.
 * Perfect for hero sections, background elements, and decorative content.
 *
 * Performance optimizations:
 * - Uses transform (GPU accelerated)
 * - Optional spring smoothing
 * - Efficient scroll tracking with useScroll
 * - Automatic cleanup
 *
 * @example
 * // Basic parallax
 * const { ref, y } = useParallax()
 *
 * <motion.div ref={ref} style={{ y }}>
 *   Background element
 * </motion.div>
 *
 * @example
 * // Fast upward parallax
 * const { ref, y } = useParallax({ speed: -1.5 })
 *
 * <motion.div ref={ref} style={{ y }}>
 *   Floats upward as you scroll
 * </motion.div>
 *
 * @example
 * // Custom range
 * const { ref, y } = useParallax({
 *   speed: 0.3,
 *   range: [-200, 200],
 *   smooth: true
 * })
 */
export function useParallax({
  speed = 0.5,
  smooth = true,
  stiffness = 100,
  damping = 30,
  range = [-100, 100],
}: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLDivElement>(null)

  // Track scroll progress relative to the element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Transform scroll progress to y position
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [range[0] * speed, range[1] * speed]
  )

  // Apply spring smoothing if enabled
  const smoothY = useSpring(y, {
    stiffness,
    damping,
  })

  return {
    ref,
    y: smooth ? smoothY : y,
  }
}

/**
 * Hook for parallax effect based on viewport scroll
 * Useful for full-page background effects
 */
export function useViewportParallax({
  speed = 0.5,
  smooth = true,
  stiffness = 100,
  damping = 30,
}: Omit<UseParallaxOptions, 'range'> = {}) {
  const { scrollY } = useScroll()

  // Transform scroll position to parallax offset
  const y = useTransform(scrollY, (value) => value * speed)

  // Apply spring smoothing if enabled
  const smoothY = useSpring(y, {
    stiffness,
    damping,
  })

  return smooth ? smoothY : y
}

/**
 * Hook for horizontal parallax effect
 * Useful for side-scrolling elements
 */
export function useHorizontalParallax({
  speed = 0.5,
  smooth = true,
  stiffness = 100,
  damping = 30,
  range = [-100, 100],
}: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [range[0] * speed, range[1] * speed]
  )

  const smoothX = useSpring(x, {
    stiffness,
    damping,
  })

  return {
    ref,
    x: smooth ? smoothX : x,
  }
}

/**
 * Hook for scale parallax effect
 * Element scales as you scroll
 */
export function useScaleParallax({
  scaleRange = [0.8, 1.2],
  smooth = true,
  stiffness = 100,
  damping = 30,
}: {
  scaleRange?: [number, number]
  smooth?: boolean
  stiffness?: number
  damping?: number
} = {}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)

  const smoothScale = useSpring(scale, {
    stiffness,
    damping,
  })

  return {
    ref,
    scale: smooth ? smoothScale : scale,
  }
}

/**
 * Hook for opacity parallax effect
 * Element fades as you scroll
 */
export function useOpacityParallax({
  opacityRange = [0, 1],
  smooth = true,
  stiffness = 100,
  damping = 30,
}: {
  opacityRange?: [number, number]
  smooth?: boolean
  stiffness?: number
  damping?: number
} = {}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange)

  const smoothOpacity = useSpring(opacity, {
    stiffness,
    damping,
  })

  return {
    ref,
    opacity: smooth ? smoothOpacity : opacity,
  }
}
