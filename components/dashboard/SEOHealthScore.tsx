'use client'

import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, CheckCircle2, Activity } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SEOHealthScoreProps {
  score: number // 0-100
  trend: 'up' | 'down' | 'stable'
  issues: {
    critical: number
    warning: number
    info: number
  }
  sitesCount: number
}

export function SEOHealthScore({ score, trend, issues, sitesCount }: SEOHealthScoreProps) {
  const [displayScore, setDisplayScore] = useState(0)

  // Animate score on mount
  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const duration = 2000

      if (progress < duration) {
        const percentage = progress / duration
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
        setDisplayScore(Math.floor(score * easeOutQuart))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayScore(score)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [score])

  // Determine health status
  const getHealthStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'green', icon: CheckCircle2 }
    if (score >= 75) return { label: 'Good', color: 'blue', icon: TrendingUp }
    if (score >= 50) return { label: 'Fair', color: 'yellow', icon: Activity }
    return { label: 'Needs Attention', color: 'red', icon: AlertTriangle }
  }

  const status = getHealthStatus(score)
  const StatusIcon = status.icon

  // Calculate circle properties
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          text: 'text-green-400',
          bg: 'from-green-500/20 to-green-600/10',
          border: 'border-green-500/30',
          shadow: 'shadow-green-500/50',
          glow: 'from-green-500/10 to-green-600/5',
          stroke: '#10b981'
        }
      case 'blue':
        return {
          text: 'text-blue-400',
          bg: 'from-blue-500/20 to-blue-600/10',
          border: 'border-blue-500/30',
          shadow: 'shadow-blue-500/50',
          glow: 'from-blue-500/10 to-blue-600/5',
          stroke: '#3b82f6'
        }
      case 'yellow':
        return {
          text: 'text-yellow-400',
          bg: 'from-yellow-500/20 to-yellow-600/10',
          border: 'border-yellow-500/30',
          shadow: 'shadow-yellow-500/50',
          glow: 'from-yellow-500/10 to-yellow-600/5',
          stroke: '#f59e0b'
        }
      case 'red':
        return {
          text: 'text-red-400',
          bg: 'from-red-500/20 to-red-600/10',
          border: 'border-red-500/30',
          shadow: 'shadow-red-500/50',
          glow: 'from-red-500/10 to-red-600/5',
          stroke: '#ef4444'
        }
      default:
        return {
          text: 'text-gray-400',
          bg: 'from-white/10 to-white/5',
          border: 'border-white/10',
          shadow: 'shadow-white/50',
          glow: 'from-white/5 to-white/2',
          stroke: '#9ca3af'
        }
    }
  }

  const colors = getColorClasses(status.color)

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg relative overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.glow} opacity-0`}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">SEO Health Score</h3>
            <p className="text-sm text-gray-400">Overall system performance</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>

        {/* Main Score Circle */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Background circle */}
            <svg width="200" height="200" className="transform -rotate-90">
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                stroke={colors.stroke}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{ filter: `drop-shadow(0 0 8px ${colors.stroke})` }}
              />
            </svg>

            {/* Score text in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="text-5xl font-bold text-white"
              >
                {displayScore}
              </motion.div>
              <div className="text-sm text-gray-400">out of 100</div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${colors.bg} border ${colors.border}`}>
            <StatusIcon className={`h-4 w-4 ${colors.text}`} />
            <span className={`text-sm font-semibold ${colors.text}`}>{status.label}</span>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Sites Active */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">{sitesCount}</div>
            <div className="text-xs text-gray-400">Sites Active</div>
          </motion.div>

          {/* Issues Found */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {issues.critical + issues.warning + issues.info}
            </div>
            <div className="text-xs text-gray-400">Issues Found</div>
          </motion.div>

          {/* Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center"
          >
            <div className={`text-2xl font-bold mb-1 ${
              trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
            </div>
            <div className="text-xs text-gray-400">Trend</div>
          </motion.div>
        </div>

        {/* Quick Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs">💡</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Quick Insight</p>
              <p className="text-xs text-gray-300">
                {score >= 90
                  ? "Your SEO health is excellent! Keep monitoring for any new issues."
                  : score >= 75
                  ? `You have ${issues.critical + issues.warning} issues that need attention to maintain optimal performance.`
                  : score >= 50
                  ? `Focus on fixing ${issues.critical} critical issues to improve your health score.`
                  : `${issues.critical} critical issues detected. Take immediate action to prevent SEO degradation.`}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
