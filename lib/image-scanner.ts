/**
 * Image Scanner & SEO Analyzer
 *
 * Scans websites for images and analyzes them for SEO optimization
 * - Detects all images on a site
 * - Extracts image attributes (src, alt, title, dimensions)
 * - Identifies missing alt text
 * - Detects optimization opportunities
 */

import { db } from '@/lib/db'
import { Platform } from '@prisma/client'
import * as cheerio from 'cheerio'

export interface ScannedImage {
  url: string
  altText?: string
  title?: string
  width?: number
  height?: number
  format?: string
  sizeBytes?: number
  loadingAttribute?: string
  srcset?: string
  hasLazyLoading: boolean
  isDecorative: boolean
  context?: string
  pageUrl: string
}

export interface ImageScanResult {
  totalImages: number
  imagesWithAlt: number
  imagesMissingAlt: number
  imagesOptimized: number
  imagesNeedOptimization: number
  images: ScannedImage[]
}

/**
 * Scan a connection for all images across its pages
 */
export async function scanConnectionImages(
  connectionId: string
): Promise<ImageScanResult> {
  // Get connection with pages
  const connection = await db.connection.findUnique({
    where: { id: connectionId },
    include: {
      pages: {
        where: { httpStatus: 200 },
        select: { url: true, id: true }
      }
    }
  })

  if (!connection) {
    throw new Error('Connection not found')
  }

  const allImages: ScannedImage[] = []
  let totalWithAlt = 0
  let totalMissingAlt = 0

  // Scan each page for images
  for (const page of connection.pages) {
    try {
      const pageImages = await scanPageImages(page.url)

      // Track stats
      for (const img of pageImages) {
        if (img.altText && img.altText.trim().length > 0) {
          totalWithAlt++
        } else if (!img.isDecorative) {
          totalMissingAlt++
        }
      }

      allImages.push(...pageImages)
    } catch (error) {
      console.error(`Failed to scan page ${page.url}:`, error)
    }
  }

  // Deduplicate images by URL
  const uniqueImages = deduplicateImages(allImages)

  return {
    totalImages: uniqueImages.length,
    imagesWithAlt: totalWithAlt,
    imagesMissingAlt: totalMissingAlt,
    imagesOptimized: 0, // Will be calculated later
    imagesNeedOptimization: uniqueImages.length,
    images: uniqueImages
  }
}

/**
 * Scan a single page for images
 */
export async function scanPageImages(pageUrl: string): Promise<ScannedImage[]> {
  try {
    // Fetch page HTML
    const response = await fetch(pageUrl, {
      headers: {
        'User-Agent': 'SEOLOGY.AI Image Scanner (SEO Tool)'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const images: ScannedImage[] = []

    // Find all img tags
    $('img').each((_, element) => {
      const $img = $(element)
      const src = $img.attr('src')

      if (!src) return // Skip images without src

      // Resolve relative URLs
      const absoluteUrl = resolveUrl(pageUrl, src)

      // Extract image attributes
      const altText = $img.attr('alt')
      const title = $img.attr('title')
      const width = parseInt($img.attr('width') || '0') || undefined
      const height = parseInt($img.attr('height') || '0') || undefined
      const loading = $img.attr('loading')
      const srcset = $img.attr('srcset')

      // Determine format from URL
      const format = getImageFormat(absoluteUrl)

      // Detect if image is decorative
      const isDecorative = detectDecorativeImage(
        altText,
        src,
        $img.attr('class'),
        $img.attr('role'),
        width,
        height
      )

      // Determine context
      const context = detectImageContext($img)

      images.push({
        url: absoluteUrl,
        altText,
        title,
        width,
        height,
        format,
        loadingAttribute: loading,
        srcset,
        hasLazyLoading: loading === 'lazy',
        isDecorative,
        context,
        pageUrl
      })
    })

    // Also check for background images in CSS
    const backgroundImages = extractBackgroundImages($, pageUrl)
    images.push(...backgroundImages)

    return images
  } catch (error) {
    console.error(`Error scanning page ${pageUrl}:`, error)
    throw error
  }
}

/**
 * Store scanned images in database
 */
export async function storeScannedImages(
  connectionId: string,
  images: ScannedImage[]
): Promise<number> {
  let stored = 0

  for (const image of images) {
    try {
      // Check if image already exists
      const existing = await db.imageAsset.findUnique({
        where: {
          connectionId_url: {
            connectionId,
            url: image.url
          }
        }
      })

      const hasAltText = Boolean(image.altText && image.altText.trim().length > 0)
      const status = !hasAltText && !image.isDecorative
        ? 'NEEDS_ALT_TEXT'
        : 'NEEDS_OPTIMIZATION'

      if (existing) {
        // Update existing image
        await db.imageAsset.update({
          where: { id: existing.id },
          data: {
            altText: image.altText,
            title: image.title,
            width: image.width,
            height: image.height,
            format: image.format,
            loadingAttribute: image.loadingAttribute,
            srcset: image.srcset,
            hasAltText,
            hasLazyLoading: image.hasLazyLoading,
            isDecorative: image.isDecorative,
            context: image.context,
            pageUrl: image.pageUrl,
            status: existing.status === 'OPTIMIZED' ? 'OPTIMIZED' : status,
            lastScanned: new Date()
          }
        })
      } else {
        // Create new image record
        await db.imageAsset.create({
          data: {
            connectionId,
            url: image.url,
            altText: image.altText,
            title: image.title,
            width: image.width,
            height: image.height,
            format: image.format,
            sizeBytes: image.sizeBytes,
            loadingAttribute: image.loadingAttribute,
            srcset: image.srcset,
            hasAltText,
            hasLazyLoading: image.hasLazyLoading,
            isDecorative: image.isDecorative,
            context: image.context,
            pageUrl: image.pageUrl,
            status,
            lastScanned: new Date()
          }
        })
      }

      stored++
    } catch (error) {
      console.error(`Failed to store image ${image.url}:`, error)
    }
  }

  return stored
}

/**
 * Get image optimization statistics for a connection
 */
export async function getImageStats(connectionId: string) {
  const stats = await db.imageAsset.groupBy({
    by: ['status', 'hasAltText', 'isOptimized'],
    where: { connectionId },
    _count: true
  })

  const totalImages = await db.imageAsset.count({
    where: { connectionId }
  })

  const missingAlt = await db.imageAsset.count({
    where: {
      connectionId,
      hasAltText: false,
      isDecorative: false
    }
  })

  const needsOptimization = await db.imageAsset.count({
    where: {
      connectionId,
      isOptimized: false
    }
  })

  const optimized = await db.imageAsset.count({
    where: {
      connectionId,
      status: 'OPTIMIZED'
    }
  })

  return {
    totalImages,
    missingAlt,
    needsOptimization,
    optimized,
    percentOptimized: totalImages > 0 ? (optimized / totalImages) * 100 : 0,
    byStatus: stats
  }
}

// ========== HELPER FUNCTIONS ==========

/**
 * Resolve relative URLs to absolute
 */
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).href
  } catch {
    return relativeUrl
  }
}

