/**
 * XSS Protection and Content Sanitization Utilities
 *
 * This module provides comprehensive sanitization functions to prevent
 * Cross-Site Scripting (XSS) attacks across the application.
 *
 * Security Features:
 * - HTML sanitization using DOMPurify
 * - URL validation and protocol checking
 * - JSON sanitization
 * - HTML escaping
 * - Server-side safe handling
 */

import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param dirty - Untrusted HTML string
 * @param options - Optional DOMPurify configuration
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * const userInput = '<script>alert("XSS")</script><p>Safe text</p>'
 * const safe = sanitizeHTML(userInput)
 * // Returns: '<p>Safe text</p>'
 */
export function sanitizeHTML(
  dirty: string,
  options?: {
    allowedTags?: string[]
    allowedAttributes?: string[]
  }
): string {
  if (!dirty || typeof dirty !== 'string') {
    return ''
  }

  const config = {
    ALLOWED_TAGS: options?.allowedTags || ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'span', 'div'],
    ALLOWED_ATTR: options?.allowedAttributes || ['href', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'link'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onblur']
  }

  return DOMPurify.sanitize(dirty, config) as string
}

/**
 * Validate and sanitize URLs to prevent javascript: and data: XSS vectors
 *
 * @param url - Untrusted URL string
 * @returns Sanitized URL or empty string if invalid/malicious
 *
 * @example
 * sanitizeURL('javascript:alert("XSS")') // Returns: ''
 * sanitizeURL('http://example.com/image.jpg') // Returns: 'http://example.com/image.jpg'
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== 'string') {
    return ''
  }

  // Remove any whitespace
  const trimmedUrl = url.trim()

  // Block javascript: and data: protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i
  if (dangerousProtocols.test(trimmedUrl)) {
    console.warn('[Security] Blocked dangerous URL protocol:', trimmedUrl)
    return ''
  }

  try {
    const parsed = new URL(trimmedUrl)

    // Only allow http, https, and relative URLs
    const allowedProtocols = ['http:', 'https:', 'mailto:']
    if (!allowedProtocols.includes(parsed.protocol)) {
      console.warn('[Security] Blocked non-HTTP(S) URL protocol:', parsed.protocol)
      return ''
    }

    // Additional check for encoded javascript:
    const decodedUrl = decodeURIComponent(trimmedUrl)
    if (dangerousProtocols.test(decodedUrl)) {
      console.warn('[Security] Blocked encoded dangerous URL:', decodedUrl)
      return ''
    }

    return parsed.toString()
  } catch (error) {
    // Not a valid URL, might be a relative path
    // Check if it's a safe relative path
    if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('./') || trimmedUrl.startsWith('../')) {
      // Still check for dangerous protocols in relative URLs
      if (dangerousProtocols.test(trimmedUrl)) {
        return ''
      }
      return trimmedUrl
    }

    console.warn('[Security] Invalid URL format:', trimmedUrl)
    return ''
  }
}

/**
 * Sanitize JSON strings to prevent injection attacks
 *
 * @param jsonString - Untrusted JSON string
 * @returns Safely formatted JSON string or error message
 *
 * @example
 * const userJson = '{"name":"<script>alert(1)</script>"}'
 * const safe = sanitizeJSON(userJson)
 * // Returns properly escaped JSON without executable code
 */
export function sanitizeJSON(jsonString: string): string {
  if (!jsonString || typeof jsonString !== 'string') {
    return '{}'
  }

  try {
    // Parse to validate JSON and remove any potential JS code
    const parsed = JSON.parse(jsonString)

    // Re-stringify with proper escaping
    // This removes any script tags or JS code that might be in strings
    const sanitized = JSON.stringify(parsed, (key, value) => {
      if (typeof value === 'string') {
        // Escape HTML entities in string values
        return escapeHTML(value)
      }
      return value
    }, 2)

    return sanitized
  } catch (error) {
    console.warn('[Security] Invalid JSON, returning safe placeholder:', error)
    return 'Invalid JSON'
  }
}

