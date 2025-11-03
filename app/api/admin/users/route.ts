/**
 * Admin Users API
 * Manage users, roles, and permissions
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/middleware/admin-guard'
import { Plan, Role, Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Verify admin access
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const search = searchParams.get('search') || ''
    const plan = searchParams.get('plan') || ''
    const role = searchParams.get('role') || ''

    // Build where clause
    const where: Prisma.UserWhereInput = {}

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (plan && Object.values(Plan).includes(plan as Plan)) {
      where.plan = plan as Plan
    }

    if (role && Object.values(Role).includes(role as Role)) {
      where.role = role as Role
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          connections: {
            select: {
              id: true,
              platform: true,
              domain: true,
              status: true,
            },
          },
          subscriptions: {
            select: {
              id: true,
              plan: true,
              status: true,
            },
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              connections: true,
              auditLogs: true,
            },
          },
        },
      }),
      db.user.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        users: users.map((user) => ({
          id: user.id,
          clerkId: user.clerkId,
          email: user.email,
          name: user.name,
          plan: user.plan,
          role: user.role,
          executionMode: user.executionMode,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          connectionsCount: user._count.connections,
          auditLogsCount: user._count.auditLogs,
          connections: user.connections,
          latestSubscription: user.subscriptions[0] || null,
        })),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch users' },
      },
      { status: 500 }
    )
  }
}
