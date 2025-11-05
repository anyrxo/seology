/**
 * Claude Vision AI Integration for Image Analysis
 *
 * Uses Claude's vision capabilities to:
 * - Generate descriptive alt text for images
 * - Detect image content and context
 * - Provide SEO-optimized descriptions
 */

import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!
})

export interface ImageAnalysisResult {
  altText: string
  description: string
  tags: string[]
  confidence: number
  isDecorative: boolean
  seoScore: number
}

/**
 * Analyze an image using Claude Vision API
 */
export async function analyzeImageWithAI(
  imageUrl: string,
  context?: {
    pageUrl?: string
    existingAlt?: string
    pageTitle?: string
    surroundingText?: string
  }
): Promise<ImageAnalysisResult> {
  try {
    // Fetch image to get base64
    const imageData = await fetchImageAsBase64(imageUrl)

    // Build prompt with context
    const prompt = buildImageAnalysisPrompt(context)

    // Call Claude Vision API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: imageData.mediaType,
                data: imageData.base64
              }
            },
            {
              type: 'text',
              text: prompt
            }
          ]
        }
      ]
    })

    // Parse response
    const content = response.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const analysis = parseImageAnalysis(content.text)

    return analysis
  } catch (error) {
    console.error('Image AI analysis error:', error)
    throw error
  }
}

/**
 * Generate alt text for multiple images in batch
 */
export async function batchAnalyzeImages(
  imageUrls: string[],
  context?: {
    pageUrl?: string
    pageTitle?: string
  }
): Promise<Map<string, ImageAnalysisResult>> {
  const results = new Map<string, ImageAnalysisResult>()

  // Process in chunks to avoid rate limits
  const BATCH_SIZE = 5
  const DELAY_MS = 1000

  for (let i = 0; i < imageUrls.length; i += BATCH_SIZE) {
    const batch = imageUrls.slice(i, i + BATCH_SIZE)

    const batchResults = await Promise.allSettled(
      batch.map(url => analyzeImageWithAI(url, context))
    )

    batchResults.forEach((result, index) => {
      const url = batch[index]
      if (result.status === 'fulfilled') {
        results.set(url, result.value)
      } else {
        console.error(`Failed to analyze ${url}:`, result.reason)
      }
    })

    // Delay between batches
    if (i + BATCH_SIZE < imageUrls.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_MS))
    }
  }

  return results
}

/**
 * Store AI-generated alt text in database
 */
export async function storeImageAnalysis(
  connectionId: string,
  imageUrl: string,
  analysis: ImageAnalysisResult
): Promise<void> {
  await db.imageAsset.update({
    where: {
      connectionId_url: {
        connectionId,
        url: imageUrl
      }
    },
    data: {
      suggestedAltText: analysis.altText,
      aiDescription: analysis.description,
      aiTags: JSON.stringify(analysis.tags),
      aiConfidence: analysis.confidence,
      impactScore: analysis.seoScore,
      status: analysis.isDecorative ? 'DETECTED' : 'NEEDS_ALT_TEXT'
    }
  })
}

/**
 * Process all images for a connection with AI analysis
 */
export async function processConnectionImagesWithAI(
  connectionId: string,
  options: {
    onlyMissingAlt?: boolean
    maxImages?: number
  } = {}
): Promise<{
  processed: number
  successful: number
  failed: number
}> {
  // Get images to process
  const whereClause: Record<string, unknown> = { connectionId }

  if (options.onlyMissingAlt) {
    whereClause.hasAltText = false
    whereClause.isDecorative = false
  }

  const images = await db.imageAsset.findMany({
    where: whereClause,
    take: options.maxImages || 100,
    select: {
      url: true,
      pageUrl: true,
      context: true,
      altText: true
    }
  })

  let successful = 0
  let failed = 0

  for (const image of images) {
    try {
      // Mark as analyzing
      await db.imageAsset.update({
        where: {
          connectionId_url: {
            connectionId,
            url: image.url
          }
        },
        data: { status: 'ANALYZING' }
      })

      // Analyze with AI
      const analysis = await analyzeImageWithAI(image.url, {
        pageUrl: image.pageUrl || undefined,
        existingAlt: image.altText || undefined
      })

      // Store results
      await storeImageAnalysis(connectionId, image.url, analysis)

      successful++
    } catch (error) {
      console.error(`Failed to process image ${image.url}:`, error)

      // Mark as failed
      await db.imageAsset.update({
        where: {
          connectionId_url: {
            connectionId,
            url: image.url
          }
        },
        data: {
          status: 'FAILED',
          optimizationError: error instanceof Error ? error.message : 'Unknown error'
        }
      })

      failed++
    }
  }

  return {
    processed: images.length,
    successful,
    failed
  }
}

