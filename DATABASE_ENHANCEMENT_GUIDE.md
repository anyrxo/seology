# SEOLOGY.AI Database Schema Enhancement Guide

## Overview

The enhanced database schema transforms SEOLOGY.AI from a basic SEO tool into a **comprehensive SEO intelligence platform**. The new schema adds 20+ sophisticated models that capture:

- Page-level SEO data with Core Web Vitals
- Keyword tracking with rankings and competition
- Competitor analysis and comparison
- AI-generated insights with confidence scores
- Content optimization suggestions
- Backlink monitoring
- Site health scores over time
- Business goals and conversion tracking

---

## 📊 New Data Models (20+ Tables)

### 1. **Page-Level SEO Tracking**

#### `Page` Model
Comprehensive page-level SEO data for every URL on connected sites.

**Key Features:**
- ✅ Complete meta tag analysis (title, description, OG tags, Twitter cards)
- ✅ Heading structure analysis (H1-H3 counts and hierarchy)
- ✅ Image optimization tracking (alt text, missing alts)
- ✅ Link analysis (internal, external, broken)
- ✅ Core Web Vitals (LCP, FID, CLS, FCP, TTFB)
- ✅ Content quality metrics (word count, readability, keyword density)
- ✅ Mobile optimization scores
- ✅ SEO score with detailed breakdown
- ✅ Analytics integration (page views, bounce rate, time on page)

**Example Data:**
```typescript
{
  url: "https://example.com/products/laptop",
  pageType: "PRODUCT",
  seoScore: 78.5,
  wordCount: 1250,
  readingTime: 5,
  h1Count: 1,
  h1Text: "Best Gaming Laptop 2024",
  totalImages: 8,
  imagesWithAlt: 6,
  lcp: 2.1, // seconds
  cls: 0.05,
  loadTime: 1800, // ms
  mobileScore: 85,
  keywordDensity: {
    "gaming laptop": 2.3,
    "best laptop": 1.8
  }
}
```

#### `PageSnapshot` Model
Historical snapshots for tracking improvements over time.

**Use Case:** "Show me how this page's SEO score improved after we applied fixes last month"

---

### 2. **Keyword Intelligence**

#### `Keyword` Model
Tracks keywords with search volume, difficulty, and trends.

**Key Features:**
- Search volume and difficulty scores
- Cost-per-click (CPC) data
- Keyword intent classification (informational, transactional, etc.)
- Trend analysis (rising, stable, declining)
- Seasonality data
- Priority ranking

**Example:**
```typescript
{
  keyword: "best gaming laptop",
  searchVolume: 45000,
  difficulty: 72.5,
  cpc: 3.45,
  intent: "COMMERCIAL",
  trend: "rising",
  priority: 1
}
```

#### `PageKeyword` Junction Table
Links keywords to specific pages with optimization scores.

**Tracks:**
- Target keyword designation
- Keyword density and prominence
- On-page optimization (in title, H1, URL, meta, alt text)
- Optimization score (0-100)

#### `KeywordRanking` Model
Historical ranking data with SERP feature tracking.

**Captures:**
- Position changes over time
- SERP features (featured snippets, PAA, local pack, etc.)
- Desktop vs mobile rankings
- Estimated traffic and CTR
- Competitive movement

**Example Timeline:**
```
Day 1:  Position 15 → No features
Day 7:  Position 12 → Moved up 3 spots
Day 14: Position 8  → Featured in "People Also Ask"
Day 21: Position 5  → Estimated 850 monthly visitors
```

---

### 3. **Competitor Analysis**

#### `Competitor` Model
Tracks competitor sites with authority metrics.

**Data Captured:**
- Domain Authority (DA) and Page Authority (PA)
- Total backlinks
- Organic traffic estimates
- Market share
- Competitive strength scoring

#### `CompetitorKeyword` Model
Tracks competitor rankings for your target keywords.

