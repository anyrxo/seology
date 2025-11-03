/**
 * Admin Sites API
 * Monitor all connected sites across the platform
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/middleware/admin-guard'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const adminCheck = await verifyAdmin()
    if ('error' in adminCheck) {
      return adminCheck.error
    }

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const platform = searchParams.get('platform') || ''
    const status = searchParams.get('status') || ''
    const search = searchParams.get('search') || ''

    // Build where clause
    const where: Prisma.ConnectionWhereInput = {}

    if (platform && ['SHOPIFY', 'WORDPRESS', 'WIX', 'CUSTOM'].includes(platform)) {
      where.platform = platform as 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM'
    }

    if (status && ['PENDING', 'CONNECTED', 'ERROR', 'DISCONNECTED'].includes(status)) {
      where.status = status as 'PENDING' | 'CONNECTED' | 'ERROR' | 'DISCONNECTED'
    }

    if (search) {
      where.OR = [
        { domain: { contains: search, mode: 'insensitive' } },
        { displayName: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Get connections with pagination
    const [connections, total, platformStats, statusStats] = await Promise.all([
      db.connection.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              plan: true,
            },
          },
          _count: {
            select: {
              issues: true,
              fixes: true,
            },
          },
        },
      }),
      db.connection.count({ where }),
      // Platform statistics
      db.connection.groupBy({
        by: ['platform'],
        _count: true,
      }),
      // Status statistics
      db.connection.groupBy({
        by: ['status'],
        _count: true,
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        connections: connections.map((conn) => ({
          id: conn.id,
          platform: conn.platform,
          domain: conn.domain,
          displayName: conn.displayName,
          status: conn.status,
          lastSync: conn.lastSync?.toISOString() || null,
          createdAt: conn.createdAt.toISOString(),
          user: conn.user,
          issuesCount: conn._count.issues,
          fixesCount: conn._count.fixes,
        })),
        statistics: {
          byPlatform: platformStats.map((stat) => ({
            platform: stat.platform,
            count: stat._count,
          })),
          byStatus: statusStats.map((stat) => ({
            status: stat.status,
            count: stat._count,
          })),
        },
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch sites' },
      },
      { status: 500 }
    )
  }
}
