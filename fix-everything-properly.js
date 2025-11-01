const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing EVERYTHING properly with jQuery and navigation...\n');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let totalFixes = 0;

// jQuery CDN link (same as original Craflow template)
const jQueryScript = '<script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6903772e8ebfd7be919f1f14" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>';

// Mobile optimization viewport meta (if not present)
const mobileViewport = '<meta content="width=device-width, initial-scale=1" name="viewport">';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fileChanges = 0;

  // 1. ADD JQUERY before webflow.js
  if (!content.includes('jquery')) {
    const webflowScriptPattern = /<script src="js\/webflow\.js"/;
    if (webflowScriptPattern.test(content)) {
      content = content.replace(
        webflowScriptPattern,
        jQueryScript + '\n  <script src="js/webflow.js"'
      );
      fileChanges++;
      console.log(`✅ ${file}: Added jQuery`);
    }
  }

  // 2. FIX NAVIGATION - add Pricing and Enterprise links
  if (file === 'index.html' || file === 'about.html' || file === 'contact.html') {
    // Check if navigation is missing Pricing/Enterprise
    if (content.includes('nav-menu') && !content.includes('href="pricing.html"')) {
      // Find the nav-menu section and add proper navigation
      const navMenuPattern = /<div class="left-nav-menu">([\s\S]*?)<\/div>/;
      const match = content.match(navMenuPattern);

      if (match) {
        const newNavMenu = `<div class="left-nav-menu">
                  <div class="nav-link-overflow">
                    <a href="pricing.html" class="nav-link w-inline-block">
                      <div class="nav-link-block">
                        <div class="nav-text">Pricing</div>
                        <div class="nav-text is-hover">Pricing</div>
                      </div>
                    </a>
                  </div>
                  <div class="nav-link-overflow">
                    <a href="enterprise.html" class="nav-link w-inline-block">
                      <div class="nav-link-block">
                        <div class="nav-text">Enterprise</div>
                        <div class="nav-text is-hover">Enterprise</div>
                      </div>
                    </a>
                  </div>
                  <div class="nav-link-overflow">
                    <a href="about.html" class="nav-link w-inline-block">
                      <div class="nav-link-block">
                        <div class="nav-text">About</div>
                        <div class="nav-text is-hover">About</div>
                      </div>
                    </a>
                  </div>
                </div>`;

        content = content.replace(navMenuPattern, newNavMenu);
        fileChanges++;
        console.log(`✅ ${file}: Fixed navigation menu`);
      }
    }
  }

  // 3. ADD MOBILE OPTIMIZATION CSS
  if (!content.includes('/* Mobile Optimization */')) {
    const mobileCSSInsertion = `
  <style>
  /* Mobile Optimization */
  @media (max-width: 991px) {
    .heading-style-h1 {
      font-size: 48px !important;
      line-height: 1.1 !important;
    }

    .heading-style-h2 {
      font-size: 36px !important;
      line-height: 1.2 !important;
    }

    .text-size-large {
      font-size: 18px !important;
    }

    .padding-section-large {
      padding-top: 60px !important;
      padding-bottom: 60px !important;
    }

    .header-image-wrapper {
      margin-top: 40px;
    }

    /* Stack pricing cards */
    .pricing-grid {
      grid-template-columns: 1fr !important;
      gap: 24px !important;
    }

    /* Mobile navigation */
    .nav-menu {
      width: 100% !important;
    }
  }

  @media (max-width: 767px) {
    .heading-style-h1 {
      font-size: 36px !important;
    }

    .heading-style-h2 {
      font-size: 28px !important;
    }

    /* Touch-friendly buttons */
    .button {
      min-height: 48px !important;
      padding: 14px 28px !important;
    }

    /* Readable text */
    body {
      font-size: 16px !important;
    }

    .text-size-regular {
      font-size: 16px !important;
      line-height: 1.6 !important;
    }

    /* Mobile spacing */
    .padding-global {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
  }

  @media (max-width: 479px) {
    .heading-style-h1 {
      font-size: 32px !important;
    }

    .heading-style-h2 {
      font-size: 24px !important;
    }

    /* Stack everything */
    .w-layout-grid {
      grid-template-columns: 1fr !important;
    }

    /* Full-width images */
    img {
      max-width: 100% !important;
      height: auto !important;
    }
  }
  </style>
</head>`;

    content = content.replace('</head>', mobileCSSInsertion);
    fileChanges++;
    console.log(`✅ ${file}: Added mobile optimization`);
  }

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content);
    totalFixes += fileChanges;
  }
});

console.log(`\n═══════════════════════════════════════`);
console.log(`✨ TOTAL FIXES APPLIED: ${totalFixes}`);
console.log(`═══════════════════════════════════════`);
console.log('\n✅ Fixed:');
console.log('  1. Added jQuery (required for Webflow IX2 animations)');
console.log('  2. Fixed navigation menu (added Pricing + Enterprise links)');
console.log('  3. Added comprehensive mobile optimization CSS');
console.log('\n🎯 NOW animations will work properly with jQuery!');
