import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { encrypt } from '@/lib/encryption'

// GET /api/sites - List all sites for authenticated user
// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
    include: {
      connections: {
        include: {
          issues: {
            where: { status: { not: 'FIXED' } },
          },
          fixes: true,
          _count: {
            select: {
              issues: true,
              fixes: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: user.connections.map((conn) => ({
      id: conn.id,
      platform: conn.platform,
      domain: conn.domain,
      displayName: conn.displayName,
      status: conn.status,
      lastSync: conn.lastSync,
      createdAt: conn.createdAt,
      stats: {
        totalIssues: conn._count.issues,
        activeIssues: conn.issues.length,
        totalFixes: conn._count.fixes,
      },
    })),
  })
}

// POST /api/sites - Create a new site connection
export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { platform, domain, displayName, credentials } = body

  if (!platform || !domain) {
    return NextResponse.json(
      { error: 'Missing required fields: platform, domain' },
      { status: 400 }
    )
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Encrypt credentials if provided (e.g., WordPress username/password)
  const encryptedCredentials = credentials
    ? encrypt(JSON.stringify(credentials))
    : null

  // Create connection
  const connection = await db.connection.create({
    data: {
      userId: user.id,
      platform,
      domain,
      displayName: displayName || domain,
      credentials: encryptedCredentials, // Encrypted using AES-256-GCM
      status: 'PENDING',
    },
  })

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: user.id,
      connectionId: connection.id,
      action: 'CONNECTION_CREATED',
      details: JSON.stringify({ platform, domain }),
    },
  })

  return NextResponse.json({
    success: true,
    data: connection,
  })
}
