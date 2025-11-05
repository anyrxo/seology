import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getCreditUsageStats } from '@/lib/ai-credits'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

/**
 * GET /api/credits/balance
 * Get user's current AI credit balance and usage statistics
 */
export async function GET() {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user ID from Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true, plan: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get credit usage stats
    const stats = await getCreditUsageStats(user.id)

    return NextResponse.json({
      success: true,
      data: {
        plan: user.plan,
        ...stats,
      },
    })
  } catch (error) {
    console.error('Credit balance fetch error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch credit balance',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
