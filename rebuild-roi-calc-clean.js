const fs = require('fs');

console.log('Rebuilding ROI Calculator with proper UX flow...\\n');

const roiPath = 'public/roi-calculator.html';
let html = fs.readFileSync(roiPath, 'utf8');

// Extract header and footer
const headerEnd = html.indexOf('</header>') + 9;
const footerStart = html.indexOf('<footer class="footer">');
const scriptStart = html.indexOf('<script src="https://d3e54v103j8qbb.cloudfront.net');

const header = html.substring(0, headerEnd);
const footer = html.substring(footerStart, scriptStart);

// Build clean, simple calculator page
const newMain = `

      <!-- Industry Selection - FIRST THING USERS SEE -->
      <section style="padding: 60px 0; background: rgba(0,0,0,0.2);">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 48px;">
              <h2 class="heading-style-h2">Select Your <span class="text-color-secondary">Industry</span></h2>
              <p class="text-size-regular" style="opacity: 0.8; margin-top: 16px;">Click to see your specific savings</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; max-width: 1100px; margin: 0 auto;">
              <!-- E-commerce -->
              <div onclick="selectIndustry('ecommerce')" class="industry-card animate-card hover-scale" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">E-commerce</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Shopify, WooCommerce, etc.</p>
              </div>

              <!-- SaaS -->
              <div onclick="selectIndustry('saas')" class="industry-card animate-card hover-scale" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16M16,20V22H14V20H16M12,20V22H10V20H12Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">SaaS</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Software companies</p>
              </div>

              <!-- Agency -->
              <div onclick="selectIndustry('agency')" class="industry-card animate-card hover-scale" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M16,11C17.66,11 18.99,9.66 18.99,8C18.99,6.34 17.66,5 16,5C14.34,5 13,6.34 13,8C13,9.66 14.34,11 16,11M8,11C9.66,11 10.99,9.66 10.99,8C10.99,6.34 9.66,5 8,5C6.34,5 5,6.34 5,8C5,9.66 6.34,11 8,11M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M16,13C15.71,13 15.38,13.02 15.03,13.05C16.19,13.89 17,15.02 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">Marketing Agency</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Managing client SEO</p>
              </div>

              <!-- Local -->
              <div onclick="selectIndustry('local')" class="industry-card animate-card hover-scale" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">Local Business</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Multi-location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Section (Hidden until selection) -->
      <div id="results-section" style="display: none;">

        <!-- Savings Display -->
        <section style="padding: 80px 0; background: linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,0,0,0.3));">
          <div class="padding-global">
            <div class="container-large" style="max-width: 900px;">

              <div style="background: rgba(0,0,0,0.5); border: 2px solid rgba(0,255,136,0.3); border-radius: 24px; padding: 60px 40px;">
                <div style="text-align: center; margin-bottom: 40px;">
                  <h2 class="heading-style-h2">Your Annual Savings</h2>
                </div>

                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 40px; align-items: center; margin-bottom: 40px;">
                  <div style="text-align: center;">
                    <p style="opacity: 0.6; margin-bottom: 12px;">You Currently Pay</p>
                    <h3 style="font-size: 42px; color: #ff4444;" id="current-cost">$24,000</h3>
                    <p style="opacity: 0.6; margin-top: 8px; font-size: 14px;" id="current-method">per year</p>
                  </div>

                  <div style="font-size: 36px; color: var(--text-color-secondary, #00ff88);">→</div>

                  <div style="text-align: center;">
                    <p style="opacity: 0.6; margin-bottom: 12px;">With SEOLOGY.AI</p>
                    <h3 style="font-size: 42px; color: var(--text-color-secondary, #00ff88);">$588</h3>
                    <p style="opacity: 0.6; margin-top: 8px; font-size: 14px;">$49/month</p>
                  </div>
                </div>

                <div style="background: linear-gradient(135deg, rgba(0,255,136,0.15), rgba(0,255,136,0.05)); border: 1px solid rgba(0,255,136,0.3); border-radius: 16px; padding: 32px; text-align: center;">
                  <p style="opacity: 0.9; margin-bottom: 12px;">You Save</p>
                  <h2 style="font-size: 56px; color: var(--text-color-secondary, #00ff88); margin-bottom: 12px;" id="total-savings">$23,412</h2>
                  <p style="font-size: 18px; opacity: 0.8;" id="savings-percentage">98% cost reduction</p>
                </div>

                <div style="text-align: center; margin-top: 32px;">
                  <a href="pricing.html#pricing-plans" class="button w-inline-block">
                    <div class="button-text-wrap">
                      <div class="button-text is-transition">Get Started</div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- Objections -->
        <section style="padding: 80px 0; background: rgba(0,0,0,0.3);" id="objections-section">
          <div class="padding-global">
            <div class="container-large">
              <div style="text-align: center; margin-bottom: 48px;">
                <h2 class="heading-style-h2">Your <span class="text-color-secondary">Questions</span> Answered</h2>
              </div>
              <div id="objections-container" style="max-width: 900px; margin: 0 auto;"></div>
            </div>
          </div>
        </section>

      </div>

      <!-- CTA -->
      <section class="section-home-cta">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="cta-wrap" style="text-align: center;">
                <h2 class="heading-style-h2">Ready to <span class="text-color-secondary">save thousands</span>?</h2>
                <div class="spacer-medium"></div>
                <p class="text-size-regular">Start your free trial. No credit card required.</p>
                <div class="spacer-medium"></div>
                <a href="pricing.html#pricing-plans" class="main-button w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Get Started Free</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
`;

