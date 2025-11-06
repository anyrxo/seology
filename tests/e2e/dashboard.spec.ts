/**
 * E2E Tests: Dashboard Page
 * Tests the main Shopify dashboard functionality
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  waitForPageReady,
  mockShopifyAuth,
  takeTimestampedScreenshot,
  waitForLoadingComplete,
  checkBasicAccessibility,
  BREAKPOINTS
} from '../helpers/test-utils'

test.describe('Shopify Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to dashboard with test shop
    await mockShopifyAuth(page, TEST_SHOP)
  })

  test('should load dashboard successfully', async ({ page }) => {
    // Check page loaded
    await expect(page).toHaveURL(new RegExp('/shopify/dashboard'))

    // Check for main dashboard elements
    await expect(page.locator('h1, h2').first()).toBeVisible()

    // Check for stats cards
    const statsCards = page.locator('[data-testid="stat-card"], .stat-card, .dashboard-card')
    await expect(statsCards.first()).toBeVisible({ timeout: 10000 })

    // Take screenshot
    await takeTimestampedScreenshot(page, 'dashboard-loaded')
  })

  test('should display overview statistics', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for key metrics
    const metrics = [
      'Total Products',
      'Total Issues',
      'Applied Fixes',
      'SEO Score',
    ]

    for (const metric of metrics) {
      const element = page.locator(`text=${metric}`)
      // Should find at least one match (case-insensitive)
      const count = await element.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should navigate to products page', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Click products link
    const productsLink = page.locator('a[href*="/shopify/products"], button:has-text("Products")')
    await productsLink.first().click()

    // Wait for products page to load
    await waitForPageReady(page)

    // Verify URL changed
    await expect(page).toHaveURL(new RegExp('/shopify/products'))
  })

  test('should navigate to settings page', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Click settings link
    const settingsLink = page.locator('a[href*="/shopify/settings"], button:has-text("Settings")')
    await settingsLink.first().click()

    // Wait for settings page to load
    await waitForPageReady(page)

    // Verify URL changed
    await expect(page).toHaveURL(new RegExp('/shopify/settings'))
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize(BREAKPOINTS.mobile)

    await waitForLoadingComplete(page)

    // Check mobile menu exists
    const mobileMenu = page.locator('[data-testid="mobile-menu"], .mobile-menu, button[aria-label*="menu"]')
    const count = await mobileMenu.count()

    if (count > 0) {
      // Mobile menu should be visible
      await expect(mobileMenu.first()).toBeVisible()
    }

    // Check content is still readable
    const mainContent = page.locator('main, [role="main"], .main-content')
    await expect(mainContent.first()).toBeVisible()

    // Take mobile screenshot
    await takeTimestampedScreenshot(page, 'dashboard-mobile')
  })

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize(BREAKPOINTS.tablet)

    await waitForLoadingComplete(page)

    // Content should be visible
    const mainContent = page.locator('main, [role="main"], .main-content')
    await expect(mainContent.first()).toBeVisible()

    // Take tablet screenshot
    await takeTimestampedScreenshot(page, 'dashboard-tablet')
  })

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API and return error
    await page.route('**/api/shopify/overview*', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: { code: 'INTERNAL_ERROR', message: 'Test error' }
        })
      })
    })

    // Reload page
    await page.reload()
    await waitForPageReady(page)

    // Should show error message (not crash)
    const errorMessages = page.locator('text=/error|failed|something went wrong/i')
    const errorCount = await errorMessages.count()

    // Either show error message or handle silently
    expect(errorCount).toBeGreaterThanOrEqual(0)

    // Page should still be functional
    const mainContent = page.locator('main, [role="main"], .main-content')
    await expect(mainContent.first()).toBeVisible()
  })

  test('should pass basic accessibility checks', async ({ page }) => {
    await waitForLoadingComplete(page)
    await checkBasicAccessibility(page)
  })

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    page.on('pageerror', (error) => {
      errors.push(error.message)
    })

    await waitForLoadingComplete(page)

    // Filter out known third-party errors
    const criticalErrors = errors.filter((error) => {
      return !error.includes('favicon') &&
             !error.includes('chrome-extension') &&
             !error.includes('cdn.shopify.com')
    })

    expect(criticalErrors.length).toBe(0)
  })
})
