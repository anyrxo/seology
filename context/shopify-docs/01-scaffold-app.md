# Scaffolding Shopify Apps: Complete Guide

**Source**: https://shopify.dev/docs/apps/build/scaffold-app

---

## Overview
The scaffolding process uses Shopify CLI to initialize a new app with starter code and establish a local development environment connected to a dev store.

## Key Requirements
- User account with app development permissions
- Created development store
- Latest Shopify CLI version installed
- Current Chrome or Firefox browser

## Step 1: Create New App

**Command:**
```bash
shopify app init
```

When prompted, select **"Build a React Router app"** to use the React Router template. This provides a complete foundation with all necessary dependencies for Shopify app development.

Alternative options include extension-only apps or custom templates, though React Router is recommended for most use cases.

## Step 2: Start Local Development Server

**Navigate to app directory:**
```bash
cd my-new-app
```

**Start development server:**
```bash
shopify app dev
```

### What Shopify CLI Handles:
- Developer account authentication (Partner or merchant account)
- App creation in Dev Dashboard with local code connection
- Prisma SQLite database initialization
- Cloudflare tunnel creation for HTTPS access

The tunnel enables your local app to be accessed via secure URL, essential for testing embedded admin features.

## Step 3: Install App on Dev Store

1. Press `p` while server runs to open preview URL in browser
2. Click **"Install app"** when prompted
3. Click **"Generate a product"** from app home page to populate test data

## Important Notes

**Staff Account Requirement:** You must be the development store owner or have an active staff account to use the store with Shopify CLI. Store owners are automatically assigned when creating new dev stores.

**Theme Support:** The React Router template includes application storage through Prisma SQLite, eliminating external database requirements for initial development.

## Next Steps
Follow the "Build a Shopify app using React Router" tutorial for adding features using Shopify tools and libraries, then proceed to deployment and distribution documentation.

---

## SEOLOGY.AI Implementation Notes

**Current Status**: We are NOT using the standard Shopify CLI scaffolding approach. Instead, we're building a custom Next.js 14 app that integrates with Shopify.

**Our Approach**:
- Next.js 14 App Router (not Remix/React Router)
- Custom OAuth flow implementation
- Manual App Bridge integration
- PostgreSQL database (not SQLite)

**Why Custom**: SEOLOGY.AI needs to support multiple CMS platforms (Shopify, WordPress, custom sites), so we built a platform-agnostic architecture with Shopify as one integration.

**Key Differences**:
- We don't use `shopify app dev` - we use `npm run dev`
- We don't use Shopify CLI for deployment - we use Vercel
- We manually configured OAuth in Shopify Partners dashboard
- We manually integrated App Bridge via script tag

**What We Can Learn**:
- Their tunnel approach (we can use Vercel preview URLs for testing)
- Their database approach (we have a more robust PostgreSQL setup)
- Their authentication approach (we should follow their OAuth best practices)
