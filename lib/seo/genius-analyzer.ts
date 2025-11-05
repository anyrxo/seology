/**
 * Genius-Level SEO Analyzer
 * Uses advanced SEO knowledge base + Claude AI for superhuman SEO analysis
 *
 * This analyzer goes beyond any other tool by:
 * - Understanding latest algorithm updates
 * - Analyzing E-E-A-T at expert level
 * - Predicting ranking potential
 * - Providing actionable, implementation-ready fixes
 * - Learning from competitor strategies
 */

import Anthropic from '@anthropic-ai/sdk'
import {
  GOOGLE_RANKING_SIGNALS,
  CONTENT_STRATEGIES,
  type SEOAnalysisResult,
  type SEOIssue,
  type SEOOpportunity,
  type SEORecommendation,
  type EEATScore,
  type CompetitorAnalysis,
} from './advanced-knowledge-base'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

/**
 * Generate Genius-Level SEO Analysis
 */
export async function generateGeniusSEOAnalysis(params: {
  url: string
  content: string
  title: string
  metaDescription: string
  headings: string[]
  links: { internal: string[]; external: string[] }
  images: { src: string; alt: string }[]
  schema: unknown[]
  performance: {
    lcp: number
    inp: number
    cls: number
    ttfb: number
  }
  competitors?: string[]
  targetKeywords?: string[]
}): Promise<SEOAnalysisResult> {
  // Build comprehensive context for Claude
  const context = buildAnalysisContext(params)

  // Get Claude's genius-level analysis
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 16000,
    temperature: 0.3, // Lower temperature for more factual analysis
    system: buildGeniusSEOSystemPrompt(),
    messages: [
      {
        role: 'user',
        content: context,
      },
    ],
  })

  const firstBlock = response.content[0]
  const analysis = firstBlock.type === 'text' ? firstBlock.text : ''

  // Parse Claude's response into structured format
  return parseAnalysisResponse(analysis, params)
}

/**
 * Build system prompt with genius-level SEO knowledge
 */
