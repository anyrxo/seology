/**
 * AI Credit Management System
 * Handles credit checking, usage tracking, and limit enforcement
 */

import { db } from '@/lib/db'
import { Plan } from '@prisma/client'

/**
 * Credit limits per plan
 */
const CREDIT_LIMITS: Record<Plan, number> = {
  STARTER: 100, // 100 AI chat messages per month
  GROWTH: 500, // 500 AI chat messages per month
  SCALE: 2000, // 2000 AI chat messages per month
}

/**
 * Get or create usage record for current month
 */
export async function getOrCreateUsageRecord(userId: string) {
  // Get first day of current month
  const currentPeriod = new Date()
  currentPeriod.setDate(1)
  currentPeriod.setHours(0, 0, 0, 0)

  // Try to find existing usage record
  let usageRecord = await db.usageRecord.findUnique({
    where: {
      userId_period: {
        userId,
        period: currentPeriod,
      },
    },
  })

  // Create if doesn't exist
  if (!usageRecord) {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    })

    if (!user) {
      throw new Error('User not found')
    }

    const aiCreditsLimit = CREDIT_LIMITS[user.plan]

    usageRecord = await db.usageRecord.create({
      data: {
        userId,
        period: currentPeriod,
        aiCreditsUsed: 0,
        aiCreditsLimit,
        sitesLimit: user.plan === 'STARTER' ? 3 : user.plan === 'GROWTH' ? 10 : 999,
        fixesLimit: user.plan === 'STARTER' ? 500 : user.plan === 'GROWTH' ? 5000 : 999999,
      },
    })
  }

  return usageRecord
}

/**
 * Check if user has available AI credits
 * Returns true if user has credits, false otherwise
 */
export async function hasAvailableCredits(userId: string): Promise<boolean> {
  const usageRecord = await getOrCreateUsageRecord(userId)
  return usageRecord.aiCreditsUsed < usageRecord.aiCreditsLimit
}

/**
 * Get remaining credits for user
 */
export async function getRemainingCredits(userId: string): Promise<{
  used: number
  limit: number
  remaining: number
}> {
  const usageRecord = await getOrCreateUsageRecord(userId)
  return {
    used: usageRecord.aiCreditsUsed,
    limit: usageRecord.aiCreditsLimit,
    remaining: usageRecord.aiCreditsLimit - usageRecord.aiCreditsUsed,
  }
}

/**
 * Consume one AI credit
 * Returns updated credit info
 */
export async function consumeCredit(userId: string): Promise<{
  used: number
  limit: number
  remaining: number
}> {
  const currentPeriod = new Date()
  currentPeriod.setDate(1)
  currentPeriod.setHours(0, 0, 0, 0)

  // Increment credit usage
  const updatedRecord = await db.usageRecord.update({
    where: {
      userId_period: {
        userId,
        period: currentPeriod,
      },
    },
    data: {
      aiCreditsUsed: {
        increment: 1,
      },
    },
  })

  return {
    used: updatedRecord.aiCreditsUsed,
    limit: updatedRecord.aiCreditsLimit,
    remaining: updatedRecord.aiCreditsLimit - updatedRecord.aiCreditsUsed,
  }
}

/**
 * Check credits and throw error if insufficient
 * Use this in API routes to enforce credit limits
 */
export async function requireCredits(userId: string) {
  const hasCredits = await hasAvailableCredits(userId)
  if (!hasCredits) {
    throw new Error('INSUFFICIENT_CREDITS')
  }
}

/**
 * Get credit status for display in UI
 */
export async function getCreditStatus(userId: string): Promise<{
  used: number
  limit: number
  remaining: number
  percentage: number
  status: 'healthy' | 'low' | 'critical' | 'depleted'
}> {
  const credits = await getRemainingCredits(userId)
  const percentage = (credits.used / credits.limit) * 100

  let status: 'healthy' | 'low' | 'critical' | 'depleted'
  if (credits.remaining === 0) {
    status = 'depleted'
  } else if (percentage >= 90) {
    status = 'critical'
  } else if (percentage >= 75) {
    status = 'low'
  } else {
    status = 'healthy'
  }

  return {
    ...credits,
    percentage,
    status,
  }
}

/**
 * Calculate cost for AI API usage
 * Based on Anthropic pricing for Claude 3.5 Sonnet
 */
export function calculateAICost(inputTokens: number, outputTokens: number): number {
  const INPUT_COST_PER_MILLION = 3.0 // $3 per million input tokens
  const OUTPUT_COST_PER_MILLION = 15.0 // $15 per million output tokens

  const inputCost = (inputTokens / 1_000_000) * INPUT_COST_PER_MILLION
  const outputCost = (outputTokens / 1_000_000) * OUTPUT_COST_PER_MILLION

  return inputCost + outputCost
}
