import { db } from '../db'
import { chatWithClaude } from '../claude'
import { AnalysisJobPayload } from '../queue'

export interface AnalysisJobResult {
  success: boolean
  conversationId?: string
  issuesAnalyzed: number
  error?: string
}

/**
 * Process an AI analysis job
 * This runs in the background and uses Claude to analyze SEO issues
 */
export async function processAnalysisJob(
  payload: AnalysisJobPayload
): Promise<AnalysisJobResult> {
  try {
    const { siteId, userId } = payload

    // Verify site exists and belongs to user
    const site = await db.connection.findFirst({
      where: {
        id: siteId,
        user: {
          clerkUserId: userId,
        },
      },
      include: {
        issues: {
          where: {
            status: 'DETECTED',
          },
          orderBy: {
            severity: 'asc', // CRITICAL first
          },
          take: 50, // Limit to top 50 issues
        },
      },
    })

    if (!site) {
      throw new Error('Site not found or unauthorized')
    }

    if (site.issues.length === 0) {
      return {
        success: true,
        issuesAnalyzed: 0,
      }
    }

    // Create AI conversation
    const conversation = await db.aIConversation.create({
      data: {
        userId: site.userId,
        messages: [],
        context: {
          siteId: site.id,
          siteDomain: site.domain,
          platform: site.platform,
        },
      },
    })

    // Group issues by severity and category
    const issuesBySeverity = {
      CRITICAL: site.issues.filter(i => i.severity === 'CRITICAL'),
      HIGH: site.issues.filter(i => i.severity === 'HIGH'),
      MEDIUM: site.issues.filter(i => i.severity === 'MEDIUM'),
      LOW: site.issues.filter(i => i.severity === 'LOW'),
    }

    const issuesByCategory = {
      TECHNICAL: site.issues.filter(i => i.category === 'TECHNICAL'),
      CONTENT: site.issues.filter(i => i.category === 'CONTENT'),
      LINKS: site.issues.filter(i => i.category === 'LINKS'),
      PERFORMANCE: site.issues.filter(i => i.category === 'PERFORMANCE'),
      MOBILE: site.issues.filter(i => i.category === 'MOBILE'),
    }

    // Build prompt for Claude
    const prompt = `I've analyzed a website and found the following SEO issues:

Site: ${site.domain}
Platform: ${site.platform}
Total Issues Found: ${site.issues.length}

Issue Breakdown by Severity:
- Critical: ${issuesBySeverity.CRITICAL.length}
- High: ${issuesBySeverity.HIGH.length}
- Medium: ${issuesBySeverity.MEDIUM.length}
- Low: ${issuesBySeverity.LOW.length}

Issue Breakdown by Category:
- Technical: ${issuesByCategory.TECHNICAL.length}
- Content: ${issuesByCategory.CONTENT.length}
- Links: ${issuesByCategory.LINKS.length}
- Performance: ${issuesByCategory.PERFORMANCE.length}
- Mobile: ${issuesByCategory.MOBILE.length}

Top 10 Critical Issues:
${site.issues
  .slice(0, 10)
  .map((issue, i) => {
    const details = issue.details as any
    return `${i + 1}. [${issue.severity}] ${issue.type} on ${issue.pageUrl}
   Description: ${details.description || 'N/A'}
   Recommendation: ${details.recommendation || 'N/A'}`
  })
  .join('\n\n')}

Please provide:
1. A priority ranking of which issues to fix first and why
2. Detailed step-by-step recommendations for fixing the top 5 most critical issues
3. Any patterns or systemic problems you notice across the site
4. Quick wins that could be implemented immediately for maximum impact
5. An overall SEO health score (0-100) with detailed explanation
6. Estimated timeline for fixing all critical and high priority issues

Be specific, actionable, and technical in your recommendations. Consider the platform (${site.platform}) when providing fix instructions.`

    // Get Claude's analysis
    const claudeAnalysis = await chatWithClaude(
      [{ role: 'user', content: prompt }],
      {
        site_url: site.domain,
        platform: site.platform,
      }
    )

    // Update conversation with messages
    await db.aIConversation.update({
      where: { id: conversation.id },
      data: {
        messages: [
          {
            role: 'user',
            content: prompt,
            timestamp: new Date().toISOString(),
          },
          {
            role: 'assistant',
            content: claudeAnalysis,
            timestamp: new Date().toISOString(),
          },
        ],
      },
    })

    // Create audit log
    await db.auditLog.create({
      data: {
        userId: site.userId,
        action: 'SITE_ANALYZED',
        resource: 'connection',
        resourceId: siteId,
        details: {
          conversationId: conversation.id,
          issuesAnalyzed: site.issues.length,
        },
      },
    })

    return {
      success: true,
      conversationId: conversation.id,
      issuesAnalyzed: site.issues.length,
    }
  } catch (error) {
    console.error('Analysis job error:', error)
    return {
      success: false,
      issuesAnalyzed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
