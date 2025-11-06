# 🛍️ Shopify Integration - Complete Guide

## Overview

SEOLOGY's Shopify integration transforms SEO from a diagnostic tool into an **execution platform**. Instead of just telling you what's wrong, it **fixes it for you** using conversational AI.

### 🎯 What Makes This Different

**Traditional SEO Tools:**
- Scan your site ✅
- Generate reports ✅
- Tell you what to fix ✅
- You manually fix everything ❌

**SEOLOGY for Shopify:**
- Scan your store ✅
- Generate intelligent analysis ✅
- **Automatically apply fixes** ✅
- **Prioritize by revenue impact** ✅
- **Conversational AI interface** ✅

## 🚀 Quick Start

### 1. Prerequisites

```bash
# Required environment variables
SHOPIFY_CLIENT_ID="your_client_id"
SHOPIFY_CLIENT_SECRET="your_client_secret"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
ENCRYPTION_KEY="32-character-encryption-key"
```

See [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md) for detailed setup instructions.

### 2. Connect Your Store

1. Navigate to `/dashboard/shopify`
2. Enter your store domain (e.g., `mystore.myshopify.com`)
3. Click "Connect Shopify Store"
4. Authorize SEOLOGY in Shopify
5. Done! 🎉

### 3. Start Optimizing

**Try these commands in the AI chat:**

```
"Analyze my products for SEO issues"
"Fix the top 10 products with the most revenue potential"
"Show me my store's SEO health"
"Optimize my best-selling product"
"Fix all products with missing meta descriptions"
```

## 💡 Key Features

### 1. Revenue-Aware Prioritization

Products are automatically prioritized using this algorithm:

```typescript
priority = revenue30Days × (SEO_issues / 10)
```

**Why this matters:**
- High-revenue products with SEO issues get fixed first
- Maximize ROI on SEO efforts
- Focus on what actually drives revenue

**Example:**
```
Product A: $10,000/month revenue, 40 SEO issues → Priority: 4,000
Product B: $1,000/month revenue, 80 SEO issues → Priority: 800
Product A gets fixed first (higher revenue impact)
```

### 2. Conversational AI Interface

No complex dashboards or confusing reports. Just chat:

**User:** "What products need the most SEO work?"

**AI:** "I've analyzed your store. Here are your top priorities:

1. **Premium Leather Jacket** ($15,000/month revenue)
   - Missing meta description
   - Title too short (22 chars)
   - No image alt text
   - Priority Score: 4,500

2. **Designer Sunglasses** ($8,000/month revenue)
   - Weak meta description
   - Missing structured data
   - Priority Score: 2,400

Would you like me to fix these?"

**User:** "Yes, fix both"

**AI:** "✅ Fixed Premium Leather Jacket:
- Added optimized meta description
- Extended title to 58 characters
- Added alt text to all images

✅ Fixed Designer Sunglasses:
- Rewrote meta description
- Added product schema markup

Changes are live in your Shopify store!"

### 3. Six AI Tools

| Tool | What It Does | Example |
|------|-------------|---------|
| `analyze_shopify_products` | Full product catalog analysis | "Analyze all products" |
| `get_product_details` | Deep dive on specific product | "Show details for product 12345" |
| `fix_product_seo` | Apply SEO fixes | "Fix product 12345" |
| `analyze_shopify_collections` | Collection page analysis | "Analyze my collections" |
| `fix_collection_seo` | Fix collection SEO | "Optimize my summer collection" |
| `get_store_overview` | Overall store health | "Give me a store health report" |

### 4. Quick Actions

One-click access to common tasks:

- **Analyze All Products** - Full store scan
- **Fix Critical Issues** - Auto-fix urgent problems
- **Optimize Best Sellers** - Focus on top revenue products
- **Store Health Check** - Comprehensive SEO audit

### 5. Real-Time Analytics

See your SEO improvements in real-time:

- **Average SEO Score** - Overall store health (0-100)
- **Products Analyzed** - Total coverage
- **Critical Issues** - Products needing immediate attention
- **Top Priority Products** - Revenue-sorted fix list

## 🔧 How It Works

### OAuth Flow

