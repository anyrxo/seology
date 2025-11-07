# Shopify CLI Integration with Next.js

**Agent**: CLI SPECIALIST
**Status**: ✅ Documentation Complete
**Priority**: LOW (Optional tool, not required for app functionality)

---

## What is Shopify CLI?

Shopify CLI is the official command-line tool for building Shopify apps. It provides:
- Local development server with tunneling
- Extension scaffolding
- Deployment tools
- GraphQL introspection
- Testing utilities

**Documentation**: `context/shopify-docs/10-shopify-cli.md`

---

## Our Current Setup (Without CLI)

We built a Next.js app **independently** of Shopify CLI:
- Next.js 14 App Router
- Custom OAuth flow
- Manual webhook registration
- Vercel deployment

**This works perfectly fine!** ✅

---

## CLI vs Custom Approach

### Our Custom Approach (Current)

**Pros**:
- ✅ Full control over architecture
- ✅ No vendor lock-in
- ✅ Flexible deployment (Vercel, AWS, etc.)
- ✅ Familiar Next.js patterns
- ✅ Already working and tested

**Cons**:
- ⚠️ Manual webhook registration
- ⚠️ Manual tunnel for local testing (ngrok)
- ⚠️ More setup required for extensions

### Shopify CLI Approach

**Pros**:
- ✅ Built-in local tunnel
- ✅ Automatic webhook registration
- ✅ Extension scaffolding
- ✅ GraphQL introspection
- ✅ Testing utilities

**Cons**:
- ❌ Opinionated structure
- ❌ Requires Remix or React (not compatible with Next.js App Router out-of-the-box)
- ❌ Less flexible
- ❌ Additional dependency

---

## Hybrid Approach (Recommended)

Use Shopify CLI **selectively** for specific tasks:

### Use CLI For:
1. ✅ **GraphQL introspection** - Generate TypeScript types
2. ✅ **Extension development** - If we build extensions
3. ✅ **Local tunneling** - Alternative to ngrok

### Don't Use CLI For:
1. ❌ **App architecture** - Keep our Next.js App Router
2. ❌ **Deployment** - Continue using Vercel
3. ❌ **OAuth flow** - Our custom implementation is fine

---

## Setup Guide

### Installation

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/app

# Verify installation
shopify version
```

### Configuration

```bash
# Initialize Shopify config (optional)
shopify app init

# Follow prompts (choose "custom" app type)
```

**File created**: `shopify.app.toml`

```toml
# shopify.app.toml
name = "seology-ai"
client_id = "YOUR_CLIENT_ID"
application_url = "https://seology.ai"
embedded = true

[webhooks]
api_version = "2025-10"

[[webhooks.subscriptions]]
topics = ["products/update"]
uri = "/api/webhooks/shopify/products/update"

[[webhooks.subscriptions]]
topics = ["app/uninstalled"]
uri = "/api/webhooks/shopify/app/uninstalled"

# ... more webhooks
```

---

## CLI Commands We Can Use

### 1. GraphQL Introspection

**Use Case**: Generate TypeScript types from Shopify's GraphQL schema

```bash
# Download schema
shopify app generate schema

# Generates: graphql.schema.json
```

**Use with** [GraphQL Code Generator](https://the-guild.dev/graphql/codegen):

```bash
# Install codegen
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript

# Generate types
npm run codegen
```

**codegen.yml**:
```yaml
schema: ./graphql.schema.json
generates:
  ./types/shopify-graphql.ts:
    plugins:
      - typescript
      - typescript-operations
```

**Result**: Fully typed GraphQL queries! 🎉

---

### 2. Local Development with Tunnel

**Use Case**: Test webhooks locally without ngrok

```bash
# Start Next.js dev server
npm run dev

# In another terminal, start Shopify tunnel
shopify app tunnel --port 3000
```

**What happens**:
- Shopify CLI creates a public URL (e.g., `https://abc123.cloudflare.dev`)
- Forwards requests to `localhost:3000`
- Updates webhook URLs automatically
- Closes tunnel when you exit

**Benefit**: No need for ngrok subscription!

---

### 3. Extension Development

