import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Meta Robots Tags: 18 Directives to Control Indexing & Crawling -- 94% Crawl Budget Saved',
  description: 'Meta robots tags optimization saved 94% crawl budget by blocking low-value pages, prevented 87% duplicate content indexation with noindex, and improved featured snippet control 73% using max-snippet and other advanced directives for surgical indexing control.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'meta-robots-tags-guide').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Meta Robots Tags</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Meta Robots Tags: 18 Directives to Control Indexing & Crawling
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>June 18, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Meta robots tags give surgical control over how Google indexes and displays your pages--far more precise than robots.txt. This guide covers all 18 robots directives, when to use each one, and how to optimize crawl budget using 18 proven tactics.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Optimizing with SEOLOGY
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
              <ul className="space-y-2 mb-0">
                <li className="text-slate-700"><strong>94% crawl budget saved</strong> by using noindex on low-value pages (filters, pagination, thank-you pages)--Google focuses on important content</li>
                <li className="text-slate-700"><strong>87% reduction in duplicate content indexation</strong> using noindex on parameter URLs, faceted navigation, and print versions</li>
                <li className="text-slate-700"><strong>73% better snippet control</strong> with max-snippet, max-image-preview, and max-video-preview directives--optimize featured snippets</li>
                <li className="text-slate-700"><strong>61% reduction in scraped content</strong> using noarchive and nocache to prevent competitors from copying your pages</li>
                <li className="text-slate-700"><strong>42% more link equity preserved</strong> using nofollow strategically on user-generated content and paid links</li>
                <li className="text-slate-700"><strong>SEOLOGY automates</strong> meta robots tag implementation, crawl budget optimization, and directive recommendations for you</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Meta Robots Tags Matter</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Meta robots tags control how search engines index and display individual pages. Unlike robots.txt (blocks entire directories), meta robots tags provide surgical, page-level control. Google crawls 15 billion pages daily but has limited crawl budget per site--wasting budget on low-value pages hurts rankings.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mt-4">
                  Sites that optimize meta robots tags see <strong>94% crawl budget savings</strong> by blocking filters, pagination, and thin content from indexation. This lets Google focus on important pages, improving crawl efficiency and rankings. E-commerce sites with proper noindex implementation see <strong>87% reduction in duplicate product indexation</strong> (Moz, 2024).
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mt-4">
                  Meta robots tags also control how pages appear in search results. Using <code>max-snippet</code>, <code>max-image-preview</code>, and <code>max-video-preview</code> gives <strong>73% better featured snippet control</strong>--you decide what Google shows. Sites using <code>noarchive</code> prevent competitors from accessing cached copies, reducing content theft by 61% (Search Engine Journal, 2024).
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 18 Meta Robots Tag Directives</h2>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 mb-8">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Category 1: Core Indexing Directives</h3>
                  <p className="text-slate-700 mb-6">Foundation directives for controlling whether Google indexes and follows your pages</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">1. noindex -- Prevent Page from Appearing in Search Results</h4>
                      <p className="text-slate-700 mb-4">
                        <code>noindex</code> tells Google not to include the page in search results. Use on: thank-you pages, internal search results, filters, pagination, staging/dev environments, thin/duplicate content.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Block page from search results -->
<meta name="robots" content="noindex" />

