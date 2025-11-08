/**
 * Usage Tracking and Enforcement
 *
 * Ensures users stay within their plan limits for:
 * - Monthly fixes
 * - AI credits
 * - Sites
 */

import { db } from './db'

export interface UsageLimits {
  fixesLimit: number
  aiCreditsLimit: number
  sitesLimit: number
}

export interface UsageStatus {
  fixesUsed: number
  fixesLimit: number
  fixesRemaining: number
  aiCreditsUsed: number
  aiCreditsLimit: number
  aiCreditsRemaining: number
  canApplyFixes: boolean
  canUseAI: boolean
}

/**
 * Get usage limits based on user's plan
 */
export function getPlanLimits(plan: string): UsageLimits {
  switch (plan) {
    case 'STARTER':
      return {
        fixesLimit: 500,
        aiCreditsLimit: 100,
        sitesLimit: 3,
      }
    case 'GROWTH':
      return {
        fixesLimit: 5000,
        aiCreditsLimit: 500,
        sitesLimit: 10,
      }
    case 'SCALE':
      return {
        fixesLimit: 999999, // Unlimited
        aiCreditsLimit: 2000,
        sitesLimit: 999,
      }
    default:
      // Default to STARTER limits
      return {
        fixesLimit: 500,
        aiCreditsLimit: 100,
        sitesLimit: 3,
      }
  }
}

/**
 * Get current period (first day of current month)
 */
export function getCurrentPeriod(): Date {
  const now = new Date()
  const period = new Date(now.getFullYear(), now.getMonth(), 1)
  period.setHours(0, 0, 0, 0)
  return period
}

/**
 * Get or create usage record for current period
 */
export async function getOrCreateUsageRecord(userId: string) {
  const period = getCurrentPeriod()

  // Try to find existing record
  let usageRecord = await db.usageRecord.findUnique({
    where: {
      userId_period: {
        userId,
        period,
      },
    },
  })

  if (!usageRecord) {
    // Get user's plan to set limits
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { plan: true },
    })

    const limits = getPlanLimits(user?.plan || 'STARTER')

    // Create new usage record
    usageRecord = await db.usageRecord.create({
      data: {
        userId,
        period,
        sitesUsed: 0,
        fixesApplied: 0,
        crawlsExecuted: 0,
        apiCallsMade: 0,
        aiCreditsUsed: 0,
        sitesLimit: limits.sitesLimit,
        fixesLimit: limits.fixesLimit,
        aiCreditsLimit: limits.aiCreditsLimit,
      },
    })
  }

  return usageRecord
}

/**
 * Check if user can apply more fixes this month
 */
export async function canApplyFixes(userId: string, count: number = 1): Promise<{
  allowed: boolean
  current: number
  limit: number
  remaining: number
  error?: string
}> {
  const usageRecord = await getOrCreateUsageRecord(userId)

  const remaining = usageRecord.fixesLimit - usageRecord.fixesApplied

  if (usageRecord.fixesApplied + count > usageRecord.fixesLimit) {
    return {
      allowed: false,
      current: usageRecord.fixesApplied,
      limit: usageRecord.fixesLimit,
      remaining,
      error: `Monthly fix limit reached. You've used ${usageRecord.fixesApplied} of ${usageRecord.fixesLimit} fixes this month.`,
    }
  }

  return {
    allowed: true,
    current: usageRecord.fixesApplied,
    limit: usageRecord.fixesLimit,
    remaining,
  }
}

/**
 * Increment fix usage counter
 */
export async function trackFixUsage(userId: string, count: number = 1): Promise<void> {
  const period = getCurrentPeriod()

  await db.usageRecord.update({
    where: {
      userId_period: {
        userId,
        period,
      },
    },
    data: {
      fixesApplied: {
        increment: count,
      },
    },
  })
}

/**
 * Check if user can use AI credits
 */
export async function canUseAI(userId: string): Promise<{
  allowed: boolean
  current: number
  limit: number
  remaining: number
  error?: string
}> {
  const usageRecord = await getOrCreateUsageRecord(userId)

  const remaining = usageRecord.aiCreditsLimit - usageRecord.aiCreditsUsed

  if (usageRecord.aiCreditsUsed >= usageRecord.aiCreditsLimit) {
    return {
      allowed: false,
      current: usageRecord.aiCreditsUsed,
      limit: usageRecord.aiCreditsLimit,
      remaining: 0,
      error: `Monthly AI credit limit reached. You've used ${usageRecord.aiCreditsUsed} of ${usageRecord.aiCreditsLimit} credits this month.`,
    }
  }

  return {
    allowed: true,
    current: usageRecord.aiCreditsUsed,
    limit: usageRecord.aiCreditsLimit,
    remaining,
  }
}

/**
 * Track AI credit usage
 */
export async function trackAIUsage(userId: string, count: number = 1): Promise<void> {
  const period = getCurrentPeriod()

  await db.usageRecord.update({
    where: {
      userId_period: {
        userId,
        period,
      },
    },
    data: {
      aiCreditsUsed: {
        increment: count,
      },
    },
  })
}

/**
 * Get complete usage status for user
 */
export async function getUsageStatus(userId: string): Promise<UsageStatus> {
  const usageRecord = await getOrCreateUsageRecord(userId)

  return {
    fixesUsed: usageRecord.fixesApplied,
    fixesLimit: usageRecord.fixesLimit,
    fixesRemaining: usageRecord.fixesLimit - usageRecord.fixesApplied,
    aiCreditsUsed: usageRecord.aiCreditsUsed,
    aiCreditsLimit: usageRecord.aiCreditsLimit,
    aiCreditsRemaining: usageRecord.aiCreditsLimit - usageRecord.aiCreditsUsed,
    canApplyFixes: usageRecord.fixesApplied < usageRecord.fixesLimit,
    canUseAI: usageRecord.aiCreditsUsed < usageRecord.aiCreditsLimit,
  }
}