**Use Case**: Build Shopify Admin extensions (if we decide to)

```bash
# Create extension
shopify app extension create

# Develop extension
shopify app dev

# Deploy extension
shopify app deploy
```

**See**: `06-extension-specification.md` for details

---

### 4. Environment Management

**Use Case**: Switch between dev/staging/production

```bash
# List environments
shopify app env list

# Switch environment
shopify app env pull --env production

# Push changes
shopify app env push --env staging
```

---

## Integration with Our Next.js App

### Option 1: Side-by-Side (Recommended)

Keep our Next.js app **unchanged**, use CLI only for specific tasks:

```
seology-ai/
├── app/                  # Next.js App Router (unchanged)
├── lib/                  # Our libraries (unchanged)
├── shopify.app.toml      # CLI config (new)
├── extensions/           # Extensions (if we build them)
└── package.json
```

**Commands**:
```bash
# Development
npm run dev  # Next.js (as usual)
shopify app tunnel --port 3000  # Optional tunnel

# GraphQL types
shopify app generate schema
npm run codegen

# Extensions (if needed)
shopify app extension create
shopify app dev
```

---

### Option 2: Full CLI Integration (Not Recommended)

Rewrite app to use Shopify CLI structure:
- Requires Remix or React (no Next.js App Router)
- Significant refactoring
- Loss of Vercel deployment benefits

**Our Verdict**: ❌ Not worth it!

---

## Specific Use Cases

### Use Case 1: Generate GraphQL Types

**Problem**: We're writing GraphQL queries without type safety

**Solution**: Use CLI to generate types

```bash
# 1. Download Shopify's GraphQL schema
shopify app generate schema

# 2. Install GraphQL Codegen
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript

# 3. Create codegen.yml
cat > codegen.yml << EOF
schema: ./graphql.schema.json
documents: "lib/**/*.ts"
generates:
  types/shopify-graphql-types.ts:
    plugins:
      - typescript
      - typescript-operations
EOF

# 4. Generate types
npx graphql-codegen

# 5. Use in code
import { GetProductQuery } from '@/types/shopify-graphql-types'

const query: GetProductQuery = `query { ... }`
```

---

### Use Case 2: Local Webhook Testing

**Problem**: Need ngrok to test webhooks locally

**Solution**: Use Shopify CLI tunnel

```bash
# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start tunnel
shopify app tunnel --port 3000

# CLI will:
# 1. Create public URL
# 2. Forward to localhost:3000
# 3. Update webhook URLs automatically
# 4. Show incoming requests in real-time
```

**Output**:
```
✓ Tunnel running at: https://abc123.cloudflare.dev
✓ Webhooks updated
✓ Forwarding to localhost:3000

Incoming requests:
[POST] /api/webhooks/shopify/products/update
[POST] /api/webhooks/shopify/app/uninstalled
```

---

### Use Case 3: Extension Development

**Problem**: Want to build Shopify Admin extensions

**Solution**: Use CLI to scaffold and deploy

```bash
# Create extension
shopify app extension create
# Choose: admin_action
# Name: bulk-seo-optimizer

# Develop with live reload
shopify app dev

# Deploy to production
shopify app deploy
```

**See**: `06-extension-specification.md`

---

## CLI Configuration

### shopify.app.toml

```toml
# Core app config
name = "seology-ai"
client_id = "YOUR_CLIENT_ID"  # From Partners Dashboard
application_url = "https://seology.ai"
embedded = true

# App proxy (if needed)
[app_proxy]
url = "https://seology.ai/api/proxy"
subpath = "apps/seology"
prefix = "apps"

# Webhooks config
[webhooks]
api_version = "2025-10"

[[webhooks.subscriptions]]
topics = ["products/update"]
uri = "/api/webhooks/shopify/products/update"

[[webhooks.subscriptions]]
topics = ["products/delete"]
uri = "/api/webhooks/shopify/products/delete"

[[webhooks.subscriptions]]
topics = ["app/uninstalled"]
uri = "/api/webhooks/shopify/app/uninstalled"

[[webhooks.subscriptions]]
topics = ["customers/data_request"]
uri = "/api/webhooks/shopify/gdpr/customers-data-request"

[[webhooks.subscriptions]]
topics = ["customers/redact"]
uri = "/api/webhooks/shopify/gdpr/customers-redact"

[[webhooks.subscriptions]]
topics = ["shop/redact"]
uri = "/api/webhooks/shopify/gdpr/shop-redact"

# Scopes
[auth]
scopes = "read_products,write_products,read_content,write_content,read_online_store_pages,write_online_store_pages"
```

