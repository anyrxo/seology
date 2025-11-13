import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
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
              Migrate to HTTPS Safely
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
                HTTPS (SSL/TLS encryption) is now a confirmed Google ranking factor, but <strong>incorrect migrations cause 15-30% traffic drops</strong> that can take months to recover. This guide covers 15 critical steps: SSL certificate selection, 301 redirect implementation, Google Search Console updates, canonical tag fixes, internal link updates, and post-migration monitoring. Common mistakes like mixed content warnings, redirect chains, and missing HSTS headers can destroy rankings. SEOLOGY automates HTTPS migration with zero ranking loss.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why HTTPS Migration Matters for SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  HTTPS isn\'t just security—it\'s essential for modern SEO:
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Lock className="w-8 h-8 text-green-600" />
                      <div className="text-2xl font-bold text-green-600">Ranking Factor</div>
                    </div>
                    <div className="text-slate-700">Google confirmed HTTPS as ranking signal in 2014—HTTPS sites rank higher than HTTP equivalents</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">94%</div>
                    <div className="text-slate-700">Of page one Google results use HTTPS—HTTP sites are increasingly rare at top of SERPs</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">Browser Warnings</div>
                    <div className="text-slate-700">Chrome, Firefox, Safari show "Not Secure" warnings on HTTP sites—destroying user trust instantly</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                    <div className="text-4xl font-bold text-red-600 mb-2">15-30%</div>
                    <div className="text-slate-700">Average traffic drop from incorrect HTTPS migration—recoverable but takes 3-6 months</div>
                  </div>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mt-6">
                  <strong>Critical reality:</strong> HTTPS migration done correctly maintains 100% of rankings. Done incorrectly, it can devastate organic traffic for months.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Pre-Migration Checklist (5 Steps)</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. Choose the Right SSL Certificate</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Certificate types:</strong> Domain Validation (DV), Organization Validation (OV), Extended Validation (EV).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>For most sites:</strong> DV certificate sufficient—free options like Let\'s Encrypt work perfectly for SEO.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>For ecommerce/corporate:</strong> OV or EV certificate provides green address bar and higher trust signals.
                    </p>
                    <p className="text-slate-700">
                      <strong>Wildcard consideration:</strong> If you have subdomains, get wildcard certificate to cover *.yourdomain.com.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Crawl Your Entire Site</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Document every URL, internal link, external link, and resource before migration.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Tools:</strong> Screaming Frog (up to 500 URLs free), Sitebulb, Ahrefs Site Audit, SEMrush Site Audit.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Export data:</strong> Save complete URL list, internal link structure, external links, images, CSS, JavaScript files.
                    </p>
                    <p className="text-slate-700">
                      <strong>Baseline metrics:</strong> Document current rankings, traffic, backlinks—you\'ll compare these post-migration.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. Backup Everything</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical step:</strong> Full site backup before making any changes—migrations can go wrong.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Backup components:</strong> Database export, all files (code, images, CSS, JS), server configuration files, .htaccess or nginx.conf.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Test restoration:</strong> Verify backups work by restoring to staging environment—broken backups are useless.
                    </p>
                    <p className="text-slate-700">
                      <strong>Keep backups accessible:</strong> Store off-server in case of catastrophic failure during migration.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Install SSL Certificate</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Installation process:</strong> Generate CSR (Certificate Signing Request), purchase/obtain certificate, install on server.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Server configuration:</strong> Configure web server (Apache, Nginx) to serve site over HTTPS on port 443.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Test HTTPS:</strong> Visit https://yoursite.com manually—verify green padlock appears and certificate is valid.
                    </p>
                    <p className="text-slate-700">
                      <strong>SSL Labs test:</strong> Run SSL Labs SSL Server Test—aim for A or A+ grade before proceeding.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. Update Internal Absolute URLs</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical fix:</strong> Change all internal absolute URLs from http:// to https:// in database and templates.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Database search-replace:</strong> Use WP-CLI (WordPress) or SQL find-replace to update all http:// references.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Template updates:</strong> Hardcoded http:// links in theme files, header, footer, navigation must be updated.
                    </p>
                    <p className="text-slate-700">
                      <strong>Best practice:</strong> Use protocol-relative URLs (//) or relative URLs to avoid this problem in future.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Migration Implementation (6 Steps)</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Implement 301 Redirects</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Most critical step:</strong> Redirect all HTTP URLs to HTTPS equivalents with 301 (permanent) redirects.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Apache (.htaccess):</strong> 
                      <br /><code>RewriteEngine On</code>
                      <br /><code>RewriteCond %{'{HTTPS}'} off</code>
                      <br /><code>RewriteRule ^(.*)$ https://%{'{HTTP_HOST}'}/$1 [R=301,L]</code>
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Nginx:</strong>
                      <br /><code>server {'{'} listen 80; return 301 https://$host$request_uri; {'}'}</code>
                    </p>
                    <p className="text-slate-700">
                      <strong>Test redirects:</strong> Verify every HTTP URL redirects to HTTPS equivalent—no redirect chains or loops.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. Update XML Sitemap</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Critical update:</strong> Regenerate XML sitemap with all HTTPS URLs instead of HTTP.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Sitemap location:</strong> Ensure sitemap.xml is accessible at https://yoursite.com/sitemap.xml.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>WordPress:</strong> Yoast SEO and Rank Math auto-update sitemaps—verify URLs are HTTPS.
                    </p>
                    <p className="text-slate-700">
                      <strong>Submit new sitemap:</strong> Submit HTTPS sitemap to Google Search Console and Bing Webmaster Tools.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. Update Canonical Tags</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> Canonical tags must point to HTTPS versions to prevent duplicate content issues.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Check implementation:</strong> View page source, find &lt;link rel="canonical"&gt; tag, verify it uses https://.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Common mistake:</strong> Canonical tags still pointing to HTTP versions after migration—confuses Google.
                    </p>
                    <p className="text-slate-700">
                      <strong>Automated check:</strong> Use Screaming Frog to crawl site and verify all canonicals use HTTPS.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">9. Fix Mixed Content Warnings</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Problem:</strong> HTTPS pages loading HTTP resources (images, CSS, JS) trigger browser security warnings.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Detection:</strong> Open Chrome DevTools Console—mixed content warnings appear in yellow/red.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Fix method 1:</strong> Update all resource URLs to use HTTPS instead of HTTP.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Fix method 2:</strong> Use protocol-relative URLs (//example.com/image.jpg) for external resources.
                    </p>
                    <p className="text-slate-700">
                      <strong>Third-party content:</strong> Update embeds (YouTube, Twitter) to use HTTPS versions—most support it now.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">10. Update Google Search Console</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Add HTTPS property:</strong> Add https://yoursite.com as new property in Google Search Console.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Verification:</strong> Verify ownership using DNS, HTML file upload, Google Analytics, or Tag Manager.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Submit sitemap:</strong> Submit HTTPS sitemap to new property—helps Google discover HTTPS versions faster.
                    </p>
                    <p className="text-slate-700">
                      <strong>Address change tool:</strong> Google Search Console has "Change of Address" tool for migrations—use it.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">11. Update Google Analytics</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Default URL update:</strong> Change Default URL in Google Analytics property settings from HTTP to HTTPS.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>View settings:</strong> Update Website URL in each View settings to use https://.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Annotation:</strong> Add annotation in Google Analytics noting date of HTTPS migration for future reference.
                    </p>
                    <p className="text-slate-700">
                      <strong>Referral exclusions:</strong> Add both HTTP and HTTPS versions to referral exclusion list to prevent self-referrals.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Post-Migration Monitoring (4 Steps)</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">12. Enable HSTS (HTTP Strict Transport Security)</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Security enhancement:</strong> HSTS forces browsers to only connect via HTTPS—prevents downgrade attacks.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Implementation:</strong> Add header: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Preload list:</strong> Submit site to HSTS preload list at hstspreload.org—browsers will enforce HTTPS permanently.
                    </p>
                    <p className="text-slate-700">
                      <strong>Warning:</strong> Only enable HSTS after confirming entire site works perfectly on HTTPS—it\'s irreversible.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">13. Monitor Rankings Daily</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Tracking period:</strong> Monitor rankings daily for 30 days post-migration—fluctuations are normal.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Key metrics:</strong> Track position changes, impressions, clicks, CTR in Google Search Console.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Expected behavior:</strong> Temporary fluctuations (±5 positions) for 1-2 weeks, then stabilization.
                    </p>
                    <p className="text-slate-700">
                      <strong>Red flag:</strong> If traffic drops 20%+ for more than 7 days, investigate immediately for migration issues.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">14. Check for Indexation Issues</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Index coverage:</strong> Monitor Google Search Console Index Coverage report—ensure HTTPS pages get indexed.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Check deindexation:</strong> Use site:yoursite.com search—verify HTTP pages disappear and HTTPS pages appear.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Request indexing:</strong> For critical pages, manually request indexing via Google Search Console URL Inspection tool.
                    </p>
                    <p className="text-slate-700">
                      <strong>Timeline:</strong> Full reindexation takes 2-4 weeks for most sites—be patient but vigilant.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">15. Update External Backlinks</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Link equity:</strong> While 301 redirects pass 90-99% of link equity, direct HTTPS links are better.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Identify backlinks:</strong> Export backlink list from Ahrefs, Majestic, SEMrush, or Google Search Console.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Outreach priority:</strong> Contact sites with high-authority backlinks and request URL updates to HTTPS.
                    </p>
                    <p className="text-slate-700">
                      <strong>Social profiles:</strong> Update all social media profiles, directories, and business listings to use HTTPS URLs.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common HTTPS Migration Mistakes</h2>
                <div className="space-y-6 my-8">
                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 1: Using 302 Instead of 301 Redirects</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> 302 (temporary) redirects don\'t pass link equity—causes ranking drops.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Always use 301 (permanent) redirects for HTTPS migration—signals permanent move to Google.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 2: Mixed Content Warnings</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> HTTPS pages loading HTTP resources show security warnings—users bounce, rankings suffer.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Update all internal resources to HTTPS, use protocol-relative URLs for external resources.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 3: Forgetting to Update Canonicals</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> Canonical tags pointing to HTTP versions prevent HTTPS pages from ranking.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Update all canonical tags to point to HTTPS versions—critical for duplicate content prevention.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 4: Not Updating Search Console</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> Google continues crawling HTTP version if not notified—delays HTTPS indexation.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Add HTTPS property to Google Search Console, submit sitemap, use Change of Address tool.
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                    <h4 className="text-xl font-bold mb-3 text-red-900">❌ Mistake 5: Redirect Chains</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Impact:</strong> HTTP → www HTTPS → non-www HTTPS creates redirect chain—wastes crawl budget, dilutes link equity.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Implement single-hop redirects—HTTP → final HTTPS destination directly.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Handles HTTPS Migration</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY automates HTTPS migration with zero ranking loss:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Crawls entire site and documents all URLs, links, and resources before migration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Implements 301 redirects automatically with single-hop optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Updates all internal links, canonical tags, and XML sitemaps to HTTPS</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Detects and fixes mixed content warnings across all pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Configures Google Search Console and submits HTTPS sitemap</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors rankings and traffic daily post-migration—alerts to any issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Enables HSTS and implements security best practices</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Migrate to HTTPS Without Losing Rankings</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Join 2,000+ sites that used SEOLOGY to migrate to HTTPS with zero traffic loss and full ranking preservation.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Start HTTPS Migration
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/301-redirects-complete-guide" className="text-blue-600 hover:text-blue-800">301 Redirects: Complete Guide to Preserving SEO Value</Link></li>
                  <li><Link href="/blog/site-architecture-seo-best-practices" className="text-blue-600 hover:text-blue-800">Site Architecture: SEO Best Practices for Maximum Crawlability</Link></li>
                  <li><Link href="/blog/technical-seo-audit-checklist-2025" className="text-blue-600 hover:text-blue-800">Technical SEO Audit Checklist: 31 Critical Issues to Fix</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #HTTPS #SSL #SiteMigration
                </p>
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
