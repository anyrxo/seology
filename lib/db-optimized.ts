/**
 * Optimized Database Queries with Caching
 *
 * This module provides optimized database queries with built-in caching
 */

import { db } from './db'
import { cached, CacheKeys, invalidateUserCache, invalidateConnectionCache } from './cache'

/**
 * Get user stats with caching (5 minute TTL)
 */
export async function getUserStats(userId: string) {
  return cached(
    CacheKeys.userStats(userId),
    async () => {
      const user = await db.user.findUnique({
        where: { clerkId: userId },
        select: {
          id: true,
          plan: true,
          executionMode: true,
          connections: {
            select: {
              id: true,
              platform: true,
              domain: true,
              displayName: true,
              status: true,
              _count: {
                select: {
                  issues: {
                    where: { status: { not: 'FIXED' } },
                  },
                  fixes: {
                    where: {
                      createdAt: {
                        gte: new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1
                        ),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!user) return null

      // Calculate aggregated stats
      const sitesCount = user.connections.length
      const activeIssuesCount = user.connections.reduce(
        (sum, conn) => sum + conn._count.issues,
        0
      )
      const fixesThisMonth = user.connections.reduce(
        (sum, conn) => sum + conn._count.fixes,
        0
      )

      return {
        userId: user.id,
        plan: user.plan,
        executionMode: user.executionMode,
        sitesCount,
        activeIssuesCount,
        fixesThisMonth,
        connections: user.connections,
      }
    },
    300 // 5 minutes
  )
}

/**
 * Get connection issues with caching (2 minute TTL)
 */
export async function getConnectionIssues(connectionId: string) {
  return cached(
    CacheKeys.siteIssues(connectionId),
    async () => {
      return db.issue.findMany({
        where: {
          connectionId,
          status: { not: 'FIXED' },
        },
        orderBy: [{ severity: 'asc' }, { detectedAt: 'desc' }],
        take: 100, // Limit to prevent huge queries
      })
    },
    120 // 2 minutes
  )
}

/**
 * Get connection fixes with caching (2 minute TTL)
 */
export async function getConnectionFixes(connectionId: string, limit = 50) {
  return cached(
    CacheKeys.siteFixes(connectionId),
    async () => {
      return db.fix.findMany({
        where: { connectionId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        include: {
          issue: {
            select: {
              title: true,
              type: true,
              severity: true,
            },
          },
        },
      })
    },
    120 // 2 minutes
  )
}

/**
 * Get user connections with caching (5 minute TTL)
 */
export async function getUserConnections(userId: string) {
  return cached(
    CacheKeys.userConnections(userId),
    async () => {
      const user = await db.user.findUnique({
        where: { clerkId: userId },
        select: { id: true },
      })

      if (!user) return []

      return db.connection.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              issues: { where: { status: { not: 'FIXED' } } },
              fixes: true,
            },
          },
        },
      })
    },
    300 // 5 minutes
  )
}

/**
 * Get analytics data with caching (10 minute TTL)
 */
export async function getAnalyticsData(
  connectionId: string,
  period: 'day' | 'week' | 'month' = 'week'
) {
  return cached(
    CacheKeys.analytics(connectionId, period),
    async () => {
      const daysAgo = period === 'day' ? 1 : period === 'week' ? 7 : 30

      return db.metric.findMany({
        where: {
          connectionId,
          date: {
            gte: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { date: 'asc' },
      })
    },
    600 // 10 minutes
  )
}

/**
 * Get admin stats with caching (5 minute TTL)
 */
export async function getAdminStats() {
  return cached(
    CacheKeys.adminStats(),
    async () => {
      const [
        totalUsers,
        totalConnections,
        totalIssues,
        totalFixes,
        activeUsers,
      ] = await Promise.all([
        db.user.count(),
        db.connection.count(),
        db.issue.count({ where: { status: { not: 'FIXED' } } }),
        db.fix.count({ where: { status: 'APPLIED' } }),
        db.user.count({
          where: {
            connections: {
              some: {
                lastSync: {
                  gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                },
              },
            },
          },
        }),
      ])

      return {
        totalUsers,
        totalConnections,
        totalIssues,
        totalFixes,
        activeUsers,
      }
    },
    300 // 5 minutes
  )
}

/**
 * Optimized batch issue creation
 * Creates multiple issues in a single transaction
 */
export async function createIssuesBatch(
  connectionId: string,
  issues: Array<{
    type: string
    title: string
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
    pageUrl: string
    details: string
    recommendation: string
  }>
) {
  const result = await db.$transaction(
    issues.map((issue) =>
      db.issue.create({
        data: {
          connectionId,
          ...issue,
          status: 'OPEN',
        },
      })
    )
  )

  // Invalidate cache
  await invalidateConnectionCache(connectionId)

  return result
}

/**
 * Optimized fix application with cache invalidation
 */
export async function applyFixOptimized(
  connectionId: string,
  issueId: string,
  fixData: {
    description: string
    changes: string
    beforeState: string
    afterState: string
  }
) {
  const result = await db.$transaction(async (tx) => {
    // Create fix
    const fix = await tx.fix.create({
      data: {
        connectionId,
        issueId,
        ...fixData,
        status: 'APPLIED',
        method: 'AUTOMATIC',
        appliedAt: new Date(),
      },
    })

    // Update issue status
    await tx.issue.update({
      where: { id: issueId },
      data: {
        status: 'FIXED',
        fixedAt: new Date(),
      },
    })

    return fix
  })

  // Invalidate caches
  await invalidateConnectionCache(connectionId)

  return result
}
