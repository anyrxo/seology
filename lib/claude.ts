/**
 * Claude AI Integration Wrapper for SEOLOGY.AI
 *
 * Comprehensive wrapper around Anthropic's Claude API for SEO analysis and fix generation
 * with prompt caching, error handling, and platform-specific code generation
 */

import Anthropic from '@anthropic-ai/sdk'
import { Platform, Severity, Issue } from '@prisma/client'
import { db } from './db'

// ==================== CONFIGURATION ====================

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const CLAUDE_MODEL = 'claude-3-5-sonnet-20241022'
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000
const REQUEST_TIMEOUT_MS = 60000

// ==================== TYPES ====================

export interface SEOIssue {
  type: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  pageUrl: string
  title: string
  description: string
  recommendation: string
  fixCode?: string
  impactEstimate?: string
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface SEOAnalysisResult {
  issues: SEOIssue[]
  summary: {
    totalIssues: number
    criticalIssues: number
    highIssues: number
    mediumIssues: number
    lowIssues: number
  }
  recommendations: string[]
  siteContext?: SiteContext
}

export interface PageData {
  url: string
  title: string
  content: string
  metaDescription?: string
  headings?: {
    h1: string[]
    h2: string[]
    h3: string[]
  }
  images?: Array<{
    src: string
    alt?: string
  }>
  links?: Array<{
    href: string
    text: string
    isInternal: boolean
  }>
  wordCount?: number
  loadTimeMs?: number
}

export interface SiteContext {
  domain: string
  platform: Platform
  totalPages: number
  siteStructure?: string
  industry?: string
  targetKeywords?: string[]
}

export interface FixPlan {
  description: string
  code: string
  steps: string[]
  estimatedTime?: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  rollbackPlan?: string
  testingSteps?: string[]
}

export interface StateSnapshot {
  timestamp: string
  content?: string
  metadata?: Record<string, string | number | boolean>
  html?: string
  css?: string
  [key: string]: string | number | boolean | Record<string, string | number | boolean> | undefined
}

export interface FixImplementation {
  platform: Platform
  code: string
  language: string
  instructions: string[]
  beforeState: StateSnapshot
  afterState: StateSnapshot
  validation: string[]
  rollbackCode?: string
}

export interface FixReview {
  safe: boolean
  warnings?: string[]
  recommendations?: string[]
  requiredApproval: boolean
  riskAssessment: {
    level: 'LOW' | 'MEDIUM' | 'HIGH'
    factors: string[]
  }
}

export interface ClaudeRequest {
  systemPrompt: string
  userPrompt: string
  maxTokens?: number
  temperature?: number
  cacheContext?: boolean
}

export interface ClaudeResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    retryable: boolean
  }
  usage?: {
    inputTokens: number
    outputTokens: number
    cacheCreationTokens?: number
    cacheReadTokens?: number
  }
}

// ==================== CORE CLAUDE API WRAPPER ====================

/**
 * Low-level Claude API request wrapper with retry logic and error handling
 */
async function claudeRequest<T>(request: ClaudeRequest): Promise<ClaudeResponse<T>> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const systemContent: Anthropic.Messages.MessageCreateParams['system'] = request.cacheContext
        ? [
            {
              type: 'text' as const,
              text: request.systemPrompt,
              cache_control: { type: 'ephemeral' as const },
            },
          ]
        : request.systemPrompt

      const message = await anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: request.maxTokens || 4096,
        temperature: request.temperature || 0,
        system: systemContent,
        messages: [
          {
            role: 'user',
            content: request.userPrompt,
          },
        ],
      })

      // Extract text content
      const content = message.content[0]
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude')
      }

      // Parse JSON response
      let jsonText = content.text
      const jsonMatch = content.text.match(/```json\n([\s\S]*?)\n```/)
      if (jsonMatch) {
        jsonText = jsonMatch[1]
      }

      const data = JSON.parse(jsonText) as T

      return {
        success: true,
        data,
        usage: {
          inputTokens: message.usage.input_tokens,
          outputTokens: message.usage.output_tokens,
          cacheCreationTokens: 'cache_creation_input_tokens' in message.usage ? (message.usage as {cache_creation_input_tokens?: number}).cache_creation_input_tokens : undefined,
          cacheReadTokens: 'cache_read_input_tokens' in message.usage ? (message.usage as {cache_read_input_tokens?: number}).cache_read_input_tokens : undefined,
        },
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error')

      // Check if error is retryable
      const isRateLimitError =
        error instanceof Error && error.message.toLowerCase().includes('rate limit')
      const isTimeoutError = error instanceof Error && error.message.toLowerCase().includes('timeout')

      if ((isRateLimitError || isTimeoutError) && attempt < MAX_RETRIES) {
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt))
        continue
      }

      // Non-retryable error or max retries reached
      break
    }
  }

  return {
    success: false,
    error: {
      code: 'CLAUDE_API_ERROR',
      message: lastError?.message || 'Unknown error',
      retryable: false,
    },
  }
}

