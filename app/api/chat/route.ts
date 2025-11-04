import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { Platform, ExecutionMode, Plan, Severity } from '@prisma/client'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// IMPORTANT: Cannot use 'edge' runtime with Prisma database queries
// Edge runtime doesn't support Node.js APIs that Prisma requires
// export const runtime = 'edge'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface UserConnection {
  id: string
  platform: Platform
  domain: string
  displayName: string | null
  credentials: string | null // JSON string with shop metadata
  status: string
  healthStatus: string
  pageCount: number
  issueCount: number
  issues: Array<{
    id: string
    type: string
    title: string
    severity: Severity
    description: string
    pageUrl: string
  }>
  fixes: Array<{
    id: string
    description: string
    createdAt: Date
  }>
}

interface ShopMetadata {
  shopId?: number
  name?: string
  email?: string
  domain?: string
  myshopifyDomain?: string
  primaryDomain?: string
  currency?: string
  timezone?: string
  productCount?: number
  collectionCount?: number
  customerCount?: number
  planName?: string
  planDisplayName?: string
  shopOwner?: string
  phone?: string
  address?: {
    address1?: string
    address2?: string
    city?: string
    province?: string
    country?: string
    zip?: string
  }
}

interface UserWithContext {
  id: string
  plan: Plan
  executionMode: ExecutionMode
  businessType: string | null
  businessName: string | null
  businessStage: string | null
  platform: string | null
  connections: UserConnection[]
}

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured')
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CONFIGURATION_ERROR',
            message: 'AI service is not configured. Please contact support.'
          }
        },
        { status: 500 }
      )
    }

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { message, history = [] } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Message is required' } },
        { status: 400 }
      )
    }

    if (message.length > 4000) {
      return NextResponse.json(
        { success: false, error: { code: 'MESSAGE_TOO_LONG', message: 'Message is too long. Please keep it under 4000 characters.' } },
        { status: 400 }
      )
    }

    // Get user context from database
    let user
    try {
      user = await db.user.findUnique({
        where: { clerkId: userId },
        include: {
          connections: {
            select: {
              id: true,
              platform: true,
              domain: true,
              displayName: true,
              credentials: true,
              status: true,
              healthStatus: true,
              pageCount: true,
              issueCount: true,
            },
          },
        },
      })
    } catch (dbError) {
      console.error('Database error fetching user:', dbError)
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Error fetching user data. Please try again.',
          },
        },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found in database. Please visit /dashboard first.' } },
        { status: 404 }
      )
    }

    // Build context for AI assistant
    const contextInfo = buildUserContext({
      id: user.id,
      plan: user.plan,
      executionMode: user.executionMode,
      businessType: user.businessType,
      businessName: user.businessName,
      businessStage: user.businessStage,
      platform: user.platform,
      connections: user.connections.map((conn) => ({
        id: conn.id,
        platform: conn.platform,
        domain: conn.domain,
        displayName: conn.displayName,
        credentials: conn.credentials, // Shop metadata for AI context
        status: conn.status,
        healthStatus: conn.healthStatus,
        pageCount: conn.pageCount,
        issueCount: conn.issueCount,
        issues: [], // Simplified - don't fetch issues to avoid errors
        fixes: [], // Simplified - don't fetch fixes to avoid errors
      })),
    })

    // Prepare messages for AI
    const aiMessages: Anthropic.MessageParam[] = []

    // Add history (last 10 messages)
    history.slice(-10).forEach((msg: Message) => {
      aiMessages.push({
        role: msg.role,
        content: msg.content,
      })
    })

    // Add current message
    aiMessages.push({
      role: 'user',
      content: message,
    })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Validate Anthropic client is ready
          if (!anthropic) {
            console.error('Anthropic client not initialized')
            throw new Error('Anthropic client not initialized')
          }

          console.log('Initiating Claude AI request with', aiMessages.length, 'messages')

          const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 2048,
            system: `You are SEOLOGY.AI's intelligent SEO assistant. You are an expert in SEO optimization, website analysis, and automated SEO fixes. Your job is to help users improve their website's search engine rankings by identifying issues and suggesting fixes.

CRITICAL BRANDING RULES:
- You are SEOLOGY's AI assistant (NEVER mention Claude, Anthropic, or any other AI provider)
- Always refer to yourself as "SEOLOGY's AI assistant" or "SEOLOGY AI"
- Brand the platform as "SEOLOGY.AI" - the first platform that actually fixes SEO issues automatically instead of just reporting them
- Use professional, confident, and helpful tone

USER'S CURRENT CONTEXT:
${contextInfo}

YOUR CAPABILITIES:
1. Analyze websites for SEO issues:
   - Missing or incorrect meta tags (title, description, Open Graph, etc.)
   - Broken links and images
   - Page speed and performance issues
   - Mobile responsiveness problems
   - Heading structure (H1, H2, etc.)
   - Image alt text optimization
   - Schema markup opportunities
   - Content quality and keyword optimization

2. Access user's real data:
   - Their connected sites and platforms (${user.connections.length} sites)
   - Current site status and health
   - Their current plan: ${user.plan}
   - Their execution mode: ${user.executionMode}
   - Onboarding info: ${user.businessType || 'Not specified'} business (${user.businessStage || 'stage unknown'})

3. Provide actionable fixes:
   - Generate specific code examples (HTML, JavaScript, meta tags)
   - Explain step-by-step how to implement fixes
   - Recommend using SEOLOGY's automation features to apply fixes instantly
   - Prioritize high-impact SEO improvements

4. Guide users through SEOLOGY platform:
   - How to connect sites (Shopify, WordPress, or custom sites)
   - How execution modes work:
     * AUTOMATIC: Fixes apply instantly without approval
     * PLAN: Creates fix plan, user approves once to execute all
     * APPROVE: Each fix needs individual approval before applying
   - How to review and approve fixes
   - How to monitor SEO improvements
   - Direct users to specific pages: /dashboard/sites/connect for connecting sites, /dashboard/issues for viewing issues, /dashboard/settings for changing execution mode

RESPONSE GUIDELINES:
- ALWAYS acknowledge their current setup (sites, execution mode, plan) when relevant
- If they have NO sites connected, guide them to connect one: "You haven't connected any sites yet. Would you like me to help you connect your first site? Visit /dashboard/sites/connect to get started."
- If they have sites but NO issues detected, suggest running a scan: "I see you have ${user.connections.length} site(s) connected, but no issues detected yet. The scan may still be running or you can trigger a manual scan from your dashboard."
- Provide concrete, actionable advice with code examples
- Use markdown formatting for code blocks and lists
- Prioritize fixes by SEO impact (high/medium/low)
- When suggesting fixes, EXPLAIN how their execution mode (${user.executionMode}) affects the process
- Ask clarifying questions if you need more information
- Keep responses concise but comprehensive (2-4 paragraphs max)
- Use emojis sparingly and professionally (✓, ⚠️, 📊, 🚀)

EXECUTION MODE SPECIFIC GUIDANCE:
${user.executionMode === 'AUTOMATIC' ? '- User is in AUTOMATIC mode: Emphasize that fixes will apply INSTANTLY when they approve them in chat' : ''}
${user.executionMode === 'PLAN' ? '- User is in PLAN mode: Explain that you can create a comprehensive fix plan, and they approve once to execute all fixes at once' : ''}
${user.executionMode === 'APPROVE' ? '- User is in APPROVE mode: Let them know each fix will be reviewed individually before applying, giving them maximum control' : ''}

EXAMPLE RESPONSES:
- "I can see you have ${user.connections.length} site(s) connected. Since you're in ${user.executionMode} mode, ${user.executionMode === 'AUTOMATIC' ? 'I can apply fixes immediately' : user.executionMode === 'PLAN' ? "I'll create a plan for you to review" : "I'll present each fix for your approval"}. Let me help you prioritize the most impactful fixes..."
- "Based on your ${user.plan} plan, you can fix issues efficiently. Here's what I recommend tackling first..."
- "This missing meta description on [page URL] is affecting your click-through rates. ${user.executionMode === 'AUTOMATIC' ? 'I can fix this right now' : user.executionMode === 'PLAN' ? "I'll add this to your fix plan" : 'Would you like me to create a fix for your approval'}?"

WHEN USER ASKS TO FIX SOMETHING:
1. Reference their specific sites and issues
2. Explain what will be changed
3. Clarify next steps based on their execution mode
4. Provide direct links to approve/view fixes

Remember: You're not just an advisor - you're part of a platform that actually FIXES issues, not just reports them. Be specific about HOW SEOLOGY will fix things based on their current execution mode and connected sites.`,
            messages: aiMessages,
            stream: true,
          })

          for await (const event of response) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              const data = JSON.stringify({ content: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('AI API error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
          })

          let errorMsg = 'Sorry, I encountered an error processing your request. Please try again.'

          // Provide more specific error messages
          if (error instanceof Error) {
            if (error.message.includes('API key')) {
              errorMsg = 'AI service configuration error. Please contact support.'
            } else if (error.message.includes('rate limit')) {
              errorMsg = 'Too many requests. Please wait a moment and try again.'
            } else if (error.message.includes('timeout')) {
              errorMsg = 'Request timed out. Please try again with a shorter message.'
            }
          }

          const errorMessage = JSON.stringify({ content: errorMsg })
          controller.enqueue(encoder.encode(`data: ${errorMessage}\n\n`))
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred processing your request',
        },
      },
      { status: 500 }
    )
  }
}

