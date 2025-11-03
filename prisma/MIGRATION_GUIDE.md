# Database Migration Guide - SEOLOGY.AI

## Current Status

**Schema Version:** 2.0 (Enhanced)
**Status:** Ready for initial migration
**Database:** PostgreSQL

---

## Pre-Migration Checklist

### 1. Environment Setup

Ensure you have the following environment variables configured:

```bash
# .env.local or .env
DATABASE_URL="postgresql://user:password@host:5432/seology_ai?schema=public"
DIRECT_URL="postgresql://user:password@host:5432/seology_ai?schema=public"
ENCRYPTION_KEY="your-32-character-encryption-key-here"
```

**CRITICAL:** The `ENCRYPTION_KEY` must be exactly 32 characters and must remain constant across all environments. If changed, encrypted data (OAuth tokens, credentials) will be unrecoverable.

### 2. Database Provider Options

Choose your PostgreSQL provider:

**Option A: Supabase (Recommended)**
- Free tier available
- Automatic backups
- Connection pooling included
- Direct and pooled URLs provided

**Option B: Railway**
- Simple setup
- Pay-as-you-go
- Good for development

**Option C: Vercel Postgres**
- Integrated with Vercel deployment
- Serverless-ready
- Limited free tier

**Option D: Self-Hosted**
- Full control
- Requires manual backup setup
- Must configure connection pooling

### 3. Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma
```

---

## Migration Steps

### Step 1: Generate Prisma Client

This creates the TypeScript types for your database models.

```bash
npx prisma generate
```

**Expected Output:**
```
✔ Generated Prisma Client (5.x.x) to ./node_modules/@prisma/client
```

**What This Does:**
- Generates TypeScript types from your schema
- Creates the Prisma Client API
- Stored in `node_modules/@prisma/client`

---

### Step 2: Create Initial Migration

**For Development:**

```bash
npx prisma migrate dev --name init
```

This will:
1. Create a migration file in `prisma/migrations/`
2. Apply the migration to your database
3. Generate Prisma Client
4. Ask if you want to create a seed file

**Expected Output:**
```
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "seology_ai" at "host:5432"

Applying migration `20241103000000_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20241103000000_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (5.x.x)
```

**For Production:**

```bash
npx prisma migrate deploy
```

This applies pending migrations without prompting (safe for CI/CD).

---

### Step 3: Verify Migration

Open Prisma Studio to inspect your database:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse all tables
- View relationships
- Add test data manually
- Verify schema structure

**Checklist:**
- [ ] All 21 models are present
- [ ] All enums are created
- [ ] Indexes are created (check `SHOW INDEX`)
- [ ] Foreign key constraints exist
- [ ] Default values are set correctly

---

### Step 4: Create Seed Data (Optional)

Create `prisma/seed.ts` for test data:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@seology.ai' },
    update: {},
    create: {
      clerkId: 'user_seedadmin123',
      email: 'admin@seology.ai',
      name: 'Admin User',
      plan: 'SCALE',
      role: 'ADMIN',
      executionMode: 'AUTOMATIC',
      onboardingCompleted: true,
      onboardingStep: 7,
    },
  })

  console.log('Created admin user:', admin.id)

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      clerkId: 'user_seedtest456',
      email: 'test@example.com',
      name: 'Test User',
      plan: 'STARTER',
      role: 'USER',
      executionMode: 'PLAN',
      onboardingCompleted: false,
      onboardingStep: 0,
    },
  })

  console.log('Created test user:', testUser.id)

  // Create test connection
  const connection = await prisma.connection.create({
    data: {
      userId: testUser.id,
      platform: 'WORDPRESS',
      domain: 'example.com',
      displayName: 'Example WordPress Site',
      status: 'CONNECTED',
      healthStatus: 'healthy',
      pageCount: 0,
      issueCount: 0,
    },
  })

  console.log('Created test connection:', connection.id)

  // Create usage record for current month
  const now = new Date()
  await prisma.usageRecord.create({
    data: {
      userId: testUser.id,
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      fixesApplied: 0,
      sitesActive: 1,
      apiCalls: 0,
    },
  })

  console.log('Created usage record for current month')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