/**
 * Get image format from URL
 */
function getImageFormat(url: string): string | undefined {
  const ext = url.split('.').pop()?.toLowerCase().split('?')[0]

  const formats = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'ico']

  return formats.includes(ext || '') ? ext : undefined
}

/**
 * Detect if image is decorative (e.g., icons, spacers, borders)
 */
function detectDecorativeImage(
  altText: string | undefined,
  src: string,
  className: string | undefined,
  role: string | undefined,
  width: number | undefined,
  height: number | undefined
): boolean {
  // Empty alt text explicitly marks decorative images
  if (altText === '') return true

  // Check for common decorative patterns
  const decorativePatterns = [
    /spacer/i,
    /pixel/i,
    /border/i,
    /separator/i,
    /divider/i,
    /icon-/i,
    /decoration/i
  ]

  // Check src and class for decorative patterns
  if (decorativePatterns.some(pattern => pattern.test(src) || pattern.test(className || ''))) {
    return true
  }

  // Check role attribute
  if (role === 'presentation' || role === 'none') {
    return true
  }

  // Check dimensions - very small images are often decorative
  if ((width && width > 0 && width < 10) || (height && height > 0 && height < 10)) {
    return true
  }

  return false
}

/**
 * Detect image context (where it's used on the page)
 */
function detectImageContext($img: ReturnType<cheerio.CheerioAPI>): string {
  // Check parent elements for context
  const parents = $img.parentsUntil('body')

  // Hero image
  if (parents.filter('.hero, .banner, [class*="hero"], [class*="banner"]').length > 0) {
    return 'hero'
  }

  // Product image
  if (parents.filter('.product, .item, [class*="product"], [itemtype*="Product"]').length > 0) {
    return 'product'
  }

  // Thumbnail
  if (parents.filter('.thumbnail, .thumb, [class*="thumb"]').length > 0) {
    return 'thumbnail'
  }

  // Logo
  if ($img.attr('class')?.includes('logo') || $img.attr('alt')?.toLowerCase().includes('logo')) {
    return 'logo'
  }

  // Gallery
  if (parents.filter('.gallery, .carousel, .slider, [class*="gallery"]').length > 0) {
    return 'gallery'
  }

  // Avatar/profile
  if (parents.filter('.avatar, .profile, [class*="avatar"]').length > 0) {
    return 'avatar'
  }

  // Background or decorative
  if (parents.filter('.background, .bg, [class*="background"]').length > 0) {
    return 'background'
  }

  return 'content'
}

/**
 * Extract background images from inline styles
 */
function extractBackgroundImages($: cheerio.CheerioAPI, baseUrl: string): ScannedImage[] {
  const images: ScannedImage[] = []

  $('[style*="background-image"]').each((_, element) => {
    const style = $(element).attr('style') || ''
    const match = style.match(/background-image:\s*url\(['"]?([^'"()]+)['"]?\)/)

    if (match && match[1]) {
      const url = resolveUrl(baseUrl, match[1])
      const format = getImageFormat(url)

      images.push({
        url,
        format,
        hasLazyLoading: false,
        isDecorative: true, // Background images are typically decorative
        context: 'background',
        pageUrl: baseUrl
      })
    }
  })

  return images
}

/**
 * Deduplicate images by URL (keep first occurrence with most info)
 */
function deduplicateImages(images: ScannedImage[]): ScannedImage[] {
  const seen = new Map<string, ScannedImage>()

  for (const image of images) {
    const existing = seen.get(image.url)

    if (!existing) {
      seen.set(image.url, image)
    } else {
      // Keep the image with more information
      const hasMoreInfo = (
        (image.altText && !existing.altText) ||
        (image.width && !existing.width) ||
        (image.context !== 'content' && existing.context === 'content')
      )

      if (hasMoreInfo) {
        seen.set(image.url, image)
      }
    }
  }

  return Array.from(seen.values())
}
