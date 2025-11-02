const fs = require('fs');
const path = require('path');

console.log('🔧 Rebuilding pricing page with proper Craflow structure...\n');

const publicDir = path.join(__dirname, 'public');
const pricingPath = path.join(publicDir, 'pricing.html');

let html = fs.readFileSync(pricingPath, 'utf8');

// Find where the empty content starts (after <body> and skip-link)
const bodyStart = html.indexOf('<style>.skip-link:focus');
const bodyStartEnd = html.indexOf('</style>', bodyStart) + '</style>'.length;

// Find where footer starts
const footerStart = html.indexOf('<footer class="footer"');

// Extract head and footer
const head = html.substring(0, bodyStartEnd);
const footer = html.substring(footerStart);

// Build the complete pricing page content
const pricingContent = `

  <!-- NAVIGATION -->
  <div data-animation="default" class="navbar w-nav" data-easing2="ease" data-easing="ease" data-collapse="medium" role="banner" data-duration="400">
    <div class="padding-global">
      <div class="navbar-container">
        <a href="index.html" aria-current="page" class="navbar-logo-link w-nav-brand w--current" aria-label="home">
          <img src="images/logo.png" loading="lazy" alt="SEOLOGY.AI" class="navbar-logo">
        </a>
        <nav role="navigation" class="nav-menu w-nav-menu">
          <div class="nav-menu-content">
            <div class="left-nav-menu">
              <div class="nav-link-overflow">
                <a href="pricing.html" class="nav-link w-inline-block">
                  <div class="nav-link-block">
                    <div class="nav-text">Pricing</div>
                    <div class="nav-text is-hover">Pricing</div>
                  </div>
                </a>
              </div>
              <div class="nav-link-overflow">
                <a href="enterprise.html" class="nav-link w-inline-block">
                  <div class="nav-link-block">
                    <div class="nav-text">Enterprise</div>
                    <div class="nav-text is-hover">Enterprise</div>
                  </div>
                </a>
              </div>
              <div class="nav-link-overflow">
                <a href="about.html" class="nav-link w-inline-block">
                  <div class="nav-link-block">
                    <div class="nav-text">About</div>
                    <div class="nav-text is-hover">About</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="right-nav-menu">
              <div class="nav-link-overflow">
                <a href="blog.html" class="nav-link w-inline-block">
                  <div class="nav-link-block">
                    <div class="nav-text">Blog</div>
                    <div class="nav-text is-hover">Blog</div>
                  </div>
                </a>
              </div>
              <div class="nav-link-overflow">
                <a href="careers.html" class="nav-link w-inline-block">
                  <div class="nav-link-block">
                    <div class="nav-text">Careers</div>
                    <div class="nav-text is-hover">Careers</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div class="menu-button w-nav-button" aria-label="menu" role="button" tabindex="0" aria-controls="w-nav-overlay-0" aria-haspopup="menu" aria-expanded="false">
          <div class="menu-button-icon w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
    <div class="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div>
  </div>

  <main id="main-content">
    <!-- HERO SECTION -->
    <section class="section-header-home is-project-detail">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large">
            <div class="header-component">
              <div class="header-content-block">
                <div class="margin-bottom margin-large">
                  <h1 class="heading-style-h1">Simple, Transparent Pricing</h1>
                </div>
                <div class="margin-bottom margin-medium">
                  <p class="text-size-large">Start free. Scale when ready. Enterprise when you need it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING CARDS -->
    <section class="section-layout-42">
      <div class="padding-global">
        <div class="container-large">
          <div class="padding-section-large" style="padding-top: 0;">

            <!-- Pricing Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 80px;">

              <!-- FREE PLAN -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 20px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom: 24px;">
                  <div class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Starter</div>
                  <div style="display: flex; align-items: baseline; margin-bottom: 16px;">
                    <div class="heading-style-h1" style="font-size: 56px; line-height: 1;">$0</div>
                    <div class="text-size-regular" style="opacity: 0.5; margin-left: 8px;">/month</div>
                  </div>
                  <p class="text-size-regular" style="opacity: 0.7;">Perfect for trying out SEOLOGY.AI</p>
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-bottom: 32px;">
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">3 connected sites</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">100 fixes per month</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Basic SEO audit</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Email support</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">14-day rollback</div>
                    </div>
                  </div>
                </div>

                <a href="#" class="main-button is-secondary w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Get Started Free</div>
                  </div>
                  <div class="button-transition-wrap">
                    <div class="button-transition">
                      <div class="button-text">Get Started Free</div>
                    </div>
                  </div>
                </a>
              </div>

              <!-- PRO PLAN (Featured) -->
              <div style="background: rgba(0,204,106,0.1); border-radius: 20px; padding: 40px; border: 2px solid #00cc6a; position: relative;">
                <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #00cc6a; color: #000; padding: 4px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;">MOST POPULAR</div>

                <div style="margin-bottom: 24px;">
                  <div class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Pro</div>
                  <div style="display: flex; align-items: baseline; margin-bottom: 16px;">
                    <div class="heading-style-h1" style="font-size: 56px; line-height: 1;">$20</div>
                    <div class="text-size-regular" style="opacity: 0.5; margin-left: 8px;">/month</div>
                  </div>
                  <p class="text-size-regular" style="opacity: 0.7;">For serious SEO automation</p>
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-bottom: 32px;">
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular"><strong>Unlimited sites</strong></div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular"><strong>Unlimited fixes</strong></div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Advanced SEO audit</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Priority support</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">90-day rollback</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Custom integrations</div>
                    </div>
                  </div>
                </div>

                <a href="#" class="main-button w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Start Pro Trial</div>
                  </div>
                  <div class="button-transition-wrap">
                    <div class="button-transition">
                      <div class="button-text">Start Pro Trial</div>
                    </div>
                  </div>
                </a>
              </div>

              <!-- ENTERPRISE PLAN -->
              <div style="background: rgba(255,255,255,0.03); border-radius: 20px; padding: 40px; border: 1px solid rgba(255,255,255,0.1);">
                <div style="margin-bottom: 24px;">
                  <div class="text-size-regular" style="opacity: 0.7; margin-bottom: 8px;">Enterprise</div>
                  <div style="display: flex; align-items: baseline; margin-bottom: 16px;">
                    <div class="heading-style-h1" style="font-size: 56px; line-height: 1;">Custom</div>
                  </div>
                  <p class="text-size-regular" style="opacity: 0.7;">For teams and agencies</p>
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-bottom: 32px;">
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Everything in Pro</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">White-label reports</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Dedicated support</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">SLA guarantee</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">Custom training</div>
                    </div>
                    <div style="display: flex; align-items: start; gap: 12px;">
                      <div style="color: #00cc6a; margin-top: 2px;">✓</div>
                      <div class="text-size-regular">API access</div>
                    </div>
                  </div>
                </div>

                <a href="enterprise.html" class="main-button is-secondary w-inline-block">
                  <div class="button-text-wrap">
                    <div class="button-text is-transition">Contact Sales</div>
                  </div>
                  <div class="button-transition-wrap">
                    <div class="button-transition">
                      <div class="button-text">Contact Sales</div>
                    </div>
                  </div>
                </a>
              </div>

            </div>

            <!-- FAQ SECTION -->
            <div style="max-width: 900px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 60px;">
                <h2 class="heading-style-h2">Frequently Asked Questions</h2>
              </div>

              <div style="display: flex; flex-direction: column; gap: 24px;">

                <!-- FAQ Item 1 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">What counts as a "fix"?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">A fix is any automated SEO correction SEOLOGY.AI deploys to your site. This includes meta tag updates, broken link fixes, schema markup additions, image alt text, canonical tags, and technical optimizations. Scanning and analysis don't count toward your quota—only actual fixes deployed.</p>
                </div>

                <!-- FAQ Item 2 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">Can I change plans anytime?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Yes! Upgrade or downgrade anytime. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing period. Your data and site connections are preserved when changing plans.</p>
                </div>

                <!-- FAQ Item 3 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">What payment methods do you accept?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can pay via invoice, ACH transfer, or wire transfer. All prices in USD. International payments supported.</p>
                </div>

                <!-- FAQ Item 4 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">Is there a contract or commitment?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">No long-term contracts required for Starter and Pro plans. Cancel anytime—you'll have access until the end of your billing period. All plans include 14-day money-back guarantee.</p>
                </div>

                <!-- FAQ Item 5 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">What happens if I exceed my fix limit?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">On the Starter plan, you'll receive a notification when approaching your 100 fix/month limit. Fixes will pause at 100 until next month or you can upgrade to Pro for unlimited fixes. Pro and Enterprise plans have no limits—deploy as many fixes as needed.</p>
                </div>

                <!-- FAQ Item 6 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">Do you offer discounts for nonprofits or education?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Yes! Registered 501(c)(3) nonprofits and educational institutions (.edu emails) qualify for 50% off Pro plans. Contact sales@seology.ai with proof of nonprofit status or .edu email for a discount code. Offer applies to annual plans only.</p>
                </div>

                <!-- FAQ Item 7 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">Can I get a refund if I'm not satisfied?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Absolutely. We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied for any reason within 14 days of your first payment, contact support for a full refund—no questions asked. Refunds processed within 3-5 business days.</p>
                </div>

                <!-- FAQ Item 8 -->
                <div style="background: rgba(255,255,255,0.03); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
                  <div class="text-size-large" style="margin-bottom: 12px; font-weight: 600;">What's included in Enterprise support?</div>
                  <p class="text-size-regular" style="opacity: 0.7; line-height: 1.6;">Enterprise customers get dedicated Slack channel, priority email/phone support (responds in <1 hour), quarterly business reviews, custom onboarding, technical account manager, SLA guarantees (99.9% uptime), and influence on product roadmap. White-label reporting and team training included.</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </main>

`;

// Rebuild the complete HTML
const newHtml = head + pricingContent + footer;

fs.writeFileSync(pricingPath, newHtml);

console.log('✅ Pricing page rebuilt with proper structure!');
console.log('✅ Navigation: Pricing, Enterprise, About, Blog, Careers');
console.log('✅ 3 pricing cards with proper Craflow button structure');
console.log('✅ 8 FAQ items with proper formatting');
console.log('✅ All buttons have .main-button with .button-text-wrap and .button-transition-wrap');
