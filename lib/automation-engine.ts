/**
 * Automation Engine - Background SEO Analysis and Fix Application
 * Runs continuously to analyze products and apply fixes based on execution mode
 */

import { db } from '@/lib/db'
import { fetchProducts } from '@/lib/shopify-client'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

interface AutomationConfig {
  connectionId: string
  userId: string
  shop: string
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
}

interface ProductData {
  id: string
  title: string
  handle: string
  description: string
  seo: {
    title: string | null
    description: string | null
  }
  featuredImage: {
    altText: string | null
  } | null
}

interface AIAnalysisResult {
  issues: Array<{
    type: string
    severity: string
    title: string
    description: string
    recommendation: string
  }>
  suggestedSeoTitle: string
  suggestedSeoDescription: string
  suggestedAltText: string
}

/**
 * Main automation loop - analyzes products and applies fixes
 */
export async function runAutomation(config: AutomationConfig) {
  console.log(`[Automation] Starting for shop: ${config.shop}, mode: ${config.executionMode}`)

  try {
    // Fetch all products
    const products = await fetchProducts(config.userId, config.shop)
    console.log(`[Automation] Found ${products.length} products`)

    // PERFORMANCE OPTIMIZATION: Fetch all existing issues upfront to avoid N+1 queries
    // Create lookup map for O(1) access instead of per-product database queries
    const allExistingIssues = await db.issue.findMany({
      where: {
        connectionId: config.connectionId,
        status: 'DETECTED',
      },
      select: {
        id: true,
        pageUrl: true,
        detectedAt: true,
      },
    })

    // Create lookup map: pageUrl -> issue with latest detectedAt
    const issuesByUrl = new Map<string, { id: string; detectedAt: Date }>()
    for (const issue of allExistingIssues) {
      const existing = issuesByUrl.get(issue.pageUrl)
      if (!existing || issue.detectedAt > existing.detectedAt) {
        issuesByUrl.set(issue.pageUrl, { id: issue.id, detectedAt: issue.detectedAt })
      }
    }

    // Analyze each product
    for (const product of products) {
      const pageUrl = `https://${config.shop}/products/${product.handle}`

      // Check if product already has recent analysis (O(1) lookup instead of database query)
      const existingIssue = issuesByUrl.get(pageUrl)
      if (existingIssue) {
        const hoursSinceAnalysis = (Date.now() - existingIssue.detectedAt.getTime()) / (1000 * 60 * 60)
        if (hoursSinceAnalysis < 24) {
          console.log(`[Automation] Skipping ${product.title} - analyzed ${Math.round(hoursSinceAnalysis)}h ago`)
          continue
        }
      }

      // Analyze product with Claude
      console.log(`[Automation] Analyzing: ${product.title}`)
      const analysis = await analyzeProduct(product, config.shop)

      if (analysis.issues.length === 0) {
        console.log(`[Automation] No issues found for: ${product.title}`)
        continue
      }

      // Store issues
      const issueIds = await storeIssues(analysis, product, config)
      console.log(`[Automation] Found ${issueIds.length} issues for: ${product.title}`)

      // Apply fixes based on execution mode
      if (config.executionMode === 'AUTOMATIC') {
        console.log(`[Automation] Auto-applying fixes for: ${product.title}`)
        await applyFixesAutomatic(issueIds, product, config, analysis)
      } else if (config.executionMode === 'PLAN') {
        console.log(`[Automation] Creating plan for: ${product.title}`)
        await createPlanForFixes(issueIds, product, config)
      }
      // For APPROVE mode, fixes are created but await manual approval
    }

    console.log(`[Automation] Completed for shop: ${config.shop}`)
  } catch (error) {
    console.error(`[Automation] Error:`, error)
    throw error
  }
}

/**
 * Analyze product with Claude AI
 */
