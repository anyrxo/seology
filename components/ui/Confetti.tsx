'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { confettiParticle } from '@/lib/animation-enhancements'

interface ConfettiProps {
  active: boolean
  duration?: number
  particleCount?: number
}

const colors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#FFA07A', // Orange
  '#98D8C8', // Mint
  '#F7DC6F', // Yellow
  '#BB8FCE', // Purple
  '#85C1E2', // Sky Blue
]

export function Confetti({
  active,
  duration = 3000,
  particleCount = 50,
}: ConfettiProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (active) {
      setIsActive(true)
      const timer = setTimeout(() => setIsActive(false), duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <AnimatePresence>
        {Array.from({ length: particleCount }).map((_, i) => {
          const color = colors[i % colors.length]
          const size = Math.random() * 10 + 5
          const startX = Math.random() * window.innerWidth
          const shape = Math.random() > 0.5 ? 'square' : 'circle'

          return (
            <motion.div
              key={i}
              {...confettiParticle(i, particleCount)}
              style={{
                position: 'absolute',
                left: startX,
                top: -20,
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: shape === 'circle' ? '50%' : '0',
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

/**
 * Success Celebration Component
 * Combines confetti with a success message
 */

interface SuccessCelebrationProps {
  show: boolean
  title?: string
  message?: string
  icon?: React.ReactNode
  onComplete?: () => void
}

export function SuccessCelebration({
  show,
  title = 'Success!',
  message,
  icon,
  onComplete,
}: SuccessCelebrationProps) {
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <>
      <Confetti active={show} />
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], rotate: [-180, 10, 0], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="bg-gray-900 border-2 border-green-500 rounded-2xl p-8 shadow-2xl max-w-md mx-4 pointer-events-auto"
            >
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {icon && (
                  <motion.div
                    className="flex justify-center mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: 3,
                      delay: 0.4,
                    }}
                  >
                    {icon}
                  </motion.div>
                )}
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                {message && <p className="text-gray-400">{message}</p>}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
