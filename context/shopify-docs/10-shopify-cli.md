# Shopify CLI for Apps: Comprehensive Guide

**Source**: https://shopify.dev/docs/apps/tools/cli

---

## Overview

Shopify CLI is a command-line tool designed to accelerate app development. It "quickly generates Shopify apps and generates app extensions" while automating common development tasks.

## Key Features

The tool provides several core capabilities:
- Creates new apps using pre-built templates
- Generates app extensions within your project
- Creates app records in the Dev Dashboard
- Builds applications and extensions with tunnel preview functionality for dev stores
- Deploys app configuration and extensions
- Enables searching the Shopify developer documentation

## Requirements

To use Shopify CLI effectively, you need:
- The latest version of Shopify CLI installed
- Current versions of Chrome or Firefox browsers

## Getting Started

Initialize your app using the conventional directory structure:

```bash
shopify app init
```

You can specify templates with the `--template` flag, either using Shopify's built-in templates or GitHub-hosted custom templates.

## Installation Methods

### Global Installation (Recommended)

Global installation provides a single install point for all Shopify development work:

```bash
# Remove from local dependencies
npm uninstall -D @shopify/cli @shopify/app

# Install globally, then invoke directly
shopify app generate extension
```

### Local Dependency Installation

For team synchronization or multiple CLI versions across projects:

```bash
npm install -D @shopify/cli
npm run shopify app generate extension
```

Note: As of version 3.59.0, the `@shopify/app` package is bundled with `@shopify/cli`.

## Core Functionality

**App Structure**: Applications follow a conventional directory layout enabling integrated development of web apps and extensions simultaneously.

**CI/CD Integration**: The `deploy` command integrates into CI/CD pipelines for programmatic app component deployment.

**Migration Path**: Existing Dev Dashboard-managed apps can be imported for CLI management.

## Usage Tracking

Anonymous usage statistics are collected by default. Opt out using:
```bash
SHOPIFY_CLI_NO_ANALYTICS=1
```

## Support Resources

- **GitHub Issues**: Report bugs or request features in the [Shopify CLI repository](https://github.com/shopify/cli/issues)
- **.dev Community**: Connect with developers in the official forums

## Command Reference

Access the complete command documentation for [Shopify CLI app commands](https://shopify.dev/docs/api/shopify-cli/app).

---

## SEOLOGY.AI & Shopify CLI

### Current Status: NOT Using Shopify CLI

We built SEOLOGY.AI with **custom Next.js 14** instead of Shopify CLI templates.

**Why**:
1. **Multi-platform support**: We support Shopify, WordPress, and custom sites
2. **Full control**: Custom architecture for our needs
3. **Modern stack**: Next.js 14 App Router, Tailwind, Prisma
4. **Vercel deployment**: Optimized for Vercel, not Shopify hosting

### What We're Missing Without CLI

❌ **Automatic tunneling**: No `shopify app dev` with automatic HTTPS tunnel
❌ **Extension scaffolding**: Can't use `shopify app generate extension`
❌ **Quick deployment**: No `shopify app deploy` command
❌ **Partner Dashboard sync**: Manual OAuth configuration
❌ **Built-in dev tools**: No CLI shortcuts for common tasks

### What We Have Instead

✅ **Vercel Preview URLs**: Acts as our "tunnel" for testing
✅ **Custom architecture**: More flexible than CLI templates
✅ **Full TypeScript**: Complete type safety
✅ **Modern React**: Next.js 14 App Router
✅ **Better database**: PostgreSQL instead of SQLite

### Should We Use Shopify CLI?

**For Extensions**: YES - if/when we build extensions

**For Main App**: NO - we have a working custom solution

### Hybrid Approach (Recommended)

Keep our Next.js app, but ADD Shopify CLI for extensions:

```
seology-ai/
├── app/                    # Next.js app (our custom code)
├── lib/                    # Shared libraries
├── extensions/             # Shopify CLI managed
│   └── admin-action/
│       ├── shopify.extension.toml
│       └── src/
│           └── ActionExtension.tsx
├── shopify.app.toml       # CLI config (extensions only)
└── package.json
```

**How this works**:
1. Main app runs with `npm run dev` (Next.js)
2. Extensions managed with `shopify app dev` (separate terminal)
3. Main app deploys to Vercel
4. Extensions deploy via `shopify app deploy`

### Installing Shopify CLI (When We Need It)

```bash
# Global installation
npm install -g @shopify/cli

# Verify installation
shopify version

# Login to Shopify Partners
shopify login

# In project directory, initialize for extensions only
shopify app generate extension
```

### Commands We Would Use

```bash
# Generate a new extension
shopify app generate extension

# Start development server (for extensions)
shopify app dev

# Deploy extensions to Shopify
shopify app deploy

# View extension logs
shopify app logs

# Open app in Partners dashboard
shopify app open
```

### Testing Without CLI

**Current Approach**:
1. Develop locally with `npm run dev`
2. Deploy to Vercel preview: `vercel --prod`
3. Update Shopify Partners dashboard with new URL
4. Test in Shopify Admin

**It works, but CLI would streamline this!**

### When We'll Need Shopify CLI

**Phase 1** (Now): Not needed - main app works fine
**Phase 2** (Extensions): NEEDED - for admin actions, widgets, etc.
**Phase 3** (Public Launch): NEEDED - for proper extension deployment

### Key Takeaway

Shopify CLI is **essential for extensions** but **optional for embedded apps**. Our custom Next.js approach works well for the main app, but we'll need CLI when we add extensions for better merchant UX.

**Recommendation**: Install CLI and learn it, but don't rewrite our app to use it. Use CLI alongside our custom app for extension management.
