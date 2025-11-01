const fs = require('fs');
const glob = require('glob');

console.log('Making FAQs beautiful dropdown accordions...\\n');

const pagesWithFAQ = ['public/pricing.html', 'public/blog.html', 'public/contact.html'];

pagesWithFAQ.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Find FAQ section and replace with accordion version
  const faqSectionStart = html.indexOf('<!-- FAQ Item 1 -->');
  const faqSectionEnd = html.lastIndexOf('<!-- FAQ Item 8 -->');

  if (faqSectionStart === -1 || faqSectionEnd === -1) {
    console.log('✗ ' + filePath + ' - No FAQ section found');
    return;
  }

  // Find the actual end of last FAQ item
  const lastItemEnd = html.indexOf('</div>', html.indexOf('</div>', faqSectionEnd) + 6) + 6;

  let faqItems = [
    {q: "What counts as a \"fix\"?", a: "A fix is any automated SEO correction SEOLOGY.AI deploys to your site. This includes meta tag updates, broken link fixes, schema markup additions, image alt text, canonical tags, and technical optimizations. Scanning and analysis don't count toward your quota—only actual fixes deployed."},
    {q: "Can I change plans anytime?", a: "Yes! Upgrade or downgrade anytime. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing period. Your data and site connections are preserved when changing plans."},
    {q: "What payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can pay via invoice, ACH transfer, or wire transfer with annual contracts. All prices in USD. International payments supported."},
    {q: "Is there a contract or commitment?", a: "No long-term contracts required for Starter and Pro plans. Cancel anytime—you'll have access until the end of your billing period. Enterprise plans require annual contracts but include volume discounts up to 40%. All plans include 14-day money-back guarantee."},
    {q: "What happens if I exceed my fix limit?", a: "On the Starter plan, you'll receive a notification when approaching your 100 fix/month limit. Fixes will pause at 100 until next month or you can upgrade to Pro for unlimited fixes. Pro and Enterprise plans have no limits—deploy as many fixes as needed."},
    {q: "Do you offer discounts for nonprofits or education?", a: "Yes! Registered 501(c)(3) nonprofits and educational institutions (.edu emails) qualify for 50% off Pro plans. Contact sales@seology.ai with proof of nonprofit status or .edu email for a discount code. Offer applies to annual plans only."},
    {q: "Can I get a refund if I'm not satisfied?", a: "Absolutely. We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied for any reason within 14 days of your first payment, contact support for a full refund—no questions asked. Refunds processed within 3-5 business days."},
    {q: "What's included in Enterprise support?", a: "Enterprise customers get dedicated Slack channel, priority email/phone support (responds in <1 hour), quarterly business reviews, custom onboarding, technical account manager, SLA guarantees (99.9% uptime), and influence on product roadmap. White-label reporting and team training included."}
  ];

  // Build accordion HTML
  const accordionHTML = faqItems.map((item, index) => `
                <!-- FAQ Item ${index + 1} -->
                <div class="faq-item" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; overflow: hidden; transition: all 0.3s ease;">
                  <button onclick="toggleFAQ(${index})" class="faq-question" style="width: 100%; text-align: left; background: none; border: none; padding: 28px 32px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                    <h3 class="heading-style-h4" style="font-size: 18px; margin: 0; color: var(--text-color-secondary, #00ff88);">${item.q}</h3>
                    <svg id="faq-icon-${index}" style="width: 24px; height: 24px; fill: var(--text-color-secondary, #00ff88); transition: transform 0.3s ease;" viewBox="0 0 24 24">
                      <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                  </button>
                  <div id="faq-answer-${index}" class="faq-answer" style="max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease;">
                    <p class="text-size-regular" style="padding: 0 32px 28px 32px; margin: 0; opacity: 0.7; line-height: 1.7;">${item.a}</p>
                  </div>
                </div>`).join('\\n');

  html = html.substring(0, faqSectionStart) + accordionHTML + html.substring(lastItemEnd);

  // Add FAQ toggle JavaScript before closing body tag
  const faqScript = `
<script>
function toggleFAQ(index) {
  const answer = document.getElementById('faq-answer-' + index);
  const icon = document.getElementById('faq-icon-' + index);
  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

  if (isOpen) {
    answer.style.maxHeight = '0';
    answer.style.padding = '0';
    icon.style.transform = 'rotate(0deg)';
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  }
}

// Add hover effects
document.addEventListener('DOMContentLoaded', function() {
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.parentElement.style.borderColor = 'rgba(0,255,136,0.3)';
      this.parentElement.style.background = 'rgba(255,255,255,0.05)';
    });
    btn.addEventListener('mouseleave', function() {
      this.parentElement.style.borderColor = 'rgba(255,255,255,0.08)';
      this.parentElement.style.background = 'rgba(255,255,255,0.03)';
    });
  });
});
</script>
`;

  if (!html.includes('function toggleFAQ')) {
    html = html.replace('</body>', faqScript + '</body>');
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ ' + filePath + ' - Made ' + faqItems.length + ' FAQs into beautiful accordions');
});

console.log('\\n✅ FAQs are now beautiful dropdown accordions!');
console.log('\\nFeatures:');
console.log('  • Click to expand/collapse');
console.log('  • Smooth animations');
console.log('  • Rotating arrow icons');
console.log('  • Hover effects with green glow');
console.log('  • Clean, modern design');
