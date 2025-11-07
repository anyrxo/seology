// Test the Agents page WITHOUT toast import
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://seology-i6h7myijn-iimagined.vercel.app';

  console.log('🧪 Testing Agents page WITHOUT toast import\n');
  console.log('=' .repeat(60));

  // Capture errors
  let errors = [];
  page.on('pageerror', error => errors.push(`[ERROR]: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(`[CONSOLE]: ${msg.text()}`);
  });

  console.log('\n📄 Testing: agents-no-toast');
  console.log('URL: ' + baseUrl + '/shopify/agents-no-toast\n');

  await page.goto(baseUrl + '/shopify/agents-no-toast', {
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
    path: 'test-results/agents-no-toast-page.png',
    fullPage: true
  });
  console.log('\n📸 Screenshot saved: test-results/agents-no-toast-page.png');

  // Final verdict
  console.log('\n' + '=' .repeat(60));
  console.log('\n🎯 VERDICT:\n');

  if (main >= 1 && h1 >= 1 && errors.length === 0) {
    console.log('✅✅✅ SUCCESS! Page works WITHOUT errors!');
    console.log('→ The issue IS the toast/sonner import!');
  } else if (main >= 1 && h1 >= 1 && errors.length > 0) {
    console.log('✅ Page renders but has errors');
    console.log('→ Errors are NOT fatal, checking if they are from toast...');
  } else {
    console.log('❌ Still fails even without toast');
    console.log('→ Issue is NOT toast, must be something else');
  }

  await browser.close();
})();
