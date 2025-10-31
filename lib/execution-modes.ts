import { db } from './db'
import { Platform, Issue, Fix } from '@prisma/client'
import { applyShopifyFix } from './shopify'
import { applyWordPressFix } from './wordpress'
import { notifyFixApplied, notifyFixFailed } from './notifications'

export type ExecutionMode = 'AUTOMATIC' | 'PLAN' | 'APPROVE'

export interface ExecutionContext {
  siteId: string
  userId: string
  mode: ExecutionMode
  issues: Issue[]
}

export interface FixPlan {
  issueId: string
  fixType: string
  description: string
  estimatedImpact: number
  risk: 'low' | 'medium' | 'high'
  beforeState: any
  afterState: any
}

export interface ExecutionResult {
  mode: ExecutionMode
  totalIssues: number
  fixesApplied: number
  fixesPending: number
  fixesFailed: number
  fixes: Fix[]
  planId?: string
}

/**
 * AUTOMATIC MODE
 * Applies all fixes immediately without asking for approval
 */
export async function executeAutomatic(context: ExecutionContext): Promise<ExecutionResult> {
  const { siteId, userId, issues } = context

  const fixes: Fix[] = []
  let fixesApplied = 0
  let fixesFailed = 0

  // Get site to determine platform
  const site = await db.site.findUnique({
    where: { id: siteId },
    include: { connection: true },
  })

  if (!site || !site.connection) {
    throw new Error('Site not found or connection missing')
  }

  // Process each issue
  for (const issue of issues) {
    try {
      // Generate fix plan
      const fixPlan = await generateFixForIssue(issue, site.connection.platform)

      if (!fixPlan) {
        console.log(`No fix available for issue ${issue.id}`)
        continue
      }

      // Create fix record
      const fix = await db.fix.create({
        data: {
          connectionId: site.connectionId,
          issueId: issue.id,
          type: fixPlan.fixType,
          targetUrl: issue.pageUrl,
          status: 'PENDING',
          beforeState: fixPlan.beforeState,
          afterState: fixPlan.afterState,
          method: 'AUTOMATIC',
        },
      })

      // Apply fix based on platform
      let result
      if (site.connection.platform === 'SHOPIFY') {
        result = await applyShopifyFix(fix.id)
      } else if (site.connection.platform === 'WORDPRESS') {
        result = await applyWordPressFix(site.connection, fix)
      } else {
        throw new Error(`Platform ${site.connection.platform} not supported`)
      }

      // Update fix status
      await db.fix.update({
        where: { id: fix.id },
        data: {
          status: result.success ? 'APPLIED' : 'FAILED',
          appliedAt: result.success ? new Date() : undefined,
          rollbackExpiresAt: result.success ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) : undefined, // 90 days
          error: result.success ? undefined : ('error' in result ? result.error || 'Fix failed' : 'Fix failed'),
        },
      })

      // Update issue status
      if (result.success) {
        await db.issue.update({
          where: { id: issue.id },
          data: { status: 'FIXED', fixedAt: new Date() },
        })
        fixesApplied++

        // Send success notification
        await notifyFixApplied(userId, fix.type, fix.id)
      } else {
        await db.issue.update({
          where: { id: issue.id },
          data: { status: 'FIX_FAILED' },
        })
        fixesFailed++

        // Send failure notification
        await notifyFixFailed(userId, fix.type, fix.id, 'error' in result ? result.error : undefined)
      }

      fixes.push(fix)

      // Create audit log
      await db.auditLog.create({
        data: {
          siteId: siteId,
          userId: userId,
          action: result.success ? 'FIX_APPLIED' : 'FIX_FAILED',
          resource: 'fix',
          resourceId: fix.id,
          details: {
            issueId: issue.id,
            fixId: fix.id,
            fixType: fix.type,
            mode: 'AUTOMATIC',
          },
        },
      })
    } catch (error) {
      console.error(`Error applying fix for issue ${issue.id}:`, error)
      fixesFailed++
    }
  }

  return {
    mode: 'AUTOMATIC',
    totalIssues: issues.length,
    fixesApplied,
    fixesPending: 0,
    fixesFailed,
    fixes,
  }
}

/**
 * PLAN MODE
 * Groups all fixes into a batch and asks for single approval
 */
export async function executePlan(context: ExecutionContext): Promise<ExecutionResult> {
  const { siteId, userId, issues } = context

  // Get site to determine platform
  const site = await db.site.findUnique({
    where: { id: siteId },
    include: { connection: true },
  })

  if (!site || !site.connection) {
    throw new Error('Site not found or connection missing')
  }

  const fixes: Fix[] = []

  // Generate fix plans for all issues
  for (const issue of issues) {
    const fixPlan = await generateFixForIssue(issue, site.connection.platform)

    if (!fixPlan) continue

    // Create fix record in PENDING status
    const fix = await db.fix.create({
      data: {
        connectionId: site.connectionId,
        issueId: issue.id,
        type: fixPlan.fixType,
        targetUrl: issue.pageUrl,
        status: 'PENDING',
        beforeState: fixPlan.beforeState,
        afterState: fixPlan.afterState,
        method: 'AUTOMATIC',
      },
    })

    fixes.push(fix)
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      siteId: siteId,
      userId: userId,
      action: 'FIX_PLAN_CREATED',
      resource: 'fix',
      resourceId: siteId,
      details: {
        fixCount: fixes.length,
        mode: 'PLAN',
      },
    },
  })

  return {
    mode: 'PLAN',
    totalIssues: issues.length,
    fixesApplied: 0,
    fixesPending: fixes.length,
    fixesFailed: 0,
    fixes,
    planId: siteId, // Can be used to approve all fixes later
  }
}

