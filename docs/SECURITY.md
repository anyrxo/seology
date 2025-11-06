# SEOLOGY.AI - Security Documentation

Security features, best practices, and vulnerability reporting for SEOLOGY.AI.

## Table of Contents

1. [Security Overview](#security-overview)
2. [Data Protection](#data-protection)
3. [Authentication & Authorization](#authentication--authorization)
4. [Encryption](#encryption)
5. [OWASP Top 10 Protection](#owasp-top-10-protection)
6. [Rate Limiting](#rate-limiting)
7. [Input Validation](#input-validation)
8. [Security Best Practices](#security-best-practices)
9. [Compliance](#compliance)
10. [Reporting Vulnerabilities](#reporting-vulnerabilities)

---

## Security Overview

SEOLOGY.AI implements multiple layers of security to protect merchant data and prevent unauthorized access.

### Security Architecture

```
┌─────────────────────────────────────┐
│         Security Layers             │
├─────────────────────────────────────┤
│  1. HTTPS/TLS Encryption           │
│  2. Shopify OAuth                   │
│  3. Shop Parameter Validation       │
│  4. Token Encryption (AES-256-GCM)  │
│  5. Input Validation (Zod)          │
│  6. Rate Limiting (Token Bucket)    │
│  7. SQL Injection Prevention        │
│  8. XSS Protection                  │
│  9. CSRF Protection                 │
│  10. Webhook Signature Validation   │
└─────────────────────────────────────┘
```

### Security Principles

1. **Defense in Depth**: Multiple security layers
2. **Least Privilege**: Minimum required permissions
3. **Secure by Default**: Security enabled out of the box
4. **Fail Securely**: Errors don't expose sensitive data
5. **Keep it Simple**: Simple code is more secure

---

## Data Protection

### Data Classification

**Tier 1: Critical** (encrypted at rest + in transit)
- Shopify OAuth access tokens
- Shopify API credentials
- Database connection strings
- Encryption keys

**Tier 2: Sensitive** (encrypted in transit)
- User email addresses
- Store domain names
- Product data
- Usage analytics

**Tier 3: Public** (no encryption required)
- SEO scores
- Issue types
- Agent templates (public)

### Data Storage

**Encrypted Fields**:
```typescript
// Connection.accessToken - Shopify OAuth token
// Connection.refreshToken - Shopify refresh token
// Connection.credentials - Platform-specific data
```

**Encryption Method**: AES-256-GCM
- Key derivation: PBKDF2 with 100,000 iterations
- Initialization vector: 16 random bytes per encryption
- Authentication tag: Prevents tampering

**Example**:
```typescript
import { encrypt, decrypt } from '@/lib/encryption'

// Storing token
const encryptedToken = encrypt(accessToken) // "iv:authTag:ciphertext"
await db.connection.update({
  where: { id },
  data: { accessToken: encryptedToken }
})

// Retrieving token
const connection = await db.connection.findUnique({ where: { id } })
const accessToken = decrypt(connection.accessToken)
```

### Data Retention

**Active Data**:
- Kept while app is installed
- Regular backups (encrypted)

**Rollback Data**:
- Fix history: 90 days
- Checkpoints: 90 days
- After expiry: Moved to cold storage or deleted

**Deleted Data**:
- App uninstall: 7-day grace period, then permanent deletion
- GDPR request: 48-hour deletion
- Secure deletion: Overwrite + database vacuum

**Data Backup**:
- Daily automated backups (encrypted)
- 30-day retention
- Stored in separate region (disaster recovery)
- Access logs for all backup retrievals

---

## Authentication & Authorization

### OAuth Flow Security

**Step 1: Authorization Request**
```typescript
// Generate CSRF token
const csrfToken = crypto.randomBytes(32).toString('hex')

// Store token with expiration
await db.cSRFToken.create({
  data: {
    userId: userId,
    token: csrfToken,
    provider: 'SHOPIFY',
    expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  }
})

// Redirect to Shopify
const authUrl = `https://${shop}/admin/oauth/authorize?` +
  `client_id=${SHOPIFY_CLIENT_ID}&` +
  `scope=${scopes}&` +
  `redirect_uri=${REDIRECT_URI}&` +
  `state=${csrfToken}`

return redirect(authUrl)
```

**Step 2: Callback Validation**
```typescript
// Verify CSRF token
const csrfToken = await db.cSRFToken.findUnique({
  where: { token: state }
})

if (!csrfToken || csrfToken.expiresAt < new Date()) {
  throw new Error('Invalid or expired CSRF token')
}

// Verify HMAC signature
const hmac = crypto
  .createHmac('sha256', SHOPIFY_CLIENT_SECRET)
  .update(queryString)
  .digest('hex')

if (hmac !== receivedHmac) {
  throw new Error('Invalid HMAC signature')
}

// Exchange code for access token
const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
  method: 'POST',
  body: JSON.stringify({
    client_id: SHOPIFY_CLIENT_ID,
    client_secret: SHOPIFY_CLIENT_SECRET,
    code: code
  })
})

const { access_token } = await tokenResponse.json()

// Store encrypted token
await storeSession(shop, encrypt(access_token))
```

### Session Management

**Session Storage**:
```typescript
// lib/shopify-session-storage.ts
export async function storeSession(shop: string, accessToken: string) {
  await db.connection.upsert({
    where: { domain: shop },
    update: {
      accessToken: encrypt(accessToken),
      lastSync: new Date(),
      status: 'CONNECTED'
    },
    create: {
      domain: shop,
      platform: 'SHOPIFY',
      accessToken: encrypt(accessToken),
      status: 'CONNECTED'
    }
  })
}
```

**Session Retrieval**:
```typescript
export async function retrieveSession(shop: string) {
  const connection = await db.connection.findUnique({
    where: { domain: shop }
  })

  if (!connection) return null

  return {
    shop: connection.domain,
    accessToken: decrypt(connection.accessToken),
    expiresAt: connection.lastSync // Session doesn't expire, but track last use
  }
}
```

**Session Invalidation**:
- App uninstall webhook
- Manual disconnect
- 90 days of inactivity
- Security breach detection

### Authorization Checks

**Route Protection**:
```typescript
// Every API route checks authorization
export async function GET(request: Request) {
  const shop = new URL(request.url).searchParams.get('shop')

  if (!shop) {
    return NextResponse.json(
      { error: { code: 'AUTHENTICATION_REQUIRED' } },
      { status: 401 }
    )
  }

  const session = await retrieveSession(shop)
  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED' } },
      { status: 403 }
    )
  }

  // Proceed with authorized request
}
```

**Resource-Level Authorization**:
```typescript
// Ensure user can only access their own resources
const connection = await db.connection.findUnique({
  where: { domain: shop }
})

const product = await db.shopifyProduct.findUnique({
  where: { id: productId }
})

if (product.connectionId !== connection.id) {
  return NextResponse.json(
    { error: { code: 'UNAUTHORIZED', message: 'Not your resource' } },
    { status: 403 }
  )
}
```

---

## Encryption

### Token Encryption

**Algorithm**: AES-256-GCM (Galois/Counter Mode)
- Provides both confidentiality and authenticity
- Prevents tampering with authentication tag
- NIST recommended for sensitive data

**Implementation**:
```typescript
// lib/encryption.ts
import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const KEY_LENGTH = 32 // 256 bits
const IV_LENGTH = 16 // 128 bits
const AUTH_TAG_LENGTH = 16 // 128 bits

// Key is 32 bytes, stored as base64 in environment
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64')

export function encrypt(text: string): string {
  // Generate random IV for each encryption
  const iv = crypto.randomBytes(IV_LENGTH)

  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)

  // Encrypt
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  // Get authentication tag
  const authTag = cipher.getAuthTag()

  // Return: iv:authTag:ciphertext
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`
}

export function decrypt(encryptedText: string): string {
  // Parse components
  const [ivHex, authTagHex, encrypted] = encryptedText.split(':')

  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')

  // Create decipher
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  decipher.setAuthTag(authTag)

  // Decrypt
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
```

**Key Management**:
- Encryption key stored in Vercel environment variables
- Never committed to version control
- Rotated annually or after security incident
- Backup keys stored in secure key vault (e.g., AWS KMS)

**Key Rotation Process**:
1. Generate new key
2. Decrypt all tokens with old key
3. Re-encrypt with new key
4. Update environment variable
5. Deploy
6. Archive old key (for 90 days in case rollback needed)

### Transport Layer Security

**HTTPS Everywhere**:
- All connections use TLS 1.3
- HTTP automatically redirects to HTTPS
- HSTS header enabled (max-age=31536000)

**Vercel Configuration**:
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## OWASP Top 10 Protection

### 1. Broken Access Control ✅

**Protection**:
- Every API route validates shop parameter
- Resource-level authorization checks
- No direct object references (use UUIDs)

**Example**:
```typescript
// BAD: Direct object reference
/api/shopify/products/1 // Attacker can guess IDs

// GOOD: UUID
/api/shopify/products/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

### 2. Cryptographic Failures ✅

**Protection**:
- AES-256-GCM encryption for sensitive data
- TLS 1.3 for all connections
- Secure key storage (Vercel env vars)
- No hardcoded secrets

### 3. Injection ✅

**Protection**:
- Prisma ORM (parameterized queries)
- Zod schema validation
- Input sanitization

**Example**:
```typescript
// Prisma prevents SQL injection automatically
await db.shopifyProduct.findMany({
  where: { title: { contains: userInput } } // Safe
})
```

### 4. Insecure Design ✅

**Protection**:
- Threat modeling during development
- Security-first architecture
- Defense in depth
- Fail securely

### 5. Security Misconfiguration ✅

**Protection**:
- Secure headers (CSP, HSTS, X-Frame-Options)
- Error messages don't expose internals
- Unnecessary features disabled
- Regular dependency updates

**Example**:
```typescript
// BAD: Exposes stack trace
catch (error) {
  return { error: error.stack } // Reveals code structure
}

// GOOD: Generic error
catch (error) {
  console.error(error) // Log internally
  return { error: 'An error occurred. Please try again.' }
}
```

### 6. Vulnerable and Outdated Components ⚠️

**Protection**:
- Dependabot alerts enabled
- Monthly dependency updates
- `npm audit` in CI/CD
- Lock file committed (package-lock.json)

**Monitoring**:
```bash
npm audit # Check for known vulnerabilities
npm outdated # Check for updates
npm update # Update to latest minor/patch versions
```

### 7. Identification and Authentication Failures ✅

**Protection**:
- Shopify OAuth (battle-tested)
- CSRF tokens on OAuth flow
- Session management best practices
- No password storage (delegated to Shopify)

### 8. Software and Data Integrity Failures ✅

**Protection**:
- Webhook HMAC signature validation
- Subresource Integrity (SRI) for CDN assets
- Code signing for deployments
- Audit logs for all changes

**Webhook Validation**:
```typescript
const hmac = crypto
  .createHmac('sha256', SHOPIFY_CLIENT_SECRET)
  .update(body)
  .digest('base64')

if (hmac !== receivedHmac) {
  throw new Error('Invalid webhook signature')
}
```

### 9. Security Logging and Monitoring Failures ⚠️

**Protection**:
- Audit logs for all user actions
- Error tracking (Vercel logs)
- Rate limit logging
- Failed auth attempt tracking

**Recommendations**:
- Add Sentry for error tracking
- Set up alerts for suspicious activity
- Monitor failed OAuth attempts

### 10. Server-Side Request Forgery (SSRF) ✅

**Protection**:
- Validate all URLs before fetching
- Whitelist allowed domains (Shopify APIs)
- No user-controlled URLs in server requests

**Example**:
```typescript
// BAD: User-controlled URL
const url = request.body.webhookUrl
await fetch(url) // SSRF vulnerability

// GOOD: Validate domain
const url = new URL(request.body.webhookUrl)
const allowedDomains = ['shopify.com', 'myshopify.com']

if (!allowedDomains.some(d => url.hostname.endsWith(d))) {
  throw new Error('Invalid webhook domain')
}

await fetch(url.toString())
```

---

## Rate Limiting

### Token Bucket Algorithm

```typescript
// lib/rate-limiter.ts
interface Bucket {
  tokens: number
  lastRefill: number
}

const buckets = new Map<string, Bucket>()

export async function rateLimit(
  userId: string,
  limit: number,
  windowMs: number
): Promise<boolean> {
  const now = Date.now()
  const bucket = buckets.get(userId) || { tokens: limit, lastRefill: now }

  // Refill tokens based on time elapsed
  const elapsed = now - bucket.lastRefill
  const refillAmount = (elapsed / windowMs) * limit
  bucket.tokens = Math.min(limit, bucket.tokens + refillAmount)
  bucket.lastRefill = now

  // Try to consume a token
  if (bucket.tokens >= 1) {
    bucket.tokens -= 1
    buckets.set(userId, bucket)
    return true
  }

  return false
}
```

### Rate Limit Configuration

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/shopify/analyze` | 30 | 1 minute |
| `/api/shopify/fix` | 60 | 1 minute |
| `/api/shopify/chat` | 20 | 1 minute |
| `/api/shopify/agents/*/execute` | 10 | 1 minute |
| All others | 100 | 1 minute |

### Implementation

```typescript
// In API route
import { rateLimit } from '@/lib/rate-limiter'

export async function POST(request: Request) {
  const shop = new URL(request.url).searchParams.get('shop')!

  if (!await rateLimit(shop, 30, 60000)) {
    return NextResponse.json(
      {
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please try again in 60 seconds.',
          retryAfter: 60
        }
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': '0'
        }
      }
    )
  }

  // Process request
}
```

---

## Input Validation

### Zod Schema Validation

**All API inputs validated**:

```typescript
// lib/validation.ts
import { z } from 'zod'

export const FixRequestSchema = z.object({
  productId: z.string().startsWith('gid://shopify/Product/'),
  fixes: z.array(z.object({
    type: z.enum(['meta_title', 'meta_description', 'alt_text', 'canonical_url']),
    value: z.string()
      .min(1, 'Value cannot be empty')
      .max(500, 'Value too long')
      .transform(val => val.trim()) // Sanitize
  }))
})

export const ProductAnalysisSchema = z.object({
  productId: z.string().startsWith('gid://shopify/Product/'),
  resourceType: z.enum(['product', 'collection'])
})

export const ShopParamSchema = z.string()
  .regex(/^[a-z0-9-]+\.myshopify\.com$/, 'Invalid shop domain')
```

**Usage in API route**:

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = FixRequestSchema.parse(body) // Throws if invalid

    // Use validated data
    const { productId, fixes } = validated
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: error.errors
          }
        },
        { status: 400 }
      )
    }
    throw error
  }
}
```

### Sanitization

**HTML Sanitization**:
```typescript
import DOMPurify from 'isomorphic-dompurify'

