#!/bin/bash
# Health Check Script for SEOLOGY.AI

echo "=========================================="
echo "SEOLOGY.AI Health Check"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Default to production
URL=${1:-https://app.seology.ai}

echo "Checking: $URL"
echo ""

# Health check endpoint
echo "1. API Health Check..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$URL/api/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ API is healthy${NC}"
    echo "Response: $BODY"
else
    echo -e "${RED}✗ API health check failed (HTTP $HTTP_CODE)${NC}"
fi
echo ""

# Check main page
echo "2. Main Page Check..."
MAIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$MAIN_CODE" = "200" ]; then
    echo -e "${GREEN}✓ Main page is accessible${NC}"
else
    echo -e "${RED}✗ Main page returned HTTP $MAIN_CODE${NC}"
fi
echo ""

# Check API docs
echo "3. API Documentation Check..."
DOCS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL/docs")
if [ "$DOCS_CODE" = "200" ]; then
    echo -e "${GREEN}✓ API documentation is accessible${NC}"
else
    echo -e "${RED}✗ API docs returned HTTP $DOCS_CODE${NC}"
fi
echo ""

# SSL check
echo "4. SSL Certificate Check..."
SSL_INFO=$(echo | openssl s_client -servername ${URL#https://} -connect ${URL#https://}:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ -n "$SSL_INFO" ]; then
    echo -e "${GREEN}✓ SSL certificate is valid${NC}"
    echo "$SSL_INFO"
else
    echo -e "${RED}✗ SSL certificate check failed${NC}"
fi
echo ""

echo "=========================================="
echo "Health check complete"
echo "=========================================="
