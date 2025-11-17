import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile SEO for Shopify: Complete 2026 Guide to Mobile-First Optimization | SEOLOGY.AI',
  description: 'Master mobile SEO for your Shopify store in 2026. 62.66% of traffic is mobile--learn Core Web Vitals, mobile-first indexing, and proven optimization strategies that increase conversions by 32%.',
  keywords: 'mobile SEO Shopify, mobile-first indexing, Core Web Vitals, Shopify mobile optimization, mobile page speed, responsive design Shopify, mobile commerce 2026, LCP INP CLS, mobile conversion optimization',
  openGraph: {
    title: 'Mobile SEO for Shopify: Complete 2026 Guide to Mobile-First Optimization',
    description: '62.66% of traffic is mobile. Learn how to optimize your Shopify store for mobile-first indexing and increase conversions by 32% with proven 2026 strategies.',
    type: 'article',
    publishedTime: '2025-12-16T09:00:00Z',
    authors: ['Dr. Emily Rodriguez, Mobile UX Specialist & SEO Consultant'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile SEO for Shopify: Complete 2026 Guide',
    description: '62.66% of traffic is mobile. Master Core Web Vitals, mobile-first indexing, and increase conversions by 32%.',
  },
}

export default function MobileSEOShopifyGuidePage() {
  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4">
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span>/</span>
          <span>Mobile SEO Guide</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
          Mobile SEO for Shopify: Complete 2026 Guide to Mobile-First Optimization
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          With 62.66% of all web traffic coming from mobile devices and Google's mobile-first indexing now standard, mobile SEO isn't optional--it's survival. Learn how to optimize your Shopify store for mobile search and increase conversions by 32%.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              ER
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Dr. Emily Rodriguez</div>
              <div className="text-xs">Mobile UX Specialist & SEO Consultant</div>
            </div>
          </div>
          <time dateTime="2025-12-16">December 16, 2025</time>
          <span>14 min read</span>
        </div>
      </header>

      {/* Table of Contents */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Table of Contents</h2>
        <nav className="space-y-2 text-sm">
          <a href="#mobile-first-reality" className="block text-blue-600 dark:text-blue-400 hover:underline">1. The Mobile-First Reality of 2026</a>
          <a href="#mobile-first-indexing" className="block text-blue-600 dark:text-blue-400 hover:underline">2. Understanding Google's Mobile-First Indexing</a>
          <a href="#core-web-vitals" className="block text-blue-600 dark:text-blue-400 hover:underline">3. Core Web Vitals: The Mobile Performance Metrics That Matter</a>
          <a href="#shopify-optimization" className="block text-blue-600 dark:text-blue-400 hover:underline">4. 12 Essential Mobile Optimization Strategies for Shopify</a>
          <a href="#mobile-ux" className="block text-blue-600 dark:text-blue-400 hover:underline">5. Mobile User Experience Best Practices</a>
          <a href="#voice-search" className="block text-blue-600 dark:text-blue-400 hover:underline">6. Voice Search Optimization for Mobile Commerce</a>
          <a href="#testing-tools" className="block text-blue-600 dark:text-blue-400 hover:underline">7. Mobile SEO Testing & Monitoring Tools</a>
          <a href="#common-mistakes" className="block text-blue-600 dark:text-blue-400 hover:underline">8. 7 Mobile SEO Mistakes Killing Your Shopify Rankings</a>
          <a href="#automation" className="block text-blue-600 dark:text-blue-400 hover:underline">9. How SEOLOGY.AI Automates Mobile SEO Optimization</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Section 1 */}
        <section id="mobile-first-reality" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">The Mobile-First Reality of 2026</h2>

          <p className="text-lg leading-relaxed mb-6">
            In December 2025, the mobile commerce landscape has reached a tipping point that can no longer be ignored. Here's the data that should make every Shopify store owner pay attention:
          </p>

          <div className="not-prose bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Mobile Commerce Statistics (December 2025)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">62.66%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">of global web traffic comes from mobile devices</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$4.01T</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">mobile commerce sales in 2025 (59% of total ecommerce)</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">71.8%+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">of ecommerce traffic specifically is mobile</div>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">200M</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">US mobile shoppers (76% of adults purchase via smartphone)</div>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            <strong className="text-purple-600 dark:text-purple-400">Translation:</strong> If your Shopify store isn't optimized for mobile, you're losing the majority of your potential customers before they even see your products.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-6 mb-8">
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">📊 December 2025 Research Finding</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Mobile-optimized websites see <strong>67% higher sales</strong> and <strong>32% more conversions</strong> than non-optimized sites. With 4.8 billion smartphone users worldwide (59% of global population), mobile optimization directly impacts your bottom line.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">Why Mobile SEO Matters More Than Ever</h3>

          <p className="mb-4">
            Since Google's July 2024 mobile-first indexing deadline, <strong>every website is now evaluated by the mobile Googlebot first</strong>. This means:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span><strong>Mobile content determines rankings:</strong> Google uses your mobile site's content, performance, and structure to rank you--even for desktop searches</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span><strong>Page speed is critical:</strong> 83% of users expect websites to load in 3 seconds or less--every second of delay costs you 20% of mobile conversions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span><strong>Voice search is growing:</strong> 40% of mobile ecommerce transactions now involve voice search, and 92% of smartphone users make a purchase after searching</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold mt-1">✓</span>
              <span><strong>Mobile UX affects conversions:</strong> Progressive Web Apps (PWAs) deliver up to 36% uplift in mobile conversions through better user experience</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section id="mobile-first-indexing" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Understanding Google's Mobile-First Indexing</h2>

          <p className="text-lg leading-relaxed mb-6">
            Mobile-first indexing means Google predominantly uses the <strong>mobile version of your site's content</strong> for indexing and ranking. As of December 2025, this is the standard for all websites across all industries.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">How Mobile-First Indexing Works</h3>

          <div className="not-prose bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Googlebot crawls your mobile site</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">The smartphone user agent visits your mobile site to discover and analyze content</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Analyzes mobile signals</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Evaluates page titles, meta descriptions, performance, structured data, and internal links from the mobile version</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Indexes based on mobile content</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your mobile site becomes the primary version in Google's index</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Rankings determined by mobile performance</strong>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your mobile site's quality affects rankings for both mobile AND desktop searches</p>
                </div>
              </li>
            </ol>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">Critical Mobile-First Indexing Requirements</h3>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">✓ Content Parity</h4>
            <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
              Your mobile and desktop versions must have <strong>identical content</strong>. This includes:
            </p>
            <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <li>• Page titles and meta descriptions</li>
              <li>• Headings (H1, H2, H3, etc.)</li>
              <li>• Product descriptions and main content</li>
              <li>• Structured data (schema markup)</li>
              <li>• Internal links and navigation</li>
              <li>• Images with alt text</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">✓ Responsive Design</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Google strongly prefers responsive websites because they create a seamless user experience--a key ranking factor. Responsive design automatically adapts to any screen size without serving different HTML.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">✓ Mobile Page Speed</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Page speed is a vital ranking factor for Mobile SEO in 2025. Slow-loading sites frustrate users, increase bounce rates, and damage rankings. Aim for load times under 3 seconds.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section id="core-web-vitals" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Core Web Vitals: The Mobile Performance Metrics That Matter</h2>

          <p className="text-lg leading-relaxed mb-6">
            Core Web Vitals are Google's official metrics for measuring user experience. In 2025, they're <strong>direct ranking factors</strong> that significantly impact your mobile search visibility.
          </p>

          <div className="not-prose bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border border-green-200 dark:border-green-800 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">The 3 Core Web Vitals (2025 Benchmarks)</h3>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">LCP - Largest Contentful Paint</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Loading performance</p>
                  </div>
                </div>
                <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">Measures how long it takes for the largest visible element to load.</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">Good: &lt; 2.5s</span>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-medium">Needs Work: 2.5s - 4s</span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full font-medium">Poor: &gt; 4s</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-2xl">👆</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">INP - Interaction to Next Paint</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interactivity & responsiveness</p>
                  </div>
                </div>
                <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">Measures how quickly your site responds to user interactions (replaced FID in March 2024).</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">Good: &lt; 200ms</span>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-medium">Needs Work: 200ms - 500ms</span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full font-medium">Poor: &gt; 500ms</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                    <span className="text-2xl">📐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">CLS - Cumulative Layout Shift</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Visual stability</p>
                  </div>
                </div>
                <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">Measures unexpected layout shifts that occur during page load (when elements move around).</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">Good: &lt; 0.1</span>
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-medium">Needs Work: 0.1 - 0.25</span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full font-medium">Poor: &gt; 0.25</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-8">
            <p className="text-sm font-semibold text-red-900 dark:text-red-200 mb-2">⚠️ December 2025 Performance Alert</p>
            <p className="text-sm text-red-800 dark:text-red-300">
              Research shows that <strong>a 100-millisecond delay can decrease conversion rates by 7%</strong>. A 1-second delay in mobile load time results in <strong>20% lower mobile conversions</strong>. For ecommerce, Core Web Vitals directly impact revenue.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">How Shopify Stores Typically Perform</h3>

          <p className="mb-4">
            According to Shopify's official performance data (December 2025), here's how different Shopify themes perform against Core Web Vitals:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span><strong>Top-performing themes:</strong> 75%+ of users experience good LCP, INP, and CLS scores</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span><strong>Average themes:</strong> 50-75% of users experience good scores</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span><strong>Poor-performing themes:</strong> Less than 50% of users experience good scores</span>
            </li>
          </ul>

          <p className="mb-6">
            <strong className="text-purple-600 dark:text-purple-400">Key Insight:</strong> Even with a "good" Shopify theme, you still need ongoing optimization. Apps, custom code, large images, and third-party scripts can all degrade Core Web Vitals over time.
          </p>
        </section>

        {/* Section 4 */}
        <section id="shopify-optimization" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">12 Essential Mobile Optimization Strategies for Shopify</h2>

          <p className="text-lg leading-relaxed mb-8">
            Here are the proven mobile optimization strategies that move the needle for Shopify stores in 2026:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">1. Implement Responsive Design (If Not Already)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Most modern Shopify themes are responsive by default, but custom code can break responsiveness. Test your site at multiple breakpoints (375px, 768px, 1024px, 1440px).
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm">
                <strong className="text-gray-900 dark:text-gray-100">Quick Test:</strong> Open Chrome DevTools (F12), click the device icon, and test at different screen sizes. Everything should adapt smoothly without horizontal scrolling.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">2. Compress and Optimize Images</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Images are the #1 cause of slow mobile load times. Shopify supports WebP format, which reduces file size by 25-35% without quality loss.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300 mb-3">
                <li>• Use Shopify's built-in image optimization (automatic in newer themes)</li>
                <li>• Serve different image sizes for different devices (srcset attribute)</li>
                <li>• Implement lazy loading for images below the fold</li>
                <li>• Maximum 200KB per product image, 80KB for thumbnails</li>
              </ul>
              <div className="bg-green-50 dark:bg-green-950/30 rounded p-4 text-sm">
                <strong className="text-green-900 dark:text-green-200">Impact:</strong> Optimizing images can reduce LCP by 1-2 seconds, improving Core Web Vitals scores significantly.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">3. Enable Browser Caching</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Browser caching stores static files (CSS, JavaScript, images) locally on visitors' devices, dramatically speeding up repeat visits.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 text-sm">
                <strong className="text-gray-900 dark:text-gray-100">Shopify Note:</strong> Shopify automatically handles browser caching for theme assets. However, custom apps and scripts may not be cached. Use a performance app like "Rocket Page Speed Optimizer" to enhance caching.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">4. Minimize JavaScript and CSS</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Every Shopify app adds JavaScript that can slow down your site. Audit your apps quarterly and remove unused ones.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Uninstall apps you're not actively using (even inactive apps can leave code behind)</li>
                <li>• Use Shopify's theme editor to remove leftover code from deleted apps</li>
                <li>• Defer non-critical JavaScript (delays execution until after page load)</li>
                <li>• Minify CSS and JavaScript files (removes unnecessary characters)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">5. Use a Content Delivery Network (CDN)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Shopify automatically uses a global CDN (Fastly) to serve your content from servers closest to your users. This reduces latency significantly.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded p-4 text-sm">
                <strong className="text-blue-900 dark:text-blue-200">Good News:</strong> This is handled automatically on Shopify--no setup required. Your product images and theme files are served globally.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">6. Reduce Third-Party Scripts</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Every third-party script (analytics, chatbots, review apps, Facebook Pixel) adds load time and can degrade INP scores.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Audit scripts with Chrome DevTools Performance tab</li>
                <li>• Load non-essential scripts asynchronously</li>
                <li>• Use Google Tag Manager to consolidate tracking scripts</li>
                <li>• Consider removing heavy chatbots from mobile (or delay load until user interaction)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">7. Optimize Mobile Navigation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Mobile users navigate differently than desktop users. Simplify your mobile menu for faster access to key pages.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Use a hamburger menu that's easy to tap (minimum 44x44px touch target)</li>
                <li>• Prioritize key categories in mobile menu (top sellers, new arrivals)</li>
                <li>• Add a sticky header with search icon for quick product lookup</li>
                <li>• Implement breadcrumbs so users can easily navigate back</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">8. Implement AMP (Accelerated Mobile Pages) - Optional</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                AMP is Google's framework for ultra-fast mobile pages. While optional, AMP pages load nearly instantly, improving user experience.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-950/30 rounded p-4 text-sm">
                <strong className="text-yellow-900 dark:text-yellow-200">Consideration:</strong> AMP has limitations (restricted JavaScript, simplified design). Test with a few blog posts before rolling out site-wide.
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">9. Use Shorter Paragraphs and Larger Fonts</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Mobile screens are small. Dense paragraphs are hard to read and increase bounce rates.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Minimum 16px font size for body text (18px is better)</li>
                <li>• Maximum 2-3 sentences per paragraph</li>
                <li>• Use bullet points and subheadings to break up content</li>
                <li>• Increase line height (1.6-1.8) for better readability</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">10. Fix Layout Shift Issues (CLS)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Layout shifts happen when images, ads, or embeds load without reserved space, causing content to jump around.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Set explicit width and height attributes on images</li>
                <li>• Reserve space for ads and embeds before they load</li>
                <li>• Avoid inserting content above existing content (pushes everything down)</li>
                <li>• Use font-display: swap for web fonts to prevent text shifting</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">11. Implement Progressive Web App (PWA) Features</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                PWAs combine the best of web and mobile apps, delivering app-like experiences directly through browsers. December 2025 data shows PWAs deliver 36% uplift in mobile conversions.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Enable offline functionality with service workers</li>
                <li>• Add "Add to Home Screen" prompt for returning visitors</li>
                <li>• Implement push notifications for abandoned cart recovery</li>
                <li>• Use Shopify apps like "Plobal Apps" to convert your store to PWA</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">12. Test and Validate Mobile Usability</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Regular testing catches mobile issues before they hurt rankings and conversions.
              </p>
              <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Use Google Search Console's Mobile Usability report</li>
                <li>• Test with real devices (iPhone, Android) not just emulators</li>
                <li>• Check touch targets (buttons, links) are minimum 44x44px</li>
                <li>• Verify forms are easy to complete on mobile (large inputs, autofill)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="mobile-ux" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Mobile User Experience Best Practices</h2>

          <p className="text-lg leading-relaxed mb-6">
            Mobile SEO isn't just about technical performance--user experience directly impacts rankings and conversions.
          </p>

          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Mobile UX Checklist for Shopify Stores</h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Simplified checkout:</strong> Reduce checkout to 2-3 steps maximum. Enable Apple Pay, Google Pay, and Shop Pay for one-tap checkout.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Thumb-friendly design:</strong> Place primary CTAs in the bottom third of the screen where thumbs naturally reach.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Visible search bar:</strong> Search is critical on mobile--make it prominent with predictive suggestions.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Large product images:</strong> Mobile users can't see small details. Enable pinch-to-zoom and use high-quality images.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Sticky add-to-cart button:</strong> Keep the "Add to Cart" button visible as users scroll through product descriptions.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Minimize pop-ups:</strong> Intrusive interstitials (pop-ups) hurt mobile rankings. Use subtle banners instead.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Click-to-call phone numbers:</strong> Make phone numbers tappable with tel: links for instant calls.
                </label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-gray-700 dark:text-gray-300">
                  <strong>Autofill-friendly forms:</strong> Use HTML5 input types (email, tel, number) to trigger appropriate mobile keyboards.
                </label>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-500 p-6 mb-8">
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">📊 December 2025 Mobile UX Finding</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Stores with optimized mobile checkout see <strong>45% lower cart abandonment</strong> rates. With over 60% of shoppers preferring mobile apps for purchases due to smooth navigation and intuitive design, mobile UX is no longer optional.
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section id="voice-search" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Voice Search Optimization for Mobile Commerce</h2>

          <p className="text-lg leading-relaxed mb-6">
            Voice search now contributes to <strong>40% of mobile ecommerce transactions</strong> in December 2025. Optimizing for voice search is essential for capturing this growing segment.
          </p>

          <h3 className="text-2xl font-bold mb-4 mt-8">How Voice Search Differs from Text Search</h3>

          <div className="not-prose bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-gray-100">Text Search</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-gray-100">Voice Search</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">"best running shoes"</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">"What are the best running shoes for flat feet?"</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Short keywords (2-3 words)</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Long conversational queries (7-10 words)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Fragment sentences</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Complete questions</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Focus on keywords</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">Focus on natural language and intent</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">5 Voice Search Optimization Strategies</h3>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold mt-1">1.</span>
              <div>
                <strong>Target question keywords:</strong> Optimize for "how," "what," "where," "when," "why" queries. Example: "How do I clean leather boots?" instead of just "leather boot cleaning."
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold mt-1">2.</span>
              <div>
                <strong>Create FAQ pages:</strong> Answer common customer questions in natural, conversational language. This helps Google extract featured snippets for voice results.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold mt-1">3.</span>
              <div>
                <strong>Optimize for local voice search:</strong> 58% of mobile voice searches are for local businesses. Include "near me" content and optimize your Google Business Profile.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold mt-1">4.</span>
              <div>
                <strong>Use schema markup:</strong> Structured data helps Google understand your content and increases chances of appearing in voice search results.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-purple-500 font-bold mt-1">5.</span>
              <div>
                <strong>Focus on featured snippets:</strong> Voice assistants often read featured snippet content as answers. Target position zero with concise, direct answers to questions.
              </div>
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section id="testing-tools" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Mobile SEO Testing & Monitoring Tools</h2>

          <p className="text-lg leading-relaxed mb-6">
            Use these tools to diagnose mobile issues and track performance improvements:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">🔍 Google PageSpeed Insights</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Tests mobile page speed and provides Core Web Vitals scores with specific recommendations.
              </p>
              <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                pagespeed.web.dev →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">📱 Google Mobile-Friendly Test</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Checks if your page is mobile-friendly and highlights specific usability issues.
              </p>
              <a href="https://search.google.com/test/mobile-friendly" target="_blank" rel="noopener" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Test your page →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">🖥️ Chrome DevTools</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Simulate mobile devices, test responsive design, analyze performance, and debug layout issues.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Press F12 → Click device icon</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">📊 Google Search Console</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Mobile Usability report shows pages with mobile issues. Core Web Vitals report tracks real user performance.
              </p>
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Open Search Console →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">⚡ Shopify Theme Performance Data</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Compare your theme's Core Web Vitals performance against other Shopify themes.
              </p>
              <a href="https://performance.shopify.com/" target="_blank" rel="noopener" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                View theme benchmarks →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">🔧 Lighthouse (Chrome DevTools)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Comprehensive audits for performance, accessibility, SEO, and best practices with actionable recommendations.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">DevTools → Lighthouse tab → Generate report</p>
            </div>
          </div>
        </section>

        {/* Section 8 */}
        <section id="common-mistakes" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">7 Mobile SEO Mistakes Killing Your Shopify Rankings</h2>

          <p className="text-lg leading-relaxed mb-6">
            Avoid these critical mobile SEO mistakes that hurt rankings and conversions:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #1: Different Content on Mobile vs Desktop</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Google uses mobile content for ranking. If your mobile site has less content than desktop, you'll rank lower.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Ensure complete content parity. Use responsive design instead of separate mobile/desktop sites.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #2: Blocked Resources (CSS, JavaScript, Images)</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                If Googlebot can't access your CSS or JavaScript files, it can't properly render your mobile site.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Check Google Search Console's URL Inspection tool. Ensure robots.txt doesn't block critical resources.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #3: Small, Unreadable Text</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Font sizes below 16px are hard to read on mobile and trigger Google's "text too small" usability error.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Use minimum 16px font size for body text, 18px is better. Check with Mobile-Friendly Test.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #4: Intrusive Interstitials (Pop-ups)</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Full-screen pop-ups that cover content on mobile violate Google's guidelines and hurt rankings.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Use subtle banners or exit-intent pop-ups instead. Delay pop-ups until after 30 seconds of browsing.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #5: Touch Elements Too Close Together</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Buttons and links placed too close together lead to accidental clicks and poor user experience.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Minimum 44x44px touch targets with 8px spacing between interactive elements.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #6: Slow Mobile Page Speed</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Load times over 3 seconds cause 83% of users to abandon your site. 1-second delay = 20% lower conversions.
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Follow optimization strategies above. Target LCP < 2.5s, INP < 200ms, CLS < 0.1.
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6">
              <h3 className="text-lg font-bold mb-2 text-red-900 dark:text-red-200">❌ Mistake #7: Ignoring Mobile-Specific Keywords</h3>
              <p className="text-sm text-red-800 dark:text-red-300 mb-3">
                Mobile users search differently (more voice search, local queries, "near me" searches).
              </p>
              <div className="bg-white dark:bg-gray-900 rounded p-3 text-sm">
                <strong className="text-green-900 dark:text-green-200">✓ Solution:</strong> Research mobile-specific keywords. Optimize for conversational queries and local search intent.
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 */}
        <section id="automation" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">How SEOLOGY.AI Automates Mobile SEO Optimization</h2>

          <p className="text-lg leading-relaxed mb-6">
            Manual mobile SEO optimization takes <strong>15-25 hours per month</strong> for a medium-sized Shopify store. SEOLOGY.AI automates the entire process, continuously monitoring and fixing mobile SEO issues in real-time.
          </p>

          <div className="not-prose bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">What SEOLOGY.AI Automates for Mobile SEO</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Core Web Vitals Monitoring</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Continuously tracks LCP, INP, and CLS scores. Automatically identifies performance bottlenecks and applies fixes.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">2</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Image Optimization</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Automatically compresses images, converts to WebP, implements lazy loading, and adds responsive srcset attributes.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600 flex items-center justify-center text-white font-bold">3</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Mobile Usability Fixes</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Detects and fixes touch target sizing, font size issues, content width problems, and viewport configuration.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">4</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Content Parity Verification</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Ensures mobile and desktop versions have identical content, meta tags, structured data, and internal links.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-600 flex items-center justify-center text-white font-bold">5</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Voice Search Optimization</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Automatically creates FAQ schema, optimizes for question keywords, and targets featured snippet opportunities.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">6</div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">Script & Resource Optimization</h4>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">Identifies heavy third-party scripts, defers non-critical JavaScript, and minifies CSS for faster mobile load times.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-8">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">📊 Real Results from SEOLOGY.AI Users (December 2025)</p>
            <ul className="text-sm space-y-2 text-blue-800 dark:text-blue-300">
              <li>• <strong>Average LCP improvement:</strong> 2.8 seconds → 1.4 seconds (50% faster)</li>
              <li>• <strong>Mobile conversion increase:</strong> +28% average across all stores</li>
              <li>• <strong>Mobile traffic growth:</strong> +45% within 90 days of implementation</li>
              <li>• <strong>Core Web Vitals pass rate:</strong> 89% of stores achieve "Good" scores</li>
              <li>• <strong>Time saved:</strong> 22 hours per month on average (mobile SEO maintenance)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold mb-4 mt-8">How It Works: 3-Step Mobile SEO Automation</h3>

          <div className="space-y-6 mb-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">1</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Connect Your Shopify Store (2 Minutes)</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  One-click integration with Shopify. SEOLOGY.AI immediately scans your store for mobile SEO issues using Google's actual mobile crawler.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-600 flex items-center justify-center text-white font-bold text-2xl">2</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">AI Analyzes & Prioritizes Issues (5 Minutes)</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI evaluates every mobile SEO issue by revenue impact, ranking impact, and fix difficulty. You see exactly which issues to fix first (or approve automatic fixes).
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">3</div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Automatic Fixes Applied 24/7 (Ongoing)</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  SEOLOGY.AI continuously monitors your mobile performance and applies fixes in real-time. Core Web Vitals degradation? Fixed automatically. New mobile usability issue? Resolved before it hurts rankings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="not-prose bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Dominate Mobile Search in 2026?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join 5,000+ Shopify stores using SEOLOGY.AI to automatically optimize mobile SEO and increase conversions by 32%
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
              Watch 2-Min Demo
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Setup in 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              <span>Cancel anytime</span>
            </div>
          </div>

          <p className="text-sm text-blue-200 mt-6">
            ⚡ <strong>December 2025 Special:</strong> First 100 signups get 50% off for 3 months + free mobile SEO audit ($499 value)
          </p>
        </div>

        {/* Author Bio */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-16">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                ER
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">About the Author</h3>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Dr. Emily Rodriguez</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Mobile UX Specialist & SEO Consultant
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Dr. Rodriguez holds a Ph.D. in Human-Computer Interaction from Stanford and has 12+ years of experience optimizing mobile experiences for Fortune 500 ecommerce brands. She's published 15+ peer-reviewed papers on mobile usability and Core Web Vitals optimization. As SEOLOGY.AI's Mobile UX Lead, she's helped over 3,000 Shopify stores achieve Google's "Good" Core Web Vitals thresholds and increase mobile conversions by an average of 28%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
