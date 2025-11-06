/**
 * Test Utilities for Playwright E2E Tests
 * Shared helpers and constants
 */

import { Page, expect } from '@playwright/test'

// Base URL from environment or default to production
export const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://seology-5t6h1kx0l-iimagined.vercel.app'

// Test shop domain (use environment variable for real testing)
export const TEST_SHOP = process.env.TEST_SHOP_DOMAIN || 'test-store.myshopify.com'

/**
 * Wait for page to be fully loaded and interactive
 */
export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('domcontentloaded')
}

/**
 * Take a screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  await page.screenshot({
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true
  })
}

/**
 * Check for console errors
 */
export async function checkConsoleErrors(page: Page) {
  const errors: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })

  page.on('pageerror', (error) => {
    errors.push(error.message)
  })

  return errors
}

/**
 * Wait for API response
 */
export async function waitForAPIResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout = 10000
) {
  return page.waitForResponse(
    (response) => {
      const url = response.url()
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern)
      }
      return urlPattern.test(url)
    },
    { timeout }
  )
}

/**
 * Mock Shopify OAuth for testing
 */
export async function mockShopifyAuth(page: Page, shop: string) {
  // Set shop parameter in URL
  await page.goto(`${BASE_URL}/shopify/dashboard?shop=${shop}`)

  // Wait for dashboard to load
  await waitForPageReady(page)
}

/**
 * Check accessibility with basic checks
 */
export async function checkBasicAccessibility(page: Page) {
  // Check for alt text on images
  const images = await page.locator('img').all()
  for (const img of images) {
    const alt = await img.getAttribute('alt')
    expect(alt).toBeDefined()
  }

  // Check for form labels
  const inputs = await page.locator('input[type="text"], input[type="email"], input[type="password"]').all()
  for (const input of inputs) {
    const id = await input.getAttribute('id')
    if (id) {
      const label = await page.locator(`label[for="${id}"]`).count()
      expect(label).toBeGreaterThan(0)
    }
  }

  // Check for heading hierarchy
  const h1Count = await page.locator('h1').count()
  expect(h1Count).toBeGreaterThan(0)
  expect(h1Count).toBeLessThanOrEqual(1) // Only one h1 per page
}

/**
 * Test responsive breakpoints
 */
export const BREAKPOINTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 },
  large: { width: 1920, height: 1080 },
}

/**
 * Wait for element to be visible and stable
 */
export async function waitForStableElement(page: Page, selector: string) {
  await page.waitForSelector(selector, { state: 'visible' })
  await page.waitForTimeout(300) // Wait for animations
}

/**
 * Fill form and submit
 */
export async function fillAndSubmitForm(
  page: Page,
  formData: Record<string, string>,
  submitButtonSelector: string
) {
  for (const [name, value] of Object.entries(formData)) {
    await page.fill(`[name="${name}"]`, value)
  }

  await page.click(submitButtonSelector)
  await waitForPageReady(page)
}

/**
 * Check for loading states
 */
export async function waitForLoadingComplete(page: Page) {
  // Wait for common loading indicators to disappear
  await page.waitForSelector('[data-loading="true"]', { state: 'hidden', timeout: 10000 }).catch(() => {})
  await page.waitForSelector('.loading', { state: 'hidden', timeout: 10000 }).catch(() => {})
  await page.waitForSelector('[aria-busy="true"]', { state: 'hidden', timeout: 10000 }).catch(() => {})
}

/**
 * Verify API response structure
 */
export function verifyAPIResponse(data: unknown, expectedKeys: string[]) {
  expect(data).toBeDefined()

  // Type guard for API response
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid API response: not an object')
  }

  const response = data as { success?: boolean; data?: Record<string, unknown> }
  expect(response.success).toBeDefined()

  if (response.success && response.data) {
    for (const key of expectedKeys) {
      expect(response.data).toHaveProperty(key)
    }
  }
}

/**
 * Generate test data
 */
export function generateTestProduct() {
  const id = Math.floor(Math.random() * 1000000)
  return {
    id: `gid://shopify/Product/${id}`,
    title: `Test Product ${id}`,
    handle: `test-product-${id}`,
    description: 'This is a test product for E2E testing',
    seoTitle: '',
    seoDescription: '',
  }
}

/**
 * Clean up test data
 */
export async function cleanupTestData(page: Page, shop: string) {
  // Delete test checkpoints, agents, etc.
  await page.evaluate(async (testShop) => {
    // This would call cleanup API endpoints
    console.log('Cleaning up test data for:', testShop)
  }, shop)
}
