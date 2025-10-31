import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Severity, IssueCategory, IssueStatus } from '@prisma/client'

/**
 * POST /api/magic/page-scan
 * Receive page scan data from Magic.js client
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-seology-key')
    const body = await request.json()
    const { siteId, pageData } = body

    if (!apiKey || !siteId || !pageData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify API key and site
    const site = await db.site.findFirst({
      where: {
        id: siteId,
        connection: {
          platform: 'CUSTOM',
          credentials: {
            path: ['apiKey'],
            equals: apiKey,
          },
        },
      },
    })

    if (!site) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get site to get connectionId
    const connection = await db.connection.findFirst({
      where: {
        sites: {
          some: { id: siteId }
        }
      }
    })

    if (!connection) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 })
    }

    // Store page metrics
    await db.metric.createMany({
      data: [
        {
          connectionId: connection.id,
          siteId: siteId,
          date: new Date(),
          topKeywords: {
            page: pageData.url,
            metric: 'word_count',
            value: pageData.wordCount || 0,
          },
        },
        {
          connectionId: connection.id,
          siteId: siteId,
          date: new Date(),
          topKeywords: {
            page: pageData.url,
            metric: 'link_count',
            value: pageData.linkCount || 0,
          },
        },
        {
          connectionId: connection.id,
          siteId: siteId,
          date: new Date(),
          topKeywords: {
            page: pageData.url,
            metric: 'images_without_alt',
            value: pageData.imagesWithoutAlt || 0,
          },
        },
      ],
    })

    // Detect issues from scan data
    const issues: Array<{
      connectionId: string
      siteId: string
      type: string
      severity: Severity
      category: IssueCategory
      pageUrl: string
      details: any
      status: IssueStatus
    }> = []

    if (!pageData.title || pageData.title.length < 30) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'TITLE_TOO_SHORT',
        severity: Severity.HIGH,
        category: IssueCategory.CONTENT,
        pageUrl: pageData.url,
        details: {
          description: `Page title is too short (${pageData.title?.length || 0} characters)`,
          currentTitle: pageData.title || null,
        },
        status: IssueStatus.DETECTED,
      })
    }

    if (!pageData.metaDescription) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'MISSING_META_DESCRIPTION',
        severity: Severity.HIGH,
        category: IssueCategory.CONTENT,
        pageUrl: pageData.url,
        details: {
          description: 'Page is missing a meta description',
        },
        status: IssueStatus.DETECTED,
      })
    }

    if (pageData.h1.length === 0) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'MISSING_H1',
        severity: Severity.CRITICAL,
        category: IssueCategory.CONTENT,
        pageUrl: pageData.url,
        details: {
          description: 'Page is missing an H1 tag',
        },
        status: IssueStatus.DETECTED,
      })
    }

    if (pageData.imagesWithoutAlt > 0) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'IMAGES_MISSING_ALT',
        severity: Severity.HIGH,
        category: IssueCategory.CONTENT,
        pageUrl: pageData.url,
        details: {
          description: `${pageData.imagesWithoutAlt} images are missing alt text`,
          count: pageData.imagesWithoutAlt,
        },
        status: IssueStatus.DETECTED,
      })
    }

    if (!pageData.hasCanonical) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'MISSING_CANONICAL',
        severity: Severity.MEDIUM,
        category: IssueCategory.TECHNICAL,
        pageUrl: pageData.url,
        details: {
          description: 'Page is missing a canonical URL',
        },
        status: IssueStatus.DETECTED,
      })
    }

    if (!pageData.hasStructuredData) {
      issues.push({
        connectionId: connection.id,
        siteId: siteId,
        type: 'MISSING_STRUCTURED_DATA',
        severity: Severity.MEDIUM,
        category: IssueCategory.TECHNICAL,
        pageUrl: pageData.url,
        details: {
          description: 'Page is missing structured data',
        },
        status: IssueStatus.DETECTED,
      })
    }

    // Store detected issues
    if (issues.length > 0) {
      await db.issue.createMany({ data: issues })
    }

    // Create audit log
    await db.auditLog.create({
      data: {
        siteId: siteId,
        userId: site.userId,
        action: 'MAGIC_JS_PAGE_SCANNED',
        resource: 'site',
        resourceId: siteId,
        details: {
          url: pageData.url,
          issuesFound: issues.length,
        },
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Page scan received',
      issuesDetected: issues.length,
    })
  } catch (error) {
    console.error('Error processing page scan:', error)
    return NextResponse.json(
      {
        error: 'Failed to process page scan',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
