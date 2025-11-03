#!/bin/bash
# Database Migration Script for SEOLOGY.AI

set -e

echo "=========================================="
echo "SEOLOGY.AI Database Migration"
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

# Determine environment
ENVIRONMENT=${1:-development}

echo "Environment: $ENVIRONMENT"
echo ""

# Generate Prisma Client first
echo "Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"
echo ""

case $ENVIRONMENT in
    "development"|"dev")
        echo "Running development migration..."
        echo -e "${YELLOW}This will apply schema changes without creating migration files${NC}"
        npx prisma db push
        ;;
    
    "staging"|"stage")
        echo "Running staging migration..."
        echo "Creating backup first..."
        ./scripts/backup-database.sh
        echo ""
        npx prisma migrate deploy
        ;;
    
    "production"|"prod")
        echo -e "${YELLOW}WARNING: Running production migration${NC}"
        read -p "Have you tested this migration on staging? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Migration cancelled. Please test on staging first."
            exit 1
        fi
        
        echo "Creating backup first..."
        ./scripts/backup-database.sh
        echo ""
        
        npx prisma migrate deploy
        ;;
    
    *)
        echo "Unknown environment: $ENVIRONMENT"
        echo "Usage: ./migrate-database.sh [development|staging|production]"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✓ Migration complete${NC}"
echo ""
echo "Next steps:"
echo "1. Verify database schema"
echo "2. Test application functionality"
echo "3. Monitor error logs"
