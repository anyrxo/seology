// Test if Agents page renders correctly on FIXED deployment
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('🧪 Testing FINAL FIXED deployment: https://seology-hvcby2tef-iimagined.vercel.app\n');

  // Capture all console messages and errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(`[PAGE ERROR]: ${error.message}`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[CONSOLE ERROR]: ${msg.text()}`);
    }
  });

  // Navigate to Agents page
  await page.goto('https://seology-hvcby2tef-iimagined.vercel.app/shopify/agents', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for JavaScript to execute and React to render
  await page.waitForTimeout(5000);

  // Check for semantic HTML elements
  const mainCount = await page.locator('main').count();
  const h1Count = await page.locator('h1').count();
  const navCount = await page.locator('nav').count();

  console.log('📊 AGENTS PAGE RESULTS:');
  console.log(`  main elements: ${mainCount}`);
  console.log(`  h1 elements: ${h1Count}`);
  console.log(`  nav elements: ${navCount}\n`);

  if (errors.length > 0) {
    console.log('❌ ERRORS DETECTED:');
    errors.forEach(err => console.log(`  ${err}`));
    console.log('');
  } else {
    console.log('✅ No JavaScript errors detected!\n');
  }

  // Take screenshot
  await page.screenshot({
    path: 'test-results/agents-page-FINAL-FIX.png',
    fullPage: true
  });
  console.log('📸 Screenshot saved: test-results/agents-page-FINAL-FIX.png\n');

  // Final verdict
  if (mainCount >= 1 && h1Count >= 1 && errors.length === 0) {
    console.log('✅✅✅ SUCCESS! AGENTS PAGE IS WORKING!');
    console.log('Fix successful - client-safe template separation worked!');
  } else if (mainCount >= 1 && h1Count >= 1 && errors.length > 0) {
    console.log('⚠️  Page renders but has console errors');
  } else {
    console.log('❌ Still not rendering properly');
    console.log('Main: ' + mainCount + ', H1: ' + h1Count);
  }

  await browser.close();
})();
