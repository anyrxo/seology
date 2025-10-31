import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

/**
 * GET /api/admin/sites
 * Get all sites with pagination
 * Admin only
 */
export async function GET(request: Request) {
  try {
    // Verify admin access
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const platform = searchParams.get('platform') || ''
    const status = searchParams.get('status') || ''

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (platform) where.platform = platform
    if (status) where.status = status

    // Get sites with related data
    const [sites, total] = await Promise.all([
      db.connection.findMany({
        where,
        include: {
          user: {
            select: {
              email: true,
              name: true,
              plan: true
            }
          },
          _count: {
            select: {
              issues: true,
              fixes: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      db.connection.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        sites,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Admin sites list error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error fetching sites' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
