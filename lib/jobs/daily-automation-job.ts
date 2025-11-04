/**
 * Daily Automation Job
 *
 * Runs daily automated scan, analysis, and optimization for all user sites
 * Generates comprehensive before/after reports
 * Respects user's execution mode (AUTOMATIC/PLAN/APPROVE)
 */

import { db } from '@/lib/db'
import type { Job, ExecutionMode } from '@prisma/client'
import { scanConnectionImages, storeScannedImages } from '@/lib/image-scanner'
import { processConnectionImagesWithAI } from '@/lib/image-ai'
import { crawlWebsite } from '@/lib/crawler'
import { analyzeSiteForSEO } from '@/lib/claude'
import { executeFixes } from '@/lib/execution-modes'
import { sendDailyReportEmail } from '@/lib/email'

interface DailyAutomationPayload {
  userId: string
}

interface AutomationResult {
  sitesScanned: number
  pagesAnalyzed: number
  issuesFound: number
  issuesFixed: number
  issuesPending: number
  imagesOptimized: number
  fixesApplied: Array<{
    connectionId: string
    siteUrl: string
    fixId: string
    description: string
    type: string
    before: string
    after: string
  }>
  pendingApproval: Array<{
    connectionId: string
    siteUrl: string
    fixId: string
    description: string
    type: string
    estimatedImpact: string
  }>
  // Dynamic activity tracking - what actually happened
  activitiesPerformed: Array<{
    siteUrl: string
    activity: string
    status: 'success' | 'skipped' | 'failed'
    reason?: string
    details?: string
  }>
  // Detailed breakdown per site
  siteReports: Array<{
    siteUrl: string
    platform: string
    activities: string[] // e.g., ['crawled', 'analyzed', 'optimized_images', 'applied_fixes']
    metrics: {
      pagesCrawled?: number
      issuesDetected?: number
      issuesFixed?: number
      issuesPending?: number
      imagesScanned?: number
      imagesOptimized?: number
    }
    // Real data about what was discovered
    discoveredData: {
      pages?: Array<{ url: string; title: string; wordCount?: number }>
      totalWords?: number
      totalFiles?: number
      accessLevel?: 'full' | 'partial' | 'limited'
      capabilities?: string[] // ['can_edit_meta', 'can_upload_images', 'can_modify_content']
      issueBreakdown?: {
        critical?: number
        high?: number
        medium?: number
        low?: number
      }
      contentAnalysis?: {
        avgWordsPerPage?: number
        pagesWithImages?: number
        pagesWithoutMeta?: number
        brokenLinks?: number
      }
    }
    errors?: string[]
  }>
}

/**
 * Execute daily automation for a user
 */