**Add to `package.json`:**

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

**Run seed:**

```bash
npx prisma db seed
```

---

## Post-Migration Tasks

### 1. Test Database Client

Create a test file to verify Prisma Client works:

```typescript
// test-db.ts
import { db } from '@/lib/db'

async function testDatabase() {
  console.log('Testing database connection...')

  // Test user query
  const users = await db.user.findMany({
    take: 5,
  })
  console.log(`Found ${users.length} users`)

  // Test connection query
  const connections = await db.connection.findMany({
    include: {
      user: true,
      issues: true,
      fixes: true,
    },
    take: 5,
  })
  console.log(`Found ${connections.length} connections`)

  // Test job queue
  const pendingJobs = await db.job.count({
    where: { status: 'PENDING' },
  })
  console.log(`Pending jobs: ${pendingJobs}`)

  console.log('Database test completed successfully!')
}

testDatabase()
  .catch((e) => {
    console.error('Database test failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
```

**Run test:**

```bash
npx tsx test-db.ts
```

---

### 2. Set Up Database Backup

**For Supabase:**
- Automatic daily backups included
- Manual backups via dashboard
- Point-in-time recovery (PITR) on Pro plan

**For Self-Hosted:**

Create backup script:

```bash
#!/bin/bash
# backup-db.sh

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/backups"
DB_NAME="seology_ai"

pg_dump $DATABASE_URL > "$BACKUP_DIR/seology_ai_$TIMESTAMP.sql"

# Keep only last 7 days
find $BACKUP_DIR -name "seology_ai_*.sql" -mtime +7 -delete

echo "Backup completed: seology_ai_$TIMESTAMP.sql"
```

**Schedule with cron:**

```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-db.sh
```

---

### 3. Enable Connection Pooling

For serverless environments (Vercel), use a connection pooler.

**With Supabase:**
- Use the "Connection Pooling" URL provided
- Set as `DATABASE_URL`
- Use direct URL as `DIRECT_URL` (for migrations)

**With PgBouncer:**

```bash
# Install PgBouncer
sudo apt-get install pgbouncer

# Configure /etc/pgbouncer/pgbouncer.ini
[databases]
seology_ai = host=localhost port=5432 dbname=seology_ai

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
```

Update `.env`:

```bash
DATABASE_URL="postgresql://user:password@localhost:6432/seology_ai?pgbouncer=true"
DIRECT_URL="postgresql://user:password@localhost:5432/seology_ai"
```

---

### 4. Monitor Query Performance

**Install Prisma Pulse (Optional):**

```bash
npm install @prisma/pulse-client
```

**Enable Slow Query Logging:**

```sql
-- In PostgreSQL
ALTER DATABASE seology_ai SET log_min_duration_statement = 1000;
```

This logs queries taking longer than 1 second.

---

## Rollback Procedures

### Rollback Latest Migration

```bash
npx prisma migrate resolve --rolled-back <migration-name>
```

### Rollback to Specific Migration

