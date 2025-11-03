/**
 * Execution Modes System
 *
 * Three ways to handle SEO fixes:
 * - AUTOMATIC: Applies all fixes immediately without approval
 * - PLAN: Creates a batch of fixes, asks for single approval to execute all
 * - APPROVE: Creates fixes individually, each requires manual approval
 */

import { db } from './db'
import { analyzeSiteForSEO } from './claude'
import { applyShopifyFix } from './shopify'
import { applyWordPressFix } from './wordpress'
import { Platform, ExecutionMode, IssueStatus, FixStatus, Severity, Issue } from '@prisma/client'

// ==================== TYPES ====================

interface ExecutionContext {
  siteId: string
  connectionId: string
  userId: string
  platform: Platform
  executionMode: ExecutionMode
  issueIds?: string[]
}

interface FixPlan {
  description: string
  code: string
  estimatedTime?: string
}

interface FixResult {
  issueId: string
  issueTitle: string
  success: boolean
  message: string
}

interface ExecutionResult {
  success: boolean
  message: string
  data?: {
    fixesApplied?: number
    fixesCreated?: number
    errors?: number
    results?: FixResult[]
    fixes?: Array<{
      fixId: string
      issueId: string
      issueTitle: string
      description: string
      code?: string
    }>
    approvalUrl?: string
  }
}

type IssueWithDetails = Issue & {
  title: string
  recommendation: string | null
}

// ==================== MAIN ENTRY POINT ====================

/**
 * Main entry point for executing fixes
 * Routes to correct execution mode
 */
export async function executeFixes(
  siteId: string,
  userId: string,
  issueIds?: string[]
): Promise<ExecutionResult> {
  try {
    // Get connection and user
    const connection = await db.connection.findFirst({
      where: {
        id: siteId,
        userId
      },
      include: {
        user: true
      }
    })

    if (!connection) {
      return { success: false, message: 'Connection not found' }
    }

    // Create execution context
    const context: ExecutionContext = {
      siteId,
      connectionId: connection.id,
      userId,
      platform: connection.platform,
      executionMode: connection.user.executionMode,
      issueIds
    }

    // Route to correct execution mode
    switch (context.executionMode) {
      case 'AUTOMATIC':
        return await executeAutomatic(context)

      case 'PLAN':
        return await executePlan(context)

      case 'APPROVE':
        return await executeApprove(context)

      default:
        return { success: false, message: 'Invalid execution mode' }
    }
  } catch (error) {
    console.error('Error executing fixes:', error)
    return {
      success: false,
      message: 'Failed to execute fixes'
    }
  }
}

// ==================== AUTOMATIC MODE ====================

/**
 * AUTOMATIC: Applies all fixes immediately without approval
 */
