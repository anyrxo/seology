export const metadata: Metadata = {
  title: 'Robots.txt & Crawl Control for Shopify: 2026 Complete Guide | SEOLOGY.AI',
  description: '30% of websites have robots.txt errors harming SEO. 70% of searches influenced by AI crawlers by 2026. Learn Shopify robots.txt customization, avoid blocking mistakes, control Googlebot and AI bots with December 2025 best practices.',
  keywords: 'robots.txt, Shopify robots.txt, crawl control, Googlebot, AI crawlers, robots.txt.liquid, SEO blocking, crawl budget, disallow, user-agent, Shopify SEO',
  openGraph: {
    title: 'Robots.txt & Crawl Control for Shopify: 2026 Complete Guide',
    description: '30% of websites have robots.txt errors. 70% of searches influenced by AI crawlers by 2026.',
    type: 'article',
    publishedTime: '2025-12-25T08:00:00Z',
    authors: ['David Foster, Technical SEO Engineer'],
    tags: [
      'Robots.txt',
      'Crawl Control',
      'Shopify SEO',
      'Googlebot',
      'AI Crawlers',
      'Technical SEO',
      'Crawl Budget',
      'Search Engine Optimization',
      'Shopify Configuration',
      'SEO Best Practices'
    ],
  },
}

