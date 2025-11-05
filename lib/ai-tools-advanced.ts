/**
 * Advanced AI Tools - Deep Technical SEO & Competitive Analysis
 */

import { ToolResult } from './ai-tools'

interface TechnicalAuditData {
  url: string
  robots_txt: {
    exists: boolean
    content?: string
    issues: string[]
    recommendations: string[]
  }
  sitemap: {
    exists: boolean
    url?: string
    valid: boolean
    issues: string[]
  }
  security_headers: {
    https: boolean
    hsts: boolean
    csp: boolean
    x_frame_options: boolean
    x_content_type: boolean
    issues: string[]
    recommendations: string[]
  }
  structured_data: {
    has_schema: boolean
    types_found: string[]
    validation_errors: string[]
    recommendations: string[]
  }
  mobile_optimization: {
    has_viewport: boolean
    responsive: boolean
    mobile_friendly_score: string
    issues: string[]
  }
  accessibility: {
    has_alt_text_issues: boolean
    has_aria_labels: boolean
    contrast_issues: number
    recommendations: string[]
  }
  overall_score: number
  critical_issues: number
  warnings: number
}

interface CompetitorComparisonData {
  your_site: {
    url: string
    title_length: number
    description_length: number
    h1_count: number
    word_count: number
    image_count: number
    has_schema: boolean
    page_speed_estimate: string
  }
  competitors: Array<{
    url: string
    title_length: number
    description_length: number
    h1_count: number
    word_count: number
    image_count: number
    has_schema: boolean
    page_speed_estimate: string
  }>
  gaps: string[]
  opportunities: string[]
  advantages: string[]
  priority_actions: string[]
}

/**
 * Fetch and parse robots.txt
 */
async function fetchRobotsTxt(url: string): Promise<{
  exists: boolean
  content?: string
  issues: string[]
  recommendations: string[]
}> {
  try {
    const robotsUrl = new URL('/robots.txt', url).toString()
    const response = await fetch(robotsUrl)

    if (!response.ok) {
      return {
        exists: false,
        issues: ['robots.txt not found (404)'],
        recommendations: [
          'Create a robots.txt file to control crawler access',
          'At minimum, add: User-agent: * / Disallow:',
        ],
      }
    }

    const content = await response.text()
    const issues: string[] = []
    const recommendations: string[] = []

    // Check for common issues
    if (!content.includes('Sitemap:')) {
      issues.push('No sitemap reference found')
      recommendations.push('Add Sitemap: https://yourdomain.com/sitemap.xml')
    }

    if (content.toLowerCase().includes('disallow: /')) {
      issues.push('Blocking all crawlers - this prevents indexing!')
      recommendations.push('Review Disallow rules - you may be blocking important content')
    }

    if (content.length < 20) {
      issues.push('robots.txt is very short - may be incomplete')
    }

    return {
      exists: true,
      content: content.slice(0, 500), // First 500 chars
      issues,
      recommendations,
    }
  } catch (error) {
    return {
      exists: false,
      issues: ['Error fetching robots.txt'],
      recommendations: ['Ensure robots.txt is accessible at root domain'],
    }
  }
}

/**
 * Check for sitemap
 */
async function checkSitemap(url: string): Promise<{
  exists: boolean
  url?: string
  valid: boolean
  issues: string[]
}> {
  const sitemapUrls = [
    new URL('/sitemap.xml', url).toString(),
    new URL('/sitemap_index.xml', url).toString(),
  ]

  for (const sitemapUrl of sitemapUrls) {
    try {
      const response = await fetch(sitemapUrl, { method: 'HEAD' })
      if (response.ok) {
        return {
          exists: true,
          url: sitemapUrl,
          valid: true,
          issues: [],
        }
      }
    } catch (error) {
      // Continue to next URL
    }
  }

  return {
    exists: false,
    valid: false,
    issues: [
      'No sitemap found at standard locations',
      'Check for sitemap reference in robots.txt',
    ],
  }
}

/**
 * Check security headers
 */
