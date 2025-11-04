'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Haptic Feedback Hook for Mobile
 * Provides vibration feedback for touch interactions
 * Gracefully degrades if Vibration API is not supported
 */

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection'

interface HapticPatternDefinition {
  pattern: number | number[]
  fallback?: number
}

const hapticPatterns: Record<HapticPattern, HapticPatternDefinition> = {
  light: {
    pattern: 10,
    fallback: 10
  },
  medium: {
    pattern: 20,
    fallback: 20
  },
  heavy: {
    pattern: 30,
    fallback: 30
  },
  success: {
    pattern: [10, 50, 10],
    fallback: 25
  },
  warning: {
    pattern: [15, 30, 15, 30, 15],
    fallback: 40
  },
  error: {
    pattern: [20, 100, 20, 100, 20],
    fallback: 50
  },
  selection: {
    pattern: 5,
    fallback: 5
  }
}

export function useHaptic() {
  const [isSupported, setIsSupported] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  useEffect(() => {
    // Check if Vibration API is supported
    if ('vibrate' in navigator) {
      setIsSupported(true)
    }

    // Check user preferences from localStorage
    const savedPreference = localStorage.getItem('haptic-enabled')
    if (savedPreference !== null) {
      setIsEnabled(savedPreference === 'true')
    }
  }, [])

  const vibrate = useCallback((pattern: HapticPattern) => {
    if (!isSupported || !isEnabled) return

    try {
      const patternDef = hapticPatterns[pattern]

      // Use Vibration API if available
      if ('vibrate' in navigator) {
        navigator.vibrate(patternDef.pattern)
      }
    } catch (error) {
      console.warn('Haptic feedback failed:', error)
    }
  }, [isSupported, isEnabled])

  const toggleHaptic = useCallback(() => {
    const newState = !isEnabled
    setIsEnabled(newState)
    localStorage.setItem('haptic-enabled', String(newState))

    // Give immediate feedback when enabling
    if (newState && isSupported) {
      navigator.vibrate(hapticPatterns.light.pattern)
    }
  }, [isEnabled, isSupported])

  return {
    isSupported,
    isEnabled,
    vibrate,
    toggleHaptic,
    // Convenience methods for common patterns
    light: () => vibrate('light'),
    medium: () => vibrate('medium'),
    heavy: () => vibrate('heavy'),
    success: () => vibrate('success'),
    warning: () => vibrate('warning'),
    error: () => vibrate('error'),
    selection: () => vibrate('selection'),
  }
}

/**
 * Hook to add haptic feedback to click handlers
 */
export function useClickHaptic(pattern: HapticPattern = 'light') {
  const { vibrate, isEnabled } = useHaptic()

  const withHapticFeedback = useCallback((callback?: () => void) => {
    return () => {
      if (isEnabled) {
        vibrate(pattern)
      }
      if (callback) {
        callback()
      }
    }
  }, [vibrate, pattern, isEnabled])

  return withHapticFeedback
}

/**
 * Hook to attach haptic feedback to touch events
 */
export function useTouchHaptic(pattern: HapticPattern = 'light') {
  const { vibrate, isEnabled } = useHaptic()

  const handleTouchStart = useCallback(() => {
    if (isEnabled) {
      vibrate(pattern)
    }
  }, [vibrate, pattern, isEnabled])

  return {
    onTouchStart: handleTouchStart
  }
}

/**
 * Haptic feedback for form interactions
 */
export function useFormHaptic() {
  const { vibrate } = useHaptic()

  return {
    onFocus: () => vibrate('selection'),
    onInput: () => vibrate('light'),
    onSuccess: () => vibrate('success'),
    onError: () => vibrate('error'),
  }
}

/**
 * Haptic feedback for navigation
 */
export function useNavigationHaptic() {
  const { vibrate } = useHaptic()

  return {
    onPageChange: () => vibrate('medium'),
    onTabChange: () => vibrate('selection'),
    onBackButton: () => vibrate('light'),
  }
}