// ========== HELPER FUNCTIONS ==========

/**
 * Fetch image and convert to base64
 */
async function fetchImageAsBase64(imageUrl: string): Promise<{
  base64: string
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
}> {
  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: HTTP ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')

    // Map content type to supported media types
    let mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/jpeg'

    if (contentType.includes('png')) {
      mediaType = 'image/png'
    } else if (contentType.includes('gif')) {
      mediaType = 'image/gif'
    } else if (contentType.includes('webp')) {
      mediaType = 'image/webp'
    }

    return { base64, mediaType }
  } catch (error) {
    console.error(`Error fetching image ${imageUrl}:`, error)
    throw error
  }
}

/**
 * Build prompt for image analysis
 */
function buildImageAnalysisPrompt(context?: {
  pageUrl?: string
  existingAlt?: string
  pageTitle?: string
  surroundingText?: string
}): string {
  let prompt = `Analyze this image for SEO purposes and provide:

1. **Alt Text**: A concise, descriptive alt text (max 125 characters) that:
   - Describes what's in the image clearly and accurately
   - Is useful for screen readers and accessibility
   - Includes relevant keywords naturally (NO keyword stuffing)
   - Avoids phrases like "image of" or "picture of"

2. **Description**: A longer description (2-3 sentences) for internal use

3. **Tags**: 3-5 relevant tags/keywords found in the image

4. **Decorative**: Is this image purely decorative (yes/no)?
   - Decorative images include: icons, spacers, borders, purely aesthetic elements
   - Non-decorative images convey information or meaning

5. **SEO Score**: Rate the SEO value of this image (0-100):
   - High scores: Product photos, infographics, diagrams, hero images
   - Low scores: Stock photos, generic images, decorative elements

6. **Confidence**: Your confidence in this analysis (0-100)`

  if (context?.existingAlt) {
    prompt += `\n\nExisting alt text: "${context.existingAlt}"\n(Improve it if needed)`
  }

  if (context?.pageTitle) {
    prompt += `\n\nPage title: "${context.pageTitle}"`
  }

  if (context?.surroundingText) {
    prompt += `\n\nSurrounding text: "${context.surroundingText.substring(0, 200)}..."`
  }

  prompt += `\n\nRespond in this exact JSON format:
{
  "altText": "your concise alt text here",
  "description": "longer description here",
  "tags": ["tag1", "tag2", "tag3"],
  "isDecorative": false,
  "seoScore": 85,
  "confidence": 90
}`

  return prompt
}

/**
 * Parse Claude's response into structured data
 */
function parseImageAnalysis(responseText: string): ImageAnalysisResult {
  try {
    // Extract JSON from response (Claude might include extra text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const parsed = JSON.parse(jsonMatch[0])

    // Validate and return
    return {
      altText: parsed.altText || 'Image',
      description: parsed.description || '',
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 80,
      isDecorative: Boolean(parsed.isDecorative),
      seoScore: typeof parsed.seoScore === 'number' ? parsed.seoScore : 50
    }
  } catch (error) {
    console.error('Failed to parse image analysis:', error)

    // Fallback: use the response text as alt text
    return {
      altText: responseText.substring(0, 125),
      description: responseText,
      tags: [],
      confidence: 50,
      isDecorative: false,
      seoScore: 50
    }
  }
}

/**
 * Get alt text suggestions for images on a specific page
 */
export async function getAltTextSuggestionsForPage(
  connectionId: string,
  pageUrl: string
): Promise<Array<{
  imageUrl: string
  currentAlt: string | null
  suggestedAlt: string
  confidence: number
}>> {
  const images = await db.imageAsset.findMany({
    where: {
      connectionId,
      pageUrl
    },
    select: {
      url: true,
      altText: true,
      suggestedAltText: true,
      aiConfidence: true
    }
  })

  return images
    .filter(img => img.suggestedAltText)
    .map(img => ({
      imageUrl: img.url,
      currentAlt: img.altText,
      suggestedAlt: img.suggestedAltText!,
      confidence: img.aiConfidence || 80
    }))
}