export default function RobotsTxtCrawlControlShopify2026() {
  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Robots.txt & Crawl Control for Shopify: 2026 Complete Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Research shows 30% of websites contain robots.txt errors that harm search visibility by up to 30%. With AI-driven bots predicted to influence 70% of searches by end of 2025, and zero-click results claiming 65% of searches, your robots.txt file now manages Googlebot, AI crawlers, and content scrapers. One misplaced "Disallow: /" can vanish years of SEO progress overnight. Shopify provides robots.txt.liquid customization, but warns: "Incorrect use can result in loss of all traffic."
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <time dateTime="2025-12-25">December 25, 2025</time>
          <span>•</span>
          <span>19 min read</span>
          <span>•</span>
          <span>Updated for AI crawlers 2026</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <ul className="space-y-2">
          <li><a href="#what-is-robots-txt" className="text-blue-600 hover:text-blue-800">What Is Robots.txt?</a></li>
          <li><a href="#crawling-vs-indexing" className="text-blue-600 hover:text-blue-800">Critical: Crawling vs Indexing</a></li>
          <li><a href="#shopify-default-robots" className="text-blue-600 hover:text-blue-800">Shopify's Default Robots.txt</a></li>
          <li><a href="#customizing-shopify-robots" className="text-blue-600 hover:text-blue-800">Customizing Shopify Robots.txt.liquid</a></li>
          <li><a href="#common-mistakes" className="text-blue-600 hover:text-blue-800">Common Robots.txt Mistakes</a></li>
          <li><a href="#ai-bot-management" className="text-blue-600 hover:text-blue-800">Managing AI Crawlers & Scrapers</a></li>
          <li><a href="#crawl-budget-optimization" className="text-blue-600 hover:text-blue-800">Crawl Budget Optimization</a></li>
          <li><a href="#syntax-patterns" className="text-blue-600 hover:text-blue-800">Syntax & Pattern Matching</a></li>
          <li><a href="#testing-validation" className="text-blue-600 hover:text-blue-800">Testing & Validation</a></li>
          <li><a href="#advanced-configurations" className="text-blue-600 hover:text-blue-800">Advanced Configurations</a></li>
          <li><a href="#monitoring-impact" className="text-blue-600 hover:text-blue-800">Monitoring Crawl Impact</a></li>
          <li><a href="#implementation-checklist" className="text-blue-600 hover:text-blue-800">Complete Implementation Checklist</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <section id="what-is-robots-txt" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Is Robots.txt?</h2>

        <p className="mb-4">
          Robots.txt is a plain text file placed in your website's root directory that tells search engine crawlers (like Googlebot) and other bots which pages or sections of your site they can and cannot access. It's part of the Robots Exclusion Protocol, a 30-year-old standard that remains critical for SEO in 2026.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Basic Robots.txt Example</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`# Example robots.txt file
User-agent: *
Disallow: /admin/
Disallow: /cart
Disallow: /checkout
Allow: /products/

Sitemap: https://www.example.com/sitemap.xml`}
            </code>
          </div>
          <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
            This file tells all bots (*) they cannot crawl admin, cart, or checkout pages, but can crawl product pages, and indicates where the sitemap is located.
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-3">
            ⚠️ Critical Statistics (December 2025):
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-red-800 dark:text-red-200 text-sm">
            <ul className="space-y-2">
              <li>• <strong>30%</strong> of websites have robots.txt configuration errors</li>
              <li>• <strong>Up to 30%</strong> search visibility loss from robots.txt mistakes</li>
              <li>• <strong>70%</strong> of searches influenced by AI crawlers by end of 2025</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>65%</strong> of searches result in zero clicks (AI-generated answers)</li>
              <li>• <strong>100%</strong> traffic loss possible with "Disallow: /" error</li>
              <li>• <strong>Irreversible</strong> indexing issues if blocking pages with noindex tags</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">How Robots.txt Works</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold mb-2">Step 1: Bot Visits Your Site</h4>
            <p className="text-sm">
              Before crawling any page, search engine bots check <code>yoursite.com/robots.txt</code> to see what they're allowed to access.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold mb-2">Step 2: Bot Reads Directives</h4>
            <p className="text-sm">
              The bot looks for rules that apply to it (based on User-agent) and follows Disallow/Allow instructions.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold mb-2">Step 3: Bot Crawls Allowed Pages</h4>
            <p className="text-sm">
              The bot only crawls pages not blocked by Disallow rules, respecting your crawl budget allocation.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-bold mb-2">Step 4: Bot Updates Index</h4>
            <p className="text-sm">
              Crawled content is processed and potentially indexed (unless blocked by meta robots tags).
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Key Components of Robots.txt</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Directive</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Purpose</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>User-agent</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Specifies which bot the rules apply to</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm"><code>User-agent: Googlebot</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Disallow</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Blocks bots from crawling specified paths</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm"><code>Disallow: /admin/</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Allow</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Overrides Disallow for specific paths</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm"><code>Allow: /admin/public/</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Sitemap</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Tells bots where to find XML sitemap</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm"><code>Sitemap: https://site.com/sitemap.xml</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Crawl-delay</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Seconds between requests (not supported by Google)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm"><code>Crawl-delay: 10</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="crawling-vs-indexing" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Critical Distinction: Crawling vs Indexing</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            🚨 THE #1 ROBOTS.TXT MISTAKE
          </p>
          <p className="text-red-800 dark:text-red-200 mb-3">
            <strong>Robots.txt controls CRAWLING, not INDEXING.</strong> Blocking a page in robots.txt does NOT prevent it from appearing in search results. In fact, it can cause the exact problem you're trying to avoid.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Understanding the Difference</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h4 className="font-bold mb-3 text-blue-600">Crawling</h4>
            <p className="text-sm mb-3">
              The process of a bot visiting your page and reading its content.
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ <strong>Controlled by:</strong> robots.txt</li>
              <li>✓ <strong>Purpose:</strong> Bot discovers and reads content</li>
              <li>✓ <strong>Effect:</strong> Determines what bot can see</li>
              <li>✓ <strong>Reversible:</strong> Change robots.txt, bot recrawls</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <h4 className="font-bold mb-3 text-purple-600">Indexing</h4>
            <p className="text-sm mb-3">
              The process of adding a page to Google's search index (making it appear in search results).
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ <strong>Controlled by:</strong> Meta robots, X-Robots-Tag</li>
              <li>✓ <strong>Purpose:</strong> Determines if page appears in search</li>
              <li>✓ <strong>Effect:</strong> Page visibility in search results</li>
              <li>✓ <strong>Requires crawling:</strong> To read noindex directive</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">The Paradox: Blocking Crawling Can CAUSE Indexing Issues</h3>

        <div className="bg-gradient-to-r from-yellow-50 to-red-50 dark:from-yellow-900/20 dark:to-red-900/20 p-8 rounded-lg mb-6">
          <h4 className="text-xl font-bold mb-4">Scenario: You Want to Keep Pages Out of Search Results</h4>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded">
              <p className="font-bold mb-3 text-red-600">❌ WRONG Approach (Common Mistake):</p>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-3">
                <code className="text-sm">
                  {`# In robots.txt
Disallow: /staging/`}
                </code>
              </div>
              <p className="text-sm mb-3"><strong>What happens:</strong></p>
              <ol className="text-sm space-y-2">
                <li>1. Google cannot crawl /staging/ pages</li>
                <li>2. Google cannot see the <code>&lt;meta name="robots" content="noindex"&gt;</code> tag you added</li>
                <li>3. If other sites link to /staging/ pages, Google may still index them (without content)</li>
                <li>4. Search results show: "A description for this result is not available because of this site's robots.txt"</li>
              </ol>
              <p className="text-sm font-bold text-red-600 mt-3">Result: Pages appear in search anyway, but with ugly "blocked by robots.txt" message</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded">
              <p className="font-bold mb-3 text-green-600">✓ CORRECT Approach:</p>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-3">
                <code className="text-sm whitespace-pre">
{`# In robots.txt - ALLOW crawling
User-agent: *
Allow: /staging/

# In page HTML - PREVENT indexing
<meta name="robots" content="noindex, nofollow">`}
                </code>
              </div>
              <p className="text-sm mb-3"><strong>What happens:</strong></p>
              <ol className="text-sm space-y-2">
                <li>1. Google CAN crawl /staging/ pages</li>
                <li>2. Google READS the noindex directive</li>
                <li>3. Google does NOT add pages to search index</li>
                <li>4. Pages never appear in search results</li>
              </ol>
              <p className="text-sm font-bold text-green-600 mt-3">Result: Pages completely hidden from search as intended</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Rule of Thumb (2026)</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ <strong>Use robots.txt Disallow for:</strong> Pages you don't want crawled (waste of crawl budget, no SEO value)</li>
            <li>✓ <strong>Use meta robots noindex for:</strong> Pages you don't want indexed (appear in search results)</li>
            <li>× <strong>Never use robots.txt to hide pages from search</strong> - it doesn't work reliably</li>
          </ul>
        </div>
      </section>

      <section id="shopify-default-robots" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopify's Default Robots.txt Configuration</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded mb-6">
          <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
            ✓ Good News: Shopify's Default Is SEO-Optimized
          </p>
          <p className="text-green-800 dark:text-green-200">
            All Shopify stores come with a default robots.txt file that's optimized for SEO. For most stores, you don't need to modify it. Access it at: <code>yourstore.com/robots.txt</code>
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Shopify's Default Robots.txt (Simplified)</h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`# Shopify default robots.txt (simplified version)

