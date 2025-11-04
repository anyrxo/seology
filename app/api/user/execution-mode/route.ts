import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET - Get user's current execution mode
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { executionMode: true },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        executionMode: user.executionMode,
      },
    })
  } catch (error) {
    console.error('Error fetching execution mode:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch execution mode',
        },
      },
      { status: 500 }
    )
  }
}

// PUT - Update user's execution mode
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { executionMode } = body

    if (!executionMode || !['AUTOMATIC', 'PLAN', 'APPROVE'].includes(executionMode)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Invalid execution mode' } },
        { status: 400 }
      )
    }

    const user = await db.user.update({
      where: { clerkId: userId },
      data: { executionMode },
      select: { executionMode: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        executionMode: user.executionMode,
      },
    })
  } catch (error) {
    console.error('Error updating execution mode:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update execution mode',
        },
      },
      { status: 500 }
    )
  }
}