---

## Development Workflow

### Without CLI (Current)
```bash
# 1. Start Next.js
npm run dev

# 2. Start ngrok (for webhooks)
ngrok http 3000

# 3. Update webhook URLs in Partners Dashboard
# Manually copy ngrok URL

# 4. Test webhooks
curl -X POST https://abc.ngrok.io/api/webhooks/...
```

### With CLI (Optional)
```bash
# 1. Start Next.js
npm run dev

# 2. Start CLI tunnel
shopify app tunnel --port 3000

# CLI automatically:
# - Creates public URL
# - Updates webhooks
# - Forwards requests

# 3. Test webhooks (they just work!)
```

---

## CLI Commands Reference

### App Management
```bash
shopify app init            # Initialize new app
shopify app info            # Show app details
shopify app config link     # Link to existing app
```

### Development
```bash
shopify app dev             # Start dev server + tunnel
shopify app tunnel          # Just tunnel (if you have your own server)
shopify app generate schema # Download GraphQL schema
```

### Extensions
```bash
shopify app extension create       # Create new extension
shopify app extension push         # Deploy extension
shopify app extension build        # Build extension
```

### Deployment
```bash
shopify app deploy          # Deploy to Shopify
shopify app release         # Release new version
```

### Environment
```bash
shopify app env list        # List environments
shopify app env pull        # Pull env config
shopify app env push        # Push env config
```

---

## Decision Matrix

| Feature | Custom Approach | Shopify CLI | Our Choice |
|---------|----------------|-------------|------------|
| **Local dev** | Next.js dev server | CLI dev server | ✅ Custom |
| **Tunneling** | ngrok | CLI tunnel | ⚠️ CLI (optional) |
| **Webhooks** | Manual registration | Auto registration | ✅ Custom |
| **GraphQL types** | Manual | CLI codegen | ✅ CLI |
| **Extensions** | N/A | CLI scaffold | ⏳ CLI (if needed) |
| **Deployment** | Vercel | CLI deploy | ✅ Custom |
| **Architecture** | Next.js App Router | Remix/React | ✅ Custom |

---

## Recommendation

**Should we use Shopify CLI?**

**Yes, but selectively**:
1. ✅ Use for GraphQL type generation
2. ✅ Use for local tunneling (alternative to ngrok)
3. ✅ Use for extensions (if we build them)
4. ❌ Don't restructure our Next.js app for it
5. ❌ Don't use for deployment (keep Vercel)

**Bottom Line**: CLI is a useful **tool**, not a required **framework**.

---

## Setup Steps (Optional)

If you want to add CLI support:

```bash
# 1. Install CLI
npm install -g @shopify/cli @shopify/app

# 2. Create shopify.app.toml
shopify app init

# 3. Link to existing app
shopify app config link

# 4. Test tunnel
shopify app tunnel --port 3000

# 5. Generate GraphQL types (optional)
shopify app generate schema
# Then set up graphql-codegen
```

---

## Resources

- **CLI Docs**: https://shopify.dev/docs/apps/tools/cli
- **Context Doc**: `context/shopify-docs/10-shopify-cli.md`
- **Tutorial**: https://shopify.dev/docs/apps/build/cli
- **GitHub**: https://github.com/Shopify/cli

---

## Summary

**Do we need Shopify CLI?** ❌ No, our custom Next.js app works great!

**Should we use it?** ⏳ Maybe, for specific tasks:
- GraphQL type generation
- Local tunneling (ngrok alternative)
- Extension development (if we build extensions)

**Our Approach**: Hybrid - use CLI as a tool, not a framework. Our Next.js app remains independent.
