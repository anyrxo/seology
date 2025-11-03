/**
 * Plan Comparison Component
 * Displays pricing plans with features in a comparison table
 */

'use client'

import { useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PLANS, type PlanTier } from '@/lib/plans'
import { cn } from '@/lib/utils'

interface PlanComparisonProps {
  currentPlan?: PlanTier
  onSelectPlan?: (plan: PlanTier, billingCycle: 'monthly' | 'yearly') => void
  showCurrentBadge?: boolean
}

export function PlanComparison({
  currentPlan,
  onSelectPlan,
  showCurrentBadge = true,
}: PlanComparisonProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const handleSelectPlan = async (planTier: PlanTier) => {
    if (onSelectPlan) {
      onSelectPlan(planTier, billingCycle)
    } else {
      // Default: redirect to checkout
      try {
        const response = await fetch('/api/billing/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: planTier, billingCycle }),
        })

        const data = await response.json()
        if (data.success && data.url) {
          window.location.href = data.url
        }
      } catch (error) {
        console.error('Error creating checkout:', error)
      }
    }
  }

  const getMonthlyPrice = (tier: PlanTier) => {
    const plan = PLANS[tier]
    if (billingCycle === 'yearly') {
      return Math.round(plan.price.yearly / 12)
    }
    return plan.price.monthly
  }

  const getSavings = (tier: PlanTier) => {
    const plan = PLANS[tier]
    const yearlyMonthly = Math.round(plan.price.yearly / 12)
    const monthlyCost = plan.price.monthly
    return monthlyCost - yearlyMonthly
  }

  const planTiers: PlanTier[] = ['STARTER', 'GROWTH', 'SCALE']

  return (
    <div className="w-full">
      {/* Billing cycle toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex items-center rounded-lg border border-gray-700 p-1 bg-gray-800">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              billingCycle === 'monthly'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              billingCycle === 'yearly'
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Yearly
            {billingCycle === 'yearly' && (
              <Badge variant="success" className="ml-2">
                Save 17%
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {planTiers.map((tier) => {
          const plan = PLANS[tier]
          const isCurrentPlan = currentPlan === tier
          const monthlyPrice = getMonthlyPrice(tier)
          const savings = billingCycle === 'yearly' ? getSavings(tier) : 0

          return (
            <Card
              key={tier}
              className={cn(
                'relative flex flex-col',
                plan.popular && 'border-blue-500 shadow-lg shadow-blue-500/20',
                isCurrentPlan && 'border-green-500'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge variant="default" className="text-xs bg-blue-500 hover:bg-blue-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {isCurrentPlan && showCurrentBadge && (
                <div className="absolute -top-4 right-4">
                  <Badge variant="success" className="text-xs">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">${monthlyPrice}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-green-400 mt-1">
                      Save ${savings}/month with annual billing
                    </p>
                  )}
                  {billingCycle === 'monthly' && (
                    <p className="text-sm text-gray-400 mt-1">
                      Billed monthly
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(tier)}
                  disabled={isCurrentPlan}
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {isCurrentPlan ? 'Current Plan' : `Choose ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Features comparison note */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <p>All plans include access to our AI-powered SEO automation platform</p>
        <p className="mt-1">Need a custom enterprise plan? <a href="mailto:sales@seology.ai" className="text-blue-400 hover:underline">Contact sales</a></p>
      </div>
    </div>
  )
}
