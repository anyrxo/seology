import { db } from './db'
import { getPlan, hasReachedLimit, canUseExecutionMode } from './plans'
import type { PlanName } from './plans'

/**
 * Check if user has an active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await db.subscription.findUnique({
    where: { userId },
  })

  if (!subscription) return false

  return (
    subscription.status === 'ACTIVE' ||
    subscription.status === 'TRIALING'
  )
}

/**
 * Get user's current plan
 */
export async function getUserPlan(userId: string): Promise<PlanName> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  })

  return (user?.plan as PlanName) || 'STARTER'
}

/**
 * Check if user can add more sites
 */
export async function canAddSite(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  const plan = await getUserPlan(userId)
  const planDetails = getPlan(plan)

  // Check if unlimited
  if (planDetails.limits.sites === -1) {
    return { allowed: true }
  }

  // Count connected sites
  const siteCount = await db.connection.count({
    where: { userId },
  })

  if (siteCount >= planDetails.limits.sites) {
    return {
      allowed: false,
      reason: `You've reached your plan limit of ${planDetails.limits.sites} sites. Please upgrade to add more.`,
    }
  }

  return { allowed: true }
}

/**
 * Check if user can apply a fix
 */
export async function canApplyFix(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  const plan = await getUserPlan(userId)
  const planDetails = getPlan(plan)

  // Check if unlimited
  if (planDetails.limits.fixesPerMonth === -1) {
    return { allowed: true }
  }

  // Get current month usage
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const usage = await db.usage.findUnique({
    where: {
      userId_month: {
        userId,
        month: firstDayOfMonth,
      },
    },
  })

  const fixesApplied = usage?.fixesApplied || 0

  if (fixesApplied >= planDetails.limits.fixesPerMonth) {
    return {
      allowed: false,
      reason: `You've reached your monthly limit of ${planDetails.limits.fixesPerMonth} fixes. Please upgrade or wait until next month.`,
    }
  }

  return { allowed: true }
}

/**
 * Check if user can make an AI analysis
 */
export async function canMakeAIAnalysis(userId: string): Promise<{
  allowed: boolean
  reason?: string
}> {
  const plan = await getUserPlan(userId)
  const planDetails = getPlan(plan)

  // Check if unlimited
  if (planDetails.limits.aiAnalyses === -1) {
    return { allowed: true }
  }

  // Get current month usage
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const usage = await db.usage.findUnique({
    where: {
      userId_month: {
        userId,
        month: firstDayOfMonth,
      },
    },
  })

  const aiCallsMade = usage?.aiCallsMade || 0

  if (aiCallsMade >= planDetails.limits.aiAnalyses) {
    return {
      allowed: false,
      reason: `You've reached your monthly limit of ${planDetails.limits.aiAnalyses} AI analyses. Please upgrade or wait until next month.`,
    }
  }

  return { allowed: true }
}

/**
 * Check if user can use a specific execution mode
 */
export async function canUseMode(
  userId: string,
  mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
): Promise<{
  allowed: boolean
  reason?: string
}> {
  const plan = await getUserPlan(userId)
  const allowed = canUseExecutionMode(plan, mode)

  if (!allowed) {
    return {
      allowed: false,
      reason: `The ${mode} execution mode is not available on your current plan. Please upgrade to access this feature.`,
    }
  }

  return { allowed: true }
}

/**
 * Increment usage counter
 */
export async function incrementUsage(
  userId: string,
  type: 'fix' | 'ai' | 'site'
): Promise<void> {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const updateData: any = {}

  switch (type) {
    case 'fix':
      updateData.fixesApplied = { increment: 1 }
      break
    case 'ai':
      updateData.aiCallsMade = { increment: 1 }
      break
    case 'site':
      updateData.sitesConnected = { increment: 1 }
      break
  }

  await db.usage.upsert({
    where: {
      userId_month: {
        userId,
        month: firstDayOfMonth,
      },
    },
    update: updateData,
    create: {
      userId,
      month: firstDayOfMonth,
      fixesApplied: type === 'fix' ? 1 : 0,
      aiCallsMade: type === 'ai' ? 1 : 0,
      sitesConnected: type === 'site' ? 1 : 0,
    },
  })
}

/**
 * Get current usage for a user
 */
export async function getCurrentUsage(userId: string): Promise<{
  fixesApplied: number
  aiCallsMade: number
  sitesConnected: number
}> {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const usage = await db.usage.findUnique({
    where: {
      userId_month: {
        userId,
        month: firstDayOfMonth,
      },
    },
  })

  return {
    fixesApplied: usage?.fixesApplied || 0,
    aiCallsMade: usage?.aiCallsMade || 0,
    sitesConnected: usage?.sitesConnected || 0,
  }
}

/**
 * Check if user is approaching any limits (>80% usage)
 */
export async function isApproachingLimits(userId: string): Promise<{
  approaching: boolean
  warnings: string[]
}> {
  const plan = await getUserPlan(userId)
  const planDetails = getPlan(plan)
  const usage = await getCurrentUsage(userId)
  const warnings: string[] = []

  // Check sites
  if (planDetails.limits.sites !== -1) {
    const siteCount = await db.connection.count({ where: { userId } })
    const percentage = (siteCount / planDetails.limits.sites) * 100
    if (percentage >= 80) {
      warnings.push(
        `You're using ${siteCount} of ${planDetails.limits.sites} sites (${Math.round(percentage)}%)`
      )
    }
  }

  // Check fixes
  if (planDetails.limits.fixesPerMonth !== -1) {
    const percentage = (usage.fixesApplied / planDetails.limits.fixesPerMonth) * 100
    if (percentage >= 80) {
      warnings.push(
        `You've used ${usage.fixesApplied} of ${planDetails.limits.fixesPerMonth} fixes (${Math.round(percentage)}%)`
      )
    }
  }

  // Check AI analyses
  if (planDetails.limits.aiAnalyses !== -1) {
    const percentage = (usage.aiCallsMade / planDetails.limits.aiAnalyses) * 100
    if (percentage >= 80) {
      warnings.push(
        `You've used ${usage.aiCallsMade} of ${planDetails.limits.aiAnalyses} AI analyses (${Math.round(percentage)}%)`
      )
    }
  }

  return {
    approaching: warnings.length > 0,
    warnings,
  }
}
