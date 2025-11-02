/**
 * Analyze Site Job
 *
 * Uses Claude AI to analyze a site for SEO issues
 */

import { db } from '../db'
import { analyzeSiteForSEO } from '../claude'

interface AnalysisJobData {
  connectionId?: string
  url?: string
  pageContent?: string
  platform?: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM'
}

export async function analyzeSiteJob(job: { data: AnalysisJobData }) {
  const { connectionId, url, pageContent, platform } = job.data

  if (!url || !pageContent || !platform) {
    throw new Error('Missing required data for analysis')
  }

  console.log(`Starting analysis for ${url}`)

  try {
    // Analyze with Claude AI
    const result = await analyzeSiteForSEO(url, pageContent, platform)

    console.log(`✓ Analysis completed for ${url}: ${result.issues.length} issues found`)
  } catch (error) {
    console.error(`Analysis failed for ${url}:`, error)
    throw error
  }
}
