const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== '.html');

console.log('Restoring animations to all pages...\n');

let pagesUpdated = 0;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Ensure webflow.js and jQuery are loaded (should be before </body>)
  if (!content.includes('js/webflow.js')) {
    const bodyCloseIdx = content.lastIndexOf('</body>');
    if (bodyCloseIdx !== -1) {
      const scriptsToAdd = `  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6903772e8ebfd7be919f1f14" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
`;
      content = content.slice(0, bodyCloseIdx) + scriptsToAdd + content.slice(bodyCloseIdx);
      changed = true;
      console.log(`✓ ${file}: Added webflow.js and jQuery`);
    }
  }

  // 2. Add smooth scroll behavior to all pages
  if (!content.includes('scroll-behavior: smooth')) {
    content = content.replace(
      /<style>/,
      `<style>
html {
  scroll-behavior: smooth;
}
`
    );
    changed = true;
  }

  // 3. Ensure button hover animations work by adding CSS if not present
  if (!content.includes('/* Button animations */')) {
    const additionalCSS = `
  <style>
/* Button animations */
.main-button {
  transition: all 0.3s ease;
}
.main-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
}
.main-button:active {
  transform: translateY(0);
}

/* Link hover animations */
a.w-inline-block {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
a.w-inline-block:hover {
  opacity: 0.8;
}

/* Card hover animations */
.service-card,
.pricing-card,
.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover,
.pricing-card:hover,
.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(255, 255, 255, 0.1);
}

/* Social link animations */
.social-link {
  transition: transform 0.3s ease;
}
.social-link:hover {
  transform: scale(1.1);
}

/* Menu animations */
.menu-button {
  transition: transform 0.2s ease;
}
.menu-button:hover {
  transform: rotate(90deg);
}

/* Image hover animations */
img {
  transition: transform 0.4s ease;
}
.service-image-wrapper:hover img {
  transform: scale(1.05);
}

/* Fade in on scroll animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-on-scroll {
  animation: fadeInUp 0.8s ease forwards;
}
  </style>
`;

    const headCloseIdx = content.indexOf('</head>');
    if (headCloseIdx !== -1) {
      content = content.slice(0, headCloseIdx) + additionalCSS + content.slice(headCloseIdx);
      changed = true;
      console.log(`✓ ${file}: Added animation CSS`);
    }
  }

  // 4. Add scroll reveal script for fade-in animations
  if (!content.includes('IntersectionObserver')) {
    const scrollScript = `
  <script>
    // Scroll reveal animations
    document.addEventListener('DOMContentLoaded', function() {
      const animateElements = document.querySelectorAll('.service-card, .pricing-card, .feature-card, h2, h3');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
      });
    });
  </script>
`;

    const bodyCloseIdx = content.lastIndexOf('</body>');
    if (bodyCloseIdx !== -1) {
      content = content.slice(0, bodyCloseIdx) + scrollScript + content.slice(bodyCloseIdx);
      changed = true;
      console.log(`✓ ${file}: Added scroll reveal script`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    pagesUpdated++;
  }
});

console.log(`\n✅ Animation restoration complete!`);
console.log(`📊 Pages updated: ${pagesUpdated}/${files.length}`);
console.log(`\nAnimations added:`);
console.log(`  • Button hover effects (lift + shadow)`);
console.log(`  • Card hover animations`);
console.log(`  • Link hover opacity`);
console.log(`  • Social icon scale`);
console.log(`  • Menu button rotation`);
console.log(`  • Image zoom on hover`);
console.log(`  • Scroll reveal fade-in`);
console.log(`  • Smooth scroll behavior`);
console.log(`  • Webflow.js integration`);
