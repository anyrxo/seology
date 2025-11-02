/**
 * Magic.js API: Get Pending Fixes
 * Returns fixes that need to be applied client-side
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  const siteId = params.siteId

  try {
    // Get pending fixes for this site
    const fixes = await db.fix.findMany({
      where: {
        connectionId: siteId,
        status: 'PENDING',
      },
      include: {
        issue: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50, // Limit to prevent large payloads
    })

    // Transform fixes into Magic.js format
    const magicFixes = fixes.map((fix) => {
      let fixData
      try {
        fixData = JSON.parse(fix.changes)
      } catch {
        fixData = { selector: 'body', value: fix.changes }
      }

      return {
        id: fix.id,
        type: fix.issue?.type || 'content',
        selector: fixData.selector || 'body',
        value: fixData.value || fix.changes,
        oldValue: fixData.oldValue,
        html: fixData.html || false,
        description: fix.description,
      }
    })

    return NextResponse.json({
      success: true,
      fixes: magicFixes,
      count: magicFixes.length,
    })
  } catch (error) {
    console.error('Error fetching Magic.js fixes:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch fixes',
        fixes: [],
      },
      { status: 500 }
    )
  }
}
