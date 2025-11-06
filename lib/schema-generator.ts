/**
 * Schema.org Structured Data Generator
 *
 * Generates valid Schema.org JSON-LD structured data for various resource types
 * Follows schema.org standards and Google's structured data guidelines
 */

import { Platform } from '@prisma/client'

// ==================== TYPES ====================

export interface SchemaOrgProduct {
  '@context': 'https://schema.org'
  '@type': 'Product'
  name: string
  description?: string
  image?: string | string[]
  brand?: {
    '@type': 'Brand'
    name: string
  }
  offers?: {
    '@type': 'Offer'
    url?: string
    priceCurrency: string
    price: string
    availability?: string
    priceValidUntil?: string
    itemCondition?: string
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: string
    reviewCount: string
  }
  review?: Array<{
    '@type': 'Review'
    reviewRating: {
      '@type': 'Rating'
      ratingValue: string
    }
    author: {
      '@type': 'Person'
      name: string
    }
    reviewBody: string
  }>
  sku?: string
  gtin?: string
  mpn?: string
}

export interface SchemaOrgArticle {
  '@context': 'https://schema.org'
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle'
  headline: string
  description?: string
  image?: string | string[]
  author?: {
    '@type': 'Person' | 'Organization'
    name: string
    url?: string
  }
  publisher?: {
    '@type': 'Organization'
    name: string
    logo?: {
      '@type': 'ImageObject'
      url: string
    }
  }
  datePublished?: string
  dateModified?: string
  mainEntityOfPage?: {
    '@type': 'WebPage'
    '@id': string
  }
}

export interface SchemaOrgOrganization {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  contactPoint?: Array<{
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    email?: string
  }>
  sameAs?: string[] // Social media profiles
  address?: {
    '@type': 'PostalAddress'
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
}

export interface SchemaOrgBreadcrumb {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }>
}

export interface SchemaOrgWebSite {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

export interface SchemaValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface SchemaValidationResult {
  isValid: boolean
  errors: SchemaValidationError[]
  warnings: SchemaValidationError[]
}

// ==================== PRODUCT SCHEMA GENERATOR ====================

/**
 * Generate Product schema for Shopify products
 */
export function generateProductSchema(product: {
  name: string
  description?: string
  image?: string | string[]
  brand?: string
  price?: number
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'Discontinued'
  url?: string
  sku?: string
  gtin?: string
  reviews?: Array<{
    rating: number
    author: string
    body: string
  }>
}): SchemaOrgProduct {
  const schema: SchemaOrgProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
  }

  // Add optional fields
  if (product.description) {
    schema.description = product.description
  }

  if (product.image) {
    schema.image = product.image
  }

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    }
  }

  if (product.sku) {
    schema.sku = product.sku
  }

  if (product.gtin) {
    schema.gtin = product.gtin
  }

  // Add offer if price is available
  if (product.price !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      priceCurrency: product.currency || 'USD',
      price: product.price.toFixed(2),
    }

    if (product.url) {
      schema.offers.url = product.url
    }

    if (product.availability) {
      schema.offers.availability = `https://schema.org/${product.availability}`
    }

    // Set price valid until 1 year from now
    const priceValidUntil = new Date()
    priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1)
    schema.offers.priceValidUntil = priceValidUntil.toISOString().split('T')[0]

    schema.offers.itemCondition = 'https://schema.org/NewCondition'
  }

  // Add aggregate rating if reviews exist
  if (product.reviews && product.reviews.length > 0) {
    const avgRating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length

    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: product.reviews.length.toString(),
    }

    // Add individual reviews (max 5 for performance)
    schema.review = product.reviews.slice(0, 5).map((review) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating.toString(),
      },
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.body,
    }))
  }

  return schema
}