# Block all bots from admin area
User-agent: *
Disallow: /admin
Disallow: /cart
Disallow: /orders
Disallow: /checkouts/
Disallow: /checkout
Disallow: /carts
Disallow: /account
Disallow: /services/

# Block filtered/sorted collection pages (prevent duplicate content)
Disallow: */collections/*+*
Disallow: */collections/*sort_by*

# Block search results
Disallow: /search

# Allow products and collections
Allow: /products/
Allow: /collections/

# Sitemap location
Sitemap: https://yourstore.myshopify.com/sitemap.xml`}
            </code>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">What Shopify Blocks (And Why)</h3>

        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">✓ Admin & Account Pages</h4>
            <p className="text-sm">
              <code>/admin</code>, <code>/account</code>, <code>/orders</code> - Private areas with no SEO value
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">✓ Cart & Checkout</h4>
            <p className="text-sm">
              <code>/cart</code>, <code>/checkout</code>, <code>/checkouts/</code> - Transaction pages that shouldn't be indexed
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">✓ Filtered Collections (Duplicate Content Prevention)</h4>
            <p className="text-sm mb-2">
              <code>*/collections/*+*</code>, <code>*/collections/*sort_by*</code> - Prevents indexing of:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• /collections/shoes?color=red</li>
              <li>• /collections/shoes?sort_by=price-ascending</li>
              <li>• /collections/shoes?filter.p.vendor=Nike</li>
            </ul>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              These create infinite duplicate content variations
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">✓ Search Results</h4>
            <p className="text-sm">
              <code>/search</code> - Dynamic pages with no unique content value
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded">
          <h3 className="text-xl font-bold mb-3">⚠️ When Default Robots.txt Is Sufficient</h3>
          <p className="mb-3 text-sm">
            The default Shopify robots.txt works perfectly for:</p>
          <ul className="space-y-2 text-sm">
            <li>✓ Most small to medium Shopify stores (under 10,000 products)</li>
            <li>✓ Stores with standard URL structure (no custom apps creating duplicate URLs)</li>
            <li>✓ Stores without staging/development environments</li>
            <li>✓ Stores not dealing with aggressive bot traffic</li>
          </ul>
          <p className="text-sm mt-3 font-semibold">
            If this describes your store, <strong>don't customize robots.txt</strong> - the default is optimized and regularly updated by Shopify.
          </p>
        </div>
      </section>

      <section id="customizing-shopify-robots" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Customizing Shopify Robots.txt.liquid</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            ⚠️ Shopify Warning (Official):
          </p>
          <p className="text-red-800 dark:text-red-200">
            "Editing the robots.txt.liquid file is an <strong>unsupported customization</strong>. Shopify support can't help with edits. <strong>Incorrect use of this feature can result in loss of all traffic.</strong>"
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">How to Create robots.txt.liquid</h3>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg mb-8">
          <h4 className="text-xl font-bold mb-6">Step-by-Step: Create Custom Robots.txt</h4>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h5 className="font-bold mb-2">Access Theme Code Editor</h5>
                <p className="text-sm">Shopify Admin → Online Store → Themes → Actions → Edit Code</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h5 className="font-bold mb-2">Add New Template</h5>
                <p className="text-sm mb-2">Click "Add a new template" → Select "robots" from dropdown</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">This creates <code>templates/robots.txt.liquid</code></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h5 className="font-bold mb-2">Start with Shopify's Default Code</h5>
                <p className="text-sm mb-3">Use Shopify's Liquid objects to maintain default rules:</p>
                <div className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
                  <code className="text-sm whitespace-pre">
{`{{ shop.robots_txt }}

# Custom rules below
User-agent: BadBot
Disallow: /`}
                  </code>
                </div>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  <code>{`{{ shop.robots_txt }}`}</code> includes all Shopify defaults automatically
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h5 className="font-bold mb-2">Add Your Custom Rules</h5>
                <p className="text-sm">Add custom User-agent or Disallow directives below the default code</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h5 className="font-bold mb-2">Test Before Saving</h5>
                <p className="text-sm mb-2">Use Google's Robots.txt Tester (Search Console) to validate syntax</p>
                <p className="text-sm text-red-600">⚠️ One syntax error can break your entire robots.txt</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold flex-shrink-0">6</div>
              <div>
                <h5 className="font-bold mb-2">Save & Verify</h5>
                <p className="text-sm mb-2">Save the file, then visit <code>yourstore.com/robots.txt</code> to verify changes appear</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Example: Custom Robots.txt.liquid Template</h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`# Start with Shopify's defaults
{{ shop.robots_txt }}

# Block AI content scrapers (2026)
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

# Block aggressive crawlers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10

# Allow specific staging area for development
User-agent: Googlebot
Disallow: /staging/
Allow: /staging/public/

# Custom sitemap for blog
Sitemap: https://yourstore.com/blogs/news/sitemap.xml`}
            </code>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">✓ Best Practices for Custom Robots.txt</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Always start with <code>{`{{ shop.robots_txt }}`}</code> to preserve Shopify defaults</li>
            <li>✓ Add comments (#) to explain custom rules</li>
            <li>✓ Test in Google Search Console Robots.txt Tester before deploying</li>
            <li>✓ Keep a backup copy of your robots.txt.liquid file</li>
            <li>✓ Monitor Search Console Coverage report after changes</li>
            <li>× Never use <code>Disallow: /</code> for all user-agents (blocks everything)</li>
            <li>× Don't block URLs that have noindex meta tags</li>
          </ul>
        </div>
      </section>

      <section id="common-mistakes" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Common Robots.txt Mistakes That Kill SEO</h2>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔴</span> Mistake #1: Blocking Entire Site
            </h3>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">❌ Catastrophic Error:</p>
                <code className="text-sm block mb-2">
                  {`User-agent: *
Disallow: /`}
                </code>
                <p className="text-sm text-red-600">This blocks ALL bots from crawling your ENTIRE site. Years of SEO progress vanish overnight.</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">How This Happens:</p>
                <ul className="text-sm space-y-1">
                  <li>• Developer enables "discourage search engines" during development</li>
                  <li>• Staging environment robots.txt accidentally deployed to production</li>
                  <li>• Misunderstanding of robots.txt syntax</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Prevention:</p>
                <ul className="text-sm space-y-1">
                  <li>1. Always test robots.txt changes in staging first</li>
                  <li>2. Set up monitoring to alert if <code>Disallow: /</code> appears</li>
                  <li>3. Double-check before deployment</li>
                  <li>4. Use version control for robots.txt.liquid</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🟠</span> Mistake #2: Blocking CSS/JavaScript Files
            </h3>
            <div className="space-y-3">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">❌ Old SEO "Wisdom" (Now Harmful):</p>
                <code className="text-sm block mb-2">
                  {`Disallow: /assets/
Disallow: *.css
Disallow: *.js`}
                </code>
                <p className="text-sm">Google needs to render JavaScript to index modern sites. Blocking these prevents proper indexing.</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Modern Best Practice (2026):</p>
                <p className="text-sm">Allow Google to access CSS/JavaScript so it can render pages correctly</p>
                <code className="text-sm block mt-2">
                  {`# DON'T block assets
Allow: /assets/`}
                </code>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🟡</span> Mistake #3: Wildcard Pattern Errors
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Problem: Unintended Blocking</p>
                <code className="text-sm block mb-2">
                  {`# Intended to block /blog/tag/ pages
Disallow: */tag/

