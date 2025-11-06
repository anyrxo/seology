# Shopify Integration Setup Guide

Complete guide for setting up SEOLOGY's Shopify integration.

## Overview

SEOLOGY integrates with Shopify stores via OAuth 2.0 to provide AI-powered SEO optimization. The integration allows:

- **Conversational AI SEO** - Chat with Claude AI to analyze and fix SEO issues
- **Revenue-Aware Prioritization** - Fixes prioritized by revenue impact
- **Automatic Optimization** - AI applies SEO fixes directly to your store
- **Real-time Analytics** - Track SEO improvements across products and collections

## Prerequisites

1. **Shopify Partner Account** - Required to create a custom app
2. **Shopify Development Store** - For testing (optional but recommended)
3. **SEOLOGY Account** - Running instance of SEOLOGY.AI

## Step 1: Create Shopify App

### 1.1 Create Partner Account

1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Sign up for a partner account (free)
3. Complete the registration process

### 1.2 Create Custom App

1. In your Partner Dashboard, go to **Apps** → **Create app**
2. Select **Custom app**
3. Fill in app details:
   - **App name**: SEOLOGY AI SEO
   - **App URL**: `https://your-domain.com`
   - **Allowed redirection URL(s)**: `https://your-domain.com/api/auth/shopify/callback`

### 1.3 Configure App Scopes

Select the following OAuth scopes:

**Product Scopes:**
- `read_products` - Read product data for analysis
- `write_products` - Update product titles, descriptions, and meta tags

**Content Scopes:**
- `read_content` - Read pages and blog posts
- `write_content` - Update page and blog post SEO

**Theme Scopes:**
- `read_themes` - Read theme files for analysis
- `write_themes` - Update theme meta tags

**Online Store Scopes:**
- `read_online_store_pages` - Read store pages
- `write_online_store_pages` - Update store page SEO

### 1.4 Get API Credentials

After creating the app:
1. Go to **App setup** → **Client credentials**
2. Copy the **Client ID** and **Client secret**
3. Save these for the next step

## Step 2: Configure Environment Variables

Add the following to your `.env.local` file:

```bash
# ============================================
# SHOPIFY INTEGRATION
# ============================================

# Shopify OAuth Credentials
SHOPIFY_CLIENT_ID="your_client_id_here"
SHOPIFY_CLIENT_SECRET="your_client_secret_here"

# Your app's public URL (for OAuth callbacks)
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# ============================================
# EXISTING VARIABLES (keep these)
# ============================================

# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Anthropic Claude AI
ANTHROPIC_API_KEY="sk-ant-..."

# Encryption (32-character key for encrypting access tokens)
ENCRYPTION_KEY="your-32-character-encryption-key"
```

### Environment Variable Details

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SHOPIFY_CLIENT_ID` | Your Shopify app's Client ID | Yes | `0b87ac78cf0783fd1dd829bf5421fae5` |
| `SHOPIFY_CLIENT_SECRET` | Your Shopify app's Client Secret | Yes | `shpss_abc123...` |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | Yes | `https://seology.ai` |
| `ENCRYPTION_KEY` | 32-char key for token encryption | Yes | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6` |

### Generate Encryption Key

```bash
# Generate a secure 32-character encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex').slice(0, 32))"
```

## Step 3: Database Setup

The Shopify integration uses the following Prisma models (already defined):

- **Connection** - Stores encrypted OAuth tokens
- **ShopifyProduct** - Tracks product SEO data and revenue
- **ShopifyCollection** - Tracks collection SEO data

Run Prisma migration:

```bash
npx prisma generate
npx prisma db push
```

## Step 4: Test OAuth Flow

### 4.1 Start Development Server

```bash
npm run dev
```

### 4.2 Test Connection

1. Navigate to `http://localhost:3000/dashboard/shopify`
2. Enter your development store's domain (e.g., `mystore.myshopify.com`)
3. Click **Connect Shopify Store**
4. Authorize the app in Shopify
5. You should be redirected back with a success message

### 4.3 Verify Connection

Check the database:

```sql
-- Should show your connected store
SELECT * FROM "Connection" WHERE platform = 'SHOPIFY';
```

## Step 5: Using the AI Chat

Once connected, you can use the AI chat to:

### Analyze Products

```
Analyze my products for SEO issues
```

The AI will:
1. Fetch all products from your store
2. Calculate SEO scores for each
3. Prioritize by revenue impact
4. Return a detailed analysis

### Get Product Details

```
Show me details for product ID 123456789
```

### Fix Product SEO

```
Fix the SEO for product "Awesome T-Shirt"
```

The AI will:
1. Analyze the product
2. Generate optimized title, description, and meta tags
3. Apply the fixes to your Shopify store
4. Log the changes in audit trail

