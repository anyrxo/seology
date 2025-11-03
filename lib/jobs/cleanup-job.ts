/**
 * Cleanup Rollbacks Job
 *
 * Removes rollback data older than 90 days
 * Cleans up old audit logs and notifications
 * Maintains database health
 */

import { db } from '../db'
import type { Job } from '@prisma/client'

/**
 * Execute cleanup job
 */
export async function cleanupRollbacksJob(job: Job): Promise<void> {
  console.log(`Starting cleanup job ${job.id}`)

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 90)

  let totalCleaned = 0

  try {
    // Update job progress
    await db.job.update({
      where: { id: job.id },
      data: { progress: 10 }
    })

    // 1. Delete old rolled back fixes (older than 90 days)
    console.log('Cleaning up old rollback records...')
    const rollbackResult = await db.fix.deleteMany({
      where: {
        status: 'ROLLED_BACK',
        rolledBackAt: {
          lt: cutoffDate,
        },
      },
    })
    console.log(`Deleted ${rollbackResult.count} old rollback records`)
    totalCleaned += rollbackResult.count

    await db.job.update({
      where: { id: job.id },
      data: { progress: 30 }
    })

    // 2. Delete old completed/failed jobs (older than 30 days)
    console.log('Cleaning up old completed jobs...')
    const jobCutoff = new Date()
    jobCutoff.setDate(jobCutoff.getDate() - 30)

    const jobResult = await db.job.deleteMany({
      where: {
        status: { in: ['COMPLETED', 'FAILED', 'CANCELLED'] },
        completedAt: {
          lt: jobCutoff,
        },
      },
    })
    console.log(`Deleted ${jobResult.count} old job records`)
    totalCleaned += jobResult.count

    await db.job.update({
      where: { id: job.id },
      data: { progress: 50 }
    })

    // 3. Delete old read notifications (older than 60 days)
    console.log('Cleaning up old notifications...')
    const notificationCutoff = new Date()
    notificationCutoff.setDate(notificationCutoff.getDate() - 60)

    const notificationResult = await db.notification.deleteMany({
      where: {
        read: true,
        createdAt: {
          lt: notificationCutoff,
        },
      },
    })
    console.log(`Deleted ${notificationResult.count} old notifications`)
    totalCleaned += notificationResult.count

    await db.job.update({
      where: { id: job.id },
      data: { progress: 70 }
    })

    // 4. Delete old audit logs (older than 1 year, except critical actions)
    console.log('Cleaning up old audit logs...')
    const auditCutoff = new Date()
    auditCutoff.setFullYear(auditCutoff.getFullYear() - 1)

    const auditResult = await db.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: auditCutoff,
        },
        // Keep critical actions longer
        action: {
          notIn: [
            'USER_CREATED',
            'USER_DELETED',
            'PLAN_UPGRADED',
            'PLAN_DOWNGRADED',
            'PAYMENT_FAILED',
            'SECURITY_ALERT'
          ]
        }
      },
    })
    console.log(`Deleted ${auditResult.count} old audit logs`)
    totalCleaned += auditResult.count

    await db.job.update({
      where: { id: job.id },
      data: { progress: 85 }
    })

    // 5. Delete old expired CSRF tokens
    console.log('Cleaning up expired CSRF tokens...')
    const csrfResult = await db.cSRFToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    console.log(`Deleted ${csrfResult.count} expired CSRF tokens`)
    totalCleaned += csrfResult.count

    await db.job.update({
      where: { id: job.id },
      data: { progress: 95 }
    })

    // 6. Delete orphaned crawl records (older than 90 days)
    console.log('Cleaning up old crawl records...')
    const crawlResult = await db.crawl.deleteMany({
      where: {
        status: { in: ['COMPLETED', 'FAILED'] },
        completedAt: {
          lt: cutoffDate,
        },
      },
    })
    console.log(`Deleted ${crawlResult.count} old crawl records`)
    totalCleaned += crawlResult.count

    console.log(`Cleanup completed: ${totalCleaned} records removed`)
  } catch (error) {
    console.error('Cleanup job failed:', error)
    throw error
  }
}
