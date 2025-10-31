import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin, getAdminUser } from '@/lib/admin'

/**
 * POST /api/admin/users/:id/upgrade
 * Manually upgrade a user's plan
 * Admin only
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin access
    const admin = await getAdminUser()

    const { plan } = await request.json()

    if (!plan || !['STARTER', 'GROWTH', 'SCALE'].includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan' },
        { status: 400 }
      )
    }

    const { id } = await params

    // Update user plan
    const user = await db.user.update({
      where: { id },
      data: { plan }
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: admin?.id || 'admin',
        action: 'admin_plan_upgrade',
        resource: 'user',
        resourceId: id,
        details: {
          newPlan: plan,
          adminEmail: admin?.emailAddresses?.[0]?.emailAddress
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Admin user upgrade error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error upgrading user' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
