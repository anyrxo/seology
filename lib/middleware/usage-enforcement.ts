/**
 * Usage Enforcement Middleware
 *
 * Enforces usage limits on API routes before actions are executed
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { canAddSite, canApplyFixes } from '@/lib/usage'

export type UsageAction = 'ADD_SITE' | 'APPLY_FIX' | 'APPLY_FIXES_BATCH'

interface UsageEnforcementOptions {
  action: UsageAction
  fixCount?: number
}

/**
 * Middleware function to enforce usage limits
 * Returns null if allowed, or a NextResponse with error if blocked
 */
export async function enforceUsageLimit(
  options: UsageEnforcementOptions
): Promise<NextResponse | null> {
  const { action, fixCount = 1 } = options

  // Get authenticated user
  const session = await auth()
  if (!session?.userId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication required',
        },
      },
      { status: 401 }
    )
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
    select: { id: true, plan: true },
  })

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      },
      { status: 404 }
    )
  }

  // Check usage limits based on action
  switch (action) {
    case 'ADD_SITE': {
      const check = await canAddSite(user.id)
      if (!check.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'SITE_LIMIT_EXCEEDED',
              message: check.reason || 'Site limit exceeded',
              details: {
                currentCount: check.currentCount,
                limit: check.limit,
                plan: user.plan,
                upgradeUrl: '/dashboard/billing',
              },
            },
          },
          { status: 403 }
        )
      }
      break
    }

    case 'APPLY_FIX':
    case 'APPLY_FIXES_BATCH': {
      const check = await canApplyFixes(user.id, fixCount)
      if (!check.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'FIX_LIMIT_EXCEEDED',
              message: check.reason || 'Monthly fix limit exceeded',
              details: {
                currentCount: check.currentCount,
                limit: check.limit,
                remaining: check.remaining,
                plan: user.plan,
                upgradeUrl: '/dashboard/billing',
              },
            },
          },
          { status: 403 }
        )
      }
      break
    }

    default:
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_ACTION',
            message: 'Invalid usage action',
          },
        },
        { status: 400 }
      )
  }

  // Usage is within limits
  return null
}

/**
 * Context type for Next.js route handlers
 */
interface RouteContext {
  params?: Record<string, string>
}

/**
 * Higher-order function to wrap API route handlers with usage enforcement
 */
export function withUsageEnforcement(
  action: UsageAction,
  handler: (req: NextRequest, context?: RouteContext) => Promise<NextResponse>
) {
  return async (req: NextRequest, context?: RouteContext): Promise<NextResponse> => {
    // Extract fix count from request body if applicable
    let fixCount = 1
    if (action === 'APPLY_FIXES_BATCH') {
      try {
        const body = await req.json()
        fixCount = body.fixIds?.length || body.issueIds?.length || 1

        // Re-create request with body (since it was consumed)
        req = new NextRequest(req.url, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(body),
        })
      } catch (error) {
        // Body parsing failed, proceed with default
        fixCount = 1
      }
    }

    // Check usage limits
    const limitError = await enforceUsageLimit({ action, fixCount })
    if (limitError) {
      return limitError
    }

    // Execute the original handler
    return handler(req, context)
  }
}

/**
 * Standalone function to check if user can perform action
 * Useful for checking before showing UI elements
 */
/**
 * Usage permission check result
 */
interface UsagePermissionResult {
  allowed: boolean
  reason?: string
  details?: {
    currentCount?: number
    limit?: number
    remaining?: number
  }
}

export async function checkUsagePermission(
  userId: string,
  action: UsageAction,
  fixCount: number = 1
): Promise<UsagePermissionResult> {
  switch (action) {
    case 'ADD_SITE': {
      const check = await canAddSite(userId)
      return {
        allowed: check.allowed,
        reason: check.reason,
        details: {
          currentCount: check.currentCount,
          limit: check.limit,
        },
      }
    }

    case 'APPLY_FIX':
    case 'APPLY_FIXES_BATCH': {
      const check = await canApplyFixes(userId, fixCount)
      return {
        allowed: check.allowed,
        reason: check.reason,
        details: {
          currentCount: check.currentCount,
          limit: check.limit,
          remaining: check.remaining,
        },
      }
    }

    default:
      return {
        allowed: false,
        reason: 'Invalid action',
      }
  }
}
