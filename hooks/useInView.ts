import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /**
   * Threshold at which the callback is triggered (0 to 1)
   * Can be a number or array of numbers for multiple triggers
   * @default 0.1
   */
  threshold?: number | number[]

  /**
   * Root margin for the intersection observer
   * @default "0px"
   */
  rootMargin?: string

  /**
   * Whether to trigger only once
   * @default false
   */
  triggerOnce?: boolean

  /**
   * Root element for intersection observer
   * @default null (viewport)
   */
  root?: Element | null

  /**
   * Callback when element enters/exits viewport
   */
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

interface UseInViewReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  inView: boolean
  entry: IntersectionObserverEntry | undefined
}

/**
 * Optimized Intersection Observer hook for detecting element visibility
 *
 * This is more performant than scroll listeners and integrates well with
 * Framer Motion's viewport animations.
 *
 * @example
 * // Basic usage
 * const { ref, inView } = useInView({ threshold: 0.5 })
 *
 * <div ref={ref}>
 *   {inView ? 'Visible' : 'Not visible'}
 * </div>
 *
 * @example
 * // With callback
 * const { ref, inView } = useInView({
 *   threshold: 0.5,
 *   onChange: (inView, entry) => {
 *     console.log('Element is', inView ? 'visible' : 'hidden')
 *   }
 * })
 *
 * @example
 * // Multiple thresholds
 * const { ref, inView, entry } = useInView({
 *   threshold: [0, 0.25, 0.5, 0.75, 1],
 *   onChange: (inView, entry) => {
 *     console.log('Intersection ratio:', entry.intersectionRatio)
 *   }
 * })
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false,
  root = null,
  onChange,
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If triggerOnce and already triggered, don't observe
    if (triggerOnce && hasTriggeredRef.current) return

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        const isIntersecting = observerEntry.isIntersecting

        setEntry(observerEntry)
        setInView(isIntersecting)

        // Call onChange callback
        if (onChange) {
          onChange(isIntersecting, observerEntry)
        }

        // Handle triggerOnce
        if (isIntersecting && triggerOnce) {
          hasTriggeredRef.current = true
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, root, onChange])

  return { ref, inView, entry }
}

/**
 * Hook for detecting when element is fully in viewport
 * Convenience wrapper around useInView with threshold: 1
 */
export function useFullyInView<T extends HTMLElement>(
  options: Omit<UseInViewOptions, 'threshold'> = {}
): UseInViewReturn<T> {
  return useInView<T>({ ...options, threshold: 1 })
}

/**
 * Hook for detecting when element starts entering viewport
 * Convenience wrapper around useInView with threshold: 0
 */
export function useEnterView<T extends HTMLElement>(
  options: Omit<UseInViewOptions, 'threshold'> = {}
): UseInViewReturn<T> {
  return useInView<T>({ ...options, threshold: 0 })
}
