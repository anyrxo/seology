import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { executionMode } = await req.json()

    if (!executionMode || !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        { error: 'Valid execution mode is required' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update execution mode
    await prisma.user.update({
      where: { id: user.id },
      data: { executionMode },
    })

    return NextResponse.json({
      success: true,
      message: 'Execution mode updated',
      executionMode,
    })
  } catch (error) {
    console.error('Execution mode update error:', error)
    return NextResponse.json(
      { error: 'Failed to update execution mode' },
      { status: 500 }
    )
  }
}
