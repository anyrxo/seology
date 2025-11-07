# SEOLOGY.AI Shopify Specialists

This directory contains 8 specialized Claude Code agents for building and maintaining the SEOLOGY.AI Shopify integration. Each agent is an expert in a specific domain of Shopify app development and collaborates with other agents to deliver a complete solution.

## Agent Architecture

### Design Philosophy

Each agent follows these principles:
1. **Single Responsibility**: Expert in one specific domain
2. **Knowledge Source**: References specific documentation files
3. **Collaboration**: Proactively suggests working with other specialists
4. **Practical Examples**: Includes real code examples for SEOLOGY.AI
5. **Checklists**: Provides validation checklists before completing work

### Agent Network

```
┌─────────────────────────────────────────────────────────────┐
│                     SEOLOGY.AI Shopify App                  │
└─────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
    ┌─────▼─────┐      ┌─────▼─────┐      ┌─────▼─────┐
    │   Auth    │      │ App Bridge│      │  GraphQL  │
    │ Specialist│◄────►│ Specialist│◄────►│ Specialist│
    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
          │                   │                   │
          │            ┌──────┴──────┐           │
          │            │             │           │
    ┌─────▼─────┐ ┌───▼────┐  ┌────▼───┐ ┌─────▼─────┐
    │  Webhook  │ │  REST  │  │Extension│ │   Launch  │
    │ Specialist│ │Specialist│ │Specialist│ │ Specialist│
    └─────┬─────┘ └────────┘  └────┬────┘ └─────▲─────┘
          │                         │            │
          └──────────┬──────────────┘            │
                     │                           │
                ┌────▼────┐                      │
                │   CLI   │──────────────────────┘
                │Specialist│
                └─────────┘
```

## The 8 Specialists

### 1. Authentication Specialist
**File**: `auth-specialist.md`
**Expertise**: OAuth flows, session tokens, access scopes, token management
**Knowledge Source**: `context/shopify-docs/02-authentication-authorization.md`

**Key Responsibilities**:
- Implement OAuth 2.0 authorization code grant flow
- Session token management with App Bridge
- HMAC verification for security
- Multi-store authentication handling

**When to Invoke**:
- Setting up Shopify OAuth
- Debugging authentication issues
- Implementing session token flows
- Managing access scopes

**Example Usage**:
```bash
# In Claude Code
"I need to implement Shopify OAuth for SEOLOGY.AI"
# Claude will invoke auth-specialist agent
```

---

### 2. App Bridge Specialist
**File**: `app-bridge-specialist.md`
**Expertise**: App Bridge SDK, embedded app UI, session tokens, Shopify admin integration
**Knowledge Source**: `context/shopify-docs/03-app-bridge-library.md`

**Key Responsibilities**:
- Initialize App Bridge in Next.js
- Implement Toast notifications and Modals
- Use ResourcePicker for Shopify resources
- Handle loading states and navigation

**When to Invoke**:
- Building embedded Shopify app UI
- Adding App Bridge components
- Implementing session token authentication
- Creating native-feeling admin experiences

**Collaborates With**:
- auth-specialist (session tokens)
- extension-specialist (UI consistency)
- graphql-specialist (authenticated requests)

---

### 3. GraphQL API Specialist
**File**: `graphql-specialist.md`
**Expertise**: Admin GraphQL API, bulk operations, rate limits, metafields
**Knowledge Source**: `context/shopify-docs/07-admin-graphql-api.md`

**Key Responsibilities**:
- Design efficient GraphQL queries
- Implement mutations for updates
- Handle bulk operations for large datasets
- Manage rate limits and query costs

**When to Invoke**:
- Querying Shopify product/page data
- Updating product SEO fields
- Bulk operations on 100+ items
- Optimizing API performance

**Collaborates With**:
- rest-specialist (migration planning)
- webhook-specialist (GraphQL webhook registration)
- auth-specialist (authenticated queries)

---

### 4. REST API Specialist
**File**: `rest-specialist.md`
**Expertise**: Admin REST API, rate limiting, pagination, legacy endpoints
**Knowledge Source**: `context/shopify-docs/08-admin-rest-api.md`

**Key Responsibilities**:
- Implement REST API calls
- Handle bucket-based rate limits
- Implement pagination with page_info
- Plan migration to GraphQL

**When to Invoke**:
- Working with legacy REST endpoints
- Debugging rate limit issues
- Planning REST to GraphQL migration
- Maintaining backwards compatibility

**Collaborates With**:
- graphql-specialist (migration strategy)
- auth-specialist (token management)
- webhook-specialist (API consistency)

---

### 5. Webhook Specialist
**File**: `webhook-specialist.md`
**Expertise**: Webhooks, HMAC verification, GDPR compliance, event-driven architecture
**Knowledge Source**: `context/shopify-docs/05-webhooks.md`

