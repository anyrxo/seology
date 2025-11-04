'use client'

import { useCallback, useRef, useState, useEffect } from 'react'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeStart?: (direction: SwipeDirection | null) => void
  onSwipeEnd?: (direction: SwipeDirection | null) => void
}

interface SwipeConfig {
  threshold?: number // Minimum distance to be considered a swipe
  velocity?: number // Minimum velocity to be considered a swipe
  preventDefaultTouchmoveEvent?: boolean
}

interface SwipeState {
  isSwiping: boolean
  direction: SwipeDirection | null
  distance: number
}

const defaultConfig: Required<SwipeConfig> = {
  threshold: 50,
  velocity: 0.3,
  preventDefaultTouchmoveEvent: false,
}

export function useSwipe(handlers: SwipeHandlers = {}, config: SwipeConfig = {}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
  } = handlers

  const settings = { ...defaultConfig, ...config }

  const [state, setState] = useState<SwipeState>({
    isSwiping: false,
    direction: null,
    distance: 0,
  })

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const touchEndRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
    touchEndRef.current = null
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.touches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y

    // Determine swipe direction
    let direction: SwipeDirection | null = null
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > absY) {
      // Horizontal swipe
      direction = deltaX > 0 ? 'right' : 'left'
    } else {
      // Vertical swipe
      direction = deltaY > 0 ? 'down' : 'up'
    }

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    setState({
      isSwiping: distance > settings.threshold * 0.3,
      direction,
      distance,
    })

    if (settings.preventDefaultTouchmoveEvent && distance > settings.threshold * 0.3) {
      e.preventDefault()
    }

    if (!state.isSwiping && distance > settings.threshold * 0.3) {
      onSwipeStart?.(direction)
    }
  }, [settings.threshold, settings.preventDefaultTouchmoveEvent, onSwipeStart, state.isSwiping])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }

    const deltaX = touchEndRef.current.x - touchStartRef.current.x
    const deltaY = touchEndRef.current.y - touchStartRef.current.y
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const velocity = distance / deltaTime

    // Determine if it's a valid swipe
    if (distance > settings.threshold && velocity > settings.velocity) {
      let direction: SwipeDirection

      if (absX > absY) {
        // Horizontal swipe
        direction = deltaX > 0 ? 'right' : 'left'
        if (direction === 'left') {
          onSwipeLeft?.()
        } else {
          onSwipeRight?.()
        }
      } else {
        // Vertical swipe
        direction = deltaY > 0 ? 'down' : 'up'
        if (direction === 'up') {
          onSwipeUp?.()
        } else {
          onSwipeDown?.()
        }
      }

      onSwipeEnd?.(direction)
    } else {
      onSwipeEnd?.(null)
    }

    // Reset state
    setState({
      isSwiping: false,
      direction: null,
      distance: 0,
    })

    touchStartRef.current = null
    touchEndRef.current = null
  }, [settings.threshold, settings.velocity, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onSwipeEnd])

  useEffect(() => {
    const element = document

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: !settings.preventDefaultTouchmoveEvent })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, settings.preventDefaultTouchmoveEvent])

  return state
}

/**
 * Hook for swipeable cards/items
 */
export function useSwipeableItem(onDelete?: () => void, onArchive?: () => void) {
  const [offset, setOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const startXRef = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    setIsSwiping(true)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping) return

    const currentX = e.touches[0].clientX
    const diff = currentX - startXRef.current

    // Limit swipe distance
    const maxOffset = 100
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff))
    setOffset(limitedOffset)
  }, [isSwiping])

  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false)

    // Trigger actions based on swipe distance
    if (offset < -60) {
      // Swipe left - delete
      onDelete?.()
    } else if (offset > 60) {
      // Swipe right - archive
      onArchive?.()
    }

    // Reset offset
    setOffset(0)
  }, [offset, onDelete, onArchive])

  return {
    offset,
    isSwiping,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}

/**
 * Hook for horizontal page swiping
 */
export function usePageSwipe(onNext?: () => void, onPrevious?: () => void) {
  return useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrevious,
  }, {
    threshold: 100,
    velocity: 0.5,
  })
}
