#!/usr/bin/env node

/**
 * Craflow Animation Restoration Script v2 - Enhanced
 *
 * This script extracts ALL animations, IX2 interactions, and inline styles
 * from the original Craflow template and applies them to SEOLOGY.AI HTML files.
 *
 * ENHANCEMENTS:
 * - Better regex for extracting frame-image inline styles
 * - Extracts service card accordion animations
 * - Extracts nav menu animations
 * - Adds comprehensive GSAP-style animation layer
 * - Preserves all Webflow IX2 interactions
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  sourceTemplate: 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow\\index.html',
  targetDir: 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public',
  backupDir: 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public\\_animation_backup_v2',

  // Files to update
  targetFiles: [
    'index.html',
    'about.html',
    'pricing.html',
    'contact.html',
    'projects.html',
    'careers.html',
    'blog.html',
    'enterprise.html',
    '404.html',
    'agencies.html',
    'api.html',
    'demo.html',
    'docs.html',
    'dpa.html',
    'ecommerce.html',
    'enterprise-guides.html',
    'help.html',
    'local-business.html',
    'privacy.html',
    'roi-calculator.html',
    'saas.html',
    'security.html',
    'subprocessors.html',
    'terms.html'
  ]
};

/**
 * Extract IX2 animation styles from the source template
 */
function extractIX2Styles(sourceHTML) {
  console.log('📦 Extracting IX2 animation styles...');

  const styleMatch = sourceHTML.match(/<style>([\s\S]*?)<\/style>/);

  if (!styleMatch) {
    console.warn('⚠️  No <style> block found');
    return null;
  }

  const styleContent = styleMatch[1];
  const ix2StyleMatch = styleContent.match(/@media \(min-width:992px\) \{[\s\S]*?\}\}/);

  if (!ix2StyleMatch) {
    console.warn('⚠️  No IX2 animation styles found');
    return null;
  }

  console.log('✅ Extracted IX2 styles');
  return ix2StyleMatch[0];
}

/**
 * Extract header frame image animations
 */
function extractFrameImageAnimations(sourceHTML) {
  console.log('📦 Extracting header frame image animations...');

  const frameAnimations = [];

  // Better regex that handles multiline style attributes
  const regex = /<div\s+style="([^"]+)"\s+class="frame-image\s+([^"]+)"/g;
  let match;

  while ((match = regex.exec(sourceHTML)) !== null) {
    frameAnimations.push({
      class: `frame-image ${match[2]}`,
      style: match[1]
    });
  }

  console.log(`✅ Found ${frameAnimations.length} frame image animations`);

  if (frameAnimations.length > 0) {
    console.log(`   Preview: ${frameAnimations[0].class}`);
  }

  return frameAnimations;
}

/**
 * Extract service card accordion animations
 */
function extractServiceCardAnimations(sourceHTML) {
  console.log('📦 Extracting service card animations...');

  const animations = [];

  // Look for service-description-item with height:0px (accordion closed state)
  const regex = /<div\s+style="height:\s*0px"\s+class="service-description-item">/g;
  const matches = sourceHTML.match(regex);

  if (matches) {
    console.log(`✅ Found ${matches.length} service card accordion states`);
    animations.push({
      type: 'accordion',
      selector: '.service-description-item',
      closedState: 'height: 0px'
    });
  }

  return animations;
}

/**
 * Extract all animation-related CSS classes
 */
function extractAnimationClasses(sourceHTML) {
  console.log('📦 Extracting animation classes...');

  const classes = new Set();

  // Find elements with common animation classes
  const animationPatterns = [
    /w-inline-block/g,
    /w-nav-/g,
    /nav-link-overflow/g,
    /nav-text/g,
    /is-hover/g,
    /link-wrap/g,
    /link-button/g
  ];

  animationPatterns.forEach(pattern => {
    const matches = sourceHTML.match(pattern);
    if (matches) {
      matches.forEach(m => classes.add(m));
    }
  });

  console.log(`✅ Found ${classes.size} animation-related classes`);

  return Array.from(classes);
}

/**
 * Create backup
 */
function createBackup(filePath) {
  const fileName = path.basename(filePath);
  const backupPath = path.join(CONFIG.backupDir, fileName);

  if (!fs.existsSync(CONFIG.backupDir)) {
    fs.mkdirSync(CONFIG.backupDir, { recursive: true });
  }

  fs.copyFileSync(filePath, backupPath);
  console.log(`💾 Backed up: ${fileName}`);
}

/**
 * Apply IX2 styles
 */
function applyIX2Styles(targetHTML, ix2Styles) {
  if (!ix2Styles) return targetHTML;

  const styleMatch = targetHTML.match(/<style>([\s\S]*?)<\/style>/);

  if (!styleMatch) {
    console.warn('⚠️  No <style> block found in target');
    return targetHTML;
  }

  const existingStyles = styleMatch[1];

  // Remove old IX2 styles if present
  const cleanedStyles = existingStyles.replace(/@media \(min-width:992px\) \{html\.w-mod-js[\s\S]*?\}\}/g, '');

  // Add new IX2 styles
  const newStyleBlock = `<style>${cleanedStyles}\n${ix2Styles}</style>`;

  return targetHTML.replace(/<style>[\s\S]*?<\/style>/, newStyleBlock);
}