/**
 * Extract structured data from page HTML
 */
function extractPageData(html: string, url: string): PageData {
  const cheerio = require('cheerio')
  const $ = cheerio.load(html)

  const pageData: PageData = {
    url,
    title: $('title').text().trim(),
    content: html,
    metaDescription: $('meta[name="description"]').attr('content'),
    headings: {
      h1: $('h1')
        .map((_: number, el: Element) => $(el).text().trim())
        .get(),
      h2: $('h2')
        .map((_: number, el: Element) => $(el).text().trim())
        .get(),
      h3: $('h3')
        .map((_: number, el: Element) => $(el).text().trim())
        .get(),
    },
    images: $('img')
      .map((_: number, el: Element) => ({
        src: $(el).attr('src') || '',
        alt: $(el).attr('alt'),
      }))
      .get(),
    links: $('a[href]')
      .map((_: number, el: Element) => {
        const href = $(el).attr('href') || ''
        return {
          href,
          text: $(el).text().trim(),
          isInternal: href.startsWith('/') || href.includes(new URL(url).hostname),
        }
      })
      .get(),
    wordCount: $('body').text().trim().split(/\s+/).length,
  }

  return pageData
}

// ==================== MAIN API FUNCTIONS ====================

/**
 * Analyze a website for SEO issues using Claude AI
 */
export async function analyzeSiteForSEO(
  siteUrl: string,
  pageContent: string,
  platform: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'GITHUB' | 'CUSTOM'
): Promise<SEOAnalysisResult> {
  const prompt = `You are an expert SEO analyzer. Analyze the following website content and identify SEO issues.

Website URL: ${siteUrl}
Platform: ${platform}

Page Content:
${pageContent.substring(0, 50000)} // Limit content to avoid token limits

Please analyze this page and provide:
1. A list of SEO issues found (missing meta tags, broken links, missing alt text, poor heading structure, etc.)
2. Severity level for each issue (CRITICAL, HIGH, MEDIUM, LOW)
3. Specific recommendations for fixing each issue
4. If possible, provide the exact code/fix to apply

Format your response as a JSON object with this structure:
{
  "issues": [
    {
      "type": "missing_meta_description",
      "severity": "HIGH",
      "pageUrl": "${siteUrl}",
      "title": "Missing Meta Description",
      "description": "The page is missing a meta description tag",
      "recommendation": "Add a meta description tag with 150-160 characters",
      "fixCode": "<meta name=\\"description\\" content=\\"Your description here\\">"
    }
  ],
  "recommendations": [
    "Overall recommendation 1",
    "Overall recommendation 2"
  ]
}`

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract JSON from Claude's response
  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const responseText = content.text

  // Try to extract JSON from response (Claude might wrap it in markdown code blocks)
  let jsonText = responseText
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  }

  const analysisData = JSON.parse(jsonText) as {
    issues: SEOIssue[]
    recommendations: string[]
  }

  // Calculate summary
  const summary = {
    totalIssues: analysisData.issues.length,
    criticalIssues: analysisData.issues.filter((i) => i.severity === 'CRITICAL').length,
    highIssues: analysisData.issues.filter((i) => i.severity === 'HIGH').length,
    mediumIssues: analysisData.issues.filter((i) => i.severity === 'MEDIUM').length,
    lowIssues: analysisData.issues.filter((i) => i.severity === 'LOW').length,
  }

  return {
    issues: analysisData.issues,
    summary,
    recommendations: analysisData.recommendations,
  }
}

/**
 * Generate a fix plan for a specific SEO issue
 */
export async function generateFixPlan(
  issue: {
    type: string
    severity: string
    pageUrl: string
    description: string
  },
  platform: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'GITHUB' | 'CUSTOM',
  currentContent?: string
): Promise<{
  fixDescription: string
  fixCode: string
  steps: string[]
}> {
  const prompt = `You are an expert SEO fix generator for ${platform} websites.

Issue to fix:
- Type: ${issue.type}
- Severity: ${issue.severity}
- Page: ${issue.pageUrl}
- Description: ${issue.description}

${currentContent ? `Current content:\n${currentContent.substring(0, 10000)}` : ''}

Generate a detailed fix plan that includes:
1. A clear description of what needs to be fixed
2. The exact code/changes to apply (platform-specific)
3. Step-by-step instructions

Format your response as JSON:
{
  "fixDescription": "Clear description of the fix",
  "fixCode": "Exact code or configuration to apply",
  "steps": ["Step 1", "Step 2", "Step 3"]
}`

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const responseText = content.text

  // Try to extract JSON from response
  let jsonText = responseText
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  }

  return JSON.parse(jsonText) as {
    fixDescription: string
    fixCode: string
    steps: string[]
  }
}

