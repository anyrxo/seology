const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
// Remove from all pages EXCEPT homepage and index
const filesToFix = [
  'saas.html', 'ecommerce.html', 'agencies.html', 'local-business.html',
  'about.html', 'enterprise.html', 'api.html', 'demo.html', 'docs.html',
  'help.html', 'security.html', 'privacy.html', 'terms.html', 'dpa.html',
  'subprocessors.html', 'careers.html', 'blog.html', 'projects.html',
  'contact.html', 'pricing.html', 'enterprise-guides.html', '404.html',
  'roi-calculator.html'
];

console.log(`\n🧹 Removing massive "SEOLOGY.AI©" header sections...\n`);

let totalRemoved = 0;

filesToFix.forEach(file => {
  const filePath = path.join(publicDir, file);

  if (!fs.existsSync(filePath)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find the entire section-about-header section
  const headerStart = '<header class="section-about-header">';
  const headerEnd = '</header>';

  const startIdx = content.indexOf(headerStart);
  if (startIdx === -1) {
    return;
  }

  // Find the matching closing tag
  let searchPos = startIdx + headerStart.length;
  let depth = 0;
  let endIdx = -1;

  while (searchPos < content.length) {
    const nextHeaderOpen = content.indexOf('<header', searchPos);
    const nextHeaderClose = content.indexOf(headerEnd, searchPos);

    if (nextHeaderClose === -1) break;

    if (nextHeaderOpen !== -1 && nextHeaderOpen < nextHeaderClose) {
      depth++;
      searchPos = nextHeaderOpen + 7;
    } else {
      if (depth === 0) {
        endIdx = nextHeaderClose + headerEnd.length;
        break;
      }
      depth--;
      searchPos = nextHeaderClose + headerEnd.length;
    }
  }

  if (endIdx === -1) {
    console.log(`  ⚠️  ${file}: Could not find closing header tag`);
    return;
  }

  // Remove the entire header section
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);

  // Clean up extra blank lines
  content = before + '\n' + after;

  fs.writeFileSync(filePath, content);
  console.log(`✓ ${file}: Removed massive header section`);
  totalRemoved++;
});

console.log(`\n✅ Removed massive header sections from ${totalRemoved} files\n`);
