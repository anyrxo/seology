/**
 * E2E Tests: Visual Regression Testing
 * Screenshot comparison tests for UI consistency
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  waitForPageReady,
  mockShopifyAuth,
  waitForLoadingComplete,
  BREAKPOINTS,
} from '../helpers/test-utils'

test.describe('Visual Regression Tests', () => {
  const pages = [
    { name: 'dashboard', path: '/shopify/dashboard' },
    { name: 'products', path: '/shopify/products' },
    { name: 'agents', path: '/shopify/agents' },
    { name: 'timeline', path: '/shopify/timeline' },
    { name: 'analytics', path: '/shopify/analytics' },
    { name: 'settings', path: '/shopify/settings' },
  ]

  for (const pageDef of pages) {
    test.describe(`${pageDef.name} page screenshots`, () => {
      test.beforeEach(async ({ page }) => {
        await mockShopifyAuth(page, TEST_SHOP)
        await page.goto(`${BASE_URL}${pageDef.path}?shop=${TEST_SHOP}`)
        await waitForPageReady(page)
        await waitForLoadingComplete(page)
      })

      test(`should match desktop screenshot`, async ({ page }) => {
        await page.setViewportSize(BREAKPOINTS.desktop)
        await page.waitForTimeout(1000) // Wait for animations

        await expect(page).toHaveScreenshot(`${pageDef.name}-desktop.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixels: 100, // Allow minor differences
        })
      })

      test(`should match tablet screenshot`, async ({ page }) => {
        await page.setViewportSize(BREAKPOINTS.tablet)
        await page.waitForTimeout(1000)

        await expect(page).toHaveScreenshot(`${pageDef.name}-tablet.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixels: 100,
        })
      })

      test(`should match mobile screenshot`, async ({ page }) => {
        await page.setViewportSize(BREAKPOINTS.mobile)
        await page.waitForTimeout(1000)

        await expect(page).toHaveScreenshot(`${pageDef.name}-mobile.png`, {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixels: 100,
        })
      })
    })
  }

  test.describe('Component screenshots', () => {
    test.beforeEach(async ({ page }) => {
      await mockShopifyAuth(page, TEST_SHOP)
      await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
      await waitForPageReady(page)
      await waitForLoadingComplete(page)
    })

    test('should match stat cards', async ({ page }) => {
      const statCard = page.locator('[data-testid="stat-card"], .stat-card').first()

      if (await statCard.count() > 0) {
        await expect(statCard).toHaveScreenshot('stat-card.png', {
          animations: 'disabled',
          maxDiffPixels: 50,
        })
      }
    })

    test('should match navigation', async ({ page }) => {
      const navigation = page.locator('nav, [role="navigation"]').first()

      if (await navigation.count() > 0) {
        await expect(navigation).toHaveScreenshot('navigation.png', {
          animations: 'disabled',
          maxDiffPixels: 50,
        })
      }
    })
  })

  test.describe('Dark mode screenshots', () => {
    test.beforeEach(async ({ page }) => {
      await mockShopifyAuth(page, TEST_SHOP)
      await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
      await waitForPageReady(page)

      // Toggle dark mode if available
      const darkModeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="dark mode"]')
      const toggleExists = await darkModeToggle.count()

      if (toggleExists > 0) {
        await darkModeToggle.first().click()
        await page.waitForTimeout(500)
      }
    })

    test('should match dashboard dark mode', async ({ page }) => {
      await page.setViewportSize(BREAKPOINTS.desktop)
      await page.waitForTimeout(1000)

      const isDarkMode = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.body.classList.contains('dark')
      })

      if (isDarkMode) {
        await expect(page).toHaveScreenshot('dashboard-dark.png', {
          fullPage: true,
          animations: 'disabled',
          maxDiffPixels: 150,
        })
      }
    })
  })
})
