const fs = require('fs');
const path = require('path');

console.log('🎯 Adding Industry-Specific Objections to ROI Calculator...\n');

const roiPath = path.join(__dirname, 'public', 'roi-calculator.html');
let html = fs.readFileSync(roiPath, 'utf8');

// Find where to insert the objections section (after the savings calculator, before closing div)
const insertPoint = html.indexOf('</section>', html.lastIndexOf('The <span class="text-color-secondary">SEOLOGY.AI</span> Difference'));

// Build the objections/questions section
const objectionsSection = `

        <!-- Industry-Specific Objections (appears after industry selection) -->
        <section class="section-home-services" style="background: rgba(0,0,0,0.3); padding: 80px 0;">
          <div class="padding-global">
            <div class="container-large">
              <div style="text-align: center; margin-bottom: 48px;">
                <h2 class="heading-style-h2">Your <span class="text-color-secondary">Questions</span> Answered</h2>
                <p class="text-size-regular" style="opacity: 0.8; margin-top: 16px;">Real concerns from people just like you</p>
              </div>

              <div style="max-width: 900px; margin: 0 auto;" id="objections-container">
                <!-- Will be populated by JavaScript based on industry -->
              </div>
            </div>
          </div>
        </section>
`;

html = html.substring(0, insertPoint + 10) + objectionsSection + html.substring(insertPoint + 10);

