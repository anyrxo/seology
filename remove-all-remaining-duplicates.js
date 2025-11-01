const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html' && f !== 'index.html' && f !== 'about.html');

console.log(`\n🔧 Removing remaining duplicate sections from ${files.length} files...\n`);

// Sections to remove (each has start and end patterns)
const sectionsToRemove = [
  {
    name: 'section-about-intro',
    start: '<section class="section-about-intro">',
    allowedFiles: [] // Not allowed on any page except homepage
  },
  {
    name: 'section-about-process',
    start: '<section class="section-about-process">',
    allowedFiles: ['about.html'] // Only allowed on about page
  },
  {
    name: 'section-about-team (except careers/about)',
    start: '<section class="section-about-team">',
    allowedFiles: ['about.html', 'careers.html'] // Only allowed on these pages
  }
];

let totalRemoved = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  sectionsToRemove.forEach(({ name, start, allowedFiles }) => {
    // Skip if this file is in the allowed list
    if (allowedFiles.includes(file)) {
      return;
    }

    let removed = 0;
    let searchFrom = 0;

    // Keep removing until no more occurrences found
    while (true) {
      const startIdx = content.indexOf(start, searchFrom);
      if (startIdx === -1) break;

      // Find the matching closing </section> tag by counting depth
      const sectionEnd = '</section>';
      let depth = 0;
      let endIdx = -1;
      let pos = startIdx + start.length;

      while (pos < content.length) {
        const nextOpen = content.indexOf('<section', pos);
        const nextClose = content.indexOf(sectionEnd, pos);

        if (nextClose === -1) break;

        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          pos = nextOpen + 8;
        } else {
          if (depth === 0) {
            endIdx = nextClose + sectionEnd.length;
            break;
          }
          depth--;
          pos = nextClose + sectionEnd.length;
        }
      }

      if (endIdx === -1) {
        console.log(`  ⚠️  ${file}: Could not find matching closing tag for ${name}`);
        searchFrom = startIdx + start.length;
        continue;
      }

      // Remove the entire section
      const before = content.substring(0, startIdx);
      const after = content.substring(endIdx);
      content = before + '\n' + after;
      removed++;
      modified = true;

      // Continue searching from the same position (content shifted)
      searchFrom = startIdx;
    }

    if (removed > 0) {
      console.log(`  ✓ ${file}: Removed ${removed} x ${name}`);
      totalRemoved += removed;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
  }
});

console.log(`\n✅ Total sections removed: ${totalRemoved}\n`);
