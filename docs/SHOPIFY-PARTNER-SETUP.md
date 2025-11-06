# SEOLOGY.AI - Shopify Partner Dashboard Setup Guide

Complete guide for configuring SEOLOGY.AI in the Shopify Partner Dashboard.

## Table of Contents

1. [Creating Your App](#creating-your-app)
2. [App Configuration](#app-configuration)
3. [API Scopes](#api-scopes)
4. [Webhooks](#webhooks)
5. [App Listing](#app-listing)
6. [Testing](#testing)
7. [Submission for Review](#submission-for-review)
8. [Common Issues](#common-issues)

---

## Creating Your App

### Step 1: Access Partner Dashboard

1. Go to [partners.shopify.com](https://partners.shopify.com)
2. Sign in or create a Partner account
3. Navigate to **Apps** in the left sidebar

### Step 2: Create New App

1. Click **Create app**
2. Select **Create app manually**
3. Fill in basic information:
   - **App name**: SEOLOGY.AI
   - **App URL**: `https://your-app.vercel.app/shopify/dashboard`

4. Click **Create app**

You'll be redirected to your app's configuration page.

---

## App Configuration

### URLs

In the **Configuration** tab, set the following URLs:

**App URL**:
```
https://your-app.vercel.app/shopify/dashboard
```

This is where users land after installing your app.

**Allowed redirection URL(s)**:
Add all these URLs (one per line):
```
https://your-app.vercel.app/api/auth/shopify/callback
https://your-app.vercel.app/api/auth/callback
https://your-app.vercel.app/shopify/dashboard
https://your-app.vercel.app/shopify/onboarding
```

**IMPORTANT**: Replace `your-app.vercel.app` with your actual domain.

### App Proxy (Optional)

If you plan to use App Proxy for storefront features:

**Subpath prefix**: `apps`
**Subpath**: `seology`
**Proxy URL**: `https://your-app.vercel.app/api/proxy`

This allows merchants to access your app at: `https://store.com/apps/seology`

**Note**: Not required for admin-only apps.

### Embedded App

**Embed your app in the Shopify admin**: ✅ **Enabled**

This allows SEOLOGY to run inside the Shopify Admin interface for a seamless experience.

**Frame ancestors**: Leave blank (Shopify automatically allows their domains)

---

## API Scopes

SEOLOGY.AI requires the following scopes to function properly.

### Required Scopes

In **Configuration** → **API access**, enable:

#### Products (Critical)
- ✅ `read_products`
  - **Why**: Fetch product data for SEO analysis
  - **What we read**: Titles, descriptions, images, variants, metafields

- ✅ `write_products`
  - **Why**: Apply SEO fixes (update meta titles/descriptions)
  - **What we write**: SEO title, SEO description, alt text

#### Content
- ✅ `read_content`
  - **Why**: Read blog posts and pages for holistic SEO analysis
  - **What we read**: Page titles, content, meta tags

- ✅ `write_content`
  - **Why**: Optimize page and blog post SEO
  - **What we write**: SEO metadata for pages and articles

#### Themes
- ✅ `read_themes`
  - **Why**: Inject structured data (schema.org) into theme templates
  - **What we read**: Theme liquid files, assets

- ✅ `write_themes`
  - **Why**: Add JSON-LD structured data snippets
  - **What we write**: Schema.org snippets in theme.liquid

### Optional Scopes (Recommended)

#### Orders (for revenue-aware prioritization)
- ☑️ `read_orders`
  - **Why**: Identify high-revenue products to prioritize SEO fixes
  - **What we read**: Product sales data (anonymous, no customer data)

#### Analytics (future feature)
- ☑️ `read_analytics`
  - **Why**: Track SEO impact on traffic
  - **What we read**: Page views, sessions (aggregate data)

### Scopes NOT Required

- ❌ `write_orders` - Not needed
- ❌ `read_customers` - Not needed
- ❌ `write_customers` - Not needed
- ❌ `read_payments` - Not needed

### Requesting Scopes

After selecting scopes:

1. Click **Save**
2. Shopify may require justification for sensitive scopes
3. Provide clear explanations (see "Why" above)
4. Reauthorize if you add scopes later

**Note**: Adding new scopes requires merchant reauthorization.

---

## Webhooks

Webhooks keep SEOLOGY synchronized with Shopify events.

### Mandatory Webhooks (App Store Requirement)

In **Configuration** → **Webhooks**, add:

#### App Uninstalled
- **Event**: `app/uninstalled`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify`
- **Version**: `2024-10` (latest stable)
- **Format**: JSON

**Why**: Clean up user data when app is uninstalled (GDPR compliance)

**What it does**:
1. Receives uninstall notification
2. Marks connection as disconnected
3. Schedules data deletion (7-day grace period)
4. Sends confirmation email to merchant

### Product Webhooks (Automatic Sync)

For real-time product updates:

#### Products Created
- **Event**: `products/create`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify`
- **Version**: `2024-10`

#### Products Updated
- **Event**: `products/update`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify`
- **Version**: `2024-10`

#### Products Deleted
- **Event**: `products/delete`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify`
- **Version**: `2024-10`

**Why**: Keep SEOLOGY's product database synchronized
- Auto-analyze new products
- Re-scan updated products
- Remove deleted products

### GDPR Webhooks (Required for Compliance)

#### Customer Data Request
- **Event**: `customers/data_request`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify/gdpr`
- **Version**: `2024-10`

**Why**: Merchants can request data for a specific customer

**What it does**:
1. Receives customer ID
2. Compiles all data related to that customer
3. Sends data export to merchant within 48 hours

#### Customer Redact
- **Event**: `customers/redact`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify/gdpr`
- **Version**: `2024-10`

**Why**: Merchants can request customer data deletion (GDPR "right to be forgotten")

**What it does**:
1. Receives customer ID
2. Redacts all personally identifiable information
3. Anonymizes analytics data
4. Confirms deletion within 48 hours

#### Shop Redact
- **Event**: `shop/redact`
- **URL**: `https://your-app.vercel.app/api/webhooks/shopify/gdpr`
- **Version**: `2024-10`

**Why**: Shopify requests deletion of all shop data (after 48 hours of app uninstall)

**What it does**:
1. Receives shop ID
2. Permanently deletes all data for that shop:
   - Products
   - SEO analysis
   - Fixes
   - User preferences
3. Confirms deletion within 48 hours

### Webhook Best Practices

**Security**:
- All webhooks validate HMAC signature
- Reject requests without valid signature
- Rate limit webhook endpoints

**Reliability**:
- Return `200 OK` within 5 seconds
- Process heavy tasks in background jobs
- Implement retry logic for failures

**Testing**:
- Use Shopify's webhook testing tool
- Verify signature validation works
- Test GDPR flows manually

---

## App Listing

Required for public app distribution on Shopify App Store.

### Listing Information

#### Basic Details

**App name**: SEOLOGY.AI

**App tagline** (70 characters):
```
AI-powered SEO that actually fixes issues, not just reports them
```

**App description** (1200 characters):
```
SEOLOGY.AI is the first Shopify SEO app that automatically fixes SEO issues instead of just reporting them. Powered by Claude AI, SEOLOGY analyzes your products, detects SEO problems, and applies optimizations directly to your store.

Key Features:
• Automatic SEO Fixes: AI detects and fixes missing meta tags, poor alt text, and more
• Three Execution Modes: Automatic, Plan, or Manual Approval - you choose
• Product Analysis: Deep SEO scoring with actionable recommendations
• Image Optimization: AI-generated alt text using Claude Vision
• Structured Data: Auto-generated schema.org JSON-LD for rich snippets
• Timeline & Rollback: 90-day rollback for any change
• AI Agents: Specialized agents for titles, descriptions, images, and more
• Usage Analytics: Track AI costs and optimization impact

How It Works:
1. Install SEOLOGY and connect your store
2. Choose your execution mode (automatic or manual approval)
3. AI analyzes products and detects SEO issues
4. Fixes are applied automatically or await your approval
5. Track improvements in real-time dashboard

Perfect For:
- Store owners who want hands-off SEO optimization
- Agencies managing multiple Shopify stores
- Brands with large product catalogs (100+ products)
- Stores looking to improve organic traffic and rankings

Built with cutting-edge AI (Claude 3.5 Sonnet), SEOLOGY delivers enterprise-grade SEO automation at an affordable price.
```

#### Categories

Select up to 2 categories:
- ✅ **Store optimization** (primary)
- ✅ **Marketing** (secondary)

#### Pricing

**Pricing model**: Usage-based (charged through Shopify)

**Free trial**: 7 days

**Pricing tiers**:
- Not applicable (usage-based on Claude API costs)

**Billing terms**:
```
SEOLOGY.AI charges based on Claude AI usage:
- $3 per 1M input tokens
- $15 per 1M output tokens

Typical monthly costs:
- Small store (< 100 products): $5-15/month
- Medium store (100-500 products): $15-50/month
- Large store (500+ products): $50-150/month

No minimum fees. Only pay for what you use.
Set monthly budgets to control costs.
```

### Media Assets

#### App Icon

**Size**: 1200 x 1200 px
**Format**: PNG, JPG
**Requirements**:
- Square aspect ratio
- Transparent or white background
- High resolution (minimum 512x512)

**Design tips**:
- Use SEOLOGY logo
- Keep it simple and recognizable
- Ensure it looks good at small sizes (64x64)

#### Screenshots

**Required**: 3-8 screenshots
**Size**: 1600 x 1200 px (4:3 aspect ratio)
**Format**: PNG, JPG

**Screenshot suggestions**:

1. **Dashboard Overview**
   - Caption: "Comprehensive SEO dashboard with real-time metrics and insights"
   - Show: Overall SEO score, issue breakdown, recent activity

2. **Product Analysis**
   - Caption: "AI-powered product analysis with detailed SEO recommendations"
   - Show: Product page with SEO score, detected issues, suggested fixes

3. **Fix Approval UI** (if Plan/Approve mode)
   - Caption: "Review and approve AI-generated fixes before applying"
   - Show: Pending fixes with before/after comparison

4. **AI Agents**
   - Caption: "Specialized AI agents for different SEO tasks"
   - Show: Agent library with performance metrics

5. **Timeline & Rollback**
   - Caption: "Complete fix history with 90-day rollback capability"
   - Show: Timeline with checkpoints

6. **Analytics Dashboard**
   - Caption: "Track AI usage, costs, and budget in real-time"
   - Show: Usage graphs, cost breakdown, forecasts

**Screenshot tips**:
- Use real (anonymized) data, not Lorem Ipsum
- Show the app in action, not just UI
- Highlight unique features
- Use consistent branding

#### Demo Video (Optional)

**Length**: 30-60 seconds
**Format**: MP4
**Resolution**: 1920 x 1080 (1080p)

**Video script**:
```
0:00 - "Meet SEOLOGY.AI"
0:05 - Show dashboard with poor SEO scores
0:10 - "Detects SEO issues automatically"
0:15 - Show AI analysis of a product
0:20 - "Applies fixes with one click"
0:25 - Show fixes being applied
0:30 - Reveal improved SEO scores
0:35 - "Join thousands of stores optimizing SEO with AI"
0:40 - Call-to-action: "Try free for 7 days"
```

### Support Details

**Support email**: support@seology.ai

**Support URL**: https://help.seology.ai

**Privacy policy URL**: https://seology.ai/privacy

**Terms of service URL**: https://seology.ai/terms

**Documentation URL**: https://docs.seology.ai

**Average response time**: 24 hours

**Supported languages**: English

---

## Testing

### Development Store Setup

1. **Create development store**:
   - Partners → Stores
   - Click "Add store"
   - Select "Development store"
   - Fill in details:
     - Store name: `seology-test-store`
     - Store purpose: Testing SEOLOGY.AI
     - Dev store type: Test store
   - Click "Save"

2. **Install app on dev store**:
   - Go to your app in Partner Dashboard
   - Click "Select store" → Choose your dev store
   - Click "Install app"
   - Authorize permissions

3. **Test installation flow**:
   - Complete OAuth
   - Go through onboarding
   - Verify dashboard loads

### Testing Checklist

Before submitting for review:

#### Installation & OAuth
- [ ] OAuth flow completes successfully
- [ ] Redirect URLs work correctly
- [ ] Session persists across page refreshes
- [ ] Error handling for failed OAuth

#### Core Functionality
- [ ] Products load from Shopify
- [ ] AI analysis works (Claude API responds)
- [ ] Fixes apply to products in Shopify
- [ ] Changes appear in Shopify Admin
- [ ] Rollback restores previous values

#### Execution Modes
- [ ] Automatic mode applies fixes without approval
- [ ] Plan mode creates plans and applies on approval
- [ ] Approve mode requires individual fix approval
- [ ] Mode switching works correctly

#### Webhooks
- [ ] `products/update` webhook received and processed
- [ ] `app/uninstalled` webhook triggers cleanup
- [ ] GDPR webhooks respond within 48 hours
- [ ] Webhook signature validation works

#### Edge Cases
- [ ] Large catalogs (1000+ products) work without timeout
- [ ] Empty stores (0 products) handle gracefully
- [ ] Network errors show user-friendly messages
- [ ] Claude API rate limits handled properly

#### Performance
- [ ] Dashboard loads in < 3 seconds
- [ ] Product list pagination works smoothly
- [ ] No memory leaks (test with Chrome DevTools)
- [ ] Database queries optimized (< 100ms)

#### Mobile & Responsive
- [ ] App works on mobile devices
- [ ] Touch targets are 44x44px minimum
- [ ] Text is legible on small screens
- [ ] No horizontal scrolling

#### Accessibility
- [ ] Screen reader compatible
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible

---

## Submission for Review

### Pre-Submission Checklist

- [ ] All required scopes have justifications
- [ ] All webhooks are configured and tested
- [ ] App listing is complete with screenshots
- [ ] Privacy policy and terms of service are live
- [ ] Support email is monitored
- [ ] GDPR compliance is implemented
- [ ] App is tested on multiple development stores
- [ ] No bugs in core functionality

### Submission Process

1. **Final review**:
   - Go through all settings in Partner Dashboard
   - Test app one more time on a fresh dev store
   - Ensure all URLs use production domain (not ngrok)

2. **Submit for review**:
   - Navigate to **Distribution** → **App listing**
   - Click "Submit for review"
   - Fill in submission notes:

```
Submission Notes:

SEOLOGY.AI is an AI-powered SEO optimization app for Shopify merchants.

Key capabilities:
- Analyzes products for SEO issues using Claude AI
- Automatically applies fixes to product meta tags, alt text, and structured data
- Provides three execution modes for different user preferences
- Tracks changes with 90-day rollback capability

Scope justifications:
- read_products/write_products: Core functionality - analyze and optimize product SEO
- read_content/write_content: Optimize blog posts and pages
- read_themes/write_themes: Inject schema.org structured data

GDPR compliance:
- All webhooks implemented and tested
- Data deletion within 48 hours of request
- Privacy policy: https://seology.ai/privacy

Testing:
- Tested on 5 development stores with various catalog sizes
- All webhooks validated
- Performance tested with 5000+ products

Support:
- Email: support@seology.ai
- Docs: https://docs.seology.ai
- Response time: < 24 hours
```

3. **Wait for review**:
   - Shopify typically reviews within 3-5 business days
   - You'll receive email updates
   - Check Partner Dashboard for status updates

4. **Address feedback**:
   - If Shopify requests changes, address them promptly
   - Re-submit after making corrections
   - Respond to reviewer questions via Partner Dashboard

### Common Rejection Reasons

**OAuth Issues**:
- Redirect URLs not working
- Missing error handling
- Session not persisting

**Solution**: Test OAuth flow thoroughly on multiple devices

**Scope Over-requesting**:
- Requesting scopes not used by app
- Insufficient scope justification

**Solution**: Only request scopes you actually use, provide clear justifications

**Webhook Problems**:
- Webhooks not responding within 5 seconds
- Missing GDPR webhook implementation
- Signature validation failing

**Solution**: Return 200 OK quickly, process in background, test GDPR flows

**Performance Issues**:
- App loads slowly (> 5 seconds)
- Timeouts on large operations
- Memory leaks

**Solution**: Optimize queries, use pagination, implement caching

**UI/UX Problems**:
- Confusing navigation
- Poor mobile experience
- Accessibility issues

**Solution**: Follow Shopify Polaris design system, test on mobile

---

## Common Issues

### "App installation fails"

**Symptoms**: Error during OAuth, redirect doesn't work

**Causes**:
- Redirect URL not whitelisted
- CORS issues
- SSL certificate problems

**Solutions**:
1. Verify redirect URLs in Partner Dashboard match exactly
2. Ensure app URL uses HTTPS
3. Check browser console for errors
4. Test with different browsers

### "Webhooks not received"

**Symptoms**: Webhook events not triggering

**Causes**:
- Webhook URL unreachable
- Signature validation failing
- Endpoint returning non-200 status

**Solutions**:
1. Test webhook URL with curl:
```bash
curl -X POST https://your-app.vercel.app/api/webhooks/shopify \
  -H "X-Shopify-Topic: products/update" \
  -H "X-Shopify-Shop-Domain: test-store.myshopify.com"
```

2. Check Vercel logs for webhook receipts
3. Verify signature validation code
4. Ensure endpoint returns 200 within 5 seconds

### "App listing rejected"

**Symptoms**: Shopify rejects app submission

**Common reasons**:
- Incomplete listing information
- Missing screenshots or poor quality
- Scope justifications unclear
- App not working on reviewer's test store

**Solutions**:
1. Read rejection email carefully
2. Address all feedback points
3. Test on a fresh dev store before resubmitting
4. Provide detailed re-submission notes

### "Scope upgrade requires reauthorization"

**Symptoms**: After adding scopes, app doesn't have access

**Cause**: Adding scopes requires merchant to reauthorize

**Solution**:
1. Add scope in Partner Dashboard
2. Merchants must reinstall or reauthorize app
3. Send email notification to existing users:
   ```
   Subject: SEOLOGY.AI - Reauthorization Required

   Hi [Merchant],

   We've added new features to SEOLOGY.AI that require additional permissions.

   Please click here to reauthorize: [link]

   New permissions:
   - read_orders: Prioritize SEO fixes by product revenue
   - read_analytics: Track SEO impact on traffic

   Questions? Reply to this email.

   Thanks,
   SEOLOGY Team
   ```

---

## Post-Approval

### App Store Optimization (ASO)

**Keywords**: Research and optimize
- Use Shopify App Store search to find popular keywords
- Include in app title, tagline, description
- Monitor competitor apps

**Reviews**: Encourage positive reviews
- Email satisfied customers after 14 days
- Respond to all reviews (positive and negative)
- Address issues mentioned in reviews

**Updates**: Keep app fresh
- Release updates monthly
- Announce new features in changelog
- Submit updated screenshots when UI changes

### Monitoring

**Metrics to track**:
- Installations per day
- Active users
- Uninstall rate
- Average review score
- Support ticket volume

**Tools**:
- Shopify Partner Dashboard analytics
- Vercel analytics
- Custom database queries

---

## Resources

**Shopify Partner Docs**:
- [App submission requirements](https://shopify.dev/docs/apps/launch/app-review)
- [OAuth documentation](https://shopify.dev/docs/apps/auth/oauth)
- [Webhook documentation](https://shopify.dev/docs/apps/webhooks)

**SEOLOGY Resources**:
- [Deployment Guide](./DEPLOYMENT-GUIDE.md)
- [API Documentation](./API-DOCUMENTATION.md)
- [User Guide](./USER-GUIDE.md)

**Support**:
- Email: dev@seology.ai
- Slack: [SEOLOGY Developers](https://seology-dev.slack.com)
