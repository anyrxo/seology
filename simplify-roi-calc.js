const fs = require('fs');
const path = require('path');

console.log('🎯 Simplifying ROI Calculator - making it interactive and less wordy...\\n');

const roiPath = path.join(__dirname, 'public', 'roi-calculator.html');
let html = fs.readFileSync(roiPath, 'utf8');

// Extract header and footer
const headerEnd = html.indexOf('</div>\\n    </div>\\n    <main class="main-wrapper">');
const footerStart = html.indexOf('<footer class="footer">');

const header = html.substring(0, headerEnd + '</div>\\n    </div>'.length);
const footer = html.substring(footerStart);

// Build new simplified ROI calculator page
const newMain = `
    <main class="main-wrapper">
      <header class="section-projects-header" style="padding: 120px 0 80px;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; max-width: 800px; margin: 0 auto;">
              <h1 class="heading-style-h1" style="margin-bottom: 24px;">Calculate Your <span class="text-color-secondary">ROI</span></h1>
              <p class="text-size-regular" style="opacity: 0.8; font-size: 18px;">See how much you'll save by switching to SEOLOGY.AI</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Industry Selection -->
      <section style="padding: 60px 0; background: rgba(0,0,0,0.2);">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 48px;">
              <h2 class="heading-style-h3">What's your industry?</h2>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; max-width: 1100px; margin: 0 auto;">
              <!-- E-commerce -->
              <div onclick="selectIndustry('ecommerce')" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--text-color-secondary, #00ff88)'; this.style.background='rgba(0,255,136,0.05)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.03)';" class="industry-card" data-industry="ecommerce">
                <div style="font-size: 48px; margin-bottom: 16px;">🛒</div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">E-commerce</h3>
                <p class="text-size-regular" style="opacity: 0.7; font-size: 14px;">Shopify, WooCommerce, etc.</p>
              </div>

              <!-- SaaS -->
              <div onclick="selectIndustry('saas')" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--text-color-secondary, #00ff88)'; this.style.background='rgba(0,255,136,0.05)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.03)';" class="industry-card" data-industry="saas">
                <div style="font-size: 48px; margin-bottom: 16px;">💻</div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">SaaS</h3>
                <p class="text-size-regular" style="opacity: 0.7; font-size: 14px;">Software companies</p>
              </div>

              <!-- Agency -->
              <div onclick="selectIndustry('agency')" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--text-color-secondary, #00ff88)'; this.style.background='rgba(0,255,136,0.05)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.03)';" class="industry-card" data-industry="agency">
                <div style="font-size: 48px; margin-bottom: 16px;">🎨</div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">Marketing Agency</h3>
                <p class="text-size-regular" style="opacity: 0.7; font-size: 14px;">Managing client SEO</p>
              </div>

              <!-- Local Business -->
              <div onclick="selectIndustry('local')" style="background: rgba(255,255,255,0.03); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px 32px; text-align: center; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--text-color-secondary, #00ff88)'; this.style.background='rgba(0,255,136,0.05)';" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.background='rgba(255,255,255,0.03)';" class="industry-card" data-industry="local">
                <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
                <h3 class="heading-style-h4" style="font-size: 20px; margin-bottom: 8px;">Local Business</h3>
                <p class="text-size-regular" style="opacity: 0.7; font-size: 14px;">Multi-location SEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Calculator (hidden until industry selected) -->
      <section id="calculator-section" style="padding: 80px 0; display: none;">
        <div class="padding-global">
          <div class="container-large" style="max-width: 900px;">

            <!-- Current Spend Section -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; margin-bottom: 32px;">
              <h3 class="heading-style-h3" style="font-size: 24px; margin-bottom: 32px; text-align: center;">What are you currently spending?</h3>

              <div id="current-solutions-grid" style="display: grid; gap: 20px; margin-bottom: 32px;">
                <!-- Will be populated by JavaScript -->
              </div>

              <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Total annual cost</p>
                    <h2 class="heading-style-h2" style="font-size: 36px;" id="total-current-cost">$0</h2>
                  </div>
                  <div style="text-align: right;">
                    <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Per month</p>
                    <h3 class="heading-style-h3" style="font-size: 28px;" id="monthly-current-cost">$0</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- SEOLOGY.AI Savings -->
            <div style="background: linear-gradient(135deg, rgba(0,255,136,0.1), rgba(0,255,136,0.05)); border: 2px solid var(--text-color-secondary, #00ff88); border-radius: 24px; padding: 48px; margin-bottom: 32px;">
              <h3 class="heading-style-h3" style="font-size: 24px; margin-bottom: 24px; text-align: center; color: var(--text-color-secondary, #00ff88);">With SEOLOGY.AI</h3>

              <div style="text-align: center; margin-bottom: 32px;">
                <p class="text-size-regular" style="opacity: 0.9; margin-bottom: 12px;">Annual cost</p>
                <h2 class="heading-style-h1" style="font-size: 48px; color: var(--text-color-secondary, #00ff88);">$588</h2>
                <p class="text-size-regular" style="opacity: 0.7;">just $49/month</p>
              </div>

              <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 32px; text-align: center;">
                <p class="text-size-regular" style="opacity: 0.9; margin-bottom: 12px; font-size: 18px;">You save</p>
                <h2 class="heading-style-h1" style="font-size: 56px; color: var(--text-color-secondary, #00ff88);" id="total-savings">$0</h2>
                <p class="text-size-regular" style="opacity: 0.9; font-size: 20px; margin-top: 12px;"><span id="savings-percentage">0%</span> cost reduction</p>
              </div>

              <div style="margin-top: 32px; text-align: center;">
                <a href="pricing.html" class="button w-inline-block" style="display: inline-flex;">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Get Started</div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Quick Comparison -->
            <div id="quick-comparison" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px;">
              <!-- Will be populated by JavaScript -->
            </div>

          </div>
        </div>
      </section>

      <!-- Questions Section (hidden until industry selected) -->
      <section id="questions-section" style="padding: 80px 0; background: rgba(0,0,0,0.3); display: none;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 48px;">
              <h2 class="heading-style-h2">Your <span class="text-color-secondary">Questions</span> Answered</h2>
            </div>

            <div style="max-width: 900px; margin: 0 auto;" id="objections-container">
              <!-- Will be populated by JavaScript -->
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section-home-cta">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="cta-wrap">
                <div class="cta-content">
                  <h2 class="heading-style-h2">Ready to <span class="text-color-secondary">save thousands</span>?</h2>
                  <div class="spacer-medium"></div>
                  <p class="text-size-regular">Start your free trial today. No credit card required.</p>
                </div>
                <a href="pricing.html" class="main-button w-inline-block">
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

// Combine with existing JavaScript data (keep all the industry data and objections)
const newHTML = header + newMain + footer;

fs.writeFileSync(roiPath, newHTML, 'utf8');

console.log('✓ ROI Calculator simplified');
console.log('\\n✅ Changes:');
console.log('  • Removed walls of text');
console.log('  • Made calculator more interactive');
console.log('  • Cleaner, more visual design');
console.log('  • Big, clear savings numbers');
console.log('  • Questions section moved to bottom');
console.log('\\nNext: Will add the JavaScript to make it interactive!');