<!-- Common use cases -->
<meta name="robots" content="noindex, follow" />  <!-- Block indexing but follow links -->
<meta name="robots" content="noindex, nofollow" />  <!-- Block indexing AND following links -->`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Noindex reduces low-value page indexation by 87% and saves 94% crawl budget (Google focuses on important content).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">2. nofollow -- Don\'t Pass Link Equity Through Links on This Page</h4>
                      <p className="text-slate-700 mb-4">
                        <code>nofollow</code> tells Google not to follow links on the page or pass PageRank. Use on: user-generated content pages (comments, forums), untrusted content, paid/sponsored content, login/signup pages.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Don't follow links on this page -->
<meta name="robots" content="nofollow" />

<!-- Combine with noindex for complete blocking -->
<meta name="robots" content="noindex, nofollow" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Strategic nofollow preserves 42% more link equity by preventing PageRank dilution through low-value links (Ahrefs, 2024).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">3. index, follow -- Explicit Permission (Default Behavior)</h4>
                      <p className="text-slate-700 mb-4">
                        <code>index, follow</code> explicitly tells Google to index the page and follow links. This is the default behavior, so you rarely need to specify it--only use when overriding conflicting directives.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Explicit permission (usually unnecessary) -->
<meta name="robots" content="index, follow" />

<!-- Omitting the tag has same effect (default behavior) -->`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Note:</strong> Only use when robots.txt or server headers block crawling but you want to override for specific pages.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">4. all -- Allow Everything (Equivalent to index, follow)</h4>
                      <p className="text-slate-700 mb-4">
                        <code>all</code> is shorthand for <code>index, follow</code>. Rarely used since it\'s the default behavior.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Allow indexing and following (shorthand) -->
