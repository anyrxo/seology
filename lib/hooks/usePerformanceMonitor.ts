/**
 * Performance Monitoring Hook
 * Tracks component render performance and reports slow renders
 */

import { useEffect, useRef, useCallback } from 'react'

interface PerformanceMetrics {
  componentId: string
  renderCount: number
  totalRenderTime: number
  averageRenderTime: number
  slowRenders: number
  lastRenderTime: number
}

interface PerformanceMonitorOptions {
  componentId: string
  threshold?: number // ms - renders slower than this are logged
  enabled?: boolean
  onSlowRender?: (metrics: PerformanceMetrics) => void
}

const metricsStore = new Map<string, PerformanceMetrics>()

export function usePerformanceMonitor({
  componentId,
  threshold = 16, // 60fps threshold
  enabled = process.env.NODE_ENV === 'development',
  onSlowRender,
}: PerformanceMonitorOptions) {
  const renderStartTime = useRef<number>(0)
  const renderCount = useRef<number>(0)
  const totalRenderTime = useRef<number>(0)
  const slowRenderCount = useRef<number>(0)

  // Start timing at render
  renderStartTime.current = performance.now()

  useEffect(() => {
    if (!enabled) return

    // Calculate render time
    const renderTime = performance.now() - renderStartTime.current

    // Update metrics
    renderCount.current += 1
    totalRenderTime.current += renderTime

    const metrics: PerformanceMetrics = {
      componentId,
      renderCount: renderCount.current,
      totalRenderTime: totalRenderTime.current,
      averageRenderTime: totalRenderTime.current / renderCount.current,
      slowRenders: slowRenderCount.current,
      lastRenderTime: renderTime,
    }

    // Check for slow render
    if (renderTime > threshold) {
      slowRenderCount.current += 1
      metrics.slowRenders = slowRenderCount.current

      console.warn(`⚠️ Slow render detected in ${componentId}:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        threshold: `${threshold}ms`,
        renderCount: renderCount.current,
        averageTime: `${metrics.averageRenderTime.toFixed(2)}ms`,
      })

      onSlowRender?.(metrics)
    }

    // Store metrics
    metricsStore.set(componentId, metrics)
  })

  const getMetrics = useCallback(() => {
    return metricsStore.get(componentId)
  }, [componentId])

  const getAllMetrics = useCallback(() => {
    return Array.from(metricsStore.entries()).map(([id, metrics]) => ({
      id,
      ...metrics,
    }))
  }, [])

  const resetMetrics = useCallback(() => {
    renderCount.current = 0
    totalRenderTime.current = 0
    slowRenderCount.current = 0
    metricsStore.delete(componentId)
  }, [componentId])

  return {
    getMetrics,
    getAllMetrics,
    resetMetrics,
  }
}

/**
 * Export all metrics as CSV for analysis
 */
export function exportPerformanceMetrics(): string {
  const headers = [
    'Component ID',
    'Render Count',
    'Total Time (ms)',
    'Average Time (ms)',
    'Slow Renders',
    'Last Render (ms)',
  ]

  const rows = Array.from(metricsStore.entries()).map(([id, metrics]) => [
    id,
    metrics.renderCount.toString(),
    metrics.totalRenderTime.toFixed(2),
    metrics.averageRenderTime.toFixed(2),
    metrics.slowRenders.toString(),
    metrics.lastRenderTime.toFixed(2),
  ])

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')

  return csv
}

/**
 * Log performance summary to console
 */
export function logPerformanceSummary(): void {
  console.group('📊 Performance Summary')

  const allMetrics = Array.from(metricsStore.entries())

  if (allMetrics.length === 0) {
    console.log('No metrics collected yet')
    console.groupEnd()
    return
  }

  allMetrics.forEach(([id, metrics]) => {
    console.log(`\n${id}:`, {
      renders: metrics.renderCount,
      avgTime: `${metrics.averageRenderTime.toFixed(2)}ms`,
      slowRenders: metrics.slowRenders,
      performance:
        metrics.averageRenderTime < 8
          ? '🟢 Excellent'
          : metrics.averageRenderTime < 16
          ? '🟡 Good'
          : '🔴 Needs Optimization',
    })
  })

  console.groupEnd()
}
