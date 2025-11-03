/**
 * SWR Configuration for Data Fetching Optimization
 *
 * Features:
 * - Automatic caching with stale-while-revalidate
 * - Request deduplication
 * - Optimistic updates
 * - Error retry with exponential backoff
 */

import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'

// Default SWR configuration
export const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false, // Don't revalidate on window focus (reduces API calls)
  revalidateOnReconnect: true, // Revalidate when network reconnects
  dedupingInterval: 2000, // Dedupe requests within 2 seconds
  focusThrottleInterval: 5000, // Throttle focus revalidation
  errorRetryCount: 3, // Retry failed requests 3 times
  errorRetryInterval: 5000, // Wait 5s between retries
  shouldRetryOnError: true, // Retry on error
  keepPreviousData: true, // Keep previous data while fetching new data (prevents flickering)
}

// Fetcher function for API calls
export const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // @ts-ignore
    error.info = await res.json()
    // @ts-ignore
    error.status = res.status
    throw error
  }

  return res.json()
}

// POST fetcher for mutations
export const postFetcher = async <T = unknown>(url: string, { arg }: { arg: T }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })

  if (!res.ok) {
    throw new Error('Failed to post data')
  }

  return res.json()
}

// Custom hooks for common data fetching patterns

/**
 * Fetch user profile with caching
 */
export function useUserProfile() {
  return useSWR('/api/user/profile', fetcher, {
    ...defaultConfig,
    refreshInterval: 60000, // Refresh every minute
  })
}

/**
 * Fetch sites with caching
 */
export function useSites() {
  return useSWR('/api/sites', fetcher, {
    ...defaultConfig,
    refreshInterval: 30000, // Refresh every 30 seconds
  })
}

/**
 * Fetch site details with caching
 */
export function useSite(siteId: string | null) {
  return useSWR(siteId ? `/api/sites/${siteId}` : null, fetcher, {
    ...defaultConfig,
    refreshInterval: 30000,
  })
}

/**
 * Fetch issues with caching
 */
export function useIssues(siteId?: string) {
  const url = siteId ? `/api/issues?siteId=${siteId}` : '/api/issues'
  return useSWR(url, fetcher, {
    ...defaultConfig,
    refreshInterval: 30000,
  })
}

/**
 * Fetch fixes with caching
 */
export function useFixes(siteId?: string) {
  const url = siteId ? `/api/fixes?siteId=${siteId}` : '/api/fixes'
  return useSWR(url, fetcher, {
    ...defaultConfig,
    refreshInterval: 30000,
  })
}

/**
 * Fetch analytics with caching
 */
export function useAnalytics(siteId?: string) {
  const url = siteId ? `/api/analytics/${siteId}` : '/api/analytics/overview'
  return useSWR(url, fetcher, {
    ...defaultConfig,
    refreshInterval: 60000, // Analytics can be cached longer
  })
}

/**
 * Fetch notifications with caching
 */
export function useNotifications() {
  return useSWR('/api/notifications', fetcher, {
    ...defaultConfig,
    refreshInterval: 10000, // Check notifications every 10 seconds
  })
}

/**
 * Fetch usage data with caching
 */
export function useUsage() {
  return useSWR('/api/usage', fetcher, {
    ...defaultConfig,
    refreshInterval: 60000,
  })
}

/**
 * Admin: Fetch all users with caching
 */
export function useAdminUsers() {
  return useSWR('/api/admin/users', fetcher, {
    ...defaultConfig,
    refreshInterval: 30000,
  })
}

/**
 * Admin: Fetch analytics with caching
 */
export function useAdminAnalytics() {
  return useSWR('/api/admin/analytics', fetcher, {
    ...defaultConfig,
    refreshInterval: 60000,
  })
}

/**
 * Admin: Fetch jobs with caching
 */
export function useAdminJobs() {
  return useSWR('/api/admin/jobs', fetcher, {
    ...defaultConfig,
    refreshInterval: 10000, // Jobs update frequently
  })
}

/**
 * Mutation hook for optimistic updates
 */
export function useMutateWithOptimistic<T>(key: string) {
  return useSWRMutation(key, postFetcher, {
    optimisticData: (currentData) => currentData, // Keep current data while mutating
    rollbackOnError: true, // Rollback on error
    populateCache: true, // Update cache with response
    revalidate: true, // Revalidate after mutation
  })
}

/**
 * Prefetch data for faster navigation
 */
export function prefetchData(url: string) {
  // Trigger a fetch without subscribing to updates
  return fetcher(url).catch(() => {
    // Silently fail - prefetch is optional
  })
}
