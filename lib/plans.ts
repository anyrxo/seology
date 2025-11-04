/**
 * Pricing Plans & Limits
 *
 * Defines subscription tiers and their limits
 */

export type PlanTier = 'STARTER' | 'GROWTH' | 'SCALE'

export interface PlanLimits {
  sites: number
  fixesPerMonth: number
  aiCreditsPerMonth: number // AI chat message credits
  usersPerSite: number
  analyticsRetention: number // days
  prioritySupport: boolean
  apiAccess: boolean
  customDomain: boolean
  whiteLabel: boolean
}

export interface Plan {
  id: PlanTier
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  stripePriceId: {
    monthly: string
    yearly: string
  }
  limits: PlanLimits
  features: string[]
  popular?: boolean
}

export const PLANS: Record<PlanTier, Plan> = {
  STARTER: {
    id: 'STARTER',
    name: 'Starter',
    description: 'Perfect for getting started - completely free',
    price: {
      monthly: 0,
      yearly: 0,
    },
    stripePriceId: {
      monthly: '', // No Stripe price needed for free tier
      yearly: '',
    },
    limits: {
      sites: 1,
      fixesPerMonth: 100,
      aiCreditsPerMonth: 10, // 10 AI chat messages per month
      usersPerSite: 1,
      analyticsRetention: 30,
      prioritySupport: false,
      apiAccess: false,
      customDomain: false,
      whiteLabel: false,
    },
    features: [
      '1 connected site',
      '100 SEO fixes per month',
      'Automatic fix execution',
      'Basic analytics',
      '30-day data retention',
      'Community support',
      'All platform integrations',
    ],
  },
  GROWTH: {
    id: 'GROWTH',
    name: 'Growth',
    description: 'For growing businesses and agencies',
    price: {
      monthly: 99,
      yearly: 990, // ~17% discount
    },
    stripePriceId: {
      monthly: 'price_growth_monthly',
      yearly: 'price_growth_yearly',
    },
    limits: {
      sites: 10,
      fixesPerMonth: 5000,
      aiCreditsPerMonth: 100, // 100 AI chat messages per month
      usersPerSite: 5,
      analyticsRetention: 90,
      prioritySupport: true,
      apiAccess: true,
      customDomain: false,
      whiteLabel: false,
    },
    features: [
      'Up to 10 connected sites',
      '5,000 SEO fixes per month',
      'Advanced execution modes',
      'Advanced analytics & reports',
      '90-day data retention',
      'Priority support',
      'API access',
      'Team collaboration (5 users per site)',
    ],
    popular: true,
  },
  SCALE: {
    id: 'SCALE',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: {
      monthly: -1, // Custom pricing - contact sales
      yearly: -1,
    },
    stripePriceId: {
      monthly: 'price_enterprise_monthly', // Custom quotes via sales
      yearly: 'price_enterprise_yearly',
    },
    limits: {
      sites: -1, // unlimited
      fixesPerMonth: -1, // unlimited
      aiCreditsPerMonth: -1, // unlimited AI chat messages
      usersPerSite: -1, // unlimited
      analyticsRetention: 365,
      prioritySupport: true,
      apiAccess: true,
      customDomain: true,
      whiteLabel: true,
    },
    features: [
      'Unlimited connected sites',
      'Unlimited SEO fixes',
      'All execution modes',
      'Enterprise analytics & BI integrations',
      '365-day data retention',
      'Dedicated success manager',
      'Full API access with higher rate limits',
      'Unlimited team members',
      'Custom domain & white-label',
      'SLA guarantee (99.9% uptime)',
      'Custom integrations',
      'SSO / SAML authentication',
      'On-premise deployment option',
    ],
  },
}

/**
 * Get plan by tier
 */
export function getPlan(tier: PlanTier): Plan {
  return PLANS[tier]
}

/**
 * Get all plans as array
 */
export function getAllPlans(): Plan[] {
  return Object.values(PLANS)
}

/**
 * Check if a plan has a specific feature
 */
export function hasFeature(tier: PlanTier, feature: keyof PlanLimits): boolean {
  const plan = PLANS[tier]
  return plan.limits[feature] === true || plan.limits[feature] === -1
}

/**
 * Check if usage is within plan limits
 */
export function isWithinLimit(
  tier: PlanTier,
  limitType: keyof PlanLimits,
  currentUsage: number
): boolean {
  const plan = PLANS[tier]
  const limit = plan.limits[limitType]

  // -1 means unlimited
  if (typeof limit === 'number' && limit === -1) return true

  // Boolean limits
  if (typeof limit === 'boolean') return limit

  // Numeric limits
  if (typeof limit === 'number') return currentUsage < limit

  return false
}

/**
 * Get remaining quota for a limit
 */
export function getRemainingQuota(
  tier: PlanTier,
  limitType: keyof PlanLimits,
  currentUsage: number
): number {
  const plan = PLANS[tier]
  const limit = plan.limits[limitType]

  // -1 means unlimited
  if (typeof limit === 'number' && limit === -1) return Infinity

  // Numeric limits
  if (typeof limit === 'number') return Math.max(0, limit - currentUsage)

  return 0
}

/**
 * Get usage percentage for a limit
 */
export function getUsagePercentage(
  tier: PlanTier,
  limitType: keyof PlanLimits,
  currentUsage: number
): number {
  const plan = PLANS[tier]
  const limit = plan.limits[limitType]

  // -1 means unlimited
  if (typeof limit === 'number' && limit === -1) return 0

  // Numeric limits
  if (typeof limit === 'number') {
    if (limit === 0) return 100
    return Math.min(100, Math.round((currentUsage / limit) * 100))
  }

  return 0
}

/**
 * Check if should prompt for upgrade
 */
export function shouldPromptUpgrade(
  tier: PlanTier,
  limitType: keyof PlanLimits,
  currentUsage: number,
  threshold: number = 80 // percent
): boolean {
  const percentage = getUsagePercentage(tier, limitType, currentUsage)
  return percentage >= threshold
}