async function checkSecurityHeaders(url: string): Promise<{
  https: boolean
  hsts: boolean
  csp: boolean
  x_frame_options: boolean
  x_content_type: boolean
  issues: string[]
  recommendations: string[]
}> {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    const headers = response.headers

    const https = url.startsWith('https://')
    const hsts = headers.has('strict-transport-security')
    const csp = headers.has('content-security-policy')
    const xFrameOptions = headers.has('x-frame-options')
    const xContentType = headers.has('x-content-type-options')

    const issues: string[] = []
    const recommendations: string[] = []

    if (!https) {
      issues.push('Site not using HTTPS - critical security issue')
      recommendations.push('Enable HTTPS immediately - it\'s also a ranking factor')
    }

    if (https && !hsts) {
      issues.push('Missing HSTS header')
      recommendations.push('Add Strict-Transport-Security header to enforce HTTPS')
    }

    if (!csp) {
      issues.push('Missing Content Security Policy')
      recommendations.push('Implement CSP to prevent XSS attacks')
    }

    if (!xFrameOptions) {
      issues.push('Missing X-Frame-Options header')
      recommendations.push('Add X-Frame-Options to prevent clickjacking')
    }

    if (!xContentType) {
      issues.push('Missing X-Content-Type-Options header')
      recommendations.push('Add X-Content-Type-Options: nosniff')
    }

    return {
      https,
      hsts,
      csp,
      x_frame_options: xFrameOptions,
      x_content_type: xContentType,
      issues,
      recommendations,
    }
  } catch (error) {
    return {
      https: false,
      hsts: false,
      csp: false,
      x_frame_options: false,
      x_content_type: false,
      issues: ['Error checking security headers'],
      recommendations: ['Ensure site is accessible'],
    }
  }
}

/**
 * Deep Technical Audit Tool
 */
export async function deepTechnicalAudit(
  url: string
): Promise<ToolResult<TechnicalAuditData>> {
  try {
    // Fetch HTML for analysis
    const response = await fetch(url)
    const html = await response.text()

    // Run parallel checks
    const [robotsTxt, sitemap, securityHeaders] = await Promise.all([
      fetchRobotsTxt(url),
      checkSitemap(url),
      checkSecurityHeaders(url),
    ])

    // Check structured data
    const schemaScripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) || []
    const structuredData = {
      has_schema: schemaScripts.length > 0,
      types_found: [] as string[],
      validation_errors: [] as string[],
      recommendations: [] as string[],
    }

    if (schemaScripts.length > 0) {
      schemaScripts.forEach((script) => {
        try {
          const jsonMatch = script.match(/>([^<]+)</)?.[1]
          if (jsonMatch) {
            const data = JSON.parse(jsonMatch)
            if (data['@type']) {
              structuredData.types_found.push(data['@type'])
            }
          }
        } catch (e) {
          structuredData.validation_errors.push('Invalid JSON-LD syntax detected')
        }
      })
    } else {
      structuredData.recommendations.push('Add Schema.org structured data for better search visibility')
    }

    // Check mobile optimization
    const hasViewport = html.includes('viewport')
    const mobileOptimization = {
      has_viewport: hasViewport,
      responsive: hasViewport,
      mobile_friendly_score: hasViewport ? 'Good' : 'Poor',
      issues: hasViewport ? [] : ['Missing viewport meta tag - site may not be mobile-friendly'],
    }

    // Check accessibility
    const images = html.match(/<img[^>]*>/gi) || []
    const imagesWithoutAlt = images.filter(img => !img.includes('alt=')).length

    const accessibility = {
      has_alt_text_issues: imagesWithoutAlt > 0,
      has_aria_labels: html.includes('aria-label'),
      contrast_issues: 0, // Would need visual analysis
      recommendations: [
        ...(imagesWithoutAlt > 0 ? [`Fix ${imagesWithoutAlt} images missing alt text`] : []),
        ...(!html.includes('aria-label') ? ['Consider adding ARIA labels for better accessibility'] : []),
      ],
    }

    // Calculate overall score
    let score = 100
    let criticalIssues = 0
    let warnings = 0

    if (!securityHeaders.https) { score -= 20; criticalIssues++ }
    if (!robotsTxt.exists) { score -= 10; warnings++ }
    if (!sitemap.exists) { score -= 10; warnings++ }
    if (!structuredData.has_schema) { score -= 10; warnings++ }
    if (!mobileOptimization.has_viewport) { score -= 15; criticalIssues++ }
    if (securityHeaders.issues.length > 2) { score -= 15; warnings++ }

    const auditData: TechnicalAuditData = {
      url,
      robots_txt: robotsTxt,
      sitemap,
      security_headers: securityHeaders,
      structured_data: structuredData,
      mobile_optimization: mobileOptimization,
      accessibility,
      overall_score: Math.max(0, score),
      critical_issues: criticalIssues,
      warnings,
    }

    return {
      success: true,
      data: auditData,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Technical audit failed',
    }
  }
}

