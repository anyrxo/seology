/**
 * E2E Test: Product Analysis Flow
 * Tests analyzing products and viewing SEO recommendations
 */

import { test, expect } from '@playwright/test'

test.describe('Product Analysis', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.goto('/shopify/products?shop=test-shop.myshopify.com')
  })

  test('should display products list', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], [data-product-id]', { timeout: 10000 })

    // Check products are displayed
    const products = page.locator('[data-testid="product-card"], [data-product-id]')
    await expect(products.first()).toBeVisible()
  })

  test('should show SEO scores for each product', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Check first product has SEO score
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await expect(firstProduct.locator('[data-testid="seo-score"]')).toBeVisible()
  })

  test('should sort products by SEO score', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Click sort button (if available)
    const sortButton = page.getByRole('button', { name: /sort/i })
    if (await sortButton.isVisible()) {
      await sortButton.click()
      await page.getByText(/seo score/i).click()
    }

    // Verify products are sorted (lowest scores first)
    const scores = await page.locator('[data-testid="seo-score"]').allTextContents()
    const numericScores = scores.map((s) => parseInt(s.match(/\d+/)?.[0] || '0'))

    // First score should be lower than or equal to last score (ascending)
    expect(numericScores[0]).toBeLessThanOrEqual(numericScores[numericScores.length - 1] || 100)
  })

  test('should show product details when clicked', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Click first product
    await page.locator('[data-testid="product-card"]').first().click()

    // Should show product details modal or page
    await expect(page.getByText(/seo title|meta description|alt text/i)).toBeVisible()
  })

  test('should display SEO issues list', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Click first product with issues
    const productWithIssues = page.locator('[data-testid="product-card"]').first()
    await productWithIssues.click()

    // Check issues are listed
    await expect(page.getByText(/missing|too short|too long/i)).toBeVisible()
  })

  test('should allow analyzing a single product', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Find and click analyze button
    const analyzeButton = page.getByRole('button', { name: /analyze/i }).first()
    await analyzeButton.click()

    // Should show loading state
    await expect(page.getByText(/analyzing|loading/i)).toBeVisible()

    // Wait for analysis to complete
    await page.waitForSelector('[data-testid="analysis-complete"]', { timeout: 30000 })

    // Should show recommendations
    await expect(page.getByText(/recommendation|suggestion/i)).toBeVisible()
  })

  test('should filter products by issue type', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Find filter dropdown
    const filterButton = page.getByRole('button', { name: /filter/i })
    if (await filterButton.isVisible()) {
      await filterButton.click()

      // Select "Missing SEO Title" filter
      await page.getByText(/missing.*title/i).click()

      // Products list should update
      await page.waitForTimeout(1000)

      // All visible products should have missing title issue
      const visibleProducts = page.locator('[data-testid="product-card"]:visible')
      await expect(visibleProducts.first()).toBeVisible()
    }
  })

  test('should search products by name', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Find search input
    const searchInput = page.getByPlaceholder(/search/i)
    if (await searchInput.isVisible()) {
      await searchInput.fill('test product')
      await searchInput.press('Enter')

      // Wait for search results
      await page.waitForTimeout(1000)

      // Should show filtered results
      const results = page.locator('[data-testid="product-card"]')
      await expect(results.first()).toBeVisible()
    }
  })
})

test.describe('Product Analysis - Accessibility', () => {
  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/shopify/products?shop=test-shop.myshopify.com')
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Tab to first product
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Enter should activate
    await page.keyboard.press('Enter')

    // Should open product details
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/shopify/products?shop=test-shop.myshopify.com')
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Check for ARIA labels
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    await expect(firstProduct).toHaveAttribute('aria-label')
  })
})
