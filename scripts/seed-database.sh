#!/bin/bash
# Database Seeding Script for SEOLOGY.AI

set -e

echo "=========================================="
echo "SEOLOGY.AI Database Seeding"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check environment
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set"
    exit 1
fi

# Warning for production
if [[ "$DATABASE_URL" == *"production"* ]]; then
    echo -e "${YELLOW}WARNING: This appears to be a production database${NC}"
    read -p "Are you sure you want to seed production? (type 'YES'): " CONFIRM
    if [ "$CONFIRM" != "YES" ]; then
        echo "Seeding cancelled."
        exit 1
    fi
fi

echo "Seeding database with initial data..."
echo ""

# Run seed script (you'll need to create this)
npx prisma db seed

echo ""
echo -e "${GREEN}✓ Database seeding complete${NC}"