export async function executeDailyAutomationJob(job: Job): Promise<void> {
  const payload: DailyAutomationPayload = JSON.parse(job.payload)
  const { userId } = payload

  console.log(`Starting daily automation for user ${userId}`)

  try {
    // Update job status
    await db.job.update({
      where: { id: job.id },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
        progress: 5
      }
    })

    // Get user and their connections
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        connections: {
          where: { status: 'CONNECTED' },
          select: {
            id: true,
            platform: true,
            domain: true,
            displayName: true,
            pageCount: true,
            issueCount: true
          }
        }
      }
    })

    if (!user) {
      throw new Error(`User ${userId} not found`)
    }

    if (user.connections.length === 0) {
      console.log(`User ${userId} has no connected sites, skipping automation`)
      await completeJob(job.id, {
        sitesScanned: 0,
        pagesAnalyzed: 0,
        issuesFound: 0,
        issuesFixed: 0,
        issuesPending: 0,
        imagesOptimized: 0,
        fixesApplied: [],
        pendingApproval: [],
        activitiesPerformed: [],
        siteReports: []
      })
      return
    }

    const result: AutomationResult = {
      sitesScanned: 0,
      pagesAnalyzed: 0,
      issuesFound: 0,
      issuesFixed: 0,
      issuesPending: 0,
      imagesOptimized: 0,
      fixesApplied: [],
      pendingApproval: [],
      activitiesPerformed: [],
      siteReports: []
    }

    // Process each connection
    const totalConnections = user.connections.length
    let processedConnections = 0

    for (const connection of user.connections) {
      // Initialize site report for this connection
      const siteReport: AutomationResult['siteReports'][0] = {
        siteUrl: connection.domain,
        platform: connection.platform,
        activities: [],
        metrics: {},
        discoveredData: {},
        errors: []
      }

      try {
        console.log(`Processing connection ${connection.id} (${connection.domain})`)

        // 1. Crawl site for pages
        await db.job.update({
          where: { id: job.id },
          data: {
            progress: 10 + (processedConnections / totalConnections) * 30
          }
        })

        let crawlResult
        try {
          crawlResult = await crawlWebsite(connection.domain, {
            maxPages: 50, // Limit for daily automation
            maxDepth: 3
          })

          result.sitesScanned++
          result.pagesAnalyzed += crawlResult.pages.length
          siteReport.activities.push('crawled')
          siteReport.metrics.pagesCrawled = crawlResult.pages.length

          // Capture real discovered page data
          const discoveredPages: Array<{ url: string; title: string; wordCount?: number }> = []
          let totalWords = 0
          let pagesWithImages = 0
          let pagesWithoutMeta = 0

          for (const page of crawlResult.pages.slice(0, 10)) {
            // Fetch actual page content to count words
            try {
              const response = await fetch(page.url)
              const html = await response.text()

              // Extract text content and count words
              const textContent = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                                     .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                                     .replace(/<[^>]+>/g, ' ')
                                     .replace(/\s+/g, ' ')
                                     .trim()
              const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length
              totalWords += wordCount

              // Check if page has images
              if (html.match(/<img/gi)) {
                pagesWithImages++
              }

              // Check if page has meta description
              if (!html.match(/<meta\s+name=["']description["']/i)) {
                pagesWithoutMeta++
              }

              discoveredPages.push({
                url: page.url,
                title: page.title,
                wordCount
              })
            } catch (error) {
              // If we can't fetch the page, just add basic info
              discoveredPages.push({
                url: page.url,
                title: page.title
              })
            }
          }

          // Store discovered data
          siteReport.discoveredData.pages = discoveredPages
          siteReport.discoveredData.totalWords = totalWords
          siteReport.discoveredData.contentAnalysis = {
            avgWordsPerPage: discoveredPages.length > 0 ? Math.round(totalWords / discoveredPages.length) : 0,
            pagesWithImages,
            pagesWithoutMeta
          }

          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'Site Crawl',
            status: 'success',
            details: `Crawled ${crawlResult.pages.length} pages (${totalWords.toLocaleString()} total words, avg ${Math.round(totalWords / discoveredPages.length)} words/page)`
          })
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Crawl failed'
          siteReport.errors?.push(`Crawl: ${errorMsg}`)
          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'Site Crawl',
            status: 'failed',
            reason: errorMsg
          })
          console.error(`Failed to crawl ${connection.domain}:`, error)
          // Continue with other tasks even if crawl fails
          crawlResult = { pages: [] }
          siteReport.discoveredData.accessLevel = 'limited'
        }

        // 2. Scan for images
        try {
          const imageResult = await scanConnectionImages(connection.id)
          await storeScannedImages(connection.id, imageResult.images)

          if (imageResult.images.length > 0) {
            siteReport.activities.push('scanned_images')
            siteReport.metrics.imagesScanned = imageResult.images.length

            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'Image Scan',
              status: 'success',
              details: `Scanned ${imageResult.images.length} images`
            })
          } else {
            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'Image Scan',
              status: 'skipped',
              reason: 'No images found'
            })
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Image scan failed'
          siteReport.errors?.push(`Image scan: ${errorMsg}`)
          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'Image Scan',
            status: 'failed',
            reason: errorMsg
          })
          console.error(`Failed to scan images for ${connection.domain}:`, error)
        }

        // 3. Analyze with AI for SEO issues
        // Fetch page content for analysis
        let pageContent = ''
        if (crawlResult && crawlResult.pages && crawlResult.pages.length > 0) {
          try {
            const response = await fetch(crawlResult.pages[0].url)
            pageContent = await response.text()
          } catch (error) {
            console.error('Failed to fetch page content:', error)
            pageContent = `<html><body><h1>${connection.domain}</h1></body></html>`
          }
        } else {
          pageContent = `<html><body><h1>${connection.domain}</h1></body></html>`
        }

        // 3. Analyze with AI for SEO issues
        try {
          const analysis = await analyzeSiteForSEO(
            connection.domain,
            pageContent,
            connection.platform
          )

          if (analysis.issues.length > 0) {
            siteReport.activities.push('analyzed_seo')
            siteReport.metrics.issuesDetected = analysis.issues.length

            // Break down issues by severity (real data from AI analysis)
            const issueBreakdown = {
              critical: 0,
              high: 0,
              medium: 0,
              low: 0
            }

            let brokenLinks = 0

            // Store detected issues and count by severity
            for (const issue of analysis.issues) {
              await db.issue.create({
                data: {
                  connectionId: connection.id,
                  type: issue.type,
                  title: issue.title,
                  severity: issue.severity,
                  pageUrl: issue.pageUrl,
                  details: JSON.stringify({
                    description: issue.description,
                    recommendation: issue.recommendation,
                    fixCode: issue.fixCode
                  }),
                  recommendation: issue.recommendation,
                  status: 'DETECTED'
                }
              })
              result.issuesFound++

              // Count by severity
              if (issue.severity === 'CRITICAL') issueBreakdown.critical++
              else if (issue.severity === 'HIGH') issueBreakdown.high++
              else if (issue.severity === 'MEDIUM') issueBreakdown.medium++
              else if (issue.severity === 'LOW') issueBreakdown.low++

              // Count specific issue types
              if (issue.type === 'BROKEN_LINK') brokenLinks++
            }

            // Store real issue breakdown
            siteReport.discoveredData.issueBreakdown = issueBreakdown
            if (siteReport.discoveredData.contentAnalysis) {
              siteReport.discoveredData.contentAnalysis.brokenLinks = brokenLinks
            }

            // Determine platform capabilities based on what we can actually do
            const capabilities: string[] = []
            if (connection.platform === 'SHOPIFY') {
              capabilities.push('can_edit_meta', 'can_modify_content', 'can_upload_images', 'can_edit_products')
              siteReport.discoveredData.accessLevel = 'full'
            } else if (connection.platform === 'WORDPRESS') {
              capabilities.push('can_edit_meta', 'can_modify_content', 'can_upload_images')
              siteReport.discoveredData.accessLevel = 'full'
            } else if (connection.platform === 'CUSTOM') {
              capabilities.push('can_inject_scripts')
              siteReport.discoveredData.accessLevel = 'partial'
            }
            siteReport.discoveredData.capabilities = capabilities

            const severityStr = [
              issueBreakdown.critical > 0 ? `${issueBreakdown.critical} critical` : null,
              issueBreakdown.high > 0 ? `${issueBreakdown.high} high` : null,
              issueBreakdown.medium > 0 ? `${issueBreakdown.medium} medium` : null,
              issueBreakdown.low > 0 ? `${issueBreakdown.low} low` : null
            ].filter(Boolean).join(', ')

            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'SEO Analysis',
              status: 'success',
              details: `Found ${analysis.issues.length} SEO issues: ${severityStr}`
            })
          } else {
            siteReport.discoveredData.issueBreakdown = { critical: 0, high: 0, medium: 0, low: 0 }

            // Still determine capabilities even if no issues
            const capabilities: string[] = []
            if (connection.platform === 'SHOPIFY') {
              capabilities.push('can_edit_meta', 'can_modify_content', 'can_upload_images', 'can_edit_products')
              siteReport.discoveredData.accessLevel = 'full'
            } else if (connection.platform === 'WORDPRESS') {
              capabilities.push('can_edit_meta', 'can_modify_content', 'can_upload_images')
              siteReport.discoveredData.accessLevel = 'full'
            } else if (connection.platform === 'CUSTOM') {
              capabilities.push('can_inject_scripts')
              siteReport.discoveredData.accessLevel = 'partial'
            }
            siteReport.discoveredData.capabilities = capabilities

            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'SEO Analysis',
              status: 'success',
              details: 'No SEO issues detected - site is optimized!'
            })
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'SEO analysis failed'
          siteReport.errors?.push(`SEO analysis: ${errorMsg}`)
          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'SEO Analysis',
            status: 'failed',
            reason: errorMsg
          })
          console.error(`Failed to analyze SEO for ${connection.domain}:`, error)
        }

        // 4. Apply fixes based on execution mode
        await db.job.update({
          where: { id: job.id },
          data: {
            progress: 40 + (processedConnections / totalConnections) * 30
          }
        })

        try {
          if (user.executionMode === 'AUTOMATIC') {
            // Execute all fixes immediately
            const executionResult = await executeFixes(connection.id, user.id)

            // Extract fixes from result
            if (executionResult.success && executionResult.data?.fixes) {
              siteReport.activities.push('applied_fixes')
              siteReport.metrics.issuesFixed = executionResult.data.fixes.length

              for (const fix of executionResult.data.fixes) {
                result.issuesFixed++
                result.fixesApplied.push({
                  connectionId: connection.id,
                  siteUrl: connection.domain,
                  fixId: fix.fixId,
                  description: fix.description,
                  type: 'seo_fix',
                  before: '{}',
                  after: fix.code || '{}'
                })
              }

              result.activitiesPerformed.push({
                siteUrl: connection.domain,
                activity: 'Auto-Apply Fixes',
                status: 'success',
                details: `Applied ${executionResult.data.fixes.length} fixes automatically`
              })
            }
          } else if (user.executionMode === 'APPROVE') {
            // Create pending fixes for user approval
            const executionResult = await executeFixes(connection.id, user.id)

            // Extract pending fixes from result
            if (executionResult.success && executionResult.data?.fixes) {
              siteReport.activities.push('created_pending_fixes')
              siteReport.metrics.issuesPending = executionResult.data.fixes.length

              for (const fix of executionResult.data.fixes) {
                result.issuesPending++
                result.pendingApproval.push({
                  connectionId: connection.id,
                  siteUrl: connection.domain,
                  fixId: fix.fixId,
                  description: fix.description,
                  type: 'seo_fix',
                  estimatedImpact: 'Medium'
                })
              }

              result.activitiesPerformed.push({
                siteUrl: connection.domain,
                activity: 'Create Pending Fixes',
                status: 'success',
                details: `Created ${executionResult.data.fixes.length} fixes pending your approval`
              })
            }
          } else if (user.executionMode === 'PLAN') {
            // Create plan for batch approval
            const executionResult = await executeFixes(connection.id, user.id)
            if (executionResult.success) {
              siteReport.activities.push('created_plan')
              const issueCount = siteReport.metrics.issuesDetected || 0
              siteReport.metrics.issuesPending = issueCount
              result.issuesPending += issueCount

              result.activitiesPerformed.push({
                siteUrl: connection.domain,
                activity: 'Create Fix Plan',
                status: 'success',
                details: `Created plan with ${issueCount} fixes for batch approval`
              })
            }
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Fix execution failed'
          siteReport.errors?.push(`Fix execution: ${errorMsg}`)
          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'Apply Fixes',
            status: 'failed',
            reason: errorMsg
          })
          console.error(`Failed to execute fixes for ${connection.domain}:`, error)
        }

        // 5. Optimize images with AI
        await db.job.update({
          where: { id: job.id },
          data: {
            progress: 70 + (processedConnections / totalConnections) * 20
          }
        })

        // 5. Optimize images with AI
        try {
          const imageOptimization = await processConnectionImagesWithAI(connection.id, {
            onlyMissingAlt: true,
            maxImages: 20 // Limit for daily automation
          })

          result.imagesOptimized += imageOptimization.successful

          if (imageOptimization.successful > 0) {
            siteReport.activities.push('optimized_images')
            siteReport.metrics.imagesOptimized = imageOptimization.successful

            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'Image Optimization',
              status: 'success',
              details: `Optimized ${imageOptimization.successful} images with AI-generated alt text`
            })
          } else if (imageOptimization.failed > 0) {
            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'Image Optimization',
              status: 'failed',
              reason: `Failed to optimize ${imageOptimization.failed} images`
            })
          } else {
            result.activitiesPerformed.push({
              siteUrl: connection.domain,
              activity: 'Image Optimization',
              status: 'skipped',
              reason: 'No images need optimization'
            })
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Image optimization failed'
          siteReport.errors?.push(`Image optimization: ${errorMsg}`)
          result.activitiesPerformed.push({
            siteUrl: connection.domain,
            activity: 'Image Optimization',
            status: 'failed',
            reason: errorMsg
          })
          console.error(`Failed to optimize images for ${connection.domain}:`, error)
        }

        // Add site report to results
        result.siteReports.push(siteReport)

        processedConnections++
      } catch (error) {
        console.error(`Error processing connection ${connection.id}:`, error)
        // Add failed site report
        result.siteReports.push({
          ...siteReport,
          errors: [...(siteReport.errors || []), `Fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`]
        })
        result.activitiesPerformed.push({
          siteUrl: connection.domain,
          activity: 'Site Processing',
          status: 'failed',
          reason: error instanceof Error ? error.message : 'Unknown error'
        })
        // Continue with other connections
      }
    }

    // Generate and store report
    await db.job.update({
      where: { id: job.id },
      data: { progress: 95 }
    })

    const report = await generateDailyReport(user.id, user.executionMode, result)

    // Create automation snapshot for intelligent rollback
    await createAutomationSnapshot(user.id, report.id, result)

    // Send notifications based on user preferences
    if (user.dailyReportEmail) {
      // Email will be sent by separate job/service
      await db.notification.create({
        data: {
          userId: user.id,
          type: 'INFO',
          title: 'Daily SEO Report Ready',
          message: `Your daily automation processed ${result.sitesScanned} sites and found ${result.issuesFound} issues.`,
          actionUrl: `/dashboard/reports/${report.id}`
        }
      })
    }

    // Update user's last automation run time
    await db.user.update({
      where: { id: userId },
      data: { lastAutomationRun: new Date() }
    })

    // Complete job
    await completeJob(job.id, result)

  } catch (error) {
    console.error(`Daily automation job ${job.id} failed:`, error)

    await db.job.update({
      where: { id: job.id },
      data: {
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
        failedAt: new Date()
      }
    })

    throw error
  }
}

