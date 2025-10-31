import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { platform, domain } = await req.json()

    if (!platform || !domain) {
      return NextResponse.json(
        { error: 'Platform and domain are required' },
        { status: 400 }
      )
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    })

    if (!user) {
      // Create user if doesn't exist
      const clerkUser = await auth()
      user = await prisma.user.create({
        data: {
          clerkUserId: userId,
          email: clerkUser.sessionClaims?.email as string || 'unknown@example.com',
          name: clerkUser.sessionClaims?.name as string || null,
        },
      })
    }

    // Create connection
    const connection = await prisma.connection.create({
      data: {
        userId: user.id,
        platform: platform.toUpperCase(),
        domain: domain.toLowerCase().replace(/^https?:\/\//, ''),
        displayName: domain,
        status: 'CONNECTED',
      },
    })

    return NextResponse.json({
      success: true,
      connectionId: connection.id,
      message: 'Site connected successfully',
    })
  } catch (error) {
    console.error('Connect site error:', error)
    return NextResponse.json(
      { error: 'Failed to connect site' },
      { status: 500 }
    )
  }
}
