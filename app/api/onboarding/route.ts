/**
 * Onboarding Completion API
 * Marks user as having completed onboarding
 * Uses shop parameter for Shopify context (no Clerk)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { completed, shop } = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    if (completed) {
      // Find user by shop connection
      const connection = await db.connection.findFirst({
        where: {
          domain: shop,
          platform: 'SHOPIFY',
          status: 'CONNECTED',
        },
        include: { user: true },
      })

      if (connection) {
        // Mark onboarding as complete
        await db.user.update({
          where: { id: connection.userId },
          data: { onboardingCompleted: true },
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding completion error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update onboarding status' } },
      { status: 500 }
    )
  }
}
