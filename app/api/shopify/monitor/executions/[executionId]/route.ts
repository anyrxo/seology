/**
 * API Route: Single Execution Details
 * Get detailed information about a specific execution
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { executionId: string } }
) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')
    const { executionId } = params

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

    // Fetch execution details
    const execution = await db.agentExecution.findUnique({
      where: {
        id: executionId,
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
            specialty: true,
            icon: true,
            color: true,
          },
        },
      },
    })

    if (!execution) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Execution not found' } },
        { status: 404 }
      )
    }

    // Verify it belongs to this connection
    if (execution.connectionId !== connection.id) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // Parse logs if available (stored in metadata field or separate table)
    const logs: string[] = []
    // In production, you might have a separate logs table or store logs in metadata

    return NextResponse.json({
      success: true,
      data: {
        ...execution,
        logs,
      },
    })
  } catch (error) {
    console.error('Error fetching execution details:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch execution details' } },
      { status: 500 }
    )
  }
}
