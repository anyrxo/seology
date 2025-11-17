import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canonical Tags: The Definitive Guide to Fixing Duplicate Content',
  description: 'Canonical tags prevent duplicate content penalties. This guide shows when and how to use rel=canonical correctly.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['duplicate-content-solutions-guide', 'technical-seo-audit-checklist-2025', '301-redirects-complete-guide'].includes(post.slug)
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
            <span>Canonical Tags Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Canonical Tags: The Definitive Guide to Fixing Duplicate Content
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>August 30, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Canonical tags prevent <strong className="text-white">duplicate content penalties</strong>. This guide shows when and how to use rel=canonical correctly.
          </p>

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

      <div className="bg-white text-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 mt-0">TL;DR</h2>
              <p className="text-slate-700 mb-0">
                Duplicate content dilutes your rankings. <strong>Canonical tags tell Google which version to index</strong>, consolidating ranking signals into one URL. This guide covers every canonical tag scenario--from basic implementation to complex ecommerce situations. SEOLOGY implements canonical tags automatically.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">What Are Canonical Tags (And Why They Matter)</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  A canonical tag is an HTML element that tells search engines which version of a duplicate or similar page is the master copy:
                </p>
                <div className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto my-6">
                  <pre className="text-sm"><code>{`<link rel="canonical" href="https://example.com/page/" />`}</code></pre>
                </div>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Consolidates ranking signals:</strong> All links, authority, and rankings point to one URL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Prevents keyword cannibalization:</strong> Stops similar pages from competing with each other</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Avoids duplicate content penalties:</strong> Google won\'t penalize you for necessary duplicates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Preserves crawl budget:</strong> Google doesn\'t waste time crawling duplicate pages</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Without canonical tags, duplicate content can reduce your rankings by 40-60%.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Duplicate Content Scenarios</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Most sites have duplicate content without realizing it. Here are the most common cases:
                </p>

                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">WWW vs Non-WWW:</strong>
                      <p className="text-slate-700 mt-1">example.com and www.example.com are different URLs. Canonical tag must point to your preferred version. Most sites forget this.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">HTTP vs HTTPS:</strong>
                      <p className="text-slate-700 mt-1">After SSL migration, both versions may remain indexed. Canonical should always point to HTTPS.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Trailing Slash Variants:</strong>
                      <p className="text-slate-700 mt-1">/page and /page/ are technically different. Pick one format and canonicalize consistently.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">URL Parameters:</strong>
                      <p className="text-slate-700 mt-1">?utm_source=, ?ref=, ?page=2 create infinite duplicate URLs. Canonical to the clean version.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Faceted Navigation:</strong>
                      <p className="text-slate-700 mt-1">Filter combinations (color, size, price) create thousands of duplicate product pages. Canonical to main category.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <strong className="text-xl">Print and Mobile Versions:</strong>
                      <p className="text-slate-700 mt-1">/print-page and /mobile-page should canonical to the standard version.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How to Implement Canonical Tags Correctly</h2>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
                    <div className="text-slate-700">Canonical per page (never multiple)</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                    <div className="text-slate-700">Google follows canonical tags</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">Strong</div>
                    <div className="text-slate-700">Signal strength (not a directive)</div>
                  </div>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Implementation Steps:</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Place in HTML head:</strong> Canonical tag must be in the &lt;head&gt; section of the page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use absolute URLs:</strong> Always use full URLs (https://example.com/page), not relative (/page)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Self-referencing canonicals:</strong> Every page should canonical to itself (best practice)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Only one canonical tag:</strong> Multiple canonical tags confuse Google--use only one per page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Match protocol and subdomain:</strong> If canonical is HTTPS, don\'t point to HTTP version</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Canonical Tag Mistakes That Kill Rankings</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  These errors are common and destructive:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Canonical to wrong page:</strong> Pointing product page to homepage deindexes the product page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Canonical to non-canonical page:</strong> Creates canonical chain that Google may ignore</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Canonical to 404 page:</strong> Google ignores the canonical and indexes the wrong version</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Paginated pages canonical to page 1:</strong> Loses deep content from page 2, 3, etc.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Conflicting signals:</strong> Canonical says page A, but robots.txt blocks page A</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Canonical vs 301 Redirect: When to Use Which</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Many people confuse canonicals with redirects. Here\'s the difference:
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Use 301 Redirect When:</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>You want users and bots to never see the duplicate page</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>The duplicate page is permanently retired</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Moving from HTTP to HTTPS or old domain to new domain</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Use Canonical Tag When:</strong>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>You want users to access both versions but Google to index only one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Handling URL parameters, filters, or sorting options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Syndicating content across multiple sites</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">SEOLOGY Fixes Canonical Tag Issues Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY audits your entire site for canonical tag errors, implements correct canonicals, and monitors for duplicate content issues 24/7.
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
                  <strong>Tags:</strong> #CanonicalTags #DuplicateContent #TechnicalSEO
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

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