/**
 * APPROVE MODE
 * Creates fix for each issue but requires individual approval
 */
export async function executeApprove(context: ExecutionContext): Promise<ExecutionResult> {
  const { siteId, userId, issues } = context

  // Get site to determine platform
  const site = await db.site.findUnique({
    where: { id: siteId },
    include: { connection: true },
  })

  if (!site || !site.connection) {
    throw new Error('Site not found or connection missing')
  }

  const fixes: Fix[] = []

  // Generate fix plans for all issues
  for (const issue of issues) {
    const fixPlan = await generateFixForIssue(issue, site.connection.platform)

    if (!fixPlan) continue

    // Create fix record in PENDING_APPROVAL status
    const fix = await db.fix.create({
      data: {
        connectionId: site.connectionId,
        issueId: issue.id,
        type: fixPlan.fixType,
        targetUrl: issue.pageUrl,
        status: 'PENDING',
        beforeState: fixPlan.beforeState,
        afterState: fixPlan.afterState,
        method: 'AUTOMATIC',
      },
    })

    fixes.push(fix)
  }

  // Create audit log
  await db.auditLog.create({
    data: {
      siteId: siteId,
      userId: userId,
      action: 'FIX_APPROVAL_REQUIRED',
      resource: 'fix',
      resourceId: siteId,
      details: {
        fixCount: fixes.length,
        mode: 'APPROVE',
      },
    },
  })

  return {
    mode: 'APPROVE',
    totalIssues: issues.length,
    fixesApplied: 0,
    fixesPending: fixes.length,
    fixesFailed: 0,
    fixes,
  }
}

/**
 * Execute fixes based on the site's configured execution mode
 */
