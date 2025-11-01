const fs = require('fs');
const glob = require('glob');

console.log('Adding sitemap reference to all HTML pages...\n');

const sitemapLink = '  <link rel="sitemap" type="application/xml" href="/sitemap.xml">\n';

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

htmlFiles.forEach(filePath => {
  const filename = require('path').basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');

  // Check if sitemap link already exists
  if (html.includes('rel="sitemap"')) {
    console.log('○ ' + filename + ' - Sitemap reference already exists');
    return;
  }

  // Add sitemap link before </head>
  html = html.replace('</head>', sitemapLink + '</head>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ ' + filename + ' - Added sitemap reference');
  fixed++;
});

console.log('\n✅ Added sitemap reference to ' + fixed + ' pages');
console.log('\nSEO benefits:');
console.log('• Search engines can discover all pages');
console.log('• Better indexing and crawling');
console.log('• Priority and change frequency signals to Google');
