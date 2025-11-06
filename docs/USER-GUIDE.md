# SEOLOGY.AI - User Guide

Welcome to SEOLOGY.AI, the first Shopify SEO app that automatically fixes SEO issues instead of just reporting them.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Execution Modes](#execution-modes)
4. [Product Analysis](#product-analysis)
5. [Fixing SEO Issues](#fixing-seo-issues)
6. [AI Agents](#ai-agents)
7. [Timeline & Rollback](#timeline--rollback)
8. [Analytics & Usage](#analytics--usage)
9. [Settings](#settings)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Installing the App

1. Visit the Shopify App Store
2. Search for "SEOLOGY.AI"
3. Click "Add app"
4. Review permissions and click "Install app"
5. You'll be redirected to complete onboarding

### Onboarding Walkthrough

After installation, you'll go through a 5-step onboarding:

**Step 1: Welcome**
- Introduction to SEOLOGY.AI
- Overview of what the app does

**Step 2: Choose Execution Mode**
- Select how fixes are applied (see [Execution Modes](#execution-modes))
- This can be changed later in Settings

**Step 3: Initial Scan**
- SEOLOGY scans your products
- This may take a few minutes depending on your catalog size

**Step 4: Review First Issues**
- See a preview of detected SEO problems
- Understand issue severity levels

**Step 5: Apply First Fix**
- Walk through applying your first fix
- Learn about rollback capability

After onboarding, you'll land on the main dashboard.

---

## Dashboard Overview

The dashboard gives you a bird's-eye view of your store's SEO health.

### Key Metrics

**Total Products**
- Number of products in your store
- Products analyzed by SEOLOGY

**SEO Score**
- Overall store SEO health (0-100)
- Based on products, meta tags, images, and structured data

**Issues Found**
- Total number of SEO issues detected
- Breakdown by severity (Critical, High, Medium, Low)

**Issues Fixed**
- Number of fixes applied
- Success rate

**Pending Approvals** (PLAN/APPROVE modes only)
- Fixes awaiting your approval
- Quick approve/reject actions

### Recent Activity

Shows your latest SEO improvements:
- Fixes applied
- Issues detected
- Agent executions
- Checkpoints created

### Top Issues

Highlights the most common SEO problems:
- Missing meta descriptions
- Short product titles
- Images without alt text
- Missing structured data

Click any issue type to see affected products.

---

## Execution Modes

SEOLOGY offers three execution modes to match your workflow.

### Automatic Mode

**How it works**:
- SEOLOGY analyzes products automatically
- Fixes are applied immediately without approval
- Daily automation runs in the background
- You get a summary report each morning

**Best for**:
- Store owners who trust AI completely
- Busy merchants who want hands-off SEO
- Stores with consistent product formats

**Settings**:
- Enable/disable daily automation
- Set automation time (e.g., 9:00 AM)
- Choose report delivery (email, dashboard, both)

**Example workflow**:
1. SEOLOGY scans products every 6 hours
2. Detects missing meta description on "Yoga Mat"
3. Claude AI generates optimized description
4. Fix is applied automatically to Shopify
5. You receive a notification of the change

### Plan Mode

**How it works**:
- SEOLOGY analyzes all products
- Creates a comprehensive fix plan
- You review the entire plan at once
- Approve to apply all fixes together

**Best for**:
- Store owners who want control but not micromanagement
- Monthly SEO optimization cycles
- Bulk optimizations before campaigns

**Settings**:
- Plan generation frequency
- Minimum issues to trigger plan
- Auto-approve low-severity fixes

**Example workflow**:
1. SEOLOGY analyzes 100 products
2. Finds 250 issues across all products
3. Creates a plan: "SEO Optimization Plan - November 7"
4. You review: 150 fixes, estimated 25% traffic increase
5. Click "Approve Plan"
6. All 150 fixes apply in batches
7. Timeline checkpoint created for rollback

### Approve Mode

**How it works**:
- SEOLOGY detects issues individually
- Each fix requires manual approval
- You review before any changes
- Perfect for maximum control

**Best for**:
- New users learning SEO
- Stores with strict brand guidelines
- High-value products requiring manual review

**Settings**:
- Auto-approve specific issue types
- Batch approve similar fixes
- Set approval expiration (auto-reject after X days)

**Example workflow**:
1. SEOLOGY detects missing alt text on product image
2. Claude AI generates suggested alt text
3. You receive notification
4. Review suggestion in Pending Fixes
5. Click "Approve" or "Reject"
6. If approved, fix applies to Shopify

### Changing Execution Mode

1. Go to Settings
2. Select "Execution Mode"
3. Choose your preferred mode
4. Click "Save"

**Note**: Changing mode only affects future fixes, not pending ones.

---

## Product Analysis

### Viewing Products

Navigate to **Products** to see your catalog:

- Product thumbnail and title
- SEO score (0-100, color-coded)
- Issue count by severity
- Last analyzed timestamp
- Quick actions (Analyze, View Issues, Fix)

### Sorting & Filtering

**Sort by**:
- SEO Score (low to high to prioritize fixes)
- Title (alphabetically)
- Created Date (newest first)
- Last Analyzed (recently updated)

**Filter by**:
- Low Score (< 50)
- Missing Alt Text
- No Meta Description
- Critical Issues Only

### Analyzing a Product

Click **Analyze** on any product to run a deep SEO analysis:

**What's Analyzed**:
1. **Meta Tags**
   - Title tag (length, keywords, uniqueness)
   - Meta description (length, call-to-action, keywords)
   - Canonical URLs

2. **Content Quality**
   - Product title optimization
   - Description length and readability
   - Keyword usage
   - Heading structure

3. **Images**
   - Alt text presence and quality
   - Image file names
   - Image size and optimization

4. **Structured Data**
   - Product schema.org markup
   - Price availability
   - Review snippets

5. **Technical SEO**
   - URL structure
   - Internal linking
   - Mobile optimization

**Analysis Results**:

After ~5-10 seconds, you'll see:

- **SEO Score**: Overall rating (0-100)
- **Issues Found**: Categorized by severity
- **Strengths**: What's working well
- **Opportunities**: Potential improvements
- **Suggested Fixes**: AI-generated recommendations

### Understanding SEO Scores

**90-100 (Excellent)**
- Fully optimized, no critical issues
- Minor improvements possible

**70-89 (Good)**
- Solid SEO foundation
- Some optimization opportunities

**50-69 (Needs Improvement)**
- Multiple issues present
- Significant traffic potential unlocked by fixes

**Below 50 (Poor)**
- Critical SEO problems
- Immediate attention recommended

---

## Fixing SEO Issues

### Issue Types

SEOLOGY detects 20+ SEO issue types:

**Critical Issues** (fix immediately):
- Missing meta descriptions
- Duplicate meta titles
- Missing product titles
- Broken internal links

**High Priority**:
- Short titles (< 50 characters)
- Short descriptions (< 100 characters)
- Images without alt text
- Missing structured data

**Medium Priority**:
- Non-optimized titles (no keywords)
- Weak call-to-action in descriptions
- Image file names not descriptive
- Missing canonical tags

**Low Priority**:
- Title too long (> 60 characters)
- Description too long (> 160 characters)
- Keyword density suboptimal

### Applying Fixes

#### In Automatic Mode:

Fixes apply automatically. You can:
- View applied fixes in Reports
- Rollback any fix within 90 days
- Disable automation for specific products

#### In Plan Mode:

1. Navigate to **Pending Fixes**
2. Review the generated plan
3. See estimated impact: "25% traffic increase"
4. Expand to view individual fixes
5. Click **Approve Plan** or **Reject Plan**
6. If approved, fixes apply in batches
7. Progress bar shows real-time status

#### In Approve Mode:

1. Navigate to **Pending Fixes**
2. Review each fix individually:
   - Product affected
   - Issue type
   - Current value (Before)
   - Suggested value (After)
   - AI reasoning

3. Actions:
   - **Approve**: Apply this fix
   - **Reject**: Dismiss without applying
   - **Edit**: Modify AI suggestion before applying
   - **Approve All Similar**: Batch approve same issue type

4. After approval, fix applies within seconds

### Batch Operations

Save time with batch actions:

**Batch Approve**:
1. Select multiple pending fixes
2. Click "Approve Selected"
3. All selected fixes apply together

**Auto-approve Rules**:
1. Go to Settings → Approval Rules
2. Set auto-approve for specific issues:
   - "Auto-approve all alt text suggestions"
   - "Auto-approve meta descriptions for products with score < 50"
3. Save rules
4. Future fixes matching rules apply automatically

### Fix Validation

Before applying, SEOLOGY validates:
- Character limits (titles, descriptions)
- Shopify field restrictions
- Duplicate detection
- HTML/special character sanitization

If validation fails, you'll see an error with instructions to fix.

---

## AI Agents

SEOLOGY includes a powerful AI agent system for specialized SEO tasks.

### Pre-built Agents

**1. Title Optimizer**
- Specialty: Product title optimization
- What it does: Rewrites titles for keyword placement, length, and appeal
- Best for: Bulk title improvements

**2. Meta Description Master**
- Specialty: Compelling meta descriptions
- What it does: Creates engaging descriptions with CTAs
- Best for: Improving click-through rates

**3. Alt Text Generator**
- Specialty: Image accessibility and SEO
- What it does: Uses Claude Vision to describe images
- Best for: Large catalogs with missing alt text

**4. Schema.org Wizard**
- Specialty: Structured data
- What it does: Generates Product schema JSON-LD
- Best for: Rich snippet optimization

**5. Comprehensive SEO Auditor**
- Specialty: Full product audits
- What it does: Analyzes all SEO aspects, provides report
- Best for: Monthly deep dives

### Using Agents

**Run a pre-built agent**:

1. Navigate to **Agents**
2. Select an agent (e.g., "Title Optimizer")
3. Click **Execute**
4. Choose target:
   - Single product
   - Collection
   - All products (batch)
5. Review settings (execution mode, filters)
6. Click **Run Agent**

**Monitor progress**:
- Real-time progress bar
- Current task indicator
- Estimated completion time
- Token usage and cost tracking

**View results**:
- Issues found
- Fixes generated
- Fixes applied (or pending)
- Performance metrics (execution time, cost)

### Creating Custom Agents

1. Navigate to **Agents** → **Create Custom Agent**

2. **Basic Info**:
   - Name: "My Product Description Enhancer"
   - Description: "Adds emotional language to descriptions"
   - Specialty: Choose from categories or "Custom"

3. **AI Configuration**:
   - **System Prompt**: Define agent behavior
     ```
     You are an expert e-commerce copywriter specializing in emotional marketing.
     Your task is to enhance product descriptions by adding emotional triggers
     and customer benefits while maintaining factual accuracy.
     ```
   - **Model**: claude-3-5-sonnet-20241022
   - **Temperature**: 0.7 (0 = deterministic, 1 = creative)
   - **Max Tokens**: 2000

4. **Target Issues**:
   - Select issue types this agent handles
   - Examples: "short_description", "weak_cta"

5. **Execution Settings**:
   - Auto-apply fixes: Yes/No
   - Execution mode override: Use global or agent-specific

6. Click **Create Agent**

**Test your agent**:
- Run on a single product first
- Review output quality
- Adjust prompt if needed
- Then run on larger batches

### Agent Performance Metrics

View agent statistics:

- **Total Runs**: How many times executed
- **Success Rate**: Percentage of successful completions
- **Avg. Execution Time**: Speed benchmark
- **Avg. Cost**: Cost per execution
- **User Rating**: Your feedback (1-5 stars)

Use these metrics to optimize your agents and control costs.

---

## Timeline & Rollback

SEOLOGY's Timeline feature provides complete visibility and rollback capability.

### Viewing Timeline

Navigate to **Timeline** to see chronological fix history:

**Timeline View**:
- Date-based grouping
- Event cards showing:
  - Fixes applied
  - Agent executions
  - Checkpoints created
  - Issues detected

**Filters**:
- Date range
- Event type (fixes, checkpoints, agents)
- Product/collection
- Agent type

### Checkpoints

Checkpoints are snapshots of your SEO state for rollback.

**Automatic Checkpoints**:
Created automatically before:
- Daily automation runs
- Bulk agent executions
- Plan approvals

**Manual Checkpoints**:
Create before major changes:

1. Click **Create Checkpoint**
2. Name: "Pre-Black Friday Optimizations"
3. Description: "Checkpoint before campaign changes"
4. Click **Save**

**Checkpoint Details**:
- Timestamp
- Products affected
- Fixes included
- SEO metrics snapshot (avg. score, issue count)
- Rollback status (can rollback for 90 days)

### Rolling Back Changes

**To rollback to a checkpoint**:

1. Navigate to **Timeline**
2. Find the checkpoint (e.g., "Pre-Black Friday Optimizations")
3. Click **Restore**
4. Review what will change:
   - Fixes to revert: 45
   - Products affected: 38
   - Current avg. score: 78 → 72 (before changes)

5. Confirm: "Yes, restore to this point"
6. Rollback executes in background
7. Notification when complete

**What gets rolled back**:
- Product meta titles/descriptions
- Image alt text
- Structured data
- Any other changes made after checkpoint

**What doesn't rollback**:
- Products added/deleted after checkpoint
- Shopify theme changes
- Third-party app modifications

**Important**: Rollback is only available for 90 days. After that, checkpoints become view-only for historical reference.

### Branching Timeline

For advanced users, create timeline branches to experiment:

1. Create checkpoint: "Main - Before Experiment"
2. Make experimental changes (e.g., test different title formats)
3. Click **Create Branch**: "Title Experiment A"
4. Apply changes to branch
5. Monitor performance for 2 weeks
6. Compare branch to main timeline
7. Merge successful changes or discard branch

---

## Analytics & Usage

Track your Claude AI usage, costs, and budgets.

### Usage Overview

Navigate to **Analytics** for a dashboard showing:

**Current Period** (monthly):
- Tokens used: 125,000 / 500,000
- Total cost: $4.25 / $50.00 budget
- Requests: 345
- Percent of budget: 8.5%

**Top Models**:
- claude-3-5-sonnet-20241022: 320 requests, $4.10
- claude-3-opus-20240229: 25 requests, $0.15

**Cost Breakdown**:
- Product Analysis: $2.50 (58%)
- Image Alt Text: $0.75 (18%)
- Agent Execution: $1.00 (24%)

### Usage Timeline

**Daily Usage Chart**:
- Bar chart showing daily token consumption
- Hover to see exact numbers
- Trend line showing 7-day average

**Forecast**:
SEOLOGY predicts your end-of-month usage:
- "Projected monthly total: $48.50"
- "You will stay within budget"
- "Peak usage day: November 5 ($3.20)"

**Alerts**:
- 50% of budget: Email notification
- 75% of budget: Email + dashboard alert
- 90% of budget: Automation pauses, approval required
- 100% of budget: All AI features paused until next cycle

### Setting Budgets

1. Navigate to **Analytics** → **Budget**
2. Set monthly limit: $50.00
3. Optional: Set daily limit: $5.00
4. Configure alerts:
   - ☑ Email at 50%
   - ☑ Email at 75%
   - ☑ Pause automation at 90%
   - ☑ Pause all AI at 100%
5. Save budget

**Budget Periods**:
Budgets reset monthly on your plan renewal date.

### Exporting Data

**Export usage reports**:

1. Click **Export**
2. Select format:
   - CSV (for spreadsheets)
   - PDF (for accounting)
3. Date range: November 1-30, 2025
4. Include:
   - ☑ Token usage by model
   - ☑ Cost breakdown by feature
   - ☑ Request details
5. Click **Generate Export**
6. Download link provided (expires in 24 hours)

Use exports for:
- Accounting and expense tracking
- Usage optimization analysis
- Reporting to stakeholders

---

## Settings

### General Settings

**Store Information**:
- Store name
- Store URL (read-only, from Shopify)
- Contact email

**Time Zone**:
- Set your local time zone
- Affects automation scheduling and reports

### Execution Mode

Choose how fixes are applied:
- Automatic
- Plan
- Approve

(See [Execution Modes](#execution-modes) for details)

### Daily Automation

**Enable Daily Automation**:
- Toggle on/off

**Automation Time**:
- Set time: 9:00 AM (your time zone)
- SEOLOGY runs automation daily at this time

**Report Delivery**:
- ☑ Email report to me
- ☑ Dashboard notification
- Format: Summary or Detailed

**Automation Scope**:
- All products
- Products with score < 70 only
- Specific collections only

### Approval Rules

(Approve mode only)

**Auto-approve Settings**:
- Auto-approve all alt text suggestions
- Auto-approve meta descriptions
- Auto-approve low-severity issues

**Approval Expiration**:
- Reject fixes pending > 7 days: Yes/No
- Notification before expiration: Yes/No

### Notifications

**Email Notifications**:
- ☑ Daily automation summary
- ☑ Fix applied (immediate)
- ☑ Fix failed (immediate)
- ☑ Budget alerts
- ☑ Weekly SEO report

**Dashboard Notifications**:
- ☑ Show all notifications
- ☑ Group similar notifications
- Auto-mark read after: 7 days

### API & Integrations

**Webhooks**:
- Set up outgoing webhooks for events
- Useful for integrations with other tools

**Google Search Console** (coming soon):
- Connect for traffic tracking
- Measure fix impact on rankings

### Account & Billing

**Plan**: Shopify App Store Subscription
- Managed through Shopify billing
- View usage limits
- Upgrade/downgrade plan

**Usage Limits**:
- Products: Unlimited (Shopify app billing handles this)
- AI Credits: Based on Claude API costs

---

## Troubleshooting

### Common Issues

#### "No products found"

**Cause**: Shopify connection issue or no products in store

**Solution**:
1. Check you have products in Shopify Admin
2. Reinstall app if issue persists
3. Contact support with store URL

#### "Analysis failed"

**Cause**: Claude API error or network timeout

**Solution**:
1. Try again in a few moments
2. Check if Claude API is experiencing issues (status.anthropic.com)
3. If persistent, contact support

#### "Fix not applying"

**Cause**: Shopify API error, permission issue, or validation failure

**Solution**:
1. Check the error message for specifics
2. Verify app has write_products permission
3. Ensure field values are valid (character limits, etc.)
4. Try applying fix again

#### "Automation not running"

**Cause**: Disabled, budget exceeded, or configuration error

**Solution**:
1. Check automation is enabled in Settings
2. Verify budget has not been exceeded
3. Check automation time is set correctly
4. Review automation logs in Reports

#### "Budget exceeded"

**Cause**: Monthly AI credit limit reached

**Solution**:
1. View usage breakdown in Analytics
2. Identify high-cost activities
3. Adjust automation frequency or scope
4. Increase budget limit if needed
5. Wait for next monthly reset

### Getting Help

**In-App Support**:
1. Navigate to **Support**
2. Search knowledge base
3. Submit support ticket with:
   - Issue description
   - Steps to reproduce
   - Screenshots (optional)

**Email Support**:
support@seology.ai

**Response Time**:
- Critical issues: 2-4 hours
- General inquiries: 24 hours
- Feature requests: 48 hours

**Live Chat** (coming soon):
- Available during business hours
- Instant support for urgent issues

---

## Tips & Best Practices

### Maximizing SEO Results

1. **Start with low-hanging fruit**: Fix critical issues first (missing meta descriptions, alt text)
2. **Use Automatic mode after testing**: Try Approve mode for a week, then switch to Automatic
3. **Review analytics weekly**: Check which fixes are driving traffic
4. **Create checkpoints before experiments**: Always have a rollback point
5. **Use agents for bulk operations**: Optimize entire collections at once

### Controlling Costs

1. **Set a budget**: Prevent surprise costs
2. **Use Plan mode for batches**: More efficient than individual analyses
3. **Cache analysis results**: Don't re-analyze unchanged products
4. **Schedule automation during off-peak**: Less competition for Claude API

### Working with AI Suggestions

1. **Review before auto-approving**: Understand what AI is suggesting
2. **Customize prompts**: Make agents match your brand voice
3. **Provide feedback**: Rate agent outputs to improve quality
4. **Test on low-traffic products first**: Validate changes before high-value products

---

## Keyboard Shortcuts

Speed up your workflow:

- `?` - Show keyboard shortcuts
- `D` - Go to Dashboard
- `P` - Go to Products
- `A` - Go to Agents
- `T` - Go to Timeline
- `S` - Go to Settings
- `Ctrl + K` - Search products
- `Ctrl + /` - Toggle command palette

---

## Glossary

**SEO Score**: 0-100 rating of product SEO health

**Meta Title**: HTML `<title>` tag, shown in search results

**Meta Description**: HTML description tag, shown in search results

**Alt Text**: Image description for accessibility and SEO

**Structured Data**: Schema.org markup for rich snippets

**Checkpoint**: Snapshot of SEO state for rollback

**Agent**: Specialized AI for specific SEO tasks

**Execution Mode**: How fixes are applied (Automatic/Plan/Approve)

**Token**: Unit of text processed by Claude AI (used for billing)

---

## What's Next?

**Coming Soon**:
- Google Search Console integration (track rankings)
- Blog post SEO optimization
- Competitor analysis
- A/B testing for meta tags
- Multi-language support
- Collection page optimization

Stay tuned for updates in the app!

---

**Need More Help?**

Visit our help center: https://help.seology.ai
Watch video tutorials: https://seology.ai/tutorials
Join our community: https://community.seology.ai
