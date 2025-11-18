/**
 * Animation Performance Utilities
 * Optimizations for smooth 60fps animations
 */

import { useEffect, useRef, useCallback, useState } from 'react'

/**
 * Debounce function for scroll and mouse handlers
 * Prevents excessive callback invocations
 */
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for high-frequency events
 * Ensures function executes at most once per interval
 */
export function throttle<T extends (...args: never[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Request Animation Frame wrapper for smooth animations
 * Better than setTimeout/setInterval for visual updates
 */
export function useAnimationFrame(callback: (deltaTime: number) => void, deps: React.DependencyList = []) {
  const requestRef = useRef<number>(0)
  const previousTimeRef = useRef<number>(0)

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}

/**
 * Intersection Observer with performance optimizations
 * Reuses single observer for multiple elements
 */
class PerformantIntersectionObserver {
  private observer: IntersectionObserver | null = null
  private callbacks = new Map<Element, (isIntersecting: boolean) => void>()

  constructor(options: IntersectionObserverInit = {}) {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = this.callbacks.get(entry.target)
          if (callback) {
            callback(entry.isIntersecting)
          }
        })
      }, options)
    }
  }

  observe(element: Element, callback: (isIntersecting: boolean) => void) {
    if (!this.observer) return

    this.callbacks.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    if (!this.observer) return

    this.callbacks.delete(element)
    this.observer.unobserve(element)
  }

  disconnect() {
    if (!this.observer) return

    this.observer.disconnect()
    this.callbacks.clear()
  }
}

// Shared observer instances for better performance
export const scrollRevealObserver = new PerformantIntersectionObserver({
  threshold: 0.1,
  rootMargin: '-50px',
})

export const lazyLoadObserver = new PerformantIntersectionObserver({
  threshold: 0.01,
  rootMargin: '200px',
})

/**
 * Optimized will-change management
 * Adds will-change only when needed, removes after animation
 */
export function useWillChange(
  ref: React.RefObject<HTMLElement>,
  properties: string[],
  trigger: boolean
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (trigger) {
      // Add will-change before animation
      element.style.willChange = properties.join(', ')

      // Remove after animation completes (typically 300ms)
      const timeout = setTimeout(() => {
        element.style.willChange = 'auto'
      }, 300)

      return () => {
        clearTimeout(timeout)
        element.style.willChange = 'auto'
      }
    }
  }, [ref, properties, trigger])
}

/**
 * Detect if device supports hover (not touch-only)
 * Prevents hover animations on mobile
 */
export function useHoverSupport(): boolean {
  const [supportsHover, setSupportsHover] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)')
    setSupportsHover(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setSupportsHover(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return supportsHover
}

/**
 * Reduce motion check for accessibility
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * GPU acceleration utilities
 * Forces elements onto their own compositing layer
 */
export const GPU_ACCELERATED_STYLES = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,
}

/**
 * Animation timing constants for consistency
 */
export const ANIMATION_DURATION = {
  INSTANT: 100,      // Quick feedback
  FAST: 200,         // Fast interactions
  NORMAL: 300,       // Standard transitions
  MEDIUM: 500,       // Noticeable transitions
  SLOW: 800,         // Emphasis transitions
  MAX: 1000,         // Never exceed this
} as const

/**
 * Stagger delay calculator
 * Returns consistent stagger delays based on index
 */
export function getStaggerDelay(index: number, baseDelay = 50): number {
  // Cap maximum stagger delay to prevent slow reveals
  const maxDelay = 500
  const calculatedDelay = index * baseDelay
  return Math.min(calculatedDelay, maxDelay)
}

/**
 * Performance monitoring for animations
 * Logs slow animations in development
 */
export function monitorAnimationPerformance(
  name: string,
  callback: () => void
): void {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    callback()
    const end = performance.now()
    const duration = end - start

    if (duration > 16.67) {
      // Slower than 60fps
      console.warn(
        `Slow animation detected: "${name}" took ${duration.toFixed(2)}ms (target: <16.67ms for 60fps)`
      )
    }
  } else {
    callback()
  }
}

/**
 * Batch DOM reads and writes
 * Prevents layout thrashing
 */
export class DOMBatcher {
  private readQueue: (() => void)[] = []
  private writeQueue: (() => void)[] = []
  private scheduled = false

  read(callback: () => void) {
    this.readQueue.push(callback)
    this.scheduleFlush()
  }

  write(callback: () => void) {
    this.writeQueue.push(callback)
    this.scheduleFlush()
  }

  private scheduleFlush() {
    if (this.scheduled) return

    this.scheduled = true
    requestAnimationFrame(() => {
      // Execute all reads first
      this.readQueue.forEach((cb) => cb())
      this.readQueue = []

      // Then execute all writes
      this.writeQueue.forEach((cb) => cb())
      this.writeQueue = []

      this.scheduled = false
    })
  }
}

export const domBatcher = new DOMBatcher()

/**
 * Optimized mouse position tracking
 * Throttles updates and batches DOM operations
 */
export function useOptimizedMousePosition(
  ref: React.RefObject<HTMLElement>,
  enabled = true
) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return

    const handleMouseMove = throttle((e: MouseEvent) => {
      domBatcher.read(() => {
        const rect = element.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        domBatcher.write(() => {
          setPosition({ x, y })
        })
      })
    }, 16) // ~60fps

    element.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }, [ref, enabled])

  return position
}

/**
 * Visibility-based animation control
 * Pauses animations when element is off-screen
 */
export function useVisibilityPause(ref: React.RefObject<HTMLElement | null>) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [ref])

  return isVisible
}

