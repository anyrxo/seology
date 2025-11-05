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
    const { message, history = [], attachments = [] } = body

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

    // Add current message with attachments if any
    if (attachments && attachments.length > 0) {
      const contentBlocks: Array<
        | { type: 'text'; text: string }
        | {
            type: 'image'
            source: {
              type: 'base64'
              media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
              data: string
            }
          }
      > = []

      // Add attachments first (images)
      for (const attachment of attachments) {
        if (attachment.type.startsWith('image/')) {
          // For images, handle both data URLs and file paths
          try {
            let base64Image: string

            // Check if it's already a data URL (base64 encoded)
            if (attachment.url.startsWith('data:')) {
              // Extract base64 data from data URL
              const base64Match = attachment.url.match(/^data:[^;]+;base64,(.+)$/)
              if (base64Match) {
                base64Image = base64Match[1]
              } else {
                throw new Error('Invalid data URL format')
              }
            } else {
              // Legacy path: fetch from file system
              const fullUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${attachment.url}`
              const imageResponse = await fetch(fullUrl)
              const imageBuffer = await imageResponse.arrayBuffer()
              base64Image = Buffer.from(imageBuffer).toString('base64')
            }

            // Determine media type from file type
            const mediaType = attachment.type as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

            contentBlocks.push({
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            })
          } catch (error) {
            console.error('Failed to process image attachment:', error)
            // Continue without this image
          }
        } else {
          // For non-image files, just mention them in the text
          contentBlocks.push({
            type: 'text',
            text: `[User attached file: ${attachment.name} (${(attachment.size / 1024).toFixed(1)}KB)]`,
          })
        }
      }

      // Add message text
      if (message && message.trim()) {
        contentBlocks.push({
          type: 'text',
          text: message,
        })
      }

      aiMessages.push({
        role: 'user',
        content: contentBlocks,
      })
    } else {
      // No attachments - simple text message
      aiMessages.push({
        role: 'user',
        content: message,
      })
    }

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

User says: "analyze [domain]" → YOU CALL MULTIPLE TOOLS FOR COMPREHENSIVE ANALYSIS:
  1. analyze_website(url) - basic meta/SEO
  2. analyze_robots_txt(url) - crawl directives
  3. analyze_sitemap(url) - sitemap structure
  4. multi_page_analysis(url, ["/", "/about", "/contact"]) - multi-page comparison
  5. extract_navigation(url) - site architecture
  6. validate_schema_markup(url) - structured data

**BE AGGRESSIVE WITH TOOL USAGE:**
- When user says "analyze", call AT LEAST 3-4 tools to get comprehensive data
- Don't wait for user to ask for specific things like robots.txt - JUST DO IT
- The more tools you call, the better your analysis will be
- Call tools in parallel when possible

User says: "check my site" → YOU CALL: get_user_sites() first, then analyze_website()
User says: "look at anthropic.com" → YOU CALL: Multiple analysis tools above
User says: "check robots.txt" → YOU CALL: analyze_robots_txt(url)
User says: "review sitemap" → YOU CALL: analyze_sitemap(url)

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

          // Collect tool uses and text content with completion tracking
          let fullTextContent = ''
          const toolUses: Array<{ id: string; name: string; input: any }> = []
          const toolInputs: Record<string, string> = {}
          let streamCompletedNormally = false

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

            // Track normal completion
            if (event.type === 'message_stop') {
              streamCompletedNormally = true
              console.log('✅ Initial AI stream completed normally')
            }
          }

          // Log initial response metrics
          console.log('📊 Initial Response Metrics:', {
            textLength: fullTextContent.length,
            toolsRequested: toolUses.length,
            completedNormally: streamCompletedNormally,
          })

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
              system: `You are SEOLOGY.AI's world-class SEO technical auditor. You just received REAL data from analyzing a website. Present a comprehensive, expert-level SEO analysis.

**YOU ARE AN SEO GOD - ACT LIKE IT:**

You have tools that pulled ACTUAL DATA:
- robots.txt content
- sitemap.xml structure
- Multi-page meta analysis
- Navigation architecture
- Schema.org markup validation

**MANDATORY: PRESENT TECHNICAL DEPTH**

When you analyzed a site, you MUST reference:

1. **ROBOTS.TXT ANALYSIS** (if you called analyze_robots_txt):
   - Specific directives found (User-agent, Disallow, Allow, Sitemap)
   - Crawl budget issues
   - Blocked resources that shouldn't be
   - Missing or misconfigured rules

2. **SITEMAP ANALYSIS** (if you called analyze_sitemap):
   - Total URLs in sitemap
   - URL patterns and structure
   - Priority/changefreq values
   - Issues: orphaned pages, 404s in sitemap, missing pages
   - Sitemap indexing status

3. **MULTI-PAGE METADATA** (if you called multi_page_analysis):
   - Specific pages analyzed with exact URLs
   - Meta title/description for EACH page
   - Duplicate titles/descriptions
   - Missing meta tags by page
   - Character count issues (titles >60 chars, descriptions not 150-160)
   - H1 tag analysis per page

4. **NAVIGATION STRUCTURE** (if you called extract_navigation):
   - Main nav links found
   - Internal linking structure
   - Orphaned pages
   - Deep link depth issues
   - Header/footer navigation analysis

5. **SCHEMA MARKUP** (if you called validate_schema_markup):
   - What schema types are present (Organization, Article, Product, etc.)
   - Validation errors in structured data
   - Missing required properties
   - Opportunities for rich results

**CRITICAL: ALWAYS CHECK USER'S CONNECTED SITES**
- Reference their connected site domain/brand if analyzing competitors
- Compare competitor to their site if you have context
- Mention how findings relate to their SEOLOGY dashboard

**TONE: EXPERT BUT DIRECT**
- Technical terminology is GOOD - you're talking to SEO professionals
- Cite specific metrics, counts, issues
- "I found 47 URLs in their sitemap, but only 23 are indexed"
- "robots.txt is blocking /assets/* which includes their CSS - major issue"
- "15 out of 20 pages have duplicate meta descriptions"

**FORBIDDEN:**
❌ Generic fluff like "good branding" without technical backing
❌ Vague statements like "SEO issues" without specifics
❌ Ignoring the actual data you received from tools
❌ Surface-level advice without actionable technical details

USER'S CURRENT CONTEXT:
${contextInfo}

EXAMPLE EXPERT RESPONSE:
"Analyzed pbtrading.io - here's the technical breakdown:

**CRITICAL ISSUES:**

robots.txt: They're blocking /wp-content/uploads/* which is preventing Google from crawling their images. This kills their image search visibility. Their robots.txt also has no sitemap reference.

Sitemap.xml: Found 127 URLs but discovered:
- 23 URLs return 404s (dead pages still in sitemap)
- No lastmod timestamps (Google can't prioritize fresh content)
- Priority set to 0.5 for all pages (no prioritization strategy)

Homepage Analysis:
- Title: 87 characters (truncated at ~60 in SERPs)
- Meta description: Only 102 chars (should be 150-160 to maximize snippet)
- 4 H1 tags detected (should be 1) - confuses topic focus
- Missing canonical tag (duplicate content risk)

**TECHNICAL DEBT:**
- Zero schema markup detected (missing Organization, LocalBusiness, Article schemas)
- No Open Graph images (poor social sharing)
- Navigation has 47 links in main nav (dilutes link equity)

**VS YOUR SITE:** [if applicable - compare to user's connected domain]

Want me to generate the exact robots.txt fixes and schema markup code they need?"`,
              messages: followUpMessages,
              stream: true,
            })

            // Stream the follow-up response with QA validation
            let followUpContentSent = false
            let followUpContentLength = 0
            let followUpFullText = ''
            let followUpCompletedNormally = false

            for await (const event of followUpResponse) {
              if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                followUpContentSent = true
                followUpContentLength += event.delta.text.length
                followUpFullText += event.delta.text
                const data = JSON.stringify({ content: event.delta.text })
                controller.enqueue(encoder.encode(`data: ${data}\n\n`))
              }

              // Track if response finished properly
              if (event.type === 'message_stop') {
                followUpCompletedNormally = true
                console.log('✅ Follow-up AI response completed normally')
              }
            }

            // QA VALIDATION LAYER - Ensure response is complete and substantial
            const isResponseComplete = followUpContentSent && followUpContentLength > 50 // At least 50 chars
            const hasSubstantiveContent = followUpFullText.trim().length > 100 // At least 100 chars of actual content
            const isNotJustThinking = !followUpFullText.includes('Taking a look') || followUpContentLength > 200
            const completedProperly = followUpCompletedNormally

            // Log QA metrics
            console.log('📊 Response QA Metrics:', {
              contentSent: followUpContentSent,
              contentLength: followUpContentLength,
              hasSubstantiveContent,
              isNotJustThinking,
              completedNormally: followUpCompletedNormally,
              toolsExecuted: toolUses.length,
            })

            // If response is incomplete or too short, send error
            if (!isResponseComplete || !hasSubstantiveContent || !isNotJustThinking || !completedProperly) {
              console.error('⚠️ INCOMPLETE RESPONSE DETECTED - Failed QA validation')
              console.error('QA Failure Details:', {
                isResponseComplete,
                hasSubstantiveContent,
                isNotJustThinking,
                completedProperly,
                contentLength: followUpContentLength,
              })
              console.error('Response snippet:', followUpFullText.substring(0, 200))

              const errorMessage = JSON.stringify({
                content: "\n\n---\n\n⚠️ **Response Quality Check Failed**\n\nI started analyzing but didn't deliver a complete response. This shouldn't happen - please try your request again. If this persists, try rephrasing your question or asking for one specific aspect at a time."
              })
              controller.enqueue(encoder.encode(`data: ${errorMessage}\n\n`))
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
