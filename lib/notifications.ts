import { db } from '@/lib/db'
import { NotificationType } from '@prisma/client'

export interface NotificationMetadata {
  issueCount?: number
  fixId?: string
  connectionId?: string
  usagePercent?: number
  planName?: string
  errorDetails?: string
  expiresAt?: string
  [key: string]: any
}

export interface CreateNotificationParams {
  userId: string
  type: NotificationType
  message: string
  metadata?: NotificationMetadata
}

// Notification Templates
export const NotificationMessages = {
  CRAWL_COMPLETE: (issueCount: number) =>
    `Site crawl completed. Found ${issueCount} SEO ${issueCount === 1 ? 'issue' : 'issues'}.`,
  FIX_APPLIED: (fixType: string) =>
    `Fix applied successfully: ${fixType}`,
  FIX_FAILED: (fixType: string, error?: string) =>
    `Fix failed: ${fixType}${error ? ` - ${error}` : ''}`,
  USAGE_WARNING: (usagePercent: number, resourceType: string) =>
    `Approaching ${resourceType} limit (${usagePercent}% used). Consider upgrading.`,
  USAGE_LIMIT_REACHED: (resourceType: string) =>
    `${resourceType} limit reached. Upgrade to continue.`,
  SUBSCRIPTION_UPDATED: (planName: string) =>
    `Your plan has been updated to ${planName}.`,
  PAYMENT_FAILED: () =>
    `Payment failed. Please update your payment method.`,
  ROLLBACK_EXPIRING: (daysLeft: number) =>
    `Rollback expires in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}.`,
}

// Create a notification
export async function createNotification(params: CreateNotificationParams) {
  try {
    const notification = await db.notification.create({
      data: {
        userId: params.userId,
        type: params.type,
        message: params.message,
        metadata: params.metadata || {},
        read: false,
      },
    })
    return notification
  } catch (error) {
    console.error('Error creating notification:', error)
    throw error
  }
}

// Mark notification as read
export async function markAsRead(notificationId: string) {
  try {
    const notification = await db.notification.update({
      where: { id: notificationId },
      data: {
        read: true,
        readAt: new Date(),
      },
    })
    return notification
  } catch (error) {
    console.error('Error marking notification as read:', error)
    throw error
  }
}

// Mark all notifications as read for a user
export async function markAllAsRead(userId: string) {
  try {
    const result = await db.notification.updateMany({
      where: {
        userId,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    })
    return result
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    throw error
  }
}

// Get unread notifications for a user
export async function getUnreadNotifications(userId: string) {
  try {
    const notifications = await db.notification.findMany({
      where: {
        userId,
        read: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return notifications
  } catch (error) {
    console.error('Error getting unread notifications:', error)
    throw error
  }
}

// Get unread count
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const count = await db.notification.count({
      where: {
        userId,
        read: false,
      },
    })
    return count
  } catch (error) {
    console.error('Error getting unread count:', error)
    throw error
  }
}

// Get notification history with pagination
export async function getNotificationHistory(
  userId: string,
  limit: number = 50,
  offset: number = 0
) {
  try {
    const [notifications, total] = await Promise.all([
      db.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.notification.count({ where: { userId } }),
    ])

    return {
      notifications,
      total,
      hasMore: offset + notifications.length < total,
    }
  } catch (error) {
    console.error('Error getting notification history:', error)
    throw error
  }
}

// Delete old notifications (optional cleanup)
export async function deleteOldNotifications(daysToKeep: number = 90) {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

    const result = await db.notification.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
        read: true, // Only delete read notifications
      },
    })

    return result
  } catch (error) {
    console.error('Error deleting old notifications:', error)
    throw error
  }
}

// Helper functions for creating specific notification types
export async function notifyCrawlComplete(
  userId: string,
  issueCount: number,
  connectionId: string
) {
  return createNotification({
    userId,
    type: 'CRAWL_COMPLETE',
    message: NotificationMessages.CRAWL_COMPLETE(issueCount),
    metadata: { issueCount, connectionId },
  })
}

export async function notifyFixApplied(
  userId: string,
  fixType: string,
  fixId: string
) {
  return createNotification({
    userId,
    type: 'FIX_APPLIED',
    message: NotificationMessages.FIX_APPLIED(fixType),
    metadata: { fixType, fixId },
  })
}

export async function notifyFixFailed(
  userId: string,
  fixType: string,
  fixId: string,
  error?: string
) {
  return createNotification({
    userId,
    type: 'FIX_FAILED',
    message: NotificationMessages.FIX_FAILED(fixType, error),
    metadata: { fixType, fixId, error },
  })
}

export async function notifyUsageWarning(
  userId: string,
  usagePercent: number,
  resourceType: string
) {
  return createNotification({
    userId,
    type: 'USAGE_WARNING',
    message: NotificationMessages.USAGE_WARNING(usagePercent, resourceType),
    metadata: { usagePercent, resourceType },
  })
}

export async function notifyUsageLimitReached(
  userId: string,
  resourceType: string
) {
  return createNotification({
    userId,
    type: 'USAGE_LIMIT_REACHED',
    message: NotificationMessages.USAGE_LIMIT_REACHED(resourceType),
    metadata: { resourceType },
  })
}

export async function notifySubscriptionUpdated(
  userId: string,
  planName: string
) {
  return createNotification({
    userId,
    type: 'SUBSCRIPTION_UPDATED',
    message: NotificationMessages.SUBSCRIPTION_UPDATED(planName),
    metadata: { planName },
  })
}

export async function notifyPaymentFailed(userId: string) {
  return createNotification({
    userId,
    type: 'PAYMENT_FAILED',
    message: NotificationMessages.PAYMENT_FAILED(),
    metadata: {},
  })
}

export async function notifyRollbackExpiring(
  userId: string,
  daysLeft: number,
  fixId: string
) {
  return createNotification({
    userId,
    type: 'ROLLBACK_EXPIRING',
    message: NotificationMessages.ROLLBACK_EXPIRING(daysLeft),
    metadata: { daysLeft, fixId },
  })
}