/**
 * Apply frame image animations
 */
function applyFrameImageAnimations(targetHTML, frameAnimations) {
  if (frameAnimations.length === 0) return targetHTML;

  console.log('🎨 Applying frame image animations...');

  let updatedHTML = targetHTML;
  let appliedCount = 0;

  frameAnimations.forEach((frame) => {
    // Escape special regex characters in class name
    const classPattern = frame.class.replace(/\s+/g, '\\s+').replace(/_/g, '_');

    // Try to find and update the element
    const regex = new RegExp(`(<div\\s+)(class="${classPattern}")([^>]*)(>)`, 'g');

    // Check if element exists in target
    if (regex.test(updatedHTML)) {
      // Reset regex
      const regex2 = new RegExp(`(<div\\s+)(class="${classPattern}")([^>]*)(>)`, 'g');

      updatedHTML = updatedHTML.replace(regex2, (match, p1, p2, p3, p4) => {
        // Only add style if not already present
        if (!match.includes('style=')) {
          appliedCount++;
          return `${p1}style="${frame.style}" ${p2}${p3}${p4}`;
        }
        return match;
      });
    }
  });

  console.log(`  ✓ Applied ${appliedCount} frame image styles`);

  return updatedHTML;
}

/**
 * Add comprehensive animation enhancement script
 */
