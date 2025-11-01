const fs = require('fs');
const path = require('path');
const glob = require('glob');

const publicDir = path.join(__dirname, 'public');

// Get all HTML files except about.html (where team section should stay)
const files = fs.readdirSync(publicDir)
  .filter(f => f.endsWith('.html') && f !== 'about.html' && f !== '.html');

console.log(`Processing ${files.length} files...`);

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find and remove the section-about-team block
  const sectionStart = '<section class="section-about-team">';
  const sectionEnd = '</section>';

  const startIdx = content.indexOf(sectionStart);
  if (startIdx === -1) {
    console.log(`${file}: No team section found - skipping`);
    return;
  }

  // Find the matching closing </section> tag
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

  // Remove the entire section-about-team block
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);

  const newContent = before + '\n' + after;

  fs.writeFileSync(filePath, newContent);
  console.log(`✓ Removed team section from ${file}`);
});

console.log('\nAll files processed!');
