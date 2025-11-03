/**
 * Loading utilities for SEOLOGY.AI
 * Provides helper functions for managing loading states
 */

import { useState, useCallback } from 'react'

// Async function wrapper with loading state
export async function withLoading<T>(
  asyncFn: () => Promise<T>,
  setLoading: (loading: boolean) => void
): Promise<T> {
  setLoading(true)
  try {
    return await asyncFn()
  } finally {
    setLoading(false)
  }
}

// Delay utility for minimum loading time (prevents flash)
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Ensures loading state is shown for at least minDuration
export async function withMinimumLoadingTime<T>(
  asyncFn: () => Promise<T>,
  minDuration: number = 500
): Promise<T> {
  const [result] = await Promise.all([asyncFn(), delay(minDuration)])
  return result
}

// Loading state hook with error handling
export function useAsyncAction<T = void, Args extends unknown[] = []>() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = useCallback(
    async (asyncFn: (...args: Args) => Promise<T>, ...args: Args) => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await asyncFn(...args)
        setData(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        setError(error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setData(null)
  }, [])

  return {
    execute,
    isLoading,
    error,
    data,
    reset,
  }
}

// Multi-step loading state manager
export interface LoadingStep {
  id: string
  label: string
  progress: number
}

export class MultiStepLoader {
  private steps: LoadingStep[]
  private currentStepIndex: number = 0
  private listeners: Array<(steps: LoadingStep[], current: number) => void> = []

  constructor(steps: Omit<LoadingStep, 'progress'>[]) {
    this.steps = steps.map((step) => ({ ...step, progress: 0 }))
  }

  start() {
    this.currentStepIndex = 0
    this.updateStep(0, 0)
  }

  updateStep(index: number, progress: number) {
    if (index >= 0 && index < this.steps.length) {
      this.steps[index].progress = Math.min(Math.max(progress, 0), 100)
      this.notify()
    }
  }

  nextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.steps[this.currentStepIndex].progress = 100
      this.currentStepIndex++
      this.updateStep(this.currentStepIndex, 0)
    }
  }

  complete() {
    this.steps[this.currentStepIndex].progress = 100
    this.notify()
  }

  getCurrentStep(): LoadingStep | null {
    return this.steps[this.currentStepIndex] || null
  }

  getAllSteps(): LoadingStep[] {
    return this.steps
  }

  getTotalProgress(): number {
    const total = this.steps.reduce((sum, step) => sum + step.progress, 0)
    return total / this.steps.length
  }

  subscribe(listener: (steps: LoadingStep[], current: number) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) =>
      listener(this.steps, this.currentStepIndex)
    )
  }
}

// Debounced loading state (prevents rapid toggling)
export function useDebouncedLoading(delay: number = 300) {
  const [isLoading, setIsLoading] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const timeoutRef = useState<NodeJS.Timeout | null>(null)[0]

  const setLoading = useCallback(
    (loading: boolean) => {
      setIsLoading(loading)

      if (timeoutRef) {
        clearTimeout(timeoutRef)
      }

      if (loading) {
        // Show loading after delay
        const timeout = setTimeout(() => {
          setShowLoading(true)
        }, delay)
        return () => clearTimeout(timeout)
      } else {
        // Hide loading immediately
        setShowLoading(false)
      }
    },
    [delay, timeoutRef]
  )

  return [showLoading, setLoading] as const
}

// Batched loading state (for multiple async operations)
export class BatchLoader {
  private pendingOperations = new Set<string>()
  private listeners: Array<(isLoading: boolean, count: number) => void> = []

  add(id: string) {
    this.pendingOperations.add(id)
    this.notify()
  }

  remove(id: string) {
    this.pendingOperations.delete(id)
    this.notify()
  }

  isLoading(): boolean {
    return this.pendingOperations.size > 0
  }

  getCount(): number {
    return this.pendingOperations.size
  }

  clear() {
    this.pendingOperations.clear()
    this.notify()
  }

  subscribe(listener: (isLoading: boolean, count: number) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    const isLoading = this.isLoading()
    const count = this.getCount()
    this.listeners.forEach((listener) => listener(isLoading, count))
  }
}

// Progress estimator for operations without progress feedback
export class ProgressEstimator {
  private startTime: number = 0
  private estimatedDuration: number
  private intervalId: NodeJS.Timeout | null = null
  private onUpdate: (progress: number) => void

  constructor(estimatedDuration: number, onUpdate: (progress: number) => void) {
    this.estimatedDuration = estimatedDuration
    this.onUpdate = onUpdate
  }

  start() {
    this.startTime = Date.now()
    this.intervalId = setInterval(() => {
      const elapsed = Date.now() - this.startTime
      const progress = Math.min((elapsed / this.estimatedDuration) * 100, 95)
      this.onUpdate(progress)
    }, 100)
  }

  complete() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.onUpdate(100)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