function addEnhancedAnimationScript(targetHTML) {
  console.log('🎬 Adding enhanced animation script...');

  // Check if already present
  if (targetHTML.includes('// Craflow Animation System v2')) {
    console.log('ℹ️  Enhanced animation script already present');
    return targetHTML;
  }

  const enhancedScript = `
  <!-- Craflow Animation System v2 - Enhanced -->
  <script>
    // Craflow Animation System v2 - Enhanced
    (function() {
      'use strict';

      console.log('🎬 Initializing Craflow Animation System v2...');

      // ========================================
      // 1. HEADER FRAME IMAGES - 3D PARALLAX
      // ========================================
      function initHeaderFrameAnimations() {
        const frameImages = document.querySelectorAll('.frame-image');

        if (frameImages.length === 0) {
          console.log('ℹ️  No frame images found');
          return;
        }

        console.log(\`🖼️  Initializing \${frameImages.length} frame image animations\`);

        // Animate frames on page load
        frameImages.forEach((frame, index) => {
          // Initial state (if not set by inline styles)
          if (!frame.style.transform) {
            frame.style.transform = 'translate3d(0, -200vw, -500vw)';
            frame.style.opacity = '0';
          }

          // Animate to final position
          setTimeout(() => {
            frame.style.transition = 'all 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
            frame.style.transform = 'translate3d(0, 0, 0)';
            frame.style.opacity = '1';
          }, 100 + (index * 100));
        });

        // Parallax scroll effect
        let ticking = false;

        window.addEventListener('scroll', function() {
          if (!ticking) {
            window.requestAnimationFrame(function() {
              const scrolled = window.pageYOffset;

              frameImages.forEach((frame, index) => {
                const speed = 0.15 + (index * 0.05);
                const yPos = scrolled * speed;

                frame.style.transform = \`translate3d(0, \${yPos}px, 0)\`;
              });

              ticking = false;
            });

            ticking = true;
          }
        });

        console.log('✅ Frame image animations initialized');
      }

      // ========================================
      // 2. NAV LINK HOVER ANIMATIONS
      // ========================================
      function initNavLinkAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');

        if (navLinks.length === 0) return;

        console.log(\`🔗 Initializing \${navLinks.length} nav link animations\`);

        navLinks.forEach(link => {
          link.addEventListener('mouseenter', function() {
            const hoverText = this.querySelector('.nav-text.is-hover');
            if (hoverText) {
              hoverText.style.transform = 'translateY(0)';
            }
          });

          link.addEventListener('mouseleave', function() {
            const hoverText = this.querySelector('.nav-text.is-hover');
            if (hoverText) {
              hoverText.style.transform = 'translateY(100%)';
            }
          });
        });

        console.log('✅ Nav link animations initialized');
      }

      // ========================================
      // 3. LINK BUTTON HOVER ANIMATIONS
      // ========================================
      function initLinkButtonAnimations() {
        const linkButtons = document.querySelectorAll('.link-button');

        if (linkButtons.length === 0) return;

        console.log(\`🔗 Initializing \${linkButtons.length} link button animations\`);

        linkButtons.forEach(button => {
          button.addEventListener('mouseenter', function() {
            const hoverText = this.querySelector('.link-button-text.is-hover');
            if (hoverText) {
              hoverText.style.transform = 'translateY(0)';
            }
          });

          button.addEventListener('mouseleave', function() {
            const hoverText = this.querySelector('.link-button-text.is-hover');
            if (hoverText) {
              hoverText.style.transform = 'translateY(100%)';
            }
          });
        });

        console.log('✅ Link button animations initialized');
      }

      // ========================================
      // 4. SERVICE CARD ACCORDION ANIMATIONS
      // ========================================
      function initServiceCardAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');

        if (serviceCards.length === 0) return;

        console.log(\`📋 Initializing \${serviceCards.length} service card animations\`);

        serviceCards.forEach(card => {
          const descriptionItem = card.querySelector('.service-description-item');

          if (!descriptionItem) return;

          // Set initial closed state
          if (!descriptionItem.style.height) {
            descriptionItem.style.height = '0px';
            descriptionItem.style.overflow = 'hidden';
            descriptionItem.style.transition = 'height 0.4s ease';
          }

          card.addEventListener('mouseenter', function() {
            const content = descriptionItem.querySelector('.service-description');
            if (content) {
              const contentHeight = content.scrollHeight;
              descriptionItem.style.height = contentHeight + 'px';
            }
          });

          card.addEventListener('mouseleave', function() {
            descriptionItem.style.height = '0px';
          });
        });

        console.log('✅ Service card animations initialized');
      }

      // ========================================
      // 5. SCROLL REVEAL ANIMATIONS
      // ========================================
      function initScrollRevealAnimations() {
        console.log('👀 Initializing scroll reveal animations...');

        const revealElements = document.querySelectorAll(
          'section, .pricing-card, .feature-card, .testimonial-card, .blog-card, .project-card'
        );

        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -80px 0px'
        });

        let revealCount = 0;

        revealElements.forEach(el => {
          // Skip if already animated
          if (el.style.opacity === '1') return;

          el.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.opacity = '0';
          el.style.transform = 'translateY(40px)';
          observer.observe(el);
          revealCount++;
        });

        console.log(\`✅ Observing \${revealCount} elements for scroll reveal\`);
      }

      // ========================================
      // 6. WEBFLOW IX2 INTEGRATION
      // ========================================
      function initWebflowIX2() {
        if (window.Webflow && window.Webflow.push) {
          window.Webflow.push(function() {
            console.log('✅ Webflow IX2 initialized');
          });
        }
      }

      // ========================================
      // 7. SMOOTH SCROLL FOR ANCHOR LINKS
      // ========================================
      function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });
      }

      // ========================================
      // 8. BACK TO TOP BUTTON
      // ========================================
      function initBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top-link');

        if (backToTopBtn) {
          window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
              backToTopBtn.style.opacity = '1';
              backToTopBtn.style.visibility = 'visible';
            } else {
              backToTopBtn.style.opacity = '0';
              backToTopBtn.style.visibility = 'hidden';
            }
          });
        }
      }

      // ========================================
      // MAIN INITIALIZATION
      // ========================================
      function init() {
        console.log('🚀 Starting animation system initialization...');

        initHeaderFrameAnimations();
        initNavLinkAnimations();
        initLinkButtonAnimations();
        initServiceCardAnimations();
        initScrollRevealAnimations();
        initWebflowIX2();
        initSmoothScroll();
        initBackToTop();

        // Add ready class to body
        document.body.classList.add('craflow-animations-ready');

        console.log('✅ Craflow Animation System v2 fully initialized!');
      }

      // Run on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
    })();
  </script>
`;

  // Insert before closing </body> tag, replacing old script if present
  let updatedHTML = targetHTML.replace(/<!-- Craflow Animation Enhancement -->[\s\S]*?<\/script>/g, '');

  return updatedHTML.replace(/<\/body>/i, `${enhancedScript}\n</body>`);
}