// ==================== NEW COMPREHENSIVE FUNCTIONS ====================

/**
 * Analyze site for SEO issues (with multiple pages)
 * Uses prompt caching for efficiency
 */
export async function analyzeSite(
  siteId: string,
  pages: PageData[]
): Promise<ClaudeResponse<{ issues: Issue[] }>> {
  const connection = await db.connection.findUnique({
    where: { id: siteId },
    select: { domain: true, platform: true }
  })

  if (!connection) {
    return {
      success: false,
      error: {
        code: 'CONNECTION_NOT_FOUND',
        message: 'Site connection not found',
        retryable: false
      }
    }
  }

  const siteContext: SiteContext = {
    domain: connection.domain,
    platform: connection.platform,
    totalPages: pages.length
  }

  const systemPrompt = `You are an expert SEO analyst specializing in ${connection.platform} websites.
Your task is to analyze website pages and identify SEO issues that can be automatically fixed.

Focus on these issue types:
- Missing or suboptimal meta titles and descriptions
- Broken internal/external links
- Missing alt text on images
- Poor heading hierarchy (H1, H2, H3)
- Slow-loading resources
- Mobile responsiveness issues
- Schema markup opportunities
- Canonical URL issues
- Duplicate content

For each issue, provide:
1. Specific issue type
2. Severity level (CRITICAL, HIGH, MEDIUM, LOW)
3. Detailed description
4. Actionable recommendation
5. Estimated impact on SEO`

  const userPrompt = `Analyze these ${pages.length} pages from ${connection.domain}:

${pages.map((p, i) => `
Page ${i + 1}: ${p.url}
Title: ${p.title}
Meta Description: ${p.metaDescription || 'MISSING'}
H1 Count: ${p.headings?.h1.length || 0}
Images without alt: ${p.images?.filter(img => !img.alt).length || 0}
Word count: ${p.wordCount || 0}
`).join('\n')}

Return a JSON array of issues in this format:
{
  "issues": [
    {
      "type": "missing_meta_description",
      "severity": "HIGH",
      "pageUrl": "/page-url",
      "title": "Missing Meta Description",
      "description": "Detailed description of the issue",
      "recommendation": "Specific fix recommendation",
      "fixCode": "Exact code to implement (if applicable)",
      "impactEstimate": "Expected SEO impact",
      "riskLevel": "LOW"
    }
  ]
}`

  return claudeRequest<{ issues: Issue[] }>({
    systemPrompt,
    userPrompt,
    maxTokens: 8192,
    cacheContext: true
  })
}

/**
 * Generate comprehensive fix plan for multiple issues
 */
export async function generateFixPlanForIssues(
  issues: Issue[],
  platform: Platform
): Promise<ClaudeResponse<{ fixes: FixPlan[] }>> {
  const systemPrompt = `You are an expert SEO fix implementation specialist for ${platform} websites.
Generate detailed, platform-specific fix plans that can be automatically executed.

For each fix, provide:
1. Clear description of what will be changed
2. Exact platform-specific code (Liquid for Shopify, PHP for WordPress, JavaScript for custom)
3. Step-by-step implementation instructions
4. Risk assessment (LOW/MEDIUM/HIGH)
5. Rollback plan
6. Testing steps to verify the fix`

  const userPrompt = `Generate fix plans for these ${issues.length} SEO issues:

${issues.map((issue, i) => `
Issue ${i + 1}:
- Type: ${issue.type}
- Severity: ${issue.severity}
- Page: ${issue.pageUrl}
- Title: ${issue.title}
- Details: ${issue.details}
`).join('\n')}

Return JSON with this structure:
{
  "fixes": [
    {
      "description": "Fix description",
      "code": "Platform-specific code",
      "steps": ["Step 1", "Step 2"],
      "estimatedTime": "5 minutes",
      "riskLevel": "LOW",
      "rollbackPlan": "How to revert if needed",
      "testingSteps": ["Test 1", "Test 2"]
    }
  ]
}`

  return claudeRequest<{ fixes: FixPlan[] }>({
    systemPrompt,
    userPrompt,
    maxTokens: 8192
  })
}

