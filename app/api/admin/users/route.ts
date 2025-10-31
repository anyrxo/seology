import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdmin } from '@/lib/admin'

/**
 * GET /api/admin/users
 * Get all users with pagination
 * Admin only
 */
export async function GET(request: Request) {
  try {
    // Verify admin access
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    // Build where clause for search
    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } }
          ]
        }
      : {}

    // Get users with related data
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        include: {
          subscription: true,
          connections: {
            select: {
              id: true,
              platform: true,
              status: true
            }
          },
          _count: {
            select: {
              connections: true,
              auditLogs: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      db.user.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Admin users list error:', error)
    return NextResponse.json(
      { success: false, error: 'Unauthorized or error fetching users' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    )
  }
}
