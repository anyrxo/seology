const fs = require('fs');
const path = require('path');

const scrollToTopHTML = `
  <!-- Scroll to Top Button -->
  <button id="scroll-to-top"
    style="position: fixed; bottom: 24px; right: 24px; width: 48px; height: 48px; border-radius: 50%; background: var(--text-color-secondary, #00ff88); color: #000; border: none; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 1000; box-shadow: 0 4px 12px rgba(0,255,136,0.3);"
    onclick="window.scrollTo({top: 0, behavior: 'smooth'});"
    aria-label="Scroll to top">
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="display: block; margin: 0 auto;">
      <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"/>
    </svg>
  </button>

  <script>
    window.addEventListener('scroll', function() {
      var btn = document.getElementById('scroll-to-top');
      if (window.scrollY > 500) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
      } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
      }
    });
  </script>`;

const publicDir = path.join(__dirname, 'public');
const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

let processed = 0;

htmlFiles.forEach(filename => {
  const filepath = path.join(publicDir, filename);
  let html = fs.readFileSync(filepath, 'utf8');

  // Skip if already has scroll-to-top
  if (html.includes('id="scroll-to-top"')) {
    console.log('Already has scroll-to-top: ' + filename);
    return;
  }

  // Add before closing </body> tag
  const bodyClosePos = html.lastIndexOf('</body>');
  if (bodyClosePos !== -1) {
    html = html.substring(0, bodyClosePos) + scrollToTopHTML + '\n' + html.substring(bodyClosePos);
    fs.writeFileSync(filepath, html, 'utf8');
    processed++;
    console.log('Added scroll-to-top to ' + filename);
  }
});

console.log('\nTotal processed: ' + processed + ' pages');
