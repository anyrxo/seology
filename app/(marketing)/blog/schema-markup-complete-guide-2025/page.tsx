import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schema Markup in 2025: The Complete Guide (With Real Examples)',
  description: "Schema markup can 3x your click-through rates. Here\'s how to implement it correctly--or let SEOLOGY do it automatically.",
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(p => p.slug !== 'schema-markup-complete-guide-2025').slice(0, 4)

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
            <span>Schema Markup Complete Guide</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Schema Markup in 2025: The Complete Guide (With Real Examples)
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>David Kim</span>
            <span>•</span>
            <span>December 28, 2024</span>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Schema markup can <strong className="text-white">3x your click-through rates</strong>. Here's how to implement it correctly--or let SEOLOGY do it automatically.
          </p>

          {/* CTA */}
          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Add Schema Automatically
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
                Schema markup (structured data) helps Google understand your content and display rich results--star ratings, prices, FAQs, recipes, events, and more. Sites with schema get <strong>30% higher CTR</strong> and better rankings. Manual implementation requires JSON-LD coding knowledge. SEOLOGY adds schema automatically to all your pages in minutes.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">What is Schema Markup?</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Schema markup is code (JSON-LD format) that tells search engines exactly what your content means.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Without schema, Google sees:
                </p>
                <div className="bg-slate-100 p-4 rounded-lg my-4 font-mono text-sm">
                  "John Smith, 555-1234, Portland"
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  With schema, Google understands:
                </p>
                <ul className="space-y-2 my-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>John Smith</strong> = Person name</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>555-1234</strong> = Phone number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Portland</strong> = City location</span>
                  </li>
                </ul>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This structured data enables rich results: review stars, prices, business hours, recipe ratings, and 40+ other enhanced search features.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Why Schema Markup Matters in 2025</h2>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
                    <div className="text-slate-700">Higher CTR with rich results vs plain blue links</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">58%</div>
                    <div className="text-slate-700">More likely to rank in position 1-3 with proper schema</div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-blue-50 p-6 rounded-xl border border-pink-200">
                    <div className="text-4xl font-bold text-pink-600 mb-2">40+</div>
                    <div className="text-slate-700">Types of rich results schema unlocks</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-cyan-200">
                    <div className="text-4xl font-bold text-cyan-600 mb-2">2x</div>
                    <div className="text-slate-700">SERP real estate with enhanced snippets</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">The 15 Most Important Schema Types</h2>

                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">1. Organization Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Homepage, About page</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Knowledge panel, brand recognition</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Logo, social profiles, contact info, location</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">2. Product Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Ecommerce product pages</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Price, availability, reviews in search results</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Name, image, price, currency, stock status, ratings</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">3. Article Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Blog posts, news articles</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Top Stories, Google News eligibility, featured snippets</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Headline, author, publish date, image</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">4. FAQ Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> FAQ pages, help centers</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Expandable Q&A in search results</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Question and answer pairs</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">5. HowTo Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Tutorial content, step-by-step guides</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Step-by-step rich results with images</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Steps, tools, materials, estimated time</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">6. Review Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Product reviews, service reviews</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Star ratings in search results</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Rating value, reviewer, date</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">7. LocalBusiness Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Brick-and-mortar businesses</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Google Maps integration, local pack results</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Address, hours, phone, geo coordinates</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">8. Breadcrumb Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> All pages with navigation paths</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Breadcrumb trail in search results</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Page hierarchy (Home &gt; Category &gt; Page)</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">9. Event Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Concerts, webinars, conferences</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Event rich results, Google Calendar integration</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Name, date, location, price, performer</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">10. Recipe Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Food blogs, recipe sites</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Recipe cards with images, ratings, cook time</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Ingredients, instructions, nutrition, ratings</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">11. Video Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Pages with video content</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Video thumbnails, playback in search</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Title, description, thumbnail, duration, upload date</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">12. JobPosting Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Job listings, career pages</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Google for Jobs integration</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Title, description, salary, location, posting date</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">13. Course Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Online courses, training programs</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Course rich results with provider info</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Name, provider, description, price</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">14. SoftwareApplication Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Apps, software products, SaaS</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> App install buttons, ratings, pricing</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Name, OS, price, ratings, download URL</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <h3 className="text-2xl font-bold mb-3">15. WebSite Schema</h3>
                    <p className="text-slate-700 mb-2"><strong>Use for:</strong> Homepage</p>
                    <p className="text-slate-700 mb-2"><strong>Enables:</strong> Sitelinks search box in Google</p>
                    <p className="text-slate-700"><strong>Includes:</strong> Site name, URL, search action</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Schema Markup Example: Product Schema</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-4">
                  Here's what Product schema looks like in JSON-LD format:
                </p>
                <div className="bg-slate-900 text-green-400 p-6 rounded-lg overflow-x-auto my-6">
                  <pre className="text-sm font-mono">{`<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Nike Air Max 2025",
  "image": "https://example.com/air-max.jpg",
  "description": "Next-gen cushioning technology",
  "brand": {
    "@type": "Brand",
    "name": "Nike"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/air-max-2025",
    "priceCurrency": "USD",
    "price": "149.99",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "247"
  }
}
</script>`}</pre>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  This enables rich results showing price ($149.99), star rating (4.8), and availability (In Stock) directly in Google search.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Manual vs Automatic Schema Implementation</h2>
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-4 text-left">Method</th>
                        <th className="border border-slate-300 p-4 text-left">Manual</th>
                        <th className="border border-slate-300 p-4 text-left">SEOLOGY</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Time per Page</strong></td>
                        <td className="border border-slate-300 p-4">20-45 minutes</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>Automatic (0 minutes)</strong></td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Technical Knowledge</strong></td>
                        <td className="border border-slate-300 p-4">JSON-LD coding required</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>No coding needed</strong></td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Error Rate</strong></td>
                        <td className="border border-slate-300 p-4">High (syntax errors common)</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>Zero errors guaranteed</strong></td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Updates</strong></td>
                        <td className="border border-slate-300 p-4">Manual re-coding</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>Automatic updates</strong></td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Validation</strong></td>
                        <td className="border border-slate-300 p-4">Manual testing required</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>Auto-validated</strong></td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-4"><strong>Scalability</strong></td>
                        <td className="border border-slate-300 p-4">Limited</td>
                        <td className="border border-slate-300 p-4 bg-green-50"><strong>Unlimited pages</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Schema Mistakes to Avoid</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl text-red-600">Using Microdata or RDFa Instead of JSON-LD</strong>
                      <p className="text-slate-700 mt-1">Google recommends JSON-LD because it's easier to implement and maintain.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl text-red-600">Marking Up Invisible Content</strong>
                      <p className="text-slate-700 mt-1">Schema must match visible page content--hiding content just for schema violates guidelines.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl text-red-600">Fake Reviews or Ratings</strong>
                      <p className="text-slate-700 mt-1">Adding review schema without real reviews will get you penalized.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl text-red-600">Missing Required Properties</strong>
                      <p className="text-slate-700 mt-1">Each schema type has required fields--missing them breaks rich results eligibility.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">✗</div>
                    <div>
                      <strong className="text-xl text-red-600">Not Testing Schema</strong>
                      <p className="text-slate-700 mt-1">Always validate with Google's Rich Results Test before publishing.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Adds Schema Automatically</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Content Analysis:</strong>
                      <p className="text-slate-700 mt-1">AI analyzes each page to determine the correct schema type (Product, Article, FAQ, etc.).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Data Extraction:</strong>
                      <p className="text-slate-700 mt-1">Automatically extracts relevant data (prices, dates, ratings, etc.) from page content.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">JSON-LD Generation:</strong>
                      <p className="text-slate-700 mt-1">Creates perfectly formatted, validated JSON-LD schema markup.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Automatic Insertion:</strong>
                      <p className="text-slate-700 mt-1">Injects schema into page &lt;head&gt; or footer--no manual coding required.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                    <div>
                      <strong className="text-xl">Ongoing Updates:</strong>
                      <p className="text-slate-700 mt-1">Monitors content changes and updates schema automatically to stay accurate.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Start Using Schema Markup Today</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Schema markup is no longer optional--it's essential for competitive SEO in 2025.
                </p>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  With SEOLOGY, you get:
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>15+ schema types implemented automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Zero coding or technical knowledge required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Validated, error-free JSON-LD every time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span>Automatic updates when content changes</span>
                  </li>
                </ul>

                {/* Final CTA */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Add Schema to Your Site Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    Let SEOLOGY handle schema markup while you focus on creating great content.
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
                  <li><Link href="/blog/technical-seo-audit-checklist-2025" className="text-blue-600 hover:text-blue-800">Technical SEO Audit Checklist 2025</Link></li>
                  <li><Link href="/blog/ecommerce-seo-strategy-2025" className="text-blue-600 hover:text-blue-800">Ecommerce SEO Strategy 2025</Link></li>
                  <li><Link href="/blog/shopify-seo-optimization-guide-2025" className="text-blue-600 hover:text-blue-800">Shopify SEO Optimization Guide</Link></li>
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #SchemaMarkup #StructuredData #TechnicalSEO #SEOLOGY #RichResults
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
