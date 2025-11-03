#!/bin/bash
# SEOLOGY.AI - Staging Environment Setup Script

set -e

echo "=========================================="
echo "SEOLOGY.AI Staging Setup"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verify required environment variables
echo "Verifying environment variables..."
REQUIRED_VARS=(
    "DATABASE_URL"
    "CLERK_SECRET_KEY"
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    "ANTHROPIC_API_KEY"
    "STRIPE_SECRET_KEY"
    "ENCRYPTION_KEY"
    "CRON_SECRET"
)

MISSING_VARS=()
for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo -e "${YELLOW}Warning: Missing environment variables:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
fi

# Install dependencies
echo "Installing dependencies..."
npm ci --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy
echo -e "${GREEN}✓ Database migrations complete${NC}"

# Build application
echo "Building application..."
npm run build
echo -e "${GREEN}✓ Application built${NC}"

echo ""
echo "=========================================="
echo -e "${GREEN}Staging environment setup complete!${NC}"
echo "=========================================="
echo ""
