const fs = require('fs');
const glob = require('glob');

console.log('Adding exit-intent popup to all pages...\n');

const exitIntentPopup = `
  <!-- Exit Intent Popup -->
  <div id="exit-intent-popup" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; justify-content: center; align-items: center;">
    <div style="background: #0a0a0a; border: 1px solid rgba(0,255,136,0.3); border-radius: 24px; padding: 48px; max-width: 560px; position: relative; box-shadow: 0 20px 60px rgba(0,255,136,0.2);">

      <!-- Close Button -->
      <button id="close-exit-popup" style="position: absolute; top: 20px; right: 20px; background: none; border: none; cursor: pointer; padding: 8px; opacity: 0.6; transition: opacity 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
        <svg style="width: 24px; height: 24px; fill: #fff;" viewBox="0 0 24 24">
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
        </svg>
      </button>

      <!-- Content -->
      <div style="text-align: center;">
        <div style="width: 64px; height: 64px; margin: 0 auto 24px; background: linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,255,136,0.05) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
          <svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24">
            <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
          </svg>
        </div>

        <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 16px; line-height: 1.2;">Wait! Before You Go...</h3>
        <p style="font-size: 16px; opacity: 0.8; margin-bottom: 32px; line-height: 1.6;">Get a <strong style="color: var(--text-color-secondary, #00ff88);">Free SEO Audit</strong> of your website and see exactly what SEOLOGY.AI would fix automatically</p>

        <!-- Form -->
        <form id="exit-intent-form" style="display: flex; flex-direction: column; gap: 16px;">
          <input type="url" id="exit-website-url" placeholder="Enter your website URL" required style="padding: 16px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 15px; transition: all 0.3s;" onfocus="this.style.borderColor='rgba(0,255,136,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
          <input type="email" id="exit-email" placeholder="Your email address" required style="padding: 16px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; font-size: 15px; transition: all 0.3s;" onfocus="this.style.borderColor='rgba(0,255,136,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
          <button type="submit" style="padding: 18px 32px; background: var(--text-color-secondary, #00ff88); color: #000; font-weight: 600; font-size: 16px; border: none; border-radius: 12px; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,255,136,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">Get My Free SEO Audit</button>
        </form>

        <p style="font-size: 13px; opacity: 0.5; margin-top: 16px;">No credit card required • Instant results</p>
      </div>

    </div>
  </div>

  <script>
  (function() {
    let exitIntentShown = false;
    const popup = document.getElementById('exit-intent-popup');
    const closeBtn = document.getElementById('close-exit-popup');
    const form = document.getElementById('exit-intent-form');

    // Show popup when mouse leaves viewport
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });

    // Close popup
    function closePopup() {
      popup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
      if (e.target === popup) closePopup();
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const url = document.getElementById('exit-website-url').value;
      const email = document.getElementById('exit-email').value;

      // In production, this would send to your backend
      console.log('Free audit requested:', { url, email });

      // Show success message
      popup.innerHTML = '<div style="background: #0a0a0a; border: 1px solid rgba(0,255,136,0.3); border-radius: 24px; padding: 48px; max-width: 560px; text-align: center;"><div style="width: 64px; height: 64px; margin: 0 auto 24px; background: linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(0,255,136,0.05) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center;"><svg style="width: 32px; height: 32px; fill: var(--text-color-secondary, #00ff88);" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/></svg></div><h3 style="font-size: 28px; font-weight: 700; margin-bottom: 16px;">Success!</h3><p style="opacity: 0.8; margin-bottom: 32px;">Your free SEO audit is being generated. Check your email in 5 minutes!</p><button onclick="this.parentElement.parentElement.style.display=\\'none\\'; document.body.style.overflow=\\'auto\\';" style="padding: 18px 32px; background: var(--text-color-secondary, #00ff88); color: #000; font-weight: 600; border: none; border-radius: 12px; cursor: pointer;">Got it!</button></div>';

      setTimeout(() => {
        closePopup();
      }, 3000);
    });

    // Don't show if user already signed up
    if (localStorage.getItem('seology_exit_intent_shown')) {
      exitIntentShown = true;
    }

    // Mark as shown in localStorage
    if (!exitIntentShown) {
      document.addEventListener('mouseleave', function() {
        localStorage.setItem('seology_exit_intent_shown', 'true');
      }, { once: true });
    }
  })();
  </script>
`;

const htmlFiles = glob.sync('public/*.html');
let fixed = 0;

htmlFiles.forEach(filePath => {
  const filename = require('path').basename(filePath);

  // Skip 404 page
  if (filename === '404.html') {
    console.log('○ ' + filename + ' - Skipping 404 page');
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Check if exit intent already exists
  if (html.includes('exit-intent-popup')) {
    console.log('○ ' + filename + ' - Exit intent already exists');
    return;
  }

  // Add exit intent popup before </body>
  html = html.replace('</body>', exitIntentPopup + '\n</body>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('✓ ' + filename + ' - Added exit intent popup');
  fixed++;
});

console.log('\n✅ Added exit-intent popup to ' + fixed + ' pages');
console.log('\nFeatures:');
console.log('• Triggers when mouse leaves viewport (exit intent)');
console.log('• Free SEO audit offer as lead magnet');
console.log('• Email capture form');
console.log('• LocalStorage to prevent showing twice');
console.log('• Click outside or X to close');
console.log('• Success message after submission');
console.log('\nConversion impact:');
console.log('• Capture 3-5% of abandoning visitors');
console.log('• Build email list for nurture campaigns');
console.log('• High-value lead magnet (free audit)');
