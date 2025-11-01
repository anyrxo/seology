const fs = require('fs');
const path = require('path');

const files = [
  'help.html',
  'security.html',
  'demo.html',
  'docs.html',
  'api.html',
  'privacy.html',
  'terms.html',
  'dpa.html',
  'subprocessors.html',
  'enterprise-guides.html',
  'careers.html'
];

const publicDir = path.join(__dirname, 'public');

files.forEach(file => {
  const filePath = path.join(publicDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Find and remove the section-about-intro block
  const sectionStart = '<section class="section-about-intro">';
  const sectionEnd = '</section>';

  const startIdx = content.indexOf(sectionStart);
  if (startIdx === -1) {
    console.log(`${file}: No section-about-intro found`);
    return;
  }

  // Find the matching closing </section> tag
  // We need to find the corresponding closing tag by counting opening/closing tags
  let depth = 0;
  let endIdx = -1;
  let searchFrom = startIdx + sectionStart.length;

  while (searchFrom < content.length) {
    const nextOpen = content.indexOf('<section', searchFrom);
    const nextClose = content.indexOf(sectionEnd, searchFrom);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      searchFrom = nextOpen + 8;
    } else {
      if (depth === 0) {
        endIdx = nextClose + sectionEnd.length;
        break;
      }
      depth--;
      searchFrom = nextClose + sectionEnd.length;
    }
  }

  if (endIdx === -1) {
    console.log(`${file}: Could not find matching closing section tag`);
    return;
  }

  // Remove the entire section-about-intro block
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);

  const newContent = before + '\n' + after;

  fs.writeFileSync(filePath, newContent);
  console.log(`✓ Fixed ${file}`);
});

console.log('\nAll files processed!');
