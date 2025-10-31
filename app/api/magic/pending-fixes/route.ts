import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * GET /api/magic/pending-fixes?siteId=xxx
 * Get pending fixes for a site to apply via Magic.js
 */
export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-seology-key')
    const { searchParams } = new URL(request.url)
    const siteId = searchParams.get('siteId')

    if (!apiKey || !siteId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify API key
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

    // Get pending fixes that are approved and ready to apply
    const fixes = await db.fix.findMany({
      where: {
        issue: {
          siteId: siteId,
          status: 'DETECTED',
        },
        status: 'PENDING',
      },
      include: {
        issue: true,
      },
      orderBy: {
        createdAt: 'desc', // Apply most recent fixes first
      },
      take: 10, // Limit to 10 fixes at a time
    })

    // Transform fixes into magic.js format
    const magicFixes = fixes
      .filter(fix => fix.issue !== null)
      .map(fix => ({
        id: fix.id,
        type: fix.type,
        description: fix.claudeReasoning || undefined,
        page: fix.issue!.pageUrl,
        data: fix.afterState,
      }))

    return NextResponse.json({
      success: true,
      fixes: magicFixes,
    })
  } catch (error) {
    console.error('Error fetching pending fixes:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch pending fixes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
