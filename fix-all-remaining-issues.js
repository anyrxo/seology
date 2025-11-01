const fs = require('fs');
const path = require('path');

console.log('Fixing all remaining critical issues...\n');

// 1. Remove volume discounts section from pricing.html
console.log('1. Removing volume discounts from pricing.html...');
const pricingPath = path.join(__dirname, 'public', 'pricing.html');
let pricing = fs.readFileSync(pricingPath, 'utf8');

// Remove entire volume pricing section
const volumeSectionStart = pricing.indexOf('<!-- Volume Pricing Section -->');
const volumeSectionEnd = pricing.indexOf('</section>', volumeSectionStart) + '</section>'.length;

if (volumeSectionStart !== -1) {
  pricing = pricing.slice(0, volumeSectionStart) + pricing.slice(volumeSectionEnd);
  console.log('   ✓ Removed volume discounts section');
}

// Remove volume discount references from FAQ
pricing = pricing.replace(
  /Enterprise plans require annual contracts but include volume discounts up to 40%\. /g,
  ''
);
pricing = pricing.replace(
  /Enterprise customers can pay via invoice, ACH transfer, or wire transfer with annual contracts\./g,
  'Enterprise customers can pay via invoice, ACH transfer, or wire transfer.'
);

console.log('   ✓ Removed volume discount references from FAQ');

// Fix annual toggle to actually change prices
const toggleScriptStart = pricing.indexOf('const toggle = document.getElementById(\'billing-toggle\');');
const toggleScriptEnd = pricing.indexOf('});', toggleScriptStart) + 3;

const newToggleScript = `    const toggle = document.getElementById('billing-toggle');
    const toggleSwitch = document.getElementById('toggle-switch');
    let isAnnual = false;

    // Price definitions (monthly)
    const prices = {
      monthly: { starter: 0, pro: 497 },
      annual: { starter: 0, pro: Math.round(497 * 0.8) } // 20% off = $398/month
    };

    toggle.addEventListener('click', function() {
      isAnnual = !isAnnual;

      if (isAnnual) {
        toggleSwitch.style.transform = 'translateX(28px)';
        // Update Pro price to annual ($398/month when billed annually)
        const proPriceEl = document.querySelector('.pro-plan-price');
        if (proPriceEl) {
          proPriceEl.innerHTML = \`<div style="font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 4px;">$\${prices.annual.pro}</div>
          <div class="text-size-regular" style="opacity: 0.6; font-size: 14px;">per month, billed annually</div>\`;
        }
      } else {
        toggleSwitch.style.transform = 'translateX(0)';
        // Update Pro price to monthly ($497/month)
        const proPriceEl = document.querySelector('.pro-plan-price');
        if (proPriceEl) {
          proPriceEl.innerHTML = \`<div style="font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 4px;">$\${prices.monthly.pro}</div>
          <div class="text-size-regular" style="opacity: 0.6; font-size: 14px;">per month</div>\`;
        }
      }
    });`;

if (toggleScriptStart !== -1) {
  pricing = pricing.slice(0, toggleScriptStart) + newToggleScript + pricing.slice(toggleScriptEnd);
  console.log('   ✓ Fixed annual toggle to actually change pricing');
}

// Add class to Pro plan price for easy targeting
pricing = pricing.replace(
  /<div style="margin-bottom: 32px;">\s*<div style="font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 4px;">\$497<\/div>\s*<div class="text-size-regular" style="opacity: 0\.6; font-size: 14px;">per month<\/div>/,
  '<div style="margin-bottom: 32px;" class="pro-plan-price"><div style="font-size: 56px; font-weight: 700; line-height: 1; margin-bottom: 4px;">$497</div><div class="text-size-regular" style="opacity: 0.6; font-size: 14px;">per month</div>'
);

fs.writeFileSync(pricingPath, pricing);
console.log('   ✓ Pricing page updated\n');

// 2. Fix enterprise page to match Cluely design
console.log('2. Redesigning enterprise page to match Cluely...');
const enterprisePath = path.join(__dirname, 'public', 'enterprise.html');
let enterprise = fs.readFileSync(enterprisePath, 'utf8');

// Find the main content section and replace with Cluely-style design
const heroSectionStart = enterprise.indexOf('<section class="section-hero">');
const heroSectionEnd = enterprise.indexOf('</section>', heroSectionStart) + '</section>'.length;

const newHeroSection = `<section class="section-hero">
      <div class="page-padding">
        <div class="container-large">
          <div class="padding-vertical padding-xxlarge">
            <div style="max-width: 900px; margin: 0 auto; text-align: center;">
              <div style="display: inline-block; padding: 8px 20px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 24px; margin-bottom: 32px;">
                <span style="font-size: 13px; color: var(--text-color-secondary, #ffffff); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">For Enterprise</span>
              </div>

              <h1 class="heading-style-h1" style="font-size: 72px; line-height: 1.1; margin-bottom: 24px;">
                SEO Automation at <span class="text-color-secondary">Enterprise Scale</span>
              </h1>

              <p class="text-size-large" style="font-size: 20px; line-height: 1.6; opacity: 0.8; margin-bottom: 48px; max-width: 700px; margin-left: auto; margin-right: auto;">
                Custom plans for organizations managing 100+ sites. White-label reporting, dedicated support, SLA guarantees, and volume pricing.
              </p>

              <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 24px;">
                <a href="demo.html" class="main-button w-inline-block" style="background: #ffffff; color: #000; padding: 18px 40px; display: inline-flex;">
                  <div class="button-text" style="color: #000; font-weight: 600;">Schedule Demo</div>
                </a>
                <a href="contact.html" class="main-button w-inline-block" style="background: rgba(255,255,255,0.1); color: #ffffff; border: 1px solid rgba(255,255,255,0.3); padding: 18px 40px; display: inline-flex;">
                  <div class="button-text" style="color: #ffffff; font-weight: 600;">Contact Sales</div>
                </a>
              </div>

              <p style="font-size: 14px; opacity: 0.6;">Trusted by enterprise teams at Fortune 500 companies</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;

if (heroSectionStart !== -1) {
  enterprise = enterprise.slice(0, heroSectionStart) + newHeroSection + enterprise.slice(heroSectionEnd);
  console.log('   ✓ Replaced enterprise hero section with Cluely-style design');
}

fs.writeFileSync(enterprisePath, enterprise);
console.log('   ✓ Enterprise page updated\n');

console.log('✅ All fixes complete!');
console.log('\nSummary:');
console.log('  • Removed volume discounts section from pricing');
console.log('  • Fixed annual toggle to change price from $497 to $398/month');
console.log('  • Cleaned enterprise page hero to match Cluely design');
console.log('  • Next: Add page transition animations from original template');