/**
 * Generate platform-specific fix implementation
 */
export async function generateFixImplementation(
  issue: Issue,
  platform: Platform
): Promise<ClaudeResponse<FixImplementation>> {
  const platformDetails = {
    SHOPIFY: {
      language: 'Liquid',
      context: 'Shopify theme files, using Liquid templating and Shopify API'
    },
    WORDPRESS: {
      language: 'PHP',
      context: 'WordPress theme/plugin, using WordPress hooks and filters'
    },
    WIX: {
      language: 'JavaScript',
      context: 'Wix Velo (JavaScript) code'
    },
    GITHUB: {
      language: 'HTML/JavaScript',
      context: 'GitHub Pages static site, using HTML, CSS, and JavaScript'
    },
    CUSTOM: {
      language: 'JavaScript',
      context: 'Custom website using vanilla JavaScript or framework'
    }
  }

  const details = platformDetails[platform]

  const systemPrompt = `You are an expert ${platform} developer specializing in SEO implementations.
Generate production-ready, tested code that can be automatically applied.

Context: ${details.context}
Language: ${details.language}

Requirements:
- Code must be safe and not break existing functionality
- Include proper error handling
- Capture before/after state for rollback capability
- Provide validation checks
- Include rollback code`

  const userPrompt = `Generate implementation for this SEO fix:

Issue Type: ${issue.type}
Page URL: ${issue.pageUrl}
Description: ${issue.title}
Details: ${issue.details}
Recommendation: ${issue.recommendation || 'Fix this issue'}

Return JSON:
{
  "platform": "${platform}",
  "code": "Complete implementation code",
  "language": "${details.language}",
  "instructions": ["Step 1", "Step 2"],
  "beforeState": {
    "timestamp": "ISO date",
    "content": "Current state data"
  },
  "afterState": {
    "timestamp": "ISO date",
    "content": "Expected state after fix"
  },
  "validation": ["Check 1", "Check 2"],
  "rollbackCode": "Code to revert changes"
}`

  return claudeRequest<FixImplementation>({
    systemPrompt,
    userPrompt,
    maxTokens: 4096
  })
}

/**
 * Review and validate a fix before applying
 */
export async function reviewFix(fix: {
  id: string
  description: string
  changes: string
  issueType: string
  platform: Platform
}): Promise<ClaudeResponse<FixReview>> {
  const systemPrompt = `You are an expert code reviewer specializing in SEO fixes and website safety.
Analyze fixes for potential risks and provide safety recommendations.

Evaluate:
1. Code safety (no destructive operations)
2. SEO impact (positive/negative/neutral)
3. Performance impact
4. User experience impact
5. Reversibility
6. Edge cases and potential issues`

  const userPrompt = `Review this SEO fix:

Platform: ${fix.platform}
Issue Type: ${fix.issueType}
Description: ${fix.description}

Code to be applied:
\`\`\`
${fix.changes}
\`\`\`

Provide a safety review in JSON format:
{
  "safe": true/false,
  "warnings": ["Warning 1", "Warning 2"],
  "recommendations": ["Recommendation 1"],
  "requiredApproval": true/false,
  "riskAssessment": {
    "level": "LOW|MEDIUM|HIGH",
    "factors": ["Risk factor 1", "Risk factor 2"]
  }
}`

  return claudeRequest<FixReview>({
    systemPrompt,
    userPrompt,
    maxTokens: 2048
  })
}

/**
 * Cache site context for efficient subsequent requests
 */
export async function cacheSiteContext(
  siteId: string,
  context: SiteContext
): Promise<void> {
  // Store context in database for reuse
  await db.connection.update({
    where: { id: siteId },
    data: {
      // Store as JSON in a metadata field (would need to add this field to schema)
      credentials: JSON.stringify({ siteContext: context })
    }
  })
}

/**
 * Get cached site context
 */
export async function getCachedSiteContext(
  siteId: string
): Promise<SiteContext | null> {
  const connection = await db.connection.findUnique({
    where: { id: siteId },
    select: { credentials: true, domain: true, platform: true }
  })

  if (!connection) return null

  try {
    if (connection.credentials) {
      const parsed = JSON.parse(connection.credentials)
      if (parsed.siteContext) {
        return parsed.siteContext as SiteContext
      }
    }
  } catch {
    // Invalid JSON, return basic context
  }

  // Return basic context if no cached data
  return {
    domain: connection.domain,
    platform: connection.platform,
    totalPages: 0
  }
}
