import { useEffect, useCallback } from 'react'

type KeyCombo = {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
}

/**
 * Hook for keyboard shortcuts
 */
export function useKeyboardShortcut(
  keyCombo: KeyCombo,
  callback: () => void,
  options: { enabled?: boolean } = {}
) {
  const { enabled = true } = options

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const matchesKey = event.key.toLowerCase() === keyCombo.key.toLowerCase()
      const matchesCtrl = keyCombo.ctrl ? event.ctrlKey : !event.ctrlKey
      const matchesShift = keyCombo.shift ? event.shiftKey : !event.shiftKey
      const matchesAlt = keyCombo.alt ? event.altKey : !event.altKey
      const matchesMeta = keyCombo.meta ? event.metaKey : !event.metaKey

      if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
        event.preventDefault()
        callback()
      }
    },
    [keyCombo, callback, enabled]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress, enabled])
}
