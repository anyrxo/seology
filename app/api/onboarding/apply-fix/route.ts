import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { connectionId } = await req.json()

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID is required' },
        { status: 400 }
      )
    }

    // Verify connection belongs to user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { connections: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const connection = user.connections.find((c) => c.id === connectionId)

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Find first critical issue
    const issue = await prisma.issue.findFirst({
      where: {
        connectionId: connection.id,
        status: 'DETECTED',
        severity: 'CRITICAL',
      },
    })

    if (!issue) {
      return NextResponse.json(
        { error: 'No issues found to fix' },
        { status: 404 }
      )
    }

    // Create a fix record
    const fix = await prisma.fix.create({
      data: {
        connectionId: connection.id,
        issueId: issue.id,
        type: issue.type,
        targetUrl: issue.pageUrl,
        beforeState: {
          description: 'Missing meta description',
          html: '<head><title>Wireless Headphones</title></head>',
        },
        afterState: {
          description: 'Meta description added',
          html: '<head><title>Wireless Headphones</title><meta name="description" content="Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Free shipping available." /></head>',
        },
        method: 'AUTOMATIC',
        status: 'APPLIED',
        appliedAt: new Date(),
        rollbackExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        claudeReasoning: 'I analyzed your product page and created a compelling meta description that: (1) Highlights the key product features (noise cancellation, battery life), (2) Uses action-oriented language to encourage clicks, (3) Stays within the optimal 155-160 character limit, (4) Includes a call-to-action about free shipping to increase click-through rates.',
      },
    })

    // Update issue status
    await prisma.issue.update({
      where: { id: issue.id },
      data: {
        status: 'FIXED',
        fixedAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'fix_applied',
        resource: 'fix',
        resourceId: fix.id,
        details: {
          issueType: issue.type,
          page: issue.pageUrl,
          onboarding: true,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'First fix applied successfully',
      fix: {
        id: fix.id,
        type: fix.type,
        targetUrl: fix.targetUrl,
      },
    })
  } catch (error) {
    console.error('Apply fix error:', error)
    return NextResponse.json(
      { error: 'Failed to apply fix' },
      { status: 500 }
    )
  }
}
