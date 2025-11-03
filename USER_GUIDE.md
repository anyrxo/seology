# SEOLOGY.AI User Guide

Welcome to SEOLOGY.AI - the first platform that automatically fixes SEO issues instead of just reporting them. This guide will help you get started and make the most of the platform.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Connecting Your Site](#connecting-your-site)
3. [Understanding Issues](#understanding-issues)
4. [Execution Modes](#execution-modes)
5. [Managing Fixes](#managing-fixes)
6. [Analytics & Reporting](#analytics--reporting)
7. [Billing & Plans](#billing--plans)
8. [Team Collaboration](#team-collaboration)
9. [Webhooks](#webhooks)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Sign Up

1. Visit [https://seology.ai](https://seology.ai)
2. Click "Get Started" or "Sign Up"
3. Create an account using email or social login (Google, GitHub)
4. Verify your email address

### Onboarding Process

After signing up, you'll be guided through a 7-step onboarding wizard:

1. **Welcome** - Introduction to SEOLOGY.AI
2. **Connect Site** - Link your first website
3. **Scanning** - Wait while we crawl your site
4. **Review Issues** - See detected SEO problems
5. **Execution Mode** - Choose how fixes should be handled
6. **First Fix** - Apply your first SEO fix
7. **Complete** - Start using the dashboard

---

## Connecting Your Site

SEOLOGY.AI supports three types of site connections:

### Shopify

Connect your Shopify store to automatically fix product pages, collections, and content.

**Steps:**

1. Go to **Dashboard > Sites > Connect New Site**
2. Select **Shopify**
3. Enter your Shopify store URL (e.g., `mystore.myshopify.com`)
4. Click **Connect**
5. You'll be redirected to Shopify to authorize the connection
6. Grant the following permissions:
   - Read/Write Products
   - Read/Write Content
   - Read/Write Themes
7. Click **Install App**
8. You'll be redirected back to SEOLOGY.AI

**What We Can Fix on Shopify:**

- Missing or poor meta titles and descriptions
- Missing H1 tags
- Duplicate content
- Broken internal links
- Missing alt text on product images
- Poor structured data (Schema.org)
- 404 errors (via redirects)

### WordPress

Connect your WordPress site using the REST API and Application Passwords.

**Prerequisites:**

- WordPress 5.6+ (Application Passwords support)
- HTTPS enabled on your site
- Admin access to WordPress

**Steps:**

1. Go to **Dashboard > Sites > Connect New Site**
2. Select **WordPress**
3. Generate an Application Password in WordPress:
   - Log in to your WordPress admin
   - Go to **Users > Profile**
   - Scroll to **Application Passwords**
   - Enter "SEOLOGY.AI" as the name
   - Click **Add New Application Password**
   - Copy the generated password (you won't see it again)
4. Back in SEOLOGY.AI:
   - Enter your site URL (e.g., `https://example.com`)
   - Enter your WordPress username
   - Paste the Application Password
5. Click **Connect & Test**

**Optional: Install SEOLOGY.AI Plugin**

For enhanced functionality, install our WordPress plugin:

1. Download from [https://wordpress.org/plugins/seology-ai](https://wordpress.org/plugins/seology-ai)
2. Upload to WordPress via **Plugins > Add New > Upload Plugin**
3. Activate the plugin

**What We Can Fix on WordPress:**

- Missing or poor meta titles and descriptions (via Yoast/RankMath)
- Content quality issues
- Broken links
- 404 errors (via Redirection plugin)
- Image alt text
- Internal linking structure

### Custom Sites (Magic.js)

Connect any website using our universal JavaScript connector.

**Steps:**

1. Go to **Dashboard > Sites > Connect New Site**
2. Select **Custom Site**
3. Enter your site URL and name
4. Copy the Magic.js script snippet:

```html
<script src="https://cdn.seology.ai/magic.js" data-site-id="your-site-id"></script>
```

5. Add the snippet to your website's `<head>` section
6. Click **Verify Installation**

**How Magic.js Works:**

- Fetches pending fixes from SEOLOGY.AI API
- Applies client-side fixes via DOM manipulation
- Reports fix status back to SEOLOGY.AI
- Runs on every page load
- Minimal performance impact (~2KB gzipped)

**What We Can Fix on Custom Sites:**

- Meta tags (title, description, OG tags)
- Heading structure (H1-H6)
- Image alt attributes
- Internal link fixes
- Schema.org structured data
- Canonical URLs

---

## Understanding Issues

### Issue Types

SEOLOGY.AI detects and fixes these common SEO issues:

#### Critical Severity

- **Missing Meta Title** - Page has no title tag
- **Duplicate Meta Title** - Multiple pages share the same title
- **Missing H1** - Page lacks a main heading
- **Broken Links** - Internal links returning 404 errors

#### High Severity

- **Poor Meta Description** - Description too short, too long, or missing
- **Duplicate H1** - Multiple H1 tags on same page
- **Missing Alt Text** - Images without descriptive alt attributes
- **Slow Page Speed** - Page load time exceeds 3 seconds

#### Medium Severity

- **Poor Content Quality** - Thin content (less than 300 words)
- **Missing Structured Data** - No Schema.org markup
- **Broken External Links** - Links to external sites that are dead
- **Missing Canonical Tags** - Duplicate content without proper canonicalization

#### Low Severity

- **Missing OG Tags** - Social media meta tags absent
- **Suboptimal URL Structure** - URLs with special characters or excessive length
- **Missing XML Sitemap** - No sitemap.xml file

### Issue Details

Click any issue to view:

- **Page URL** - Where the issue was found
- **Description** - What the problem is
- **Recommendation** - AI-generated fix suggestion
- **Impact** - How this affects SEO
- **Detected Date** - When we found the issue
- **Current Status** - OPEN, FIXING, FIXED, or IGNORED

### Filtering Issues

Use filters to find specific issues:

- **By Severity** - CRITICAL, HIGH, MEDIUM, LOW
- **By Status** - OPEN, FIXED, IGNORED
- **By Type** - Missing meta, broken links, etc.
- **By Page** - Search for specific URLs

---

## Execution Modes

SEOLOGY.AI offers three ways to handle fixes. Choose the mode that matches your comfort level and workflow.

### AUTOMATIC Mode

**How it works:**

- Fixes are applied immediately without approval
- Best for experienced users who trust AI recommendations
- Fastest way to resolve issues at scale

**When to use:**

- You have confidence in AI-generated fixes
- You want hands-off SEO automation
- Time is more valuable than manual review

**Example Flow:**

1. Issue detected: "Missing meta title on /products/example"
2. AI generates fix: "Example Product | Buy Now at MyStore"
3. Fix applied automatically to your site
4. You receive notification: "Fixed: Missing meta title"
5. Issue marked as FIXED

### PLAN Mode

**How it works:**

- SEOLOGY.AI analyzes all issues and creates a fix plan
- You review the entire plan once
- Approve all fixes with a single click
- All fixes execute in batch

**When to use:**

- You want to review fixes before applying
- You prefer batch operations over individual approvals
- You want to understand all changes at once

**Example Flow:**

1. Multiple issues detected on your site
2. Click "Create Fix Plan"
3. AI generates fixes for all issues
4. You review the plan:
   - 15 fixes ready
   - Estimated time: 5 minutes
   - Preview each fix
5. Click "Approve Plan"
6. All 15 fixes applied automatically
7. You receive summary notification

### APPROVE Mode

**How it works:**

- Each fix requires individual approval
- Maximum control over every change
- Fixes are created but not applied until you approve

**When to use:**

- You want full control over every fix
- You're dealing with sensitive content
- You prefer manual review for compliance reasons

**Example Flow:**

1. Issue detected: "Missing meta description on /about"
2. AI generates fix
3. Fix appears in **Dashboard > Fixes** as PENDING
4. You review the fix:
   - Before: No description
   - After: "Learn about our company mission and values..."
5. Click "Approve Fix"
6. Fix applied to your site
7. Issue marked as FIXED

### Changing Your Execution Mode

1. Go to **Dashboard > Settings**
2. Find **Execution Mode Preference**
3. Select your preferred mode
4. Click **Save Changes**

Your new mode applies to all future fix operations.

---

## Managing Fixes

### Viewing Fixes

All applied and pending fixes are available in **Dashboard > Fixes**.

**Fix Details Include:**

- Issue type and title
- Description of the fix
- Before/after states
- Application date
- Status (PENDING, APPLIED, ROLLED_BACK, FAILED)

### Approving Fixes

**For APPROVE mode:**

1. Go to **Dashboard > Fixes**
2. Filter by **Status: PENDING**
3. Click a fix to review details
4. Preview the changes
5. Click **Approve & Apply**

**For PLAN mode:**

1. Wait for notification: "Fix plan ready"
2. Go to the plan page (link in notification)
3. Review all fixes in the plan
4. Click **Approve All Fixes**
5. Monitor progress as fixes are applied

### Rolling Back Fixes

Made a mistake? Roll back any fix within 90 days.

1. Go to **Dashboard > Fixes**
2. Find the fix you want to undo
3. Click **Rollback**
4. Confirm the rollback

**What happens:**

- Fix status changes to ROLLED_BACK
- Original state is restored to your site
- Associated issue reopens
- You receive a notification

**Limitations:**

- Only works within 90 days of application
- Some fixes cannot be rolled back (e.g., deleted content)
- External changes may conflict with rollback

### Fix History

View complete history of all fixes:

1. Go to **Dashboard > Sites > [Your Site] > History**
2. See timeline of all fixes
3. Filter by date, status, or issue type
4. Export history to CSV

---

## Analytics & Reporting

### Dashboard Overview

The main dashboard shows:

- **Active Issues** - Current SEO problems
- **Fixes Applied** - Total fixes this month
- **Sites Connected** - Number of connected sites
- **Health Score** - Overall SEO health (0-100)

### Site Analytics

View detailed analytics for each site:

1. Go to **Dashboard > Sites > [Site Name] > Analytics**

**Metrics Tracked:**

- **Organic Traffic** - Visitors from search engines
- **Keyword Rankings** - Position changes for tracked keywords
- **Page Speed** - Average load time
- **Issues Trend** - Issues detected/fixed over time
- **Fix Impact** - Before/after traffic comparison

### Performance Tracking

Track SEO improvements over time:

- **Traffic Growth** - Organic traffic increase
- **Ranking Improvements** - Keywords moving up in SERPs
- **Issue Resolution Rate** - Percentage of fixed issues
- **Fix Success Rate** - Percentage of successful fixes

### Exporting Reports

Generate reports for clients or stakeholders:

1. Go to **Dashboard > Analytics > Reports**
2. Select date range
3. Choose report type:
   - Executive Summary
   - Detailed Issue Report
   - Fix Activity Log
   - Performance Report
4. Click **Generate Report**
5. Download as PDF or CSV

---

## Billing & Plans

### Available Plans

| Feature | STARTER | GROWTH | SCALE |
|---------|---------|--------|-------|
| **Price** | $49/mo | $149/mo | $499/mo |
| **Sites** | 3 | 10 | Unlimited |
| **Fixes/Month** | 500 | 5,000 | Unlimited |
| **AI Analysis** | Basic | Advanced | Advanced |
| **Team Members** | 1 | 5 | Unlimited |
| **Support** | Email | Priority | Dedicated |
| **Webhooks** | - | 5 | Unlimited |

### Upgrading Your Plan

1. Go to **Dashboard > Billing**
2. Click **Upgrade Plan**
3. Select your new plan
4. Enter payment details
5. Click **Subscribe**

**What happens:**

- Immediate access to new plan limits
- Prorated billing for current period
- No downtime or service interruption

### Usage Tracking

Monitor your usage in **Dashboard > Billing > Usage**:

- **Sites Used** - X of Y sites connected
- **Fixes This Month** - X of Y fixes applied
- **Usage Trend** - Chart of monthly usage
- **Overage Warnings** - Alerts when approaching limits

### Payment Methods

We accept:

- Credit/Debit Cards (Visa, Mastercard, Amex)
- PayPal
- Wire Transfer (SCALE plan only)

### Billing Portal

Manage your subscription:

1. Go to **Dashboard > Billing**
2. Click **Manage Subscription**
3. Access Stripe Customer Portal:
   - Update payment method
   - View invoices
   - Download receipts
   - Cancel subscription

### Cancellation Policy

You can cancel anytime:

1. Go to **Dashboard > Billing**
2. Click **Manage Subscription**
3. Click **Cancel Subscription**
4. Confirm cancellation

**What happens:**

- Access continues until end of billing period
- No future charges
- Data retained for 90 days
- Can reactivate within 90 days without data loss

---

## Team Collaboration

Invite team members to collaborate on SEO fixes.

### Creating a Team

1. Go to **Dashboard > Teams**
2. Click **Create Team**
3. Enter team name and description
4. Click **Create**

### Inviting Members

1. Go to **Dashboard > Teams > [Team Name]**
2. Click **Invite Member**
3. Enter email address
4. Select role:
   - **Owner** - Full control including billing
   - **Admin** - Manage sites and members
   - **Member** - Apply fixes and view analytics
   - **Viewer** - View-only access
5. Click **Send Invitation**

### Accepting Invitations

Team members receive an email invitation:

1. Click the link in the email
2. Sign in or create an account
3. Accept the invitation
4. Access team sites and resources

### Managing Members

**Change Member Role:**

1. Go to **Dashboard > Teams > [Team Name] > Members**
2. Find the member
3. Click **Change Role**
4. Select new role
5. Click **Save**

**Remove Member:**

1. Go to **Dashboard > Teams > [Team Name] > Members**
2. Find the member
3. Click **Remove**
4. Confirm removal

### Team Sites

Sites can be assigned to teams:

1. Connect a site (or select existing site)
2. Go to **Site Settings**
3. Select **Assign to Team**
4. Choose the team
5. Click **Save**

All team members with appropriate permissions can access the site.

---

## Webhooks

Integrate SEOLOGY.AI with your existing tools using webhooks.

### Creating a Webhook

1. Go to **Dashboard > Settings > Webhooks**
2. Click **Add Webhook**
3. Enter your webhook URL
4. Select events to receive:
   - `fix.applied` - Fix successfully applied
   - `fix.failed` - Fix application failed
   - `issue.detected` - New issue found
   - `site.analyzed` - Site analysis completed
5. Click **Create Webhook**
6. Copy the webhook secret (for signature verification)

### Webhook Payload

Each webhook request includes:

```json
{
  "event": "fix.applied",
  "timestamp": "2025-11-03T12:00:00Z",
  "data": {
    "fixId": "uuid",
    "issueId": "uuid",
    "siteId": "uuid",
    "issueType": "missing_meta_title",
    "issueTitle": "Missing Meta Title",
    "status": "APPLIED"
  }
}
```

### Verifying Webhook Signatures

All webhooks include an `X-Signature` header for security:

```javascript
const crypto = require('crypto')

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

// Express.js example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-signature']
  const payload = JSON.stringify(req.body)

  if (!verifySignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature')
  }

  // Process webhook
  console.log('Received event:', req.body.event)
  res.status(200).send('OK')
})
```

### Testing Webhooks

1. Go to **Dashboard > Settings > Webhooks**
2. Click on a webhook
3. Click **Send Test Event**
4. Check your endpoint received the test payload

### Webhook Failures

If your endpoint fails to respond:

- We retry up to 3 times with exponential backoff
- After 10 consecutive failures, the webhook is disabled
- You receive an email notification
- Re-enable in **Dashboard > Settings > Webhooks**

---

## Troubleshooting

### Site Connection Issues

**Shopify: "Failed to connect to store"**

- Verify your store URL is correct (include `.myshopify.com`)
- Ensure you have admin access to the store
- Check that third-party app installation is enabled
- Try disconnecting and reconnecting

**WordPress: "Authentication failed"**

- Verify HTTPS is enabled on your site
- Check WordPress version is 5.6 or higher
- Regenerate Application Password and try again
- Ensure REST API is not disabled
- Check for conflicting security plugins

**Custom Site: "Magic.js not detected"**

- Verify the script is in your `<head>` section
- Check browser console for errors
- Ensure site ID in script matches your dashboard
- Clear browser cache and try again
- Test with `curl https://yoursite.com | grep "magic.js"`

### Fix Application Errors

**"Fix failed to apply"**

- Check site connection status is CONNECTED
- Verify you have necessary permissions (Shopify/WordPress)
- Review error message in fix details
- Try rolling back and reapplying
- Contact support with fix ID

**"Usage limit exceeded"**

- You've reached your monthly fix quota
- Upgrade your plan for more fixes
- Wait until next billing cycle for quota reset
- Check **Dashboard > Billing > Usage** for details

### Performance Issues

**"Site analysis taking too long"**

- Large sites (1000+ pages) take longer to crawl
- Check **Dashboard > Jobs** for progress
- If stuck for over 1 hour, contact support

**"Dashboard loading slowly"**

- Clear browser cache
- Try a different browser
- Check your internet connection
- Disable browser extensions
- Contact support if issue persists

### Account & Billing

**"Payment failed"**

- Verify card details are correct
- Check card has sufficient funds
- Try a different payment method
- Contact your bank
- Email billing@seology.ai

**"Can't log in"**

- Check email address is correct
- Try password reset
- Clear browser cookies
- Check email for verification link
- Contact support@seology.ai

### Getting Help

**Documentation:**
- [API Reference](./API_REFERENCE.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- Video tutorials: https://seology.ai/tutorials

**Contact Support:**
- Email: support@seology.ai
- Live Chat: Available in dashboard (GROWTH/SCALE plans)
- Response time:
  - STARTER: 24 hours
  - GROWTH: 8 hours
  - SCALE: 2 hours

**Community:**
- Discord: https://discord.gg/seology
- Community Forum: https://community.seology.ai
- Twitter: @seology_ai

---

## Best Practices

### For Best Results

1. **Start with PLAN mode** - Review fixes before auto-applying
2. **Monitor analytics** - Track improvements weekly
3. **Fix high-severity issues first** - Prioritize critical problems
4. **Test after fixes** - Verify changes didn't break functionality
5. **Use rollback if needed** - Don't hesitate to undo mistakes

### Security Tips

1. **Keep credentials secure** - Don't share API keys or passwords
2. **Use Application Passwords** - For WordPress (not main password)
3. **Monitor audit logs** - Review activity in **Dashboard > Logs**
4. **Enable 2FA** - Add extra security to your account
5. **Verify webhook signatures** - Prevent unauthorized requests

### Optimization Tips

1. **Connect sites strategically** - Group related sites in teams
2. **Set up webhooks** - Integrate with your workflow tools
3. **Review weekly reports** - Stay informed on progress
4. **Ignore irrelevant issues** - Focus on what matters
5. **Upgrade when needed** - Don't let limits slow you down

---

## Glossary

- **Execution Mode** - How fixes are handled (AUTOMATIC, PLAN, APPROVE)
- **Magic.js** - Universal JavaScript connector for custom sites
- **Fix Plan** - Batch of proposed fixes awaiting approval
- **Rollback** - Undo a fix and restore previous state
- **Application Password** - WordPress credential for REST API access
- **Webhook** - HTTP callback for real-time event notifications
- **Health Score** - Overall SEO health rating (0-100)
- **Organic Traffic** - Website visitors from search engines

---

**Need more help?** Contact us at support@seology.ai or visit our [Help Center](https://help.seology.ai).
