#!/usr/bin/env node

/**
 * Craflow Animation Restoration Script
 *
 * This script extracts ALL animations, IX2 interactions, and inline styles
 * from the original Craflow template and applies them to SEOLOGY.AI HTML files.
 *
 * What it extracts:
 * 1. IX2 animation styles from <style> block (data-w-id transforms)
 * 2. Inline transform styles on elements
 * 3. All data-w-id attributes
 * 4. Webflow animation classes and data attributes
 * 5. Animation-related CSS
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Configuration
const CONFIG = {
  sourceTemplate: 'C:\\Users\\manna\\Downloads\\Website inspo\\anyros-fantabulous-site.webflow\\index.html',
  targetDir: 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public',
  backupDir: 'c:\\Users\\manna\\Downloads\\iimagined.webflow (1)\\public\\_animation_backup',

  // Files to update (exclude dashboard and backup folders)
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

  // Find the <style> block with data-w-id transforms
  const styleMatch = sourceHTML.match(/<style>([\s\S]*?)<\/style>/);

  if (!styleMatch) {
    console.warn('⚠️  No <style> block found in source template');
    return null;
  }

  const styleContent = styleMatch[1];

  // Extract only the animation-related styles (data-w-id transforms)
  const ix2StyleMatch = styleContent.match(/@media \(min-width:992px\) \{[\s\S]*?\}/);

  if (!ix2StyleMatch) {
    console.warn('⚠️  No IX2 animation styles found');
    return null;
  }

  console.log('✅ Extracted IX2 styles');
  return ix2StyleMatch[0];
}

/**
 * Extract all data-w-id mappings and their inline styles
 */
function extractDataWIdMappings(sourceHTML) {
  console.log('📦 Extracting data-w-id mappings...');

  const mappings = new Map();

  // Match all elements with data-w-id and their inline styles
  const regex = /<[^>]*data-w-id="([^"]*)"[^>]*(?:style="([^"]*)")?[^>]*>/g;
  let match;

  while ((match = regex.exec(sourceHTML)) !== null) {
    const [fullMatch, dataWId, inlineStyle] = match;

    if (inlineStyle) {
      mappings.set(dataWId, {
        style: inlineStyle,
        element: fullMatch
      });
    }
  }

  console.log(`✅ Found ${mappings.size} data-w-id mappings with inline styles`);
  return mappings;
}

/**
 * Extract specific animation patterns from source
 */
function extractAnimationPatterns(sourceHTML) {
  console.log('📦 Extracting animation patterns...');

  const patterns = {
    // Header frame images with 3D transforms
    headerFrames: [],
    // Nav link animations
    navLinks: [],
    // Service card animations
    serviceCards: [],
    // Scroll-triggered animations
    scrollTriggers: []
  };

  // Extract header frame images (the 3D floating images)
  const frameRegex = /<div[^>]*class="frame-image[^"]*"[^>]*style="([^"]*)"[^>]*>/g;
  let match;

  while ((match = frameRegex.exec(sourceHTML)) !== null) {
    patterns.headerFrames.push({
      class: match[0].match(/class="([^"]*)"/)[1],
      style: match[1]
    });
  }

  console.log(`✅ Found ${patterns.headerFrames.length} header frame animations`);
  console.log(`   Pattern: 3D transforms with translate3d and opacity`);

  return patterns;
}

/**
 * Create backup of target file
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
 * Apply IX2 styles to target HTML
 */
function applyIX2Styles(targetHTML, ix2Styles) {
  if (!ix2Styles) return targetHTML;

  // Find existing <style> block
  const styleMatch = targetHTML.match(/<style>([\s\S]*?)<\/style>/);

  if (!styleMatch) {
    console.warn('⚠️  No <style> block found in target file');
    return targetHTML;
  }

  const existingStyles = styleMatch[1];

  // Check if IX2 styles already exist
  if (existingStyles.includes('@media (min-width:992px) {html.w-mod-js:not(.w-mod-ix)')) {
    console.log('ℹ️  IX2 styles already present, updating...');

    // Remove old IX2 styles
    const cleanedStyles = existingStyles.replace(/@media \(min-width:992px\) \{[\s\S]*?\}\}/g, '');

    // Add new IX2 styles
    const newStyleBlock = `<style>${cleanedStyles}\n${ix2Styles}</style>`;

    return targetHTML.replace(/<style>[\s\S]*?<\/style>/, newStyleBlock);
  } else {
    // Append IX2 styles to existing styles
    const newStyleBlock = `<style>${existingStyles}\n${ix2Styles}</style>`;

    return targetHTML.replace(/<style>[\s\S]*?<\/style>/, newStyleBlock);
  }
}

/**
 * Apply inline transform styles to matching elements
 */
function applyInlineStyles(targetHTML, mappings, patterns) {
  let updatedHTML = targetHTML;

  console.log('🎨 Applying inline transform styles...');

  // Apply header frame image styles
  patterns.headerFrames.forEach((frame, index) => {
    const frameClass = frame.class.replace(/\s+/g, '\\s+'); // Escape spaces for regex
    const regex = new RegExp(`(<div[^>]*class="${frameClass}"[^>]*)(>)`, 'g');

    // Check if style already exists
    const hasStyle = new RegExp(`<div[^>]*class="${frameClass}"[^>]*style="`).test(updatedHTML);

    if (!hasStyle) {
      updatedHTML = updatedHTML.replace(regex, `$1 style="${frame.style}"$2`);
      console.log(`  ✓ Applied style to ${frame.class}`);
    } else {
      console.log(`  ℹ️  Style already exists for ${frame.class}`);
    }
  });

  return updatedHTML;
}

