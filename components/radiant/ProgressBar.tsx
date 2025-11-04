'use client'

import React, { useState, useEffect, useRef } from 'react'

export interface ProgressBarProps {
  value: number // 0-100
  max?: number
  label?: string
  showPercentage?: boolean
  variant?: 'default' | 'gradient' | 'striped'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  animated?: boolean
  autoAnimate?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
  color = 'blue',
  animated = true,
  autoAnimate = true,
  className = '',
}: ProgressBarProps) {
  const [currentValue, setCurrentValue] = useState(autoAnimate ? 0 : value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  const percentage = Math.min(Math.max((currentValue / max) * 100, 0), 100)

  useEffect(() => {
    if (!autoAnimate || hasAnimated) {
      setCurrentValue(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateProgress()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (progressRef.current) {
      observer.observe(progressRef.current)
    }

    return () => observer.disconnect()
  }, [autoAnimate, hasAnimated, value])

  const animateProgress = () => {
    const duration = 1500
    const start = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = startValue + (value - startValue) * easeOut

      setCurrentValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2'
      case 'lg':
        return 'h-6'
      default:
        return 'h-4'
    }
  }

  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return variant === 'gradient'
          ? 'bg-gradient-to-r from-green-400 to-green-600'
          : 'bg-green-500'
      case 'red':
        return variant === 'gradient'
          ? 'bg-gradient-to-r from-red-400 to-red-600'
          : 'bg-red-500'
      case 'yellow':
        return variant === 'gradient'
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
          : 'bg-yellow-500'
      case 'purple':
        return variant === 'gradient'
          ? 'bg-gradient-to-r from-purple-400 to-purple-600'
          : 'bg-purple-500'
      default:
        return variant === 'gradient'
          ? 'bg-gradient-to-r from-[#3898ec] to-[#2563eb]'
          : 'bg-[#3898ec]'
    }
  }

  const sizeClasses = getSizeClasses()
  const colorClasses = getColorClasses()

  return (
    <div ref={progressRef} className={`rt-progress ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-[#150438] font-medium text-sm">{label}</span>}
          {showPercentage && (
            <span className="text-[#6d6d6d] font-semibold text-sm">{Math.round(percentage)}%</span>
          )}
        </div>
      )}

      <div className={`rt-progress-track bg-gray-200 rounded-full overflow-hidden ${sizeClasses}`}>
        <div
          className={`
            rt-progress-bar
            ${colorClasses}
            ${sizeClasses}
            rounded-full
            ${animated ? 'transition-all duration-500 ease-out' : ''}
            ${variant === 'striped' ? 'progress-striped' : ''}
            relative
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={currentValue}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {variant === 'striped' && (
            <div className="absolute inset-0 progress-stripes opacity-30" />
          )}
        </div>
      </div>

      <style jsx>{`
        .progress-striped {
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        }

        @keyframes progress-stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 1rem 0;
          }
        }

        .progress-striped {
          animation: progress-stripes 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

// Skill Bar - Specialized progress bar for skills
export interface Skill {
  id: string
  name: string
  level: number // 0-100
  color?: ProgressBarProps['color']
}

export interface SkillsProps {
  skills: Skill[]
  variant?: ProgressBarProps['variant']
  size?: ProgressBarProps['size']
  className?: string
}

export function Skills({ skills, variant = 'gradient', size = 'md', className = '' }: SkillsProps) {
  return (
    <section className={`rt-component-section ${className}`}>
      <div className="w-layout-blockcontainer rt-component-container w-container">
        <div className="text-center mb-12">
          <h2 className="rt-component-heading-two text-4xl font-semibold mb-4">Our Expertise</h2>
          <p className="text-[#6d6d6d] text-lg">
            Years of experience reflected in our skill levels
          </p>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {skills.map((skill) => (
            <ProgressBar
              key={skill.id}
              value={skill.level}
              label={skill.name}
              variant={variant}
              size={size}
              color={skill.color}
              showPercentage
              autoAnimate
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Circular Progress - Alternative circular progress indicator
export interface CircularProgressProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  label?: string
  showPercentage?: boolean
  className?: string
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#3898ec',
  backgroundColor = '#e5e7eb',
  label,
  showPercentage = true,
  className = '',
}: CircularProgressProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (currentValue / 100) * circumference

  useEffect(() => {
    const duration = 1500
    const start = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = value * easeOut

      setCurrentValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value])

  return (
    <div className={`rt-circular-progress inline-flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#150438] font-bold" style={{ fontSize: size / 4 }}>
              {Math.round(currentValue)}%
            </span>
          </div>
        )}
      </div>

      {label && <div className="text-[#6d6d6d] font-medium mt-3 text-center">{label}</div>}
    </div>
  )
}