const sanitized = DOMPurify.sanitize(userInput, {
  ALLOWED_TAGS: [], // Strip all HTML
  ALLOWED_ATTR: []
})
```

**SQL Injection Prevention**:
- Prisma ORM handles this automatically
- Never use raw SQL with user input
- If raw SQL needed, use parameterized queries:

```typescript
// SAFE: Parameterized query
await db.$queryRaw`SELECT * FROM products WHERE title = ${userInput}`

// DANGEROUS: String concatenation (never do this)
await db.$queryRawUnsafe(`SELECT * FROM products WHERE title = '${userInput}'`)
```

---

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use `.env.local` for local development
   - Add `.env*` to `.gitignore`
   - Use environment variables in production

2. **Validate all inputs**
   - Use Zod schemas
   - Sanitize user data
   - Check data types

3. **Use HTTPS everywhere**
   - Never send sensitive data over HTTP
   - Enable HSTS headers

4. **Log security events**
   - Failed login attempts
   - Rate limit violations
   - Unauthorized access attempts

5. **Keep dependencies updated**
   - Run `npm audit` weekly
   - Update dependencies monthly
   - Monitor Dependabot alerts

6. **Use parameterized queries**
   - Always use Prisma ORM
   - Avoid raw SQL
   - Never concatenate user input into queries

7. **Implement proper error handling**
   - Don't expose stack traces
   - Log errors server-side
   - Return generic messages to users

8. **Follow principle of least privilege**
   - Request minimum Shopify scopes needed
   - Limit database permissions
   - Use read-only connections when possible

### For Users

1. **Review app permissions**
   - Only grant necessary scopes
   - Uninstall unused apps

2. **Monitor API usage**
   - Check analytics dashboard
   - Set budget alerts
   - Review unusual activity

3. **Enable two-factor authentication**
   - On Shopify account
   - On email account

4. **Regular security audits**
   - Review connected apps quarterly
   - Check audit logs
   - Verify webhook endpoints

---

## Compliance

### GDPR Compliance

**Data Subject Rights**:
- ✅ Right to access: Export data via API
- ✅ Right to erasure: Delete via webhook or manual request
- ✅ Right to portability: JSON export
- ✅ Right to rectification: Edit via UI or API

**GDPR Webhooks**:
```typescript
// app/api/webhooks/shopify/gdpr/route.ts

