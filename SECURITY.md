# SEOLOGY.AI Security Documentation

This document outlines the security measures, best practices, and guidelines for the SEOLOGY.AI application.

---

## Table of Contents

1. [Security Architecture](#security-architecture)
2. [Authentication & Authorization](#authentication--authorization)
3. [Data Protection](#data-protection)
4. [Input Validation](#input-validation)
5. [Rate Limiting](#rate-limiting)
6. [Error Handling](#error-handling)
7. [Third-Party Security](#third-party-security)
8. [Security Headers](#security-headers)
9. [Development Guidelines](#development-guidelines)
10. [Incident Response](#incident-response)
11. [Security Checklist](#security-checklist)

---

## Security Architecture

### Defense in Depth

SEOLOGY.AI implements multiple layers of security:

1. **Network Layer**: TLS/HTTPS encryption
2. **Application Layer**: Input validation, CSRF protection
3. **Authentication Layer**: Clerk authentication + API keys
4. **Authorization Layer**: Role-based access control
5. **Data Layer**: Encrypted storage, Prisma ORM
6. **Monitoring Layer**: Error logging, audit trails

### Security Principles

- **Least Privilege**: Users and services have minimum necessary permissions
- **Fail Secure**: Errors default to denying access
- **Complete Mediation**: All requests are validated
- **Defense in Depth**: Multiple security layers
- **Security by Design**: Security considered from architecture phase

---

## Authentication & Authorization

### User Authentication (Clerk)

```typescript
import { auth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Continue with authenticated request...
}
```

**Security Features:**
- ✅ Secure session management
- ✅ JWT tokens with short expiration
- ✅ Automatic token refresh
- ✅ Password strength requirements
- ✅ Email verification

### Authorization Patterns

```typescript
import { db } from '@/lib/db'
import { ForbiddenError, NotFoundError } from '@/lib/errors'

// Always verify resource ownership
const connection = await db.connection.findUnique({
  where: { id: connectionId }
})

if (!connection) {
  throw new NotFoundError('Connection')
}

if (connection.userId !== userId) {
  throw new ForbiddenError('You do not own this connection')
}
```

### Admin Access Control

```typescript
// Check admin role for sensitive operations
const user = await db.user.findUnique({
  where: { clerkId: userId }
})

if (user?.role !== 'ADMIN') {
  throw new ForbiddenError('Admin access required')
}
```

---

## Data Protection

### Encryption at Rest

All sensitive data is encrypted using **AES-256-GCM**:

```typescript
import { encrypt, decrypt } from '@/lib/encryption'

// Encrypt sensitive data before storing
const encryptedToken = encrypt(accessToken)
await db.connection.update({
  where: { id },
  data: { accessToken: encryptedToken }
})

// Decrypt when needed
const decryptedToken = decrypt(connection.accessToken)
```

**Encryption Details:**
- Algorithm: AES-256-GCM (authenticated encryption)
- Key Derivation: PBKDF2 with SHA-512, 100,000 iterations
- Salt: 64 bytes random per encryption
- IV: 16 bytes random per encryption
- Auth Tag: 16 bytes for tamper detection

### Encryption Key Management

**Environment Variable:**
```bash
# .env.local
ENCRYPTION_KEY=<64-character-hex-string>
```

**Generate Key:**
```typescript
import { generateEncryptionKey } from '@/lib/encryption'
const key = generateEncryptionKey()
// Store in environment variables
```

**Key Rotation (Recommended Quarterly):**
1. Generate new encryption key
2. Re-encrypt all sensitive data with new key
3. Update environment variable
4. Maintain old key temporarily for transition

### Encryption in Transit

- ✅ TLS 1.2+ for all HTTPS connections
- ✅ Secure WebSocket connections (WSS)
- ✅ Certificate pinning for critical APIs
- ✅ HSTS headers enforced

### Sensitive Data Handling

**DO:**
- ✅ Encrypt before storing in database
- ✅ Use environment variables for secrets
- ✅ Transmit only over HTTPS
- ✅ Log sanitized versions (mask secrets)
- ✅ Expire temporary tokens

**DON'T:**
- ❌ Store in plain text
- ❌ Log sensitive data
- ❌ Include in error messages
- ❌ Cache in browser
- ❌ Send in URL parameters

---

## Input Validation

### Zod Schema Validation

All API inputs must be validated using Zod schemas:

```typescript
import { validateShopParam, productSEOSchema } from '@/lib/validation'

export async function POST(req: NextRequest) {
  try {
    // Validate shop parameter
    const shop = validateShopParam(req.nextUrl.searchParams.get('shop'))

    // Validate request body
    const body = await req.json()
    const validated = productSEOSchema.parse(body)

    // Use validated data...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(handleZodError(error), { status: 400 })
    }
    throw error
  }
}
```

### Validation Rules

**Shopify Shop Domain:**
```typescript
shopDomainSchema // Matches: store-name.myshopify.com
```

**Object IDs (MongoDB):**
```typescript
objectIdSchema // 24 hex characters
```

**Safe Strings (XSS Prevention):**
```typescript
safeStringSchema(min, max) // Strips HTML tags
```

**URLs:**
```typescript
urlSchema // Valid URL, max 2048 chars
```

### SQL Injection Prevention

**DO (Prisma ORM):**
```typescript
✅ await db.user.findUnique({ where: { id: userId } })
✅ await db.connection.findMany({ where: { userId } })
```

**DON'T (Raw SQL):**
```typescript
❌ await db.$queryRaw`SELECT * FROM users WHERE id = ${userId}`
```

### XSS Prevention

```typescript
import { sanitizeHTML } from '@/lib/validation'

// Sanitize user-generated HTML
const cleanContent = sanitizeHTML(userInput)
```

**React Automatic Escaping:**
```tsx
// React automatically escapes values
<div>{userInput}</div> // ✅ Safe

// Dangerous HTML (avoid)
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // ❌ Dangerous
```

---

## Rate Limiting

### Implementation

```typescript
import { rateLimit, RateLimits, getClientIdentifier } from '@/lib/rate-limiter'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  const identifier = getClientIdentifier(req, userId)

  // Apply rate limit
  await rateLimit(identifier, RateLimits.API_GLOBAL)

  // Continue with request...
}
```

### Rate Limit Configurations

| Endpoint Type | Limit | Window | Purpose |
|--------------|-------|--------|---------|
| **Global API** | 100 requests | 1 minute | Prevent API abuse |
| **Authentication** | 5 requests | 1 minute | Prevent brute force |
| **Shopify API** | 2 requests | 50ms | Respect Shopify limits |
| **Claude AI** | 5 requests | 1 minute | Control AI costs |
| **File Upload** | 10 uploads | 1 minute | Prevent storage abuse |
| **Webhooks** | 1000 requests | 1 minute | Allow high throughput |

### Shopify Rate Limiting

```typescript
import { getShopifyRateLimiter } from '@/lib/rate-limiter'

const limiter = getShopifyRateLimiter(shop)
await limiter.waitForAvailableCall()

const response = await fetch(shopifyApiUrl, { headers })
limiter.updateFromHeaders(response.headers)
```

### Claude AI Rate Limiting

```typescript
import { ClaudeRateLimiter } from '@/lib/rate-limiter'

await ClaudeRateLimiter.waitForSlot(userId)
const response = await callClaudeAPI(prompt)
```

---

## Error Handling

### API Error Responses

```typescript
import { toNextResponse, successResponse } from '@/lib/errors'

export async function GET(req: NextRequest) {
  try {
    const data = await fetchData()
    return successResponse(data)
  } catch (error) {
    return toNextResponse(error as Error)
  }
}
```

### Custom Error Types

```typescript
import {
  UnauthorizedError,
  ValidationError,
  NotFoundError,
  RateLimitError
} from '@/lib/errors'

// Authentication error
if (!userId) {
  throw new UnauthorizedError('Please sign in to continue')
}

// Validation error
if (!isValid(input)) {
  throw new ValidationError('Invalid input format', { field: 'email' })
}

// Resource not found
if (!resource) {
  throw new NotFoundError('Resource')
}

// Rate limit exceeded
if (overLimit) {
  throw new RateLimitError('Too many requests', retryAfter)
}
```

### React Error Boundaries

```tsx
import { ErrorBoundary, FeatureErrorBoundary } from '@/components/ErrorBoundary'

// Full page error boundary
export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  )
}

// Feature-level error boundary
export function DashboardWidget() {
  return (
    <FeatureErrorBoundary featureName="Analytics Dashboard">
      <AnalyticsChart />
    </FeatureErrorBoundary>
  )
}
```

### Error Logging

```typescript
import { logError } from '@/lib/errors'

try {
  await riskyOperation()
} catch (error) {
  logError(error as Error, {
    userId,
    operation: 'riskyOperation',
    additionalContext: {...}
  })
  throw error
}
```

---

## Third-Party Security

### Shopify Integration

**HMAC Verification (OAuth Callback):**
```typescript
import { verifyShopifyHMAC } from '@/lib/shopify-hmac'

const isValid = verifyShopifyHMAC(queryParams, SHOPIFY_CLIENT_SECRET)
if (!isValid) {
  throw new HMACVerificationError()
}
```

**Webhook Signature Verification:**
```typescript
import { verifyShopifyWebhook } from '@/lib/shopify-hmac'

const hmac = req.headers.get('x-shopify-hmac-sha256')
const body = await req.text()

const isValid = verifyShopifyWebhook(body, hmac, SHOPIFY_CLIENT_SECRET)
if (!isValid) {
  throw new WebhookSignatureError()
}
```

### Stripe Integration

**Webhook Signature Verification:**
```typescript
import { stripe } from '@/lib/stripe'

const signature = req.headers.get('stripe-signature')
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  STRIPE_WEBHOOK_SECRET
)
```

### Claude AI Integration

**API Key Protection:**
```typescript
// ✅ DO: Store in environment variable
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

// ❌ DON'T: Hardcode API key
const anthropic = new Anthropic({
  apiKey: 'sk-ant-...' // NEVER DO THIS
})
```

---

## Security Headers

### Recommended Next.js Configuration

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

---

## Development Guidelines

### Secure Coding Practices

**1. Always Validate Input:**
```typescript
❌ const shop = req.query.shop
✅ const shop = validateShopParam(req.query.shop)
```

**2. Verify Resource Ownership:**
```typescript
❌ const connection = await db.connection.findUnique({ where: { id } })
✅ const connection = await db.connection.findUnique({
     where: { id, userId }
   })
```

**3. Use Prepared Statements:**
```typescript
❌ await db.$queryRaw`SELECT * FROM users WHERE email = '${email}'`
✅ await db.user.findUnique({ where: { email } })
```

**4. Sanitize Output:**
```typescript
❌ <div dangerouslySetInnerHTML={{ __html: userInput }} />
✅ <div>{userInput}</div>
```

**5. Rate Limit All Endpoints:**
```typescript
❌ export async function POST(req) { ... }
✅ export async function POST(req) {
     await rateLimit(getClientIdentifier(req), RateLimits.API_GLOBAL)
     ...
   }
```

### Code Review Checklist

Before merging any code, verify:

- [ ] All user inputs are validated with Zod schemas
- [ ] Database queries use Prisma ORM (no raw SQL)
- [ ] Authentication is checked on protected routes
- [ ] Resource ownership is verified
- [ ] Rate limiting is applied
- [ ] Sensitive data is encrypted before storage
- [ ] Error handling is implemented with try/catch
- [ ] No secrets are hardcoded or logged
- [ ] CSRF protection is applied to state-changing endpoints
- [ ] Third-party API signatures are verified

---

## Incident Response

### Security Incident Procedure

**1. Detect & Assess:**
- Monitor error logs and security alerts
- Assess impact and severity
- Identify affected systems and data

**2. Contain:**
- Isolate affected systems
- Revoke compromised credentials
- Block malicious IP addresses
- Enable additional rate limiting

**3. Eradicate:**
- Remove malicious code or access
- Patch vulnerabilities
- Update dependencies
- Rotate compromised keys

**4. Recover:**
- Restore from clean backups
- Verify system integrity
- Monitor for recurring issues
- Gradually restore services

**5. Post-Incident:**
- Document incident timeline
- Conduct root cause analysis
- Update security measures
- Notify affected parties (if required)

### Emergency Contacts

- **Security Team:** security@seology.ai
- **On-Call Engineer:** +1-XXX-XXX-XXXX
- **Incident Response:** incidents@seology.ai

### Reporting Security Vulnerabilities

**Email:** security@seology.ai

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any proof-of-concept code

**Response Time:**
- Initial response: 24 hours
- Status update: 48 hours
- Fix deployment: Based on severity

---

## Security Checklist

### Pre-Deployment Checklist

**Environment Variables:**
- [ ] `ENCRYPTION_KEY` set (64-char hex)
- [ ] `SHOPIFY_CLIENT_SECRET` set
- [ ] `STRIPE_SECRET_KEY` set
- [ ] `STRIPE_WEBHOOK_SECRET` set
- [ ] `ANTHROPIC_API_KEY` set
- [ ] `CRON_SECRET` set (32+ chars)
- [ ] No `.env` files committed to git
- [ ] All secrets in secure storage (Vercel, AWS Secrets Manager)

**Security Headers:**
- [ ] HSTS enabled
- [ ] CSP configured
- [ ] X-Frame-Options set
- [ ] X-Content-Type-Options set
- [ ] X-XSS-Protection enabled

**Authentication:**
- [ ] Clerk configured correctly
- [ ] Session expiration set
- [ ] MFA available for admins
- [ ] Password requirements enforced

**API Security:**
- [ ] Rate limiting on all endpoints
- [ ] Input validation on all endpoints
- [ ] Authentication on protected routes
- [ ] CORS configured correctly
- [ ] Error handling implemented

**Data Protection:**
- [ ] Encryption at rest enabled
- [ ] TLS/HTTPS enforced
- [ ] Sensitive data not logged
- [ ] Database backups encrypted
- [ ] Access logs sanitized

**Monitoring:**
- [ ] Error tracking (Sentry) configured
- [ ] Audit logs enabled
- [ ] Security alerts set up
- [ ] Log aggregation configured
- [ ] Uptime monitoring active

### Regular Security Tasks

**Daily:**
- Monitor error logs
- Review rate limit hits
- Check security alerts

**Weekly:**
- Review audit logs
- Check for failed login attempts
- Monitor API usage patterns

**Monthly:**
- Review user permissions
- Update dependencies
- Check SSL certificate expiration
- Review firewall rules

**Quarterly:**
- Rotate encryption keys
- Security audit
- Penetration testing
- Security training

---

## Security Contacts

**Security Team:** security@seology.ai
**Bug Bounty Program:** (Coming soon)
**Security Advisories:** https://github.com/seology-ai/security-advisories

---

**Last Updated:** 2025-11-06
**Next Review:** 2026-02-06
