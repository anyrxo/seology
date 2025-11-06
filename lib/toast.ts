/**
 * Toast Notification Utility
 * Wrapper around sonner for consistent toast messages
 */

import { toast as sonnerToast } from 'sonner'

export const toast = {
  success: (message: string) => sonnerToast.success(message),
  error: (message: string) => sonnerToast.error(message),
  info: (message: string) => sonnerToast.info(message),
  loading: (message: string) => sonnerToast.loading(message),
  warning: (message: string) => sonnerToast.warning(message),
}

/**
 * Async confirmation dialog
 * Replacement for window.confirm() with promise-based API
 */
export async function confirmDialog(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const confirmed = window.confirm(message)
    resolve(confirmed)
  })
}
