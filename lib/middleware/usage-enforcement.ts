import { NextResponse } from 'next/server'
import { checkUsageLimit, getUpgradeMessage } from '../usage'
import { db } from '../db'

/**
 * Enforce usage limits before allowing an operation
 * Returns NextResponse with 402 Payment Required if limit is reached
 */
export async function enforceUsageLimit(
  userId: string,
  limitType: 'fixes' | 'sites' | 'aiAnalyses'
): Promise<{ allowed: boolean; response?: NextResponse }> {
  // Get the user's internal database ID from Clerk ID
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  })

  if (!user) {
    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      ),
    }
  }

  // Check usage limit
  const limitCheck = await checkUsageLimit(user.id, limitType)

  if (!limitCheck.allowed) {
    const upgradeMessage = getUpgradeMessage(user.plan)

    return {
      allowed: false,
      response: NextResponse.json(
        {
          success: false,
          error: 'Usage limit reached',
          message: limitCheck.message,
          usage: {
            current: limitCheck.current,
            limit: limitCheck.limit,
            type: limitType,
          },
          upgrade: {
            message: upgradeMessage,
            currentPlan: user.plan,
          },
        },
        { status: 402 } // 402 Payment Required
      ),
    }
  }

  return { allowed: true }
}

/**
 * Middleware helper to check fix limits before executing
 */
export async function checkFixLimit(clerkUserId: string): Promise<NextResponse | null> {
  const result = await enforceUsageLimit(clerkUserId, 'fixes')
  return result.allowed ? null : result.response!
}

/**
 * Middleware helper to check site connection limits
 */
export async function checkSiteLimit(clerkUserId: string): Promise<NextResponse | null> {
  const result = await enforceUsageLimit(clerkUserId, 'sites')
  return result.allowed ? null : result.response!
}

/**
 * Middleware helper to check AI analysis limits
 */
export async function checkAILimit(clerkUserId: string): Promise<NextResponse | null> {
  const result = await enforceUsageLimit(clerkUserId, 'aiAnalyses')
  return result.allowed ? null : result.response!
}

/**
 * Get user's internal DB ID from Clerk user ID
 */
export async function getUserDbId(clerkUserId: string): Promise<string | null> {
  const user = await db.user.findUnique({
    where: { clerkUserId },
  })
  return user?.id || null
}
