'use client'

/**
 * Advanced Tooltip Component
 * Provides rich tooltips with animations, positioning, and accessibility
 */

import { useState, useRef, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
  maxWidth?: number
  disabled?: boolean
}

export function AdvancedTooltip({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
  maxWidth = 250,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    const gap = 8

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - gap
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollY + gap
        left = triggerRect.left + scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left + scrollX - tooltipRect.width - gap
        break
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + scrollX + gap
        break
    }

    // Prevent tooltip from going off-screen
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight + scrollY

    if (left < 0) left = gap
    if (left + tooltipRect.width > windowWidth) {
      left = windowWidth - tooltipRect.width - gap
    }
    if (top < scrollY) top = scrollY + gap
    if (top + tooltipRect.height > windowHeight) {
      top = windowHeight - tooltipRect.height - gap
    }

    setCoords({ top, left })
  }

  const handleMouseEnter = () => {
    if (disabled) return

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      // Calculate position after showing (when we have dimensions)
      requestAnimationFrame(() => {
        calculatePosition()
      })
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  useEffect(() => {
    if (isVisible) {
      calculatePosition()
      window.addEventListener('scroll', calculatePosition)
      window.addEventListener('resize', calculatePosition)
      return () => {
        window.removeEventListener('scroll', calculatePosition)
        window.removeEventListener('resize', calculatePosition)
      }
    }
  }, [isVisible, position])

  const tooltipContent = mounted && isVisible && !disabled && (
    <div
      ref={tooltipRef}
      className={`fixed z-[9999] pointer-events-none transition-smooth ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        maxWidth: `${maxWidth}px`,
      }}
      role="tooltip"
      aria-hidden={!isVisible}
    >
      <div className={`
        bg-gray-900 dark:bg-gray-800
        text-white dark:text-gray-100
        text-sm px-3 py-2 rounded-lg
        shadow-lg border border-gray-700 dark:border-gray-600
        backdrop-blur-sm
        animate-fade-in-up
        ${className}
      `}>
        {content}
        {/* Tooltip arrow */}
        <div
          className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 transform rotate-45 ${
            position === 'top'
              ? 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0'
              : position === 'bottom'
              ? 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0'
              : position === 'left'
              ? 'right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-b-0'
              : 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-t-0'
          }`}
        />
      </div>
    </div>
  )

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  )
}

/**
 * Rich Tooltip with icon and description
 */
interface RichTooltipProps extends TooltipProps {
  title?: string
  description?: string
  icon?: ReactNode
}

export function RichTooltip({
  title,
  description,
  icon,
  ...props
}: RichTooltipProps) {
  const content = (
    <div className="flex gap-3">
      {icon && (
        <div className="flex-shrink-0 w-5 h-5 text-blue-400">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-semibold text-white mb-1">{title}</div>
        )}
        {description && (
          <div className="text-xs text-gray-300 leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </div>
  )

  return <AdvancedTooltip {...props} content={content} maxWidth={300} />
}

/**
 * Keyboard shortcut tooltip
 */
interface ShortcutTooltipProps extends Omit<TooltipProps, 'content'> {
  label: string
  shortcut: string | string[]
}

export function ShortcutTooltip({
  label,
  shortcut,
  ...props
}: ShortcutTooltipProps) {
  const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut]

  const content = (
    <div className="flex items-center gap-2">
      <span className="text-gray-200">{label}</span>
      <div className="flex gap-1">
        {shortcuts.map((key, index) => (
          <kbd
            key={index}
            className="px-1.5 py-0.5 text-xs font-mono bg-gray-800 dark:bg-gray-700 border border-gray-600 dark:border-gray-500 rounded shadow-sm"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  )

  return <AdvancedTooltip {...props} content={content} />
}
