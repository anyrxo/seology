#!/bin/bash
# Generate secure secrets for SEOLOGY.AI

echo "=========================================="
echo "SEOLOGY.AI Secret Generator"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
NC='\033[0m'

echo "Generating secure secrets..."
echo ""

# ENCRYPTION_KEY (32 characters)
ENCRYPTION_KEY=$(openssl rand -base64 32 | tr -d '\n')
echo "ENCRYPTION_KEY=$ENCRYPTION_KEY"
echo ""

# CRON_SECRET (32 characters)
CRON_SECRET=$(openssl rand -base64 32 | tr -d '\n')
echo "CRON_SECRET=$CRON_SECRET"
echo ""

# JWT_SECRET (for any custom JWT needs)
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
echo "JWT_SECRET=$JWT_SECRET"
echo ""

echo -e "${GREEN}✓ Secrets generated${NC}"
echo ""
echo "IMPORTANT:"
echo "1. Copy these values to your .env.local file"
echo "2. Add them to Vercel environment variables"
echo "3. Store them securely (e.g., 1Password, LastPass)"
echo "4. NEVER commit these values to Git"
echo "5. Rotate these secrets quarterly"
