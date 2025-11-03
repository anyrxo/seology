/**
 * Usage API Endpoint
 * Returns current usage statistics for the authenticated user
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getUsageSummary, shouldPromptUpgrade } from '@/lib/usage'

export const dynamic = 'force-dynamic'

/**
 * GET /api/billing/usage
 * Get current usage statistics
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required',
          },
        },
        { status: 401 }
      )
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
      select: { id: true, plan: true },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        },
        { status: 404 }
      )
    }

    // Get usage summary
    const usage = await getUsageSummary(user.id)

    // Check if should prompt for upgrade
    const upgradePrompt = await shouldPromptUpgrade(user.id)

    return NextResponse.json({
      success: true,
      data: {
        usage,
        upgradePrompt,
      },
    })
  } catch (error) {
    console.error('Error fetching usage:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch usage statistics',
        },
      },
      { status: 500 }
    )
  }
}
