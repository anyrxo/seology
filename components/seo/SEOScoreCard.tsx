'use client'

/**
 * SEO Score Card Component
 * Visual representation of SEO health scores with animations
 */

import { useState, useEffect } from 'react'
import { AdvancedTooltip } from '@/components/ui/advanced-tooltip'

interface SEOScoreCardProps {
  score: number
  title: string
  description?: string
  maxScore?: number
  showDetails?: boolean
  breakdown?: {
    label: string
    score: number
    maxScore: number
  }[]
  className?: string
}

export function SEOScoreCard({
  score,
  title,
  description,
  maxScore = 100,
  showDetails = false,
  breakdown,
  className = '',
}: SEOScoreCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const percentage = Math.min((score / maxScore) * 100, 100)

  // Animate score on mount
  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = score / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setAnimatedScore(score)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score])

  // Determine color based on percentage
  const getScoreColor = (pct: number) => {
    if (pct >= 80) return 'text-green-600 dark:text-green-400'
    if (pct >= 60) return 'text-yellow-600 dark:text-yellow-400'
    if (pct >= 40) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreGradient = (pct: number) => {
    if (pct >= 80) return 'from-green-500 to-green-600'
    if (pct >= 60) return 'from-yellow-500 to-yellow-600'
    if (pct >= 40) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getScoreLabel = (pct: number) => {
    if (pct >= 80) return { emoji: '✨', label: 'Excellent', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' }
    if (pct >= 60) return { emoji: '👍', label: 'Good', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' }
    if (pct >= 40) return { emoji: '⚠️', label: 'Needs Work', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' }
    return { emoji: '❌', label: 'Critical', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' }
  }

  const scoreInfo = getScoreLabel(percentage)

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-scale-in ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
        <AdvancedTooltip
          content="SEO score based on meta tags, descriptions, alt text, and content quality"
          position="left"
        >
          <div className="cursor-help">
            <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </AdvancedTooltip>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
              className={`transition-all duration-1000 ease-out ${getScoreColor(percentage)}`}
              strokeLinecap="round"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
              {animatedScore}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              out of {maxScore}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getScoreGradient(percentage)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Score label */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${scoreInfo.color} animate-fade-in-up`}>
          <span>{scoreInfo.emoji}</span>
          {scoreInfo.label}
        </span>
      </div>

      {/* Breakdown */}
      {showDetails && breakdown && breakdown.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-3 animate-fade-in-up stagger-delay-1">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Score Breakdown
          </h4>
          {breakdown.map((item, index) => {
            const itemPercentage = (item.score / item.maxScore) * 100
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className={`font-semibold ${getScoreColor(itemPercentage)}`}>
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getScoreGradient(itemPercentage)} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${itemPercentage}%`, animationDelay: `${index * 100}ms` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Compact SEO Score Badge
 */
interface SEOScoreBadgeProps {
  score: number
  maxScore?: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function SEOScoreBadge({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  className = '',
}: SEOScoreBadgeProps) {
  const percentage = Math.min((score / maxScore) * 100, 100)

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-xl',
  }

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return 'text-green-600 dark:text-green-400'
    if (pct >= 60) return 'text-yellow-600 dark:text-yellow-400'
    if (pct >= 40) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreLabel = (pct: number) => {
    if (pct >= 80) return '✨ Excellent'
    if (pct >= 60) return '👍 Good'
    if (pct >= 40) return '⚠️ Needs Work'
    return '❌ Critical'
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <AdvancedTooltip content={`SEO Score: ${score}/${maxScore} - ${getScoreLabel(percentage)}`}>
        <div className={`relative ${sizeClasses[size]}`}>
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8%"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8%"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={`${283 * (1 - percentage / 100)}`}
              className={`transition-all duration-1000 ease-out ${getScoreColor(percentage)}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-bold ${getScoreColor(percentage)}`}>
              {score}
            </span>
          </div>
        </div>
      </AdvancedTooltip>
      {showLabel && (
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          SEO Score
        </span>
      )}
    </div>
  )
}
