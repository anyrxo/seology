/**
 * Admin Guard Middleware
 * Verifies user has ADMIN role before allowing access to admin routes
 */

import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Check if a user has admin role
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    select: { role: true },
  })

  return user?.role === 'ADMIN'
}

/**
 * Verify admin access and return user or error response
 */
export async function verifyAdmin(): Promise<
  { userId: string } | { error: NextResponse }
> {
  const session = await auth()

  if (!session?.userId) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      ),
    }
  }

  const hasAdminRole = await isAdmin(session.userId)

  if (!hasAdminRole) {
    return {
      error: NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'Admin access required. Contact support if you believe this is an error.',
          },
        },
        { status: 403 }
      ),
    }
  }

  return { userId: session.userId }
}
