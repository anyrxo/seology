/**
 * Billing Dashboard Page
 * Shows subscription, usage, and billing management
 */

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getUsageSummary } from '@/lib/usage'
import { PlanComparison } from '@/components/billing/PlanComparison'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ExternalLink, CreditCard, Receipt, AlertCircle } from 'lucide-react'

export default async function BillingPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user with subscription
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      subscriptions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  // Get usage stats
  const usage = await getUsageSummary(user.id)
  const subscription = user.subscriptions[0]

  // Get Stripe subscription status if exists
  let stripeStatus: 'active' | 'past_due' | 'canceled' | 'trialing' | null = null
  let nextBillingDate: Date | null = null

  if (subscription) {
    stripeStatus = subscription.status === 'ACTIVE' ? 'active'
      : subscription.status === 'PAST_DUE' ? 'past_due'
      : subscription.status === 'TRIALING' ? 'trialing'
      : 'canceled'
    nextBillingDate = subscription.currentPeriodEnd
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Subscription</h1>
        <p className="text-gray-400">
          Manage your subscription, monitor usage, and view billing history
        </p>
      </div>

      {/* Payment Failed Alert */}
      {stripeStatus === 'past_due' && (
        <Card className="border-red-500 bg-red-500/10">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-500 mb-1">Payment Failed</h3>
                <p className="text-sm text-red-400 mb-3">
                  Your most recent payment failed. Please update your payment method to avoid service interruption.
                </p>
                <ManageSubscriptionButton customerId={user.stripeCustomerId} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Plan Overview */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <CardTitle className="text-2xl">{usage.plan.name} Plan</CardTitle>
                {stripeStatus && (
                  <Badge variant={
                    stripeStatus === 'active' ? 'success'
                    : stripeStatus === 'trialing' ? 'info'
                    : stripeStatus === 'past_due' ? 'danger'
                    : 'default'
                  }>
                    {stripeStatus.toUpperCase()}
                  </Badge>
                )}
              </div>
              <CardDescription>
                ${usage.plan.price}/month
                {nextBillingDate && ` • Renews ${new Date(nextBillingDate).toLocaleDateString()}`}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {user.stripeCustomerId ? (
                <ManageSubscriptionButton customerId={user.stripeCustomerId} />
              ) : (
                <Button variant="primary">
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Usage This Month */}
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>
            Track your monthly usage across all limits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sites Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">Sites Connected</span>
              <span className="text-gray-400">
                {usage.sites.used} / {usage.sites.limit === 999999 ? '∞' : usage.sites.limit}
              </span>
            </div>
            <Progress
              value={Math.min(usage.sites.percentUsed, 100)}
              variant={
                usage.sites.percentUsed >= 90 ? 'danger'
                : usage.sites.percentUsed >= 70 ? 'warning'
                : 'success'
              }
              size="md"
            />
            {usage.warnings.sitesAtLimit && (
              <p className="text-xs text-red-400">
                Site limit reached. Upgrade to connect more sites.
              </p>
            )}
          </div>

          {/* Fixes Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">Monthly Fixes</span>
              <span className="text-gray-400">
                {usage.fixes.used} / {usage.fixes.limit === 999999 ? '∞' : usage.fixes.limit}
              </span>
            </div>
            <Progress
              value={Math.min(usage.fixes.percentUsed, 100)}
              variant={
                usage.fixes.percentUsed >= 90 ? 'danger'
                : usage.fixes.percentUsed >= 70 ? 'warning'
                : 'success'
              }
              size="md"
            />
            {usage.warnings.fixesAtLimit && (
              <p className="text-xs text-red-400">
                Monthly fix limit reached. Upgrade for more fixes.
              </p>
            )}
            {usage.warnings.fixesNearLimit && !usage.warnings.fixesAtLimit && (
              <p className="text-xs text-yellow-400">
                Approaching monthly limit. Consider upgrading.
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Usage resets on the 1st of each month.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Available Plans</h2>
        <PlanComparison currentPlan={user.plan} showCurrentBadge={true} />
      </div>

      {/* Payment Method */}
      {user.stripeCustomerId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </CardTitle>
            <CardDescription>
              Manage your payment methods through Stripe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ManageSubscriptionButton customerId={user.stripeCustomerId} text="Manage Payment Methods" />
          </CardContent>
        </Card>
      )}

      {/* Billing History */}
      {user.stripeCustomerId && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="h-5 w-5 mr-2" />
              Billing History
            </CardTitle>
            <CardDescription>
              View and download your invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">
                Access your complete billing history through the Stripe customer portal
              </p>
              <ManageSubscriptionButton customerId={user.stripeCustomerId} text="View Billing History" />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/**
 * Client component to handle Stripe portal redirection
 */
function ManageSubscriptionButton({
  customerId,
  text = 'Manage Subscription',
}: {
  customerId: string | null
  text?: string
}) {
  if (!customerId) {
    return null
  }

  async function handleManageSubscription() {
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      })

      const data = await response.json()
      if (data.success && data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error opening billing portal:', error)
    }
  }

  return (
    <form action={handleManageSubscription}>
      <Button type="submit" variant="outline">
        <ExternalLink className="h-4 w-4 mr-2" />
        {text}
      </Button>
    </form>
  )
}
