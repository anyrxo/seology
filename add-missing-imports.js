const fs = require('fs');
const { execSync } = require('child_process');

// Get list of files missing the import
const output = execSync(
  'find "app/(marketing)/blog" -name "page.tsx" -exec sh -c \'head -1 "$1" | grep -q "import.*Metadata" || (grep -q "export const metadata: Metadata" "$1" && echo "$1")\' _ {} \\;',
  { encoding: 'utf8', cwd: __dirname }
);

const filesToFix = output.trim().split('\n').filter(Boolean);

console.log(`Found ${filesToFix.length} files missing Metadata import\n`);

let fixedCount = 0;

filesToFix.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');

    // Check if file uses Metadata type
    if (content.includes('export const metadata: Metadata')) {
      // Add import at the beginning
      const importStatement = "import type { Metadata } from 'next'\n\n";
      const newContent = importStatement + content;

      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`✓ Fixed: ${file}`);
      fixedCount++;
    }
  } catch (error) {
    console.error(`✗ Error in ${file}:`, error.message);
  }
});

console.log(`\n${'='.repeat(60)}`);
console.log(`✓ COMPLETE! Added imports to ${fixedCount} files.`);
console.log(`${'='.repeat(60)}\n`);