// ==================== ARTICLE SCHEMA GENERATOR ====================

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(article: {
  title: string
  description?: string
  image?: string | string[]
  author?: string
  authorUrl?: string
  publisherName: string
  publisherLogo?: string
  datePublished?: Date | string
  dateModified?: Date | string
  url: string
  type?: 'Article' | 'BlogPosting' | 'NewsArticle'
}): SchemaOrgArticle {
  const schema: SchemaOrgArticle = {
    '@context': 'https://schema.org',
    '@type': article.type || 'Article',
    headline: article.title,
  }

  if (article.description) {
    schema.description = article.description
  }

  if (article.image) {
    schema.image = article.image
  }

  if (article.author) {
    schema.author = {
      '@type': 'Person',
      name: article.author,
    }

    if (article.authorUrl) {
      schema.author.url = article.authorUrl
    }
  }

  schema.publisher = {
    '@type': 'Organization',
    name: article.publisherName,
  }

  if (article.publisherLogo) {
    schema.publisher.logo = {
      '@type': 'ImageObject',
      url: article.publisherLogo,
    }
  }

  if (article.datePublished) {
    const date = article.datePublished instanceof Date
      ? article.datePublished
      : new Date(article.datePublished)
    schema.datePublished = date.toISOString()
  }

  if (article.dateModified) {
    const date = article.dateModified instanceof Date
      ? article.dateModified
      : new Date(article.dateModified)
    schema.dateModified = date.toISOString()
  }

  schema.mainEntityOfPage = {
    '@type': 'WebPage',
    '@id': article.url,
  }

  return schema
}

// ==================== ORGANIZATION SCHEMA GENERATOR ====================

/**
 * Generate Organization schema for homepage
 */
export function generateOrganizationSchema(org: {
  name: string
  url: string
  logo?: string
  description?: string
  email?: string
  phone?: string
  socialProfiles?: string[]
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
    country?: string
  }
}): SchemaOrgOrganization {
  const schema: SchemaOrgOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
  }

  if (org.logo) {
    schema.logo = org.logo
  }

  if (org.description) {
    schema.description = org.description
  }

  // Add contact point
  if (org.email || org.phone) {
    schema.contactPoint = []

    if (org.phone) {
      schema.contactPoint.push({
        '@type': 'ContactPoint',
        telephone: org.phone,
        contactType: 'customer service',
        email: org.email,
      })
    }
  }

  // Add social media profiles
  if (org.socialProfiles && org.socialProfiles.length > 0) {
    schema.sameAs = org.socialProfiles
  }

  // Add address
  if (org.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: org.address.street,
      addressLocality: org.address.city,
      addressRegion: org.address.state,
      postalCode: org.address.zip,
      addressCountry: org.address.country,
    }
  }

  return schema
}