**Identifies:**
- Competitive gaps (keywords they rank for that you don't)
- Opportunities (keywords where you're close to overtaking them)
- Position differences
- Ranking URLs

#### `CompetitorComparison` Model
AI-generated comparative analysis.

**Provides:**
- Overall competitive score
- Content comparison
- Technical SEO comparison
- Backlink profile comparison
- AI insights on how to outrank them

---

### 4. **AI Insights & Recommendations**

#### `AIInsight` Model
Sophisticated AI-generated insights with confidence scores.

**Insight Types:**
- `CONTENT_OPPORTUNITY` - Missing content gaps
- `TECHNICAL_ISSUE` - Technical problems affecting rankings
- `KEYWORD_OPPORTUNITY` - Low-hanging fruit keywords
- `COMPETITOR_INSIGHT` - Competitive intelligence
- `RANKING_ALERT` - Sudden ranking changes
- `TRAFFIC_ANOMALY` - Unusual traffic patterns
- `LINK_BUILDING` - Backlink opportunities
- `USER_EXPERIENCE` - UX improvements
- `PERFORMANCE` - Speed optimization
- `MOBILE_OPTIMIZATION` - Mobile issues

**Example Insight:**
```typescript
{
  type: "KEYWORD_OPPORTUNITY",
  title: "High-Volume Keyword Gap Detected",
  description: "Your competitors rank for 'gaming laptop under $1000' but you don't",
  insight: "This keyword has 28,000 monthly searches with medium difficulty. Your product page is 80% optimized for this keyword - adding it to your title and H1 could help you rank within 2-3 months.",
  reasoning: "You already have relevant content, good domain authority, and similar pages ranking. Small tweaks could capture significant traffic.",
  priority: "HIGH",
  confidence: 87.5,
  estimatedImpact: 15.3, // 15.3% traffic increase
  implementationComplexity: "easy",
  estimatedTime: "30 minutes",
  suggestedActions: [
    "Add keyword to page title",
    "Include in H1 heading",
    "Add FAQ section targeting this keyword",
    "Build 2-3 internal links using this anchor text"
  ]
}
```

**Status Tracking:**
- NEW → ACKNOWLEDGED → IN_PROGRESS → IMPLEMENTED
- Tracks actual impact vs. predicted impact
- Measures insight effectiveness

---

### 5. **Content Optimization**

#### `ContentSuggestion` Model
Specific, actionable content improvement suggestions.

**Suggestion Types:**
- Add missing sections
- Improve headings
- Expand thin content
- Add internal links
- Optimize images
- Add CTAs
- Improve readability
- Add schema markup
- Optimize for keywords
- Improve meta tags

**Example:**
```typescript
{
  type: "EXPAND_CONTENT",
  pageUrl: "/blog/seo-tips",
  title: "Add 'Common Mistakes' Section",
  currentContent: "Article has 850 words",
  suggestedContent: "Add a 300-word section on '5 Common SEO Mistakes to Avoid'",
  reason: "Competitors ranking above you all have this section. It addresses user intent and increases dwell time.",
  expectedBenefit: "Estimated 20% increase in engagement, potential 5-position ranking improvement",
  priority: "MEDIUM"
}
```

---

### 6. **Site Health Monitoring**

#### `SiteHealthScore` Model
Time-series site health data with trend analysis.

**Tracks:**
- Overall SEO score (0-100)
- Content quality score
- Technical SEO score
- Performance score
- Mobile optimization score
- Security score

**Score Breakdown:**
```typescript
{
  overallScore: 82.5,
  contentScore: 85,
  technicalScore: 78,
  performanceScore: 90,
  mobileScore: 88,
  securityScore: 95,

  criticalIssues: 2,
  highIssues: 5,
  mediumIssues: 12,
  lowIssues: 23,

  previousScore: 79.3,
  scoreChange: +3.2,
  trend: "improving",

  improvementSuggestions: [
    "Fix 2 critical mobile usability issues",
    "Optimize 5 slow-loading product images",
    "Add schema markup to 8 blog posts"
  ]
}
```

---

### 7. **Backlink Intelligence**

#### `Backlink` Model
Comprehensive backlink tracking and quality assessment.

**Captures:**
- Source domain and page
- Target page on your site
- Anchor text
- Link authority metrics (DA, PA, Trust Flow, Citation Flow)
- Link attributes (dofollow, nofollow, sponsored, UGC)
- Link status (active, lost, broken, redirected)
- Discovery and loss dates

**Use Cases:**
- Monitor backlink profile growth
- Detect lost backlinks immediately
- Identify toxic links
- Find link-building opportunities
- Track competitor backlinks

---

### 8. **Business Goals & Conversion Tracking**

#### `BusinessGoal` Model
Aligns SEO efforts with business objectives.

**Goal Types:**
- Traffic targets
- Ranking goals
- Conversion objectives
- Revenue targets
- Engagement metrics
- Brand awareness KPIs

**Example Goal:**
```typescript
{
  name: "Q1 2024 Traffic Goal",
  type: "TRAFFIC",
  description: "Increase organic traffic by 40%",
  targetMetric: "organic_visitors",
  targetValue: 50000,
  currentValue: 35700,
  progress: 71.4,
  onTrack: true,
  startDate: "2024-01-01",
  endDate: "2024-03-31",
  milestones: [
    {
      name: "Reach 40K visitors",
      targetValue: 40000,
      achieved: true,
      achievedAt: "2024-02-15"
    },
    {
      name: "Reach 45K visitors",
      targetValue: 45000,
      achieved: false,
      dueDate: "2024-03-15"
    }
  ]
}
```

---

### 9. **Page-Specific Issues**

#### `PageIssue` Model
Granular issue tracking at the page level (separate from global `Issue` model).

**Enhanced Tracking:**
- CSS selectors and XPath for precise location
- Current vs. expected values
- Auto-fixable flags
- Line numbers for code issues
- Element-specific problems

---

### 10. **Page Improvements**

#### `PageImprovement` Model
Tracks every improvement applied to pages with before/after metrics.

**Captures:**
- What was changed
- Metrics before the change
- Metrics after the change
- Actual vs. predicted impact
- Time to see results

**Use Case:** "Prove ROI by showing how each fix improved rankings and traffic"

---

## 🔄 How These Models Work Together

### Example User Journey:

1. **User connects Shopify store**
   - `Connection` created
   - `Crawl` job triggered

2. **Site gets crawled**
   - 50 `Page` records created
   - Each page analyzed for SEO
   - `PageIssue` records created for problems found

3. **AI analyzes data**
   - Identifies 15 `Keyword` opportunities
   - Creates `PageKeyword` associations
   - Generates `AIInsight` records with recommendations
   - Creates `ContentSuggestion` for improvements

4. **Keyword tracking begins**
   - Daily `KeywordRanking` checks
   - Tracks position changes
   - Monitors SERP features

5. **Competitor analysis**
   - `Competitor` records for top 3 competitors
   - `CompetitorKeyword` tracking their rankings
   - `CompetitorComparison` AI analysis

6. **User applies fixes**
   - `Fix` records created
   - `PageImprovement` tracks before/after
   - `PageSnapshot` captures state

7. **Results measured**
   - `SiteHealthScore` improves over time
   - `KeywordRanking` positions increase
   - `BusinessGoal` progress tracked
   - `Metric` records show traffic growth

---

## 📈 Business Intelligence Queries

### Example Analytics Queries:

**1. "Show SEO progress over 3 months"**
```sql
SELECT
  date,
  overallScore,
  criticalIssues,
  highIssues
FROM SiteHealthScore
WHERE connectionId = 'xxx'
ORDER BY date DESC
LIMIT 90;
```

**2. "Which keywords improved the most?"**
```sql
SELECT
  k.keyword,
  kr_old.position AS old_position,
  kr_new.position AS new_position,
  (kr_old.position - kr_new.position) AS improvement
FROM Keyword k
JOIN KeywordRanking kr_old ON kr_old.keywordId = k.id
JOIN KeywordRanking kr_new ON kr_new.keywordId = k.id
WHERE kr_old.checkedAt = '2024-01-01'
  AND kr_new.checkedAt = '2024-03-01'
ORDER BY improvement DESC
LIMIT 10;
```

**3. "What's our competitive position?"**
```sql
SELECT
  c.domain,
  c.domainAuthority,
  COUNT(ck.id) AS keywords_they_rank_for,
  AVG(ck.position) AS avg_position
FROM Competitor c
JOIN CompetitorKeyword ck ON ck.competitorId = c.id
GROUP BY c.id
ORDER BY keywords_they_rank_for DESC;
```

**4. "Which AI insights had the biggest impact?"**
```sql
SELECT
  type,
  title,
  estimatedImpact,
  actualImpact,
  (actualImpact - estimatedImpact) AS accuracy
FROM AIInsight
WHERE status = 'IMPLEMENTED'
  AND actualImpact IS NOT NULL
ORDER BY actualImpact DESC
LIMIT 10;
```

---

## 🚀 Implementation Steps

### Step 1: Merge Schema Files

Add the enhanced models to your main `schema.prisma`:

```prisma
// At the end of your existing schema.prisma, add:

// Add Connection relations
model Connection {
  // ... existing fields ...

  // ADD THESE NEW RELATIONS:
  pages                Page[]
  keywords             Keyword[]
  competitors          Competitor[]
  aiInsights           AIInsight[]
  contentSuggestions   ContentSuggestion[]
  siteHealthScores     SiteHealthScore[]
  backlinks            Backlink[]
  businessGoals        BusinessGoal[]
  competitorComparisons CompetitorComparison[]
}

// Then copy all models from schema-enhancement.prisma
```

### Step 2: Generate Migration

```bash
npx prisma migrate dev --name add_advanced_seo_models
```

### Step 3: Generate Client

```bash
npx prisma generate
```

### Step 4: Update Crawler

Modify `lib/crawler.ts` to populate these new models:

```typescript
// Example: Save page data during crawl
async function analyzePage(url: string, connectionId: string) {
  const pageData = await scrapePageData(url)

  await db.page.create({
    data: {
      connectionId,
      url: pageData.url,
      title: pageData.title,
      description: pageData.description,
      wordCount: pageData.wordCount,
      h1Count: pageData.headings.h1.length,
      h1Text: pageData.headings.h1[0],
      totalImages: pageData.images.length,
      imagesWithAlt: pageData.images.filter(img => img.alt).length,
      seoScore: calculateSEOScore(pageData),
      // ... more fields
    }
  })
}
```

### Step 5: Implement AI Insights

Create `lib/ai-insights.ts`:

```typescript
export async function generateInsights(connectionId: string) {
  // Fetch all pages, keywords, competitors
  const data = await db.connection.findUnique({
    where: { id: connectionId },
    include: {
      pages: true,
      keywords: { include: { rankings: true } },
      competitors: { include: { keywords: true } }
    }
  })

  // Use Claude AI to analyze
  const insights = await claudeAI.analyze(data)

  // Save insights
  for (const insight of insights) {
    await db.aIInsight.create({
      data: {
        connectionId,
        type: insight.type,
        title: insight.title,
        description: insight.description,
        insight: insight.fullAnalysis,
        priority: insight.priority,
        confidence: insight.confidence,
        estimatedImpact: insight.impact
      }
    })
  }
}
```

---

## 💡 Use Cases

### 1. **Comprehensive Site Audit**
Pull all Page, PageIssue, and SiteHealthScore data to generate a complete site audit report.

### 2. **Keyword Strategy Dashboard**
Show keyword rankings over time, opportunities, and competitive gaps.

### 3. **ROI Reporting**
Track BusinessGoal progress, show actual vs. estimated impact of fixes, prove value to stakeholders.

### 4. **Competitor Intelligence**
Monitor competitor movements, identify their strategies, find gaps to exploit.

### 5. **Content Planning**
Use ContentSuggestion and AIInsight data to prioritize content creation and optimization.

### 6. **Technical SEO Monitoring**
Track Core Web Vitals, page speed, mobile scores over time.

### 7. **Link Building**
Monitor backlink growth, identify lost links, track competitor link profiles.

---

## 📊 Dashboard Widgets to Build

With this data, you can create powerful dashboard widgets:

1. **SEO Health Trend Chart** (SiteHealthScore over time)
2. **Keyword Position Tracker** (KeywordRanking timeline)
3. **Top Opportunities Card** (High-impact AIInsights)
4. **Competitor Comparison Table** (Competitor data)
5. **Page Performance Grid** (Page SEO scores)
6. **Content Suggestions Feed** (ContentSuggestion queue)
7. **Backlink Monitor** (Backlink status and growth)
8. **Business Goal Progress** (BusinessGoal milestones)

---

## 🔐 Performance Considerations

### Indexes Created:
- All foreign keys indexed
- Frequently queried fields indexed (status, date, score, etc.)
- Composite indexes for common query patterns

### Data Retention:
- PageSnapshot: Keep 90 days
- KeywordRanking: Keep 12 months
- SiteHealthScore: Keep indefinitely (historical trend data)
- AIInsight: Archive after implemented + 30 days

### Query Optimization:
- Use `include` selectively (don't fetch all relations)
- Implement pagination for large result sets
- Cache frequently accessed data (Redis)
- Use database views for complex analytics queries

---

## 🎯 Next Steps

1. ✅ Review enhanced schema models
2. ⬜ Merge into main schema.prisma
3. ⬜ Run migrations
4. ⬜ Update crawler to populate Page data
5. ⬜ Implement AI insights generation
6. ⬜ Build keyword tracking system
7. ⬜ Create competitor analysis pipeline
8. ⬜ Build dashboard widgets using new data
9. ⬜ Add data visualization charts
10. ⬜ Implement business goal tracking

---

## 📚 Additional Resources

- **Prisma Documentation**: https://www.prisma.io/docs
- **Database Design Best Practices**: Focus on normalization while maintaining query performance
- **Time-Series Data**: Consider TimescaleDB extension for PostgreSQL if time-series queries become slow
- **Full-Text Search**: Consider pg_trgm extension for advanced search capabilities

---

## 💬 Questions?

This schema provides a **professional-grade SEO platform database** that captures the full richness of SEO data, user behavior, competitive intelligence, and business impact.

The data model supports:
- ✅ Advanced analytics and reporting
- ✅ AI-powered insights and recommendations
- ✅ Competitive intelligence
- ✅ ROI measurement
- ✅ Business goal alignment
- ✅ Historical trend analysis
- ✅ Comprehensive site audits

**Ready to transform SEOLOGY.AI into an industry-leading SEO intelligence platform!** 🚀
