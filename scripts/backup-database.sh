#!/bin/bash
# Database Backup Script for SEOLOGY.AI

set -e

echo "=========================================="
echo "SEOLOGY.AI Database Backup"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
NC='\033[0m'

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL environment variable is not set"
    exit 1
fi

# Create backups directory if it doesn't exist
mkdir -p backups

# Generate backup filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="backups/seology_backup_${TIMESTAMP}.sql"

echo "Starting database backup..."
echo "Backup file: $BACKUP_FILE"

# Run pg_dump
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"
COMPRESSED_FILE="${BACKUP_FILE}.gz"

# Get file size
SIZE=$(du -h "$COMPRESSED_FILE" | cut -f1)

echo -e "${GREEN}✓ Backup complete${NC}"
echo "File: $COMPRESSED_FILE"
echo "Size: $SIZE"
echo ""

# Clean up old backups (keep last 30 days)
echo "Cleaning up old backups..."
find backups/ -name "seology_backup_*.sql.gz" -mtime +30 -delete
echo -e "${GREEN}✓ Cleanup complete${NC}"
