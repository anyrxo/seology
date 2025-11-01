const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('🔧 Fixing SEOLOGY.AI Homepage Issues...\n');

// 1. Add ROI Calculator JavaScript functionality
const roiScript = `
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

// Add script before closing body tag
if (!html.includes('function calculateROI()')) {
  html = html.replace('</body>', roiScript + '\n</body>');
  console.log('✓ Added ROI Calculator JavaScript functionality');
}

// 2. Remove FAQ Section from homepage (keep in pricing page only)
const faqStart = html.indexOf('<!-- FAQ Section -->');
const faqEnd = html.indexOf('</section>', faqStart) + 10;
if (faqStart !== -1) {
  html = html.substring(0, faqStart) + html.substring(faqEnd);
  console.log('✓ Removed FAQ section from homepage');
}

// 3. Remove Use Case Cards section from homepage
const useCaseSectionStart = html.indexOf('<!-- Use Cases Section -->');
if (useCaseSectionStart !== -1) {
  const useCaseSectionEnd = html.indexOf('</section>', useCaseSectionStart) + 10;
  html = html.substring(0, useCaseSectionStart) + html.substring(useCaseSectionEnd);
  console.log('✓ Removed E-commerce/SaaS/Agencies/Local Business cards from homepage');
}

// 4. Add Back-to-Top Button (before closing main tag)
const backToTopButton = `
    <!-- Back to Top Button -->
    <div id="back-to-top" style="position: fixed; bottom: 40px; right: 40px; z-index: 1000; opacity: 0; visibility: hidden; transition: all 0.3s ease;">
      <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" style="width: 56px; height: 56px; background: linear-gradient(135deg, var(--text-color-secondary, #00ff88), rgba(0,255,136,0.7)); border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,255,136,0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <svg style="width: 24px; height: 24px; fill: #000;" viewBox="0 0 24 24">
          <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
        </svg>
      </button>
    </div>

    <script>
    // Show/hide back-to-top button
    window.addEventListener('scroll', function() {
      const backToTop = document.getElementById('back-to-top');
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    });
    </script>
`;

if (!html.includes('id="back-to-top"')) {
  html = html.replace('</main>', backToTopButton + '\n    </main>');
  console.log('✓ Added back-to-top arrow button');
}

// 5. Fix "Get Started" button to link to pricing page
html = html.replace(
  /<a href="index\.html" class="button/g,
  '<a href="pricing.html" class="button'
);
html = html.replace(
  /<a href="#" class="button/g,
  '<a href="pricing.html" class="button'
);
console.log('✓ Fixed "Get Started" buttons to link to pricing page');

// 6. Check for duplicate footers and remove if found
const footerCount = (html.match(/<footer/g) || []).length;
if (footerCount > 1) {
  console.log(`⚠ Found ${footerCount} footer tags - keeping only the last one`);
  // Keep only the last footer
  const lastFooterStart = html.lastIndexOf('<footer');
  const firstFooterStart = html.indexOf('<footer');
  if (firstFooterStart !== lastFooterStart) {
    const secondFooterStart = html.indexOf('<footer', firstFooterStart + 1);
    html = html.substring(0, firstFooterStart) + html.substring(secondFooterStart);
  }
}

fs.writeFileSync(filePath, html, 'utf8');

console.log('\n✅ Homepage fixes complete!\n');
console.log('Fixed issues:');
console.log('1. ✓ ROI Calculator now functional with live calculations');
console.log('2. ✓ FAQ section removed from homepage (kept on pricing page)');
console.log('3. ✓ E-commerce/SaaS/Agencies cards removed (kept in footer)');
console.log('4. ✓ Back-to-top arrow button added');
console.log('5. ✓ "Get Started" buttons now link to pricing page');
console.log('6. ✓ Footer consolidation checked');
