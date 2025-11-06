/**
 * API Route: Retry Failed Execution
 * Retry a failed agent execution
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { executeAgent } from '@/lib/seo-agents'

export const dynamic = 'force-dynamic'

export async function POST(
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

    // Fetch failed execution
    const failedExecution = await db.agentExecution.findUnique({
      where: {
        id: executionId,
      },
    })

    if (!failedExecution) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Execution not found' } },
        { status: 404 }
      )
    }

    // Verify it belongs to this connection
    if (failedExecution.connectionId !== connection.id) {
      return NextResponse.json(
        { success: false, error: { code: 'FORBIDDEN', message: 'Access denied' } },
        { status: 403 }
      )
    }

    // Only retry failed executions
    if (failedExecution.status !== 'FAILED') {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_STATUS', message: 'Only failed executions can be retried' } },
        { status: 400 }
      )
    }

    // Parse input data
    const targetData = JSON.parse(failedExecution.input)

    // Validate target type
    const validTargetTypes = ['product', 'collection', 'page', 'image', 'batch'] as const
    type TargetType = typeof validTargetTypes[number]

    if (!validTargetTypes.includes(failedExecution.targetType as TargetType)) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_TARGET_TYPE', message: 'Invalid target type' } },
        { status: 400 }
      )
    }

    // Retry execution
    const result = await executeAgent({
      agentId: failedExecution.agentId,
      userId: failedExecution.userId,
      connectionId: failedExecution.connectionId,
      targetType: failedExecution.targetType as TargetType,
      targetId: failedExecution.targetId || undefined,
      targetUrl: failedExecution.targetUrl || undefined,
      targetData,
      batchSize: failedExecution.batchSize,
    })

    return NextResponse.json({
      success: true,
      data: {
        newExecutionId: result.executionId,
        status: result.status,
      },
    })
  } catch (error) {
    console.error('Error retrying execution:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to retry execution' } },
      { status: 500 }
    )
  }
}
