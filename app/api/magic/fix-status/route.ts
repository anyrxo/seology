import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/magic/fix-status
 * Report fix status from Magic.js client
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-seology-key')
    const body = await request.json()
    const { siteId, fixId, status, error, url, timestamp } = body

    if (!apiKey || !siteId || !fixId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify API key and site
    const site = await db.site.findFirst({
      where: {
        id: siteId,
        connection: {
          platform: 'CUSTOM',
          credentials: {
            path: ['apiKey'],
            equals: apiKey,
          },
        },
      },
    })

    if (!site) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update fix status
    const fix = await db.fix.findUnique({
      where: { id: fixId },
      include: { issue: true },
    })

    if (!fix) {
      return NextResponse.json({ error: 'Fix not found' }, { status: 404 })
    }

    if (status === 'success') {
      await db.fix.update({
        where: { id: fixId },
        data: {
          status: 'APPLIED',
          appliedAt: new Date(timestamp),
          rollbackExpiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        },
      })

      // Update issue status if issueId exists
      if (fix.issueId) {
        await db.issue.update({
          where: { id: fix.issueId },
          data: {
            status: 'FIXED',
            fixedAt: new Date(timestamp),
          },
        })
      }

      // Create audit log
      await db.auditLog.create({
        data: {
          siteId: siteId,
          userId: site.userId,
          action: 'MAGIC_JS_FIX_APPLIED',
          resource: 'fix',
          resourceId: fixId,
          details: {
            fixId: fixId,
            fixType: fix.type,
            url: url,
          },
        },
      })
    } else {
      await db.fix.update({
        where: { id: fixId },
        data: {
          status: 'FAILED',
          error: error || 'Unknown error',
        },
      })

      // Update issue status if issueId exists
      if (fix.issueId) {
        await db.issue.update({
          where: { id: fix.issueId },
          data: {
            status: 'FIX_FAILED',
          },
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Fix status updated',
    })
  } catch (error) {
    console.error('Error updating fix status:', error)
    return NextResponse.json(
      {
        error: 'Failed to update fix status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
