/**
 * Email Service
 * Send transactional emails using Resend
 */

import { Resend } from 'resend'
import { db } from './db'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_for_build')

const FROM_EMAIL = 'SEOLOGY.AI <noreply@seology.ai>'
const FROM_NAME = 'SEOLOGY.AI'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions) {
  try {
    const { to, subject, html, text } = options

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text: text || stripHtml(html),
    })

    console.log('Email sent:', result)
    return { success: true, id: result.data?.id }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(userId: string, email: string, name?: string) {
  const userName = name || 'there'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SEOLOGY.AI</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to SEOLOGY.AI! 🚀</h1>
  </div>

  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px; margin-bottom: 20px;">Hi ${userName},</p>

    <p style="margin-bottom: 20px;">
      Thank you for joining <strong>SEOLOGY.AI</strong> - the world's first AI-powered SEO platform that actually <em>fixes</em> your SEO issues instead of just reporting them!
    </p>

    <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="margin-top: 0; color: #667eea;">What's Next?</h3>
      <ol style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 10px;">Connect your first website (Shopify, WordPress, or any site)</li>
        <li style="margin-bottom: 10px;">Let Claude AI scan and analyze your SEO</li>
        <li style="margin-bottom: 10px;">Watch as issues get fixed automatically</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/onboarding"
         style="display: inline-block; background: #667eea; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Start Your Onboarding →
      </a>
    </div>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 6px; margin: 30px 0;">
      <h4 style="margin-top: 0; color: #1e40af;">🎁 Your Free Trial Includes:</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>500 SEO fixes per month</li>
        <li>Up to 3 websites</li>
        <li>Claude AI analysis</li>
        <li>90-day rollback window</li>
        <li>Email support</li>
      </ul>
    </div>

    <p style="margin-top: 30px;">
      If you have any questions, just reply to this email - we're here to help!
    </p>

    <p style="margin-top: 20px;">
      Best regards,<br>
      <strong>The SEOLOGY.AI Team</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
    <p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color: #667eea; text-decoration: none;">Dashboard</a> •
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" style="color: #667eea; text-decoration: none;">Pricing</a> •
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings" style="color: #667eea; text-decoration: none;">Settings</a>
    </p>
    <p style="margin-top: 10px; color: #999;">
      SEOLOGY.AI - AI That Fixes Your SEO, Not Just Reports It
    </p>
  </div>
</body>
</html>
`

  await sendEmail({
    to: email,
    subject: 'Welcome to SEOLOGY.AI! 🚀',
    html,
  })

  // Create audit log
  await db.auditLog.create({
    data: {
      userId,
      action: 'EMAIL_SENT',
      resource: 'email',
      details: JSON.stringify({ type: 'welcome', to: email }),
    },
  })
}

/**
 * Send fix applied notification
 */
export async function sendFixAppliedEmail(
  userId: string,
  email: string,
  siteName: string,
  issueTitle: string,
  fixDescription: string
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO Fix Applied</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #10b981; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">✅ SEO Fix Applied</h1>
  </div>

  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">
      Good news! SEOLOGY.AI has successfully fixed an SEO issue on <strong>${siteName}</strong>.
    </p>

    <div style="background: white; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="margin-top: 0; color: #10b981;">Issue Fixed</h3>
      <p style="margin: 0; font-size: 18px; font-weight: 600; color: #111;">${issueTitle}</p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; margin: 20px 0;">
      <h4 style="margin-top: 0;">What Changed:</h4>
      <p style="margin: 0;">${fixDescription}</p>
    </div>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      💡 <strong>Tip:</strong> You can roll back this fix within 90 days if needed.
    </p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/sites"
         style="display: inline-block; background: #667eea; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        View All Fixes →
      </a>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Sent by SEOLOGY.AI - Automated SEO Fixes</p>
  </div>
</body>
</html>
`

  await sendEmail({
    to: email,
    subject: `✅ SEO Fix Applied: ${issueTitle}`,
    html,
  })
}

/**
 * Send usage limit warning
 */
