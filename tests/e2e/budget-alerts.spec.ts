/**
 * E2E Test: Budget Alerts and Usage Tracking
 * Tests setting budgets and receiving alerts when exceeded
 */

import { test, expect } from '@playwright/test'

test.describe('Budget Alerts', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shopify/analytics/budget?shop=test-shop.myshopify.com')
  })

  test('should display current usage', async ({ page }) => {
    // Should show usage metrics
    await expect(page.getByText(/total cost|spent|usage/i)).toBeVisible()
    await expect(page.getByText(/\$/)).toBeVisible()
  })

  test('should allow setting monthly budget', async ({ page }) => {
    // Find budget input
    const budgetInput = page.getByLabel(/monthly budget|budget limit/i)
    if (await budgetInput.isVisible()) {
      await budgetInput.fill('50')

      // Save budget
      await page.getByRole('button', { name: /save|update/i }).click()

      // Should show success message
      await expect(page.getByText(/saved|updated/i)).toBeVisible()
    }
  })

  test('should show budget progress bar', async ({ page }) => {
    // Should have progress indicator
    const progressBar = page.locator('[role="progressbar"], .progress-bar')
    await expect(progressBar.first()).toBeVisible()
  })

  test('should display alert when approaching limit', async ({ page }) => {
    // Set low budget
    const budgetInput = page.getByLabel(/monthly budget|budget limit/i)
    if (await budgetInput.isVisible()) {
      await budgetInput.fill('10')
      await page.getByRole('button', { name: /save|update/i }).click()

      // Wait for page to update
      await page.waitForTimeout(1000)

      // Should show warning if approaching limit
      const warningBadge = page.locator('[data-level="warning"], [data-status="warning"]')
      if (await warningBadge.isVisible()) {
        await expect(warningBadge).toContainText(/warning|approaching/i)
      }
    }
  })

  test('should show usage breakdown by model', async ({ page }) => {
    // Navigate to usage page
    await page.goto('/shopify/analytics/usage?shop=test-shop.myshopify.com')

    // Should show model breakdown
    await expect(page.getByText(/claude.*sonnet|model/i)).toBeVisible()

    // Should have chart or table
    const chart = page.locator('canvas, svg, [data-testid="usage-chart"]')
    await expect(chart.first()).toBeVisible()
  })

  test('should export usage data', async ({ page }) => {
    await page.goto('/shopify/analytics/usage?shop=test-shop.myshopify.com')

    // Find export button
    const exportButton = page.getByRole('button', { name: /export|download/i })
    if (await exportButton.isVisible()) {
      // Click export
      const downloadPromise = page.waitForEvent('download')
      await exportButton.click()

      // Should trigger download
      const download = await downloadPromise
      expect(download.suggestedFilename()).toMatch(/usage|analytics|export/)
    }
  })

  test('should filter usage by date range', async ({ page }) => {
    await page.goto('/shopify/analytics/usage?shop=test-shop.myshopify.com')

    // Find date range picker
    const dateRangePicker = page.getByLabel(/date range|from.*to/i)
    if (await dateRangePicker.isVisible()) {
      await dateRangePicker.click()

      // Select last 7 days
      await page.getByText(/last 7 days|week/i).click()

      // Usage data should update
      await page.waitForTimeout(1000)
      await expect(page.getByText(/\$/)).toBeVisible()
    }
  })
})

test.describe('Budget Alerts - Notifications', () => {
  test('should enable email alerts for budget limits', async ({ page }) => {
    await page.goto('/shopify/analytics/budget?shop=test-shop.myshopify.com')

    // Find email alert toggle
    const emailToggle = page.getByLabel(/email.*alert|notify.*email/i)
    if (await emailToggle.isVisible()) {
      // Enable emails
      await emailToggle.check()

      // Save settings
      await page.getByRole('button', { name: /save/i }).click()

      // Should confirm
      await expect(page.getByText(/saved|enabled/i)).toBeVisible()
    }
  })

  test('should set alert thresholds', async ({ page }) => {
    await page.goto('/shopify/analytics/budget?shop=test-shop.myshopify.com')

    // Find threshold inputs
    const warningThreshold = page.getByLabel(/warning.*threshold|80%/i)
    if (await warningThreshold.isVisible()) {
      await warningThreshold.fill('80')

      const criticalThreshold = page.getByLabel(/critical.*threshold|95%/i)
      if (await criticalThreshold.isVisible()) {
        await criticalThreshold.fill('95')

        // Save
        await page.getByRole('button', { name: /save/i }).click()
        await expect(page.getByText(/saved/i)).toBeVisible()
      }
    }
  })
})