```
1. User enters store domain
   ↓
2. Redirect to Shopify OAuth
   ↓
3. User authorizes app
   ↓
4. Exchange code for access token
   ↓
5. Encrypt & store token
   ↓
6. Fetch store data
   ↓
7. Ready to optimize!
```

### SEO Fix Process

```
1. AI analyzes product
   ↓
2. Identifies SEO issues
   ↓
3. Generates optimized content
   ↓
4. Applies via Shopify API
   ↓
5. Creates audit log
   ↓
6. Notifies user
```

### Security

- **AES-256-GCM Encryption** - All access tokens encrypted at rest
- **CSRF Protection** - State tokens with 10-minute expiry
- **HMAC Verification** - All callbacks cryptographically verified
- **Minimal Scopes** - Only requests necessary permissions
- **User Isolation** - All queries filtered by userId

## 📊 Technical Architecture

### Database Models

```typescript
// Shopify connection
Connection {
  platform: "SHOPIFY"
  domain: "store.myshopify.com"
  accessToken: "encrypted_token"
  credentials: {
    shopId: 12345
    name: "My Store"
    productCount: 150
    currency: "USD"
  }
}

// Product tracking
ShopifyProduct {
  shopifyProductId: "123456789"
  salesLast30Days: 45
  revenue30Days: 15000.00
  seoScore: 65
  issuesCount: 7
  fixPriority: 3500
}

// Collection tracking
ShopifyCollection {
  shopifyCollectionId: "987654321"
  seoScore: 80
  issuesCount: 4
}
```

### API Client

**REST API Methods:**
- `getProducts()` - Fetch product catalog
- `getProduct(id)` - Single product details
- `updateProductSEO(id, data)` - Apply SEO fixes
- `getCollections()` - Fetch collections
- `updateCollectionSEO(id, data)` - Fix collection SEO

**GraphQL Methods:**
- `getProductsWithAnalytics()` - Products + sales data
- `getProductAnalytics(id)` - Detailed analytics

### File Structure

```
lib/
├── shopify-api-client.ts       # API client (513 lines)
├── ai-tools/
│   └── shopify-tools.ts        # AI tool definitions (628 lines)
└── ai-tools.ts                 # Tool handlers integration

components/dashboard/
├── ShopifyConnection.tsx       # Connection UI
├── ShopifyOverview.tsx         # Analytics dashboard
└── ShopifyQuickActions.tsx     # Quick action buttons

app/
├── api/auth/shopify/
│   ├── route.ts                # OAuth initiation
│   └── callback/route.ts       # OAuth callback
├── api/connections/
│   ├── shopify/route.ts        # Get connection
│   └── [id]/route.ts           # Delete connection
├── api/shopify/
│   └── overview/route.ts       # Store analytics
└── dashboard/shopify/
    └── page.tsx                # Main dashboard
```

## 🎨 User Experience

### Dashboard Layout

```
┌─────────────────────────────────────────┐
│  Shopify SEO                            │
│  AI-powered SEO optimization            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  🛍️ My Store Connected                 │
│  ✓ 150 products  ✓ 12 collections       │
│  📊 Plan: Shopify                       │
└─────────────────────────────────────────┘

┌───────────┬───────────┬───────────┐
│ SEO Score │ Products  │ Critical  │
│    78     │    150    │     12    │
│ Good      │ Analyzed  │ Issues    │
└───────────┴───────────┴───────────┘

┌─────────────────────────────────────────┐
│  ⚡ Quick Actions                        │
│  ┌──────────┬──────────┐               │
│  │ Analyze  │ Fix      │               │
│  │ All      │ Critical │               │
│  ├──────────┼──────────┤               │
│  │ Optimize │ Health   │               │
│  │ Top      │ Check    │               │
│  └──────────┴──────────┘               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  💬 AI SEO Assistant                    │
│  Chat with AI to optimize your store    │
│                                         │
│  User: Analyze my best sellers         │
│  AI: I've found 5 high-revenue...      │
└─────────────────────────────────────────┘
```

## 📈 Use Cases

### 1. New Store Setup

**Goal:** Optimize all products for launch

**Workflow:**
1. Connect store
2. "Analyze all products"
3. Review priority list
4. "Fix the top 20 products"
5. Launch with optimized SEO ✅

**Time saved:** 40 hours → 30 minutes

### 2. Ongoing Optimization

**Goal:** Maintain SEO health

