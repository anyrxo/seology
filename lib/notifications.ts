/**
 * Notifications System
 *
 * Create and manage in-app notifications for users
 * Also sends email notifications where appropriate
 */

import { db } from './db'
import {
  sendFixAppliedEmail,
  sendUsageLimitWarningEmail,
  sendPlanUpgradeEmail,
} from './email'

export enum NotificationType {
  // Fix-related
  FIX_APPLIED = 'FIX_APPLIED',
  FIX_FAILED = 'FIX_FAILED',
  FIX_REQUIRES_APPROVAL = 'FIX_REQUIRES_APPROVAL',
  PLAN_READY = 'PLAN_READY',

  // Job-related
  CRAWL_COMPLETE = 'CRAWL_COMPLETE',
  ANALYSIS_COMPLETE = 'ANALYSIS_COMPLETE',
  JOB_FAILED = 'JOB_FAILED',

  // Usage/Billing
  USAGE_WARNING = 'USAGE_WARNING',
  USAGE_LIMIT = 'USAGE_LIMIT',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUBSCRIPTION_RENEWED = 'SUBSCRIPTION_RENEWED',

  // System
  ISSUE_DETECTED = 'ISSUE_DETECTED',
  SITE_HEALTH = 'SITE_HEALTH',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  SITE_CONNECTED = 'SITE_CONNECTED',

  // Legacy types for backward compatibility
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  INFO = 'INFO',
  WARNING = 'WARNING',
  PLAN_UPGRADED = 'PLAN_UPGRADED',
  FIX_PENDING = 'FIX_PENDING',
}

interface CreateNotificationParams {
  userId: string
  type: NotificationType | string
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
}

/**
 * Create a new notification
 */
export async function createNotification(params: CreateNotificationParams) {
  const { userId, type, title, message, actionUrl, actionLabel, metadata } = params

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
  issueTitle: string,
  fixDescription?: string
) {
  // Create in-app notification
  const notification = await createNotification({
    userId,
    type: 'FIX_APPLIED',
    title: 'SEO Fix Applied',
    message: `Successfully applied fix for: ${issueTitle}`,
    actionUrl: `/dashboard/sites/${connectionId}`,
  })

  // Send email notification (non-blocking)
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true },
  })

  const connection = await db.connection.findUnique({
    where: { id: connectionId },
    select: { domain: true, displayName: true },
  })

  if (user?.email && connection?.domain) {
    sendFixAppliedEmail(
      userId,
      user.email,
      connection.displayName || connection.domain,
      issueTitle,
      fixDescription || 'SEO optimization applied'
    ).catch((err) => console.error('Failed to send fix applied email:', err))
  }

  return notification
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
  // Create in-app notification
  const notification = await createNotification({
    userId,
    type: 'USAGE_LIMIT',
    title: 'Approaching Usage Limit',
    message: `You've used ${percentage}% of your ${limitType} limit. Consider upgrading your plan.`,
    actionUrl: `/dashboard/billing`,
  })

  // Send email warning (non-blocking)
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true, plan: true },
  })

  if (user?.email) {
    sendUsageLimitWarningEmail(
      userId,
      user.email,
      limitType,
      percentage,
      user.plan
    ).catch((err) => console.error('Failed to send usage warning email:', err))
  }

  return notification
}

/**
 * Notify when a plan is upgraded
 */
export async function notifyPlanUpgraded(
  userId: string,
  planName: string,
  oldPlan?: string
) {
  // Create in-app notification
  const notification = await createNotification({
    userId,
    type: 'PLAN_UPGRADED',
    title: 'Plan Upgraded',
    message: `Your plan has been upgraded to ${planName}`,
    actionUrl: `/dashboard/billing`,
  })

  // Send email confirmation (non-blocking)
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true, plan: true },
  })

  if (user?.email) {
    sendPlanUpgradeEmail(
      userId,
      user.email,
      oldPlan || 'previous plan',
      planName
    ).catch((err) => console.error('Failed to send plan upgrade email:', err))
  }

  return notification
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
