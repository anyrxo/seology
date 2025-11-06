/**
 * Meta Tags Generator with Claude AI
 *
 * AI-powered generation of optimal meta tags, Open Graph, and Twitter Cards
 * Uses Claude to create contextually relevant, SEO-optimized metadata
 */

import Anthropic from '@anthropic-ai/sdk'
import { Platform } from '@prisma/client'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const CLAUDE_MODEL = 'claude-sonnet-4-5'

// Response wrapper type
export interface ClaudeResponse<T> {
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
  }
}

/**
 * Internal Claude API wrapper
 */
async function callClaude<T>(
  systemPrompt: string,
  userPrompt: string,
  maxTokens: number = 2048,
  temperature: number = 0.3
): Promise<ClaudeResponse<T>> {
  try {
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

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
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'CLAUDE_API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
        retryable: false,
      },
    }
  }
}

// ==================== TYPES ====================

export interface MetaTagsInput {
  pageUrl: string
  title?: string
  currentDescription?: string
  content?: string
  pageType?: 'product' | 'collection' | 'article' | 'page' | 'homepage'
  keywords?: string[]
  brand?: string
  productInfo?: {
    name: string
    price?: number
    currency?: string
    availability?: string
    images?: string[]
  }
  articleInfo?: {
    author?: string
    publishDate?: Date
    category?: string
  }
}

export interface GeneratedMetaTags {
  title: string
  description: string
  keywords?: string
  canonicalUrl: string
  robots?: string

  // Open Graph
  ogTitle: string
  ogDescription: string
  ogImage?: string
  ogType: string
  ogUrl: string

  // Twitter Cards
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage?: string

  // Additional tags
  additionalTags?: Record<string, string>

  // AI metadata
  aiConfidence: number
  reasoning: string
}

export interface MetaTagsValidation {
  isValid: boolean
  warnings: string[]
  suggestions: string[]
}

// ==================== AI-POWERED GENERATION ====================

/**
 * Generate optimal meta tags using Claude AI
 */
export async function generateMetaTags(
  input: MetaTagsInput,
  platform: Platform
): Promise<ClaudeResponse<GeneratedMetaTags>> {
  const systemPrompt = `You are an expert SEO specialist focused on creating optimal meta tags for ${platform} websites.

Your task is to generate meta tags that:
1. Are within optimal character limits (Title: 50-60 chars, Description: 150-160 chars)
2. Include target keywords naturally
3. Compel clicks with action-oriented language
4. Match user search intent
5. Follow Google's SEO best practices
6. Are unique and descriptive

Generate complete meta tags including:
- Page title and meta description
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL
- Robots meta tag

Provide reasoning for your choices and a confidence score (0-100).`

  const contentSummary = input.content
    ? input.content.substring(0, 2000).replace(/\s+/g, ' ').trim()
    : 'No content provided'

  const userPrompt = `Generate optimal meta tags for this page:

URL: ${input.pageUrl}
Page Type: ${input.pageType || 'page'}
${input.title ? `Current Title: ${input.title}` : ''}
${input.currentDescription ? `Current Description: ${input.currentDescription}` : ''}
${input.brand ? `Brand: ${input.brand}` : ''}
${input.keywords && input.keywords.length > 0 ? `Target Keywords: ${input.keywords.join(', ')}` : ''}

${input.productInfo ? `Product Information:
- Name: ${input.productInfo.name}
- Price: ${input.productInfo.price ? `${input.productInfo.currency || 'USD'} ${input.productInfo.price}` : 'Not specified'}
- Availability: ${input.productInfo.availability || 'In Stock'}
- Images: ${input.productInfo.images?.length || 0} available
` : ''}

${input.articleInfo ? `Article Information:
- Author: ${input.articleInfo.author || 'Unknown'}
- Published: ${input.articleInfo.publishDate?.toISOString().split('T')[0] || 'Not specified'}
- Category: ${input.articleInfo.category || 'General'}
` : ''}

Page Content Preview:
${contentSummary}

Generate meta tags in this JSON format:
{
  "title": "Optimized page title (50-60 chars)",
  "description": "Compelling meta description (150-160 chars)",
  "keywords": "keyword1, keyword2, keyword3",
  "canonicalUrl": "${input.pageUrl}",
  "robots": "index, follow",
  "ogTitle": "Open Graph title",
  "ogDescription": "Open Graph description",
  "ogImage": "URL to best image",
  "ogType": "${input.pageType === 'product' ? 'product' : input.pageType === 'article' ? 'article' : 'website'}",
  "ogUrl": "${input.pageUrl}",
  "twitterCard": "summary_large_image",
  "twitterTitle": "Twitter title",
  "twitterDescription": "Twitter description",
  "twitterImage": "URL to best image",
  "aiConfidence": 85,
  "reasoning": "Explanation of your choices and strategy"
}`

  return callClaude<GeneratedMetaTags>(systemPrompt, userPrompt, 2048, 0.3)
}

