/**
 * Usage Widget Component
 * Shows current usage statistics with progress bars
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertTriangle, TrendingUp, Sparkles } from 'lucide-react'

interface UsageData {
  plan: {
    name: string
    price: number
  }
  sites: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  fixes: {
    used: number
    limit: number
    remaining: number
    percentUsed: number
  }
  warnings: {
    sitesAtLimit: boolean
    fixesAtLimit: boolean
    fixesNearLimit: boolean
  }
}

interface UpgradePrompt {
  shouldPrompt: boolean
  reason?: string
  recommendedPlan?: string
}

export function UsageWidget() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [upgradePrompt, setUpgradePrompt] = useState<UpgradePrompt | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsage()
  }, [])

  async function fetchUsage() {
    try {
      setLoading(true)
      const response = await fetch('/api/billing/usage')
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Failed to fetch usage')
      }

      setUsage(data.data.usage)
      setUpgradePrompt(data.data.upgradePrompt)
      setError(null)
    } catch (err) {
      console.error('Error fetching usage:', err)
      setError(err instanceof Error ? err.message : 'Failed to load usage data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Loading usage data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!usage) return null

  // Helper to determine progress bar variant
  const getProgressVariant = (percent: number): "danger" | "warning" | "success" => {
    if (percent >= 90) return 'danger'
    if (percent >= 70) return 'warning'
    return 'success'
  }

  const sitesPercent = usage.sites.percentUsed
  const fixesPercent = usage.fixes.percentUsed

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage</CardTitle>
            <CardDescription>
              {usage.plan.name} Plan - ${usage.plan.price}/month
            </CardDescription>
          </div>
          <Link href="/dashboard/billing">
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upgrade prompt */}
        {upgradePrompt?.shouldPrompt && (
          <Alert className="border-blue-200 bg-blue-50">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <div className="flex items-center justify-between">
                <span>{upgradePrompt.reason}</span>
                <Link href="/dashboard/billing">
                  <Button size="sm" className="ml-4">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Upgrade
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Sites usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Sites</span>
            <span className="text-muted-foreground">
              {usage.sites.used} / {usage.sites.limit === 999999 ? '∞' : usage.sites.limit}
            </span>
          </div>
          <Progress
            value={Math.min(sitesPercent, 100)}
            variant={getProgressVariant(sitesPercent)}
            size="md"
          />
          {usage.warnings.sitesAtLimit && (
            <p className="text-xs text-red-600">
              Site limit reached. Upgrade to add more sites.
            </p>
          )}
        </div>

        {/* Fixes usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Monthly Fixes</span>
            <span className="text-muted-foreground">
              {usage.fixes.used} / {usage.fixes.limit === 999999 ? '∞' : usage.fixes.limit}
            </span>
          </div>
          <Progress
            value={Math.min(fixesPercent, 100)}
            variant={getProgressVariant(fixesPercent)}
            size="md"
          />
          {usage.warnings.fixesAtLimit && (
            <p className="text-xs text-red-600">
              Monthly fix limit reached. Upgrade for more fixes.
            </p>
          )}
          {usage.warnings.fixesNearLimit && !usage.warnings.fixesAtLimit && (
            <p className="text-xs text-yellow-600">
              Approaching monthly fix limit. Consider upgrading.
            </p>
          )}
          {!usage.warnings.fixesNearLimit && (
            <p className="text-xs text-muted-foreground">
              {usage.fixes.remaining === 999999
                ? 'Unlimited fixes remaining'
                : `${usage.fixes.remaining} fixes remaining this month`}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
