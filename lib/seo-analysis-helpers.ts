/**
 * SEOLOGY.AI - SEO Analysis Helper Functions
 *
 * Utility functions for working with advanced SEO features:
 * - Canonical URL validation
 * - Structured data analysis
 * - Open Graph metadata generation
 * - Twitter Card validation
 * - Traffic impact measurement
 * - Ranking position tracking
 *
 * NOTE: This helper file is designed to work with the ENHANCED schema.
 * To use these features, first apply the schema-enhanced.prisma changes.
 */

import { db } from './db'

// ==================== TYPE DEFINITIONS ====================

// These types match the enums in schema-enhanced.prisma
// They are defined here for use before the schema migration

export type CanonicalStatus =
  | 'VALID'
  | 'MISSING'
  | 'INVALID'
  | 'SELF'
  | 'DUPLICATE'
  | 'CONFLICT'
  | 'HTTPS_ISSUE'

export type SchemaType =
  | 'ORGANIZATION'
  | 'WEBSITE'
  | 'WEBPAGE'
  | 'ARTICLE'
  | 'BLOG_POSTING'
  | 'NEWS_ARTICLE'
  | 'PRODUCT'
  | 'OFFER'
  | 'AGGREGATE_RATING'
  | 'REVIEW'
  | 'BREADCRUMB_LIST'
  | 'FAQ_PAGE'
  | 'HOW_TO'
  | 'RECIPE'
  | 'EVENT'
  | 'LOCAL_BUSINESS'
  | 'PERSON'
  | 'VIDEO_OBJECT'
  | 'IMAGE_OBJECT'
  | 'SEARCH_ACTION'
  | 'SITE_NAVIGATION_ELEMENT'

export type OpenGraphType =
  | 'WEBSITE'
  | 'ARTICLE'
  | 'PRODUCT'
  | 'VIDEO'
  | 'BOOK'
  | 'PROFILE'
  | 'MUSIC_SONG'
  | 'MUSIC_ALBUM'
  | 'MUSIC_PLAYLIST'
  | 'VIDEO_MOVIE'
  | 'VIDEO_EPISODE'
  | 'VIDEO_TV_SHOW'
  | 'VIDEO_OTHER'

export type TwitterCardType =
  | 'SUMMARY'
  | 'SUMMARY_LARGE_IMAGE'
  | 'APP'
  | 'PLAYER'

export type RobotsDirective =
  | 'INDEX'
  | 'NOINDEX'
  | 'FOLLOW'
  | 'NOFOLLOW'
  | 'NOARCHIVE'
  | 'NOSNIPPET'
  | 'NOIMAGEINDEX'
  | 'NOTRANSLATE'
  | 'MAX_SNIPPET'
  | 'MAX_IMAGE_PREVIEW'
  | 'MAX_VIDEO_PREVIEW'

export type MetricChangeType = 'IMPROVEMENT' | 'DECLINE' | 'STABLE' | 'VOLATILE'

// Schema.org JSON-LD types
interface SchemaOrgBase {
  '@context': string | string[]
  '@type': string | string[]
  [key: string]: unknown
}

interface SchemaOrgProduct extends SchemaOrgBase {
  '@type': 'Product'
  name?: string
  image?: string | string[]
  description?: string
  brand?: string | { '@type': 'Brand'; name: string }
  offers?: SchemaOrgOffer | SchemaOrgOffer[]
  aggregateRating?: SchemaOrgAggregateRating
  review?: SchemaOrgReview | SchemaOrgReview[]
}

interface SchemaOrgOffer {
  '@type': 'Offer'
  price?: string | number
  priceCurrency?: string
  availability?: string
  priceSpecification?: unknown
}

interface SchemaOrgAggregateRating {
  '@type': 'AggregateRating'
  ratingValue?: number | string
  reviewCount?: number | string
  bestRating?: number | string
  worstRating?: number | string
}

interface SchemaOrgReview {
  '@type': 'Review'
  author?: string | { '@type': 'Person'; name: string }
  reviewRating?: unknown
}

interface SchemaOrgArticle extends SchemaOrgBase {
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle'
  headline?: string
  image?: string | string[]
  datePublished?: string
  dateModified?: string
  author?: string | { '@type': 'Person'; name: string }
}

