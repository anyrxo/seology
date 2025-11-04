'use client'

import { motion } from 'framer-motion'
import { Globe, Search, Zap, CheckCircle2, AlertCircle, Clock } from 'lucide-react'

interface WorkflowStage {
  id: string
  label: string
  icon: React.ReactNode
  status: 'complete' | 'active' | 'pending' | 'error'
  count?: number
  description?: string
}

interface SEOWorkflowMapProps {
  stages?: WorkflowStage[]
}

const defaultStages: WorkflowStage[] = [
  {
    id: 'sites',
    label: 'Sites',
    icon: <Globe className="h-5 w-5" />,
    status: 'complete',
    count: 3,
    description: '3 connected'
  },
  {
    id: 'crawl',
    label: 'Crawling',
    icon: <Search className="h-5 w-5" />,
    status: 'active',
    count: 1,
    description: 'In progress'
  },
  {
    id: 'analysis',
    label: 'Analysis',
    icon: <AlertCircle className="h-5 w-5" />,
    status: 'complete',
    count: 12,
    description: '12 issues found'
  },
  {
    id: 'fixes',
    label: 'Fixes',
    icon: <Zap className="h-5 w-5" />,
    status: 'active',
    count: 5,
    description: '5 pending approval'
  },
]

export function SEOWorkflowMap({ stages = defaultStages }: SEOWorkflowMapProps) {
  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">SEO Workflow Pipeline</h3>
          <p className="text-sm text-gray-400">Real-time process visualization</p>
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

      {/* Workflow Stages */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Connector Arrow */}
            {index < stages.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-0">
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                    opacity: stage.status === 'active' ? [0.5, 1, 0.5] : 1
                  }}
                  transition={{
                    repeat: stage.status === 'active' ? Infinity : 0,
                    duration: 1.5
                  }}
                  className="text-gray-600"
                >
                  →
                </motion.div>
              </div>
            )}

            {/* Stage Card */}
            <div
              className={`relative z-10 bg-gradient-to-br p-6 rounded-xl border transition-all duration-300 ${
                stage.status === 'complete'
                  ? 'from-green-500/10 to-green-600/5 border-green-500/30'
                  : stage.status === 'active'
                  ? 'from-blue-500/10 to-purple-500/5 border-blue-500/30 animate-pulse'
                  : stage.status === 'error'
                  ? 'from-red-500/10 to-red-600/5 border-red-500/30'
                  : 'from-white/5 to-white/2 border-white/10'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  stage.status === 'complete'
                    ? 'bg-green-500/20 text-green-400'
                    : stage.status === 'active'
                    ? 'bg-blue-500/20 text-blue-400'
                    : stage.status === 'error'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {stage.status === 'active' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  >
                    {stage.icon}
                  </motion.div>
                ) : (
                  stage.icon
                )}
              </div>

              {/* Label */}
              <h4 className="text-sm font-semibold text-white mb-1">{stage.label}</h4>

              {/* Count Badge */}
              {stage.count !== undefined && (
                <div
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${
                    stage.status === 'complete'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : stage.status === 'active'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : stage.status === 'error'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/10 text-gray-400 border border-white/20'
                  }`}
                >
                  {stage.count}
                </div>
              )}

              {/* Description */}
              {stage.description && (
                <p className="text-xs text-gray-400">{stage.description}</p>
              )}

              {/* Status Indicator */}
              {stage.status === 'active' && (
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-white mb-1">
            {stages.filter(s => s.status === 'complete').length}
          </div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {stages.filter(s => s.status === 'active').length}
          </div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-400 mb-1">
            {stages.filter(s => s.status === 'pending').length}
          </div>
          <div className="text-xs text-gray-400">Pending</div>
        </div>
      </div>
    </div>
  )
}
