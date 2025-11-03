'use client'

import useSWR from 'swr'

interface Site {
  id: string
  platform: string
  domain: string
  displayName: string | null
  status: string
  activeIssues: number
  totalFixes: number
  lastSync: Date | null
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useSites() {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data: Site[]
  }>('/api/sites', fetcher, {
    refreshInterval: 60000, // Refresh every 60 seconds
    revalidateOnFocus: true,
  })

  return {
    sites: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

interface SiteDetail extends Site {
  issues: Array<{
    id: string
    severity: string
    status: string
    pageUrl: string
    details: string
    detectedAt: Date
  }>
  fixes: Array<{
    id: string
    type: string
    targetUrl: string
    status: string
    appliedAt: Date | null
  }>
  metrics: Array<{
    id: string
    date: Date
    trafficChange: number
    rankingChange: number
  }>
}

export function useSite(id: string | null) {
  const { data, error, isLoading, mutate } = useSWR<{
    success: boolean
    data: SiteDetail
  }>(id ? `/api/sites/${id}` : null, fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: true,
  })

  return {
    site: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}