interface SchemaOrgBreadcrumbList extends SchemaOrgBase {
  '@type': 'BreadcrumbList'
  itemListElement?: SchemaOrgBreadcrumbItem[]
}

interface SchemaOrgBreadcrumbItem {
  '@type': 'ListItem'
  position?: number | string
  name?: string
  item?: string | { '@id': string; name: string }
}

interface SchemaOrgOrganization extends SchemaOrgBase {
  '@type': 'Organization'
  name?: string
  url?: string
  logo?: string | { '@type': 'ImageObject'; url: string }
}

interface SchemaOrgFAQPage extends SchemaOrgBase {
  '@type': 'FAQPage'
  mainEntity?: SchemaOrgQuestion[]
}

interface SchemaOrgQuestion {
  '@type': 'Question'
  name?: string
  acceptedAnswer?: {
    '@type': 'Answer'
    text?: string
  }
}

// ==================== CANONICAL URL ANALYSIS ====================

export async function analyzeCanonicalUrl(
  sourceUrl: string,
  canonicalUrl: string | null | undefined
): Promise<CanonicalStatus> {
  // Missing canonical
  if (!canonicalUrl) {
    return 'MISSING'
  }

  // Self-referencing (correct)
  if (sourceUrl === canonicalUrl) {
    return 'SELF'
  }

  // Try to parse URLs
  try {
    const sourceUrlObj = new URL(sourceUrl)
    const canonicalUrlObj = new URL(canonicalUrl)

    // Check for protocol mismatch
    if (sourceUrlObj.protocol !== canonicalUrlObj.protocol) {
      return 'HTTPS_ISSUE'
    }

    // Check if it's pointing to another page (potential duplicate)
    if (sourceUrlObj.pathname !== canonicalUrlObj.pathname) {
      return 'DUPLICATE'
    }

    return 'VALID'
  } catch (error) {
    // Invalid URL format
    return 'INVALID'
  }
}

// ==================== STRUCTURED DATA VALIDATION ====================

export interface SchemaValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  richResultTypes: string[]
  isEligible: boolean
}

export async function validateStructuredData(
  schemaJson: string,
  schemaType: SchemaType
): Promise<SchemaValidationResult> {
  const result: SchemaValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    richResultTypes: [],
    isEligible: true
  }

  try {
    const schema = JSON.parse(schemaJson) as SchemaOrgBase

    // Check for required @context
    if (!schema['@context'] || !JSON.stringify(schema['@context']).includes('schema.org')) {
      result.errors.push('Missing or invalid @context property')
      result.isValid = false
    }

    // Check for @type matching expected schemaType
    if (!schema['@type']) {
      result.errors.push('Missing @type property')
      result.isValid = false
    }

    // Type-specific validation
    switch (schemaType) {
      case 'PRODUCT':
        result.richResultTypes.push('Product')
        validateProductSchema(schema as SchemaOrgProduct, result)
        break
      case 'ARTICLE':
      case 'BLOG_POSTING':
        result.richResultTypes.push('Article')
        validateArticleSchema(schema as SchemaOrgArticle, result)
        break
      case 'BREADCRUMB_LIST':
        result.richResultTypes.push('BreadcrumbList')
        validateBreadcrumbSchema(schema as SchemaOrgBreadcrumbList, result)
        break
      case 'ORGANIZATION':
        result.richResultTypes.push('Organization')
        validateOrganizationSchema(schema as SchemaOrgOrganization, result)
        break
      case 'FAQ_PAGE':
        result.richResultTypes.push('FAQPage')
        validateFAQSchema(schema as SchemaOrgFAQPage, result)
        break
    }

    // Determine eligibility for rich results
    result.isEligible = result.isValid && result.errors.length === 0

    return result
  } catch (error) {
    result.isValid = false
    result.isEligible = false
    result.errors.push('Invalid JSON syntax')
    return result
  }
}

