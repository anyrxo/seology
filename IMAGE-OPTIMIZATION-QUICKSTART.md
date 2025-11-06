# Image Optimization System - Quick Start Guide

## Installation

### 1. Install Required Dependencies

```bash
npm install cheerio
```

The following dependencies are already installed:
- `@anthropic-ai/sdk` - Claude API client
- `@prisma/client` - Database ORM
- `next` - Next.js framework

### 2. Environment Variables

Verify your `.env` file has the following (should already be set):

```env
ANTHROPIC_API_KEY=your_anthropic_api_key
DATABASE_URL=your_postgres_connection_string
```

### 3. Database Schema

The `ImageAsset` model is already in your `prisma/schema.prisma`. Generate the Prisma client:

```bash
npx prisma generate
```

If you haven't pushed the schema to your database yet:

```bash
npx prisma db push
```

## Usage

### Access the Image Optimization Dashboard

1. Navigate to your Shopify app:
   ```
   https://your-domain.com/shopify/images?shop=your-shop.myshopify.com
   ```

2. Or click "Images" in the navigation menu after OAuth authentication

### Workflow

#### Step 1: Scan Images
Click the "Scan Images" button to discover all product images from your Shopify store.

**What happens:**
- Fetches all products from Shopify GraphQL API
- Extracts featured images and product gallery images
- Stores image metadata in database
- Shows statistics: total images, missing alt text, needs optimization

#### Step 2: Generate Alt Text
1. Select images that need alt text (use checkboxes)
2. Click "Generate Alt Text (X)" button
3. Wait for Claude Vision API to analyze images (~2-5 seconds per image)

**What happens:**
- Fetches each image and converts to base64
- Sends to Claude Vision API with SEO-focused prompt
- AI generates descriptive alt text (50-125 characters)
- Stores suggestions with confidence scores in database
- Shows suggestions in "AI Suggestion" column

#### Step 3: Apply Fixes
1. Review AI-generated suggestions
2. Keep images selected that you want to update
3. Click "Apply Fixes (X)" button

**What happens:**
- Updates product images in Shopify via GraphQL mutation
- Creates fix records for audit trail
- Updates image status to "OPTIMIZED"
- Shows success notification

### Filtering

Use the status dropdown to filter images:
- **All Images** - Show everything
- **Missing Alt Text** - Images without alt text
- **Needs Optimization** - Images with issues
- **Being Analyzed** - Currently generating alt text
- **Optimized** - Completed images

### Bulk Operations

- **Select All** - Select all visible images
- **Clear** - Clear selection
- Select individual images using checkboxes

## API Endpoints

### List Images
```bash
GET /api/shopify/images?shop=your-shop.myshopify.com&status=NEEDS_ALT_TEXT&page=1&limit=50
```

### Scan Images
```bash
POST /api/shopify/images
Content-Type: application/json

{
  "shop": "your-shop.myshopify.com"
}
```

### Generate Alt Text
```bash
POST /api/shopify/images/generate-alt
Content-Type: application/json

{
  "shop": "your-shop.myshopify.com",
  "imageIds": ["img_123", "img_456"]
}
```

### Apply Fixes
```bash
POST /api/shopify/images/apply-fixes
Content-Type: application/json

{
  "shop": "your-shop.myshopify.com",
  "imageIds": ["img_123", "img_456"]
}
```

## Automation

To integrate with daily automation, call `runImageOptimization()`:

```typescript
import { runImageOptimization } from '@/lib/automation-engine'

await runImageOptimization({
  connectionId: connection.id,
  userId: user.id,
  shop: 'your-shop.myshopify.com',
  executionMode: 'AUTOMATIC' // or 'PLAN' or 'APPROVE'
})
```

**Behavior by Execution Mode:**
- **AUTOMATIC** - Generates and applies fixes immediately, sends success notification
- **PLAN** - Generates suggestions, creates notification for batch approval
- **APPROVE** - Generates suggestions, creates notification for individual review

## Troubleshooting

### Images not scanning
- Verify Shopify connection is active
- Check that products have images
- Look for GraphQL API errors in console

### Alt text generation fails
- Verify `ANTHROPIC_API_KEY` is set correctly
- Check Claude API quota/limits
- Ensure images are publicly accessible (no authentication required)
- Check network connectivity to images