export async function sendUsageLimitWarningEmail(
  userId: string,
  email: string,
  limitType: string,
  percentUsed: number,
  currentPlan: string
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Usage Limit Warning</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f59e0b; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">⚠️ Usage Limit Warning</h1>
  </div>

  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">
      You've used <strong>${Math.round(percentUsed)}%</strong> of your monthly ${limitType} quota on your <strong>${currentPlan}</strong> plan.
    </p>

    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0; color: #92400e;">
        To avoid interruptions in your SEO automation, consider upgrading to a higher plan.
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing"
         style="display: inline-block; background: #667eea; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        View Upgrade Options →
      </a>
    </div>

    <p style="color: #666; font-size: 14px;">
      Your usage will automatically reset at the beginning of next month.
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Sent by SEOLOGY.AI</p>
  </div>
</body>
</html>
`

  await sendEmail({
    to: email,
    subject: `⚠️ You've used ${Math.round(percentUsed)}% of your ${limitType} quota`,
    html,
  })
}

/**
 * Send plan upgrade confirmation
 */
export async function sendPlanUpgradeEmail(
  userId: string,
  email: string,
  oldPlan: string,
  newPlan: string
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plan Upgraded</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 32px;">🎉 Plan Upgraded!</h1>
  </div>

  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">
      Your plan has been successfully upgraded from <strong>${oldPlan}</strong> to <strong>${newPlan}</strong>!
    </p>

    <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; margin: 30px 0;">
      <h3 style="margin-top: 0; color: #667eea;">Your New Benefits:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        ${newPlan === 'GROWTH' ? `
        <li>Up to 10 sites (was 3)</li>
        <li>5,000 fixes per month (was 500)</li>
        <li>Priority support</li>
        <li>Advanced analytics</li>
        <li>Custom fix rules</li>
        <li>API access</li>
        ` : `
        <li>Unlimited sites</li>
        <li>Unlimited fixes</li>
        <li>Dedicated account manager</li>
        <li>White-label options</li>
        <li>SLA guarantee</li>
        <li>Phone support</li>
        `}
      </ul>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
         style="display: inline-block; background: #667eea; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        Go to Dashboard →
      </a>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Sent by SEOLOGY.AI</p>
  </div>
</body>
</html>
`

  await sendEmail({
    to: email,
    subject: `🎉 Your plan has been upgraded to ${newPlan}`,
    html,
  })
}

/**
 * Send monthly summary email
 */
export async function sendMonthlySummaryEmail(
  userId: string,
  email: string,
  stats: {
    fixesApplied: number
    issuesDetected: number
    sitesConnected: number
    topIssueType: string
  }
) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Your Monthly SEO Summary</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">📊 Your Monthly SEO Summary</h1>
  </div>

  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Here's what SEOLOGY.AI accomplished for you this month:</p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
      <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="font-size: 36px; font-weight: 700; color: #10b981;">${stats.fixesApplied}</div>
        <div style="color: #666; font-size: 14px;">Fixes Applied</div>
      </div>
      <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="font-size: 36px; font-weight: 700; color: #f59e0b;">${stats.issuesDetected}</div>
        <div style="color: #666; font-size: 14px;">Issues Detected</div>
      </div>
    </div>

    <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb; margin: 20px 0;">
      <p style="margin: 0; color: #666;">
        <strong>Most Common Issue:</strong> ${stats.topIssueType}
      </p>
      <p style="margin: 10px 0 0 0; color: #666;">
        <strong>Active Sites:</strong> ${stats.sitesConnected}
      </p>
    </div>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics"
         style="display: inline-block; background: #667eea; color: white; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        View Detailed Analytics →
      </a>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>Sent by SEOLOGY.AI</p>
  </div>
</body>
</html>
`

  await sendEmail({
    to: email,
    subject: `📊 Your SEOLOGY.AI Monthly Summary - ${stats.fixesApplied} fixes applied`,
    html,
  })
}

/**
 * Send daily automation report email
 */
