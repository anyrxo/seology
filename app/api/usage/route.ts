/**
 * API Route: Get Usage Information
 * GET /api/usage
 *
 * Returns current usage statistics and plan limits
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getUsageSummary, shouldPromptUpgrade } from '@/lib/usage'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findFirst({
      where: { clerkId: session.userId }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Get usage summary
    const usage = await getUsageSummary(user.id)

    // Check if should prompt upgrade
    const upgradePrompt = await shouldPromptUpgrade(user.id)

    return NextResponse.json({
      success: true,
      data: {
        usage,
        upgradePrompt
      }
    })
  } catch (error) {
    console.error('Error getting usage:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to get usage information',
          details: error instanceof Error ? error.message : 'Unknown error'
        }
      },
      { status: 500 }
    )
  }
}
