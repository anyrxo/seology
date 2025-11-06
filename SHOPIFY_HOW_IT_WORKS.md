# How SEOLOGY's Shopify App Works

## 🎯 Overview

SEOLOGY transforms Shopify SEO from manual work into conversational AI automation. Instead of analyzing reports and manually editing products, you **chat with AI** and it **fixes everything automatically**.

---

## 🔄 Complete User Flow

### **Step 1: Connect Your Store (30 seconds)**

```
User visits: /dashboard/shopify
             ↓
Enters store domain: "mystore.myshopify.com"
             ↓
Clicks: "Connect Shopify Store"
             ↓
OAuth redirects to Shopify
             ↓
User authorizes SEOLOGY
             ↓
Redirects back with access token
             ↓
✅ Store connected!
```

**What happens behind the scenes:**
1. CSRF token generated (10-min expiry)
2. Shopify OAuth initiated
3. User approves app permissions
4. Code exchanged for access token
5. Token encrypted with AES-256-GCM
6. Store data fetched and saved
7. Connection record created in database

---

### **Step 2: Dashboard Overview (automatic)**

Once connected, user sees:

```
┌─────────────────────────────────────────┐
│  🛍️ My Awesome Store - CONNECTED       │
│  ✓ 250 products  ✓ 15 collections      │
│  📊 Shopify Plan                        │
└─────────────────────────────────────────┘

┌───────────┬───────────┬───────────┐
│ SEO Score │ Products  │ Critical  │
│    68     │    250    │     45    │
│   Fair    │ Analyzed  │  Issues   │
└───────────┴───────────┴───────────┘

Top Priority Products:
1. Premium Leather Jacket ($15k/mo) - Priority: 4,500
2. Designer Sunglasses ($8k/mo) - Priority: 2,400
3. Vintage Watch ($6k/mo) - Priority: 1,800
```

**Revenue-Aware Prioritization:**
```typescript
priority = revenue30Days × (SEO_issues / 10)

Example:
Product: "Premium Leather Jacket"
Revenue: $15,000/month
SEO Score: 70 (30 issues)
Priority: $15,000 × (30/10) = 4,500
```

---

### **Step 3: AI Chat Optimization**

User types in AI chat:

**👤 User:** "Analyze my products for SEO issues"

**Behind the scenes:**
```
1. AI calls: analyze_shopify_products()
             ↓
2. Fetches products via Shopify GraphQL API
             ↓
3. Calculates SEO scores for each product
             ↓
4. Prioritizes by revenue × issues formula
             ↓
5. Returns structured analysis
```

**🤖 AI Response:**
```
I've analyzed all 250 products in your store. Here's what I found:

📊 Store SEO Health: 68/100 (Fair)

Top 3 Priority Products:

1. **Premium Leather Jacket** ($15,000/month revenue)
   - SEO Score: 70/100
   - Issues:
     ❌ Meta description missing
     ❌ Title too short (22 chars, need 30-60)
     ❌ No image alt text on 3 images
     ❌ Missing product tags
   - **Priority Score: 4,500** (high revenue + issues)

2. **Designer Sunglasses** ($8,000/month revenue)
   - SEO Score: 75/100
   - Issues:
     ❌ Weak meta description
     ❌ Description too short (150 chars, need 200+)
   - **Priority Score: 2,400**

3. **Vintage Watch** ($6,000/month revenue)
   - SEO Score: 65/100
   - Issues:
     ❌ Title missing keywords
     ❌ No schema markup
   - **Priority Score: 1,800**

Would you like me to fix these automatically?
```

---

### **Step 4: AI Applies Fixes**

**👤 User:** "Yes, fix all three products"

**What happens:**

```
For each product:

1. AI calls: get_product_details(productId)
             ↓
2. Analyzes current state
             ↓
3. Generates optimized content:
   - New title (30-60 chars)
   - Meta description (100-160 chars)
   - Product description (200+ chars)
   - Image alt text
             ↓
4. AI calls: fix_product_seo(productId, fixes)
             ↓
5. Applies via Shopify REST API:
   - Updates product.title
   - Updates product.body_html
   - Creates metafields for SEO meta tags
             ↓
6. Creates audit log
             ↓
7. Sends notification
```