export async function sendDailyReportEmail(
  userId: string,
  email: string,
  report: {
    id: string
    date: string
    executionMode: string
    sitesScanned: number
    pagesAnalyzed: number
    issuesFound: number
    issuesFixed: number
    issuesPending: number
    seoScoreChange: number
    estimatedTrafficImpact: number
    fixesApplied: Array<{
      description: string
      impact: string
    }>
    pendingApproval: Array<{
      description: string
      impact: string
    }>
  }
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://seology.ai'
  const reportUrl = `${baseUrl}/dashboard/reports/${report.id}`

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEOLOGY.AI Daily Report - ${formatDate(report.date)}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; color: #1f2937;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                SEOLOGY<span style="color: #60a5fa;">.AI</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                Daily Automation Report
              </p>
            </td>
          </tr>

          <!-- Date Banner -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; border-bottom: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Report Date</p>
              <h2 style="margin: 5px 0 0 0; color: #111827; font-size: 20px; font-weight: 600;">
                ${formatDate(report.date)}
              </h2>
              <span style="display: inline-block; margin-top: 8px; padding: 4px 12px; background-color: ${
                report.executionMode === 'AUTOMATIC' ? '#d1fae5' :
                report.executionMode === 'PLAN' ? '#dbeafe' : '#fed7aa'
              }; color: ${
                report.executionMode === 'AUTOMATIC' ? '#065f46' :
                report.executionMode === 'PLAN' ? '#1e40af' : '#92400e'
              }; border-radius: 6px; font-size: 12px; font-weight: 600;">
                ${report.executionMode} MODE
              </span>
            </td>
          </tr>

          <!-- Metrics Grid -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" style="padding: 15px; text-align: center; background-color: #eff6ff; border-radius: 8px;">
                    <p style="margin: 0; color: #60a5fa; font-size: 32px; font-weight: bold;">
                      ${report.sitesScanned}
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                      Sites Scanned
                    </p>
                  </td>
                  <td width="10"></td>
                  <td width="50%" style="padding: 15px; text-align: center; background-color: #f0fdf4; border-radius: 8px;">
                    <p style="margin: 0; color: #22c55e; font-size: 32px; font-weight: bold;">
                      ${report.pagesAnalyzed}
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                      Pages Analyzed
                    </p>
                  </td>
                </tr>
                <tr><td colspan="3" height="10"></td></tr>
                <tr>
                  <td width="50%" style="padding: 15px; text-align: center; background-color: #fef3c7; border-radius: 8px;">
                    <p style="margin: 0; color: #f59e0b; font-size: 32px; font-weight: bold;">
                      ${report.issuesFound}
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                      Issues Found
                    </p>
                  </td>
                  <td width="10"></td>
                  <td width="50%" style="padding: 15px; text-align: center; background-color: ${
                    report.issuesFixed > 0 ? '#dcfce7' : '#fee2e2'
                  }; border-radius: 8px;">
                    <p style="margin: 0; color: ${
                      report.issuesFixed > 0 ? '#16a34a' : '#dc2626'
                    }; font-size: 32px; font-weight: bold;">
                      ${report.issuesFixed}
                    </p>
                    <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                      Issues Fixed
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${report.estimatedTrafficImpact > 0 ? `
          <!-- Traffic Impact Banner -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                  Estimated Traffic Impact
                </p>
                <p style="margin: 8px 0 0 0; color: #ffffff; font-size: 36px; font-weight: bold;">
                  +${report.estimatedTrafficImpact}%
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          ${report.seoScoreChange !== 0 ? `
          <!-- SEO Score Change -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: ${report.seoScoreChange > 0 ? '#d1fae5' : '#fee2e2'}; padding: 20px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  SEO Score Change
                </p>
                <p style="margin: 8px 0 0 0; color: ${report.seoScoreChange > 0 ? '#065f46' : '#991b1b'}; font-size: 28px; font-weight: bold;">
                  ${report.seoScoreChange > 0 ? '+' : ''}${report.seoScoreChange}
                </p>
              </div>
            </td>
          </tr>
          ` : ''}

          ${report.fixesApplied.length > 0 ? `
          <!-- Fixes Applied -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">
                ✅ Fixes Applied (${report.fixesApplied.length})
              </h3>
              ${report.fixesApplied.slice(0, 5).map(fix => `
                <div style="background-color: #f9fafb; padding: 12px 15px; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #10b981;">
                  <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 500;">
                    ${fix.description}
                  </p>
                  <span style="display: inline-block; margin-top: 6px; padding: 2px 8px; background-color: #d1fae5; color: #065f46; border-radius: 4px; font-size: 11px; font-weight: 600;">
                    ${fix.impact}
                  </span>
                </div>
              `).join('')}
              ${report.fixesApplied.length > 5 ? `
                <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 13px; text-align: center;">
                  + ${report.fixesApplied.length - 5} more fixes
                </p>
              ` : ''}
            </td>
          </tr>
          ` : ''}

          ${report.pendingApproval.length > 0 ? `
          <!-- Pending Approval -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 15px 0; color: #111827; font-size: 18px; font-weight: 600;">
                ⏳ Pending Your Approval (${report.pendingApproval.length})
              </h3>
              ${report.pendingApproval.slice(0, 3).map(fix => `
                <div style="background-color: #fef3c7; padding: 12px 15px; border-radius: 6px; margin-bottom: 8px; border-left: 3px solid #f59e0b;">
                  <p style="margin: 0; color: #111827; font-size: 14px; font-weight: 500;">
                    ${fix.description}
                  </p>
                  <span style="display: inline-block; margin-top: 6px; padding: 2px 8px; background-color: #fed7aa; color: #92400e; border-radius: 4px; font-size: 11px; font-weight: 600;">
                    ${fix.impact}
                  </span>
                </div>
              `).join('')}
              ${report.pendingApproval.length > 3 ? `
                <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 13px; text-align: center;">
                  + ${report.pendingApproval.length - 3} more pending
                </p>
              ` : ''}
            </td>
          </tr>
          ` : ''}

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 30px 40px 30px; text-align: center;">
              <a href="${reportUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                View Full Report
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                This report was automatically generated by SEOLOGY.AI
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                <a href="${baseUrl}/dashboard/settings" style="color: #3b82f6; text-decoration: none;">Update Email Preferences</a> •
                <a href="${baseUrl}/dashboard/reports" style="color: #3b82f6; text-decoration: none;">View All Reports</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
SEOLOGY.AI Daily Automation Report
${formatDate(report.date)}

Summary:
- Sites Scanned: ${report.sitesScanned}
- Pages Analyzed: ${report.pagesAnalyzed}
- Issues Found: ${report.issuesFound}
- Issues Fixed: ${report.issuesFixed}
- Issues Pending: ${report.issuesPending}

${report.seoScoreChange !== 0 ? `SEO Score Change: ${report.seoScoreChange > 0 ? '+' : ''}${report.seoScoreChange}\n` : ''}
${report.estimatedTrafficImpact > 0 ? `Estimated Traffic Impact: +${report.estimatedTrafficImpact}%\n` : ''}

View the full report at: ${reportUrl}

---
SEOLOGY.AI - Automated SEO Fixes
  `

  const result = await sendEmail({
    to: email,
    subject: `📊 Daily SEO Report - ${report.issuesFixed} fixes applied`,
    html,
    text,
  })

  // Create audit log
  if (result.success) {
    await db.auditLog.create({
      data: {
        userId,
        action: 'EMAIL_SENT',
        resource: 'email',
        details: JSON.stringify({
          type: 'daily_report',
          reportId: report.id,
          to: email,
        }),
      },
    })
  }

  return result
}

/**
 * Strip HTML tags for plain text version
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>.*<\/style>/gm, '')
    .replace(/<script[^>]*>.*<\/script>/gm, '')
    .replace(/<[^>]+>/gm, '')
    .replace(/\s\s+/g, ' ')
    .trim()
}
