#!/bin/bash
# Database Restore Script for SEOLOGY.AI

set -e

echo "=========================================="
echo "SEOLOGY.AI Database Restore"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if backup file is provided
if [ -z "$1" ]; then
    echo "Usage: ./restore-database.sh <backup-file.sql.gz>"
    echo ""
    echo "Available backups:"
    ls -lh backups/seology_backup_*.sql.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Error: Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}Error: DATABASE_URL environment variable is not set${NC}"
    exit 1
fi

# Safety confirmation
echo -e "${RED}WARNING: This will OVERWRITE the current database!${NC}"
echo "Backup file: $BACKUP_FILE"
echo "Target database: $DATABASE_URL"
echo ""
read -p "Are you ABSOLUTELY sure? (type 'YES' to confirm): " CONFIRM

if [ "$CONFIRM" != "YES" ]; then
    echo "Restore cancelled."
    exit 1
fi

# Create a safety backup first
echo ""
echo "Creating safety backup of current database..."
SAFETY_BACKUP="backups/safety_backup_$(date +%Y%m%d_%H%M%S).sql"
pg_dump "$DATABASE_URL" > "$SAFETY_BACKUP"
gzip "$SAFETY_BACKUP"
echo -e "${GREEN}✓ Safety backup created: ${SAFETY_BACKUP}.gz${NC}"

# Decompress backup if needed
TEMP_FILE="$BACKUP_FILE"
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "Decompressing backup..."
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
fi

# Restore database
echo ""
echo "Restoring database..."
psql "$DATABASE_URL" < "$TEMP_FILE"

# Clean up temp file if we decompressed
if [[ "$BACKUP_FILE" == *.gz ]]; then
    rm "$TEMP_FILE"
fi

echo ""
echo -e "${GREEN}✓ Database restore complete${NC}"
echo ""
echo "Post-restore checklist:"
echo "1. Run Prisma migrations: npx prisma migrate deploy"
echo "2. Verify data integrity"
echo "3. Test critical features"
echo "4. Monitor application logs"
