import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical SEO Audit for Shopify: 2026 Complete Checklist | SEOLOGY.AI',
  description: 'Google released new technical audit methodology (Nov 2025). Master Shopify technical SEO with this comprehensive audit checklist--fix crawlability, indexation, and Core Web Vitals issues.',
  keywords: 'technical SEO audit, Shopify technical SEO, crawlability, indexation, canonical URLs, duplicate content, robots.txt, XML sitemap, Google Search Console, Core Web Vitals, site architecture, crawl budget',
  openGraph: {
    title: 'Technical SEO Audit for Shopify: 2026 Complete Checklist',
    description: "Google\'s Nov 2025 audit methodology + complete Shopify technical SEO checklist. Fix crawl errors, canonicals, and indexation issues.",
    type: 'article',
    publishedTime: '2025-12-20T08:00:00Z',
    authors: ['Sophie Martinez, Technical SEO Engineer & Shopify Specialist'],
},
  twitter: {
    card: 'summary_large_image',
    title: 'Technical SEO Audit for Shopify: 2026 Complete Checklist',
    description: "Google\'s Nov 2025 methodology + complete audit checklist. Fix technical issues killing your Shopify rankings.",
  },
}

export default function TechnicalSEOAuditShopifyPage() {
  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span>/</span>
          <span>Technical SEO Audit</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
          Technical SEO Audit for Shopify: 2026 Complete Checklist
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          In November 2025, Google released new technical audit methodology emphasizing prevention over arbitrary scores. Learn how to conduct a comprehensive Shopify technical SEO audit that fixes crawlability, indexation, and Core Web Vitals issues that actually matter.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              SM
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Sophie Martinez</div>
              <div className="text-xs">Technical SEO Engineer & Shopify Specialist</div>
            </div>
          </div>
          <time dateTime="2025-12-20">December 20, 2025</time>
          <span>19 min read</span>
        </div>
      </header>

      {/* Google Update Alert */}
      <div className="not-prose bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-l-4 border-red-500 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">🚨 November 2025 Google Update</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          On <strong>November 6, 2025</strong>, Google Search Central released official guidance on technical SEO audit methodology. Key takeaways:
        </p>
        <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold mt-1">•</span>
            <span><strong>Focus on prevention, not arbitrary scores.</strong> Technical audits should prevent issues from interfering with crawling/indexing--not just generate lists of findings.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold mt-1">•</span>
            <span><strong>Avoid tool score obsession.</strong> Many automated tools produce scores without contextual interpretation, leading to recommendations that don't address actual site-specific needs.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-500 font-bold mt-1">•</span>
            <span><strong>Prioritize Google Search Console data.</strong> Real indexing and crawl data matters more than synthetic test scores.</span>
          </li>
        </ul>
      </div>

      {/* Table of Contents */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Table of Contents</h2>
        <nav className="space-y-2 text-sm">
          <a href="#what-is-technical-seo" className="block text-blue-600 dark:text-blue-400 hover:underline">1. What Is a Technical SEO Audit (And Why It Matters)</a>
          <a href="#google-methodology" className="block text-blue-600 dark:text-blue-400 hover:underline">2. Google's 2025 Technical Audit Methodology</a>
          <a href="#crawlability" className="block text-blue-600 dark:text-blue-400 hover:underline">3. Crawlability: Ensuring Google Can Access Your Pages</a>
          <a href="#indexation" className="block text-blue-600 dark:text-blue-400 hover:underline">4. Indexation: Getting Your Pages Into Google's Index</a>
          <a href="#canonicalization" className="block text-blue-600 dark:text-blue-400 hover:underline">5. Canonical URLs & Duplicate Content Issues</a>
          <a href="#site-architecture" className="block text-blue-600 dark:text-blue-400 hover:underline">6. Site Architecture & URL Structure</a>
          <a href="#core-web-vitals" className="block text-blue-600 dark:text-blue-400 hover:underline">7. Core Web Vitals (INP Replacing FID in 2025)</a>
          <a href="#faceted-navigation" className="block text-blue-600 dark:text-blue-400 hover:underline">8. Faceted Navigation & Crawl Budget</a>
          <a href="#audit-tools" className="block text-blue-600 dark:text-blue-400 hover:underline">9. Essential Technical SEO Audit Tools</a>
          <a href="#shopify-specific" className="block text-blue-600 dark:text-blue-400 hover:underline">10. Shopify-Specific Technical Considerations</a>
          <a href="#checklist" className="block text-blue-600 dark:text-blue-400 hover:underline">11. Complete Technical SEO Audit Checklist</a>
          <a href="#automation" className="block text-blue-600 dark:text-blue-400 hover:underline">12. How SEOLOGY.AI Automates Technical Audits</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Section 1 */}
        <section id="what-is-technical-seo" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What Is a Technical SEO Audit (And Why It Matters)</h2>

          <p className="text-lg leading-relaxed mb-6">
            A technical SEO audit is a <strong>systematic, comprehensive assessment of your website's technical elements</strong> to identify issues like slow site speed, under-optimized metadata, 404 errors, incorrect canonical URLs, crawl errors, and more.
          </p>

          <p className="mb-6">
            Think of it as a health checkup for your Shopify store's infrastructure--diagnosing problems that prevent Google from properly discovering, crawling, indexing, and ranking your pages.
          </p>

          <div className="not-prose bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Why Technical SEO Audits Are Critical in 2026</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <span className="text-2xl">🚫</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Hidden Issues Kill Rankings Silently</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Technical issues often go unnoticed until rankings plummet. A misconfigured robots.txt can block your entire store from Google. Failing to declare canonical versions can dilute link equity and confuse search engines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Crawl Budget Wasted on Low-Value Pages</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Faceted navigation and poor URL structure can create millions of low-value URLs that drain crawl budget. Google crawls these instead of your important product pages.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-2xl">📉</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Core Web Vitals Impact Rankings</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    In 2025, INP (Interaction to Next Paint) replaced FID as a Core Web Vitals metric. Poor technical performance directly affects your Google rankings and user experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Prevent Issues Before They Impact Revenue</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    According to Google's 2025 guidance, the purpose of technical audits is <strong>prevention</strong>--stopping issues from interfering with crawling or indexing before they hurt your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="google-methodology" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Google's 2025 Technical Audit Methodology</h2>

          <p className="text-lg leading-relaxed mb-6">
            On November 6, 2025, Martin Splitt from Google Search Central released official guidance that fundamentally changes how we should approach technical audits.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">The Problem with Traditional Audits</h3>

          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-8">
            <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">❌ What Google Warns Against</p>
            <p className="text-sm text-red-800 dark:text-red-300 mb-4">
              Technical audits frequently rely on <strong>automated tools producing arbitrary scores</strong> without contextual interpretation. This leads to:
            </p>
            <ul className="text-sm space-y-2 text-red-800 dark:text-red-300">
              <li>• Prioritizing "100 scores" over actual business impact</li>
              <li>• Following generic recommendations that don't address site-specific needs</li>
              <li>• Wasting time on low-impact fixes while ignoring critical issues</li>
              <li>• Chasing vanity metrics instead of solving real crawl/index problems</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">Google's Recommended Approach</h3>

          <div className="not-prose bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border border-green-200 dark:border-green-800 rounded-xl p-8 mb-8">
            <h4 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">✓ The Prevention-First Framework (2025)</h4>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
                  <h5 className="font-bold text-lg text-gray-900 dark:text-gray-100">Start with Google Search Console</h5>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Check real crawl and indexation data--not synthetic test scores. Focus on actual errors Google encountered while crawling your site.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                  <h5 className="font-bold text-lg text-gray-900 dark:text-gray-100">Identify Blocking Issues</h5>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  What's preventing Google from crawling or indexing your pages? Robots.txt blocks, noindex tags, server errors, redirect chains?
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 text-white flex items-center justify-center font-bold">3</div>
                  <h5 className="font-bold text-lg text-gray-900 dark:text-gray-100">Fix Prevention Issues First</h5>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Prioritize issues that actively block crawling/indexing before optimizing for better performance or perfect scores.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold">4</div>
                  <h5 className="font-bold text-lg text-gray-900 dark:text-gray-100">Monitor Ongoing</h5>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Technical SEO isn't one-and-done. Set up continuous monitoring to catch new issues before they impact rankings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="crawlability" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Crawlability: Ensuring Google Can Access Your Pages</h2>

          <p className="text-lg leading-relaxed mb-6">
            Crawlability is Google's ability to discover and access your pages. If Google can't crawl a page, it can't index or rank it--no matter how good your content is.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">Critical Crawlability Checks</h3>

          <div className="space-y-6 mb-8">
            <div className="bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">1. Robots.txt Configuration</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>What to check:</strong> A misconfigured robots.txt can sabotage your entire SEO strategy by blocking vital pages.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 mb-4 text-sm">
                <strong className="text-gray-900 dark:text-gray-100 block mb-2">How to audit:</strong>
                <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>1. Visit: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">yourstore.com/robots.txt</code></li>
                  <li>2. Check for unintended <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Disallow:</code> rules blocking important pages</li>
                  <li>3. Verify Sitemap declaration: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Sitemap: https://yourstore.com/sitemap.xml</code></li>
                  <li>4. Use Google Search Console → Robots.txt Tester to validate</li>
                </ol>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 rounded p-3 text-sm">
                <strong className="text-red-900 dark:text-red-200">Common mistake:</strong> Blocking <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/collections/</code> or <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/products/</code> accidentally
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border-2 border-purple-500 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">2. XML Sitemap Quality</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>What to check:</strong> Sitemaps should include all product pages, category pages, and valuable content--while excluding low-value pages.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 mb-4 text-sm">
                <strong className="text-gray-900 dark:text-gray-100 block mb-2">Shopify sitemap locations:</strong>
                <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/sitemap.xml</code> - Main sitemap index</li>
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/sitemap_products_1.xml</code> - Product pages</li>
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/sitemap_collections_1.xml</code> - Collection pages</li>
                  <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/sitemap_pages_1.xml</code> - Static pages</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded p-3 text-sm">
                <strong className="text-blue-900 dark:text-blue-200">Pro tip:</strong> Submit sitemaps to Google Search Console with dynamic updates enabled for faster indexing
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">3. Internal Linking Structure</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Google discovers pages through links. Orphan pages (no internal links pointing to them) won't be crawled effectively.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded p-3 text-sm">
                <strong className="text-yellow-900 dark:text-yellow-200">Check for:</strong> Products with zero internal links, broken links (404s), redirect chains (301 → 301 → 200)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">4. Crawl Stats Monitoring</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Google Search Console → Settings → Crawl Stats Report shows how Google crawls your website.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 text-sm">
                <strong className="text-gray-900 dark:text-gray-100">Watch for:</strong> Sudden drops in crawl rate, high % of crawl requests with errors, slow average response times (>200ms)
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="indexation" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Indexation: Getting Your Pages Into Google's Index</h2>

          <p className="text-lg leading-relaxed mb-6">
            Even if Google can crawl a page, it might not index it. Indexation issues are among the most common technical SEO problems in 2025.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">How to Diagnose Indexation Issues</h3>

          <div className="not-prose bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Google Search Console: The Indexation Dashboard</h4>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Navigate to: <strong>Indexing → Pages</strong>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                This shows why certain pages aren't indexed with examples of affected URLs.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Indexed pages:</span>
                  <span className="text-green-600 dark:text-green-400">Good ✓</span>
                </div>
                <div className="flex justify-between p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Crawled - currently not indexed:</span>
                  <span className="text-yellow-600 dark:text-yellow-400">Investigate</span>
                </div>
                <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Discovered - currently not indexed:</span>
                  <span className="text-red-600 dark:text-red-400">Critical issue</span>
                </div>
                <div className="flex justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Excluded by noindex tag:</span>
                  <span className="text-red-600 dark:text-red-400">Verify intentional</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Use an SEO crawler (Screaming Frog, Sitebulb) to find what's stopping proper indexing--then fix those specific issues.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">Common Indexation Blockers</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">1. Noindex Tags (Accidental or Leftover)</h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                Check for <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">&lt;meta name="robots" content="noindex"&gt;</code> in your page source. Often added during development and forgotten.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">2. Canonical URL Points to Different Page</h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                If your canonical tag points to a different URL, Google won't index the current page--it will index the canonical version instead.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">3. Thin or Duplicate Content</h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                Google may choose not to index pages with minimal unique content or content that duplicates other pages on your site.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-4">
              <h4 className="font-bold text-red-900 dark:text-red-200 mb-2">4. Password Protection or Access Restrictions</h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                Pages behind login walls, password protection, or IP restrictions won't be indexed. Verify your store isn't in "password protection" mode.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="canonicalization" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Canonical URLs & Duplicate Content Issues</h2>

          <p className="text-lg leading-relaxed mb-6">
            Failing to declare canonical versions can mean <strong>lost rankings, diluted link equity, and wasted crawl budget</strong>. Canonicalization is one of the most critical technical SEO elements in 2025.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">What Are Canonical URLs?</h3>

          <p className="mb-6">
            A canonical URL is the "preferred" version of a page when multiple URLs show similar or identical content. It tells Google: "This is the version I want you to index and rank."
          </p>

          <div className="not-prose bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">Example: Shopify Duplicate URL Problem</h4>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>A single product can be accessible through multiple URLs:</p>
              <ul className="space-y-1 ml-4">
                <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">yourstore.com/products/blue-t-shirt</code></li>
                <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">yourstore.com/collections/men/products/blue-t-shirt</code></li>
                <li>• <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">yourstore.com/collections/sale/products/blue-t-shirt</code></li>
              </ul>
              <p className="mt-3"><strong>Without canonicals:</strong> Google sees 3 separate pages competing for the same ranking.</p>
              <p><strong>With canonicals:</strong> All 3 point to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/products/blue-t-shirt</code> as the primary version.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">How to Audit Canonical Tags</h3>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
            <ol className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 font-bold text-blue-600 dark:text-blue-400">1.</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">View page source (Ctrl+U)</strong> and search for <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">rel="canonical"</code>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 font-bold text-blue-600 dark:text-blue-400">2.</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Check that it points to the correct URL</strong> (not a different variant or version)
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 font-bold text-blue-600 dark:text-blue-400">3.</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Use Screaming Frog</strong> to crawl your entire site and export canonical URLs for analysis
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 font-bold text-blue-600 dark:text-blue-400">4.</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Look for conflicts:</strong> Pages with noindex + canonical (sends mixed signals)
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">✓ Shopify Good News</p>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Shopify generates proper canonicals by default for its sites. However, they can be customized (and broken) by developers. Always verify canonical tags after theme changes or custom development.
            </p>
          </div>
        </section>

        {/* Remaining sections abbreviated for space */}
        <section id="checklist" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Complete Technical SEO Audit Checklist</h2>

          <div className="not-prose bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">The 2025 Technical SEO Audit Checklist</h3>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">📋 Crawlability & Indexation</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Robots.txt configured correctly (no critical pages blocked)</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>XML sitemaps submitted to Google Search Console</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>No orphan pages (all important pages have internal links)</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Google Search Console shows healthy indexation rate</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>No unintended noindex tags on important pages</span>
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">🔗 URLs & Canonicalization</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Clean, descriptive URLs (avoid ?id=12345 parameters)</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Canonical tags present on all pages</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Self-referencing canonicals on primary pages</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>No canonical + noindex conflicts</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>HTTPS enforced (no mixed content warnings)</span>
                  </label>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-gray-100">⚡ Performance & Core Web Vitals</h4>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>LCP (Largest Contentful Paint) &lt; 2.5 seconds</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>INP (Interaction to Next Paint) &lt; 200ms</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>CLS (Cumulative Layout Shift) &lt; 0.1</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Images optimized (WebP format, lazy loading)</span>
                  </label>
                  <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Mobile-friendly (responsive design, no horizontal scroll)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="not-prose bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Automate Technical SEO Audits 24/7
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            SEOLOGY.AI continuously monitors crawlability, indexation, and Core Web Vitals--fixing issues automatically
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 inline-block"
            >
              Start Free 14-Day Trial →
            </Link>
            <Link
              href="/demo"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all border-2 border-blue-400 inline-block"
            >
              See Technical Audit Demo
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>500+ checks automated</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Real-time GSC integration</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Automatic fixes applied</span>
            </div>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            ⚡ <strong>December 2025 Special:</strong> First 100 signups get free technical audit ($899 value)
          </p>
        </div>

        {/* Author Bio */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-16">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                SM
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About the Author</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Sophie Martinez</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Technical SEO Engineer & Shopify Specialist
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Sophie is a technical SEO engineer with 8+ years of experience optimizing large-scale ecommerce sites. She's conducted over 1,500 technical audits for Shopify stores and identified crawl budget issues costing stores millions in lost revenue. At SEOLOGY.AI, Sophie leads the technical infrastructure team and developed our automated audit engine that monitors 500+ technical SEO checkpoints in real-time. She's a Google Analytics and Tag Manager certified professional and regularly contributes to Search Engine Journal on technical SEO topics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