/**
 * Escape HTML entities to prevent XSS in text content
 *
 * @param text - Untrusted text string
 * @returns HTML-escaped string safe for insertion into DOM
 *
 * @example
 * escapeHTML('<script>alert("XSS")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 */
export function escapeHTML(text: string): string {
  if (!text || typeof text !== 'string') {
    return ''
  }

  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  }

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Sanitize attributes for safe use in HTML elements
 *
 * @param attrValue - Untrusted attribute value
 * @returns Sanitized attribute value
 *
 * @example
 * sanitizeAttribute('javascript:alert("XSS")')
 * // Returns: ''
 */
export function sanitizeAttribute(attrValue: string): string {
  if (!attrValue || typeof attrValue !== 'string') {
    return ''
  }

  // Remove any javascript: or other dangerous protocols
  const dangerous = /^(javascript|data|vbscript):/i
  if (dangerous.test(attrValue)) {
    return ''
  }

  // Escape HTML entities
  return escapeHTML(attrValue)
}

/**
 * Sanitize CSS to prevent CSS injection attacks
 *
 * @param css - Untrusted CSS string
 * @returns Sanitized CSS or empty string if dangerous
 *
 * @example
 * sanitizeCSS('color: red; background: url("javascript:alert(1)")')
 * // Returns: ''
 */
export function sanitizeCSS(css: string): string {
  if (!css || typeof css !== 'string') {
    return ''
  }

  // Block dangerous CSS patterns
  const dangerousPatterns = [
    /javascript:/i,
    /expression\(/i,
    /import/i,
    /@import/i,
    /behavior:/i,
    /-moz-binding/i
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(css)) {
      console.warn('[Security] Blocked dangerous CSS pattern')
      return ''
    }
  }

  return css
}

/**
 * Sanitize filename to prevent path traversal attacks
 *
 * @param filename - Untrusted filename
 * @returns Safe filename without path traversal sequences
 *
 * @example
 * sanitizeFilename('../../etc/passwd')
 * // Returns: 'etc_passwd'
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') {
    return 'unnamed_file'
  }

  // Remove path traversal sequences
  let safe = filename.replace(/\.\./g, '')

  // Remove path separators
  safe = safe.replace(/[\/\\]/g, '_')

  // Remove dangerous characters
  safe = safe.replace(/[<>:"|?*\x00-\x1f]/g, '')

  // Limit length
  safe = safe.substring(0, 255)

  return safe || 'unnamed_file'
}

/**
 * Check if a string contains potential XSS vectors
 *
 * @param input - String to check
 * @returns true if potentially dangerous, false if safe
 */
export function containsXSS(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false
  }

  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /onerror=/i,
    /onclick=/i,
    /onload=/i,
    /onmouseover=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i
  ]

  return xssPatterns.some(pattern => pattern.test(input))
}

/**
 * Sanitize user-generated content for display
 * Combines multiple sanitization techniques for maximum safety
 *
 * @param content - Untrusted user content
 * @returns Sanitized content safe for display
 */
export function sanitizeUserContent(content: string): string {
  if (!content || typeof content !== 'string') {
    return ''
  }

  // First escape HTML
  let safe = escapeHTML(content)

  // Then apply DOMPurify for additional safety
  safe = sanitizeHTML(safe, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
    allowedAttributes: []
  })

  return safe
}

/**
 * Create safe React props object with sanitized values
 *
 * @param props - Untrusted props object
 * @returns Sanitized props object
 */
export function sanitizeReactProps<T extends Record<string, any>>(
  props: T
): T {
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('url') || key.toLowerCase().includes('href')) {
        sanitized[key] = sanitizeURL(value)
      } else if (key.toLowerCase().includes('html')) {
        sanitized[key] = sanitizeHTML(value)
      } else {
        sanitized[key] = escapeHTML(value)
      }
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}