function buildUserContext(user: UserWithContext): string {
  const totalConnections = user.connections.length

  const allIssues = user.connections.flatMap((conn) => conn.issues)
  const allFixes = user.connections.flatMap((conn) => conn.fixes)

  const issuesByType = allIssues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1
    return acc
  }, {})

  const issuesBySeverity = allIssues.reduce<Record<string, number>>((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1
    return acc
  }, {})

  let context = `USER INFORMATION:
- Plan: ${user.plan} (determines monthly fix limit and features)
- Execution Mode: ${user.executionMode} (${
    user.executionMode === 'AUTOMATIC'
      ? 'fixes apply instantly'
      : user.executionMode === 'PLAN'
      ? 'creates fix plans for bulk approval'
      : 'each fix needs individual approval'
  })
- Connected Sites: ${totalConnections}
- Total Active Issues: ${allIssues.length}
- Total Fixes Applied: ${allFixes.length}
`

  if (user.businessType || user.businessStage || user.businessName) {
    context += `\nUSER BUSINESS PROFILE:
- Business Name: ${user.businessName || 'Not provided'}
- Business Type: ${user.businessType || 'Not specified'}
- Business Stage: ${user.businessStage || 'Not specified'}
- Platform Preference: ${user.platform || 'Not specified'}
`
  }

  if (totalConnections > 0) {
    context += `\nCONNECTED SITES:\n`
    user.connections.forEach((conn) => {
      // Parse shop metadata from credentials if available
      let shopMetadata: ShopMetadata | null = null
      if (conn.credentials) {
        try {
          shopMetadata = JSON.parse(conn.credentials)
        } catch (e) {
          // Ignore parse errors
        }
      }

      // Build rich site context
      let siteInfo = `- ${conn.displayName || conn.domain} (${conn.platform})`
      siteInfo += `\n  Status: ${conn.status} | Health: ${conn.healthStatus}`
      siteInfo += `\n  Pages: ${conn.pageCount} | Issues: ${conn.issueCount}`
      siteInfo += `\n  Recent Fixes: ${conn.fixes.length}`

      // Add Shopify-specific metadata if available
      if (shopMetadata && conn.platform === 'SHOPIFY') {
        if (shopMetadata.productCount) {
          siteInfo += `\n  Products: ${shopMetadata.productCount}`
        }
        if (shopMetadata.collectionCount) {
          siteInfo += ` | Collections: ${shopMetadata.collectionCount}`
        }
        if (shopMetadata.customerCount) {
          siteInfo += ` | Customers: ${shopMetadata.customerCount}`
        }
        if (shopMetadata.planName) {
          siteInfo += `\n  Shopify Plan: ${shopMetadata.planDisplayName || shopMetadata.planName}`
        }
        if (shopMetadata.currency) {
          siteInfo += ` | Currency: ${shopMetadata.currency}`
        }
        if (shopMetadata.shopOwner) {
          siteInfo += `\n  Owner: ${shopMetadata.shopOwner}`
        }
        if (shopMetadata.address) {
          const addr = shopMetadata.address
          const location = [addr.city, addr.province, addr.country].filter(Boolean).join(', ')
          if (location) {
            siteInfo += ` | Location: ${location}`
          }
        }
      }

      context += siteInfo + '\n'
    })
  } else {
    context += `\nNO SITES CONNECTED YET - Guide user to /dashboard/sites/connect\n`
  }

  if (allIssues.length > 0) {
    context += `\nISSUE SEVERITY BREAKDOWN:\n`
    Object.entries(issuesBySeverity).forEach(([severity, count]) => {
      context += `- ${severity}: ${count} issue(s)\n`
    })

    context += `\nISSUE TYPE BREAKDOWN:\n`
    Object.entries(issuesByType).forEach(([type, count]) => {
      context += `- ${type}: ${count}\n`
    })

    context += `\nRECENT CRITICAL ISSUES (Top 5):\n`
    const criticalIssues = allIssues.filter(i => i.severity === 'CRITICAL' || i.severity === 'HIGH')
    criticalIssues.slice(0, 5).forEach((issue, index) => {
      context += `${index + 1}. [${issue.severity}] ${issue.title}\n   Page: ${issue.pageUrl}\n   Description: ${issue.description}\n`
    })

    if (criticalIssues.length === 0 && allIssues.length > 0) {
      context += `(No critical issues - showing general issues)\n`
      allIssues.slice(0, 5).forEach((issue, index) => {
        context += `${index + 1}. [${issue.severity}] ${issue.title}\n   Page: ${issue.pageUrl}\n`
      })
    }
  } else if (totalConnections > 0) {
    context += `\nNO ISSUES DETECTED - Site scan may be in progress, or site is healthy\n`
  }

  if (allFixes.length > 0) {
    context += `\nRECENT FIXES APPLIED:\n`
    allFixes.slice(0, 3).forEach((fix, index) => {
      const daysAgo = Math.floor((Date.now() - fix.createdAt.getTime()) / (1000 * 60 * 60 * 24))
      context += `${index + 1}. ${fix.description} (${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago)\n`
    })
  }

  return context
}
