/**
 * Shopify Agents API - List and Create Agents
 * GET: List all agents (templates + user's custom + public)
 * POST: Create new custom agent
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { AGENT_TEMPLATES } from '@/lib/seo-agents'

export const dynamic = 'force-dynamic'

interface APIResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string; details?: unknown }
}

// GET - List all agents
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'MISSING_SHOP', message: 'Shop parameter is required' }
      }, { status: 400 })
    }

    // Get connection for this shop
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED'
      }
    })

    if (!connection) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'CONNECTION_NOT_FOUND', message: 'Shop connection not found' }
      }, { status: 404 })
    }

    // Get user's custom agents
    const customAgents = await db.sEOAgent.findMany({
      where: {
        userId: connection.userId,
        connectionId: connection.id,
        isTemplate: false,
        isPublic: false
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get public agents from marketplace
    const publicAgents = await db.sEOAgent.findMany({
      where: {
        isPublic: true,
        isActive: true,
      },
      orderBy: { rating: 'desc' },
      take: 20 // Limit to top 20 public agents
    })

    // Format custom agents with last used date
    const formattedCustomAgents = await Promise.all(
      customAgents.map(async (agent) => {
        const lastExecution = await db.agentExecution.findFirst({
          where: { agentId: agent.id },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true }
        })

        return {
          ...agent,
          lastUsedAt: lastExecution?.createdAt.toISOString() || null,
          systemPrompt: agent.systemPrompt,
          targetIssueTypes: JSON.parse(agent.targetIssueTypes)
        }
      })
    )

    return NextResponse.json<APIResponse<{
      templates: typeof AGENT_TEMPLATES
      customAgents: typeof formattedCustomAgents
      publicAgents: typeof publicAgents
    }>>({
      success: true,
      data: {
        templates: AGENT_TEMPLATES,
        customAgents: formattedCustomAgents,
        publicAgents: publicAgents.map(agent => ({
          ...agent,
          targetIssueTypes: JSON.parse(agent.targetIssueTypes)
        }))
      }
    })
  } catch (error) {
    console.error('Failed to fetch agents:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: 'Failed to fetch agents',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}

// POST - Create new custom agent
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const shop = searchParams.get('shop')

    if (!shop) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'MISSING_SHOP', message: 'Shop parameter is required' }
      }, { status: 400 })
    }

    // Get connection for this shop
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED'
      }
    })

    if (!connection) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'CONNECTION_NOT_FOUND', message: 'Shop connection not found' }
      }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      description,
      systemPrompt,
      model = 'claude-sonnet-4-5-20250929',
      temperature = 0.7,
      maxTokens = 2000,
      isPublic = false
    } = body

    // Validation
    if (!name || !description || !systemPrompt) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Name, description, and system prompt are required' }
      }, { status: 400 })
    }

    // Create agent
    const agent = await db.sEOAgent.create({
      data: {
        userId: connection.userId,
        connectionId: connection.id,
        name,
        description,
        specialty: 'custom',
        icon: 'sparkles',
        color: '#3b82f6',
        systemPrompt,
        model,
        temperature,
        maxTokens,
        isTemplate: false,
        isPublic,
        isActive: true,
        targetIssueTypes: '[]', // Empty array for custom agents
        createdBy: 'USER'
      }
    })

    return NextResponse.json<APIResponse<typeof agent>>({
      success: true,
      data: agent
    })
  } catch (error) {
    console.error('Failed to create agent:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'CREATE_FAILED',
        message: 'Failed to create agent',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}
