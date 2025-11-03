# Database Quick Start Guide - SEOLOGY.AI

Fast setup guide to get your database running in minutes.

## 1. Prerequisites

```bash
# Check you have these installed
node --version   # Should be 18+
psql --version   # Should be 14+
```

## 2. Setup Database

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL
# Ubuntu: sudo apt install postgresql
# Mac: brew install postgresql
# Windows: Download from postgresql.org

# Create database
psql -U postgres
CREATE DATABASE seology_dev;
CREATE USER seology_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE seology_dev TO seology_user;
\q
```

### Option B: Hosted Database (Recommended for Production)

**Supabase** (Free tier available)
1. Go to supabase.com
2. Create new project
3. Copy connection string

**Railway** (Free tier available)
1. Go to railway.app
2. New Project → Add PostgreSQL
3. Copy connection string

**Neon** (Free tier available)
1. Go to neon.tech
2. Create project
3. Copy connection string

## 3. Configure Environment

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/seology_dev"
DIRECT_URL="postgresql://user:password@localhost:5432/seology_dev"

# Encryption Key (generate with command below)
ENCRYPTION_KEY="your-32-character-key-here"

# Other required variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
ANTHROPIC_API_KEY="sk-ant-..."
```

Generate encryption key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4. Initialize Database

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed
```

## 5. Verify Setup

```bash
# Open Prisma Studio to view data
npm run db:studio
```

You should see:
- 6 Users (1 admin + 5 regular)
- 10 Platform Connections
- 30+ SEO Issues
- 15+ Fixes
- 30 days of metrics
- Notifications and audit logs

## 6. Demo Accounts

**Admin Account:**
- Email: admin@seology.ai
- Clerk ID: `user_admin_demo_001`

**Regular Users:**
1. sarah@example.com (STARTER)
2. michael@techstartup.io (GROWTH)
3. jennifer@enterprise.com (SCALE)
4. alex@shopowner.com (STARTER)
5. david@digitalagency.com (GROWTH)

## Common Commands

```bash
# Development
npm run dev                 # Start dev server
npm run db:studio          # Open database GUI

# Database operations
npm run db:push            # Apply schema changes
npm run db:seed            # Seed database
npm run db:reset           # Reset and re-seed

# Migrations
npm run db:migrate         # Create migration
npx prisma migrate deploy  # Deploy to production

# Backup
npm run db:backup          # Create backup
npm run db:restore         # Restore from backup
```

## Quick Test

After setup, test the database:

```typescript
// Create test file: test-db.ts
import { db } from './lib/db'

async function test() {
  const users = await db.user.count()
  const connections = await db.connection.count()
  const issues = await db.issue.count()

  console.log(`Users: ${users}`)
  console.log(`Connections: ${connections}`)
  console.log(`Issues: ${issues}`)
}

test()
```

Run test:
```bash
npx ts-node test-db.ts
```

## Troubleshooting

### Connection failed
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql  # Linux
brew services list               # Mac

# Test connection
psql $DATABASE_URL
```

### Encryption key error
```bash
# Generate new key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Add to .env
ENCRYPTION_KEY="generated-key-here"
```

### Seed data already exists
```bash
# Reset database
npm run db:reset
```

## Next Steps

1. Review full documentation: `DATABASE_SETUP_COMPLETE.md`
2. Explore database utilities: `lib/db-utils.ts`
3. Set up automated backups: `scripts/backup-db.sh`
4. Start building features with seeded data

## Need Help?

- Full docs: DATABASE_SETUP_COMPLETE.md
- Schema: prisma/schema.prisma
- Project docs: CLAUDE.md
- Prisma docs: https://www.prisma.io/docs
