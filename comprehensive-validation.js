const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log(`\n📋 COMPREHENSIVE VALIDATION REPORT\n`);
console.log(`Checking ${files.length} HTML files for duplicate sections...\n`);
console.log('═══════════════════════════════════════════════════════\n');

const issues = [];

// Patterns to check
const patterns = [
  { name: 'Founded 2025 badges', pattern: /Founded 2025/g, allowedFiles: ['index.html'] },
  { name: 'Remote-First badges', pattern: /Remote-First/g, allowedFiles: ['index.html'] },
  { name: 'Global Team badges', pattern: /Global Team/g, allowedFiles: ['index.html'] },
  { name: 'section-about-intro', pattern: /<section class="section-about-intro">/g, allowedFiles: ['index.html'] },
  { name: 'section-about-process', pattern: /<section class="section-about-process">/g, allowedFiles: ['about.html', 'index.html'] },
  { name: 'section-about-team', pattern: /<section class="section-about-team">/g, allowedFiles: ['careers.html', 'index.html'] },
  { name: 'section.cta', pattern: /<section class="cta">/g, allowedFiles: ['index.html'] },
  { name: 'Creative Minds section', pattern: /Creative.*Minds/g, allowedFiles: ['index.html'] },
  { name: 'Selected Works', pattern: /Selected.*Works/g, allowedFiles: ['index.html'] },
  { name: 'Our Services', pattern: /Our.*Services/g, allowedFiles: ['index.html'] },
  { name: 'How It Works', pattern: /How It.*Works/g, allowedFiles: ['index.html'] }
];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  patterns.forEach(({ name, pattern, allowedFiles }) => {
    const matches = content.match(pattern);

    if (matches && !allowedFiles.includes(file)) {
      issues.push({
        file,
        issue: name,
        count: matches.length
      });
    }
  });
});

if (issues.length === 0) {
  console.log('✅ ALL PAGES ARE CLEAN!\n');
  console.log('No duplicate sections found on any pages.\n');
} else {
  console.log('❌ ISSUES FOUND:\n');

  // Group by file
  const byFile = {};
  issues.forEach(({ file, issue, count }) => {
    if (!byFile[file]) byFile[file] = [];
    byFile[file].push({ issue, count });
  });

  Object.keys(byFile).sort().forEach(file => {
    console.log(`📄 ${file}:`);
    byFile[file].forEach(({ issue, count }) => {
      console.log(`   - ${issue} (${count} occurrence${count > 1 ? 's' : ''})`);
    });
    console.log('');
  });
}

console.log('═══════════════════════════════════════════════════════');
console.log(`\n📊 Summary: ${files.length} files checked, ${issues.length} issues found\n`);
