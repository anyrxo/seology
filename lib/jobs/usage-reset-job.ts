import { db } from '../db'
import { UsageResetJobPayload } from '../queue'

export interface UsageResetJobResult {
  success: boolean
  usersReset: number
  error?: string
}

/**
 * Process a monthly usage reset job
 * This runs at the start of each month to reset usage counters
 */
export async function processUsageResetJob(
  payload: UsageResetJobPayload
): Promise<UsageResetJobResult> {
  try {
    const { month } = payload

    // Parse month (YYYY-MM format)
    const [year, monthNum] = month.split('-').map(Number)
    const monthDate = new Date(year, monthNum - 1, 1)

    // Get all active users
    const users = await db.user.findMany({
      where: {
        subscription: {
          status: {
            in: ['ACTIVE', 'TRIALING'],
          },
        },
      },
      select: {
        id: true,
      },
    })

    // Create or reset usage records for each user
    const usagePromises = users.map(async (user) => {
      // Check if usage record already exists for this month
      const existingUsage = await db.usage.findUnique({
        where: {
          userId_month: {
            userId: user.id,
            month: monthDate,
          },
        },
      })

      if (existingUsage) {
        // Reset existing usage
        return db.usage.update({
          where: {
            userId_month: {
              userId: user.id,
              month: monthDate,
            },
          },
          data: {
            fixesApplied: 0,
            aiCallsMade: 0,
            sitesConnected: 0,
          },
        })
      } else {
        // Create new usage record
        return db.usage.create({
          data: {
            userId: user.id,
            month: monthDate,
            fixesApplied: 0,
            aiCallsMade: 0,
            sitesConnected: 0,
          },
        })
      }
    })

    await Promise.all(usagePromises)

    return {
      success: true,
      usersReset: users.length,
    }
  } catch (error) {
    console.error('Usage reset job error:', error)
    return {
      success: false,
      usersReset: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
