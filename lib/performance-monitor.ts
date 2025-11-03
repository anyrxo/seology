/**
 * Performance Monitoring Utilities
 *
 * Track and report Core Web Vitals and custom metrics
 */

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

interface WebVitalsMetrics {
  LCP?: number // Largest Contentful Paint
  FID?: number // First Input Delay
  CLS?: number // Cumulative Layout Shift
  FCP?: number // First Contentful Paint
  TTFB?: number // Time to First Byte
}

/**
 * Core Web Vitals thresholds (Google's recommendations)
 */
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 }, // milliseconds
  CLS: { good: 0.1, poor: 0.25 }, // score
  FCP: { good: 1800, poor: 3000 }, // milliseconds
  TTFB: { good: 800, poor: 1800 }, // milliseconds
}

/**
 * Get rating based on thresholds
 */
function getRating(
  metric: keyof typeof THRESHOLDS,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Report metric to analytics
 */
function reportMetric(metric: PerformanceMetric) {
  // Send to analytics service (e.g., Google Analytics, Vercel Analytics)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Example: Google Analytics 4
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
        event_label: metric.rating,
        non_interaction: true,
      })
    }

    // Log to console in development
  } else {
    console.log(`[Performance] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
    })
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP(callback?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
        renderTime?: number
        loadTime?: number
      }

      const value = lastEntry.renderTime || lastEntry.loadTime || 0
      const metric: PerformanceMetric = {
        name: 'LCP',
        value,
        rating: getRating('LCP', value),
        timestamp: Date.now(),
      }

      reportMetric(metric)
      callback?.(metric)
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (error) {
    console.error('Error measuring LCP:', error)
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID(callback?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstInput = entries[0] as PerformanceEntry & { processingStart?: number }

      if (firstInput && firstInput.processingStart) {
        const value = firstInput.processingStart - firstInput.startTime
        const metric: PerformanceMetric = {
          name: 'FID',
          value,
          rating: getRating('FID', value),
          timestamp: Date.now(),
        }

        reportMetric(metric)
        callback?.(metric)
      }
    })

    observer.observe({ type: 'first-input', buffered: true })
  } catch (error) {
    console.error('Error measuring FID:', error)
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS(callback?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    let clsValue = 0

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean
          value?: number
        }

        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value || 0
        }
      }

      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating('CLS', clsValue),
        timestamp: Date.now(),
      }

      reportMetric(metric)
      callback?.(metric)
    })

    observer.observe({ type: 'layout-shift', buffered: true })

    // Report final CLS on page unload
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          observer.disconnect()
        }
      })
    }
  } catch (error) {
    console.error('Error measuring CLS:', error)
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP(callback?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')

      if (fcpEntry) {
        const value = fcpEntry.startTime
        const metric: PerformanceMetric = {
          name: 'FCP',
          value,
          rating: getRating('FCP', value),
          timestamp: Date.now(),
        }

        reportMetric(metric)
        callback?.(metric)
        observer.disconnect()
      }
    })

    observer.observe({ type: 'paint', buffered: true })
  } catch (error) {
    console.error('Error measuring FCP:', error)
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB(callback?: (metric: PerformanceMetric) => void) {
  if (typeof window === 'undefined') return

  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    if (navEntry) {
      const value = navEntry.responseStart - navEntry.requestStart
      const metric: PerformanceMetric = {
        name: 'TTFB',
        value,
        rating: getRating('TTFB', value),
        timestamp: Date.now(),
      }

      reportMetric(metric)
      callback?.(metric)
    }
  } catch (error) {
    console.error('Error measuring TTFB:', error)
  }
}

/**
 * Initialize all Core Web Vitals measurements
 */
export function initWebVitals(callback?: (metrics: WebVitalsMetrics) => void) {
  const metrics: WebVitalsMetrics = {}

  measureLCP((metric) => {
    metrics.LCP = metric.value
    callback?.(metrics)
  })

  measureFID((metric) => {
    metrics.FID = metric.value
    callback?.(metrics)
  })

  measureCLS((metric) => {
    metrics.CLS = metric.value
    callback?.(metrics)
  })

  measureFCP((metric) => {
    metrics.FCP = metric.value
    callback?.(metrics)
  })

  measureTTFB((metric) => {
    metrics.TTFB = metric.value
    callback?.(metrics)
  })

  return metrics
}

/**
 * Measure custom performance marks
 */
export function measureCustom(name: string, startMark?: string, endMark?: string) {
  if (typeof performance === 'undefined') return

  try {
    if (endMark) {
      performance.measure(name, startMark, endMark)
      const measure = performance.getEntriesByName(name)[0]
      console.log(`[Performance] ${name}: ${Math.round(measure.duration)}ms`)
      return measure.duration
    } else {
      performance.mark(name)
    }
  } catch (error) {
    console.error('Error measuring custom metric:', error)
  }
}

/**
 * Get page load metrics
 */
export function getPageLoadMetrics() {
  if (typeof performance === 'undefined' || typeof window === 'undefined') return null

  try {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    return {
      dns: navEntry.domainLookupEnd - navEntry.domainLookupStart,
      tcp: navEntry.connectEnd - navEntry.connectStart,
      request: navEntry.responseStart - navEntry.requestStart,
      response: navEntry.responseEnd - navEntry.responseStart,
      domParsing: navEntry.domInteractive - navEntry.responseEnd,
      domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
      windowLoad: navEntry.loadEventEnd - navEntry.loadEventStart,
      total: navEntry.loadEventEnd - navEntry.fetchStart,
    }
  } catch (error) {
    console.error('Error getting page load metrics:', error)
    return null
  }
}

/**
 * Monitor bundle sizes
 */
export function getBundleSizes() {
  if (typeof performance === 'undefined') return []

  try {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

    return resources
      .filter((r) => r.initiatorType === 'script' || r.initiatorType === 'link')
      .map((r) => ({
        name: r.name.split('/').pop() || r.name,
        size: r.transferSize,
        duration: r.duration,
        type: r.initiatorType,
      }))
      .sort((a, b) => b.size - a.size)
  } catch (error) {
    console.error('Error getting bundle sizes:', error)
    return []
  }
}

/**
 * Export performance report
 */
export function generatePerformanceReport() {
  const metrics = initWebVitals()
  const pageLoad = getPageLoadMetrics()
  const bundles = getBundleSizes()

  return {
    webVitals: metrics,
    pageLoad,
    bundles,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  }
}
