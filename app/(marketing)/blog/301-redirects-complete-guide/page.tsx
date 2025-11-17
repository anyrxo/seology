export const metadata: Metadata = {
  title: '301 Redirects: Complete Guide to Preserving SEO Value',
  description: 'Bad redirects destroy 15-30% of your rankings. This guide shows how to implement 301 redirects without losing SEO value.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['redirect-chains-audit-fix', 'https-migration-seo-guide', 'canonical-tags-duplicate-content-guide'].includes(post.slug)
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
            <span>301 Redirects Guide</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            301 Redirects: Complete Guide to Preserving SEO Value
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>August 25, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Bad redirects destroy <strong className="text-white">15-30% of your rankings</strong>. This guide shows how to implement 301 redirects without losing SEO value.
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
                <strong>301 redirects permanently move one URL to another</strong> while preserving 90-99% of SEO value. But most people screw them up—causing massive traffic losses during site migrations, redesigns, and URL changes. This guide covers proper implementation, redirect chains, testing, and the 7 fatal redirect mistakes that tank rankings.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">What Is a 301 Redirect (And Why It Matters)</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  A 301 redirect is a permanent server-side redirect that tells browsers and search engines:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>"This page has permanently moved to a new URL"</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Passes 90-99% of link equity</strong> to the new URL (Google confirmed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Updates search results</strong> to show the new URL instead of the old one</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Preserves user experience</strong> by automatically sending visitors to the right page</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Without 301s, changing URLs means starting from scratch in rankings.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">301 vs 302 vs 307: Which Redirect to Use</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">301</div>
                    <div>
                      <strong className="text-xl">301 Moved Permanently:</strong>
                      <p className="text-slate-700 mt-1">Use for permanent URL changes. Passes link equity. Google updates index. This is what you want 95% of the time.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">302</div>
                    <div>
                      <strong className="text-xl">302 Found (Temporary):</strong>
                      <p className="text-slate-700 mt-1">Use for temporary moves only. Does NOT pass full link equity. Google keeps indexing old URL. Use for A/B tests, seasonal pages, or maintenance.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">307</div>
                    <div>
                      <strong className="text-xl">307 Temporary Redirect:</strong>
                      <p className="text-slate-700 mt-1">HTTP/1.1 version of 302. Preserves request method (POST stays POST). Rarely needed for SEO.</p>
                    </div>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong>Rule of thumb:</strong> If the change is permanent, use 301. If temporary, use 302. Never use 302 when you mean 301—you\'ll lose rankings.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How to Implement 301 Redirects</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Implementation depends on your server and platform:
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">90-99%</div>
                    <div className="text-slate-700">Link equity passed by 301 redirects</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">6mo+</div>
                    <div className="text-slate-700">Keep redirects active minimum duration</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">1:1</div>
                    <div className="text-slate-700">Ideal redirect ratio (one old URL to one new URL)</div>
                  </div>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Apache (.htaccess):</strong>
                </p>
                <div className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto my-6">
                  <pre className="text-sm"><code>{`# Single page redirect
Redirect 301 /old-page.html https://example.com/new-page/

# Entire directory redirect
RedirectMatch 301 ^/old-directory/(.*) https://example.com/new-directory/$1

# Domain redirect
RewriteEngine On
RewriteCond %{HTTP_HOST} ^old-domain\\.com [NC]
RewriteRule ^(.*)$ https://new-domain.com/$1 [L,R=301]`}</code></pre>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Nginx:</strong>
                </p>
                <div className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto my-6">
                  <pre className="text-sm"><code>{`# Single page redirect
location = /old-page.html {
    return 301 https://example.com/new-page/;
}

# Pattern-based redirect
location ~ ^/blog/(.*)$ {
    return 301 https://example.com/articles/$1;
}`}</code></pre>
                </div>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>WordPress (Plugin or code):</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Use Redirection plugin for simple redirects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Or add to functions.php for programmatic redirects</span>
                  </li>
                </ul>

                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  <strong>Shopify:</strong>
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Online Store → Navigation → URL Redirects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Or use CSV import for bulk redirects</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">7 Fatal 301 Redirect Mistakes</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Redirect chains:</strong> Old URL → URL 2 → URL 3 → Final URL loses 15% of link equity per hop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Redirect loops:</strong> URL A → URL B → URL A creates infinite loop and breaks site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Redirecting to homepage:</strong> Redirect product pages to relevant category pages, not homepage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Using 302 instead of 301:</strong> Temporary redirects don\'t pass link equity—rankings drop</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Removing redirects too soon:</strong> Keep redirects active for minimum 6-12 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Not updating internal links:</strong> Update internal links to point directly to new URLs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                    <span><strong>Forgetting to test:</strong> Always test redirects before going live—use redirect checker tools</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How to Test 301 Redirects</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Never deploy redirects without testing:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Browser DevTools:</strong> Network tab shows exact redirect status codes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Online redirect checkers:</strong> Tools like redirect-checker.org test from external servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Screaming Frog:</strong> Crawl entire site to find redirect chains and loops</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Google Search Console:</strong> Submit new URLs and monitor indexing status</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">SEOLOGY Manages Redirects Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY detects redirect chains, fixes redirect loops, and automatically implements 301 redirects when URLs change. Never lose rankings to redirect mistakes.
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
                  <strong>Tags:</strong> #301Redirects #Redirects #SiteMigration
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
