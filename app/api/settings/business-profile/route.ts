import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

/**
 * PATCH /api/settings/business-profile
 * Update user's business profile information
 */
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { businessName, businessType, businessStage, platform } = body

    // Find the user in database
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update business profile
    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        businessName: businessName || null,
        businessType: businessType || null,
        businessStage: businessStage || null,
        platform: platform || null,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        businessName: updatedUser.businessName,
        businessType: updatedUser.businessType,
        businessStage: updatedUser.businessStage,
        platform: updatedUser.platform,
      }
    })
  } catch (error) {
    console.error('Error updating business profile:', error)
    return NextResponse.json(
      { error: 'Failed to update business profile' },
      { status: 500 }
    )
  }
}
