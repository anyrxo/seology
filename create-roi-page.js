const fs = require('fs');
const path = require('path');

console.log('📊 Creating ROI Calculator Page...\n');

// Read the homepage to get the header/footer structure
const indexPath = path.join(__dirname, 'public', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Extract header (everything up to <main>)
const headerEnd = indexHtml.indexOf('<main class="main-wrapper">');
const header = indexHtml.substring(0, headerEnd);

// Extract footer (from <footer> to end)
const footerStart = indexHtml.indexOf('<footer class="footer">');
const footer = indexHtml.substring(footerStart);

// Create the ROI Calculator page HTML
const roiPageHtml = `${header}    <main class="main-wrapper">
      <header class="section-projects-header">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-top-header">
              <div class="square-wrap">
                <div style="-webkit-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-moz-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);-ms-transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0);transform:translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)" class="square"></div>
              </div>
              <div data-w-id="68fd49aa-9893-f589-328e-d4219860d707" class="overflow-wrap">
                <div style="-webkit-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform-style:preserve-3d" class="text-item">
                  <h2 class="heading-style-h2 text-align-center">ROI <span class="text-color-secondary">Calculator</span></h2>
                </div>
              </div>
              <div class="spacer-small"></div>
              <div class="max-width-large align-center">
                <p class="text-size-medium text-align-center">Calculate your potential ROI with SEOLOGY.AI based on real customer data from 500+ websites.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- ROI Calculator Section -->
      <section class="section-home-services" style="background: linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,0.3) 100%); padding: 120px 0;">
        <div class="padding-global">
          <div class="container-large">
              <div style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 64px; max-width: 900px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 48px; margin-bottom: 48px;">
                  <!-- Current Traffic -->
                  <div>
                    <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 12px; opacity: 0.9;">Monthly Organic Traffic</label>
                    <input type="number" value="10000" id="traffic" style="width: 100%; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 18px; font-weight: 600;" />
                  </div>

                  <!-- Conversion Rate -->
                  <div>
                    <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 12px; opacity: 0.9;">Conversion Rate (%)</label>
                    <input type="number" value="2" id="conversion" step="0.1" style="width: 100%; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 18px; font-weight: 600;" />
                  </div>

                  <!-- AOV -->
                  <div>
                    <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 12px; opacity: 0.9;">Average Order Value ($)</label>
                    <input type="number" value="100" id="aov" style="width: 100%; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 18px; font-weight: 600;" />
                  </div>

                  <!-- Expected Traffic Lift -->
                  <div>
                    <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 12px; opacity: 0.9;">Expected Traffic Increase (%)</label>
                    <input type="number" value="40" id="lift" style="width: 100%; padding: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 18px; font-weight: 600;" />
                  </div>
                </div>

                <!-- Results -->
                <div style="background: linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.02) 100%); border: 1px solid rgba(0,255,136,0.2); border-radius: 16px; padding: 40px; text-align: center;">
                  <div style="font-size: 16px; opacity: 0.8; margin-bottom: 8px;">Estimated Additional Monthly Revenue</div>
                  <div id="revenue" style="font-size: 56px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 24px;">$8,000</div>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div>
                      <div style="font-size: 24px; font-weight: 600; color: var(--text-color-secondary, #00ff88);" id="newTraffic">14,000</div>
                      <div style="font-size: 13px; opacity: 0.6; margin-top: 4px;">New Monthly Traffic</div>
                    </div>
                    <div>
                      <div style="font-size: 24px; font-weight: 600; color: var(--text-color-secondary, #00ff88);" id="newConversions">280</div>
                      <div style="font-size: 13px; opacity: 0.6; margin-top: 4px;">New Conversions</div>
                    </div>
                    <div>
                      <div style="font-size: 24px; font-weight: 600; color: var(--text-color-secondary, #00ff88);">ROI: 40x</div>
                      <div style="font-size: 13px; opacity: 0.6; margin-top: 4px;">On Pro Plan ($20/mo)</div>
                    </div>
                  </div>
                </div>

                <p style="text-align: center; font-size: 13px; opacity: 0.6; margin-top: 24px;">Based on average results from 500+ SEOLOGY.AI customers over 90 days</p>
              </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2); padding: 80px 0;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 64px;">
              <h2 class="heading-style-h2">How We Calculate <span class="text-color-secondary">Your ROI</span></h2>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 900px; margin: 0 auto;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 16px;">1</div>
                <h3 class="heading-style-h4" style="margin-bottom: 12px;">Your Current Metrics</h3>
                <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">We start with your monthly organic traffic, conversion rate, and average order value to establish your baseline performance.</p>
              </div>

              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 16px;">2</div>
                <h3 class="heading-style-h4" style="margin-bottom: 12px;">Traffic Increase Projection</h3>
                <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Based on 500+ customer results, we apply an average traffic lift percentage (typically 40-200% over 90 days) to project your growth.</p>
              </div>

              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 16px;">3</div>
                <h3 class="heading-style-h4" style="margin-bottom: 12px;">New Conversions</h3>
                <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">We calculate how many additional conversions you'll get from the increased traffic, maintaining your current conversion rate.</p>
              </div>

              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                <div style="font-size: 48px; font-weight: 700; color: var(--text-color-secondary, #00ff88); margin-bottom: 16px;">4</div>
                <h3 class="heading-style-h4" style="margin-bottom: 12px;">Revenue Impact</h3>
                <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Multiply new conversions by your average order value to show your estimated additional monthly revenue from SEOLOGY.AI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="section-home-cta">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div class="home-cta-wrapper">
                <div class="home-cta-content">
                  <div data-w-id="b0bc7e93-2296-cef9-b7c4-5ffa2f2d8595" class="overflow-wrap">
                    <div style="-webkit-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-moz-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);-ms-transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform:translate3d(0, 110%, 0) scale3d(1, 1, 1) rotateX(45deg) rotateY(0) rotateZ(0) skew(0, 0);transform-style:preserve-3d" class="text-item">
                      <h2 class="heading-style-h2 text-align-center">Ready to <span class="text-color-secondary">get started?</span></h2>
                    </div>
                  </div>
                  <div class="spacer-small"></div>
                  <p class="text-size-medium text-align-center">Start fixing your SEO issues automatically today. No credit card required.</p>
                  <div class="spacer-medium"></div>
                  <div class="button-row">
                    <a href="pricing.html" class="button w-inline-block">
                      <div class="button-wrapper">
                        <div class="button-text is-transition">Get Started Free</div>
                      </div>
                      <div class="button-wrapper is-hover">
                        <div class="button-text">Get Started Free</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footer}

<script>
// ROI Calculator
function calculateROI() {
  const traffic = parseFloat(document.getElementById('traffic').value) || 0;
  const conversion = parseFloat(document.getElementById('conversion').value) || 0;
  const aov = parseFloat(document.getElementById('aov').value) || 0;
  const lift = parseFloat(document.getElementById('lift').value) || 0;

  const newTraffic = Math.round(traffic * (1 + lift/100));
  const additionalTraffic = newTraffic - traffic;
  const newConversions = Math.round(additionalTraffic * (conversion/100));
  const revenue = Math.round(newConversions * aov);

  document.getElementById('revenue').textContent = '$' + revenue.toLocaleString();
  document.getElementById('newTraffic').textContent = newTraffic.toLocaleString();
  document.getElementById('newConversions').textContent = newConversions.toLocaleString();
}

// Add event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // ROI Calculator inputs
  const inputs = ['traffic', 'conversion', 'aov', 'lift'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', calculateROI);
    }
  });

  // Initial calculation
  calculateROI();
});
</script>
`;

// Save ROI Calculator page
const roiPagePath = path.join(__dirname, 'public', 'roi-calculator.html');
fs.writeFileSync(roiPagePath, roiPageHtml, 'utf8');
console.log('✓ Created roi-calculator.html page');

// Remove ROI Calculator section from homepage
const roiSectionStart = indexHtml.indexOf('<!-- ROI Calculator Section -->');
const roiSectionEnd = indexHtml.indexOf('</section>', roiSectionStart) + 10;
indexHtml = indexHtml.substring(0, roiSectionStart) + indexHtml.substring(roiSectionEnd);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('✓ Removed ROI Calculator from homepage');

console.log('\n✅ ROI Calculator page created successfully!');
console.log('   Access at: public/roi-calculator.html');