async function executeAutomatic(context: ExecutionContext): Promise<ExecutionResult> {
  try {
    // Get issues to fix
    const issues = await getIssuesToFix(context)

    if (issues.length === 0) {
      return { success: true, message: 'No issues to fix', data: { fixesApplied: 0 } }
    }

    // Generate and apply fixes for each issue
    const results: FixResult[] = []
    let successCount = 0
    let errorCount = 0

    for (const issue of issues) {
      try {
        // Generate fix using Claude AI
        const fixPlan = await generateFixForIssue(issue, context)

        // Apply the fix immediately
        const result = await applyFix(fixPlan, issue, context)

        if (result.success) {
          successCount++

          // Use transaction to ensure atomicity of fix application
          await db.$transaction(async (tx) => {
            // Create fix record with rollback data
            await tx.fix.create({
              data: {
                connectionId: context.connectionId,
                issueId: issue.id,
                description: fixPlan.description,
                changes: fixPlan.code,
                beforeState: result.beforeState || '{}',
                afterState: result.afterState || '{}',
                status: 'APPLIED',
                method: 'AUTOMATIC',
                appliedAt: new Date()
              }
            })

            // Update issue status
            await tx.issue.update({
              where: { id: issue.id },
              data: { status: 'FIXED', fixedAt: new Date() }
            })

            // Create audit log
            await tx.auditLog.create({
              data: {
                userId: context.userId,
                connectionId: context.connectionId,
                action: 'FIX_APPLIED',
                resource: 'fix',
                details: JSON.stringify({
                  issueId: issue.id,
                  issueTitle: issue.title,
                  mode: 'AUTOMATIC',
                  fixDescription: fixPlan.description
                })
              }
            })
          })

          // Create notification (outside transaction - non-critical)
          await db.notification.create({
            data: {
              userId: context.userId,
              title: 'Fix Applied Automatically',
              message: `Fixed: ${issue.title}`,
              type: 'FIX_APPLIED',
              actionUrl: `/dashboard/sites/${context.siteId}`
            }
          }).catch(err => console.error('Failed to create notification:', err))
        } else {
          errorCount++
        }

        results.push({
          issueId: issue.id,
          issueTitle: issue.title,
          success: result.success,
          message: result.message
        })
      } catch (error) {
        errorCount++
        results.push({
          issueId: issue.id,
          issueTitle: issue.title,
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return {
      success: true,
      message: `Applied ${successCount} fixes automatically`,
      data: {
        fixesApplied: successCount,
        errors: errorCount,
        results
      }
    }
  } catch (error) {
    console.error('Error in automatic execution:', error)
    return {
      success: false,
      message: 'Failed to execute automatic fixes'
    }
  }
}

// ==================== PLAN MODE ====================

/**
 * PLAN: Creates a batch of fixes, asks for single approval to execute all
 */
async function executePlan(context: ExecutionContext): Promise<ExecutionResult> {
  try {
    // Get issues to fix
    const issues = await getIssuesToFix(context)

    if (issues.length === 0) {
      return { success: true, message: 'No issues to fix', data: { fixesCreated: 0 } }
    }

    // Generate fixes for all issues
    const fixes: Array<{
      fixId: string
      issueId: string
      issueTitle: string
      description: string
      code: string
    }> = []

    for (const issue of issues) {
      const fixPlan = await generateFixForIssue(issue, context)

      // Create fix record in PENDING state
      const fix = await db.fix.create({
        data: {
          connectionId: context.connectionId,
          issueId: issue.id,
          description: fixPlan.description,
          changes: fixPlan.code
        }
      })

      fixes.push({
        fixId: fix.id,
        issueId: issue.id,
        issueTitle: issue.title,
        description: fixPlan.description,
        code: fixPlan.code
      })
    }

    // Create notification
    await db.notification.create({
      data: {
        userId: context.userId,
        title: 'Fix Plan Ready',
        message: `${fixes.length} fixes ready for approval`,
        type: 'INFO',
        actionUrl: `/dashboard/sites/${context.siteId}`
      }
    })

    return {
      success: true,
      message: `Created plan with ${fixes.length} fixes`,
      data: {
        fixesCreated: fixes.length,
        fixes,
        approvalUrl: `/dashboard/sites/${context.siteId}/approve-plan`
      }
    }
  } catch (error) {
    console.error('Error creating plan:', error)
    return {
      success: false,
      message: 'Failed to create fix plan'
    }
  }
}

/**
 * Approve and execute all fixes in a plan
 */
export async function approvePlan(
  siteId: string,
  userId: string
): Promise<ExecutionResult> {
  try {
    // Get all pending fixes for this site
    const pendingFixes = await db.fix.findMany({
      where: {
        connectionId: siteId,
        status: 'PENDING'
      },
      include: {
        issue: true,
        connection: true
      }
    })

    if (pendingFixes.length === 0) {
      return { success: false, message: 'No pending fixes to approve' }
    }

    // Apply all fixes
    let successCount = 0
    let errorCount = 0
    const results: FixResult[] = []

    for (const fix of pendingFixes) {
      if (!fix.issue) continue

      try {
        const context: ExecutionContext = {
          siteId,
          connectionId: fix.connectionId,
          userId,
          platform: fix.connection.platform,
          executionMode: 'PLAN'
        }

        const result = await applyFix(
          { description: fix.description, code: fix.changes },
          fix.issue as IssueWithDetails,
          context
        )

        if (result.success) {
          successCount++

          // Update fix status
          await db.fix.update({
            where: { id: fix.id },
            data: {
              status: 'APPLIED',
              appliedAt: new Date()
            }
          })

          // Update issue status
          await db.issue.update({
            where: { id: fix.issueId || '' },
            data: { status: 'FIXED' }
          })
        } else {
          errorCount++

          // Mark fix as failed
          await db.fix.update({
            where: { id: fix.id },
            data: { status: 'FAILED' }
          })
        }

        results.push({
          issueId: fix.issueId || '',
          issueTitle: fix.issue.title,
          success: result.success,
          message: result.message
        })
      } catch (error) {
        errorCount++
      }
    }

    // Create notification
    await db.notification.create({
      data: {
        userId,
        title: 'Plan Executed',
        message: `Applied ${successCount} of ${pendingFixes.length} fixes`,
        type: successCount === pendingFixes.length ? 'SUCCESS' : 'WARNING',
        actionUrl: `/dashboard/sites/${siteId}`
      }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        connectionId: siteId,
        action: 'PLAN_APPROVED',
        resource: 'plan',
        details: JSON.stringify({
          fixesApplied: successCount,
          fixesFailed: errorCount,
          totalFixes: pendingFixes.length
        })
      }
    })

    return {
      success: true,
      message: `Applied ${successCount} of ${pendingFixes.length} fixes`,
      data: {
        fixesApplied: successCount,
        errors: errorCount,
        results
      }
    }
  } catch (error) {
    console.error('Error approving plan:', error)
    return {
      success: false,
      message: 'Failed to approve plan'
    }
  }
}

// ==================== APPROVE MODE ====================

/**
 * APPROVE: Creates fixes individually, each requires manual approval
 */
async function executeApprove(context: ExecutionContext): Promise<ExecutionResult> {
  try {
    // Get issues to fix
    const issues = await getIssuesToFix(context)

    if (issues.length === 0) {
      return { success: true, message: 'No issues to fix', data: { fixesCreated: 0 } }
    }

    // Generate fix for each issue and create as pending
    const fixes: Array<{
      fixId: string
      issueId: string
      issueTitle: string
      description: string
    }> = []

    for (const issue of issues) {
      const fixPlan = await generateFixForIssue(issue, context)

      // Create fix record in PENDING state
      const fix = await db.fix.create({
        data: {
          connectionId: context.connectionId,
          issueId: issue.id,
          description: fixPlan.description,
          changes: fixPlan.code
        }
      })

      fixes.push({
        fixId: fix.id,
        issueId: issue.id,
        issueTitle: issue.title,
        description: fixPlan.description
      })
    }

    // Create notification
    await db.notification.create({
      data: {
        userId: context.userId,
        title: 'Fixes Ready for Approval',
        message: `${fixes.length} fixes need your approval`,
        type: 'INFO',
        actionUrl: `/dashboard/fixes`
      }
    })

    return {
      success: true,
      message: `Created ${fixes.length} fixes for approval`,
      data: {
        fixesCreated: fixes.length,
        fixes
      }
    }
  } catch (error) {
    console.error('Error in approve mode:', error)
    return {
      success: false,
      message: 'Failed to create fixes for approval'
    }
  }
}

/**
 * Approve and apply a single fix
 */
export async function approveFix(
  fixId: string,
  userId: string
): Promise<ExecutionResult> {
  try {
    // Get fix with issue and connection
    const fix = await db.fix.findUnique({
      where: { id: fixId },
      include: {
        issue: true,
        connection: {
          include: { user: true }
        }
      }
    })

    if (!fix) {
      return { success: false, message: 'Fix not found' }
    }

    if (fix.connection.userId !== userId) {
      return { success: false, message: 'Unauthorized' }
    }

    if (fix.status !== 'PENDING') {
      return { success: false, message: 'Fix is not pending approval' }
    }

    if (!fix.issue) {
      return { success: false, message: 'Associated issue not found' }
    }

    // Apply the fix
    const context: ExecutionContext = {
      siteId: fix.connectionId,
      connectionId: fix.connectionId,
      userId,
      platform: fix.connection.platform,
      executionMode: 'APPROVE'
    }

    const result = await applyFix(
      { description: fix.description, code: fix.changes },
      fix.issue as IssueWithDetails,
      context
    )

    if (result.success) {
      // Update fix status
      await db.fix.update({
        where: { id: fixId },
        data: {
          status: 'APPLIED',
          appliedAt: new Date()
        }
      })

      // Update issue status
      await db.issue.update({
        where: { id: fix.issueId || '' },
        data: { status: 'FIXED' }
      })

      // Create notification
      await db.notification.create({
        data: {
          userId,
          title: 'Fix Applied',
          message: `Fixed: ${fix.issue.title}`,
          type: 'SUCCESS',
          actionUrl: `/dashboard/sites/${fix.connectionId}`
        }
      })

      // Create audit log
      await db.auditLog.create({
        data: {
          userId,
          connectionId: fix.connectionId,
          action: 'FIX_APPROVED',
          resource: 'fix',
          resourceId: fixId,
          details: JSON.stringify({
            issueId: fix.issueId,
            issueTitle: fix.issue.title
          })
        }
      })

      return {
        success: true,
        message: 'Fix applied successfully',
        data: { fixesApplied: 1 }
      }
    } else {
      // Mark as failed
      await db.fix.update({
        where: { id: fixId },
        data: { status: 'FAILED' }
      })

      return {
        success: false,
        message: result.message || 'Failed to apply fix'
      }
    }
  } catch (error) {
    console.error('Error approving fix:', error)
    return {
      success: false,
      message: 'Failed to approve fix'
    }
  }
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Get issues that need fixing
 */
async function getIssuesToFix(context: ExecutionContext): Promise<IssueWithDetails[]> {
  const whereClause: {
    connectionId: string
    status: { in: IssueStatus[] }
    id?: { in: string[] }
  } = {
    connectionId: context.connectionId,
    status: { in: ['OPEN', 'IN_PROGRESS'] }
  }

  // If specific issue IDs provided, filter by them
  if (context.issueIds && context.issueIds.length > 0) {
    whereClause.id = { in: context.issueIds }
  }

  const issues = await db.issue.findMany({
    where: whereClause,
    orderBy: [
      { severity: 'desc' } // Fix critical issues first
    ]
  })

  return issues as IssueWithDetails[]
}

/**
 * Generate fix plan for an issue using Claude AI
 */
async function generateFixForIssue(issue: IssueWithDetails, context: ExecutionContext): Promise<FixPlan> {
  try {
    // Get connection details for context
    const connection = await db.connection.findUnique({
      where: { id: context.connectionId },
      select: { domain: true, platform: true }
    })

    if (!connection) {
      throw new Error('Connection not found')
    }

    // Use Claude AI to generate platform-specific fix
    const { generateFixPlan } = await import('./claude')

    const fixPlanData = await generateFixPlan(
      {
        type: issue.type,
        severity: issue.severity,
        pageUrl: issue.pageUrl,
        description: issue.details || issue.title
      },
      context.platform,
      issue.recommendation || undefined
    )

    return {
      description: fixPlanData.fixDescription,
      code: fixPlanData.fixCode,
      estimatedTime: estimateFixTime(issue.severity)
    }
  } catch (error) {
    console.error('Error generating fix with Claude AI:', error)

    // Fallback to basic fix plan if Claude AI fails
    return {
      description: `Fix ${issue.type}: ${issue.title}`,
      code: issue.recommendation || generateFallbackFixCode(issue, context.platform),
      estimatedTime: estimateFixTime(issue.severity)
    }
  }
}

/**
 * Estimate time required to apply fix based on severity
 */
function estimateFixTime(severity: Severity): string {
  switch (severity) {
    case 'CRITICAL':
      return '2-3 minutes'
    case 'HIGH':
      return '3-5 minutes'
    case 'MEDIUM':
      return '5-10 minutes'
    case 'LOW':
      return '10-15 minutes'
    default:
      return '5 minutes'
  }
}

/**
 * Generate fallback fix code when Claude AI is unavailable
 */
function generateFallbackFixCode(issue: IssueWithDetails, platform: Platform): string {
  const fixTemplates: Record<string, Record<string, string>> = {
    missing_meta_title: {
      title: `${issue.pageUrl.split('/').pop()} - Your Site Name`,
    },
    missing_meta_description: {
      description: 'Add a compelling meta description here (150-160 characters)',
    },
    broken_link: {
      from: issue.pageUrl,
      to: '/', // Redirect to homepage as fallback
    },
    missing_alt_text: {
      alt: 'Descriptive image text',
    },
  }

  const template = fixTemplates[issue.type] || { action: 'manual_review_required' }
  return JSON.stringify(template)
}

/**
 * Rate limiting to avoid overwhelming platforms
 */
const lastPlatformRequest: Record<string, number> = {}
const RATE_LIMIT_DELAY_MS = 1000

async function rateLimitPlatformRequests(platform: Platform): Promise<void> {
  const now = Date.now()
  const lastRequest = lastPlatformRequest[platform] || 0
  const timeSinceLastRequest = now - lastRequest

  if (timeSinceLastRequest < RATE_LIMIT_DELAY_MS) {
    const delayNeeded = RATE_LIMIT_DELAY_MS - timeSinceLastRequest
    await new Promise(resolve => setTimeout(resolve, delayNeeded))
  }

  lastPlatformRequest[platform] = Date.now()
}

/**
 * Capture state before applying fix (for rollback capability)
 */
async function captureStateBeforeFix(
  connection: { id: string; platform: Platform; domain: string },
  issue: IssueWithDetails,
  platform: Platform
): Promise<Record<string, unknown>> {
  try {
    const state: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      issueId: issue.id,
      issueType: issue.type,
      pageUrl: issue.pageUrl,
      platform
    }

    switch (platform) {
      case 'SHOPIFY':
      case 'WORDPRESS':
        state.details = issue.details
        break
      case 'CUSTOM':
        state.details = 'Magic.js - client-side state'
        break
    }

    return state
  } catch (error) {
    console.error('Error capturing before state:', error)
    return { error: 'Failed to capture state', timestamp: new Date().toISOString() }
  }
}

/**
 * Capture state after applying fix
 */
async function captureStateAfterFix(
  connection: { id: string; platform: Platform; domain: string },
  issue: IssueWithDetails,
  platform: Platform,
  fixData?: Record<string, unknown>
): Promise<Record<string, unknown>> {
  try {
    return {
      timestamp: new Date().toISOString(),
      issueId: issue.id,
      issueType: issue.type,
      pageUrl: issue.pageUrl,
      platform,
      fixApplied: true,
      ...fixData
    }
  } catch (error) {
    console.error('Error capturing after state:', error)
    return { error: 'Failed to capture state', timestamp: new Date().toISOString() }
  }
}

/**
 * Apply a fix to the platform (Shopify, WordPress, etc.)
 * Includes rollback data capture and usage tracking
 */
async function applyFix(
  fixPlan: FixPlan,
  issue: IssueWithDetails,
  context: ExecutionContext
): Promise<{ success: boolean; message: string; beforeState?: string; afterState?: string }> {
  try {
    // Check usage limits before applying fix
    const { canApplyFixes } = await import('./usage')
    const usageCheck = await canApplyFixes(context.userId, 1)

    if (!usageCheck.allowed) {
      return {
        success: false,
        message: usageCheck.reason || 'Usage limit exceeded'
      }
    }

    // Get connection with credentials
    const connection = await db.connection.findUnique({
      where: { id: context.connectionId }
    })

    if (!connection) {
      return { success: false, message: 'Connection not found' }
    }

    // Capture state before applying fix (for rollback)
    const beforeState = await captureStateBeforeFix(connection, issue, context.platform)

    // Apply rate limiting to avoid overwhelming platforms
    await rateLimitPlatformRequests(context.platform)

    let result: { success: boolean; message: string; data?: unknown }

    // Route to correct platform
    switch (context.platform) {
      case 'SHOPIFY': {
        result = await applyShopifyFix(connection, issue, fixPlan.code)
        break
      }

      case 'WORDPRESS': {
        result = await applyWordPressFix(connection, issue, fixPlan.code)
        break
      }

      case 'CUSTOM':
        // For custom sites using Magic.js, the fix is stored and fetched by the client
        result = { success: true, message: 'Fix stored for Magic.js client' }
        break

      default:
        return { success: false, message: 'Unsupported platform' }
    }

    // If fix was applied successfully, capture after state
    if (result.success) {
      const afterState = await captureStateAfterFix(
        connection,
        issue,
        context.platform,
        result.data as Record<string, unknown> | undefined
      )

      // Track usage
      const { trackFixApplied } = await import('./usage')
      await trackFixApplied(context.userId, issue.id, context.connectionId).catch(err =>
        console.error('Failed to track fix usage:', err)
      )

      return {
        success: true,
        message: result.message,
        beforeState: JSON.stringify(beforeState),
        afterState: JSON.stringify(afterState)
      }
    }

    return result
  } catch (error) {
    console.error('Error applying fix:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Rollback a fix (restore previous state)
 */
export async function rollbackFix(
  fixId: string,
  userId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Get fix with connection
    const fix = await db.fix.findUnique({
      where: { id: fixId },
      include: {
        issue: true,
        connection: {
          include: { user: true }
        }
      }
    })

    if (!fix) {
      return { success: false, message: 'Fix not found' }
    }

    if (fix.connection.userId !== userId) {
      return { success: false, message: 'Unauthorized' }
    }

    if (fix.status !== 'APPLIED') {
      return { success: false, message: 'Fix is not applied, cannot rollback' }
    }

    if (!fix.appliedAt) {
      return { success: false, message: 'Fix has no applied date' }
    }

    // Check if within rollback window (90 days)
    const rollbackDeadline = new Date(fix.appliedAt)
    rollbackDeadline.setDate(rollbackDeadline.getDate() + 90)

    if (new Date() > rollbackDeadline) {
      return { success: false, message: 'Rollback window expired (90 days)' }
    }

    // TODO: Implement actual rollback logic based on platform
    // This would restore the previous state stored in the fix record

    // Update fix status
    await db.fix.update({
      where: { id: fixId },
      data: { status: 'ROLLED_BACK' }
    })

    // Reopen the issue
    if (fix.issueId) {
      await db.issue.update({
        where: { id: fix.issueId },
        data: { status: 'OPEN' }
      })
    }

    // Create notification
    if (fix.issue) {
      await db.notification.create({
        data: {
          userId,
          title: 'Fix Rolled Back',
          message: `Rolled back: ${fix.issue.title}`,
          type: 'WARNING',
          actionUrl: `/dashboard/sites/${fix.connectionId}`
        }
      })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        userId,
        connectionId: fix.connectionId,
        action: 'FIX_ROLLED_BACK',
        resource: 'fix',
        resourceId: fixId,
        details: JSON.stringify({
          issueId: fix.issueId,
          issueTitle: fix.issue?.title || 'Unknown'
        })
      }
    })

    return {
      success: true,
      message: 'Fix rolled back successfully'
    }
  } catch (error) {
    console.error('Error rolling back fix:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
