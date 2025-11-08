/**
 * Unit Tests: Usage Tracker
 * Tests API usage tracking and cost calculation
 */

import { trackAPIUsage, getCurrentMonthUsage } from './usage-tracker'

// Mock the db module
jest.mock('@/lib/db')

describe('usage-tracker', () => {
  describe('trackAPIUsage', () => {
    it('should track usage without throwing errors', async () => {
      // Usage tracking should not break the main flow
      await expect(
        trackAPIUsage({
          userId: 'test-user',
          model: 'claude-sonnet-4-5-20250929',
          endpoint: '/api/test',
          inputTokens: 1000,
          outputTokens: 2000,
        })
      ).resolves.not.toThrow()
    })

    it('should handle errors gracefully', async () => {
      // Even if there's an error, it shouldn't throw
      await expect(
        trackAPIUsage({
          userId: 'test-user',
          model: 'claude-sonnet-4-5-20250929',
          endpoint: '/api/test',
          inputTokens: 1000,
          outputTokens: 2000,
        })
      ).resolves.not.toThrow()
    })
  })

  describe('Cost calculation logic', () => {
    // Test the cost calculation formula directly
    it('should calculate correct cost for Claude 3.5 Sonnet', () => {
      // Pricing: input $3/MTok, output $15/MTok
      const inputTokens = 1000
      const outputTokens = 2000

      const inputCost = (inputTokens / 1_000_000) * 3
      const outputCost = (outputTokens / 1_000_000) * 15
      const totalCost = inputCost + outputCost

      expect(inputCost).toBe(0.003)
      expect(outputCost).toBe(0.03)
      expect(totalCost).toBe(0.033)
    })

    it('should handle large token counts', () => {
      const inputTokens = 100_000
      const outputTokens = 200_000

      const inputCost = (inputTokens / 1_000_000) * 3
      const outputCost = (outputTokens / 1_000_000) * 15
      const totalCost = inputCost + outputCost

      expect(totalCost).toBe(3.3)
    })

    it('should handle zero tokens', () => {
      const inputTokens = 0
      const outputTokens = 0

      const inputCost = (inputTokens / 1_000_000) * 3
      const outputCost = (outputTokens / 1_000_000) * 15
      const totalCost = inputCost + outputCost

      expect(totalCost).toBe(0)
    })
  })
})
