'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { usePullToRefresh } from '@/lib/hooks/use-touch'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  threshold?: number
}

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80
}: PullToRefreshProps) {
  const {
    pullDistance,
    isRefreshing,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePullToRefresh(onRefresh, threshold)

  const progress = Math.min(pullDistance / threshold, 1)
  const rotation = progress * 360

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: pullDistance > 0 || isRefreshing ? 0 : -60,
          opacity: pullDistance > 0 || isRefreshing ? 1 : 0,
        }}
        className="
          absolute top-0 left-0 right-0
          h-16
          flex items-center justify-center
          pointer-events-none
          z-50
        "
      >
        <div className="
          bg-gray-800/90 backdrop-blur-sm
          border border-gray-700
          rounded-full
          px-4 py-2
          flex items-center gap-2
        ">
          {isRefreshing ? (
            <>
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="text-sm text-white">Refreshing...</span>
            </>
          ) : (
            <>
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <RefreshCw className="w-4 h-4 text-blue-400" />
              </motion.div>
              <span className="text-sm text-white">
                {progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </>
          )}
        </div>
      </motion.div>

      {/* Content with pull offset */}
      <motion.div
        animate={{
          y: isRefreshing ? 60 : pullDistance * 0.5, // Dampen the pull distance
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
