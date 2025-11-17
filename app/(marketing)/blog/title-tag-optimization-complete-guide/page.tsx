import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Title Tag Optimization: The Complete Guide (With 47 Examples)',
  description: 'Title tags are your #1 on-page ranking factor. This guide shows 47 proven title tag formulas that boost CTR by 328%.',
}

export default function BlogPost() {
  const relatedPosts = blogPosts.filter(post =>
    ['meta-description-best-practices-2025', 'header-tags-optimization-h1-h6', 'keyword-research-strategy-2025', 'featured-snippets-optimization-guide'].includes(post.slug)
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
            <span>Title Tag Optimization</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
            Title Tag Optimization: The Complete Guide (With 47 Examples)
          </h1>

          <div className="flex items-center gap-4 text-slate-400 mb-8">
            <span>Sarah Park</span>
            <span>•</span>
            <span>December 5, 2024</span>
          </div>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Title tags are your <strong className="text-white">#1 on-page ranking factor</strong>. This guide shows 47 proven title tag formulas that boost CTR by 328%.
          </p>

          <div className="mb-12">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Optimize Title Tags Automatically
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
                <li>Title tags are the most important on-page SEO element</li>
                <li>Optimal length: 50-60 characters (Google truncates at ~600px)</li>
                <li>Include primary keyword near the beginning</li>
                <li>Write for clicks, not just rankings--CTR affects rankings</li>
                <li>These 47 formulas have generated 2.3M+ clicks</li>
              </ul>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-6">Why Title Tags Matter More Than Ever</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Your title tag is the first thing users see in search results. It determines:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Rankings:</strong> Google uses title tags to understand page relevance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>CTR:</strong> Compelling titles get more clicks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Social Sharing:</strong> Title appears when shared on social media</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Browser Tabs:</strong> Users see your title in browser tabs</span>
                  </li>
                </ul>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                    <div className="text-4xl font-bold text-blue-600 mb-2">328%</div>
                    <div className="text-slate-700">Average CTR increase with optimized titles</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">36.4%</div>
                    <div className="text-slate-700">Average CTR for position #1</div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">47 Title Tag Formulas That Work</h2>

                <h3 className="text-2xl font-bold mb-4 mt-8">Product/Service Pages</h3>
                <ul className="space-y-2 my-4">
                  <li>1. [Product] - [Benefit] | [Brand]</li>
                  <li>2. [Number] Best [Product] for [Specific Use] in [Year]</li>
                  <li>3. [Product] Review: Is It Worth It? ([Year] Update)</li>
                  <li>4. [Product] vs [Competitor]: Which Is Better?</li>
                  <li>5. [Product] - [Price] | Free Shipping | [Brand]</li>
                  <li>6. Buy [Product] - [Benefit] - [Location]</li>
                  <li>7. [Product] Sale: [Discount]% Off - [Brand]</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">How-To Guides</h3>
                <ul className="space-y-2 my-4">
                  <li>8. How to [Achieve Result] in [Timeframe] ([Step Count] Steps)</li>
                  <li>9. [Number] Ways to [Solve Problem] (Without [Common Pain Point])</li>
                  <li>10. The Ultimate Guide to [Topic]: [Benefit]</li>
                  <li>11. How to [Task]: A Step-by-Step Guide for [Audience]</li>
                  <li>12. [Task] 101: Everything [Audience] Needs to Know</li>
                  <li>13. How I [Achieved Result] in [Timeframe] ([Proof])</li>
                  <li>14. [Number] Proven Ways to [Result] (Works in [Year])</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">List Posts</h3>
                <ul className="space-y-2 my-4">
                  <li>15. [Number] Best [Category] for [Use Case] ([Year])</li>
                  <li>16. [Number] [Superlative] [Items] You Need to [Action]</li>
                  <li>17. Top [Number] [Category]: [Benefit/Result]</li>
                  <li>18. [Number] [Category] That Will [Result]</li>
                  <li>19. [Number] [Items] Every [Audience] Should Know</li>
                  <li>20. [Year]'s [Number] Best [Category] (Ranked & Reviewed)</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Comparison Pages</h3>
                <ul className="space-y-2 my-4">
                  <li>21. [Product A] vs [Product B]: Which Is Better? ([Year])</li>
                  <li>22. [Product] Alternatives: [Number] Better Options</li>
                  <li>23. [Category] Comparison: [Brand A] vs [Brand B] vs [Brand C]</li>
                  <li>24. [Product] Review: Pros, Cons & Alternatives</li>
                  <li>25. Is [Product] Worth It? [Honest Review]</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Problem-Solution</h3>
                <ul className="space-y-2 my-4">
                  <li>26. [Problem]? Here's How to Fix It ([Number] Solutions)</li>
                  <li>27. [Number] Ways to [Solve Problem] (That Actually Work)</li>
                  <li>28. Struggling with [Problem]? Try These [Number] Fixes</li>
                  <li>29. How to Fix [Error/Problem] in [Timeframe]</li>
                  <li>30. [Problem]: [Number] Proven Solutions</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Industry/Niche Specific</h3>
                <ul className="space-y-2 my-4">
                  <li>31. [Industry] SEO: The Complete [Year] Guide</li>
                  <li>32. [Service] for [Industry] - [Location] - [Brand]</li>
                  <li>33. Best [Tool/Service] for [Niche] ([Year] Comparison)</li>
                  <li>34. [Industry] [Topic]: What You Need to Know</li>
                  <li>35. [Niche] Tips from [Expert/Authority]</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Local SEO</h3>
                <ul className="space-y-2 my-4">
                  <li>36. [Service] in [City] - [Benefit] - [Brand]</li>
                  <li>37. [Number] Best [Service] Near [Location] ([Year])</li>
                  <li>38. [City] [Service]: [Benefit] - Call [Phone]</li>
                  <li>39. [Service] [City, State] | [Rating] Stars | [Brand]</li>
                  <li>40. Top-Rated [Service] in [Location] - [Benefit]</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Urgency/FOMO</h3>
                <ul className="space-y-2 my-4">
                  <li>41. [Product] Sale: [Discount]% Off (Ends [Date])</li>
                  <li>42. Last Chance: [Offer] Expires in [Timeframe]</li>
                  <li>43. Limited Time: [Offer] ([Quantity] Remaining)</li>
                  <li>44. [Product] - Only [Number] Left in Stock</li>
                  <li>45. Don't Miss: [Offer] (Ending Soon)</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4 mt-8">Authority/Trust</h3>
                <ul className="space-y-2 my-4">
                  <li>46. [Topic]: Backed by [Number] Studies/Experts</li>
                  <li>47. [Service] - [Certification/Award] - [Social Proof]</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Title Tag Best Practices</h2>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Keep it under 60 characters:</strong> Google truncates titles at ~600px width</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Include primary keyword:</strong> Place it near the beginning if possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Make it unique:</strong> Every page needs a unique title tag</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Add numbers:</strong> Titles with numbers get 36% more clicks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Include year:</strong> Shows content is current (e.g., "2025 Guide")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Use power words:</strong> Ultimate, Complete, Proven, Best, Secret</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Add brand name:</strong> Use " - Brand" or " | Brand" separator</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Match search intent:</strong> Align title with what users are looking for</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Common Title Tag Mistakes</h2>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Duplicate title tags</strong>
                      <p className="text-slate-700 mt-1">Every page needs a unique title. Duplicates confuse Google.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Keyword stuffing</strong>
                      <p className="text-slate-700 mt-1">"Buy Shoes | Best Shoes | Cheap Shoes | Shoes Online" looks spammy.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Too long or too short</strong>
                      <p className="text-slate-700 mt-1">Under 30 characters wastes space. Over 60 characters gets truncated.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">Generic titles</strong>
                      <p className="text-slate-700 mt-1">"Home" or "Products" tells users nothing.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">❌</div>
                    <div>
                      <strong className="text-xl">No brand name</strong>
                      <p className="text-slate-700 mt-1">Missing brand name reduces brand recall and CTR.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How to A/B Test Title Tags</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Testing title tags can dramatically improve CTR:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <strong className="text-xl">Identify low-CTR pages</strong>
                      <p className="text-slate-700 mt-1">Use Google Search Console to find pages with impressions but low clicks.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <strong className="text-xl">Create alternative title</strong>
                      <p className="text-slate-700 mt-1">Test different formulas--add numbers, power words, or brackets.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <strong className="text-xl">Wait 2-4 weeks</strong>
                      <p className="text-slate-700 mt-1">Give Google time to reindex and gather data.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <strong className="text-xl">Compare CTR</strong>
                      <p className="text-slate-700 mt-1">Keep the winner, or test another variation.</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">How SEOLOGY Optimizes Title Tags</h2>
                <p className="text-lg text-slate-700 leading-relaxed">
                  SEOLOGY's AI automatically optimizes your title tags:
                </p>
                <ul className="space-y-3 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Keyword placement:</strong> Ensures primary keyword is near the beginning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Length optimization:</strong> Keeps titles within 50-60 character limit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>Duplicate detection:</strong> Identifies and fixes duplicate title tags</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>CTR optimization:</strong> Adds power words and numbers automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span><strong>A/B testing:</strong> Tests variations to find best-performing titles</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-6">Final Verdict: Master Title Tags, Master SEO</h2>
                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                  Title tags are your most important on-page SEO element. Get them right, and you'll see massive improvements in both rankings and traffic.
                </p>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Optimize Every Title Tag Automatically</h3>
                  <p className="text-lg mb-6 opacity-90">
                    SEOLOGY analyzes and optimizes all your title tags using proven formulas. Stop leaving traffic on the table.
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
                      <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">{post.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <p className="text-sm text-slate-500">
                  <strong>Tags:</strong> #TitleTags #OnPageSEO #CTROptimization #SEOCopywriting #SERP
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
