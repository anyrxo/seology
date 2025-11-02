'use client'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  const variantStyles = {
    danger: {
      icon: '⚠️',
      iconBg: 'bg-red-900/20',
      iconBorder: 'border-red-700',
      confirmBtn: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: '⚡',
      iconBg: 'bg-yellow-900/20',
      iconBorder: 'border-yellow-700',
      confirmBtn: 'bg-yellow-600 hover:bg-yellow-700',
    },
    info: {
      icon: 'ℹ️',
      iconBg: 'bg-blue-900/20',
      iconBorder: 'border-blue-700',
      confirmBtn: 'bg-blue-600 hover:bg-blue-700',
    },
  }

  const styles = variantStyles[variant]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Icon */}
            <div
              className={`${styles.iconBg} border ${styles.iconBorder} rounded-lg p-4 w-16 h-16 flex items-center justify-center text-3xl mb-4`}
            >
              {styles.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

            {/* Message */}
            <p className="text-gray-400 mb-6">{message}</p>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm()
                  if (!loading) onClose()
                }}
                disabled={loading}
                className={`${styles.confirmBtn} px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
              >
                {loading && (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
