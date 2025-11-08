/**
 * API Route: Mark Onboarding Complete
 * Updates user's onboarding status after completing the onboarding flow
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shop = searchParams.get('shop')
    const { completed } = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection to get user
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
      select: {
        userId: true,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Mark onboarding as complete (using raw SQL to bypass Prisma Accelerate cache issues)
    console.log(`[Onboarding] Marking user ${connection.userId} onboarding as complete: ${completed}`)

    await db.$executeRaw`
      UPDATE "User"
      SET "onboardingCompleted" = ${completed}, "updatedAt" = NOW()
      WHERE id = ${connection.userId}
    `

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: connection.userId,
        action: 'ONBOARDING_COMPLETED',
        resource: 'user',
        resourceId: connection.userId,
        details: JSON.stringify({
          shop,
          completedAt: new Date().toISOString(),
        }),
      },
    })

    console.log(`[Onboarding] ✅ User ${connection.userId} onboarding marked as ${completed ? 'complete' : 'incomplete'}`)

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