/**
 * Competitor Analysis Tool
 */
export async function competitorAnalysis(
  yourUrl: string,
  competitorUrls: string[]
): Promise<ToolResult<CompetitorComparisonData>> {
  try {
    // Limit to 5 competitors
    const competitors = competitorUrls.slice(0, 5)

    // Analyze your site
    const yourResponse = await fetch(yourUrl)
    const yourHtml = await yourResponse.text()
    const yourSite = analyzeSiteForComparison(yourUrl, yourHtml)

    // Analyze competitors in parallel
    const competitorAnalyses = await Promise.all(
      competitors.map(async (url) => {
        try {
          const response = await fetch(url)
          const html = await response.text()
          return analyzeSiteForComparison(url, html)
        } catch (error) {
          return null
        }
      })
    )

    const validCompetitors = competitorAnalyses.filter((c) => c !== null)

    // Identify gaps and opportunities
    const gaps: string[] = []
    const opportunities: string[] = []
    const advantages: string[] = []

    // Compare content length
    const avgCompetitorWords = validCompetitors.reduce((sum, c) => sum + c!.word_count, 0) / validCompetitors.length
    if (yourSite.word_count < avgCompetitorWords * 0.7) {
      gaps.push(`Your content is ${Math.round(avgCompetitorWords - yourSite.word_count)} words shorter than competitors`)
      opportunities.push('Add more comprehensive content to match competitor depth')
    } else if (yourSite.word_count > avgCompetitorWords * 1.3) {
      advantages.push('You have more comprehensive content than competitors')
    }

    // Compare schema usage
    const competitorsWithSchema = validCompetitors.filter(c => c!.has_schema).length
    if (!yourSite.has_schema && competitorsWithSchema > 0) {
      gaps.push(`${competitorsWithSchema}/${validCompetitors.length} competitors use structured data, you don't`)
      opportunities.push('Implement Schema.org markup to gain competitive advantage')
    } else if (yourSite.has_schema && competitorsWithSchema < validCompetitors.length / 2) {
      advantages.push('You use structured data while many competitors don\'t')
    }

    // Compare title optimization
    if (yourSite.title_length < 30) {
      gaps.push('Your title tag is too short compared to SEO best practices')
      opportunities.push('Optimize title to 30-60 characters with target keywords')
    }

    // Compare image usage
    const avgCompetitorImages = validCompetitors.reduce((sum, c) => sum + c!.image_count, 0) / validCompetitors.length
    if (yourSite.image_count < avgCompetitorImages * 0.5) {
      opportunities.push('Add more visual content - competitors use more images')
    }

    const comparisonData: CompetitorComparisonData = {
      your_site: yourSite,
      competitors: validCompetitors.map(c => c!),
      gaps,
      opportunities,
      advantages,
      priority_actions: [
        ...gaps.slice(0, 3),
        ...opportunities.slice(0, 2),
      ],
    }

    return {
      success: true,
      data: comparisonData,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Competitor analysis failed',
    }
  }
}

/**
 * Helper: Analyze site for comparison
 */
function analyzeSiteForComparison(url: string, html: string) {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)

  const textContent = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    url,
    title_length: titleMatch?.[1]?.length || 0,
    description_length: descMatch?.[1]?.length || 0,
    h1_count: (html.match(/<h1[^>]*>/gi) || []).length,
    word_count: textContent.split(/\s+/).length,
    image_count: (html.match(/<img[^>]*>/gi) || []).length,
    has_schema: html.includes('application/ld+json'),
    page_speed_estimate: 'N/A', // Would require actual testing
  }
}