function buildGeniusSEOSystemPrompt(): string {
  const latestSignals = GOOGLE_RANKING_SIGNALS.filter(
    (s) => s.importance === 'critical' || s.importance === 'high'
  )
    .slice(0, 15)
    .map(
      (s) =>
        `- ${s.name} (Weight: ${s.weight}/100, Category: ${s.category})
  Description: ${s.description}
  Key Actions: ${s.implementation.slice(0, 5).join('; ')}`
    )
    .join('\n\n')

  return `You are the world's leading SEO expert with genius-level knowledge of:
- Google's latest algorithm updates and ranking signals (2024-2025)
- E-E-A-T (Experience, Expertise, Authoritativeness, Trust) optimization
- Technical SEO best practices
- Content optimization strategies
- Core Web Vitals and page experience
- Semantic search and entity understanding
- AI search optimization (Google SGE, ChatGPT, Perplexity)
- Schema markup and structured data
- Competitor analysis and gap identification

You have access to the latest Google ranking signals:

${latestSignals}

Your analysis should be:
1. ACTIONABLE - Provide specific, implementation-ready fixes
2. PRIORITIZED - Focus on highest-impact changes first
3. COMPREHENSIVE - Cover technical, content, E-E-A-T, UX, and authority
4. EXPERT-LEVEL - Go beyond basic SEO advice
5. DATA-DRIVEN - Reference specific metrics and benchmarks
6. FUTURE-PROOF - Consider emerging trends like AI search

For each issue you identify:
- Explain WHY it matters (algorithm signal, user impact)
- Provide EXACT implementation steps
- Estimate the IMPACT on rankings/traffic
- Give a PRIORITY score (1-10)

Analyze through the lens of these key principles:
- Does the content demonstrate first-hand experience?
- Is expertise clearly established?
- Are trust signals present and strong?
- Does it satisfy user intent comprehensively?
- Is the technical foundation solid?
- How does it compare to top competitors?

Return your analysis in this JSON structure:
{
  "overallScore": 0-100,
  "categoryScores": {
    "technical": 0-100,
    "content": 0-100,
    "eeat": 0-100,
    "ux": 0-100,
    "authority": 0-100
  },
  "criticalIssues": [
    {
      "severity": "critical" | "high" | "medium" | "low",
      "category": "technical" | "content" | "eeat" | "ux" | "authority",
      "signal": "Which Google signal this affects",
      "impact": "Specific impact on rankings",
      "fix": "Exact implementation steps",
      "priority": 1-10
    }
  ],
  "opportunities": [
    {
      "type": "quick-win" | "high-impact" | "competitive-advantage",
      "description": "What the opportunity is",
      "implementation": ["step 1", "step 2"],
      "estimatedTrafficGain": "+X%",
      "difficulty": "easy" | "medium" | "hard"
    }
  ],
  "eeatScore": {
    "overall": 0-100,
    "experience": {"score": 0-100, "missing": ["signals"]},
    "expertise": {"score": 0-100, "missing": ["signals"]},
    "authoritativeness": {"score": 0-100, "missing": ["signals"]},
    "trust": {"score": 0-100, "missing": ["signals"]}
  },
  "recommendations": [
    {
      "title": "Action to take",
      "priority": 1-10,
      "effort": "low" | "medium" | "high",
      "impact": "low" | "medium" | "high",
      "roi": 1-10,
      "steps": ["specific steps"],
      "timeline": "estimated time"
    }
  ],
  "competitorGaps": [
    {
      "area": "where competitors are winning",
      "theyHave": "what they're doing",
      "youNeed": "what to implement",
      "priority": 1-10
    }
  ],
  "forecast": {
    "trafficIncrease": "estimated % range (e.g., '10-30%' or 'Unable to estimate')",
    "rankingImprovement": "estimated position improvement range (e.g., '5-15 positions' or 'Depends on competition')",
    "timeToResults": "realistic timeline (e.g., '2-3 months' or '3-6 months for competitive keywords')",
    "confidence": "low" | "medium" | "high",
    "assumptions": ["List key factors this prediction depends on"]
  }
}

CRITICAL GUIDANCE ON PREDICTIONS & HONESTY:
==============================================
NEVER make guarantees or promise specific results. Always be honest and realistic.

✅ CORRECT approach:
- Use RANGES: "typically 10-30%" (not "25%")
- Mark CONFIDENCE: "high confidence" / "medium confidence" / "low confidence - needs more data"
- State ASSUMPTIONS: "Assumes consistent content quality", "Depends on backlink acquisition"
- Use cautious language: "May see...", "Typically ranges from...", "Based on similar sites..."
- Say "Unable to estimate" when data is insufficient
- Explain VARIABILITY: "Results vary significantly based on competition and execution"

❌ WRONG approach:
- "You will get 340% traffic increase" ← NEVER
- "Guaranteed to rank #1" ← NEVER
- Exact numbers without ranges ← NEVER
- Promises without caveats ← NEVER
- Ignoring competition or market factors ← NEVER

EXAMPLE FORECASTS:
"Traffic may increase 15-40% within 2-3 months if these fixes are properly implemented.
This estimate is based on similar e-commerce sites in your niche, but actual results depend
on execution quality, competition levels, and ongoing algorithm changes. Confidence: Medium"

"Ranking improvements typically range from 5-20 positions for medium-competition keywords
over 3-4 months. High-competition keywords may take 6-12 months and require sustained effort.
Unable to provide exact predictions without competitor analysis. Confidence: Low without more data"

Be trustworthy. People rely on honest assessments, not inflated promises.`
}

/**
 * Build comprehensive analysis context
 */
