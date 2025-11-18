import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Search Console Mastery: Extract Every SEO Insight',
  description: 'Most people waste 90% of Search Console data. This guide unlocks every insight to boost rankings and traffic.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['google-analytics-4-seo-tracking', 'technical-seo-audit-checklist-2025', 'keyword-research-strategy-2025'].includes(post.slug)
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
            <span>Google Search Console Mastery</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Google Search Console Mastery: Extract Every SEO Insight
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>September 3, 2024</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Most people waste <strong className="text-white">90% of Search Console data</strong>. This guide unlocks every insight to boost rankings and traffic.
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
                Google Search Console is <strong>the most underutilized SEO tool</strong>. It contains exact keyword data, performance metrics, and technical issues--but most people only scratch the surface. This guide shows advanced Search Console tactics that found $2.7M in hidden SEO opportunities for our clients.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Search Console Beats Every Other SEO Tool</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Third-party SEO tools estimate data. Search Console reports <strong>actual Google data</strong>:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Real keyword rankings:</strong> Every query your site appears for in Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Exact impressions and clicks:</strong> No estimates--direct from Google\'s index</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>CTR by position:</strong> See how your title tags and meta descriptions perform</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Technical issues first:</strong> Google tells you exactly what needs fixing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Mobile vs desktop data:</strong> Separate performance metrics by device</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  If you\'re paying $200/month for an SEO tool but ignoring Search Console, you\'re wasting money.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Performance Report: Advanced Query Analysis</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  The Performance report contains goldmines most people miss. Here\'s how to extract maximum value:
                </p>

                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Find "Quick Win" Keywords:</strong>
                      <p className="text-slate-700 mt-1">Filter for Position 11-20 with 1,000+ impressions. These keywords are one optimization away from page one. Low-hanging fruit that drives instant traffic.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Identify CTR Underperformers:</strong>
                      <p className="text-slate-700 mt-1">Export data, calculate expected CTR by position, find pages performing 30%+ below average. These need title tag and meta description rewrites immediately.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Discover Content Gaps:</strong>
                      <p className="text-slate-700 mt-1">Use Query filter with "how, what, why, when" to find questions you\'re ranking for but don\'t fully answer. Expand content to capture featured snippets.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Track Cannibalization Issues:</strong>
                      <p className="text-slate-700 mt-1">Filter by specific query → compare Pages tab. If 2+ pages rank for the same keyword, you\'re competing with yourself. Consolidate or differentiate.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Monitor Brand vs Non-Brand:</strong>
                      <p className="text-slate-700 mt-1">Use Query filter to separate branded searches. True SEO success comes from non-branded keyword growth. Track both separately.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Coverage Report: Fix Indexing Issues</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The Coverage report shows which pages Google can and can\'t index. Critical issues to address:
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">16mo</div>
                    <div className="text-slate-700">Data retention in Search Console</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">1000</div>
                    <div className="text-slate-700">Max rows exportable per query</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">48hr</div>
                    <div className="text-slate-700">Average indexing delay</div>
                  </div>
                </div>

                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Submitted URL not indexed:</strong> Your priority pages aren\'t indexed. Check robots.txt, noindex tags, and canonical issues.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Crawled - currently not indexed:</strong> Google crawled but decided not to index. Usually thin content or duplicate content issues.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Discovered - currently not indexed:</strong> Google found URLs but hasn\'t crawled. Improve internal linking to these pages.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Soft 404:</strong> Page returns 200 status but Google thinks it\'s an error page. Add real content or return proper 404.</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Core Web Vitals: Performance Optimization</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Core Web Vitals are ranking factors. Search Console shows real-world performance data:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>LCP (Largest Contentful Paint):</strong> Must be under 2.5s. Optimize images, server response time, and render-blocking resources.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>FID (First Input Delay):</strong> Must be under 100ms. Reduce JavaScript execution time and eliminate long tasks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>CLS (Cumulative Layout Shift):</strong> Must be under 0.1. Reserve space for images, ads, and embeds to prevent layout shifts.</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Fix URLs showing "Poor" status first--these lose rankings to faster competitors.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Mobile Usability: Avoid Mobile Penalties</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Google uses mobile-first indexing. Mobile usability issues directly impact rankings:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Text too small to read:</strong> Font size must be 16px minimum on mobile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Clickable elements too close:</strong> Buttons need 48px touch targets with spacing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Content wider than screen:</strong> Disable horizontal scrolling with proper viewport settings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Viewport not set:</strong> Add <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code></span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Advanced Search Console Tactics</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Pro strategies for extracting maximum value from Search Console:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Compare Date Ranges:</strong> Click "Compare" to see traffic changes after algorithm updates or site changes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Export to Google Sheets:</strong> Connect Search Console API for automated reporting beyond 1,000 row limit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Filter by Search Appearance:</strong> See which pages have rich results (AMP, video, FAQ schema)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Monitor Manual Actions:</strong> Check weekly--manual penalties tank rankings instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use URL Inspection Tool:</strong> Test live pages before requesting indexing to catch errors</span>
                  </li>
                </ul>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">SEOLOGY Monitors Search Console 24/7</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically analyzes your Search Console data, identifies opportunities, and fixes issues before they impact rankings. Stop manually checking Search Console.
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
                  <strong>Tags:</strong> #SearchConsole #GSC #SEOTools
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
