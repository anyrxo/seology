'use client'

/**
 * Animation Examples Component
 *
 * Demonstrates all performance-optimized animation patterns
 * Use this as reference when creating new animated components
 */

import { motion } from 'framer-motion'
import {
  useScrollAnimation,
  useInView,
  useMagneticHover,
  useParallax,
  useStaggeredAnimation,
} from '@/hooks'
import {
  fadeIn,
  scaleOnHover,
  staggerChildren,
  slideInLeft,
  springConfig,
  defaultViewport,
} from '@/lib/animation-utils'
import { Zap, Sparkles, Target } from 'lucide-react'

export function ScrollAnimationExample() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-8 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        Scroll Animation Example
      </h2>
      <p className="text-gray-400">
        This component animates in when it enters the viewport using Intersection Observer.
      </p>
    </motion.div>
  )
}

export function InViewExample() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.5 })

  return (
    <div
      ref={ref}
      className={`bg-gray-900 p-8 rounded-lg transition-all duration-500 ${
        inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-4">
        InView Hook Example
      </h2>
      <p className="text-gray-400">
        Status: {inView ? '✅ Visible' : '❌ Not Visible'}
      </p>
    </div>
  )
}

export function MagneticHoverExample() {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagneticHover<HTMLButtonElement>({
    strength: 0.4,
    stiffness: 150,
    damping: 15,
  })

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2"
    >
      <Sparkles className="w-5 h-5" />
      Magnetic Button
    </motion.button>
  )
}

export function ParallaxExample() {
  const { ref, y } = useParallax({
    speed: 0.5,
    smooth: true,
  })

  return (
    <div className="relative h-[400px] overflow-hidden rounded-lg">
      <motion.div
        ref={ref}
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
      />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-3xl font-bold text-white">Parallax Background</h2>
      </div>
    </div>
  )
}

export function StaggeredListExample() {
  const items = [
    { id: 1, icon: Zap, title: 'Fast Performance' },
    { id: 2, icon: Target, title: 'Precise Animations' },
    { id: 3, icon: Sparkles, title: 'Smooth Experience' },
  ]

  const animations = useStaggeredAnimation(items.length, {
    baseDelay: 100,
    threshold: 0.2,
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Staggered List</h2>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          ref={animations[i].ref as React.Ref<HTMLDivElement>}
          initial={{ opacity: 0, x: -20 }}
          animate={
            animations[i].isVisible
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -20 }
          }
          transition={{
            duration: 0.5,
            delay: animations[i].delay / 1000,
          }}
          className="bg-gray-900 p-6 rounded-lg flex items-center gap-4"
        >
          <item.icon className="w-6 h-6 text-blue-500" />
          <span className="text-white font-semibold">{item.title}</span>
        </motion.div>
      ))}
    </div>
  )
}

export function VariantsExample() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Animation Variants</h2>

      {/* Fade In */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="bg-gray-900 p-6 rounded-lg"
      >
        <p className="text-white">Fade In Variant</p>
      </motion.div>

      {/* Slide In Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={defaultViewport}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 p-6 rounded-lg"
      >
        <p className="text-white">Scale In Variant</p>
      </motion.div>

      {/* Card Hover */}
      <motion.div
        {...scaleOnHover}
        className="bg-gray-900 p-6 rounded-lg cursor-pointer"
      >
        <p className="text-white">Card with Hover Effect</p>
      </motion.div>
    </div>
  )
}

export function StaggerChildrenExample() {
  const features = [
    'GPU-Accelerated Animations',
    'Intersection Observer',
    'Spring Physics',
    '60fps Performance',
  ]

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      className="bg-gray-900 p-8 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Stagger Children</h2>
      <ul className="space-y-4">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            variants={fadeIn}
            className="flex items-center gap-3 text-gray-300"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            {feature}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

/**
 * Complete Examples Page
 *
 * Use this to test all animation patterns
 */
export default function AnimationExamplesPage() {
  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-20">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Animation Performance Examples
          </h1>
          <p className="text-gray-400 text-lg">
            All animations on this page achieve 60fps using GPU-accelerated properties.
          </p>
        </div>

        <ScrollAnimationExample />
        <InViewExample />

        <div className="flex justify-center">
          <MagneticHoverExample />
        </div>

        <ParallaxExample />
        <StaggeredListExample />
        <VariantsExample />
        <StaggerChildrenExample />
      </div>
    </div>
  )
}
