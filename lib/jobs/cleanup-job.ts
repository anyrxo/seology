import { db } from '../db'
import { cleanupExpiredRollbacks } from '../rollback'
import { CleanupJobPayload } from '../queue'

export interface CleanupJobResult {
  success: boolean
  rollbacksCleaned: number
  jobsCleaned: number
  error?: string
}

/**
 * Process a cleanup job
 * This runs periodically to clean up expired rollbacks and old jobs
 */
export async function processCleanupJob(
  payload: CleanupJobPayload
): Promise<CleanupJobResult> {
  try {
    const { daysOld = 90 } = payload

    // Clean up expired rollbacks (from rollback.ts)
    const rollbackResult = await cleanupExpiredRollbacks()

    // Clean up old completed/failed jobs
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 30) // Keep jobs for 30 days

    const jobsResult = await db.job.deleteMany({
      where: {
        status: {
          in: ['COMPLETED', 'FAILED', 'CANCELLED'],
        },
        completedAt: {
          lt: cutoffDate,
        },
      },
    })

    // Clean up old audit logs (keep 1 year)
    const auditCutoffDate = new Date()
    auditCutoffDate.setDate(auditCutoffDate.getDate() - 365)

    await db.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: auditCutoffDate,
        },
      },
    })

    // Clean up old notifications (keep 90 days)
    const notificationCutoffDate = new Date()
    notificationCutoffDate.setDate(notificationCutoffDate.getDate() - 90)

    await db.notification.deleteMany({
      where: {
        read: true,
        createdAt: {
          lt: notificationCutoffDate,
        },
      },
    })

    return {
      success: true,
      rollbacksCleaned: rollbackResult.cleaned,
      jobsCleaned: jobsResult.count,
    }
  } catch (error) {
    console.error('Cleanup job error:', error)
    return {
      success: false,
      rollbacksCleaned: 0,
      jobsCleaned: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