/**
 * Generate and store daily report
 */
async function generateDailyReport(
  userId: string,
  executionMode: ExecutionMode,
  result: AutomationResult
) {
  // Calculate SEO score change (simplified)
  const seoScoreChange = result.issuesFixed > 0
    ? (result.issuesFixed / Math.max(result.issuesFound, 1)) * 10
    : 0

  // Estimate traffic impact
  const estimatedTrafficImpact = result.issuesFixed * 0.5 // Rough estimate: 0.5% per fix

  const report = await db.dailyReport.create({
    data: {
      userId,
      date: new Date(),
      reportType: 'DAILY_AUTOMATION',
      executionMode,
      sitesScanned: result.sitesScanned,
      pagesAnalyzed: result.pagesAnalyzed,
      issuesFound: result.issuesFound,
      issuesFixed: result.issuesFixed,
      issuesPending: result.issuesPending,
      imagesOptimized: result.imagesOptimized,
      fixesApplied: JSON.stringify(result.fixesApplied),
      pendingApproval: JSON.stringify(result.pendingApproval),
      beforeAfter: JSON.stringify(result.fixesApplied.map(fix => ({
        description: fix.description,
        before: fix.before,
        after: fix.after
      }))),
      estimatedTrafficImpact,
      seoScoreChange,
      priorityIssuesResolved: result.issuesFixed,
      reportData: JSON.stringify({
        summary: {
          sitesScanned: result.sitesScanned,
          pagesAnalyzed: result.pagesAnalyzed,
          issuesFound: result.issuesFound,
          issuesFixed: result.issuesFixed,
          issuesPending: result.issuesPending,
          imagesOptimized: result.imagesOptimized,
          seoScoreChange,
          estimatedTrafficImpact
        },
        activitiesPerformed: result.activitiesPerformed,
        siteReports: result.siteReports,
        timestamp: new Date().toISOString()
      })
    }
  })

  // Send email report to user
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true }
    })

    if (user && user.email) {
      console.log(`Sending daily report email to ${user.email}`)

      const emailResult = await sendDailyReportEmail(
        userId,
        user.email,
        {
          id: report.id,
          date: report.date.toISOString(),
          executionMode: report.executionMode,
          sitesScanned: report.sitesScanned,
          pagesAnalyzed: report.pagesAnalyzed,
          issuesFound: report.issuesFound,
          issuesFixed: report.issuesFixed,
          issuesPending: report.issuesPending,
          seoScoreChange: report.seoScoreChange || 0,
          estimatedTrafficImpact: report.estimatedTrafficImpact || 0,
          fixesApplied: result.fixesApplied.map(fix => ({
            description: fix.description,
            impact: 'HIGH' // Would be calculated based on fix type
          })),
          pendingApproval: result.pendingApproval.map(fix => ({
            description: fix.description,
            impact: fix.estimatedImpact || 'MEDIUM'
          }))
        }
      )

      if (emailResult.success) {
        // Mark email as sent in the report
        await db.dailyReport.update({
          where: { id: report.id },
          data: { emailSent: true }
        })
        console.log(`✅ Email sent successfully for report ${report.id}`)
      } else {
        console.error(`❌ Failed to send email for report ${report.id}`)
      }
    }
  } catch (error) {
    console.error('Failed to send report email:', error)
    // Don't fail the entire job if email sending fails
  }

  return report
}

