'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        const percentage = progress / duration
        const easeOutQuad = 1 - Math.pow(1 - percentage, 3)
        setCount(Math.floor(value * easeOutQuad))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

interface TrendIndicatorProps {
  value: number
  direction: 'up' | 'down' | 'neutral'
  label?: string
}

export function TrendIndicator({ value, direction, label }: TrendIndicatorProps) {
  const colorClass = direction === 'up'
    ? 'text-green-400'
    : direction === 'down'
    ? 'text-red-400'
    : 'text-gray-400'

  const icon = direction === 'up'
    ? '↑'
    : direction === 'down'
    ? '↓'
    : '→'

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className={`inline-flex items-center gap-1 text-sm font-medium ${colorClass}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{value > 0 ? '+' : ''}{value}</span>
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </motion.div>
  )
}
