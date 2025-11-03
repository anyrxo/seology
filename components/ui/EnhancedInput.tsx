'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { floatingLabel, inputFocusGlow, errorShake } from '@/lib/animation-enhancements'
import { AlertCircle, Check } from 'lucide-react'

export interface EnhancedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
  floatingLabel?: boolean
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  (
    {
      className,
      type,
      label,
      error,
      success,
      icon,
      floatingLabel: useFloatingLabel = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const [showError, setShowError] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current!)

    React.useEffect(() => {
      if (error) {
        setShowError(true)
        const timer = setTimeout(() => setShowError(false), 500)
        return () => clearTimeout(timer)
      }
    }, [error])

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
      props.onBlur?.(e)
    }

    const isLabelFloating = isFocused || hasValue

    return (
      <div className="relative w-full">
        <motion.div
          variants={showError ? errorShake : undefined}
          initial="initial"
          animate={showError ? 'shake' : 'initial'}
          className="relative"
        >
          {/* Standard Label (non-floating) */}
          {label && !useFloatingLabel && (
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {label}
            </label>
          )}

          {/* Input Container */}
          <motion.div
            className="relative"
            variants={inputFocusGlow}
            animate={isFocused ? 'active' : 'inactive'}
          >
            {/* Icon */}
            {icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                {icon}
              </div>
            )}

            {/* Input Field */}
            <input
              type={type}
              className={cn(
                'flex h-12 w-full rounded-lg border bg-gray-900 px-4 py-3 text-sm text-white transition-all',
                'placeholder:text-gray-500',
                'focus:outline-none focus:ring-0',
                'disabled:cursor-not-allowed disabled:opacity-50',
                icon && 'pl-10',
                success && 'pr-10 border-green-500/50 focus:border-green-500',
                error && 'pr-10 border-red-500/50 focus:border-red-500',
                !error && !success && 'border-gray-700 focus:border-blue-500',
                className
              )}
              ref={inputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />

            {/* Floating Label */}
            {label && useFloatingLabel && (
              <motion.label
                variants={floatingLabel}
                animate={isLabelFloating ? 'active' : 'inactive'}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium pointer-events-none origin-left"
                style={{
                  paddingLeft: icon ? '2rem' : '0',
                }}
              >
                {label}
              </motion.label>
            )}

            {/* Success Icon */}
            {success && !error && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              >
                <Check className="h-5 w-5" />
              </motion.div>
            )}

            {/* Error Icon */}
            {error && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              >
                <AlertCircle className="h-5 w-5" />
              </motion.div>
            )}

            {/* Focus Glow Effect */}
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    boxShadow: error
                      ? '0 0 0 3px rgba(239, 68, 68, 0.2)'
                      : success
                      ? '0 0 0 3px rgba(34, 197, 94, 0.2)'
                      : '0 0 0 3px rgba(59, 130, 246, 0.2)',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              <p className="text-sm text-red-400 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2"
            >
              <p className="text-sm text-green-400 flex items-center gap-1">
                <Check className="h-4 w-4" />
                Looks good!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
EnhancedInput.displayName = 'EnhancedInput'

export { EnhancedInput }
