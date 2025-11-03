/**
 * Usage Tracking & Enforcement
 *
 * Tracks monthly usage against plan limits and enforces restrictions
 */

import { db } from './db'
import { Plan } from '@prisma/client'
import { notifyUsageLimitApproaching } from './notifications'

// ==================== PLAN LIMITS ====================

export const PLAN_LIMITS = {
  STARTER: {
    maxSites: 3,
    maxFixesPerMonth: 500,
    price: 29
  },
  GROWTH: {
    maxSites: 10,
    maxFixesPerMonth: 5000,
    price: 99
  },
  SCALE: {
    maxSites: 999999, // Unlimited
    maxFixesPerMonth: 999999, // Unlimited
    price: 299
  }
} as const

// ==================== USAGE TRACKING ====================

/**
 * Get current month's usage for a user
 */
export async function getCurrentUsage(userId: string) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

  // Get user with plan
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      connections: {
        include: {
          fixes: {
            where: {
              appliedAt: {
                gte: startOfMonth,
                lte: endOfMonth
              },
              status: 'APPLIED'
            }
          }
        }
      }
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Count fixes applied this month
  const fixesThisMonth = user.connections.reduce(
    (total, conn) => total + conn.fixes.length,
    0
  )

  // Count total sites
  const totalSites = user.connections.length

  // Get plan limits
  const limits = PLAN_LIMITS[user.plan]

  return {
    plan: user.plan,
    limits,
    usage: {
      sites: totalSites,
      fixesThisMonth,
      percentUsed: {
        sites: (totalSites / limits.maxSites) * 100,
        fixes: (fixesThisMonth / limits.maxFixesPerMonth) * 100
      }
    },
    remaining: {
      sites: Math.max(0, limits.maxSites - totalSites),
      fixes: Math.max(0, limits.maxFixesPerMonth - fixesThisMonth)
    },
    isAtLimit: {
      sites: totalSites >= limits.maxSites,
      fixes: fixesThisMonth >= limits.maxFixesPerMonth
    }
  }
}

/**
 * Check if user can add a new site
 */
export async function canAddSite(userId: string): Promise<{
  allowed: boolean
  reason?: string
  currentCount?: number
  limit?: number
}> {
  const usage = await getCurrentUsage(userId)

  if (usage.isAtLimit.sites) {
    return {
      allowed: false,
      reason: `Site limit reached. Your ${usage.plan} plan allows ${usage.limits.maxSites} sites.`,
      currentCount: usage.usage.sites,
      limit: usage.limits.maxSites
    }
  }

  return {
    allowed: true,
    currentCount: usage.usage.sites,
    limit: usage.limits.maxSites
  }
}

/**
 * Check if user can apply fixes
 */
export async function canApplyFixes(
  userId: string,
  fixCount: number = 1
): Promise<{
  allowed: boolean
  reason?: string
  currentCount?: number
  limit?: number
  remaining?: number
}> {
  const usage = await getCurrentUsage(userId)

  const willExceedLimit = usage.usage.fixesThisMonth + fixCount > usage.limits.maxFixesPerMonth

  if (willExceedLimit) {
    return {
      allowed: false,
      reason: `Monthly fix limit reached. Your ${usage.plan} plan allows ${usage.limits.maxFixesPerMonth} fixes per month.`,
      currentCount: usage.usage.fixesThisMonth,
      limit: usage.limits.maxFixesPerMonth,
      remaining: usage.remaining.fixes
    }
  }

  return {
    allowed: true,
    currentCount: usage.usage.fixesThisMonth,
    limit: usage.limits.maxFixesPerMonth,
    remaining: usage.remaining.fixes
  }
}

/**
 * Track a fix application (for usage statistics)
 * Also checks usage limits and sends warnings
 */
export async function trackFixApplied(
  userId: string,
  fixId: string,
  siteId: string
): Promise<void> {
  // Fix is already tracked in the fixes table
  // This function can be used for additional analytics if needed

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      connectionId: siteId,
      action: 'FIX_APPLIED_TRACKED',
      resource: 'fix',
      resourceId: fixId,
      details: JSON.stringify({
        timestamp: new Date().toISOString()
      })
    }
  })

  // Check if user is approaching usage limit
  try {
    const usage = await getCurrentUsage(userId)

    // Send warning at 80% threshold
    if (usage.usage.percentUsed.fixes >= 80 && usage.usage.percentUsed.fixes < 100) {
      // Check if we've already sent a warning recently (within last 24 hours)
      const recentWarning = await db.notification.findFirst({
        where: {
          userId,
          type: 'USAGE_LIMIT',
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      })

      // Only send if no recent warning exists
      if (!recentWarning) {
        await notifyUsageLimitApproaching(
          userId,
          'monthly fixes',
          Math.round(usage.usage.percentUsed.fixes)
        )
      }
    }
  } catch (error) {
    console.error('Error checking usage limits:', error)
    // Don't throw - usage tracking shouldn't block fix application
  }
}

