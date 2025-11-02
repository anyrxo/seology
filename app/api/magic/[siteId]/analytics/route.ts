/**
 * Magic.js API: Receive Page Analytics
 * Collect SEO data from client-side for analysis
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(
  req: NextRequest,
  { params }: { params: { siteId: string } }
) {
  const siteId = params.siteId

  try {
    const body = await req.json()
    const {
      url,
      title,
      metaDescription,
      headings,
      images,
      links,
      wordCount,
    } = body

    // Store analytics data (you could create a PageAnalytics model, or store in details)
    // For now, we'll use the existing structure and potentially create issues

    const issues = []

    // Check for missing meta title
    if (!title || title.trim().length === 0) {
      issues.push({
        type: 'missing_meta_title',
        title: 'Missing Page Title',
        severity: 'HIGH',
        pageUrl: url,
        details: JSON.stringify({ currentTitle: title }),
        recommendation: 'Add a descriptive, keyword-rich title tag',
      })
    }

    // Check for missing meta description
    if (!metaDescription || metaDescription.trim().length === 0) {
      issues.push({
        type: 'missing_meta_description',
        title: 'Missing Meta Description',
        severity: 'HIGH',
        pageUrl: url,
        details: JSON.stringify({ currentDescription: metaDescription }),
        recommendation: 'Add a compelling meta description (150-160 characters)',
      })
    }

    // Check for missing H1
    if (!headings?.h1 || headings.h1.length === 0) {
      issues.push({
        type: 'missing_h1',
        title: 'Missing H1 Heading',
        severity: 'MEDIUM',
        pageUrl: url,
        details: JSON.stringify({ headings }),
        recommendation: 'Add a single H1 heading that describes the page content',
      })
    }

    // Check for images without alt text
    if (images?.withoutAlt > 0) {
      issues.push({
        type: 'missing_alt_text',
        title: `${images.withoutAlt} Images Missing Alt Text`,
        severity: 'MEDIUM',
        pageUrl: url,
        details: JSON.stringify({ totalImages: images.total, withoutAlt: images.withoutAlt }),
        recommendation: 'Add descriptive alt text to all images for accessibility and SEO',
      })
    }

    // Check for thin content
    if (wordCount < 300) {
      issues.push({
        type: 'thin_content',
        title: 'Thin Content Detected',
        severity: 'LOW',
        pageUrl: url,
        details: JSON.stringify({ wordCount }),
        recommendation: 'Expand content to at least 300 words for better SEO',
      })
    }

    // Create issues in database
    for (const issue of issues) {
      await db.issue.create({
        data: {
          connectionId: siteId,
          type: issue.type,
          title: issue.title,
          severity: issue.severity as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
          pageUrl: issue.pageUrl,
          details: issue.details,
          recommendation: issue.recommendation,
          status: 'OPEN',
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Analytics received',
      issuesDetected: issues.length,
    })
  } catch (error) {
    console.error('Error processing Magic.js analytics:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process analytics',
      },
      { status: 500 }
    )
  }
}
