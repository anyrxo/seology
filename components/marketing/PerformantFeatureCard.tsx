'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { usePrefersReducedMotion, useHoverSupport, ANIMATION_DURATION } from '@/lib/animation-performance'

interface PerformantFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

/**
 * Optimized FeatureCard without heavy 3D transforms
 * - Removes preserve-3d and complex rotations
 * - Simple scale and opacity animations only
 * - Respects reduced motion preferences
 * - Disabled hover effects on touch devices
 */
export default function PerformantFeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: PerformantFeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const supportsHover = useHoverSupport()

  // Only enable hover effects on hover-capable devices
  const enableHover = supportsHover && !prefersReducedMotion

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: ANIMATION_DURATION.MEDIUM / 1000,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={
        enableHover
          ? {
              y: -4,
              transition: { duration: ANIMATION_DURATION.FAST / 1000 },
            }
          : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-black border border-white/10 rounded-lg p-8 overflow-hidden group cursor-pointer"
      style={{
        willChange: isHovered && enableHover ? 'transform' : 'auto',
      }}
    >
      {/* Subtle gradient background on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Icon container with simple scale animation */}
      <motion.div
        className="relative w-16 h-16 rounded-lg flex items-center justify-center mb-6 border border-white/10 bg-white/5"
        animate={
          enableHover && isHovered
            ? {
                scale: 1.1,
              }
            : { scale: 1 }
        }
        transition={{
          duration: ANIMATION_DURATION.NORMAL / 1000,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        <p className="text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
          {description}
        </p>
      </div>

      {/* Border glow on hover - CSS only for better performance */}
      <div
        className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
          isHovered && enableHover
            ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)]'
            : ''
        }`}
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />
    </motion.div>
  )
}
