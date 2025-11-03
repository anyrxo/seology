/**
 * Performance-Optimized Animation Utilities
 *
 * Features:
 * - Uses CSS transforms for GPU acceleration
 * - Respects prefers-reduced-motion
 * - Efficient scroll animations with IntersectionObserver
 * - Debounced scroll handlers
 */

import { MotionProps, Variants } from 'framer-motion'

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Optimized fade-in animation
 * Uses opacity and transform for GPU acceleration
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Custom easing for smoothness
    },
  },
}

/**
 * Optimized fade-in with delay
 */
export const fadeInWithDelay = (delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

/**
 * Staggered children animation
 */
export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * Scale animation for buttons/cards
 */
export const scaleOnHover: MotionProps = {
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  whileTap: {
    scale: 0.95,
  },
}

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/**
 * Default viewport options for scroll animations
 * Uses IntersectionObserver internally for performance
 */
export const defaultViewport = {
  once: true, // Only animate once
  margin: '-100px', // Trigger 100px before element enters viewport
  amount: 0.3, // Trigger when 30% of element is visible
}

/**
 * Optimized motion props that respect reduced motion preference
 */
export function getMotionProps(variants: Variants, viewport = defaultViewport): MotionProps {
  if (prefersReducedMotion()) {
    return {
      initial: 'visible',
      animate: 'visible',
      variants,
    }
  }

  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport,
    variants,
  }
}

/**
 * Debounce function for scroll handlers
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * RequestAnimationFrame wrapper for smooth animations
 */
export function rafThrottle<T extends (...args: unknown[]) => void>(
  callback: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null

  return function throttled(...args: Parameters<T>) {
    if (rafId !== null) {
      return
    }

    rafId = requestAnimationFrame(() => {
      callback(...args)
      rafId = null
    })
  }
}

/**
 * Intersection Observer hook for lazy loading/animations
 */
export class LazyAnimationObserver {
  private observer: IntersectionObserver | null = null
  private elements = new Map<Element, () => void>()

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const callback = this.elements.get(entry.target)
              if (callback) {
                callback()
                this.unobserve(entry.target)
              }
            }
          })
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        }
      )
    }
  }

  observe(element: Element, callback: () => void) {
    if (!this.observer) {
      callback() // Fallback if IntersectionObserver not supported
      return
    }

    this.elements.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    if (!this.observer) return

    this.observer.unobserve(element)
    this.elements.delete(element)
  }

  disconnect() {
    if (!this.observer) return

    this.observer.disconnect()
    this.elements.clear()
  }
}

/**
 * Optimized spring animation config
 */
export const springConfig = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
  mass: 0.5,
}

/**
 * Will-change optimization
 * Add will-change CSS property to elements that will animate
 */
export function addWillChange(element: HTMLElement, properties: string[]) {
  element.style.willChange = properties.join(', ')
}

export function removeWillChange(element: HTMLElement) {
  element.style.willChange = 'auto'
}
