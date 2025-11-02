/**
 * Magic.js API: Report Fix Status
 * Client reports back whether fix was successfully applied
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { siteId: string; fixId: string } }
) {
  const { siteId, fixId } = params

  try {
    const body = await req.json()
    const { success, error, userAgent, url } = body

    // Update fix status
    const updateData: {
      status: 'APPLIED' | 'FAILED'
      appliedAt?: Date
      afterState?: string
    } = {
      status: success ? 'APPLIED' : 'FAILED',
    }

    if (success) {
      updateData.appliedAt = new Date()
    }

    // Store error in afterState if failed
    if (error) {
      updateData.afterState = JSON.stringify({ error, userAgent, url })
    }

    await db.fix.update({
      where: {
        id: fixId,
        connectionId: siteId,
      },
      data: updateData,
    })

    // If successful, mark issue as fixed
    if (success) {
      const fix = await db.fix.findUnique({
        where: { id: fixId },
        select: { issueId: true },
      })

      if (fix?.issueId) {
        await db.issue.update({
          where: { id: fix.issueId },
          data: { status: 'FIXED' },
        })
      }
    }

    // Get connection to find userId for audit log
    const connection = await db.connection.findUnique({
      where: { id: siteId },
      select: { userId: true },
    })

    // Create audit log if we have a connection
    if (connection) {
      await db.auditLog.create({
        data: {
          userId: connection.userId,
          connectionId: siteId,
          action: success ? 'MAGIC_FIX_APPLIED' : 'MAGIC_FIX_FAILED',
          resource: 'fix',
          resourceId: fixId,
          details: JSON.stringify({
            userAgent,
            url,
            error,
          }),
          userAgent,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Fix status updated',
    })
  } catch (error) {
    console.error('Error updating fix status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update fix status',
      },
      { status: 500 }
    )
  }
}
