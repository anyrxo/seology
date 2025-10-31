# Database Setup Guide

## Overview
Seology.ai uses PostgreSQL as its primary database. This guide will help you set up the database for local development or production deployment.

## Option 1: Quick Setup with Vercel Postgres (Recommended for Production)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Create Vercel Postgres Database**:
   - Go to https://vercel.com/dashboard
   - Click "Storage" → "Create Database"
   - Select "Postgres"
   - Choose your region (closest to your users)
   - Click "Create"

4. **Get Connection String**:
   - In your database dashboard, go to ".env.local" tab
   - Copy the `POSTGRES_PRISMA_URL` value
   - This is your `DATABASE_URL`

5. **Update .env.local**:
```bash
DATABASE_URL="your_postgres_prisma_url_here"
```

6. **Run Database Migration**:
```bash
npx prisma db push
npx prisma generate
```

## Option 2: Local PostgreSQL with Docker (Recommended for Development)

1. **Install Docker Desktop**:
   - Download from https://www.docker.com/products/docker-desktop/
   - Install and start Docker Desktop

2. **Create PostgreSQL Container**:
```bash
docker run --name seology-postgres \
  -e POSTGRES_DB=seology \
  -e POSTGRES_USER=seology \
  -e POSTGRES_PASSWORD=seology123 \
  -p 5432:5432 \
  -d postgres:15
```

3. **Update .env.local**:
```bash
DATABASE_URL="postgresql://seology:seology123@localhost:5432/seology"
```

4. **Run Database Migration**:
```bash
npx prisma db push
npx prisma generate
```

5. **Manage Container** (optional):
```bash
# Stop container
docker stop seology-postgres

# Start container
docker start seology-postgres

# View logs
docker logs seology-postgres

# Remove container
docker rm -f seology-postgres
```

## Option 3: Local PostgreSQL Installation

1. **Install PostgreSQL**:
   - **Windows**: Download from https://www.postgresql.org/download/windows/
   - **macOS**: `brew install postgresql@15`
   - **Linux**: `sudo apt install postgresql postgresql-contrib`

2. **Start PostgreSQL Service**:
   - **Windows**: Start "PostgreSQL" service from Services
   - **macOS**: `brew services start postgresql@15`
   - **Linux**: `sudo systemctl start postgresql`

3. **Create Database**:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE seology;
CREATE USER seology WITH ENCRYPTED PASSWORD 'seology123';
GRANT ALL PRIVILEGES ON DATABASE seology TO seology;
\q
```

4. **Update .env.local**:
```bash
DATABASE_URL="postgresql://seology:seology123@localhost:5432/seology"
```

5. **Run Database Migration**:
```bash
npx prisma db push
npx prisma generate
```

## Option 4: Cloud PostgreSQL (Production)

### Supabase (Free tier available)
1. Go to https://supabase.com/
2. Create new project
3. Copy connection string from Settings → Database
4. Format: `postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres`
5. Update `DATABASE_URL` in .env.local or production environment

### Neon (Serverless Postgres - Free tier)
1. Go to https://neon.tech/
2. Create new project
3. Copy connection string
4. Format: `postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]`
5. Update `DATABASE_URL` in .env.local or production environment

### Railway (Simple deployment)
1. Go to https://railway.app/
2. Create new project → Add PostgreSQL
3. Copy connection string from Variables tab
4. Update `DATABASE_URL` in .env.local or production environment

## Verify Database Setup

After completing any option above, verify your database is working:

```bash
# Check Prisma connection
npx prisma db pull

# View database in Prisma Studio
npx prisma studio
```

Prisma Studio will open at http://localhost:5555 where you can view and edit your database records.

## Database Schema

The Seology.ai database includes 13 tables:

1. **User** - User accounts and settings
2. **Connection** - Platform connections (Shopify, WordPress, etc.)
3. **Site** - Connected websites
4. **Issue** - Detected SEO issues
5. **Fix** - Applied fixes with rollback capability
6. **Metric** - SEO metrics and analytics
7. **AIConversation** - Claude AI conversation history
8. **AIMessage** - Individual AI messages
9. **AuditLog** - System audit trail
10. **Subscription** - Stripe subscription data
11. **Usage** - Monthly usage tracking
12. **Notification** - User notifications
13. **Job** - Background job queue

## Troubleshooting

### "Error: P1001 Can't reach database server"
- Ensure PostgreSQL is running
- Check DATABASE_URL format is correct
- Verify port 5432 is not blocked by firewall
- For Docker: Ensure container is running with `docker ps`

### "Error: P1010 User was denied access"
- Check username and password in DATABASE_URL
- Grant proper permissions: `GRANT ALL PRIVILEGES ON DATABASE seology TO seology;`

### "Error: P1003 Database does not exist"
- Create database first: `CREATE DATABASE seology;`
- Or use `npx prisma db push --accept-data-loss` to create it

### "SSL required" error (Production)
Add `?sslmode=require` to end of DATABASE_URL:
```
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

## Production Deployment

For production deployment (Vercel):

1. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add `DATABASE_URL` with your production database connection string

2. **Deploy**:
```bash
git push origin main
```

3. **Run Migrations** (if needed):
```bash
vercel env pull .env.production.local
npx prisma db push
```

## Seeding (Optional)

To populate with test data for development:

```bash
npx prisma db seed
```

(Note: Seed script would need to be created in `prisma/seed.ts`)

## Backup and Restore

### Backup
```bash
pg_dump -U seology -h localhost seology > backup.sql
```

### Restore
```bash
psql -U seology -h localhost seology < backup.sql
```

## Next Steps

After database setup:
1. ✅ Run `npx prisma generate` to generate Prisma Client
2. ✅ Start development server: `npm run dev`
3. ✅ Test database connection by creating a user account
4. ✅ Configure other environment variables (Clerk, Stripe, Claude API)
