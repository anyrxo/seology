// Test the Agents page with CSP fix deployed
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://seology-bcjzstgvn-iimagined.vercel.app';

  console.log('🧪 Testing Agents page with CSP fix\\n');
  console.log('=' .repeat(60));

  // Capture errors
  let errors = [];
  let cspErrors = [];
  page.on('pageerror', error => errors.push(`[ERROR]: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      errors.push(`[CONSOLE]: ${text}`);
      if (text.includes('Content Security Policy') || text.includes('CSP')) {
        cspErrors.push(text);
      }
    }
  });

  console.log('\\n📄 Testing: /shopify/agents');
  console.log('URL: ' + baseUrl + '/shopify/agents\\n');

  await page.goto(baseUrl + '/shopify/agents', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await page.waitForTimeout(3000);

  const main = await page.locator('main').count();
  const h1 = await page.locator('h1').count();
  const nav = await page.locator('nav').count();
  const agentCards = await page.locator('.bg-white.dark\\:bg-gray-800.rounded-lg').count();

  console.log(`Results: main=${main}, h1=${h1}, nav=${nav}, agentCards=${agentCards}`);
  console.log(`Total Errors: ${errors.length}`);
  console.log(`CSP Errors: ${cspErrors.length}`);

  if (errors.length > 0) {
    console.log('\\nErrors found:');
    errors.forEach((err, idx) => console.log(`  ${idx + 1}. ${err}`));
  }

  // Take screenshot
  await page.screenshot({
    path: 'test-results/agents-fixed-page.png',
    fullPage: true
  });
  console.log('\\n📸 Screenshot saved: test-results/agents-fixed-page.png');

  // Final verdict
  console.log('\\n' + '=' .repeat(60));
  console.log('\\n🎯 VERDICT:\\n');

  if (main >= 1 && h1 >= 1 && agentCards >= 5 && cspErrors.length === 0) {
    console.log('✅✅✅ SUCCESS! Page works with CSP fix!');
    console.log('→ Agents page renders correctly');
    console.log('→ No CSP errors blocking Shopify App Bridge');
    console.log('→ All agent cards displayed');
  } else if (main >= 1 && h1 >= 1 && cspErrors.length === 0) {
    console.log('✅ Page renders without CSP errors');
    console.log('⚠️ Some elements may be missing (agent cards)');
  } else if (cspErrors.length > 0) {
    console.log('❌ CSP errors still present');
    console.log('→ Fix may not have fully resolved the issue');
  } else {
    console.log('❌ Page still fails to render');
    console.log('→ Additional issues remain');
  }

  await browser.close();
})();
