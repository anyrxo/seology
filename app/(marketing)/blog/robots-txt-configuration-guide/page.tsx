import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Robots.txt Configuration: Control What Google Crawls',
  description: 'One robots.txt mistake can deindex your entire site. This guide shows the exact configuration used by Fortune 500 sites.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'robots-txt-configuration-guide').slice(0, 4)
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
            <span>Robots.txt Configuration Guide</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Robots.txt Configuration: Control What Google Crawls
          </h1>
          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>October 12, 2024</span>
          </div>
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            One robots.txt mistake can <strong className="text-white">deindex your entire site</strong>. This guide shows the exact configuration used by Fortune 500 sites.
          </p>
          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Automate Robots.txt Management
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
                Robots.txt controls which pages search engines crawl. Mistakes in this file can deindex your entire site (happened to 1 in 5 sites). This guide covers 17 critical robots.txt rules: User-agent directives, Disallow/Allow syntax, Crawl-delay, Sitemap declarations, wildcard patterns, and testing. 42% of sites have robots.txt errors blocking important pages. SEOLOGY automatically manages and monitors your robots.txt to prevent catastrophic errors.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">What is Robots.txt and Why It Matters</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Robots.txt is a text file in your site\'s root directory that tells search engine crawlers which pages they can and cannot access.
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">20%</div>
                    <div className="text-slate-700">Of websites accidentally deindexed their entire site with robots.txt errors (Moz study)</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">42%</div>
                    <div className="text-slate-700">Of sites have robots.txt errors blocking important pages from crawlers</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">68%</div>
                    <div className="text-slate-700">Traffic loss (average) when robots.txt accidentally blocks entire site</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="text-4xl font-bold text-green-600 mb-2">3-7 days</div>
                    <div className="text-slate-700">Average time to recover from robots.txt deindexing error</div>
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed mt-6">
                  <strong>Location:</strong> https://yoursite.com/robots.txt (must be in root directory)<br/>
                  <strong>Format:</strong> Plain text file following Robots Exclusion Protocol<br/>
                  <strong>Purpose:</strong> Control crawl budget, protect sensitive pages, prevent duplicate content indexing
                </p>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">17 Critical Robots.txt Rules</h2>
                <h3 className="text-2xl font-bold mb-4 mt-8">Basic Syntax (5 Rules)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. User-agent Directive</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Specifies which crawler the rules apply to.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Syntax:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: Googlebot
Disallow: /admin/
User-agent: *
Disallow: /private/`}
                    </pre>
                    <p className="text-slate-700 mb-3">
                      <strong>Common user-agents:</strong><br/>
                      • <code>Googlebot</code> - Google\'s web crawler<br/>
                      • <code>Bingbot</code> - Microsoft Bing crawler<br/>
                      • <code>Googlebot-Image</code> - Google Images<br/>
                      • <code>*</code> - All crawlers (wildcard)
                    </p>
                    <p className="text-slate-700">
                      <strong>Case sensitivity:</strong> User-agent names are case-insensitive.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Disallow Directive</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Blocks crawlers from accessing specified paths.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block entire directory
Disallow: /admin/
# Block specific file
Disallow: /secret-page.html
# Block all pages (DANGEROUS!)
Disallow: /
# Block nothing (allow all)
Disallow:`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Warning:</strong> <code>Disallow: /</code> blocks your entire site. Most common catastrophic error.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. Allow Directive</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Explicitly allows crawling specific paths within blocked directories.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Example:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: Googlebot
Disallow: /admin/
Allow: /admin/public/
# Result: /admin/ blocked except /admin/public/`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Note:</strong> More specific rules override general rules. Allow is more specific than Disallow.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Sitemap Declaration</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Tells crawlers where to find your XML sitemap.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Syntax:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-products.xml
Sitemap: https://example.com/sitemap-blog.xml`}
                    </pre>
                    <p className="text-slate-700 mb-3">
                      <strong>Requirements:</strong> Full absolute URL required (not relative paths).
                    </p>
                    <p className="text-slate-700">
                      <strong>Benefit:</strong> Helps search engines discover your sitemap without manual submission.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. Crawl-delay Directive</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Adds delay (in seconds) between crawler requests.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Syntax:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: *