**Key Responsibilities**:
- Register webhooks via GraphQL/REST
- Verify HMAC signatures for security
- Implement GDPR mandatory webhooks
- Handle webhook retries and idempotency

**When to Invoke**:
- Setting up Shopify webhooks
- Implementing GDPR compliance
- Building event-driven SEO automation
- Debugging webhook issues

**Collaborates With**:
- auth-specialist (HMAC verification)
- graphql-specialist (webhook registration)
- launch-specialist (GDPR compliance for review)

---

### 6. Extension Specialist
**File**: `extension-specialist.md`
**Expertise**: Admin extensions, bulk actions, dashboard widgets, extension APIs
**Knowledge Source**: `context/shopify-docs/04-app-extensions.md`

**Key Responsibilities**:
- Create admin action extensions
- Build dashboard widgets
- Implement product/order editor extensions
- Configure extension TOML files

**When to Invoke**:
- Creating Shopify admin extensions
- Adding bulk actions to products
- Building dashboard analytics cards
- Implementing inline product editor features

**Collaborates With**:
- app-bridge-specialist (UI consistency)
- cli-specialist (extension scaffolding)
- graphql-specialist (data fetching)

---

### 7. Launch Specialist
**File**: `launch-specialist.md`
**Expertise**: App distribution, app review, Built for Shopify, billing integration
**Knowledge Source**: `context/shopify-docs/09-distribution-launch.md`

**Key Responsibilities**:
- Prepare app for Shopify review
- Implement Shopify billing API
- Create demo store for reviewers
- Optimize app listing
- Coordinate production deployment

**When to Invoke**:
- Preparing for app launch
- Implementing Shopify billing
- Creating app store listing
- Pursuing Built for Shopify certification

**Collaborates With**:
- ALL specialists (coordinates review readiness)
- webhook-specialist (GDPR compliance)
- auth-specialist (security audit)

---

### 8. CLI Specialist
**File**: `cli-specialist.md`
**Expertise**: Shopify CLI, app scaffolding, extension generation, deployment
**Knowledge Source**: `context/shopify-docs/10-shopify-cli.md`

**Key Responsibilities**:
- Set up Shopify CLI
- Generate app and extension scaffolding
- Run local development server
- Deploy to production

**When to Invoke**:
- Setting up new Shopify app project
- Generating extension templates
- Running local development environment
- Deploying app to production

**Collaborates With**:
- extension-specialist (extension generation)
- launch-specialist (production deployment)
- auth-specialist (OAuth setup)

## How to Use These Agents

### Method 1: Direct Invocation (in Claude Code)
Simply mention the agent's domain in your request:

```
"I need to implement Shopify OAuth authentication"
→ Claude invokes auth-specialist

"Help me create a bulk action extension for products"
→ Claude invokes extension-specialist + cli-specialist

"How do I handle the shop/redact webhook?"
→ Claude invokes webhook-specialist
```

### Method 2: Explicit Agent Call
Use the Task tool to invoke a specific agent:

```typescript
// In Claude Code interface
Task(subagent_type="shopify-auth-specialist")
```

### Method 3: Agent Collaboration
Agents proactively collaborate. For example:

1. You ask: "Build a complete Shopify integration"
2. launch-specialist coordinates the architecture
3. auth-specialist implements OAuth
4. app-bridge-specialist builds embedded UI
5. graphql-specialist handles data queries
6. webhook-specialist sets up event handling
7. extension-specialist creates admin actions
8. cli-specialist generates and deploys

## Agent Workflow Example

### Scenario: "Add a bulk product SEO fix feature"

```
User: "I want to add a bulk action to fix SEO for selected products in Shopify admin"

Claude: [Analyzes request, identifies needed agents]

1. CLI Specialist:
   - Generates extension scaffolding
   - Creates shopify.extension.toml

2. Extension Specialist:
   - Implements admin action extension
   - Builds UI with App Bridge components
   - Handles product selection

3. App Bridge Specialist:
   - Sets up session token authentication
   - Implements Toast notifications for feedback
   - Adds loading states

4. GraphQL Specialist:
   - Creates bulk product update mutation
   - Implements efficient query patterns
   - Handles rate limiting

5. Auth Specialist:
   - Verifies session tokens in API endpoint
   - Ensures proper scope access

6. Launch Specialist:
   - Reviews extension for review compliance
   - Adds to deployment checklist

Result: Complete bulk action extension with:
- UI in Shopify admin
- Secure authentication
- Efficient GraphQL mutations
- Production-ready deployment
```

## Agent Communication Patterns

### Handoff Pattern
One agent completes its work and explicitly hands off to another:

```
auth-specialist: "OAuth flow implemented. Recommending app-bridge-specialist
to implement session token handling in the frontend."
```

### Consultation Pattern
One agent asks another for input:

```
extension-specialist: "Need to fetch product data in extension.
Consulting graphql-specialist for optimal query pattern."
```

### Coordination Pattern
Multiple agents work in parallel:

```
launch-specialist: "Coordinating app review preparation:
- webhook-specialist: Verify GDPR webhooks
- auth-specialist: Security audit
- extension-specialist: Extension quality review"
```

## Common Multi-Agent Workflows

### 1. Initial Shopify App Setup
**Agents**: cli-specialist → auth-specialist → app-bridge-specialist

```bash
# cli-specialist: Generate app
shopify app init seology-ai

# auth-specialist: Implement OAuth
# app-bridge-specialist: Set up App Bridge provider
```

### 2. Product SEO Update Feature
**Agents**: graphql-specialist → webhook-specialist → extension-specialist

```typescript
// graphql-specialist: Create mutation
productUpdate(input: { seo: { title, description } })

// webhook-specialist: Listen for product changes
products/update webhook → re-analyze SEO

// extension-specialist: Add bulk action UI
admin.product.action extension
```

### 3. App Launch Preparation
**Agents**: launch-specialist coordinates all agents

```
launch-specialist: Review checklist
├─ auth-specialist: Security audit
├─ webhook-specialist: GDPR webhooks
├─ app-bridge-specialist: Embedded app UX
├─ extension-specialist: Extension quality
├─ graphql-specialist: Performance optimization
└─ cli-specialist: Production deployment
```

## Knowledge Sources

All agents reference documentation in `context/shopify-docs/`:

```
context/shopify-docs/
├── 02-authentication-authorization.md  → auth-specialist
├── 03-app-bridge-library.md            → app-bridge-specialist
├── 04-app-extensions.md                → extension-specialist
├── 05-webhooks.md                      → webhook-specialist
├── 07-admin-graphql-api.md             → graphql-specialist
├── 08-admin-rest-api.md                → rest-specialist
├── 09-distribution-launch.md           → launch-specialist
└── 10-shopify-cli.md                   → cli-specialist
```

Each agent reads its knowledge source first when invoked to ensure up-to-date expertise.

## SEOLOGY.AI Integration

All agents are configured with SEOLOGY.AI-specific context:

- **Tech Stack**: Next.js 14, Prisma, PostgreSQL, Clerk, Claude AI
- **Database**: `connections` table for Shopify stores
- **API Routes**: `app/api/shopify/` endpoints
- **Components**: `components/shopify/` UI components
- **Lib**: `lib/shopify-*.ts` utility files

Agents provide code examples that integrate with existing SEOLOGY.AI architecture.

## Agent Capabilities

Each agent has access to all Claude Code tools:
- **Read**: Read files and documentation
- **Edit**: Modify existing code
- **Write**: Create new files
- **Bash**: Run CLI commands
- **Grep**: Search codebase
- **Glob**: Find files

Agents can:
- Read Shopify documentation
- Implement code changes
- Run Shopify CLI commands
- Test implementations
- Deploy to production

## Best Practices

### When to Use Multiple Agents

Use multiple agents when:
- Task spans multiple domains (auth + UI + API)
- Need specialized expertise in each area
- Building complex features (extensions + webhooks + GraphQL)
- Preparing for app launch (all agents)

### When to Use Single Agent

Use single agent when:
- Task is domain-specific (only auth or only GraphQL)
- Quick fix or debugging in one area
- Learning about specific Shopify feature

### Agent Selection Tips

1. **Start broad**: If unsure, describe the task naturally
2. **Claude routes**: Claude will automatically invoke appropriate agents
3. **Trust handoffs**: Agents will proactively collaborate
4. **Review collaboration**: Check agent communication for insights

## Troubleshooting

### Agent Not Invoked
**Issue**: Agent doesn't activate when expected
**Solution**: Be explicit: "Use shopify-auth-specialist to implement OAuth"

### Agent Lack Context
**Issue**: Agent doesn't know about recent changes
**Solution**: Provide context: "We just implemented X, now add Y"

### Multiple Agents Conflict
**Issue**: Agents give different recommendations
**Solution**: Ask for coordination: "Coordinate between auth and app-bridge specialists"

### Agent Stuck
**Issue**: Agent keeps failing on same step
**Solution**: Switch agents: "Let's try a different approach with cli-specialist"

## Extending the Agent System

To add new Shopify agents:

1. Create `{domain}-specialist.md` in this directory
2. Follow the existing agent template structure
3. Define expertise area and knowledge source
4. List collaboration points with other agents
5. Include practical examples for SEOLOGY.AI
6. Update this README with the new agent

## Support

For questions about these agents:
- Review agent markdown files for detailed documentation
- Check `context/shopify-docs/` for source documentation
- Reference SEOLOGY.AI codebase in `lib/shopify*.ts`
- Consult CLAUDE.md for project context

---

**Version**: 1.0.0
**Last Updated**: 2025-11-07
**Agents**: 8
**Total Lines of Agent Definitions**: ~4,500
**Powered by**: Claude Code Agent SDK
