/**
 * Individual Team API
 * Get, update, or delete a specific team
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { getTeam, updateTeam, deleteTeam } from '@/lib/teams'

export const dynamic = 'force-dynamic'

/**
 * Get team details
 */
export async function GET(
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

    const team = await getTeam(params.id, user.id)

    return NextResponse.json({
      success: true,
      team,
    })
  } catch (error) {
    console.error('Error fetching team:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch team'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * Update team
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
    const { name, description } = body as { name?: string; description?: string }

    const team = await updateTeam(params.id, user.id, { name, description })

    return NextResponse.json({
      success: true,
      team,
    })
  } catch (error) {
    console.error('Error updating team:', error)
    const message = error instanceof Error ? error.message : 'Failed to update team'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

/**
 * Delete team
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

    await deleteTeam(params.id, user.id)

    return NextResponse.json({
      success: true,
      message: 'Team deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting team:', error)
    const message = error instanceof Error ? error.message : 'Failed to delete team'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
