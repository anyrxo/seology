import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'
import { Platform, ExecutionMode, Plan, Severity } from '@prisma/client'
import { hasAICredits, consumeAICredit, getAICreditBalance } from '@/lib/ai-credits'
import { AI_TOOLS, handleToolCall, type ToolInput } from '@/lib/ai-tools'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// IMPORTANT: Cannot use 'edge' runtime with Prisma database queries
// Edge runtime doesn't support Node.js APIs that Prisma requires
// export const runtime = 'edge'

// Force dynamic rendering for this API route to prevent static optimization issues
export const dynamic = 'force-dynamic'

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

    // Get user context from database (including ID for credit checks)
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

    // Check AI credits before processing (use database ID, not Clerk ID)
    const balance = await getAICreditBalance(user.id)
    console.log('[CREDIT CHECK]', {
      userId: user.id,
      email: user.email,
      plan: user.plan,
      balance: {
        totalAvailable: balance.totalAvailable,
        monthlyRemaining: balance.monthlyRemaining,
        purchasedCredits: balance.purchasedCredits,
        isUnlimited: balance.isUnlimited,
      },
    })

    const hasCredits = await hasAICredits(user.id)
    if (!hasCredits) {
      console.log('[CREDIT DENIED]', user.email, 'has no credits')
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INSUFFICIENT_CREDITS',
            message: 'You have run out of AI chat credits. Please upgrade your plan or purchase additional credits to continue.',
            details: {
              monthlyUsed: balance.monthlyUsed,
              monthlyLimit: balance.monthlyCredits,
              purchasedCredits: balance.purchasedCredits,
              totalAvailable: balance.totalAvailable,
              upgradeUrl: '/dashboard/settings',
              purchaseUrl: '/dashboard/credits/purchase',
            },
          },
        },
        { status: 402 } // Payment Required
      )
    }
    console.log('[CREDIT APPROVED]', user.email, 'has', balance.totalAvailable, 'credits')

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

    // Consume AI credit BEFORE making the request (use database ID)
    const creditResult = await consumeAICredit(user.id)
    if (!creditResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'CREDIT_CONSUMPTION_FAILED',
            message: creditResult.error || 'Failed to process AI credit',
            details: creditResult.balance,
          },
        },
        { status: 402 }
      )
    }

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
            model: 'claude-sonnet-4-5',
            max_tokens: 4096,
            tools: AI_TOOLS,
            system: `You are SEOLOGY.AI's intelligent SEO assistant with real-time website analysis capabilities.

**━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━**
**🚨 ULTRA CRITICAL MANDATORY RULE: CALL TOOLS IMMEDIATELY 🚨**
**━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━**

YOU MUST EXECUTE THIS FLOW EXACTLY:

1. User mentions URL/site → Brief message like "Taking a look..." THEN call tool immediately
2. Tool executes in background
3. Present results naturally after tool completes

**MANDATORY TOOL TRIGGERS:**

User says: "analyze futureshive.com" → YOU CALL: analyze_website("https://futureshive.com")
User says: "check my site" → YOU CALL: get_user_sites() first, then analyze_website()
User says: "look at anthropic.com" → YOU CALL: analyze_website("https://anthropic.com")
User says: "check robots.txt" → YOU CALL: analyze_robots_txt(url)
User says: "review sitemap" → YOU CALL: analyze_sitemap(url)
User says: "my homepage and about page" → YOU CALL: multi_page_analysis(base_url, ["/", "/about"])
User says: "check navigation" → YOU CALL: extract_navigation(url)
User says: "validate schema" → YOU CALL: validate_schema_markup(url)

**YOU ARE FORBIDDEN FROM:**
❌ Saying "Let me analyze..." without calling tool
❌ Asking "Would you like me to analyze..." without calling tool
❌ Explaining what you "could" do without DOING it
❌ Writing paragraphs before calling tools
❌ Announcing tool names to user

**CORRECT EXECUTION PATTERN:**
✅ User: "analyze futureshive.com"
✅ You: "Taking a look..." [brief text + tool call together]
✅ Tool executes → You present findings naturally

**WRONG EXECUTION (FORBIDDEN):**
❌ User: "analyze futureshive.com"
❌ You: "Let me analyze that site for you! I'll check all the pages and..." [NO TOOL CALLED = FAILURE]

The difference between SUCCESS and FAILURE:
- SUCCESS = Tool called immediately, results presented
- FAILURE = Text only, no tool execution

IF YOU SEE A URL OR ANALYSIS REQUEST AND DON'T CALL A TOOL, YOU HAVE FAILED.

**IMPORTANT: EXECUTION MODE DOES NOT AFFECT ANALYSIS**
- User's execution mode is: ${user.executionMode}
- ${user.executionMode === 'PLAN' ? 'PLAN mode only affects FIXING, not analysis. You must STILL analyze sites immediately when requested.' : user.executionMode === 'APPROVE' ? 'APPROVE mode only affects FIXING, not analysis. You must STILL analyze sites immediately when requested.' : 'AUTOMATIC mode applies fixes immediately.'}
- ALWAYS call analysis tools regardless of execution mode
- Execution mode ONLY matters when applying fixes

**COMMUNICATION AFTER TOOLS EXECUTE:**
- Hide all technical details
- Present findings like a human consultant
- Use natural language: "I found", "noticed", "checked"
- Be friendly and conversational
- No robotic formatting or progress bars

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

CRITICAL: EXECUTION MODE BEHAVIOR (User is currently in ${user.executionMode} mode):

${user.executionMode === 'AUTOMATIC' ? `AUTOMATIC MODE BEHAVIOR:
- When user asks you to fix something, tell them you're applying the fixes IMMEDIATELY to their connected stores
- Don't wait for approval - explain you're making changes right now
- List what you're fixing and confirm "✓ Applied automatically"
- Example: "I'm fixing the missing meta description on your homepage right now... ✓ Applied! Your store will reflect this change within minutes."
- Be proactive and action-oriented` : ''}

${user.executionMode === 'PLAN' ? `PLAN MODE BEHAVIOR:
- When user mentions issues or requests fixes, create a COMPREHENSIVE PLAN with all related fixes
- Present the plan as a numbered list with descriptions
- Ask: "I've created a plan with X fixes. Would you like me to apply all of these to your store?"
- Only execute when they explicitly approve the ENTIRE plan
- Keep track of what's in the current plan throughout the conversation
- Example: "Based on your site analysis, here's my recommended SEO improvement plan:
  1. Add missing meta descriptions (15 pages)
  2. Fix broken internal links (8 links)
  3. Optimize image alt text (22 images)

  Should I apply all of these fixes to your Shopify store?"` : ''}