export async function executeFixes(siteId: string, userId: string, issueIds?: string[]): Promise<ExecutionResult> {
  // Get site and user to determine execution mode
  const site = await db.site.findUnique({
    where: { id: siteId },
  })

  if (!site) {
    throw new Error('Site not found')
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get issues to fix
  const issues = await db.issue.findMany({
    where: {
      siteId: siteId,
      status: 'DETECTED',
      ...(issueIds ? { id: { in: issueIds } } : {}),
    },
  })

  const executionMode = user.executionMode as ExecutionMode

  const context: ExecutionContext = {
    siteId,
    userId,
    mode: executionMode,
    issues,
  }

  switch (executionMode) {
    case 'AUTOMATIC':
      return executeAutomatic(context)
    case 'PLAN':
      return executePlan(context)
    case 'APPROVE':
      return executeApprove(context)
    default:
      throw new Error(`Unknown execution mode: ${executionMode}`)
  }
}

/**
 * Approve a single fix (for APPROVE mode)
 */
export async function approveFix(fixId: string, userId: string): Promise<{ success: boolean; error?: string }> {
  const fix = await db.fix.findUnique({
    where: { id: fixId },
    include: {
      issue: {
        include: {
          site: {
            include: { connection: true },
          },
        },
      },
    },
  })

  if (!fix) {
    return { success: false, error: 'Fix not found' }
  }

  if (fix.status !== 'PENDING') {
    return { success: false, error: 'Fix is not pending approval' }
  }

  if (!fix.issue) {
    return { success: false, error: 'Fix has no associated issue' }
  }

  const site = fix.issue.site

  if (!site || !site.connection) {
    return { success: false, error: 'Site or connection not found' }
  }

  // Update fix status to PENDING (applying)
  await db.fix.update({
    where: { id: fixId },
    data: { status: 'PENDING' },
  })

  try {
    // Apply fix based on platform
    let result
    if (site.connection.platform === 'SHOPIFY') {
      result = await applyShopifyFix(fixId)
    } else if (site.connection.platform === 'WORDPRESS') {
      result = await applyWordPressFix(site.connection, fix)
    } else {
      throw new Error(`Platform ${site.connection.platform} not supported`)
    }

    // Update fix status
    await db.fix.update({
      where: { id: fixId },
      data: {
        status: result.success ? 'APPLIED' : 'FAILED',
        appliedAt: result.success ? new Date() : undefined,
        rollbackExpiresAt: result.success ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) : undefined,
        error: result.success ? undefined : ('error' in result ? result.error || 'Fix failed' : 'Fix failed'),
      },
    })

    // Update issue status
    if (result.success) {
      await db.issue.update({
        where: { id: fix.issue.id },
        data: { status: 'FIXED', fixedAt: new Date() },
      })

      // Send success notification
      await notifyFixApplied(userId, fix.type, fixId)
    } else {
      await db.issue.update({
        where: { id: fix.issue.id },
        data: { status: 'FIX_FAILED' },
      })

      // Send failure notification
      await notifyFixFailed(userId, fix.type, fixId, 'error' in result ? result.error : undefined)
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        siteId: site.id,
        userId: userId,
        action: result.success ? 'FIX_APPROVED_AND_APPLIED' : 'FIX_FAILED',
        resource: 'fix',
        resourceId: fixId,
        details: {
          fixId: fixId,
          issueId: fix.issue.id,
        },
      },
    })

    return result
  } catch (error) {
    await db.fix.update({
      where: { id: fixId },
      data: {
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Approve all fixes in a plan (for PLAN mode)
 */
export async function approvePlan(siteId: string, userId: string): Promise<ExecutionResult> {
  // Get all pending fixes for the site
  const fixes = await db.fix.findMany({
    where: {
      status: 'PENDING',
      issue: {
        siteId: siteId,
      },
    },
    include: {
      issue: {
        include: {
          site: {
            include: { connection: true },
          },
        },
      },
    },
  })

  let fixesApplied = 0
  let fixesFailed = 0

  for (const fix of fixes) {
    const result = await approveFix(fix.id, userId)
    if (result.success) {
      fixesApplied++
    } else {
      fixesFailed++
    }
  }

  return {
    mode: 'PLAN',
    totalIssues: fixes.length,
    fixesApplied,
    fixesPending: 0,
    fixesFailed,
    fixes,
  }
}

/**
 * Generate a fix plan for a specific issue
 */
async function generateFixForIssue(issue: Issue, platform: Platform): Promise<FixPlan | null> {
  // Map issue types to fix types and generate fix plans
  switch (issue.type) {
    case 'MISSING_TITLE':
    case 'TITLE_TOO_SHORT':
    case 'TITLE_TOO_LONG':
      return {
        issueId: issue.id,
        fixType: 'UPDATE_META_TITLE',
        description: 'Update page title to be 50-60 characters with target keywords',
        estimatedImpact: 85,
        risk: 'low',
        beforeState: { title: '' },
        afterState: { title: '[AI-generated title based on content]' },
      }

    case 'MISSING_META_DESCRIPTION':
    case 'META_DESCRIPTION_TOO_SHORT':
    case 'META_DESCRIPTION_TOO_LONG':
      return {
        issueId: issue.id,
        fixType: 'UPDATE_META_DESCRIPTION',
        description: 'Update meta description to be 150-160 characters and compelling',
        estimatedImpact: 75,
        risk: 'low',
        beforeState: { metaDescription: '' },
        afterState: { metaDescription: '[AI-generated description]' },
      }

    case 'MISSING_H1':
    case 'MULTIPLE_H1':
      return {
        issueId: issue.id,
        fixType: 'UPDATE_H1',
        description: 'Ensure page has exactly one H1 tag with clear content description',
        estimatedImpact: 80,
        risk: 'medium',
        beforeState: { h1Count: 0 },
        afterState: { h1Count: 1, h1Text: '[AI-generated H1]' },
      }

    case 'IMAGES_MISSING_ALT':
      return {
        issueId: issue.id,
        fixType: 'ADD_IMAGE_ALT_TEXT',
        description: 'Add descriptive alt text to images',
        estimatedImpact: 70,
        risk: 'low',
        beforeState: { imagesWithoutAlt: [] },
        afterState: { imagesWithAlt: [] },
      }

    case 'BROKEN_LINKS':
      return {
        issueId: issue.id,
        fixType: 'FIX_BROKEN_LINKS',
        description: 'Fix or remove broken links',
        estimatedImpact: 75,
        risk: 'medium',
        beforeState: { brokenLinks: [] },
        afterState: { fixedLinks: [] },
      }

    case 'MISSING_STRUCTURED_DATA':
      return {
        issueId: issue.id,
        fixType: 'ADD_STRUCTURED_DATA',
        description: 'Add schema.org structured data markup',
        estimatedImpact: 65,
        risk: 'low',
        beforeState: { hasSchema: false },
        afterState: { hasSchema: true, schemaType: 'Product/Article/Organization' },
      }

    case 'MISSING_OPEN_GRAPH':
      return {
        issueId: issue.id,
        fixType: 'ADD_OPEN_GRAPH_TAGS',
        description: 'Add Open Graph meta tags for social sharing',
        estimatedImpact: 60,
        risk: 'low',
        beforeState: { openGraph: {} },
        afterState: { openGraph: { title: '', description: '', image: '', url: '' } },
      }

    case 'MISSING_CANONICAL':
      return {
        issueId: issue.id,
        fixType: 'ADD_CANONICAL_TAG',
        description: 'Add canonical URL to prevent duplicate content',
        estimatedImpact: 70,
        risk: 'low',
        beforeState: { canonical: null },
        afterState: { canonical: issue.pageUrl },
      }

    default:
      // Issue type not yet supported for automatic fixing
      return null
  }
}
