import { useState, useEffect } from 'react'

/**
 * useMediaQuery Hook
 * Responsive hook for detecting media query matches
 *
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 767px)')
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 991px)')
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQuery.matches)

    // Create event listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    // Use deprecated addListener for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // @ts-ignore - fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // @ts-ignore - fallback for older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

/**
 * Predefined breakpoint hooks for common use cases
 */
export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 991px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 992px)')
}

export function useIsTouchDevice() {
  return useMediaQuery('(hover: none) and (pointer: coarse)')
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function usePrefersDarkMode() {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersHighContrast() {
  return useMediaQuery('(prefers-contrast: high)')
}
