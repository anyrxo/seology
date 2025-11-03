'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { counterReveal, defaultViewport } from '@/lib/animations'

const stats = [
  { value: '50K+', label: 'SEO Fixes Applied', number: 50000 },
  { value: '500+', label: 'Active Customers', number: 500 },
  { value: '99.9%', label: 'Uptime SLA', number: 99.9 },
  { value: '24/7', label: 'AI Monitoring', display: '24/7' },
]

function AnimatedCounter({ end, suffix = '', prefix = '', decimals = 0 }: { end: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(start)
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-white/5 to-black border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={counterReveal}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -8,
              }}
              className="text-center group cursor-default"
            >
              <motion.div
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-3 md:mb-4 group-hover:text-white/90 transition-colors duration-300"
                whileHover={{
                  textShadow: '0 0 20px rgba(255,255,255,0.5)',
                }}
              >
                {stat.display || (
                  <AnimatedCounter
                    end={stat.number!}
                    suffix={stat.value.includes('+') ? '+' : ''}
                    decimals={stat.value.includes('.') ? 1 : 0}
                  />
                )}
              </motion.div>
              <div className="text-white/50 text-xs md:text-sm uppercase tracking-wider font-semibold group-hover:text-white/70 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
