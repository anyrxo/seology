'use client'

import useSWR from 'swr'
import { useState } from 'react'

interface AnalyticsData {
  issuesFixed: number
  timeSaved: string
  seoScoreImprovement: string
  pagesOptimized: number
  weeklyData: Array<{
    week: string
    issues: number
    fixes: number
  }>
  issueBreakdown: Array<{
    type: string
    count: number
    percentage: number
  }>
  recentActions: Array<{
    action: string
    site: string
    time: string
    impact: 'high' | 'medium' | 'low'
  }>
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useAnalytics(timeRange: '7d' | '30d' | '90d' | 'all' = '30d') {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data: AnalyticsData
  }>(`/api/analytics?range=${timeRange}`, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
  })

  return {
    analytics: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

export function useTimeRange() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  return {
    timeRange,
    setTimeRange,
  }
}
