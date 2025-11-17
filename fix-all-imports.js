const fs = require('fs');
const path = require('path');

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
let alreadyHasImport = 0;
let doesntNeedImport = 0;

blogFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    // Check if file already has the import
    if (content.includes("import type { Metadata } from 'next'") ||
        content.includes('import { Metadata } from "next"') ||
        content.includes("import { Metadata } from 'next'")) {
      alreadyHasImport++;
      return;
    }

    // Check if file uses Metadata type
    if (!content.includes('export const metadata: Metadata')) {
      doesntNeedImport++;
      return;
    }

    // Add import at the beginning
    const importStatement = "import type { Metadata } from 'next'\n\n";
    const newContent = importStatement + content;

    fs.writeFileSync(file, newContent, 'utf8');
    const relativePath = path.relative(__dirname, file);
    console.log(`✓ Fixed: ${relativePath}`);
    fixedCount++;
  } catch (error) {
    console.error(`✗ Error in ${file}:`, error.message);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✓ COMPLETE!`);
console.log(`  - Added imports: ${fixedCount} files`);
console.log(`  - Already had import: ${alreadyHasImport} files`);
console.log(`  - Doesn't need import: ${doesntNeedImport} files`);
console.log(`  - Total: ${blogFiles.length} files`);
console.log(`${'='.repeat(60)}\n`);
