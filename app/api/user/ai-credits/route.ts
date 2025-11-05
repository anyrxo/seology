import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAICreditBalance } from '@/lib/ai-credits'

export const dynamic = 'force-dynamic'

/**
 * GET /api/user/ai-credits
 * Get user's AI credit balance
 */
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Get user's database ID
    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Get credit balance
    const balance = await getAICreditBalance(user.id)

    return NextResponse.json({
      success: true,
      data: {
        monthlyCredits: balance.monthlyCredits,
        monthlyUsed: balance.monthlyUsed,
        monthlyRemaining: balance.monthlyRemaining,
        purchasedCredits: balance.purchasedCredits,
        totalAvailable: balance.totalAvailable,
        isUnlimited: balance.isUnlimited,
      },
    })
  } catch (error) {
    console.error('Error fetching AI credits:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch AI credits',
        },
      },
      { status: 500 }
    )
  }
}
