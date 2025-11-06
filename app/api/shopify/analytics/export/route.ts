/**
 * API Route: Export Analytics Data
 * POST: Generate CSV or PDF export
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const body = await req.json()
    const { format, startDate, endDate } = body

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
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

    // Parse dates
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    // Get all logs
    const logs = await db.aPIUsageLog.findMany({
      where: {
        userId: connection.userId,
        shop,
        timestamp: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    })

    if (format === 'csv') {
      // Generate CSV
      const headers = [
        'Date',
        'Time',
        'Endpoint',
        'Model',
        'Input Tokens',
        'Output Tokens',
        'Total Tokens',
        'Cost (USD)',
        'Latency (ms)',
        'Status',
      ]

      const rows = logs.map((log) => [
        log.timestamp.toISOString().split('T')[0],
        log.timestamp.toTimeString().split(' ')[0],
        log.endpoint,
        log.model,
        log.inputTokens,
        log.outputTokens,
        log.totalTokens,
        log.totalCost.toFixed(6),
        log.latencyMs || 'N/A',
        log.status,
      ])

      const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-export-${shop}-${start.toISOString().split('T')[0]}-${end.toISOString().split('T')[0]}.csv"`,
        },
      })
    } else if (format === 'pdf') {
      // For PDF, we'd use a library like jsPDF or puppeteer
      // For MVP, return summary data as JSON that frontend can convert
      const summary = {
        shop,
        period: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
        totalCalls: logs.length,
        totalCost: logs.reduce((sum, log) => sum + log.totalCost, 0),
        totalTokens: logs.reduce((sum, log) => sum + log.totalTokens, 0),
        byEndpoint: {} as Record<string, number>,
        byModel: {} as Record<string, number>,
      }

      // Group by endpoint and model
      for (const log of logs) {
        summary.byEndpoint[log.endpoint] = (summary.byEndpoint[log.endpoint] || 0) + 1
        summary.byModel[log.model] = (summary.byModel[log.model] || 0) + 1
      }

      return NextResponse.json({
        success: true,
        data: summary,
        message: 'PDF generation: Use browser print to PDF or implement server-side PDF generation',
      })
    } else {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_FORMAT', message: 'Format must be csv or pdf' } },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to export data' } },
      { status: 500 }
    )
  }
}
