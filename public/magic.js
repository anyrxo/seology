/**
 * Seology Magic.js - Universal JavaScript Client
 * Allows Seology to analyze and fix SEO issues on any website
 *
 * Installation:
 * <script src="https://app.seology.ai/magic.js" data-seology-key="YOUR_API_KEY"></script>
 */

(function() {
  'use strict';

  // Configuration
  const SEOLOGY_API_URL = 'https://app.seology.ai/api';
  const VERSION = '1.0.0';

  class SeologyMagic {
    constructor() {
      this.apiKey = null;
      this.siteId = null;
      this.initialized = false;
      this.pendingFixes = [];

      this.init();
    }

    /**
     * Initialize the Seology client
     */
    init() {
      // Get API key from script tag
      const scriptTag = document.querySelector('script[data-seology-key]');
      if (!scriptTag) {
        console.error('[Seology] Missing data-seology-key attribute on script tag');
        return;
      }

      this.apiKey = scriptTag.getAttribute('data-seology-key');

      // Auto-detect site ID if provided
      this.siteId = scriptTag.getAttribute('data-seology-site-id') || null;

      // Initialize connection
      this.connect();

      // Listen for messages from Seology
      window.addEventListener('message', this.handleMessage.bind(this));

      console.log(`[Seology] Magic.js v${VERSION} initialized`);
    }

    /**
     * Connect to Seology API and register site
     */
    async connect() {
      try {
        const response = await fetch(`${SEOLOGY_API_URL}/magic/connect`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: this.apiKey,
            url: window.location.origin,
            userAgent: navigator.userAgent,
            version: VERSION,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to connect to Seology');
        }

        const data = await response.json();
        this.siteId = data.siteId;
        this.initialized = true;

        console.log('[Seology] Connected successfully. Site ID:', this.siteId);

        // Check for pending fixes
        this.checkPendingFixes();
      } catch (error) {
        console.error('[Seology] Connection failed:', error);
      }
    }

    /**
     * Check for pending fixes from Seology dashboard
     */
    async checkPendingFixes() {
      if (!this.initialized) return;

      try {
        const response = await fetch(`${SEOLOGY_API_URL}/magic/pending-fixes?siteId=${this.siteId}`, {
          headers: {
            'X-Seology-Key': this.apiKey,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        this.pendingFixes = data.fixes || [];

        if (this.pendingFixes.length > 0) {
          console.log(`[Seology] Found ${this.pendingFixes.length} pending fix(es)`);
          // Apply fixes in order
          for (const fix of this.pendingFixes) {
            await this.applyFix(fix);
          }
        }
      } catch (error) {
        console.error('[Seology] Failed to check pending fixes:', error);
      }
    }

    /**
     * Apply a fix to the page
     */
    async applyFix(fix) {
      console.log('[Seology] Applying fix:', fix.type);

      try {
        switch (fix.type) {
          case 'UPDATE_META_TITLE':
            this.updateMetaTitle(fix.data.title);
            break;

          case 'UPDATE_META_DESCRIPTION':
            this.updateMetaDescription(fix.data.description);
            break;

          case 'UPDATE_H1':
            this.updateH1(fix.data.h1Text);
            break;

          case 'ADD_IMAGE_ALT_TEXT':
            this.addImageAltText(fix.data.images);
            break;

          case 'ADD_CANONICAL_TAG':
            this.addCanonicalTag(fix.data.url);
            break;

          case 'ADD_OPEN_GRAPH_TAGS':
            this.addOpenGraphTags(fix.data);
            break;

          case 'ADD_STRUCTURED_DATA':
            this.addStructuredData(fix.data.schema);
            break;

          case 'FIX_BROKEN_LINKS':
            this.fixBrokenLinks(fix.data.linkMap);
            break;

          default:
            console.warn('[Seology] Unknown fix type:', fix.type);
        }

        // Report success
        await this.reportFixStatus(fix.id, 'success');
        console.log('[Seology] Fix applied successfully:', fix.type);
      } catch (error) {
        console.error('[Seology] Failed to apply fix:', error);
        await this.reportFixStatus(fix.id, 'failed', error.message);
      }
    }

    /**
     * Update page title
     */
    updateMetaTitle(newTitle) {
      document.title = newTitle;

      // Also update og:title if exists
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', newTitle);
      }
    }

    /**
     * Update meta description
     */
    updateMetaDescription(newDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', newDescription);
      } else {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        metaDesc.setAttribute('content', newDescription);
        document.head.appendChild(metaDesc);
      }

      // Also update og:description if exists
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', newDescription);
      }
    }

    /**
     * Update H1 tag
     */
    updateH1(newH1Text) {
      const h1 = document.querySelector('h1');
      if (h1) {
        h1.textContent = newH1Text;
      } else {
        // Create new H1 at the top of main content
        const main = document.querySelector('main') || document.querySelector('article') || document.body;
        const newH1 = document.createElement('h1');
        newH1.textContent = newH1Text;
        main.insertBefore(newH1, main.firstChild);
      }
    }

    /**
     * Add alt text to images
     */
    addImageAltText(imageMap) {
      // imageMap is an object: { imageSelector: altText }
      for (const [selector, altText] of Object.entries(imageMap)) {
        const img = document.querySelector(selector);
        if (img) {
          img.setAttribute('alt', altText);
        }
      }
    }

    /**
     * Add canonical tag
     */
    addCanonicalTag(url) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', url);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', url);
        document.head.appendChild(canonical);
      }
    }

    /**
     * Add Open Graph meta tags
     */
    addOpenGraphTags(ogData) {
      const tags = {
        'og:title': ogData.title,
        'og:description': ogData.description,
        'og:image': ogData.image,
        'og:url': ogData.url || window.location.href,
        'og:type': ogData.type || 'website',
      };

      for (const [property, content] of Object.entries(tags)) {
        if (!content) continue;

        let tag = document.querySelector(`meta[property="${property}"]`);
        if (tag) {
          tag.setAttribute('content', content);
        } else {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          tag.setAttribute('content', content);
          document.head.appendChild(tag);
        }
      }
    }

    /**
     * Add structured data (JSON-LD)
     */
    addStructuredData(schema) {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    /**
     * Fix broken links
     */
    fixBrokenLinks(linkMap) {
      // linkMap is an object: { oldUrl: newUrl }
      for (const [oldUrl, newUrl] of Object.entries(linkMap)) {
        const links = document.querySelectorAll(`a[href="${oldUrl}"]`);
        links.forEach(link => {
          link.setAttribute('href', newUrl);
        });
      }
    }

    /**
     * Report fix status back to Seology
     */
    async reportFixStatus(fixId, status, error = null) {
      try {
        await fetch(`${SEOLOGY_API_URL}/magic/fix-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Seology-Key': this.apiKey,
          },
          body: JSON.stringify({
            siteId: this.siteId,
            fixId: fixId,
            status: status,
            error: error,
            url: window.location.href,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('[Seology] Failed to report fix status:', error);
      }
    }

    /**
     * Handle messages from parent window (for iframe embedding)
     */
    handleMessage(event) {
      // Only accept messages from Seology domains
      if (!event.origin.includes('seology.ai')) {
        return;
      }

      const { type, data } = event.data;

      switch (type) {
        case 'APPLY_FIX':
          this.applyFix(data);
          break;

        case 'SCAN_PAGE':
          this.scanPage();
          break;

        default:
          console.warn('[Seology] Unknown message type:', type);
      }
    }

    /**
     * Scan current page and report SEO data
     */
    async scanPage() {
      const pageData = {
        url: window.location.href,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent),
        h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent),
        imageCount: document.querySelectorAll('img').length,
        imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
        linkCount: document.querySelectorAll('a').length,
        wordCount: document.body.innerText.split(/\s+/).length,
        hasCanonical: !!document.querySelector('link[rel="canonical"]'),
        hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
        openGraph: this.extractOpenGraph(),
      };

      try {
        await fetch(`${SEOLOGY_API_URL}/magic/page-scan`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Seology-Key': this.apiKey,
          },
          body: JSON.stringify({
            siteId: this.siteId,
            pageData: pageData,
          }),
        });

        console.log('[Seology] Page scan completed');
      } catch (error) {
        console.error('[Seology] Failed to send page scan:', error);
      }
    }

    /**
     * Extract Open Graph tags
     */
    extractOpenGraph() {
      const ogTags = {};
      document.querySelectorAll('meta[property^="og:"]').forEach(tag => {
        const property = tag.getAttribute('property');
        const content = tag.getAttribute('content');
        if (property && content) {
          ogTags[property] = content;
        }
      });
      return ogTags;
    }
  }

  // Initialize Seology Magic when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.SeologyMagic = new SeologyMagic();
    });
  } else {
    window.SeologyMagic = new SeologyMagic();
  }

  // Export for manual initialization if needed
  window.Seology = SeologyMagic;
})();
