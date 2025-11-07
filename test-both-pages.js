// Test BOTH pages to compare behavior
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseUrl = 'https://seology-af7a3z5v4-iimagined.vercel.app';

  console.log('🧪 Testing BOTH Agents pages on latest deployment\n');
  console.log('=' .repeat(60));

  // Test 1: agents-test page (minimal)
  console.log('\n📄 TEST 1: agents-test (minimal page)');
  console.log('URL: ' + baseUrl + '/shopify/agents-test\n');

  let errors1 = [];
  page.on('pageerror', error => errors1.push(`[ERROR]: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors1.push(`[CONSOLE]: ${msg.text()}`);
  });

  await page.goto(baseUrl + '/shopify/agents-test', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await page.waitForTimeout(3000);

  const main1 = await page.locator('main').count();
  const h1_1 = await page.locator('h1').count();

  console.log(`Results: main=${main1}, h1=${h1_1}`);
  console.log(`Errors: ${errors1.length > 0 ? errors1.join('; ') : 'NONE ✅'}`);

  // Test 2: agents page (full page)
  console.log('\n' + '=' .repeat(60));
  console.log('\n📄 TEST 2: agents (full page)');
  console.log('URL: ' + baseUrl + '/shopify/agents\n');

  let errors2 = [];
  page.removeAllListeners();
  page.on('pageerror', error => errors2.push(`[ERROR]: ${error.message}`));
  page.on('console', msg => {
    if (msg.type() === 'error') errors2.push(`[CONSOLE]: ${msg.text()}`);
  });

  await page.goto(baseUrl + '/shopify/agents', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  await page.waitForTimeout(3000);

  const main2 = await page.locator('main').count();
  const h1_2 = await page.locator('h1').count();

  console.log(`Results: main=${main2}, h1=${h1_2}`);
  console.log(`Errors: ${errors2.length > 0 ? errors2.join('; ') : 'NONE ✅'}`);

  // Final verdict
  console.log('\n' + '=' .repeat(60));
  console.log('\n🎯 VERDICT:\n');

  if (main1 > 0 && main2 === 0) {
    console.log('✅ Test page WORKS, full page FAILS');
    console.log('→ Issue is in full page code, NOT in AGENT_TEMPLATES');
  } else if (main1 === 0 && main2 === 0) {
    console.log('❌ BOTH pages fail');
    console.log('→ Issue is in AGENT_TEMPLATES or shared code');
  } else if (main1 > 0 && main2 > 0) {
    console.log('✅✅✅ BOTH pages work! FIX SUCCESSFUL!');
  }

  await browser.close();
})();
