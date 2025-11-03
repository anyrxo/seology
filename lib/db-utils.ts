/**
 * Database Utilities for SEOLOGY.AI
 *
 * Helper functions for common database operations, aggregations,
 * health checks, and connection pool management.
 */

import { db } from './db'
import {
  Prisma,
  User,
  Connection,
  Issue,
  Fix,
  Plan,
  ExecutionMode,
  IssueStatus,
  FixStatus,
  ConnectionStatus,
  Severity,
} from '@prisma/client'

// ===================================================================
// TYPE DEFINITIONS
// ===================================================================

export interface DatabaseHealthCheck {
  healthy: boolean
  latency: number
  connectionPoolSize: number
  activeConnections: number
  idleConnections: number
  errors: string[]
}

export interface UserStats {
  totalUsers: number
  usersByPlan: Record<Plan, number>
  usersByExecutionMode: Record<ExecutionMode, number>
  activeUsers: number
  newUsersLast30Days: number
}

export interface SiteStats {
  totalConnections: number
  connectionsByPlatform: Record<string, number>
  connectionsByStatus: Record<ConnectionStatus, number>
  averageIssuesPerSite: number
  averageFixesPerSite: number
}

export interface IssueStats {
  totalIssues: number
  issuesBySeverity: Record<Severity, number>
  issuesByStatus: Record<IssueStatus, number>
  issuesByType: Record<string, number>
  criticalIssues: number
  openIssues: number
}

export interface FixStats {
  totalFixes: number
  fixesByStatus: Record<FixStatus, number>
  fixSuccessRate: number
  averageFixTime: number | null
  fixesLast24Hours: number
  fixesLast7Days: number
  fixesLast30Days: number
}

export interface DashboardMetrics {
  userStats: UserStats
  siteStats: SiteStats
  issueStats: IssueStats
  fixStats: FixStats
}

// ===================================================================
// USER HELPERS
// ===================================================================

/**
 * Get user with all related data
 */
export async function getUserWithRelations(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    include: {
      connections: {
        include: {
          issues: true,
          fixes: true,
        },
      },
      subscriptions: true,
      notifications: {
        where: { read: false },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })
}

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  return await db.user.findUnique({
    where: { clerkId },
  })
}

/**
 * Get or create user from Clerk data
 */
export async function getOrCreateUser(clerkData: {
  clerkId: string
  email: string
  name?: string
}) {
  let user = await getUserByClerkId(clerkData.clerkId)

  if (!user) {
    user = await db.user.create({
      data: {
        clerkId: clerkData.clerkId,
        email: clerkData.email,
        name: clerkData.name || null,
        plan: 'STARTER',
        role: 'USER',
        executionMode: 'AUTOMATIC',
      },
    })
  }

  return user
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<UserStats> {
  const [
    totalUsers,
    starterUsers,
    growthUsers,
    scaleUsers,
    automaticUsers,
    planUsers,
    approveUsers,
    recentUsers,
  ] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { plan: 'STARTER' } }),
    db.user.count({ where: { plan: 'GROWTH' } }),
    db.user.count({ where: { plan: 'SCALE' } }),
    db.user.count({ where: { executionMode: 'AUTOMATIC' } }),
    db.user.count({ where: { executionMode: 'PLAN' } }),
    db.user.count({ where: { executionMode: 'APPROVE' } }),
    db.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ])

  return {
    totalUsers,
    usersByPlan: {
      STARTER: starterUsers,
      GROWTH: growthUsers,
      SCALE: scaleUsers,
    },
    usersByExecutionMode: {
      AUTOMATIC: automaticUsers,
      PLAN: planUsers,
      APPROVE: approveUsers,
    },
    activeUsers: totalUsers,
    newUsersLast30Days: recentUsers,
  }
}

// ===================================================================
// CONNECTION HELPERS
// ===================================================================

/**
 * Get connection with all related data
 */
export async function getConnectionWithRelations(connectionId: string, userId: string) {
  return await db.connection.findFirst({
    where: {
      id: connectionId,
      userId,
    },
    include: {
      issues: {
        orderBy: { detectedAt: 'desc' },
        take: 100,
      },
      fixes: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      crawls: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      metrics: {
        orderBy: { date: 'desc' },
        take: 30,
      },
    },
  })
}

/**
 * Get all connections for a user
 */
