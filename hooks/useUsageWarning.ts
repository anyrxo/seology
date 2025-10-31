'use client'

import { useEffect, useState } from 'react'

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

interface UsageWarning {
  type: 'fixes' | 'aiAnalyses' | 'sites'
  message: string
  percentage: number
  current: number
  limit: number
}

/**
 * Hook to check usage and display warnings when approaching limits (90% threshold)
 */
export function useUsageWarning() {
  const [warnings, setWarnings] = useState<UsageWarning[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUsage()
  }, [])

  const checkUsage = async () => {
    try {
      const response = await fetch('/api/usage')
      const data = await response.json()

      if (data.success) {
        const usage: UsageStats = data.data
        const newWarnings: UsageWarning[] = []

        // Check fixes
        if (usage.percentages.fixes >= 90) {
          newWarnings.push({
            type: 'fixes',
            message: `You've used ${Math.round(usage.percentages.fixes)}% of your monthly fixes (${usage.fixesApplied}/${usage.limits.fixesPerMonth})`,
            percentage: usage.percentages.fixes,
            current: usage.fixesApplied,
            limit: usage.limits.fixesPerMonth,
          })
        }

        // Check AI analyses
        if (usage.percentages.aiAnalyses >= 90) {
          newWarnings.push({
            type: 'aiAnalyses',
            message: `You've used ${Math.round(usage.percentages.aiAnalyses)}% of your monthly AI analyses (${usage.aiCallsMade}/${usage.limits.aiAnalysesPerMonth})`,
            percentage: usage.percentages.aiAnalyses,
            current: usage.aiCallsMade,
            limit: usage.limits.aiAnalysesPerMonth,
          })
        }

        // Check sites
        if (usage.percentages.sites >= 90) {
          newWarnings.push({
            type: 'sites',
            message: `You've connected ${usage.sitesConnected}/${usage.limits.sites} sites`,
            percentage: usage.percentages.sites,
            current: usage.sitesConnected,
            limit: usage.limits.sites,
          })
        }

        setWarnings(newWarnings)
      }
    } catch (error) {
      console.error('Error checking usage:', error)
    } finally {
      setLoading(false)
    }
  }

  return {
    warnings,
    hasWarnings: warnings.length > 0,
    loading,
    refresh: checkUsage,
  }
}