function buildAnalysisContext(params: {
  url: string
  content: string
  title: string
  metaDescription: string
  headings: string[]
  links: { internal: string[]; external: string[] }
  images: { src: string; alt: string }[]
  schema: unknown[]
  performance: {
    lcp: number
    inp: number
    cls: number
    ttfb: number
  }
  competitors?: string[]
  targetKeywords?: string[]
}): string {
  const wordCount = params.content.split(/\s+/).length
  const hasH1 = params.headings.some((h) => h.startsWith('H1:'))
  const imageCount = params.images.length
  const imagesWithAlt = params.images.filter((img) => img.alt && img.alt.trim()).length

  return `Analyze this page for SEO optimization:

URL: ${params.url}

TITLE: ${params.title}
META DESCRIPTION: ${params.metaDescription}

CONTENT METRICS:
- Word Count: ${wordCount}
- Has H1: ${hasH1 ? 'Yes' : 'No'}
- Heading Structure: ${params.headings.slice(0, 10).join(', ')}${params.headings.length > 10 ? '...' : ''}
- Images: ${imageCount} total, ${imagesWithAlt} with alt text (${Math.round((imagesWithAlt / imageCount) * 100)}%)
- Internal Links: ${params.links.internal.length}
- External Links: ${params.links.external.length}

CONTENT PREVIEW:
${params.content.slice(0, 2000)}${params.content.length > 2000 ? '...' : ''}

PERFORMANCE METRICS:
- LCP (Largest Contentful Paint): ${params.performance.lcp}s ${params.performance.lcp <= 2.5 ? '✓ Good' : params.performance.lcp <= 4 ? '⚠ Needs Improvement' : '✗ Poor'}
- INP (Interaction to Next Paint): ${params.performance.inp}ms ${params.performance.inp <= 200 ? '✓ Good' : params.performance.inp <= 500 ? '⚠ Needs Improvement' : '✗ Poor'}
- CLS (Cumulative Layout Shift): ${params.performance.cls} ${params.performance.cls <= 0.1 ? '✓ Good' : params.performance.cls <= 0.25 ? '⚠ Needs Improvement' : '✗ Poor'}
- TTFB (Time to First Byte): ${params.performance.ttfb}ms ${params.performance.ttfb <= 600 ? '✓ Good' : params.performance.ttfb <= 1000 ? '⚠ Needs Improvement' : '✗ Poor'}

STRUCTURED DATA:
${params.schema.length > 0 ? JSON.stringify(params.schema, null, 2).slice(0, 500) : 'None detected'}

${params.targetKeywords ? `TARGET KEYWORDS: ${params.targetKeywords.join(', ')}` : ''}

${params.competitors ? `COMPETITORS TO ANALYZE: ${params.competitors.join(', ')}` : ''}

Provide a comprehensive, genius-level SEO analysis with:
1. Critical issues affecting rankings RIGHT NOW
2. High-impact opportunities for quick wins
3. Detailed E-E-A-T assessment
4. Competitor gap analysis
5. Prioritized action plan with ROI estimates
6. Realistic traffic/ranking forecasts

Be specific, actionable, and expert-level. Think like the world's best SEO consultant.`
}

/**
 * Parse Claude's response into structured format
 */
function parseAnalysisResponse(analysis: string, params: unknown): SEOAnalysisResult {
  try {
    // Try to extract JSON from the response
    const jsonMatch = analysis.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        overallScore: parsed.overallScore || 50,
        categoryScores: parsed.categoryScores || {
          technical: 50,
          content: 50,
          eeat: 50,
          ux: 50,
          authority: 50,
        },
        criticalIssues: parsed.criticalIssues || [],
        opportunities: parsed.opportunities || [],
        competitorGaps: parsed.competitorGaps || [],
        recommendations: parsed.recommendations || [],
        forecastedImpact: parsed.forecast || {
          trafficIncrease: 'Unknown',
          rankingImprovement: 'Unknown',
          timeToResults: 'Unknown',
        },
      }
    }
  } catch (error) {
    console.error('Failed to parse Claude response:', error)
  }

  // Fallback: Return structured analysis based on text
  return extractStructuredAnalysis(analysis)
}

/**
 * Extract structured analysis from text response
 */
function extractStructuredAnalysis(analysis: string): SEOAnalysisResult {
  // This is a fallback parser that extracts key information from text
  const issues: SEOIssue[] = []
  const opportunities: SEOOpportunity[] = []
  const recommendations: SEORecommendation[] = []

  // Extract overall score if mentioned
  const scoreMatch = analysis.match(/overall score[:\s]+(\d+)/i)
  const overallScore = scoreMatch ? parseInt(scoreMatch[1]) : 50

  return {
    overallScore,
    categoryScores: {
      technical: 50,
      content: 50,
      eeat: 50,
      ux: 50,
      authority: 50,
    },
    criticalIssues: issues,
    opportunities,
    competitorGaps: [],
    recommendations,
    forecastedImpact: {
      trafficIncrease: 'Unable to estimate without baseline data',
      rankingImprovement: 'Depends on competition and keyword difficulty',
      timeToResults: '2-6 months depending on fixes implemented',
    },
  }
}