### Fixes not applying
- Verify Shopify OAuth permissions include `write_products`
- Check that images belong to products (not collections or pages)
- Look for Shopify API errors in console/logs

### TypeScript Errors
- Run `npx prisma generate` to regenerate Prisma client
- Check that all dependencies are installed
- Verify `@anthropic-ai/sdk` version is compatible

## Performance Tips

1. **Batch Size**: System processes 5 images concurrently by default
   - Adjust in `image-optimizer.ts` `maxConcurrent` parameter

2. **Rate Limiting**: 1-second delay between batches
   - Prevents Claude API rate limit errors
   - Can be adjusted based on your API tier

3. **Image Limits**: Automation limits to 20 images per run
   - Prevents long-running jobs
   - Can be adjusted in `automation-engine.ts`

4. **Filtering**: Use status filters to reduce data loaded
   - Improves page performance with large catalogs

## Cost Estimation

**Claude API Costs** (approximate):
- Input: ~1,000 tokens + image per request
- Output: ~200 tokens per response
- Cost: ~$0.01 per image

**Example Costs:**
- 100 images = ~$1
- 1,000 images = ~$10
- 10,000 images = ~$100

**Tips to Reduce Costs:**
1. Only generate alt text for images that need it (missing alt text)
2. Review and approve AI suggestions before applying
3. Use caching - don't regenerate for images that already have suggestions
4. Batch process during off-peak hours

## Features Roadmap

### Implemented
- [x] Image scanning from Shopify products
- [x] AI alt text generation using Claude Vision
- [x] Batch processing with rate limiting
- [x] Bulk apply fixes to Shopify
- [x] Status filtering and pagination
- [x] Integration with automation engine
- [x] Audit trail and fix records

### Planned
- [ ] Image compression and WebP conversion
- [ ] Responsive image srcset generation
- [ ] Manual alt text editing interface
- [ ] A/B testing alt text variations
- [ ] Multi-language alt text generation
- [ ] Image performance monitoring
- [ ] Scheduled automatic scans
- [ ] Advanced analytics and reporting

## Support

For issues or questions:
1. Check console logs for error details
2. Verify environment variables are set
3. Test API endpoints directly with curl/Postman
4. Review `IMAGE-OPTIMIZATION-SYSTEM.md` for technical details

## Examples

### Example 1: Scan and fix all images missing alt text

```typescript
// 1. Scan images
const scanResponse = await fetch('/api/shopify/images', {
  method: 'POST',
  body: JSON.stringify({ shop: 'example.myshopify.com' })
})

// 2. Get images needing alt text
const listResponse = await fetch('/api/shopify/images?shop=example.myshopify.com&status=NEEDS_ALT_TEXT')
const { images } = await listResponse.json()

// 3. Generate alt text
const generateResponse = await fetch('/api/shopify/images/generate-alt', {
  method: 'POST',
  body: JSON.stringify({
    shop: 'example.myshopify.com',
    imageIds: images.map(img => img.id)
  })
})

// 4. Apply fixes
const applyResponse = await fetch('/api/shopify/images/apply-fixes', {
  method: 'POST',
  body: JSON.stringify({
    shop: 'example.myshopify.com',
    imageIds: images.map(img => img.id)
  })
})
```

### Example 2: Get optimization statistics

```typescript
const response = await fetch('/api/shopify/images?shop=example.myshopify.com&limit=1')
const { stats } = await response.json()

console.log(`Total: ${stats.totalImages}`)
console.log(`Missing Alt: ${stats.missingAlt}`)
console.log(`Optimized: ${stats.optimized} (${stats.percentOptimized}%)`)
```

## Success Metrics

Track these KPIs to measure image optimization impact:
- **Alt Text Coverage**: % of images with alt text
- **Optimization Rate**: Images optimized per day/week
- **AI Accuracy**: % of AI suggestions accepted
- **Time Savings**: Manual hours saved
- **SEO Impact**: Organic traffic from image search

## Conclusion

The image optimization system is ready to use! Start by scanning your products, review AI suggestions, and apply fixes to improve your store's SEO and accessibility.

For technical details, see `IMAGE-OPTIMIZATION-SYSTEM.md`.
