/**
 * API Route: Get SEO Issues
 * Fetch all detected SEO issues for a Shopify store
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Find connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Get all issues
    const issues = await db.issue.findMany({
      where: {
        connectionId: connection.id,
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
