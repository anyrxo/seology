/**
 * Subscription Plans Configuration
 * Based on PRD pricing structure
 */

export type PlanName = 'STARTER' | 'GROWTH' | 'SCALE'

export interface PlanFeatures {
  name: string
  displayName: string
  price: number
  priceId: string
  description: string
  features: string[]
  limits: {
    sites: number
    fixesPerMonth: number
    aiAnalyses: number
    executionModes: ('AUTOMATIC' | 'PLAN' | 'APPROVE')[]
  }
  highlighted?: boolean
}

export const PLANS: Record<PlanName, PlanFeatures> = {
  STARTER: {
    name: 'STARTER',
    displayName: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_PRICE_STARTER || 'price_starter',
    description: 'Perfect for small businesses getting started with SEO',
    features: [
      '3 connected sites',
      '50 fixes per month',
      'Approve mode only',
      'Email support',
      'Basic AI analysis',
      '90-day rollback',
    ],
    limits: {
      sites: 3,
      fixesPerMonth: 50,
      aiAnalyses: 100,
      executionModes: ['APPROVE'],
    },
  },
  GROWTH: {
    name: 'GROWTH',
    displayName: 'Professional',
    price: 99,
    priceId: process.env.STRIPE_PRICE_GROWTH || 'price_growth',
    description: 'For growing businesses that need more power',
    features: [
      '10 connected sites',
      '200 fixes per month',
      'All execution modes',
      'Priority email support',
      'Advanced AI analysis',
      'API access',
      '90-day rollback',
      'Custom integrations',
    ],
    limits: {
      sites: 10,
      fixesPerMonth: 200,
      aiAnalyses: 500,
      executionModes: ['AUTOMATIC', 'PLAN', 'APPROVE'],
    },
    highlighted: true,
  },
  SCALE: {
    name: 'SCALE',
    displayName: 'Enterprise',
    price: 299,
    priceId: process.env.STRIPE_PRICE_SCALE || 'price_scale',
    description: 'For enterprises with complex needs',
    features: [
      'Unlimited sites',
      '1000 fixes per month',
      'All execution modes',
      'Dedicated support',
      'White-label option',
      'SSO integration',
      'Custom integrations',
      'Priority AI processing',
      '90-day rollback',
      'Custom SLA',
    ],
    limits: {
      sites: -1, // -1 means unlimited
      fixesPerMonth: 1000,
      aiAnalyses: -1, // unlimited
      executionModes: ['AUTOMATIC', 'PLAN', 'APPROVE'],
    },
  },
}

/**
 * Get plan details by name
 */
export function getPlan(planName: PlanName): PlanFeatures {
  return PLANS[planName]
}

/**
 * Get plan details by Stripe price ID
 */
export function getPlanByPriceId(priceId: string): PlanFeatures | null {
  const plan = Object.values(PLANS).find((p) => p.priceId === priceId)
  return plan || null
}

/**
 * Get all plans as an array
 */
export function getAllPlans(): PlanFeatures[] {
  return Object.values(PLANS)
}

/**
 * Check if user has reached their plan limits
 */
export function hasReachedLimit(
  planName: PlanName,
  limitType: 'sites' | 'fixesPerMonth' | 'aiAnalyses',
  currentUsage: number
): boolean {
  const plan = getPlan(planName)
  const limit = plan.limits[limitType]

  // -1 means unlimited
  if (limit === -1) return false

  return currentUsage >= limit
}

/**
 * Check if a plan allows a specific execution mode
 */
export function canUseExecutionMode(
  planName: PlanName,
  mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
): boolean {
  const plan = getPlan(planName)
  return plan.limits.executionModes.includes(mode)
}

/**
 * Get usage percentage for a specific limit
 */
export function getUsagePercentage(
  planName: PlanName,
  limitType: 'sites' | 'fixesPerMonth' | 'aiAnalyses',
  currentUsage: number
): number {
  const plan = getPlan(planName)
  const limit = plan.limits[limitType]

  // -1 means unlimited
  if (limit === -1) return 0

  return Math.min((currentUsage / limit) * 100, 100)
}

/**
 * Check if plan upgrade is needed based on usage
 */
export function shouldUpgrade(
  planName: PlanName,
  usage: {
    sites?: number
    fixesPerMonth?: number
    aiAnalyses?: number
  }
): boolean {
  const plan = getPlan(planName)

  if (usage.sites && plan.limits.sites !== -1 && usage.sites >= plan.limits.sites * 0.9) {
    return true
  }

  if (
    usage.fixesPerMonth &&
    plan.limits.fixesPerMonth !== -1 &&
    usage.fixesPerMonth >= plan.limits.fixesPerMonth * 0.9
  ) {
    return true
  }

  if (
    usage.aiAnalyses &&
    plan.limits.aiAnalyses !== -1 &&
    usage.aiAnalyses >= plan.limits.aiAnalyses * 0.9
  ) {
    return true
  }

  return false
}

/**
 * Get recommended plan based on current usage
 */
export function getRecommendedPlan(usage: {
  sites: number
  fixesPerMonth: number
  aiAnalyses: number
}): PlanName {
  // Check if Scale is needed
  if (
    usage.sites > PLANS.GROWTH.limits.sites ||
    usage.fixesPerMonth > PLANS.GROWTH.limits.fixesPerMonth ||
    usage.aiAnalyses > PLANS.GROWTH.limits.aiAnalyses
  ) {
    return 'SCALE'
  }

  // Check if Growth is needed
  if (
    usage.sites > PLANS.STARTER.limits.sites ||
    usage.fixesPerMonth > PLANS.STARTER.limits.fixesPerMonth ||
    usage.aiAnalyses > PLANS.STARTER.limits.aiAnalyses
  ) {
    return 'GROWTH'
  }

  return 'STARTER'
}
