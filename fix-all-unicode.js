const fs = require('fs');
const path = require('path');

function fixUnicodeCharacters(content) {
  let fixed = content;

  // Replace smart quotes with regular quotes
  fixed = fixed.replace(/['']/g, "'");
  fixed = fixed.replace(/[""]/g, '"');

  // Replace em dash with double hyphen
  fixed = fixed.replace(/—/g, '--');

  // Replace multiplication sign with 'x'
  fixed = fixed.replace(/×/g, 'x');

  // Replace ellipsis
  fixed = fixed.replace(/…/g, '...');

  // Replace en dash with hyphen
  fixed = fixed.replace(/–/g, '-');

  return fixed;
}

function getAllBlogFiles() {
  const blogDir = path.join(__dirname, 'app', '(marketing)', 'blog');

  function findPageFiles(dir) {
    let results = [];

    try {
      const files = fs.readdirSync(dir);

      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          results = results.concat(findPageFiles(filePath));
        } else if (file === 'page.tsx') {
          results.push(filePath);
        }
      });
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error.message);
    }

    return results;
  }

  return findPageFiles(blogDir);
}

// Process all blog files
console.log('Finding blog files...\n');
const blogFiles = getAllBlogFiles();
console.log(`Found ${blogFiles.length} blog files\n`);

let fixedCount = 0;

blogFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const fixed = fixUnicodeCharacters(content);

    if (content !== fixed) {
      fs.writeFileSync(file, fixed, 'utf8');
      const relativePath = path.relative(__dirname, file);
      console.log(`✓ Fixed: ${relativePath}`);
      fixedCount++;
    }
  } catch (error) {
    console.error(`✗ Error in ${file}:`, error.message);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✓ COMPLETE! Fixed ${fixedCount} files out of ${blogFiles.length}.`);
console.log(`${'='.repeat(60)}\n`);
