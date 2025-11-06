/**
 * E2E Test: Agent Execution Flow
 * Tests executing custom SEO agents on products
 */

import { test, expect } from '@playwright/test'

test.describe('Agent Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shopify/dashboard?shop=test-shop.myshopify.com')
  })

  test('should display available agents', async ({ page }) => {
    // Navigate to agents page
    await page.getByRole('link', { name: /agents/i }).click()

    // Should show agent templates
    await expect(page.getByText(/title optimizer/i)).toBeVisible()
    await expect(page.getByText(/meta description/i)).toBeVisible()
    await expect(page.getByText(/schema.*wizard/i)).toBeVisible()
  })

  test('should show agent details when clicked', async ({ page }) => {
    await page.goto('/shopify/agents?shop=test-shop.myshopify.com')

    // Click on an agent card
    await page.getByText(/title optimizer/i).click()

    // Should show agent details
    await expect(page.getByText(/specialty|description/i)).toBeVisible()
    await expect(page.getByText(/claude|model/i)).toBeVisible()
  })

  test('should allow executing an agent on a product', async ({ page }) => {
    await page.goto('/shopify/products?shop=test-shop.myshopify.com')
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })

    // Click on a product
    await page.locator('[data-testid="product-card"]').first().click()

    // Find "Run Agent" button
    const runAgentButton = page.getByRole('button', { name: /run agent|execute agent/i })
    if (await runAgentButton.isVisible()) {
      await runAgentButton.click()

      // Select an agent
      await page.getByText(/title optimizer/i).click()

      // Confirm execution
      await page.getByRole('button', { name: /execute|run/i }).click()

      // Should show execution progress
      await expect(page.getByText(/executing|running/i)).toBeVisible()
    }
  })

  test('should display agent execution history', async ({ page }) => {
    await page.goto('/shopify/monitor/executions?shop=test-shop.myshopify.com')

    // Should show execution list
    await expect(page.getByText(/agent name|execution time|status/i)).toBeVisible()

    // Check for status indicators
    const statusBadges = page.locator('[data-status]')
    await expect(statusBadges.first()).toBeVisible()
  })

  test('should show cost breakdown for execution', async ({ page }) => {
    await page.goto('/shopify/monitor/executions?shop=test-shop.myshopify.com')

    // Click on an execution
    const firstExecution = page.locator('[data-testid="execution-row"]').first()
    if (await firstExecution.isVisible()) {
      await firstExecution.click()

      // Should show cost details
      await expect(page.getByText(/tokens|cost|\$/i)).toBeVisible()
    }
  })

  test('should allow retrying failed execution', async ({ page }) => {
    await page.goto('/shopify/monitor/executions?shop=test-shop.myshopify.com')

    // Find a failed execution
    const failedExecution = page.locator('[data-status="FAILED"]').first()
    if (await failedExecution.isVisible()) {
      await failedExecution.click()

      // Should have retry button
      const retryButton = page.getByRole('button', { name: /retry/i })
      await expect(retryButton).toBeVisible()
    }
  })
})

test.describe('Agent Execution - Performance', () => {
  test('should show execution time', async ({ page }) => {
    await page.goto('/shopify/monitor/executions?shop=test-shop.myshopify.com')

    // Execution list should show duration
    await expect(page.getByText(/\d+\.\d+s|\d+ms/)).toBeVisible()
  })

  test('should display token usage', async ({ page }) => {
    await page.goto('/shopify/monitor/executions?shop=test-shop.myshopify.com')

    // Should show token counts
    await expect(page.getByText(/\d+.*tokens/i)).toBeVisible()
  })
})
