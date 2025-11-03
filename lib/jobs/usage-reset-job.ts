/**
 * Usage Reset Job
 *
 * Resets monthly usage quotas for all users
 * Sends usage reports and notifications
 */

import { db } from '../db'
import type { Job } from '@prisma/client'
import { resetMonthlyUsage } from '../usage'

/**
 * Execute monthly usage reset job
 */
export async function resetUsageJob(job: Job): Promise<void> {
  console.log(`Starting monthly usage reset job ${job.id}`)

  try {
    // Update job progress
    await db.job.update({
      where: { id: job.id },
      data: { progress: 10 }
    })

    // Reset monthly usage for all users
    const result = await resetMonthlyUsage()

    await db.job.update({
      where: { id: job.id },
      data: { progress: 90 }
    })

    console.log(`Monthly usage reset completed: ${result.usersProcessed} users processed, ${result.errors} errors`)
  } catch (error) {
    console.error('Usage reset failed:', error)
    throw error
  }
}
