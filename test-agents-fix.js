// Test if Agents page renders correctly on new deployment
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('🧪 Testing FIXED deployment: https://seology-bt7m52cmp-iimagined.vercel.app\n');

  // Navigate to Agents page
  await page.goto('https://seology-bt7m52cmp-iimagined.vercel.app/shopify/agents', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for JavaScript to execute and React to render
  await page.waitForTimeout(3000);

  // Check for semantic HTML elements
  const mainCount = await page.locator('main').count();
  const h1Count = await page.locator('h1').count();
  const navCount = await page.locator('nav').count();
  const bannerCount = await page.locator('[role="banner"]').count();

  console.log('📊 AGENTS PAGE RESULTS:');
  console.log(`  main elements: ${mainCount}`);
  console.log(`  h1 elements: ${h1Count}`);
  console.log(`  nav elements: ${navCount}`);
  console.log(`  banner elements: ${bannerCount}\n`);

  // Check for JavaScript errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Wait a bit more to catch any delayed errors
  await page.waitForTimeout(2000);

  if (errors.length > 0) {
    console.log('❌ ERRORS DETECTED:');
    errors.forEach(err => console.log(`  - ${err}`));
    console.log('');
  } else {
    console.log('✅ No JavaScript errors detected!\n');
  }

  // Take screenshot
  await page.screenshot({
    path: 'test-results/agents-page-fixed.png',
    fullPage: true
  });
  console.log('📸 Screenshot saved to test-results/agents-page-fixed.png\n');

  // Final verdict
  if (mainCount >= 1 && h1Count >= 1 && errors.length === 0) {
    console.log('✅✅✅ AGENTS PAGE IS WORKING! Fix successful!');
  } else if (mainCount >= 1 && h1Count >= 1 && errors.length > 0) {
    console.log('⚠️  Page renders but has console errors');
  } else {
    console.log('❌ Still not rendering properly');
  }

  await browser.close();
})();
