'use client'

import { formatDistanceToNow } from '@/lib/utils'
import { NotificationType } from '@prisma/client'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CreditCard,
  Info,
  Search,
  Settings,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NotificationItemProps {
  id: string
  type: NotificationType
  message: string
  read: boolean
  createdAt: Date
  onClick?: () => void
}

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  CRAWL_COMPLETE: <Search className="h-5 w-5 text-blue-500" />,
  FIX_APPLIED: <CheckCircle className="h-5 w-5 text-green-500" />,
  FIX_FAILED: <XCircle className="h-5 w-5 text-red-500" />,
  USAGE_WARNING: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  USAGE_LIMIT_REACHED: <AlertCircle className="h-5 w-5 text-red-500" />,
  SUBSCRIPTION_UPDATED: <Settings className="h-5 w-5 text-purple-500" />,
  PAYMENT_FAILED: <CreditCard className="h-5 w-5 text-red-500" />,
  ROLLBACK_EXPIRING: <Info className="h-5 w-5 text-orange-500" />,
}

export function NotificationItem({
  id,
  type,
  message,
  read,
  createdAt,
  onClick,
}: NotificationItemProps) {
  const icon = notificationIcons[type]

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-50',
        !read && 'bg-blue-50 hover:bg-blue-100'
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm text-gray-900',
            !read && 'font-semibold'
          )}
        >
          {message}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {formatDistanceToNow(createdAt)}
        </p>
      </div>
      {!read && (
        <div className="flex-shrink-0">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
        </div>
      )}
    </button>
  )
}
