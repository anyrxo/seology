/**
 * Advanced SEO Intelligence Engine
 * Makes Claude the smartest Shopify SEO assistant
 */

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// ==================== SEO ANALYSIS FRAMEWORK ====================

export interface SEOAnalysisContext {
  productTitle: string
  productDescription: string
  productType: string
  vendor: string
  tags: string[]
  currentSeoTitle?: string
  currentSeoDescription?: string
  images: Array<{ url: string; altText?: string }>
  price: number
  compareAtPrice?: number
  variants: Array<{ title: string; price: number }>
  collections: string[]
  metafields?: Record<string, any>
}

export interface CompetitorData {
  url: string
  title: string
  metaDescription: string
  headings: string[]
  keywordDensity: Record<string, number>
  backlinks?: number
  domainAuthority?: number
}

export interface SEORecommendation {
  type: 'title' | 'description' | 'alt_text' | 'heading' | 'content' | 'schema' | 'internal_linking' | 'keyword_optimization'
  priority: 'critical' | 'high' | 'medium' | 'low'
  currentValue: string
  recommendedValue: string
  reasoning: string
  expectedImpact: {
    trafficIncrease: number // percentage
    rankingImprovement: number // positions
    conversionLift: number // percentage
  }
  keywords: string[]
  implementation: 'automatic' | 'manual'
  estimatedROI: number // dollar value per month
}

export interface KeywordResearch {
  primaryKeywords: Array<{
    keyword: string
    searchVolume: number
    difficulty: number
    intent: 'commercial' | 'informational' | 'navigational' | 'transactional'
    currentRanking?: number
    targetRanking: number
  }>
  longTailKeywords: Array<{
    keyword: string
    searchVolume: number
    conversionPotential: number
  }>
  semanticKeywords: string[]
  competitors: CompetitorData[]
}

// ==================== ADVANCED PROMPTS ====================

const SEO_EXPERT_SYSTEM_PROMPT = `You are the world's leading Shopify SEO expert with 15+ years of experience. You specialize in:

1. **E-commerce SEO Strategy**: Deep understanding of product page optimization, category structures, and conversion-focused SEO
2. **Technical SEO**: Schema markup, Core Web Vitals, mobile optimization, site architecture
3. **Content Optimization**: Compelling, keyword-rich content that ranks AND converts
4. **Competitive Analysis**: Understanding market positioning and outranking competitors
5. **Data-Driven Decisions**: Using metrics to prioritize changes with highest ROI

Your recommendations are:
- **Actionable**: Specific, implementable changes with exact code/content
- **ROI-Focused**: Prioritized by potential traffic/revenue impact
- **Conversion-Optimized**: SEO that doesn't sacrifice user experience or sales
- **Competitive**: Designed to outrank competitors in target markets
- **Future-Proof**: Following Google's latest algorithm updates and best practices

You analyze products through multiple lenses:
1. Search Intent Alignment
2. Keyword Optimization (primary + semantic)
3. Click-Through Rate Potential
4. Conversion Optimization
5. Technical SEO Compliance
6. Competitive Positioning

Always provide:
- The WHY behind each recommendation
- Expected impact metrics (traffic %, ranking positions, conversion %)
- Implementation priority (critical/high/medium/low)
- Estimated ROI in dollars per month`

// ==================== INTELLIGENT ANALYSIS FUNCTIONS ====================

