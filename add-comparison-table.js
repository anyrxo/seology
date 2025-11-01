const fs = require('fs');

console.log('Adding competitor comparison table to pricing page...\n');

const comparisonSection = `
      <!-- Competitor Comparison Section -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.3); padding: 80px 0;">
        <div class="padding-global">
          <div class="container-large">
            <div style="text-align: center; margin-bottom: 48px;">
              <h2 class="heading-style-h2">SEOLOGY.AI vs <span class="text-color-secondary">The Competition</span></h2>
              <div class="spacer-small"></div>
              <p class="text-size-regular" style="opacity: 0.8;">Why we're different from traditional SEO tools</p>
            </div>

            <div style="max-width: 1000px; margin: 0 auto; overflow-x: auto;">
              <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: rgba(255,255,255,0.02); border-radius: 16px; overflow: hidden;">
                <thead>
                  <tr style="background: rgba(255,255,255,0.05);">
                    <th style="padding: 20px; text-align: left; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08);">Feature</th>
                    <th style="padding: 20px; text-align: center; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); color: var(--text-color-secondary, #00ff88);">SEOLOGY.AI</th>
                    <th style="padding: 20px; text-align: center; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); opacity: 0.6;">Ahrefs</th>
                    <th style="padding: 20px; text-align: center; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); opacity: 0.6;">SEMrush</th>
                    <th style="padding: 20px; text-align: center; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.08); opacity: 0.6;">Screaming Frog</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 20px; font-weight: 500;">Automatically Fixes Issues</td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                  </tr>

                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 20px; font-weight: 500;">Connects to Your CMS</td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                  </tr>

                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 20px; font-weight: 500;">No Manual Work Required</td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center; opacity: 0.4;">
                      <svg style="width: 24px; height: 24px; fill: #ff4444; margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                      </svg>
                    </td>
                  </tr>

                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 20px; font-weight: 500;">Detects SEO Issues</td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto; opacity: 0.6;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto; opacity: 0.6;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                    <td style="padding: 20px; text-align: center;">
                      <svg style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); margin: 0 auto; opacity: 0.6;" viewBox="0 0 24 24">
                        <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                      </svg>
                    </td>
                  </tr>

                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <td style="padding: 20px; font-weight: 500;">Starting Price</td>
                    <td style="padding: 20px; text-align: center; color: var(--text-color-secondary, #00ff88); font-weight: 600;">Free</td>
                    <td style="padding: 20px; text-align: center; opacity: 0.6;">$99/mo</td>
                    <td style="padding: 20px; text-align: center; opacity: 0.6;">$129/mo</td>
                    <td style="padding: 20px; text-align: center; opacity: 0.6;">$259/yr</td>
                  </tr>

                  <tr>
                    <td style="padding: 20px; font-weight: 500;">Best For</td>
                    <td style="padding: 20px; text-align: center; font-size: 14px;">Everyone who wants SEO done automatically</td>
                    <td style="padding: 20px; text-align: center; font-size: 14px; opacity: 0.6;">SEO professionals who manually fix issues</td>
                    <td style="padding: 20px; text-align: center; font-size: 14px; opacity: 0.6;">Marketing teams with technical resources</td>
                    <td style="padding: 20px; text-align: center; font-size: 14px; opacity: 0.6;">Technical SEO audits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="text-align: center; margin-top: 48px;">
              <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 24px;">The only platform that actually logs into your CMS and fixes SEO issues for you</p>
              <a href="#pricing-plans" class="button w-inline-block">
                <div class="button-text-wrap">
                  <div class="button-text">Start Fixing Issues Free</div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>
`;

const pricingPath = 'public/pricing.html';
let html = fs.readFileSync(pricingPath, 'utf8');

// Insert comparison table before the FAQ section
const faqSectionPos = html.indexOf('<!-- Pricing FAQ Section -->');

if (faqSectionPos !== -1) {
  html = html.substring(0, faqSectionPos) + comparisonSection + '\n      ' + html.substring(faqSectionPos);

  fs.writeFileSync(pricingPath, html, 'utf8');
  console.log('✅ Added competitor comparison table to pricing page');
  console.log('\nComparison highlights:');
  console.log('• SEOLOGY.AI: Automatically fixes issues ✓');
  console.log('• Ahrefs: Only detects, no fixes ✗');
  console.log('• SEMrush: Only detects, no fixes ✗');
  console.log('• Screaming Frog: Only detects, no fixes ✗');
  console.log('\nConversion impact:');
  console.log('• Clear differentiation from competitors');
  console.log('• Visual comparison (checkmarks vs X marks)');
  console.log('• Price advantage highlighted (Free vs $99-259)');
  console.log('• Emphasizes unique value proposition');
} else {
  console.log('✗ Could not find FAQ section to insert comparison table');
}
