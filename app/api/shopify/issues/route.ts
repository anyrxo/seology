/**
 * API Route: Get SEO Issues
 * Fetch all detected SEO issues for a Shopify store
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const connectionId = context.connection.id

    // Get all issues
    const issues = await db.issue.findMany({
      where: {
        connectionId,
      },
      orderBy: [
        { severity: 'asc' }, // Critical first (assuming enum order)
        { detectedAt: 'desc' },
      ],
      take: 200, // Limit to prevent overwhelming
    })

    // Transform to frontend format
    const formattedIssues = issues.map(issue => ({
      id: issue.id,
      type: issue.type,
      title: issue.title,
      description: issue.details || '', // Schema uses 'details' not 'description'
      severity: issue.severity.toLowerCase() as 'critical' | 'high' | 'medium' | 'low',
      pageUrl: issue.pageUrl || '',
      pageTitle: '', // Not in schema, use empty string
      detectedAt: issue.detectedAt,
      status: issue.status,
      currentValue: '', // Not in schema, can be parsed from details JSON if needed
      suggestedValue: issue.recommendation || '', // Use recommendation field
      estimatedImpact: issue.estimatedTraffic ? `+${issue.estimatedTraffic} visitors/month` : '',
    }))

    return NextResponse.json({
      success: true,
      data: formattedIssues,
    })
  } catch (error) {
    console.error('Issues fetch error:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch issues' } },
      { status: 500 }
    )
  }
}