```bash
# 1. Identify target migration
npx prisma migrate status

# 2. Manually rollback database
psql $DATABASE_URL < prisma/migrations/<target>/migration.sql

# 3. Mark migrations as rolled back
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Common Issues & Solutions

### Issue 1: "Cannot connect to database"

**Solution:**
- Verify `DATABASE_URL` is correct
- Check database is running
- Verify firewall allows connection
- Test with `psql $DATABASE_URL`

### Issue 2: "Prisma Client is out of sync"

**Solution:**
```bash
npx prisma generate
```

### Issue 3: "Migration already applied"

**Solution:**
```bash
npx prisma migrate resolve --applied <migration-name>
```

### Issue 4: "Connection pool exhausted"

**Solution:**
- Enable connection pooling (see above)
- Reduce `connection_limit` in DATABASE_URL
- Check for connection leaks (`$disconnect()` calls)

### Issue 5: "Encryption key changed, cannot decrypt"

**Solution:**
- **Prevention:** Never change `ENCRYPTION_KEY` in production
- **Recovery:** If changed, re-authenticate all OAuth connections
- **Backup:** Always backup encryption key securely (1Password, AWS Secrets Manager)

---

## Production Deployment Checklist

### Before Deployment

- [ ] Run `npx prisma validate` to check schema
- [ ] Test migrations on staging database
- [ ] Back up production database
- [ ] Verify environment variables set
- [ ] Test rollback procedure on staging
- [ ] Notify team of maintenance window

### During Deployment

```bash
# 1. Set maintenance mode (optional)
# 2. Back up database
pg_dump $DATABASE_URL > backup_pre_migration.sql

# 3. Apply migrations
npx prisma migrate deploy

# 4. Verify migration
npx prisma migrate status

# 5. Test critical queries
npx tsx test-db.ts

# 6. Disable maintenance mode
```

### After Deployment

- [ ] Monitor error rates
- [ ] Check database performance metrics
- [ ] Verify API endpoints functioning
- [ ] Check background job processing
- [ ] Monitor connection pool usage
- [ ] Review slow query logs

---

## Database Maintenance

### Weekly Tasks

- [ ] Review slow query logs
- [ ] Check connection pool metrics
- [ ] Verify backup completed successfully
- [ ] Check disk space usage
- [ ] Review audit logs for anomalies

### Monthly Tasks

- [ ] Run `VACUUM ANALYZE` on PostgreSQL
- [ ] Review and optimize indexes
- [ ] Archive old audit logs (>90 days)
- [ ] Test backup restoration process
- [ ] Update Prisma dependencies

### Quarterly Tasks

- [ ] Performance audit of top queries
- [ ] Review data retention policies
- [ ] Update database capacity plan
- [ ] Security audit of encrypted fields
- [ ] Review and optimize database schema

---

## Migration Scripts Reference

### Reset Database (Development Only)

**WARNING:** This deletes all data!

```bash
npx prisma migrate reset
```

### Push Schema Without Migration

For prototyping only (not recommended for production):

```bash
npx prisma db push
```

### Generate Migration Without Applying

```bash
npx prisma migrate dev --create-only --name description
```

Then manually edit `migration.sql` before applying with:

```bash
npx prisma migrate dev
```

---

## Encryption Key Management

The `ENCRYPTION_KEY` is used to encrypt:
- Connection OAuth tokens (`accessToken`, `refreshToken`)
- Connection credentials (`credentials`)
- Webhook secrets

**Best Practices:**

1. **Generation:**
   ```bash
   openssl rand -base64 24
   ```

2. **Storage:**
   - Development: `.env.local` (gitignored)
   - Production: Vercel Environment Variables (encrypted)
   - Backup: 1Password, AWS Secrets Manager, or similar

3. **Rotation (if compromised):**
   - Generate new key
   - Decrypt all encrypted fields with old key
   - Re-encrypt with new key
   - Update environment variables
   - Deploy new key to all environments

---

## Next Steps

After successful migration:

1. Implement `lib/db.ts` Prisma Client singleton
2. Create data access layer functions
3. Set up Prisma middleware for logging
4. Implement soft delete for audit trail
5. Configure read replicas (if needed)
6. Set up database monitoring alerts

---

## Support Resources

- Prisma Documentation: https://www.prisma.io/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs
- Supabase Documentation: https://supabase.com/docs
- SEOLOGY.AI Schema Docs: `prisma/SCHEMA_DOCUMENTATION.md`
- Database Diagram: `prisma/DATABASE_DIAGRAM.txt`

---

**Last Updated:** 2025-11-03
**Schema Version:** 2.0
