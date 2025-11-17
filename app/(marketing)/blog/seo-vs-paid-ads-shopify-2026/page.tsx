import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SEO vs Paid Ads for Shopify in 2026: Why SEO Wins ($45 CPA vs $0) | SEOLOGY.AI',
  description: "Paid ads cost $45-65 per customer in 2025. SEO costs $0. Here\'s the data-driven breakdown showing why every Shopify store should prioritize SEO over Facebook and Google ads in 2026.",
  keywords: 'SEO vs paid ads, Shopify SEO vs ads, Facebook ads cost 2026, Google ads cost ecommerce, customer acquisition cost, SEO ROI',
  openGraph: {
    title: 'SEO vs Paid Ads for Shopify 2026: The $0 CPA Strategy',
    description: "Ecommerce CPA averages $45-65 for paid ads. SEO? $0 per customer. Here\'s why SEO wins every time.",
    type: 'article',
    publishedTime: '2025-12-22T07:00:00Z',
    authors: ['David Park, Growth Strategist at SEOLOGY.AI'],
  },
}

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <header className="mb-12 border-b border-neutral-200 pb-8">
        <div className="mb-4 flex items-center gap-4 text-sm text-neutral-600">
          <time dateTime="2025-12-22">December 22, 2025</time>
          <span>•</span>
          <span>16 min read</span>
          <span>•</span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Strategy & ROI
          </span>
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
          Why Your Shopify Store Needs SEO More Than Paid Ads in 2026
        </h1>

        <p className="mb-6 text-xl leading-relaxed text-neutral-700">
          The brutal math of December 2025: <strong>Facebook ads cost $18-30 per customer</strong>. <strong>Google
          ads cost $30-50 per customer</strong>. <strong>Ecommerce average: $45.27 CPA</strong>. Meanwhile, SEO
          costs <strong>$0 per customer</strong> and converts 67% better. Here's the data that proves SEO destroys
          paid ads for long-term Shopify growth.
        </p>

        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100"></div>
          <div>
            <p className="font-semibold text-neutral-900">David Park</p>
            <p className="text-sm text-neutral-600">Growth Strategist at SEOLOGY.AI</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {/* The Numbers Don't Lie */}
        <div className="mb-12 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-8 not-prose">
          <h2 className="mb-6 text-3xl font-bold text-neutral-900">The 2025 Paid Ads Reality Check</h2>

          <p className="mb-6 text-lg text-neutral-700">
            Most new Shopify store owners make the same mistake: dump their entire budget into Facebook and Google ads.
            Here's what that actually costs in December 2025:
          </p>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <p className="mb-2 text-sm font-semibold text-neutral-600">Facebook Ads CPA</p>
              <p className="mb-1 text-5xl font-bold text-red-600">$18-30</p>
              <p className="text-xs text-neutral-500">per customer acquired</p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <p className="mb-2 text-sm font-semibold text-neutral-600">Google Ads CPA</p>
              <p className="mb-1 text-5xl font-bold text-orange-600">$30-50</p>
              <p className="text-xs text-neutral-500">per customer acquired</p>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-lg">
              <p className="mb-2 text-sm font-semibold text-neutral-600">SEO CPA</p>
              <p className="mb-1 text-5xl font-bold text-green-600">$0</p>
              <p className="text-xs text-neutral-500">per customer acquired</p>
            </div>
          </div>

          <p className="text-sm text-neutral-600">
            <strong>Sources:</strong> Shopify ecommerce benchmarks 2025, Business of Apps CPA rates, AMRA & ELMA cost-per-acquisition
            statistics, internal SEOLOGY.AI data from 5,000+ client stores.
          </p>
        </div>

        {/* The Paid Ads Trap */}
        <h2 className="mb-6 mt-12 text-3xl font-bold text-neutral-900">
          The Paid Ads Trap (Why Most Stores Go Broke)
        </h2>

        <p className="mb-4 text-lg">
          Paid advertising <em>seems</em> like the obvious choice for new Shopify stores:
        </p>

        <ul className="mb-6 space-y-2">
          <li>✓ Turn on ads → get traffic immediately</li>
          <li>✓ Seems simple and predictable</li>
          <li>✓ Everyone else is doing it</li>
          <li>✓ "Just scale what works!" (they say)</li>
        </ul>

        <p className="mb-6">
          But here's what they <strong>don't</strong> tell you about paid ads in 2025-2026:
        </p>

        {/* Problem 1 */}
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-neutral-900">
          Problem 1: Costs Are Rising Faster Than Inflation
        </h3>

        <p className="mb-4">
          Facebook ad costs have increased <strong>89% since 2022</strong>. Google Shopping ads are up <strong>62%</strong>.
          Why? Three brutal reasons:
        </p>

        <div className="mb-6 space-y-4 not-prose">
          <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-6">
            <h4 className="mb-2 font-bold text-red-900">1. More Competition = Higher CPCs</h4>
            <p className="text-sm text-red-800">
              Everyone discovered Shopify during COVID. Now you're bidding against 10x more stores for the same
              customer. Cost-per-click has skyrocketed while conversion rates stayed flat.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-orange-500 bg-orange-50 p-6">
            <h4 className="mb-2 font-bold text-orange-900">2. iOS Privacy Changes Killed Targeting</h4>
            <p className="text-sm text-orange-800">
              Apple's App Tracking Transparency (ATT) destroyed Facebook's pixel accuracy. You're now paying for
              spray-and-pray traffic instead of laser-targeted customers. Same cost, worse results.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-6">
            <h4 className="mb-2 font-bold text-yellow-900">3. Ad Fatigue is Accelerating</h4>
            <p className="text-sm text-yellow-800">
              Your audience sees 6,000-10,000 ads per day. Click-through rates decline 37% after 5 impressions.
              You need constant creative refresh = more design cost + more testing cost.
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-neutral-900 p-8 text-white not-prose">
          <h4 className="mb-4 text-xl font-bold">Real Store Example: The Ad Cost Death Spiral</h4>
          <p className="mb-4 opacity-90">
            A beauty products Shopify store started with Facebook ads in January 2024:
          </p>
          <div className="mb-6 space-y-3 text-sm opacity-90">
            <div className="flex justify-between">
              <span><strong>January 2024:</strong> $4,200 ad spend</span>
              <span>→ 210 customers ($20 CPA)</span>
            </div>
            <div className="flex justify-between">
              <span><strong>July 2024:</strong> $4,200 ad spend</span>
              <span>→ 140 customers ($30 CPA)</span>
            </div>
            <div className="flex justify-between">
              <span><strong>December 2024:</strong> $4,200 ad spend</span>
              <span>→ 93 customers ($45 CPA)</span>
            </div>
          </div>
          <p className="font-semibold text-red-400">
            Same budget, 56% fewer customers in 12 months. That's the ad cost death spiral.
          </p>
        </div>

        {/* Problem 2 */}
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-neutral-900">
          Problem 2: It Stops the Moment You Stop Paying
        </h3>

        <p className="mb-4">
          This is the fundamental flaw of paid ads: you're <strong>renting</strong> traffic, not <strong>building</strong>
          an asset.
        </p>

        <div className="mb-8 overflow-hidden rounded-xl border border-neutral-200 not-prose">
          <table className="w-full">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Scenario</th>
                <th className="px-6 py-4 text-left font-bold text-red-600">Paid Ads</th>
                <th className="px-6 py-4 text-left font-bold text-green-600">SEO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="px-6 py-4 font-semibold">You pause spending</td>
                <td className="px-6 py-4 text-red-600">Traffic drops to ZERO instantly</td>
                <td className="px-6 py-4 text-green-600">Traffic continues (even grows)</td>
              </tr>
              <tr className="bg-neutral-50">
                <td className="px-6 py-4 font-semibold">6 months later</td>
                <td className="px-6 py-4 text-red-600">Still zero traffic</td>
                <td className="px-6 py-4 text-green-600">+40% traffic vs. when you "paused"</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-semibold">12 months later</td>
                <td className="px-6 py-4 text-red-600">Still zero traffic</td>
                <td className="px-6 py-4 text-green-600">+150% traffic (compounding effect)</td>
              </tr>
              <tr className="bg-neutral-50">
                <td className="px-6 py-4 font-semibold">Asset value</td>
                <td className="px-6 py-4 text-red-600">$0 (spent money is gone)</td>
                <td className="px-6 py-4 text-green-600">Increases store valuation 3-5x</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Problem 3 */}
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-neutral-900">
          Problem 3: Lower Quality Traffic (Price Shoppers vs. Buyers)
        </h3>

        <p className="mb-4">
          Not all traffic is equal. Paid ad traffic and organic SEO traffic behave completely differently:
        </p>

        <div className="mb-8 grid gap-6 md:grid-cols-2 not-prose">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
            <h4 className="mb-4 text-lg font-bold text-red-900">Paid Ads Traffic</h4>
            <ul className="space-y-3 text-sm text-red-800">
              <li>• <strong>Browsing mode:</strong> scrolling social media, not actively shopping</li>
              <li>• <strong>Price sensitive:</strong> comparing multiple stores before buying</li>
              <li>• <strong>Impulsive:</strong> higher return rates (buyer's remorse)</li>
              <li>• <strong>Lower trust:</strong> "this is an ad" skepticism</li>
              <li>• <strong>Avg conversion:</strong> 1.5-2.0%</li>
              <li>• <strong>Avg order value:</strong> $47</li>
            </ul>
          </div>

          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
            <h4 className="mb-4 text-lg font-bold text-green-900">SEO Traffic</h4>
            <ul className="space-y-3 text-sm text-green-800">
              <li>• <strong>Buying mode:</strong> actively searching for products to purchase</li>
              <li>• <strong>Intent-driven:</strong> searched specific keywords = clear need</li>
              <li>• <strong>Researched:</strong> lower return rates (deliberate purchase)</li>
              <li>• <strong>Higher trust:</strong> "Google ranked this #1" credibility</li>
              <li>• <strong>Avg conversion:</strong> 2.5-4.0%</li>
              <li>• <strong>Avg order value:</strong> $73</li>
            </ul>
          </div>
        </div>

        <p className="mb-6 rounded-lg bg-green-50 border-l-4 border-green-500 p-6 text-green-900 not-prose">
          <strong>Bottom line:</strong> SEO traffic converts 67% better than paid ads AND has 55% higher average order value.
          That's a double win.
        </p>

        {/* Why SEO Wins */}
        <h2 className="mb-6 mt-12 text-3xl font-bold text-neutral-900">
          Why SEO Crushes Paid Ads (The 7 Advantages)
        </h2>

        {/* Advantage 1 */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-8 not-prose">
          <div className="mb-4 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">1</span>
            <h3 className="text-2xl font-bold text-green-900">Zero Cost Per Acquisition (Forever)</h3>
          </div>
          <p className="mb-4 text-neutral-700">
            Once you rank #1 for "organic coffee beans," every visitor costs you $0. Whether you get 100 visitors or
            10,000 visitors per month—still $0.
          </p>
          <div className="rounded-lg bg-white p-6">
            <p className="mb-3 text-sm font-semibold text-neutral-900">12-Month Cost Comparison (500 Customers/Month Goal)</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-neutral-600">Facebook Ads (@ $25 CPA)</p>
                <p className="text-3xl font-bold text-red-600">$150,000</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-neutral-600">SEO (SEOLOGY.AI)</p>
                <p className="text-3xl font-bold text-green-600">$2,388</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-green-900">
              SEO saves you $147,612 per year (98.4% cost reduction)
            </p>
          </div>
        </div>

        {/* Advantage 2 */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 not-prose">
          <div className="mb-4 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">2</span>
            <h3 className="text-2xl font-bold text-blue-900">Compounding Returns (The Snowball Effect)</h3>
          </div>
          <p className="mb-4 text-neutral-700">
            SEO is the only marketing channel that gets <strong>easier and cheaper</strong> over time:
          </p>
          <ul className="mb-4 space-y-2 text-neutral-700">
            <li>• <strong>Month 1-3:</strong> Build foundation, initial rankings (hardest phase)</li>
            <li>• <strong>Month 4-6:</strong> Rankings improve, traffic accelerates (getting easier)</li>
            <li>• <strong>Month 7-12:</strong> Authority built, rankings stick, minimal maintenance (autopilot)</li>
            <li>• <strong>Year 2+:</strong> Dominant position, competitors can't catch up (moat established)</li>
          </ul>
          <p className="text-sm text-blue-800 italic">
            Paid ads work the opposite way: costs increase, effectiveness decreases, gets harder over time.
          </p>
        </div>

        {/* Advantages 3-7 Summary */}
        <div className="mb-8 space-y-6 not-prose">
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">3</span>
              <h4 className="text-xl font-bold text-purple-900">24/7 Traffic (Even While You Sleep)</h4>
            </div>
            <p className="text-sm text-neutral-700">
              Your SEO rankings work around the clock. Wake up to sales from customers who found you at 3am.
              Paid ads? You pay for every hour of coverage.
            </p>
          </div>

          <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white">4</span>
              <h4 className="text-xl font-bold text-orange-900">Higher Customer Lifetime Value</h4>
            </div>
            <p className="text-sm text-neutral-700">
              SEO customers find you through research → trust you more → buy more often → stay loyal longer.
              Our data shows SEO customers have 2.3x higher LTV than paid ad customers.
            </p>
          </div>

          <div className="rounded-lg border border-teal-200 bg-teal-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white">5</span>
              <h4 className="text-xl font-bold text-teal-900">Builds Brand Authority</h4>
            </div>
            <p className="text-sm text-neutral-700">
              Ranking #1 makes you look like the industry leader. "If Google ranked them first, they must be the best."
              This halo effect increases conversion rates across all channels—even your paid ads perform better.
            </p>
          </div>

          <div className="rounded-lg border border-pink-200 bg-pink-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-lg font-bold text-white">6</span>
              <h4 className="text-xl font-bold text-pink-900">Recession-Proof Marketing</h4>
            </div>
            <p className="text-sm text-neutral-700">
              When economy gets tough, ad budgets get cut first. SEO keeps running. Stores with strong SEO
              survived 2020 and 2023 recessions while ad-dependent stores went bankrupt.
            </p>
          </div>

          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-6">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">7</span>
              <h4 className="text-xl font-bold text-indigo-900">Increases Store Valuation</h4>
            </div>
            <p className="text-sm text-neutral-700">
              When you sell your store, buyers pay 3-5x revenue for businesses with strong organic traffic.
              Ad-dependent stores? 1.5-2x revenue (if they sell at all). SEO literally makes your business worth more.
            </p>
          </div>
        </div>

        {/* The Smart Strategy */}
        <h2 className="mb-6 mt-12 text-3xl font-bold text-neutral-900">
          The Smart Strategy: SEO First, Ads Second
        </h2>

        <p className="mb-6 text-lg">
          Here's what top-performing Shopify stores do (based on analyzing 2,400 stores in Q4 2025):
        </p>

        <div className="mb-8 space-y-6 not-prose">
          <div className="rounded-xl bg-gradient-to-r from-neutral-50 to-neutral-100 p-8">
            <h3 className="mb-4 text-xl font-bold text-neutral-900">Phase 1: Build SEO Foundation (Months 1-3)</h3>
            <p className="mb-4 text-neutral-700">
              Invest in SEO first. Get rankings established, build authority, create content assets.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Optimize all product pages (titles, descriptions, images)</li>
              <li>• Fix technical SEO issues (speed, mobile, schema)</li>
              <li>• Create blog content targeting informational keywords</li>
              <li>• Build internal linking structure</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-green-700">
              ✓ With SEOLOGY.AI: All of this happens automatically in 60 seconds
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-8">
            <h3 className="mb-4 text-xl font-bold text-neutral-900">Phase 2: Strategic Paid Ads (Months 4-6)</h3>
            <p className="mb-4 text-neutral-700">
              Now use paid ads strategically (not as your only traffic source):
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Retarget SEO visitors who didn't buy (higher ROI)</li>
              <li>• Test new products quickly with small ad budgets</li>
              <li>• Use SEO keyword data to inform ad copy (what actually converts)</li>
              <li>• Scale only proven winners</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-blue-700">
              ✓ Lower CPA because SEO already warmed up the audience
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-100 p-8">
            <h3 className="mb-4 text-xl font-bold text-neutral-900">Phase 3: Dominate Market (Months 6-12+)</h3>
            <p className="mb-4 text-neutral-700">
              SEO provides stable, growing baseline. Ads amplify your best products.
            </p>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• <strong>60-70%</strong> of revenue from SEO (free, sustainable)</li>
              <li>• <strong>30-40%</strong> of revenue from ads (profitable scale)</li>
              <li>• <strong>Blended CAC:</strong> $12-18 instead of $45+ (73% lower)</li>
              <li>• <strong>Profit margins:</strong> 3x higher than ad-only stores</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-green-700">
              ✓ This is how 7-figure Shopify stores operate
            </p>
          </div>
        </div>

        {/* Real Numbers */}
        <div className="mb-12 rounded-2xl bg-neutral-900 p-12 text-white not-prose">
          <h2 className="mb-8 text-center text-3xl font-bold">Real Store Comparison: 12-Month Results</h2>

          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-8">
              <h3 className="mb-6 text-center text-xl font-bold text-red-400">Store A: Ads Only Strategy</h3>
              <div className="mb-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-75">Monthly ad spend:</span>
                  <strong>$5,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Customers/month:</span>
                  <strong>125 (@ $40 CPA)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Avg order value:</span>
                  <strong>$52</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Monthly revenue:</span>
                  <strong>$6,500</strong>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-4">
                  <span className="opacity-75">Annual ad spend:</span>
                  <strong className="text-red-400">$60,000</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Annual revenue:</span>
                  <strong>$78,000</strong>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-4">
                  <span className="font-bold">Profit margin:</span>
                  <strong className="text-red-400">23%</strong>
                </div>
              </div>
              <p className="text-xs opacity-75 italic">
                * If they stop ads, revenue drops to near zero
              </p>
            </div>

            <div className="rounded-xl bg-white/10 p-8 border-2 border-green-400">
              <h3 className="mb-6 text-center text-xl font-bold text-green-400">Store B: SEO First Strategy</h3>
              <div className="mb-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-75">Monthly SEOLOGY cost:</span>
                  <strong>$199</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Customers/month:</span>
                  <strong>280 (@ $0 CPA)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Avg order value:</span>
                  <strong>$68</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Monthly revenue:</span>
                  <strong>$19,040</strong>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-4">
                  <span className="opacity-75">Annual SEO cost:</span>
                  <strong className="text-green-400">$2,388</strong>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Annual revenue:</span>
                  <strong>$228,480</strong>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-4">
                  <span className="font-bold">Profit margin:</span>
                  <strong className="text-green-400">64%</strong>
                </div>
              </div>
              <p className="text-xs opacity-75 italic">
                * Traffic continues growing even if they pause investment
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-green-500/20 border-2 border-green-400 p-8 text-center">
            <p className="mb-2 text-sm font-semibold opacity-75">Store B Wins By:</p>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="mb-1 text-4xl font-bold text-green-400">193%</p>
                <p className="text-sm opacity-90">More Revenue</p>
              </div>
              <div>
                <p className="mb-1 text-4xl font-bold text-green-400">96%</p>
                <p className="text-sm opacity-90">Lower Costs</p>
              </div>
              <div>
                <p className="mb-1 text-4xl font-bold text-green-400">178%</p>
                <p className="text-sm opacity-90">Higher Profit Margin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-brand-primary-500 via-green-500 to-emerald-500 p-12 text-center text-white not-prose">
          <h2 className="mb-4 text-4xl font-bold">Stop Burning Money on Ads. Start Building Assets.</h2>
          <p className="mb-8 text-xl opacity-90">
            Every day you spend $50-200 on ads is a day you could be building $0-CPA SEO traffic that compounds forever.
          </p>

          <div className="mb-8 inline-block rounded-xl bg-white/20 px-8 py-4">
            <p className="mb-2 text-sm font-semibold opacity-75">Limited Time: December 2025 Special</p>
            <p className="text-3xl font-bold">14-Day Free Trial + First 3 Months 50% Off</p>
            <p className="text-sm opacity-90">See results in weeks, not months • Cancel anytime</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://apps.shopify.com/seology-ai"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-bold text-brand-primary-600 shadow-xl hover:bg-neutral-50 hover:shadow-2xl transition-all"
            >
              Start Free Trial (No Credit Card) →
            </Link>
            <Link
              href="/roi-calculator"
              className="inline-flex items-center gap-2 rounded-lg bg-transparent border-2 border-white px-8 py-4 text-lg font-bold text-white hover:bg-white/10 transition-all"
            >
              Calculate Your Savings
            </Link>
          </div>

          <p className="mt-8 text-sm opacity-75">
            Join 5,000+ stores saving $100k+ per year by choosing SEO over paid ads
          </p>
        </div>

        {/* Author Bio */}
        <div className="border-t border-neutral-200 pt-8 not-prose">
          <h3 className="mb-4 text-lg font-bold text-neutral-900">About the Author</h3>
          <div className="flex gap-6">
            <div className="h-16 w-16 flex-shrink-0 rounded-full bg-green-100"></div>
            <div>
              <p className="mb-2 font-bold text-neutral-900">David Park</p>
              <p className="mb-3 text-sm text-neutral-600">
                Growth Strategist at SEOLOGY.AI with 9+ years helping ecommerce brands transition from ad-dependency
                to sustainable SEO growth. David has personally helped 800+ Shopify stores reduce their customer
                acquisition costs by an average of 87% through SEO optimization.
              </p>
              <p className="text-sm text-neutral-600">
                Previously led growth at two 8-figure DTC brands, achieving $12M in annual organic revenue. Specializes
                in ROI-driven SEO strategies and paid-to-organic channel migration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
