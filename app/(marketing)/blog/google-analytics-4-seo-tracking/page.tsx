import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Google Analytics 4 for SEO: Complete Tracking & Reporting Guide',
  description: 'GA4 changes everything for SEO tracking. This guide shows how to track rankings, traffic, and conversions in the new GA4.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['google-search-console-mastery-2025', 'seo-roi-calculator-guide', 'conversion-rate-optimization-seo'].includes(post.slug)
  )
  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Google Analytics 4 for SEO</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Google Analytics 4 for SEO: Complete Tracking & Reporting Guide
          </h1>
          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>September 5, 2024</span>
          </div>
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            GA4 changes everything for SEO tracking. This guide shows how to track <strong className="text-white">rankings, traffic, and conversions</strong> in the new GA4.
          </p>
          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try SEOLOGY Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* TL;DR Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <p className="text-slate-700 mb-0">
                Universal Analytics is dead. GA4 is mandatory but completely different. This guide shows exactly how to set up <strong>GA4 for SEO tracking</strong>--custom events, conversion tracking, organic performance reports, and attribution models that prove SEO ROI. Stop flying blind in GA4.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why GA4 Changes Everything for SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  GA4 isn\'t just an upgrade--it\'s a complete rebuild. For SEO professionals, this means:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Event-based tracking replaces sessions:</strong> More accurate user behavior data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Machine learning predictions:</strong> AI-powered insights on conversion probability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Cross-platform tracking:</strong> Follow users across devices and platforms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Privacy-first architecture:</strong> Works without cookies in many scenarios</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Custom reports rebuilt from scratch:</strong> Old reports are gone--you must recreate them</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The bad news? Your old GA setup doesn\'t transfer. The good news? GA4 is more powerful for proving SEO ROI.
                </p>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Essential GA4 Setup for SEO Tracking</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Link Search Console:</strong>
                      <p className="text-slate-700 mt-1">Admin → Product Links → Search Console Links. This imports keyword data, rankings, and impressions into GA4. Without this link, you\'re missing 80% of SEO insights.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Enable Enhanced Measurement:</strong>
                      <p className="text-slate-700 mt-1">Admin → Data Streams → Enhanced Measurement. Turn on scroll tracking, outbound clicks, site search, video engagement, and file downloads. These are critical for understanding organic traffic behavior.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Set Up Conversions:</strong>
                      <p className="text-slate-700 mt-1">Configure → Events → Mark as Conversion. Define what counts as a conversion: form submissions, purchases, sign-ups, phone clicks. GA4 won\'t track conversions unless you explicitly mark events.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Create Traffic Source Dimensions:</strong>
                      <p className="text-slate-700 mt-1">Configure → Custom Definitions → Create Dimension. Add custom dimensions for organic landing pages, organic keywords (from Search Console), and first/last click attribution.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Configure Data Retention:</strong>
                      <p className="text-slate-700 mt-1">Admin → Data Settings → Data Retention. Change from 2 months to 14 months (maximum). This allows historical analysis for year-over-year SEO comparisons.</p>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Critical SEO Reports to Build in GA4</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  GA4 doesn\'t have pre-built SEO reports. You must create custom reports. Here are the essential ones:
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">7</div>
                    <div className="text-slate-700">Essential custom SEO reports to build</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">14</div>
                    <div className="text-slate-700">Months of data retention (maximum)</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">24hr</div>
                    <div className="text-slate-700">Data processing delay in GA4</div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Must-Build Reports:</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Organic Landing Page Performance:</strong> Shows which pages drive organic traffic and conversions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Organic Keyword Report:</strong> Integrates Search Console data to show rankings and CTR</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Organic Conversion Paths:</strong> Shows how organic visitors move through your funnel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>SEO ROI Report:</strong> Tracks revenue generated specifically from organic search</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Organic vs Paid Comparison:</strong> Compares SEO and PPC performance side-by-side</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Custom Events for SEO Tracking</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  GA4\'s power comes from custom event tracking. Here are SEO-specific events to implement:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>organic_form_submit:</strong> Track form completions from organic traffic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>organic_purchase:</strong> Tag ecommerce transactions from SEO</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>internal_search_organic:</strong> Track what organic visitors search on-site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>engaged_organic_session:</strong> Sessions with 10+ seconds and 2+ page views</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>organic_cta_click:</strong> Track CTA clicks from organic visitors</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">GA4 Explorations for Deep SEO Analysis</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Explorations are GA4\'s advanced analysis tool. Use these templates for SEO:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Funnel Exploration:</strong> Visualize drop-off points in organic conversion funnels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Path Exploration:</strong> See the exact page sequences organic visitors follow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Segment Overlap:</strong> Compare behavior of different organic traffic segments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Cohort Analysis:</strong> Track how organic traffic behavior changes over time</span>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Common GA4 SEO Tracking Mistakes</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Avoid these errors that corrupt GA4 SEO data:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Not filtering internal traffic:</strong> Your team\'s visits skew organic metrics. Create an internal traffic filter.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Ignoring referral exclusions:</strong> Payment processors show as referrals, breaking organic attribution.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Not enabling Google Signals:</strong> Misses cross-device tracking for organic visitors.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Forgetting bot filtering:</strong> Enable bot filtering to remove crawler traffic from reports.</span>
                  </li>
                </ul>
                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Track SEO Performance Automatically with SEOLOGY</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY integrates with GA4 to automatically track SEO fixes, measure impact, and prove ROI. No manual tagging or custom reports needed.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Try SEOLOGY Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  {relatedPosts.map(post => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #GA4 #GoogleAnalytics #SEOTracking
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* Related Posts */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-sm text-blue-400 mb-2">{post.date}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}