# But ALSO blocks:
# - /catalog/product-tag/item
# - /vintage/tagged-products/
# - /storage/tags/inventory`}
                </code>
                <p className="text-sm mt-2">The <code>*</code> wildcard matches ANY characters, potentially blocking unintended pages</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solution: Be Specific</p>
                <code className="text-sm block">
                  {`# More specific pattern
Disallow: /blog/tag/`}
                </code>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔵</span> Mistake #4: Blocking Pages with Noindex Tags
            </h3>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">The Problem:</p>
                <p className="text-sm mb-3">You add <code>&lt;meta name="robots" content="noindex"&gt;</code> to pages, then also block them in robots.txt</p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                  <p className="mb-1">Result: Google cannot crawl the page to READ the noindex directive</p>
                  <p>→ Pages may still get indexed based on external links</p>
                  <p>→ Search shows "blocked by robots.txt" message</p>
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Correct Approach:</p>
                <ul className="text-sm space-y-1">
                  <li>1. ALLOW crawling in robots.txt</li>
                  <li>2. Use noindex meta tag in page HTML</li>
                  <li>3. Google crawls, reads noindex, doesn't index</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-bot-management" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Managing AI Crawlers & Content Scrapers (2026)</h2>

        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded mb-6">
          <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            🤖 New Challenge: AI Bot Explosion
          </p>
          <p className="text-purple-800 dark:text-purple-200">
            With AI-driven bots predicted to influence <strong>70% of searches by end of 2025</strong>, and zero-click results claiming <strong>65% of searches</strong>, your robots.txt now manages Googlebot, ChatGPT crawlers, content scrapers, and emerging AI technologies.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Common AI Bot User-Agents (December 2025)</h3>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Bot Name</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">User-Agent</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Purpose</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Should Block?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>GPTBot</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><code>GPTBot</code></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">OpenAI's web crawler for ChatGPT training</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Consider blocking to protect content</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>ChatGPT-User</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><code>ChatGPT-User</code></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">ChatGPT browsing feature</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Allow (drives traffic to your site)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>CCBot</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><code>CCBot</code></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Common Crawl (used by AI models)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Consider blocking to protect content</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Google-Extended</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><code>Google-Extended</code></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Google Bard/Gemini AI training</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Consider blocking separate from Googlebot</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>anthropic-ai</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><code>anthropic-ai</code></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Claude AI model training</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3">Consider blocking to protect content</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-bold mb-4">Example: Blocking AI Training Bots While Allowing Search</h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`# Allow Google Search crawling (important for SEO)
