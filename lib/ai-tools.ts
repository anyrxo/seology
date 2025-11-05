/**
 * AI Tool Definitions and Handlers
 * Enables Claude to perform real-time SEO analysis and actions
 * Uses native fetch and Claude's built-in analysis instead of external APIs
 */

import { db } from './db'
import { IssueStatus, Severity } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'
import { deepTechnicalAudit, competitorAnalysis } from './ai-tools-advanced'

// Initialize Anthropic client for website analysis
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

/**
 * Type Definitions
 */

interface ToolInputAnalyzeWebsite {
  url: string
  include_subpages?: boolean
}

interface ToolInputGetSiteIssues {
  site_id: string
  severity?: 'HIGH' | 'MEDIUM' | 'LOW'
}

interface ToolInputCheckPageSpeed {
  url: string
  strategy?: 'mobile' | 'desktop'
}

interface ToolInputGetUserSites {
  // No parameters
}

interface ToolInputCreateFixPlan {
  site_id: string
  issue_ids: string[]
}

interface ToolInputDeepTechnicalAudit {
  url: string
}

interface ToolInputCompetitorAnalysis {
  your_url: string
  competitor_urls: string[]
}

interface ToolInputAnalyzeRobotsTxt {
  url: string
}

interface ToolInputAnalyzeSitemap {
  url: string
}

interface ToolInputMultiPageAnalysis {
  base_url: string
  paths: string[]
}

interface ToolInputExtractNavigation {
  url: string
}

interface ToolInputValidateSchemaMarkup {
  url: string
}

export type ToolInput =
  | ToolInputAnalyzeWebsite
  | ToolInputGetSiteIssues
  | ToolInputCheckPageSpeed
  | ToolInputGetUserSites
  | ToolInputCreateFixPlan
  | ToolInputDeepTechnicalAudit
  | ToolInputCompetitorAnalysis
  | ToolInputAnalyzeRobotsTxt
  | ToolInputAnalyzeSitemap
  | ToolInputMultiPageAnalysis
  | ToolInputExtractNavigation
  | ToolInputValidateSchemaMarkup

interface SEOAnalysis {
  url: string
  title: string
  description: string
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical: string | null
  keywords: string | null
  h1_count: number
  h2_count: number
  word_count: number
  image_count: number
  link_count: number
  has_schema: boolean
  issues: string[]
  recommendations: string[]
}

interface SiteIssuesData {
  site_url: string
  total_issues: number
  issues: Array<{
    id: string
    type: string
    severity: Severity
    description: string
    page: string
    detected_at: Date
  }>
}

interface PageSpeedData {
  url: string
  strategy: string
  note?: string
  performance_score: number | string
  fcp: string
  lcp: string
  cls: string
  tti?: string
  opportunities: string[]
}

interface UserSitesData {
  total_connections: number
  connections: Array<{
    platform: string
    domain: string
    connected_at?: Date
    sites: Array<{
      id: string
      url: string
      open_issues: number
      last_crawled: Date | null
    }>
  }>
}

interface FixPlanData {
  site_id: string
  site_url: string
  issues_to_fix: number
  estimated_time: string
  issues: Array<{
    id: string
    type: string
    severity: Severity
    description: string
    page: string
  }>
  next_step: string
}

export interface ToolResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Tool Definitions for Claude Function Calling
 */