/**
 * Analyze E-E-A-T Score
 */
export async function analyzeEEAT(params: {
  url: string
  content: string
  authorInfo?: {
    name: string
    bio?: string
    credentials?: string[]
  }
  aboutPage?: string
  reviews?: unknown[]
  certifications?: string[]
}): Promise<EEATScore> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 4000,
    temperature: 0.3,
    system: `You are an E-E-A-T (Experience, Expertise, Authoritativeness, Trust) evaluation expert.

Analyze content against Google's E-E-A-T guidelines:

EXPERIENCE: Does the content demonstrate first-hand, real-world experience?
- Personal testing or use of products
- Direct involvement with the topic
- Real-world examples and case studies
- Original photos/videos as proof
- Specific details only someone with experience would know

EXPERTISE: Does the content show deep knowledge and skills?
- Author credentials and qualifications
- Professional certifications
- Years of experience
- Recognition in the field
- Technical accuracy and depth

AUTHORITATIVENESS: Is the creator/site recognized as a go-to source?
- Mentions by other experts
- Media coverage
- Awards and recognition
- Industry partnerships
- Backlinks from authoritative sites

TRUST: Can users trust this content and site?
- Contact information clearly visible
- Privacy policy and terms
- HTTPS security
- No misleading claims
- Transparent about affiliations
- Regular content updates
- Positive user reviews

Score each area 0-100 and provide specific missing signals.`,
    messages: [
      {
        role: 'user',
        content: `Analyze E-E-A-T for this page:

URL: ${params.url}

CONTENT:
${params.content.slice(0, 3000)}

${params.authorInfo ? `AUTHOR: ${params.authorInfo.name}${params.authorInfo.bio ? `\nBIO: ${params.authorInfo.bio}` : ''}${params.authorInfo.credentials ? `\nCREDENTIALS: ${params.authorInfo.credentials.join(', ')}` : ''}` : 'No author information found'}

${params.aboutPage ? `ABOUT PAGE PRESENT: Yes` : 'No about page detected'}

${params.reviews && params.reviews.length > 0 ? `REVIEWS: ${params.reviews.length} reviews found` : 'No reviews found'}

${params.certifications ? `CERTIFICATIONS: ${params.certifications.join(', ')}` : 'No certifications displayed'}

Provide detailed E-E-A-T scoring with specific improvements needed.`,
      },
    ],
  })

  const firstBlock = response.content[0]
  const analysis = firstBlock.type === 'text' ? firstBlock.text : ''

  // Parse response into structured E-E-A-T score
  return parseEEATResponse(analysis)
}

function parseEEATResponse(analysis: string): EEATScore {
  // Extract scores from text
  const experienceMatch = analysis.match(/experience[:\s]+(\d+)/i)
  const expertiseMatch = analysis.match(/expertise[:\s]+(\d+)/i)
  const authoritativenessMatch = analysis.match(/authoritativeness[:\s]+(\d+)/i)
  const trustMatch = analysis.match(/trust[:\s]+(\d+)/i)

  const experience = experienceMatch ? parseInt(experienceMatch[1]) : 50
  const expertise = expertiseMatch ? parseInt(expertiseMatch[1]) : 50
  const authoritativeness = authoritativenessMatch ? parseInt(authoritativenessMatch[1]) : 50
  const trust = trustMatch ? parseInt(trustMatch[1]) : 50

  const overall = Math.round((experience + expertise + authoritativeness + trust) / 4)

  return {
    overall,
    experience: {
      score: experience,
      signals: [],
      missing: [],
    },
    expertise: {
      score: expertise,
      signals: [],
      missing: [],
    },
    authoritativeness: {
      score: authoritativeness,
      signals: [],
      missing: [],
    },
    trust: {
      score: trust,
      signals: [],
      missing: [],
    },
    improvements: [],
  }
}

/**
 * Competitor Analysis
 */