/**
 * Create automation snapshot for intelligent rollback
 */
async function createAutomationSnapshot(
  userId: string,
  reportId: string,
  result: AutomationResult
) {
  // Build complete state with all changes
  const completeState = {
    timestamp: new Date().toISOString(),
    sitesScanned: result.sitesScanned,
    pagesAnalyzed: result.pagesAnalyzed,
    issuesFound: result.issuesFound,
    issuesFixed: result.issuesFixed,
    issuesPending: result.issuesPending,
    imagesOptimized: result.imagesOptimized,
    fixesApplied: result.fixesApplied,
    pendingApproval: result.pendingApproval,
    activitiesPerformed: result.activitiesPerformed
  }

  // Build per-site snapshots with detailed before/after states
  const siteSnapshots = result.siteReports.map(siteReport => ({
    siteUrl: siteReport.siteUrl,
    platform: siteReport.platform,
    activities: siteReport.activities,
    metrics: siteReport.metrics,
    discoveredData: siteReport.discoveredData,
    changes: result.fixesApplied
      .filter(fix => fix.siteUrl === siteReport.siteUrl)
      .map(fix => ({
        fixId: fix.fixId,
        description: fix.description,
        type: fix.type,
        before: fix.before,
        after: fix.after
      })),
    errors: siteReport.errors
  }))

  // Set rollback expiry to 90 days from now
  const rollbackExpiry = new Date()
  rollbackExpiry.setDate(rollbackExpiry.getDate() + 90)

  // Create snapshot
  await db.automationSnapshot.create({
    data: {
      userId,
      reportId,
      snapshotType: 'DAILY_AUTOMATION',
      description: `Daily automation run on ${new Date().toLocaleDateString()}`,
      completeState: JSON.stringify(completeState),
      siteSnapshots: JSON.stringify(siteSnapshots),
      canRollback: true,
      rollbackExpiry,
      sitesAffected: result.sitesScanned,
      fixesApplied: result.issuesFixed,
      imagesOptimized: result.imagesOptimized
    }
  })

  console.log(`Created automation snapshot for report ${reportId}`)
}