/**
 * Process a single HTML file
 */
function processHTMLFile(filePath, ix2Styles, frameAnimations) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 Processing: ${path.basename(filePath)}`);
  console.log('='.repeat(60));

  try {
    let targetHTML = fs.readFileSync(filePath, 'utf8');

    createBackup(filePath);

    targetHTML = applyIX2Styles(targetHTML, ix2Styles);
    targetHTML = applyFrameImageAnimations(targetHTML, frameAnimations);
    targetHTML = addEnhancedAnimationScript(targetHTML);

    fs.writeFileSync(filePath, targetHTML, 'utf8');

    console.log(`✅ Successfully updated: ${path.basename(filePath)}`);

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('\n');
  console.log('╔═════════════════════════════════════════════════════════╗');
  console.log('║   Craflow Animation Restoration Script v2              ║');
  console.log('║   Enhanced Edition - All Animations & Interactions     ║');
  console.log('╚═════════════════════════════════════════════════════════╝');
  console.log('\n');

  if (!fs.existsSync(CONFIG.sourceTemplate)) {
    console.error(`❌ Source template not found: ${CONFIG.sourceTemplate}`);
    process.exit(1);
  }

  console.log('📖 Reading source Craflow template...');
  const sourceHTML = fs.readFileSync(CONFIG.sourceTemplate, 'utf8');
  console.log(`✅ Loaded source template (${(sourceHTML.length / 1024).toFixed(2)} KB)\n`);

  // Extract all animation data
  const ix2Styles = extractIX2Styles(sourceHTML);
  const frameAnimations = extractFrameImageAnimations(sourceHTML);
  const serviceAnimations = extractServiceCardAnimations(sourceHTML);
  const animationClasses = extractAnimationClasses(sourceHTML);

  console.log('\n📊 Extraction Summary:');
  console.log('─'.repeat(60));
  console.log(`  • IX2 Animation Styles: ${ix2Styles ? 'Found ✓' : 'Not found ✗'}`);
  console.log(`  • Frame Image Animations: ${frameAnimations.length} elements`);
  console.log(`  • Service Card Animations: ${serviceAnimations.length} types`);
  console.log(`  • Animation Classes: ${animationClasses.length} classes`);
  console.log('─'.repeat(60));

  console.log('\n🚀 Processing target files...\n');

  let successCount = 0;
  let errorCount = 0;

  CONFIG.targetFiles.forEach(fileName => {
    const filePath = path.join(CONFIG.targetDir, fileName);

    if (fs.existsSync(filePath)) {
      try {
        processHTMLFile(filePath, ix2Styles, frameAnimations);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to process ${fileName}:`, error.message);
        errorCount++;
      }
    } else {
      console.warn(`⚠️  File not found, skipping: ${fileName}`);
    }
  });

  console.log('\n');
  console.log('╔═════════════════════════════════════════════════════════╗');
  console.log('║                   Completion Summary                    ║');
  console.log('╚═════════════════════════════════════════════════════════╝');
  console.log(`✅ Successfully processed: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
  }
  console.log(`💾 Backups saved to: ${CONFIG.backupDir}`);
  console.log('\n🎉 Enhanced animation restoration complete!');
  console.log('📝 Open your site in a browser and check the console for animation logs.');
  console.log('🔄 If needed, restore from backup folder.\n');
}

// Run the script
try {
  main();
} catch (error) {
  console.error('\n❌ Fatal error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
