import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { blogPosts } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: 'Alt Text Optimization: Write Perfect Image Descriptions for SEO',
  description: 'Bad alt text wastes image SEO potential. This guide shows how to write alt text that ranks and improves accessibility.',
}
export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['image-optimization-seo-guide', 'schema-markup-complete-guide-2025', 'technical-seo-audit-checklist-2025'].includes(post.slug)
  ).slice(0, 4)
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
            <span>Alt Text Optimization</span>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Alt Text Optimization: Write Perfect Image Descriptions for SEO
          </h1>
          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>August 20, 2024</span>
          </div>
          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Bad alt text wastes image SEO potential. This guide shows how to write alt text that ranks and improves accessibility.
          </p>
          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Optimize Alt Text Automatically
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
                Alt text is a <strong>dual-purpose SEO weapon</strong>: it helps Google understand your images AND makes your site accessible to visually impaired users. Most sites waste this opportunity with generic descriptions like "image1.jpg" or keyword stuffing. This guide shows you how to write alt text that ranks in Google Images, improves accessibility, and drives traffic--automatically with SEOLOGY.
              </p>
            </div>
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Alt Text Matters for SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Alt text (alternative text) serves two critical purposes:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>SEO Ranking Signal:</strong> Google can\'t "see" images--alt text tells search engines what your images show</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Accessibility Compliance:</strong> Screen readers use alt text to describe images to visually impaired users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Image Search Traffic:</strong> Proper alt text helps images rank in Google Image Search--which drives 30% more traffic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Fallback Display:</strong> When images fail to load, alt text shows instead--preserving user experience</span>
                  </li>
                </ul>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                  <div className="text-2xl font-bold text-blue-900 mb-2">Image SEO Impact</div>
                  <div className="text-slate-700">Sites with optimized alt text see <strong>37% higher Google Image Search traffic</strong> and improved overall rankings.</div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">The Alt Text Formula That Ranks</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Perfect alt text balances three elements: description, context, and keywords. Follow this formula:
                </p>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white my-6">
                  <div className="text-xl font-bold mb-4">Alt Text Formula:</div>
                  <div className="text-lg mb-2">[What the image shows] + [Context/Purpose] + [Target keyword if relevant]</div>
                  <div className="text-sm opacity-90 mt-4">Keep it under 125 characters for optimal screen reader experience</div>
                </div>
                <div className="space-y-6 my-6">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <div className="text-xl font-bold text-red-900 mb-2">❌ Bad Alt Text Examples:</div>
                    <ul className="space-y-2 text-slate-700">
                      <li>• "image1.jpg" (no description)</li>
                      <li>• "pic" (too vague)</li>
                      <li>• "blue running shoes blue sneakers blue athletic shoes" (keyword stuffing)</li>
                      <li>• "" (empty alt attribute)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <div className="text-xl font-bold text-green-900 mb-2">✅ Good Alt Text Examples:</div>
                    <ul className="space-y-2 text-slate-700">
                      <li>• "Nike Air Zoom Pegasus 40 running shoes in coastal blue colorway"</li>
                      <li>• "Woman stretching before morning jog in city park"</li>
                      <li>• "Infographic showing 10 marathon training tips for beginners"</li>
                      <li>• "Close-up of trail running shoe tread pattern on muddy terrain"</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Alt Text Best Practices by Image Type</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Different image types require different alt text strategies:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Product Images:</strong>
                      <p className="text-slate-700 mt-1">Include brand, model, color, and key feature: "Samsung Galaxy S24 Ultra smartphone in titanium gray with S Pen stylus"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Infographics:</strong>
                      <p className="text-slate-700 mt-1">Summarize the main message: "Bar chart comparing 2024 social media platform user growth rates"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Decorative Images:</strong>
                      <p className="text-slate-700 mt-1">Use empty alt attribute (alt="") if image adds no informational value</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Screenshots:</strong>
                      <p className="text-slate-700 mt-1">Describe what the screenshot shows: "Google Search Console performance report showing 47% traffic increase"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Logos:</strong>
                      <p className="text-slate-700 mt-1">Simple brand name works: "Nike logo" or "Shopify logo"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">6</div>
                    <div>
                      <strong className="text-xl">Action/Lifestyle Shots:</strong>
                      <p className="text-slate-700 mt-1">Describe the activity and context: "Professional photographer adjusting DSLR camera settings during outdoor portrait session"</p>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Common Alt Text Mistakes to Avoid</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Keyword Stuffing:</strong>
                      <p className="text-slate-700 mt-1">Never repeat keywords multiple times--Google penalizes this and it hurts accessibility</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Using "Image of" or "Picture of":</strong>
                      <p className="text-slate-700 mt-1">Screen readers already announce it\'s an image--just describe what it shows</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Using Filenames:</strong>
                      <p className="text-slate-700 mt-1">"IMG_4387.jpg" tells users and Google nothing useful</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Being Too Vague:</strong>
                      <p className="text-slate-700 mt-1">"Product photo" doesn\'t help--describe WHAT product and its key attributes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl">Alt Text Too Long:</strong>
                      <p className="text-slate-700 mt-1">Keep it under 125 characters--screen readers cut off longer descriptions</p>
                    </div>
                  </li>
                </ul>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">Alt Text vs Title Attribute vs Caption</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Many people confuse these three image attributes. Here\'s the difference:
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-xl font-bold text-blue-900 mb-2">Alt Text</div>
                    <div className="text-slate-700 text-sm mb-2">Purpose: SEO + Accessibility</div>
                    <div className="text-slate-700 text-sm">Describes image content for search engines and screen readers. Required for SEO.</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-xl font-bold text-purple-900 mb-2">Title Attribute</div>
                    <div className="text-slate-700 text-sm mb-2">Purpose: Tooltip on hover</div>
                    <div className="text-slate-700 text-sm">Shows when users hover over image. Optional--not used for SEO ranking.</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-xl font-bold text-pink-900 mb-2">Caption</div>
                    <div className="text-slate-700 text-sm mb-2">Purpose: Visible text</div>
                    <div className="text-slate-700 text-sm">Visible text below image. Can include additional context or citations.</div>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">How to Audit Missing or Poor Alt Text</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Most sites have hundreds of images with missing or bad alt text. Here\'s how to find them:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Browser Extensions:</strong> Use WAVE or axe DevTools to highlight images with missing alt text</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Screaming Frog:</strong> Crawl your site and export all images to find missing alt attributes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Google Search Console:</strong> Check for accessibility issues in the Enhancements report</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                    <span><strong>Manual Review:</strong> View page source and search for alt="" or missing alt attributes</span>
                  </li>
                </ul>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
                  <p className="text-slate-700 mb-0">
                    <strong>SEOLOGY Advantage:</strong> Automatically scans every image on your site, identifies missing or poor alt text, and generates optimized descriptions using AI--no manual work required.
                  </p>
                </div>
              </section>
              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Optimizes Alt Text Automatically</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Writing perfect alt text for thousands of images is impossible manually. SEOLOGY automates the entire process:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>AI Image Analysis:</strong> Computer vision analyzes each image to understand content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Context-Aware Descriptions:</strong> Uses page content and product data to create relevant alt text</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Keyword Optimization:</strong> Naturally incorporates target keywords without stuffing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Accessibility Compliance:</strong> Ensures all alt text follows WCAG 2.1 accessibility standards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Bulk Updates:</strong> Applies optimized alt text to thousands of images instantly</span>
                  </li>
                </ul>
                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Optimize Every Image on Your Site</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY automatically generates perfect alt text for every image--boosting Google Image rankings and accessibility compliance.
                  </p>
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
                  >
                    Optimize Alt Text Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Related Posts:</h2>
                <ul className="space-y-2">
                  <li><Link href="/blog/image-optimization-seo-guide" className="text-blue-600 hover:text-blue-800">Image Optimization for SEO</Link></li>
                  <li><Link href="/blog/schema-markup-complete-guide-2025" className="text-blue-600 hover:text-blue-800">Schema Markup Complete Guide</Link></li>
                  <li><Link href="/blog/technical-seo-audit-checklist-2025" className="text-blue-600 hover:text-blue-800">Technical SEO Audit Checklist</Link></li>
                </ul>
              </section>
              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #AltText #ImageSEO #Accessibility #OnPageSEO #SEOLOGY
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