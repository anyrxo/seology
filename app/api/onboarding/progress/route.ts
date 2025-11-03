/**
 * API Route: Save Onboarding Progress
 * POST /api/onboarding/progress
 */

import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { businessType, platform, businessName, businessStage, step } = body

    // Update user's onboarding data
    const updatedUser = await db.user.update({
      where: { clerkId: userId },
      data: {
        onboardingStep: step || 0,
        ...(businessType && { businessType }),
        ...(platform && { platform }),
        ...(businessName && { businessName }),
        ...(businessStage && { businessStage }),
        ...(step === 7 && { onboardingCompleted: true }),
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        onboardingStep: updatedUser.onboardingStep,
        onboardingCompleted: updatedUser.onboardingCompleted,
      },
    })
  } catch (error) {
    console.error('Onboarding progress error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to save onboarding progress',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
