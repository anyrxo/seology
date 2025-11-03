#!/bin/bash
# Apply Performance Optimizations for SEOLOGY.AI
# Run this script to apply all performance optimizations

set -e  # Exit on error

echo "🚀 Applying SEOLOGY.AI Performance Optimizations..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Backup current configuration
echo "📦 Step 1/7: Backing up current configuration..."
if [ -f "next.config.js" ]; then
    cp next.config.js next.config.js.backup
    echo -e "${GREEN}✓${NC} Backed up next.config.js"
fi

if [ -f "tailwind.config.ts" ]; then
    cp tailwind.config.ts tailwind.config.ts.backup
    echo -e "${GREEN}✓${NC} Backed up tailwind.config.ts"
fi
echo ""

# Step 2: Apply optimized configurations
echo "⚙️  Step 2/7: Applying optimized configurations..."
if [ -f "next.config.optimized.js" ]; then
    cp next.config.optimized.js next.config.js
    echo -e "${GREEN}✓${NC} Applied optimized Next.js config"
else
    echo -e "${RED}✗${NC} next.config.optimized.js not found"
fi

if [ -f "tailwind.config.optimized.ts" ]; then
    cp tailwind.config.optimized.ts tailwind.config.ts
    echo -e "${GREEN}✓${NC} Applied optimized Tailwind config"
else
    echo -e "${RED}✗${NC} tailwind.config.optimized.ts not found"
fi
echo ""

# Step 3: Install dependencies if needed
echo "📥 Step 3/7: Checking dependencies..."
if ! grep -q "@next/bundle-analyzer" package.json; then
    echo "Installing @next/bundle-analyzer..."
    npm install --save-dev @next/bundle-analyzer webpack-bundle-analyzer
    echo -e "${GREEN}✓${NC} Installed bundle analyzer"
fi
echo ""

# Step 4: Apply database indexes
echo "💾 Step 4/7: Applying database indexes..."
if [ -f "prisma/migrations/add_performance_indexes.sql" ]; then
    if [ ! -z "$DATABASE_URL" ]; then
        echo "Applying indexes to database..."
        psql "$DATABASE_URL" < prisma/migrations/add_performance_indexes.sql
        echo -e "${GREEN}✓${NC} Database indexes applied"
    else
        echo -e "${YELLOW}⚠${NC}  DATABASE_URL not set. Skipping database indexes."
        echo "   Run manually: psql \$DATABASE_URL < prisma/migrations/add_performance_indexes.sql"
    fi
else
    echo -e "${RED}✗${NC} Database index migration file not found"
fi
echo ""

# Step 5: Generate Prisma client
echo "🔨 Step 5/7: Generating Prisma client..."
npx prisma generate
echo -e "${GREEN}✓${NC} Prisma client generated"
echo ""

# Step 6: Build with optimizations
echo "🏗️  Step 6/7: Building optimized production bundle..."
npm run build
echo -e "${GREEN}✓${NC} Production build completed"
echo ""

# Step 7: Run bundle analysis
echo "📊 Step 7/7: Analyzing bundle size..."
echo "Run: ANALYZE=true npm run build to view bundle analysis"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Performance optimizations applied successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo "  1. Set REDIS_URL environment variable for caching"
echo "  2. Deploy to staging and run Lighthouse audit"
echo "  3. Monitor Core Web Vitals in production"
echo "  4. Read PERFORMANCE_OPTIMIZATION.md for details"
echo ""
echo "🔍 Verify optimizations:"
echo "  • Check bundle size: npm run build:analyze"
echo "  • Run Lighthouse: lighthouse http://localhost:3000"
echo "  • Test caching: Check Redis connection in logs"
echo ""