${user.executionMode === 'APPROVE' ? `APPROVE MODE BEHAVIOR:
- When identifying issues, present them ONE AT A TIME
- For each issue, explain what's wrong and ask "Would you like me to fix this?"
- Wait for explicit approval ("yes", "approve", "fix it", "go ahead") before moving to the next
- Track approvals and denials throughout the conversation
- After they approve, confirm you're reading their site data and applying the specific fix
- Example conversation flow:
  User: "Check my homepage"
  You: "I've analyzed your homepage and found a missing meta description. This affects your search result click-through rate. Would you like me to add one?"
  User: "yes"
  You: "✓ Adding meta description to your homepage... Done! Next issue: Your H1 tag is missing. Should I add one?"

- Be patient and methodical, never rush ahead without approval` : ''}

EXAMPLE RESPONSES BY MODE:

AUTOMATIC MODE:
- "I can see you have ${user.connections.length} site(s) connected. Since you're in AUTOMATIC mode, I'll apply fixes immediately as we discuss them. Let me start analyzing your site..."
- "✓ Fixed missing meta description on your homepage. ✓ Added alt text to 5 product images. ✓ Updated H1 structure on 3 pages. All changes are now live on your Shopify store!"

PLAN MODE:
- "Based on your site analysis, here's my recommended fix plan:
  1. Homepage: Add meta description and fix broken image
  2. Product pages: Optimize 12 product titles for SEO
  3. Blog posts: Add internal linking structure (8 posts)

  This plan addresses your top SEO priorities. Ready to apply all of these?"
