import { JobType, Severity, IssueCategory, IssueStatus } from '@prisma/client'
import { db } from './db'
import { notifyCrawlComplete, notifyRollbackExpiring } from './notifications'

export interface JobResult {
  success: boolean
  error?: string
  data?: any
}

/**
 * Process a job based on its type
 */
export async function processJob(type: JobType, payload: any): Promise<JobResult> {
  try {
    switch (type) {
      case 'CRAWL_SITE':
        return await processCrawlJob(payload)
      case 'ANALYZE_SITE':
        return await processAnalysisJob(payload)
      case 'CLEANUP_ROLLBACKS':
        return await processCleanupJob(payload)
      case 'RESET_USAGE':
        return await processUsageResetJob(payload)
      case 'SYNC_METRICS':
        return await processSyncMetricsJob(payload)
      default:
        return {
          success: false,
          error: `Unknown job type: ${type}`,
        }
    }
  } catch (error) {
    console.error(`Error processing ${type} job:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Process a site crawl job
 */
async function processCrawlJob(payload: any): Promise<JobResult> {
  const { siteId, userId, maxPages = 10 } = payload

  // Import crawler dynamically to avoid circular dependencies
  const { crawler } = await import('./crawler')

  const connection = await db.connection.findUnique({
    where: { id: siteId },
  })

  if (!connection) {
    return { success: false, error: 'Site not found' }
  }

  try {
    // Perform the crawl
    const { results, issues } = await crawler.crawlSite(connection.domain, maxPages)

    // Store issues in database
    const issuePromises = issues.map(issue =>
      db.issue.create({
        data: {
          connectionId: siteId,
          type: issue.type,
          severity: issue.severity.toUpperCase() as Severity,
          category: issue.category.toUpperCase() as IssueCategory,
          pageUrl: issue.page,
          details: {
            description: issue.description,
            recommendation: issue.recommendation,
            impact: issue.impact,
          },
          status: 'DETECTED',
        },
      })
    )

    await Promise.all(issuePromises)

    // Update connection last sync
    await db.connection.update({
      where: { id: siteId },
      data: { lastSync: new Date() },
    })

    // Send notification to user
    await notifyCrawlComplete(userId, issues.length, siteId)

    return {
      success: true,
      data: {
        pagesAnalyzed: results.length,
        issuesFound: issues.length,
      },
    }
  } catch (error) {
    console.error('Crawl job error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Crawl failed',
    }
  }
}

/**
 * Process an AI analysis job
 */
async function processAnalysisJob(payload: any): Promise<JobResult> {
  const { siteId, userId } = payload

  // This would integrate with your Claude AI analysis
  // For now, return placeholder
  return {
    success: true,
    data: {
      analyzed: true,
    },
  }
}

/**
 * Process rollback cleanup job
 */
async function processCleanupJob(payload: any): Promise<JobResult> {
  const { daysOld = 90 } = payload

  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysOld)

    // Find fixes that are about to expire (7 days warning)
    const warningDate = new Date()
    warningDate.setDate(warningDate.getDate() - (daysOld - 7))

    const expiringFixes = await db.fix.findMany({
      where: {
        status: 'APPLIED',
        rollbackExpiresAt: {
          gte: cutoffDate,
          lte: warningDate,
        },
      },
      include: {
        connection: {
          include: {
            user: true,
          },
        },
      },
    })

    // Send notifications for expiring rollbacks
    for (const fix of expiringFixes) {
      const daysLeft = Math.ceil(
        (fix.rollbackExpiresAt!.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
      await notifyRollbackExpiring(
        fix.connection.user.id,
        daysLeft,
        fix.id
      )
    }

    // Delete expired rollback data
    const result = await db.fix.updateMany({
      where: {
        status: 'APPLIED',
        rollbackExpiresAt: {
          lt: cutoffDate,
        },
      },
      data: {
        beforeState: {}, // Clear rollback data
      },
    })

    return {
      success: true,
      data: {
        notificationsSent: expiringFixes.length,
        rollbacksCleared: result.count,
      },
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Cleanup failed',
    }
  }
}

/**
 * Process usage reset job (monthly)
 */
async function processUsageResetJob(payload: any): Promise<JobResult> {
  const { resetMonthlyUsage } = await import('./usage')

  try {
    const result = await resetMonthlyUsage()
    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Usage reset failed',
    }
  }
}

/**
 * Process metrics sync job
 */
async function processSyncMetricsJob(payload: any): Promise<JobResult> {
  // This would sync metrics from external sources (Google Search Console, etc.)
  // For now, return placeholder
  return {
    success: true,
    data: {
      synced: true,
    },
  }
}
