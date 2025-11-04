'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface CounterProps {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  separator?: string
  autoStart?: boolean
  onComplete?: () => void
  variant?: 'default' | 'minimal' | 'card' | 'outlined' | 'gradient' | 'modern'
  label?: string
  icon?: React.ReactNode
  className?: string
}

export function Counter({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = ',',
  autoStart = true,
  onComplete,
  variant = 'default',
  label,
  icon,
  className = '',
}: CounterProps) {
  const [count, setCount] = useState(start)
  const [hasStarted, setHasStarted] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!autoStart) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observerRef.current.observe(counterRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [autoStart, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTimestamp = Date.now()
    const range = end - start

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTimestamp
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentCount = start + range * easeOut

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
        onComplete?.()
      }
    }

    requestAnimationFrame(updateCount)
  }, [hasStarted, start, end, duration, onComplete])

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return parts.join('.')
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'text-center'
      case 'card':
        return 'bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow text-center'
      case 'outlined':
        return 'border-2 border-[#3898ec] p-8 rounded-xl text-center hover:bg-blue-50 transition-colors'
      case 'gradient':
        return 'bg-gradient-to-br from-[#3898ec] to-[#2563eb] p-8 rounded-xl text-white text-center shadow-xl'
      case 'modern':
        return 'bg-gradient-to-r from-white to-blue-50 p-8 rounded-xl border-l-4 border-[#3898ec] shadow-md text-center'
      default:
        return 'text-center p-6'
    }
  }

  const variantClasses = getVariantClasses()
  const isGradient = variant === 'gradient'

  return (
    <div ref={counterRef} className={`rt-counter ${variantClasses} ${className}`}>
      {icon && (
        <div className={`mb-4 flex justify-center ${isGradient ? 'text-white' : 'text-[#3898ec]'}`}>
          {icon}
        </div>
      )}

      <div
        className={`rt-counter-value text-5xl font-bold mb-2 ${
          isGradient ? 'text-white' : 'text-[#150438]'
        }`}
      >
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>

      {label && (
        <div
          className={`rt-counter-label text-lg font-medium ${
            isGradient ? 'text-white/90' : 'text-[#6d6d6d]'
          }`}
        >
          {label}
        </div>
      )}

      <style jsx>{`
        .rt-counter-value {
          transition: transform 0.3s ease;
        }

        .rt-counter:hover .rt-counter-value {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

// Stats Section - Multiple counters in a grid
export interface Stat {
  id: string
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
  decimals?: number
}

export interface StatsProps {
  stats: Stat[]
  variant?: CounterProps['variant']
  columns?: 2 | 3 | 4
  className?: string
}

export function Stats({ stats, variant = 'card', columns = 4, className = '' }: StatsProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className={`grid ${gridCols[columns]} gap-6`}>
          {stats.map((stat) => (
            <Counter
              key={stat.id}
              end={stat.value}
              label={stat.label}
              prefix={stat.prefix}
              suffix={stat.suffix}
              icon={stat.icon}
              decimals={stat.decimals}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Achievement Counter - Milestone-style counter
export interface AchievementProps {
  value: number
  label: string
  description?: string
  icon?: React.ReactNode
  suffix?: string
  className?: string
}

export function Achievement({
  value,
  label,
  description,
  icon,
  suffix = '+',
  className = '',
}: AchievementProps) {
  return (
    <div
      className={`rt-achievement bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="w-16 h-16 bg-gradient-to-br from-[#3898ec] to-[#2563eb] rounded-full flex items-center justify-center text-white shadow-lg">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <Counter
            end={value}
            suffix={suffix}
            variant="minimal"
            className="text-left"
            label=""
          />
        </div>
      </div>

      <h3 className="text-[#150438] font-semibold text-xl mb-2">{label}</h3>

      {description && <p className="text-[#6d6d6d] text-sm leading-relaxed">{description}</p>}
    </div>
  )
}
