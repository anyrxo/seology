/**
 * Shopify SEO Fix Application Engine
 *
 * Core system for applying SEO fixes to Shopify stores via GraphQL
 * Handles fix generation, application, and rollback
 */

import { Connection } from '@prisma/client'
import { db } from './db'
import {
  updateProductSEO,
  updatePageSEO,
  updateArticleSEO,
  updateCollectionSEO,
  addProductSchema,
  addArticleSchema,
} from './shopify-graphql'

export interface SEOIssue {
  resource: string
  resourceId: string
  resourceTitle: string
  issueType: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  currentValue?: string
  suggestedValue?: string
}

export interface GeneratedFix {
  description: string
  type: string
  targetUrl?: string
  changes: FixChanges
  beforeState: Record<string, unknown>
  estimatedImpact: string
}

export interface FixChanges {
  action: string
  resource: string
  resourceId: string
  updates: Record<string, unknown>
}

/**
 * Generate a fix from an audit issue
 */
export function generateFix(issue: SEOIssue): GeneratedFix {
  const changes: FixChanges = {
    action: '',
    resource: issue.resource,
    resourceId: issue.resourceId,
    updates: {}
  }

  const beforeState: Record<string, unknown> = {
    [issue.issueType]: issue.currentValue || null
  }

  // Product fixes
  if (issue.resource === 'product') {
    if (issue.issueType === 'missing_seo_title' || issue.issueType === 'short_seo_title') {
      changes.action = 'updateProductSEO'
      changes.updates = {
        title: issue.suggestedValue || `${issue.resourceTitle} - Optimized Title`
      }
    }

    if (issue.issueType === 'missing_seo_description' || issue.issueType === 'short_seo_description') {
      changes.action = 'updateProductSEO'
      changes.updates = {
        description: issue.suggestedValue || `High-quality ${issue.resourceTitle}. Shop now for best prices and fast shipping.`
      }
    }

    if (issue.issueType === 'missing_image_alt') {
      changes.action = 'updateProductImages'
      changes.updates = {
        altText: `${issue.resourceTitle} product image`
      }
    }
  }

  // Page fixes
  if (issue.resource === 'page') {
    if (issue.issueType === 'missing_seo_title') {
      changes.action = 'updatePageSEO'
      changes.updates = {
        title: issue.suggestedValue || `${issue.resourceTitle} | Your Store`
      }
    }

    if (issue.issueType === 'missing_seo_description') {
      changes.action = 'updatePageSEO'
      changes.updates = {
        description: issue.suggestedValue || `Learn more about ${issue.resourceTitle}. Discover our comprehensive guide and resources.`
      }
    }
  }

  // Article fixes
  if (issue.resource === 'article') {
    if (issue.issueType === 'missing_seo_title') {
      changes.action = 'updateArticleSEO'
      changes.updates = {
        title: issue.suggestedValue || `${issue.resourceTitle} | Blog`
      }
    }

    if (issue.issueType === 'missing_seo_description') {
      changes.action = 'updateArticleSEO'
      changes.updates = {
        description: issue.suggestedValue || `Read our comprehensive guide about ${issue.resourceTitle}. Expert insights and tips.`
      }
    }
  }

  // Collection fixes
  if (issue.resource === 'collection') {
    if (issue.issueType === 'missing_seo_title') {
      changes.action = 'updateCollectionSEO'
      changes.updates = {
        title: issue.suggestedValue || `Shop ${issue.resourceTitle} | Best Selection`
      }
    }

    if (issue.issueType === 'missing_seo_description') {
      changes.action = 'updateCollectionSEO'
      changes.updates = {
        description: issue.suggestedValue || `Browse our ${issue.resourceTitle} collection. Premium quality products at competitive prices.`
      }
    }
  }

  return {
    description: `Fix ${issue.issueType} for ${issue.resourceTitle}`,
    type: 'shopify_seo_fix',
    targetUrl: undefined,
    changes,
    beforeState,
    estimatedImpact: `Improve SEO for ${issue.resource}: ${issue.resourceTitle}`
  }
}

/**
 * Apply a fix to Shopify store
 */
