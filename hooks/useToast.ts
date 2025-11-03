import { create } from 'zustand'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearAll: () => void
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...toast, id }

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }))

    // Auto-remove after duration
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id)
        }))
      }, duration)
    }
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id)
    })),
  clearAll: () => set({ toasts: [] })
}))

/**
 * Hook for showing toast notifications
 */
export function useToast() {
  const { addToast, removeToast, clearAll } = useToastStore()

  const toast = (options: Omit<Toast, 'id'>) => {
    addToast(options)
  }

  const success = (title: string, description?: string) => {
    addToast({ title, description, variant: 'success' })
  }

  const error = (title: string, description?: string) => {
    addToast({ title, description, variant: 'error' })
  }

  const warning = (title: string, description?: string) => {
    addToast({ title, description, variant: 'warning' })
  }

  const info = (title: string, description?: string) => {
    addToast({ title, description, variant: 'info' })
  }

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: removeToast,
    dismissAll: clearAll
  }
}