Crawl-delay: 10
# Crawler waits 10 seconds between requests`}
                    </pre>
                    <p className="text-slate-700 mb-3">
                      <strong>Important:</strong> Google ignores Crawl-delay. Use Google Search Console to adjust crawl rate instead.
                    </p>
                    <p className="text-slate-700">
                      <strong>Use case:</strong> Slow down aggressive crawlers that overload your server (Bing respects this).
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-8">Advanced Patterns (6 Rules)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Wildcard Asterisk (*)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Matches any sequence of characters.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block all URLs with query parameters
Disallow: /*?
# Block all PDF files
Disallow: /*.pdf$
# Block all URLs containing "sort="
Disallow: /*sort=*`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Support:</strong> Google and most modern crawlers support wildcards.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. Dollar Sign End Anchor ($)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>What it does:</strong> Matches end of URL.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block URLs ending in .pdf
Disallow: /*.pdf$
# Allow .pdf (matches middle of URL too)
Disallow: /*.pdf
# Block URLs ending with /private
Disallow: /*/private$`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Use case:</strong> Block specific file types or URL patterns.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. Blocking URL Parameters</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Query parameters create duplicate content (example.com/page vs example.com/page?ref=social).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block all URLs with query strings
Disallow: /*?
# Block specific parameters
Disallow: /*?ref=*
Disallow: /*?utm_*
Disallow: /*?sessionid=*`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Alternative:</strong> Use canonical tags + Google Search Console URL Parameters tool for better control.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">9. Blocking Specific Bots</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Use case:</strong> Block malicious bots, scrapers, or specific search engines.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Examples:</strong>
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block specific scraper bots
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: MJ12bot
Disallow: /
# Allow Google, block everyone else
User-agent: Googlebot
Disallow:
User-agent: *
Disallow: /`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Reality:</strong> Malicious bots ignore robots.txt. Use server-level blocking for real security.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">10. Comments</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Syntax:</strong> Lines starting with # are comments.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# This is a comment
# Block admin area from all crawlers
User-agent: *
Disallow: /admin/ # Inline comments NOT supported`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Document why you\'re blocking specific paths.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">11. Case Sensitivity</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Important:</strong> Paths ARE case-sensitive. User-agents are NOT.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# These are DIFFERENT
Disallow: /Admin/
Disallow: /admin/
# These are the SAME
User-agent: Googlebot
User-agent: googlebot`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Match exact case of your URLs.
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 mt-8">Common Use Cases (6 Rules)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">12. E-commerce Site Configuration</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Goal:</strong> Block admin, checkout, filters while allowing products.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: *
# Block admin and checkout
Disallow: /admin/
Disallow: /checkout/
Disallow: /cart/
Disallow: /account/
# Block URL parameters (filters, sessions)
Disallow: /*?*sort=*
Disallow: /*?*filter=*
Disallow: /*sessionid=*
# Allow product images
Allow: /images/
# Sitemap
Sitemap: https://example.com/sitemap.xml`}
                    </pre>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">13. WordPress Site Configuration</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Goal:</strong> Block WordPress admin and system files.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: *
# Block WordPress admin
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
# Block WordPress system directories
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/themes/
# Allow uploads (images, media)
Allow: /wp-content/uploads/
# Block search results
Disallow: /?s=
Disallow: /search/
Sitemap: https://example.com/sitemap_index.xml`}
                    </pre>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">14. Development/Staging Environment</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical:</strong> Block all crawlers from dev/staging sites.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# Block entire site (staging environment)
