'use client'

import useSWR from 'swr'

interface DashboardStats {
  sitesCount: number
  activeIssuesCount: number
  fixesThisMonth: number
  fixLimit: number
  usagePercent: number
  recentActivity: Array<{
    id: string
    platform: string
    displayName: string
    domain: string
    issuesCount: number
    fixesCount: number
  }>
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useDashboardStats() {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data: DashboardStats
  }>('/api/dashboard/stats', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
  })

  return {
    stats: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
