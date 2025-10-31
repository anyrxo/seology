'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UsageBar } from './UsageBar'
import { AlertCircle, Loader2 } from 'lucide-react'

interface UsageStats {
  fixesApplied: number
  aiCallsMade: number
  sitesConnected: number
  limits: {
    sites: number
    fixesPerMonth: number
    aiAnalysesPerMonth: number
  }
  percentages: {
    fixes: number
    aiAnalyses: number
    sites: number
  }
}

export function UsageDashboardCard() {
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsage()
  }, [])

  const fetchUsage = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/usage')
      const data = await response.json()

      if (data.success) {
        setUsage(data.data)
      } else {
        setError(data.error || 'Failed to load usage data')
      }
    } catch (err) {
      setError('Failed to load usage data')
      console.error('Error fetching usage:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    )
  }

  if (error || !usage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>{error || 'Failed to load usage data'}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const hasWarning =
    usage.percentages.fixes >= 90 ||
    usage.percentages.aiAnalyses >= 90 ||
    usage.percentages.sites >= 90

  return (
    <Card className={hasWarning ? 'border-yellow-200 dark:border-yellow-900' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>Track your monthly usage limits</CardDescription>
          </div>
          {hasWarning && (
            <AlertCircle className="h-5 w-5 text-yellow-600" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <UsageBar
          label="Sites Connected"
          current={usage.sitesConnected}
          limit={usage.limits.sites}
          unit="sites"
        />
        <UsageBar
          label="Fixes Applied"
          current={usage.fixesApplied}
          limit={usage.limits.fixesPerMonth}
          unit="fixes"
        />
        <UsageBar
          label="AI Analyses"
          current={usage.aiCallsMade}
          limit={usage.limits.aiAnalysesPerMonth}
          unit="analyses"
        />
      </CardContent>
    </Card>
  )
}
