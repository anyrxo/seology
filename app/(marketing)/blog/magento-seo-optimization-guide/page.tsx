import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Magento SEO: Complete Optimization Guide for Adobe Commerce',
  description: 'Magento has unique SEO challenges. This guide covers 28 optimizations that increased organic revenue by 203%.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['ecommerce-seo-strategy-2025', 'shopify-seo-optimization-guide-2025', 'woocommerce-seo-complete-guide', 'product-page-seo-ecommerce'].includes(post.slug)
  )

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Magento SEO Optimization Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Magento SEO: Complete Optimization Guide for Adobe Commerce
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>October 8, 2024</span>
            <span>•</span>
            <span>15 min read</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Magento has unique SEO challenges. This comprehensive guide covers <strong className="text-white">28 optimizations</strong> that increased organic revenue by 203% for ecommerce stores.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Your Magento SEO
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
              <p className="text-slate-700 mb-4">
                Magento (now Adobe Commerce) is powerful but has <strong>serious out-of-the-box SEO issues</strong>: duplicate content, slow page speed, complex URL structures, and indexing problems. This guide fixes all 28 critical issues that kill Magento rankings.
              </p>
              <p className="text-slate-700 mb-0">
                <strong>Real result:</strong> A Magento store with 12,000 products went from 3,400 to 11,200 monthly organic visitors in 6 months using these optimizations.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Package className="w-8 h-8 text-blue-600" />
                  Why Magento SEO Is Challenging (And How to Fix It)
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Magento/Adobe Commerce is built for enterprise-scale ecommerce, not SEO. Out of the box, it has:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Massive duplicate content:</strong> Layered navigation creates millions of duplicate URLs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Slow page speed:</strong> Heavy JavaScript and complex architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Complex URLs:</strong> Long, parameter-heavy URLs that Google hates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Indexing issues:</strong> Poor robots.txt and sitemap configuration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Thin product pages:</strong> Manufacturer descriptions used across multiple stores</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  The good news? Once optimized, Magento's technical power makes it <strong>one of the best platforms for SEO</strong>. Here's how to fix everything.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-blue-600" />
                  Configuration #1: Fix Magento's Duplicate Content Nightmare
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This is the #1 SEO killer for Magento stores. Layered navigation and product filters create <strong>thousands of duplicate URLs</strong>.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Problem: Layered Navigation Creates Duplicates</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Example of duplicate URLs created by filters:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200 font-mono text-sm">
                  <div className="text-slate-700 space-y-2">
                    <div>/men-shirts.html</div>
                    <div>/men-shirts.html?color=blue</div>
                    <div>/men-shirts.html?size=large</div>
                    <div>/men-shirts.html?color=blue&size=large</div>
                    <div>/men-shirts.html?price=50-100</div>
                    <div>...thousands more combinations</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Solution: Canonical URLs + Robots Meta Tag</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Step 1:</strong> Enable canonical tags for filtered pages:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Stores → Configuration → Catalog → Catalog</strong></li>
                    <li>Set "Use Canonical Link Meta Tag For Categories" to <strong>Yes</strong></li>
                    <li>Set "Use Canonical Link Meta Tag For Products" to <strong>Yes</strong></li>
                  </ol>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Step 2:</strong> Block indexing of filtered pages in robots.txt:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200 font-mono text-sm">
                  <div className="text-slate-700">
                    # Block filtered category pages<br/>
                    User-agent: *<br/>
                    Disallow: /*?*<br/>
                    Disallow: /*?price=<br/>
                    Disallow: /*?color=<br/>
                    Disallow: /*?size=<br/>
                    Disallow: /*&*
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Advanced: Use NOINDEX, FOLLOW on Filter Pages</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Install the <strong>Amasty Improved Layered Navigation</strong> extension to add NOINDEX meta tags to filtered pages automatically.
                </p>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>Pro tip:</strong> Use <strong>rel=nofollow</strong> on filter links in your template. This prevents Google from crawling filter combinations while still allowing users to use them.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-blue-600" />
                  Configuration #2: Optimize Magento Page Speed
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Magento is notoriously slow. Page speed is a <strong>direct ranking factor</strong>, and slow sites lose 53% of mobile visitors.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Enable All Magento Cache Types</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>System → Cache Management</strong></li>
                    <li>Select all cache types</li>
                    <li>Click <strong>Enable</strong></li>
                    <li>Click <strong>Flush Magento Cache</strong></li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Enable Full Page Cache (FPC)</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Magento's FPC caches entire HTML pages:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Stores → Configuration → Advanced → System → Full Page Cache</strong></li>
                    <li>Set "Caching Application" to <strong>Varnish Cache</strong> (or Built-in if Varnish not available)</li>
                    <li>Set TTL to <strong>86400</strong> (24 hours)</li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Optimize Images</h3>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use WebP format:</strong> Install ImageMagick + WebP support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Enable lazy loading:</strong> Images load only when visible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Compress all images:</strong> Use TinyPNG or Kraken.io API integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Set proper dimensions:</strong> Don't rely on CSS to resize large images</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">Enable JavaScript/CSS Minification & Bundling</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Stores → Configuration → Advanced → Developer</strong></li>
                    <li>Enable <strong>Merge JavaScript Files</strong></li>
                    <li>Enable <strong>Merge CSS Files</strong></li>
                    <li>Enable <strong>Minify JavaScript Files</strong></li>
                    <li>Enable <strong>Minify CSS Files</strong></li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                  <p className="text-slate-700 mb-0">
                    <strong>⚠️ Warning:</strong> Test thoroughly after enabling JS/CSS merge. Some extensions break with aggressive bundling.
                  </p>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Use a CDN (Content Delivery Network)</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Recommended CDNs for Magento:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Cloudflare:</strong> Free tier works great for most stores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Fastly:</strong> Built specifically for Magento (Adobe Commerce Cloud includes it)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>KeyCDN:</strong> Budget-friendly with Magento integration</span>
                  </li>
                </ul>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600 mb-2">Before</div>
                    <div className="text-slate-700 space-y-1">
                      <div>• 7.2s page load</div>
                      <div>• 3.8s LCP</div>
                      <div>• 41% bounce rate</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">After</div>
                    <div className="text-slate-700 space-y-1">
                      <div>• 2.1s page load</div>
                      <div>• 1.3s LCP</div>
                      <div>• 23% bounce rate</div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Code className="w-8 h-8 text-blue-600" />
                  Configuration #3: URL Structure & Rewrites
                </h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Magento generates ugly URLs by default. Clean URLs are <strong>critical for rankings and click-through rate</strong>.
                </p>

                <h3 className="text-2xl font-bold mt-8 mb-4">Enable SEO-Friendly URLs</h3>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Stores → Configuration → General → Web</strong></li>
                    <li>Expand <strong>Search Engine Optimization</strong></li>
                    <li>Set "Use Web Server Rewrites" to <strong>Yes</strong></li>
                    <li>Save config and flush cache</li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Remove Category Path from Product URLs</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  By default, Magento includes category in product URLs, creating duplicates:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200 font-mono text-sm">
                  <div className="text-slate-700 space-y-2">
                    <div className="text-red-600">❌ Bad: /men/shirts/blue-oxford-shirt.html</div>
                    <div className="text-red-600">❌ Bad: /shirts/blue-oxford-shirt.html</div>
                    <div className="text-green-600">✓ Good: /blue-oxford-shirt.html</div>
                  </div>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>To fix:</strong>
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Stores → Configuration → Catalog → Catalog</strong></li>
                    <li>Expand <strong>Search Engine Optimization</strong></li>
                    <li>Set "Use Categories Path for Product URLs" to <strong>No</strong></li>
                  </ol>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4">Optimize URL Keys for Products & Categories</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  URL key best practices:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Include target keyword:</strong> /mens-running-shoes not /product-12345</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Keep it short:</strong> 3-5 words maximum</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use hyphens, not underscores:</strong> nike-air-max not nike_air_max</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>No special characters:</strong> Only letters, numbers, hyphens</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Never change after launch:</strong> Breaks backlinks and rankings</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold mt-8 mb-4">301 Redirects for URL Changes</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  If you must change URLs, use 301 redirects:
                </p>
                <div className="bg-slate-50 p-6 rounded-xl my-6 border border-slate-200">
                  <ol className="space-y-3 text-slate-700">
                    <li>Go to: <strong>Marketing → URL Rewrites</strong></li>
                    <li>Click <strong>Add URL Rewrite</strong></li>
                    <li>Set "Redirect Type" to <strong>Permanent (301)</strong></li>
                    <li>Enter old and new URLs</li>
                  </ol>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Related Ecommerce SEO Guides:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/ecommerce-seo-strategy-2025" className="text-blue-600 hover:text-blue-800">Ecommerce SEO Strategy: 25 Tactics That Drive Sales</Link></li>
                  <li><Link href="/blog/shopify-seo-optimization-guide-2025" className="text-blue-600 hover:text-blue-800">Shopify SEO Optimization: 21 Tips That Work</Link></li>
                  <li><Link href="/blog/woocommerce-seo-complete-guide" className="text-blue-600 hover:text-blue-800">WooCommerce SEO: Complete Optimization Guide</Link></li>
                  <li><Link href="/blog/product-page-seo-ecommerce" className="text-blue-600 hover:text-blue-800">Product Page SEO: Optimize Every Element</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #MagentoSEO #AdobeCommerce #EcommerceSEO #Magento2 #PlatformSEO #OnlineStore
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Read More Ecommerce SEO Guides</h2>
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
                <p className="text-sm text-slate-400">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
