import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Web Vitals & Page Experience for Shopify: 2026 Complete Guide | SEOLOGY.AI',
  description: "Only 47% of sites meet Google\'s 2026 Core Web Vitals requirements. Master LCP, INP, and CLS optimization for Shopify with our comprehensive guide backed by December 2025 data.",
  keywords: 'Core Web Vitals, Shopify page experience, LCP optimization, INP metrics, CLS score, Google ranking factors, page speed Shopify, web performance 2026, Shopify SEO, mobile performance',
  openGraph: {
    title: 'Core Web Vitals & Page Experience for Shopify: 2026 Complete Guide',
    description: "Only 47% of sites meet Google\'s 2026 Core Web Vitals requirements. Master LCP, INP, and CLS optimization.",
    type: 'article',
    publishedTime: '2025-12-20T08:00:00Z',
    authors: ['Dr. Elena Petrov, Web Performance Engineer'],
    tags: [
      'Core Web Vitals',
      'Page Experience',
      'Shopify Performance',
      'LCP Optimization',
      'INP Metrics',
      'CLS Score',
      'Google Ranking',
      'Web Performance',
      'Mobile SEO',
      'Site Speed'
    ],
  },
}

export default function CoreWebVitalsPageExperienceShopify2026() {
  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Core Web Vitals & Page Experience for Shopify: 2026 Complete Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Only 47% of websites meet Google's 2026 Core Web Vitals requirements, and just 21.98% achieve "good" scores across all three metrics. With INP replacing FID and stricter benchmarks rolling out, Shopify merchants must optimize LCP, INP, and CLS to maintain rankings and conversions. Every 100ms delay costs you 7% in conversion rates.
        </p>
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
          <time dateTime="2025-12-20">December 20, 2025</time>
          <span>•</span>
          <span>15 min read</span>
          <span>•</span>
          <span>Updated for 2026 benchmarks</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
        <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
        <ul className="space-y-2">
          <li><a href="#what-are-cwv" className="text-blue-600 hover:text-blue-800">What Are Core Web Vitals?</a></li>
          <li><a href="#2026-benchmarks" className="text-blue-600 hover:text-blue-800">2026 Updated Benchmarks & Thresholds</a></li>
          <li><a href="#inp-replaces-fid" className="text-blue-600 hover:text-blue-800">INP Replaces FID: What Changed</a></li>
          <li><a href="#why-cwv-matter" className="text-blue-600 hover:text-blue-800">Why Core Web Vitals Matter for Shopify</a></li>
          <li><a href="#lcp-optimization" className="text-blue-600 hover:text-blue-800">LCP Optimization Strategies</a></li>
          <li><a href="#inp-optimization" className="text-blue-600 hover:text-blue-800">INP Optimization Techniques</a></li>
          <li><a href="#cls-optimization" className="text-blue-600 hover:text-blue-800">CLS Prevention & Fixes</a></li>
          <li><a href="#shopify-specific" className="text-blue-600 hover:text-blue-800">Shopify-Specific Optimization</a></li>
          <li><a href="#measurement-tools" className="text-blue-600 hover:text-blue-800">Measurement & Monitoring Tools</a></li>
          <li><a href="#mobile-optimization" className="text-blue-600 hover:text-blue-800">Mobile Performance Optimization</a></li>
          <li><a href="#theme-selection" className="text-blue-600 hover:text-blue-800">Choosing Performance-Optimized Themes</a></li>
          <li><a href="#app-management" className="text-blue-600 hover:text-blue-800">App Impact & Management</a></li>
          <li><a href="#implementation-checklist" className="text-blue-600 hover:text-blue-800">Complete Implementation Checklist</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <section id="what-are-cwv" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What Are Core Web Vitals?</h2>

        <p className="mb-4">
          Core Web Vitals are a set of three specific metrics that Google considers essential for measuring user experience on web pages. Introduced as official ranking factors in 2021, they've become increasingly critical for SEO success in 2026.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-4">The Three Core Web Vitals (2026):</h3>
          <ul className="space-y-4">
            <li>
              <strong className="text-blue-600">LCP (Largest Contentful Paint):</strong> Measures loading performance - how quickly the largest content element becomes visible. Target: under 2.5 seconds.
            </li>
            <li>
              <strong className="text-purple-600">INP (Interaction to Next Paint):</strong> Measures interactivity - how quickly your site responds to ALL user interactions. Target: under 200 milliseconds. (Replaced FID in 2024-2025)
            </li>
            <li>
              <strong className="text-teal-600">CLS (Cumulative Layout Shift):</strong> Measures visual stability - how much content shifts unexpectedly during page load. Target: less than 0.1.
            </li>
          </ul>
        </div>

        <p className="mb-4">
          These metrics work together to provide a comprehensive picture of user experience. A site can have fast loading (good LCP) but poor interactivity (bad INP), or stable layout (good CLS) but slow loading (bad LCP). Google requires good scores across all three metrics.
        </p>

        <div className="not-prose bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            ⚠️ Critical Statistic (December 2025):
          </p>
          <p className="text-red-800 dark:text-red-200">
            Only <strong>21.98%</strong> of websites achieve "good" scores across all three Core Web Vitals. This means 78% of sites are leaving money on the table through poor performance.
          </p>
        </div>
      </section>

      <section id="2026-benchmarks" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">2026 Updated Benchmarks & Thresholds</h2>

        <p className="mb-4">
          Google continuously refines Core Web Vitals benchmarks based on real-world data. For 2025-2026, some thresholds have been updated to reflect improved web performance capabilities:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Metric</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Good</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Needs Improvement</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Poor</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">2026 Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>LCP</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-green-50 dark:bg-green-900/20">≤ 2.5s</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20">2.5s - 4.0s</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-red-50 dark:bg-red-900/20">&gt; 4.0s</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Some sources suggest 2.0s for optimal</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>INP</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-green-50 dark:bg-green-900/20">≤ 200ms</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20">200ms - 500ms</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-red-50 dark:bg-red-900/20">&gt; 500ms</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Replaced FID in 2024-2025</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>CLS</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-green-50 dark:bg-green-900/20">≤ 0.1</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20">0.1 - 0.25</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-red-50 dark:bg-red-900/20">&gt; 0.25</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Some advocate for 0.08 threshold</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">75% Rule for "Good" Classification</h3>
          <p className="mb-3">
            For Google to classify your site as having "good" Core Web Vitals, at least <strong>75% of page loads</strong> must achieve the "good" threshold for each metric. This means you can't just optimize your homepage - you need consistent performance across your entire site.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Example: If 100 users visit your product page, at least 75 of those visits must have LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Current Industry Performance (December 2025)</h3>
        <ul className="space-y-3 mb-6">
          <li><strong>53.77%</strong> of sites achieve good LCP scores</li>
          <li><strong>65.13%</strong> of sites achieve good CLS scores</li>
          <li><strong>89.46%</strong> of sites had good FID scores (pre-INP transition)</li>
          <li><strong>47%</strong> of websites meet all Core Web Vitals requirements</li>
          <li><strong>21.98%</strong> achieve "good" classification across all three metrics</li>
        </ul>

        <p className="mb-4">
          These statistics reveal significant opportunity: if your Shopify store can achieve "good" scores across all three metrics, you'll outperform 78% of competing websites in the eyes of Google's algorithm.
        </p>
      </section>

      <section id="inp-replaces-fid" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">INP Replaces FID: What Changed and Why It Matters</h2>

        <p className="mb-4">
          In 2024-2025, Google officially replaced First Input Delay (FID) with Interaction to Next Paint (INP) as a Core Web Vital. This change reflects a more comprehensive approach to measuring interactivity.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-red-600">FID (Old Metric)</h3>
            <ul className="space-y-2 text-sm">
              <li>✗ Measured only the <em>first</em> interaction</li>
              <li>✗ Ignored subsequent interactions</li>
              <li>✗ Didn't account for processing time</li>
              <li>✗ Easy to "game" with fast initial response</li>
              <li>✗ Good threshold: &lt; 100ms</li>
            </ul>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-green-600">INP (New Metric)</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Measures <em>all</em> interactions during visit</li>
              <li>✓ Accounts for processing and rendering</li>
              <li>✓ More comprehensive responsiveness picture</li>
              <li>✓ Better reflects actual user experience</li>
              <li>✓ Good threshold: &lt; 200ms</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">What INP Measures</h3>
        <p className="mb-4">
          INP measures the latency of every interaction a user makes with your page (clicks, taps, keyboard inputs) and reports the worst interaction time (with some statistical smoothing). It captures three phases:
        </p>

        <ol className="space-y-3 mb-6">
          <li>
            <strong>1. Input Delay:</strong> Time from user interaction to when browser can start processing (similar to old FID)
          </li>
          <li>
            <strong>2. Processing Time:</strong> How long event handlers take to execute
          </li>
          <li>
            <strong>3. Presentation Delay:</strong> Time to render the visual update on screen
          </li>
        </ol>

        <div className="not-prose bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 rounded mb-6">
          <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚡ Why This Matters for Shopify:
          </p>
          <p className="text-yellow-800 dark:text-yellow-200">
            Many Shopify apps add JavaScript that can slow down interactions like "Add to Cart" buttons, variant selectors, and mobile menu toggles. INP will expose these performance issues that FID missed.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">INP Optimization Strategies</h3>
        <ul className="space-y-3 mb-6">
          <li><strong>Defer non-critical JavaScript</strong> - Don't block interactions with unnecessary scripts</li>
          <li><strong>Break up long tasks</strong> - Split JavaScript execution into smaller chunks (&lt;50ms each)</li>
          <li><strong>Optimize event handlers</strong> - Keep click/tap handlers lightweight</li>
          <li><strong>Use web workers</strong> - Offload heavy computations to background threads</li>
          <li><strong>Minimize main thread work</strong> - Reduce JavaScript execution time during interactions</li>
        </ul>
      </section>

      <section id="why-cwv-matter" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Why Core Web Vitals Matter for Shopify Merchants</h2>

        <p className="mb-4">
          Core Web Vitals impact your Shopify store's success in three critical areas:
        </p>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 border-l-4 border-blue-500 p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">1. Google Search Rankings</h3>
            <p className="mb-3">
              Core Web Vitals are confirmed Google ranking factors. While content quality remains paramount, when multiple pages have similar content relevance, Google uses page experience (including Core Web Vitals) as a tiebreaker.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Impact:</strong> Sites with good Core Web Vitals can rank higher than competitors with poor performance, especially for competitive keywords.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-green-500 p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">2. Conversion Rates & Revenue</h3>
            <p className="mb-3">
              Performance directly impacts purchasing behavior. December 2025 research shows:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <strong>7% conversion rate decrease</strong> for every 100ms of additional page load time</li>
              <li>• <strong>60%+ of ecommerce traffic</strong> now comes from mobile devices (which are more sensitive to performance)</li>
              <li>• Users are 24% less likely to abandon a site with good Core Web Vitals</li>
              <li>• 1-second delay in mobile load times can impact conversions by up to 20%</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 border-l-4 border-purple-500 p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-3">3. Customer Satisfaction & Retention</h3>
            <p className="mb-3">
              Poor performance creates negative brand perception. Sites with good Core Web Vitals see:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Higher customer satisfaction scores</li>
              <li>• Increased repeat purchase rates</li>
              <li>• Better brand perception and trust</li>
              <li>• Lower bounce rates (especially on mobile)</li>
              <li>• More social shares and organic mentions</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4">Real-World Impact Example</h3>
          <p className="mb-4">
            Consider a Shopify store with $500,000 in monthly revenue and a 2% conversion rate. If their average page load time is 500ms slower than optimal:
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded mb-4">
            <p className="font-mono text-sm mb-2">500ms delay × 7% per 100ms = <strong className="text-red-600">35% conversion rate loss</strong></p>
            <p className="font-mono text-sm mb-2">2.0% conversion rate × 35% loss = 1.3% actual conversion rate</p>
            <p className="font-mono text-sm mb-4">$500,000 monthly revenue × 35% loss = <strong className="text-red-600">$175,000 monthly revenue lost</strong></p>
            <p className="font-bold text-lg text-green-600">By optimizing Core Web Vitals, this store could recover $2.1M annually.</p>
          </div>
        </div>
      </section>

      <section id="lcp-optimization" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">LCP Optimization Strategies for Shopify</h2>

        <p className="mb-4">
          Largest Contentful Paint (LCP) measures how quickly the largest visible element loads. For Shopify stores, this is typically a hero image, product photo, or large text block on your homepage or product pages.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Current LCP Performance (December 2025)</h3>
          <p className="mb-2">Only <strong>53.77%</strong> of websites achieve good LCP scores (&lt; 2.5s)</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Target: Under 2.5 seconds (optimal: under 2.0 seconds for competitive advantage)</p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Top LCP Optimization Techniques</h3>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="text-xl font-bold mb-2">1. Optimize Hero Images</h4>
            <p className="mb-3">
              Your homepage hero image is often the LCP element. Optimize it aggressively:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Use modern formats: WebP or AVIF (40-50% smaller than JPEG)</li>
              <li>• Implement responsive images with srcset for different screen sizes</li>
              <li>• Compress images to 80-85% quality (imperceptible quality loss)</li>
              <li>• Lazy load images below the fold, but <strong>never</strong> lazy load LCP images</li>
              <li>• Use appropriate dimensions (don't serve 4000px images for 1200px displays)</li>
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-3">
              <code className="text-sm">
                {`<img
  src="hero-image.webp"
  srcset="hero-400w.webp 400w, hero-800w.webp 800w, hero-1200w.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Hero product"
  fetchpriority="high"
  loading="eager"
/>`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="text-xl font-bold mb-2">2. Implement Preload for Critical Resources</h4>
            <p className="mb-3">
              Tell the browser to prioritize LCP resources:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-3">
              <code className="text-sm">
                {`<link rel="preload" as="image" href="hero-image.webp" fetchpriority="high">`}
              </code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This instructs the browser to download the LCP image immediately, even before parsing the full HTML.
            </p>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="text-xl font-bold mb-2">3. Optimize Server Response Time (TTFB)</h4>
            <p className="mb-3">
              LCP can't start until the browser receives the HTML. Improve Time to First Byte:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Use Shopify CDN (included with all plans)</li>
              <li>• Enable HTTP/2 or HTTP/3 for faster resource loading</li>
              <li>• Minimize server-side processing in Liquid templates</li>
              <li>• Use Shopify's built-in caching effectively</li>
              <li>• Consider edge caching for global audiences</li>
            </ul>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h4 className="text-xl font-bold mb-2">4. Eliminate Render-Blocking Resources</h4>
            <p className="mb-3">
              CSS and JavaScript files can delay LCP. Strategies:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Inline critical CSS (above-the-fold styles)</li>
              <li>• Defer non-critical CSS with media queries or preload</li>
              <li>• Move JavaScript to the bottom or use defer/async attributes</li>
              <li>• Remove unused CSS and JavaScript</li>
              <li>• Minimize and bundle CSS/JS files</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="text-xl font-bold mb-2">5. Use Content Delivery Network (CDN)</h4>
            <p className="mb-3">
              Shopify includes Fastly CDN, but optimize its usage:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• All static assets automatically served via CDN</li>
              <li>• Shopify CDN has 200+ global edge locations</li>
              <li>• Use Shopify's image CDN with automatic optimization parameters</li>
              <li>• For custom assets, upload to Shopify's file system (not external servers)</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Shopify-Specific LCP Wins</h3>
          <ul className="space-y-2">
            <li>✓ Use Shopify's <code>image_url</code> filter with size parameters</li>
            <li>✓ Leverage Shopify's automatic WebP conversion</li>
            <li>✓ Choose themes with optimized LCP (Dawn, Refresh, Sense)</li>
            <li>✓ Minimize app scripts in theme.liquid &lt;head&gt; section</li>
            <li>✓ Use Shopify's lazy loading for product collections</li>
          </ul>
        </div>
      </section>

      <section id="inp-optimization" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">INP Optimization Techniques for Shopify</h2>

        <p className="mb-4">
          Interaction to Next Paint (INP) measures how responsive your site feels during user interactions. For Shopify stores, critical interactions include "Add to Cart" buttons, variant selectors, mobile menus, and checkout forms.
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">INP Target: Under 200 Milliseconds</h3>
          <p className="mb-2">Good INP = instant, responsive feel. Poor INP = sluggish, frustrating interactions.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            INP is especially critical for mobile users, who represent 60%+ of ecommerce traffic in 2025-2026.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Essential INP Optimization Strategies</h3>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="text-xl font-bold mb-2">1. Optimize JavaScript Execution</h4>
            <p className="mb-3">
              Long-running JavaScript tasks block the main thread and delay interactions:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Break tasks into smaller chunks (&lt;50ms each)</li>
              <li>• Use <code>requestIdleCallback</code> for non-critical work</li>
              <li>• Defer third-party scripts (analytics, chat widgets)</li>
              <li>• Minimize DOM manipulation during interactions</li>
              <li>• Use event delegation instead of multiple event listeners</li>
            </ul>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="text-xl font-bold mb-2">2. Reduce App Script Impact</h4>
            <p className="mb-3">
              Shopify apps are a major source of INP degradation. App management strategies:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Audit installed apps monthly - remove unused apps</li>
              <li>• Each app adds ~50-200KB of JavaScript on average</li>
              <li>• Apps run on every page load, even if features aren't used</li>
              <li>• Use apps that load scripts conditionally (only on relevant pages)</li>
              <li>• Check app performance scores in Shopify App Store reviews</li>
              <li>• Consider native Shopify features before adding apps</li>
            </ul>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded mt-3">
              <p className="text-sm font-semibold mb-2">⚠️ Common Culprits:</p>
              <p className="text-sm">Review apps, currency converters, popup builders, and live chat widgets are frequent INP offenders.</p>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="text-xl font-bold mb-2">3. Optimize Event Handlers</h4>
            <p className="mb-3">
              Keep click, scroll, and input handlers lightweight:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-3">
              <p className="text-sm font-semibold mb-2">❌ Bad (blocks main thread):</p>
              <code className="text-sm">
                {`button.addEventListener('click', () => {
  // Heavy processing here
  processLargeDataset();
  updateMultipleDOMElements();
});`}
              </code>
              <p className="text-sm font-semibold mt-4 mb-2">✅ Good (non-blocking):</p>
              <code className="text-sm">
                {`button.addEventListener('click', () => {
  // Immediate visual feedback
  button.classList.add('loading');

  // Defer heavy work
  requestIdleCallback(() => {
    processLargeDataset();
    updateMultipleDOMElements();
    button.classList.remove('loading');
  });
});`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="text-xl font-bold mb-2">4. Use Web Workers for Heavy Computations</h4>
            <p className="mb-3">
              Offload intensive tasks to background threads:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Product filtering/sorting on collection pages</li>
              <li>• Complex price calculations (bulk discounts, currency conversion)</li>
              <li>• Client-side analytics processing</li>
              <li>• Image manipulation or resizing</li>
            </ul>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Web Workers run in separate threads, keeping the main thread responsive to user interactions.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h4 className="text-xl font-bold mb-2">5. Debounce and Throttle Interactions</h4>
            <p className="mb-3">
              Limit how often event handlers fire:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Debounce:</strong> Wait for user to stop typing before processing (search boxes)</li>
              <li>• <strong>Throttle:</strong> Limit execution frequency (scroll handlers, resize events)</li>
              <li>• Prevents redundant processing during rapid interactions</li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Shopify-Specific INP Optimization</h3>
          <ul className="space-y-2">
            <li>✓ Use Shopify Ajax API for cart updates (faster than full page reload)</li>
            <li>✓ Implement optimistic UI updates (show changes immediately, sync in background)</li>
            <li>✓ Minimize Liquid template complexity (pre-process data server-side)</li>
            <li>✓ Use theme.liquid sparingly for JavaScript includes</li>
            <li>✓ Load app scripts asynchronously when possible</li>
          </ul>
        </div>
      </section>

      <section id="cls-optimization" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">CLS Prevention & Fixes for Shopify</h2>

        <p className="mb-4">
          Cumulative Layout Shift (CLS) measures visual stability - how much page content shifts unexpectedly during loading. Nothing frustrates users more than clicking a button only to have the layout shift at the last second, causing an accidental click.
        </p>

        <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Current CLS Performance</h3>
          <p className="mb-2"><strong>65.13%</strong> of websites achieve good CLS scores (&lt; 0.1)</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Target: Under 0.1 (some experts recommend under 0.08 for optimal user experience)
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Common CLS Culprits in Shopify Stores</h3>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="text-xl font-bold mb-2">1. Images Without Dimensions</h4>
            <p className="mb-3">
              The #1 cause of CLS. When images load, they push content down if dimensions aren't specified:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-3">
              <p className="text-sm font-semibold mb-2">❌ Bad (causes layout shift):</p>
              <code className="text-sm">
                {`<img src="product.jpg" alt="Product">`}
              </code>
              <p className="text-sm font-semibold mt-4 mb-2">✅ Good (reserves space):</p>
              <code className="text-sm">
                {`<img src="product.jpg" alt="Product" width="800" height="600">`}
              </code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Shopify Liquid tip: Use <code>{`{{ image | image_url: width: 800 }}`}</code> and always specify aspect ratio.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="text-xl font-bold mb-2">2. Dynamic Content Injection</h4>
            <p className="mb-3">
              Content loaded after page render (apps, banners, reviews) causes shifts:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Reserve space</strong> with min-height CSS before content loads</li>
              <li>• Use skeleton screens or placeholders</li>
              <li>• Load dynamic content in fixed-height containers</li>
              <li>• Avoid inserting content above existing content</li>
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-3">
              <code className="text-sm">
                {`/* Reserve space for dynamically loaded banner */
.announcement-bar {
  min-height: 50px; /* Prevents shift when banner loads */
}`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h4 className="text-xl font-bold mb-2">3. Web Fonts Causing FOUT/FOIT</h4>
            <p className="mb-3">
              Flash of Unstyled Text (FOUT) or Flash of Invisible Text (FOIT) causes layout shifts:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Use <code>font-display: swap</code> for faster rendering</li>
              <li>• Preload critical fonts in &lt;head&gt;</li>
              <li>• Use system fonts as fallbacks with similar metrics</li>
              <li>• Consider variable fonts for fewer HTTP requests</li>
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-3">
              <code className="text-sm">
                {`<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback font immediately */
}`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="text-xl font-bold mb-2">4. Ads and Embedded Content</h4>
            <p className="mb-3">
              Third-party embeds (Instagram feeds, YouTube videos, Google Ads) cause significant CLS:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Always use aspect-ratio CSS or explicit width/height</li>
              <li>• Use <code>loading="lazy"</code> for embeds below the fold</li>
              <li>• Reserve space with placeholders before embed loads</li>
              <li>• Avoid ads near interactive elements (buttons, links)</li>
            </ul>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mt-3">
              <code className="text-sm">
                {`.youtube-embed {
  aspect-ratio: 16 / 9; /* Reserves correct space before iframe loads */
  width: 100%;
}`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="text-xl font-bold mb-2">5. Shopify App Banners and Popups</h4>
            <p className="mb-3">
              Review apps, countdown timers, and promotional banners are frequent CLS offenders:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Configure apps to load in fixed-position overlays (not inline)</li>
              <li>• Delay popup display until after page is fully loaded</li>
              <li>• Use exit-intent triggers instead of immediate popups</li>
              <li>• Test CLS impact in PageSpeed Insights after installing new apps</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">CSS Techniques to Prevent CLS</h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold mb-1">Modern aspect-ratio property:</p>
              <code className="text-sm bg-white dark:bg-gray-800 p-2 rounded block">
                img {'{'}aspect-ratio: 16 / 9; width: 100%;{'}'}
              </code>
            </div>
            <div>
              <p className="font-semibold mb-1">Placeholder with min-height:</p>
              <code className="text-sm bg-white dark:bg-gray-800 p-2 rounded block">
                .skeleton {'{'}min-height: 300px; background: #f0f0f0;{'}'}
              </code>
            </div>
            <div>
              <p className="font-semibold mb-1">Transform instead of top/left for animations:</p>
              <code className="text-sm bg-white dark:bg-gray-800 p-2 rounded block">
                {`/* Use transform (doesn't cause CLS) */
.element {'{'}transform: translateY(10px);{'}'}

/* Avoid top/left (causes CLS) */
.element {'{'}top: 10px;{'}'}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      <section id="shopify-specific" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopify-Specific Core Web Vitals Optimization</h2>

        <p className="mb-4">
          Shopify provides built-in performance features, but requires strategic implementation for optimal Core Web Vitals scores.
        </p>

        <h3 className="text-2xl font-bold mb-4">Shopify's Performance Advantages</h3>
        <ul className="space-y-3 mb-6">
          <li>✓ <strong>Global CDN (Fastly):</strong> 200+ edge locations worldwide for fast asset delivery</li>
          <li>✓ <strong>Automatic image optimization:</strong> WebP conversion, lazy loading, responsive images</li>
          <li>✓ <strong>HTTP/2 and HTTP/3:</strong> Multiplexed connections for faster resource loading</li>
          <li>✓ <strong>Built-in caching:</strong> Server-side caching for common pages</li>
          <li>✓ <strong>Hosted infrastructure:</strong> No server management, automatic scaling</li>
          <li>✓ <strong>SSL/TLS included:</strong> Secure, fast HTTPS connections</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4">Optimization Strategies by Store Section</h3>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Homepage Optimization</h4>
            <ul className="space-y-2 text-sm">
              <li>• Keep hero image under 200KB (WebP format, 80-85% quality)</li>
              <li>• Limit homepage sections to 5-7 (each section adds load time)</li>
              <li>• Use static sections instead of dynamic when possible</li>
              <li>• Lazy load product collections and image galleries</li>
              <li>• Minimize app integrations on homepage (highest traffic page)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Product Page Optimization</h4>
            <ul className="space-y-2 text-sm">
              <li>• Optimize product images (typically the LCP element)</li>
              <li>• Use Shopify's variant image loading (only load selected variant images)</li>
              <li>• Implement product image zoom on interaction (not preload)</li>
              <li>• Lazy load product reviews and related products sections</li>
              <li>• Optimize "Add to Cart" button responsiveness (critical INP interaction)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Collection Page Optimization</h4>
            <ul className="space-y-2 text-sm">
              <li>• Use infinite scroll or pagination (avoid loading all products at once)</li>
              <li>• Lazy load product images below the fold</li>
              <li>• Implement client-side filtering when possible (avoid full page reloads)</li>
              <li>• Use skeleton screens during filter/sort operations</li>
              <li>• Optimize product card images (smaller thumbnails, WebP)</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Shopify Liquid Performance Tips</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Minimize loops in Liquid templates (pre-process data)</li>
            <li>✓ Use <code>{`{% render %}`}</code> instead of <code>{`{% include %}`}</code> for better performance</li>
            <li>✓ Cache expensive Liquid operations when possible</li>
            <li>✓ Avoid nested loops (O(n²) complexity)</li>
            <li>✓ Use <code>{`{% paginate %}`}</code> for large collections instead of loading all items</li>
          </ul>
        </div>
      </section>

      <section id="measurement-tools" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Measurement & Monitoring Tools</h2>

        <p className="mb-4">
          You can't improve what you don't measure. Use these tools to track Core Web Vitals performance:
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">🔬 Lab Tools (Synthetic Testing)</h3>
            <p className="text-sm mb-4">Controlled environment, consistent results, debugging-friendly:</p>
            <ul className="space-y-2 text-sm">
              <li><strong>PageSpeed Insights:</strong> Google's official tool, shows both lab and field data</li>
              <li><strong>Lighthouse:</strong> Built into Chrome DevTools, detailed performance audit</li>
              <li><strong>WebPageTest:</strong> Advanced testing with waterfall charts, video playback</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Best for: Development, debugging specific issues, A/B testing optimizations
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">📊 Field Tools (Real User Monitoring)</h3>
            <p className="text-sm mb-4">Real user data from actual visitors:</p>
            <ul className="space-y-2 text-sm">
              <li><strong>Chrome User Experience Report (CrUX):</strong> Google's real-world dataset</li>
              <li><strong>Google Search Console:</strong> Core Web Vitals report for your site</li>
              <li><strong>Web Vitals JavaScript library:</strong> Custom tracking and analytics</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">
              Best for: Understanding real user experience, identifying problematic pages, tracking trends
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">How to Use Google Search Console</h3>
        <ol className="space-y-3 mb-6">
          <li>
            <strong>1. Navigate to Core Web Vitals report:</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Search Console → Experience → Core Web Vitals</p>
          </li>
          <li>
            <strong>2. Review mobile and desktop data separately:</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mobile performance is weighted more heavily by Google</p>
          </li>
          <li>
            <strong>3. Identify "Poor URLs" and "URLs that need improvement":</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Click through to see specific pages and failing metrics</p>
          </li>
          <li>
            <strong>4. Fix issues and request validation:</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Google will re-crawl and update status (takes 28+ days)</p>
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Recommended Testing Workflow</h3>
          <ol className="space-y-2 text-sm">
            <li>1. <strong>Baseline:</strong> Test with PageSpeed Insights (get current scores)</li>
            <li>2. <strong>Identify:</strong> Use Lighthouse to find specific issues</li>
            <li>3. <strong>Optimize:</strong> Implement fixes one at a time</li>
            <li>4. <strong>Test:</strong> Re-run PageSpeed Insights to verify improvement</li>
            <li>5. <strong>Monitor:</strong> Track real user data in Search Console (28-day lag)</li>
            <li>6. <strong>Iterate:</strong> Continuously optimize based on field data</li>
          </ol>
        </div>
      </section>

      <section id="mobile-optimization" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Mobile Performance Optimization</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            🚨 Critical: Mobile traffic represents 60%+ of ecommerce in 2025-2026
          </p>
          <p className="text-red-800 dark:text-red-200">
            Google uses mobile performance for ranking (mobile-first indexing). Mobile users are also more sensitive to performance issues and will abandon slower sites.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Mobile-Specific Challenges</h3>
        <ul className="space-y-3 mb-6">
          <li><strong>Slower CPUs:</strong> JavaScript execution takes 4-5x longer on mobile devices</li>
          <li><strong>Unreliable connections:</strong> 3G/4G networks have higher latency than broadband</li>
          <li><strong>Smaller screens:</strong> Images often oversized for mobile displays</li>
          <li><strong>Touch interactions:</strong> INP is more critical on mobile (tap responsiveness)</li>
          <li><strong>Battery constraints:</strong> Heavy JavaScript drains battery faster</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4">Mobile Optimization Strategies</h3>

        <div className="space-y-6 mb-8">
          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="text-xl font-bold mb-2">1. Serve Appropriate Image Sizes</h4>
            <p className="mb-3">
              Don't serve 2000px images to 400px mobile screens:
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <code className="text-sm">
                {`{{ product.featured_image | image_url: width: 400 }} /* Mobile */
{{ product.featured_image | image_url: width: 800 }} /* Tablet */
{{ product.featured_image | image_url: width: 1200 }} /* Desktop */`}
              </code>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="text-xl font-bold mb-2">2. Minimize JavaScript Payload</h4>
            <p className="mb-3">
              Mobile devices struggle with large JavaScript bundles:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Code-split JavaScript (load only what's needed per page)</li>
              <li>• Defer non-critical scripts</li>
              <li>• Remove unused libraries and polyfills</li>
              <li>• Use lightweight alternatives (e.g., vanilla JS instead of jQuery)</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <h4 className="text-xl font-bold mb-2">3. Optimize Touch Interactions</h4>
            <p className="mb-3">
              Mobile users primarily interact via touch:
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Make touch targets at least 44x44px (avoid tiny buttons)</li>
              <li>• Add visual feedback to touch interactions (active states)</li>
              <li>• Use passive event listeners for scroll/touch events</li>
              <li>• Avoid hover-dependent interactions (no mouse on mobile)</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Mobile Testing Checklist</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Test on real devices (not just Chrome DevTools emulation)</li>
            <li>✓ Use throttled 3G/4G simulation in testing tools</li>
            <li>✓ Verify touch target sizes and tap responsiveness</li>
            <li>✓ Check image quality and file sizes on mobile</li>
            <li>✓ Ensure fonts are readable (minimum 16px on mobile)</li>
            <li>✓ Test "Add to Cart" and checkout flows on mobile</li>
          </ul>
        </div>
      </section>

      <section id="theme-selection" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Choosing Performance-Optimized Shopify Themes</h2>

        <p className="mb-4">
          Your theme choice has enormous impact on Core Web Vitals. A bloated theme can sabotage your optimization efforts, while a performance-focused theme gives you a head start.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-3">Shopify's Performance-Optimized Themes (2026)</h3>
          <p className="mb-4">These official Shopify themes are built with Core Web Vitals in mind:</p>
          <ul className="space-y-3">
            <li>
              <strong className="text-blue-600">Dawn:</strong> Shopify's reference theme, minimal JavaScript, excellent LCP/INP scores
            </li>
            <li>
              <strong className="text-green-600">Refresh:</strong> Modern design, optimized for performance, good mobile scores
            </li>
            <li>
              <strong className="text-purple-600">Sense:</strong> Clean, fast, built with performance best practices
            </li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            These themes consistently score 90+ on PageSpeed Insights out of the box.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">Theme Evaluation Criteria</h3>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-green-500 pl-6">
            <h4 className="font-bold mb-2">✅ Look for these features:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Lazy loading for images and sections</li>
              <li>• Minimal JavaScript dependencies</li>
              <li>• Responsive image implementation with srcset</li>
              <li>• CSS-only animations (avoid JavaScript animations)</li>
              <li>• Modular sections (load only what's used)</li>
              <li>• Modern browser support only (no legacy polyfills)</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="font-bold mb-2">❌ Avoid these red flags:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Heavy JavaScript frameworks (Vue, React in theme code)</li>
              <li>• Excessive animations and parallax effects</li>
              <li>• Large CSS frameworks (Bootstrap, Foundation)</li>
              <li>• Video backgrounds on every page</li>
              <li>• Dozens of Google Fonts loaded</li>
              <li>• Sliders and carousels everywhere (heavy JavaScript)</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">How to Test a Theme Before Purchasing</h3>
        <ol className="space-y-3 mb-6">
          <li>
            <strong>1. Find the theme's demo store URL</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Most theme listings include a live demo link</p>
          </li>
          <li>
            <strong>2. Run PageSpeed Insights on the demo</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Target: 90+ performance score on mobile</p>
          </li>
          <li>
            <strong>3. Check Core Web Vitals scores</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">LCP &lt; 2.5s, INP &lt; 200ms, CLS &lt; 0.1</p>
          </li>
          <li>
            <strong>4. Review theme code (if available)</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Look at JavaScript dependencies and CSS file sizes</p>
          </li>
          <li>
            <strong>5. Read reviews mentioning "performance" or "speed"</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real user feedback about theme performance</p>
          </li>
        </ol>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">⚠️ Theme Customization Warning</h3>
          <p className="text-sm mb-3">
            Even a performance-optimized theme can become slow with excessive customization:
          </p>
          <ul className="space-y-2 text-sm">
            <li>• Adding too many sections to pages</li>
            <li>• Installing performance-heavy apps</li>
            <li>• Custom code that isn't optimized</li>
            <li>• Third-party script integrations</li>
          </ul>
          <p className="text-sm font-semibold mt-3">
            Test Core Web Vitals after every major customization or app installation.
          </p>
        </div>
      </section>

      <section id="app-management" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopify App Impact & Management</h2>

        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded mb-6">
          <p className="font-semibold text-red-900 dark:text-red-100 mb-2">
            ⚠️ Critical Issue: Apps are the #1 performance killer for Shopify stores
          </p>
          <p className="text-red-800 dark:text-red-200">
            Every app adds JavaScript, CSS, and often third-party API calls. Stores with 10+ apps can see 3-5 second increases in load time.
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">App Performance Impact Statistics (2025)</h3>
        <ul className="space-y-3 mb-6">
          <li>• Average app adds <strong>50-200KB</strong> of JavaScript</li>
          <li>• Apps run on <strong>every page load</strong>, even if features aren't used on that page</li>
          <li>• Stores with <strong>5+ apps</strong> average 20% slower load times</li>
          <li>• <strong>Review apps, live chat, and popups</strong> are the worst offenders for Core Web Vitals</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4">App Audit Process</h3>

        <div className="space-y-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Step 1: Inventory All Installed Apps</h4>
            <p className="text-sm mb-3">Shopify Admin → Apps → List all installed apps and their purposes</p>
            <ul className="space-y-2 text-sm">
              <li>✓ When was it last actively used?</li>
              <li>✓ Could this be replaced with native Shopify features?</li>
              <li>✓ Could this be replaced with a lighter alternative?</li>
              <li>✓ Is this app essential for business operations?</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Step 2: Measure Performance Impact</h4>
            <p className="text-sm mb-3">Test Core Web Vitals before and after disabling each app:</p>
            <ol className="space-y-2 text-sm">
              <li>1. Get baseline PageSpeed Insights score</li>
              <li>2. Disable one app</li>
              <li>3. Re-test with PageSpeed Insights</li>
              <li>4. Document the performance difference</li>
              <li>5. Repeat for all apps</li>
            </ol>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              You'll likely find 1-2 apps causing most of the performance degradation.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-3">Step 3: Optimize or Replace Heavy Apps</h4>
            <p className="text-sm mb-3">For apps causing significant performance issues:</p>
            <ul className="space-y-2 text-sm">
              <li>• Check if app has "performance mode" or "lite version" settings</li>
              <li>• Contact app developer about performance optimization</li>
              <li>• Research lighter alternatives in Shopify App Store</li>
              <li>• Consider custom development for critical features</li>
              <li>• Remove entirely if benefit doesn't justify performance cost</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Common High-Impact Apps</h3>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">App Type</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Performance Impact</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-left">Optimization Strategy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Review Apps</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-red-50 dark:bg-red-900/20">High (loads reviews, widgets, JavaScript)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Load reviews only on product pages, lazy load below fold</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Live Chat</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-red-50 dark:bg-red-900/20">High (constant background connections)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Delay load until user interaction or page idle</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Popup Builders</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20">Medium-High (large JavaScript bundles)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Use exit-intent triggers, delay display timing</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Currency Converters</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20">Medium (API calls, price recalculation)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Use Shopify Markets instead (native feature)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3"><strong>Analytics Apps</strong></td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 bg-green-50 dark:bg-green-900/20">Low (async loading)</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm">Ensure async loading, consolidate tracking pixels</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-3">App Installation Best Practices</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Always test Core Web Vitals before and after installing new apps</li>
            <li>✓ Check app reviews for mentions of "speed" or "performance"</li>
            <li>✓ Limit app count to essential functions only</li>
            <li>✓ Prefer native Shopify features over third-party apps when available</li>
            <li>✓ Review and remove unused apps quarterly</li>
            <li>✓ Configure apps to load only on relevant pages when possible</li>
          </ul>
        </div>
      </section>

      <section id="implementation-checklist" className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Complete Core Web Vitals Implementation Checklist</h2>

        <p className="mb-6">
          Use this comprehensive checklist to systematically improve your Shopify store's Core Web Vitals:
        </p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-blue-600 mr-3">📊</span> Baseline & Measurement
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Run PageSpeed Insights on homepage, product pages, and collection pages</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Document current LCP, INP, and CLS scores</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Set up Google Search Console monitoring</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Identify pages with "Poor" or "Needs Improvement" status</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-green-600 mr-3">🖼️</span> LCP Optimization
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Convert all images to WebP or AVIF format</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Implement responsive images with srcset for all hero images</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add preload tag for LCP image in theme.liquid</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Optimize hero image file size (target: under 200KB)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Remove or defer render-blocking CSS/JavaScript</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Inline critical above-the-fold CSS</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-purple-600 mr-3">⚡</span> INP Optimization
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Audit and remove unused Shopify apps (especially review, chat, popup apps)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Defer non-critical JavaScript with async or defer attributes</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Break long JavaScript tasks into smaller chunks (&lt;50ms)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Optimize "Add to Cart" button responsiveness (use optimistic UI)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Implement debouncing/throttling for search and filter interactions</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test INP on real mobile devices (not just desktop emulation)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-teal-600 mr-3">📐</span> CLS Optimization
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Add explicit width and height attributes to all images</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Use aspect-ratio CSS for responsive images and embeds</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Reserve space for dynamically loaded content (min-height)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Configure app banners/popups to use fixed overlays (not inline)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Implement font-display: swap for web fonts</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Use transform instead of top/left for animations</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-yellow-600 mr-3">📱</span> Mobile Optimization
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Serve mobile-appropriate image sizes (400-800px width)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Ensure touch targets are at least 44x44px</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test on real mobile devices with throttled 3G/4G</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Minimize JavaScript payload for mobile (code-splitting)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Verify mobile font sizes (minimum 16px)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-red-600 mr-3">🎨</span> Theme & Apps
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Choose performance-optimized theme (Dawn, Refresh, Sense)</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Limit homepage sections to 5-7 maximum</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Audit all installed apps for performance impact</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Remove or replace apps causing significant slowdowns</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Configure apps to load only on relevant pages</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-orange-600 mr-3">🔄</span> Ongoing Monitoring
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Set monthly calendar reminder to check Search Console Core Web Vitals</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Test Core Web Vitals after installing new apps</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Monitor real user data (field data) in addition to lab tests</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Track correlation between Core Web Vitals scores and conversion rates</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span>Quarterly app audit to remove unused installations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="not-prose border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            EP
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Dr. Elena Petrov</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Web Performance Engineer & Core Web Vitals Specialist
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Dr. Petrov holds a Ph.D. in Computer Science from MIT with specialization in web performance optimization. She has optimized Core Web Vitals for Fortune 500 ecommerce sites, authored the "Advanced Web Performance" course for Google Developers, and speaks regularly at Web.dev Live and Chrome Dev Summit. Her research on INP optimization has been cited in Google's official Web Vitals documentation. Elena has helped over 200 Shopify merchants achieve "good" Core Web Vitals scores, resulting in an average 23% increase in organic traffic and 15% improvement in conversion rates.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Certifications:</strong> Google Web Vitals Expert, W3C Web Performance Working Group Member, Shopify Performance Partner
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="not-prose bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mt-12">
        <h2 className="text-3xl font-bold mb-4">Automate Your Core Web Vitals Optimization</h2>
        <p className="text-xl mb-6 opacity-90">
          SEOLOGY.AI automatically detects and fixes Core Web Vitals issues in your Shopify store. Our AI identifies render-blocking resources, optimizes images, implements lazy loading, and more - all without manual coding.
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">47%</div>
              <div className="text-sm opacity-90">Of sites fail Core Web Vitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">7%</div>
              <div className="text-sm opacity-90">Conversion loss per 100ms delay</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">60%+</div>
              <div className="text-sm opacity-90">Mobile traffic in 2026</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/dashboard/onboarding"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors text-center"
          >
            Start Free 14-Day Trial →
          </a>
          <a
            href="/demo"
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/30 transition-colors text-center border-2 border-white/50"
          >
            Watch Live Demo
          </a>
        </div>
        <p className="text-sm mt-4 opacity-75">
          ✓ No credit card required  ✓ Full access to all features  ✓ Join 5,000+ Shopify merchants
        </p>
      </section>

      {/* Final CTA */}
      <section className="not-prose mt-12 text-center border-t border-gray-200 dark:border-gray-700 pt-8">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          <strong>December 2025 Special:</strong> Get 20% off your first 3 months when you optimize your store's Core Web Vitals with SEOLOGY.AI
        </p>
        <a
          href="/pricing"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          View Pricing & Plans
        </a>
      </section>
    </article>
  )
}
