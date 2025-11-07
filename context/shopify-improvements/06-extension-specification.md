# Admin Extension Specification: Bulk SEO Optimizer

**Agent**: EXTENSION SPECIALIST
**Status**: ✅ Specification Complete
**Priority**: MEDIUM (Nice UX improvement, not required for launch)

---

## What Are Shopify Extensions?

Extensions add functionality directly into the Shopify Admin interface, allowing merchants to:
- Access your app features without leaving their workflow
- See your data alongside Shopify's native data
- Take actions in context (e.g., fix SEO while editing a product)

**Types of Extensions**:
- **Admin Actions** - Add buttons to product/order pages
- **Admin Links** - Add menu items to Shopify Admin
- **App Embeds** - Widget on dashboard
- **Bulk Actions** - Multi-select actions (what we want!)

---

## Our Proposed Extension: Bulk SEO Optimizer

### Extension Type: Admin Bulk Action

**Location**: Products list page in Shopify Admin

**Appearance**: When merchant selects multiple products, they see a new bulk action option:

```
[✓] Product 1
[✓] Product 2
[✓] Product 3

[Bulk Actions ▼]
  ├── Edit products
  ├── Delete products
  ├── Add tags
  └── 🎯 Optimize SEO (SEOLOGY)  ← Our extension
```

### User Flow

1. **Merchant selects products** (multi-select in Shopify Admin)
2. **Clicks "Optimize SEO" from Bulk Actions menu**
3. **Modal opens** showing SEOLOGY analysis preview
4. **Merchant reviews** suggested fixes for all selected products
5. **Clicks "Apply Fixes"** to optimize all at once
6. **Success notification** shows results

---

## Technical Specification

### Extension Configuration

**File**: `extensions/bulk-seo-optimizer/shopify.extension.toml`

```toml
api_version = "2025-01"
type = "admin_action"
name = "bulk_seo_optimizer"
handle = "seology-bulk-optimizer"

[[extensions.action]]
  label = "Optimize SEO"
  url = "/api/shopify/extensions/bulk-seo"

[[extensions.action.surface]]
  type = "admin.product-index.bulk-action"
```

### Endpoint Handler

**File**: `app/api/shopify/extensions/bulk-seo/route.ts`

```typescript
/**
 * Bulk SEO Optimizer Extension Endpoint
 * Called when merchant clicks "Optimize SEO" in bulk actions
 */

import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedConnection } from '@/lib/shopify-session-token'
import { getProduct, ProductSEO } from '@/lib/shopify-graphql'

export const dynamic = 'force-dynamic'

interface BulkActionPayload {
  selected_resources: Array<{
    id: string // "gid://shopify/Product/123"
  }>
  shop: string
}

export async function POST(req: NextRequest) {
  try {
    // Get authenticated connection
    const connection = await getAuthenticatedConnection(req)

    // Parse payload from Shopify
    const payload: BulkActionPayload = await req.json()

    // Analyze each selected product
    const analyses = await Promise.all(
      payload.selected_resources.map(async (resource) => {
        const productId = resource.id.replace('gid://shopify/Product/', '')
        const product = await getProduct(connection, productId)

        return {
          id: productId,
          title: product.title,
          issues: identifyIssues(product),
          fixes: generateFixes(product),
        }
      })
    )

    // Calculate totals
    const totalIssues = analyses.reduce((sum, a) => sum + a.issues.length, 0)
    const totalFixes = analyses.reduce((sum, a) => sum + a.fixes.length, 0)

    // Return response (Shopify will show this in modal)
    return NextResponse.json({
      success: true,
      message: `Found ${totalIssues} SEO issues across ${analyses.length} products`,
      data: {
        analyses,
        summary: {
          productsAnalyzed: analyses.length,
          issuesFound: totalIssues,
          fixesAvailable: totalFixes,
        },
      },
      action: {
        label: 'Apply All Fixes',
        url: '/api/shopify/extensions/bulk-seo/apply',
      },
    })
  } catch (error) {
    console.error('Bulk SEO analysis error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Analysis failed',
      },
      { status: 500 }
    )
  }
}

function identifyIssues(product: ProductSEO): string[] {
  const issues: string[] = []

  if (!product.seo.title) {
    issues.push('Missing SEO title')
  }

  if (!product.seo.description) {
    issues.push('Missing SEO description')
  }

  const hasImageWithoutAlt = product.images.edges.some(
    (edge) => !edge.node.altText
  )
  if (hasImageWithoutAlt) {
    issues.push('Images missing alt text')
  }

  return issues
}

function generateFixes(product: ProductSEO) {
  // AI-powered fix generation
  // This would call Claude to generate optimized content
  return []
}
```

---

## Extension UI (Modal)

When merchant clicks the extension, Shopify shows a modal with our response:

```
┌─────────────────────────────────────────────────┐
│  🎯 SEOLOGY Bulk SEO Optimizer                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Analyzed 15 products                            │
│  Found 47 SEO issues                             │
│                                                  │
│  Issues:                                         │
│   • 8 products missing SEO title                 │
│   • 12 products missing SEO description          │
│   • 27 images missing alt text                   │
│                                                  │
│  ✨ AI-powered fixes ready to apply             │
│                                                  │
│  [ Cancel ]              [ Apply All Fixes → ]  │
└─────────────────────────────────────────────────┘
```

---

## Alternative Extension: Product Page Action

### Extension Type: Admin Action (Single Product)

**Location**: Product detail page in Shopify Admin

**Appearance**: Button in the "More actions" dropdown:

