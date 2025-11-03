import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatRelativeTime } from '@/lib/utils'
import NotificationActions from '@/components/notifications/NotificationActions'

export default async function NotificationsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      notifications: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/sign-in')
  }

  const unreadCount = user.notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      connection_success: '🔗',
      site_analyzed: '🔍',
      fix_applied: '✅',
      issue_detected: '⚠️',
      billing_updated: '💳',
      plan_upgraded: '⬆️',
      plan_downgraded: '⬇️',
      usage_limit_warning: '📊',
      crawl_completed: '🕷️',
      error: '❌',
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
    }
    return icons[type] || '📬'
  }

  const getNotificationTypeVariant = (type: string): 'success' | 'warning' | 'danger' | 'info' | 'default' => {
    if (type.includes('success') || type.includes('applied') || type.includes('completed')) return 'success'
    if (type.includes('error') || type.includes('failed')) return 'danger'
    if (type.includes('warning') || type.includes('limit')) return 'warning'
    if (type.includes('info') || type.includes('detected') || type.includes('analyzed')) return 'info'
    return 'default'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-gray-400">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
              : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <NotificationActions
            hasUnread={true}
            totalNotifications={user.notifications.length}
          />
        )}
      </div>

      {/* Notifications List */}
      {user.notifications.length > 0 ? (
        <div className="space-y-3">
          {user.notifications.map((notification) => (
            <Card
              key={notification.id}
              className={!notification.read ? 'border-blue-600/50 bg-blue-900/5' : ''}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="text-3xl flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3
                          className={`text-base font-semibold ${
                            !notification.read ? 'text-white' : 'text-gray-300'
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <Badge variant={getNotificationTypeVariant(notification.type)}>
                        {notification.type.replace(/_/g, ' ')}
                      </Badge>
                    </div>

                    <p className="text-gray-400 text-sm mb-2">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          View Details →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-white mb-2">No notifications yet</h3>
              <p className="text-gray-400">
                We'll notify you when important events happen with your sites
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