export async function applyFix(
  connection: Connection,
  fixChanges: FixChanges
): Promise<{ success: boolean; afterState: Record<string, unknown>; error?: string }> {
  try {
    let afterState: Record<string, unknown> = {}

    // Extract resource ID (remove gid:// prefix if present)
    const resourceId = fixChanges.resourceId.replace(/^gid:\/\/shopify\/\w+\//, '')

    switch (fixChanges.action) {
      case 'updateProductSEO': {
        const result = await updateProductSEO(connection, resourceId, {
          title: fixChanges.updates.title as string | undefined,
          description: fixChanges.updates.description as string | undefined,
        })
        afterState = {
          title: result.seo.title,
          description: result.seo.description,
        }
        break
      }

      case 'updatePageSEO': {
        const result = await updatePageSEO(connection, resourceId, {
          title: fixChanges.updates.title as string | undefined,
          description: fixChanges.updates.description as string | undefined,
        })
        afterState = {
          title: result.seo.title,
          description: result.seo.description,
        }
        break
      }

      case 'updateArticleSEO': {
        const result = await updateArticleSEO(connection, resourceId, {
          title: fixChanges.updates.title as string | undefined,
          description: fixChanges.updates.description as string | undefined,
        })
        afterState = {
          title: result.seo.title,
          description: result.seo.description,
        }
        break
      }

      case 'updateCollectionSEO': {
        const result = await updateCollectionSEO(connection, resourceId, {
          title: fixChanges.updates.title as string | undefined,
          description: fixChanges.updates.description as string | undefined,
        })
        afterState = {
          title: result.seo.title,
          description: result.seo.description,
        }
        break
      }

      case 'updateProductImages': {
        // Note: Would need image IDs to update individual images
        // For now, this is a placeholder
        afterState = {
          altText: fixChanges.updates.altText,
        }
        break
      }

      case 'addProductSchema': {
        await addProductSchema(connection, resourceId, fixChanges.updates as Parameters<typeof addProductSchema>[2])
        afterState = {
          schemaAdded: true,
        }
        break
      }

      case 'addArticleSchema': {
        await addArticleSchema(connection, resourceId, fixChanges.updates as Parameters<typeof addArticleSchema>[2])
        afterState = {
          schemaAdded: true,
        }
        break
      }

      default:
        return {
          success: false,
          afterState: {},
          error: `Unknown action: ${fixChanges.action}`
        }
    }

    return {
      success: true,
      afterState,
    }
  } catch (error) {
    console.error('[FixEngine] Error applying fix:', error)
    return {
      success: false,
      afterState: {},
      error: error instanceof Error ? error.message : 'Unknown error applying fix'
    }
  }
}

/**
 * Create fix records in database from audit issues
 */
export async function createFixesFromAudit(
  connectionId: string,
  userId: string,
  issues: SEOIssue[],
  executionMode: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
): Promise<{ fixIds: string[]; planId?: string }> {
  const generatedFixes = issues.map(issue => generateFix(issue))

  // For PLAN mode, create a plan first
  let planId: string | undefined

  if (executionMode === 'PLAN') {
    const plan = await db.pendingPlan.create({
      data: {
        userId,
        connectionId,
        title: 'SEO Optimization Plan',
        description: `Batch fix for ${generatedFixes.length} SEO issues`,
        estimatedImpact: JSON.stringify({ totalFixes: generatedFixes.length }),
        status: 'PENDING',
      }
    })
    planId = plan.id
  }

  // Create fix records
  const fixes = await Promise.all(
    generatedFixes.map(async (fix) => {
      return db.fix.create({
        data: {
          connectionId,
          description: fix.description,
          type: fix.type,
          targetUrl: fix.targetUrl,
          changes: JSON.stringify(fix.changes),
          beforeState: JSON.stringify(fix.beforeState),
          afterState: '{}',
          method: executionMode === 'AUTOMATIC' ? 'AUTOMATIC' : 'PENDING',
          status: executionMode === 'AUTOMATIC' ? 'PENDING' : 'PENDING',
          planId: planId,
        }
      })
    })
  )

  return {
    fixIds: fixes.map(f => f.id),
    planId,
  }
}

/**
 * Apply a single fix by ID
 */
export async function applyFixById(
  fixId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const fix = await db.fix.findUnique({
    where: { id: fixId },
    include: { connection: true }
  })

  if (!fix) {
    return { success: false, error: 'Fix not found' }
  }

  if (fix.status === 'APPLIED') {
    return { success: false, error: 'Fix already applied' }
  }

  const changes = JSON.parse(fix.changes) as FixChanges
  const result = await applyFix(fix.connection, changes)

  if (result.success) {
    // Update fix record
    const rollbackDeadline = new Date()
    rollbackDeadline.setDate(rollbackDeadline.getDate() + 90) // 90 days

    await db.fix.update({
      where: { id: fixId },
      data: {
        status: 'APPLIED',
        afterState: JSON.stringify(result.afterState),
        appliedAt: new Date(),
        rollbackDeadline,
      }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        connectionId: fix.connectionId,
        action: 'FIX_APPLIED',
        resource: 'fix',
        resourceId: fixId,
        details: JSON.stringify({
          description: fix.description,
          changes,
          afterState: result.afterState,
        })
      }
    })

    return { success: true }
  }

  // Mark as failed
  await db.fix.update({
    where: { id: fixId },
    data: {
      status: 'FAILED',
    }
  })

  return { success: false, error: result.error }
}

