import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { analyzeSiteForSEO } from '@/lib/claude'

interface RouteContext {
  params: Promise<{ id: string }>
}

// POST /api/sites/[id]/analyze - Trigger SEO analysis for a site
// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, context: RouteContext) {
  const session = await auth()
  const { id } = await context.params

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user from database
  const user = await db.user.findUnique({
    where: { clerkId: session.userId },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Get connection
  const connection = await db.connection.findFirst({
    where: {
      id,
      userId: user.id,
    },
  })

  if (!connection) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
  }

  // For now, we'll fetch the homepage and analyze it
  // In production, this would be a background job that crawls all pages
  let pageContent = ''
  try {
    const response = await fetch(`https://${connection.domain}`, {
      headers: {
        'User-Agent': 'SEOLOGY.AI Bot/1.0',
      },
    })
    pageContent = await response.text()
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch site content' },
      { status: 500 }
    )
  }

  // Analyze with Claude
  const analysis = await analyzeSiteForSEO(
    `https://${connection.domain}`,
    pageContent,
    connection.platform
  )

  // Create a crawl record
  const crawl = await db.crawl.create({
    data: {
      connectionId: connection.id,
      status: 'COMPLETED',
      pagesFound: 1,
      issuesFound: analysis.issues.length,
      startedAt: new Date(),
      completedAt: new Date(),
    },
  })

  // Store issues in database
  const issues = await Promise.all(
    analysis.issues.map((issue) =>
      db.issue.create({
        data: {
          connectionId: connection.id,
          type: issue.type,
          title: issue.title,
          severity: issue.severity,
          pageUrl: issue.pageUrl,
          recommendation: issue.recommendation,
          details: JSON.stringify({
            description: issue.description,
            fixCode: issue.fixCode,
          }),
          status: 'DETECTED',
        },
      })
    )
  )

  // Update connection last sync
  await db.connection.update({
    where: { id: connection.id },
    data: { lastSync: new Date() },
  })

  // Create audit log
  await db.auditLog.create({
    data: {
      userId: user.id,
      connectionId: connection.id,
      action: 'SITE_ANALYZED',
      details: JSON.stringify({
        crawlId: crawl.id,
        issuesFound: analysis.issues.length,
      }),
    },
  })

  // Create notification
  await db.notification.create({
    data: {
      userId: user.id,
      type: 'site_analyzed',
      title: 'Site Analysis Complete',
      message: `Found ${analysis.issues.length} SEO issues on ${connection.domain}`,
    },
  })

  return NextResponse.json({
    success: true,
    data: {
      crawl,
      issues,
      summary: analysis.summary,
      recommendations: analysis.recommendations,
    },
  })
}
