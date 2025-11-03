'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface NotificationActionsProps {
  hasUnread: boolean
  totalNotifications: number
}

export default function NotificationActions({
  hasUnread,
  totalNotifications,
}: NotificationActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleMarkAllAsRead = async () => {
    if (!hasUnread) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error('Failed to mark all as read')
      }
    } catch (error) {
      console.error('Error marking all as read:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearAll = async () => {
    if (!confirm(`Are you sure you want to delete all ${totalNotifications} notifications?`)) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        console.error('Failed to clear notifications')
      }
    } catch (error) {
      console.error('Error clearing notifications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      {hasUnread && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllAsRead}
          disabled={isLoading}
          isLoading={isLoading}
        >
          Mark all as read
        </Button>
      )}
      {totalNotifications > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          disabled={isLoading}
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
