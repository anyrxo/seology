# SEOLOGY.AI - Database Command Reference

Quick reference for common Prisma and database operations.

---

## Initial Setup

### 1. Generate Prisma Client
```bash
npx prisma generate
```
Run this after:
- Initial setup
- Schema changes
- npm install

### 2. Push Schema to Database (Development)
```bash
npx prisma db push
```
Use for:
- Rapid prototyping
- Development environment
- No migration history needed

### 3. Create Migration (Production)
```bash
npx prisma migrate dev --name descriptive_name
```
Use for:
- Production deployments
- Track schema changes
- Rollback capability

### 4. Apply Migrations (Production Deployment)
```bash
npx prisma migrate deploy
```
Use in:
- Production CI/CD pipelines
- Automated deployments
- Does NOT create new migrations

---

## Database Management

### View Database in GUI
```bash
npx prisma studio
```
Opens at: http://localhost:5555

### Validate Schema
```bash
npx prisma validate
```
Checks for syntax errors and issues

### Format Schema
```bash
npx prisma format
```
Auto-formats schema.prisma

### Pull Schema from Database
```bash
npx prisma db pull
```
Introspects database and updates schema

### Check Migration Status
```bash
npx prisma migrate status
```
Shows applied and pending migrations

---

## Development Workflow

### When Changing Schema

```bash
# 1. Edit prisma/schema.prisma

# 2. For development:
npx prisma db push

# OR for production:
npx prisma migrate dev --name add_new_field

# 3. Restart dev server
npm run dev
```

### When Starting Fresh

```bash
# Delete database and start over (DANGER: loses all data)
npx prisma migrate reset

# Confirm with 'y'
# This will:
# - Drop database
# - Create database
# - Apply all migrations
# - Run seed script (if configured)
```

---

## Troubleshooting

### Reset Client Generation
```bash
# Clear generated client
rm -rf node_modules/@prisma/client

# Regenerate
npx prisma generate
```

### Fix Connection Issues
```bash
# Test connection
echo "SELECT 1;" | npx prisma db execute --stdin

# Check environment variables
npx prisma --version

# Validate DATABASE_URL format
# postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

### Resolve Migration Conflicts
```bash
# Mark migration as applied without running
npx prisma migrate resolve --applied "migration_name"

# Mark migration as rolled back
npx prisma migrate resolve --rolled-back "migration_name"
```

---

## Production Commands

### Deploy to Vercel

```bash
# Set environment variables
vercel env add DATABASE_URL
vercel env add DIRECT_URL
vercel env add ENCRYPTION_KEY

# Deploy (migrations run automatically via build script)
vercel deploy --prod
```

### Manual Production Migration

```bash
# Set production DATABASE_URL
export DATABASE_URL="production_connection_string"

# Apply migrations
npx prisma migrate deploy

# Verify
npx prisma migrate status
```

---

## Database Maintenance

### Backup Database

```bash
# PostgreSQL backup
pg_dump -h hostname -U username -d seology > backup.sql

# Restore
psql -h hostname -U username -d seology < backup.sql
```

### Check Database Size

```bash
# Using Prisma (execute raw SQL)
npx prisma db execute --stdin <<< "
SELECT
  pg_size_pretty(pg_database_size('seology')) as size;
"
```

### Optimize Database

```bash
# Analyze tables (PostgreSQL)
npx prisma db execute --stdin <<< "ANALYZE;"

# Vacuum (clean up dead rows)
npx prisma db execute --stdin <<< "VACUUM ANALYZE;"
```

---

## Seeding Data

### Create Seed File

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Your seed data here
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Configure in package.json

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

### Run Seed

```bash
npx prisma db seed
```

---

## Prisma Client Usage

### Basic CRUD Operations

```typescript
import { db } from '@/lib/db'

// CREATE
const user = await db.user.create({
  data: {
    clerkId: 'user_123',
    email: 'user@example.com',
    name: 'John Doe',
    plan: 'STARTER'
  }
})

// READ (single)
const user = await db.user.findUnique({
  where: { id: userId }
})

