'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface UsePollingOptions {
  interval?: number
  enabled?: boolean
  stopOnError?: boolean
  maxAttempts?: number
  onSuccess?: (data: unknown) => void
  onError?: (error: Error) => void
}

export function usePolling<T>(
  fetchFn: () => Promise<T>,
  options: UsePollingOptions = {}
) {
  const {
    interval = 5000,
    enabled = true,
    stopOnError = false,
    maxAttempts,
    onSuccess,
    onError,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [attempts, setAttempts] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(true)

  const poll = useCallback(async () => {
    if (!mountedRef.current) return

    try {
      setIsLoading(true)
      const result = await fetchFn()

      if (!mountedRef.current) return

      setData(result)
      setError(null)
      setAttempts((prev) => prev + 1)
      onSuccess?.(result)
    } catch (err) {
      if (!mountedRef.current) return

      const error = err instanceof Error ? err : new Error('Polling failed')
      setError(error)
      setAttempts((prev) => prev + 1)
      onError?.(error)

      if (stopOnError) {
        stop()
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [fetchFn, stopOnError, onSuccess, onError])

  const start = useCallback(() => {
    if (!enabled) return

    // Initial poll
    poll()

    // Set up interval
    intervalRef.current = setInterval(() => {
      if (maxAttempts && attempts >= maxAttempts) {
        stop()
        return
      }
      poll()
    }, interval)
  }, [enabled, poll, interval, maxAttempts, attempts])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    setData(null)
    setError(null)
    setAttempts(0)
    setIsLoading(true)
    start()
  }, [stop, start])

  useEffect(() => {
    mountedRef.current = true

    if (enabled) {
      start()
    }

    return () => {
      mountedRef.current = false
      stop()
    }
  }, [enabled, start, stop])

  return {
    data,
    isLoading,
    error,
    attempts,
    start,
    stop,
    reset,
  }
}

// Specialized hook for polling with condition to stop
export function useConditionalPolling<T>(
  fetchFn: () => Promise<T>,
  stopCondition: (data: T) => boolean,
  options: Omit<UsePollingOptions, 'stopOnError'> = {}
) {
  const [shouldStop, setShouldStop] = useState(false)

  const { data, isLoading, error, attempts, start, stop, reset } = usePolling<T>(
    fetchFn,
    {
      ...options,
      enabled: options.enabled && !shouldStop,
      onSuccess: (result) => {
        if (stopCondition(result as T)) {
          setShouldStop(true)
          stop()
        }
        options.onSuccess?.(result)
      },
    }
  )

  const restart = useCallback(() => {
    setShouldStop(false)
    reset()
  }, [reset])

  return {
    data,
    isLoading,
    error,
    attempts,
    shouldStop,
    start,
    stop,
    reset: restart,
  }
}
