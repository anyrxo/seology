import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { db } from './db'
import {
  canAddSite,
  canApplyFix,
  canMakeAIAnalysis,
  canUseMode,
  incrementUsage,
} from './subscription-guard'

/**
 * Get authenticated user from Clerk and database
 */
export async function getAuthenticatedUser() {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return null
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
    include: { subscription: true },
  })

  if (!dbUser) {
    // Create user if doesn't exist
    const newUser = await db.user.create({
      data: {
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: clerkUser.fullName || undefined,
      },
      include: { subscription: true },
    })
    return newUser
  }

  return dbUser
}

/**
 * Middleware to check if user can add a site
 */
export async function checkCanAddSite(userId: string) {
  const check = await canAddSite(userId)

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'LIMIT_REACHED',
        message: check.reason,
      },
      { status: 403 }
    )
  }

  return null
}

/**
 * Middleware to check if user can apply a fix
 */
export async function checkCanApplyFix(userId: string) {
  const check = await canApplyFix(userId)

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'LIMIT_REACHED',
        message: check.reason,
      },
      { status: 403 }
    )
  }

  return null
}

/**
 * Middleware to check if user can make an AI analysis
 */
export async function checkCanMakeAIAnalysis(userId: string) {
  const check = await canMakeAIAnalysis(userId)

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'LIMIT_REACHED',
        message: check.reason,
      },
      { status: 403 }
    )
  }

  return null
}

/**
 * Middleware to check if user can use execution mode
 */
export async function checkCanUseMode(
  userId: string,
  mode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
) {
  const check = await canUseMode(userId, mode)

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'FEATURE_NOT_AVAILABLE',
        message: check.reason,
      },
      { status: 403 }
    )
  }

  return null
}

/**
 * Track usage after successful operation
 */
export async function trackUsage(
  userId: string,
  type: 'fix' | 'ai' | 'site'
) {
  try {
    await incrementUsage(userId, type)
  } catch (error) {
    console.error('Error tracking usage:', error)
    // Don't fail the request if usage tracking fails
  }
}

/**
 * Example usage in API route:
 *
 * export async function POST(req: NextRequest) {
 *   const user = await getAuthenticatedUser()
 *   if (!user) {
 *     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 *   }
 *
 *   // Check if user can apply fix
 *   const limitCheck = await checkCanApplyFix(user.id)
 *   if (limitCheck) return limitCheck
 *
 *   // Apply fix logic here...
 *   const fix = await applyFix(...)
 *
 *   // Track usage
 *   await trackUsage(user.id, 'fix')
 *
 *   return NextResponse.json({ success: true, fix })
 * }
 */
