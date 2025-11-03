'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { counterAnimation, staggerReveal } from '@/lib/animation-enhancements'
import { viewportConfig } from '@/lib/animation-enhancements'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
  decimals?: number
}

const stats: Stat[] = [
  { value: 10000, label: 'SEO Issues Fixed', suffix: '+' },
  { value: 500, label: 'Active Sites', suffix: '+' },
  { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
  { value: 24, label: 'Avg. Fix Time', suffix: 'min' },
]

function AnimatedStat({ value, label, suffix = '', prefix = '', decimals = 0, index }: Stat & { index: number }) {
  const counter = useCountUp({
    end: value,
    duration: 2500,
    decimals,
    prefix,
    suffix,
    startOnView: true,
    delay: index * 100,
  })

  return (
    <motion.div
      ref={counter.ref}
      custom={index}
      variants={staggerReveal(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig.default}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1] as const,
          },
        }}
        viewport={viewportConfig.default}
        className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums"
      >
        {counter.value}
      </motion.div>
      <div className="text-base md:text-lg text-white/60 font-medium">
        {label}
      </div>
    </motion.div>
  )
}

export default function EnhancedStatsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig.default}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Join thousands of businesses automating their SEO with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* Decorative gradient lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportConfig.default}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>
    </section>
  )
}
