'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface MobileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * Mobile-optimized input component with proper keyboard types and touch targets
 */
export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
  ({ label, error, helperText, className, type = 'text', ...props }, ref) => {
    // Determine the appropriate inputMode based on type
    const getInputMode = (inputType: string): 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search' | undefined => {
      switch (inputType) {
        case 'email':
          return 'email'
        case 'tel':
          return 'tel'
        case 'url':
          return 'url'
        case 'number':
          return 'numeric'
        case 'search':
          return 'search'
        default:
          return 'text'
      }
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-white mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          inputMode={props.inputMode || getInputMode(type)}
          className={cn(
            // Base styles
            'w-full px-4 py-3',
            'text-base text-white', // Prevent zoom on iOS
            'bg-gray-900 border border-gray-700',
            'rounded-xl',
            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            // Touch-friendly
            'min-h-touch',
            // Disabled state
            'disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed',
            // Error state
            error && 'border-red-500 focus:ring-red-500',
            // Placeholder
            'placeholder:text-gray-500',
            // Smooth transitions
            'transition-colors duration-200',
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

MobileInput.displayName = 'MobileInput'