export async function analyzeProductWithAdvancedSEO(
  context: SEOAnalysisContext,
  competitorData?: CompetitorData[]
): Promise<SEORecommendation[]> {
  const analysisPrompt = `Analyze this Shopify product for comprehensive SEO optimization:

**Product Details:**
- Title: ${context.productTitle}
- Description: ${context.productDescription}
- Type: ${context.productType}
- Vendor: ${context.vendor}
- Price: $${context.price}
- Tags: ${context.tags.join(', ')}
- Collections: ${context.collections.join(', ')}

**Current SEO:**
- SEO Title: ${context.currentSeoTitle || '(not set)'}
- SEO Description: ${context.currentSeoDescription || '(not set)'}
- Images: ${context.images.length} images${context.images.filter(img => !img.altText).length > 0 ? ` (${context.images.filter(img => !img.altText).length} missing alt text)` : ''}

${competitorData ? `**Competitor Analysis:**
${competitorData.map(c => `- ${c.url}: "${c.title}" | Meta: "${c.metaDescription}"`).join('\n')}` : ''}

Provide comprehensive SEO recommendations including:
1. Optimized SEO title (60 chars max, keyword-rich, CTR-optimized)
2. Optimized meta description (155 chars max, compelling, includes CTA)
3. Alt text for all images (descriptive, keyword-rich, accessible)
4. Keyword strategy (primary keywords, long-tail opportunities, semantic keywords)
5. Content improvements (if description needs enhancement)
6. Schema markup recommendations
7. Internal linking suggestions

For each recommendation, provide:
- Current value
- Recommended value
- Detailed reasoning (why this change matters)
- Expected impact (traffic %, ranking improvement, conversion lift)
- Priority level
- Estimated monthly ROI in dollars

Format as JSON array of recommendations.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 4000,
    system: SEO_EXPERT_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: analysisPrompt,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  // Parse JSON response
  try {
    const jsonMatch = content.text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('No JSON array found in response')
    }
    return JSON.parse(jsonMatch[0]) as SEORecommendation[]
  } catch (error) {
    console.error('Failed to parse Claude response:', error)
    throw new Error('Failed to parse SEO recommendations')
  }
}

// ==================== KEYWORD RESEARCH ====================

export async function performKeywordResearch(
  productTitle: string,
  productType: string,
  targetMarket: string = 'US'
): Promise<KeywordResearch> {
  const prompt = `As an expert SEO keyword researcher, analyze the keyword opportunity for this product:

**Product:** ${productTitle}
**Category:** ${productType}
**Target Market:** ${targetMarket}

Provide comprehensive keyword research:

1. **Primary Keywords** (3-5):
   - Main target keywords with commercial intent
   - Estimate search volume (monthly searches)
   - Difficulty score (0-100)
   - User intent classification
   - Current ranking estimate (if this is a new product, estimate difficulty of ranking)
   - Target ranking goal (realistic position in 3-6 months)

2. **Long-Tail Keywords** (5-10):
   - Specific, less competitive keyword phrases
   - Lower search volume but higher conversion potential
   - Estimate conversion potential (0-100)

3. **Semantic Keywords** (10-15):
   - Related terms and LSI keywords
   - Help Google understand topic context
   - Should be naturally incorporated

4. **Competitor Analysis** (if possible):
   - What keywords are competitors targeting?
   - What gaps can we exploit?
   - What's their ranking strategy?

Format as JSON with the structure:
{
  "primaryKeywords": [...],
  "longTailKeywords": [...],
  "semanticKeywords": [...],
  "competitors": [...]
}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 3000,
    system: SEO_EXPERT_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  try {
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    return JSON.parse(jsonMatch[0]) as KeywordResearch
  } catch (error) {
    console.error('Failed to parse keyword research:', error)
    throw new Error('Failed to parse keyword research')
  }
}

// ==================== SMART FIX PRIORITIZATION ====================

export interface PrioritizedFix {
  id: string
  description: string
  priority: number // 0-100, higher is more important
  estimatedImpact: {
    trafficIncrease: number
    revenueIncrease: number
    timeToImpact: number // days
  }
  effort: 'low' | 'medium' | 'high'
  roiScore: number // 0-100
}

