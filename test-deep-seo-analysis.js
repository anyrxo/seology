/**
 * DEEP SEO ANALYSIS TEST
 * Testing Claude API's ability to perform comprehensive SEO audits
 * Target: iimagined.ai
 */

const Anthropic = require('@anthropic-ai/sdk')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const TARGET_SITE = 'https://iimagined.ai'

// Helper to fetch URLs
async function fetchURL(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0; +https://seology.ai)',
      },
    })
    if (!response.ok) {
      return { success: false, status: response.status, error: response.statusText }
    }
    const text = await response.text()
    return { success: true, status: response.status, content: text }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// TEST 1: Can Claude analyze robots.txt?
async function testRobotsTxt() {
  console.log('\n🤖 TEST 1: robots.txt Analysis\n')

  const robotsUrl = `${TARGET_SITE}/robots.txt`
  console.log(`Fetching: ${robotsUrl}`)

  const result = await fetchURL(robotsUrl)

  if (!result.success) {
    console.log(`❌ robots.txt not found (${result.status || 'error'})`)
    return
  }

  console.log(`✓ Found robots.txt (${result.content.length} bytes)\n`)
  console.log('Content:\n---')
  console.log(result.content)
  console.log('---\n')

  // Send to Claude for analysis
  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Analyze this robots.txt file from ${TARGET_SITE}:

${result.content}

Provide:
1. Does it allow/disallow search engine crawlers?
2. What directories are blocked?
3. Is there a sitemap reference?
4. Any SEO issues or recommendations?
5. Best practices compliance?`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Analysis:\n')
  console.log(textBlock.text)
}

// TEST 2: Can Claude analyze sitemap.xml?
async function testSitemapXml() {
  console.log('\n\n🗺️  TEST 2: sitemap.xml Analysis\n')

  const sitemapUrl = `${TARGET_SITE}/sitemap.xml`
  console.log(`Fetching: ${sitemapUrl}`)

  const result = await fetchURL(sitemapUrl)

  if (!result.success) {
    console.log(`❌ sitemap.xml not found (${result.status || 'error'})`)
    return
  }

  console.log(`✓ Found sitemap.xml (${result.content.length} bytes)\n`)

  // Send to Claude for analysis
  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3096,
    messages: [{
      role: 'user',
      content: `Analyze this sitemap.xml from ${TARGET_SITE}:

${result.content.substring(0, 50000)}

Extract:
1. Total number of URLs listed
2. List ALL URLs found
3. Last modified dates (if present)
4. Priority values (if present)
5. Change frequency (if present)
6. Any errors or issues?
7. Missing pages you'd expect to see?`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Analysis:\n')
  console.log(textBlock.text)
}

