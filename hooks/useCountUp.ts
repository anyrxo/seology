/**
 * useCountUp Hook
 * Animated number counter with smooth count-up effect
 */

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseCountUpOptions {
  start?: number
  end: number
  duration?: number // in milliseconds
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  startOnView?: boolean
  delay?: number
}

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  startOnView = true,
  delay = 0,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start)
  const [isComplete, setIsComplete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    // Only start when in view (if enabled) and hasn't started yet
    const shouldStart = startOnView ? isInView : true
    if (!shouldStart || hasStarted.current) return

    hasStarted.current = true
    const startTime = Date.now() + delay
    const range = end - start
    const increment = range / (duration / 16) // 60fps

    const timer = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime

      if (elapsed < 0) return // Wait for delay

      if (elapsed >= duration) {
        setCount(end)
        setIsComplete(true)
        clearInterval(timer)
      } else {
        const progress = elapsed / duration
        // Easing function for smooth animation
        const easeOutExpo = 1 - Math.pow(2, -10 * progress)
        const currentValue = start + range * easeOutExpo
        setCount(currentValue)
      }
    }, 16) // 60fps

    return () => clearInterval(timer)
  }, [start, end, duration, delay, isInView, startOnView])

  // Format the number with separators
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    const decimalPart = parts[1] ? `.${parts[1]}` : ''
    return `${prefix}${integerPart}${decimalPart}${suffix}`
  }

  return {
    ref,
    value: formatNumber(count),
    rawValue: count,
    isComplete,
  }
}

/**
 * Simpler version for basic counting
 */
export function useSimpleCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(end * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView])

  return { ref, value: count }
}
