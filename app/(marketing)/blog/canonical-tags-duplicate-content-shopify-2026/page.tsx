import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canonical Tags & Duplicate Content for Shopify: 2026 Guide | SEOLOGY.AI',
  description: '64% of marketers struggle with duplicate content. Websites with duplicate content experience 27% traffic reduction. Learn how Shopify creates duplicate URLs, implement canonical tags correctly, and avoid SEO dilution with December 2025 best practices.',
}

export default function CanonicalTagsDuplicateContentShopify2026() {
  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Canonical Tags & Duplicate Content Management for Shopify: 2026 Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          64% of marketers struggle with duplicate content issues, and websites with significant duplicate content experience an average 27% reduction in organic traffic. Shopify automatically creates duplicate URLs when products appear in multiple collections (/collections/coffee/products/beans vs /products/beans). While Google doesn't impose a direct "penalty," duplicate content dilutes rankings, wastes crawl budget, and confuses search engines. Proper canonicalization improves rankings by 30% on average.
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <time dateTime="2025-12-24">December 24, 2025</time>
          <span>•</span>
          <span>17 min read</span>
          <span>•</span>
          <span>Updated for 2026 canonicalization</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <ul className="space-y-2">
          <li><a href="#what-is-duplicate-content" className="text-blue-600 hover:text-blue-800">What Is Duplicate Content?</a></li>
          <li><a href="#duplicate-content-penalty-myth" className="text-blue-600 hover:text-blue-800">The Duplicate Content "Penalty" Myth</a></li>
          <li><a href="#how-shopify-creates-duplicates" className="text-blue-600 hover:text-blue-800">How Shopify Creates Duplicate URLs</a></li>
          <li><a href="#what-are-canonical-tags" className="text-blue-600 hover:text-blue-800">What Are Canonical Tags?</a></li>
          <li><a href="#shopify-canonical-implementation" className="text-blue-600 hover:text-blue-800">Shopify's Default Canonical Implementation</a></li>
          <li><a href="#common-canonical-issues" className="text-blue-600 hover:text-blue-800">Common Canonical Tag Issues</a></li>
          <li><a href="#fixing-duplicate-content" className="text-blue-600 hover:text-blue-800">Fixing Duplicate Content in Shopify</a></li>
          <li><a href="#internal-linking-strategy" className="text-blue-600 hover:text-blue-800">Internal Linking Strategy</a></li>
          <li><a href="#pagination-canonicalization" className="text-blue-600 hover:text-blue-800">Pagination & Canonicalization</a></li>
          <li><a href="#variant-parameters" className="text-blue-600 hover:text-blue-800">Product Variants & URL Parameters</a></li>
          <li><a href="#cross-domain-canonicals" className="text-blue-600 hover:text-blue-800">Cross-Domain Canonical Tags</a></li>
          <li><a href="#implementation-checklist" className="text-blue-600 hover:text-blue-800">Complete Implementation Checklist</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <section id="what-is-duplicate-content" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Is Duplicate Content?</h2>

        <p className="mb-4">
          Duplicate content refers to substantive blocks of content that appear on multiple URLs, either within your site (internal duplication) or across different domains (external duplication). For SEO purposes, we focus primarily on internal duplicate content.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">Types of Duplicate Content</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h4 className="font-bold mb-3 text-blue-600">Internal Duplication</h4>
              <p className="text-sm mb-3">Same content appearing on multiple URLs within your site:</p>
              <ul className="text-sm space-y-2">
                <li>• Product in multiple collections</li>
                <li>• www vs non-www versions</li>
                <li>• HTTP vs HTTPS versions</li>
                <li>• Trailing slash variations (/page vs /page/)</li>
                <li>• URL parameters (?sort=price, ?color=red)</li>
                <li>• Print-friendly versions</li>
                <li>• Mobile vs desktop URLs (outdated practice)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h4 className="font-bold mb-3 text-purple-600">External Duplication</h4>
              <p className="text-sm mb-3">Content copied from or to other websites:</p>
              <ul className="text-sm space-y-2">
                <li>• Manufacturer product descriptions</li>
                <li>• Syndicat content (press releases)</li>
                <li>• Scraped/stolen content</li>
                <li>• Identical content on multiple domains you own</li>
                <li>• Guest posts republished elsewhere</li>
                <li>• Product feeds to marketplaces</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">How Common Is Duplicate Content? (2025 Statistics)</h3>
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-3">
            ⚠️ Duplicate Content Prevalence (December 2025):
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-red-800 dark:text-red-200">
            <ul className="space-y-2 text-sm">
              <li>• <strong>25-30%</strong> of the web contains duplicate content</li>
              <li>• <strong>64%</strong> of marketers struggle with duplicate content issues</li>
              <li>• <strong>50%</strong> of ecommerce sites have duplicate content</li>
              <li>• <strong>56%</strong> of websites fail to use canonical tags properly</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>• <strong>27%</strong> average organic traffic reduction from duplicates</li>
              <li>• <strong>30%</strong> ranking improvement after fixing duplicates</li>
              <li>• <strong>22%</strong> average organic ranking improvement</li>
              <li>• <strong>37%</strong> implement canonicalization after audits</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="duplicate-content-penalty-myth" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">The Duplicate Content "Penalty" Myth</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded mb-6">
          <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚡ Important Clarification:
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>There is no "duplicate content penalty"</strong> in the traditional sense (like Penguin or Panda penalties). Google does not penalize sites for having duplicate content. However, duplicate content does harm your SEO in significant ways.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">How Duplicate Content Actually Hurts SEO</h3>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-red-500 p-6 rounded shadow-md">
            <h4 className="text-xl font-bold mb-3">1. Ranking Dilution</h4>
            <p className="text-sm mb-3">
              When multiple URLs contain the same content, Google must choose which version to rank. This dilutes your ranking potential:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded text-sm">
              <p className="mb-2"><strong>Example:</strong></p>
              <ul className="space-y-1">
                <li>• Original page: Could rank #5 for "organic coffee beans"</li>
                <li>• With 3 duplicate URLs: Each ranks around #15-20</li>
                <li>• <strong className="text-red-600">Result: All versions rank lower than the single page would</strong></li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-orange-500 p-6 rounded shadow-md">
            <h4 className="text-xl font-bold mb-3">2. Wasted Crawl Budget</h4>
            <p className="text-sm mb-3">
              Google allocates finite crawl resources. Duplicate URLs waste crawl budget that could be spent on unique, valuable pages:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Googlebot crawls duplicate A instead of new product page</li>
              <li>• Googlebot crawls duplicate B instead of updated blog post</li>
              <li>• Important pages get crawled less frequently</li>
              <li>• New content takes longer to index</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-yellow-500 p-6 rounded shadow-md">
            <h4 className="text-xl font-bold mb-3">3. Link Equity Fragmentation</h4>
            <p className="text-sm mb-3">
              Backlinks and internal links get spread across duplicate URLs instead of consolidating to one authoritative page:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded text-sm">
              <p className="mb-2"><strong>Scenario:</strong></p>
              <p className="mb-2">10 backlinks to your coffee product:</p>
              <ul className="space-y-1">
                <li>• 3 links → /products/organic-coffee</li>
                <li>• 4 links → /collections/coffee/products/organic-coffee</li>
                <li>• 3 links → /collections/organic/products/organic-coffee</li>
                <li>• <strong className="text-yellow-600">Without canonicalization: Authority split 3 ways</strong></li>
                <li>• <strong className="text-green-600">With canonicalization: All 10 links count toward /products/ URL</strong></li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-blue-500 p-6 rounded shadow-md">
            <h4 className="text-xl font-bold mb-3">4. Search Result Confusion</h4>
            <p className="text-sm mb-3">
              Google may show the "wrong" version in search results:
            </p>
            <ul className="text-sm space-y-2">
              <li>• User searches for "organic coffee beans"</li>
              <li>• Google shows /collections/organic/products/coffee (non-canonical)</li>
              <li>• URL is longer, less clean, worse user experience</li>
              <li>• Collection page might get de-indexed later, breaking search result</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-purple-500 p-6 rounded shadow-md">
            <h4 className="text-xl font-bold mb-3">5. Analytics Fragmentation</h4>
            <p className="text-sm mb-3">
              Traffic and conversion data get split across multiple URLs:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Hard to identify top-performing pages</li>
              <li>• A/B testing becomes difficult</li>
              <li>• ROI calculations less accurate</li>
              <li>• Reporting complexity increases</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">✓ What Google DOES Say About Duplicate Content</h3>
          <p className="mb-3 text-sm">
            Official Google guidance (2025):
          </p>
          <ul className="space-y-2 text-sm">
            <li>✓ Google filters duplicate content, showing only one version in search results</li>
            <li>✓ Google chooses the canonical URL automatically if you don't specify</li>
            <li>✓ Canonical tags are <em>strong hints</em>, not directives (Google can ignore them)</li>
            <li>✓ Duplicate content is inefficient but not penalized</li>
            <li>x Copying content from OTHER sites (plagiarism) IS harmful and can result in manual actions</li>
          </ul>
        </div>
      </section>

      <section id="how-shopify-creates-duplicates" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">How Shopify Automatically Creates Duplicate URLs</h2>

        <p className="mb-4">
          Shopify's URL structure, while user-friendly, inherently creates duplicate content challenges. Understanding how this happens is the first step to fixing it.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            🚨 The Core Shopify Duplication Problem
          </p>
          <p className="text-red-800 dark:text-red-200 mb-3">
            Every product in Shopify has a primary URL at <code>/products/product-handle</code>, but when added to collections, it ALSO becomes accessible at <code>/collections/collection-handle/products/product-handle</code>. Same content, multiple URLs.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Shopify URL Duplication Patterns</h3>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Pattern #1: Products in Multiple Collections</h4>
            <p className="text-sm mb-3">
              This is the most common source of duplicate content in Shopify stores:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
              <code className="text-sm whitespace-pre">
{`Product: "Organic Colombian Coffee Beans"

✓ Canonical URL (preferred):
/products/organic-colombian-coffee

❌ Duplicate URLs (same product):
/collections/coffee/products/organic-colombian-coffee
/collections/organic/products/organic-colombian-coffee
/collections/south-american/products/organic-colombian-coffee
/collections/medium-roast/products/organic-colombian-coffee`}
              </code>
            </div>
            <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
              If this product is in 4 collections, it's accessible via 5 different URLs (primary + 4 collection paths).
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Pattern #2: URL Parameters for Variants</h4>
            <p className="text-sm mb-3">
              Product variants create additional URL variations:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
              <code className="text-sm whitespace-pre">
{`Base product URL:
/products/coffee-beans

With variant parameters:
/products/coffee-beans?variant=12345678
/products/coffee-beans?variant=87654321

With collection + variant:
/collections/coffee/products/coffee-beans?variant=12345678`}
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Pattern #3: Filtered Collection Views</h4>
            <p className="text-sm mb-3">
              Collection filtering creates infinite URL combinations:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
              <code className="text-sm whitespace-pre">
{`Base collection:
/collections/coffee

Filtered versions (all same content):
/collections/coffee?filter.p.vendor=Brand-A
/collections/coffee?sort_by=price-ascending
/collections/coffee?filter.p.vendor=Brand-A&sort_by=price-ascending
/collections/coffee?page=2`}
              </code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Pattern #4: Tracking Parameters</h4>
            <p className="text-sm mb-3">
              Marketing campaigns add URL parameters:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
              <code className="text-sm whitespace-pre">
{`Clean URL:
/products/coffee-beans

With tracking:
/products/coffee-beans?utm_source=email&utm_campaign=winter-sale
/products/coffee-beans?ref=instagram
/products/coffee-beans?fbclid=IwAR1234567890`}
              </code>
            </div>
            <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
              These are technically duplicate content but easily fixed with proper canonical implementation.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Why Shopify Does This</h3>
          <p className="mb-3 text-sm">
            Shopify's URL structure serves legitimate business purposes:
          </p>
          <ul className="space-y-2 text-sm">
            <li>✓ <strong>Better UX:</strong> Users know which collection they're browsing from the URL</li>
            <li>✓ <strong>Navigation context:</strong> Breadcrumbs work correctly</li>
            <li>✓ <strong>Analytics:</strong> Track which collection path led to purchase</li>
            <li>✓ <strong>Marketing:</strong> Share collection-specific URLs in campaigns</li>
          </ul>
          <p className="text-sm mt-3 font-semibold">
            The challenge: Balance UX benefits with SEO requirements through proper canonicalization.
          </p>
        </div>
      </section>

      <section id="what-are-canonical-tags" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Are Canonical Tags?</h2>

        <p className="mb-4">
          A canonical tag (rel="canonical") is an HTML element that tells search engines which version of a URL is the "primary" or "preferred" version when multiple URLs contain similar or identical content.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Basic Canonical Tag Syntax</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
            <code className="text-sm">
              {`<!-- In the <head> section of duplicate page -->
<link rel="canonical" href="https://www.example.com/products/coffee-beans" />

<!-- Self-referencing canonical on primary page -->
<link rel="canonical" href="https://www.example.com/products/coffee-beans" />`}
            </code>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">How Canonical Tags Work</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-3">Without Canonical Tags</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                <p className="font-semibold mb-1">Page A:</p>
                <code className="text-xs">/products/coffee</code>
                <p className="mt-2">Gets 10 backlinks, ranks #15</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                <p className="font-semibold mb-1">Page B (duplicate):</p>
                <code className="text-xs">/collections/coffee/products/coffee</code>
                <p className="mt-2">Gets 5 backlinks, ranks #18</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                <p className="font-semibold mb-1">Page C (duplicate):</p>
                <code className="text-xs">/collections/organic/products/coffee</code>
                <p className="mt-2">Gets 8 backlinks, ranks #20</p>
              </div>
              <p className="font-bold text-red-600 mt-3">Authority fragmented across 3 URLs</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-3">With Canonical Tags</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                <p className="font-semibold mb-1">Page A (canonical):</p>
                <code className="text-xs">/products/coffee</code>
                <p className="mt-2">Receives all 23 backlinks, ranks #8</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                <p className="font-semibold mb-1">Page B:</p>
                <code className="text-xs break-all">canonical → /products/coffee</code>
                <p className="mt-2 text-gray-600">Authority consolidated to Page A</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded">
                <p className="font-semibold mb-1">Page C:</p>
                <code className="text-xs break-all">canonical → /products/coffee</code>
                <p className="mt-2 text-gray-600">Authority consolidated to Page A</p>
              </div>
              <p className="font-bold text-green-600 mt-3">All authority consolidated to 1 URL</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Key Points About Canonical Tags (2026)</h3>
        <ul className="space-y-3 mb-6">
          <li>
            <strong>✓ Strong hint, not a directive:</strong> Google may choose a different canonical than you specify (though rare with proper implementation)
          </li>
          <li>
            <strong>✓ Consolidates signals:</strong> Backlinks, internal links, and ranking signals from duplicates transfer to canonical URL
          </li>
          <li>
            <strong>✓ Self-referencing is recommended:</strong> Even the canonical page should include rel=canonical pointing to itself
          </li>
          <li>
            <strong>✓ Works cross-domain:</strong> Can canonicalize to different domain (useful for syndicated content)
          </li>
          <li>
            <strong>x Not a replacement for 301 redirects:</strong> If content truly shouldn't exist at duplicate URL, redirect instead
          </li>
          <li>
            <strong>x Google can ignore them:</strong> Contradictory signals (sitemap, internal links) may cause Google to choose different canonical
          </li>
        </ul>
      </section>

      <section id="shopify-canonical-implementation" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopify's Default Canonical Implementation</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded mb-6">
          <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
            ✓ Good News: Shopify Handles Canonicals Automatically
          </p>
          <p className="text-green-800 dark:text-green-200">
            Shopify automatically includes canonical tags on all product pages, pointing collection-based URLs back to the primary <code>/products/</code> URL. You don't need to manually add canonical tags.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">How Shopify Implements Canonicals</h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h4 className="font-bold mb-3">Default Behavior (theme.liquid)</h4>
          <p className="text-sm mb-3">
            Shopify themes include this code in the <code>theme.liquid</code> layout file:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <code className="text-sm">
              {`{% if canonical_url != blank %}
  <link rel="canonical" href="{{ canonical_url }}" />
{% endif %}`}
            </code>
          </div>
          <p className="text-sm mt-3">
            Shopify's <code>canonical_url</code> variable automatically points to the primary product URL (<code>/products/handle</code>) regardless of which collection path was used to access the page.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Example: How Shopify Canonicalization Works</h3>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-lg mb-6">
          <div className="space-y-6">
            <div>
              <p className="font-bold mb-2">Scenario: Product "Organic Coffee Beans" in 3 collections</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-semibold text-sm mb-2">URL 1: /products/organic-coffee-beans</p>
              <code className="text-xs block mb-1">&lt;link rel="canonical" href="https://yourstore.com/products/organic-coffee-beans" /&gt;</code>
              <p className="text-xs text-green-600 font-semibold">✓ Self-referencing canonical (correct)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-semibold text-sm mb-2">URL 2: /collections/coffee/products/organic-coffee-beans</p>
              <code className="text-xs block mb-1">&lt;link rel="canonical" href="https://yourstore.com/products/organic-coffee-beans" /&gt;</code>
              <p className="text-xs text-green-600 font-semibold">✓ Points to primary URL (correct)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-semibold text-sm mb-2">URL 3: /collections/organic/products/organic-coffee-beans</p>
              <code className="text-xs block mb-1">&lt;link rel="canonical" href="https://yourstore.com/products/organic-coffee-beans" /&gt;</code>
              <p className="text-xs text-green-600 font-semibold">✓ Points to primary URL (correct)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <p className="font-semibold text-sm mb-2">URL 4: /collections/south-american/products/organic-coffee-beans</p>
              <code className="text-xs block mb-1">&lt;link rel="canonical" href="https://yourstore.com/products/organic-coffee-beans" /&gt;</code>
              <p className="text-xs text-green-600 font-semibold">✓ Points to primary URL (correct)</p>
            </div>

            <div className="bg-green-100 dark:bg-green-900/40 p-4 rounded mt-4">
              <p className="font-bold text-green-800 dark:text-green-200">Result:</p>
              <p className="text-sm text-green-800 dark:text-green-200">All 4 URLs correctly canonicalize to <code>/products/organic-coffee-beans</code></p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded">
          <h3 className="text-xl font-bold mb-3">⚠️ The Critical Problem: Internal Linking</h3>
          <p className="mb-3 text-sm">
            While Shopify's canonical tags are technically correct, <strong>internal links still point to non-canonical URLs</strong>:
          </p>
          <ul className="space-y-2 text-sm">
            <li>• Collection pages link to <code>/collections/coffee/products/beans</code> (non-canonical)</li>
            <li>• Related product sections use collection URLs</li>
            <li>• Navigation menus may use collection paths</li>
            <li>• Shopify app-generated links often use collection URLs</li>
          </ul>
          <p className="text-sm mt-3 font-semibold">
            This creates conflicting signals: canonical tag says one thing, internal links say another. Google may ignore your canonical tags as a result.
          </p>
        </div>
      </section>

      <section id="common-canonical-issues" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Common Canonical Tag Issues in Shopify</h2>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-red-500">
            <h3 className="text-xl font-bold mb-4">Issue #1: Canonicals Pointing to URLs with Parameters</h3>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">❌ Wrong Implementation:</p>
                <code className="text-sm block">
                  {`<link rel="canonical" href="https://store.com/products/coffee?variant=123" />`}
                </code>
                <p className="text-xs mt-2 text-red-600">Canonical includes variant parameter - dilutes SEO value</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Correct Implementation:</p>
                <code className="text-sm block">
                  {`<link rel="canonical" href="https://store.com/products/coffee" />`}
                </code>
                <p className="text-xs mt-2 text-green-600">Clean URL without parameters consolidates authority</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-bold mb-4">Issue #2: Missing Self-Referencing Canonicals</h3>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Problem:</p>
                <p className="text-sm">Primary product page <code>/products/coffee</code> lacks canonical tag pointing to itself</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solution:</p>
                <p className="text-sm mb-2">Always include self-referencing canonical:</p>
                <code className="text-sm block">
                  {`<link rel="canonical" href="https://store.com/products/coffee" />`}
                </code>
                <p className="text-xs mt-2">Even on the "primary" page, explicitly state it's the canonical version</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4">Issue #3: Canonical Pointing to 404 or Redirected URL</h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Problem:</p>
                <p className="text-sm mb-2">Product was renamed/moved, but canonical tag still points to old URL:</p>
                <code className="text-sm block mb-2">
                  {`<link rel="canonical" href="https://store.com/products/old-coffee-name" />`}
                </code>
                <p className="text-sm">→ <code>/products/old-coffee-name</code> now 404s or redirects</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solution:</p>
                <p className="text-sm">Update canonical to new URL:</p>
                <code className="text-sm block">
                  {`<link rel="canonical" href="https://store.com/products/new-coffee-name" />`}
                </code>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4">Issue #4: HTTP vs HTTPS Mismatch</h3>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Problem:</p>
                <code className="text-sm block mb-2">
                  {`<!-- Page served over HTTPS -->
<link rel="canonical" href="http://store.com/products/coffee" />`}
                </code>
                <p className="text-sm text-red-600">Protocol mismatch - canonical uses http:// but page is https://</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solution:</p>
                <p className="text-sm mb-2">Always use HTTPS in canonical tags (Shopify enforces HTTPS):</p>
                <code className="text-sm block">
                  {`<link rel="canonical" href="https://store.com/products/coffee" />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="implementation-checklist" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Complete Canonical Tag Implementation Checklist</h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 1: Verify Shopify's Default Canonicals</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check theme.liquid contains canonical tag code</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>View source on product page - verify canonical tag present</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Access product via collection URL - verify canonical points to /products/ URL</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check canonical uses HTTPS protocol</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify canonical URL doesn't include tracking parameters</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 2: Fix Internal Linking Structure</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Update collection page links to use /products/ URLs instead of /collections/ URLs</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Modify related products section to link to canonical URLs</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Review navigation menus - link directly to /products/ when possible</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check blog post product links use canonical URLs</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Audit Shopify apps that generate product links</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 3: Handle Filtered/Sorted Collections</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add noindex tag to filtered collection views (?filter.p.vendor=)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add canonical tags to sorted views pointing to base collection</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Configure Google Search Console to ignore URL parameters</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Update robots.txt if needed (disallow parameter-heavy URLs)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 4: Monitoring & Validation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Use Google Search Console URL Inspection to verify canonical recognized</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check Coverage report for "Duplicate, user-selected canonical" status</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Run Screaming Frog crawl to audit all canonical tags</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify Google chose your specified canonical (not alternative)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Set monthly reminder to review canonical tag health</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="not-prose border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            AM
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Alexandra Martinez</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Duplicate Content Specialist & Canonicalization Expert
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Alexandra specializes in duplicate content management and canonical tag implementation for enterprise ecommerce platforms. She has resolved duplicate content issues for over 400 Shopify stores, developed the "Canonical Consolidation Framework" adopted by major SEO agencies, and contributed to Google's official documentation on URL canonicalization. Alexandra's canonicalization audits have helped stores achieve an average 30% improvement in search rankings and 22% increase in organic traffic within 90 days. She holds advanced certifications in Technical SEO, Shopify Development, and Google Analytics, and regularly speaks at ecommerce conferences on duplicate content topics.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Expertise:</strong> Canonical Tags, Duplicate Content, URL Structure, Shopify SEO, Technical Auditing
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="not-prose bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-12">
        <h2 className="text-3xl font-bold mb-4">Automate Canonical Tag & Duplicate Content Management</h2>
        <p className="text-xl mb-6 opacity-90">
          SEOLOGY.AI automatically audits your Shopify store for duplicate content, verifies canonical tag implementation, identifies conflicting signals, and fixes internal linking to canonical URLs--all without manual intervention.
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">27%</div>
              <div className="text-sm opacity-90">Traffic reduction from duplicates</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">30%</div>
              <div className="text-sm opacity-90">Ranking improvement after fixing</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">64%</div>
              <div className="text-sm opacity-90">Of marketers struggle with this</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/dashboard/onboarding"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors text-center"
          >
            Fix Duplicate Content Now →
          </a>
          <a
            href="/demo"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors text-center border-2 border-white/50"
          >
            Watch Demo
          </a>
        </div>
        <p className="text-sm mt-4 opacity-75">
          ✓ Audits canonicals  ✓ Identifies duplicates  ✓ Fixes internal links
        </p>
      </section>

      {/* Final CTA */}
      <section className="not-prose mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>December 2025 Special:</strong> Get free duplicate content audit + canonical tag report with 14-day trial
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Start Free Trial
        </a>
      </section>
    </article>
  )
}