/**
 * Generate meta description only (quick generation)
 */
export async function generateMetaDescription(
  pageTitle: string,
  content: string,
  keywords?: string[]
): Promise<ClaudeResponse<{ description: string; confidence: number }>> {
  const systemPrompt = `You are an expert at writing compelling meta descriptions for SEO.

Create meta descriptions that:
- Are 150-160 characters long (strict limit)
- Include target keywords naturally
- Compel users to click
- Accurately describe the page content
- Use active voice and clear language`

  const userPrompt = `Write an optimal meta description for this page:

Title: ${pageTitle}
${keywords && keywords.length > 0 ? `Keywords: ${keywords.join(', ')}` : ''}

Content Preview:
${content.substring(0, 1000)}

Return JSON:
{
  "description": "Your 150-160 character meta description",
  "confidence": 90
}`

  return callClaude<{ description: string; confidence: number }>(systemPrompt, userPrompt, 512, 0.3)
}

/**
 * Generate Open Graph tags for optimal social sharing
 */
export async function generateOpenGraphTags(
  pageUrl: string,
  title: string,
  description: string,
  imageUrls?: string[],
  pageType?: string
): Promise<{
  ogTitle: string
  ogDescription: string
  ogImage?: string
  ogType: string
  ogUrl: string
}> {
  // Use provided title/description or generate shorter versions for OG
  const ogTitle = title.length > 70 ? title.substring(0, 67) + '...' : title
  const ogDescription = description.length > 200 ? description.substring(0, 197) + '...' : description

  return {
    ogTitle,
    ogDescription,
    ogImage: imageUrls && imageUrls.length > 0 ? imageUrls[0] : undefined,
    ogType: pageType || 'website',
    ogUrl: pageUrl,
  }
}

/**
 * Generate Twitter Card tags
 */
export async function generateTwitterCardTags(
  title: string,
  description: string,
  imageUrls?: string[],
  twitterHandle?: string
): Promise<{
  twitterCard: string
  twitterTitle: string
  twitterDescription: string
  twitterImage?: string
  twitterSite?: string
}> {
  // Twitter has stricter limits
  const twitterTitle = title.length > 70 ? title.substring(0, 67) + '...' : title
  const twitterDescription = description.length > 200 ? description.substring(0, 197) + '...' : description

  return {
    twitterCard: imageUrls && imageUrls.length > 0 ? 'summary_large_image' : 'summary',
    twitterTitle,
    twitterDescription,
    twitterImage: imageUrls && imageUrls.length > 0 ? imageUrls[0] : undefined,
    twitterSite: twitterHandle,
  }
}

// ==================== VALIDATION ====================

/**
 * Validate generated meta tags
 */
export function validateMetaTags(tags: GeneratedMetaTags): MetaTagsValidation {
  const warnings: string[] = []
  const suggestions: string[] = []

  // Title validation
  if (tags.title.length < 30) {
    warnings.push('Title is too short (< 30 characters). Consider adding more descriptive text.')
  } else if (tags.title.length > 60) {
    warnings.push(`Title is too long (${tags.title.length} characters). Recommended: 50-60 characters. Google may truncate it.`)
  }

  // Description validation
  if (tags.description.length < 120) {
    warnings.push('Description is too short (< 120 characters). Consider adding more detail.')
  } else if (tags.description.length > 160) {
    warnings.push(`Description is too long (${tags.description.length} characters). Recommended: 150-160 characters. Google may truncate it.`)
  }

  // Check for duplicate title and description
  if (tags.title === tags.description) {
    warnings.push('Title and description are identical. They should be different to provide more information.')
  }

  // Open Graph validation
  if (!tags.ogImage) {
    suggestions.push('Consider adding an Open Graph image for better social media sharing.')
  }

  // Twitter Card validation
  if (tags.twitterCard === 'summary_large_image' && !tags.twitterImage) {
    warnings.push('Twitter card type is "summary_large_image" but no image is provided.')
  }

  // Canonical URL validation
  try {
    new URL(tags.canonicalUrl)
  } catch {
    warnings.push('Canonical URL is not a valid URL.')
  }

  // AI confidence check
  if (tags.aiConfidence < 70) {
    suggestions.push('AI confidence is low. Consider manually reviewing and adjusting the generated tags.')
  }

  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions,
  }
}

/**
 * Optimize existing meta tags
 */