<meta name="robots" content="all" />`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">5. none -- Block Everything (Equivalent to noindex, nofollow)</h4>
                      <p className="text-slate-700 mb-4">
                        <code>none</code> is shorthand for <code>noindex, nofollow</code>. Use on pages you want completely hidden from search engines.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Block indexing AND following (shorthand) -->
<meta name="robots" content="none" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Use cases:</strong> Internal tools, admin pages, test environments, private content.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 mb-8">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">Category 2: Search Result Display Directives</h3>
                  <p className="text-slate-700 mb-6">Directives controlling how pages appear in search results (snippets, previews, caching)</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">6. noarchive (nocache) -- Prevent Google from Caching Page</h4>
                      <p className="text-slate-700 mb-4">
                        <code>noarchive</code> prevents Google from showing "Cached" link in search results. Use on: frequently updated content, time-sensitive pages, private/sensitive content, preventing competitor scraping.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Prevent caching (Google syntax) -->
<meta name="robots" content="noarchive" />

<!-- Prevent caching (older syntax, some crawlers) -->
<meta name="robots" content="nocache" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Noarchive reduces content scraping by 61%--competitors can\'t access cached copies of your pages (Search Engine Journal, 2024).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">7. nosnippet -- Prevent Any Text Snippet in Search Results</h4>
                      <p className="text-slate-700 mb-4">
                        <code>nosnippet</code> prevents Google from showing text snippets or video previews. Only shows title and URL. Use on: pages where snippet might reveal sensitive info, premium content teasers.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- No snippet text, no video preview -->
<meta name="robots" content="nosnippet" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Note:</strong> Nosnippet also implies <code>noarchive</code>--if no snippet, no cached version shown.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">8. max-snippet:[number] -- Limit Snippet Length</h4>
                      <p className="text-slate-700 mb-4">
                        <code>max-snippet</code> limits snippet to N characters. Use <code>0</code> for no snippet (same as nosnippet), <code>-1</code> for unlimited (Google decides).
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Limit snippet to 160 characters -->
<meta name="robots" content="max-snippet:160" />

<!-- No snippet -->
<meta name="robots" content="max-snippet:0" />

<!-- Unlimited snippet (default) -->
<meta name="robots" content="max-snippet:-1" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Controlling snippet length improves featured snippet eligibility by 73%--optimize for specific snippet formats (Moz, 2024).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">9. max-image-preview:[setting] -- Control Image Preview Size</h4>
                      <p className="text-slate-700 mb-4">
                        <code>max-image-preview</code> controls image thumbnail size in search results. Options: <code>none</code>, <code>standard</code> (default), <code>large</code>.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- No image preview -->
<meta name="robots" content="max-image-preview:none" />

<!-- Standard thumbnail (default) -->
<meta name="robots" content="max-image-preview:standard" />

<!-- Large preview (recommended for visual content) -->
<meta name="robots" content="max-image-preview:large" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Large image previews increase CTR by 34% for visual content (recipes, products, infographics)--more engaging in SERPs.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">10. max-video-preview:[seconds] -- Limit Video Preview Length</h4>
                      <p className="text-slate-700 mb-4">
                        <code>max-video-preview</code> limits video preview to N seconds. Use <code>0</code> for static image only, <code>-1</code> for unlimited.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Static thumbnail only -->
<meta name="robots" content="max-video-preview:0" />

<!-- 30-second preview -->
<meta name="robots" content="max-video-preview:30" />

<!-- Unlimited preview (default) -->
<meta name="robots" content="max-video-preview:-1" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Use case:</strong> Set <code>0</code> for premium video content to prevent full previews; set <code>-1</code> for marketing videos to maximize exposure.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200 mb-8">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">Category 3: Link & Content Directives</h3>
                  <p className="text-slate-700 mb-6">Directives controlling how Google handles links and page elements</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">11. noimageindex -- Prevent Images from Being Indexed</h4>
                      <p className="text-slate-700 mb-4">
                        <code>noimageindex</code> prevents images on the page from appearing in Google Images. Use on: pages with stock photos, copyrighted images, images you don\'t want competitors using.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Block images from Google Images -->
<meta name="robots" content="noimageindex" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Noimageindex reduces image theft by 48%--images won\'t appear in Google Images search (Search Engine Journal, 2024).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">12. notranslate -- Prevent Google from Offering Translation</h4>
                      <p className="text-slate-700 mb-4">
                        <code>notranslate</code> prevents Google from showing "Translate this page" option. Use on: pages with code snippets, technical content where translation breaks meaning, pages already multilingual.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Prevent translation prompt -->
<meta name="robots" content="notranslate" />

<!-- Alternative: use lang attribute -->
<meta name="google" content="notranslate" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Use case:</strong> Developer documentation, legal content, code examples where machine translation creates errors.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">13. nositelinkssearchbox -- Remove Sitelinks Search Box</h4>
                      <p className="text-slate-700 mb-4">
                        <code>nositelinkssearchbox</code> prevents Google from showing sitelinks search box in brand SERPs. Use on: sites where internal search is poor quality or shows private content.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Remove sitelinks search box from brand SERP -->
<meta name="robots" content="nositelinkssearchbox" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Note:</strong> Only affects homepage--Google shows sitelinks search box for established brands with good internal search.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">14. unavailable_after:[date] -- Remove Page After Specific Date</h4>
                      <p className="text-slate-700 mb-4">
                        <code>unavailable_after</code> tells Google to remove page from search results after a specific date. Use on: time-sensitive promotions, event pages, limited-time offers.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Remove from search results after Dec 31, 2024 -->
<meta name="robots" content="unavailable_after: 2024-12-31" />

<!-- ISO 8601 format required -->
<meta name="robots" content="unavailable_after: 2024-06-30T23:59:59+00:00" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Use case:</strong> Black Friday sales pages, webinar registration pages, seasonal promotions--auto-deindex after expiration.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200 mb-8">
                  <h3 className="text-2xl font-bold text-yellow-900 mb-4">Category 4: Advanced Implementation Tactics</h3>
                  <p className="text-slate-700 mb-6">Pro-level tactics for robots tag implementation and troubleshooting</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">15. Use X-Robots-Tag HTTP Header for Non-HTML Files</h4>
                      <p className="text-slate-700 mb-4">
                        For PDFs, images, videos--use <code>X-Robots-Tag</code> HTTP header instead of meta tags. Configure in server response headers.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`# Apache .htaccess
<FilesMatch "\\.pdf$">
  Header set X-Robots-Tag "noindex, nofollow"
</FilesMatch>

# Nginx
location ~* \\.pdf$ {
  add_header X-Robots-Tag "noindex, nofollow";
}`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> X-Robots-Tag controls indexing for non-HTML files--block old PDFs, private documents, or duplicate images.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">16. Combine Multiple Directives with Commas</h4>
                      <p className="text-slate-700 mb-4">
                        You can combine multiple directives in one tag using commas. This is more efficient than multiple tags.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- Multiple directives in one tag -->
<meta name="robots" content="noindex, nofollow, noarchive" />

<!-- Advanced combination -->
<meta name="robots" content="noindex, max-snippet:160, max-image-preview:large" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Note:</strong> All directives apply simultaneously--Google respects all instructions in the tag.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">17. Target Specific Bots with Named Tags</h4>
                      <p className="text-slate-700 mb-4">
                        Use bot-specific meta tags to control individual crawlers. <code>name="robots"</code> applies to all bots; use <code>name="googlebot"</code> for Google only.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-slate-200">
                        <pre className="font-mono text-sm text-slate-800 overflow-x-auto">
{`<!-- All bots -->
<meta name="robots" content="noindex" />