/**
 * Get usage summary for dashboard
 */
export async function getUsageSummary(userId: string) {
  const usage = await getCurrentUsage(userId)

  return {
    plan: {
      name: usage.plan,
      price: usage.limits.price
    },
    sites: {
      used: usage.usage.sites,
      limit: usage.limits.maxSites,
      remaining: usage.remaining.sites,
      percentUsed: Math.round(usage.usage.percentUsed.sites)
    },
    fixes: {
      used: usage.usage.fixesThisMonth,
      limit: usage.limits.maxFixesPerMonth,
      remaining: usage.remaining.fixes,
      percentUsed: Math.round(usage.usage.percentUsed.fixes)
    },
    warnings: {
      sitesAtLimit: usage.isAtLimit.sites,
      fixesAtLimit: usage.isAtLimit.fixes,
      fixesNearLimit: usage.usage.percentUsed.fixes >= 80
    }
  }
}

// ==================== MONTHLY RESET ====================

/**
 * Reset monthly usage counters
 * Should be called by a cron job on the 1st of each month
 */
export async function resetMonthlyUsage(): Promise<{
  usersProcessed: number
  errors: number
}> {
  let usersProcessed = 0
  let errors = 0

  try {
    // Get all users
    const users = await db.user.findMany({
      select: { id: true, email: true }
    })

    // Nothing to reset in database - usage is calculated dynamically
    // But we can send notifications about the new month

    for (const user of users) {
      try {
        const usage = await getCurrentUsage(user.id)

        // Send notification if user was near/at limit last month
        if (usage.usage.fixesThisMonth > 0) {
          await db.notification.create({
            data: {
              userId: user.id,
              type: 'INFO',
              title: 'Monthly Usage Reset',
              message: `Your ${usage.plan} plan limits have been reset. You have ${usage.limits.maxFixesPerMonth} fixes available this month.`,
              actionUrl: '/dashboard/billing'
            }
          })
        }

        usersProcessed++
      } catch (error) {
        console.error(`Error resetting usage for user ${user.id}:`, error)
        errors++
      }
    }

    return { usersProcessed, errors }
  } catch (error) {
    console.error('Error in resetMonthlyUsage:', error)
    throw error
  }
}

// ==================== UPGRADE HELPERS ====================

/**
 * Check if user should be prompted to upgrade
 */
export async function shouldPromptUpgrade(userId: string): Promise<{
  shouldPrompt: boolean
  reason?: string
  recommendedPlan?: Plan
}> {
  const usage = await getCurrentUsage(userId)

  // At fix limit
  if (usage.isAtLimit.fixes) {
    const nextPlan = getNextPlan(usage.plan)
    return {
      shouldPrompt: true,
      reason: 'You\'ve reached your monthly fix limit',
      recommendedPlan: nextPlan
    }
  }

  // Near fix limit (>90%)
  if (usage.usage.percentUsed.fixes >= 90) {
    const nextPlan = getNextPlan(usage.plan)
    return {
      shouldPrompt: true,
      reason: 'You\'re approaching your monthly fix limit',
      recommendedPlan: nextPlan
    }
  }

  // At site limit
  if (usage.isAtLimit.sites) {
    const nextPlan = getNextPlan(usage.plan)
    return {
      shouldPrompt: true,
      reason: 'You\'ve reached your site limit',
      recommendedPlan: nextPlan
    }
  }

  return {
    shouldPrompt: false
  }
}

/**
 * Get the next plan tier
 */
function getNextPlan(currentPlan: Plan): Plan | undefined {
  switch (currentPlan) {
    case 'STARTER':
      return 'GROWTH'
    case 'GROWTH':
      return 'SCALE'
    case 'SCALE':
      return undefined // Already at highest tier
    default:
      return 'STARTER'
  }
}

/**
 * Get upgrade benefits for a plan
 */
export function getUpgradeBenefits(fromPlan: Plan, toPlan: Plan) {
  const current = PLAN_LIMITS[fromPlan]
  const upgraded = PLAN_LIMITS[toPlan]

  return {
    additionalSites: upgraded.maxSites - current.maxSites,
    additionalFixes: upgraded.maxFixesPerMonth - current.maxFixesPerMonth,
    priceIncrease: upgraded.price - current.price,
    features: getNewFeatures(fromPlan, toPlan)
  }
}

/**
 * Get new features when upgrading
 */
function getNewFeatures(fromPlan: Plan, toPlan: Plan): string[] {
  if (fromPlan === 'STARTER' && toPlan === 'GROWTH') {
    return [
      'Priority support',
      'Advanced analytics',
      'Custom fix rules',
      'API access'
    ]
  }

  if (toPlan === 'SCALE') {
    return [
      'Unlimited sites',
      'Unlimited fixes',
      'Dedicated account manager',
      'White-label options',
      'SLA guarantee'
    ]
  }

  return []
}
