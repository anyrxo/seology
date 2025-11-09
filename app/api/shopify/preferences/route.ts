/**
 * API Route: Save User Preferences
 * Save onboarding selections and user preferences
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

    const { aiChatEnabled, preferredAuditScope } = await req.json()

    // Update user preferences (using raw SQL to bypass Prisma Accelerate cache issues)
    console.log(`[Preferences] Updating user ${userId} preferences...`)

    // Build SET clause dynamically based on provided fields
    const updates: string[] = []
    const values: Array<boolean | string> = []
    let paramIndex = 1

    if (typeof aiChatEnabled === 'boolean') {
      updates.push(`"aiChatEnabled" = $${paramIndex}`)
      values.push(aiChatEnabled)
      paramIndex++
    }

    if (preferredAuditScope) {
      updates.push(`"preferredAuditScope" = $${paramIndex}`)
      values.push(preferredAuditScope)
      paramIndex++
    }

    // Always update updatedAt
    updates.push('"updatedAt" = NOW()')

    if (updates.length > 0) {
      await db.$executeRawUnsafe(
        `UPDATE "User" SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
        ...values,
        userId
      )
    }

    // Fetch updated user to return current values
    const updatedUser = await db.user.findUnique({
      where: { id: userId },
      select: { aiChatEnabled: true, preferredAuditScope: true }
    })

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found after update' } },
        { status: 404 }
      )
    }

    console.log(`[Preferences] ✅ Updated user ${userId}:`, updatedUser)

    return NextResponse.json({
      success: true,
      data: updatedUser,
    })
  } catch (error) {
    console.error('Preferences save error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to save preferences' },
      },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId

    // Get user preferences
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        aiChatEnabled: true,
        preferredAuditScope: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        aiChatEnabled: user.aiChatEnabled,
        preferredAuditScope: user.preferredAuditScope,
      },
    })
  } catch (error) {
    console.error('Preferences fetch error:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch preferences' },
      },
      { status: 500 }
    )
  }
}