/**
 * Apply all fixes in a plan (batch approval)
 */
export async function applyPlan(
  planId: string,
  userId: string
): Promise<{ success: boolean; appliedCount: number; failedCount: number; errors: string[] }> {
  const plan = await db.pendingPlan.findUnique({
    where: { id: planId },
    include: {
      fixes: {
        where: { status: 'PENDING' },
        include: { connection: true }
      }
    }
  })

  if (!plan) {
    return { success: false, appliedCount: 0, failedCount: 0, errors: ['Plan not found'] }
  }

  if (plan.status === 'APPROVED') {
    return { success: false, appliedCount: 0, failedCount: 0, errors: ['Plan already approved'] }
  }

  let appliedCount = 0
  let failedCount = 0
  const errors: string[] = []

  // Apply each fix
  for (const fix of plan.fixes) {
    const result = await applyFixById(fix.id, userId)
    if (result.success) {
      appliedCount++
    } else {
      failedCount++
      errors.push(`${fix.description}: ${result.error}`)
    }
  }

  // Update plan status
  await db.pendingPlan.update({
    where: { id: planId },
    data: {
      status: 'APPROVED',
      approvedAt: new Date(),
      executedAt: new Date(),
      estimatedImpact: JSON.stringify({
        totalFixes: plan.fixes.length,
        appliedCount,
        failedCount
      }),
    }
  })

  return {
    success: failedCount === 0,
    appliedCount,
    failedCount,
    errors,
  }
}

/**
 * Rollback a fix (restore previous state)
 */
export async function rollbackFix(
  fixId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const fix = await db.fix.findUnique({
    where: { id: fixId },
    include: { connection: true }
  })

  if (!fix) {
    return { success: false, error: 'Fix not found' }
  }

  if (fix.status !== 'APPLIED') {
    return { success: false, error: 'Fix not applied, cannot rollback' }
  }

  if (fix.rollbackDeadline && new Date() > fix.rollbackDeadline) {
    return { success: false, error: 'Rollback deadline expired (90 days)' }
  }

  const beforeState = JSON.parse(fix.beforeState) as Record<string, unknown>
  const changes = JSON.parse(fix.changes) as FixChanges

  // Create reverse changes
  const reverseChanges: FixChanges = {
    ...changes,
    updates: beforeState
  }

  const result = await applyFix(fix.connection, reverseChanges)

  if (result.success) {
    await db.fix.update({
      where: { id: fixId },
      data: {
        status: 'ROLLED_BACK',
        rolledBackAt: new Date(),
      }
    })

    await db.auditLog.create({
      data: {
        userId,
        connectionId: fix.connectionId,
        action: 'FIX_ROLLED_BACK',
        resource: 'fix',
        resourceId: fixId,
        details: JSON.stringify({
          description: fix.description,
          beforeState,
        })
      }
    })

    return { success: true }
  }

  return { success: false, error: result.error }
}
