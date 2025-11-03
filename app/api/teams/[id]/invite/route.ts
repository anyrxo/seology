/**
 * Team Invitations API
 * Invite users to team
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { inviteToTeam } from '@/lib/teams'
import { TeamRole } from '@prisma/client'

export const dynamic = 'force-dynamic'

/**
 * Invite user to team
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { email, role } = body as { email: string; role?: TeamRole }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const invitation = await inviteToTeam(
      params.id,
      user.id,
      email,
      role || 'MEMBER'
    )

    return NextResponse.json({
      success: true,
      invitation,
    })
  } catch (error) {
    console.error('Error inviting user:', error)
    const message = error instanceof Error ? error.message : 'Failed to invite user'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
