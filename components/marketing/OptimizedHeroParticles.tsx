'use client'

import { motion } from 'framer-motion'
import { useVisibilityPause, usePrefersReducedMotion } from '@/lib/animation-performance'
import { useRef, useMemo } from 'react'

interface ParticleConfig {
  x: string
  y: string
  duration: number
  delay: number
}

/**
 * Optimized floating particles for hero section
 * Reduces particle count and pauses when off-screen
 */
export default function OptimizedHeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useVisibilityPause(containerRef)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Reduced from 20 to 10 particles for better performance
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  }, [])

  // Don't render particles if reduced motion is preferred
  if (prefersReducedMotion) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            willChange: isVisible ? 'transform, opacity' : 'auto',
          }}
          animate={
            isVisible
              ? {
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }
              : {}
          }
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
