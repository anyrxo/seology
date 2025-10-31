import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { syncShopifyStore } from '@/lib/shopify'
import { checkAILimit, getUserDbId } from '@/lib/middleware/usage-enforcement'
import { trackAIAnalysis } from '@/lib/usage'

/**
 * Trigger AI analysis for a specific site
 * POST /api/sites/:id/analyze
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check AI usage limit before analyzing
    const limitCheck = await checkAILimit(userId)
    if (limitCheck) {
      return limitCheck
    }

    const { id: connectionId } = await params

    // Get connection and verify ownership
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: { user: true },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: 'Site not found' },
        { status: 404 }
      )
    }

    if (connection.user.clerkUserId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Trigger analysis based on platform
    let result

    switch (connection.platform) {
      case 'SHOPIFY':
        result = await syncShopifyStore(connectionId)
        break

      case 'WORDPRESS':
        // TODO: Implement WordPress analysis
        return NextResponse.json(
          { success: false, error: 'WordPress analysis coming soon' },
          { status: 501 }
        )

      case 'CUSTOM':
        // TODO: Implement custom site analysis
        return NextResponse.json(
          { success: false, error: 'Custom site analysis coming soon' },
          { status: 501 }
        )

      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported platform' },
          { status: 400 }
        )
    }

    // Track AI analysis usage
    const userDbId = await getUserDbId(userId)
    if (userDbId && result.success) {
      await trackAIAnalysis(userDbId, connectionId)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Site analysis error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to analyze site' },
      { status: 500 }
    )
  }
}