export function prioritizeFixes(
  recommendations: SEORecommendation[],
  productPrice: number,
  currentTraffic: number = 0
): PrioritizedFix[] {
  return recommendations
    .map((rec, index) => {
      // Calculate priority score
      let priorityScore = 0

      // Impact on traffic (40% weight)
      priorityScore += rec.expectedImpact.trafficIncrease * 0.4

      // Impact on conversions (30% weight)
      priorityScore += rec.expectedImpact.conversionLift * 0.3

      // Ranking improvement (20% weight)
      priorityScore += (rec.expectedImpact.rankingImprovement / 10) * 20 * 0.2

      // Implementation ease (10% weight)
      const implementationScore = rec.implementation === 'automatic' ? 10 : 5
      priorityScore += implementationScore * 0.1

      // Calculate estimated revenue impact
      const trafficIncrease = currentTraffic * (rec.expectedImpact.trafficIncrease / 100)
      const conversionRate = 0.02 // 2% baseline e-commerce conversion
      const conversionIncrease = conversionRate * (rec.expectedImpact.conversionLift / 100)
      const newConversions = trafficIncrease * (conversionRate + conversionIncrease)
      const revenueIncrease = newConversions * productPrice

      // ROI Score (priority adjusted by implementation effort)
      const effortMultiplier = rec.implementation === 'automatic' ? 1.0 : 0.7
      const roiScore = priorityScore * effortMultiplier

      return {
        id: `rec-${index}`,
        description: rec.reasoning,
        priority: Math.round(priorityScore),
        estimatedImpact: {
          trafficIncrease: Math.round(trafficIncrease),
          revenueIncrease: Math.round(revenueIncrease),
          timeToImpact: rec.priority === 'critical' ? 7 : rec.priority === 'high' ? 14 : 30,
        },
        effort: (rec.implementation === 'automatic' ? 'low' : 'medium') as 'low' | 'medium' | 'high',
        roiScore: Math.round(roiScore),
      }
    })
    .sort((a, b) => b.roiScore - a.roiScore)
}

// ==================== CONTENT OPTIMIZATION ====================

