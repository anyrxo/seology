#!/bin/bash
# SEOLOGY.AI - Development Environment Setup Script

set -e  # Exit on error

echo "=========================================="
echo "SEOLOGY.AI Development Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Error: Node.js 18 or higher is required${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js version OK${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm is installed${NC}"

# Install dependencies
echo ""
echo "Installing dependencies..."
npm ci
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Check for .env.local file
echo ""
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Warning: .env.local file not found${NC}"
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo -e "${YELLOW}Please update .env.local with your actual credentials${NC}"
else
    echo -e "${GREEN}✓ .env.local file exists${NC}"
fi

# Generate Prisma Client
echo ""
echo "Generating Prisma Client..."
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Check database connection
echo ""
echo "Checking database connection..."
if npx prisma db pull --force > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Database connection successful${NC}"
else
    echo -e "${YELLOW}Warning: Could not connect to database${NC}"
    echo "Please check your DATABASE_URL in .env.local"
fi

# Push schema to database (development only)
echo ""
read -p "Do you want to push the schema to the database? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma db push
    echo -e "${GREEN}✓ Schema pushed to database${NC}"
fi

# Install Git hooks (optional)
echo ""
read -p "Do you want to install Git hooks? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run prepare 2>/dev/null || echo "No prepare script found"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}Development environment setup complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
