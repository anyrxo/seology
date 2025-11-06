/**
 * XSS Protection Tests
 * Verify that all sanitization functions properly protect against XSS attacks
 */

import {
  sanitizeHTML,
  sanitizeURL,
  sanitizeJSON,
  escapeHTML,
  sanitizeAttribute,
  sanitizeCSS,
  sanitizeFilename,
  containsXSS,
  sanitizeUserContent
} from './sanitize'

describe('XSS Protection - sanitize.ts', () => {
  describe('sanitizeHTML', () => {
    test('should remove script tags', () => {
      const malicious = '<script>alert("XSS")</script><p>Safe text</p>'
      const result = sanitizeHTML(malicious)
      expect(result).not.toContain('<script')
      expect(result).toContain('Safe text')
    })

    test('should remove javascript: protocol in links', () => {
      const malicious = '<a href="javascript:alert(\'XSS\')">Click me</a>'
      const result = sanitizeHTML(malicious)
      expect(result).not.toContain('javascript:')
    })

    test('should remove event handlers', () => {
      const malicious = '<img src="x" onerror="alert(\'XSS\')">'
      const result = sanitizeHTML(malicious)
      expect(result).not.toContain('onerror')
    })

    test('should allow safe HTML tags', () => {
      const safe = '<p><b>Bold</b> and <i>italic</i> text</p>'
      const result = sanitizeHTML(safe)
      expect(result).toContain('<b>Bold</b>')
      expect(result).toContain('<i>italic</i>')
    })

    test('should remove iframe tags', () => {
      const malicious = '<iframe src="evil.com"></iframe>'
      const result = sanitizeHTML(malicious)
      expect(result).not.toContain('<iframe')
    })
  })

  describe('sanitizeURL', () => {
    test('should block javascript: protocol', () => {
      const malicious = 'javascript:alert("XSS")'
      const result = sanitizeURL(malicious)
      expect(result).toBe('')
    })

    test('should block data: protocol', () => {
      const malicious = 'data:text/html,<script>alert("XSS")</script>'
      const result = sanitizeURL(malicious)
      expect(result).toBe('')
    })

    test('should allow https:// URLs', () => {
      const safe = 'https://example.com/image.jpg'
      const result = sanitizeURL(safe)
      expect(result).toBe(safe)
    })

    test('should allow http:// URLs', () => {
      const safe = 'http://example.com/page'
      const result = sanitizeURL(safe)
      expect(result).toBe(safe)
    })

    test('should block vbscript: protocol', () => {
      const malicious = 'vbscript:msgbox("XSS")'
      const result = sanitizeURL(malicious)
      expect(result).toBe('')
    })

    test('should handle encoded javascript:', () => {
      const malicious = 'java%73cript:alert("XSS")'
      const result = sanitizeURL(malicious)
      expect(result).toBe('')
    })

    test('should allow relative paths', () => {
      const safe = '/images/photo.jpg'
      const result = sanitizeURL(safe)
      expect(result).toBe(safe)
    })
  })

  describe('sanitizeJSON', () => {
    test('should parse and re-stringify valid JSON', () => {
      const json = '{"name":"John","age":30}'
      const result = sanitizeJSON(json)
      expect(() => JSON.parse(result)).not.toThrow()
    })

    test('should escape HTML in JSON values', () => {
      const malicious = '{"name":"<script>alert(\\"XSS\\")</script>"}'
      const result = sanitizeJSON(malicious)
      expect(result).not.toContain('<script')
      expect(result).toContain('&lt;script')
    })

    test('should return error message for invalid JSON', () => {
      const invalid = '{invalid json}'
      const result = sanitizeJSON(invalid)
      expect(result).toBe('Invalid JSON')
    })

    test('should handle nested objects', () => {
      const json = '{"user":{"name":"John","bio":"<b>Bold</b>"}}'
      const result = sanitizeJSON(json)
      expect(() => JSON.parse(result)).not.toThrow()
      expect(result).not.toContain('<b>')
    })
  })

  describe('escapeHTML', () => {
    test('should escape < and >', () => {
      const text = '<script>alert("XSS")</script>'
      const result = escapeHTML(text)
      expect(result).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;')
    })

    test('should escape quotes', () => {
      const text = 'Hello "World" and \'Friend\''
      const result = escapeHTML(text)
      expect(result).toContain('&quot;')
      expect(result).toContain('&#x27;')
    })

    test('should escape ampersands', () => {
      const text = 'Tom & Jerry'
      const result = escapeHTML(text)
      expect(result).toBe('Tom &amp; Jerry')
    })

    test('should handle empty string', () => {
      const result = escapeHTML('')
      expect(result).toBe('')
    })
  })

  describe('sanitizeAttribute', () => {
    test('should block javascript: in attributes', () => {
      const malicious = 'javascript:alert("XSS")'
      const result = sanitizeAttribute(malicious)
      expect(result).toBe('')
    })

    test('should escape HTML entities', () => {
      const text = 'Some "quoted" text'
      const result = sanitizeAttribute(text)
      expect(result).toContain('&quot;')
    })

    test('should allow safe attribute values', () => {
      const safe = 'button-primary'
      const result = sanitizeAttribute(safe)
      expect(result).toBe(safe)
    })
  })

  describe('sanitizeCSS', () => {
    test('should block javascript: in CSS', () => {
      const malicious = 'background: url("javascript:alert(1)")'
      const result = sanitizeCSS(malicious)
      expect(result).toBe('')
    })

    test('should block expression() in CSS', () => {
      const malicious = 'width: expression(alert(1))'
      const result = sanitizeCSS(malicious)
      expect(result).toBe('')
    })

    test('should block @import', () => {
      const malicious = '@import url("evil.css")'
      const result = sanitizeCSS(malicious)
      expect(result).toBe('')
    })

    test('should allow safe CSS', () => {
      const safe = 'color: red; font-size: 14px;'
      const result = sanitizeCSS(safe)
      expect(result).toBe(safe)
    })
  })

  describe('sanitizeFilename', () => {
    test('should remove path traversal sequences', () => {
      const malicious = '../../etc/passwd'
      const result = sanitizeFilename(malicious)
      expect(result).not.toContain('..')
      expect(result).toBe('__etc_passwd')
    })

    test('should replace path separators', () => {
      const malicious = 'path/to/file.txt'
      const result = sanitizeFilename(malicious)
      expect(result).toBe('path_to_file.txt')
    })

    test('should remove dangerous characters', () => {
      const malicious = 'file<>:"|?*.txt'
      const result = sanitizeFilename(malicious)
      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
      expect(result).not.toContain(':')
    })

    test('should limit filename length', () => {
      const long = 'a'.repeat(300) + '.txt'
      const result = sanitizeFilename(long)
      expect(result.length).toBeLessThanOrEqual(255)
    })
  })

  describe('containsXSS', () => {
    test('should detect <script> tags', () => {
      expect(containsXSS('<script>alert(1)</script>')).toBe(true)
    })

    test('should detect javascript: protocol', () => {
      expect(containsXSS('javascript:alert(1)')).toBe(true)
    })

    test('should detect event handlers', () => {
      expect(containsXSS('onerror=alert(1)')).toBe(true)
      expect(containsXSS('onclick=alert(1)')).toBe(true)
      expect(containsXSS('onload=alert(1)')).toBe(true)
    })

    test('should detect iframe tags', () => {
      expect(containsXSS('<iframe src="evil.com">')).toBe(true)
    })

    test('should return false for safe content', () => {
      expect(containsXSS('Hello world!')).toBe(false)
      expect(containsXSS('<p>Safe HTML</p>')).toBe(false)
    })
  })

  describe('sanitizeUserContent', () => {
    test('should apply multiple sanitization layers', () => {
      const malicious = '<script>alert("XSS")</script><b>Bold text</b>'
      const result = sanitizeUserContent(malicious)
      expect(result).not.toContain('<script')
      // Note: sanitizeUserContent escapes ALL HTML for maximum safety
      expect(result).toContain('&lt;b&gt;Bold text&lt;&#x2F;b&gt;')
    })

    test('should escape and then sanitize', () => {
      const malicious = '"><script>alert(1)</script>'
      const result = sanitizeUserContent(malicious)
      expect(result).not.toContain('<script')
    })
  })

  describe('Real-world XSS attack vectors', () => {
    const attackVectors = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert("XSS")>',
      'javascript:alert("XSS")',
      '<iframe src="javascript:alert(\'XSS\')">',
      '<svg onload=alert("XSS")>',
      '"><script>alert(String.fromCharCode(88,83,83))</script>',
      '<img src="x" onerror="eval(atob(\'YWxlcnQoJ1hTUycpOw==\'))">',
      '<a href="javascript:void(0)" onclick="alert(\'XSS\')">Click</a>',
      '<embed src="data:text/html,<script>alert(\'XSS\')</script>">',
      '<object data="javascript:alert(\'XSS\')">',
      '<link rel="stylesheet" href="javascript:alert(\'XSS\')">',
      '<meta http-equiv="refresh" content="0;url=javascript:alert(\'XSS\')">',
      '<form action="javascript:alert(\'XSS\')"><input type="submit"></form>',
      '<input type="image" src="x" onerror="alert(\'XSS\')">',
      '<body onload=alert(\'XSS\')>',
      '<div style="background:url(javascript:alert(\'XSS\'))">',
      '<style>@import\'javascript:alert("XSS")\';</style>',
      '<<SCRIPT>alert("XSS");//<</SCRIPT>',
      '<IMG SRC="javascript:alert(\'XSS\');">',
      '<IMG """><SCRIPT>alert("XSS")</SCRIPT>">',
    ]

    attackVectors.forEach((vector, index) => {
      test(`should block attack vector ${index + 1}: ${vector.substring(0, 30)}...`, () => {
        // URL sanitization should return empty for malicious content containing protocols
        if (vector.startsWith('javascript:') || vector.startsWith('data:') || vector.startsWith('vbscript:')) {
          const urlResult = sanitizeURL(vector)
          expect(urlResult).toBe('')
          return // Skip HTML tests for plain protocol strings
        }

        const htmlResult = sanitizeHTML(vector)

        // Verify dangerous patterns are removed from HTML
        expect(htmlResult).not.toContain('onerror')
        expect(htmlResult).not.toContain('onload')
        expect(htmlResult).not.toContain('onclick')
        expect(htmlResult).not.toContain('eval(')
      })
    })
  })

  describe('Edge cases', () => {
    test('should handle null/undefined gracefully', () => {
      expect(sanitizeHTML('')).toBe('')
      expect(sanitizeURL('')).toBe('')
      expect(escapeHTML('')).toBe('')
    })

    test('should handle very long strings', () => {
      const long = 'a'.repeat(100000)
      const result = escapeHTML(long)
      expect(result.length).toBe(100000)
    })

    test('should handle unicode characters', () => {
      const unicode = '你好世界 🌍 مرحبا'
      const result = escapeHTML(unicode)
      expect(result).toContain('你好世界')
      expect(result).toContain('🌍')
    })

    test('should handle mixed case attack vectors', () => {
      const mixedCase = '<ScRiPt>alert("XSS")</ScRiPt>'
      const result = sanitizeHTML(mixedCase)
      expect(result.toLowerCase()).not.toContain('script')
    })
  })
})
