/**
 * Team Members API
 * Manage team members
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { removeMember, updateMemberRole } from '@/lib/teams'
import { TeamRole } from '@prisma/client'

export const dynamic = 'force-dynamic'

/**
 * Update member role
 */
export async function PATCH(
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
    const { userId: targetUserId, role } = body as {
      userId: string
      role: TeamRole
    }

    if (!targetUserId || !role) {
      return NextResponse.json(
        { error: 'userId and role are required' },
        { status: 400 }
      )
    }

    const member = await updateMemberRole(params.id, user.id, targetUserId, role)

    return NextResponse.json({
      success: true,
      member,
    })
  } catch (error) {
    console.error('Error updating member role:', error)
    const message =
      error instanceof Error ? error.message : 'Failed to update member role'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * Remove team member
 */
export async function DELETE(
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

    const { searchParams } = new URL(req.url)
    const targetUserId = searchParams.get('userId')

    if (!targetUserId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    await removeMember(params.id, user.id, targetUserId)

    return NextResponse.json({
      success: true,
      message: 'Member removed successfully',
    })
  } catch (error) {
    console.error('Error removing member:', error)
    const message = error instanceof Error ? error.message : 'Failed to remove member'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
