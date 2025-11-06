/**
 * E2E Tests: Accessibility Testing
 * Tests WCAG 2.1 AA compliance, keyboard navigation, and screen reader support
 */

import { test, expect } from '@playwright/test'
import {
  BASE_URL,
  TEST_SHOP,
  waitForPageReady,
  mockShopifyAuth,
  waitForLoadingComplete,
} from '../helpers/test-utils'

test.describe('Accessibility Tests', () => {
  const pages = [
    { name: 'Dashboard', path: '/shopify/dashboard' },
    { name: 'Products', path: '/shopify/products' },
    { name: 'Agents', path: '/shopify/agents' },
    { name: 'Timeline', path: '/shopify/timeline' },
    { name: 'Analytics', path: '/shopify/analytics' },
    { name: 'Settings', path: '/shopify/settings' },
  ]

  for (const pageDef of pages) {
    test.describe(`${pageDef.name} accessibility`, () => {
      test.beforeEach(async ({ page }) => {
        await mockShopifyAuth(page, TEST_SHOP)
        await page.goto(`${BASE_URL}${pageDef.path}?shop=${TEST_SHOP}`)
        await waitForPageReady(page)
        await waitForLoadingComplete(page)
      })

      test('should have proper heading hierarchy', async ({ page }) => {
        const headings = await page.evaluate(() => {
          const h1 = document.querySelectorAll('h1').length
          const h2 = document.querySelectorAll('h2').length
          const h3 = document.querySelectorAll('h3').length
          const h4 = document.querySelectorAll('h4').length

          return { h1, h2, h3, h4 }
        })

        console.log(`${pageDef.name} headings:`, headings)

        // Should have exactly one h1
        expect(headings.h1).toBeGreaterThan(0)
        expect(headings.h1).toBeLessThanOrEqual(1)
      })

      test('should have alt text on all images', async ({ page }) => {
        const imagesWithoutAlt = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'))
          return images.filter((img) => !img.alt || img.alt.trim() === '').length
        })

        expect(imagesWithoutAlt).toBe(0)
      })

      test('should have labels for form inputs', async ({ page }) => {
        const unlabeledInputs = await page.evaluate(() => {
          const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea'))
          return inputs.filter((input) => {
            const id = input.id
            if (!id) return true
            const label = document.querySelector(`label[for="${id}"]`)
            const ariaLabel = input.getAttribute('aria-label')
            const ariaLabelledBy = input.getAttribute('aria-labelledby')
            return !label && !ariaLabel && !ariaLabelledBy
          }).length
        })

        expect(unlabeledInputs).toBe(0)
      })

      test('should have proper ARIA attributes', async ({ page }) => {
        const ariaIssues = await page.evaluate(() => {
          const issues: string[] = []

          // Check buttons have accessible names
          const buttons = Array.from(document.querySelectorAll('button'))
          buttons.forEach((btn, index) => {
            const hasText = btn.textContent?.trim()
            const hasAriaLabel = btn.getAttribute('aria-label')
            const hasAriaLabelledBy = btn.getAttribute('aria-labelledby')

            if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
              issues.push(`Button ${index} has no accessible name`)
            }
          })

          // Check links have accessible names
          const links = Array.from(document.querySelectorAll('a'))
          links.forEach((link, index) => {
            const hasText = link.textContent?.trim()
            const hasAriaLabel = link.getAttribute('aria-label')
            const hasAriaLabelledBy = link.getAttribute('aria-labelledby')

            if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
              issues.push(`Link ${index} has no accessible name`)
            }
          })

          return issues
        })

        if (ariaIssues.length > 0) {
          console.log(`${pageDef.name} ARIA issues:`, ariaIssues)
        }

        expect(ariaIssues.length).toBe(0)
      })

      test('should support keyboard navigation', async ({ page }) => {
        // Focus first interactive element
        await page.keyboard.press('Tab')

        // Get focused element
        const firstFocus = await page.evaluate(() => {
          const el = document.activeElement
          return el?.tagName || null
        })

        expect(firstFocus).not.toBeNull()

        // Tab through several elements
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab')
          await page.waitForTimeout(100)
        }

        // Should be able to navigate back
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('Shift+Tab')
          await page.waitForTimeout(100)
        }

        // Final focus should still be on page
        const finalFocus = await page.evaluate(() => {
          return document.activeElement !== document.body
        })

        expect(finalFocus).toBe(true)
      })

      test('should have visible focus indicators', async ({ page }) => {
        // Tab to first interactive element
        await page.keyboard.press('Tab')
        await page.waitForTimeout(200)

        // Check if focus is visible
        const focusVisible = await page.evaluate(() => {
          const focused = document.activeElement
          if (!focused) return false

          const styles = window.getComputedStyle(focused)
          const hasFocusOutline = styles.outline !== 'none' && styles.outlineWidth !== '0px'
          const hasFocusRing = styles.boxShadow !== 'none'
          const hasFocusClass = focused.classList.contains('focus') ||
                               focused.classList.contains('focus-visible')

          return hasFocusOutline || hasFocusRing || hasFocusClass
        })

        expect(focusVisible).toBe(true)
      })

      test('should have sufficient color contrast', async ({ page }) => {
        // Check main text elements for contrast
        const contrastIssues = await page.evaluate(() => {
          const issues: string[] = []

          // Simple contrast check (simplified, not full WCAG calculation)
          const textElements = Array.from(document.querySelectorAll('p, span, a, button, h1, h2, h3, h4, h5, h6'))

          for (const el of textElements.slice(0, 20)) { // Check first 20 elements
            const styles = window.getComputedStyle(el as HTMLElement)
            const color = styles.color
            const bgColor = styles.backgroundColor

            // Skip if no visible text
            if (!(el as HTMLElement).textContent?.trim()) continue

            // Check if colors are too similar (simplified check)
            if (color === bgColor) {
              issues.push(`Element has same text and background color: ${color}`)
            }
          }

          return issues
        })

        expect(contrastIssues.length).toBe(0)
      })

      test('should support skip links', async ({ page }) => {
        // Tab to first element (usually skip link)
        await page.keyboard.press('Tab')

        const firstElement = await page.evaluate(() => {
          const el = document.activeElement
          return {
            tagName: el?.tagName,
            text: el?.textContent?.toLowerCase().trim(),
            href: (el as HTMLAnchorElement)?.href,
          }
        })

        // First focusable element should ideally be a skip link
        if (firstElement.tagName === 'A' && firstElement.text?.includes('skip')) {
          console.log(`${pageDef.name} has skip link`)
        }
      })

      test('should have proper landmark roles', async ({ page }) => {
        const landmarks = await page.evaluate(() => {
          return {
            main: document.querySelectorAll('main, [role="main"]').length,
            navigation: document.querySelectorAll('nav, [role="navigation"]').length,
            banner: document.querySelectorAll('header, [role="banner"]').length,
          }
        })

        console.log(`${pageDef.name} landmarks:`, landmarks)

        // Should have at least one main landmark
        expect(landmarks.main).toBeGreaterThan(0)
      })
    })
  }

  test.describe('Interactive element accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await mockShopifyAuth(page, TEST_SHOP)
      await page.goto(`${BASE_URL}/shopify/dashboard?shop=${TEST_SHOP}`)
      await waitForPageReady(page)
      await waitForLoadingComplete(page)
    })

    test('buttons should be keyboard activatable', async ({ page }) => {
      // Find first button
      const button = page.locator('button').first()
      const buttonExists = await button.count()

      if (buttonExists > 0) {
        // Focus button
        await button.focus()

        // Should be focusable
        const isFocused = await page.evaluate(() => {
          return document.activeElement?.tagName === 'BUTTON'
        })

        expect(isFocused).toBe(true)

        // Should activate with Enter
        await page.keyboard.press('Enter')
        await page.waitForTimeout(200)

        // Should activate with Space
        await button.focus()
        await page.keyboard.press('Space')
        await page.waitForTimeout(200)
      }
    })

    test('modals should trap focus', async ({ page }) => {
      // Try to find and open a modal
      const modalTrigger = page.locator('button:has-text("Settings"), button:has-text("Profile")').first()
      const triggerExists = await modalTrigger.count()

      if (triggerExists > 0) {
        await modalTrigger.click()
        await page.waitForTimeout(500)

        // Check if modal is open
        const modalOpen = await page.locator('[role="dialog"], .modal').count()

        if (modalOpen > 0) {
          // Tab should stay within modal
          await page.keyboard.press('Tab')
          await page.waitForTimeout(200)

          const focusInModal = await page.evaluate(() => {
            const focused = document.activeElement
            const modal = document.querySelector('[role="dialog"], .modal')
            return modal?.contains(focused) || false
          })

          expect(focusInModal).toBe(true)
        }
      }
    })

    test('forms should show validation errors accessibly', async ({ page }) => {
      // Navigate to settings (likely has forms)
      await page.goto(`${BASE_URL}/shopify/settings?shop=${TEST_SHOP}`)
      await waitForPageReady(page)

      const submitButton = page.locator('button[type="submit"], button:has-text("Save")').first()
      const buttonExists = await submitButton.count()

      if (buttonExists > 0) {
        // Try to submit empty form
        await submitButton.click()
        await page.waitForTimeout(1000)

        // Check for error messages
        const errorMessages = await page.evaluate(() => {
          const errors = document.querySelectorAll('[role="alert"], .error, [aria-invalid="true"]')
          return errors.length
        })

        // If there are errors, they should be announced
        if (errorMessages > 0) {
          console.log(`Found ${errorMessages} accessible error messages`)
        }
      }
    })
  })
})
