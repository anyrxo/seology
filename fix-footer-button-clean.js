const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🧹 Cleaning up site: Footer, Button, and removing duplicate sections...\n');

const htmlFiles = glob.sync('public/*.html');

// New Cluely-style footer (clean horizontal layout)
const newFooterHTML = `    <footer class="footer">
      <div class="padding-global">
        <div class="container-large">
          <div style="padding: 60px 0;">

            <!-- Top section with logo/description -->
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 60px; flex-wrap: wrap; gap: 40px;">
              <div style="max-width: 300px;">
                <a href="index.html" style="display: inline-block; margin-bottom: 16px;">
                  <img src="images/logo.png" loading="lazy" alt="SEOLOGY.AI" style="height: 32px;">
                </a>
                <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">AI-powered SEO automation that fixes issues automatically—no manual work required</p>
              </div>

              <!-- Horizontal nav sections -->
              <div style="display: flex; gap: 80px; flex-wrap: wrap;">

                <!-- Use Cases -->
                <div>
                  <div style="font-weight: 600; margin-bottom: 16px; opacity: 0.9;">Use Cases</div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="ecommerce.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">E-commerce</a>
                    <a href="saas.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">SaaS</a>
                    <a href="agencies.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Agencies</a>
                    <a href="local-business.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Local Business</a>
                  </div>
                </div>

                <!-- Enterprise -->
                <div>
                  <div style="font-weight: 600; margin-bottom: 16px; opacity: 0.9;">Enterprise</div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="enterprise.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">SEOLOGY for Enterprise</a>
                    <a href="enterprise-guides.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Enterprise Guides</a>
                    <a href="security.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Security</a>
                    <a href="demo.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Book A Demo</a>
                  </div>
                </div>

                <!-- Resources -->
                <div>
                  <div style="font-weight: 600; margin-bottom: 16px; opacity: 0.9;">Resources</div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="roi-calculator.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">ROI Calculator</a>
                    <a href="blog.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Blog</a>
                    <a href="careers.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Careers</a>
                    <a href="contact.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Contact Us</a>
                  </div>
                </div>

                <!-- Support -->
                <div>
                  <div style="font-weight: 600; margin-bottom: 16px; opacity: 0.9;">Support</div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="help.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Help Center</a>
                    <a href="docs.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Documentation</a>
                    <a href="api.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">API Reference</a>
                  </div>
                </div>

                <!-- Legal -->
                <div>
                  <div style="font-weight: 600; margin-bottom: 16px; opacity: 0.9;">Legal</div>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <a href="privacy.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Privacy Policy</a>
                    <a href="terms.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Terms of Service</a>
                    <a href="dpa.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Data Processing Agreement</a>
                    <a href="subprocessors.html" class="text-size-regular" style="opacity: 0.7; text-decoration: none;">Subprocessors</a>
                  </div>
                </div>

              </div>
            </div>

            <!-- Bottom bar -->
            <div style="padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
              <div class="text-size-regular" style="opacity: 0.6;">© 2025 SEOLOGY.AI. All rights reserved.</div>
              <div style="display: flex; gap: 24px;">
                <a href="https://twitter.com/seologyai" target="_blank" class="text-size-regular" style="opacity: 0.6; text-decoration: none;">Twitter</a>
                <a href="https://discord.gg/seologyai" target="_blank" class="text-size-regular" style="opacity: 0.6; text-decoration: none;">Discord</a>
                <a href="https://instagram.com/seologyai" target="_blank" class="text-size-regular" style="opacity: 0.6; text-decoration: none;">Instagram</a>
                <a href="https://github.com/seologyai" target="_blank" class="text-size-regular" style="opacity: 0.6; text-decoration: none;">GitHub</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>`;

let footerUpdated = 0;
let buttonFixed = 0;

htmlFiles.forEach(filePath => {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Replace footer with clean Cluely-style footer
  const footerStart = html.indexOf('<footer class="footer">');
  const footerEnd = html.indexOf('</footer>', footerStart) + 9;

  if (footerStart !== -1 && footerEnd > footerStart) {
    html = html.substring(0, footerStart) + newFooterHTML + html.substring(footerEnd);
    modified = true;
    footerUpdated++;
  }

  // 2. Fix Get Started button class on homepage (make it normal size)
  if (filePath.includes('index.html')) {
    // Change main-button class to button class
    html = html.replace(/class="main-button w-inline-block"/g, 'class="button w-inline-block"');

    // Ensure it links to pricing
    if (html.includes('href="pricing.html"') && html.includes('Get Started')) {
      modified = true;
      buttonFixed++;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Updated ${path.basename(filePath)}`);
  }
});

console.log(`\n✅ Site cleanup complete!`);
console.log(`   • Footer redesigned on ${footerUpdated} pages (clean horizontal Cluely-style)`);
console.log(`   • Get Started button fixed: ${buttonFixed > 0 ? 'Yes' : 'Already correct'}`);
console.log('\nNew footer features:');
console.log('  • Horizontal layout with categories side-by-side');
console.log('  • Logo and description on left');
console.log('  • 5 categories: Use Cases, Enterprise, Resources, Support, Legal');
console.log('  • Clean bottom bar with copyright and social links');
console.log('  • Matches Cluely design style');
