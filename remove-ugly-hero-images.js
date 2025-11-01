const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Removing unnecessary hero-images-wrapper sections from pages...\n');

const htmlFiles = glob.sync('public/*.html');

// Pages where hero-images should remain (about page only)
const keepHeroImages = ['about.html'];

let removed = 0;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);

  // Skip if this page should keep hero images
  if (keepHeroImages.includes(filename)) {
    console.log('○ ' + filename + ' - keeping hero images (about page)');
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Find and remove hero-images-wrapper section
  const heroStart = html.indexOf('<div data-w-id="8f5ffd96-e06f-19d5-6d6c-213e3948b609" class="hero-images-wrapper">');

  if (heroStart !== -1) {
    // Find the closing </div> for hero-images-wrapper
    // The structure is: hero-images-wrapper > hero-image-grid > hero-image-block > front-image
    // We need to find the end of the entire hero-images-wrapper section
    let depth = 0;
    let pos = heroStart;
    let foundStart = false;

    while (pos < html.length) {
      if (html.substring(pos, pos + 5) === '<div ') {
        depth++;
        foundStart = true;
      } else if (html.substring(pos, pos + 6) === '</div>') {
        depth--;
        if (foundStart && depth === 0) {
          // Found the closing tag
          const heroEnd = pos + 6;
          html = html.substring(0, heroStart) + html.substring(heroEnd);
          modified = true;
          console.log('✓ ' + filename + ' - removed hero-images-wrapper');
          removed++;
          break;
        }
      }
      pos++;
    }

    if (!modified) {
      console.log('✗ ' + filename + ' - could not find end of hero-images-wrapper');
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
});

console.log('\n✅ Removed hero-images-wrapper from ' + removed + ' pages');
console.log('\nThese team member image sections only belong on the About page!');
