/**
 * Shopify Agents API - Single Agent Operations
 * GET: Get agent details with performance metrics
 * PUT: Update agent
 * DELETE: Delete agent
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getAgentPerformance } from '@/lib/seo-agents'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

interface APIResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string; details?: unknown }
}

interface RouteContext {
  params: {
    agentId: string
  }
}

// GET - Get agent details with performance metrics
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { agentId } = context.params

    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(request)
    if (!authResult.success) {
      return authResult.response
    }

    // Get agent performance data
    const performance = await getAgentPerformance(agentId)

    return NextResponse.json<APIResponse<typeof performance>>({
      success: true,
      data: performance
    })
  } catch (error) {
    console.error('Failed to fetch agent performance:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: 'Failed to fetch agent performance',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}

// PUT - Update agent
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { agentId } = context.params

    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { context: authContext } = authResult
    const userId = authContext.userId

    // Verify ownership
    const existingAgent = await db.sEOAgent.findFirst({
      where: {
        id: agentId,
        userId
      }
    })

    if (!existingAgent) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'AGENT_NOT_FOUND', message: 'Agent not found or you do not have permission' }
      }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      description,
      systemPrompt,
      model,
      temperature,
      maxTokens,
      isPublic,
      isActive
    } = body

    // Update agent
    const updatedAgent = await db.sEOAgent.update({
      where: { id: agentId },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(systemPrompt && { systemPrompt }),
        ...(model && { model }),
        ...(temperature !== undefined && { temperature }),
        ...(maxTokens && { maxTokens }),
        ...(isPublic !== undefined && { isPublic }),
        ...(isActive !== undefined && { isActive }),
      }
    })

    return NextResponse.json<APIResponse<typeof updatedAgent>>({
      success: true,
      data: updatedAgent
    })
  } catch (error) {
    console.error('Failed to update agent:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'UPDATE_FAILED',
        message: 'Failed to update agent',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}

// DELETE - Delete agent
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { agentId } = context.params

    // Verify authentication (session token or shop parameter)
    const authResult = await withShopifyAuth(request)
    if (!authResult.success) {
      return authResult.response
    }

    const { context: authContext } = authResult
    const userId = authContext.userId

    // Verify ownership
    const agent = await db.sEOAgent.findFirst({
      where: {
        id: agentId,
        userId
      }
    })

    if (!agent) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'AGENT_NOT_FOUND', message: 'Agent not found or you do not have permission' }
      }, { status: 404 })
    }

    // Delete agent (cascade will delete executions)
    await db.sEOAgent.delete({
      where: { id: agentId }
    })

    return NextResponse.json<APIResponse<{ id: string }>>({
      success: true,
      data: { id: agentId }
    })
  } catch (error) {
    console.error('Failed to delete agent:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'DELETE_FAILED',
        message: 'Failed to delete agent',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}
