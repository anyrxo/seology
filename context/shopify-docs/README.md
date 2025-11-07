# Shopify App Development Documentation

This folder contains comprehensive documentation extracted from https://shopify.dev/docs/apps/build, tailored specifically for the SEOLOGY.AI Shopify integration.

## Documentation Files

1. **[01-scaffold-app.md](./01-scaffold-app.md)** - App initialization and setup
2. **[02-authentication-authorization.md](./02-authentication-authorization.md)** - OAuth, session tokens, and auth flows
3. **[03-app-bridge-library.md](./03-app-bridge-library.md)** - Shopify App Bridge SDK for embedded apps
4. **[04-app-extensions.md](./04-app-extensions.md)** - Admin extensions and surface integrations
5. **[05-webhooks.md](./05-webhooks.md)** - Webhook implementation and GDPR compliance
6. **[06-online-store-integration.md](./06-online-store-integration.md)** - Storefront API and theme integration
7. **[07-admin-graphql-api.md](./07-admin-graphql-api.md)** - GraphQL Admin API (required for public apps)
8. **[08-admin-rest-api.md](./08-admin-rest-api.md)** - REST Admin API (legacy, but currently in use)
9. **[09-distribution-launch.md](./09-distribution-launch.md)** - App distribution strategies and launch checklist
10. **[10-shopify-cli.md](./10-shopify-cli.md)** - Shopify CLI tools and commands

## How to Use This Documentation

Each file contains:
- **Official Shopify guidance** from their documentation
- **SEOLOGY.AI implementation notes** showing how we apply these concepts
- **Code examples** relevant to our project
- **Next steps** for our specific implementation

## For Claude Code Agents

These documentation files serve as knowledge bases for specialized Claude Code agents. Each agent is responsible for their specific domain and can collaborate when working on the SEOLOGY.AI Shopify app.

See [.claude/agents/shopify/](../../.claude/agents/shopify/) for agent definitions.

## Quick Reference

### Current Implementation Status

✅ **Implemented**:
- OAuth authentication (authorization code grant)
- REST Admin API usage
- App Bridge embedded in layout
- Basic onboarding flow
- Entry point routing

⚠️ **Partially Implemented**:
- App Bridge features (script loaded but not fully utilized)
- Error handling
- Rate limit management

❌ **Not Implemented Yet**:
- Session tokens (using OAuth tokens instead)
- GraphQL API (using REST)
- Webhooks (no webhook handlers)
- GDPR compliance webhooks
- App extensions
- Shopify Billing API
- Public app distribution

### Critical Priorities

1. **GraphQL Migration** - REST API is legacy, must migrate before April 2025
2. **Session Tokens** - Modern auth approach for embedded apps
3. **GDPR Webhooks** - Required for public app submission
4. **Toast Library Fix** - Currently broken, should use App Bridge
5. **Rate Limit Handling** - Proper throttling implementation

### Technical Debt

- REST API usage (should be GraphQL)
- OAuth tokens (should be session tokens)
- Missing webhooks (need GDPR handlers)
- No error boundaries
- Inconsistent loading states
- Toast library incompatibility

## Related Documentation

- [CLAUDE.md](../../CLAUDE.md) - Main project documentation
- [breakdown.txt](../../breakdown.txt) - Complete product specification
- [SHOPIFY_APP_UPDATE_GUIDE.md](../../SHOPIFY_APP_UPDATE_GUIDE.md) - Configuration guide

---

Last Updated: 2025-11-07
