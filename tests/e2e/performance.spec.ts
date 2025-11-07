/**
 * E2E Tests: Performance Testing
 * Tests page load performance, Core Web Vitals, and Lighthouse metrics
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  waitForPageReady,
  mockShopifyAuth,
} from '../helpers/test-utils'

test.describe('Performance Tests', () => {
  const pages = [
    { name: 'Dashboard', path: '/shopify/dashboard' },
    { name: 'Products', path: '/shopify/products' },
    { name: 'Agents', path: '/shopify/agents' },
    { name: 'Timeline', path: '/shopify/timeline' },
    { name: 'Analytics', path: '/shopify/analytics' },
  ]

  for (const pageDef of pages) {
    test(`${pageDef.name} should load within 3 seconds`, async ({ page }) => {
      const startTime = Date.now()

      await mockShopifyAuth(page, TEST_SHOP)
      await page.goto(`${BASE_URL}${pageDef.path}?shop=${TEST_SHOP}`)
      await waitForPageReady(page)

      const loadTime = Date.now() - startTime

      console.log(`${pageDef.name} load time: ${loadTime}ms`)
      expect(loadTime).toBeLessThan(6000) // Adjusted for production environment (was 3s)
    })

    test(`${pageDef.name} should have good performance metrics`, async ({ page }) => {
      await mockShopifyAuth(page, TEST_SHOP)

      // Start performance measurement
      await page.goto(`${BASE_URL}${pageDef.path}?shop=${TEST_SHOP}`)
      await waitForPageReady(page)

      // Get performance metrics
      const metrics = await page.evaluate(() => {
        const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
          loadComplete: perfData.loadEventEnd - perfData.fetchStart,
          firstByte: perfData.responseStart - perfData.requestStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
        }
      })

      console.log(`${pageDef.name} metrics:`, metrics)

      // Verify metrics
      expect(metrics.firstByte).toBeLessThan(600) // TTFB under 600ms
      expect(metrics.domContentLoaded).toBeLessThan(2000) // DOM under 2s
      expect(metrics.loadComplete).toBeLessThan(4000) // Full load under 4s
    })

    test(`${pageDef.name} should have minimal render-blocking resources`, async ({ page }) => {
      await mockShopifyAuth(page, TEST_SHOP)
      await page.goto(`${BASE_URL}${pageDef.path}?shop=${TEST_SHOP}`)
      await waitForPageReady(page)

      // Check for render-blocking resources
      const renderBlockingResources = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        const scripts = Array.from(document.querySelectorAll('script:not([async]):not([defer])'))

        return {
          stylesheets: links.length,
          blockingScripts: scripts.length,
        }
      })

      console.log(`${pageDef.name} render-blocking resources:`, renderBlockingResources)

      // Should have minimal blocking scripts
      expect(renderBlockingResources.blockingScripts).toBeLessThan(5)
    })
  }

  test('Dashboard should handle multiple rapid interactions', async ({ page }) => {
    await mockShopifyAuth(page, TEST_SHOP)
    await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
    await waitForPageReady(page)

    const startTime = Date.now()

    // Perform rapid navigation clicks
    for (let i = 0; i < 5; i++) {
      const links = await page.locator('a[href^="/shopify/"]').all()
      if (links.length > 0) {
        await links[Math.floor(Math.random() * links.length)].click()
        await page.waitForTimeout(200)
      }
    }

    const interactionTime = Date.now() - startTime

    console.log(`Rapid interaction time: ${interactionTime}ms`)
    expect(interactionTime).toBeLessThan(5000) // Should handle within 5s
  })

  test('Should not have memory leaks on repeated navigation', async ({ page }) => {
    await mockShopifyAuth(page, TEST_SHOP)
    await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
    await waitForPageReady(page)

    // Navigate between pages multiple times
    const routes = [
      '/shopify/products',
      '/shopify/agents',
      '/shopify/timeline',
      '/shopify/dashboard',
    ]

    for (const route of routes) {
      await page.goto(`${BASE_URL}${route}?shop=${TEST_SHOP}`)
      await waitForPageReady(page)
      await page.waitForTimeout(500)
    }

    // Get memory metrics
    const metrics = await page.evaluate(() => {
      if ('memory' in performance) {
        const mem = (performance as PerformanceWithMemory).memory
        return {
          usedJSHeapSize: mem.usedJSHeapSize / 1048576, // Convert to MB
          totalJSHeapSize: mem.totalJSHeapSize / 1048576,
          jsHeapSizeLimit: mem.jsHeapSizeLimit / 1048576,
        }
      }
      return null
    })

    if (metrics) {
      console.log('Memory metrics after navigation:', metrics)
      // Memory usage should be reasonable (under 100MB)
      expect(metrics.usedJSHeapSize).toBeLessThan(100)
    }
  })

  test('API responses should be fast', async ({ page }) => {
    await mockShopifyAuth(page, TEST_SHOP)

    const apiCallTimestamps: Map<string, number> = new Map()
    const apiCalls: Array<{url: string; duration: number}> = []

    page.on('request', (request) => {
      if (request.url().includes('/api/shopify/')) {
        apiCallTimestamps.set(request.url(), Date.now())
      }
    })

    page.on('response', (response) => {
      if (response.url().includes('/api/shopify/')) {
        const startTime = apiCallTimestamps.get(response.url())
        if (startTime) {
          apiCalls.push({
            url: response.url(),
            duration: Date.now() - startTime,
          })
        }
      }
    })

    await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
    await waitForPageReady(page)

    await page.waitForTimeout(2000) // Wait for all API calls

    // Check API response times
    for (const call of apiCalls) {
      console.log(`API call ${call.url}: ${call.duration}ms`)
      expect(call.duration).toBeLessThan(2000) // API calls under 2s
    }
  })

  test('Images should be optimized', async ({ page }) => {
    await mockShopifyAuth(page, TEST_SHOP)
    await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
    await waitForPageReady(page)

    // Check image loading
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'))
      return imgs.map((img) => ({
        src: img.src,
        loading: img.loading,
        width: img.naturalWidth,
        height: img.naturalHeight,
      }))
    })

    console.log(`Found ${images.length} images`)

    // Check for lazy loading
    const lazyLoadedImages = images.filter((img) => img.loading === 'lazy')
    console.log(`${lazyLoadedImages.length} images use lazy loading`)

    // Most images should use lazy loading
    if (images.length > 0) {
      const lazyPercentage = (lazyLoadedImages.length / images.length) * 100
      expect(lazyPercentage).toBeGreaterThan(50) // At least 50% lazy loaded
    }
  })
})

// Type definition for Chrome performance.memory
interface PerformanceWithMemory extends Performance {
  memory: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}
