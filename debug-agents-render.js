// Debug what's actually rendering on Agents page
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('🔍 Debugging Agents page rendering...\n');

  // Capture console logs
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type()}]:`, msg.text());
  });

  // Capture errors
  page.on('pageerror', error => {
    console.log('[PAGE ERROR]:', error.message);
  });

  // Navigate to Agents page
  await page.goto('https://seology-bt7m52cmp-iimagined.vercel.app/shopify/agents', {
    waitUntil: 'networkidle',
    timeout: 30000
  });

  // Wait for any React rendering
  await page.waitForTimeout(5000);

  // Get the page HTML
  const html = await page.content();

  // Check for specific markers
  console.log('\n📄 HTML Content Analysis:');
  console.log(`  - Total HTML length: ${html.length} characters`);
  console.log(`  - Contains "Agents": ${html.includes('Agents')}`);
  console.log(`  - Contains "SEO": ${html.includes('SEO')}`);
  console.log(`  - Contains "404": ${html.includes('404')}`);
  console.log(`  - Contains "error": ${html.toLowerCase().includes('error')}`);
  console.log(`  - Contains "loading": ${html.toLowerCase().includes('loading')}`);

  // Get body content
  const bodyText = await page.locator('body').textContent();
  console.log(`\n📝 Visible body text (first 500 chars):\n${bodyText.substring(0, 500)}\n`);

  // Check for root element
  const rootDiv = await page.locator('#__next').count();
  const rootContent = rootDiv > 0 ? await page.locator('#__next').textContent() : '';
  console.log(`\n🌳 Next.js root (#__next):`);
  console.log(`  - Exists: ${rootDiv > 0}`);
  console.log(`  - Content length: ${rootContent.length} characters`);
  console.log(`  - First 300 chars: ${rootContent.substring(0, 300)}\n`);

  // Check navigation
  const clerkLoaded = await page.evaluate(() => {
    return typeof window !== 'undefined' && window.Clerk !== undefined;
  });
  console.log(`\n🔐 Clerk loaded: ${clerkLoaded}`);

  // Check if redirected
  const finalUrl = page.url();
  console.log(`\n🔗 Final URL: ${finalUrl}`);
  console.log(`   Redirected: ${finalUrl !== 'https://seology-bt7m52cmp-iimagined.vercel.app/shopify/agents'}`);

  await browser.close();
})();
