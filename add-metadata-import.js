const fs = require('fs');
const path = require('path');

function addMetadataImport(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if file already has the import
  if (content.includes('import') && content.includes('Metadata')) {
    return false; // Already has import
  }

  // Check if file uses Metadata type
  if (!content.includes('export const metadata: Metadata')) {
    return false; // Doesn't use Metadata
  }

  // Add import at the beginning
  const importStatement = "import type { Metadata } from 'next'\n\n";
  content = importStatement + content;

  fs.writeFileSync(filePath, content, 'utf8');
  return true;
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
    if (addMetadataImport(file)) {
      const relativePath = path.relative(__dirname, file);
      console.log(`✓ Added import: ${relativePath}`);
      fixedCount++;
    }
  } catch (error) {
    console.error(`✗ Error in ${file}:`, error.message);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✓ COMPLETE! Added imports to ${fixedCount} files out of ${blogFiles.length}.`);
console.log(`${'='.repeat(60)}\n`);