// READ (many)
const users = await db.user.findMany({
  where: { plan: 'GROWTH' },
  include: {
    connections: true,
    subscriptions: true
  }
})

// UPDATE
const updated = await db.user.update({
  where: { id: userId },
  data: { plan: 'GROWTH' }
})

// DELETE
await db.user.delete({
  where: { id: userId }
})

// COUNT
const count = await db.user.count({
  where: { plan: 'STARTER' }
})
```

### Transactions

```typescript
// Transaction (all or nothing)
await db.$transaction([
  db.fix.create({ data: { /* ... */ } }),
  db.issue.update({ where: { id: issueId }, data: { status: 'FIXED' } }),
  db.auditLog.create({ data: { /* ... */ } })
])

// Interactive transaction
await db.$transaction(async (tx) => {
  const user = await tx.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')

  await tx.connection.create({ data: { /* ... */ } })
  await tx.auditLog.create({ data: { /* ... */ } })
})
```

### Raw SQL (when needed)

```typescript
// Query
const result = await db.$queryRaw`
  SELECT * FROM "User" WHERE "plan" = ${plan}
`

// Execute (no return value)
await db.$executeRaw`
  UPDATE "User" SET "plan" = ${newPlan} WHERE "id" = ${userId}
`
```

---

## Environment Variables

### Required for Development

```env
DATABASE_URL="postgresql://localhost:5432/seology"
ENCRYPTION_KEY="your_32_character_key_here"
```

### Required for Production

```env
DATABASE_URL="postgresql://user:pass@host:5432/seology"
DIRECT_URL="postgresql://user:pass@host:5432/seology"  # Optional
ENCRYPTION_KEY="your_32_character_key_here"
```

### Connection String Format

```
postgresql://[user]:[password]@[host]:[port]/[database]?[parameters]
```

Common parameters:
- `schema=public` - Schema name
- `sslmode=require` - Force SSL
- `connection_limit=10` - Max connections
- `pgbouncer=true` - Use with connection pooler

---

## CI/CD Integration

### Vercel (Automatic)

Add to `vercel.json`:
```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && next build"
}
```

Already configured in `package.json`:
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### GitHub Actions

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npx prisma migrate deploy

      - name: Build
        run: npm run build
```

---

## Performance Tips

### Use Indexes Effectively

Already configured in schema:
```prisma
@@index([userId])
@@index([connectionId])
@@index([status])
```

### Select Only What You Need

```typescript
// Bad - loads everything
const user = await db.user.findUnique({
  where: { id: userId },
  include: { connections: true }
})

// Good - select specific fields
const user = await db.user.findUnique({
  where: { id: userId },
  select: {
    id: true,
    email: true,
    connections: {
      select: { id: true, domain: true }
    }
  }
})
```

### Use Connection Pooling

For serverless (Vercel):
```env
DATABASE_URL="postgresql://user:pass@pooler:6543/seology?pgbouncer=true"
DIRECT_URL="postgresql://user:pass@host:5432/seology"
```

### Batch Operations

```typescript
// Bad - N queries
for (const id of ids) {
  await db.user.delete({ where: { id } })
}

// Good - 1 query
await db.user.deleteMany({
  where: { id: { in: ids } }
})
```

---

## Useful Links

- **Prisma Docs:** https://www.prisma.io/docs/
- **Prisma CLI Reference:** https://www.prisma.io/docs/reference/api-reference/command-reference
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Connection String Format:** https://www.prisma.io/docs/reference/database-reference/connection-urls

---

## Quick Start (Windows)

```batch
REM 1. Run setup script
scripts\setup-database.bat

REM 2. Start development server
npm run dev

REM 3. Open Prisma Studio (separate terminal)
npx prisma studio
```

## Quick Start (Mac/Linux)

```bash
# 1. Run setup script
chmod +x scripts/setup-database.sh
./scripts/setup-database.sh

# 2. Start development server
npm run dev

# 3. Open Prisma Studio (separate terminal)
npx prisma studio
```

---

Generated: 2025-11-03
Project: SEOLOGY.AI
Database: PostgreSQL with Prisma ORM
