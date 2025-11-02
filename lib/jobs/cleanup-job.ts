/**
 * Cleanup Rollbacks Job
 *
 * Removes rollback data older than 90 days
 */

import { db } from '../db'

export async function cleanupRollbacksJob() {
  console.log('Starting rollback cleanup...')

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 90)

  try {
    // Delete old fixes that have been rolled back
    const result = await db.fix.deleteMany({
      where: {
        status: 'ROLLED_BACK',
        rolledBackAt: {
          lt: cutoffDate,
        },
      },
    })

    console.log(`✓ Cleaned up ${result.count} old rollback records`)
  } catch (error) {
    console.error('Rollback cleanup failed:', error)
    throw error
  }
}
