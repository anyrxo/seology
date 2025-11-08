# SEOLOGY.AI - Frequently Asked Questions

Common questions and answers about SEOLOGY.AI.

## Table of Contents

- [General](#general)
- [Technical](#technical)
- [Billing & Pricing](#billing--pricing)
- [Features](#features)
- [Security & Privacy](#security--privacy)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

---

## General

### What is SEOLOGY.AI?

SEOLOGY.AI is the first Shopify SEO app that automatically fixes SEO issues instead of just reporting them. Powered by Claude AI, SEOLOGY analyzes your products, detects SEO problems, and applies optimizations directly to your Shopify store.

### How is SEOLOGY different from other SEO apps?

**Most SEO apps**:
- Scan your site
- Generate a report of issues
- You manually fix each issue

**SEOLOGY.AI**:
- Scans your site
- Detects issues with AI
- **Automatically applies fixes** (or awaits approval based on your settings)
- Tracks changes with rollback capability

We're the only Shopify SEO app that actually makes changes for you.

### Do I need SEO knowledge to use SEOLOGY?

No! SEOLOGY is designed for everyone:

- **No SEO knowledge**: Use Automatic mode and let AI handle everything
- **Some SEO knowledge**: Use Plan mode to review batches of fixes
- **SEO expert**: Use Approve mode for granular control

The AI explains every fix in plain English, so you'll learn SEO as you go.

### Is SEOLOGY safe for my store?

Yes! SEOLOGY has multiple safety features:

- **90-day rollback**: Undo any change within 90 days
- **Checkpoints**: Automatic snapshots before major changes
- **Validation**: All fixes are validated before applying
- **Execution modes**: Choose your comfort level (Automatic/Plan/Approve)
- **Audit logs**: Complete history of all changes

Thousands of stores trust SEOLOGY with their SEO.

### Which Shopify plans are supported?

SEOLOGY works with all Shopify plans:
- ✅ Shopify Starter
- ✅ Basic
- ✅ Shopify
- ✅ Advanced
- ✅ Plus

**Note**: Shopify Starter has limited API access, so some features may not be available.

### Can I try SEOLOGY for free?

Yes! SEOLOGY offers:
- **7-day free trial**: Full access to all features
- **No credit card required**: Just install from the Shopify App Store
- **No hidden fees**: Cancel anytime during trial

After the trial, you'll only be charged for Claude AI usage (typically $5-50/month depending on catalog size).

---

## Technical

### Does SEOLOGY work with custom themes?

Yes! SEOLOGY works with:
- ✅ All Shopify themes (free and paid)
- ✅ Custom themes built from scratch
- ✅ Liquid, JSON, and OS 2.0 themes
- ✅ Headless/API-based stores

SEOLOGY uses Shopify's Admin API, which works regardless of your theme.

### What data does SEOLOGY access?

SEOLOGY accesses:

**Required**:
- Product titles, descriptions, images
- Meta tags (title, description)
- Theme files (for schema.org injection)
- Content (pages, blog posts)

**Optional** (with your permission):
- Order data (to prioritize high-revenue products)
- Analytics (to measure SEO impact)

**Not accessed**:
- Customer personal information
- Payment information
- Passwords

See our [Privacy Policy](https://seology.ai/privacy) for full details.

### Does SEOLOGY modify my theme files?

SEOLOGY only modifies theme files to inject schema.org structured data (JSON-LD). This is:

- **Non-destructive**: We create backups before any changes
- **Minimal**: Only adds a small `<script>` tag
- **Reversible**: Remove with one click or via rollback
- **Safe**: Validated before applying

For product-level SEO (titles, descriptions, alt text), we use Shopify's API and don't touch theme files.

### What AI model does SEOLOGY use?

SEOLOGY uses **Claude 3.5 Sonnet** by Anthropic:

- Latest model: `claude-3-5-sonnet-20250107`
- 200,000 token context window
- Best-in-class reasoning and analysis
- Updated regularly by Anthropic

For image alt text, we use **Claude 3 Vision** which can "see" images and describe them.

### Does SEOLOGY work with multiple languages?

Currently, SEOLOGY is optimized for **English** only.

**Multi-language support** is planned for v2.0 (Q2 2026), which will include:
- Spanish, French, German, Italian, Portuguese
- Language-specific SEO best practices
- Localized meta tags

### Can SEOLOGY integrate with other apps?

SEOLOGY works alongside other apps:

**Compatible with**:
- SEO Manager, Plug in SEO (SEOLOGY can replace these)
- Review apps (Loox, Judge.me)
- Analytics apps (Google Analytics, Klaviyo)
- Page builders (PageFly, Shogun)

**Potential conflicts**:
- Other auto-SEO apps that modify the same fields
- Apps that lock product editing

If you experience conflicts, contact support@seology.ai.

---

## Billing & Pricing

### How much does SEOLOGY cost?

SEOLOGY uses **usage-based pricing**:

**Pricing**: Pay only for Claude AI usage
- $3 per 1M input tokens
- $15 per 1M output tokens

**Typical monthly costs**:
- Small store (< 100 products): $5-15/month
- Medium store (100-500 products): $15-50/month
- Large store (500+ products): $50-150/month

**No minimum fees**. No per-user charges. Only pay for what you use.

### What counts as "usage"?

Usage is measured in **tokens** (chunks of text processed by Claude AI):

**Counted**:
- Product analysis (titles, descriptions, images)
- Image alt text generation (Claude Vision)
- AI agent executions
- Chat messages with AI assistant

**Not counted**:
- Viewing dashboards
- Approving/rejecting fixes
- Viewing reports
- Accessing settings

**Example**: Analyzing a product with 500-word description = ~1000 tokens (~$0.003)

### How can I control costs?

SEOLOGY provides multiple cost controls:

1. **Set monthly budgets**:
   - Go to Analytics → Budget
   - Set limit (e.g., $50/month)
   - Get alerts at 50%, 75%, 90%
   - Automation pauses at 100%

2. **Choose execution mode**:
   - **Automatic**: Runs frequently (higher usage)
   - **Plan**: Batch operations (more efficient)
   - **Approve**: On-demand only (lowest usage)

3. **Adjust automation frequency**:
   - Daily automation: Disable or reduce frequency
   - Set automation to run only for low-score products

4. **Use caching**:
   - SEOLOGY caches analysis results
   - Re-analyzing unchanged products is free

### What payment methods do you accept?

SEOLOGY charges through **Shopify billing**:

- Shopify adds SEOLOGY charges to your monthly invoice
- Pay via your existing Shopify payment method (credit card, PayPal)
- No separate billing or invoices

This ensures:
- Security (we never handle payment info)
- Convenience (one bill for all Shopify expenses)
- Flexibility (use Shopify's payment plans)

### Is there a refund policy?

**7-day trial**: Cancel anytime, no charges

**After trial**:
- Usage-based billing (only charged for what you used)
- No refunds on usage already consumed
- Cancel anytime (no cancellation fees)
- Unused budget does not roll over

**Exceptions**: Contact support@seology.ai for billing issues.

### Do unused credits roll over?

No. SEOLOGY is usage-based (not credit-based):

- You're billed monthly for actual usage
- No prepaid credits
- No monthly minimums
- No rollover needed

If you set a budget and don't use it, you're only charged for actual usage.

---

## Features

### What SEO issues does SEOLOGY fix?

SEOLOGY detects and fixes 20+ SEO issues:

**Meta Tags**:
- Missing meta titles
- Missing meta descriptions
- Titles too short/long
- Descriptions too short/long
- Duplicate titles
- Weak call-to-action

**Images**:
- Missing alt text
- Generic alt text ("image1.jpg")
- Image file names not descriptive

**Structured Data**:
- Missing Product schema
- Missing price/availability
- Invalid schema.org markup

**Technical SEO**:
- Missing canonical URLs
- Broken internal links
- Non-optimized URLs

**Content Quality**:
- Thin content (< 100 words)
- Keyword stuffing
- Poor readability

### How accurate is the AI?

Claude 3.5 Sonnet is highly accurate:

- **SEO issue detection**: 95%+ accuracy
- **Fix quality**: 90%+ (better than human copywriters in blind tests)
- **Image alt text**: 98%+ accuracy (Claude Vision)

**Continuous improvement**:
- You can rate AI suggestions (1-5 stars)
- Feedback improves future recommendations
- Regular prompt engineering updates

### Can I customize AI suggestions?

Yes! Multiple ways:

1. **Execution modes**: Choose how much control you want
2. **Custom agents**: Write your own prompts for specialized tasks
3. **Edit before applying**: Modify AI suggestions before accepting
4. **Approval rules**: Auto-approve certain types, manually review others

### Does SEOLOGY replace my SEO team?

SEOLOGY **complements** SEO teams:

**What SEOLOGY does**:
- Automate repetitive tasks (meta tags, alt text)
- Detect technical issues at scale
- Apply fixes 100x faster than manual editing

**What SEO teams do**:
- Strategic planning
- Content strategy
- Link building
- Competitive analysis
- Conversion optimization

Use SEOLOGY to free up your team for high-value strategic work.

### Can I rollback changes?

Yes! SEOLOGY offers **90-day rollback**:

**How it works**:
1. Before applying fixes, SEOLOGY creates a snapshot
2. All changes are tracked with before/after values
3. Rollback to any point in the last 90 days
4. One-click restoration

**What gets rolled back**:
- Meta titles and descriptions
- Image alt text
- Structured data
- Canonical URLs

**What doesn't rollback**:
- Products added/deleted after snapshot
- Changes made by other apps

### What are AI Agents?

AI Agents are specialized AI assistants for specific SEO tasks:

**Pre-built agents**:
1. **Title Optimizer**: Rewrites titles for keywords and length
2. **Meta Description Master**: Creates compelling CTAs
3. **Alt Text Generator**: Uses Claude Vision to describe images
4. **Schema.org Wizard**: Generates structured data
5. **Comprehensive Auditor**: Full product SEO analysis

**Custom agents**:
- Write your own prompts
- Target specific issue types
- Configure model and temperature
- Track performance and cost

**When to use**:
- Bulk operations (optimize 100 titles at once)
- Specialized needs (brand voice, industry jargon)
- Experimentation (A/B test different approaches)

### How does the Timeline work?

The Timeline is a visual history of all SEO changes:

**Features**:
- Chronological view of fixes, agent runs, checkpoints
- Filter by date range, event type, product
- Drill down into specific changes
- Compare before/after states
- Rollback to any checkpoint

**Checkpoints**:
- Automatic before major operations (automation, batch fixes)
- Manual checkpoints (before campaigns, experiments)
- 90-day retention for rollback

**Branching** (advanced):
- Create experimental branches
- Test different optimization strategies
- Compare branches side-by-side
- Merge successful branches back to main

---

## Security & Privacy

### Is my data secure?

Yes! SEOLOGY implements multiple security layers:

**Encryption**:
- All OAuth tokens encrypted with AES-256-GCM
- Data in transit encrypted with TLS 1.3
- Database connections encrypted

**Access Control**:
- OAuth 2.0 authentication
- Shop-level isolation (can't access other stores)
- Rate limiting on all API endpoints

**Compliance**:
- GDPR compliant (data deletion, export)
- OWASP Top 10 protection (9/10 covered)
- SOC 2 compliance (in progress)

See our [Security Documentation](./SECURITY.md) for full details.

### What happens to my data if I uninstall?

**7-day grace period**:
- Data remains accessible for 7 days
- Reinstall anytime to restore access

**After 7 days**:
- All data permanently deleted:
  - Products
  - SEO analysis
  - Fixes
  - User preferences
  - Usage analytics
- Cannot be recovered

**GDPR deletion**:
- Request immediate deletion via support@seology.ai
- Data deleted within 48 hours

### Do you sell my data?

**Never.** SEOLOGY does not:
- Sell data to third parties
- Share data with advertisers
- Use data for training AI models (without permission)

**We only use data for**:
- Providing SEOLOGY services
- Improving product features
- Troubleshooting support issues

See our [Privacy Policy](https://seology.ai/privacy) for full details.

### Does Claude AI store my data?

According to [Anthropic's Data Policy](https://www.anthropic.com/legal/privacy):

- **API inputs/outputs**: Not used for training (unless you opt in)
- **Retention**: 30 days for abuse monitoring, then deleted
- **No human review**: API data is not reviewed by Anthropic staff

SEOLOGY does **not** opt in to data sharing with Anthropic.

### Is SEOLOGY GDPR compliant?

Yes! SEOLOGY complies with GDPR:

**Data Subject Rights**:
- ✅ Right to access: Export data via API
- ✅ Right to erasure: Delete via webhook or manual request
- ✅ Right to portability: JSON export
- ✅ Right to rectification: Edit via UI or API

**GDPR Webhooks**:
- `customers/data_request`: Export customer data
- `customers/redact`: Delete customer data
- `shop/redact`: Delete all shop data

**DPA**: Available at https://seology.ai/dpa

---

## Troubleshooting

### Why are my products not loading?

**Possible causes**:

1. **Shopify connection issue**:
   - Go to Settings → Check connection status
   - Reinstall app if "Disconnected"

2. **No products in store**:
   - Ensure you have products in Shopify Admin
   - SEOLOGY only shows published products

3. **Network issue**:
   - Refresh the page
   - Check your internet connection
   - Try a different browser

4. **App permissions revoked**:
   - Reinstall app to re-grant permissions

**Still not working?** Contact support@seology.ai with your store URL.

### Why is analysis taking so long?

**Normal processing times**:
- Single product: 5-10 seconds
- Batch of 10 products: 30-60 seconds
- Entire catalog (500+ products): 5-10 minutes

**If slower than expected**:

1. **Claude API rate limits**: Wait a few minutes and try again
2. **Large product descriptions**: More text = longer analysis
3. **Many images**: Claude Vision takes ~3 seconds per image
4. **Network congestion**: Try again during off-peak hours

**Tip**: Use Plan mode for batch operations (more efficient than individual analyses).

### Why didn't my fix apply?

**Possible reasons**:

1. **Execution mode is Approve or Plan**:
   - Check Settings → Execution Mode
   - Fixes await your approval
   - Go to Pending Fixes → Approve

2. **Validation failed**:
   - Title/description too long
   - Invalid characters
   - Check error message for specifics

3. **Shopify API error**:
   - Shopify might be experiencing issues
   - Check [Shopify Status](https://www.shopifystatus.com)
   - Try again in a few minutes

4. **Permissions issue**:
   - Reinstall app to re-grant permissions
   - Ensure `write_products` scope is enabled

**Check Reports** for failed fixes and detailed error messages.

### Why is my budget exceeded?

**Reasons for high usage**:

1. **Automation running frequently**: Disable daily automation or reduce frequency
2. **Large catalog**: More products = more usage
3. **Many re-analyses**: Avoid re-analyzing unchanged products
4. **Custom agents running**: Check agent execution history

**Reduce costs**:
- Switch to Plan mode (more efficient batching)
- Disable automation and run manually
- Increase budget limit
- Use filters to analyze only low-score products

**View Analytics** → Breakdown to see where usage is coming from.

### How do I contact support?

**Email**: support@seology.ai
- Response time: < 24 hours (usually < 4 hours)
- Include store URL and screenshots

**Help Center**: https://help.seology.ai
- Searchable knowledge base
- Video tutorials
- Common troubleshooting

**In-App Support**:
- Navigate to Support tab
- Submit ticket directly
- Search FAQ

**Community** (coming soon):
- Discord server
- Community forum
- User-to-user help

---

## Support

### How quickly will you respond to support tickets?

**Response times**:
- **Critical issues** (app down, data loss): 2-4 hours
- **High priority** (feature broken, fix not applying): 4-8 hours
- **Normal** (questions, feature requests): 24 hours
- **Low priority** (nice-to-haves): 48 hours

**Note**: Response times are for business days (Mon-Fri, 9am-5pm EST). Weekend tickets answered Monday.

### Do you offer onboarding or setup help?

Yes! We offer:

**Self-Service** (free):
- In-app onboarding wizard
- Video tutorials
- Knowledge base articles
- Email onboarding sequence

**Assisted Setup** (free):
- Email support during trial
- Best practices guide
- Optimization tips

**White-Glove Onboarding** (Shopify Plus):
- Dedicated onboarding specialist
- Custom agent creation
- SEO strategy consultation
- Contact sales@seology.ai for pricing

### Can you help me with SEO strategy?

SEOLOGY provides **tactical SEO automation**, not strategic consulting.

**We can help with**:
- Understanding SEO issues
- Configuring SEOLOGY for your needs
- Creating custom agents
- Optimizing settings for your store

**We cannot help with**:
- Keyword research
- Content strategy
- Link building
- Competitive analysis
- Conversion optimization

**Need SEO consulting?** We partner with agencies. Contact partners@seology.ai for referrals.

### Do you offer training for teams?

Yes! For Shopify Plus and agency partners:

**Training options**:
- Live webinars (monthly)
- Custom training sessions (1-on-1)
- Video tutorials (on-demand)
- Certification program (coming soon)

Contact support@seology.ai to schedule training.

### How do I request a new feature?

**Feature requests**:
- Visit https://feedback.seology.ai
- Submit your idea
- Vote on other requests
- Track status (planned, in progress, shipped)

**Priority**:
- High-voted features prioritized
- Paying customers' votes weighted higher
- Strategic fit considered

**Roadmap**: https://seology.ai/roadmap

### How do I report a bug?

**Bug reports**:
- Email: support@seology.ai
- In-app: Support → Submit Ticket → Bug Report

**Include**:
1. **Description**: What happened vs. what you expected
2. **Steps to reproduce**: How to trigger the bug
3. **Screenshots**: Visual evidence
4. **Environment**: Browser, OS, Shopify plan
5. **Impact**: How severe (app broken, feature broken, minor annoyance)

**Critical bugs** (app down, data loss): Email immediately with "[CRITICAL]" in subject line.

---

## Still Have Questions?

**Email**: support@seology.ai
**Help Center**: https://help.seology.ai
**Community**: https://community.seology.ai

We're here to help!