async function analyzeProduct(product: ProductData, shop: string): Promise<AIAnalysisResult> {
  const prompt = `You are an SEO expert analyzing a Shopify product. Analyze the following product and identify ALL SEO issues.

Product Details:
- Title: ${product.title}
- Handle (URL): ${product.handle}
- Description: ${product.description || '(empty)'}
- SEO Title: ${product.seo.title || '(not set)'}
- SEO Description: ${product.seo.description || '(not set)'}
- Featured Image Alt Text: ${product.featuredImage?.altText || '(not set)'}

Analyze and return a JSON object with this structure:
{
  "issues": [
    {
      "type": "MISSING_SEO_TITLE" | "MISSING_SEO_DESCRIPTION" | "MISSING_ALT_TEXT" | "SHORT_DESCRIPTION" | "POOR_TITLE" | "POOR_DESCRIPTION" | "LONG_HANDLE",
      "severity": "critical" | "warning" | "info",
      "title": "Brief issue title",
      "description": "Detailed explanation of the issue",
      "recommendation": "Specific recommendation to fix it"
    }
  ],
  "suggestedSeoTitle": "Optimized SEO title (50-60 chars)",
  "suggestedSeoDescription": "Optimized SEO description (120-160 chars)",
  "suggestedAltText": "Optimized alt text for image"
}

Return ONLY valid JSON, no additional text.`

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  return JSON.parse(content.text)
}

/**
 * Store issues in database
 * PERFORMANCE OPTIMIZATION: Batch create all issues in a single transaction
 */
async function storeIssues(analysis: AIAnalysisResult, product: ProductData, config: AutomationConfig): Promise<string[]> {
  // Map severity to enum values
  const severityMap: Record<string, 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'> = {
    'critical': 'CRITICAL',
    'warning': 'HIGH',
    'info': 'LOW',
  }

  // Prepare all issue data
  const issuesData = analysis.issues.map((issue) => ({
    connectionId: config.connectionId,
    type: issue.type,
    severity: severityMap[issue.severity.toLowerCase()] || 'MEDIUM',
    title: issue.title,
    details: JSON.stringify({
      description: issue.description,
      productId: product.id,
      productTitle: product.title,
      suggestedSeoTitle: analysis.suggestedSeoTitle,
      suggestedSeoDescription: analysis.suggestedSeoDescription,
      suggestedAltText: analysis.suggestedAltText,
    }),
    recommendation: issue.recommendation,
    pageUrl: `https://${config.shop}/products/${product.handle}`,
    status: 'DETECTED' as const,
  }))

  // Batch create all issues in a single transaction
  const createdIssues = await db.$transaction(
    issuesData.map((data) => db.issue.create({ data }))
  )

  return createdIssues.map((issue) => issue.id)
}

/**
 * Apply fixes automatically (AUTOMATIC mode)
 */
async function applyFixesAutomatic(issueIds: string[], product: ProductData, config: AutomationConfig, analysis: AIAnalysisResult) {
  const { updateProductSEO } = await import('@/lib/shopify-client')

  // Apply SEO optimization
  await updateProductSEO(config.userId, config.shop, product.id, {
    title: analysis.suggestedSeoTitle,
    description: analysis.suggestedSeoDescription,
  })

  // Record fixes
  for (const issueId of issueIds) {
    await db.fix.create({
      data: {
        connectionId: config.connectionId,
        issueId,
        type: 'SEO_OPTIMIZATION',
        description: 'Automatically applied SEO optimization',
        changes: JSON.stringify({
          action: 'UPDATE_PRODUCT_SEO',
          productId: product.id,
          updates: {
            seoTitle: analysis.suggestedSeoTitle,
            seoDescription: analysis.suggestedSeoDescription,
          },
        }),
        beforeState: JSON.stringify({
          seoTitle: product.seo.title,
          seoDescription: product.seo.description,
        }),
        afterState: JSON.stringify({
          seoTitle: analysis.suggestedSeoTitle,
          seoDescription: analysis.suggestedSeoDescription,
        }),
        targetUrl: `https://${config.shop}/products/${product.handle}`,
        method: 'AUTOMATIC',
        status: 'APPLIED',
        appliedAt: new Date(),
        rollbackDeadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    })

    await db.issue.update({
      where: { id: issueId },
      data: { status: 'FIXED', fixedAt: new Date() },
    })
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: config.userId,
      connectionId: config.connectionId,
      action: 'AUTO_FIX_APPLIED',
      resource: 'product',
      resourceId: product.id,
      details: JSON.stringify({
        productTitle: product.title,
        issuesFixed: issueIds.length,
        mode: 'AUTOMATIC',
      }),
    },
  })
}