export async function optimizeProductDescription(
  currentDescription: string,
  keywords: string[],
  productContext: Partial<SEOAnalysisContext>
): Promise<string> {
  const prompt = `Optimize this product description for SEO while maintaining natural, compelling copy:

**Current Description:**
${currentDescription}

**Target Keywords:** ${keywords.join(', ')}
**Product Type:** ${productContext.productType}
**Price:** $${productContext.price}

Requirements:
1. Naturally incorporate target keywords (avoid keyword stuffing)
2. Front-load important information
3. Use semantic keywords and LSI terms
4. Include benefits, not just features
5. Add subtle calls-to-action
6. Optimize for featured snippets (use structured format where appropriate)
7. Keep it scannable (short paragraphs, bullet points if helpful)
8. Maintain brand voice and persuasive tone
9. Length: 150-300 words (optimal for e-commerce)
10. Include social proof indicators if possible

Provide the optimized description only, no additional commentary.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1500,
    system: SEO_EXPERT_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  return content.text.trim()
}

// ==================== SCHEMA MARKUP GENERATION ====================

export function generateProductSchema(product: SEOAnalysisContext): object {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.productTitle,
    description: product.productDescription,
    image: product.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: product.vendor,
    },
    offers: {
      '@type': 'Offer',
      url: '', // Will be filled with actual product URL
      priceCurrency: 'USD',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      ...(product.compareAtPrice && {
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: product.compareAtPrice,
          priceCurrency: 'USD',
        },
      }),
    },
    ...(product.variants.length > 0 && {
      hasVariant: product.variants.map(variant => ({
        '@type': 'ProductVariant',
        name: variant.title,
        offers: {
          '@type': 'Offer',
          price: variant.price,
          priceCurrency: 'USD',
        },
      })),
    }),
  }
}

// ==================== A/B TESTING FRAMEWORK ====================

export interface ABTest {
  id: string
  productId: string
  variantA: {
    seoTitle: string
    seoDescription: string
  }
  variantB: {
    seoTitle: string
    seoDescription: string
  }
  startDate: Date
  endDate: Date
  metrics: {
    variantA: {
      impressions: number
      clicks: number
      ctr: number
      conversions: number
      revenue: number
    }
    variantB: {
      impressions: number
      clicks: number
      ctr: number
      conversions: number
      revenue: number
    }
  }
  winner?: 'A' | 'B'
  confidence: number // 0-100
}

export function determineABTestWinner(test: ABTest): 'A' | 'B' | null {
  const { variantA, variantB } = test.metrics

  // Need minimum sample size
  if (variantA.impressions < 1000 || variantB.impressions < 1000) {
    return null
  }

  // Calculate statistical significance using z-test
  const p1 = variantA.clicks / variantA.impressions
  const p2 = variantB.clicks / variantB.impressions
  const pDiff = Math.abs(p1 - p2)

  const pooledP = (variantA.clicks + variantB.clicks) / (variantA.impressions + variantB.impressions)
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / variantA.impressions + 1 / variantB.impressions))
  const zScore = pDiff / se

  // 95% confidence = z-score > 1.96
  const confidence = zScore > 1.96 ? 95 : zScore > 1.65 ? 90 : 0

  if (confidence >= 95) {
    return p1 > p2 ? 'A' : 'B'
  }

  return null
}

// ==================== REAL-TIME MONITORING ====================

export interface SEOHealthMetrics {
  overallScore: number // 0-100
  technicalSEO: number
  onPageSEO: number
  contentQuality: number
  userExperience: number
  issues: Array<{
    type: 'critical' | 'warning' | 'info'
    category: string
    message: string
    affectedPages: number
  }>
  trends: {
    weekOverWeek: number // percentage change
    monthOverMonth: number
  }
}

export async function calculateSEOHealthScore(
  products: SEOAnalysisContext[]
): Promise<SEOHealthMetrics> {
  let technicalScore = 100
  let onPageScore = 100
  let contentScore = 100
  let uxScore = 100
  const issues: SEOHealthMetrics['issues'] = []

  products.forEach(product => {
    // Check technical SEO
    if (!product.currentSeoTitle) {
      technicalScore -= 2
      issues.push({
        type: 'critical',
        category: 'Missing SEO Title',
        message: `Product "${product.productTitle}" is missing SEO title`,
        affectedPages: 1,
      })
    }

    if (!product.currentSeoDescription) {
      technicalScore -= 1
      issues.push({
        type: 'warning',
        category: 'Missing Meta Description',
        message: `Product "${product.productTitle}" is missing meta description`,
        affectedPages: 1,
      })
    }

    // Check images
    const missingAlt = product.images.filter(img => !img.altText).length
    if (missingAlt > 0) {
      onPageScore -= missingAlt * 0.5
      issues.push({
        type: 'warning',
        category: 'Missing Alt Text',
        message: `${missingAlt} images missing alt text on "${product.productTitle}"`,
        affectedPages: 1,
      })
    }

    // Check content quality
    if (product.productDescription.length < 150) {
      contentScore -= 3
      issues.push({
        type: 'warning',
        category: 'Thin Content',
        message: `Product description too short on "${product.productTitle}"`,
        affectedPages: 1,
      })
    }

    // Check title length
    if (product.currentSeoTitle && product.currentSeoTitle.length > 60) {
      onPageScore -= 1
      issues.push({
        type: 'info',
        category: 'Title Too Long',
        message: `SEO title exceeds 60 characters on "${product.productTitle}"`,
        affectedPages: 1,
      })
    }
  })

  const overallScore = Math.round((technicalScore + onPageScore + contentScore + uxScore) / 4)

  return {
    overallScore,
    technicalSEO: Math.round(technicalScore),
    onPageSEO: Math.round(onPageScore),
    contentQuality: Math.round(contentScore),
    userExperience: Math.round(uxScore),
    issues,
    trends: {
      weekOverWeek: 0, // Would be calculated from historical data
      monthOverMonth: 0,
    },
  }
}