**🤖 AI Response:**
```
✅ Fixed Premium Leather Jacket:
   - Updated title: "Premium Leather Jacket - Genuine Italian Leather | Designer Outerwear"
   - Added meta description: "Shop our premium leather jacket made from genuine Italian leather. Timeless design, superior craftsmanship. Free shipping on orders over $100."
   - Added alt text to all images
   - Added product tags: leather, jacket, designer, outerwear

✅ Fixed Designer Sunglasses:
   - Rewrote meta description
   - Extended product description to 350 characters

✅ Fixed Vintage Watch:
   - Optimized title with keywords
   - Added structured data markup

All changes are LIVE in your Shopify store! 🎉
```

---

## 🛠️ Technical Architecture

### **Database Flow**

```
User signs up
     ↓
User record created (Prisma)
     ↓
Connects Shopify store
     ↓
Connection record created:
  - platform: "SHOPIFY"
  - accessToken: encrypted
  - credentials: JSON with store data
     ↓
Products analyzed
     ↓
ShopifyProduct records created:
  - shopifyProductId
  - salesLast30Days
  - revenue30Days
  - seoScore
  - fixPriority
```

### **API Client Architecture**

```typescript
ShopifyAPIClient
├── REST API Methods
│   ├── getProducts()          // Fetch product catalog
│   ├── getProduct(id)         // Single product details
│   ├── updateProductSEO()     // Apply fixes
│   ├── getCollections()       // Fetch collections
│   └── updateCollectionSEO()  // Fix collection pages
│
└── GraphQL Methods
    ├── getProductsWithAnalytics()  // Products + sales data
    └── getProductAnalytics(id)     // Detailed analytics
```

### **AI Tools System**

```typescript
6 Shopify AI Tools:

1. analyze_shopify_products
   Input: { limit?: number }
   Output: {
     products: PrioritizedProduct[]
     summary: { totalAnalyzed, avgSeoScore, highPriorityCount }
   }

2. get_product_details
   Input: { productId: string }
   Output: { product with variants, images, seoIssues }

3. fix_product_seo
   Input: { productId, fixes: { title, description, meta } }
   Output: { appliedFixes[], updatedProduct }

4. analyze_shopify_collections
   Input: { limit?: number }
   Output: { collections with seoScores, issues }

5. fix_collection_seo
   Input: { collectionId, fixes }
   Output: { appliedFixes[] }

6. get_store_overview
   Input: {}
   Output: { store stats, SEO health, critical issues }
```

---

## 💡 Key Innovations

### **1. Revenue-Aware Prioritization**

Traditional SEO tools treat all products equally. SEOLOGY prioritizes fixes by **revenue impact**:

```
Low-revenue product + many issues = Low priority
High-revenue product + few issues = Medium priority
High-revenue product + many issues = HIGH PRIORITY ⚡
```

**Why this matters:**
- Fix a $10,000/month product with 10 issues → Massive ROI
- Fix a $100/month product with 50 issues → Minimal ROI
- **SEOLOGY always picks the high-ROI fix first**

### **2. Conversational Interface**

No complex dashboards or confusing reports:

```
❌ Traditional: "Product ID 12345 has 15 SEO issues. Download CSV report."
✅ SEOLOGY: "Your Premium Leather Jacket needs optimization. Fix it?"
```

### **3. Automatic Execution**

Other tools **tell you what's wrong**. SEOLOGY **fixes it for you**:

```
❌ Traditional SEO Tool:
   1. Scan site
   2. Generate report
   3. You manually edit each product
   4. Repeat for 250 products

✅ SEOLOGY:
   1. "Fix my products"
   2. Done ✅
```

---

## 🔒 Security & Privacy

### **OAuth Security**

```
1. CSRF Protection
   - State token with 10-minute expiry
   - Stored in database
   - Validated on callback

2. HMAC Verification
   - All Shopify callbacks cryptographically verified
   - Prevents man-in-the-middle attacks

3. Token Encryption
   - Access tokens encrypted with AES-256-GCM
   - Encryption key stored in environment variable
   - Never exposed in logs or API responses

4. Scope Minimization
   - Only requests necessary permissions
   - Read/write for products, collections, content
   - No payment or customer data access
```

### **Data Isolation**

```typescript
// Every query filters by userId
const products = await db.shopifyProduct.findMany({
  where: {
    connection: {
      userId: user.id  // ← Ensures users only see their data
    }
  }
})
```

---

## 📊 Real-World Example

**Merchant: "Vintage Apparel Co."**