export async function getUserConnections(userId: string) {
  return await db.connection.findMany({
    where: { userId },
    include: {
      _count: {
        select: {
          issues: true,
          fixes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Get site statistics
 */
export async function getSiteStats(): Promise<SiteStats> {
  const connections = await db.connection.findMany({
    include: {
      _count: {
        select: {
          issues: true,
          fixes: true,
        },
      },
    },
  })

  const platformCounts: Record<string, number> = {}
  const statusCounts: Record<ConnectionStatus, number> = {
    PENDING: 0,
    CONNECTED: 0,
    ERROR: 0,
    DISCONNECTED: 0,
  }

  let totalIssues = 0
  let totalFixes = 0

  connections.forEach((conn) => {
    platformCounts[conn.platform] = (platformCounts[conn.platform] || 0) + 1
    statusCounts[conn.status]++
    totalIssues += conn._count.issues
    totalFixes += conn._count.fixes
  })

  return {
    totalConnections: connections.length,
    connectionsByPlatform: platformCounts,
    connectionsByStatus: statusCounts,
    averageIssuesPerSite: connections.length > 0 ? totalIssues / connections.length : 0,
    averageFixesPerSite: connections.length > 0 ? totalFixes / connections.length : 0,
  }
}

// ===================================================================
// ISSUE HELPERS
// ===================================================================

/**
 * Get issues for a connection
 */
export async function getConnectionIssues(
  connectionId: string,
  userId: string,
  options?: {
    status?: IssueStatus
    severity?: Severity
    limit?: number
  }
) {
  return await db.issue.findMany({
    where: {
      connectionId,
      connection: {
        userId,
      },
      ...(options?.status && { status: options.status }),
      ...(options?.severity && { severity: options.severity }),
    },
    orderBy: [{ severity: 'asc' }, { detectedAt: 'desc' }],
    take: options?.limit || 100,
  })
}

/**
 * Get issue statistics
 */
export async function getIssueStats(): Promise<IssueStats> {
  const [
    totalIssues,
    criticalIssues,
    highIssues,
    mediumIssues,
    lowIssues,
    openIssues,
    inProgressIssues,
    fixedIssues,
    failedIssues,
    ignoredIssues,
    detectedIssues,
    fixingIssues,
    issueTypes,
  ] = await Promise.all([
    db.issue.count(),
    db.issue.count({ where: { severity: 'CRITICAL' } }),
    db.issue.count({ where: { severity: 'HIGH' } }),
    db.issue.count({ where: { severity: 'MEDIUM' } }),
    db.issue.count({ where: { severity: 'LOW' } }),
    db.issue.count({ where: { status: 'OPEN' } }),
    db.issue.count({ where: { status: 'IN_PROGRESS' } }),
    db.issue.count({ where: { status: 'FIXED' } }),
    db.issue.count({ where: { status: 'FAILED' } }),
    db.issue.count({ where: { status: 'IGNORED' } }),
    db.issue.count({ where: { status: 'DETECTED' } }),
    db.issue.count({ where: { status: 'FIXING' } }),
    db.issue.groupBy({
      by: ['type'],
      _count: true,
    }),
  ])

  const issuesByType: Record<string, number> = {}
  issueTypes.forEach((item) => {
    issuesByType[item.type] = item._count
  })

  return {
    totalIssues,
    issuesBySeverity: {
      CRITICAL: criticalIssues,
      HIGH: highIssues,
      MEDIUM: mediumIssues,
      LOW: lowIssues,
    },
    issuesByStatus: {
      OPEN: openIssues,
      IN_PROGRESS: inProgressIssues,
      FIXED: fixedIssues,
      FAILED: failedIssues,
      IGNORED: ignoredIssues,
      DETECTED: detectedIssues,
      FIXING: fixingIssues,
    },
    issuesByType,
    criticalIssues,
    openIssues: openIssues + detectedIssues,
  }
}

// ===================================================================
// FIX HELPERS
// ===================================================================

/**
 * Get fixes for a connection
 */
export async function getConnectionFixes(
  connectionId: string,
  userId: string,
  options?: {
    status?: FixStatus
    limit?: number
  }
) {
  return await db.fix.findMany({
    where: {
      connectionId,
      connection: {
        userId,
      },
      ...(options?.status && { status: options.status }),
    },
    include: {
      issue: true,
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 50,
  })
}

/**
 * Get fix statistics
 */
export async function getFixStats(): Promise<FixStats> {
  const [
    totalFixes,
    pendingFixes,
    appliedFixes,
    failedFixes,
    rolledBackFixes,
    fixesLast24Hours,
    fixesLast7Days,
    fixesLast30Days,
    appliedFixesWithTime,
  ] = await Promise.all([
    db.fix.count(),
    db.fix.count({ where: { status: 'PENDING' } }),
    db.fix.count({ where: { status: 'APPLIED' } }),
    db.fix.count({ where: { status: 'FAILED' } }),
    db.fix.count({ where: { status: 'ROLLED_BACK' } }),
    db.fix.count({
      where: {
        appliedAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    }),
    db.fix.count({
      where: {
        appliedAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    db.fix.count({
      where: {
        appliedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    db.fix.findMany({
      where: {
        status: 'APPLIED',
        appliedAt: { not: null },
      },
      select: {
        createdAt: true,
        appliedAt: true,
      },
    }),
  ])

  // Calculate average fix time
  let averageFixTime: number | null = null
  if (appliedFixesWithTime.length > 0) {
    const totalTime = appliedFixesWithTime.reduce((sum, fix) => {
      const created = fix.createdAt.getTime()
      const applied = fix.appliedAt!.getTime()
      return sum + (applied - created)
    }, 0)
    averageFixTime = totalTime / appliedFixesWithTime.length
  }

  const successRate =
    totalFixes > 0 ? (appliedFixes / (appliedFixes + failedFixes)) * 100 : 0

  return {
    totalFixes,
    fixesByStatus: {
      PENDING: pendingFixes,
      APPLIED: appliedFixes,
      FAILED: failedFixes,
      ROLLED_BACK: rolledBackFixes,
    },
    fixSuccessRate: successRate,
    averageFixTime,
    fixesLast24Hours,
    fixesLast7Days,
    fixesLast30Days,
  }
}

// ===================================================================
// AGGREGATED METRICS
// ===================================================================

/**
 * Get comprehensive dashboard metrics
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const [userStats, siteStats, issueStats, fixStats] = await Promise.all([
    getUserStats(),
    getSiteStats(),
    getIssueStats(),
    getFixStats(),
  ])

  return {
    userStats,
    siteStats,
    issueStats,
    fixStats,
  }
}

/**
 * Get metrics for a specific date range
 */
export async function getMetricsForDateRange(
  connectionId: string,
  startDate: Date,
  endDate: Date
) {
  return await db.metric.findMany({
    where: {
      connectionId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { date: 'asc' },
  })
}

/**
 * Get site performance trends
 */
export async function getSitePerformanceTrends(connectionId: string, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const metrics = await db.metric.findMany({
    where: {
      connectionId,
      date: { gte: startDate },
    },
    orderBy: { date: 'asc' },
  })

  return {
    dates: metrics.map((m) => m.date),
    organicTraffic: metrics.map((m) => m.organicTraffic),
    pageSpeed: metrics.map((m) => m.pageSpeed),
    issuesCount: metrics.map((m) => m.issuesCount),
    fixesCount: metrics.map((m) => m.fixesCount),
  }
}

// ===================================================================
// NOTIFICATION HELPERS
// ===================================================================

/**
 * Create notification
 */
export async function createNotification(data: {
  userId: string
  type: string
  title: string
  message: string
  actionUrl?: string
}) {
  return await db.notification.create({
    data: {
      userId: data.userId,
      type: data.type,
      title: data.title,
      message: data.message,
      actionUrl: data.actionUrl,
      read: false,
    },
  })
}

/**
 * Get unread notifications count
 */
export async function getUnreadNotificationCount(userId: string) {
  return await db.notification.count({
    where: {
      userId,
      read: false,
    },
  })
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string, userId: string) {
  return await db.notification.updateMany({
    where: {
      id: notificationId,
      userId,
    },
    data: {
      read: true,
    },
  })
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(userId: string) {
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

// ===================================================================
// AUDIT LOG HELPERS
// ===================================================================

/**
 * Create audit log entry
 */
export async function createAuditLog(data: {
  userId: string
  connectionId?: string
  action: string
  resource?: string
  resourceId?: string
  details?: Record<string, any>
  ipAddress?: string
  userAgent?: string
}) {
  return await db.auditLog.create({
    data: {
      userId: data.userId,
      connectionId: data.connectionId,
      action: data.action,
      resource: data.resource,
      resourceId: data.resourceId,
      details: JSON.stringify(data.details || {}),
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    },
  })
}

/**
 * Get audit logs for a user
 */
export async function getUserAuditLogs(
  userId: string,
  options?: {
    limit?: number
    action?: string
    connectionId?: string
  }
) {
  return await db.auditLog.findMany({
    where: {
      userId,
      ...(options?.action && { action: options.action }),
      ...(options?.connectionId && { connectionId: options.connectionId }),
    },
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 100,
  })
}

// ===================================================================
// DATABASE HEALTH & MAINTENANCE
// ===================================================================

/**
 * Check database health
 */
export async function checkDatabaseHealth(): Promise<DatabaseHealthCheck> {
  const errors: string[] = []
  const startTime = Date.now()

  try {
    // Test basic connectivity
    await db.$queryRaw`SELECT 1`

    const latency = Date.now() - startTime

    // Note: Prisma Client doesn't expose $metrics in all versions
    // Using default pool size estimates
    return {
      healthy: true,
      latency,
      connectionPoolSize: 10, // Default Prisma pool size
      activeConnections: 1, // At least one active connection for this query
      idleConnections: 0,
      errors,
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : 'Unknown error')

    return {
      healthy: false,
      latency: Date.now() - startTime,
      connectionPoolSize: 0,
      activeConnections: 0,
      idleConnections: 0,
      errors,
    }
  }
}

/**
 * Clean up old data
 */
export async function cleanupOldData(daysToKeep: number = 90) {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

  const results = {
    deletedFixes: 0,
    deletedAuditLogs: 0,
    deletedNotifications: 0,
  }

  try {
    // Delete old rolled back fixes
    const deletedFixes = await db.fix.deleteMany({
      where: {
        status: 'ROLLED_BACK',
        rolledBackAt: {
          lt: cutoffDate,
        },
      },
    })
    results.deletedFixes = deletedFixes.count

    // Delete old audit logs
    const deletedAuditLogs = await db.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    })
    results.deletedAuditLogs = deletedAuditLogs.count

    // Delete old read notifications
    const deletedNotifications = await db.notification.deleteMany({
      where: {
        read: true,
        createdAt: {
          lt: cutoffDate,
        },
      },
    })
    results.deletedNotifications = deletedNotifications.count

    return results
  } catch (error) {
    console.error('Error cleaning up old data:', error)
    throw error
  }
}

/**
 * Get database size and table statistics
 */
export async function getDatabaseStats() {
  try {
    const [
      userCount,
      connectionCount,
      issueCount,
      fixCount,
      metricCount,
      notificationCount,
      auditLogCount,
    ] = await Promise.all([
      db.user.count(),
      db.connection.count(),
      db.issue.count(),
      db.fix.count(),
      db.metric.count(),
      db.notification.count(),
      db.auditLog.count(),
    ])

    return {
      tables: {
        users: userCount,
        connections: connectionCount,
        issues: issueCount,
        fixes: fixCount,
        metrics: metricCount,
        notifications: notificationCount,
        auditLogs: auditLogCount,
      },
      totalRecords:
        userCount +
        connectionCount +
        issueCount +
        fixCount +
        metricCount +
        notificationCount +
        auditLogCount,
    }
  } catch (error) {
    console.error('Error getting database stats:', error)
    throw error
  }
}

// ===================================================================
// EXPORT ALL UTILITIES
// ===================================================================

export const dbUtils = {
  // User helpers
  getUserWithRelations,
  getUserByClerkId,
  getOrCreateUser,
  getUserStats,

  // Connection helpers
  getConnectionWithRelations,
  getUserConnections,
  getSiteStats,

  // Issue helpers
  getConnectionIssues,
  getIssueStats,

  // Fix helpers
  getConnectionFixes,
  getFixStats,

  // Metrics
  getDashboardMetrics,
  getMetricsForDateRange,
  getSitePerformanceTrends,

  // Notifications
  createNotification,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,

  // Audit logs
  createAuditLog,
  getUserAuditLogs,

  // Health & maintenance
  checkDatabaseHealth,
  cleanupOldData,
  getDatabaseStats,
}
