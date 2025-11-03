'use client'

import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface SlideInMenuProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  side?: 'left' | 'right'
}

export function SlideInMenu({
  isOpen,
  onClose,
  children,
  title,
  side = 'right',
}: SlideInMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const slideVariants = {
    closed: {
      x: side === 'right' ? '100%' : '-100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="
              fixed inset-0
              bg-black/60 backdrop-blur-sm
              z-40
              md:hidden
            "
          />

          {/* Menu Panel */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={slideVariants}
            className={`
              fixed top-0 bottom-0 w-80 max-w-[85vw]
              ${side === 'right' ? 'right-0' : 'left-0'}
              bg-gray-900
              border-${side === 'right' ? 'l' : 'r'} border-gray-800
              z-50
              overflow-y-auto
              safe-top safe-bottom
              md:hidden
            `}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-4 flex items-center justify-between z-10">
              {title && (
                <h2 className="text-lg font-semibold text-white">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="
                  ml-auto
                  p-2
                  text-gray-400 hover:text-white
                  hover:bg-gray-800
                  rounded-lg
                  transition-colors
                  min-h-touch min-w-touch
                "
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
