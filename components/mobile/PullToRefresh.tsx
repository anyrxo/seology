'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  threshold?: number
  disabled?: boolean
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [startY, setStartY] = useState(0)
  const [canPull, setCanPull] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only allow pull-to-refresh when at the top of the scroll container
      if (container.scrollTop === 0 && !isRefreshing) {
        setStartY(e.touches[0].clientY)
        setCanPull(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!canPull || isRefreshing) return

      const currentY = e.touches[0].clientY
      const distance = currentY - startY

      // Only pull down (positive distance)
      if (distance > 0) {
        // Prevent default scroll behavior
        e.preventDefault()

        // Apply rubber band effect - the further you pull, the more resistance
        const rubberBandDistance = Math.min(
          distance * 0.5, // 50% resistance
          threshold * 1.5  // Max pull distance
        )
        setPullDistance(rubberBandDistance)
      }
    }

    const handleTouchEnd = async () => {
      if (!canPull) return

      setCanPull(false)

      // If pulled beyond threshold, trigger refresh
      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } catch (error) {
          console.error('Refresh failed:', error)
        } finally {
          setIsRefreshing(false)
        }
      }

      // Reset pull distance with animation
      setPullDistance(0)
    }

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      container.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [canPull, pullDistance, threshold, isRefreshing, onRefresh, disabled, startY])

  // Calculate rotation based on pull distance
  const rotation = (pullDistance / threshold) * 180

  // Calculate opacity and scale
  const indicatorOpacity = Math.min(pullDistance / threshold, 1)
  const indicatorScale = Math.min(0.5 + (pullDistance / threshold) * 0.5, 1)

  // Determine if threshold is reached
  const thresholdReached = pullDistance >= threshold

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-auto"
      style={{
        transform: `translateY(${isRefreshing ? threshold : pullDistance}px)`,
        transition: isRefreshing || pullDistance === 0 ? 'transform 0.3s ease-out' : 'none'
      }}
    >
      {/* Pull-to-refresh indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
            style={{
              height: threshold,
              transform: `translateY(-${threshold}px)`
            }}
          >
            <motion.div
              animate={{
                rotate: isRefreshing ? 360 : rotation,
                scale: indicatorScale,
                opacity: indicatorOpacity
              }}
              transition={{
                rotate: isRefreshing ? {
                  repeat: Infinity,
                  duration: 1,
                  ease: 'linear'
                } : {
                  duration: 0
                },
                scale: { duration: 0 },
                opacity: { duration: 0 }
              }}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${thresholdReached
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700/80'
                }
                transition-colors duration-200
              `}
            >
              <RefreshCw
                className={`
                  w-5 h-5
                  ${thresholdReached ? 'text-white' : 'text-gray-400'}
                  transition-colors duration-200
                `}
              />
            </motion.div>

            {/* Pull instruction text */}
            {!isRefreshing && (
              <motion.div
                animate={{ opacity: indicatorOpacity }}
                className="absolute top-14 left-0 right-0 text-center"
              >
                <p className="text-sm font-medium text-gray-400">
                  {thresholdReached ? 'Release to refresh' : 'Pull to refresh'}
                </p>
              </motion.div>
            )}

            {/* Refreshing text */}
            {isRefreshing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-14 left-0 right-0 text-center"
              >
                <p className="text-sm font-medium text-blue-400">
                  Refreshing...
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {children}
    </div>
  )
}
