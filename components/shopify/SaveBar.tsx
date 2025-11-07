/**
 * SaveBar Component
 *
 * Displays Shopify's native save bar when form has unsaved changes
 * Uses App Bridge API to show/hide the save bar
 *
 * @example
 * const [hasChanges, setHasChanges] = useState(false)
 * const [saving, setSaving] = useState(false)
 *
 * <SaveBar
 *   show={hasChanges}
 *   onSave={async () => {
 *     setSaving(true)
 *     await saveChanges()
 *     setSaving(false)
 *     setHasChanges(false)
 *   }}
 *   onDiscard={() => {
 *     resetForm()
 *     setHasChanges(false)
 *   }}
 *   loading={saving}
 * />
 */

'use client'

import { useEffect } from 'react'
import { isAppBridgeAvailable } from '@/lib/shopify-app-bridge'

interface SaveBarProps {
  show: boolean
  onSave: () => void | Promise<void>
  onDiscard: () => void
  loading?: boolean
}

export function SaveBar({ show, onSave, onDiscard, loading = false }: SaveBarProps) {
  useEffect(() => {
    if (!isAppBridgeAvailable()) {
      // App Bridge not available - could show a fallback UI here if needed
      return
    }

    if (show) {
      try {
        window.shopify!.saveBar.show({
          saveAction: {
            label: 'Save',
            loading,
            disabled: loading,
            onAction: onSave,
          },
          discardAction: {
            label: 'Discard',
            onAction: onDiscard,
          },
        })
      } catch (error) {
        console.error('Failed to show save bar:', error)
      }
    } else {
      try {
        window.shopify!.saveBar.hide()
      } catch (error) {
        console.error('Failed to hide save bar:', error)
      }
    }

    // Cleanup: hide save bar when component unmounts
    return () => {
      if (isAppBridgeAvailable()) {
        try {
          window.shopify!.saveBar.hide()
        } catch (error) {
          console.error('Failed to hide save bar on cleanup:', error)
        }
      }
    }
  }, [show, loading, onSave, onDiscard])

  // This component doesn't render anything - App Bridge handles the UI
  return null
}

/**
 * useSaveBar Hook
 *
 * Convenience hook for managing save bar state
 *
 * @example
 * const { hasChanges, setHasChanges, saving, save, discard } = useSaveBar({
 *   onSave: async () => {
 *     await saveData()
 *   },
 *   onDiscard: () => {
 *     resetForm()
 *   }
 * })
 *
 * <SaveBar show={hasChanges} onSave={save} onDiscard={discard} loading={saving} />
 */
import { useState, useCallback } from 'react'

interface UseSaveBarOptions {
  onSave: () => void | Promise<void>
  onDiscard: () => void
}

export function useSaveBar({ onSave, onDiscard }: UseSaveBarOptions) {
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const save = useCallback(async () => {
    setSaving(true)
    try {
      await onSave()
      setHasChanges(false)
    } catch (error) {
      console.error('Save failed:', error)
    } finally {
      setSaving(false)
    }
  }, [onSave])

  const discard = useCallback(() => {
    onDiscard()
    setHasChanges(false)
  }, [onDiscard])

  return {
    hasChanges,
    setHasChanges,
    saving,
    save,
    discard,
  }
}
