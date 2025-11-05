'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { formatDistanceToNow } from 'date-fns'
import { SwipeableNotification } from '@/components/mobile/SwipeableNotification'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  actionUrl?: string | null
  read: boolean
  createdAt: string
}

export default function NotificationCenter() {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (user) {
      fetchNotifications()
      fetchUnreadCount()

      const interval = setInterval(() => {
        fetchUnreadCount()
        if (isOpen) {
          fetchNotifications()
        }
      }, 30000) // 30 seconds

      return () => clearInterval(interval)
    }
  }, [user, isOpen])

  const fetchNotifications = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/notifications?limit=20')
      const data = await response.json()
      if (data.success) {
        setNotifications(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUnreadCount = async () => {
    try {
      const response = await fetch('/api/notifications/unread-count')
      const data = await response.json()
      if (data.success) {
        setUnreadCount(data.data.count)
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
      })
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  const dismissNotification = async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      })
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    } catch (error) {
      console.error('Failed to dismiss notification:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      })
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-gray-900 border border-gray-800 rounded-lg shadow-2xl z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              {unreadCount > 0 && (
                <p className="text-gray-400 text-sm">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📭</div>
                  <p className="text-gray-400 text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {notifications.map((notification) => (
                    <SwipeableNotification
                      key={notification.id}
                      notification={notification}
                      onDismiss={dismissNotification}
                      onMarkAsRead={markAsRead}
                    >
                      <NotificationItem
                        notification={notification}
                        onMarkAsRead={markAsRead}
                      />
                    </SwipeableNotification>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-800">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/dashboard/notifications'
                  }}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium w-full text-center"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification
  onMarkAsRead: (id: string) => void
}) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'connection_success':
        return '🔗'
      case 'site_analyzed':
        return '🔍'
      case 'fix_applied':
        return '✅'
      case 'issue_detected':
        return '⚠️'
      case 'billing_updated':
        return '💳'
      case 'INFO':
        // Check if it's about credits based on title
        if (notification.title.toLowerCase().includes('credit')) {
          return '✨'
        }
        return '📬'
      default:
        return '📬'
    }
  }

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const then = new Date(date)
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000)

    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return then.toLocaleDateString()
  }

  return (
    <button
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
      className={`w-full px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
        !notification.read ? 'bg-blue-900/10' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="text-2xl flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4
              className={`text-sm font-medium ${
                !notification.read ? 'text-white' : 'text-gray-300'
              }`}
            >
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-1">{notification.message}</p>
          <p className="text-gray-500 text-xs">
            {getTimeAgo(notification.createdAt)}
          </p>
        </div>
      </div>
    </button>
  )
}