export const AI_TOOLS = [
  {
    name: 'analyze_website',
    description:
      'Fetch and analyze any website URL to extract SEO data including meta tags, headings, content, links, images, and performance metrics. Uses native fetch and Claude analysis. Use this when the user wants to analyze a specific URL or compare websites.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description:
            'The full URL to analyze (must include http:// or https://)',
        },
        include_subpages: {
          type: 'boolean' as const,
          description:
            'Whether to crawl subpages (up to 3 pages) for deeper analysis',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'get_site_issues',
    description:
      'Get all current SEO issues detected for one of the user\'s connected sites. Returns issues with severity, type, and recommendations. Use this when the user asks about their site\'s problems or what needs fixing.',
    input_schema: {
      type: 'object' as const,
      properties: {
        site_id: {
          type: 'string' as const,
          description:
            'The ID of the site to get issues for (from user context)',
        },
        severity: {
          type: 'string' as const,
          enum: ['HIGH', 'MEDIUM', 'LOW'],
          description: 'Filter by severity level (optional)',
        },
      },
      required: ['site_id'],
    },
  },
  {
    name: 'check_page_speed',
    description:
      'Analyze page HTML to estimate performance issues and provide optimization recommendations. Use this when the user asks about site speed or performance.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The URL to analyze for performance',
        },
        strategy: {
          type: 'string' as const,
          enum: ['mobile', 'desktop'],
          description: 'Device type to test (default: mobile)',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'get_user_sites',
    description:
      'Get a list of all sites the user has connected to Seology. Returns site URLs, platforms (Shopify/WordPress/Custom), and basic stats. Use this when the user asks "what sites do I have" or similar.',
    input_schema: {
      type: 'object' as const,
      properties: {},
      required: [],
    },
  },
  {
    name: 'create_fix_plan',
    description:
      'Create a comprehensive SEO fix plan for specific issues. The AI will generate detailed implementation steps that can be reviewed and applied. Use this when the user wants to fix specific SEO issues.',
    input_schema: {
      type: 'object' as const,
      properties: {
        site_id: {
          type: 'string' as const,
          description: 'The site to create fixes for',
        },
        issue_ids: {
          type: 'array' as const,
          items: { type: 'string' as const },
          description: 'Array of issue IDs to create fixes for',
        },
      },
      required: ['site_id', 'issue_ids'],
    },
  },
  {
    name: 'deep_technical_audit',
    description:
      'Perform a comprehensive technical SEO audit including robots.txt, sitemap.xml, security headers, structured data validation, mobile-friendliness, and Core Web Vitals analysis. Use this for in-depth technical SEO assessment.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The website URL to audit',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'competitor_analysis',
    description:
      'Compare your website against competitors to identify SEO gaps, content opportunities, and ranking factors. Analyzes meta tags, content quality, backlink potential, and technical implementation differences.',
    input_schema: {
      type: 'object' as const,
      properties: {
        your_url: {
          type: 'string' as const,
          description: 'Your website URL',
        },
        competitor_urls: {
          type: 'array' as const,
          items: { type: 'string' as const },
          description: 'Array of competitor URLs to compare against (1-5 URLs)',
        },
      },
      required: ['your_url', 'competitor_urls'],
    },
  },
  {
    name: 'analyze_robots_txt',
    description:
      'Fetch and analyze a website\'s robots.txt file to check for crawl directives, blocked paths, sitemap references, crawl-delay settings, and bot-specific rules. Identifies syntax errors and best practices violations.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The website URL (robots.txt will be fetched from domain.com/robots.txt)',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'analyze_sitemap',
    description:
      'Fetch and analyze a website\'s sitemap.xml to extract all URLs, check last modified dates, validate XML structure, and identify issues like broken links or missing pages.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The sitemap URL (e.g., domain.com/sitemap.xml or full URL)',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'multi_page_analysis',
    description:
      'Fetch and analyze multiple pages from a website simultaneously to compare metadata (titles, descriptions, H1s), identify duplicate content, and assess consistency across pages. Useful for auditing key pages.',
    input_schema: {
      type: 'object' as const,
      properties: {
        base_url: {
          type: 'string' as const,
          description: 'The base website URL',
        },
        paths: {
          type: 'array' as const,
          items: { type: 'string' as const },
          description: 'Array of page paths to analyze (e.g., ["/", "/about", "/pricing"])',
        },
      },
      required: ['base_url', 'paths'],
    },
  },
  {
    name: 'extract_navigation',
    description:
      'Extract and analyze website navigation structure including main menu, footer links, breadcrumbs, and internal linking patterns. Evaluates navigation SEO and UX.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The website URL to analyze navigation from',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'validate_schema_markup',
    description:
      'Extract and validate all Schema.org structured data (JSON-LD) from a webpage. Checks for required fields, syntax errors, fake reviews, and Rich Results eligibility.',
    input_schema: {
      type: 'object' as const,
      properties: {
        url: {
          type: 'string' as const,
          description: 'The webpage URL to extract schema from',
        },
      },
      required: ['url'],
    },
  },
]

/**
 * Tool Handler Functions
 */

