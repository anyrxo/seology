'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useToastStore } from '@/hooks/useToast'
import { toastSlideIn } from '@/lib/animations'

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-3 pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastSlideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto max-w-md w-full"
          >
            <div
              className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${getToastStyles(
                toast.variant || 'default'
              )}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  {toast.title && (
                    <div className="font-semibold text-sm mb-1">{toast.title}</div>
                  )}
                  {toast.description && (
                    <div className="text-sm opacity-90">{toast.description}</div>
                  )}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="rounded-md p-1 hover:bg-white/10 transition-colors"
                  aria-label="Close notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function getToastStyles(variant: string): string {
  const styles = {
    default: 'bg-gray-900/95 border-gray-700 text-white',
    success: 'bg-green-900/95 border-green-700 text-white',
    error: 'bg-red-900/95 border-red-700 text-white',
    warning: 'bg-yellow-900/95 border-yellow-700 text-white',
    info: 'bg-blue-900/95 border-blue-700 text-white',
  }
  return styles[variant as keyof typeof styles] || styles.default
}
