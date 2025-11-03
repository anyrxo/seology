'use client'

import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'

interface PremiumModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnBackdrop?: boolean
  showCloseButton?: boolean
}

export function PremiumModal({
  isOpen,
  onClose,
  children,
  className = '',
  size = 'md',
  closeOnBackdrop = true,
  showCloseButton = true,
}: PremiumModalProps) {
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!mounted || !isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className={cn(
          'fixed inset-0',
          'bg-black/60 backdrop-blur-xl',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        className={cn(
          'relative z-10',
          'w-full',
          sizes[size],
          'bg-gradient-to-br from-gray-900 to-black',
          'backdrop-blur-2xl',
          'border border-white/20',
          'rounded-3xl',
          'shadow-2xl shadow-black/50',
          'p-8',
          'transform transition-all duration-300',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          'max-h-[90vh] overflow-y-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className={cn(
              'absolute top-4 right-4',
              'w-10 h-10',
              'flex items-center justify-center',
              'bg-white/10 hover:bg-white/20',
              'border border-white/20',
              'rounded-full',
              'transition-all duration-200',
              'group'
            )}
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Content */}
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

interface ModalHeaderProps {
  children: React.ReactNode
  className?: string
}

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h2 className="text-3xl font-bold text-white">{children}</h2>
    </div>
  )
}

interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div className={cn('text-white/80 leading-relaxed', className)}>
      {children}
    </div>
  )
}

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={cn('mt-8 flex items-center justify-end gap-4', className)}>
      {children}
    </div>
  )
}