/**
 * Create plan for fixes (PLAN mode)
 */
async function createPlanForFixes(issueIds: string[], product: ProductData, config: AutomationConfig) {
  // Check if plan already exists
  const existingPlan = await db.pendingPlan.findFirst({
    where: {
      connectionId: config.connectionId,
      status: 'PENDING',
    },
  })

  if (existingPlan) {
    // Add to existing plan
    console.log(`[Automation] Adding to existing plan: ${existingPlan.id}`)
  } else {
    // Create new plan
    await db.pendingPlan.create({
      data: {
        userId: config.userId,
        connectionId: config.connectionId,
        title: `SEO Optimization Plan - ${new Date().toLocaleDateString()}`,
        description: 'Automated SEO fixes awaiting approval',
        estimatedImpact: 'Improved search visibility and click-through rates',
        status: 'PENDING',
      },
    })
    console.log(`[Automation] Created new plan`)
  }
}

/**
 * Run automation for all active Shopify connections
 */
export async function runAllAutomations() {
  const connections = await db.connection.findMany({
    where: {
      platform: 'SHOPIFY',
      status: 'CONNECTED',
    },
    include: {
      user: true,
    },
  })

  console.log(`[Automation] Found ${connections.length} active Shopify connections`)

  for (const connection of connections) {
    try {
      await runAutomation({
        connectionId: connection.id,
        userId: connection.userId,
        shop: connection.domain,
        executionMode: connection.user.executionMode || 'PLAN',
      })
    } catch (error) {
      console.error(`[Automation] Failed for ${connection.domain}:`, error)
      // Continue with next connection
    }
  }
}

/**
 * Run image optimization automation for a connection
 */
export async function runImageOptimization(config: AutomationConfig) {
  console.log(`[Automation] Starting image optimization for shop: ${config.shop}`)

  try {
    const { scanConnectionImages, storeScannedImages } = await import('@/lib/image-scanner')
    const { generateAltTextBatch, getImagesNeedingAltText, applyAltTextFixes } = await import('@/lib/image-optimizer')

    // Scan for images
    const scanResult = await scanConnectionImages(config.connectionId)
    await storeScannedImages(config.connectionId, scanResult.images)

    console.log(`[Automation] Found ${scanResult.totalImages} images, ${scanResult.imagesMissingAlt} need alt text`)

    // Get images needing alt text
    const imagesToFix = await getImagesNeedingAltText(config.connectionId, 20) // Limit to 20 per run

    if (imagesToFix.length === 0) {
      console.log(`[Automation] No images need optimization`)
      return
    }

    // Generate alt text
    const imageIds = imagesToFix.map(img => img.id)
    const generateResult = await generateAltTextBatch(config.connectionId, imageIds, 5)

    console.log(`[Automation] Generated alt text for ${generateResult.successful} images`)

    // Apply fixes based on execution mode
    if (config.executionMode === 'AUTOMATIC') {
      const applyResult = await applyAltTextFixes(config.connectionId, imageIds, config.userId)
      console.log(`[Automation] Applied ${applyResult.applied} image fixes automatically`)

      // Create notification
      await db.notification.create({
        data: {
          userId: config.userId,
          type: 'SUCCESS',
          title: 'Image optimization complete',
          message: `Optimized ${applyResult.applied} product images with AI-generated alt text`,
          actionUrl: `/shopify/images?shop=${config.shop}`,
        },
      })
    } else if (config.executionMode === 'PLAN' || config.executionMode === 'APPROVE') {
      // Create notification for manual review
      await db.notification.create({
        data: {
          userId: config.userId,
          type: 'INFO',
          title: 'Image optimization suggestions ready',
          message: `${generateResult.successful} images have AI-generated alt text suggestions ready for review`,
          actionUrl: `/shopify/images?shop=${config.shop}`,
        },
      })
    }

    console.log(`[Automation] Image optimization complete for shop: ${config.shop}`)
  } catch (error) {
    console.error(`[Automation] Image optimization error:`, error)
    throw error
  }
}
