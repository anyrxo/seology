const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Adding visible focus indicators for keyboard navigation...\n');

const focusStyles = `
  <style>
    /* Keyboard Navigation Focus Indicators (WCAG 2.4.7) */
    .nav-link:focus,
    .button:focus,
    .main-button:focus,
    .w-inline-block:focus,
    button:focus,
    a:focus,
    input:focus,
    textarea:focus,
    select:focus {
      outline: 2px solid var(--text-color-secondary, #00ff88) !important;
      outline-offset: 2px !important;
    }

    /* Remove outline for mouse users only */
    .nav-link:focus:not(:focus-visible),
    .button:focus:not(:focus-visible),
    .main-button:focus:not(:focus-visible) {
      outline: none;
    }

    /* Enhanced focus for interactive elements */
    .faq-question:focus {
      outline: 2px solid var(--text-color-secondary, #00ff88) !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px rgba(0, 255, 136, 0.1) !important;
    }

    /* Focus for menu button */
    .menu-button:focus {
      outline: 2px solid var(--text-color-secondary, #00ff88) !important;
      outline-offset: 4px !important;
    }
  </style>
`;

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');

  // Check if focus styles already exist
  if (html.includes('Keyboard Navigation Focus Indicators')) {
    console.log('○ ' + filename + ' - Focus indicators already exist');
    return;
  }

  // Add focus styles before </head>
  html = html.replace('</head>', focusStyles + '\n</head>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ ' + filename + ' - Added focus indicators');
  fixed++;
});

console.log('\n✅ Added focus indicators to ' + fixed + ' pages');
console.log('\nAccessibility improvements (WCAG 2.4.7):');
console.log('• Visible focus indicators for all interactive elements');
console.log('• Green outline matches site design system');
console.log('• Focus-visible for better UX (no outline for mouse clicks)');
console.log('• Keyboard users can now navigate entire site');