```
Product: Blue T-Shirt

[Save] [More actions ▼]
        ├── Duplicate
        ├── Archive
        └── 🎯 Optimize SEO (SEOLOGY)  ← Our extension
```

### Configuration

```toml
[[extensions.action.surface]]
  type = "admin.product-details.action"
```

### Use Case

Merchant editing a product can quickly optimize its SEO without leaving the page.

---

## Extension Benefits

### For Merchants
- ✅ No context switching (stay in Shopify Admin)
- ✅ Bulk operations (save time)
- ✅ Native Shopify UI (familiar)
- ✅ One-click optimization

### For SEOLOGY
- ✅ Higher engagement (easier to use)
- ✅ More fix applications (less friction)
- ✅ Better integration (feels native)
- ✅ Competitive advantage (few SEO apps have extensions)

---

## Implementation Steps

### Phase 1: Setup Shopify CLI (Required)

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/app

# Initialize extension
shopify app extension create

# Select:
# - Type: admin_action
# - Name: bulk-seo-optimizer
# - Language: TypeScript
```

### Phase 2: Build Extension

```bash
# File structure
extensions/
  bulk-seo-optimizer/
    shopify.extension.toml   # Configuration
    src/
      index.tsx               # Extension UI (if custom)
    locales/
      en.default.json         # Translations
```

### Phase 3: Create API Endpoint

Create `app/api/shopify/extensions/bulk-seo/route.ts` (shown above)

### Phase 4: Deploy Extension

```bash
# Deploy to Shopify Partners
shopify app deploy

# Extension is now live in Partner Dashboard
# Merchants get it automatically when they install the app
```

### Phase 5: Test Extension

1. Install app in development store
2. Go to Products page
3. Select multiple products
4. Look for "Optimize SEO" in Bulk Actions
5. Click and verify modal appears

---

## Extension Response Format

Shopify expects this JSON structure:

```json
{
  "success": true,
  "message": "Found 47 SEO issues",
  "data": {
    "summary": {
      "productsAnalyzed": 15,
      "issuesFound": 47,
      "fixesAvailable": 47
    }
  },
  "action": {
    "label": "Apply All Fixes",
    "url": "/api/shopify/extensions/bulk-seo/apply",
    "method": "POST"
  }
}
```

When merchant clicks "Apply All Fixes", Shopify sends POST to that URL.

---

## Advanced Features (Future)

### 1. Progress Indicator

Show real-time progress while analyzing:

```
Analyzing products... 8/15
[████████░░░░░░░░] 53%
```

### 2. Issue Breakdown

Show detailed breakdown by issue type:

```
Issues by Category:
├── Missing Titles: 8 products
├── Missing Descriptions: 12 products
├── Missing Alt Text: 27 images
└── Poor Keywords: 15 products
```

### 3. Selective Fixes

Let merchant choose which fixes to apply:

```
[✓] Apply SEO title fixes (8 products)
[✓] Apply SEO description fixes (12 products)
[ ] Apply alt text fixes (27 images)
```

### 4. Scheduling

Schedule bulk optimization for off-peak hours:

```
Schedule Optimization:
○ Apply now
● Apply tonight at 2 AM
○ Apply this weekend
```

---

## Extension Limitations

### What Extensions CAN'T Do

- ❌ Make API calls directly (must go through your server)
- ❌ Access customer data
- ❌ Modify Shopify's UI extensively
- ❌ Run background jobs (must complete quickly)

### What Extensions CAN Do

- ✅ Show modals with custom content
- ✅ Trigger API calls to your server
- ✅ Display loading states
- ✅ Show success/error messages
- ✅ Redirect to your app

---

## Testing Checklist

- [ ] Extension appears in Bulk Actions menu
- [ ] Selecting products enables the extension
- [ ] Modal shows correct analysis data
- [ ] "Apply Fixes" button works
- [ ] Success notification shows after fixes applied
- [ ] Extension works in development store
- [ ] Extension works in production store
- [ ] Error handling works correctly
- [ ] Loading states display properly

---

## Deployment

### Development

```bash
shopify app dev
# Extension is injected into development store
```

### Production

```bash
shopify app deploy
# Extension is deployed to Partner Dashboard
# Automatically available to all merchants
```

### App Store Submission

Extensions are reviewed as part of app submission. Requirements:
- Must provide value to merchants
- Must follow Shopify's UX guidelines
- Must handle errors gracefully
- Must complete within 10 seconds (or show progress)

---

## Priority & Timeline

### High Priority (If Time Allows)
- ✅ Bulk action extension specification
- ⏳ Prototype implementation
- ⏳ Test with development store

### Medium Priority (Post-Launch)
- ⏳ Product detail page extension
- ⏳ Dashboard widget extension
- ⏳ Admin link extension

### Low Priority (Future Enhancements)
- ⏳ Custom modal UI
- ⏳ Progress indicators
- ⏳ Scheduling features

---

## Resources

- **Shopify CLI**: https://shopify.dev/docs/apps/tools/cli
- **Extensions Docs**: `context/shopify-docs/04-app-extensions.md`
- **Official Guide**: https://shopify.dev/docs/apps/build/admin-app-extensions
- **Examples**: https://github.com/Shopify/app-extension-examples

---

## Recommendation

**Should we build this?**

**Pros**:
- ✅ Significantly better UX
- ✅ Competitive advantage
- ✅ Higher engagement
- ✅ Native Shopify experience

**Cons**:
- ⏳ Requires Shopify CLI setup
- ⏳ Additional testing required
- ⏳ Adds deployment complexity

**Decision**: **Build it post-launch**. Focus on core app functionality first, then add extensions for UX polish.

**Timeline**: Q2 2025 (after successful launch)
