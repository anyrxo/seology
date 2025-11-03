'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseInfiniteScrollOptions {
  limit?: number
  enabled?: boolean
  threshold?: number
}

interface PaginatedResponse<T> {
  data: T[]
  hasMore: boolean
  nextCursor?: string | number
  total?: number
}

export function useInfiniteScroll<T>(
  endpoint: string,
  options: UseInfiniteScrollOptions = {}
) {
  const { limit = 20, enabled = true, threshold = 0.8 } = options

  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<string | number | undefined>()

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const fetchData = useCallback(
    async (reset = false) => {
      if (!enabled || (!reset && !hasMore)) return

      const isInitialLoad = reset || data.length === 0
      isInitialLoad ? setIsLoading(true) : setIsLoadingMore(true)
      setError(null)

      try {
        const url = new URL(endpoint, window.location.origin)
        url.searchParams.set('limit', limit.toString())
        if (cursor && !reset) {
          url.searchParams.set('cursor', cursor.toString())
        }

        const response = await fetch(url.toString())
        if (!response.ok) throw new Error('Failed to fetch data')

        const result: PaginatedResponse<T> = await response.json()

        setData((prev) => (reset ? result.data : [...prev, ...result.data]))
        setHasMore(result.hasMore)
        setCursor(result.nextCursor)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [endpoint, limit, cursor, hasMore, enabled, data.length]
  )

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchData(false)
    }
  }, [fetchData, isLoadingMore, hasMore])

  const reset = useCallback(() => {
    setCursor(undefined)
    setHasMore(true)
    fetchData(true)
  }, [fetchData])

  // Initial load
  useEffect(() => {
    if (enabled && data.length === 0) {
      fetchData(true)
    }
  }, [enabled]) // Only on mount

  // Intersection observer for auto-loading
  useEffect(() => {
    if (!enabled || !hasMore) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [enabled, hasMore, isLoadingMore, loadMore, threshold])

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    reset,
    loadMoreRef,
  }
}

// Simpler version without intersection observer
export function useInfiniteScrollManual<T>(
  endpoint: string,
  options: UseInfiniteScrollOptions = {}
) {
  const { limit = 20, enabled = true } = options

  const [data, setData] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const fetchData = useCallback(
    async (pageNum: number, reset = false) => {
      if (!enabled) return

      const isInitialLoad = reset || pageNum === 1
      isInitialLoad ? setIsLoading(true) : setIsLoadingMore(true)
      setError(null)

      try {
        const url = new URL(endpoint, window.location.origin)
        url.searchParams.set('page', pageNum.toString())
        url.searchParams.set('limit', limit.toString())

        const response = await fetch(url.toString())
        if (!response.ok) throw new Error('Failed to fetch data')

        const result: PaginatedResponse<T> = await response.json()

        setData((prev) => (reset ? result.data : [...prev, ...result.data]))
        setHasMore(result.hasMore)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [endpoint, limit, enabled]
  )

  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchData(nextPage, false)
    }
  }, [page, isLoadingMore, hasMore, fetchData])

  const reset = useCallback(() => {
    setPage(1)
    setHasMore(true)
    fetchData(1, true)
  }, [fetchData])

  // Initial load
  useEffect(() => {
    if (enabled && data.length === 0) {
      fetchData(1, true)
    }
  }, [enabled]) // Only on mount

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    reset,
    page,
  }
}