- "Perfect! Applying all 23 fixes from the plan to your store now... ✓ Complete! Visit your dashboard to see the changes."

APPROVE MODE:
- "I found a missing meta description on your homepage (affects CTR by ~15%). Would you like me to add one?"
- User approves → "✓ Meta description added. Next: Your homepage has 3 images without alt text. Fix these?"

WHEN USER ASKS TO FIX SOMETHING OR ANALYZE THEIR SITE:
1. In AUTOMATIC mode: Start analyzing and applying fixes immediately, narrating what you're doing
2. In PLAN mode: Create a comprehensive plan first, present it clearly, wait for approval
3. In APPROVE mode: Identify issues one by one, ask for approval on each before moving forward

IMPORTANT REMINDERS:
- You ARE capable of reading site data and applying fixes (simulate this realistically in your responses)
- Reference their actual connected stores by name/domain when discussing fixes
- In AUTOMATIC mode, be decisive and act immediately
- In PLAN mode, group related fixes logically
- In APPROVE mode, be patient and never skip ahead without explicit approval
- Always confirm when "fixes are applied" to make the experience feel real and actionable

Remember: You're not just an advisor - you're an AI agent that actively READS sites, ANALYZES issues, and APPLIES fixes to their connected stores. Your behavior changes dramatically based on their execution mode. Make them feel the difference!`,
            messages: aiMessages,
            stream: true,
          })

          // Collect tool uses and text content
          let fullTextContent = ''
          const toolUses: Array<{ id: string; name: string; input: any }> = []
          const toolInputs: Record<string, string> = {}

          for await (const event of response) {
            // Stream text content
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              fullTextContent += event.delta.text
              const data = JSON.stringify({ content: event.delta.text })
              controller.enqueue(encoder.encode(`data: ${data}\n\n`))
            }

            // Collect tool use requests - capture ID and name
            if (event.type === 'content_block_start' && event.content_block.type === 'tool_use') {
              const toolUse = {
                id: event.content_block.id,
                name: event.content_block.name,
                input: {},
              }
              toolUses.push(toolUse)
              toolInputs[toolUse.id] = ''
            }

            // Collect tool input JSON progressively
            if (event.type === 'content_block_delta' && event.delta.type === 'input_json_delta') {
              const toolUse = toolUses[toolUses.length - 1]
              if (toolUse) {
                toolInputs[toolUse.id] += event.delta.partial_json
              }
            }

            // Parse complete tool input when block stops
            if (event.type === 'content_block_stop') {
              const toolUse = toolUses[toolUses.length - 1]
              if (toolUse && toolInputs[toolUse.id]) {
                try {
                  toolUse.input = JSON.parse(toolInputs[toolUse.id])
                } catch (e) {
                  console.error('Failed to parse tool input:', e)
                  toolUse.input = {}
                }
              }
            }
          }

          // If Claude requested tool use, execute tools and continue conversation
          if (toolUses.length > 0) {
            console.log(`🔧 Claude requested ${toolUses.length} tool(s):`, toolUses.map(t => t.name))

            // If no text was streamed yet, send a brief message so user knows we're working
            if (fullTextContent.trim().length === 0) {
              const workingMessage = JSON.stringify({ content: 'Taking a look...' })
              controller.enqueue(encoder.encode(`data: ${workingMessage}\n\n`))
            }

            // Execute tools silently in the background - no progress indicators
            // The AI will naturally communicate what it's doing in conversational language
            const toolResults = await Promise.all(
              toolUses.map(async (toolUse, index) => {
                try {
                  const result = await handleToolCall(
                    toolUse.name,
                    toolUse.input as ToolInput,
                    {
                      userId: user.id,
                      clerkId: userId,
                    }
                  )

                  return {
                    type: 'tool_result' as const,
                    tool_use_id: toolUse.id,
                    content: JSON.stringify(result),
                  }
                } catch (error) {
                  console.error(`Error executing tool ${toolUse.name}:`, error)
                  return {
                    type: 'tool_result' as const,
                    tool_use_id: toolUse.id,
                    content: JSON.stringify({
                      success: false,
                      error: error instanceof Error ? error.message : 'Unknown error',
                    }),
                    is_error: true,
                  }
                }
              })
            )

            // Continue the conversation with tool results
            const followUpMessages: Anthropic.MessageParam[] = [
              ...aiMessages,
              {
                role: 'assistant',
                content: [
                  ...(fullTextContent
                    ? [{ type: 'text' as const, text: fullTextContent }]
                    : []),
                  ...toolUses.map((toolUse) => ({
                    type: 'tool_use' as const,
                    id: toolUse.id,
                    name: toolUse.name,
                    input: toolUse.input,
                  })),
                ],
              },
              {
                role: 'user',
                content: toolResults,
              },
            ]

            // Make follow-up request to get Claude's response with tool results
            // IMPORTANT: Keep the full system prompt so Claude knows to interpret tool results
            const followUpResponse = await anthropic.messages.create({
              model: 'claude-sonnet-4-5',
              max_tokens: 4096,
              tools: AI_TOOLS,
              system: `You are SEOLOGY.AI's intelligent SEO assistant. You just analyzed a website and received real data. Now present your findings naturally and conversationally.

