'use client'

import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { motion } from 'framer-motion'

export interface ActivityItem {
  id: string
  type: 'fix' | 'issue' | 'scan' | 'connection' | 'analysis'
  title: string
  description?: string
  timestamp: Date
  siteId?: string
  siteName?: string
  status?: 'success' | 'warning' | 'error' | 'info'
  metadata?: Record<string, unknown>
}

interface ActivityTimelineProps {
  activities: ActivityItem[]
  maxItems?: number
  showSiteName?: boolean
}

export function ActivityTimeline({
  activities,
  maxItems = 10,
  showSiteName = true,
}: ActivityTimelineProps) {
  const displayActivities = activities.slice(0, maxItems)

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'fix':
        return '✅'
      case 'issue':
        return '🔍'
      case 'scan':
        return '🔄'
      case 'connection':
        return '🔗'
      case 'analysis':
        return '🤖'
      default:
        return '📌'
    }
  }

  const getStatusColor = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'success':
        return 'green'
      case 'warning':
        return 'orange'
      case 'error':
        return 'red'
      case 'info':
      default:
        return 'neutral'
    }
  }

  if (displayActivities.length === 0) {
    return (
      <div className="card pd-32px---24px">
        <div className="flex-vertical gap-row-16px align-center text-center">
          <div className="card-icon-square _40px neutral-icon">
            <div className="text-300">📭</div>
          </div>
          <div>
            <p className="text-200 medium color-neutral-800 mg-bottom-8px">No recent activity</p>
            <p className="text-100 color-neutral-600">
              Activity from your sites will appear here
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-layout-vflex flex-vertical gap-row-12px">
      {displayActivities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            href={activity.siteId ? `/dashboard/sites/${activity.siteId}` : '#'}
            className="card pd-16px hover-card-link"
          >
            <div className="w-layout-hflex flex-horizontal gap-column-16px align-start">
              {/* Icon */}
              <div className={`card-icon-square _40px ${activity.status === 'error' ? 'red-icon' : activity.status === 'warning' ? 'orange-icon' : ''}`}>
                <div className="text-200">{getActivityIcon(activity.type)}</div>
              </div>

              {/* Content */}
              <div className="flex-vertical flex-1 min-w-0">
                <div className="w-layout-hflex flex-horizontal space-between align-center gap-column-12px mg-bottom-4px">
                  <p className="text-100 medium color-neutral-800 truncate">
                    {activity.title}
                  </p>
                  {activity.status && (
                    <div className={`badge ${getStatusColor(activity.status)}`}>
                      <div className="text-50 medium">{activity.status}</div>
                    </div>
                  )}
                </div>

                {activity.description && (
                  <p className="text-50 color-neutral-600 mg-bottom-4px line-clamp-2">
                    {activity.description}
                  </p>
                )}

                <div className="w-layout-hflex flex-horizontal gap-column-8px align-center">
                  {showSiteName && activity.siteName && (
                    <>
                      <span className="text-50 color-neutral-500">{activity.siteName}</span>
                      <span className="text-50 color-neutral-400">•</span>
                    </>
                  )}
                  <span className="text-50 color-neutral-500">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="text-200 color-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