// ==================== BREADCRUMB SCHEMA GENERATOR ====================

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string
  url?: string
}>): SchemaOrgBreadcrumb {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

// ==================== WEBSITE SCHEMA GENERATOR ====================

/**
 * Generate WebSite schema with search functionality
 */
export function generateWebSiteSchema(site: {
  name: string
  url: string
  description?: string
  searchUrl?: string
}): SchemaOrgWebSite {
  const schema: SchemaOrgWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }

  if (site.description) {
    schema.description = site.description
  }

  if (site.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: `${site.searchUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    }
  }

  return schema
}

// ==================== VALIDATION ====================

/**
 * Validate a schema against basic Schema.org requirements
 */
export function validateSchema(
  schema: Record<string, unknown>,
  schemaType: string
): SchemaValidationResult {
  const errors: SchemaValidationError[] = []
  const warnings: SchemaValidationError[] = []

  // Check required context
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
    errors.push({
      field: '@context',
      message: 'Missing or invalid @context. Must be "https://schema.org"',
      severity: 'error',
    })
  }

  // Check required type
  if (!schema['@type']) {
    errors.push({
      field: '@type',
      message: 'Missing required @type property',
      severity: 'error',
    })
  }

  // Schema-specific validation
  switch (schemaType) {
    case 'Product':
      validateProductSchema(schema, errors, warnings)
      break
    case 'Article':
    case 'BlogPosting':
    case 'NewsArticle':
      validateArticleSchema(schema, errors, warnings)
      break
    case 'Organization':
      validateOrganizationSchema(schema, errors, warnings)
      break
    case 'BreadcrumbList':
      validateBreadcrumbSchema(schema, errors, warnings)
      break
    case 'WebSite':
      validateWebSiteSchema(schema, errors, warnings)
      break
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

function validateProductSchema(
  schema: Record<string, unknown>,
  errors: SchemaValidationError[],
  warnings: SchemaValidationError[]
): void {
  if (!schema.name) {
    errors.push({
      field: 'name',
      message: 'Product name is required',
      severity: 'error',
    })
  }

  if (!schema.image) {
    warnings.push({
      field: 'image',
      message: 'Product image is recommended for better visibility',
      severity: 'warning',
    })
  }

  if (!schema.description) {
    warnings.push({
      field: 'description',
      message: 'Product description is recommended',
      severity: 'warning',
    })
  }

  // Validate offers
  const offers = schema.offers as Record<string, unknown> | undefined
  if (offers) {
    if (!offers.price) {
      errors.push({
        field: 'offers.price',
        message: 'Offer price is required',
        severity: 'error',
      })
    }

    if (!offers.priceCurrency) {
      errors.push({
        field: 'offers.priceCurrency',
        message: 'Offer priceCurrency is required',
        severity: 'error',
      })
    }
  } else {
    warnings.push({
      field: 'offers',
      message: 'Product offers are recommended for e-commerce products',
      severity: 'warning',
    })
  }
}

function validateArticleSchema(
  schema: Record<string, unknown>,
  errors: SchemaValidationError[],
  warnings: SchemaValidationError[]
): void {
  if (!schema.headline) {
    errors.push({
      field: 'headline',
      message: 'Article headline is required',
      severity: 'error',
    })
  }

  if (!schema.image) {
    warnings.push({
      field: 'image',
      message: 'Article image is recommended',
      severity: 'warning',
    })
  }

  if (!schema.author) {
    warnings.push({
      field: 'author',
      message: 'Article author is recommended',
      severity: 'warning',
    })
  }

  if (!schema.publisher) {
    errors.push({
      field: 'publisher',
      message: 'Article publisher is required',
      severity: 'error',
    })
  }

  if (!schema.datePublished) {
    warnings.push({
      field: 'datePublished',
      message: 'Article datePublished is recommended',
      severity: 'warning',
    })
  }
}

function validateOrganizationSchema(
  schema: Record<string, unknown>,
  errors: SchemaValidationError[],
  warnings: SchemaValidationError[]
): void {
  if (!schema.name) {
    errors.push({
      field: 'name',
      message: 'Organization name is required',
      severity: 'error',
    })
  }

  if (!schema.url) {
    errors.push({
      field: 'url',
      message: 'Organization URL is required',
      severity: 'error',
    })
  }

  if (!schema.logo) {
    warnings.push({
      field: 'logo',
      message: 'Organization logo is recommended for Google Knowledge Panel',
      severity: 'warning',
    })
  }
}

function validateBreadcrumbSchema(
  schema: Record<string, unknown>,
  errors: SchemaValidationError[],
  warnings: SchemaValidationError[]
): void {
  const items = schema.itemListElement as unknown[] | undefined

  if (!items || items.length === 0) {
    errors.push({
      field: 'itemListElement',
      message: 'BreadcrumbList must have at least one item',
      severity: 'error',
    })
  }
}

function validateWebSiteSchema(
  schema: Record<string, unknown>,
  errors: SchemaValidationError[],
  warnings: SchemaValidationError[]
): void {
  if (!schema.name) {
    errors.push({
      field: 'name',
      message: 'WebSite name is required',
      severity: 'error',
    })
  }

  if (!schema.url) {
    errors.push({
      field: 'url',
      message: 'WebSite URL is required',
      severity: 'error',
    })
  }

  if (!schema.potentialAction) {
    warnings.push({
      field: 'potentialAction',
      message: 'SearchAction is recommended for sitelinks searchbox',
      severity: 'warning',
    })
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Convert schema object to JSON-LD script tag
 */
export function schemaToScriptTag(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>`
}

/**
 * Parse breadcrumbs from URL path
 */
export function parseBreadcrumbsFromPath(
  url: string,
  domain: string
): Array<{ name: string; url: string }> {
  const urlObj = new URL(url)
  const pathSegments = urlObj.pathname
    .split('/')
    .filter((segment) => segment.length > 0)

  const breadcrumbs: Array<{ name: string; url: string }> = [
    {
      name: 'Home',
      url: domain,
    },
  ]

  let currentPath = ''
  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    breadcrumbs.push({
      name,
      url: `${domain}${currentPath}`,
    })
  }

  return breadcrumbs
}

/**
 * Generate multiple schemas for a page
 */
export function generateMultipleSchemas(
  schemas: Array<Record<string, unknown>>
): string {
  return schemas.map((schema) => schemaToScriptTag(schema)).join('\n')
}

/**
 * Check if schema type is supported
 */
export function isSupportedSchemaType(schemaType: string): boolean {
  const supportedTypes = [
    'Product',
    'Article',
    'BlogPosting',
    'NewsArticle',
    'Organization',
    'BreadcrumbList',
    'WebSite',
  ]

  return supportedTypes.includes(schemaType)
}
