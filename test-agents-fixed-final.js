// Test the Agents page after toast library removal
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://seology-g4cl2zw5j-iimagined.vercel.app';

  console.log('🧪 Testing Agents page after toast fix\n');
  console.log('='.repeat(60));

  // Capture errors
  let errors = [];
  let cNotAFunctionError = false;
  page.on('pageerror', error => {
    errors.push(`[ERROR]: ${error.message}`);
    if (error.message.includes('c is not a function')) {
      cNotAFunctionError = true;
    }
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      errors.push(`[CONSOLE]: ${text}`);
      if (text.includes('c is not a function')) {
        cNotAFunctionError = true;
      }
    }
  });

  console.log('\n📄 Testing: /shopify/agents');
  console.log('URL: ' + baseUrl + '/shopify/agents?shop=test\n');

  await page.goto(baseUrl + '/shopify/agents?shop=test', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await page.waitForTimeout(3000);

  // Check for elements
  const main = await page.locator('main').count();
  const h1 = await page.locator('h1').count();
  const nav = await page.locator('nav').count();
  const agentCards = await page.locator('.bg-white').count();
  const loadingSpinner = await page.locator('.animate-spin').count();

  console.log(`Results:`);
  console.log(`  main elements: ${main}`);
  console.log(`  h1 headings: ${h1}`);
  console.log(`  nav elements: ${nav}`);
  console.log(`  agent cards: ${agentCards}`);
  console.log(`  loading spinners: ${loadingSpinner}`);
  console.log(`\nErrors:`);
  console.log(`  Total errors: ${errors.length}`);
  console.log(`  "c is not a function" error: ${cNotAFunctionError ? 'YES ❌' : 'NO ✅'}`);

  if (errors.length > 0 && errors.length <= 5) {
    console.log('\nError details:');
    errors.forEach((err, idx) => console.log(`  ${idx + 1}. ${err}`));
  } else if (errors.length > 5) {
    console.log('\nError details (first 5):');
    errors.slice(0, 5).forEach((err, idx) => console.log(`  ${idx + 1}. ${err}`));
    console.log(`  ... and ${errors.length - 5} more errors`);
  }

  // Take screenshot
  await page.screenshot({
    path: 'test-results/agents-fixed-final.png',
    fullPage: true
  });
  console.log('\n📸 Screenshot saved: test-results/agents-fixed-final.png');

  // Final verdict
  console.log('\n' + '='.repeat(60));
  console.log('\n🎯 VERDICT:\n');

  if (main >= 1 && h1 >= 1 && agentCards >= 5 && !cNotAFunctionError && loadingSpinner === 0) {
    console.log('✅✅✅ SUCCESS! Agents page fully fixed!');
    console.log('→ Page renders completely');
    console.log('→ No "c is not a function" error');
    console.log('→ All agent cards displayed');
    console.log('→ No loading spinner stuck');
  } else if (!cNotAFunctionError && loadingSpinner === 0) {
    console.log('✅ Page renders without toast error');
    console.log('⚠️ Some elements may be missing');
    if (main < 1) console.log('  - Missing main element');
    if (h1 < 1) console.log('  - Missing h1 heading');
    if (agentCards < 5) console.log(`  - Only ${agentCards} agent cards (expected 5)`);
  } else if (cNotAFunctionError) {
    console.log('❌ "c is not a function" error still present');
    console.log('→ Toast library fix did not fully resolve the issue');
  } else if (loadingSpinner > 0) {
    console.log('❌ Page still stuck on loading spinner');
    console.log('→ Page may not be fully rendering');
  } else {
    console.log('❌ Page still fails to render properly');
    console.log('→ Additional issues remain');
  }

  await browser.close();
})();
