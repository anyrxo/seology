/**
 * Touch Gesture Hooks for Mobile Interactions
 */

import { useState, useRef, useCallback, TouchEvent } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface UseSwipeReturn {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
}

/**
 * Hook for detecting swipe gestures
 */
export function useSwipe(
  handlers: SwipeHandlers,
  threshold: number = 50
): UseSwipeReturn {
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const touchEnd = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchEnd.current = null
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    }
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    }
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) return

    const deltaX = touchStart.current.x - touchEnd.current.x
    const deltaY = touchStart.current.y - touchEnd.current.y

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Horizontal swipe
    if (absX > absY && absX > threshold) {
      if (deltaX > 0) {
        handlers.onSwipeLeft?.()
      } else {
        handlers.onSwipeRight?.()
      }
    }
    // Vertical swipe
    else if (absY > absX && absY > threshold) {
      if (deltaY > 0) {
        handlers.onSwipeUp?.()
      } else {
        handlers.onSwipeDown?.()
      }
    }

    touchStart.current = null
    touchEnd.current = null
  }, [handlers, threshold])

  return { onTouchStart, onTouchMove, onTouchEnd }
}

/**
 * Hook for pull-to-refresh functionality
 */
export function usePullToRefresh(
  onRefresh: () => Promise<void>,
  threshold: number = 80
) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const currentY = e.touches[0].clientY
    const distance = currentY - startY.current

    // Only allow pull down when at top of page
    if (window.scrollY === 0 && distance > 0) {
      setPullDistance(Math.min(distance, threshold * 1.5))
      // Prevent default scroll behavior while pulling
      if (distance > 10) {
        e.preventDefault()
      }
    }
  }, [threshold])

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    setPullDistance(0)
  }, [pullDistance, threshold, isRefreshing, onRefresh])

  return {
    pullDistance,
    isRefreshing,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

/**
 * Hook for haptic feedback simulation
 */
export function useHaptic() {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }, [])

  const lightTap = useCallback(() => vibrate(10), [vibrate])
  const mediumTap = useCallback(() => vibrate(20), [vibrate])
  const heavyTap = useCallback(() => vibrate(30), [vibrate])
  const success = useCallback(() => vibrate([10, 20, 10]), [vibrate])
  const error = useCallback(() => vibrate([20, 10, 20, 10, 20]), [vibrate])

  return { vibrate, lightTap, mediumTap, heavyTap, success, error }
}

/**
 * Hook to detect if user is on mobile device
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  if (typeof window !== 'undefined') {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    if (typeof window !== 'undefined') {
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }

  return isMobile
}