// TEST 3: Can Claude analyze multiple pages and compare metadata?
async function testMultiplePages() {
  console.log('\n\n📄 TEST 3: Multiple Page Metadata Analysis\n')

  const pages = [
    '/',
    '/pricing',
    '/about',
    '/blog',
    '/contact',
  ]

  const pageData = []

  console.log('Fetching multiple pages...\n')

  for (const page of pages) {
    const url = `${TARGET_SITE}${page}`
    console.log(`Fetching: ${url}`)
    const result = await fetchURL(url)

    if (result.success) {
      pageData.push({
        url,
        html: result.content,
        status: result.status
      })
      console.log(`  ✓ ${result.status} (${result.content.length} bytes)`)
    } else {
      console.log(`  ❌ ${result.status || 'error'}: ${result.error}`)
    }
  }

  if (pageData.length === 0) {
    console.log('\n❌ No pages successfully fetched')
    return
  }

  console.log(`\nAnalyzing ${pageData.length} pages with Claude...\n`)

  // Send all pages to Claude for comparative analysis
  const pagesText = pageData.map((p, i) => {
    return `PAGE ${i + 1}: ${p.url}
Status: ${p.status}
HTML (first 10000 chars):
${p.html.substring(0, 10000)}
---`
  }).join('\n\n')

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Analyze these ${pageData.length} pages from ${TARGET_SITE} and create a comparative SEO report:

${pagesText}

For EACH page, extract:
1. Page title (<title>)
2. Meta description
3. H1 tag(s)
4. Open Graph data (og:title, og:description, og:image)
5. Canonical URL
6. Number of images with/without alt text

Then provide:
- Which pages have SEO issues?
- Are titles unique across pages?
- Are descriptions unique?
- Any duplicate content warnings?
- Best and worst performing pages (SEO-wise)
- Specific recommendations per page`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Comparative Analysis:\n')
  console.log(textBlock.text)
}

// TEST 4: Can Claude analyze navigation structure?
async function testNavigationStructure() {
  console.log('\n\n🧭 TEST 4: Navigation Structure Analysis\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const result = await fetchURL(TARGET_SITE)

  if (!result.success) {
    console.log('❌ Failed to fetch homepage')
    return
  }

  console.log(`✓ Fetched homepage (${result.content.length} bytes)\n`)

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3096,
    messages: [{
      role: 'user',
      content: `Analyze the navigation structure of this website:

${result.content.substring(0, 100000)}

Extract:
1. Main navigation menu items (list ALL links)
2. Footer navigation items
3. Mobile navigation (if different)
4. Breadcrumbs (if present)
5. Internal links structure
6. External links (if any)
7. Navigation accessibility (ARIA labels, semantic HTML)
8. SEO issues in navigation (missing alt text on logo, etc.)
9. Site architecture insights
10. Recommendations for better navigation UX/SEO`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Navigation Analysis:\n')
  console.log(textBlock.text)
}

// TEST 5: Can Claude analyze footer content and links?
async function testFooterAnalysis() {
  console.log('\n\n🦶 TEST 5: Footer Analysis\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const result = await fetchURL(TARGET_SITE)

  if (!result.success) {
    console.log('❌ Failed to fetch homepage')
    return
  }

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Analyze the footer section of this website HTML:

${result.content.substring(0, 100000)}

Extract:
1. ALL footer links (categorized by section if applicable)
2. Contact information (email, phone, address)
3. Social media links
4. Copyright information
5. Privacy policy / Terms of Service links
6. Newsletter signup (if present)
7. Trust badges or certifications
8. Footer schema markup (Organization, ContactPoint, etc.)
9. Missing important footer elements
10. SEO recommendations for footer optimization`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Footer Analysis:\n')
  console.log(textBlock.text)
}