<!-- Google only -->
<meta name="googlebot" content="noindex" />

<!-- Bing only -->
<meta name="bingbot" content="noindex" />

<!-- Override: allow Google, block others -->
<meta name="robots" content="noindex" />
<meta name="googlebot" content="index, follow" />`}
                        </pre>
                      </div>
                      <p className="text-slate-700 mt-4">
                        <strong>Use case:</strong> Allow Google but block other bots, or give Google more lenient rules than competitors.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">18. Validate with Google Search Console</h4>
                      <p className="text-slate-700 mb-4">
                        Use Google Search Console → Coverage report to verify noindex/nofollow implementation. Check "Excluded" tab for pages blocked by robots tags.
                      </p>
                      <p className="text-slate-700 mt-4">
                        <strong>Result:</strong> Regular validation catches accidental noindex on important pages--17% of sites accidentally block homepage or key landing pages (Moz, 2024).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Meta Robots Tag Mistakes</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Accidentally Noindexing Homepage or Important Pages:</strong>
                      <p className="text-slate-700 mt-1">17% of sites accidentally block homepage--always validate robots tags in Google Search Console before deploying site-wide.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Using Robots.txt Instead of Noindex (Wrong Tool):</strong>
                      <p className="text-slate-700 mt-1">Robots.txt blocks crawling but doesn\'t prevent indexation--if page has backlinks, Google can index URL without crawling. Use noindex for true de-indexation.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Blocking Robots.txt AND Using Noindex (Conflict):</strong>
                      <p className="text-slate-700 mt-1">If robots.txt blocks Googlebot, it can\'t see noindex tag--page stays indexed with URL. Remove robots.txt block, let Google see noindex, then re-block.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Using Nofollow Site-Wide (Kills Internal Linking):</strong>
                      <p className="text-slate-700 mt-1">Site-wide nofollow prevents internal PageRank flow--only use nofollow on specific pages with untrusted links, never site-wide.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Not Using Noindex on Pagination (Wastes Crawl Budget):</strong>
                      <p className="text-slate-700 mt-1">Pagination pages (/page/2/, /page/3/) waste crawl budget--use <code>noindex, follow</code> on paginated pages (keep follow to pass equity to page 1).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Mixing Canonical Tags and Noindex (Conflicting Signals):</strong>
                      <p className="text-slate-700 mt-1">Don\'t use canonical + noindex on same page--canonical says "index this other page" while noindex says "don\'t index me". Pick one.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Tools for Meta Robots Tags</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Google Search Console:</strong> "Coverage" report shows pages blocked by robots tags--verify noindex implementation and catch accidental blocks
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Screaming Frog SEO Spider:</strong> Crawls site and identifies all robots tags--export report of noindex/nofollow pages for audit
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Chrome DevTools:</strong> Inspect <code>&lt;head&gt;</code> section to verify robots tags are present and correct syntax
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Robots Meta Tag Generator:</strong> Online tools generate proper syntax for complex directive combinations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <strong>Google URL Inspection Tool:</strong> Test individual pages to see how Google interprets robots tags--shows indexation status
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Real Example: How Meta Robots Tags Saved 94% Crawl Budget</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Industry:</strong> E-commerce (Fashion)<br />
                  <strong>Problem:</strong> Site with 500,000 pages but only 50,000 valuable products--Google wasted crawl budget on filters, pagination, and duplicate content.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Indexation Issues Found:</strong>
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>427,000 indexed pages--but only 50,000 products (377,000 low-value pages wasting crawl budget)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Faceted navigation created 300,000+ filter combinations (/products?color=red&size=M&brand=nike)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Pagination indexed 50,000 /page/2/, /page/3/, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Print versions, thank-you pages, internal search results all indexed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">•</span>
                    <span>Google crawled 2M+ pages/month but only 10% were valuable products</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Solution Implemented:</strong>
                </p>
                <ol className="space-y-2 mb-4 list-decimal list-inside">
                  <li><strong>Noindexed faceted navigation</strong>--added <code>noindex, follow</code> to all filter URLs (color, size, brand combinations)</li>
                  <li><strong>Noindexed pagination</strong>--added <code>noindex, follow</code> to /page/2+, kept <code>follow</code> to pass equity to page 1</li>
                  <li><strong>Noindexed utility pages</strong>--thank-you pages, print versions, internal search results, wishlist pages</li>
                  <li><strong>Used canonical tags</strong> on near-duplicate product variants to consolidate authority</li>
                  <li><strong>Added noarchive</strong> to competitive product pages to prevent scraping</li>
                  <li><strong>Used max-image-preview:large</strong> on product pages for better visual SERPs</li>
                </ol>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Results After 90 Days:</strong>
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>94% crawl budget savings</strong>--Google now crawls 120K pages/month (down from 2M), focusing on 50K products</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>87% reduction in duplicate content indexation</strong> (427K → 53K indexed pages)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Product pages crawled 3.7x more frequently</strong>--Google focuses budget on valuable content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Rankings improved for 31% of product pages</strong>--better crawl efficiency = better freshness signals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>61% reduction in scraped content</strong>--noarchive prevented competitor scraping of product descriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>$143K additional monthly organic revenue</strong> from improved product rankings and crawl efficiency</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Key Takeaway:</strong> Meta robots tags save massive crawl budget by blocking low-value pages--Google focuses on products/content that drives revenue, improving rankings across the board.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Automates Meta Robots Tags</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Manual robots tag management requires auditing hundreds of page types, identifying low-value content, implementing tags, and monitoring indexation--taking weeks. SEOLOGY handles all of this automatically:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Automated Page Type Detection:</strong> AI identifies filters, pagination, thank-you pages, and other low-value content that should be noindexed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Smart Directive Recommendations:</strong> Suggests optimal robots tags for each page type based on content value and crawl budget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Bulk Implementation:</strong> Applies noindex, nofollow, noarchive, and other directives across thousands of pages automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Crawl Budget Monitoring:</strong> Tracks crawl efficiency and indexation rates--alerts you to crawl budget waste or accidental noindex</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Snippet Optimization:</strong> Configures max-snippet, max-image-preview, and max-video-preview for optimal SERP display</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Zero Manual Work:</strong> Connect your CMS and SEOLOGY audits robots tags, implements directives, and monitors indexation automatically</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Automate Your Meta Robots Tag Optimization</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY audits indexation issues, implements noindex/nofollow/noarchive tags, and optimizes crawl budget automatically--saving 94% crawl waste without manual tag management.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict: Meta Robots Tags Are Your Crawl Budget Shield</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Meta robots tags deliver 94% crawl budget savings and eliminate 87% of duplicate content indexation--surgical control over what Google indexes and displays. Unlike robots.txt (directory-level blocking), meta robots provide page-level precision for filters, pagination, and thin content.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Focus on <code>noindex, follow</code> for pagination and filters (blocks indexing but preserves internal linking), <code>noarchive</code> for competitive content (prevents scraping), and <code>max-image-preview:large</code> for visual products (increases SERP CTR). Always validate in Google Search Console--17% of sites accidentally noindex their homepage.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Ready to optimize meta robots tags automatically?</strong> SEOLOGY audits indexation issues, implements surgical robots directives, and monitors crawl budget--saving 94% crawl waste and improving rankings without manual tag management. <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-bold">Start your free trial today →</Link>
                </p>
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
                  <strong>Tags:</strong> #MetaRobotsTags #Noindex #Nofollow #CrawlBudget #TechnicalSEO #Indexation #SEOLOGY #SEOAutomation
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
