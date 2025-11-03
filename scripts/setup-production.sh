#!/bin/bash
# SEOLOGY.AI - Production Environment Setup Script

set -e

echo "=========================================="
echo "SEOLOGY.AI Production Setup"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Production safety check
echo -e "${RED}WARNING: This will affect the PRODUCTION environment!${NC}"
read -p "Are you sure you want to continue? (type 'PRODUCTION' to confirm): " CONFIRM
if [ "$CONFIRM" != "PRODUCTION" ]; then
    echo "Setup cancelled."
    exit 1
fi

# Verify all required environment variables
echo ""
echo "Verifying environment variables..."
REQUIRED_VARS=(
    "DATABASE_URL"
    "DIRECT_URL"
    "CLERK_SECRET_KEY"
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    "CLERK_WEBHOOK_SECRET"
    "ANTHROPIC_API_KEY"
    "STRIPE_SECRET_KEY"
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    "STRIPE_WEBHOOK_SECRET"
    "SHOPIFY_CLIENT_ID"
    "SHOPIFY_CLIENT_SECRET"
    "ENCRYPTION_KEY"
    "CRON_SECRET"
    "NEXT_PUBLIC_APP_URL"
    "REDIS_URL"
)

MISSING_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${RED}Error: Missing required environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "Please set all required environment variables before running this script."
    exit 1
fi
echo -e "${GREEN}✓ All environment variables present${NC}"

# Verify NEXT_PUBLIC_APP_URL is production
if [[ ! "$NEXT_PUBLIC_APP_URL" =~ ^https://app\.seology\.ai ]]; then
    echo -e "${RED}Error: NEXT_PUBLIC_APP_URL must be https://app.seology.ai${NC}"
    exit 1
fi

# Install dependencies
echo ""
echo "Installing dependencies..."
npm ci --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Database backup reminder
echo ""
echo -e "${YELLOW}⚠ IMPORTANT: Ensure database backup is recent!${NC}"
read -p "Have you verified a recent database backup exists? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please create a database backup before proceeding."
    exit 1
fi

# Run database migrations
echo ""
echo "Running database migrations..."
npx prisma migrate deploy
echo -e "${GREEN}✓ Database migrations complete${NC}"

# Build application
echo ""
echo "Building application..."
npm run build
echo -e "${GREEN}✓ Application built${NC}"

# Verify build
if [ ! -d ".next" ]; then
    echo -e "${RED}Error: Build directory not found${NC}"
    exit 1
fi

echo ""
echo "=========================================="
echo -e "${GREEN}Production environment setup complete!${NC}"
echo "=========================================="
echo ""
echo "Post-deployment checklist:"
echo "1. Verify health check: curl https://app.seology.ai/api/health"
echo "2. Check Sentry for errors"
echo "3. Monitor Vercel logs"
echo "4. Test critical user flows"
echo "5. Update status page"
echo ""