User-agent: *
Disallow: /`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Better approach:</strong> Use meta robots noindex + HTTP authentication for double protection.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">15. Allow Everything (Default)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Configuration:</strong> Most sites should allow all crawling.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: *
Disallow:
Sitemap: https://example.com/sitemap.xml`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Note:</strong> Empty Disallow allows everything. This is the safest starting point.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">16. Blocking Duplicate Content</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Use case:</strong> Print versions, mobile versions, filtered pages.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`User-agent: *
# Block print versions
Disallow: /print/
Disallow: /*?print=*
# Block mobile site (if you have responsive design)
Disallow: /m/
# Block paginated pages (use canonical instead)
Disallow: /*?page=*`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Better alternative:</strong> Use canonical tags instead of robots.txt for duplicate content.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">17. Enterprise Multi-Domain Setup</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Scenario:</strong> Multiple country/language sites.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# US Site (example.com/robots.txt)
User-agent: *
Disallow: /admin/
Sitemap: https://example.com/sitemap-us.xml
# UK Site (example.com/uk/robots.txt) - WRONG!
# Robots.txt MUST be in root directory
# Correct: Use single robots.txt
User-agent: *
Disallow: /admin/
Sitemap: https://example.com/sitemap-us.xml
Sitemap: https://example.com/sitemap-uk.xml`}
                    </pre>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Common Robots.txt Mistakes That Destroy Rankings</h2>
                <div className="space-y-6 my-8">
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Blocking Entire Site Accidentally</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> <code>Disallow: /</code> blocks everything.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>How it happens:</strong> Copy staging robots.txt to production. Within 24 hours, entire site deindexed.
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> 68% average traffic loss. 3-7 days to recover after fix.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Blocking CSS and JavaScript</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> <code>Disallow: /css/</code> and <code>Disallow: /js/</code>
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> Google can\'t render pages properly. Mobile-first indexing fails. Rankings drop.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> NEVER block CSS/JS files. Google needs them to render pages.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Blocking Images</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> <code>Disallow: /images/</code>
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> Images never appear in Google Image Search. 30% of organic traffic comes from images for many sites.
                    </p>
                    <p className="text-slate-700">
                      <strong>Note:</strong> Only block images if you truly don\'t want them indexed (copyright concerns).
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Wrong Robots.txt Location</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> Robots.txt in subdirectory (/blog/robots.txt) instead of root.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Reality:</strong> Crawlers only check /robots.txt. File in wrong location is ignored.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Must be https://example.com/robots.txt (root only).
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Conflicting Rules</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> Multiple conflicting User-agent blocks.
                    </p>
                    <pre className="bg-slate-900 text-red-400 p-4 rounded-lg overflow-x-auto mb-3">
{`# WRONG - Conflicting rules
User-agent: *
Disallow: /
User-agent: Googlebot
Disallow:
# Which wins? Googlebot\'s more specific rule wins.`}
                    </pre>
                    <p className="text-slate-700">
                      <strong>Rule:</strong> Most specific user-agent takes precedence.
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Using Robots.txt for Security</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Error:</strong> Blocking /admin/ and thinking it\'s protected.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Reality:</strong> Robots.txt is PUBLIC. Everyone can read it. Malicious bots ignore it. You\'re advertising your admin URL.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Use HTTP authentication, IP whitelisting, or strong passwords for security.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Testing Your Robots.txt</h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Google Search Console Robots.txt Tester</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Location:</strong> Google Search Console → Settings → robots.txt
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Features:</strong> View current robots.txt. Test specific URLs. See if they\'re blocked. Submit robots.txt changes.
                    </p>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Test BEFORE deploying robots.txt changes. One typo can deindex your site.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Syntax Validators</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Tools:</strong> Google\'s robots.txt tester (in GSC), Technical SEO tools (Screaming Frog, Sitebulb).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Check for:</strong> Syntax errors. Blocking critical pages. Blocking CSS/JS. Missing sitemap declaration.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Manual Testing</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Process:</strong> Visit https://yoursite.com/robots.txt. Verify it loads correctly. Check no 404 error. Verify syntax.
                    </p>
                    <p className="text-slate-700">
                      <strong>Quick test:</strong> Try accessing a URL you blocked. Use Google Search Console URL Inspection to verify it\'s blocked.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Advanced Robots.txt Strategies</h2>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Dynamic Robots.txt Generation</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Use case:</strong> Different rules for different environments (dev, staging, production).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Implementation:</strong> Generate robots.txt server-side based on environment variables.
                    </p>
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-3">
{`// Node.js example
app.get('/robots.txt', (req, res) => {
  if (process.env.ENV === 'production') {
    res.send(\`User-agent: *
Disallow:
Sitemap: https://example.com/sitemap.xml\`);
  } else {
    // Block entire staging site
    res.send(\`User-agent: *
Disallow: /\`);
  }
});`}
                    </pre>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Monitoring Robots.txt Changes</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> Accidental changes to robots.txt can deindex site.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Solution:</strong> Set up monitoring to alert on changes.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Tools:</strong> Uptime monitoring (checks robots.txt hourly). Version control (git). Automated testing in CI/CD.
                    </p>
                    <p className="text-slate-700">
                      <strong>Alert triggers:</strong> Robots.txt returns 404. Content changes. <code>Disallow: /</code> detected.
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">Robots Meta Tag vs Robots.txt</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Robots.txt:</strong> Blocks crawling. Page never accessed by Google.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Robots meta tag:</strong> Blocks indexing. Google crawls but doesn\'t index.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Use robots.txt when:</strong> Want to save crawl budget (duplicate content, admin pages).
                    </p>
                    <p className="text-slate-700">
                      <strong>Use meta robots when:</strong> Want page crawled but not indexed (thin content, private info).
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Manages Robots.txt</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY automatically monitors and optimizes your robots.txt:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors robots.txt 24/7 for accidental changes or errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Instant alerts if entire site is accidentally blocked</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Validates syntax before deployment to prevent catastrophic errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatically adds sitemap declarations and keeps them updated</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Detects and fixes common mistakes (blocking CSS/JS, wrong location)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Tests robots.txt changes before they go live</span>
                  </li>
                </ul>
                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Never Deindex Your Site Again</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY monitors your robots.txt 24/7 and alerts you instantly if critical errors are detected.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Protect Your Site Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/xml-sitemap-optimization-guide" className="text-blue-600 hover:text-blue-800">XML Sitemap Optimization: Get Every Page Indexed Fast</Link></li>
                  <li><Link href="/blog/crawl-budget-optimization-guide" className="text-blue-600 hover:text-blue-800">Crawl Budget Optimization: Get More Pages Indexed Faster</Link></li>
                  <li><Link href="/blog/meta-robots-tags-guide" className="text-blue-600 hover:text-blue-800">Meta Robots Tags: Control Indexing & Crawling Precisely</Link></li>
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #RobotsTxt #TechnicalSEO #Crawling
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