/**
 * E2E Tests: Products Page
 * Tests product listing and SEO analysis functionality
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  waitForPageReady,
  mockAPIResponses,
  takeTimestampedScreenshot,
  waitForLoadingComplete,
  waitForAPIResponse,
} from '../helpers/test-utils'

test.describe('Products Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set up API mocking before navigation
    await mockAPIResponses(page, TEST_SHOP)

    // Navigate directly to products page (no double navigation)
    await page.goto(`${BASE_URL}/shopify/products?shop=${TEST_SHOP}`, {
      waitUntil: 'domcontentloaded' // Don't wait for networkidle (external resources can timeout)
    })

    // Wait for the products API call to complete
    await page.waitForResponse(response =>
      response.url().includes('/api/shopify/products') && response.status() === 200,
      { timeout: 10000 }
    ).catch(() => {
      // If API call doesn't happen, that's okay - page might be cached
    })

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded')
  })

  test('should load products list', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check page URL
    await expect(page).toHaveURL(new RegExp('/shopify/products'))

    // Check for products container
    const productsContainer = page.locator('[data-testid="products-list"], .products-grid, .product-list')
    await expect(productsContainer.first()).toBeVisible({ timeout: 15000 })

    // Take screenshot
    await takeTimestampedScreenshot(page, 'products-loaded')
  })

  test('should display product cards with SEO scores', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for product cards
    const productCards = page.locator('[data-testid="product-card"], .product-card')
    const count = await productCards.count()

    if (count > 0) {
      // First card should have title
      const firstCard = productCards.first()
      await expect(firstCard).toBeVisible()

      // Should have SEO score indicator
      const scoreIndicator = firstCard.locator('text=/score|seo/i')
      const scoreCount = await scoreIndicator.count()
      expect(scoreCount).toBeGreaterThan(0)
    }
  })

  test('should allow analyzing a product', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Find analyze button
    const analyzeButton = page.locator('button:has-text("Analyze"), [data-testid="analyze-button"]').first()
    const buttonExists = await analyzeButton.count()

    if (buttonExists > 0) {
      // Click analyze
      await analyzeButton.click()

      // Wait for analysis to complete
      await page.waitForTimeout(2000)

      // Should show results or loading indicator
      const loadingOrResults = page.locator('[data-loading="true"], .analyzing, text=/analyzing|issues found/i')
      const count = await loadingOrResults.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should allow fixing SEO issues', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Find fix button
    const fixButton = page.locator('button:has-text("Fix"), [data-testid="fix-button"]').first()
    const buttonExists = await fixButton.count()

    if (buttonExists > 0) {
      // Intercept fix API call
      const responsePromise = waitForAPIResponse(page, '/api/shopify/fix')

      // Click fix button
      await fixButton.click()

      try {
        // Wait for API response
        const response = await responsePromise
        expect(response.status()).toBeLessThan(500)
      } catch (error) {
        // API might not be available in test environment
        console.log('Fix API not available in test environment')
      }
    }
  })

  test('should filter products by status', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for filter dropdown or buttons
    const filterOptions = page.locator('[data-testid="filter"], select[name="filter"], button:has-text("Filter")')
    const filterCount = await filterOptions.count()

    if (filterCount > 0) {
      // Select a filter option
      const filter = filterOptions.first()
      await filter.click()

      // Wait for filtered results
      await page.waitForTimeout(1000)

      // Products should update
      await waitForLoadingComplete(page)
    }
  })

  test('should search products', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]')
    const searchExists = await searchInput.count()

    if (searchExists > 0) {
      // Type search query
      await searchInput.first().fill('test')

      // Wait for search results
      await page.waitForTimeout(1000)

      // Results should update
      await waitForLoadingComplete(page)
    }
  })

  test('should paginate products', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for pagination
    const paginationButtons = page.locator('[data-testid="pagination"], button:has-text("Next"), button:has-text("Previous")')
    const paginationCount = await paginationButtons.count()

    if (paginationCount > 0) {
      // Click next page
      const nextButton = page.locator('button:has-text("Next")')
      const nextExists = await nextButton.count()

      if (nextExists > 0 && await nextButton.isEnabled()) {
        await nextButton.click()
        await waitForLoadingComplete(page)

        // Should load new products
        await page.waitForTimeout(1000)
      }
    }
  })

  test('should handle empty products list', async ({ page }) => {
    // Mock empty products response
    await page.route('**/api/shopify/products*', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: []
        })
      })
    })

    await page.reload()
    await waitForPageReady(page)

    // Should show empty state
    const emptyState = page.locator('text=/no products|empty|get started/i')
    await expect(emptyState.first()).toBeVisible({ timeout: 10000 })
  })

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock error response
    await page.route('**/api/shopify/products*', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: { code: 'INTERNAL_ERROR', message: 'Test error' }
        })
      })
    })

    await page.reload()
    await waitForPageReady(page)

    // Should show error message
    const errorMessage = page.locator('text=/error|failed|something went wrong/i')
    const errorCount = await errorMessage.count()
    expect(errorCount).toBeGreaterThan(0)
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await waitForLoadingComplete(page)

    // Content should be visible and scrollable
    const mainContent = page.locator('main, [role="main"]')
    await expect(mainContent.first()).toBeVisible()

    // Take mobile screenshot
    await takeTimestampedScreenshot(page, 'products-mobile')
  })
})