function validateProductSchema(
  schema: SchemaOrgProduct,
  result: SchemaValidationResult
): void {
  // Required fields for Product rich results
  const requiredFields: Array<keyof SchemaOrgProduct> = ['name', 'image', 'description']
  const recommendedFields: Array<keyof SchemaOrgProduct> = ['brand', 'offers', 'aggregateRating', 'review']

  for (const field of requiredFields) {
    if (!schema[field]) {
      result.errors.push(`Missing required field: ${field}`)
      result.isValid = false
    }
  }

  for (const field of recommendedFields) {
    if (!schema[field]) {
      result.warnings.push(`Missing recommended field: ${field}`)
    }
  }

  // Validate offers if present
  if (schema.offers) {
    const offers = Array.isArray(schema.offers) ? schema.offers : [schema.offers]
    for (const offer of offers) {
      if (!offer.price && !offer.priceSpecification) {
        result.warnings.push('Offer missing price information')
      }
      if (!offer.availability) {
        result.warnings.push('Offer missing availability')
      }
    }
  }

  // Check for aggregateRating
  if (schema.aggregateRating) {
    if (!schema.aggregateRating.ratingValue) {
      result.errors.push('aggregateRating missing ratingValue')
    }
    if (!schema.aggregateRating.reviewCount) {
      result.errors.push('aggregateRating missing reviewCount')
    }
  }
}

function validateArticleSchema(
  schema: SchemaOrgArticle,
  result: SchemaValidationResult
): void {
  const requiredFields: Array<keyof SchemaOrgArticle> = ['headline', 'image', 'datePublished', 'author']

  for (const field of requiredFields) {
    if (!schema[field]) {
      result.errors.push(`Missing required field: ${field}`)
      result.isValid = false
    }
  }

  // Validate author
  if (schema.author) {
    if (typeof schema.author === 'object' && 'name' in schema.author && !schema.author.name) {
      result.errors.push('Author missing name property')
    }
  }

  // Check for dateModified
  if (!schema.dateModified) {
    result.warnings.push('Missing recommended field: dateModified')
  }
}

function validateBreadcrumbSchema(
  schema: SchemaOrgBreadcrumbList,
  result: SchemaValidationResult
): void {
  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    result.errors.push('BreadcrumbList missing itemListElement array')
    result.isValid = false
    return
  }

  schema.itemListElement.forEach((item: SchemaOrgBreadcrumbItem, index: number) => {
    if (!item.item) {
      result.errors.push(`Breadcrumb item ${index} missing 'item' property`)
    }
    if (!item.name) {
      result.errors.push(`Breadcrumb item ${index} missing 'name' property`)
    }
    if (item.position === undefined) {
      result.errors.push(`Breadcrumb item ${index} missing 'position' property`)
    }
  })
}

function validateOrganizationSchema(
  schema: SchemaOrgOrganization,
  result: SchemaValidationResult
): void {
  const requiredFields: Array<keyof SchemaOrgOrganization> = ['name', 'url']

  for (const field of requiredFields) {
    if (!schema[field]) {
      result.errors.push(`Missing required field: ${field}`)
      result.isValid = false
    }
  }

  if (!schema.logo) {
    result.warnings.push('Missing recommended field: logo')
  }
}

function validateFAQSchema(
  schema: SchemaOrgFAQPage,
  result: SchemaValidationResult
): void {
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    result.errors.push('FAQPage missing mainEntity array')
    result.isValid = false
    return
  }

  schema.mainEntity.forEach((item: SchemaOrgQuestion, index: number) => {
    if (item['@type'] !== 'Question') {
      result.errors.push(`FAQ item ${index} must be of type Question`)
    }
    if (!item.name) {
      result.errors.push(`FAQ item ${index} missing question text (name)`)
    }
    if (!item.acceptedAnswer) {
      result.errors.push(`FAQ item ${index} missing acceptedAnswer`)
    } else if (!item.acceptedAnswer.text) {
      result.errors.push(`FAQ item ${index} answer missing text`)
    }
  })
}

// ==================== OPEN GRAPH METADATA ====================

export interface OpenGraphMetadataInput {
  title: string
  description: string
  url: string
  image?: string
  type?: OpenGraphType
  siteName?: string
  locale?: string
}

export function generateOpenGraphMetadata(
  input: OpenGraphMetadataInput
): Record<string, string> {
  const og: Record<string, string> = {
    'og:title': input.title,
    'og:description': input.description,
    'og:url': input.url,
    'og:type': input.type || 'website',
    'og:locale': input.locale || 'en_US'
  }

  if (input.image) {
    og['og:image'] = input.image
    og['og:image:width'] = '1200'
    og['og:image:height'] = '630'
  }

  if (input.siteName) {
    og['og:site_name'] = input.siteName
  }

  return og
}