### Analyze Collections

```
Analyze my collections
```

### Get Store Overview

```
Give me an overview of my store's SEO health
```

## Step 6: Available AI Tools

The Shopify integration provides 6 AI tools:

| Tool | Description | Example Usage |
|------|-------------|---------------|
| `analyze_shopify_products` | Analyze all products for SEO issues | "Analyze my products" |
| `get_product_details` | Get detailed info about a specific product | "Show product 12345" |
| `fix_product_seo` | Apply SEO fixes to a product | "Fix product 12345" |
| `analyze_shopify_collections` | Analyze collections for SEO issues | "Analyze collections" |
| `fix_collection_seo` | Apply SEO fixes to a collection | "Fix collection 67890" |
| `get_store_overview` | Get store analytics and SEO health | "Store overview" |

## Architecture

### OAuth Flow

```
1. User enters store domain
   ↓
2. GET /api/auth/shopify?shop=store.myshopify.com
   ↓
3. Redirect to Shopify OAuth
   ↓
4. User authorizes app
   ↓
5. GET /api/auth/shopify/callback?code=...&hmac=...
   ↓
6. Exchange code for access token
   ↓
7. Encrypt and store token in database
   ↓
8. Redirect to /dashboard/shopify?shopify_connected=true
```

### Security Features

- **CSRF Protection** - State tokens with 10-minute expiry
- **HMAC Verification** - All callbacks verified with Shopify's signature
- **Token Encryption** - Access tokens encrypted at rest (AES-256-GCM)
- **Scope Validation** - Only requested scopes are granted
- **User Isolation** - All queries filtered by userId

### API Client

The Shopify API client (`lib/shopify-api-client.ts`) provides:

- **Type-Safe Methods** - Full TypeScript support
- **REST API** - Product, collection, page, theme operations
- **GraphQL API** - Analytics and bulk operations
- **Error Handling** - Retry logic and rate limiting
- **Revenue Tracking** - Product sales and revenue data

### Revenue-Aware Prioritization

Products are prioritized using this formula:

```typescript
priority = revenue30Days × (issuesCount / 10)
```

Where:
- `revenue30Days` = Estimated revenue from last 30 days
- `issuesCount` = Number of SEO issues (100 - seoScore)

This ensures high-value products with SEO issues get fixed first.

## Troubleshooting

### OAuth Errors

**Error: Invalid HMAC**
- Verify `SHOPIFY_CLIENT_SECRET` is correct
- Check that callback URL matches exactly

**Error: Invalid state token**
- State tokens expire after 10 minutes
- Clear old tokens: `DELETE FROM "CSRFToken" WHERE provider = 'SHOPIFY'`

**Error: Missing access token**
- Connection may have been revoked in Shopify
- Reconnect the store from dashboard

### API Errors

**Error: Connection not found**
- Verify store is connected: `SELECT * FROM "Connection" WHERE platform = 'SHOPIFY'`
- Reconnect if needed

**Error: Failed to fetch products**
- Check Shopify API status
- Verify access token is valid
- Check app scopes include `read_products`

### Development Store Limits

Shopify development stores have limits:
- **Product limit**: 50 products (use `limit` parameter)
- **API rate limit**: 2 requests/second
- **No real payments**: Test with Shopify's test payment gateway

## Production Deployment

### 1. Update App URLs

In Shopify Partner Dashboard:
1. Update **App URL** to production domain
2. Update **Allowed redirection URLs** to production callback URL

### 2. Update Environment Variables

```bash
# Production .env
NEXT_PUBLIC_APP_URL="https://seology.ai"
SHOPIFY_CLIENT_ID="production_client_id"
SHOPIFY_CLIENT_SECRET="production_client_secret"
```

### 3. Deploy to Vercel

```bash
# Set environment variables in Vercel
vercel env add SHOPIFY_CLIENT_ID
vercel env add SHOPIFY_CLIENT_SECRET
vercel env add ENCRYPTION_KEY

# Deploy
vercel --prod
```

### 4. Submit App for Review (Optional)

To list your app in the Shopify App Store:
1. Complete app listing in Partner Dashboard
2. Submit for Shopify review
3. Address any feedback
4. App goes live in App Store

## Support

For issues or questions:
- **Documentation**: See `CLAUDE.md` for architecture details
- **GitHub Issues**: Report bugs and feature requests
- **Discord**: Join our community for support

## Resources

- [Shopify API Documentation](https://shopify.dev/docs/api)
- [Shopify OAuth Guide](https://shopify.dev/docs/apps/auth/oauth)
- [Shopify Partner Dashboard](https://partners.shopify.com/)
- [SEOLOGY Documentation](./CLAUDE.md)
