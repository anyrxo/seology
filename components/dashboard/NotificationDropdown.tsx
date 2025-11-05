'use client'

import * as React from 'react'
import Link from 'next/link'
import { Bell, Check, CheckCheck, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  read: boolean
  createdAt: Date
  link?: string
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load real notifications from API
  React.useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await fetch('/api/notifications')
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.data) {
            setNotifications(data.data.map((n: Record<string, unknown>) => ({
              id: n.id as string,
              title: n.title as string,
              message: n.message as string,
              type: n.type as Notification['type'],
              read: n.read as boolean,
              createdAt: new Date(n.createdAt as string),
              link: n.actionUrl as string | undefined,
            })))
          }
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadNotifications()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = async (id: string) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )

    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'POST',
      })
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
      // Revert on error
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      )
    }
  }

  const markAllAsRead = async () => {
    // Optimistic update
    const previousNotifications = notifications
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

    try {
      await fetch('/api/notifications/read-all', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Failed to mark all as read:', error)
      // Revert on error
      setNotifications(previousNotifications)
    }
  }

  const removeNotification = async (id: string) => {
    // Optimistic update
    const previousNotifications = notifications
    setNotifications((prev) => prev.filter((n) => n.id !== id))

    try {
      await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Failed to remove notification:', error)
      // Revert on error
      setNotifications(previousNotifications)
    }
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return 'Just now'
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 text-green-400'
      case 'info':
        return 'bg-blue-500/10 text-blue-400'
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-400'
      case 'error':
        return 'bg-red-500/10 text-red-400'
    }
  }

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 hover:bg-gray-800"
      >
        <Bell className="h-5 w-5 text-gray-400" />
        {unreadCount > 0 && (
          <Badge
            variant="danger"
            className="absolute -right-1 -top-1 h-5 min-w-[20px] px-1 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-96 rounded-lg border border-gray-800 bg-gray-900 shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">
                  No notifications
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        'relative p-4 transition-colors hover:bg-gray-800',
                        !notification.read && 'bg-gray-800/50'
                      )}
                    >
                      {/* Unread Indicator */}
                      {!notification.read && (
                        <div className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500" />
                      )}

                      <div className="ml-4">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-white">
                              {notification.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-400">
                              {notification.message}
                            </p>
                          </div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="rounded p-1 hover:bg-gray-700"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(notification.createdAt)}
                          </span>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-blue-400 hover:text-blue-300"
                              >
                                Mark as read
                              </button>
                            )}
                            {notification.link && (
                              <Link
                                href={notification.link}
                                className="text-xs text-blue-400 hover:text-blue-300"
                                onClick={() => setIsOpen(false)}
                              >
                                View →
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="border-t border-gray-800 p-2">
                <Link
                  href="/dashboard/notifications"
                  className="block rounded-md p-2 text-center text-sm text-blue-400 hover:bg-gray-800 hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
