import { db } from './db'
import { Plan } from '@prisma/client'
import { notifyUsageWarning, notifyUsageLimitReached } from './notifications'

export interface PlanLimits {
  sites: number
  fixesPerMonth: number
  aiAnalysesPerMonth: number
}

export interface UsageStats {
  fixesApplied: number
  aiCallsMade: number
  sitesConnected: number
  limits: PlanLimits
  percentages: {
    fixes: number
    aiAnalyses: number
    sites: number
  }
}

/**
 * Get plan limits based on subscription tier
 */
export function getPlanLimits(plan: Plan): PlanLimits {
  switch (plan) {
    case 'STARTER':
      return {
        sites: 3,
        fixesPerMonth: 50,
        aiAnalysesPerMonth: 10,
      }
    case 'GROWTH':
      return {
        sites: 10,
        fixesPerMonth: 200,
        aiAnalysesPerMonth: 50,
      }
    case 'SCALE':
      return {
        sites: 999999, // Effectively unlimited
        fixesPerMonth: 1000,
        aiAnalysesPerMonth: 200,
      }
    default:
      // Default to STARTER limits
      return {
        sites: 3,
        fixesPerMonth: 50,
        aiAnalysesPerMonth: 10,
      }
  }
}

/**
 * Get the first day of the current month
 */
function getCurrentMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

/**
 * Get or create usage record for current month
 */
async function getOrCreateUsage(userId: string) {
  const month = getCurrentMonthStart()

  let usage = await db.usage.findUnique({
    where: {
      userId_month: {
        userId,
        month,
      },
    },
  })

  if (!usage) {
    usage = await db.usage.create({
      data: {
        userId,
        month,
        fixesApplied: 0,
        aiCallsMade: 0,
        sitesConnected: 0,
      },
    })
  }

  return usage
}

/**
 * Track a fix being applied
 */
export async function trackFixApplied(userId: string, siteId: string): Promise<void> {
  const usage = await getOrCreateUsage(userId)

  // Get user to check plan limits
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) return

  const limits = getPlanLimits(user.plan)
  const newCount = usage.fixesApplied + 1

  await db.usage.update({
    where: { id: usage.id },
    data: {
      fixesApplied: {
        increment: 1,
      },
    },
  })

  // Check for usage warnings
  const usagePercent = (newCount / limits.fixesPerMonth) * 100

  if (usagePercent >= 100) {
    // Limit reached
    await notifyUsageLimitReached(userId, 'fixes')
  } else if (usagePercent >= 90) {
    // Approaching limit (90%)
    await notifyUsageWarning(userId, Math.round(usagePercent), 'fixes')
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      action: 'USAGE_TRACKED',
      resource: 'usage',
      resourceId: usage.id,
      details: {
        type: 'fix_applied',
        siteId,
        month: usage.month.toISOString(),
      },
    },
  })
}

/**
 * Track a site being connected
 */
export async function trackSiteConnected(userId: string, siteId: string): Promise<void> {
  const usage = await getOrCreateUsage(userId)

  // Count current active connections
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      connections: {
        where: {
          status: 'CONNECTED',
        },
      },
    },
  })

  const activeConnections = user?.connections.length || 0

  await db.usage.update({
    where: { id: usage.id },
    data: {
      sitesConnected: activeConnections,
    },
  })

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      action: 'USAGE_TRACKED',
      resource: 'usage',
      resourceId: usage.id,
      details: {
        type: 'site_connected',
        siteId,
        totalSites: activeConnections,
        month: usage.month.toISOString(),
      },
    },
  })
}

/**
 * Track an AI analysis being performed
 */
export async function trackAIAnalysis(userId: string, siteId: string): Promise<void> {
  const usage = await getOrCreateUsage(userId)

  await db.usage.update({
    where: { id: usage.id },
    data: {
      aiCallsMade: {
        increment: 1,
      },
    },
  })

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      action: 'USAGE_TRACKED',
      resource: 'usage',
      resourceId: usage.id,
      details: {
        type: 'ai_analysis',
        siteId,
        month: usage.month.toISOString(),
      },
    },
  })
}

/**
 * Check if user has reached their usage limit for a specific type
 */