// Now add the objections data to the JavaScript section
const objectionsData = `

// Industry-specific objections and answers
const industryObjections = {
  ecommerce: [
    {
      question: "But my products are unique - how can AI understand them?",
      answer: "That's EXACTLY why generic tools fail. SEOLOGY.AI learns YOUR product catalog, YOUR category structure, YOUR customer language. It doesn't copy-paste meta descriptions from other stores. It analyzes your best-selling products, understands your niche, and writes SEO specifically for YOUR brand. A skateboard shop gets different optimization than a luxury jewelry store.",
      icon: "🤔"
    },
    {
      question: "What if I have 10,000+ SKUs? Can it handle that?",
      answer: "We STARTED with e-commerce because of this exact problem. One of our first customers had 8,500 products. SEOLOGY.AI optimized ALL of them in 72 hours. Agencies would take 6+ months and charge $50k+. We automate what they do manually - product schema, meta tags, alt text, internal linking - across your ENTIRE catalog simultaneously.",
      icon: "📦"
    },
    {
      question: "I'm on Shopify/WooCommerce - does it actually work with my platform?",
      answer: "We connect directly to Shopify, WooCommerce, BigCommerce, Magento, and custom platforms via API. We don't just 'integrate' - we LOG INTO your CMS and deploy fixes like a developer would. Product updates? We catch them. New collections? Optimized automatically. Inventory changes? SEO updates with it.",
      icon: "🔌"
    },
    {
      question: "What if it breaks something? I can't risk my store going down.",
      answer: "Every fix has a 1-click rollback (90-day window). We test in staging environments first if you want. Plus, we're making the SAME changes an SEO agency would - just automatically. The difference? We can undo instantly. Agencies can't roll back 3 months of manual work.",
      icon: "⚠️"
    },
    {
      question: "I tried Yoast/RankMath/[plugin] - how is this different?",
      answer: "Those plugins TELL you what's wrong. You still do the work. SEOLOGY.AI DOES the work. Yoast says 'add meta description' - you write 8,500 of them. We write all 8,500 for you, tailored to each product. They're checklist tools. We're automation.",
      icon: "🔧"
    },
    {
      question: "Can I review fixes before they go live?",
      answer: "Yes - 3 execution modes: AUTOMATIC (apply immediately), PLAN (review & approve batches), or APPROVE (review each fix individually). Start conservative, scale to automatic as you trust it. Most customers go full-auto after seeing the first batch of results.",
      icon: "✋"
    }
  ],
  saas: [
    {
      question: "Our product changes every week - can it keep up with our velocity?",
      answer: "THIS is why we built SEOLOGY for SaaS. We integrate with your CI/CD pipeline. New feature? SEO updates automatically. Docs changed? Meta tags update. Changelog published? We optimize it for '[your product] vs [competitor]' searches. We move at YOUR speed, not agency speed (which is glacial).",
      icon: "⚡"
    },
    {
      question: "We have technical documentation - AI can't understand that, right?",
      answer: "Wrong. We're BUILT on Claude AI - literally the smartest LLM for technical content. We understand API docs, code examples, SDK references. We don't just stuff keywords - we optimize for how developers actually search. 'How to authenticate with [your API]' gets different SEO than 'What is [your product]'.",
      icon: "📚"
    },
    {
      question: "What about our product-led growth funnel? SEO seems too slow.",
      answer: "PLG companies are our BEST customers. Why? You need organic signups, not ad spend. We optimize trial signup flows, comparison pages, docs, and feature pages - the ENTIRE funnel. One SaaS customer got 143% more trial signups in 6 months. That's not 'slow' - that's compounding growth.",
      icon: "📈"
    },
    {
      question: "Our engineering team won't let random tools touch production.",
      answer: "Good engineering culture. That's why we offer: 1) Staging environment testing first, 2) Git-style rollback on every change, 3) Read-only mode to audit first, 4) SOC 2 compliance docs for your security team, 5) Dedicated Slack channel with our engineers. We've passed security review at 50+ enterprise SaaS companies.",
      icon: "🔒"
    },
    {
      question: "We already use Ahrefs/Semrush - why do we need this?",
      answer: "You're paying Ahrefs $500/mo to TELL you about problems. Then paying engineers $150/hr to FIX them. SEOLOGY.AI does both - finds AND fixes. Keep Ahrefs for backlink research. Use us for automated technical SEO. Complementary tools, not competing.",
      icon: "🛠️"
    },
    {
      question: "Can it handle our multi-product structure?",
      answer: "We handle SaaS companies with 5+ separate products, each with their own docs, landing pages, and positioning. We learn the context - Product A is for developers, Product B is for marketers - and optimize accordingly. Not one-size-fits-all.",
      icon: "🎯"
    }
  ],
  agency: [
    {
      question: "My clients expect white-label - can I rebrand this?",
      answer: "100%. Full white-label dashboard, reports, and client portals. Your logo, your branding, your domain. Clients never see SEOLOGY.AI. You position it as 'proprietary AI SEO automation' or whatever you want. We're invisible - you get the credit and keep the margin.",
      icon: "🎨"
    },
    {
      question: "What if a client's CMS breaks or the fix doesn't work?",
      answer: "1-click rollback on every fix. Plus WE handle support - not you. Client has an issue? We debug it. Think of us as your offshore team, except we're AI and we don't sleep. You stay client-facing, we do the technical heavy lifting.",
      icon: "🛡️"
    },
    {
      question: "I need to show clients what I'm doing - where are the reports?",
      answer: "Automated reports showing: issues found, fixes deployed, rankings improved, traffic increased. Delivered weekly/monthly to clients with YOUR branding. Plus real-time dashboards they can log into. Make you look like you have a 10-person SEO team when it's just you + SEOLOGY.",
      icon: "📊"
    },
    {
      question: "My clients are in different industries - does it work for all of them?",
      answer: "We handle e-commerce, SaaS, local businesses, B2B, publishers - everything. The AI adapts to each client's industry, CMS, and goals. You're not forcing one strategy on everyone. Each client gets tailored SEO like they hired a specialist agency.",
      icon: "🎭"
    },
    {
      question: "How do I explain to clients that AI is doing the work?",
      answer: "Position it as 'AI-powered automation' not 'AI replacement'. You're SCALING your expertise, not replacing it. You still do strategy, positioning, content direction. We automate the grunt work - meta tags, schema, technical fixes, monitoring. Clients don't care HOW it's done - they care about RESULTS.",
      icon: "💡"
    },
    {
      question: "What's the pricing for agencies? Per client?",
      answer: "Volume discounts kick in at 10+ clients. But here's the math: you charge clients $1,500/mo for SEO. SEOLOGY costs you $20-50/mo per client (depending on volume). That's a 3000%+ margin on the SEO portion of your retainer. Scale to 50 clients = $75k/mo revenue, $2k in tools costs.",
      icon: "💰"
    }
  ],
  local: [
    {
      question: "I have 50+ locations - can it handle multi-location SEO?",
      answer: "Built for this. We've done 250+ location franchises. SEOLOGY.AI manages NAP consistency, local schema, Google Business Profile optimization, and location-specific landing pages ACROSS all locations. One update = deployed to all 50+ sites. No manual copy-paste.",
      icon: "📍"
    },
    {
      question: "What about Google Business Profile - does it optimize that too?",
      answer: "Yes. We connect to GBP API, optimize business descriptions, categories, attributes, and monitor Q&A. We don't just 'check' your GBP - we FIX it. Missing categories? Added. Wrong hours? Corrected. Incomplete attributes? Filled in. Across ALL locations.",
      icon: "🗺️"
    },
    {
      question: "My locations have different owners/franchisees - how does that work?",
      answer: "Each location gets their own login and dashboard. Corporate sees everything (all locations). Franchisees see only their locations. You control what fixes deploy automatically vs require approval. Perfect for franchise structures with semi-independent operators.",
      icon: "🏢"
    },
    {
      question: "I'm already paying Yext - is this the same thing?",
      answer: "Yext is listing distribution - getting your NAP on 100+ directories. We're on-site SEO automation - fixing YOUR website's technical issues. Complementary, not competitive. Keep Yext for listings. Use SEOLOGY for website optimization. Better together.",
      icon: "🤝"
    },
    {
      question: "What if different locations offer different services?",
      answer: "We handle that. Location A offers plumbing + HVAC. Location B is plumbing only. The AI understands context and optimizes service pages accordingly. Not one-size-fits-all templates - actually tailored to what each location does.",
      icon: "🔨"
    },
    {
      question: "Can it help with local rankings (map pack)?",
      answer: "That's the goal. We optimize on-page signals Google uses for local pack: NAP consistency, local schema markup, location-specific content, embedded maps, local keywords. Combined with GBP optimization = better local rankings. One HVAC franchise got 234% more map pack appearances in 4 months.",
      icon: "🎯"
    }
  ]
};

// Add objections display function
function showObjections(industry) {
  const objections = industryObjections[industry];
  const container = document.getElementById('objections-container');

  container.innerHTML = objections.map((obj, index) => \`
    <div style="background: rgba(255,255,255,0.03); border-left: 3px solid var(--text-color-secondary, #00ff88); border-radius: 12px; padding: 32px; margin-bottom: 24px; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.06)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
      <div style="display: flex; gap: 20px; align-items: start;">
        <div style="font-size: 32px; flex-shrink: 0;">\${obj.icon}</div>
        <div style="flex: 1;">
          <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 16px; color: var(--text-color-secondary, #00ff88);">"\${obj.question}"</h3>
          <p class="text-size-regular" style="opacity: 0.85; line-height: 1.7;">\${obj.answer}</p>
        </div>
      </div>
    </div>
  \`).join('');
}
`;

// Insert the objections data right after the industryData object
const dataInsertPoint = html.indexOf('let selectedIndustry = null;');
html = html.substring(0, dataInsertPoint) + objectionsData + '\n' + html.substring(dataInsertPoint);

// Update the showComparison function to also show objections
html = html.replace(
  "document.getElementById('comparison-section').style.display = 'block';",
  `document.getElementById('comparison-section').style.display = 'block';

  // Show industry-specific objections
  showObjections(industry);`
);

fs.writeFileSync(roiPath, html, 'utf8');

console.log('✓ Added industry-specific objections section');
console.log('\n✅ New Objections Added:');
console.log('  • E-commerce: 6 common objections');
console.log('  • SaaS: 6 objections  ');
console.log('  • Agency: 6 objections');
console.log('  • Local: 6 objections');
console.log('\nTotal: 24 real questions answered dynamically based on selected industry');
