import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export interface SEOIssue {
  type: string
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  pageUrl: string
  title: string
  description: string
  recommendation: string
  fixCode?: string
}

export interface SEOAnalysisResult {
  issues: SEOIssue[]
  summary: {
    totalIssues: number
    criticalIssues: number
    highIssues: number
    mediumIssues: number
    lowIssues: number
  }
  recommendations: string[]
}

/**
 * Analyze a website for SEO issues using Claude AI
 */
export async function analyzeSiteForSEO(
  siteUrl: string,
  pageContent: string,
  platform: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM'
): Promise<SEOAnalysisResult> {
  const prompt = `You are an expert SEO analyzer. Analyze the following website content and identify SEO issues.

Website URL: ${siteUrl}
Platform: ${platform}

Page Content:
${pageContent.substring(0, 50000)} // Limit content to avoid token limits

Please analyze this page and provide:
1. A list of SEO issues found (missing meta tags, broken links, missing alt text, poor heading structure, etc.)
2. Severity level for each issue (CRITICAL, HIGH, MEDIUM, LOW)
3. Specific recommendations for fixing each issue
4. If possible, provide the exact code/fix to apply

Format your response as a JSON object with this structure:
{
  "issues": [
    {
      "type": "missing_meta_description",
      "severity": "HIGH",
      "pageUrl": "${siteUrl}",
      "title": "Missing Meta Description",
      "description": "The page is missing a meta description tag",
      "recommendation": "Add a meta description tag with 150-160 characters",
      "fixCode": "<meta name=\\"description\\" content=\\"Your description here\\">"
    }
  ],
  "recommendations": [
    "Overall recommendation 1",
    "Overall recommendation 2"
  ]
}`

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  // Extract JSON from Claude's response
  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const responseText = content.text

  // Try to extract JSON from response (Claude might wrap it in markdown code blocks)
  let jsonText = responseText
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  }

  const analysisData = JSON.parse(jsonText) as {
    issues: SEOIssue[]
    recommendations: string[]
  }

  // Calculate summary
  const summary = {
    totalIssues: analysisData.issues.length,
    criticalIssues: analysisData.issues.filter((i) => i.severity === 'CRITICAL').length,
    highIssues: analysisData.issues.filter((i) => i.severity === 'HIGH').length,
    mediumIssues: analysisData.issues.filter((i) => i.severity === 'MEDIUM').length,
    lowIssues: analysisData.issues.filter((i) => i.severity === 'LOW').length,
  }

  return {
    issues: analysisData.issues,
    summary,
    recommendations: analysisData.recommendations,
  }
}

/**
 * Generate a fix plan for a specific SEO issue
 */
export async function generateFixPlan(
  issue: {
    type: string
    severity: string
    pageUrl: string
    description: string
  },
  platform: 'SHOPIFY' | 'WORDPRESS' | 'WIX' | 'CUSTOM',
  currentContent?: string
): Promise<{
  fixDescription: string
  fixCode: string
  steps: string[]
}> {
  const prompt = `You are an expert SEO fix generator for ${platform} websites.

Issue to fix:
- Type: ${issue.type}
- Severity: ${issue.severity}
- Page: ${issue.pageUrl}
- Description: ${issue.description}

${currentContent ? `Current content:\n${currentContent.substring(0, 10000)}` : ''}

Generate a detailed fix plan that includes:
1. A clear description of what needs to be fixed
2. The exact code/changes to apply (platform-specific)
3. Step-by-step instructions

Format your response as JSON:
{
  "fixDescription": "Clear description of the fix",
  "fixCode": "Exact code or configuration to apply",
  "steps": ["Step 1", "Step 2", "Step 3"]
}`

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude')
  }

  const responseText = content.text

  // Try to extract JSON from response
  let jsonText = responseText
  const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  }

  return JSON.parse(jsonText) as {
    fixDescription: string
    fixCode: string
    steps: string[]
  }
}