/**
 * Complete automation job with results
 */
async function completeJob(jobId: string, result: AutomationResult) {
  await db.job.update({
    where: { id: jobId },
    data: {
      status: 'COMPLETED',
      progress: 100,
      completedAt: new Date(),
      result: JSON.stringify(result)
    }
  })
}

/**
 * Schedule daily automation for all eligible users
 */
export async function scheduleDailyAutomations() {
  console.log('Scheduling daily automations...')

  // Get all users with daily automation enabled
  const users = await db.user.findMany({
    where: {
      dailyAutomationEnabled: true
    },
    select: {
      id: true,
      email: true,
      dailyAutomationTime: true,
      dailyAutomationTimezone: true,
      lastAutomationRun: true
    }
  })

  console.log(`Found ${users.length} users with automation enabled`)

  const now = new Date()
  let scheduled = 0

  for (const user of users) {
    // Check if automation should run now
    // In production, this would check timezone and schedule properly
    // For now, we'll check if it hasn't run today
    const lastRun = user.lastAutomationRun
    const shouldRun = !lastRun || (
      lastRun.getDate() !== now.getDate() ||
      lastRun.getMonth() !== now.getMonth() ||
      lastRun.getFullYear() !== now.getFullYear()
    )

    if (shouldRun) {
      // Create job
      await db.job.create({
        data: {
          type: 'DAILY_AUTOMATION',
          status: 'PENDING',
          priority: 5,
          payload: JSON.stringify({ userId: user.id }),
          userId: user.id
        }
      })

      scheduled++
      console.log(`Scheduled automation for user ${user.email}`)
    }
  }

  console.log(`Scheduled ${scheduled} daily automations`)
}