export async function checkUsageLimit(
  userId: string,
  limitType: 'fixes' | 'sites' | 'aiAnalyses'
): Promise<{ allowed: boolean; current: number; limit: number; message?: string }> {
  // Get user's plan
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      connections: {
        where: {
          status: 'CONNECTED',
        },
      },
    },
  })

  if (!user) {
    return {
      allowed: false,
      current: 0,
      limit: 0,
      message: 'User not found',
    }
  }

  const limits = getPlanLimits(user.plan)
  const usage = await getOrCreateUsage(userId)

  let current: number
  let limit: number
  let allowed: boolean

  switch (limitType) {
    case 'fixes':
      current = usage.fixesApplied
      limit = limits.fixesPerMonth
      allowed = current < limit
      return {
        allowed,
        current,
        limit,
        message: allowed
          ? undefined
          : `You've reached your monthly limit of ${limit} fixes. Upgrade to apply more fixes.`,
      }

    case 'sites':
      current = user.connections.length
      limit = limits.sites
      allowed = current < limit
      return {
        allowed,
        current,
        limit,
        message: allowed
          ? undefined
          : `You've reached your limit of ${limit} connected sites. Upgrade to connect more sites.`,
      }

    case 'aiAnalyses':
      current = usage.aiCallsMade
      limit = limits.aiAnalysesPerMonth
      allowed = current < limit
      return {
        allowed,
        current,
        limit,
        message: allowed
          ? undefined
          : `You've reached your monthly limit of ${limit} AI analyses. Upgrade to run more analyses.`,
      }

    default:
      return {
        allowed: false,
        current: 0,
        limit: 0,
        message: 'Invalid limit type',
      }
  }
}

/**
 * Get current usage statistics for a user
 */
export async function getUsageStats(userId: string): Promise<UsageStats> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      connections: {
        where: {
          status: 'CONNECTED',
        },
      },
    },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const limits = getPlanLimits(user.plan)
  const usage = await getOrCreateUsage(userId)

  return {
    fixesApplied: usage.fixesApplied,
    aiCallsMade: usage.aiCallsMade,
    sitesConnected: user.connections.length,
    limits,
    percentages: {
      fixes: (usage.fixesApplied / limits.fixesPerMonth) * 100,
      aiAnalyses: (usage.aiCallsMade / limits.aiAnalysesPerMonth) * 100,
      sites: (user.connections.length / limits.sites) * 100,
    },
  }
}

/**
 * Reset monthly usage counters (to be run as a cron job on the 1st of each month)
 * This doesn't delete old records, just creates new ones for the new month
 */
export async function resetMonthlyUsage(): Promise<{ usersReset: number }> {
  const month = getCurrentMonthStart()

  // Find all users with usage records from previous months
  const users = await db.user.findMany({
    include: {
      connections: true,
    },
  })

  let usersReset = 0

  for (const user of users) {
    // Check if usage record exists for current month
    const existingUsage = await db.usage.findUnique({
      where: {
        userId_month: {
          userId: user.id,
          month,
        },
      },
    })

    // Only create if it doesn't exist
    if (!existingUsage) {
      await db.usage.create({
        data: {
          userId: user.id,
          month,
          fixesApplied: 0,
          aiCallsMade: 0,
          sitesConnected: user.connections.filter(c => c.status === 'CONNECTED').length,
        },
      })
      usersReset++
    }
  }

  // Create system audit log
  console.log(`Monthly usage reset completed for ${usersReset} users`)

  return { usersReset }
}

/**
 * Check if user is approaching limit (90% threshold)
 */
export function isApproachingLimit(current: number, limit: number): boolean {
  return (current / limit) >= 0.9
}

/**
 * Get upgrade recommendation message
 */
export function getUpgradeMessage(plan: Plan): string {
  switch (plan) {
    case 'STARTER':
      return 'Upgrade to Growth plan for 10 sites, 200 fixes/month, and 50 AI analyses/month.'
    case 'GROWTH':
      return 'Upgrade to Scale plan for unlimited sites, 1000 fixes/month, and 200 AI analyses/month.'
    case 'SCALE':
      return 'You are on the highest plan. Contact sales for custom enterprise solutions.'
    default:
      return 'Upgrade your plan to unlock more features.'
  }
}