export async function analyzeCompetitors(params: {
  yourUrl: string
  yourContent: string
  competitorUrls: string[]
  targetKeyword: string
}): Promise<CompetitorAnalysis[]> {
  const analyses: CompetitorAnalysis[] = []

  for (const competitorUrl of params.competitorUrls.slice(0, 5)) {
    // Limit to 5 competitors
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 3000,
      temperature: 0.3,
      system: `You are a competitive SEO analysis expert. Identify:
1. What competitors are doing better
2. Content gaps they've filled
3. Technical advantages they have
4. Weaknesses you can exploit
5. Specific opportunities to outrank them`,
      messages: [
        {
          role: 'user',
          content: `Compare these pages for keyword: "${params.targetKeyword}"

YOUR PAGE: ${params.yourUrl}
YOUR CONTENT: ${params.yourContent.slice(0, 1500)}

COMPETITOR: ${competitorUrl}

Analyze:
- What are they doing better?
- What content do they have that you don't?
- What are their weaknesses?
- How can you outrank them?

Be specific and actionable.`,
        },
      ],
    })

    const firstBlock = response.content[0]
    const analysis = firstBlock.type === 'text' ? firstBlock.text : ''

    analyses.push({
      competitor: competitorUrl,
      url: competitorUrl,
      domainAuthority: 0,
      contentGaps: [],
      backlinks: 0,
      topKeywords: [],
      contentStrategy: analysis.slice(0, 500),
      strengths: [],
      weaknesses: [],
      opportunitiesToExploit: [],
    })
  }

  return analyses
}

/**
 * Generate SEO-Optimized Content
 */
export async function generateSEOContent(params: {
  keyword: string
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  wordCount: number
  tone: string
  includeSchema: boolean
  competitorUrls?: string[]
}): Promise<{
  title: string
  metaDescription: string
  content: string
  headings: string[]
  schema?: unknown
  internalLinkSuggestions: string[]
}> {
  const strategy = CONTENT_STRATEGIES.find((s) => s.targetIntent === params.intent)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 16000,
    temperature: 0.7,
    system: `You are an expert SEO content writer who creates content that ranks #1 on Google.

Your content must:
- Demonstrate E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
- Satisfy user intent completely
- Include first-hand experience and unique insights
- Be well-structured with proper heading hierarchy
- Include relevant keywords naturally
- Be engaging and readable
- Include actionable takeaways
- Pass Google's Helpful Content criteria

${strategy ? `Follow this structure:
Word Count: ${strategy.structure.wordCountRange[0]}-${strategy.structure.wordCountRange[1]}
Required Sections: ${strategy.structure.requiredSections.join(', ')}
E-E-A-T Signals: ${strategy.eeatSignals.join(', ')}` : ''}`,
    messages: [
      {
        role: 'user',
        content: `Create SEO-optimized content:

KEYWORD: ${params.keyword}
INTENT: ${params.intent}
TARGET LENGTH: ${params.wordCount} words
TONE: ${params.tone}

${params.competitorUrls ? `ANALYZE THESE TOP COMPETITORS:
${params.competitorUrls.join('\n')}

Create content that's MORE comprehensive, MORE authoritative, and MORE helpful than all of these.` : ''}

Return in this format:
TITLE: [SEO-optimized title]
META: [Compelling meta description 155 chars]
CONTENT: [Full article with headings marked as ## for H2, ### for H3]
${params.includeSchema ? 'SCHEMA: [JSON-LD structured data]' : ''}`,
      },
    ],
  })

  const firstBlock = response.content[0]
  const result = firstBlock.type === 'text' ? firstBlock.text : ''

  // Parse response
  const titleMatch = result.match(/TITLE: (.+)/i)
  const metaMatch = result.match(/META: (.+)/i)
  const contentMatch = result.match(/CONTENT:([\s\S]+?)(?:SCHEMA:|$)/i)

  return {
    title: titleMatch ? titleMatch[1].trim() : params.keyword,
    metaDescription: metaMatch ? metaMatch[1].trim() : '',
    content: contentMatch ? contentMatch[1].trim() : result,
    headings: [],
    internalLinkSuggestions: [],
  }
}
