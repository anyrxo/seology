import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

const MODEL = 'claude-3-5-sonnet-20241022'

/**
 * System prompt for Seology AI
 */
const SEOLOGY_SYSTEM_PROMPT = `You are SEOLOGY, an expert SEO automation system built by Anyro. Your role is to:

1. **Analyze websites** for SEO issues with deep technical understanding
2. **Prioritize fixes** based on impact (traffic gain) and effort (implementation difficulty)
3. **Generate exact fixes** that can be automatically applied via API or script
4. **Consider platform constraints** (Shopify, WordPress, etc.)
5. **Follow best practices** - Google guidelines, no black-hat techniques

## Output Format
Always respond with valid JSON in this structure:
{
  "issues": [
    {
      "type": "missing_meta_description",
      "severity": "high",
      "page_url": "https://example.com/page",
      "details": {
        "current": null,
        "recommended": "SEO-optimized meta description"
      },
      "estimated_impact": 7,
      "fix": {
        "method": "api",
        "code": "exact implementation code or API payload"
      }
    }
  ],
  "summary": "Found X critical issues, Y high priority issues..."
}

## Issue Types
- missing_meta_description
- missing_meta_title
- duplicate_meta
- broken_internal_link
- broken_external_link
- missing_alt_text
- missing_h1
- duplicate_h1
- slow_page_speed
- missing_schema_markup
- non_canonical_url
- missing_robots_meta
- thin_content
- keyword_cannibalization

## Severity Levels
- critical: Directly impacts rankings (missing title tags, broken pages)
- high: Significant SEO impact (missing meta, broken links)
- medium: Optimization opportunities (alt text, schema)
- low: Minor improvements (internal linking)

## Impact Scale (1-10)
Estimate traffic increase potential:
- 1-3: Minor improvement
- 4-6: Moderate improvement
- 7-8: Significant improvement
- 9-10: Major ranking impact`

export interface SEOIssue {
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  page_url: string
  details: {
    current: any
    recommended: any
    [key: string]: any
  }
  estimated_impact: number
  fix: {
    method: 'api' | 'script' | 'manual'
    code: string
  }
}

export interface ClaudeAnalysisResponse {
  issues: SEOIssue[]
  summary: string
}

/**
 * Analyze a website for SEO issues
 */
export async function analyzeSite(siteData: {
  url: string
  platform: string
  pages: Array<{
    url: string
    title?: string
    meta_description?: string
    content?: string
    [key: string]: any
  }>
}): Promise<ClaudeAnalysisResponse> {
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: SEOLOGY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze this website for SEO issues:

Platform: ${siteData.platform}
URL: ${siteData.url}
Pages: ${JSON.stringify(siteData.pages, null, 2)}

Identify all SEO issues and provide specific fixes.`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse JSON response
    const result = JSON.parse(content.text)
    return result
  } catch (error) {
    console.error('Claude analysis error:', error)
    throw new Error('Failed to analyze site with Claude AI')
  }
}

/**
 * Generate SEO fix for a specific issue
 */
export async function generateFix(issue: {
  type: string
  page_url: string
  platform: string
  current_state: any
}): Promise<{
  fix_type: string
  implementation: {
    method: 'api' | 'script' | 'manual'
    code: string
    estimated_impact: number
  }
}> {
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: SEOLOGY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate an exact fix for this SEO issue:

Issue Type: ${issue.type}
Page: ${issue.page_url}
Platform: ${issue.platform}
Current State: ${JSON.stringify(issue.current_state)}

Provide the exact code or API payload to fix this issue.`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    return JSON.parse(content.text)
  } catch (error) {
    console.error('Fix generation error:', error)
    throw new Error('Failed to generate fix')
  }
}

/**
 * Chat with Claude about SEO strategy
 */
export async function chatWithClaude(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  context?: {
    site_url?: string
    platform?: string
    issues?: SEOIssue[]
  }
): Promise<string> {
  try {
    let systemPrompt = SEOLOGY_SYSTEM_PROMPT

    if (context) {
      systemPrompt += `\n\nContext:\n${JSON.stringify(context, null, 2)}`
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    return content.text
  } catch (error) {
    console.error('Chat error:', error)
    throw new Error('Failed to chat with Claude')
  }
}

export default client
