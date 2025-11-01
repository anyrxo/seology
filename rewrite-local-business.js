const fs = require('fs');
const path = require('path');

console.log('Rewriting local-business page to focus on SEO for small businesses...\n');

const filePath = path.join(__dirname, 'public', 'local-business.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace hero section
const heroStart = content.indexOf('<!-- Simple local business hero intro -->');
const heroEnd = content.indexOf('</section>', heroStart) + '</section>'.length;

const newHero = `<!-- Hero Section for Small Business SEO -->
      <section style="padding: 120px 0; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%); pointer-events: none;"></div>
        <div class="padding-global" style="position: relative; z-index: 1;">
          <div class="container-large">
            <div style="max-width: 900px; margin: 0 auto;">
              <div style="display: inline-block; padding: 8px 20px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 24px; margin-bottom: 32px;">
                <span style="font-size: 13px; color: var(--text-color-secondary, #ffffff); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">For Small Businesses</span>
              </div>

              <h1 class="heading-style-h1" style="font-size: 64px; line-height: 1.1; margin-bottom: 24px;">
                Affordable SEO That <span class="text-color-secondary">Actually Works</span>
              </h1>

              <p class="text-size-large" style="font-size: 20px; line-height: 1.6; opacity: 0.8; margin-bottom: 48px; max-width: 700px; margin-left: auto; margin-right: auto;">
                No expensive agencies. No $5,000/month retainers. Just automated SEO that fixes your technical issues and gets you ranking—starting at $0/month.
              </p>

              <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 48px;">
                <a href="pricing.html#pricing-plans" class="main-button w-inline-block" style="background: #ffffff; color: #000; padding: 18px 40px; display: inline-flex;">
                  <div class="button-text" style="color: #000; font-weight: 600;">Start Free</div>
                </a>
                <a href="roi-calculator.html" class="main-button w-inline-block" style="background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); padding: 18px 40px; display: inline-flex;">
                  <div class="button-text" style="color: #ffffff; font-weight: 600;">See ROI Calculator</div>
                </a>
              </div>

              <p style="font-size: 14px; opacity: 0.6;">Start free • 3 sites • 100 fixes/month • No credit card required</p>
            </div>
          </div>
        </div>
      </section>`;

if (heroStart !== -1) {
  content = content.slice(0, heroStart) + newHero + content.slice(heroEnd);
  console.log('✓ Replaced hero section');
}

// Replace features section
const featuresStart = content.indexOf('<!-- Local SEO Features Section -->');
const featuresEnd = content.indexOf('</section>', featuresStart) + '</section>'.length;

const newFeatures = `<!-- Small Business SEO Features -->
      <section class="section-home-services" style="background: rgba(0,0,0,0.2);">
        <div class="padding-global">
          <div class="container-large">
            <div class="padding-section-large">
              <div style="text-align: center; margin-bottom: 64px;">
                <h2 class="heading-style-h2">Everything Small Businesses <span class="text-color-secondary">Need for SEO</span></h2>
                <div class="spacer-medium"></div>
                <p class="text-size-regular" style="max-width: 700px; margin: 0 auto; opacity: 0.8;">No technical knowledge required. We handle everything automatically.</p>
              </div>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-bottom: 64px;">

                <!-- Technical SEO Fixes -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <h3 class="heading-style-h4" style="font-size: 22px; margin-bottom: 16px;">Technical SEO Fixes</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">We automatically find and fix the technical issues killing your rankings—missing meta tags, broken links, slow pages, mobile errors.</p>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Auto-fix meta titles & descriptions</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Fix broken links automatically</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Optimize images for speed</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Mobile-friendly checks</span>
                    </div>
                  </div>
                </div>

                <!-- Content Optimization -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <h3 class="heading-style-h4" style="font-size: 22px; margin-bottom: 16px;">Content Optimization</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">AI-powered content recommendations to help your pages rank higher. Get keyword suggestions, title improvements, and content gaps filled.</p>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Keyword research & targeting</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Heading structure optimization</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Content gap analysis</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Internal linking suggestions</span>
                    </div>
                  </div>
                </div>

                <!-- Local SEO -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <h3 class="heading-style-h4" style="font-size: 22px; margin-bottom: 16px;">Local SEO Basics</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">Essential local SEO setup for brick-and-mortar businesses. Get found by customers searching in your area.</p>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>LocalBusiness schema markup</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>NAP consistency checks</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Contact page optimization</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Location-based keywords</span>
                    </div>
                  </div>
                </div>

                <!-- Performance & Speed -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px;">
                  <h3 class="heading-style-h4" style="font-size: 22px; margin-bottom: 16px;">Performance & Speed</h3>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6; margin-bottom: 20px;">Slow sites don't rank. We monitor and fix speed issues automatically so Google loves your site.</p>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Core Web Vitals monitoring</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Image optimization</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Caching recommendations</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 14px;">
                      <span style="color: var(--text-color-secondary, #ffffff);">✓</span>
                      <span>Mobile performance fixes</span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- CTA -->
              <div style="text-align: center; padding: 48px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px;">
                <h3 class="heading-style-h3" style="margin-bottom: 16px;">Start Fixing Your SEO Today</h3>
                <p class="text-size-regular" style="opacity: 0.7; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto;">No credit card required. Get your first 100 SEO fixes free.</p>
                <a href="pricing.html#pricing-plans" class="main-button w-inline-block" style="background: #ffffff; color: #000; padding: 16px 40px; display: inline-flex;">
                  <div class="button-text" style="color: #000; font-weight: 600;">Get Started Free →</div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>`;

if (featuresStart !== -1) {
  content = content.slice(0, featuresStart) + newFeatures + content.slice(featuresEnd);
  console.log('✓ Replaced features section');
}

// Update page title and meta description
content = content.replace(
  /<title>.*?<\/title>/,
  '<title>SEO for Small Businesses - SEOLOGY.AI | Affordable Automated SEO</title>'
);

content = content.replace(
  /<meta content=".*?" name="description">/,
  '<meta content="Affordable SEO automation for small businesses. No expensive agencies or $5k/month retainers. Technical SEO fixes, content optimization, and local SEO—starting at $0/month." name="description">'
);

content = content.replace(
  /<meta content=".*?" property="og:title">/,
  '<meta content="SEO for Small Businesses - SEOLOGY.AI" property="og:title">'
);

content = content.replace(
  /<meta content=".*?" property="twitter:title">/,
  '<meta content="SEO for Small Businesses - SEOLOGY.AI" property="twitter:title">'
);

console.log('✓ Updated page meta tags');

fs.writeFileSync(filePath, content);

console.log('\n✅ Local business page rewritten successfully!');
console.log('\nChanges:');
console.log('  • Hero: Focus on affordable SEO for small businesses');
console.log('  • Features: Technical SEO, content optimization, local basics, performance');
console.log('  • Removed: Map pack focus, NAP directory syncing, GMB automation');
console.log('  • Added: Small business-friendly messaging, $0 starter plan');
console.log('  • Meta: Updated title and description for better SEO');
