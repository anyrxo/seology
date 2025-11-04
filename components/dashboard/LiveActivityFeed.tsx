'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Search, AlertCircle, CheckCircle2, Globe, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useState, useEffect } from 'react'

interface Activity {
  id: string
  type: 'fix' | 'scan' | 'issue' | 'connection'
  title: string
  description: string
  site: string
  timestamp: Date
  severity?: 'high' | 'medium' | 'low'
}

interface LiveActivityFeedProps {
  activities?: Activity[]
  maxItems?: number
  showTimestamp?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
}

export function LiveActivityFeed({
  activities: initialActivities = [],
  maxItems = 10,
  showTimestamp = true,
  autoRefresh = false,
  refreshInterval = 30000
}: LiveActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [newActivityCount, setNewActivityCount] = useState(0)

  // Simulate auto-refresh (in production, this would fetch from API)
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      // Simulate new activity (in production, fetch from API)
      setNewActivityCount(prev => prev + 1)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'fix':
        return <Zap className="h-4 w-4" />
      case 'scan':
        return <Search className="h-4 w-4" />
      case 'issue':
        return <AlertCircle className="h-4 w-4" />
      case 'connection':
        return <Globe className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: Activity['type'], severity?: Activity['severity']) => {
    if (type === 'issue') {
      if (severity === 'high') return 'text-red-400 bg-red-500/10 border-red-500/30'
      if (severity === 'medium') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    }

    switch (type) {
      case 'fix':
        return 'text-green-400 bg-green-500/10 border-green-500/30'
      case 'scan':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30'
      case 'connection':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
      default:
        return 'text-gray-400 bg-white/10 border-white/20'
    }
  }

  const displayActivities = activities.slice(0, maxItems)

  return (
    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Live Activity Feed</h3>
          <p className="text-xs text-gray-400">Real-time updates from your sites</p>
        </div>
        <div className="flex items-center gap-2">
          {newActivityCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30"
            >
              +{newActivityCount} new
            </motion.div>
          )}
          {autoRefresh && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
              Live
            </div>
          )}
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {displayActivities.length > 0 ? (
            displayActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-lg border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`p-2 rounded-lg border ${getActivityColor(activity.type, activity.severity)}`}>
                    {getActivityIcon(activity.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                        {activity.title}
                      </h4>
                      {showTimestamp && (
                        <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        <Globe className="h-3 w-3 inline mr-1" />
                        {activity.site}
                      </span>
                      {activity.severity && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          activity.severity === 'high'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : activity.severity === 'medium'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        }`}>
                          {activity.severity.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📭</div>
              <h4 className="text-sm font-semibold text-white mb-1">No activity yet</h4>
              <p className="text-xs text-gray-400">Activity will appear here as it happens</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* View All Link */}
      {displayActivities.length >= maxItems && (
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
            View All Activity →
          </button>
        </div>
      )}
    </div>
  )
}

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = scrollbarStyles
  document.head.appendChild(style)
}
