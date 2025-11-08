/**
 * ShopifyChat Performance Test Wrapper
 * Use this component for performance profiling and testing
 */

'use client'

import { Profiler, ProfilerOnRenderCallback, useState } from 'react'
import { ShopifyChat } from './ShopifyChat.optimized'
import { usePerformanceMonitor } from '@/lib/hooks/usePerformanceMonitor'

interface RenderMetrics {
  id: string
  phase: 'mount' | 'update' | 'nested-update'
  actualDuration: number
  baseDuration: number
  startTime: number
  commitTime: number
}

export function ShopifyChatWithProfiling() {
  const [renderHistory, setRenderHistory] = useState<RenderMetrics[]>([])
  const [showMetrics, setShowMetrics] = useState(false)

  const { getMetrics, resetMetrics } = usePerformanceMonitor({
    componentId: 'ShopifyChat',
    threshold: 16,
    enabled: true,
    onSlowRender: (metrics) => {
      console.warn('Slow render detected:', metrics)
    },
  })

  const onRenderCallback: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    const metrics: RenderMetrics = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    }

    setRenderHistory((prev) => [...prev.slice(-99), metrics]) // Keep last 100

    // Log slow renders
    if (actualDuration > 16) {
      console.warn(`⚠️ Slow render (${actualDuration.toFixed(2)}ms):`, {
        id,
        phase,
        actualDuration: `${actualDuration.toFixed(2)}ms`,
        baseDuration: `${baseDuration.toFixed(2)}ms`,
        timestamp: new Date(startTime + performance.timeOrigin).toISOString(),
      })
    }
  }

  const averageRenderTime =
    renderHistory.length > 0
      ? renderHistory.reduce((sum, m) => sum + m.actualDuration, 0) / renderHistory.length
      : 0

  const slowRenders = renderHistory.filter((m) => m.actualDuration > 16).length

  return (
    <>
      <Profiler id="ShopifyChat" onRender={onRenderCallback}>
        <ShopifyChat />
      </Profiler>

      {/* Performance Metrics Overlay (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="fixed bottom-24 right-6 z-[60] px-3 py-2 bg-purple-600 text-white text-xs rounded-lg shadow-lg hover:bg-purple-700"
            title="Toggle Performance Metrics"
          >
            📊 {showMetrics ? 'Hide' : 'Show'} Metrics
          </button>

          {showMetrics && (
            <div className="fixed bottom-32 right-6 z-[60] w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  Performance Metrics
                </h3>
                <button
                  onClick={() => {
                    setRenderHistory([])
                    resetMetrics()
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Renders:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {renderHistory.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Avg Render Time:</span>
                  <span
                    className={`font-medium ${
                      averageRenderTime < 8
                        ? 'text-green-600 dark:text-green-400'
                        : averageRenderTime < 16
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {averageRenderTime.toFixed(2)}ms
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Slow Renders:</span>
                  <span
                    className={`font-medium ${
                      slowRenders === 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {slowRenders} ({((slowRenders / renderHistory.length) * 100 || 0).toFixed(1)}
                    %)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last Render:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {renderHistory.length > 0
                      ? `${renderHistory[renderHistory.length - 1].actualDuration.toFixed(2)}ms`
                      : 'N/A'}
                  </span>
                </div>

                {renderHistory.length > 0 && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Recent Renders:
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {renderHistory
                        .slice(-10)
                        .reverse()
                        .map((metric, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400"
                          >
                            <span>{metric.phase}</span>
                            <span
                              className={
                                metric.actualDuration > 16
                                  ? 'text-red-600 dark:text-red-400 font-medium'
                                  : ''
                              }
                            >
                              {metric.actualDuration.toFixed(2)}ms
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div
                    className={`text-xs font-medium ${
                      averageRenderTime < 8
                        ? 'text-green-600 dark:text-green-400'
                        : averageRenderTime < 16
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {averageRenderTime < 8
                      ? '🟢 Excellent Performance'
                      : averageRenderTime < 16
                      ? '🟡 Good Performance'
                      : '🔴 Needs Optimization'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
