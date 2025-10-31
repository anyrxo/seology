import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

/**
 * GET /api/admin/stats
 * Get platform-wide statistics
 * Admin only
 */
export async function GET() {
  try {
    // Verify admin access
    await requireAdmin()

    // Get comprehensive stats
    const [
      totalUsers,
      activeSubscriptions,
      totalSites,
      connectedSites,
      totalIssues,
      criticalIssues,
      totalFixes,
      appliedFixes
    ] = await Promise.all([
      db.user.count(),
      db.subscription.count({ where: { status: 'ACTIVE' } }),
      db.connection.count(),
      db.connection.count({ where: { status: 'CONNECTED' } }),
      db.issue.count(),
      db.issue.count({ where: { severity: 'CRITICAL', status: { in: ['DETECTED', 'FIXING'] } } }),
      db.fix.count(),
      db.fix.count({ where: { status: 'APPLIED' } })
    ])

    // Calculate MRR (simplified)
    const mrr = activeSubscriptions * 49

    // Get breakdown data
    const [planBreakdown, platformBreakdown, issueBreakdown] = await Promise.all([
      db.user.groupBy({ by: ['plan'], _count: true }),
      db.connection.groupBy({ by: ['platform'], _count: true }),
      db.issue.groupBy({ by: ['severity'], where: { status: { in: ['DETECTED', 'FIXING'] } }, _count: true })
    ])

    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          activeSubscriptions,
          mrr,
          byPlan: planBreakdown
        },
        sites: {
          total: totalSites,
          connected: connectedSites,
          byPlatform: platformBreakdown
        },
        issues: {
          total: totalIssues,
          critical: criticalIssues,
          bySeverity: issueBreakdown
        },
        fixes: {
          total: totalFixes,
          applied: appliedFixes
        }
      }
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error fetching stats' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
