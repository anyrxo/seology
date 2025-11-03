/**
 * Accept Team Invitation API
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { acceptInvitation } from '@/lib/teams'

export const dynamic = 'force-dynamic'

/**
 * Accept team invitation
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { clerkId: session.userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await req.json()
    const { token } = body as { token: string }

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    const team = await acceptInvitation(token, user.id)

    return NextResponse.json({
      success: true,
      team,
      message: 'Successfully joined the team',
    })
  } catch (error) {
    console.error('Error accepting invitation:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to accept invitation'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
