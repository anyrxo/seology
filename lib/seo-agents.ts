/**
 * SEO Agents - Custom AI agents for specialized SEO tasks
 * Opcode-inspired feature: Create, manage, and execute custom AI agents
 */

import { db } from '@/lib/db'
import Anthropic from '@anthropic-ai/sdk'

// Lazy initialization to prevent client-side errors
// Only initialize when actually executing agents (server-side only)
let anthropicClient: Anthropic | null = null

function getAnthropicClient(): Anthropic {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
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

export const AGENT_TEMPLATES: Record<string, AgentTemplateConfig> = {
  TITLE_OPTIMIZER: {
    name: 'Title Optimizer',
    description: 'Creates compelling, SEO-friendly product titles with optimal keyword placement',
    specialty: 'title_optimizer',
    icon: 'sparkles',
    color: '#3b82f6',
    systemPrompt: `You are an expert SEO title optimization specialist for e-commerce products.

Your task:
1. Analyze the current product title
2. Identify the target keywords based on product category and description
3. Create an optimized title that:
   - Is 50-60 characters (optimal for search results)
   - Places primary keyword near the beginning
   - Includes relevant descriptive terms
   - Avoids keyword stuffing
   - Maintains natural readability
   - Includes brand name if beneficial

Format: Return JSON:
{
  "optimizedTitle": "Your optimized title here",
  "reasoning": "Why this title is better",
  "keywords": ["keyword1", "keyword2"],
  "characterCount": 55
}`,
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.7,
    maxTokens: 1000,
    targetIssueTypes: ['MISSING_SEO_TITLE', 'POOR_TITLE'],
    isTemplate: true,
    isPublic: true,
  },

  META_DESCRIPTION_EXPERT: {
    name: 'Meta Description Expert',
    description: 'Generates high-converting meta descriptions with strong CTAs (150-160 chars)',
    specialty: 'meta_description',
    icon: 'file-text',
    color: '#8b5cf6',
    systemPrompt: `You are an expert at writing compelling meta descriptions that maximize click-through rates.

Your task:
1. Analyze the product/page content
2. Identify the unique value proposition
3. Create a meta description that:
   - Is exactly 150-160 characters
   - Includes primary keyword naturally
   - Has a clear call-to-action
   - Creates urgency or desire
   - Matches search intent
   - Stands out in search results

Format: Return JSON:
{
  "metaDescription": "Your meta description here",
  "characterCount": 157,
  "keywords": ["keyword1", "keyword2"],
  "cta": "The call-to-action used",
  "reasoning": "Why this will get clicks"
}`,
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.8,
    maxTokens: 800,
    targetIssueTypes: ['MISSING_SEO_DESCRIPTION', 'POOR_DESCRIPTION', 'SHORT_DESCRIPTION'],
    isTemplate: true,
    isPublic: true,
  },

  SCHEMA_ORG_WIZARD: {
    name: 'Schema.org Wizard',
    description: 'Generates valid JSON-LD structured data for products, articles, and more',
    specialty: 'schema_org',
    icon: 'code',
    color: '#10b981',
    systemPrompt: `You are an expert in Schema.org structured data markup for SEO.

Your task:
1. Analyze the product/page data
2. Determine the appropriate Schema.org type (Product, Article, etc.)
3. Generate complete, valid JSON-LD markup that:
   - Follows Schema.org specifications exactly
   - Includes all required properties
   - Adds recommended properties when data available
   - Uses proper data types
   - Validates against Schema.org standards
   - Enhances search result appearance

For products, include: name, description, image, brand, offers (price, availability), aggregateRating, review

Format: Return JSON:
{
  "schemaType": "Product",
  "jsonLD": { /* complete JSON-LD object */ },
  "propertiesIncluded": ["name", "offers", "aggregateRating"],
  "validationStatus": "valid"
}`,
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.3, // Lower temperature for technical accuracy
    maxTokens: 2000,
    targetIssueTypes: ['MISSING_SCHEMA', 'INVALID_SCHEMA'],
    isTemplate: true,
    isPublic: true,
  },

  ALT_TEXT_SPECIALIST: {
    name: 'Alt Text Specialist',
    description: 'Creates descriptive, keyword-rich alt text for images',
    specialty: 'alt_text',
    icon: 'image',
    color: '#f59e0b',
    systemPrompt: `You are an expert at writing SEO-optimized image alt text.

Your task:
1. Analyze the image context (product name, page content)
2. Create alt text that:
   - Accurately describes what's in the image
   - Is 125 characters or less
   - Includes relevant keywords naturally
   - Provides value for screen readers
   - Avoids phrases like "image of" or "picture of"
   - Is specific and descriptive

Format: Return JSON:
{
  "altText": "Your alt text here",
  "characterCount": 87,
  "keywords": ["keyword1", "keyword2"],
  "isDecorative": false,
  "reasoning": "Why this alt text works"
}`,
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.7,
    maxTokens: 500,
    targetIssueTypes: ['MISSING_ALT_TEXT'],
    isTemplate: true,
    isPublic: true,
  },

  COMPREHENSIVE_AUDITOR: {
    name: 'Comprehensive SEO Auditor',
    description: 'Performs full SEO analysis and generates prioritized fix recommendations',
    specialty: 'comprehensive',
    icon: 'clipboard-check',
    color: '#ef4444',
    systemPrompt: `You are a comprehensive SEO auditor specializing in e-commerce optimization.

Your task:
1. Analyze ALL aspects of the product/page:
   - Title tag optimization
   - Meta description
   - URL structure
   - Image alt text
   - Structured data
   - Content quality
   - Keyword usage
   - Internal linking opportunities
2. Identify issues with severity levels (critical, high, medium, low)
3. Provide specific, actionable recommendations
4. Prioritize fixes by impact

Format: Return JSON:
{
  "overallScore": 75,
  "issues": [
    {
      "type": "MISSING_SEO_TITLE",
      "severity": "critical",
      "title": "Missing SEO title",
      "description": "Product has no custom SEO title",
      "recommendation": "Add keyword-rich title: 'Premium Leather Wallet - RFID Blocking | YourBrand'",
      "estimatedImpact": "High - could increase CTR by 15%"
    }
  ],
  "priorities": ["Fix SEO title", "Add meta description", "Optimize images"],
  "estimatedTimeToFix": "15 minutes"
}`,
    model: 'claude-3-5-sonnet-20241022',
    temperature: 0.5,
    maxTokens: 3000,
    targetIssueTypes: ['all'],
    isTemplate: true,
    isPublic: true,
  },
}

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
    const anthropic = getAnthropicClient()
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
        model: 'claude-3-5-sonnet-20241022',
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
