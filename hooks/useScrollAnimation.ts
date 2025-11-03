import { useEffect, useRef, useState, useCallback } from 'react'

interface ScrollAnimationOptions {
  /**
   * Threshold at which the animation triggers (0 to 1)
   * @default 0.1
   */
  threshold?: number

  /**
   * Root margin for the intersection observer
   * @default "0px 0px -100px 0px" (triggers before element is fully visible)
   */
  rootMargin?: string

  /**
   * Whether to trigger animation only once
   * @default true (better for performance)
   */
  triggerOnce?: boolean

  /**
   * Delay before animation starts (in ms)
   * @default 0
   */
  delay?: number

  /**
   * Enable will-change CSS hint for better performance
   * Note: Use sparingly, can increase memory usage
   * @default false
   */
  enableWillChange?: boolean
}

interface ScrollAnimationReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  isVisible: boolean
  hasBeenVisible: boolean
  progress: number
}

/**
 * High-performance scroll animation hook using Intersection Observer
 *
 * Optimizations:
 * - Uses Intersection Observer API (better than scroll listeners)
 * - Automatically disconnects when not needed
 * - Optional will-change hints
 * - Tracks visibility progress
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
 *
 * <motion.div
 *   ref={ref}
 *   initial={{ opacity: 0, y: 20 }}
 *   animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 * >
 *   Content
 * </motion.div>
 */
export function useScrollAnimation<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true,
  delay = 0,
  enableWillChange = false,
}: ScrollAnimationOptions = {}): ScrollAnimationReturn<T> {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Add will-change hint if enabled
    if (enableWillChange && !isVisible) {
      element.style.willChange = 'transform, opacity'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting

        // Calculate progress (0 to 1)
        const ratio = entry.intersectionRatio
        setProgress(ratio)

        if (isIntersecting) {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true)
              setHasBeenVisible(true)

              // Remove will-change after animation starts
              if (enableWillChange) {
                setTimeout(() => {
                  if (element) element.style.willChange = 'auto'
                }, 1000)
              }
            }, delay)
          } else {
            setIsVisible(true)
            setHasBeenVisible(true)

            if (enableWillChange) {
              setTimeout(() => {
                if (element) element.style.willChange = 'auto'
              }, 1000)
            }
          }

          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          setIsVisible(false)
        }
      },
      {
        threshold: Array.isArray(threshold) ? threshold : [threshold],
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      observer.disconnect()
      if (enableWillChange && element) {
        element.style.willChange = 'auto'
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, enableWillChange, isVisible])

  return { ref, isVisible, hasBeenVisible, progress }
}

/**
 * Hook for staggered scroll animations
 * Use this for animating lists of items with delays
 *
 * @example
 * const items = useStaggeredAnimation(5, { baseDelay: 100 })
 *
 * items.map((item, i) => (
 *   <motion.div
 *     ref={item.ref}
 *     initial={{ opacity: 0, y: 20 }}
 *     animate={item.isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
 *     transition={{ delay: item.delay }}
 *   />
 * ))
 */
export function useStaggeredAnimation(
  count: number,
  options: ScrollAnimationOptions & { baseDelay?: number } = {}
) {
  const { baseDelay = 100, ...scrollOptions } = options

  return Array.from({ length: count }, (_, index) => {
    const animation = useScrollAnimation({
      ...scrollOptions,
      delay: (options.delay || 0) + (index * baseDelay),
    })

    return {
      ...animation,
      delay: index * baseDelay,
      index,
    }
  })
}
