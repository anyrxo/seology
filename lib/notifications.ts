/**
 * Notifications System
 *
 * Create and manage in-app notifications for users
 */

import { db } from './db'

type NotificationType = 'SUCCESS' | 'ERROR' | 'INFO' | 'WARNING' | 'FIX_APPLIED' | 'FIX_FAILED' | 'SITE_CONNECTED' | 'ANALYSIS_COMPLETE' | 'USAGE_LIMIT' | 'PLAN_UPGRADED' | 'FIX_PENDING'

interface CreateNotificationParams {
  userId: string
  type: NotificationType
  title: string
  message: string
  actionUrl?: string
}

/**
 * Create a new notification
 */
export async function createNotification(params: CreateNotificationParams) {
  const { userId, type, title, message, actionUrl } = params

  return await db.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      actionUrl,
      read: false,
    },
  })
}

/**
 * Mark notification as read
 */
export async function markAsRead(notificationId: string, userId: string) {
  return await db.notification.update({
    where: {
      id: notificationId,
      userId, // Ensure user owns this notification
    },
    data: {
      read: true,
    },
  })
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllAsRead(userId: string) {
  return await db.notification.updateMany({
    where: {
      userId,
      read: false,
    },
    data: {
      read: true,
    },
  })
}

/**
 * Get unread count for a user
 */
export async function getUnreadCount(userId: string): Promise<number> {
  return await db.notification.count({
    where: {
      userId,
      read: false,
    },
  })
}

/**
 * Get notifications for a user
 */
export async function getNotifications(
  userId: string,
  options: {
    limit?: number
    offset?: number
    unreadOnly?: boolean
  } = {}
) {
  const { limit = 20, offset = 0, unreadOnly = false } = options

  return await db.notification.findMany({
    where: {
      userId,
      ...(unreadOnly ? { read: false } : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: limit,
    skip: offset,
  })
}

/**
 * Delete old read notifications (cleanup)
 */
export async function cleanupOldNotifications(daysOld: number = 30) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysOld)

  return await db.notification.deleteMany({
    where: {
      read: true,
      createdAt: {
        lt: cutoffDate,
      },
    },
  })
}

// ==================== NOTIFICATION TEMPLATES ====================

/**
 * Notify when a fix is applied
 */
export async function notifyFixApplied(
  userId: string,
  connectionId: string,
  fixId: string,
  issueTitle: string
) {
  return await createNotification({
    userId,
    type: 'FIX_APPLIED',
    title: 'SEO Fix Applied',
    message: `Successfully applied fix for: ${issueTitle}`,
    actionUrl: `/dashboard/sites/${connectionId}`,
  })
}

/**
 * Notify when a fix fails
 */
export async function notifyFixFailed(
  userId: string,
  connectionId: string,
  fixId: string,
  issueTitle: string,
  error: string
) {
  return await createNotification({
    userId,
    type: 'FIX_FAILED',
    title: 'SEO Fix Failed',
    message: `Failed to apply fix for: ${issueTitle}. Error: ${error}`,
    actionUrl: `/dashboard/sites/${connectionId}`,
  })
}

/**
 * Notify when a site is connected
 */
export async function notifySiteConnected(
  userId: string,
  connectionId: string,
  siteUrl: string
) {
  return await createNotification({
    userId,
    type: 'SITE_CONNECTED',
    title: 'Site Connected',
    message: `Successfully connected ${siteUrl}`,
    actionUrl: `/dashboard/sites/${connectionId}`,
  })
}

/**
 * Notify when analysis is complete
 */
export async function notifyAnalysisComplete(
  userId: string,
  connectionId: string,
  siteUrl: string,
  issuesFound: number
) {
  return await createNotification({
    userId,
    type: 'ANALYSIS_COMPLETE',
    title: 'SEO Analysis Complete',
    message: `Found ${issuesFound} SEO ${issuesFound === 1 ? 'issue' : 'issues'} on ${siteUrl}`,
    actionUrl: `/dashboard/sites/${connectionId}`,
  })
}

/**
 * Notify when approaching usage limit
 */
export async function notifyUsageLimitApproaching(
  userId: string,
  limitType: string,
  percentage: number
) {
  return await createNotification({
    userId,
    type: 'USAGE_LIMIT',
    title: 'Approaching Usage Limit',
    message: `You've used ${percentage}% of your ${limitType} limit. Consider upgrading your plan.`,
    actionUrl: `/dashboard/billing`,
  })
}

/**
 * Notify when a plan is upgraded
 */
export async function notifyPlanUpgraded(
  userId: string,
  planName: string
) {
  return await createNotification({
    userId,
    type: 'PLAN_UPGRADED',
    title: 'Plan Upgraded',
    message: `Your plan has been upgraded to ${planName}`,
    actionUrl: `/dashboard/billing`,
  })
}

/**
 * Notify when a fix requires approval
 */
export async function notifyFixPendingApproval(
  userId: string,
  connectionId: string,
  fixId: string,
  issueTitle: string
) {
  return await createNotification({
    userId,
    type: 'FIX_PENDING',
    title: 'Fix Awaiting Approval',
    message: `A fix for "${issueTitle}" requires your approval`,
    actionUrl: `/dashboard/fixes`,
  })
}
