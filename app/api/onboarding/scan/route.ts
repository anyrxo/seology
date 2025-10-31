import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { Severity, IssueCategory, IssueStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { connectionId, stats } = await req.json()

    if (!connectionId || !stats) {
      return NextResponse.json(
        { error: 'Connection ID and stats are required' },
        { status: 400 }
      )
    }

    // Verify connection belongs to user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: { connections: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const connection = user.connections.find((c) => c.id === connectionId)

    if (!connection) {
      return NextResponse.json(
        { error: 'Connection not found' },
        { status: 404 }
      )
    }

    // Create sample issues based on scan stats
    const issueTypes = [
      { type: 'missing_meta_description', category: IssueCategory.CONTENT, severity: Severity.CRITICAL },
      { type: 'broken_image_alt', category: IssueCategory.CONTENT, severity: Severity.CRITICAL },
      { type: 'missing_h1', category: IssueCategory.CONTENT, severity: Severity.HIGH },
      { type: 'duplicate_title', category: IssueCategory.CONTENT, severity: Severity.HIGH },
      { type: 'slow_page_load', category: IssueCategory.PERFORMANCE, severity: Severity.MEDIUM },
      { type: 'broken_internal_link', category: IssueCategory.LINKS, severity: Severity.MEDIUM },
      { type: 'missing_canonical', category: IssueCategory.TECHNICAL, severity: Severity.LOW },
    ]

    const issues = []
    let issueCount = 0

    // Create critical issues
    for (let i = 0; i < stats.criticalIssues && issueCount < 20; i++) {
      const issueType = issueTypes.find((t) => t.severity === Severity.CRITICAL)
      if (issueType) {
        issues.push({
          connectionId: connection.id,
          type: issueType.type,
          category: issueType.category,
          severity: issueType.severity,
          pageUrl: `/page-${issueCount + 1}`,
          details: {
            description: `${issueType.type.replace(/_/g, ' ')} detected`,
            impact: 'High impact on SEO',
          },
          status: IssueStatus.DETECTED,
        })
        issueCount++
      }
    }

    // Create high issues
    for (let i = 0; i < stats.highIssues && issueCount < 20; i++) {
      const issueType = issueTypes.find((t) => t.severity === Severity.HIGH)
      if (issueType) {
        issues.push({
          connectionId: connection.id,
          type: issueType.type,
          category: issueType.category,
          severity: issueType.severity,
          pageUrl: `/page-${issueCount + 1}`,
          details: {
            description: `${issueType.type.replace(/_/g, ' ')} detected`,
            impact: 'Moderate impact on SEO',
          },
          status: IssueStatus.DETECTED,
        })
        issueCount++
      }
    }

    // Create medium issues
    for (let i = 0; i < stats.mediumIssues && issueCount < 20; i++) {
      const issueType = issueTypes.find((t) => t.severity === Severity.MEDIUM)
      if (issueType) {
        issues.push({
          connectionId: connection.id,
          type: issueType.type,
          category: issueType.category,
          severity: issueType.severity,
          pageUrl: `/page-${issueCount + 1}`,
          details: {
            description: `${issueType.type.replace(/_/g, ' ')} detected`,
            impact: 'Low to moderate impact on SEO',
          },
          status: IssueStatus.DETECTED,
        })
        issueCount++
      }
    }

    // Bulk create issues
    if (issues.length > 0) {
      await prisma.issue.createMany({
        data: issues,
      })
    }

    // Update connection last sync
    await prisma.connection.update({
      where: { id: connection.id },
      data: { lastSync: new Date() },
    })

    return NextResponse.json({
      success: true,
      message: 'Scan results saved',
      issuesCreated: issues.length,
    })
  } catch (error) {
    console.error('Scan save error:', error)
    return NextResponse.json(
      { error: 'Failed to save scan results' },
      { status: 500 }
    )
  }
}
