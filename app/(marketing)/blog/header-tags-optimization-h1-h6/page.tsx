import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Header Tags Optimization: H1-H6 Best Practices for SEO',
  description: 'Header tags structure your content for Google. This guide shows the exact header hierarchy that ranks pages #1.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'header-tags-optimization-h1-h6').slice(0, 4)

  return (
    <article className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-blue-400">Home</Link>
            {' '}/{' '}
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            {' '}/{' '}
            <span>Header Tags Optimization</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Header Tags Optimization: H1-H6 Best Practices for SEO
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>October 20, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Header tags structure your content for Google. This guide shows the <strong className="text-white">exact header hierarchy</strong> that ranks pages #1.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Optimize Headers Automatically
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
                Header tags (H1-H6) tell Google what your content is about. Proper header structure improves rankings by <strong>36%</strong> on average. This guide covers 13 best practices: one H1 per page, descriptive headers, keyword placement, logical hierarchy, accessibility, and common mistakes to avoid. SEOLOGY automatically optimizes header tags across your site.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Header Tags Matter for SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Header tags aren\'t just for formatting—they\'re critical ranking signals:
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">36%</div>
                    <div className="text-slate-700">Average ranking improvement with optimized header structure</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
                    <div className="text-slate-700">Of top-ranking pages use H1-H3 tags properly</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-red-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">2.5x</div>
                    <div className="text-slate-700">Higher chance of featured snippets with proper header hierarchy</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                    <div className="text-4xl font-bold text-orange-600 mb-2">41%</div>
                    <div className="text-slate-700">Longer time on page with clear header structure (improved UX)</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 13 Header Tag Best Practices</h2>

                <h3 className="text-2xl font-bold mb-4 mt-8">H1 Tag Rules (4 Best Practices)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">1. Use Exactly One H1 Per Page</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Rule:</strong> Every page needs exactly one H1—no more, no less.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Why:</strong> H1 is your page\'s main topic signal. Multiple H1s confuse Google.
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> ✅ &lt;h1&gt;Complete Guide to Header Tag SEO&lt;/h1&gt; (one H1)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">2. Include Primary Keyword in H1</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Rule:</strong> H1 should contain your target keyword naturally.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Best Practice:</strong> Place keyword near the beginning of H1 when possible.
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> "Header Tag Optimization: Complete SEO Guide" (keyword first)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">3. Keep H1 Under 70 Characters</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Optimal Length:</strong> 30-70 characters (about 6-10 words).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Why:</strong> Short, punchy H1s are easier to scan and understand.
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> ✅ "Header Tags: SEO Best Practices" (35 chars) vs ❌ "This is a comprehensive guide..." (too long)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">4. Make H1 Different From Title Tag</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Title tag optimized for clicks, H1 optimized for content comprehension.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Example:</strong> Title: "Header Tags: Boost Rankings by 36% (Complete Guide)" | H1: "Header Tag Optimization Best Practices"
                    </p>
                    <p className="text-slate-700">
                      <strong>Note:</strong> Both should target same primary keyword.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-8">H2-H6 Hierarchy (5 Best Practices)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">5. Follow Logical Hierarchy Order</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Rule:</strong> Never skip heading levels (e.g., H1 → H3 without H2).
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Correct Structure:</strong> H1 &gt; H2 &gt; H3 &gt; H3 &gt; H2 &gt; H3
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">6. Use H2 for Main Section Titles</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> H2 tags divide content into major sections.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Best Practice:</strong> Include secondary keywords in H2s naturally.
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> H2: "Why Header Tags Matter for SEO" (includes "SEO" keyword variant)
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">7. Use H3 for Subsections</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Purpose:</strong> H3 tags break down H2 sections into smaller topics.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>When to Use:</strong> When H2 section has multiple distinct points.
                    </p>
                    <p className="text-slate-700">
                      <strong>Example:</strong> H2: "Header Tag Best Practices" → H3: "H1 Optimization" + H3: "H2-H6 Hierarchy"
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">8. Rarely Use H4-H6 Tags</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Reality:</strong> Most content needs only H1-H3.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>When to Use H4-H6:</strong> Very long, complex guides with deep hierarchies.
                    </p>
                    <p className="text-slate-700">
                      <strong>Tip:</strong> If you need H5/H6, consider splitting into separate pages.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">9. Make Headers Descriptive</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Bad:</strong> ❌ "Introduction" or "Overview" (too generic)
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Good:</strong> ✅ "Why Header Tag Optimization Matters for Rankings"
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Descriptive headers improve featured snippet chances.
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 mt-8">Advanced Strategies (4 Best Practices)</h3>
                <div className="space-y-6 mb-8">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">10. Optimize for Featured Snippets</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Strategy:</strong> Use question-based H2/H3 tags.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Example:</strong> H2: "What Are Header Tags?" + H2: "Why Do Header Tags Matter?"
                    </p>
                    <p className="text-slate-700">
                      <strong>Impact:</strong> Google often pulls answers directly from sections with question headers.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">11. Use Numbers in Headers</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Example:</strong> "13 Header Tag Best Practices" vs "Header Tag Best Practices"
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Benefit:</strong> Numbers increase click-through rates and scannability.
                    </p>
                    <p className="text-slate-700">
                      <strong>Data:</strong> Headers with numbers get 36% more engagement.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">12. Ensure Accessibility Compliance</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Requirement:</strong> Screen readers use header tags for navigation.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Rule:</strong> Never use headers for styling—use CSS instead.
                    </p>
                    <p className="text-slate-700">
                      <strong>Test:</strong> Use browser screen reader to verify logical flow.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h4 className="text-xl font-bold mb-3">13. Keep Headers Concise</h4>
                    <p className="text-slate-700 mb-3">
                      <strong>Optimal Length:</strong> H2-H3: 40-60 characters, H4-H6: 30-50 characters.
                    </p>
                    <p className="text-slate-700 mb-3">
                      <strong>Why:</strong> Long headers reduce scannability and mobile UX.
                    </p>
                    <p className="text-slate-700">
                      <strong>Tip:</strong> If header is a full sentence, it\'s probably too long.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Header Tag Mistakes</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Multiple H1 tags per page:</strong> Confuses Google about page topic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Skipping header levels:</strong> H1 → H3 breaks hierarchy logic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Keyword stuffing in headers:</strong> "Best SEO Tips | SEO Guide | SEO Tactics" looks spammy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Using headers for styling:</strong> &lt;h3&gt; just to make text bigger</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>Generic headers:</strong> "Introduction," "Conclusion," "More Information"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold flex-shrink-0">❌</span>
                    <span><strong>No headers at all:</strong> Wall of text with no structure</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Optimizes Headers Automatically</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  SEOLOGY automatically fixes header tag issues:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Detects and fixes multiple H1 tags (consolidates to single H1)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Corrects broken hierarchies (fixes skipped levels)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Adds keywords to headers naturally using AI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Replaces generic headers with descriptive ones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Monitors header structure 24/7 across all pages</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Perfect Header Tags on Every Page</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically optimizes header tags across your entire site—no manual work required.
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
