'use client'

import { useState, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface UseOptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  revalidate?: boolean
}

export function useOptimisticUpdate<T, P = unknown>(
  initialData: T,
  options: UseOptimisticUpdateOptions<T> = {}
) {
  const [data, setData] = useState(initialData)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const update = useCallback(
    async (
      optimisticValue: T,
      asyncFn: (params?: P) => Promise<T>,
      params?: P
    ) => {
      // Store original value for rollback
      const originalValue = data

      // Optimistic update
      setData(optimisticValue)
      setError(null)

      try {
        // Execute async operation
        const result = await asyncFn(params)

        // Update with real data
        startTransition(() => {
          setData(result)
          options.onSuccess?.(result)

          // Revalidate if needed
          if (options.revalidate !== false) {
            router.refresh()
          }
        })

        return result
      } catch (err) {
        // Rollback on error
        setData(originalValue)
        const error = err instanceof Error ? err : new Error('Update failed')
        setError(error)
        options.onError?.(error)
        throw error
      }
    },
    [data, router, options]
  )

  return {
    data,
    isPending,
    error,
    update,
    setData,
  }
}

// Helper for array operations
export function useOptimisticArray<T extends { id: string | number }>(
  initialData: T[],
  options: UseOptimisticUpdateOptions<T[]> = {}
) {
  const { data, isPending, error, update, setData } = useOptimisticUpdate(
    initialData,
    options
  )

  const add = useCallback(
    async (item: T, asyncFn: (item: T) => Promise<T>) => {
      const optimisticItem = { ...item, id: item.id || `temp-${Date.now()}` }
      const optimisticData = [...data, optimisticItem]

      return update(optimisticData, async () => {
        const result = await asyncFn(item)
        return data.map((i) => (i.id === optimisticItem.id ? result : i))
      })
    },
    [data, update]
  )

  const remove = useCallback(
    async (id: string | number, asyncFn: (id: string | number) => Promise<void>) => {
      const optimisticData = data.filter((item) => item.id !== id)

      return update(optimisticData, async () => {
        await asyncFn(id)
        return optimisticData
      })
    },
    [data, update]
  )

  const updateItem = useCallback(
    async (
      id: string | number,
      updates: Partial<T>,
      asyncFn: (id: string | number, updates: Partial<T>) => Promise<T>
    ) => {
      const optimisticData = data.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )

      return update(optimisticData, async () => {
        const result = await asyncFn(id, updates)
        return data.map((item) => (item.id === id ? result : item))
      })
    },
    [data, update]
  )

  return {
    data,
    isPending,
    error,
    setData,
    add,
    remove,
    update: updateItem,
  }
}
