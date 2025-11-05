import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Mark this route as dynamic (uses auth/headers)
export const dynamic = 'force-dynamic'

// GET - Load chat history for the user
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    // Get or create active conversation for this user
    let conversation = await db.aIConversation.findFirst({
      where: {
        userId,
        isArchived: false,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    // If no conversation exists, create one
    if (!conversation) {
      conversation = await db.aIConversation.create({
        data: {
          userId,
          title: 'SEO Assistance',
        },
        include: {
          messages: true,
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        conversationId: conversation.id,
        messages: conversation.messages.map((msg) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: msg.createdAt,
        })),
      },
    })
  } catch (error) {
    console.error('Error loading chat history:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to load chat history',
        },
      },
      { status: 500 }
    )
  }
}

// POST - Save a new message
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
    const { conversationId, role, content } = body

    if (!conversationId || !role || !content) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Missing required fields' } },
        { status: 400 }
      )
    }

    // Verify conversation belongs to user
    const conversation = await db.aIConversation.findFirst({
      where: {
        id: conversationId,
        userId,
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Conversation not found' } },
        { status: 404 }
      )
    }

    // Save the message
    const message = await db.chatMessage.create({
      data: {
        conversationId,
        role,
        content,
      },
    })

    // Update conversation updatedAt
    await db.aIConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: message.id,
        role: message.role,
        content: message.content,
        timestamp: message.createdAt,
      },
    })
  } catch (error) {
    console.error('Error saving message:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to save message',
        },
      },
      { status: 500 }
    )
  }
}
