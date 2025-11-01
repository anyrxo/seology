const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Adding About link to navigation on all pages...\n');

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

// The About nav link HTML to insert
const aboutNavLink = `                  <div class="nav-link-overflow">
                    <a href="about.html" class="nav-link w-inline-block">
                      <div class="nav-link-block">
                        <div class="nav-text">About</div>
                        <div class="nav-text is-hover">About</div>
                      </div>
                    </a>
                  </div>
`;

htmlFiles.forEach(filePath => {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if About link already exists in navigation
  if (html.includes('>About</div>') && html.includes('about.html')) {
    console.log('○ ' + filename + ' - About link already exists');
    return;
  }

  // Find the Enterprise nav link section and add About after it
  // Pattern: Enterprise link closing </div></div> followed by Careers link
  const insertPattern = /<\/div>\s*<\/a>\s*<\/div>\s*<\/div>\s*<div class="right-nav-menu">/;

  if (html.match(insertPattern)) {
    html = html.replace(
      insertPattern,
      '</div>\n                    </a>\n                  </div>\n' + aboutNavLink + '                </div>\n                <div class="right-nav-menu">'
    );
    modified = true;
    console.log('✓ ' + filename + ' - Added About link to navigation');
    fixed++;
  } else {
    console.log('✗ ' + filename + ' - Could not find navigation pattern');
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
});

console.log('\n✅ Added About link to ' + fixed + ' pages');
console.log('\nNavigation order: Pricing > Enterprise > About | Careers > Blog');
