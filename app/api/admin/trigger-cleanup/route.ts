import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin, getAdminUser } from '@/lib/admin'

/**
 * POST /api/admin/trigger-cleanup
 * Manually trigger cleanup jobs
 * Admin only
 */
export async function POST() {
  try {
    // Verify admin access
    const admin = await getAdminUser()

    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)

    // Delete expired rollback data
    const deletedFixes = await db.fix.deleteMany({
      where: {
        rollbackExpiresAt: {
          lt: new Date()
        }
      }
    })

    // Delete old audit logs (keep last 6 months)
    const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
    const deletedAudits = await db.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: sixMonthsAgo
        }
      }
    })

    // Create audit log for cleanup
    await db.auditLog.create({
      data: {
        userId: admin?.id || 'admin',
        action: 'admin_cleanup_triggered',
        resource: 'system',
        resourceId: 'cleanup',
        details: {
          deletedFixes: deletedFixes.count,
          deletedAudits: deletedAudits.count,
          adminEmail: admin?.emailAddresses?.[0]?.emailAddress
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        deletedFixes: deletedFixes.count,
        deletedAudits: deletedAudits.count
      }
    })
  } catch (error) {
    console.error('Admin cleanup error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error running cleanup' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
