// Test the simplified Agents page with ShopifyNav
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://seology-9xsfe5h0l-iimagined.vercel.app';

  console.log('🧪 Testing Simplified Agents page\n');
  console.log('=' .repeat(60));

  // Capture errors
  let errors = [];
  page.on('pageerror', error => errors.push(`[ERROR]: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[CONSOLE]: ${msg.text()}`);
  });

  console.log('\n📄 Testing: agents-simple');
  console.log('URL: ' + baseUrl + '/shopify/agents-simple\n');

  await page.goto(baseUrl + '/shopify/agents-simple', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await page.waitForTimeout(3000);

  const main = await page.locator('main').count();
  const h1 = await page.locator('h1').count();
  const nav = await page.locator('nav').count();

  console.log(`Results: main=${main}, h1=${h1}, nav=${nav}`);
  console.log(`Errors: ${errors.length > 0 ? errors.join('; ') : 'NONE ✅'}`);

  // Take screenshot
  await page.screenshot({
    path: 'test-results/agents-simple-page.png',
    fullPage: true
  });
  console.log('\n📸 Screenshot saved: test-results/agents-simple-page.png');

  // Final verdict
  console.log('\n' + '=' .repeat(60));
  console.log('\n🎯 VERDICT:\n');

  if (main >= 1 && h1 >= 1) {
    console.log('✅ Simplified page WORKS!');
    console.log('→ Issue is in the COMPLEX LOGIC of full page (useEffect, filters, modals)');
    console.log('→ NOT in ShopifyNav or AGENT_TEMPLATES');
  } else {
    console.log('❌ Simplified page FAILS too');
    console.log('→ Issue might be in ShopifyNav component');
  }

  await browser.close();
})();