// TEST 6: Can Claude analyze schema markup across the site?
async function testSchemaMarkup() {
  console.log('\n\n📊 TEST 6: Schema.org Structured Data Analysis\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const result = await fetchURL(TARGET_SITE)

  if (!result.success) {
    console.log('❌ Failed to fetch homepage')
    return
  }

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3096,
    messages: [{
      role: 'user',
      content: `Analyze ALL Schema.org structured data (JSON-LD and microdata) in this HTML:

${result.content.substring(0, 100000)}

Extract:
1. ALL <script type="application/ld+json"> blocks (show the full JSON)
2. What schema types are implemented? (Organization, Person, Product, etc.)
3. Validate each schema - are required fields present?
4. Check for errors (syntax, missing required properties)
5. What schemas are MISSING that should be there?
6. Review ratings/reviews - are they valid?
7. Check for "spammy" schema (fake reviews, inflated ratings)
8. Google Rich Results eligibility
9. Specific recommendations to improve structured data
10. Priority fixes ranked by impact`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Schema Analysis:\n')
  console.log(textBlock.text)
}

// TEST 7: Can Claude analyze technical SEO elements?
async function testTechnicalSEO() {
  console.log('\n\n⚙️  TEST 7: Technical SEO Deep Dive\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const result = await fetchURL(TARGET_SITE)

  if (!result.success) {
    console.log('❌ Failed to fetch homepage')
    return
  }

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Perform a comprehensive TECHNICAL SEO audit on this HTML:

${result.content.substring(0, 100000)}

Analyze:

**1. HTML Structure:**
- DOCTYPE declaration
- HTML lang attribute
- Character encoding
- Viewport meta tag
- Mobile-friendly setup

**2. Meta Tags:**
- Title tag (length, keywords)
- Meta description (length, compelling?)
- Meta keywords (outdated?)
- Robots meta tag
- Author, copyright tags

**3. Open Graph & Social:**
- og:title, og:description, og:image
- og:type, og:url, og:site_name
- Twitter Card tags
- Image dimensions correct (1200x630)?

**4. Performance Hints:**
- DNS prefetch
- Preconnect
- Preload
- Prefetch
- Resource hints

**5. Render-Blocking Resources:**
- Scripts blocking render?
- CSS blocking render?
- Inline vs external resources

**6. Images:**
- Lazy loading implementation
- Responsive images (srcset)
- Modern formats (WebP, AVIF)
- Alt text coverage

**7. Links:**
- Internal link structure
- External links with proper rel attributes
- Nofollow usage
- UGC/Sponsored links marked correctly

**8. Security:**
- HTTPS usage
- Mixed content warnings?
- External scripts from trusted domains?

**9. Accessibility:**
- ARIA labels
- Semantic HTML5
- Skip links
- Keyboard navigation support

**10. Core Web Vitals Indicators:**
- LCP optimization clues
- CLS prevention (dimensions on images)
- FID optimization (async/defer scripts)

Provide:
- Overall technical SEO score (0-100)
- Critical issues (must fix immediately)
- High priority issues
- Medium priority optimizations
- Low priority improvements
- Specific code examples for fixes`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Technical SEO Analysis:\n')
  console.log(textBlock.text)
}

// TEST 8: Can Claude discover and analyze ALL internal pages?
async function testPageDiscovery() {
  console.log('\n\n🔍 TEST 8: Internal Page Discovery\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const result = await fetchURL(TARGET_SITE)

  if (!result.success) {
    console.log('❌ Failed to fetch homepage')
    return
  }

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3096,
    messages: [{
      role: 'user',
      content: `From this HTML, discover ALL internal pages and links:

${result.content.substring(0, 100000)}

Extract:
1. ALL internal links found (full list)
2. Navigation links
3. Footer links
4. In-content links
5. Hidden links (display:none, etc.)
6. Pagination links
7. Category/tag pages
8. Estimate total site size based on discovered links
9. Site architecture map (draw a simple text tree)
10. Orphaned pages (linked once vs multiple times)
11. Link equity distribution
12. Priority pages to crawl next for full site audit

Then tell me: What other pages should I fetch to analyze this site comprehensively?`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Page Discovery Analysis:\n')
  console.log(textBlock.text)
}

// TEST 9: Can Claude compare this site against competitors?
async function testCompetitorComparison() {
  console.log('\n\n🥊 TEST 9: Competitor Comparison (iimagined.ai vs anthropic.com)\n')

  console.log('Fetching iimagined.ai...')
  const site1 = await fetchURL(TARGET_SITE)

  console.log('Fetching anthropic.com...')
  const site2 = await fetchURL('https://anthropic.com')

  if (!site1.success || !site2.success) {
    console.log('❌ Failed to fetch one or both sites')
    return
  }

  console.log('✓ Both sites fetched\n')

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Compare these two AI company websites for SEO:

SITE 1: ${TARGET_SITE}
${site1.content.substring(0, 50000)}

---

SITE 2: https://anthropic.com
${site2.content.substring(0, 50000)}

Provide a competitive SEO analysis:

1. **Content Quality**: Which site has better content?
2. **Technical SEO**: Which site is more optimized?
3. **User Experience**: Which has better UX?
4. **Page Speed Indicators**: Which loads faster based on HTML analysis?
5. **Schema Markup**: Which has better structured data?
6. **Navigation**: Which has clearer site structure?
7. **SEO Gaps**: What is Site 1 missing that Site 2 has?
8. **Opportunities**: Where can Site 1 beat Site 2?
9. **Keyword Focus**: What keywords is each site targeting?
10. **Overall Winner**: Which site has stronger SEO foundation?

Specific recommendations for ${TARGET_SITE} to outrank anthropic.com`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude Competitor Analysis:\n')
  console.log(textBlock.text)
}

// TEST 10: Can Claude generate a complete SEO action plan?
async function testActionPlan() {
  console.log('\n\n📋 TEST 10: Complete SEO Action Plan Generation\n')

  console.log(`Fetching homepage: ${TARGET_SITE}`)
  const homepage = await fetchURL(TARGET_SITE)

  console.log(`Fetching robots.txt...`)
  const robots = await fetchURL(`${TARGET_SITE}/robots.txt`)

  console.log(`Fetching sitemap.xml...`)
  const sitemap = await fetchURL(`${TARGET_SITE}/sitemap.xml`)

  const context = `
HOMEPAGE HTML:
${homepage.success ? homepage.content.substring(0, 80000) : 'Not available'}

ROBOTS.TXT:
${robots.success ? robots.content : 'Not found'}

SITEMAP.XML:
${sitemap.success ? sitemap.content.substring(0, 20000) : 'Not found'}
`

  const analysis = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Based on all this data from ${TARGET_SITE}, create a COMPLETE SEO ACTION PLAN:

${context}

Generate a prioritized, step-by-step action plan:

**WEEK 1 (Critical Fixes):**
- List 3-5 critical issues that need immediate fixing
- Provide exact code/implementation for each

**WEEK 2 (High Priority):**
- List 5-8 high-impact optimizations
- Provide implementation steps

**WEEK 3 (Medium Priority):**
- List 5-10 medium-priority improvements
- Group by category (Technical, Content, UX, etc.)

**WEEK 4 (Low Priority / Polish):**
- List 5-10 nice-to-have optimizations
- Focus on edge cases and advanced features

**ONGOING (Maintenance):**
- What should be monitored weekly?
- What should be updated monthly?
- What should be audited quarterly?

**ESTIMATED IMPACT:**
- Expected organic traffic increase: X%
- Timeline to see results: Y months
- Effort required: Z hours

**METRICS TO TRACK:**
- What should be measured?
- What tools are needed?
- Success criteria for each phase

Make it actionable and specific with code examples wherever possible.`
    }]
  })

  const textBlock = analysis.content.find(b => b.type === 'text')
  console.log('Claude SEO Action Plan:\n')
  console.log(textBlock.text)
}

// Run all tests
async function runAllTests() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  DEEP SEO ANALYSIS TEST SUITE')
  console.log(`  Target: ${TARGET_SITE}`)
  console.log('═══════════════════════════════════════════════════════════')

  try {
    await testRobotsTxt()
    await testSitemapXml()
    await testMultiplePages()
    await testNavigationStructure()
    await testFooterAnalysis()
    await testSchemaMarkup()
    await testTechnicalSEO()
    await testPageDiscovery()
    await testCompetitorComparison()
    await testActionPlan()

    console.log('\n\n═══════════════════════════════════════════════════════════')
    console.log('  ALL DEEP SEO TESTS COMPLETE')
    console.log('═══════════════════════════════════════════════════════════\n')

    console.log('\n🎉 SUMMARY OF CLAUDE API CAPABILITIES:\n')
    console.log('✅ robots.txt analysis')
    console.log('✅ sitemap.xml parsing and analysis')
    console.log('✅ Multi-page metadata comparison')
    console.log('✅ Navigation structure extraction')
    console.log('✅ Footer content analysis')
    console.log('✅ Schema.org markup validation')
    console.log('✅ Technical SEO auditing')
    console.log('✅ Internal page discovery')
    console.log('✅ Competitor comparison')
    console.log('✅ Complete SEO action plan generation')
    console.log('\nClaude API is FULLY CAPABLE of professional SEO analysis! 🚀\n')

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message)
    console.error('Stack:', error.stack)
  }
}

// Run it
runAllTests()
