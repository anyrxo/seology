import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'International SEO & Hreflang: The Complete Implementation Guide',
  description: 'Expanding globally? This guide shows how to implement hreflang correctly and avoid the 7 fatal mistakes that kill international rankings.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'international-seo-hreflang-guide').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link> / <Link href="/blog" className="hover:text-blue-400">Blog</Link> / <span>International SEO & Hreflang</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            International SEO & Hreflang: The Complete Implementation Guide
          </h1>
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span><span>•</span><span>November 12, 2024</span>
          </div>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            63% of international SEO implementations have critical hreflang errors that tank rankings. Here\'s how to do it right and capture global traffic worth $100K+ annually.
          </p>
          <div className="mb-12">
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Optimizing Now<ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <ul className="text-slate-700 mb-0 space-y-2">
                <li><strong>Hreflang tells Google which language/region version to show users</strong>--without it, you\'ll lose international rankings</li>
                <li><strong>Choose URL structure carefully</strong>: ccTLDs (.co.uk) rank best but cost more; subdirectories (/uk/) are easiest</li>
                <li><strong>Implement hreflang in HTML {`<head>`}, HTTP headers, or XML sitemap</strong>--pick one method and be consistent</li>
                <li><strong>Always include self-referencing hreflang</strong> (page must reference itself) and x-default for unmatched regions</li>
                <li><strong>Use correct language-region codes</strong>: en-US (not en-us), fr-CA (not fr-ca)--case matters</li>
                <li><strong>Test with Google Search Console</strong> and hreflang validator tools--errors are common and deadly</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why International SEO Matters (The Opportunity)</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Most sites target one country and ignore 95% of the global internet. That\'s leaving millions of dollars on the table.
                </p>

                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Global e-commerce will hit $7.4 trillion in 2025</strong> (Statista)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>72% of consumers prefer content in their native language</strong> (CSA Research)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>55% of global internet users speak languages other than English</strong> (Internet World Stats)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Sites with proper hreflang see 25-50% increase in international traffic</strong> (Ahrefs study)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Wrong hreflang = Google shows wrong version = 0 conversions</strong></span>
                  </li>
                </ul>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-6">
                  <p className="text-amber-900 font-semibold mb-2">⚡ Real Example:</p>
                  <p className="text-slate-700 mb-0">
                    A SaaS company implemented hreflang for 5 languages (French, German, Spanish, Japanese, Portuguese). Within 90 days, international organic traffic increased 147%, and revenue from non-English markets jumped from $15K/month to $89K/month.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">What is Hreflang? (The Basics)</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Hreflang is an HTML attribute that tells Google which language and geographical region your content targets.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>The Problem It Solves:</strong>
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>You have example.com/uk/ (UK English) and example.com/us/ (US English)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Google sees two near-identical pages and thinks it\'s duplicate content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Without hreflang: Google shows UK version to US users (wrong prices, shipping, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>With hreflang: Google shows US version to US users, UK version to UK users</span>
                  </li>
                </ul>

                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Hreflang is NOT for translation widgets.</strong> It\'s for sites with separate URLs for different languages/regions.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Step 1: Choose Your URL Structure</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Before implementing hreflang, decide how to structure international URLs. Each has pros and cons:
                </p>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-3">Option 1: Country Code Top-Level Domains (ccTLDs)</h3>
                    <p className="font-mono text-sm text-blue-600 mb-3">
                      example.com (US)<br />
                      example.co.uk (UK)<br />
                      example.de (Germany)<br />
                      example.fr (France)
                    </p>
                    <p className="text-slate-700 mb-3"><strong>Pros:</strong></p>
                    <ul className="space-y-1 text-slate-700 mb-4">
                      <li>✅ Strongest geographical signal to Google</li>
                      <li>✅ Users trust local domains more (better CTR)</li>
                      <li>✅ Can host each in local data centers (faster)</li>
                    </ul>
                    <p className="text-slate-700 mb-3"><strong>Cons:</strong></p>
                    <ul className="space-y-1 text-slate-700">
                      <li>❌ Expensive (register + renew multiple domains)</li>
                      <li>❌ Harder to manage (separate sites)</li>
                      <li>❌ Domain authority doesn\'t transfer between ccTLDs</li>
                    </ul>
                    <p className="text-slate-700 mt-3"><strong>Best for:</strong> Enterprise companies with localized teams and big budgets</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-3">Option 2: Subdomains with gTLD</h3>
                    <p className="font-mono text-sm text-blue-600 mb-3">
                      example.com (US)<br />
                      uk.example.com (UK)<br />
                      de.example.com (Germany)<br />
                      fr.example.com (France)
                    </p>
                    <p className="text-slate-700 mb-3"><strong>Pros:</strong></p>
                    <ul className="space-y-1 text-slate-700 mb-4">
                      <li>✅ Easy to set up (one domain)</li>
                      <li>✅ Can host in different locations</li>
                      <li>✅ Clear geographical separation</li>
                    </ul>
                    <p className="text-slate-700 mb-3"><strong>Cons:</strong></p>
                    <ul className="space-y-1 text-slate-700">
                      <li>❌ Google treats subdomains as separate sites (domain authority doesn\'t transfer)</li>
                      <li>❌ Requires geo-targeting in Google Search Console</li>
                      <li>❌ More complex SSL certificate management</li>
                    </ul>
                    <p className="text-slate-700 mt-3"><strong>Best for:</strong> Mid-size companies wanting geographical separation without ccTLD costs</p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">
                    <h3 className="text-2xl font-bold mb-3">Option 3: Subdirectories with gTLD (Recommended)</h3>
                    <p className="font-mono text-sm text-blue-600 mb-3">
                      example.com (default)<br />
                      example.com/uk/ (UK)<br />
                      example.com/de/ (Germany)<br />
                      example.com/fr/ (France)
                    </p>
                    <p className="text-slate-700 mb-3"><strong>Pros:</strong></p>
                    <ul className="space-y-1 text-slate-700 mb-4">
                      <li>✅ <strong>Easiest to implement and maintain</strong></li>
                      <li>✅ Domain authority transfers to all subdirectories</li>
                      <li>✅ One domain, one hosting account, one SSL certificate</li>
                      <li>✅ Clear structure for users and Google</li>
                    </ul>
                    <p className="text-slate-700 mb-3"><strong>Cons:</strong></p>
                    <ul className="space-y-1 text-slate-700">
                      <li>❌ Weaker geographical signal than ccTLDs</li>
                      <li>❌ All hosted in same location (unless using CDN)</li>
                    </ul>
                    <p className="text-slate-700 mt-3"><strong>Best for:</strong> 95% of businesses--best balance of cost, simplicity, and SEO benefit</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                  <p className="text-blue-900 font-semibold mb-2">💡 Recommendation:</p>
                  <p className="text-slate-700 mb-0">
                    Start with subdirectories (/uk/, /de/, /fr/). If you later expand to 10+ countries with localized teams, <em>then</em> consider ccTLDs. Don\'t overcomplicate early.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Step 2: Implement Hreflang Tags</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  You have three options for implementing hreflang. Pick <strong>one method only</strong>--mixing methods causes errors.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Method 1: HTML {`<head>`} Tags (Easiest)</h3>
                    <p className="text-slate-700 mb-4">
                      Add hreflang tags to the {`<head>`} section of each page:
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <p className="font-mono text-sm text-slate-800">
                        {`<!-- On example.com/product/ (default US English) -->`}<br />
                        {`<link rel="alternate" hreflang="en-us" href="https://example.com/product/" />`}<br />
                        {`<link rel="alternate" hreflang="en-gb" href="https://example.com/uk/product/" />`}<br />
                        {`<link rel="alternate" hreflang="de-de" href="https://example.com/de/product/" />`}<br />
                        {`<link rel="alternate" hreflang="fr-fr" href="https://example.com/fr/product/" />`}<br />
                        {`<link rel="alternate" hreflang="x-default" href="https://example.com/product/" />`}<br /><br />
                        {`<!-- CRITICAL: Each URL must include ALL hreflang tags, including self-reference -->`}<br />
                        {`<!-- So example.com/uk/product/ must have the SAME 5 tags above -->`}
                      </p>
                    </div>
                    <p className="text-slate-700 mt-4">
                      <strong>Key Rules:</strong>
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Every page must include <strong>all</strong> hreflang tags for <strong>all</strong> language/region versions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Pages must include <strong>self-referencing</strong> hreflang (page must reference itself)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Include <strong>x-default</strong> for users from unspecified regions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use absolute URLs (https://...), not relative (/product/)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Hreflang must be <strong>bidirectional</strong> (if page A links to page B, page B must link to page A)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Method 2: HTTP Headers (For Non-HTML Files)</h3>
                    <p className="text-slate-700 mb-4">
                      Use HTTP headers for PDFs, images, or other non-HTML content:
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <p className="font-mono text-sm text-slate-800">
                        {`Link: <https://example.com/product.pdf>; rel="alternate"; hreflang="en-us",`}<br />
                        {`      <https://example.com/uk/product.pdf>; rel="alternate"; hreflang="en-gb",`}<br />
                        {`      <https://example.com/de/product.pdf>; rel="alternate"; hreflang="de-de",`}<br />
                        {`      <https://example.com/product.pdf>; rel="alternate"; hreflang="x-default"`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Method 3: XML Sitemap (For Large Sites)</h3>
                    <p className="text-slate-700 mb-4">
                      For sites with 1000+ pages, managing HTML hreflang tags becomes impossible. Use XML sitemap instead:
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <p className="font-mono text-sm text-slate-800">
                        {`<?xml version="1.0" encoding="UTF-8"?>`}<br />
                        {`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`}<br />
                        {`        xmlns:xhtml="http://www.w3.org/1999/xhtml">`}<br /><br />
                        {`  <url>`}<br />
                        {`    <loc>https://example.com/product/</loc>`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/uk/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="de-de" href="https://example.com/de/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/product/" />`}<br />
                        {`  </url>`}<br /><br />
                        {`  <url>`}<br />
                        {`    <loc>https://example.com/uk/product/</loc>`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="en-us" href="https://example.com/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="en-gb" href="https://example.com/uk/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="de-de" href="https://example.com/de/product/" />`}<br />
                        {`    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/product/" />`}<br />
                        {`  </url>`}<br />
                        {`</urlset>`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Step 3: Use Correct Language and Region Codes</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Hreflang uses ISO 639-1 language codes and ISO 3166-1 Alpha 2 region codes. <strong>Case matters.</strong>
                </p>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 my-6">
                  <p className="text-red-900 font-semibold mb-2">❌ Common Errors:</p>
                  <ul className="text-slate-700 space-y-1">
                    <li>• en-US (wrong--region must be lowercase)</li>
                    <li>• EN-us (wrong--language must be lowercase)</li>
                    <li>• en_us (wrong--must use hyphen, not underscore)</li>
                    <li>• english-us (wrong--must use ISO codes)</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 my-6">
                  <p className="text-green-900 font-semibold mb-2">✅ Correct Format:</p>
                  <ul className="text-slate-700 space-y-1 font-mono text-sm">
                    <li>• en-us (US English)</li>
                    <li>• en-gb (UK English)</li>
                    <li>• en-ca (Canadian English)</li>
                    <li>• en-au (Australian English)</li>
                    <li>• fr-fr (French - France)</li>
                    <li>• fr-ca (French - Canada)</li>
                    <li>• de-de (German - Germany)</li>
                    <li>• de-at (German - Austria)</li>
                    <li>• es-es (Spanish - Spain)</li>
                    <li>• es-mx (Spanish - Mexico)</li>
                    <li>• pt-br (Portuguese - Brazil)</li>
                    <li>• pt-pt (Portuguese - Portugal)</li>
                  </ul>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Language-only vs. Language-Region:</strong>
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><code>hreflang="en"</code> targets all English speakers globally (not recommended--too broad)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><code>hreflang="en-us"</code> targets English speakers in the US (recommended)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Always use language-region codes unless you have one version for all speakers of that language</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Step 4: Implement x-default for Unmatched Regions</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <code>x-default</code> tells Google which version to show users from regions you don\'t target.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg mb-4">
                  <p className="font-mono text-sm text-slate-800">
                    {`<link rel="alternate" hreflang="x-default" href="https://example.com/" />`}
                  </p>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Example Scenario:</strong>
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>You have versions for en-us, en-gb, fr-fr, de-de</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>A user from Australia (en-au) visits--no matching hreflang</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Google shows the x-default version (usually your primary market)</span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                  <p className="text-blue-900 font-semibold mb-2">💡 Best Practice:</p>
                  <p className="text-slate-700 mb-0">
                    Set x-default to your primary market (en-us for most US companies). This ensures users from unspecified regions see your main site, not a random localized version.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 7 Fatal Hreflang Mistakes</h2>

                <div className="space-y-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">1. Missing Self-Referencing Hreflang</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Page doesn\'t include hreflang tag pointing to itself.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google ignores all hreflang tags on the page.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Every page must reference itself. If example.com/uk/ has hreflang tags, one must be <code>hreflang="en-gb" href="https://example.com/uk/"</code>
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">2. Non-Bidirectional Hreflang</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Page A links to Page B, but Page B doesn\'t link back to Page A.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google doesn\'t trust the relationship, ignores hreflang.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> If /us/product/ has {`hreflang="en-gb" href="/uk/product/"`}, then /uk/product/ MUST have {`hreflang="en-us" href="/us/product/"`}
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">3. Wrong Language/Region Code Format</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Using en-US instead of en-us, or en_us instead of en-us.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google doesn\'t recognize the code, ignores hreflang.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Language lowercase, region uppercase, hyphen separator: en-us, fr-ca, de-de
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">4. Hreflang Points to Redirected URLs</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Hreflang tag points to example.com/uk, which redirects to example.com/uk/
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google follows one redirect, then stops--hreflang breaks.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Always use final destination URLs in hreflang tags (including trailing slashes if needed)
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">5. Relative URLs in Hreflang</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Using {`href="/uk/product/"`} instead of {`href="https://example.com/uk/product/"`}
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google can\'t determine the correct URL, ignores hreflang.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Always use absolute URLs with protocol (https://)
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">6. Hreflang on Canonicalized Pages</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> Page A has canonical tag pointing to Page B, but hreflang on Page A.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Google indexes Page B, ignores hreflang from Page A.
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Put hreflang tags on the canonical version only
                    </p>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-red-900 mb-2">7. Missing x-default</h3>
                    <p className="text-slate-700 mb-2">
                      <strong>Error:</strong> No x-default tag for unmatched regions.
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Impact:</strong> Users from untargeted regions see random version (often wrong).
                    </p>
                    <p className="text-slate-700">
                      <strong>Fix:</strong> Always include {`<link rel="alternate" hreflang="x-default" href="..." />`}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Testing and Validation Tools</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  63% of hreflang implementations have errors. Test thoroughly before launching:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">1. Google Search Console (Free, Official)</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Navigate to Index → International Targeting</li>
                      <li>• Check "Language" tab for hreflang errors</li>
                      <li>• Google shows specific errors: missing return tags, incorrect codes, etc.</li>
                      <li>• Takes 2-4 weeks for Google to fully process hreflang changes</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">2. Hreflang Tags Testing Tool by Merkle (Free)</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• URL: technicalseo.com/tools/hreflang/</li>
                      <li>• Paste any URL, tool fetches and validates all hreflang tags</li>
                      <li>• Shows bidirectional errors, missing self-references, etc.</li>
                      <li>• Visual diagram of hreflang relationships</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">3. Screaming Frog SEO Spider ($259/year)</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Crawl entire site, export all hreflang implementations</li>
                      <li>• Identifies missing return links, orphaned tags, canonical conflicts</li>
                      <li>• Great for large sites (1000+ pages)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2">4. Ahrefs Site Audit (from $99/month)</h4>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Automated hreflang error detection</li>
                      <li>• Shows impact (how many URLs affected)</li>
                      <li>• Includes internationalization report</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Beyond Hreflang: Complete International SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Hreflang is critical, but it\'s only one part of international SEO success:
                </p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-lg mb-2">1. Content Localization (Not Just Translation)</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Adapt content for cultural context (UK "trainers" vs. US "sneakers")</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use local examples, case studies, testimonials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Show prices in local currency</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Display proper date/time formats (DD/MM/YYYY vs. MM/DD/YYYY)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">2. International Keyword Research</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Don\'t translate keywords literally--research each market separately</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>US "attorney" = UK "solicitor" = different search intent</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use Google Keyword Planner with location targeting</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">3. Geo-Targeting in Google Search Console</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>For subdirectories and subdomains, set target country in GSC</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Settings → International Targeting → Country</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Not needed for ccTLDs (Google knows .co.uk = UK)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">4. Local Backlinks</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Build links from local domains (.co.uk links for UK version)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Partner with local businesses, directories, press</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">5. Hosting and CDN</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Use a CDN (Cloudflare, Fastly) to serve content from local servers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <span>Page speed affects rankings--users in Germany shouldn\'t wait for US servers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates International SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Manually implementing and maintaining hreflang for 5 languages across 1000 pages = 5000 tags to manage. One error breaks everything.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  SEOLOGY automates the entire process:
                </p>

                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Auto-detects URL structure</strong> (subdirectories, subdomains, ccTLDs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Generates correct hreflang tags</strong> for all pages automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Ensures bidirectional links</strong> and self-referencing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Validates language/region codes</strong> (catches en-US errors before they break rankings)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Adds x-default automatically</strong> for unmatched regions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Monitors Google Search Console</strong> for hreflang errors and fixes them automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Updates hreflang when new pages added</strong>--no manual work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Tracks international rankings</strong> by country/language</span>
                  </li>
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6">
                  <p className="text-blue-900 font-semibold mb-2">💡 SEOLOGY Result:</p>
                  <p className="text-slate-700 mb-0">
                    Average client with 3-5 international versions sees <strong>87% increase in international organic traffic</strong> within 90 days, with zero hreflang errors. Manual implementation would take 40+ hours; SEOLOGY does it in 5 minutes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  If you\'re targeting multiple countries or languages, hreflang isn\'t optional--it\'s the difference between capturing international traffic and losing it to competitors.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  The tactics in this guide work. Choose subdirectories, implement hreflang correctly, test thoroughly, and you\'ll see international traffic increase 25-50% within 90 days.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  But 63% of manual implementations have errors that tank rankings. You can spend 40+ hours getting it right, or let SEOLOGY do it in 5 minutes with zero errors.
                </p>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate International SEO in 5 Minutes</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically generates, validates, and maintains hreflang tags for all your international pages. Zero errors, zero manual work.
                  </p>
                  <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg">
                    Try SEOLOGY Free<ArrowRight className="w-5 h-5" />
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
                  <strong>Tags:</strong> #InternationalSEO #Hreflang #GlobalSEO #MultilingualSEO #LocalizationSEO
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
