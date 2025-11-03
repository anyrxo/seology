# SEOLOGY.AI Deployment Scripts

This directory contains scripts for setting up, deploying, and managing SEOLOGY.AI across different environments.

## Environment Setup Scripts

### setup-dev.sh
Sets up local development environment.

```bash
./scripts/setup-dev.sh
```

**What it does:**
- Checks Node.js version
- Installs dependencies
- Creates .env.local from template
- Generates Prisma Client
- Pushes schema to database
- Installs Git hooks

### setup-staging.sh
Sets up staging environment.

```bash
./scripts/setup-staging.sh
```

**What it does:**
- Verifies environment variables
- Installs dependencies
- Generates Prisma Client
- Runs database migrations
- Builds application

### setup-production.sh
Sets up production environment (use with caution).

```bash
./scripts/setup-production.sh
```

**What it does:**
- Production safety checks
- Verifies all required environment variables
- Creates database backup
- Runs migrations
- Builds application

## Database Scripts

### backup-database.sh
Creates a backup of the database.

```bash
./scripts/backup-database.sh
```

**Features:**
- Timestamped backup files
- Automatic compression (gzip)
- Cleans up backups older than 30 days
- Stores in `backups/` directory

### restore-database.sh
Restores database from a backup.

```bash
./scripts/restore-database.sh backups/seology_backup_20240101_120000.sql.gz
```

**Safety features:**
- Creates safety backup before restore
- Requires explicit confirmation
- Handles compressed and uncompressed backups

### migrate-database.sh
Runs database migrations.

```bash
# Development
./scripts/migrate-database.sh development

# Staging
./scripts/migrate-database.sh staging

# Production
./scripts/migrate-database.sh production
```

**Environment-specific behavior:**
- **Development**: Uses `prisma db push` (no migration files)
- **Staging**: Creates backup, runs `prisma migrate deploy`
- **Production**: Requires confirmation, creates backup

### seed-database.sh
Seeds database with initial data.

```bash
./scripts/seed-database.sh
```

**Use cases:**
- Initial setup
- Testing environments
- Demo data

## Utility Scripts

### generate-secrets.sh
Generates secure secrets for environment variables.

```bash
./scripts/generate-secrets.sh
```

**Generates:**
- ENCRYPTION_KEY (32 bytes, base64)
- CRON_SECRET (32 bytes, base64)
- JWT_SECRET (64 bytes, base64)

### check-health.sh
Checks application health.

```bash
# Check production
./scripts/check-health.sh

# Check staging
./scripts/check-health.sh https://staging.seology.ai

# Check local
./scripts/check-health.sh http://localhost:3000
```

**Checks:**
- API health endpoint
- Main page accessibility
- API documentation
- SSL certificate validity

## Usage Examples

### Setting Up Development Environment

```bash
# 1. Clone repository
git clone <repository-url>
cd seology-ai

# 2. Run development setup
./scripts/setup-dev.sh

# 3. Generate secrets
./scripts/generate-secrets.sh

# 4. Update .env.local with the generated secrets

# 5. Start development server
npm run dev
```

### Deploying to Staging

```bash
# 1. Set environment variables
export DATABASE_URL="..."
export CLERK_SECRET_KEY="..."
# ... other variables

# 2. Run staging setup
./scripts/setup-staging.sh

# 3. Verify deployment
./scripts/check-health.sh https://staging.seology.ai
```

### Deploying to Production

```bash
# 1. Create a backup
./scripts/backup-database.sh

# 2. Run production setup (will prompt for confirmation)
./scripts/setup-production.sh

# 3. Verify health
./scripts/check-health.sh https://app.seology.ai

# 4. Monitor logs
vercel logs --follow
```

### Restoring from Backup

```bash
# 1. List available backups
ls -lh backups/

# 2. Restore from specific backup
./scripts/restore-database.sh backups/seology_backup_20240101_120000.sql.gz

# 3. Run migrations to ensure schema is up to date
./scripts/migrate-database.sh production
```

## Prerequisites

### All Scripts
- Node.js 18+
- npm
- Bash shell (Git Bash on Windows)

### Database Scripts
- PostgreSQL client tools (`pg_dump`, `psql`)
- `DATABASE_URL` environment variable

### Health Check Script
- `curl` command
- `openssl` command

## Environment Variables

Scripts rely on the following environment variables:

### Required for All Environments
- `DATABASE_URL` - PostgreSQL connection string
- `CLERK_SECRET_KEY` - Clerk authentication
- `ANTHROPIC_API_KEY` - Claude AI
- `ENCRYPTION_KEY` - For encrypting tokens
- `CRON_SECRET` - For securing cron endpoints

### Production Only
- `DIRECT_URL` - Direct database connection (for migrations)
- `STRIPE_SECRET_KEY` - Stripe payments
- `REDIS_URL` - Redis cache
- All webhook secrets

## Best Practices

### Backups
- Always create a backup before migrations
- Test restore process regularly
- Keep backups for at least 30 days
- Store critical backups off-site

### Migrations
- Test migrations on staging first
- Review generated SQL before production
- Have rollback plan ready
- Schedule during low-traffic periods

### Security
- Never commit .env files
- Rotate secrets quarterly
- Use different secrets per environment
- Store secrets in password manager

### Monitoring
- Run health checks after deployment
- Monitor Sentry for errors
- Check Vercel logs
- Verify critical user flows

## Troubleshooting

### Script Permission Denied
```bash
chmod +x scripts/*.sh
```

### Database Connection Failed
Check that DATABASE_URL is set and accessible:
```bash
echo $DATABASE_URL
psql $DATABASE_URL -c "SELECT 1"
```

### Migration Failed
Rollback and try again:
```bash
# Restore from backup
./scripts/restore-database.sh backups/latest.sql.gz

# Check migration status
npx prisma migrate status

# Resolve if needed
npx prisma migrate resolve
```

### Health Check Failed
Check application logs:
```bash
# Vercel logs
vercel logs --follow

# Or check specific endpoint
curl -v https://app.seology.ai/api/health
```

## Support

For issues with scripts:
1. Check this README
2. Review script output for error messages
3. Check environment variables are set correctly
4. Consult INFRASTRUCTURE.md for architecture details
5. Contact DevOps team

## Contributing

When adding new scripts:
1. Follow existing naming conventions
2. Add error handling (`set -e`)
3. Include usage instructions
4. Add to this README
5. Make executable (`chmod +x`)
6. Test in all environments

---

**Last Updated**: 2024-01-01
**Maintained By**: DevOps Team
