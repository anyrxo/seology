# Prisma Database Schema

## Quick Start

### 1. Set Environment Variables

Create `.env` or `.env.local` file:

```bash
# Database connection (required)
DATABASE_URL="postgresql://user:password@localhost:5432/seology_ai"

# Direct connection for migrations (required for migrations)
DIRECT_URL="postgresql://user:password@localhost:5432/seology_ai"

# Encryption key for OAuth tokens (exactly 32 characters)
ENCRYPTION_KEY="your-32-character-key-here-now!"
```

**Generate encryption key:**
```bash
openssl rand -base64 24
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Create Migration

```bash
npx prisma migrate dev --name init
```

### 4. (Optional) Open Prisma Studio

```bash
npx prisma studio
```

---

## Documentation

- **[SCHEMA_DOCUMENTATION.md](./SCHEMA_DOCUMENTATION.md)** - Complete schema reference
- **[DATABASE_DIAGRAM.txt](./DATABASE_DIAGRAM.txt)** - Visual database diagram
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Migration instructions
- **[SCHEMA_ENHANCEMENTS_SUMMARY.md](./SCHEMA_ENHANCEMENTS_SUMMARY.md)** - What's new in v2.0

---

## Schema Overview

**21 Models:**
- User, Connection, Issue, Fix
- PendingPlan, Job, UsageRecord
- Subscription, Metric, Crawl
- AuditLog, Notification, AIConversation
- Team, TeamMember, TeamInvitation
- Webhook, CSRFToken

**13 Enums:**
- ExecutionMode, Role, Plan
- Platform, ConnectionStatus
- Severity, IssueStatus
- FixMethod, FixStatus
- JobType, JobStatus, PlanStatus
- SubscriptionStatus, TeamRole, InvitationStatus, CrawlStatus

**Key Features:**
- Three execution modes (AUTOMATIC, PLAN, APPROVE)
- Background job queue system
- Usage tracking and billing
- 90-day rollback system
- Team collaboration
- Complete audit trail

---

## Common Commands

```bash
# Validate schema
npx prisma validate

# Generate TypeScript types
npx prisma generate

# Create migration (development)
npx prisma migrate dev --name description

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open database GUI
npx prisma studio

# Run verification script
npx tsx ../scripts/verify-schema.ts
```

---

## Migration Status

**Current Version:** 2.0 (Enhanced)
**Status:** Ready for initial migration
**Breaking Changes:** None (new deployment)

---

## Support

For issues or questions about the schema:
1. Check [SCHEMA_DOCUMENTATION.md](./SCHEMA_DOCUMENTATION.md)
2. Review [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
3. Run verification: `npx tsx ../scripts/verify-schema.ts`