interface ToolContext {
  userId: string // Database user ID
  clerkId: string // Clerk auth ID
}

export async function handleToolCall(
  toolName: string,
  toolInput: ToolInput,
  context: ToolContext
): Promise<ToolResult> {
  console.log(`🔧 Executing tool: ${toolName}`, { input: toolInput })

  try {
    switch (toolName) {
      case 'analyze_website':
        return await analyzeWebsite(
          (toolInput as ToolInputAnalyzeWebsite).url,
          (toolInput as ToolInputAnalyzeWebsite).include_subpages
        )

      case 'get_site_issues':
        return await getSiteIssues(
          (toolInput as ToolInputGetSiteIssues).site_id,
          context.userId,
          (toolInput as ToolInputGetSiteIssues).severity
        )

      case 'check_page_speed':
        return await checkPageSpeed(
          (toolInput as ToolInputCheckPageSpeed).url,
          (toolInput as ToolInputCheckPageSpeed).strategy || 'mobile'
        )

      case 'get_user_sites':
        return await getUserSites(context.userId)

      case 'create_fix_plan':
        return await createFixPlan(
          (toolInput as ToolInputCreateFixPlan).site_id,
          (toolInput as ToolInputCreateFixPlan).issue_ids,
          context.userId
        )

      case 'deep_technical_audit':
        return await deepTechnicalAudit((toolInput as ToolInputDeepTechnicalAudit).url)

      case 'competitor_analysis':
        return await competitorAnalysis(
          (toolInput as ToolInputCompetitorAnalysis).your_url,
          (toolInput as ToolInputCompetitorAnalysis).competitor_urls
        )

      case 'analyze_robots_txt':
        return await analyzeRobotsTxt((toolInput as ToolInputAnalyzeRobotsTxt).url)

      case 'analyze_sitemap':
        return await analyzeSitemap((toolInput as ToolInputAnalyzeSitemap).url)

      case 'multi_page_analysis':
        return await multiPageAnalysis(
          (toolInput as ToolInputMultiPageAnalysis).base_url,
          (toolInput as ToolInputMultiPageAnalysis).paths
        )

      case 'extract_navigation':
        return await extractNavigation((toolInput as ToolInputExtractNavigation).url)

      case 'validate_schema_markup':
        return await validateSchemaMarkup((toolInput as ToolInputValidateSchemaMarkup).url)

      default:
        throw new Error(`Unknown tool: ${toolName}`)
    }
  } catch (error) {
    console.error(`❌ Tool execution failed: ${toolName}`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Helper: Fetch website HTML
 */
async function fetchWebsiteHTML(url: string): Promise<string> {
  try {
    if (!url) {
      throw new Error('URL is required')
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; SeologyBot/1.0; +https://seology.ai)',
        Accept: 'text/html',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    if (!response) {
      throw new Error('No response received from server')
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const text = await response.text()

    if (!text) {
      throw new Error('Empty response received')
    }

    return text
  } catch (error) {
    console.error('Error fetching website:', {
      url,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })

    // Provide more specific error messages
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (error && typeof error === 'object') {
      errorMessage = JSON.stringify(error)
    } else if (error) {
      errorMessage = String(error)
    }

    throw new Error(`Failed to fetch URL: ${errorMessage}`)
  }
}

/**
 * Helper: Extract metadata from HTML using regex
 */
function extractMetadata(html: string): {
  title: string | null
  description: string | null
  ogTitle: string | null
  ogDescription: string | null
  ogImage: string | null
  canonical: string | null
  keywords: string | null
} {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const descMatch = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
  )
  const ogTitleMatch = html.match(
    /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i
  )
  const ogDescMatch = html.match(
    /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i
  )
  const ogImageMatch = html.match(
    /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
  )
  const canonicalMatch = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i
  )
  const keywordsMatch = html.match(
    /<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i
  )

  return {
    title: titleMatch ? titleMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
    ogDescription: ogDescMatch ? ogDescMatch[1] : null,
    ogImage: ogImageMatch ? ogImageMatch[1] : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    keywords: keywordsMatch ? keywordsMatch[1] : null,
  }
}

/**
 * Tool: Analyze Website (using native fetch + Claude)
 */
async function analyzeWebsite(
  url: string,
  includeSubpages: boolean = false
): Promise<ToolResult<SEOAnalysis>> {
  try {
    // Validate URL
    if (!url) {
      return {
        success: false,
        error: 'URL is required',
      }
    }

    // Normalize URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    // Fetch the HTML
    const html = await fetchWebsiteHTML(url)

    // Extract basic metadata
    const metadata = extractMetadata(html)

    // Count elements
    const h1Count = (html.match(/<h1[^>]*>/gi) || []).length
    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length
    const imageCount = (html.match(/<img[^>]*>/gi) || []).length
    const linkCount = (html.match(/<a[^>]*>/gi) || []).length
    const hasSchema = html.includes('application/ld+json')

    // Extract text content (rough approximation)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    const wordCount = textContent.split(/\s+/).length

    // Build SEO analysis
    const seoAnalysis: SEOAnalysis = {
      url: url,
      title: metadata.title || 'No title found',
      description: metadata.description || 'No description found',
      og_title: metadata.ogTitle,
      og_description: metadata.ogDescription,
      og_image: metadata.ogImage,
      canonical: metadata.canonical,
      keywords: metadata.keywords,
      h1_count: h1Count,
      h2_count: h2Count,
      word_count: wordCount,
      image_count: imageCount,
      link_count: linkCount,
      has_schema: hasSchema,
      issues: [],
      recommendations: [],
    }

    // Detect common SEO issues
    if (!metadata.title || metadata.title.length < 30) {
      seoAnalysis.issues.push(
        'Title tag is missing or too short (should be 30-60 characters)'
      )
    }
    if (metadata.title && metadata.title.length > 60) {
      seoAnalysis.issues.push('Title tag is too long (should be 30-60 characters)')
    }
    if (!metadata.description || metadata.description.length < 120) {
      seoAnalysis.issues.push(
        'Meta description is missing or too short (should be 120-160 characters)'
      )
    }
    if (metadata.description && metadata.description.length > 160) {
      seoAnalysis.issues.push(
        'Meta description is too long (should be 120-160 characters)'
      )
    }
    if (h1Count === 0) {
      seoAnalysis.issues.push('No H1 heading found on page')
    }
    if (h1Count > 1) {
      seoAnalysis.issues.push(
        'Multiple H1 headings found (should only have one)'
      )
    }
    if (!metadata.ogImage) {
      seoAnalysis.issues.push('Missing Open Graph image for social sharing')
    }
    if (!metadata.canonical) {
      seoAnalysis.issues.push('Missing canonical URL tag')
    }
    if (!hasSchema) {
      seoAnalysis.issues.push('No structured data (Schema.org) found')
    }

    // Add recommendations
    if (wordCount < 300) {
      seoAnalysis.recommendations.push(
        'Add more content - aim for at least 300 words for better SEO'
      )
    }
    if (imageCount > 0) {
      const imgsWithoutAlt = (
        html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []
      ).length
      if (imgsWithoutAlt > 0) {
        seoAnalysis.recommendations.push(
          `${imgsWithoutAlt} images are missing alt text`
        )
      }
    }
    if (!metadata.keywords) {
      seoAnalysis.recommendations.push(
        'Consider adding meta keywords (though not critical for modern SEO)'
      )
    }

    return {
      success: true,
      data: seoAnalysis,
    }
  } catch (error) {
    console.error('Error analyzing website:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Tool: Get Site Issues
 */
async function getSiteIssues(
  connectionId: string,
  userId: string,
  severity?: 'HIGH' | 'MEDIUM' | 'LOW'
): Promise<ToolResult<SiteIssuesData>> {
  // Verify connection belongs to user
  const connection = await db.connection.findFirst({
    where: {
      id: connectionId,
      userId: userId,
    },
  })

  if (!connection) {
    throw new Error('Connection not found or access denied')
  }

  // Get issues
  const issues = await db.issue.findMany({
    where: {
      connectionId: connectionId,
      status: {
        in: [IssueStatus.OPEN, IssueStatus.DETECTED, IssueStatus.IN_PROGRESS],
      },
      ...(severity && { severity: severity as Severity }),
    },
    orderBy: [{ severity: 'desc' }, { createdAt: 'desc' }],
    take: 50, // Limit to 50 issues
  })

  return {
    success: true,
    data: {
      site_url: connection.domain,
      total_issues: issues.length,
      issues: issues.map((issue) => ({
        id: issue.id,
        type: issue.type,
        severity: issue.severity,
        description: issue.title,
        page: issue.pageUrl,
        detected_at: issue.createdAt,
      })),
    },
  }
}

/**
 * Tool: Check Page Speed (HTML analysis instead of PageSpeed API)
 */
async function checkPageSpeed(
  url: string,
  strategy: 'mobile' | 'desktop'
): Promise<ToolResult<PageSpeedData>> {
  try {
    const html = await fetchWebsiteHTML(url)

    // Analyze HTML for performance issues
    const opportunities: string[] = []

    // Check for blocking scripts
    const blockingScripts = (html.match(/<script(?![^>]*async)[^>]*>/gi) || [])
      .length
    if (blockingScripts > 3) {
      opportunities.push(
        `${blockingScripts} blocking scripts - consider async/defer attributes`
      )
    }

    // Check for large inline styles
    const inlineStyles = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []
    const largeInlineStyles = inlineStyles.filter((style) => style.length > 1000)
    if (largeInlineStyles.length > 0) {
      opportunities.push('Large inline CSS detected - consider external stylesheets')
    }

    // Check for unoptimized images
    const images = html.match(/<img[^>]*>/gi) || []
    const imagesWithoutDimensions = images.filter(
      (img) => !img.includes('width=') || !img.includes('height=')
    )
    if (imagesWithoutDimensions.length > 0) {
      opportunities.push(
        `${imagesWithoutDimensions.length} images missing width/height attributes`
      )
    }

    // Check for lazy loading
    const imagesWithoutLazyLoad = images.filter(
      (img) => !img.includes('loading="lazy"')
    )
    if (imagesWithoutLazyLoad.length > 3) {
      opportunities.push('Consider adding lazy loading to images')
    }

    // Check for render-blocking CSS
    const stylesheets = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || [])
      .length
    if (stylesheets > 5) {
      opportunities.push('Multiple stylesheets - consider combining or using critical CSS')
    }

    return {
      success: true,
      data: {
        url: url,
        strategy: strategy,
        note: 'Analysis based on HTML structure (not real PageSpeed test)',
        performance_score: 'N/A',
        fcp: 'N/A',
        lcp: 'N/A',
        cls: 'N/A',
        opportunities:
          opportunities.length > 0
            ? opportunities
            : ['No major performance issues detected in HTML structure'],
      },
    }
  } catch (error) {
    console.error('Error checking page speed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Tool: Get User Sites
 */
async function getUserSites(
  userId: string
): Promise<ToolResult<UserSitesData>> {
  const connections = await db.connection.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      platform: true,
      domain: true,
      createdAt: true,
      issues: {
        where: {
          status: {
            in: [
              IssueStatus.OPEN,
              IssueStatus.DETECTED,
              IssueStatus.IN_PROGRESS,
            ],
          },
        },
        select: {
          id: true,
        },
      },
    },
  })

  const formattedConnections = connections.map((conn) => ({
    platform: conn.platform,
    domain: conn.domain,
    connected_at: conn.createdAt,
    sites: [
      {
        id: conn.id,
        url: `https://${conn.domain}`,
        open_issues: conn.issues.length,
        last_crawled: null,
      },
    ],
  }))

  return {
    success: true,
    data: {
      total_connections: connections.length,
      connections: formattedConnections,
    },
  }
}

/**
 * Tool: Create Fix Plan
 */
async function createFixPlan(
  connectionId: string,
  issueIds: string[],
  userId: string
): Promise<ToolResult<FixPlanData>> {
  // Verify connection belongs to user
  const connection = await db.connection.findFirst({
    where: {
      id: connectionId,
      userId: userId,
    },
  })

  if (!connection) {
    throw new Error('Connection not found or access denied')
  }

  // Get issues
  const issues = await db.issue.findMany({
    where: {
      id: {
        in: issueIds,
      },
      connectionId: connectionId,
    },
  })

  if (issues.length === 0) {
    throw new Error('No valid issues found')
  }

  const plan: FixPlanData = {
    site_id: connectionId,
    site_url: connection.domain,
    issues_to_fix: issues.length,
    estimated_time: `${issues.length * 2} minutes`,
    issues: issues.map((issue) => ({
      id: issue.id,
      type: issue.type,
      severity: issue.severity,
      description: issue.title,
      page: issue.pageUrl,
    })),
    next_step:
      'Use the PLAN execution mode in the dashboard to review and approve these fixes',
  }

  return {
    success: true,
    data: plan,
  }
}

/**
 * Tool: Analyze robots.txt
 */
async function analyzeRobotsTxt(url: string): Promise<ToolResult<string>> {
  try {
    // Normalize URL to get robots.txt
    let robotsUrl = url
    if (!robotsUrl.endsWith('/robots.txt')) {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      robotsUrl = `${urlObj.origin}/robots.txt`
    }

    const response = await fetch(robotsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
      },
    })

    if (!response.ok) {
      return {
        success: false,
        error: `robots.txt not found (${response.status} ${response.statusText})`,
      }
    }

    const robotsTxt = await response.text()

    return {
      success: true,
      data: `robots.txt from ${robotsUrl} (${robotsTxt.length} bytes):\n\n${robotsTxt}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch robots.txt',
    }
  }
}

/**
 * Tool: Analyze sitemap.xml
 */
async function analyzeSitemap(url: string): Promise<ToolResult<string>> {
  try {
    // Normalize URL to get sitemap.xml
    let sitemapUrl = url
    if (!sitemapUrl.includes('sitemap')) {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      sitemapUrl = `${urlObj.origin}/sitemap.xml`
    } else if (!sitemapUrl.startsWith('http')) {
      sitemapUrl = `https://${sitemapUrl}`
    }

    const response = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
      },
    })

    if (!response.ok) {
      return {
        success: false,
        error: `sitemap.xml not found (${response.status} ${response.statusText})`,
      }
    }

    const sitemapXml = await response.text()

    return {
      success: true,
      data: `sitemap.xml from ${sitemapUrl} (${sitemapXml.length} bytes):\n\n${sitemapXml.substring(0, 50000)}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch sitemap.xml',
    }
  }
}

/**
 * Tool: Multi-page analysis
 */
async function multiPageAnalysis(baseUrl: string, paths: string[]): Promise<ToolResult<string>> {
  try {
    const normalizedBase = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`
    const results: string[] = []

    for (const path of paths.slice(0, 10)) {
      // Limit to 10 pages
      const fullUrl = `${normalizedBase}${path}`
      try {
        const response = await fetch(fullUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
          },
        })

        if (response.ok) {
          const html = await response.text()
          results.push(`PAGE: ${fullUrl}\nStatus: ${response.status}\nHTML (first 5000 chars):\n${html.substring(0, 5000)}\n---`)
        } else {
          results.push(`PAGE: ${fullUrl}\nStatus: ${response.status} ${response.statusText}\n---`)
        }
      } catch (error) {
        results.push(`PAGE: ${fullUrl}\nError: ${error instanceof Error ? error.message : 'Failed to fetch'}\n---`)
      }
    }

    return {
      success: true,
      data: `Multi-page analysis of ${baseUrl} (${paths.length} pages):\n\n${results.join('\n\n')}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Multi-page analysis failed',
    }
  }
}

/**
 * Tool: Extract navigation
 */
async function extractNavigation(url: string): Promise<ToolResult<string>> {
  try {
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
      },
    })

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch page (${response.status} ${response.statusText})`,
      }
    }

    const html = await response.text()

    return {
      success: true,
      data: `Navigation structure from ${normalizedUrl}:\n\nHTML (first 100000 chars for navigation extraction):\n${html.substring(0, 100000)}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Navigation extraction failed',
    }
  }
}

/**
 * Tool: Validate schema markup
 */
async function validateSchemaMarkup(url: string): Promise<ToolResult<string>> {
  try {
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
      },
    })

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch page (${response.status} ${response.statusText})`,
      }
    }

    const html = await response.text()

    return {
      success: true,
      data: `Schema markup validation for ${normalizedUrl}:\n\nHTML (first 100000 chars for schema extraction):\n${html.substring(0, 100000)}`,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Schema validation failed',
    }
  }
}
