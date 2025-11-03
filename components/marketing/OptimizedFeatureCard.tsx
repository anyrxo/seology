'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { useInView } from '@/hooks'
import { springConfig } from '@/lib/animation-utils'

interface OptimizedFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

/**
 * Performance-optimized feature card component
 *
 * Optimizations:
 * - Uses useInView hook with Intersection Observer
 * - GPU-accelerated animations (transform + opacity only)
 * - Animates once for better performance
 * - Hover effects use transform (GPU accelerated)
 * - No border-color transitions (use shadow instead)
 */
export default function OptimizedFeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: OptimizedFeatureCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gray-900 rounded-lg p-6 overflow-hidden"
    >
      {/* Gradient border effect using pseudo-element (better than animating border-color) */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Background glow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ willChange: 'opacity' }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with GPU-accelerated scale animation */}
        <motion.div
          className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4"
          whileHover={{ scale: 1.1 }}
          transition={springConfig}
        >
          <Icon className="w-6 h-6 text-blue-500" />
        </motion.div>

        {/* Title with subtle hover effect */}
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-opacity">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 group-hover:text-gray-300 transition-opacity">
          {description}
        </p>
      </div>

      {/* Decorative corner element */}
      <motion.div
        className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      />
    </motion.div>
  )
}
