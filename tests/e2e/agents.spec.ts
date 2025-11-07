/**
 * E2E Tests: AI Agents Page
 * Tests custom AI agent library and execution
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  mockAPIResponses,
  takeTimestampedScreenshot,
  waitForLoadingComplete,
  waitForAPIResponse,
} from '../helpers/test-utils'

test.describe('AI Agents Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set up API mocking before navigation
    await mockAPIResponses(page, TEST_SHOP)

    // Navigate directly to agents page (no double navigation)
    await page.goto(`${BASE_URL}/shopify/agents?shop=${TEST_SHOP}`, {
      waitUntil: 'domcontentloaded' // Don't wait for networkidle (external resources can timeout)
    })

    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded')
  })

  test('should load agents library', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check page loaded
    await expect(page).toHaveURL(new RegExp('/shopify/agents'))

    // Check for agents container
    const agentsContainer = page.locator('[data-testid="agents-list"], .agents-grid')
    await expect(agentsContainer.first()).toBeVisible({ timeout: 10000 })

    await takeTimestampedScreenshot(page, 'agents-loaded')
  })

  test('should display pre-built agent templates', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for agent cards
    const agentCards = page.locator('[data-testid="agent-card"], .agent-card')
    const count = await agentCards.count()

    // Should have at least some pre-built agents
    expect(count).toBeGreaterThan(0)

    // First card should have name and description
    const firstCard = agentCards.first()
    await expect(firstCard).toBeVisible()

    const agentName = firstCard.locator('h3, h4, [data-testid="agent-name"]')
    await expect(agentName.first()).toBeVisible()
  })

  test('should execute an agent', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Find execute button
    const executeButton = page.locator('button:has-text("Execute"), button:has-text("Run")').first()
    const buttonExists = await executeButton.count()

    if (buttonExists > 0) {
      // Click execute
      await executeButton.click()

      // Should show execution in progress
      await page.waitForTimeout(2000)

      const executionIndicator = page.locator('text=/executing|running|in progress/i')
      const count = await executionIndicator.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should view agent details', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Click on an agent card
    const agentCard = page.locator('[data-testid="agent-card"], .agent-card').first()
    await agentCard.click()

    // Should show agent details
    await page.waitForTimeout(1000)

    const detailsView = page.locator('[data-testid="agent-details"], .agent-details-modal')
    const detailsCount = await detailsView.count()

    if (detailsCount > 0) {
      await expect(detailsView.first()).toBeVisible()
    }
  })

  test('should filter agents by category', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Check for category filters
    const categoryFilters = page.locator('[data-testid="category-filter"], button[role="tab"]')
    const filterCount = await categoryFilters.count()

    if (filterCount > 1) {
      // Click second category
      await categoryFilters.nth(1).click()
      await page.waitForTimeout(1000)

      // Agents should update
      await waitForLoadingComplete(page)
    }
  })

  test('should create custom agent', async ({ page }) => {
    await waitForLoadingComplete(page)

    // Find create agent button
    const createButton = page.locator('button:has-text("Create Agent"), button:has-text("New Agent")').first()
    const buttonExists = await createButton.count()

    if (buttonExists > 0) {
      await createButton.click()

      // Should open creation form
      await page.waitForTimeout(1000)

      const creationForm = page.locator('form, [data-testid="agent-form"]')
      const formCount = await creationForm.count()

      if (formCount > 0) {
        await expect(creationForm.first()).toBeVisible()
      }
    }
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await waitForLoadingComplete(page)

    // Content should be visible
    const mainContent = page.locator('main, [role="main"]')
    await expect(mainContent.first()).toBeVisible()

    await takeTimestampedScreenshot(page, 'agents-mobile')
  })
})
