import { test, expect } from '@playwright/test'

const NEW_DEPLOYMENT = 'https://seology-45xk9d7t1-iimagined.vercel.app'

test.describe('Production Validation - Real DOM Testing', () => {
  test('Agents page should have semantic HTML in rendered DOM', async ({ page }) => {
    await page.goto(`${NEW_DEPLOYMENT}/shopify/agents?shop=test-store.myshopify.com`, {
      waitUntil: 'domcontentloaded'
    })
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
    
    const main = await page.locator('main').count()
    const h1 = await page.locator('h1').count()
    const nav = await page.locator('nav').count()
    const banner = await page.locator('[role="banner"]').count()
    
    console.log(`Agents page - main: ${main}, h1: ${h1}, nav: ${nav}, banner: ${banner}`)
    
    expect(main).toBeGreaterThan(0)
    expect(h1).toBeGreaterThan(0)
  })
  
  test('Timeline page should have semantic HTML', async ({ page }) => {
    await page.goto(`${NEW_DEPLOYMENT}/shopify/timeline?shop=test-store.myshopify.com`, {
      waitUntil: 'domcontentloaded'
    })
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
    
    const main = await page.locator('main').count()
    const h1 = await page.locator('h1').count()
    
    console.log(`Timeline page - main: ${main}, h1: ${h1}`)
    
    expect(main).toBeGreaterThan(0)
    expect(h1).toBeGreaterThan(0)
  })
  
  test('Analytics page should have semantic HTML', async ({ page }) => {
    await page.goto(`${NEW_DEPLOYMENT}/shopify/analytics?shop=test-store.myshopify.com`, {
      waitUntil: 'domcontentloaded'
    })
    
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
    
    const main = await page.locator('main').count()
    const h1 = await page.locator('h1').count()
    
    console.log(`Analytics page - main: ${main}, h1: ${h1}`)
    
    expect(main).toBeGreaterThan(0)
    expect(h1).toBeGreaterThan(0)
  })
  
  test('Onboarding page should have new implementation', async ({ page }) => {
    await page.goto(`${NEW_DEPLOYMENT}/shopify/onboarding?shop=test-store.myshopify.com`)
    
    // Check for data-mode attributes
    const automaticCard = await page.locator('[data-mode="AUTOMATIC"]').count()
    const planCard = await page.locator('[data-mode="PLAN"]').count()
    const approveCard = await page.locator('[data-mode="APPROVE"]').count()
    
    console.log(`Onboarding - AUTOMATIC: ${automaticCard}, PLAN: ${planCard}, APPROVE: ${approveCard}`)
    
    expect(automaticCard).toBe(1)
    expect(planCard).toBe(1)
    expect(approveCard).toBe(1)
    
    // Check for Complete Setup button
    const button = page.getByRole('button', { name: /complete setup/i })
    await expect(button).toBeVisible()
  })
  
  test('Dashboard API should return proper responses', async ({ page }) => {
    const response = await page.request.get(
      `${NEW_DEPLOYMENT}/api/shopify/overview?shop=test-store.myshopify.com`
    )
    
    const data = await response.json()
    console.log('Dashboard API response:', JSON.stringify(data, null, 2))
    
    expect(response.status()).toBe(404) // Expected - shop not connected
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('NO_CONNECTION')
  })
})
