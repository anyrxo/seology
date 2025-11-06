import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAICreditBalance } from '@/lib/ai-credits'
import { AICreditPurchase, UsageRecord } from '@prisma/client'

export const dynamic = 'force-dynamic'

type CreditAdjustmentResult = AICreditPurchase | UsageRecord | { count: number }

/**
 * GET /api/admin/users/[userId]/credits
 * Get user's AI credit balance (admin only)
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Check if user is admin
    const adminUser = await db.user.findUnique({
      where: { clerkId },
      select: { role: true },
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    // Get target user's credit balance
    const balance = await getAICreditBalance(params.userId)

    // Get purchased credits details
    const purchases = await db.aICreditPurchase.findMany({
      where: {
        userId: params.userId,
        creditsRemaining: { gt: 0 },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        creditsAmount: true,
        creditsUsed: true,
        creditsRemaining: true,
        expiresAt: true,
        createdAt: true,
      },
    })

    // Get current month's usage record
    const now = new Date()
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

    const usageRecord = await db.usageRecord.findUnique({
      where: {
        userId_period: {
          userId: params.userId,
          period: periodStart,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        balance,
        purchases,
        currentMonthUsage: usageRecord?.aiCreditsUsed || 0,
      },
    })
  } catch (error) {
    console.error('Error fetching user credits:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to fetch credits',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/admin/users/[userId]/credits
 * Add or adjust user's AI credits (admin only)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Check if user is admin
    const adminUser = await db.user.findUnique({
      where: { clerkId },
      select: { role: true, id: true },
    })

    if (!adminUser || adminUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Admin access required' } },
        { status: 403 }
      )
    }

    const body = await req.json()
    const { credits, action, reason } = body

    if (!credits || credits <= 0) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Credits must be a positive number' } },
        { status: 400 }
      )
    }

    if (!action || !['ADD', 'SET', 'RESET'].includes(action)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Action must be ADD, SET, or RESET' } },
        { status: 400 }
      )
    }

    // Get target user
    const targetUser = await db.user.findUnique({
      where: { id: params.userId },
      select: { id: true, email: true, name: true },
    })

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    // Handle different actions
    let result: CreditAdjustmentResult | undefined

    if (action === 'ADD') {
      // Add purchased credits (never expire, free admin grant)
      result = await db.aICreditPurchase.create({
        data: {
          userId: params.userId,
          creditsAmount: credits,
          pricePerCredit: 0, // Free admin grant
          totalPrice: 0,
          creditsUsed: 0,
          creditsRemaining: credits,
          status: 'COMPLETED',
          expiresAt: null, // Never expire
          stripePaymentId: null,
        },
      })
    } else if (action === 'SET') {
      // Set monthly usage to a specific value
      const now = new Date()
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

      const user = await db.user.findUnique({
        where: { id: params.userId },
        select: { plan: true },
      })

      if (!user) {
        return NextResponse.json(
          { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
          { status: 404 }
        )
      }

      const planLimits = await import('@/lib/plans').then(m => m.getPlan(user.plan))

      result = await db.usageRecord.upsert({
        where: {
          userId_period: {
            userId: params.userId,
            period: periodStart,
          },
        },
        create: {
          userId: params.userId,
          period: periodStart,
          aiCreditsUsed: credits,
          sitesLimit: planLimits.limits.sites,
          fixesLimit: planLimits.limits.fixesPerMonth,
          aiCreditsLimit: planLimits.limits.aiCreditsPerMonth,
        },
        update: {
          aiCreditsUsed: credits,
        },
      })
    } else if (action === 'RESET') {
      // Reset current month's usage to 0
      const now = new Date()
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1)

      result = await db.usageRecord.updateMany({
        where: {
          userId: params.userId,
          period: periodStart,
        },
        data: {
          aiCreditsUsed: 0,
        },
      })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: params.userId,
        action: 'ADMIN_CREDIT_ADJUSTMENT',
        resource: 'ai_credits',
        resourceId: result && 'id' in result ? result.id : 'N/A',
        details: JSON.stringify({
          action,
          credits,
          reason,
          performedBy: adminUser.id,
          targetUser: {
            id: targetUser.id,
            email: targetUser.email,
            name: targetUser.name,
          },
        }),
      },
    })

    // Create notification for user
    const notificationMessage = action === 'ADD'
      ? `🎉 You've received ${credits} AI chat credits${reason ? `: ${reason}` : '!'}`
      : action === 'SET'
        ? `Your AI chat credits have been adjusted to ${credits}${reason ? `: ${reason}` : ''}`
        : `Your AI chat credits have been reset${reason ? `: ${reason}` : ''}`

    await db.notification.create({
      data: {
        userId: params.userId,
        title: 'AI Credits Updated',
        message: notificationMessage,
        type: 'INFO',
        read: false,
      },
    })

    // Get updated balance
    const updatedBalance = await getAICreditBalance(params.userId)

    return NextResponse.json({
      success: true,
      data: {
        balance: updatedBalance,
        action,
        credits,
      },
      message: `Successfully ${action === 'ADD' ? 'added' : action === 'SET' ? 'set' : 'reset'} credits for user`,
    })
  } catch (error) {
    console.error('Error adjusting user credits:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: error instanceof Error ? error.message : 'Failed to adjust credits',
        },
      },
      { status: 500 }
    )
  }
}
