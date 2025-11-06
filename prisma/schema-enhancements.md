# SEOLOGY.AI Database Schema Enhancements
## Advanced SEO Features Support

**Date**: 2025-11-06
**Purpose**: Extend existing schema to support advanced SEO features while maintaining backward compatibility
**Strategy**: Additive changes only - no breaking changes to existing models

---

## Table of Contents
1. [New Enums](#new-enums)
2. [Model Enhancements](#model-enhancements)
3. [New Models](#new-models)
4. [Indexes for Performance](#indexes-for-performance)
5. [Migration Strategy](#migration-strategy)
6. [Example Queries](#example-queries)

---

## 1. NEW ENUMS

### RobotsDirective
For meta robots tags (noindex, nofollow, etc.)

```prisma
enum RobotsDirective {
  INDEX           // Default - allow indexing
  NOINDEX         // Prevent indexing
  FOLLOW          // Follow links (default)
  NOFOLLOW        // Don't follow links
  NOARCHIVE       // Don't show cached version
  NOSNIPPET       // Don't show snippet in search results
  NOIMAGEINDEX    // Don't index images on page
  NOTRANSLATE     // Don't offer translation
  MAX_SNIPPET     // Max snippet length
  MAX_IMAGE_PREVIEW // Max image preview size
  MAX_VIDEO_PREVIEW // Max video preview size
}
```

### SchemaType
For Schema.org structured data types

```prisma
enum SchemaType {
  ORGANIZATION
  WEBSITE
  WEBPAGE
  ARTICLE
  BLOG_POSTING
  NEWS_ARTICLE
  PRODUCT
  OFFER
  AGGREGATE_RATING
  REVIEW
  BREADCRUMB_LIST
  FAQ_PAGE
  HOW_TO
  RECIPE
  EVENT
  LOCAL_BUSINESS
  PERSON
  VIDEO_OBJECT
  IMAGE_OBJECT
  SEARCH_ACTION
  SITE_NAVIGATION_ELEMENT
}
```

### CanonicalStatus
For canonical URL validation

```prisma
enum CanonicalStatus {
  VALID         // Canonical URL is properly set and valid
  MISSING       // No canonical tag present
  INVALID       // Canonical URL is malformed or inaccessible
  SELF          // Self-referencing canonical (correct)
  DUPLICATE     // Points to another page (potential issue)
  CONFLICT      // Multiple canonical tags present
  HTTPS_ISSUE   // HTTP/HTTPS mismatch
}
```

### OpenGraphType
For OG content types

```prisma
enum OpenGraphType {
  WEBSITE
  ARTICLE
  PRODUCT
  VIDEO
  BOOK
  PROFILE
  MUSIC_SONG
  MUSIC_ALBUM
  MUSIC_PLAYLIST
  VIDEO_MOVIE
  VIDEO_EPISODE
  VIDEO_TV_SHOW
  VIDEO_OTHER
}
```

### TwitterCardType
For Twitter Card types

```prisma
enum TwitterCardType {
  SUMMARY
  SUMMARY_LARGE_IMAGE
  APP
  PLAYER
}
```

### GSCDataType
For Google Search Console metric types

```prisma
enum GSCDataType {
  WEB          // Web search results
  IMAGE        // Image search results
  VIDEO        // Video search results
  NEWS         // News search results
  DISCOVER     // Google Discover
  GOOGLE_NEWS  // Google News
}
```

### MetricChangeType
For tracking metric changes

```prisma
enum MetricChangeType {
  IMPROVEMENT  // Positive change
  DECLINE      // Negative change
  STABLE       // No significant change
  VOLATILE     // High variance
}
```

---

## 2. MODEL ENHANCEMENTS

### A. Issue Model - Add New Issue Types

**New Fields**:
```prisma
// Add to existing Issue model:

// Canonical URL issues
canonicalUrl        String?
canonicalStatus     CanonicalStatus?
canonicalTarget     String? // What it should be

// Robots meta issues
robotsDirectives    String  @default("[]") // JSON array of RobotsDirective
recommendedRobots   String  @default("[]") // JSON array of recommended directives

// Structured data issues
missingSchemaTypes  String  @default("[]") // JSON array of SchemaType
invalidSchemaMarkup String  @default("{}") // JSON object of validation errors

// Social media metadata
ogIssues            String  @default("{}") // JSON object of OG issues
twitterIssues       String  @default("{}") // JSON object of Twitter Card issues

// Image optimization
imageCount          Int     @default(0)
imagesWithoutAlt    Int     @default(0)
imagesNeedOptimize  Int     @default(0)
largeImagesBytes    Int     @default(0)

// Tracking data
affectedUrls        String  @default("[]") // JSON array of URLs with this issue
```

**New Issue Types** (add to existing type field values):
- `missing_canonical`
- `invalid_canonical`
- `duplicate_canonical`
- `missing_schema_markup`
- `invalid_schema_markup`
- `missing_og_tags`
- `invalid_og_tags`
- `missing_twitter_card`
- `invalid_twitter_card`
- `incorrect_robots_meta`
- `noindex_valuable_page`
- `image_alt_text_missing`
- `image_optimization_needed`
- `large_image_filesize`

### B. Fix Model - Enhanced Impact Tracking

**New Fields**:
```prisma
// Add to existing Fix model:

// Pre/post metrics for comparison
metricsSnapshot     String  @default("{}") // JSON snapshot at fix time

// Traffic impact (from GSC data)
trafficBefore7d     Int?    // 7 days before
trafficAfter7d      Int?    // 7 days after
trafficBefore30d    Int?    // 30 days before
trafficAfter30d     Int?    // 30 days after
clicksBefore        Int?
clicksAfter         Int?
impressionsBefore   Int?
impressionsAfter    Int?

// Ranking impact
rankingsBefore      String  @default("{}") // JSON: keyword → position
rankingsAfter       String  @default("{}") // JSON: keyword → position
avgPositionChange   Float?  // Average ranking change

// Performance impact
loadTimeBefore      Float?  // milliseconds
loadTimeAfter       Float?
seoScoreBefore      Float?  // 0-100
seoScoreAfter       Float?

// Metadata
fixCategory         String? // 'metadata', 'technical', 'content', 'images', 'structured_data'
affectedUrls        String  @default("[]") // JSON array of URLs affected

// Measurement timing
metricsLastUpdated  DateTime?
nextMetricUpdate    DateTime? // Schedule next measurement
```

**New Indexes**:
```prisma
@@index([fixCategory])
@@index([metricsLastUpdated])
```

### C. Page Model - Add Missing SEO Fields

**New Fields**:
```prisma
// Add to existing Page model:

// Canonical URL tracking
canonicalUrl        String?
canonicalStatus     CanonicalStatus @default(VALID)
canonicalIssues     String          @default("[]") // JSON array of issues

// Robots meta tags
robotsDirectives    String  @default("[]") // JSON array: ['index', 'follow']
robotsMetaTag       String? // Full robots meta content
hasNoindex          Boolean @default(false)
hasNofollow         Boolean @default(false)

// Open Graph metadata (enhanced)
ogType              OpenGraphType?
ogTitle             String?
ogDescription       String?
ogImage             String?
ogImageWidth        Int?
ogImageHeight       Int?
ogUrl               String?
ogSiteName          String?
ogLocale            String?

// Twitter Card metadata (enhanced)
twitterCard         TwitterCardType?
twitterTitle        String?
twitterDescription  String?
twitterImage        String?
twitterSite         String? // @username
twitterCreator      String? // @username

// Structured data (enhanced)
structuredDataTypes String  @default("[]") // JSON array of SchemaType present
structuredDataValid Boolean @default(true)
structuredDataErrors String @default("[]") // JSON array of validation errors
primarySchemaType   SchemaType?

// Traffic data (from GSC or analytics)
clicks7d            Int?    // Last 7 days
clicks30d           Int?    // Last 30 days
impressions7d       Int?
impressions30d      Int?
avgPosition         Float?  // Average search position
ctr                 Float?  // Click-through rate

// Change tracking
lastContentChange   DateTime?
lastMetaChange      DateTime?
lastSchemaChange    DateTime?
contentChangeHash   String? // Detect content changes
```

**New Indexes**:
```prisma
@@index([canonicalStatus])
@@index([hasNoindex])
@@index([primarySchemaType])
@@index([avgPosition])
@@index([clicks30d])
```

### D. ImageAsset Model - Enhanced Fields

**New Fields**:
```prisma
// Add to existing ImageAsset model:

// Schema.org ImageObject support
schemaMarkup        String? // JSON schema.org ImageObject
contentUrl          String? // Canonical URL of the image
thumbnailUrl        String?
representativeOfPage Boolean @default(false)

// Additional SEO context
imageContext        String? // 'product_main', 'product_gallery', 'hero', 'thumbnail', 'icon'
associatedProduct   String? // Product ID if product image
associatedKeywords  String  @default("[]") // JSON array of target keywords

// Accessibility
hasAriaLabel        Boolean @default(false)
ariaLabel           String?
isFigure            Boolean @default(false)
figCaption          String?

// Advanced optimization
hasWebP             Boolean @default(false)
hasAvif             Boolean @default(false)
modernFormatUrls    String  @default("{}") // JSON: { webp: url, avif: url }
cdnUrl              String? // CDN-served URL
compressionQuality  Int? // 0-100

// Performance metrics
estimatedLoadTime   Float? // milliseconds
impactOnLCP         Boolean @default(false) // Is this the LCP element?
```

**New Indexes**:
```prisma
@@index([imageContext])
@@index([associatedProduct])
@@index([impactOnLCP])
```

### E. ShopifyProduct Model - Add Schema.org Support

**New Fields**:
```prisma
// Add to existing ShopifyProduct model:

// Structured data
hasProductSchema    Boolean @default(false)
schemaMarkup        String? // JSON Product schema
schemaValid         Boolean @default(true)
schemaErrors        String  @default("[]") // JSON array of errors

// Product identifiers for schema
gtin                String? // Global Trade Item Number
mpn                 String? // Manufacturer Part Number
sku                 String?
brand               String? // Brand name

// Offer schema data
availability        String? // 'InStock', 'OutOfStock', 'PreOrder'
condition           String  @default("NewCondition") // 'NewCondition', 'UsedCondition', etc.

// Rating/Review schema
hasAggregateRating  Boolean @default(false)
ratingValue         Float?
reviewCount         Int?
bestRating          Float   @default(5)
worstRating         Float   @default(1)

// Breadcrumb schema
hasBreadcrumbSchema Boolean @default(false)
breadcrumbPath      String? // JSON array of breadcrumb items
```

**New Indexes**:
```prisma
@@index([hasProductSchema])
@@index([hasAggregateRating])
@@index([availability])
```

---

## 3. NEW MODELS

### A. StructuredData Model
Track Schema.org structured data on pages

```prisma
model StructuredData {
  id     String @id @default(uuid())
  pageId String
  page   Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)

  // Schema identification
  schemaType      SchemaType
  schemaVersion   String     @default("schema.org") // schema.org, version

  // Schema content
  schemaJson      String     @db.Text // Complete JSON-LD markup
  schemaContext   String     @default("https://schema.org")

  // Validation
  isValid         Boolean    @default(true)
  validationErrors String    @default("[]") // JSON array of errors
  validationWarnings String  @default("[]") // JSON array of warnings
  lastValidated   DateTime?

  // Status
  status          SchemaStatus @default(ACTIVE)
  isGenerated     Boolean      @default(false) // Was it AI-generated?

  // Impact
  richResultTypes String       @default("[]") // JSON array: ['Product', 'Review', etc.]
  isEligible      Boolean      @default(true) // Eligible for rich results?

  // Relationships to other schemas
  parentSchemaId  String? // For nested schemas
  relatedSchemas  String  @default("[]") // JSON array of related schema IDs

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([pageId])
  @@index([schemaType])
  @@index([status])
  @@index([isValid])
  @@index([isEligible])
}

enum SchemaStatus {
  ACTIVE      // Currently on page
  INACTIVE    // Removed from page
  PENDING     // Generated, awaiting implementation
  DEPRECATED  // Old version, should update
  INVALID     // Failed validation
}
```

### B. CanonicalMapping Model
Track canonical URL relationships and issues

```prisma
model CanonicalMapping {
  id              String          @id @default(uuid())
  connectionId    String
  connection      Connection      @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  // URL relationships
  sourceUrl       String          // The page with the canonical tag
  canonicalUrl    String          // The canonical URL it points to

  // Status
  status          CanonicalStatus @default(VALID)
  httpStatus      Int?            // HTTP status of canonical URL

  // Validation
  isSelfReferencing Boolean       @default(false)
  isDuplicate       Boolean       @default(false)
  isChained         Boolean       @default(false) // Canonical chain detected
  chainLength       Int?          // If chained, how many hops?

  // Issues
  issues            String        @default("[]") // JSON array of issues
  recommendation    String?       // AI recommendation

  // Cross-domain
  isCrossDomain     Boolean       @default(false)
  targetDomain      String?

  // HTTPS/HTTP consistency
  hasProtocolMismatch Boolean     @default(false)
  sourceProtocol      String?     // 'http' or 'https'
  targetProtocol      String?

  // Impact
  affectsIndexing   Boolean       @default(false)
  estimatedImpact   Float?        // SEO impact score 0-100

  // Tracking
  firstDetected     DateTime      @default(now())
  lastVerified      DateTime      @default(now())
  verificationCount Int           @default(1)

  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  @@unique([connectionId, sourceUrl])
  @@index([connectionId])
  @@index([status])
  @@index([canonicalUrl])
  @@index([isDuplicate])
  @@index([lastVerified])
}
```

### C. RobotsMetaTag Model
Track robots meta tags and directives

```prisma
model RobotsMetaTag {
  id              String @id @default(uuid())
  pageId          String
  page            Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)

  // Directives
  directives      String @default("[]") // JSON array of RobotsDirective
  rawContent      String? // Full meta robots content attribute

  // Parsed directives
  isIndexable     Boolean @default(true)
  isFollowable    Boolean @default(true)
  hasNoArchive    Boolean @default(false)
  hasNoSnippet    Boolean @default(false)
  hasNoImageIndex Boolean @default(false)

  // Max directives (if specified)
  maxSnippet      Int? // Character limit
  maxImagePreview String? // 'none', 'standard', 'large'
  maxVideoPreview Int? // Seconds

  // X-Robots-Tag HTTP header
  hasHttpHeader   Boolean @default(false)
  httpHeaderValue String?

  // Conflicts
  hasConflict     Boolean @default(false)
  conflictDetails String? // Description of meta vs header conflict

  // Issues
  hasIssues       Boolean @default(false)
  issues          String  @default("[]") // JSON array of issues
  recommendation  String? // What should be changed

  // Impact assessment
  blocksIndexing  Boolean @default(false)
  blocksSnippets  Boolean @default(false)
  isIntentional   Boolean @default(true) // Is this deliberate?
  estimatedImpact Float?  // Negative SEO impact if unintentional

  lastChecked     DateTime @default(now())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([pageId])
  @@index([pageId])
  @@index([blocksIndexing])
  @@index([hasConflict])
  @@index([hasIssues])
}
```

### D. OpenGraphMetadata Model
Comprehensive Open Graph tracking

```prisma
model OpenGraphMetadata {
  id     String @id @default(uuid())
  pageId String
  page   Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)

  // Core OG tags
  ogType        OpenGraphType?
  ogTitle       String?
  ogDescription String?       @db.Text
  ogUrl         String?
  ogImage       String?
  ogSiteName    String?

  // Image details
  ogImageUrl       String?
  ogImageSecureUrl String?
  ogImageType      String? // MIME type
  ogImageWidth     Int?
  ogImageHeight    Int?
  ogImageAlt       String?

  // Multiple images support
  ogImages         String  @default("[]") // JSON array of image objects

  // Locale
  ogLocale         String? @default("en_US")
  ogLocaleAlternate String @default("[]") // JSON array of alternate locales

  // Type-specific tags (Article)
  articlePublishedTime  DateTime?
  articleModifiedTime   DateTime?
  articleExpirationTime DateTime?
  articleAuthor         String?
  articleSection        String?
  articleTag            String  @default("[]") // JSON array

  // Type-specific tags (Product)
  productPrice    Float?
  productCurrency String?
  productBrand    String?
  productAvailability String?

  // Type-specific tags (Video)
  videoUrl        String?
  videoDuration   Int? // seconds
  videoReleaseDate DateTime?

  // Validation
  isComplete      Boolean @default(false) // Has all required tags
  isValid         Boolean @default(true)
  validationIssues String @default("[]") // JSON array of issues

  // Quality assessment
  qualityScore    Float?  // 0-100
  hasOptimalImage Boolean @default(false) // 1200x630 recommended
  hasAllRequired  Boolean @default(false)
  hasMissingTags  String  @default("[]") // JSON array of missing tags

  // Testing
  lastTestedUrl   String? // Facebook Sharing Debugger URL
  lastScraped     DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([pageId])
  @@index([pageId])
  @@index([ogType])
  @@index([isComplete])
  @@index([qualityScore])
}
```

### E. TwitterCardMetadata Model
Twitter Card tracking

```prisma
model TwitterCardMetadata {
  id     String @id @default(uuid())
  pageId String
  page   Page   @relation(fields: [pageId], references: [id], onDelete: Cascade)

  // Core Twitter Card tags
  twitterCard        TwitterCardType?
  twitterTitle       String?
  twitterDescription String?       @db.Text
  twitterImage       String?
  twitterImageAlt    String?

  // Account tags
  twitterSite        String? // @username for website
  twitterCreator     String? // @username for content creator

  // App card specific
  twitterAppNameIPhone   String?
  twitterAppIdIPhone     String?
  twitterAppNameIPad     String?
  twitterAppIdIPad       String?
  twitterAppNameGooglePlay String?
  twitterAppIdGooglePlay   String?

  // Player card specific
  twitterPlayer       String? // HTTPS URL to iframe
  twitterPlayerWidth  Int?
  twitterPlayerHeight Int?
  twitterPlayerStream String? // URL to raw video/audio stream

  // Image details
  imageUrl       String?
  imageWidth     Int?
  imageHeight    Int?

  // Validation
  isValid        Boolean @default(true)
  hasAllRequired Boolean @default(false)
  validationIssues String @default("[]") // JSON array

  // Quality
  qualityScore   Float? // 0-100
  imageMeetsSpec Boolean @default(false) // Meets size requirements

  // Fallback
  fallsBackToOG  Boolean @default(false) // Uses OG tags as fallback

  // Testing
  lastValidated  DateTime?

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@unique([pageId])
  @@index([pageId])
  @@index([twitterCard])
  @@index([isValid])
  @@index([qualityScore])
}
```

### F. GoogleSearchConsoleData Model
Store GSC metrics for traffic impact analysis

```prisma
model GoogleSearchConsoleData {
  id           String     @id @default(uuid())
  connectionId String
  connection   Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  pageId String? // Optional - can be site-wide or page-specific

  // Date range
  date          DateTime // Single date for daily data
  dataType      GSCDataType @default(WEB)

  // Core metrics
  clicks        Int     @default(0)
  impressions   Int     @default(0)
  ctr           Float?  // Click-through rate (clicks/impressions)
  position      Float?  // Average position in search results

  // Query-specific data (if available)
  query         String? // Search query
  queryPosition Int?    // Position for this specific query

  // Device breakdown
  deviceType    String? // 'DESKTOP', 'MOBILE', 'TABLET'

  // Country/location data
  country       String? // Country code (e.g., 'USA', 'GBR')

  // Search appearance
  searchAppearance String? // 'RICHRESULT', 'VIDEO', etc.

  // URL analysis
  url           String? // Specific URL from GSC

  // Comparison support
  clicksChange       Int?   // vs previous period
  impressionsChange  Int?   // vs previous period
  ctrChange          Float? // vs previous period
  positionChange     Float? // vs previous period

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@unique([connectionId, date, url, query, deviceType, country])
  @@index([connectionId])
  @@index([date])
  @@index([pageId])
  @@index([query])
  @@index([clicks])
  @@index([impressions])
  @@index([position])
}
```

### G. TrafficImpactMeasurement Model
Track before/after traffic impact of fixes

```prisma
model TrafficImpactMeasurement {
  id    String @id @default(uuid())
  fixId String
  fix   Fix    @relation(fields: [fixId], references: [id], onDelete: Cascade)

  // Measurement metadata
  measurementDate   DateTime @default(now())
  daysSinceFix      Int // Days elapsed since fix was applied
  measurementPeriod String  @default("7d") // '7d', '30d', '90d'

  // Traffic metrics
  clicks            Int
  impressions       Int
  ctr               Float
  avgPosition       Float

  // Baseline comparison (before fix)
  baselineClicks       Int
  baselineImpressions  Int
  baselineCtr          Float
  baselineAvgPosition  Float

  // Calculated changes
  clicksChange         Int   // Absolute change
  clicksChangePercent  Float // Percentage change
  impressionsChange    Int
  impressionsChangePercent Float
  ctrChange            Float
  positionChange       Float

  // Change classification
  changeType           MetricChangeType @default(STABLE)
  isSignificant        Boolean          @default(false) // Statistically significant?
  confidenceLevel      Float?           // 0-100 confidence in change

  // Revenue impact (if e-commerce)
  estimatedRevenueImpact Float? // In USD
  conversionRate         Float?
  actualRevenue          Float?

  // Additional context
  affectedPages      Int     @default(0) // Number of pages affected
  affectedKeywords   String  @default("[]") // JSON array
  topImprovements    String  @default("[]") // JSON array of biggest wins

  // Annotation
  notes              String?
  isAnomaly          Boolean @default(false) // Mark unusual data

  createdAt          DateTime @default(now())

  @@index([fixId])
  @@index([measurementDate])
  @@index([daysSinceFix])
  @@index([changeType])
  @@index([isSignificant])
}
```

### H. RankingPosition Model
Track keyword ranking positions over time (detailed)

```prisma
model RankingPosition {
  id              String     @id @default(uuid())
  connectionId    String
  connection      Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  // Keyword and page
  keywordId       String?
  keyword         Keyword?   @relation(fields: [keywordId], references: [id], onDelete: SetNull)
  pageId          String?
  page            Page?      @relation(fields: [pageId], references: [id], onDelete: SetNull)

  // If not linked to keyword model
  keywordText     String     // The actual keyword
  url             String     // The ranking URL

  // Position data
  position        Int        // 1-100+ position
  previousPosition Int?      // Position in previous check
  positionChange  Int?       // Change since last check

  // Search engine details
  searchEngine    String     @default("google") // 'google', 'bing', etc.
  locale          String     @default("en-US")
  location        String?    // Geographic location
  device          String     @default("desktop") // 'desktop', 'mobile', 'tablet'

  // SERP features
  hasFeaturedSnippet   Boolean @default(false)
  hasVideoCarousel     Boolean @default(false)
  hasImagePack         Boolean @default(false)
  hasPeopleAlsoAsk     Boolean @default(false)
  hasLocalPack         Boolean @default(false)
  hasKnowledgePanel    Boolean @default(false)
  hasRelatedSearches   Boolean @default(false)
  serpFeatures         String  @default("[]") // JSON array of all features

  // Competition analysis
  topCompetitors       String  @default("[]") // JSON array of domains in top 10
  domainsSameKeyword   Int?    // How many domains rank for this

  // Metrics
  estimatedTraffic     Int?    // Estimated monthly traffic at this position
  searchVolume         Int?    // Monthly search volume
  difficulty           Float?  // Ranking difficulty 0-100

  // Historical context
  bestPosition         Int?    // Best position ever achieved
  worstPosition        Int?    // Worst position tracked
  avgPosition30d       Float?  // 30-day average
  volatility           Float?  // Position volatility score

  // Measurement
  measuredAt           DateTime @default(now())
  nextCheckScheduled   DateTime?

  createdAt            DateTime @default(now())

  @@index([connectionId])
  @@index([keywordId])
  @@index([pageId])
  @@index([keywordText])
  @@index([position])
  @@index([measuredAt])
  @@index([searchEngine, locale])
}
```

### I. GoogleSearchConsoleConnection Model
Store GSC OAuth credentials separately

```prisma
model GoogleSearchConsoleConnection {
  id           String     @id @default(uuid())
  connectionId String     @unique
  connection   Connection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  // OAuth credentials (encrypted)
  accessToken     String  // Encrypted
  refreshToken    String? // Encrypted
  tokenExpiry     DateTime?

  // GSC site URL
  siteUrl         String  // The verified property in GSC
  verificationMethod String? // How the site is verified

  // Permissions
  permissionLevel String  @default("siteOwner") // 'siteOwner', 'siteFullUser', 'siteRestrictedUser'

  // Status
  status          ConnectionStatus @default(CONNECTED)
  lastSync        DateTime?
  lastSyncError   String?
  syncEnabled     Boolean          @default(true)

  // Data availability
  earliestDataDate DateTime? // Oldest data available in GSC
  latestDataDate   DateTime? // Most recent data synced

  // Sync settings
  autoSyncEnabled  Boolean @default(true)
  syncFrequency    String  @default("daily") // 'hourly', 'daily', 'weekly'
  lastSyncDuration Int?    // milliseconds

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  @@index([connectionId])
  @@index([status])
  @@index([lastSync])
}
```

### J. SchemaValidationRule Model
Store schema.org validation rules and tests

```prisma
model SchemaValidationRule {
  id String @id @default(uuid())

  // Rule identification
  schemaType     SchemaType
  ruleCode       String     @unique // e.g., 'PRODUCT_MISSING_BRAND'
  ruleName       String

  // Rule definition
  severity       Severity   @default(MEDIUM)
  category       String     // 'required_field', 'recommended_field', 'format', 'value_constraint'

  // Validation logic
  fieldPath      String     // JSON path to field (e.g., 'brand.name')
  validator      String     // Validation type: 'required', 'format', 'enum', 'regex'
  validatorValue String?    // Value/pattern to validate against

  // Documentation
  description    String     @db.Text
  fixInstructions String    @db.Text // How to fix this issue
  documentation  String?    // Link to schema.org docs

  // Impact
  affectsRichResults Boolean @default(false)
  richResultTypes    String  @default("[]") // JSON array of affected rich result types

  // Status
  isActive       Boolean @default(true)

  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  @@index([schemaType])
  @@index([severity])
  @@index([isActive])
}
```

---

## 4. INDEXES FOR PERFORMANCE

### Critical Composite Indexes

These indexes support common query patterns for optimal performance:

```prisma
// Page model - Find pages with specific SEO issues
@@index([connectionId, canonicalStatus])
@@index([connectionId, hasNoindex])
@@index([connectionId, primarySchemaType])
@@index([connectionId, avgPosition, clicks30d])

// Issue model - Priority queue for fixes
@@index([connectionId, status, severity, impactScore])
@@index([connectionId, type, status])

// Fix model - Impact analysis
@@index([connectionId, status, appliedAt])
@@index([connectionId, fixCategory, status])
@@index([issueId, status])

// GoogleSearchConsoleData - Time-series queries
@@index([connectionId, date, dataType])
@@index([connectionId, pageId, date])
@@index([connectionId, query, date])
@@index([date, dataType, deviceType])

// RankingPosition - Position tracking
@@index([connectionId, keywordText, measuredAt])
@@index([connectionId, position, measuredAt])
@@index([pageId, measuredAt])

// StructuredData - Schema validation
@@index([pageId, schemaType, status])
@@index([schemaType, isValid, isEligible])

// CanonicalMapping - Issue detection
@@index([connectionId, status, isDuplicate])
@@index([connectionId, canonicalUrl])

// TrafficImpactMeasurement - Analysis queries
@@index([fixId, measurementDate, daysSinceFix])
@@index([changeType, isSignificant])

// ImageAsset - Optimization queue
@@index([connectionId, status, priority])
@@index([connectionId, hasAltText, isOptimized])
@@index([connectionId, imageContext, impactOnLCP])

// OpenGraphMetadata - Quality audits
@@index([isComplete, qualityScore])
@@index([ogType, hasOptimalImage])

// TwitterCardMetadata - Validation
@@index([twitterCard, isValid, qualityScore])
```

### Partial Indexes (PostgreSQL-specific)

For even better performance on common filters:

```sql
-- Index only pages that need attention
CREATE INDEX idx_pages_needs_work
ON "Page" (connection_id, seo_score)
WHERE seo_score < 70 OR canonical_status != 'VALID' OR has_noindex = true;

-- Index only active issues
CREATE INDEX idx_active_issues
ON "Issue" (connection_id, severity, impact_score)
WHERE status IN ('OPEN', 'DETECTED');

-- Index only recent GSC data (last 90 days)
CREATE INDEX idx_recent_gsc_data
ON "GoogleSearchConsoleData" (connection_id, date, clicks)
WHERE date > NOW() - INTERVAL '90 days';

-- Index images needing optimization
CREATE INDEX idx_images_need_optimization
ON "ImageAsset" (connection_id, priority)
WHERE status IN ('NEEDS_ALT_TEXT', 'NEEDS_OPTIMIZATION');

-- Index fixes with measurable impact
CREATE INDEX idx_fixes_with_metrics
ON "Fix" (connection_id, applied_at)
WHERE status = 'APPLIED' AND applied_at IS NOT NULL;
```

---

## 5. MIGRATION STRATEGY

### Phase 1: Enum Types (Non-Breaking)
**Safe to run immediately**

```bash
# Add all new enum types
npx prisma db push --accept-data-loss=false
```

All enums are additive and don't affect existing data.

### Phase 2: Model Enhancements (Additive Only)
**Safe - all new fields have defaults**

Add new fields to existing models:
- Issue (canonical, robots, schema fields)
- Fix (metrics tracking fields)
- Page (canonical, OG, Twitter, schema fields)
- ImageAsset (schema, optimization fields)
- ShopifyProduct (schema fields)

```bash
# Apply model enhancements
npx prisma db push --accept-data-loss=false
```

All new fields are:
- Optional (nullable) OR
- Have default values OR
- Are JSON with default `"[]"` or `"{}"`

### Phase 3: New Models
**Safe - completely new tables**

Create all new models:
- StructuredData
- CanonicalMapping
- RobotsMetaTag
- OpenGraphMetadata
- TwitterCardMetadata
- GoogleSearchConsoleData
- GoogleSearchConsoleConnection
- TrafficImpactMeasurement
- RankingPosition
- SchemaValidationRule

```bash
# Create new tables
npx prisma db push --accept-data-loss=false
npx prisma generate
```

### Phase 4: Create Indexes
**Run during low-traffic period**

```bash
# Apply all indexes (may take time on large tables)
npx prisma db push

# OR run indexes manually for better control:
psql $DATABASE_URL < migrations/indexes.sql
```

### Phase 5: Backfill Data (Optional)
**Run as background jobs**

Gradually populate new fields for existing records:

```typescript
// Example: Backfill canonical status for existing pages
const jobs = await db.page.findMany({
  where: { canonicalStatus: null },
  take: 100
})

for (const page of jobs) {
  const status = await analyzeCanonicalUrl(page.url, page.canonicalUrl)
  await db.page.update({
    where: { id: page.id },
    data: { canonicalStatus: status }
  })
}
```

### Rollback Strategy

If issues arise, rollback is safe because:

1. **No data deletion**: All changes are additive
2. **Application compatibility**: Old code ignores new fields
3. **Easy revert**: Simply don't query new fields

To rollback:
```bash
# Revert Prisma schema to previous version
git checkout HEAD~1 prisma/schema.prisma

# Regenerate client
npx prisma generate

# Optional: Drop new tables (keeps data safe)
# Only drop if absolutely necessary
```

---

## 6. EXAMPLE QUERIES

### A. Find Pages with Canonical Issues

```typescript
// Get all pages with canonical URL problems
const canonicalIssues = await db.page.findMany({
  where: {
    connectionId,
    OR: [
      { canonicalStatus: { in: ['MISSING', 'INVALID', 'CONFLICT'] } },
      { canonicalUrl: null },
    ]
  },
  include: {
    connection: true
  },
  orderBy: [
    { clicks30d: 'desc' }, // Prioritize high-traffic pages
    { avgPosition: 'asc' }  // Then by best ranking position
  ]
})
```

### B. Find Pages Missing Structured Data

```typescript
// Pages that should have Product schema but don't
const missingProductSchema = await db.page.findMany({
  where: {
    connectionId,
    pageType: 'PRODUCT',
    OR: [
      { primarySchemaType: null },
      { structuredDataValid: false },
      {
        structuredDataTypes: {
          equals: '[]' // No schemas at all
        }
      }
    ]
  },
  include: {
    structuredData: true
  },
  orderBy: {
    clicks30d: 'desc' // Prioritize by traffic
  }
})
```

### C. Measure Traffic Impact After Fix

```typescript
// Get traffic impact for a specific fix
const impact = await db.trafficImpactMeasurement.findMany({
  where: {
    fixId,
    daysSinceFix: { in: [7, 30] } // 7-day and 30-day measurements
  },
  orderBy: {
    measurementDate: 'desc'
  }
})

// Calculate ROI
const totalClickIncrease = impact.reduce((sum, m) => sum + m.clicksChange, 0)
const avgPositionImprovement = impact.reduce((sum, m) => sum + m.positionChange, 0) / impact.length
```

### D. Get Google Search Console Trends

```typescript
// Get last 30 days of GSC data for a page
const gscTrends = await db.googleSearchConsoleData.findMany({
  where: {
    connectionId,
    pageId,
    date: {
      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  },
  orderBy: {
    date: 'asc'
  }
})

// Calculate trend metrics
const totalClicks = gscTrends.reduce((sum, d) => sum + d.clicks, 0)
const avgPosition = gscTrends.reduce((sum, d) => sum + (d.position || 0), 0) / gscTrends.length
const avgCTR = gscTrends.reduce((sum, d) => sum + (d.ctr || 0), 0) / gscTrends.length
```

### E. Find High-Impact Image Optimization Opportunities

```typescript
// Images without alt text on high-traffic pages
const criticalImages = await db.imageAsset.findMany({
  where: {
    connectionId,
    hasAltText: false,
    status: 'NEEDS_ALT_TEXT',
    impactOnLCP: true // This is the LCP element
  },
  include: {
    page: {
      select: {
        url: true,
        pageType: true,
        clicks30d: true,
        avgPosition: true
      }
    }
  },
  orderBy: [
    { impactScore: 'desc' },
    { priority: 'asc' }
  ],
  take: 20
})
```

### F. Ranking Position Tracking with SERP Features

```typescript
// Track position changes with SERP feature analysis
const rankings = await db.rankingPosition.findMany({
  where: {
    connectionId,
    keywordText: 'target keyword',
    measuredAt: {
      gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // Last 90 days
    }
  },
  orderBy: {
    measuredAt: 'asc'
  }
})

// Analyze SERP features correlation
const withFeaturedSnippet = rankings.filter(r => r.hasFeaturedSnippet)
const avgPositionWithFS = withFeaturedSnippet.reduce((s, r) => s + r.position, 0) / withFeaturedSnippet.length
const avgPositionWithoutFS = rankings.filter(r => !r.hasFeaturedSnippet)
  .reduce((s, r) => s + r.position, 0) / (rankings.length - withFeaturedSnippet.length)
```

### G. Comprehensive SEO Audit Query

```typescript
// Get complete SEO health snapshot for a connection
const seoAudit = await db.connection.findUnique({
  where: { id: connectionId },
  include: {
    pages: {
      where: {
        seoScore: { lt: 70 }
      },
      include: {
        structuredData: {
          where: { isValid: false }
        },
        robotsMetaTags: {
          where: { hasIssues: true }
        },
        openGraphMetadata: {
          where: { isComplete: false }
        },
        twitterCardMetadata: {
          where: { isValid: false }
        }
      }
    },
    issues: {
      where: {
        status: { in: ['OPEN', 'DETECTED'] },
        severity: { in: ['CRITICAL', 'HIGH'] }
      },
      orderBy: {
        impactScore: 'desc'
      }
    },
    imageAssets: {
      where: {
        OR: [
          { hasAltText: false },
          { isOptimized: false }
        ]
      }
    }
  }
})
```

### H. Find Best Candidates for Schema.org Implementation

```typescript
// Product pages with high traffic but missing schema
const schemaOpportunities = await db.page.findMany({
  where: {
    connectionId,
    pageType: { in: ['PRODUCT', 'ARTICLE', 'BLOG_POST'] },
    OR: [
      { primarySchemaType: null },
      { structuredDataValid: false }
    ],
    clicks30d: { gt: 100 } // Minimum traffic threshold
  },
  include: {
    structuredData: true,
    googleSearchConsoleData: {
      where: {
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    }
  },
  orderBy: [
    { clicks30d: 'desc' },
    { impressions30d: 'desc' }
  ],
  take: 50
})
```

### I. Meta Robots Tag Audit

```typescript
// Find valuable pages accidentally blocked from indexing
const indexingIssues = await db.page.findMany({
  where: {
    connectionId,
    hasNoindex: true,
    AND: [
      {
        OR: [
          { clicks30d: { gt: 50 } },  // Has traffic
          { avgPosition: { lt: 20 } }, // Ranks well
          { pageType: { in: ['HOMEPAGE', 'PRODUCT', 'CATEGORY'] } } // Important pages
        ]
      }
    ]
  },
  include: {
    robotsMetaTags: true
  },
  orderBy: {
    clicks30d: 'desc'
  }
})
```

### J. Social Media Metadata Quality Report

```typescript
// Pages with incomplete or poor quality social metadata
const socialMetadataIssues = await db.page.findMany({
  where: {
    connectionId,
    clicks30d: { gt: 100 } // Focus on pages with traffic
  },
  include: {
    openGraphMetadata: {
      where: {
        OR: [
          { isComplete: false },
          { qualityScore: { lt: 70 } },
          { hasOptimalImage: false }
        ]
      }
    },
    twitterCardMetadata: {
      where: {
        OR: [
          { isValid: false },
          { qualityScore: { lt: 70 } },
          { imageMeetsSpec: false }
        ]
      }
    }
  },
  orderBy: {
    clicks30d: 'desc'
  }
})
```

### K. Before/After Performance Analysis

```typescript
// Compare metrics before and after a fix
async function analyzeFixImpact(fixId: string) {
  const fix = await db.fix.findUnique({
    where: { id: fixId },
    include: {
      trafficImpactMeasurements: {
        where: {
          daysSinceFix: { in: [7, 30] }
        },
        orderBy: { measurementDate: 'desc' }
      },
      issue: {
        include: {
          connection: {
            include: {
              googleSearchConsoleData: {
                where: {
                  date: {
                    gte: new Date(fix.appliedAt!.getTime() - 30 * 24 * 60 * 60 * 1000),
                    lte: new Date(fix.appliedAt!.getTime() + 30 * 24 * 60 * 60 * 1000)
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  // Calculate impact
  const measurements = fix.trafficImpactMeasurements
  const latestMeasurement = measurements[0]

  return {
    fixId: fix.id,
    description: fix.description,
    appliedAt: fix.appliedAt,
    impact: {
      clicks: {
        before: latestMeasurement.baselineClicks,
        after: latestMeasurement.clicks,
        change: latestMeasurement.clicksChange,
        changePercent: latestMeasurement.clicksChangePercent
      },
      impressions: {
        before: latestMeasurement.baselineImpressions,
        after: latestMeasurement.impressions,
        change: latestMeasurement.impressionsChange,
        changePercent: latestMeasurement.impressionsChangePercent
      },
      position: {
        before: latestMeasurement.baselineAvgPosition,
        after: latestMeasurement.avgPosition,
        change: latestMeasurement.positionChange
      },
      ctr: {
        before: latestMeasurement.baselineCtr,
        after: latestMeasurement.ctr,
        change: latestMeasurement.ctrChange
      }
    },
    isSignificant: latestMeasurement.isSignificant,
    changeType: latestMeasurement.changeType
  }
}
```

---

## IMPLEMENTATION CHECKLIST

- [ ] **Phase 1**: Add enum types to schema
- [ ] **Phase 2**: Add new fields to existing models (Issue, Fix, Page, ImageAsset, ShopifyProduct)
- [ ] **Phase 3**: Create new models (StructuredData, CanonicalMapping, RobotsMetaTag, etc.)
- [ ] **Phase 4**: Apply database migrations (`npx prisma db push`)
- [ ] **Phase 5**: Generate Prisma client (`npx prisma generate`)
- [ ] **Phase 6**: Create indexes (run during low-traffic window)
- [ ] **Phase 7**: Update TypeScript types across codebase
- [ ] **Phase 8**: Implement helper functions for new models
- [ ] **Phase 9**: Create background jobs for data collection (GSC sync, schema validation)
- [ ] **Phase 10**: Add UI components for new features
- [ ] **Phase 11**: Update API routes to handle new data
- [ ] **Phase 12**: Create analytics dashboards for new metrics
- [ ] **Phase 13**: Implement automated testing for new queries
- [ ] **Phase 14**: Document new features in CLAUDE.md

---

## ADDITIONAL RECOMMENDATIONS

### 1. Create Helper Utility Library

```typescript
// lib/seo-analysis.ts
export async function analyzeCanonical(page: Page): Promise<CanonicalStatus>
export async function validateStructuredData(schema: string, type: SchemaType): Promise<ValidationResult>
export async function generateOpenGraphTags(page: Page): Promise<OpenGraphMetadata>
export async function checkRobotsDirectives(page: Page): Promise<RobotsMetaTag>
export async function measureTrafficImpact(fix: Fix, days: number): Promise<TrafficImpactMeasurement>
```

### 2. Background Jobs

Create new job types in `JobType` enum:
- `SYNC_GSC_DATA` - Sync Google Search Console data
- `VALIDATE_STRUCTURED_DATA` - Validate all schema markup
- `CHECK_CANONICAL_URLS` - Verify canonical mappings
- `MEASURE_TRAFFIC_IMPACT` - Measure fix impacts
- `AUDIT_SOCIAL_METADATA` - Check OG/Twitter tags
- `UPDATE_RANKING_POSITIONS` - Track keyword positions

### 3. API Endpoints to Create

```
POST   /api/connections/:id/gsc/connect       - Connect GSC
GET    /api/connections/:id/gsc/data          - Get GSC metrics
GET    /api/pages/:id/canonical               - Get canonical analysis
GET    /api/pages/:id/structured-data         - Get schema markup
POST   /api/pages/:id/structured-data         - Generate/update schema
GET    /api/pages/:id/social-metadata         - Get OG/Twitter tags
POST   /api/fixes/:id/measure-impact          - Trigger impact measurement
GET    /api/fixes/:id/impact                  - Get impact report
GET    /api/analytics/traffic-trends          - Traffic trend analysis
GET    /api/analytics/ranking-positions       - Ranking position tracking
```

### 4. Real-time Monitoring

Consider implementing webhook listeners for:
- Google Search Console notifications
- Schema.org validation service callbacks
- Ranking position alerts (significant changes)
- Traffic anomaly detection

### 5. Data Retention Policies

Recommended retention periods:
- **GoogleSearchConsoleData**: 16 months (GSC limit)
- **RankingPosition**: 12 months (1 year history)
- **TrafficImpactMeasurement**: Indefinite (valuable historical data)
- **PageSnapshot**: 90 days (similar to Fix rollback window)
- **StructuredData** (INACTIVE): 90 days before cleanup

---

## PERFORMANCE CONSIDERATIONS

### Query Optimization Tips

1. **Always include connectionId** in WHERE clauses for tenant isolation
2. **Use specific indexes** for common query patterns
3. **Limit JSON parsing** - cache parsed JSON when possible
4. **Batch operations** for bulk updates (e.g., image optimization)
5. **Use database views** for complex repeated queries
6. **Implement pagination** for large result sets
7. **Use connection pooling** (Prisma handles this)
8. **Monitor slow queries** and add indexes as needed

### Scaling Considerations

- **Partition GSC data** by date for faster queries
- **Archive old measurements** to cold storage after 12 months
- **Use read replicas** for analytics queries
- **Cache frequently accessed data** (Redis)
- **Implement queue system** for heavy processing (image optimization, schema validation)

---

## SUCCESS METRICS

Track these metrics to measure enhancement success:

1. **Detection Rate**: % of pages with canonical/schema/OG analysis complete
2. **Issue Resolution**: Time to fix advanced SEO issues
3. **Traffic Impact**: Measured traffic improvement from schema/metadata fixes
4. **Data Freshness**: GSC data sync latency
5. **Query Performance**: Average query time for analytics dashboards
6. **Coverage**: % of pages with complete metadata (canonical + schema + OG + Twitter)

---

**END OF SCHEMA ENHANCEMENTS DOCUMENT**
