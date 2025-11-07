/**
 * Debug test to capture console errors from Agents page
 */

import { test, expect } from '@playwright/test'

const DEPLOYMENT = 'https://seology-q1x1t8rpv-iimagined.vercel.app'

test('Capture Agents page console errors', async ({ page }) => {
  const consoleMessages: string[] = []
  const errors: string[] = []

  // Capture console messages
  page.on('console', (msg) => {
    const text = `[${msg.type()}] ${msg.text()}`
    consoleMessages.push(text)
    if (msg.type() === 'error') {
      errors.push(text)
    }
  })

  // Capture page errors
  page.on('pageerror', (error) => {
    errors.push(`[pageerror] ${error.message}\n${error.stack}`)
  })

  // Navigate to Agents page
  await page.goto(`${DEPLOYMENT}/shopify/agents?shop=test-store.myshopify.com`, {
    waitUntil: 'domcontentloaded'
  })

  // Wait for potential JavaScript execution
  await page.waitForTimeout(5000)

  // Check if page rendered
  const main = await page.locator('main').count()
  const h1 = await page.locator('h1').count()
  const bodyText = await page.locator('body').textContent()

  console.log('\n=== AGENTS PAGE DEBUG INFO ===')
  console.log('Main elements:', main)
  console.log('H1 elements:', h1)
  console.log('Body text length:', bodyText?.length || 0)
  console.log('Body text preview:', bodyText?.substring(0, 200) || '(empty)')

  console.log('\n=== ALL CONSOLE MESSAGES ===')
  consoleMessages.forEach(msg => console.log(msg))

  console.log('\n=== ERRORS DETECTED ===')
  if (errors.length === 0) {
    console.log('No console errors detected')
  } else {
    errors.forEach(err => console.log(err))
  }

  // Take screenshot
  await page.screenshot({ path: 'test-results/agents-debug-screenshot.png', fullPage: true })

  // Get HTML content
  const html = await page.content()
  console.log('\n=== HTML CONTENT (first 500 chars) ===')
  console.log(html.substring(0, 500))
})