// Add the JavaScript
const calculatorJS = `
<script>
// Industry data
const industryData = {
  ecommerce: {
    currentCost: 24000,
    currentMethod: "SEO Agency ($2k/mo)",
    objections: [
      {icon: "cart", q: "But my products are unique - how can AI understand them?", a: "That's EXACTLY why generic tools fail. SEOLOGY.AI learns YOUR product catalog, YOUR category structure, YOUR customer language. It doesn't copy-paste meta descriptions from other stores."},
      {icon: "shield", q: "What if it breaks something on my store?", a: "We test every fix in staging first. Changes are deployed gradually. Plus, you can review and approve fixes before they go live if you want that control."},
      {icon: "chart", q: "How fast will I see results?", a: "Most stores see ranking improvements within 2-4 weeks. The AI fixes your biggest issues first - missing product meta tags, broken internal links, slow pages - the stuff that moves the needle fast."}
    ]
  },
  saas: {
    currentCost: 48000,
    currentMethod: "In-house SEO Team ($4k/mo)",
    objections: [
      {icon: "rocket", q: "Our product changes constantly - can it keep up?", a: "That's the whole point. SEOLOGY.AI monitors your site continuously and updates SEO as you ship features. New product page? Meta tags added automatically. Changed your value prop? Title tags updated."},
      {icon: "brain", q: "Does it understand technical documentation?", a: "Yes. The AI reads your docs, API references, and help articles to write accurate, technical SEO content that actually helps developers find your solution."},
      {icon: "target", q: "Will it mess with our PLG funnel?", a: "Never. SEOLOGY.AI understands conversion flows. It optimizes for discovery AND conversion, not just traffic. Your signup flow stays untouched."}
    ]
  },
  agency: {
    currentCost: 120000,
    currentMethod: "Manual client work ($10k/mo)",
    objections: [
      {icon: "scale", q: "Can I use this for multiple clients?", a: "Absolutely. Manage unlimited client sites from one dashboard. Each client gets tailored SEO fixes specific to their business. No more copying the same fixes across different clients."},
      {icon: "chart", q: "How do I explain AI-powered SEO to clients?", a: "We provide white-label reports showing exactly what was fixed and why. Clients see before/after rankings, traffic increases, and fixed issues - all branded as your agency's work."},
      {icon: "rocket", q: "What if a client is in a weird niche?", a: "The AI learns each client's specific industry, competitors, and keywords. Whether they sell industrial pumps or vegan dog food, SEOLOGY.AI adapts to their unique business."}
    ]
  },
  local: {
    currentCost: 18000,
    currentMethod: "Local SEO Agency ($1.5k/mo)",
    objections: [
      {icon: "map", q: "We have 50 locations - can it handle multi-location SEO?", a: "That's our specialty. SEOLOGY.AI optimizes each location page with local keywords, proper schema markup, and location-specific content. Works for 1 location or 10,000."},
      {icon: "shield", q: "What about Google Business Profile optimization?", a: "We integrate with GBP to keep your listings consistent. When you update hours or services in one place, changes sync everywhere. No more manual updates across 50 locations."},
      {icon: "target", q: "Does it understand local search patterns?", a: "Yes. The AI knows the difference between 'pizza delivery downtown' and 'best pizza restaurant near me' and optimizes accordingly. Local intent is built into every fix."}
    ]
  }
};

function selectIndustry(industry) {
  const data = industryData[industry];

  // Update savings
  const savings = data.currentCost - 588;
  const percentage = Math.round((savings / data.currentCost) * 100);

  document.getElementById('current-cost').textContent = '$' + data.currentCost.toLocaleString();
  document.getElementById('current-method').textContent = data.currentMethod;
  document.getElementById('total-savings').textContent = '$' + savings.toLocaleString();
  document.getElementById('savings-percentage').textContent = percentage + '% cost reduction';

  // Show objections
  const objContainer = document.getElementById('objections-container');
  objContainer.innerHTML = data.objections.map(obj => \`
    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; margin-bottom: 20px;">
      <h4 style="font-size: 18px; margin-bottom: 12px; opacity: 0.9;">\${obj.q}</h4>
      <p style="opacity: 0.7; line-height: 1.7;">\${obj.a}</p>
    </div>
  \`).join('');

  // Show results section with smooth scroll
  document.getElementById('results-section').style.display = 'block';
  setTimeout(() => {
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}
</script>
`;

// Build final HTML
const finalHTML = header + newMain + footer + calculatorJS + html.substring(scriptStart);

fs.writeFileSync(roiPath, finalHTML, 'utf8');

console.log('✅ ROI Calculator rebuilt with clean UX!');
console.log('\\nNew Flow:');
console.log('  1. User sees industry selection FIRST');
console.log('  2. Clicks industry → instantly shows savings');
console.log('  3. Auto-scrolls to results');
console.log('  4. Shows objections for that industry');
console.log('  5. Clear Get Started CTA');
console.log('\\nNo more scrolling around confused!');
