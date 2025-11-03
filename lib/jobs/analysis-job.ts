/**
 * Analyze Site Job
 *
 * Uses Claude AI to analyze a site for SEO issues
 * Creates Issue records for detected problems
 */

import { db } from '../db'
import { analyzeSiteForSEO } from '../claude'
import type { Job } from '@prisma/client'
import { notifyAnalysisComplete } from '../notifications'

interface AnalysisJobPayload {
  connectionId: string
  url: string
  platform: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM'
  userId?: string
  pageContent?: string
}

/**
 * Execute site analysis job
 */
export async function analyzeSiteJob(job: Job): Promise<void> {
  const payload: AnalysisJobPayload = JSON.parse(job.payload)
  const { connectionId, url, platform, userId, pageContent: providedContent } = payload

  if (!connectionId || !url || !platform) {
    throw new Error('Missing required data: connectionId, url, and platform')
  }

  console.log(`Starting analysis job ${job.id} for ${url}`)

  try {
    // Get connection details
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: { user: true }
    })

    if (!connection) {
      throw new Error(`Connection ${connectionId} not found`)
    }

    // Update connection analysis timestamp
    await db.connection.update({
      where: { id: connectionId },
      data: { lastAnalysisAt: new Date() }
    })

    // Update job progress
    await db.job.update({
      where: { id: job.id },
      data: { progress: 10 }
    })

    // Build page content if not provided
    let pageContent = providedContent
    if (!pageContent) {
      // Get all issues for this connection to build page content
      const existingIssues = await db.issue.findMany({
        where: { connectionId },
        take: 10,
        orderBy: { detectedAt: 'desc' }
      })

      pageContent = `Site: ${url}\n`
      pageContent += `Platform: ${platform}\n`
      pageContent += `Domain: ${connection.domain}\n\n`

      if (existingIssues.length > 0) {
        pageContent += `Recent issues:\n`
        existingIssues.forEach(issue => {
          pageContent += `- ${issue.title} (${issue.type})\n`
        })
      }
    }

    // Analyze with Claude AI
    console.log(`Analyzing ${url} with Claude AI`)
    await db.job.update({
      where: { id: job.id },
      data: { progress: 30 }
    })

    const analysisResult = await analyzeSiteForSEO(url, pageContent, platform)

    await db.job.update({
      where: { id: job.id },
      data: { progress: 70 }
    })

    // Create Issue records for detected problems
    let createdIssues = 0
    for (const issue of analysisResult.issues) {
      // Check if similar issue already exists
      const existingIssue = await db.issue.findFirst({
        where: {
          connectionId,
          type: issue.type,
          pageUrl: issue.pageUrl,
          status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] }
        }
      })

      if (!existingIssue) {
        // Create new issue
        await db.issue.create({
          data: {
            connectionId,
            type: issue.type,
            title: issue.title,
            severity: issue.severity,
            pageUrl: issue.pageUrl,
            details: JSON.stringify({
              description: issue.description,
              recommendation: issue.recommendation,
              fixCode: issue.fixCode,
              impactEstimate: issue.impactEstimate,
              riskLevel: issue.riskLevel
            }),
            recommendation: issue.recommendation,
            status: 'DETECTED',
            impactScore: 0,
            estimatedTraffic: 0
          }
        })
        createdIssues++
      }
    }

    await db.job.update({
      where: { id: job.id },
      data: { progress: 95 }
    })

    // Update connection stats
    const totalIssues = await db.issue.count({
      where: {
        connectionId,
        status: { in: ['OPEN', 'DETECTED', 'IN_PROGRESS'] }
      }
    })

    await db.connection.update({
      where: { id: connectionId },
      data: {
        issueCount: totalIssues,
        healthStatus: totalIssues === 0 ? 'healthy' :
                     totalIssues < 5 ? 'warning' : 'error'
      }
    })

    // Send notification to user
    if (userId || connection.userId) {
      await notifyAnalysisComplete(
        userId || connection.userId,
        connectionId,
        url,
        createdIssues
      )
    }

    console.log(
      `Analysis completed for ${url}: ${createdIssues} new issues detected (${analysisResult.issues.length} total found)`
    )
  } catch (error) {
    console.error(`Analysis failed for ${url}:`, error)

    // Update connection to show error
    await db.connection.update({
      where: { id: connectionId },
      data: { healthStatus: 'error' }
    })

    throw error
  }
}
