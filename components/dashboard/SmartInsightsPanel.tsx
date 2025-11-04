'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2, ArrowRight, Zap, Target, Clock } from 'lucide-react'
import { useState } from 'react'

interface Insight {
  id: string
  type: 'opportunity' | 'warning' | 'success' | 'action'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  estimatedTime: string
  action?: {
    label: string
    href: string
  }
}

interface SmartInsightsPanelProps {
  insights?: Insight[]
}

// Default insights removed - will be populated from API in production
const defaultInsights: Insight[] = []

export function SmartInsightsPanel({ insights = defaultInsights }: SmartInsightsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity':
        return <Target className="h-5 w-5" />
      case 'warning':
        return <AlertCircle className="h-5 w-5" />
      case 'success':
        return <CheckCircle2 className="h-5 w-5" />
      case 'action':
        return <Zap className="h-5 w-5" />
    }
  }

  const getInsightColors = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity':
        return {
          bg: 'from-blue-500/10 to-blue-600/5',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          iconBg: 'bg-blue-500/20',
          glow: 'hover:shadow-blue-500/20'
        }
      case 'warning':
        return {
          bg: 'from-yellow-500/10 to-yellow-600/5',
          border: 'border-yellow-500/30',
          text: 'text-yellow-400',
          iconBg: 'bg-yellow-500/20',
          glow: 'hover:shadow-yellow-500/20'
        }
      case 'success':
        return {
          bg: 'from-green-500/10 to-green-600/5',
          border: 'border-green-500/30',
          text: 'text-green-400',
          iconBg: 'bg-green-500/20',
          glow: 'hover:shadow-green-500/20'
        }
      case 'action':
        return {
          bg: 'from-purple-500/10 to-purple-600/5',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          iconBg: 'bg-purple-500/20',
          glow: 'hover:shadow-purple-500/20'
        }
    }
  }

  const getImpactBadge = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high':
        return <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs font-medium rounded-full border border-red-500/30">High Impact</span>
      case 'medium':
        return <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/30">Medium Impact</span>
      case 'low':
        return <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">Low Impact</span>
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center"
          >
            <Sparkles className="h-5 w-5 text-purple-400" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">Smart Insights</h3>
            <p className="text-xs text-gray-400">AI-powered recommendations</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 bg-purple-400 rounded-full"
          />
          <span className="text-xs text-purple-400 font-medium">AI Active</span>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        <AnimatePresence>
          {insights.map((insight, index) => {
            const colors = getInsightColors(insight.type)
            const isExpanded = expandedId === insight.id

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${colors.bg} backdrop-blur-lg border ${colors.border} rounded-xl overflow-hidden transition-all duration-300 ${colors.glow} hover:shadow-xl cursor-pointer`}
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`${colors.iconBg} ${colors.text} p-2.5 rounded-lg flex-shrink-0`}>
                      {getInsightIcon(insight.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className={`text-sm font-semibold ${colors.text}`}>{insight.title}</h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {getImpactBadge(insight.impact)}
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </motion.div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{insight.description}</p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{insight.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} priority</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      {insight.action && (
                        <motion.a
                          href={insight.action.href}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
                          transition={{ duration: 0.2 }}
                          className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} ${colors.text} text-sm font-medium rounded-lg border ${colors.border} hover:bg-white/5 transition-all duration-200`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {insight.action.label}
                          <ArrowRight className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animated border on hover */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${colors.bg}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <a
          href="/dashboard/ai-analysis"
          className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 rounded-xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Get Full AI Analysis</p>
              <p className="text-xs text-gray-400">Unlock deeper insights and recommendations</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </div>
  )
}
