/**
 * Shopify Agent Execution API
 * POST: Execute an agent with input data
 * No Clerk auth - uses shop parameter from embedded app
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { executeAgent, AGENT_TEMPLATES } from '@/lib/seo-agents'
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

// POST - Execute agent
export async function POST(
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
    const connectionId = authContext.connection.id
    const userId = authContext.userId

    const body = await request.json()
    const { input } = body

    if (!input) {
      return NextResponse.json<APIResponse<never>>({
        success: false,
        error: { code: 'MISSING_INPUT', message: 'Input data is required' }
      }, { status: 400 })
    }

    // Check if this is a template agent (not in database yet)
    const isTemplate = agentId in AGENT_TEMPLATES
    let actualAgentId = agentId

    // If it's a template, create an instance for this user
    if (isTemplate) {
      const template = AGENT_TEMPLATES[agentId as keyof typeof AGENT_TEMPLATES]

      // Check if user already has this template agent
      const existingAgent = await db.sEOAgent.findFirst({
        where: {
          userId,
          connectionId,
          specialty: template.specialty,
          isTemplate: false,
          createdBy: 'SEOLOGY_OFFICIAL'
        }
      })

      if (existingAgent) {
        actualAgentId = existingAgent.id
      } else {
        // Create agent from template
        const newAgent = await db.sEOAgent.create({
          data: {
            userId,
            connectionId,
            name: template.name,
            description: template.description,
            specialty: template.specialty,
            icon: template.icon,
            color: template.color,
            systemPrompt: template.systemPrompt,
            model: template.model,
            temperature: template.temperature,
            maxTokens: template.maxTokens,
            isTemplate: false,
            isPublic: false,
            isActive: true,
            targetIssueTypes: JSON.stringify(template.targetIssueTypes),
            createdBy: 'SEOLOGY_OFFICIAL'
          }
        })
        actualAgentId = newAgent.id
      }
    }

    // Execute the agent
    const result = await executeAgent({
      agentId: actualAgentId,
      userId,
      connectionId,
      targetType: 'product', // Default to product, can be customized
      targetData: input,
    })

    return NextResponse.json<APIResponse<typeof result>>({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Failed to execute agent:', error)
    return NextResponse.json<APIResponse<never>>({
      success: false,
      error: {
        code: 'EXECUTION_FAILED',
        message: 'Failed to execute agent',
        details: error instanceof Error ? error.message : 'Unknown error'
      }
    }, { status: 500 })
  }
}