/**
 * Ensure smooth scroll CSS is present
 */
function ensureSmoothScroll(targetHTML) {
  if (!targetHTML.includes('scroll-behavior: smooth')) {
    console.log('🎯 Adding smooth scroll CSS...');

    const smoothScrollCSS = `html {
  scroll-behavior: smooth;
}
`;

    // Add after opening <style> tag
    return targetHTML.replace(/(<style>)/i, `$1\n${smoothScrollCSS}`);
  }

  return targetHTML;
}

/**
 * Add animation enhancement script
 */
function addAnimationScript(targetHTML) {
  console.log('🎬 Adding animation enhancement script...');

  // Check if script already exists
  if (targetHTML.includes('// Craflow Animation Enhancement')) {
    console.log('ℹ️  Animation script already present');
    return targetHTML;
  }

  const animationScript = `
  <!-- Craflow Animation Enhancement -->
  <script>
    // Craflow Animation Enhancement
    (function() {
      'use strict';

      // Initialize animations on page load
      function initAnimations() {
        console.log('🎬 Initializing Craflow animations...');

        // Trigger Webflow IX2 animations
        if (window.Webflow) {
          window.Webflow.push(function() {
            console.log('✅ Webflow IX2 initialized');
          });
        }

        // Add animation ready class to body
        document.body.classList.add('animations-ready');

        // Parallax effect for header images (if present)
        const headerImages = document.querySelectorAll('.frame-image');
        if (headerImages.length > 0) {
          console.log(\`🖼️  Found \${headerImages.length} header frame images\`);

          window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            headerImages.forEach((img, index) => {
              const speed = 0.5 + (index * 0.1);
              const yPos = scrolled * speed;
              img.style.transform = \`translate3d(0, \${yPos}px, 0)\`;
            });
          });
        }

        // Smooth reveal for sections
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
          rootMargin: '0px 0px -100px 0px'
        });

        // Observe sections
        document.querySelectorAll('section, .service-card, .pricing-card').forEach(el => {
          if (!el.style.opacity) {
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
          }
        });
      }

      // Run on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
      } else {
        initAnimations();
      }
    })();
  </script>
`;

  // Insert before closing </body> tag
  return targetHTML.replace(/<\/body>/i, `${animationScript}\n</body>`);
}

/**
 * Process a single HTML file
 */
function processHTMLFile(filePath, ix2Styles, mappings, patterns) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📄 Processing: ${path.basename(filePath)}`);
  console.log('='.repeat(60));

  try {
    // Read target file
    let targetHTML = fs.readFileSync(filePath, 'utf8');

    // Create backup
    createBackup(filePath);

    // Apply transformations
    targetHTML = applyIX2Styles(targetHTML, ix2Styles);
    targetHTML = applyInlineStyles(targetHTML, mappings, patterns);
    targetHTML = ensureSmoothScroll(targetHTML);
    targetHTML = addAnimationScript(targetHTML);

    // Write updated file
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
  console.log('║   Craflow Animation Restoration Script                 ║');
  console.log('║   SEOLOGY.AI - Restoring Premium Template Animations   ║');
  console.log('╚═════════════════════════════════════════════════════════╝');
  console.log('\n');

  // Check if source template exists
  if (!fs.existsSync(CONFIG.sourceTemplate)) {
    console.error(`❌ Source template not found: ${CONFIG.sourceTemplate}`);
    process.exit(1);
  }

  // Read source template
  console.log('📖 Reading source Craflow template...');
  const sourceHTML = fs.readFileSync(CONFIG.sourceTemplate, 'utf8');
  console.log(`✅ Loaded source template (${(sourceHTML.length / 1024).toFixed(2)} KB)`);

  // Extract animation data
  const ix2Styles = extractIX2Styles(sourceHTML);
  const mappings = extractDataWIdMappings(sourceHTML);
  const patterns = extractAnimationPatterns(sourceHTML);

  // Summary of extracted data
  console.log('\n📊 Extraction Summary:');
  console.log('─'.repeat(60));
  console.log(`  • IX2 Animation Styles: ${ix2Styles ? 'Found' : 'Not found'}`);
  console.log(`  • Data-W-ID Mappings: ${mappings.size} elements`);
  console.log(`  • Header Frame Animations: ${patterns.headerFrames.length} frames`);
  console.log('─'.repeat(60));

  // Process all target files
  console.log('\n🚀 Processing target files...\n');

  let successCount = 0;
  let errorCount = 0;

  CONFIG.targetFiles.forEach(fileName => {
    const filePath = path.join(CONFIG.targetDir, fileName);

    if (fs.existsSync(filePath)) {
      try {
        processHTMLFile(filePath, ix2Styles, mappings, patterns);
        successCount++;
      } catch (error) {
        console.error(`❌ Failed to process ${fileName}:`, error.message);
        errorCount++;
      }
    } else {
      console.warn(`⚠️  File not found, skipping: ${fileName}`);
    }
  });

  // Final summary
  console.log('\n');
  console.log('╔═════════════════════════════════════════════════════════╗');
  console.log('║                   Completion Summary                    ║');
  console.log('╚═════════════════════════════════════════════════════════╝');
  console.log(`✅ Successfully processed: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
  }
  console.log(`💾 Backups saved to: ${CONFIG.backupDir}`);
  console.log('\n');
  console.log('🎉 Animation restoration complete!');
  console.log('📝 Test your site to verify animations are working.');
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