export async function optimizeExistingMetaTags(
  currentTags: {
    title?: string
    description?: string
  },
  pageContent: string,
  targetKeywords?: string[]
): Promise<ClaudeResponse<{ title: string; description: string; improvements: string[] }>> {
  const systemPrompt = `You are an SEO expert analyzing and improving meta tags.

Analyze the current meta tags and suggest optimizations for:
1. Character length (title: 50-60, description: 150-160)
2. Keyword inclusion and placement
3. Click-through rate (CTR) optimization
4. Clarity and user intent matching`

  const userPrompt = `Optimize these meta tags:

Current Title: ${currentTags.title || 'MISSING'}
Current Description: ${currentTags.description || 'MISSING'}
${targetKeywords ? `Target Keywords: ${targetKeywords.join(', ')}` : ''}

Page Content:
${pageContent.substring(0, 2000)}

Return JSON:
{
  "title": "Optimized title",
  "description": "Optimized description",
  "improvements": [
    "What was improved in the title",
    "What was improved in the description"
  ]
}`

  return callClaude<{ title: string; description: string; improvements: string[] }>(systemPrompt, userPrompt, 1024, 0.3)
}

// ==================== BULK OPERATIONS ====================

/**
 * Generate meta tags for multiple pages in batch
 */
export async function generateBulkMetaTags(
  pages: Array<{
    url: string
    title?: string
    content: string
    pageType?: string
  }>,
  platform: Platform
): Promise<Array<ClaudeResponse<GeneratedMetaTags>>> {
  // Process in parallel with rate limiting
  const BATCH_SIZE = 5 // Process 5 at a time
  const results: Array<ClaudeResponse<GeneratedMetaTags>> = []

  for (let i = 0; i < pages.length; i += BATCH_SIZE) {
    const batch = pages.slice(i, i + BATCH_SIZE)
    const batchResults = await Promise.all(
      batch.map((page) =>
        generateMetaTags(
          {
            pageUrl: page.url,
            title: page.title,
            content: page.content,
            pageType: page.pageType as MetaTagsInput['pageType'],
          },
          platform
        )
      )
    )
    results.push(...batchResults)

    // Add delay between batches to respect rate limits
    if (i + BATCH_SIZE < pages.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Convert meta tags to HTML meta tags
 */
export function metaTagsToHTML(tags: GeneratedMetaTags): string {
  const metaTags: string[] = []

  // Basic meta tags
  metaTags.push(`<title>${escapeHtml(tags.title)}</title>`)
  metaTags.push(`<meta name="description" content="${escapeHtml(tags.description)}" />`)

  if (tags.keywords) {
    metaTags.push(`<meta name="keywords" content="${escapeHtml(tags.keywords)}" />`)
  }

  metaTags.push(`<link rel="canonical" href="${escapeHtml(tags.canonicalUrl)}" />`)

  if (tags.robots) {
    metaTags.push(`<meta name="robots" content="${escapeHtml(tags.robots)}" />`)
  }

  // Open Graph tags
  metaTags.push(`<meta property="og:title" content="${escapeHtml(tags.ogTitle)}" />`)
  metaTags.push(`<meta property="og:description" content="${escapeHtml(tags.ogDescription)}" />`)
  metaTags.push(`<meta property="og:type" content="${escapeHtml(tags.ogType)}" />`)
  metaTags.push(`<meta property="og:url" content="${escapeHtml(tags.ogUrl)}" />`)

  if (tags.ogImage) {
    metaTags.push(`<meta property="og:image" content="${escapeHtml(tags.ogImage)}" />`)
  }

  // Twitter Card tags
  metaTags.push(`<meta name="twitter:card" content="${escapeHtml(tags.twitterCard)}" />`)
  metaTags.push(`<meta name="twitter:title" content="${escapeHtml(tags.twitterTitle)}" />`)
  metaTags.push(`<meta name="twitter:description" content="${escapeHtml(tags.twitterDescription)}" />`)

  if (tags.twitterImage) {
    metaTags.push(`<meta name="twitter:image" content="${escapeHtml(tags.twitterImage)}" />`)
  }

  // Additional tags
  if (tags.additionalTags) {
    for (const [key, value] of Object.entries(tags.additionalTags)) {
      metaTags.push(`<meta name="${escapeHtml(key)}" content="${escapeHtml(value)}" />`)
    }
  }

  return metaTags.join('\n')
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

/**
 * Extract keywords from content using Claude AI
 */
export async function extractKeywords(
  content: string,
  maxKeywords: number = 10
): Promise<ClaudeResponse<{ keywords: string[]; relevanceScores: Record<string, number> }>> {
  const systemPrompt = `You are an SEO keyword extraction expert.

Extract the most relevant SEO keywords from content. Focus on:
- High search volume terms
- User search intent
- Long-tail keywords
- Topic relevance
- Commercial value`

  const userPrompt = `Extract the ${maxKeywords} most important SEO keywords from this content:

${content.substring(0, 3000)}

Return JSON:
{
  "keywords": ["keyword1", "keyword2", ...],
  "relevanceScores": {
    "keyword1": 95,
    "keyword2": 88,
    ...
  }
}`

  return callClaude<{ keywords: string[]; relevanceScores: Record<string, number> }>(systemPrompt, userPrompt, 1024)
}
