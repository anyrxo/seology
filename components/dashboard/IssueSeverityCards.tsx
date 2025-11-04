'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SeverityCount {
  critical: number
  warning: number
  info: number
}

interface IssueSeverityCardsProps {
  counts: SeverityCount
  onCardClick?: (severity: 'critical' | 'warning' | 'info') => void
}

export function IssueSeverityCards({ counts, onCardClick }: IssueSeverityCardsProps) {
  const cards = [
    {
      severity: 'critical' as const,
      label: 'Critical Issues',
      count: counts.critical,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: {
        bg: 'from-red-500/20 to-red-600/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30',
        glow: 'hover:shadow-red-500/20'
      },
      description: 'Requires immediate attention',
      pulse: true
    },
    {
      severity: 'warning' as const,
      label: 'Warnings',
      count: counts.warning,
      icon: <AlertCircle className="h-6 w-6" />,
      color: {
        bg: 'from-yellow-500/20 to-yellow-600/10',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        glow: 'hover:shadow-yellow-500/20'
      },
      description: 'Should be addressed soon',
      pulse: false
    },
    {
      severity: 'info' as const,
      label: 'Suggestions',
      count: counts.info,
      icon: <Info className="h-6 w-6" />,
      color: {
        bg: 'from-blue-500/20 to-blue-600/10',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        glow: 'hover:shadow-blue-500/20'
      },
      description: 'Optimization opportunities',
      pulse: false
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.severity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onCardClick?.(card.severity)}
          className={`relative bg-gradient-to-br ${card.color.bg} backdrop-blur-xl border ${card.color.border} rounded-2xl p-6 shadow-lg hover:shadow-2xl ${card.color.glow} transition-all duration-300 cursor-pointer group hover:-translate-y-1`}
        >
          {/* Pulse Animation for Critical */}
          {card.pulse && card.count > 0 && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-red-500/50"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 2
              }}
            />
          )}

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl ${card.color.badge} border`}>
              {card.icon}
            </div>
            <motion.div
              animate={card.pulse && card.count > 0 ? {
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1]
              } : {}}
              transition={{
                repeat: card.pulse ? Infinity : 0,
                duration: 1.5
              }}
              className={`px-3 py-1 rounded-full font-bold ${card.color.badge} border text-lg`}
            >
              {card.count}
            </motion.div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h3 className={`text-xl font-bold ${card.color.text} mb-2`}>
              {card.label}
            </h3>
            <p className="text-sm text-gray-400">{card.description}</p>
          </div>

          {/* Action */}
          <Link
            href={`/dashboard/issues?severity=${card.severity}`}
            className={`inline-flex items-center gap-2 text-sm font-medium ${card.color.text} group-hover:gap-3 transition-all duration-300`}
          >
            View Details
            <ChevronRight className="h-4 w-4" />
          </Link>

          {/* Status Indicator */}
          {card.count > 0 && (
            <div className="absolute top-4 right-4">
              <motion.div
                animate={{
                  scale: card.pulse ? [1, 1.2, 1] : 1,
                  opacity: card.pulse ? [1, 0.6, 1] : 1
                }}
                transition={{
                  repeat: card.pulse ? Infinity : 0,
                  duration: 1.5
                }}
                className={`w-3 h-3 rounded-full ${
                  card.severity === 'critical'
                    ? 'bg-red-400'
                    : card.severity === 'warning'
                    ? 'bg-yellow-400'
                    : 'bg-blue-400'
                }`}
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

interface IssueSummaryProps {
  counts: SeverityCount
}

export function IssueSummary({ counts }: IssueSummaryProps) {
  const total = counts.critical + counts.warning + counts.info

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Issue Overview</h3>
          <p className="text-sm text-gray-400">Across all connected sites</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{total}</div>
          <div className="text-xs text-gray-400">Total Issues</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {/* Critical */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-400">Critical</span>
            <span className="text-sm font-bold text-red-400">{counts.critical}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (counts.critical / total) * 100 : 0}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
            />
          </div>
        </div>

        {/* Warning */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-yellow-400">Warnings</span>
            <span className="text-sm font-bold text-yellow-400">{counts.warning}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (counts.warning / total) * 100 : 0}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-400">Suggestions</span>
            <span className="text-sm font-bold text-blue-400">{counts.info}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${total > 0 ? (counts.info / total) * 100 : 0}%` }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