**Before SEOLOGY:**
- 300 products
- Manual SEO optimization
- 2 hours per product = 600 hours total
- Cost: $30,000 in labor (at $50/hour)

**After SEOLOGY:**
- Merchant: "Optimize all my products"
- AI analyzes 300 products in 2 minutes
- AI fixes top 50 high-revenue products in 5 minutes
- Merchant reviews and approves
- **Total time: 10 minutes**
- **Cost: $0 labor + $5 AI API usage**

**Results:**
- 98% time savings (600 hours → 10 minutes)
- 99.9% cost savings ($30,000 → $5)
- **Revenue-prioritized fixes = Maximum SEO ROI**

---

## 🚀 Quick Actions

Pre-built action buttons for common tasks:

```
┌─────────────────────────────────────────┐
│  ⚡ Quick Actions                        │
│                                         │
│  [🔍 Analyze All Products]              │
│  Scan entire catalog for SEO issues     │
│                                         │
│  [⚡ Fix Critical Issues]               │
│  Auto-fix urgent SEO problems           │
│                                         │
│  [📈 Optimize Best Sellers]             │
│  Focus on high-revenue products         │
│                                         │
│  [💊 Store Health Check]                │
│  Comprehensive SEO audit                │
└─────────────────────────────────────────┘
```

Each button triggers an AI chat message with optimal prompts.

---

## 📈 Analytics Dashboard

```
Store Overview:

Average SEO Score: 68/100 (Fair)
Products Analyzed: 250
Critical Issues: 45 products (score < 60)

Top Priority Products:
1. Premium Leather Jacket - Priority: 4,500
2. Designer Sunglasses - Priority: 2,400
3. Vintage Watch - Priority: 1,800

Recent Optimizations:
✅ Fixed 15 products yesterday
✅ Average score improved from 65 → 68
✅ 12 products now at 90+ score
```

---

## 🎯 Use Cases

### **Use Case 1: New Store Launch**

```
Merchant: "I just added 100 products. Optimize them all."

AI: "I've analyzed all 100 products. 85 need SEO work.
     Fixing them now..."

     ✅ Fixed 85 products in 3 minutes

     Your store is now optimized and ready to launch!
```

### **Use Case 2: Black Friday Prep**

```
Merchant: "Optimize my Black Friday collection"

AI: "Your Black Friday collection has 50 products.
     I've prioritized the top 20 by expected revenue.

     Fixing now..."

     ✅ Optimized 20 high-revenue products
     ✅ Average SEO score: 92/100

     Your collection is ready for Black Friday traffic!
```

### **Use Case 3: Ongoing Maintenance**

```
Merchant: "Show me new products that need optimization"

AI: "You've added 5 products this week.
     3 need SEO optimization.

     Would you like me to fix them?"

Merchant: "Yes"

AI: ✅ Fixed 3 products
    Your catalog is fully optimized!
```

---

## 🎓 For Developers

### **Adding a New AI Tool**

```typescript
// 1. Define tool in lib/ai-tools/shopify-tools.ts
{
  name: 'my_new_tool',
  description: 'What this tool does',
  input_schema: {
    type: 'object' as const,
    properties: {
      productId: { type: 'string' as const }
    },
    required: ['productId']
  }
}

// 2. Implement handler
export async function myNewTool(
  context: ToolContext,
  input: { productId: string }
) {
  const client = await getShopifyClientFromConnection(context.connectionId)
  // Tool logic here
  return { success: true, data: result }
}

// 3. Add to lib/ai-tools.ts handleToolCall()
case 'my_new_tool':
  return await myNewTool(context, input)
```

### **Testing Locally**

```bash
# 1. Set environment variables
SHOPIFY_CLIENT_ID="your_client_id"
SHOPIFY_CLIENT_SECRET="your_client_secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 2. Start dev server
npm run dev

# 3. Visit dashboard
http://localhost:3000/dashboard/shopify

# 4. Connect test store
Enter: mydevstore.myshopify.com
```

---

## 📚 Additional Resources

- **Setup Guide:** [SHOPIFY_SETUP.md](SHOPIFY_SETUP.md)
- **Feature Overview:** [SHOPIFY_README.md](SHOPIFY_README.md)
- **Architecture Details:** [CLAUDE.md](CLAUDE.md)
- **Shopify API Docs:** https://shopify.dev/docs/api

---

**Built with ❤️ using Claude AI & Claudia (Opcode)**
