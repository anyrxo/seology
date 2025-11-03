'use client'

/**
 * Toast Notifications
 *
 * Quick feedback for user actions using Sonner
 * Usage: import { toast } from '@/components/notifications/Toast'
 */

import { toast as sonnerToast, Toaster } from 'sonner'

// Export the toast function with custom defaults
export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 5000,
    })
  },

  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 7000,
    })
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 5000,
    })
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 6000,
    })
  },

  loading: (message: string) => {
    return sonnerToast.loading(message)
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return sonnerToast.promise(promise, messages)
  },

  custom: (message: string, options?: {
    description?: string
    duration?: number
    action?: {
      label: string
      onClick: () => void
    }
  }) => {
    sonnerToast(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action,
    })
  },
}

// Toaster component to be added to root layout
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: '',
        style: {
          background: '#1f2937',
          border: '1px solid #374151',
          color: '#f9fafb',
        },
      }}
      closeButton
      richColors
    />
  )
}
