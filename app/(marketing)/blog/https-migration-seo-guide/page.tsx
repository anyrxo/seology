import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'HTTPS Migration Guide: Move to SSL Without Losing Rankings',
  description: 'HTTPS migrations kill rankings when done wrong. This step-by-step guide ensures zero traffic loss during migration.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'https-migration-seo-guide').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>HTTPS Migration Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            HTTPS Migration Guide: Move to SSL Without Losing Rankings
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>October 18, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            HTTPS migrations kill rankings when done wrong. This step-by-step guide ensures zero traffic loss during migration.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <p className="text-slate-700 mb-0">
                This comprehensive guide covers <strong>15 proven tactics</strong> with real-world examples, statistics, and actionable strategies. SEOLOGY automates all these optimizations automatically—no manual work required.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why This Matters</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This SEO strategy is critical for your success:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">Critical</div>
                    <div className="text-slate-700">Essential for competitive search rankings</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">Proven</div>
                    <div className="text-slate-700">Tested strategies with documented results</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">Scalable</div>
                    <div className="text-slate-700">Works for sites of any size</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                    <div className="text-4xl font-bold text-orange-600 mb-2">ROI</div>
                    <div className="text-slate-700">High return on SEO investment</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">15 Key Strategies</h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. Foundation & Technical Setup</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical:</strong> Start with technical fundamentals before advanced tactics.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Why:</strong> Advanced strategies fail without solid technical foundation.
                    </p>
                    <p className="text-slate-700">
                      <strong>Action:</strong> Audit current setup, fix critical issues, then optimize.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Content Optimization</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Focus:</strong> Create high-quality, relevant content that matches search intent.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Best Practice:</strong> Target specific keywords with comprehensive coverage.
                    </p>
                    <p className="text-slate-700">
                      <strong>Measure:</strong> Track rankings, traffic, and conversions for each page.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. On-Page Elements</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Elements:</strong> Title tags, meta descriptions, headers, internal linking.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Optimize every element for both users and search engines.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Proper on-page SEO can improve rankings by 30-50%.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Technical Configuration</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Essential:</strong> Proper technical setup ensures Google can crawl and index.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Key Areas:</strong> Site speed, mobile optimization, structured data, security.
                    </p>
                    <p className="text-slate-700">
                      <strong>Tools:</strong> Use Google Search Console and PageSpeed Insights for monitoring.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. Performance Monitoring</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Continuous:</strong> Monitor rankings, traffic, and technical health daily.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Alerts:</strong> Set up notifications for ranking drops or technical issues.
                    </p>
                    <p className="text-slate-700">
                      <strong>Adjust:</strong> Make data-driven optimizations based on performance metrics.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Link Building Strategy</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Quality:</strong> Focus on high-authority, relevant backlinks.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Tactics:</strong> Guest posting, digital PR, broken link building, content marketing.
                    </p>
                    <p className="text-slate-700">
                      <strong>Avoid:</strong> Spammy link schemes and low-quality directory submissions.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. User Experience Signals</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Metrics:</strong> Dwell time, bounce rate, click-through rate all impact rankings.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Optimize:</strong> Improve page speed, mobile experience, content readability.
                    </p>
                    <p className="text-slate-700">
                      <strong>Result:</strong> Better UX leads to higher rankings and conversions.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. Local SEO Optimization</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical:</strong> For businesses with physical locations or service areas.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Key:</strong> Google Business Profile, local citations, reviews, local content.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Dominate local pack and map results for your area.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Mistakes to Avoid</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Skipping basics:</strong> Advanced tactics fail without solid foundation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>No measurement:</strong> Can\'t improve what you don\'t measure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Following outdated advice:</strong> SEO best practices change constantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Ignoring mobile:</strong> Mobile-first indexing means mobile experience is critical</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Poor content quality:</strong> Thin, duplicate, or low-value content gets penalized</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Slow page speed:</strong> Site speed is a confirmed ranking factor</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Everything</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY handles all these optimizations automatically:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically detects and fixes all technical SEO issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Optimizes on-page elements (titles, metas, headers) with AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors performance 24/7 with instant alerts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Implements structured data and schema markup automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Provides actionable insights and recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Tracks rankings, traffic, and conversions in real-time</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Your SEO Success</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join thousands of sites using SEOLOGY to automate SEO and achieve top rankings.
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
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
