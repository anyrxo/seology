/**
 * API Route: Mark Onboarding Complete
 * Updates user's onboarding status after completing the onboarding flow
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId

    const { completed } = await req.json()

    // Mark onboarding as complete (using raw SQL to bypass Prisma Accelerate cache issues)
    console.log(`[Onboarding] Marking user ${userId} onboarding as complete: ${completed}`)

    await db.$executeRaw`
      UPDATE "User"
      SET "onboardingCompleted" = ${completed}, "updatedAt" = NOW()
      WHERE id = ${userId}
    `

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        action: 'ONBOARDING_COMPLETED',
        resource: 'user',
        resourceId: userId,
        details: JSON.stringify({
          shop: context.shop,
          completedAt: new Date().toISOString(),
        }),
      },
    })

    console.log(`[Onboarding] ✅ User ${userId} onboarding marked as ${completed ? 'complete' : 'incomplete'}`)

    return NextResponse.json({
      success: true,
      data: {
        onboardingCompleted: completed,
      },
    })
  } catch (error) {
    console.error('[Onboarding] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update onboarding status',
          details: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500 }
    )
  }
}
