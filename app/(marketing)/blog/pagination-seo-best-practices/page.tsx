import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pagination SEO: Handle Multi-Page Content Without Killing Rankings',
  description: 'Pagination confuses Google and wastes crawl budget. This guide shows 5 proven methods to handle paginated content.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['faceted-navigation-seo-guide', 'crawl-budget-optimization-guide', 'site-architecture-seo-best-practices'].includes(post.slug)
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
            <span>Pagination SEO</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Pagination SEO: Handle Multi-Page Content Without Killing Rankings
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>August 28, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Pagination confuses Google and <strong className="text-white">wastes crawl budget</strong>. This guide shows 5 proven methods to handle paginated content.
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
                Pagination is an SEO nightmare. Blog archives, product categories, and search results spread across pages 2, 3, 4+ create <strong>duplicate content, waste crawl budget, and dilute authority</strong>. This guide covers 5 proven pagination strategies--from "View All" to rel=next/prev--and when to use each. SEOLOGY implements optimal pagination automatically.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Pagination Destroys SEO (And You Don\'t Realize It)</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Every paginated series creates SEO problems:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Duplicate content:</strong> Page 1, 2, 3 have similar titles, headers, and navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Crawl budget waste:</strong> Google crawls hundreds of pagination pages instead of important content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Authority dilution:</strong> Backlinks spread across /page/1, /page/2, /page/3</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Poor user experience:</strong> Deep pages are slow and rarely visited</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Keyword cannibalization:</strong> Multiple pages target the same keyword unintentionally</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Sites with poor pagination strategies lose 30-50% of their potential rankings.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">5 Proven Pagination Strategies (And When to Use Each)</h2>

                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">"View All" Page (Best for Most Sites):</strong>
                      <p className="text-slate-700 mt-1">Create a single page with all content. Canonical paginated pages to the "View All" page. Google indexes one strong page instead of many weak ones. Works when total content is under 5,000 items and loads reasonably fast.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Rel=Next and Rel=Prev (Google\'s Old Method):</strong>
                      <p className="text-slate-700 mt-1">Google deprecated this in 2019, but Bing still uses it. Add rel="next" and rel="prev" tags to indicate pagination series. Google now treats these as hints, not directives. Not recommended as primary strategy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Self-Referencing Canonicals (Let Google Decide):</strong>
                      <p className="text-slate-700 mt-1">Each page canonicals to itself. Google treats pages independently. Works for ecommerce categories where each page has unique products. Allows Google to index deep pages with strong internal links.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Canonical to Page 1 (For Thin Pages):</strong>
                      <p className="text-slate-700 mt-1">All paginated pages canonical to page 1. Consolidates authority but loses deep content from indexing. Use only when pages 2+ have minimal unique value.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Load More / Infinite Scroll (Modern Approach):</strong>
                      <p className="text-slate-700 mt-1">JavaScript loads more content as users scroll. Implement with History API to create unique URLs for each state. Ensure Google can crawl paginated URLs via sitemap or internal links. Test with URL Inspection Tool.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Pagination Best Practices by Content Type</h2>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">Blog</div>
                    <div className="text-slate-700">Use "View All" or Load More with unique URLs</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">Ecommerce</div>
                    <div className="text-slate-700">Self-referencing canonicals with strong internal linking</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">Forum</div>
                    <div className="text-slate-700">Infinite scroll with crawlable pagination URLs</div>
                  </div>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Additional Tactics:</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Unique titles per page:</strong> "Category Name - Page 2 of 10" helps Google understand structure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Robots meta noindex for deep pages:</strong> Pages 10+ rarely get traffic--noindex to save crawl budget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Internal links from page 1:</strong> Link to high-value products on page 2, 3 directly from page 1</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Breadcrumbs on every page:</strong> Helps Google understand site structure and provides navigation</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Pagination URL Structure Best Practices</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  URL structure affects how Google treats paginated pages:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use /page/2 format:</strong> Clean, readable URLs like /category/shoes/page/2</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Avoid parameters when possible:</strong> /category?page=2 is less ideal than /category/page/2</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Keep page 1 at root:</strong> /category (not /category/page/1) for cleaner primary URL</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Include pagination in sitemap:</strong> Or use robots.txt to allow/block pagination intelligently</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Testing Your Pagination Strategy</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Verify your pagination is SEO-friendly:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Check Search Console Coverage:</strong> Look for "Duplicate, submitted URL not indexed" errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Test with URL Inspection:</strong> Verify Google can render and index paginated pages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Audit with Screaming Frog:</strong> Crawl site to find canonical chains and pagination issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Monitor crawl stats:</strong> High page counts with low crawling efficiency indicate pagination problems</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">SEOLOGY Handles Pagination Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY analyzes your content structure, implements the optimal pagination strategy, and monitors for pagination issues that waste crawl budget.
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
                  <strong>Tags:</strong> #PaginationSEO #TechnicalSEO #CrawlBudget
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
