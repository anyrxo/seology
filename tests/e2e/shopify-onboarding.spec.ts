/**
 * E2E Test: Shopify Onboarding Flow
 * Tests the complete onboarding process for a Shopify store
 */

import { test, expect } from '@playwright/test'
import { BASE_URL } from '../helpers/test-utils'

test.describe('Shopify Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Shopify onboarding page
    await page.goto(`${BASE_URL}/shopify/onboarding`)
  })

  test('should display onboarding welcome screen', async ({ page }) => {
    // Check for welcome message
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible()

    // Check for execution mode selection
    await expect(page.getByText(/automatic/i)).toBeVisible()
    await expect(page.getByText(/plan/i)).toBeVisible()
    await expect(page.getByText(/approve/i)).toBeVisible()
  })

  test('should allow selecting AUTOMATIC execution mode', async ({ page }) => {
    // Click on AUTOMATIC mode card
    await page.getByRole('button', { name: /automatic/i }).click()

    // Verify selection is highlighted
    const automaticCard = page.locator('[data-mode="AUTOMATIC"]')
    await expect(automaticCard).toHaveClass(/selected|active|border-primary/)
  })

  test('should allow selecting PLAN execution mode', async ({ page }) => {
    // Click on PLAN mode card
    await page.getByRole('button', { name: /plan/i }).click()

    // Verify selection is highlighted
    const planCard = page.locator('[data-mode="PLAN"]')
    await expect(planCard).toHaveClass(/selected|active|border-primary/)
  })

  test('should allow selecting APPROVE execution mode', async ({ page }) => {
    // Click on APPROVE mode card
    await page.getByRole('button', { name: /approve/i }).click()

    // Verify selection is highlighted
    const approveCard = page.locator('[data-mode="APPROVE"]')
    await expect(approveCard).toHaveClass(/selected|active|border-primary/)
  })

  test('should show mode comparison tooltips', async ({ page }) => {
    // Hover over info icon for AUTOMATIC mode
    await page.locator('[data-mode="AUTOMATIC"] [data-tooltip]').hover()

    // Check tooltip appears
    await expect(page.getByText(/automatically applies/i)).toBeVisible()
  })

  test('should navigate to dashboard after completion', async ({ page }) => {
    // Select a mode
    await page.getByRole('button', { name: /automatic/i }).click()

    // Click complete onboarding button
    await page.getByRole('button', { name: /complete|get started|continue/i }).click()

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/shopify\/dashboard/)
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through mode options
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Select with Enter key
    await page.keyboard.press('Enter')

    // Verify a mode is selected
    const selectedMode = page.locator('[aria-selected="true"], [data-selected="true"]')
    await expect(selectedMode).toBeVisible()
  })

  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check layout is responsive
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible()

    // Mode cards should stack vertically
    const modeCards = page.locator('[data-mode]')
    const firstCard = modeCards.first()
    const secondCard = modeCards.nth(1)

    const firstBox = await firstCard.boundingBox()
    const secondBox = await secondCard.boundingBox()

    // Second card should be below first card (stacked)
    expect(secondBox?.y).toBeGreaterThan((firstBox?.y ?? 0) + (firstBox?.height ?? 0))
  })
})

test.describe('Shopify Onboarding - Error Handling', () => {
  test('should show error if no mode selected', async ({ page }) => {
    await page.goto(`${BASE_URL}/shopify/onboarding`)

    // Try to continue without selecting
    await page.getByRole('button', { name: /complete|get started|continue/i }).click()

    // Should show validation error
    await expect(page.getByText(/please select/i)).toBeVisible()
  })

  test('should handle connection errors gracefully', async ({ page }) => {
    // Intercept API call and return error
    await page.route('**/api/shopify/settings', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({
          success: false,
          error: { message: 'Connection failed' },
        }),
      })
    })

    await page.goto(`${BASE_URL}/shopify/onboarding`)
    await page.getByRole('button', { name: /automatic/i }).click()
    await page.getByRole('button', { name: /complete|get started|continue/i }).click()

    // Should show error message
    await expect(page.getByText(/error|failed|try again/i)).toBeVisible()
  })
})
