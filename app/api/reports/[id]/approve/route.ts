import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { approveFix } from '@/lib/execution-modes'

/**
 * POST /api/reports/[id]/approve
 * Approve and execute pending fixes from a daily report
 * Can approve all fixes or specific ones
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const reportId = params.id

    // Get report
    const report = await db.dailyReport.findFirst({
      where: {
        id: reportId,
        userId: user.id,
      },
    })

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { fixIds, approveAll = false } = body

    // Parse pending approvals from report
    const pendingApproval = JSON.parse(report.pendingApproval)

    if (!Array.isArray(pendingApproval) || pendingApproval.length === 0) {
      return NextResponse.json(
        { error: 'No pending fixes to approve in this report' },
        { status: 400 }
      )
    }

    // Determine which fixes to approve
    let fixesToApprove = pendingApproval

    if (!approveAll && fixIds && Array.isArray(fixIds)) {
      // Filter to only requested fix IDs
      fixesToApprove = pendingApproval.filter((fix: { fixId: string }) =>
        fixIds.includes(fix.fixId)
      )

      if (fixesToApprove.length === 0) {
        return NextResponse.json(
          { error: 'No matching fixes found' },
          { status: 400 }
        )
      }
    }

    // Approve each fix using existing execution-modes logic
    const results: Array<{
      fixId: string
      description: string
      status: string
    }> = []
    const errors: Array<{
      fixId: string
      error: string
    }> = []

    for (const fix of fixesToApprove) {
      try {
        // Find the actual Fix record in database
        const fixRecord = await db.fix.findFirst({
          where: {
            id: fix.fixId,
            status: 'PENDING',
          },
        })

        if (!fixRecord) {
          errors.push({
            fixId: fix.fixId,
            error: 'Fix not found or already approved',
          })
          continue
        }

        // Use existing approveFix function
        const result = await approveFix(fix.fixId, user.id)

        if (result.success) {
          results.push({
            fixId: fix.fixId,
            description: fix.description,
            status: 'approved',
          })
        } else {
          errors.push({
            fixId: fix.fixId,
            error: result.message,
          })
        }
      } catch (error) {
        errors.push({
          fixId: fix.fixId,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    // Update report to remove approved fixes from pendingApproval
    const remainingPending = pendingApproval.filter(
      (fix: { fixId: string }) =>
        !results.some(r => r.fixId === fix.fixId)
    )

    await db.dailyReport.update({
      where: { id: reportId },
      data: {
        pendingApproval: JSON.stringify(remainingPending),
        issuesPending: remainingPending.length,
        issuesFixed: report.issuesFixed + results.length,
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'REPORT_FIXES_APPROVED',
        resource: 'daily_report',
        resourceId: reportId,
        details: JSON.stringify({
          approvedCount: results.length,
          errorCount: errors.length,
          fixIds: results.map(r => r.fixId),
        }),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Successfully approved ${results.length} fix(es)`,
      data: {
        approved: results,
        errors: errors.length > 0 ? errors : undefined,
        remainingPending: remainingPending.length,
      },
    })
  } catch (error) {
    console.error('Report approval error:', error)
    return NextResponse.json(
      {
        error: 'Failed to approve fixes',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