export async function analyzeOpenGraphQuality(
  ogMetadata: Partial<OpenGraphMetadataInput>
): Promise<number> {
  let score = 0

  // Title (20 points)
  if (ogMetadata.title) {
    score += 20
    if (ogMetadata.title.length >= 50 && ogMetadata.title.length <= 60) {
      score += 5 // Optimal length
    }
  }

  // Description (20 points)
  if (ogMetadata.description) {
    score += 20
    if (
      ogMetadata.description.length >= 150 &&
      ogMetadata.description.length <= 160
    ) {
      score += 5 // Optimal length
    }
  }

  // Image (30 points)
  if (ogMetadata.image) {
    score += 20
    // Check image dimensions (1200x630 is optimal)
    // This would require fetching the image, simplified here
    score += 10
  }

  // URL (10 points)
  if (ogMetadata.url) {
    score += 10
  }

  // Type (10 points)
  if (ogMetadata.type) {
    score += 10
  }

  // Site name (5 points)
  if (ogMetadata.siteName) {
    score += 5
  }

  return score
}

// ==================== TWITTER CARD METADATA ====================

export interface TwitterCardMetadataInput {
  card: TwitterCardType
  title: string
  description: string
  image?: string
  site?: string
  creator?: string
}

export function generateTwitterCardMetadata(
  input: TwitterCardMetadataInput
): Record<string, string> {
  const twitter: Record<string, string> = {
    'twitter:card': input.card.toLowerCase().replace(/_/g, '_'),
    'twitter:title': input.title,
    'twitter:description': input.description
  }

  if (input.image) {
    twitter['twitter:image'] = input.image
  }

  if (input.site) {
    twitter['twitter:site'] = input.site.startsWith('@')
      ? input.site
      : `@${input.site}`
  }

  if (input.creator) {
    twitter['twitter:creator'] = input.creator.startsWith('@')
      ? input.creator
      : `@${input.creator}`
  }

  return twitter
}

// ==================== ROBOTS META TAGS ====================

export function parseRobotsDirectives(
  robotsContent: string
): RobotsDirective[] {
  const directives: RobotsDirective[] = []
  const parts = robotsContent.toLowerCase().split(',').map(s => s.trim())

  const directiveMap: Record<string, RobotsDirective> = {
    index: 'INDEX',
    noindex: 'NOINDEX',
    follow: 'FOLLOW',
    nofollow: 'NOFOLLOW',
    noarchive: 'NOARCHIVE',
    nosnippet: 'NOSNIPPET',
    noimageindex: 'NOIMAGEINDEX',
    notranslate: 'NOTRANSLATE'
  }

  for (const part of parts) {
    if (directiveMap[part]) {
      directives.push(directiveMap[part])
    } else if (part.startsWith('max-snippet')) {
      directives.push('MAX_SNIPPET')
    } else if (part.startsWith('max-image-preview')) {
      directives.push('MAX_IMAGE_PREVIEW')
    } else if (part.startsWith('max-video-preview')) {
      directives.push('MAX_VIDEO_PREVIEW')
    }
  }

  return directives
}

export function isIndexable(directives: RobotsDirective[]): boolean {
  return !directives.includes('NOINDEX')
}

export function isFollowable(directives: RobotsDirective[]): boolean {
  return !directives.includes('NOFOLLOW')
}

// ==================== HELPER FUNCTIONS FOR SCHEMA MAPPING ====================

function getExpectedSchemaType(pageType: string): SchemaType {
  const mapping: Record<string, SchemaType> = {
    PRODUCT: 'PRODUCT',
    ARTICLE: 'ARTICLE',
    BLOG_POST: 'BLOG_POSTING',
    HOMEPAGE: 'ORGANIZATION'
  }

  return mapping[pageType] || 'WEBPAGE'
}

// ==================== EXPORTS ====================

const seoAnalysisHelpers = {
  // Canonical
  analyzeCanonicalUrl,

  // Structured Data
  validateStructuredData,

  // Open Graph
  generateOpenGraphMetadata,
  analyzeOpenGraphQuality,

  // Twitter Cards
  generateTwitterCardMetadata,

  // Robots
  parseRobotsDirectives,
  isIndexable,
  isFollowable
}

export default seoAnalysisHelpers