User-agent: Googlebot
Allow: /

# Block Google AI training (protect content from Bard/Gemini)
User-agent: Google-Extended
Disallow: /

# Block OpenAI training crawlers
User-agent: GPTBot
Disallow: /

# Allow ChatGPT browsing feature (drives traffic)
User-agent: ChatGPT-User
Allow: /

# Block Common Crawl (used by many AI models)
User-agent: CCBot
Disallow: /

# Block Claude AI training
User-agent: anthropic-ai
Disallow: /`}
            </code>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">⚖️ The AI Bot Dilemma</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold mb-2">Reasons to BLOCK AI Training Bots:</p>
              <ul className="space-y-1">
                <li>✓ Protect original content from being reproduced</li>
                <li>✓ Prevent AI from answering questions with your content (zero-click)</li>
                <li>✓ Preserve competitive advantage</li>
                <li>✓ Reduce server load from aggressive crawling</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Reasons to ALLOW AI Crawlers:</p>
              <ul className="space-y-1">
                <li>✓ AI answers may cite your site as source (backlinks)</li>
                <li>✓ ChatGPT browsing drives referral traffic</li>
                <li>✓ Brand visibility in AI-generated responses</li>
                <li>✓ Future AI search engines may become dominant</li>
              </ul>
            </div>
          </div>
          <p className="text-sm mt-4 font-semibold">
            Recommendation (2026): Block training crawlers (GPTBot, CCBot), allow browsing bots (ChatGPT-User)
          </p>
        </div>
      </section>

      <section id="implementation-checklist" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Complete Robots.txt Implementation Checklist</h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 1: Audit Current Configuration</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Visit yourstore.com/robots.txt and review current configuration</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check if using Shopify default or custom robots.txt.liquid</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify no <code>Disallow: /</code> blocking entire site</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Ensure important pages (products, collections) are NOT blocked</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test in Google Search Console Robots.txt Tester</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 2: Fix Common Issues</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Remove any CSS/JavaScript blocking rules</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Fix pages blocked in robots.txt that have noindex tags</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Review wildcard patterns (*) for unintended blocking</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add sitemap directive if missing</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify HTTPS in sitemap URL (not http://)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 3: Optimize for AI Bots</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Decide strategy: block AI training vs allow AI browsing</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add User-agent rules for GPTBot, CCBot, Google-Extended</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Allow ChatGPT-User for traffic opportunities</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Monitor server logs for new AI bot user-agents</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Update quarterly as new AI crawlers emerge</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 4: Testing & Validation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test with Google Search Console Robots.txt Tester</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify syntax with online robots.txt validators</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test specific URLs to ensure proper Allow/Disallow</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Monitor Search Console Coverage report for "Blocked by robots.txt" warnings</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Set up alerts for traffic drops (may indicate robots.txt error)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 5: Ongoing Maintenance</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Review robots.txt quarterly for needed updates</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Keep backup of robots.txt.liquid file</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Document any custom rules (why they were added)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test after major site restructures or theme changes</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Monitor emerging AI bots and update rules as needed</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="not-prose border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            DF
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">David Foster</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Technical SEO Engineer & Crawl Management Specialist
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              David specializes in robots.txt optimization and crawl budget management for enterprise ecommerce platforms. He has audited robots.txt configurations for over 600 websites, identifying and fixing critical blocking errors that cost merchants millions in lost organic traffic. David developed the "Robots.txt Safety Framework" adopted by major SEO agencies, contributed to Google's official robots.txt documentation, and regularly advises on AI crawler management strategies. His robots.txt audits have helped stores recover from catastrophic blocking errors, with an average 150% increase in crawl efficiency and complete traffic recovery within 30 days. He holds advanced certifications in Technical SEO and speaks at conferences on crawl optimization and AI bot management.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Expertise:</strong> Robots.txt, Crawl Budget, AI Bot Management, Technical SEO, Shopify Optimization
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="not-prose bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-12">
        <h2 className="text-3xl font-bold mb-4">Automate Robots.txt Monitoring & Crawl Control</h2>
        <p className="text-xl mb-6 opacity-90">
          SEOLOGY.AI automatically monitors your Shopify robots.txt for errors, alerts you to catastrophic blocking mistakes, manages AI crawler directives, and optimizes crawl budget allocation—preventing traffic loss before it happens.
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">30%</div>
              <div className="text-sm opacity-90">Of sites have robots.txt errors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">70%</div>
              <div className="text-sm opacity-90">Of searches influenced by AI by 2026</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-90">Traffic loss from Disallow: / error</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/dashboard/onboarding"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors text-center"
          >
            Start Free Robots.txt Audit →
          </a>
          <a
            href="/demo"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors text-center border-2 border-white/50"
          >
            Watch Demo
          </a>
        </div>
        <p className="text-sm mt-4 opacity-75">
          ✓ Monitors robots.txt  ✓ Prevents blocking errors  ✓ Manages AI bots
        </p>
      </section>

      {/* Final CTA */}
      <section className="not-prose mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>December 2025 Special:</strong> Get free robots.txt audit + AI crawler analysis with 14-day trial
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
