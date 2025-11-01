const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let processed = 0;

htmlFiles.forEach(filename => {
  const filepath = path.join(publicDir, filename);
  let html = fs.readFileSync(filepath, 'utf8');

  // Check if footer already has role="contentinfo"
  if (html.includes('role="contentinfo"')) {
    console.log('Already has contentinfo: ' + filename);
    return;
  }

  // Add role="contentinfo" to footer tag
  const footerPattern = /<footer class="footer">/g;
  if (html.match(footerPattern)) {
    html = html.replace(footerPattern, '<footer class="footer" role="contentinfo">');
    fs.writeFileSync(filepath, html, 'utf8');
    processed++;
    console.log('Added role to ' + filename);
  }
});

console.log('\nTotal processed: ' + processed + ' pages');
