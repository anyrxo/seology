/**
 * API Route: Create Fixes from Audit Results
 *
 * POST /api/shopify/fixes/create
 *
 * Creates fix records in database from audit issues
 * Handles all 3 execution modes: AUTOMATIC, PLAN, APPROVE
 */

import { NextRequest, NextResponse } from 'next/server'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'
import { createFixesFromAudit, type SEOIssue, applyFixById } from '@/lib/shopify-fix-engine'
import { db } from '@/lib/db'
import { canApplyFixes, trackFixUsage } from '@/lib/usage-enforcement'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const authResult = await withShopifyAuth(req)

    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const body = await req.json()
    const { issues, executionMode } = body as {
      issues: SEOIssue[]
      executionMode?: 'AUTOMATIC' | 'PLAN' | 'APPROVE'
    }

    if (!issues || !Array.isArray(issues) || issues.length === 0) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_ISSUES', message: 'Issues array is required' } },
        { status: 400 }
      )
    }

    // Get user's default execution mode if not provided
    let mode = executionMode
    if (!mode) {
      const user = await db.user.findUnique({
        where: { id: context.userId },
        select: { executionMode: true }
      })
      mode = (user?.executionMode || 'APPROVE') as 'AUTOMATIC' | 'PLAN' | 'APPROVE'
    }

    console.log(`[Create Fixes] Creating ${issues.length} fixes in ${mode} mode for user ${context.userId}`)

    // Create fix records
    const result = await createFixesFromAudit(
      context.connection.id,
      context.userId,
      issues,
      mode
    )

    // For AUTOMATIC mode, apply fixes immediately
    if (mode === 'AUTOMATIC') {
      // Check usage limits before applying
      const usageCheck = await canApplyFixes(context.userId, result.fixIds.length)

      if (!usageCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'USAGE_LIMIT_EXCEEDED',
              message: usageCheck.error,
              details: {
                used: usageCheck.current,
                limit: usageCheck.limit,
                remaining: usageCheck.remaining,
              }
            }
          },
          { status: 403 }
        )
      }

      const appliedResults = await Promise.all(
        result.fixIds.map(fixId => applyFixById(fixId, context.userId))
      )

      const successCount = appliedResults.filter(r => r.success).length
      const failedCount = appliedResults.filter(r => !r.success).length

      // Track successful fixes
      if (successCount > 0) {
        await trackFixUsage(context.userId, successCount)
      }

      return NextResponse.json({
        success: true,
        data: {
          mode: 'AUTOMATIC',
          totalFixes: result.fixIds.length,
          appliedCount: successCount,
          failedCount,
          fixIds: result.fixIds,
          message: `Automatically applied ${successCount} fixes`
        }
      })
    }

    // For PLAN mode, return plan ID
    if (mode === 'PLAN' && result.planId) {
      return NextResponse.json({
        success: true,
        data: {
          mode: 'PLAN',
          planId: result.planId,
          totalFixes: result.fixIds.length,
          fixIds: result.fixIds,
          message: `Created plan with ${result.fixIds.length} fixes pending approval`
        }
      })
    }

    // For APPROVE mode, return fix IDs for individual approval
    return NextResponse.json({
      success: true,
      data: {
        mode: 'APPROVE',
        totalFixes: result.fixIds.length,
        fixIds: result.fixIds,
        message: `Created ${result.fixIds.length} fixes pending individual approval`
      }
    })
  } catch (error) {
    console.error('[Create Fixes] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CREATE_FIXES_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error creating fixes'
        }
      },
      { status: 500 }
    )
  }
}
