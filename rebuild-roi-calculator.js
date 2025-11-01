const fs = require('fs');
const path = require('path');

console.log('🚀 Rebuilding ROI Calculator with Industry Selection...\n');

// Read current page to get header/footer
const currentPath = path.join(__dirname, 'public', 'roi-calculator.html');
let html = fs.readFileSync(currentPath, 'utf8');

// Extract header (everything up to <main>)
const headerEnd = html.indexOf('<main class="main-wrapper">');
const header = html.substring(0, headerEnd);

// Extract footer (from <footer> to end)
const footerStart = html.indexOf('<footer class="footer">');
const footer = html.substring(footerStart);

// Build the amazing new ROI calculator
const newCalculatorHTML = `${header}    <main class="main-wrapper">
      <header class="section-projects-header">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-top-header">
              <div class="square-wrap">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="square"></div>
              </div>
              <div data-w-id="68fd49aa-9893-f589-328e-d4219860d707" class="overflow-wrap">
                <div style="-webkit-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform-style:preserve-3d" class="text-item">
                  <h2 class="heading-style-h2 text-align-center">Calculate Your <span class="text-color-secondary">SEO Savings</span></h2>
                </div>
              </div>
              <div class="spacer-small"></div>
              <div class="max-width-large align-center">
                <p class="text-size-medium text-align-center">Stop copy-pasting fixes. Get tailored SEO automation that knows your business better than you do.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Industry Selection -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2); padding: 80px 0;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 48px;">
              <h2 class="heading-style-h2">Select Your <span class="text-color-secondary">Industry</span></h2>
              <p class="text-size-regular" style="opacity: 0.8; margin-top: 16px;">Each industry has unique SEO challenges. Let's calculate your specific savings.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto;">
              <!-- E-commerce -->
              <div class="industry-card" data-industry="ecommerce" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 8px;">E-commerce</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Online stores & product catalogs</p>
              </div>

              <!-- SaaS -->
              <div class="industry-card" data-industry="saas" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M4,6H2V20A2,2 0 0,0 4,22H18V20H4V6M20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H8V4H20V16M16,20V22H14V20H16M12,20V22H10V20H12Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 8px;">SaaS</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Software & tech products</p>
              </div>

              <!-- Agency -->
              <div class="industry-card" data-industry="agency" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M16,11C17.66,11 18.99,9.66 18.99,8C18.99,6.34 17.66,5 16,5C14.34,5 13,6.34 13,8C13,9.66 14.34,11 16,11M8,11C9.66,11 10.99,9.66 10.99,8C10.99,6.34 9.66,5 8,5C6.34,5 5,6.34 5,8C5,9.66 6.34,11 8,11M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M16,13C15.71,13 15.38,13.02 15.03,13.05C16.19,13.89 17,15.02 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 8px;">Agency</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Managing client sites</p>
              </div>

              <!-- Local Business -->
              <div class="industry-card" data-industry="local" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <div style="width: 64px; height: 64px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                  <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z"/></svg>
                </div>
                <h3 class="heading-style-h4" style="font-size: 18px; margin-bottom: 8px;">Local Business</h3>
                <p class="text-size-regular" style="opacity: 0.6; font-size: 14px;">Multi-location & franchises</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparison Section (Hidden initially, shown after industry selection) -->
      <div id="comparison-section" style="display: none;">
        <!-- Current Solution Comparison -->
        <section class="section-home-services" style="background: linear-gradient(135deg, rgba(255,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%); padding: 80px 0;">
          <div class="padding-global">
            <div class="container-large">
              <div style="text-align: center; margin-bottom: 48px;">
                <h2 class="heading-style-h2">What You're <span style="color: #ff4444;">Probably Using Now</span></h2>
                <p class="text-size-regular" style="opacity: 0.8; margin-top: 16px;" id="current-solution-subtitle"></p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto;" id="current-solutions">
                <!-- Will be populated by JavaScript -->
              </div>
            </div>
          </div>
        </section>

        <!-- The SEOLOGY.AI Way -->
        <section class="section-home-services" style="background: linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,0,0,0.3) 100%); padding: 80px 0;">
          <div class="padding-global">
            <div class="container-large">
              <div style="text-align: center; margin-bottom: 48px;">
                <h2 class="heading-style-h2">The <span class="text-color-secondary">SEOLOGY.AI</span> Difference</h2>
                <p class="text-size-regular" style="opacity: 0.8; margin-top: 16px; max-width: 800px; margin-left: auto; margin-right: auto;">Stop copy-pasting generic fixes from other sites. SEOLOGY.AI knows YOUR business—your CMS, your content, your customers—and applies fixes tailored specifically to you.</p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: 1200px; margin: 0 auto 64px;">
                <!-- Advantage 1 -->
                <div style="background: rgba(0,255,136,0.05); border: 2px solid rgba(0,255,136,0.2); border-radius: 20px; padding: 32px;">
                  <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
                  <h3 class="heading-style-h4" style="margin-bottom: 12px;">Knows Your Business</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Understands your CMS, products, customers, and SEO intricacies better than any copy-paste solution. Every fix is tailored to YOUR site.</p>
                </div>

                <!-- Advantage 2 -->
                <div style="background: rgba(0,255,136,0.05); border: 2px solid rgba(0,255,136,0.2); border-radius: 20px; padding: 32px;">
                  <div style="font-size: 48px; margin-bottom: 16px;">⚡</div>
                  <h3 class="heading-style-h4" style="margin-bottom: 12px;">Actually Fixes Issues</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Doesn't just report problems—logs into your CMS and deploys permanent fixes automatically. No manual work required.</p>
                </div>

                <!-- Advantage 3 -->
                <div style="background: rgba(0,255,136,0.05); border: 2px solid rgba(0,255,136,0.2); border-radius: 20px; padding: 32px;">
                  <div style="font-size: 48px; margin-bottom: 16px;">💰</div>
                  <h3 class="heading-style-h4" style="margin-bottom: 12px;">Massive Savings</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;"><span id="savings-preview">Save 75% vs agencies</span> while getting better results. No contracts, no hourly rates, no manual grunt work.</p>
                </div>
              </div>

              <!-- Savings Calculator -->
              <div style="background: rgba(0,0,0,0.4); border: 2px solid rgba(0,255,136,0.3); border-radius: 24px; padding: 64px; max-width: 1000px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 48px;">
                  <h3 class="heading-style-h3">Your Annual Savings</h3>
                  <p class="text-size-regular" style="opacity: 0.7; margin-top: 12px;">Based on typical costs in your industry</p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 48px; align-items: center; margin-bottom: 48px;">
                  <!-- Current Cost -->
                  <div style="text-align: center;">
                    <div class="text-size-regular" style="opacity: 0.6; margin-bottom: 12px;">Current Annual Cost</div>
                    <div style="font-size: 48px; font-weight: 700; color: #ff4444;" id="current-cost">$24,000</div>
                    <div class="text-size-regular" style="opacity: 0.6; margin-top: 8px;" id="current-method">SEO Agency</div>
                  </div>

                  <!-- Arrow -->
                  <div style="font-size: 48px; color: var(--text-color-secondary, #00ff88);">→</div>

                  <!-- SEOLOGY Cost -->
                  <div style="text-align: center;">
                    <div class="text-size-regular" style="opacity: 0.6; margin-bottom: 12px;">SEOLOGY.AI Annual Cost</div>
                    <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88);">$240</div>
                    <div class="text-size-regular" style="opacity: 0.6; margin-top: 8px;">Pro Plan ($20/mo)</div>
                  </div>
                </div>

                <!-- Savings -->
                <div style="background: linear-gradient(135deg, rgba(0,255,136,0.15) 0%, rgba(0,255,136,0.05) 100%); border: 1px solid rgba(0,255,136,0.3); border-radius: 16px; padding: 40px; text-align: center;">
                  <div style="font-size: 18px; opacity: 0.9; margin-bottom: 16px;">You Save Annually</div>
                  <div style="font-size: 72px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 16px;" id="total-savings">$23,760</div>
                  <div style="font-size: 20px; opacity: 0.8;" id="savings-percentage">99% Cost Reduction</div>
                  <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <p class="text-size-regular" style="opacity: 0.7;" id="time-savings">Plus save 40+ hours/month on manual SEO work</p>
                  </div>
                </div>

                <div style="text-align: center; margin-top: 32px;">
                  <a href="pricing.html" class="button w-inline-block" style="display: inline-flex;">
                    <div class="button-wrapper">
                      <div class="button-text is-transition">Start Saving Now</div>
                    </div>
                    <div class="button-wrapper is-hover">
                      <div class="button-text">Start Saving Now</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </main>
    ${footer}

<script>
// Industry-specific data
const industryData = {
  ecommerce: {
    subtitle: "E-commerce stores typically waste thousands on generic SEO tools and agencies",
    currentSolutions: [
      {
        title: "SEO Agency",
        cost: "$2,000-5,000/mo",
        issues: [
          "Copy-paste fixes from other stores",
          "Doesn't know your products",
          "Manual updates take weeks",
          "Charges hourly for everything"
        ]
      },
      {
        title: "Shopify SEO Apps",
        cost: "$50-200/mo each",
        issues: [
          "Only reports issues, doesn't fix",
          "Need 5+ apps for full coverage",
          "Generic recommendations",
          "Still requires manual work"
        ]
      },
      {
        title: "Freelance SEO",
        cost: "$1,000-3,000/mo",
        issues: [
          "Inconsistent quality",
          "Doesn't scale with inventory",
          "Turnover risk",
          "Limited tech knowledge"
        ]
      }
    ],
    currentCost: 24000,
    currentMethod: "SEO Agency ($2k/mo)",
    timeSaved: "40+ hours/month on product SEO"
  },
  saas: {
    subtitle: "SaaS companies pay premium rates for SEO that doesn't understand their product velocity",
    currentSolutions: [
      {
        title: "Technical SEO Agency",
        cost: "$3,000-8,000/mo",
        issues: [
          "Can't keep up with product launches",
          "Doesn't integrate with CI/CD",
          "Generic docs optimization",
          "Slow turnaround on fixes"
        ]
      },
      {
        title: "Ahrefs + Semrush Stack",
        cost: "$500-1,500/mo",
        issues: [
          "Just shows you problems",
          "You still do all the work",
          "Doesn't understand SaaS SEO",
          "No automation"
        ]
      },
      {
        title: "In-House SEO Team",
        cost: "$8,000-15,000/mo",
        issues: [
          "Expensive salaries + benefits",
          "Busy with analysis, not fixes",
          "Limited technical skills",
          "Doesn't scale"
        ]
      }
    ],
    currentCost: 36000,
    currentMethod: "SEO Agency ($3k/mo)",
    timeSaved: "60+ hours/month on docs and landing pages"
  },
  agency: {
    subtitle: "Agencies burn hours on manual SEO work that could be automated",
    currentSolutions: [
      {
        title: "Manual Labor",
        cost: "$4,000-8,000/mo",
        issues: [
          "Junior staff doing grunt work",
          "40+ hours/week per client",
          "Human error and inconsistency",
          "Can't scale to more clients"
        ]
      },
      {
        title: "White-Label SEO Services",
        cost: "$1,000-3,000/client",
        issues: [
          "Generic reporting",
          "No real fixes, just analysis",
          "Cuts into your margins",
          "Quality varies wildly"
        ]
      },
      {
        title: "Tool Stack Per Client",
        cost: "$200-500/client/mo",
        issues: [
          "Managing 5+ tools per client",
          "Still requires manual fixes",
          "Doesn't work for all clients",
          "Expensive at scale"
        ]
      }
    ],
    currentCost: 48000,
    currentMethod: "Manual Labor ($4k/mo average per client)",
    timeSaved: "75+ hours/month across all clients"
  },
  local: {
    subtitle: "Local businesses and franchises overpay for cookie-cutter local SEO",
    currentSolutions: [
      {
        title: "Local SEO Agency",
        cost: "$1,000-2,500/mo",
        issues: [
          "Same template for everyone",
          "Slow to update locations",
          "Charges per location",
          "Doesn't fix NAP automatically"
        ]
      },
      {
        title: "Yext / BrightLocal",
        cost: "$500-2,000/mo",
        issues: [
          "Just listing management",
          "Doesn't fix on-site SEO",
          "Expensive per location",
          "Limited automation"
        ]
      },
      {
        title: "Local Marketing Agency",
        cost: "$1,500-4,000/mo",
        issues: [
          "Focuses on ads, not SEO",
          "SEO is an afterthought",
          "Doesn't scale locations",
          "Expensive bundled services"
        ]
      }
    ],
    currentCost: 18000,
    currentMethod: "Local SEO Agency ($1.5k/mo)",
    timeSaved: "30+ hours/month on location updates"
  }
};

let selectedIndustry = null;

// Industry card selection
document.querySelectorAll('.industry-card').forEach(card => {
  card.addEventListener('click', function() {
    // Remove active class from all cards
    document.querySelectorAll('.industry-card').forEach(c => {
      c.style.border = '2px solid rgba(255,255,255,0.08)';
      c.style.background = 'rgba(255,255,255,0.03)';
    });

    // Add active class to clicked card
    this.style.border = '2px solid var(--text-color-secondary, #00ff88)';
    this.style.background = 'rgba(0,255,136,0.08)';

    // Get industry
    selectedIndustry = this.getAttribute('data-industry');

    // Show comparison section
    showComparison(selectedIndustry);

    // Smooth scroll to comparison
    setTimeout(() => {
      document.getElementById('comparison-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  });
});

function showComparison(industry) {
  const data = industryData[industry];

  // Update subtitle
  document.getElementById('current-solution-subtitle').textContent = data.subtitle;

  // Populate current solutions
  const solutionsContainer = document.getElementById('current-solutions');
  solutionsContainer.innerHTML = '';

  data.currentSolutions.forEach(solution => {
    const solutionHTML = \`
      <div style="background: rgba(255,0,0,0.05); border: 1px solid rgba(255,0,0,0.2); border-radius: 16px; padding: 32px;">
        <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">\${solution.title}</h3>
        <div style="font-size: 24px; font-weight: 700; color: #ff4444; margin-bottom: 20px;">\${solution.cost}</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          \${solution.issues.map(issue => \`
            <div style="display: flex; align-items: start; gap: 10px; font-size: 14px;">
              <span style="color: #ff4444; flex-shrink: 0; margin-top: 2px;">✗</span>
              <span style="opacity: 0.8;">\${issue}</span>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;
    solutionsContainer.innerHTML += solutionHTML;
  });

  // Update costs
  document.getElementById('current-cost').textContent = '$' + data.currentCost.toLocaleString();
  document.getElementById('current-method').textContent = data.currentMethod;

  // Calculate savings
  const seologyCost = 240; // $20/mo * 12
  const savings = data.currentCost - seologyCost;
  const savingsPercentage = Math.round((savings / data.currentCost) * 100);

  document.getElementById('total-savings').textContent = '$' + savings.toLocaleString();
  document.getElementById('savings-percentage').textContent = savingsPercentage + '% Cost Reduction';
  document.getElementById('time-savings').textContent = 'Plus save ' + data.timeSaved;
  document.getElementById('savings-preview').textContent = 'Save ' + savingsPercentage + '% vs traditional SEO';

  // Show comparison section
  document.getElementById('comparison-section').style.display = 'block';
}
</script>
`;

// Write new calculator page
fs.writeFileSync(currentPath, newCalculatorHTML, 'utf8');
console.log('✓ ROI Calculator completely rebuilt');
console.log('\n✅ New Features:');
console.log('  • Industry selection (E-commerce, SaaS, Agency, Local)');
console.log('  • Shows what users typically waste money on');
console.log('  • Detailed competitor comparison');
console.log('  • Real cost savings calculation');
console.log('  • Tailored messaging per industry');
console.log('  • Beautiful interactive UI');
