/**
 * Web Vitals Monitoring Hook
 * Tracks Core Web Vitals (LCP, FID, CLS) and reports to analytics
 */

import { useEffect } from 'react'

interface WebVital {
  id: string
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

interface WebVitalsOptions {
  enabled?: boolean
  reportToAnalytics?: (metric: WebVital) => void
  logToConsole?: boolean
}

export function useWebVitals({
  enabled = true,
  reportToAnalytics,
  logToConsole = process.env.NODE_ENV === 'development',
}: WebVitalsOptions = {}) {
  useEffect(() => {
    if (!enabled) return

    const reportMetric = (metric: WebVital) => {
      if (logToConsole) {
        const emoji =
          metric.rating === 'good'
            ? '🟢'
            : metric.rating === 'needs-improvement'
            ? '🟡'
            : '🔴'

        console.log(`${emoji} ${metric.name}:`, {
          value: `${Math.round(metric.value)}ms`,
          rating: metric.rating,
          id: metric.id,
        })
      }

      // Send to analytics
      reportToAnalytics?.(metric)

      // Send to Google Analytics if available
      if (typeof window !== 'undefined' && 'gtag' in window) {
        const gtag = (window as { gtag?: Function }).gtag
        gtag?.('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        })
      }
    }

    // Dynamic import to avoid SSR issues
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
      onCLS(reportMetric as Parameters<typeof onCLS>[0])
      onFID(reportMetric as Parameters<typeof onFID>[0])
      onFCP(reportMetric as Parameters<typeof onFCP>[0])
      onLCP(reportMetric as Parameters<typeof onLCP>[0])
      onTTFB(reportMetric as Parameters<typeof onTTFB>[0])
    })
  }, [enabled, reportToAnalytics, logToConsole])
}

/**
 * Utility to check if metric is within acceptable range
 */
export function getMetricRating(
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB',
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  }

  const { good, poor } = thresholds[name]

  if (value <= good) return 'good'
  if (value <= poor) return 'needs-improvement'
  return 'poor'
}
