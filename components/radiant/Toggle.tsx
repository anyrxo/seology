'use client'

import React, { useState } from 'react'

export interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  variant?: 'default' | 'modern'
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  variant = 'default',
  label,
  disabled = false,
  size = 'md',
  className = '',
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const handleToggle = () => {
    if (disabled) return

    const newValue = !checked
    if (!isControlled) {
      setInternalChecked(newValue)
    }
    onChange?.(newValue)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          track: 'w-10 h-5',
          thumb: 'w-4 h-4',
          translate: 'translate-x-5',
        }
      case 'lg':
        return {
          track: 'w-16 h-8',
          thumb: 'w-7 h-7',
          translate: 'translate-x-8',
        }
      default:
        return {
          track: 'w-12 h-6',
          thumb: 'w-5 h-5',
          translate: 'translate-x-6',
        }
    }
  }

  const sizeClasses = getSizeClasses()

  const getVariantStyles = () => {
    if (variant === 'modern') {
      return {
        trackBg: checked
          ? 'bg-gradient-to-r from-[#3898ec] to-[#2563eb]'
          : 'bg-gray-300',
        thumbBg: 'bg-white shadow-lg',
        hoverEffect: checked ? 'hover:from-[#2563eb] hover:to-[#1d4ed8]' : 'hover:bg-gray-400',
      }
    }

    return {
      trackBg: checked ? 'bg-[#3898ec]' : 'bg-gray-300',
      thumbBg: 'bg-white',
      hoverEffect: checked ? 'hover:bg-[#2563eb]' : 'hover:bg-gray-400',
    }
  }

  const variantStyles = getVariantStyles()

  return (
    <div className={`rt-toggle-wrapper flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle'}
        disabled={disabled}
        onClick={handleToggle}
        className={`
          rt-toggle
          ${sizeClasses.track}
          ${variantStyles.trackBg}
          ${variantStyles.hoverEffect}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          relative inline-flex items-center rounded-full
          transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-[#3898ec] focus:ring-offset-2
        `}
      >
        <span
          className={`
            rt-toggle-thumb
            ${sizeClasses.thumb}
            ${variantStyles.thumbBg}
            transform rounded-full
            transition-transform duration-300 ease-in-out
            ${checked ? sizeClasses.translate : 'translate-x-0.5'}
          `}
        />
      </button>

      {label && (
        <label
          onClick={!disabled ? handleToggle : undefined}
          className={`
            text-[#150438] font-medium select-none
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {label}
        </label>
      )}

      <style jsx>{`
        .rt-toggle:active:not(:disabled) .rt-toggle-thumb {
          transform: scale(0.95);
        }

        .rt-toggle:focus-visible {
          outline: 2px solid #3898ec;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  )
}

// Pricing Toggle - specialized for pricing plans
export interface PricingToggleProps {
  options: [string, string] // e.g., ['Monthly', 'Yearly']
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  discount?: string // e.g., "Save 20%"
  className?: string
}

export function PricingToggle({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  discount,
  className = '',
}: PricingToggleProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || options[0])
  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    onChange?.(newValue)
  }

  return (
    <div className={`rt-pricing-toggle flex items-center justify-center gap-4 ${className}`}>
      <span
        className={`text-base font-medium transition-colors ${
          currentValue === options[0] ? 'text-[#150438]' : 'text-[#6d6d6d]'
        }`}
      >
        {options[0]}
      </span>

      <div className="relative">
        <button
          type="button"
          onClick={() => handleChange(currentValue === options[0] ? options[1] : options[0])}
          className="
            w-16 h-8 bg-gradient-to-r from-[#3898ec] to-[#2563eb]
            rounded-full relative
            transition-all duration-300 ease-in-out
            hover:from-[#2563eb] hover:to-[#1d4ed8]
            focus:outline-none focus:ring-2 focus:ring-[#3898ec] focus:ring-offset-2
            shadow-md hover:shadow-lg
          "
        >
          <span
            className={`
              absolute top-1 w-6 h-6 bg-white rounded-full
              transition-transform duration-300 ease-in-out
              shadow-md
              ${currentValue === options[1] ? 'translate-x-8' : 'translate-x-1'}
            `}
          />
        </button>

        {discount && currentValue === options[1] && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {discount}
            </span>
          </div>
        )}
      </div>

      <span
        className={`text-base font-medium transition-colors ${
          currentValue === options[1] ? 'text-[#150438]' : 'text-[#6d6d6d]'
        }`}
      >
        {options[1]}
      </span>
    </div>
  )
}
