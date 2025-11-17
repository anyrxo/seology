export const metadata: Metadata = {
  title: 'Shopify Page Speed Optimization: 17 Proven Tactics for 2025',
  description: 'Slow Shopify stores lose 40% of visitors. These 17 tactics guarantee sub-2s load times and higher conversions.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'shopify-page-speed-optimization').slice(0, 4)

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
            <span>Shopify Page Speed Optimization</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Shopify Page Speed Optimization: 17 Proven Tactics for 2025
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>December 25, 2024</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Slow Shopify stores lose <strong className="text-white">40% of visitors</strong>. These 17 tactics guarantee sub-2s load times and higher conversions.
          </p>

          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Optimize Your Shopify Store
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
                Shopify stores average 3.5-4.5 second load times—way too slow. Every <strong>100ms delay</strong> costs you 7% in conversions. This guide covers 17 proven tactics to get your Shopify store under 2 seconds: image optimization, code minification, app auditing, lazy loading, CDN setup, and more. SEOLOGY automates most of these optimizations for you.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Shopify Speed Matters</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Page speed isn't just a nice-to-have—it directly impacts revenue:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                    <div className="text-4xl font-bold text-red-600 mb-2">53%</div>
                    <div className="text-slate-700">Of mobile users abandon sites taking 3+ seconds to load</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
                    <div className="text-4xl font-bold text-orange-600 mb-2">7%</div>
                    <div className="text-slate-700">Conversion loss per 100ms delay</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-6 rounded-xl border border-yellow-200">
                    <div className="text-4xl font-bold text-yellow-600 mb-2">$2.6B</div>
                    <div className="text-slate-700">Annual revenue lost to slow page loads (Amazon study)</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">1st</div>
                    <div className="text-slate-700">Page speed is a confirmed Google ranking factor</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 17 Shopify Speed Optimization Tactics</h2>

                <h3 className="text-2xl font-bold mb-4 mt-8">Image Optimization (5 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. Compress All Images</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Uncompressed images are the #1 cause of slow Shopify stores.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Use TinyPNG or ImageOptim to compress images 60-80% with no visible quality loss.
                    </p>
                    <p className="text-slate-700">
                      <strong>Target:</strong> Product images under 100KB, hero images under 200KB.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Use WebP Format</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> JPG/PNG files are 25-35% larger than WebP.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Convert all images to WebP format (Shopify supports it natively).
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> 30% faster image loading with identical visual quality.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. Implement Lazy Loading</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Loading all images immediately slows initial page render.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Add loading="lazy" attribute to below-the-fold images.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Images load only when user scrolls to them—40% faster initial load.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Use Responsive Images</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Mobile users download full desktop-sized images.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Use srcset to serve appropriately sized images per device.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Mobile users download 70% smaller images.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. Optimize Image Dimensions</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Uploading 4000px images then displaying them at 400px wastes bandwidth.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Resize images to their maximum display size before uploading.
                    </p>
                    <p className="text-slate-700">
                      <strong>Target:</strong> Product images 1200px max, thumbnails 400px max.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-8">Code & Scripts (4 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Minify CSS & JavaScript</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Unminified code contains whitespace, comments, unnecessary characters.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Use Shopify's built-in minification or apps like MinifyCode.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> 20-30% smaller file sizes = faster downloads.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. Defer Non-Critical JavaScript</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> JavaScript blocks page rendering until fully loaded.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Add async or defer attributes to non-essential scripts.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Page becomes interactive 1-2 seconds faster.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. Remove Unused CSS</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Shopify themes include CSS for features you don't use.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Audit with Chrome DevTools Coverage tool, remove unused styles.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Reduce CSS file size by 40-60%.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">9. Reduce Third-Party Scripts</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Each app adds tracking scripts, slowing your store.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Audit apps monthly—uninstall unused ones, consolidate overlapping tools.
                    </p>
                    <p className="text-slate-700">
                      <strong>Target:</strong> Keep under 10 apps for optimal speed.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-8">Theme & Architecture (4 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">10. Choose a Fast Theme</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Bloated themes with fancy animations are slow.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Use lightweight themes like Dawn (Shopify's default) or Impulse.
                    </p>
                    <p className="text-slate-700">
                      <strong>Benchmark:</strong> Test theme demo speed with Google PageSpeed Insights before purchasing.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">11. Limit Product Variants</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> 100+ variants on one page slow down rendering.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Split products with many variants into separate listings.
                    </p>
                    <p className="text-slate-700">
                      <strong>Target:</strong> Under 50 variants per product page.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">12. Optimize Shopify Liquid Code</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Inefficient Liquid loops slow server rendering.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Cache repeated queries, minimize nested loops, use pagination.
                    </p>
                    <p className="text-slate-700">
                      <strong>Tip:</strong> Hire a Shopify expert if you're not comfortable editing Liquid.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">13. Enable Preloading for Key Resources</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Browser doesn't know which resources to prioritize.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Add &lt;link rel="preload"&gt; for critical CSS, fonts, hero images.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Critical resources load 200-500ms faster.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-8">Hosting & Network (4 Tactics)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">14. Use Shopify CDN</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Good news:</strong> Shopify includes free CDN for all stores.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Tip:</strong> Ensure your assets (images, CSS, JS) are served from cdn.shopify.com.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> 40-60% faster load times for international visitors.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">15. Enable HTTP/2</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Good news:</strong> Shopify uses HTTP/2 by default.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Verify:</strong> Check with tools like KeyCDN HTTP/2 Test.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Parallel resource loading = 30% faster page loads.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">16. Implement Browser Caching</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Returning visitors re-download unchanged resources.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Shopify sets cache headers automatically, but verify with GTmetrix.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Repeat visitors experience 2-3x faster loads.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">17. Reduce DNS Lookups</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Each third-party domain (fonts, analytics, apps) requires DNS lookup.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Limit external domains, use dns-prefetch for essential ones.
                    </p>
                    <p className="text-slate-700">
                      <strong>Target:</strong> Under 10 external domains total.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Shopify Speed Benchmarks</h2>
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-4 text-left">Metric</th>
                        <th className="border border-slate-300 p-4 text-left">Poor</th>
                        <th className="border border-slate-300 p-4 text-left">Average</th>
                        <th className="border border-slate-300 p-4 text-left">Good</th>
                        <th className="border border-slate-300 p-4 text-left">Excellent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>LCP (Largest Contentful Paint)</strong></td>
                        <td className="border border-slate-300 p-4 bg-red-50">4+ seconds</td>
                        <td className="border border-slate-300 p-4 bg-yellow-50">2.5-4s</td>
                        <td className="border border-slate-300 p-4 bg-green-50">1.2-2.5s</td>
                        <td className="border border-slate-300 p-4 bg-green-100">&lt; 1.2s</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>FID (First Input Delay)</strong></td>
                        <td className="border border-slate-300 p-4 bg-red-50">300+ ms</td>
                        <td className="border border-slate-300 p-4 bg-yellow-50">100-300ms</td>
                        <td className="border border-slate-300 p-4 bg-green-50">50-100ms</td>
                        <td className="border border-slate-300 p-4 bg-green-100">&lt; 50ms</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>CLS (Cumulative Layout Shift)</strong></td>
                        <td className="border border-slate-300 p-4 bg-red-50">0.25+</td>
                        <td className="border border-slate-300 p-4 bg-yellow-50">0.1-0.25</td>
                        <td className="border border-slate-300 p-4 bg-green-50">0.05-0.1</td>
                        <td className="border border-slate-300 p-4 bg-green-100">&lt; 0.05</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Total Page Size</strong></td>
                        <td className="border border-slate-300 p-4 bg-red-50">5+ MB</td>
                        <td className="border border-slate-300 p-4 bg-yellow-50">2-5 MB</td>
                        <td className="border border-slate-300 p-4 bg-green-50">1-2 MB</td>
                        <td className="border border-slate-300 p-4 bg-green-100">&lt; 1 MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Tools to Measure Shopify Speed</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Google PageSpeed Insights:</strong> Official Google tool showing Core Web Vitals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>GTmetrix:</strong> Detailed waterfall charts and optimization recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>WebPageTest:</strong> Advanced testing with real browsers and multiple locations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Shopify Speed Analyzer:</strong> Built-in speed report in Shopify admin → Online Store → Themes</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Optimizes Shopify Speed Automatically</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY automates most speed optimizations:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically compresses and converts images to WebP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Implements lazy loading for all below-the-fold images</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Minifies CSS and JavaScript automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Removes unused CSS and scripts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors Core Web Vitals 24/7 and alerts to issues</span>
                  </li>
                </ul>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Speed Up Your Shopify Store Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join 2,000+ Shopify stores using SEOLOGY to achieve sub-2s load times and higher conversions.
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
                  <li><Link href="/blog/shopify-seo-optimization-guide-2025" className="text-blue-600 hover:text-blue-800">Shopify SEO Optimization Guide 2025</Link></li>
                  <li><Link href="/blog/technical-seo-audit-checklist-2025" className="text-blue-600 hover:text-blue-800">Technical SEO Audit Checklist 2025</Link></li>
                  <li><Link href="/blog/ecommerce-seo-strategy-2025" className="text-blue-600 hover:text-blue-800">Ecommerce SEO Strategy 2025</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #PageSpeed #ShopifyOptimization #WebPerformance #Shopify #CoreWebVitals
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
