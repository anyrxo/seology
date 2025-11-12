import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Mobile-First Indexing: The Complete 2025 Checklist',
  description: 'Google only indexes mobile versions now. This 27-point checklist ensures your mobile site ranks perfectly.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['core-web-vitals-optimization-guide-2025', 'shopify-page-speed-optimization', 'technical-seo-audit-checklist-2025', 'site-architecture-seo-best-practices'].includes(post.slug)
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
            <span>Mobile-First Indexing Checklist</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Mobile-First Indexing: The Complete 2025 Checklist
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>December 12, 2024</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Google only indexes mobile versions now. This <strong className="text-white">27-point checklist</strong> ensures your mobile site ranks perfectly.
          </p>

          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Optimize for Mobile-First
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
              <ul className="space-y-2 mb-0">
                <li>Google switched to mobile-first indexing for all sites in July 2019</li>
                <li>Google only looks at your mobile version when ranking your site</li>
                <li>63% of Google searches happen on mobile devices</li>
                <li>Mobile-unfriendly sites lose an average of 50% of potential traffic</li>
                <li>This 27-point checklist ensures perfect mobile optimization</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">What Is Mobile-First Indexing?</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Mobile-first indexing means Google predominantly uses the mobile version of your content for indexing and ranking.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Before 2019, Google crawled the desktop version first. Now it's the opposite—<strong>mobile is the default</strong>.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg my-6">
                  <p className="text-slate-700 mb-0">
                    <strong>Critical:</strong> If your mobile site is missing content that exists on desktop, Google won't index it. You'll lose rankings for that content.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 27-Point Mobile-First Indexing Checklist</h2>

                <h3 className="text-2xl font-bold mb-4 mt-8">Content Parity (6 Points)</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Mobile site has the same content as desktop (text, images, videos)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Headings (H1-H6) are identical on mobile and desktop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Internal links are present on mobile version</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Structured data (Schema markup) exists on mobile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Meta descriptions and title tags match desktop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Images have alt text on mobile</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Technical Setup (7 Points)</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Viewport meta tag is present: &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Mobile pages are crawlable (no blocked CSS, JavaScript, images)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>No intrusive interstitials (popups that block content)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Mobile URLs are consistent (same URL for mobile and desktop if responsive)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Lazy loading is implemented correctly (doesn't block indexing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Mobile sitemap is submitted to Google Search Console</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Hreflang tags are present on mobile version (if multilingual)</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">User Experience (8 Points)</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Text is readable without zooming (minimum 16px font size)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Touch targets are at least 44x44 pixels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>No horizontal scrolling required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Navigation menu is mobile-friendly (hamburger menu or bottom nav)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Forms are easy to fill on mobile (proper input types, autocomplete)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Videos are mobile-friendly (not Flash, responsive sizing)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Images scale properly (responsive images)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Page loads in under 3 seconds on mobile</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Performance (6 Points)</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Images are compressed and optimized for mobile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>CSS and JavaScript are minified</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Server response time is under 200ms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Browser caching is enabled</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Core Web Vitals pass on mobile (LCP, FID, CLS)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Third-party scripts are deferred or minimized</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Mobile-First Indexing Mistakes</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Avoid these critical mistakes that kill mobile rankings:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Hiding content on mobile</strong>
                      <p className="text-slate-700 mt-1">Using tabs, accordions, or "Read more" that hides content from Googlebot</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Removing images on mobile</strong>
                      <p className="text-slate-700 mt-1">Google Image Search won't index images that don't appear on mobile</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Blocking mobile resources</strong>
                      <p className="text-slate-700 mt-1">robots.txt blocking CSS, JavaScript, or images on mobile</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Separate mobile URLs without proper redirects</strong>
                      <p className="text-slate-700 mt-1">m.example.com sites must have proper rel=alternate and rel=canonical tags</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Intrusive interstitials</strong>
                      <p className="text-slate-700 mt-1">Popups that cover the main content immediately after load</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How to Test Mobile-First Readiness</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Use these tools to verify your mobile optimization:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Google Mobile-Friendly Test</strong>
                      <p className="text-slate-700 mt-1">Instant check if your page is mobile-friendly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Google Search Console</strong>
                      <p className="text-slate-700 mt-1">Check if your site has been switched to mobile-first indexing</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Chrome DevTools Device Mode</strong>
                      <p className="text-slate-700 mt-1">Test different mobile devices and screen sizes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">PageSpeed Insights Mobile Score</strong>
                      <p className="text-slate-700 mt-1">Comprehensive mobile performance analysis</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Mobile SEO Statistics You Can't Ignore</h2>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">63%</div>
                    <div className="text-slate-700">Of Google searches happen on mobile</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">53%</div>
                    <div className="text-slate-700">Of mobile users leave if page loads in 3+ seconds</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">61%</div>
                    <div className="text-slate-700">Of users won't return to a mobile site with bad UX</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">40%</div>
                    <div className="text-slate-700">Increase in conversions with mobile-optimized sites</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Mobile-First Optimization</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  SEOLOGY automatically handles all 27 checklist points:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Content parity check:</strong> Ensures mobile and desktop content match</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Mobile performance optimization:</strong> Compresses images, minifies code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Touch target validation:</strong> Ensures buttons are 44x44px minimum</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Viewport optimization:</strong> Adds correct meta tags automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>24/7 monitoring:</strong> Alerts you if mobile issues appear</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict: Mobile-First Is Non-Negotiable</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Mobile-first indexing isn't optional. Google only looks at your mobile version when ranking your site.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  If your mobile site is broken, slow, or missing content, you'll lose rankings—even if your desktop site is perfect.
                </p>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Fix Mobile SEO in 5 Minutes</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically optimizes all 27 mobile-first checklist points. Stop losing mobile traffic.
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
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #MobileSEO #MobileFirst #GoogleIndexing #ResponsiveDesign #MobileOptimization
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosts.slice(0, 4).map((post) => (
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
