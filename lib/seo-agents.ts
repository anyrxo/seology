/**
 * SEO Agents - Custom AI agents for specialized SEO tasks
 * Opcode-inspired feature: Create, manage, and execute custom AI agents
 */

import { db } from '@/lib/db'
// DO NOT import Anthropic at top level - causes browser errors
// Dynamic import is used in getAnthropicClient() to prevent client-side bundling
import type Anthropic from '@anthropic-ai/sdk'

// Import and re-export templates from client-safe file
import { AGENT_TEMPLATES } from './seo-agent-templates'
export { AGENT_TEMPLATES }

// Lazy initialization to prevent client-side errors
// Only initialize when actually executing agents (server-side only)
// Import is done dynamically inside the function
let anthropicClient: Anthropic | null = null

async function getAnthropicClient(): Promise<Anthropic> {
  if (!anthropicClient) {
    // Dynamic import to prevent client-side bundling
    const { default: AnthropicSDK } = await import('@anthropic-ai/sdk')
    anthropicClient = new AnthropicSDK({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  return anthropicClient
}

// ==================== TYPE DEFINITIONS ====================

interface AgentTemplateConfig {
  name: string
  description: string
  specialty: string
  icon: string
  color: string
  systemPrompt: string
  model: string
  temperature: number
  maxTokens: number
  targetIssueTypes: string[]
  isTemplate: boolean
  isPublic: boolean
}

interface TargetData {
  [key: string]: string | number | boolean | null | undefined | TargetData | TargetData[]
}

interface AgentOutput {
  [key: string]: string | number | boolean | null | undefined | AgentOutput | AgentOutput[]
}

interface AgentExecutionRecord {
  id: string
  status: string
  completedAt: Date | null
  duration: number | null
  tokensUsed: number | null
  costUSD: number | null
}

interface AgentWithExecutions {
  id: string
  name: string
  specialty: string
  totalRuns: number
  successfulRuns: number
  avgExecutionTime: number | null
  avgTokensUsed: number | null
  avgCostPerRun: number | null
  rating: number | null
  executions: AgentExecutionRecord[]
}

// ==================== AGENT TEMPLATES ====================
// Templates are defined in lib/seo-agent-templates.ts for client-side safety
// Re-exported at top of file for server-side use

// ==================== AGENT EXECUTION ====================

interface AgentExecutionInput {
  agentId: string
  userId: string
  connectionId: string
  targetType: 'product' | 'collection' | 'page' | 'image' | 'batch'
  targetId?: string
  targetUrl?: string
  targetData: TargetData
  batchSize?: number
}

interface AgentExecutionResult {
  executionId: string
  status: 'completed' | 'failed'
  output?: AgentOutput
  error?: string
  tokensUsed: number
  costUSD: number
  duration: number
}

/**
 * Execute an SEO agent
 */
export async function executeAgent(input: AgentExecutionInput): Promise<AgentExecutionResult> {
  const startTime = Date.now()

  try {
    // Get agent configuration
    const agent = await db.sEOAgent.findUnique({
      where: { id: input.agentId },
    })

    if (!agent) {
      throw new Error('Agent not found')
    }

    if (!agent.isActive) {
      throw new Error('Agent is not active')
    }

    // Create execution record
    const execution = await db.agentExecution.create({
      data: {
        agentId: input.agentId,
        userId: input.userId,
        connectionId: input.connectionId,
        targetType: input.targetType,
        targetId: input.targetId,
        targetUrl: input.targetUrl,
        batchSize: input.batchSize || 1,
        status: 'RUNNING',
        input: JSON.stringify(input.targetData),
        output: '{}',
        startedAt: new Date(),
      },
    })

    // Prepare prompt with agent's system prompt + input data
    const userPrompt = JSON.stringify(input.targetData, null, 2)

    // Call Claude API
    const anthropic = await getAnthropicClient()
    const response = await anthropic.messages.create({
      model: agent.model,
      max_tokens: agent.maxTokens,
      temperature: agent.temperature,
      system: agent.systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    const duration = (Date.now() - startTime) / 1000

    // Parse response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    let output: AgentOutput
    try {
      output = JSON.parse(content.text) as AgentOutput
    } catch {
      // If not JSON, treat as plain text
      output = { text: content.text }
    }

    // Calculate cost (Claude pricing: input $3/MTok, output $15/MTok)
    const inputTokens = response.usage.input_tokens
    const outputTokens = response.usage.output_tokens
    const totalTokens = inputTokens + outputTokens
    const costUSD = (inputTokens * 0.003 / 1000) + (outputTokens * 0.015 / 1000)

    // Update execution record
    await db.agentExecution.update({
      where: { id: execution.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        duration,
        output: JSON.stringify(output),
        tokensUsed: totalTokens,
        tokensInput: inputTokens,
        tokensOutput: outputTokens,
        costUSD,
        modelUsed: agent.model,
        fixesGenerated: 1, // Will be updated based on output
      },
    })

    // Track usage event
    await db.usageEvent.create({
      data: {
        userId: input.userId,
        connectionId: input.connectionId,
        eventType: 'AGENT_EXECUTION',
        resourceType: input.targetType,
        resourceId: input.targetId,
        model: agent.model,
        tokensInput: inputTokens,
        tokensOutput: outputTokens,
        tokensTotal: totalTokens,
        costUSD,
        executionTime: duration * 1000,
        agentId: input.agentId,
        success: true,
      },
    })

    // Update agent statistics
    await db.sEOAgent.update({
      where: { id: input.agentId },
      data: {
        totalRuns: { increment: 1 },
        successfulRuns: { increment: 1 },
        avgExecutionTime: agent.avgExecutionTime
          ? (agent.avgExecutionTime * agent.totalRuns + duration) / (agent.totalRuns + 1)
          : duration,
        avgTokensUsed: agent.avgTokensUsed
          ? Math.round((agent.avgTokensUsed * agent.totalRuns + totalTokens) / (agent.totalRuns + 1))
          : totalTokens,
        avgCostPerRun: agent.avgCostPerRun
          ? (agent.avgCostPerRun * agent.totalRuns + costUSD) / (agent.totalRuns + 1)
          : costUSD,
      },
    })

    return {
      executionId: execution.id,
      status: 'completed',
      output,
      tokensUsed: totalTokens,
      costUSD,
      duration,
    }
  } catch (error) {
    const duration = (Date.now() - startTime) / 1000
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Record failed execution
    const execution = await db.agentExecution.findFirst({
      where: {
        agentId: input.agentId,
        userId: input.userId,
        status: 'RUNNING',
      },
      orderBy: { startedAt: 'desc' },
    })

    if (execution) {
      await db.agentExecution.update({
        where: { id: execution.id },
        data: {
          status: 'FAILED',
          completedAt: new Date(),
          duration,
          error: errorMessage,
        },
      })
    }

    // Update agent statistics
    await db.sEOAgent.update({
      where: { id: input.agentId },
      data: {
        totalRuns: { increment: 1 },
        failedRuns: { increment: 1 },
      },
    })

    // Track usage event (failed)
    await db.usageEvent.create({
      data: {
        userId: input.userId,
        connectionId: input.connectionId,
        eventType: 'AGENT_EXECUTION',
        resourceType: input.targetType,
        resourceId: input.targetId,
        model: 'claude-sonnet-4-5-20250929',
        tokensInput: 0,
        tokensOutput: 0,
        tokensTotal: 0,
        costUSD: 0,
        executionTime: duration * 1000,
        agentId: input.agentId,
        success: false,
        errorMessage,
      },
    })

    return {
      executionId: execution?.id || '',
      status: 'failed',
      error: errorMessage,
      tokensUsed: 0,
      costUSD: 0,
      duration,
    }
  }
}

/**
 * Create agent from template
 */
export async function createAgentFromTemplate(
  templateKey: keyof typeof AGENT_TEMPLATES,
  userId: string,
  connectionId: string
) {
  const template = AGENT_TEMPLATES[templateKey]

  return await db.sEOAgent.create({
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
      targetIssueTypes: JSON.stringify(template.targetIssueTypes), // Convert array to JSON string
      isTemplate: false, // User's copy is not a template
      isPublic: false,
      createdBy: 'SEOLOGY_OFFICIAL',
    },
  })
}

/**
 * Get agent performance metrics
 */
export async function getAgentPerformance(agentId: string) {
  const agent = await db.sEOAgent.findUnique({
    where: { id: agentId },
    include: {
      executions: {
        where: {
          completedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
        orderBy: { completedAt: 'desc' },
        take: 100,
      },
    },
  }) as AgentWithExecutions | null

  if (!agent) {
    throw new Error('Agent not found')
  }

  const executions = agent.executions

  return {
    agent: {
      id: agent.id,
      name: agent.name,
      specialty: agent.specialty,
    },
    stats: {
      totalRuns: agent.totalRuns,
      successRate: agent.totalRuns > 0 ? (agent.successfulRuns / agent.totalRuns) * 100 : 0,
      avgExecutionTime: agent.avgExecutionTime,
      avgTokensUsed: agent.avgTokensUsed,
      avgCostPerRun: agent.avgCostPerRun,
      rating: agent.rating,
    },
    recentExecutions: executions.map((ex: AgentExecutionRecord) => ({
      id: ex.id,
      status: ex.status,
      duration: ex.duration,
      tokensUsed: ex.tokensUsed,
      costUSD: ex.costUSD,
      completedAt: ex.completedAt,
    })),
    costAnalysis: {
      last7Days: executions
        .filter((ex: AgentExecutionRecord) =>
          ex.completedAt && ex.completedAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
        .reduce((sum: number, ex: AgentExecutionRecord) => sum + (ex.costUSD || 0), 0),
      last30Days: executions.reduce((sum: number, ex: AgentExecutionRecord) =>
        sum + (ex.costUSD || 0), 0
      ),
    },
  }
}

interface AgentComparisonResult {
  id: string
  name: string
  specialty: string
  successRate: number
  avgExecutionTime: number | null
  avgCostPerRun: number | null
  rating: number | null
  totalRuns: number
}

/**
 * Compare multiple agents
 */
export async function compareAgents(agentIds: string[]): Promise<AgentComparisonResult[]> {
  const agents = await db.sEOAgent.findMany({
    where: {
      id: { in: agentIds },
    },
  })

  return agents.map((agent: {
    id: string
    name: string
    specialty: string
    totalRuns: number
    successfulRuns: number
    avgExecutionTime: number | null
    avgCostPerRun: number | null
    rating: number | null
  }): AgentComparisonResult => ({
    id: agent.id,
    name: agent.name,
    specialty: agent.specialty,
    successRate: agent.totalRuns > 0 ? (agent.successfulRuns / agent.totalRuns) * 100 : 0,
    avgExecutionTime: agent.avgExecutionTime,
    avgCostPerRun: agent.avgCostPerRun,
    rating: agent.rating,
    totalRuns: agent.totalRuns,
  }))
}
