/**
 * SEOLOGY.AI Magic.js
 * Universal SEO Fix Connector for Custom Websites
 *
 * Installation:
 * Add this snippet before closing </body> tag:
 * <script src="https://app.seology.ai/magic.js" data-site-id="YOUR_SITE_ID"></script>
 */

(function() {
  'use strict';

  // Configuration
  const SCRIPT_TAG = document.currentScript;
  const SITE_ID = SCRIPT_TAG?.getAttribute('data-site-id');
  const API_BASE = SCRIPT_TAG?.getAttribute('data-api-base') || 'https://app.seology.ai';
  const CHECK_INTERVAL = parseInt(SCRIPT_TAG?.getAttribute('data-interval') || '60000', 10); // 1 minute default
  const DEBUG = SCRIPT_TAG?.getAttribute('data-debug') === 'true';

  // Logging utility
  function log(...args) {
    if (DEBUG) {
      console.log('[SEOLOGY.AI]', ...args);
    }
  }

  // Error logging
  function logError(...args) {
    console.error('[SEOLOGY.AI]', ...args);
  }

  /**
   * Sanitize HTML to prevent XSS attacks
   * Removes dangerous tags and attributes
   */
  function sanitizeHTML(html) {
    const div = document.createElement('div');
    div.textContent = html; // First escape all HTML

    // Define allowed tags and attributes
    const allowedTags = ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'a', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'];
    const allowedAttributes = {
      'a': ['href', 'title', 'target', 'rel'],
      'span': ['class'],
      'div': ['class'],
    };

    // Parse the escaped HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(div.innerHTML, 'text/html');

    // Remove disallowed tags
    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();

      // Remove disallowed tags
      if (!allowedTags.includes(tagName)) {
        el.remove();
        return;
      }

      // Remove disallowed attributes
      const attrs = Array.from(el.attributes);
      attrs.forEach(attr => {
        const allowed = allowedAttributes[tagName] || [];
        if (!allowed.includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });

      // Sanitize href attributes to prevent javascript: URLs
      if (tagName === 'a') {
        const href = el.getAttribute('href');
        if (href && (href.startsWith('javascript:') || href.startsWith('data:'))) {
          el.removeAttribute('href');
        }
      }
    });

    return doc.body.innerHTML;
  }

  // Validate configuration
  if (!SITE_ID) {
    logError('Missing data-site-id attribute. Please add your site ID to the script tag.');
    return;
  }

  log('Initialized for site:', SITE_ID);

  /**
   * Fetch pending fixes from SEOLOGY.AI API
   */
  async function fetchPendingFixes() {
    try {
      const response = await fetch(`${API_BASE}/api/magic/${SITE_ID}/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      return data.fixes || [];
    } catch (error) {
      logError('Failed to fetch fixes:', error);
      return [];
    }
  }

  /**
   * Apply a fix to the page
   */
  function applyFix(fix) {
    try {
      log('Applying fix:', fix.type, 'for', fix.selector);

      switch (fix.type) {
        case 'meta_title':
          applyMetaTitle(fix);
          break;
        case 'meta_description':
          applyMetaDescription(fix);
          break;
        case 'alt_text':
          applyAltText(fix);
          break;
        case 'heading':
          applyHeading(fix);
          break;
        case 'link_fix':
          applyLinkFix(fix);
          break;
        case 'content':
          applyContent(fix);
          break;
        default:
          log('Unknown fix type:', fix.type);
      }

      return true;
    } catch (error) {
      logError('Failed to apply fix:', error);
      return false;
    }
  }

  /**
   * Sanitize text content (remove HTML tags, keep only text)
   */
  function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.textContent || '';
  }

  /**
   * Validate and sanitize URL
   */
  function sanitizeURL(url) {
    try {
      const parsed = new URL(url, window.location.href);
      // Only allow http, https, and relative URLs
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
        return parsed.href;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Apply meta title fix
   */
  function applyMetaTitle(fix) {
    let titleTag = document.querySelector('title');

    if (!titleTag) {
      titleTag = document.createElement('title');
      document.head.appendChild(titleTag);
    }

    // Sanitize to text-only (no HTML in title)
    titleTag.textContent = sanitizeText(fix.value);
    log('Updated meta title to:', fix.value);
  }

  /**
   * Apply meta description fix
   */
  function applyMetaDescription(fix) {
    let metaTag = document.querySelector('meta[name="description"]');

    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      document.head.appendChild(metaTag);
    }

    // Sanitize to text-only (no HTML in meta description)
    metaTag.setAttribute('content', sanitizeText(fix.value));
    log('Updated meta description to:', fix.value);
  }

  /**
   * Apply alt text to images
   */
  function applyAltText(fix) {
    const images = document.querySelectorAll(fix.selector);

    images.forEach((img, index) => {
      const altText = Array.isArray(fix.value) ? fix.value[index] : fix.value;
      if (altText && !img.getAttribute('alt')) {
        // Sanitize alt text (text-only)
        img.setAttribute('alt', sanitizeText(altText));
        log('Added alt text to image:', altText);
      }
    });
  }

  /**
   * Apply heading fixes
   */
  function applyHeading(fix) {
    const element = document.querySelector(fix.selector);

    if (element) {
      // Use textContent for headings (no HTML)
      element.textContent = sanitizeText(fix.value);
      log('Updated heading:', fix.value);
    }
  }

  /**
   * Fix broken links
   */
  function applyLinkFix(fix) {
    const links = document.querySelectorAll(fix.selector);

    links.forEach(link => {
      if (link.href === fix.oldValue) {
        // Sanitize URL to prevent javascript: or data: URIs
        const sanitizedURL = sanitizeURL(fix.value);
        if (sanitizedURL) {
          link.href = sanitizedURL;
          log('Fixed link from', fix.oldValue, 'to', sanitizedURL);
        } else {
          logError('Invalid URL blocked:', fix.value);
        }
      }
    });
  }

  /**
   * Apply content changes
   */
  function applyContent(fix) {
    const element = document.querySelector(fix.selector);

    if (element) {
      if (fix.html) {
        // Sanitize HTML before inserting to prevent XSS
        element.innerHTML = sanitizeHTML(fix.value);
        log('Updated HTML content for:', fix.selector, '(sanitized)');
      } else {
        element.textContent = fix.value;
        log('Updated text content for:', fix.selector);
      }
    }
  }

  /**
   * Report fix application status back to API
   */
  async function reportFixStatus(fixId, success, error = null) {
    try {
      await fetch(`${API_BASE}/api/magic/${SITE_ID}/fixes/${fixId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success,
          error,
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (err) {
      logError('Failed to report fix status:', err);
    }
  }

  /**
   * Main fix application loop
   */
  async function checkAndApplyFixes() {
    log('Checking for pending fixes...');

    const fixes = await fetchPendingFixes();

    if (fixes.length === 0) {
      log('No pending fixes');
      return;
    }

    log('Found', fixes.length, 'pending fixes');

    for (const fix of fixes) {
      const success = applyFix(fix);
      await reportFixStatus(fix.id, success);
    }
  }

  /**
   * Send page analytics to SEOLOGY.AI
   */
  async function sendPageAnalytics() {
    try {
      const analytics = {
        url: window.location.href,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || null,
        headings: {
          h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
          h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent),
        },
        images: {
          total: document.querySelectorAll('img').length,
          withoutAlt: document.querySelectorAll('img:not([alt])').length,
        },
        links: {
          internal: document.querySelectorAll('a[href^="/"]').length,
          external: document.querySelectorAll('a[href^="http"]').length,
        },
        wordCount: document.body.textContent.trim().split(/\s+/).length,
      };

      await fetch(`${API_BASE}/api/magic/${SITE_ID}/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analytics),
      });

      log('Sent page analytics');
    } catch (error) {
      logError('Failed to send analytics:', error);
    }
  }

  /**
   * Initialize Magic.js
   */
  function init() {
    log('SEOLOGY.AI Magic.js initialized');

    // Check for fixes immediately on load
    checkAndApplyFixes();

    // Send page analytics on load
    sendPageAnalytics();

    // Set up periodic check for new fixes
    setInterval(checkAndApplyFixes, CHECK_INTERVAL);

    // Expose API for manual operations
    window.SEOLOGY = {
      version: '1.0.0',
      siteId: SITE_ID,
      checkFixes: checkAndApplyFixes,
      sendAnalytics: sendPageAnalytics,
      debug: DEBUG,
    };

    log('Interval set to check every', CHECK_INTERVAL / 1000, 'seconds');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