**Workflow:**
1. Weekly: "Show me new products that need optimization"
2. "Fix products added this week"
3. Monthly: "Store health check"
4. Address any critical issues

**ROI:** Continuous SEO improvement with minimal effort

### 3. Revenue Maximization

**Goal:** Boost high-revenue products

**Workflow:**
1. "Show me my top 10 revenue products"
2. Review SEO scores
3. "Optimize all products above $5,000/month revenue"
4. Track ranking improvements

**Impact:** Maximum SEO ROI

### 4. Seasonal Campaigns

**Goal:** Optimize for Black Friday

**Workflow:**
1. "Analyze my Black Friday collection"
2. "Fix all products in the sale collection"
3. "Optimize product titles for holiday keywords"
4. Launch campaign with perfect SEO ✅

## 🔍 SEO Checks Performed

### Product-Level

- ✅ Title length (30-60 characters optimal)
- ✅ Title keyword optimization
- ✅ Meta description (100-160 characters)
- ✅ Product description length (200+ characters)
- ✅ Image alt text presence
- ✅ Product tags for discoverability
- ✅ URL structure (handle)
- ✅ Schema markup readiness

### Collection-Level

- ✅ Collection title optimization
- ✅ Collection description quality
- ✅ Meta description
- ✅ Collection image presence
- ✅ Internal linking structure

### Store-Level

- ✅ Overall SEO health score
- ✅ Critical issue count
- ✅ Optimization coverage
- ✅ Revenue-impact analysis

## 🚨 Troubleshooting

### "Connection failed"

**Causes:**
- Invalid shop domain
- User declined authorization
- Network timeout

**Solution:**
1. Verify domain format: `store.myshopify.com`
2. Try reconnecting
3. Check browser console for errors

### "No products found"

**Causes:**
- Store has no published products
- Insufficient API permissions

**Solution:**
1. Verify products are published in Shopify
2. Check app has `read_products` scope
3. Reconnect store to refresh permissions

### "Failed to apply fixes"

**Causes:**
- Product was deleted
- Insufficient write permissions
- Rate limiting

**Solution:**
1. Verify product still exists
2. Check app has `write_products` scope
3. Wait 1 minute and retry

## 📚 API Reference

### Shopify API Client

```typescript
// Initialize
const client = await createShopifyClient({
  domain: 'store.myshopify.com',
  accessToken: 'encrypted_token'
})

// Get products
const products = await client.getProducts({ limit: 50 })

// Update product SEO
await client.updateProductSEO('12345', {
  title: 'Optimized Product Title',
  metaTitle: 'SEO Meta Title',
  metaDescription: 'SEO meta description here'
})

// Get revenue-prioritized products
const prioritized = await getPrioritizedProducts(client, 50)
```

### AI Tools

```typescript
// Analyze products
const result = await analyzeShopifyProducts(
  { userId, connectionId },
  { limit: 50 }
)

// Get product details
const details = await getProductDetails(
  { userId, connectionId },
  { productId: '12345' }
)

// Fix product SEO
const fixed = await fixProductSEO(
  { userId, connectionId },
  {
    productId: '12345',
    fixes: {
      title: 'New Title',
      metaDescription: 'New meta description'
    }
  }
)
```

## 🎓 Best Practices

### 1. Start with Analysis

Always analyze before fixing:
```
"Analyze my products" → Review → "Fix top 10"
```

### 2. Use Revenue Prioritization

Focus on high-impact products first:
```
"Show me products above $5,000/month revenue with SEO issues"
```

### 3. Batch Operations

Fix multiple products at once:
```
"Fix all products with missing meta descriptions"
```

### 4. Monitor Results

Regular health checks:
```
Weekly: "Show me this week's new products"
Monthly: "Store health check"
```

## 🔗 Resources

- [Full Setup Guide](SHOPIFY_SETUP.md)
- [Architecture Details](CLAUDE.md)
- [Shopify API Docs](https://shopify.dev/docs/api)
- [OAuth Guide](https://shopify.dev/docs/apps/auth/oauth)

## 🤝 Support

For issues or questions:
- Check [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md) troubleshooting section
- Review [CLAUDE.md](CLAUDE.md) for architecture details
- Report bugs via GitHub Issues

---

**Built with ❤️ using Claude AI**
