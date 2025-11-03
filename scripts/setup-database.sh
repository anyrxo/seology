#!/bin/bash

# SEOLOGY.AI - Database Setup Script
# Run this script to initialize the database for the first time

set -e

echo "============================================"
echo "SEOLOGY.AI - Database Setup"
echo "============================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found${NC}"
    echo "Creating .env from .env.example..."

    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file${NC}"
        echo -e "${YELLOW}⚠ Please edit .env and add your DATABASE_URL${NC}"
        exit 1
    else
        echo -e "${RED}Error: .env.example not found${NC}"
        exit 1
    fi
fi

# Check if DATABASE_URL is set
if ! grep -q "^DATABASE_URL=.*postgresql://" .env; then
    echo -e "${RED}Error: DATABASE_URL not configured in .env${NC}"
    echo "Please set DATABASE_URL to your PostgreSQL connection string"
    echo "Example: DATABASE_URL=\"postgresql://user:password@localhost:5432/seology\""
    exit 1
fi

# Check if ENCRYPTION_KEY is set
if ! grep -q "^ENCRYPTION_KEY=.{32,}" .env; then
    echo -e "${YELLOW}Warning: ENCRYPTION_KEY not set or too short${NC}"
    echo "Generating encryption key..."

    # Generate random 32-byte key
    ENCRYPTION_KEY=$(openssl rand -hex 32)

    # Add to .env
    echo "" >> .env
    echo "# Generated encryption key" >> .env
    echo "ENCRYPTION_KEY=$ENCRYPTION_KEY" >> .env

    echo -e "${GREEN}✓ Generated and saved ENCRYPTION_KEY${NC}"
fi

echo ""
echo "Step 1: Checking Prisma installation..."
if ! command -v npx &> /dev/null; then
    echo -e "${RED}Error: npx not found. Please install Node.js${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Prisma CLI available${NC}"

echo ""
echo "Step 2: Validating schema..."
npx prisma validate
echo -e "${GREEN}✓ Schema is valid${NC}"

echo ""
echo "Step 3: Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

echo ""
echo "Step 4: Checking database connection..."
if ! npx prisma db execute --stdin <<< "SELECT 1;" &> /dev/null; then
    echo -e "${RED}Error: Cannot connect to database${NC}"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi
echo -e "${GREEN}✓ Database connection successful${NC}"

echo ""
echo "Step 5: Choose deployment strategy:"
echo "  1) Development (db push - no migration history)"
echo "  2) Production (migrate deploy - with migration history)"
read -p "Enter choice (1 or 2): " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "Pushing schema to database (development mode)..."
    npx prisma db push
    echo -e "${GREEN}✓ Schema pushed to database${NC}"
elif [ "$choice" = "2" ]; then
    echo ""
    echo "Creating initial migration..."
    npx prisma migrate dev --name init
    echo -e "${GREEN}✓ Migration created and applied${NC}"
else
    echo -e "${RED}Invalid choice${NC}"
    exit 1
fi

echo ""
echo "Step 6: Verifying database setup..."
echo "Opening Prisma Studio to verify..."
echo -e "${YELLOW}Press Ctrl+C to close Prisma Studio when done${NC}"
echo ""

# Wait 2 seconds before opening studio
sleep 2

npx prisma studio

echo ""
echo "============================================"
echo -e "${GREEN}✓ Database setup complete!${NC}"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Review your database in Prisma Studio"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Test the connection by creating a user"
echo ""
echo "Documentation: See DATABASE_SETUP.md for details"
echo ""
