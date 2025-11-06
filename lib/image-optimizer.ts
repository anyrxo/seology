/**
 * Image Optimizer - AI-Powered Alt Text Generation
 * Uses Claude Vision API to generate descriptive alt text for images
 */

import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/db'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface AltTextSuggestion {
  imageUrl: string
  suggestedAltText: string
  aiDescription: string
  confidence: number
  tags: string[]
  isProductImage: boolean
}

interface BatchOptimizationResult {
  successful: number
  failed: number
  suggestions: AltTextSuggestion[]
}

/**
 * Generate alt text for a single image using Claude Vision API
 */
export async function generateAltText(
  imageUrl: string,
  context?: string
): Promise<AltTextSuggestion> {
  console.log(`[ImageOptimizer] Generating alt text for: ${imageUrl}`)

  try {
    // Fetch the image
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
    }

    const imageBuffer = await imageResponse.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString('base64')

    // Determine media type
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'
    const mediaType = contentType as
      | 'image/jpeg'
      | 'image/png'
      | 'image/gif'
      | 'image/webp'

    // Create prompt based on context
    const prompt = buildAltTextPrompt(context)

    // Call Claude Vision API
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    })

    // Parse response
    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    const result = JSON.parse(content.text) as {
      altText: string
      description: string
      confidence: number
      tags: string[]
      isProductImage: boolean
    }

    return {
      imageUrl,
      suggestedAltText: result.altText,
      aiDescription: result.description,
      confidence: result.confidence,
      tags: result.tags,
      isProductImage: result.isProductImage,
    }
  } catch (error) {
    console.error(`[ImageOptimizer] Error generating alt text:`, error)
    throw error
  }
}

/**
 * Generate alt text for multiple images in batch
 */