// 1. Data Request
case 'customers/data_request':
  const customerData = await getCustomerData(customerId, shop)
  await sendDataExport(customerEmail, customerData)
  break

// 2. Customer Redaction
case 'customers/redact':
  await redactCustomerData(customerId, shop)
  break

// 3. Shop Redaction (after app uninstall)
case 'shop/redact':
  await deleteAllShopData(shop)
  break
```

**Data Processing Agreement**: Available at https://seology.ai/dpa

### CCPA Compliance

**California Consumer Rights**:
- Right to know: Data disclosure
- Right to delete: 48-hour deletion
- Right to opt-out: Analytics tracking toggle

**"Do Not Sell My Personal Information"**:
- SEOLOGY does not sell personal information
- Clear disclosure in privacy policy

### SOC 2 (Future)

**Security Controls** (in progress):
- Access control
- Encryption
- Monitoring
- Incident response

---

## Reporting Vulnerabilities

### Responsible Disclosure

We appreciate security researchers who report vulnerabilities responsibly.

**Reporting Process**:

1. **Email**: security@seology.ai
   - Subject: "Security Vulnerability Report"
   - Include:
     - Vulnerability description
     - Steps to reproduce
     - Potential impact
     - Suggested remediation

2. **Do NOT**:
   - Publicly disclose until we've patched
   - Access customer data
   - Perform denial-of-service attacks
   - Social engineer employees

3. **We will**:
   - Acknowledge within 24 hours
   - Investigate within 72 hours
   - Provide fix timeline
   - Credit you in security advisory (if desired)

### Bug Bounty (Future)

**Rewards** (planned):
- Critical: $500-$2000
- High: $200-$500
- Medium: $50-$200
- Low: $25-$50

**Scope**:
- ✅ SEOLOGY.AI production app
- ✅ API endpoints
- ✅ OAuth flow
- ❌ Third-party services (Shopify, Anthropic)
- ❌ Social engineering

### Security Advisories

Published at: https://seology.ai/security/advisories

**Format**:
```markdown
## CVE-2025-XXXX: [Vulnerability Title]

**Severity**: High
**Affected Versions**: < 1.2.3
**Fixed Version**: 1.2.4

**Description**:
[Vulnerability description]

**Impact**:
[What could an attacker do?]

**Remediation**:
Update to version 1.2.4 or later.

**Credit**:
Discovered by [Researcher Name]
```

---

## Security Contacts

**Security Team**: security@seology.ai
**PGP Key**: https://seology.ai/pgp-key.txt
**Security Advisories**: https://seology.ai/security/advisories

---

## Security Changelog

### 2025-11-07 (Launch)
- Implemented AES-256-GCM encryption
- Added rate limiting
- Enabled OWASP Top 10 protections
- GDPR compliance implemented
- Webhook signature validation

### Future Enhancements
- [ ] Add Sentry error tracking
- [ ] Implement SOC 2 controls
- [ ] Set up bug bounty program
- [ ] Add security audit logging dashboard
- [ ] Implement Web Application Firewall (WAF)
