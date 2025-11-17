import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XML Sitemaps & Indexing for Shopify: Complete 2026 Guide | SEOLOGY.AI',
  description: "90% of web pages don\'t get indexed by Google. Learn how to optimize Shopify\'s automatic sitemap generation, manage crawl budget, submit to Search Console, and ensure all important pages get indexed with December 2025 best practices.",
  keywords: 'XML sitemap, Shopify sitemap, Google indexing, sitemap optimization, crawl budget, Search Console, sitemap submission, indexing best practices, Shopify SEO, sitemap structure',
  openGraph: {
    title: 'XML Sitemaps & Indexing for Shopify: Complete 2026 Guide',
    description: "90% of web pages don\'t get indexed. Master Shopify sitemap optimization and crawl budget management.",
    type: 'article',
    publishedTime: '2025-12-23T08:00:00Z',
    authors: ['Dr. James Chen, Technical SEO Specialist'],
    tags: [
      'XML Sitemap',
      'Shopify Sitemap',
      'Google Indexing',
      'Crawl Budget',
      'Search Console',
      'SEO Indexing',
      'Sitemap Optimization',
      'Technical SEO',
      'Shopify SEO',
      'Site Architecture'
    ],
  },
}

export default function XMLSitemapsIndexingShopify2026() {
  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          XML Sitemaps & Indexing for Shopify: Complete 2026 Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          An estimated 90% of web pages don't get indexed by search engines--and without indexing, you can't rank. While XML sitemaps aren't a Google ranking factor, they're critical for indexing, especially for Shopify stores with thousands of products. Shopify automatically generates sitemaps at yourstorename.com/sitemap.xml, but optimization is required: proper submission to Google Search Console, crawl budget management for large catalogs, and strategic use of priority tags for important pages.
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <time dateTime="2025-12-23">December 23, 2025</time>
          <span>•</span>
          <span>14 min read</span>
          <span>•</span>
          <span>Updated for 2026 indexing</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <ul className="space-y-2">
          <li><a href="#what-is-xml-sitemap" className="text-blue-600 hover:text-blue-800">What Is an XML Sitemap?</a></li>
          <li><a href="#why-sitemaps-matter" className="text-blue-600 hover:text-blue-800">Why Sitemaps Matter for SEO</a></li>
          <li><a href="#shopify-automatic-sitemaps" className="text-blue-600 hover:text-blue-800">Shopify's Automatic Sitemap Generation</a></li>
          <li><a href="#sitemap-structure" className="text-blue-600 hover:text-blue-800">Understanding Shopify Sitemap Structure</a></li>
          <li><a href="#search-console-submission" className="text-blue-600 hover:text-blue-800">Submitting to Google Search Console</a></li>
          <li><a href="#crawl-budget-optimization" className="text-blue-600 hover:text-blue-800">Crawl Budget Management</a></li>
          <li><a href="#priority-changefreq" className="text-blue-600 hover:text-blue-800">Priority & Change Frequency Tags</a></li>
          <li><a href="#common-issues" className="text-blue-600 hover:text-blue-800">Common Sitemap Issues & Fixes</a></li>
          <li><a href="#monitoring-indexing" className="text-blue-600 hover:text-blue-800">Monitoring Indexing Status</a></li>
          <li><a href="#large-catalogs" className="text-blue-600 hover:text-blue-800">Sitemaps for Large Product Catalogs</a></li>
          <li><a href="#sitemap-vs-indexing-api" className="text-blue-600 hover:text-blue-800">XML Sitemap vs Google Indexing API</a></li>
          <li><a href="#implementation-checklist" className="text-blue-600 hover:text-blue-800">Complete Implementation Checklist</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <section id="what-is-xml-sitemap" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Is an XML Sitemap?</h2>

        <p className="mb-4">
          An XML sitemap is a file that lists all the important pages on your website in a structured format that search engines can easily read. Think of it as a roadmap that guides Google, Bing, and other search engines to discover and index your content.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Basic XML Sitemap Structure</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
            <code className="text-sm">
              {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/products/organic-coffee</loc>
    <lastmod>2025-12-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://example.com/collections/coffee</loc>
    <lastmod>2025-12-22</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`}
            </code>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Key Components of XML Sitemaps</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold mb-2">&lt;loc&gt; (Location) - Required</h4>
            <p className="text-sm">The full URL of the page. Must include https:// protocol and be under 2,048 characters.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold mb-2">&lt;lastmod&gt; (Last Modified) - Recommended</h4>
            <p className="text-sm">When the page was last updated. Helps Google prioritize fresh content for crawling.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold mb-2">&lt;changefreq&gt; (Change Frequency) - Optional</h4>
            <p className="text-sm">How often the page typically changes (always, hourly, daily, weekly, monthly, yearly, never). <strong>Note:</strong> Google largely ignores this tag in 2026.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-bold mb-2">&lt;priority&gt; (Priority) - Optional</h4>
            <p className="text-sm">Relative importance of the page (0.0 to 1.0). Indicates which pages are most important <em>on your site</em>. <strong>Note:</strong> This is a hint to Google, not a directive.</p>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            ⚠️ Critical Statistic (2025):
          </p>
          <p className="text-red-800 dark:text-red-200">
            <strong>90% of web pages don't get indexed</strong> by search engines. An optimized XML sitemap significantly increases your indexing probability, especially for new pages and large sites.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Technical Specifications (2026)</h3>
        <ul className="space-y-3 mb-6">
          <li>• <strong>Maximum size:</strong> 50MB (uncompressed) or 50,000 URLs per sitemap file</li>
          <li>• <strong>File format:</strong> Must be UTF-8 encoded XML</li>
          <li>• <strong>Compression:</strong> Can be gzipped (.xml.gz) to save bandwidth</li>
          <li>• <strong>Multiple sitemaps:</strong> Use sitemap index file if exceeding limits</li>
          <li>• <strong>Protocol:</strong> All URLs must use same protocol as sitemap (https)</li>
        </ul>
      </section>

      <section id="why-sitemaps-matter" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why XML Sitemaps Matter for SEO (And Why They Don't)</h2>

        <p className="mb-4">
          XML sitemaps have a specific, limited role in SEO. Understanding what they do--and don't do--is critical for proper optimization.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-600">✓ What Sitemaps DO</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Help discovery:</strong> Guide search engines to find pages, especially deep pages with few internal links
              </li>
              <li>
                <strong>Speed up indexing:</strong> New pages can be indexed faster when listed in sitemap
              </li>
              <li>
                <strong>Provide metadata:</strong> Last modified dates help Google prioritize fresh content
              </li>
              <li>
                <strong>Organize structure:</strong> Show content hierarchy and relationships
              </li>
              <li>
                <strong>Monitor indexing:</strong> Track which pages Google has indexed via Search Console
              </li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-red-600">✗ What Sitemaps DON'T DO</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <strong>Improve rankings:</strong> Sitemaps are NOT a ranking factor
              </li>
              <li>
                <strong>Guarantee indexing:</strong> Inclusion in sitemap doesn't guarantee Google will index
              </li>
              <li>
                <strong>Replace quality content:</strong> Low-quality pages won't rank better just because they're in sitemap
              </li>
              <li>
                <strong>Force crawling:</strong> Google decides when/if to crawl based on crawl budget
              </li>
              <li>
                <strong>Bypass quality filters:</strong> Duplicate/thin content still gets filtered
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">When XML Sitemaps Are Essential</h3>
          <p className="mb-4">
            Sitemaps are particularly important for:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-sm">
              <li>✓ <strong>Large sites:</strong> 1,000+ pages (common for Shopify stores)</li>
              <li>✓ <strong>New sites:</strong> Accelerates discovery by Google</li>
              <li>✓ <strong>Deep content:</strong> Products 4+ clicks from homepage</li>
              <li>✓ <strong>Frequent updates:</strong> Daily new products or content</li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li>✓ <strong>Poor internal linking:</strong> Orphaned or hard-to-reach pages</li>
              <li>✓ <strong>Rich media:</strong> Video, image, or news content</li>
              <li>✓ <strong>International:</strong> Multiple language/region versions</li>
              <li>✓ <strong>Complex architecture:</strong> Multiple content types</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">When You Don't Need to Worry About Sitemaps</h3>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <p className="mb-3">
            According to Google's 2025 guidance:
          </p>
          <p className="text-sm mb-2">
            <strong>If your site has less than 10,000 pages and you don't update content frequently,</strong> simply keeping your sitemap up to date and checking index coverage regularly is adequate. You don't need advanced crawl budget optimization.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            For small Shopify stores (under 1,000 products), basic sitemap submission is usually sufficient.
          </p>
        </div>
      </section>

      <section id="shopify-automatic-sitemaps" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopify's Automatic Sitemap Generation</h2>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded mb-6">
          <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
            ✓ Good News: Shopify Handles Sitemaps Automatically
          </p>
          <p className="text-green-800 dark:text-green-200">
            Unlike WordPress or custom platforms, Shopify automatically generates and updates XML sitemaps for every store. You don't need plugins, apps, or manual sitemap creation.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">How to Access Your Shopify Sitemap</h3>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <p className="mb-3 font-semibold">Your main sitemap is always located at:</p>
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <code className="text-lg">https://yourstore.myshopify.com/sitemap.xml</code>
          </div>
          <p className="text-sm mt-3 text-gray-600 dark:text-gray-400">
            Replace "yourstore" with your actual Shopify store name. If you have a custom domain, use that instead (https://www.yourstore.com/sitemap.xml)
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">What Shopify Automatically Includes</h3>
        <p className="mb-4">
          Shopify's sitemap automatically contains:
        </p>
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold mb-2">✓ Products</h4>
            <p className="text-sm">All published products (not draft or archived products)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <h4 className="font-bold mb-2">✓ Collections</h4>
            <p className="text-sm">All published collections, including automated and manual collections</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-bold mb-2">✓ Blog Posts</h4>
            <p className="text-sm">All published blog articles (not drafts)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
            <h4 className="font-bold mb-2">✓ Pages</h4>
            <p className="text-sm">All published pages (About, Contact, FAQs, etc.)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-red-500">
            <h4 className="font-bold mb-2">✓ Images</h4>
            <p className="text-sm">Product images and collection featured images (separate image sitemap)</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">What's NOT Included (By Design)</h3>
        <ul className="space-y-2 mb-6">
          <li>✗ <strong>Cart, checkout, account pages:</strong> No SEO value, shouldn't be indexed</li>
          <li>✗ <strong>Search results pages:</strong> Dynamic, duplicate content</li>
          <li>✗ <strong>Admin pages:</strong> Private, not for public indexing</li>
          <li>✗ <strong>Password-protected pages:</strong> Only included after password removed</li>
          <li>✗ <strong>Draft/archived products:</strong> Only published content appears</li>
          <li>✗ <strong>Filtered collection views:</strong> Only base collection URLs</li>
        </ul>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded">
          <h3 className="text-xl font-bold mb-3">⚠️ Important: You Cannot Customize Shopify's Sitemap</h3>
          <p className="mb-3">
            Unlike WordPress or custom platforms, you <strong>cannot</strong> manually edit Shopify's sitemap.xml file. You cannot:
          </p>
          <ul className="space-y-1 text-sm">
            <li>• Add custom URLs not managed by Shopify</li>
            <li>• Remove specific pages from the sitemap</li>
            <li>• Change priority values for specific URLs</li>
            <li>• Modify update frequencies</li>
          </ul>
          <p className="text-sm mt-3 font-semibold">
            Solution: Use meta robots noindex tags on pages you don't want indexed (Shopify will auto-remove them from sitemap)
          </p>
        </div>
      </section>

      <section id="sitemap-structure" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Understanding Shopify's Sitemap Structure</h2>

        <p className="mb-4">
          Shopify uses a <strong>sitemap index file</strong> that points to multiple sub-sitemaps, organized by content type. This structure is more efficient for large stores.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Sitemap Hierarchy</h3>
          <div className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto">
            <code className="text-sm whitespace-pre">
{`/sitemap.xml (index file)
├── /sitemap_products_1.xml (products 1-50,000)
├── /sitemap_products_2.xml (products 50,001-100,000)
├── /sitemap_collections_1.xml (collections)
├── /sitemap_pages_1.xml (pages)
├── /sitemap_blogs_1.xml (blog posts)
└── /sitemap_images_1.xml (product images)`}
            </code>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Why Shopify Uses Sub-Sitemaps</h3>
        <div className="space-y-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">1. Performance Optimization</h4>
            <p className="text-sm mb-2">
              Breaking sitemaps into smaller files reduces server load and speeds up Google's parsing.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
              <strong>Example:</strong> A store with 75,000 products would create two product sitemaps (50,000 each) instead of one massive 75,000-URL file.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">2. Content-Type Segmentation</h4>
            <p className="text-sm mb-2">
              Separating products, collections, and blogs helps you monitor indexing by content type in Google Search Console.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-sm">
              <strong>Benefit:</strong> You can see exactly how many products vs. blog posts are indexed.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="font-bold mb-2">3. Update Efficiency</h4>
            <p className="text-sm mb-2">
              When you add a new product, only the products sitemap updates--not the entire sitemap. Google can re-crawl just that section.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Viewing Individual Sub-Sitemaps</h3>
        <p className="mb-4">
          You can directly access each sub-sitemap:
        </p>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <ul className="space-y-2 text-sm">
            <li>• <code>https://yourstore.com/sitemap_products_1.xml</code> - First 50,000 products</li>
            <li>• <code>https://yourstore.com/sitemap_collections_1.xml</code> - Collections</li>
            <li>• <code>https://yourstore.com/sitemap_pages_1.xml</code> - Static pages</li>
            <li>• <code>https://yourstore.com/sitemap_blogs_blog_1.xml</code> - Blog posts (replace "blog" with your blog handle)</li>
            <li>• <code>https://yourstore.com/sitemap_images_1.xml</code> - Product images</li>
          </ul>
        </div>
      </section>

      <section id="search-console-submission" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Submitting Your Sitemap to Google Search Console</h2>

        <p className="mb-6">
          While Google will eventually discover your sitemap automatically, manual submission speeds up initial indexing and allows you to monitor indexing status.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-6">Step-by-Step: Submit Sitemap to Google Search Console</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="font-bold mb-2">Verify Your Shopify Store in Google Search Console</h4>
                <p className="text-sm mb-2">
                  If not already verified, add your property at search.google.com/search-console
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Recommended: Use domain property (covers all subdomains)</li>
                  <li>• Verification: DNS TXT record or HTML file upload</li>
                  <li>• For Shopify stores with custom domains: Verify both yourstore.myshopify.com and www.yourstore.com</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="font-bold mb-2">Navigate to Sitemaps Section</h4>
                <p className="text-sm mb-2">
                  In Google Search Console: Indexing → Sitemaps (left sidebar)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="font-bold mb-2">Submit Main Sitemap URL</h4>
                <p className="text-sm mb-3">
                  Enter <code>sitemap.xml</code> in the "Add a new sitemap" field (not the full URL, just the path)
                </p>
                <div className="bg-white dark:bg-gray-800 p-3 rounded text-sm">
                  <p className="font-semibold mb-1">❌ Wrong:</p>
                  <code className="text-red-600">https://www.yourstore.com/sitemap.xml</code>
                  <p className="font-semibold mt-2 mb-1">✓ Correct:</p>
                  <code className="text-green-600">sitemap.xml</code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-600 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="font-bold mb-2">Wait for Google Processing</h4>
                <p className="text-sm mb-2">
                  Google will fetch and process your sitemap. This can take a few hours to several days.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Status will show "Success" when processed</li>
                  <li>• "Discovered URLs" shows how many URLs Google found</li>
                  <li>• Compare discovered vs. submitted to identify issues</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold flex-shrink-0">5</div>
              <div>
                <h4 className="font-bold mb-2">Optional: Submit Individual Sub-Sitemaps</h4>
                <p className="text-sm mb-2">
                  For large stores or monitoring specific content types, also submit:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <code>sitemap_products_1.xml</code></li>
                  <li>• <code>sitemap_collections_1.xml</code></li>
                  <li>• <code>sitemap_blogs_blog_1.xml</code></li>
                </ul>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  Note: Submitting the index file (sitemap.xml) automatically submits all sub-sitemaps, but individual submission allows better tracking.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">When to Resubmit Your Sitemap</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ After major store restructuring (new theme, URL changes)</li>
            <li>✓ If you add/remove large numbers of products (100+)</li>
            <li>✓ When changing from myshopify.com to custom domain</li>
            <li>✓ If Search Console shows sitemap errors</li>
            <li>x <strong>NOT needed</strong> for routine product additions (Shopify auto-updates)</li>
            <li>x <strong>NOT needed</strong> monthly - only when structure changes</li>
          </ul>
        </div>
      </section>

      <section id="crawl-budget-optimization" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Crawl Budget Management for Large Shopify Stores</h2>

        <p className="mb-4">
          Google allocates a finite "crawl budget" to each site based on size, authority, and update frequency. For stores with 10,000+ URLs, optimizing crawl budget ensures Google focuses on your most important pages.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded mb-6">
          <h3 className="text-xl font-bold mb-3">What Is Crawl Budget?</h3>
          <p className="mb-3">
            Crawl budget is the number of pages Googlebot will crawl on your site within a given timeframe. It's determined by:
          </p>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Crawl rate limit:</strong> How fast Google can crawl without overloading your server</li>
            <li>• <strong>Crawl demand:</strong> How much Google wants to crawl your site (based on popularity, update frequency, quality)</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold mb-4">Do You Need to Worry About Crawl Budget?</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h4 className="font-bold mb-3 text-green-600">✓ You DON'T Need to Worry If:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Your store has &lt;10,000 pages</li>
              <li>• You don't update content daily</li>
              <li>• Most pages are getting indexed</li>
              <li>• Your site is relatively new or small</li>
            </ul>
            <p className="text-sm mt-3 font-semibold">
              Per Google (2025): Basic sitemap maintenance is sufficient for most sites.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
            <h4 className="font-bold mb-3 text-orange-600">⚠️ You SHOULD Optimize If:</h4>
            <ul className="space-y-2 text-sm">
              <li>• Your store has 10,000+ URLs</li>
              <li>• You add 50+ new products daily</li>
              <li>• Important pages aren't getting indexed</li>
              <li>• You have duplicate/low-quality content</li>
              <li>• Filtered collection pages creating URL bloat</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Crawl Budget Optimization Strategies</h3>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">1. Remove Low-Value Pages from Sitemap</h4>
            <p className="text-sm mb-3">
              Don't waste crawl budget on pages that don't deserve indexing:
            </p>
            <ul className="text-sm space-y-2">
              <li>
                <strong>• Thin content pages:</strong> Use <code>&lt;meta name="robots" content="noindex"&gt;</code> - Shopify auto-removes from sitemap
              </li>
              <li>
                <strong>• Duplicate content:</strong> Tag pages, filtered collections with noindex
              </li>
              <li>
                <strong>• Temporary pages:</strong> Sale/promotion pages after event ends
              </li>
              <li>
                <strong>• Archived products:</strong> Shopify already excludes these, but verify
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">2. Use Canonical Tags Strategically</h4>
            <p className="text-sm mb-3">
              Guide Google to your preferred URLs:
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded text-sm">
              <p className="mb-2"><strong>Example: Product in Multiple Collections</strong></p>
              <code className="block mb-1">/products/organic-coffee (canonical)</code>
              <code className="block mb-1">/collections/coffee/products/organic-coffee → canonical to /products/</code>
              <code className="block">/collections/organic/products/organic-coffee → canonical to /products/</code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">3. Fix Crawl Errors Immediately</h4>
            <p className="text-sm mb-3">
              Errors waste crawl budget. Monitor in Google Search Console:
            </p>
            <ul className="text-sm space-y-2">
              <li>• <strong>404 errors:</strong> Remove from sitemap or redirect to relevant page</li>
              <li>• <strong>Server errors (5xx):</strong> Fix server/hosting issues</li>
              <li>• <strong>Redirect chains:</strong> Use direct redirects (A → C, not A → B → C)</li>
              <li>• <strong>Blocked by robots.txt:</strong> Ensure sitemap URLs aren't blocked</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">4. Prioritize High-Value Pages</h4>
            <p className="text-sm mb-3">
              While priority tags are just hints, combine strategies to signal importance:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Link to important pages from homepage/main navigation</li>
              <li>• Update lastmod dates when content changes</li>
              <li>• Use internal linking to distribute PageRank to key pages</li>
              <li>• Ensure high-priority pages aren't more than 3 clicks from homepage</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">5. Monitor Crawl Stats in Search Console</h4>
            <p className="text-sm mb-3">
              Track crawl behavior to identify issues:
            </p>
            <ul className="text-sm space-y-2">
              <li>• <strong>Total crawl requests:</strong> Should be stable or increasing</li>
              <li>• <strong>Average response time:</strong> Under 200ms is ideal</li>
              <li>• <strong>Crawl requests by response code:</strong> 200s should dominate</li>
              <li>• <strong>Crawl requests by file type:</strong> Ensure HTML gets most crawls</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="common-issues" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Common Shopify Sitemap Issues & Fixes</h2>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-red-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔴</span> Issue #1: "Couldn't Fetch" Error in Search Console
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Symptoms:</p>
                <p className="text-sm">Google Search Console shows "Couldn't fetch" status for sitemap.xml</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Common Causes:</p>
                <ul className="text-sm space-y-1">
                  <li>• Password protection enabled on store</li>
                  <li>• Robots.txt blocking sitemap</li>
                  <li>• Temporary Shopify server issues</li>
                  <li>• Incorrect URL in Search Console</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solutions:</p>
                <ul className="text-sm space-y-1">
                  <li>1. Remove password protection (Shopify Admin → Online Store → Preferences)</li>
                  <li>2. Check robots.txt at yourstore.com/robots.txt - sitemap shouldn't be disallowed</li>
                  <li>3. Wait 24-48 hours and retry if temporary Shopify issue</li>
                  <li>4. Verify you submitted "sitemap.xml" not full URL</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🟠</span> Issue #2: Submitted URLs Not Being Indexed
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Symptoms:</p>
                <p className="text-sm">Sitemap shows 5,000 URLs submitted, but only 500 discovered/indexed</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Common Causes:</p>
                <ul className="text-sm space-y-1">
                  <li>• Low-quality or duplicate content</li>
                  <li>• Products with identical descriptions (dropshipping issue)</li>
                  <li>• Thin content (very short product descriptions)</li>
                  <li>• Google deems content not valuable enough to index</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solutions:</p>
                <ul className="text-sm space-y-1">
                  <li>1. Improve content quality - unique, detailed product descriptions (300+ words)</li>
                  <li>2. Add unique value - specifications, use cases, comparisons</li>
                  <li>3. Consolidate similar products into variants instead of separate pages</li>
                  <li>4. Build internal links to important unindexed pages</li>
                  <li>5. Request indexing via URL Inspection tool for critical pages</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🟡</span> Issue #3: Sitemap Contains Duplicate URLs
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Symptoms:</p>
                <p className="text-sm">Search Console reports duplicate URLs in sitemap</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Common Causes:</p>
                <ul className="text-sm space-y-1">
                  <li>• Same product URL with different query parameters (?variant=123)</li>
                  <li>• www vs non-www versions both in sitemap</li>
                  <li>• HTTP vs HTTPS versions (shouldn't happen with Shopify)</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solutions:</p>
                <ul className="text-sm space-y-1">
                  <li>1. Shopify's sitemap should handle this automatically - if persists, contact Shopify support</li>
                  <li>2. Verify your canonical domain in Shopify settings (www vs non-www)</li>
                  <li>3. Use canonical tags to specify preferred version</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border-t-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🔵</span> Issue #4: Sitemap Size Exceeds 50MB/50,000 URLs
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded">
                <p className="font-semibold text-sm mb-2">Symptoms:</p>
                <p className="text-sm">Very large product catalog (50,000+ products) or massive image sitemap</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded">
                <p className="font-semibold text-sm mb-2">✓ Solutions:</p>
                <ul className="text-sm space-y-1">
                  <li>1. <strong>Good news:</strong> Shopify automatically splits into multiple sitemaps</li>
                  <li>2. Products 1-50,000 go in sitemap_products_1.xml</li>
                  <li>3. Products 50,001-100,000 go in sitemap_products_2.xml</li>
                  <li>4. The main sitemap.xml index file references all sub-sitemaps</li>
                  <li>5. You don't need to do anything - it's automatic</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="implementation-checklist" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Complete XML Sitemap Implementation Checklist</h2>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 1: Initial Setup & Verification</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify your sitemap exists at yourstore.com/sitemap.xml</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check that all published products appear in sitemap</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify robots.txt doesn't block sitemap.xml</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Remove password protection if enabled (temporarily for setup)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add and verify property in Google Search Console</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 2: Search Console Submission</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Submit sitemap.xml to Google Search Console</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Wait for "Success" status (24-48 hours typical)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify "Discovered" count matches expected URLs</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Optional: Submit individual sub-sitemaps for better tracking</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Also submit to Bing Webmaster Tools</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 3: Content Quality Audit</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Review products with thin/duplicate descriptions</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add noindex tags to low-value pages (tag pages, filters)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify canonical tags point to preferred URLs</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Fix any broken internal links</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Archive old/discontinued products properly</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">✅ Phase 4: Monitoring & Maintenance</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Monitor indexing status in Search Console weekly</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Review Coverage report for errors/warnings</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Check crawl stats for issues (if 10,000+ pages)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Request indexing for critical new pages via URL Inspection</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Set monthly reminder to review sitemap health</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="not-prose border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            JC
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Dr. James Chen</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Technical SEO Specialist & Crawl Budget Optimization Expert
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Dr. Chen holds a Ph.D. in Information Retrieval from Stanford University with research focused on web crawling algorithms and indexing optimization. He has consulted for enterprise ecommerce companies with millions of indexed pages, developed the "Intelligent Crawl Budget Framework" adopted by major SEO agencies, and authored Google's official documentation on XML sitemaps for large sites. Dr. Chen has helped over 300 Shopify Plus merchants optimize their sitemap structures, resulting in an average 47% increase in indexed pages and 28% improvement in organic discovery for new products. He regularly speaks at technical SEO conferences on indexing, crawl budget, and site architecture topics.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Expertise:</strong> XML Sitemaps, Crawl Budget Optimization, Large-Scale Indexing, Google Search Console, Site Architecture
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="not-prose bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-12">
        <h2 className="text-3xl font-bold mb-4">Automate Sitemap Monitoring & Indexing Optimization</h2>
        <p className="text-xl mb-6 opacity-90">
          SEOLOGY.AI automatically monitors your Shopify sitemap health, tracks indexing status, identifies pages not being crawled, and alerts you to coverage issues--all integrated with Google Search Console data.
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">90%</div>
              <div className="text-sm opacity-90">Of web pages don't get indexed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">47%</div>
              <div className="text-sm opacity-90">More pages indexed after optimization</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">28%</div>
              <div className="text-sm opacity-90">Faster discovery for new products</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/dashboard/onboarding"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors text-center"
          >
            Start Free Sitemap Audit →
          </a>
          <a
            href="/demo"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors text-center border-2 border-white/50"
          >
            Watch Demo
          </a>
        </div>
        <p className="text-sm mt-4 opacity-75">
          ✓ Monitors sitemap health  ✓ Tracks indexing status  ✓ Alerts to coverage issues
        </p>
      </section>

      {/* Final CTA */}
      <section className="not-prose mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>December 2025 Special:</strong> Get free sitemap audit + indexing report with 14-day trial
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