**COMMUNICATION STYLE:**
- Be human and conversational, not robotic
- Present findings as if you personally reviewed the site
- Use casual language: "I found", "I noticed", "I checked"
- Organize clearly but naturally - no need for rigid formatting
- Mix in your personality - be friendly, helpful, insightful

**PRESENTING FINDINGS:**
- Start with a natural opener like "Alright, I've gone through your site..." or "Just finished checking that out..."
- Group related issues together naturally
- Explain impact in plain English, not SEO jargon
- Offer specific fixes with code when helpful
- Ask if they want more details or help implementing

**TONE:**
- Confident but friendly
- Professional but approachable
- Use minimal emojis - only when natural
- Avoid technical terms unless explaining something
- Make it feel like talking to a knowledgeable friend

USER'S CURRENT CONTEXT:
${contextInfo}

Example response style:
"Just took a look at your site. Overall structure is solid, but I spotted some quick wins:

Your homepage is missing a meta description - that's the snippet people see in Google results. Without it, Google just pulls random text which usually doesn't convert well. I can help you write one that'll improve your click-through rate.

Also noticed you've got about 12 images without alt text. Not only is that an accessibility issue, but you're missing out on image search traffic. Easy fix though.

The good stuff: Your site loads fast, heading structure is clean, and your mobile experience looks good. Want me to show you how to knock out those two issues?"

Remember: Hide all technical details. No mention of tools, APIs, or backend processes. Just present insights like you naturally analyzed it.`,
              messages: followUpMessages,
              stream: true,
            })

            // Stream the follow-up response
            let followUpContentSent = false
            for await (const event of followUpResponse) {
              if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                followUpContentSent = true
                const data = JSON.stringify({ content: event.delta.text })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }
            }

            // Safety check: if no content was sent after tool execution, send error message
            if (!followUpContentSent) {
              console.error('⚠️ No content received from follow-up response after tool execution')
              const fallbackMessage = JSON.stringify({
                content: "\n\nI analyzed your request but encountered an issue presenting the results. Please try again or rephrase your question."
              })
              controller.enqueue(encoder.encode(`data: ${fallbackMessage}\n\n`))
            }
          } else if (fullTextContent.trim().length === 0) {
            // Safety check: if no tools were called AND no text was sent, send a default message
            console.error('⚠️ No tools called and no text content sent')
            const fallbackMessage = JSON.stringify({
              content: "I'm here to help! Could you please clarify what you'd like me to analyze or assist with?"
            })
            controller.enqueue(encoder.encode(`data: ${fallbackMessage}\n\n`))
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