export async function generateAltTextBatch(
  connectionId: string,
  imageIds: string[],
  maxConcurrent = 5
): Promise<BatchOptimizationResult> {
  console.log(
    `[ImageOptimizer] Starting batch generation for ${imageIds.length} images`
  )

  const result: BatchOptimizationResult = {
    successful: 0,
    failed: 0,
    suggestions: [],
  }

  // Process images in batches to avoid rate limits
  for (let i = 0; i < imageIds.length; i += maxConcurrent) {
    const batch = imageIds.slice(i, i + maxConcurrent)

    const promises = batch.map(async (imageId) => {
      try {
        // Get image from database
        const image = await db.imageAsset.findUnique({
          where: { id: imageId },
        })

        if (!image) {
          console.error(`Image not found: ${imageId}`)
          result.failed++
          return
        }

        // Skip if already has AI-generated alt text
        if (image.suggestedAltText && image.aiConfidence && image.aiConfidence > 80) {
          console.log(`Skipping ${image.url} - already has high-quality alt text`)
          return
        }

        // Generate alt text
        const suggestion = await generateAltText(image.url, image.context || undefined)

        // Update database with suggestion
        await db.imageAsset.update({
          where: { id: imageId },
          data: {
            suggestedAltText: suggestion.suggestedAltText,
            aiDescription: suggestion.aiDescription,
            aiConfidence: suggestion.confidence,
            aiTags: JSON.stringify(suggestion.tags),
            status: 'ANALYZING',
          },
        })

        result.suggestions.push(suggestion)
        result.successful++

        console.log(`Generated alt text for ${image.url}: "${suggestion.suggestedAltText}"`)
      } catch (error) {
        console.error(`Failed to process image ${imageId}:`, error)
        result.failed++
      }
    })

    await Promise.all(promises)

    // Rate limiting: wait between batches
    if (i + maxConcurrent < imageIds.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  console.log(
    `[ImageOptimizer] Batch complete: ${result.successful} successful, ${result.failed} failed`
  )

  return result
}

/**
 * Apply AI-generated alt text to images (update in Shopify/WordPress/etc)
 */
export async function applyAltTextFixes(
  connectionId: string,
  imageIds: string[],
  userId: string
): Promise<{ applied: number; failed: number }> {
  console.log(`[ImageOptimizer] Applying alt text fixes for ${imageIds.length} images`)

  let applied = 0
  let failed = 0

  // Get connection details
  const connection = await db.connection.findUnique({
    where: { id: connectionId },
  })

  if (!connection) {
    throw new Error('Connection not found')
  }

  for (const imageId of imageIds) {
    try {
      const image = await db.imageAsset.findUnique({
        where: { id: imageId },
      })

      if (!image || !image.suggestedAltText) {
        console.error(`No alt text suggestion for image: ${imageId}`)
        failed++
        continue
      }

      // Apply fix based on platform
      if (connection.platform === 'SHOPIFY') {
        await applyShopifyImageAltText(
          userId,
          connection.domain,
          image.url,
          image.suggestedAltText
        )
      } else if (connection.platform === 'WORDPRESS') {
        await applyWordPressImageAltText(
          connection,
          image.url,
          image.suggestedAltText
        )
      }

      // Update image status
      await db.imageAsset.update({
        where: { id: imageId },
        data: {
          altText: image.suggestedAltText,
          hasAltText: true,
          status: 'OPTIMIZED',
          lastOptimized: new Date(),
        },
      })

      // Create fix record
      await db.fix.create({
        data: {
          connectionId,
          type: 'IMAGE_ALT_TEXT',
          description: `Added AI-generated alt text: "${image.suggestedAltText}"`,
          changes: JSON.stringify({
            action: 'UPDATE_IMAGE_ALT_TEXT',
            imageUrl: image.url,
            altText: image.suggestedAltText,
          }),
          beforeState: JSON.stringify({
            altText: image.altText || null,
          }),
          afterState: JSON.stringify({
            altText: image.suggestedAltText,
          }),
          targetUrl: image.pageUrl || image.url,
          method: 'AUTOMATIC',
          status: 'APPLIED',
          appliedAt: new Date(),
          rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      })

      applied++
      console.log(`Applied alt text for ${image.url}`)
    } catch (error) {
      console.error(`Failed to apply alt text for image ${imageId}:`, error)
      failed++
    }
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      connectionId,
      action: 'IMAGE_ALT_TEXT_APPLIED',
      resource: 'image',
      details: JSON.stringify({
        imagesFixed: applied,
        imagesFailed: failed,
      }),
    },
  })

  return { applied, failed }
}

/**
 * Get images that need alt text generation
 */
export async function getImagesNeedingAltText(
  connectionId: string,
  limit = 50
) {
  return db.imageAsset.findMany({
    where: {
      connectionId,
      hasAltText: false,
      isDecorative: false,
      status: { in: ['DETECTED', 'NEEDS_ALT_TEXT'] },
    },
    orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
    take: limit,
  })
}

// ========== PLATFORM-SPECIFIC FUNCTIONS ==========

/**
 * Apply alt text to Shopify product image
 */
async function applyShopifyImageAltText(
  userId: string,
  shop: string,
  imageUrl: string,
  altText: string
) {
  const { shopifyGraphQL } = await import('@/lib/shopify-client')

  // Find the product and image by URL
  const findImageQuery = `
    query {
      products(first: 250, query: "status:active") {
        edges {
          node {
            id
            images(first: 20) {
              edges {
                node {
                  id
                  url
                }
              }
            }
          }
        }
      }
    }
  `

  const findResponse = await shopifyGraphQL<{
    products: {
      edges: Array<{
        node: {
          id: string
          images: {
            edges: Array<{
              node: {
                id: string
                url: string
              }
            }>
          }
        }
      }>
    }
  }>(userId, shop, { query: findImageQuery })

  if (findResponse.errors) {
    throw new Error(findResponse.errors[0].message)
  }

  // Find matching image
  let imageId: string | null = null
  for (const productEdge of findResponse.data?.products.edges || []) {
    for (const imageEdge of productEdge.node.images.edges) {
      if (imageEdge.node.url === imageUrl) {
        imageId = imageEdge.node.id
        break
      }
    }
    if (imageId) break
  }

  if (!imageId) {
    throw new Error(`Image not found in Shopify: ${imageUrl}`)
  }

  // Update image alt text
  const updateMutation = `
    mutation productImageUpdate($productImageId: ID!, $image: ImageInput!) {
      productImageUpdate(productImageId: $productImageId, image: $image) {
        image {
          id
          altText
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const updateResponse = await shopifyGraphQL<{
    productImageUpdate: {
      image: {
        id: string
        altText: string | null
      }
      userErrors: Array<{
        field: string[]
        message: string
      }>
    }
  }>(userId, shop, {
    query: updateMutation,
    variables: {
      productImageId: imageId,
      image: {
        altText,
      },
    },
  })

  if (updateResponse.errors) {
    throw new Error(updateResponse.errors[0].message)
  }

  if (
    updateResponse.data?.productImageUpdate?.userErrors &&
    updateResponse.data.productImageUpdate.userErrors.length > 0
  ) {
    throw new Error(updateResponse.data.productImageUpdate.userErrors[0].message)
  }

  console.log(`Updated Shopify image alt text: ${imageId}`)
}

/**
 * Apply alt text to WordPress image
 */
async function applyWordPressImageAltText(
  connection: { credentials: string | null },
  imageUrl: string,
  altText: string
) {
  if (!connection.credentials) {
    throw new Error('WordPress credentials not found')
  }

  const credentials = JSON.parse(connection.credentials) as {
    siteUrl: string
    username: string
    password: string
  }

  // Find media item by URL
  const searchResponse = await fetch(
    `${credentials.siteUrl}/wp-json/wp/v2/media?search=${encodeURIComponent(imageUrl)}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
      },
    }
  )

  if (!searchResponse.ok) {
    throw new Error(`WordPress API error: ${searchResponse.statusText}`)
  }

  const media = (await searchResponse.json()) as Array<{ id: number }>

  if (media.length === 0) {
    throw new Error(`Image not found in WordPress: ${imageUrl}`)
  }

  const mediaId = media[0].id

  // Update alt text
  const updateResponse = await fetch(
    `${credentials.siteUrl}/wp-json/wp/v2/media/${mediaId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alt_text: altText,
      }),
    }
  )

  if (!updateResponse.ok) {
    throw new Error(`WordPress update error: ${updateResponse.statusText}`)
  }

  console.log(`Updated WordPress image alt text: ${mediaId}`)
}

// ========== HELPER FUNCTIONS ==========

/**
 * Build prompt for Claude Vision API based on context
 */
function buildAltTextPrompt(context?: string): string {
  let prompt = `You are an SEO expert analyzing images for accessibility and search engine optimization.

Analyze this image and provide:
1. A concise, descriptive alt text (50-125 characters) that accurately describes the image for screen readers and SEO
2. A detailed description of what you see
3. Your confidence level (0-100) in the accuracy of the description
4. Relevant tags/keywords
5. Whether this appears to be a product image

IMPORTANT ALT TEXT GUIDELINES:
- Be descriptive but concise
- Focus on what's relevant and important
- Don't start with "Image of" or "Picture of"
- Include relevant keywords naturally
- For product images, include key features (color, style, material)`

  if (context) {
    prompt += `\n\nCONTEXT: This image is used as a ${context} on the website.`
  }

  prompt += `

Return your analysis as JSON with this exact structure:
{
  "altText": "Concise description for alt text",
  "description": "Detailed description of the image",
  "confidence": 85,
  "tags": ["tag1", "tag2", "tag3"],
  "isProductImage": true
}

Return ONLY valid JSON, no additional text.`

  return prompt
}
