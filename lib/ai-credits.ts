/**
 * AI Credit Management
 *
 * Handles tracking and enforcement of AI chat message credits
 */

import { db } from '@/lib/db'
import { getPlan } from '@/lib/plans'
import { Plan } from '@prisma/client'

export interface CreditBalance {
  monthlyCredits: number // From subscription plan
  monthlyUsed: number // Used this month
  monthlyRemaining: number // Remaining from monthly quota
  purchasedCredits: number // From one-time purchases
  totalAvailable: number // Total credits available
  isUnlimited: boolean // Enterprise plan
}

/**
 * Get user's current AI credit balance
 */
export async function getAICreditBalance(userId: string): Promise<CreditBalance> {
  // Get user's plan
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const plan = getPlan(user.plan)
  const monthlyLimit = plan.limits.aiCreditsPerMonth

  // Check if unlimited
  if (monthlyLimit === -1) {
    return {
      monthlyCredits: -1,
      monthlyUsed: 0,
      monthlyRemaining: -1,
      purchasedCredits: 0,
      totalAvailable: -1,
      isUnlimited: true,
    }
  }

  // Get current month's usage
  const now = new Date()
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const usageRecord = await db.usageRecord.findUnique({
    where: {
      userId_period: {
        userId,
        period: periodStart,
      },
    },
  })

  const monthlyUsed = usageRecord?.aiCreditsUsed || 0
  const monthlyRemaining = Math.max(0, monthlyLimit - monthlyUsed)

  // Get purchased credits (sum of all remaining purchased credits)
  const purchasedCredits = await db.aICreditPurchase.aggregate({
    where: {
      userId,
      status: 'COMPLETED',
      creditsRemaining: { gt: 0 },
      OR: [
        { expiresAt: null }, // Never expires
        { expiresAt: { gt: new Date() } }, // Not yet expired
      ],
    },
    _sum: {
      creditsRemaining: true,
    },
  })

  const totalPurchasedCredits = purchasedCredits._sum.creditsRemaining || 0

  return {
    monthlyCredits: monthlyLimit,
    monthlyUsed,
    monthlyRemaining,
    purchasedCredits: totalPurchasedCredits,
    totalAvailable: monthlyRemaining + totalPurchasedCredits,
    isUnlimited: false,
  }
}

/**
 * Check if user has enough credits for a request
 */
export async function hasAICredits(userId: string): Promise<boolean> {
  const balance = await getAICreditBalance(userId)

  // Unlimited plan
  if (balance.isUnlimited) return true

  // Has credits available
  return balance.totalAvailable > 0
}

/**
 * Consume AI credits (1 credit per message)
 * Uses monthly credits first, then purchased credits
 */
export async function consumeAICredit(userId: string): Promise<{
  success: boolean
  balance: CreditBalance
  error?: string
}> {
  // Get current balance
  const balance = await getAICreditBalance(userId)

  // Check if unlimited
  if (balance.isUnlimited) {
    return { success: true, balance }
  }

  // Check if has credits
  if (balance.totalAvailable <= 0) {
    return {
      success: false,
      balance,
      error: 'Insufficient AI credits. Please upgrade your plan or purchase additional credits.',
    }
  }

  // Consume from monthly quota first
  if (balance.monthlyRemaining > 0) {
    await consumeMonthlyCredit(userId)
  } else {
    // Consume from purchased credits
    await consumePurchasedCredit(userId)
  }

  // Get updated balance
  const updatedBalance = await getAICreditBalance(userId)

  return { success: true, balance: updatedBalance }
}

/**
 * Consume 1 credit from monthly quota
 */
async function consumeMonthlyCredit(userId: string): Promise<void> {
  const now = new Date()
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  if (!user) throw new Error('User not found')

  const plan = getPlan(user.plan)

  await db.usageRecord.upsert({
    where: {
      userId_period: {
        userId,
        period: periodStart,
      },
    },
    create: {
      userId,
      period: periodStart,
      aiCreditsUsed: 1,
      sitesLimit: plan.limits.sites,
      fixesLimit: plan.limits.fixesPerMonth,
      aiCreditsLimit: plan.limits.aiCreditsPerMonth,
    },
    update: {
      aiCreditsUsed: {
        increment: 1,
      },
    },
  })
}

/**
 * Consume 1 credit from purchased credits (oldest first)
 */
async function consumePurchasedCredit(userId: string): Promise<void> {
  // Find oldest purchase with remaining credits
  const purchase = await db.aICreditPurchase.findFirst({
    where: {
      userId,
      status: 'COMPLETED',
      creditsRemaining: { gt: 0 },
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    },
    orderBy: {
      createdAt: 'asc', // Oldest first (FIFO)
    },
  })

  if (!purchase) {
    throw new Error('No purchased credits available')
  }

  // Decrement purchased credits
  await db.aICreditPurchase.update({
    where: { id: purchase.id },
    data: {
      creditsRemaining: {
        decrement: 1,
      },
      creditsUsed: {
        increment: 1,
      },
    },
  })
}

/**
 * Get credit pricing for one-time purchases
 * Higher price than subscription to incentivize plans
 */
export interface CreditPackage {
  credits: number
  price: number
  pricePerCredit: number
  popular?: boolean
}

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    credits: 10,
    price: 15, // $1.50 per credit (vs $1 in Growth plan)
    pricePerCredit: 1.5,
  },
  {
    credits: 25,
    price: 30, // $1.20 per credit
    pricePerCredit: 1.2,
    popular: true,
  },
  {
    credits: 50,
    price: 50, // $1 per credit
    pricePerCredit: 1.0,
  },
  {
    credits: 100,
    price: 90, // $0.90 per credit
    pricePerCredit: 0.9,
  },
]

/**
 * Check if user should be warned about low credits (below 20%)
 */
export async function shouldWarnLowCredits(userId: string): Promise<boolean> {
  const balance = await getAICreditBalance(userId)

  if (balance.isUnlimited) return false

  const totalLimit = balance.monthlyCredits + balance.purchasedCredits
  const percentageRemaining = (balance.totalAvailable / totalLimit) * 100

  return percentageRemaining < 20 && balance.totalAvailable > 0
}

/**
 * Get credit usage statistics for display
 */
export async function getCreditUsageStats(userId: string) {
  const balance = await getAICreditBalance(userId)
  const shouldWarn = await shouldWarnLowCredits(userId)

  return {
    ...balance,
    percentageUsed: balance.isUnlimited
      ? 0
      : Math.round((balance.monthlyUsed / balance.monthlyCredits) * 100),
    shouldWarn,
    status: balance.totalAvailable === 0
      ? 'depleted'
      : shouldWarn
        ? 'low'
        : 'healthy',
  }
}
