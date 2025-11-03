#!/bin/bash

###############################################################################
# Database Restore Script for SEOLOGY.AI
#
# Features:
# - Restore PostgreSQL database from backup
# - Automatic decompression of .gz files
# - Safety checks before restore
# - Backup of current database before restore
#
# Usage:
#   ./scripts/restore-db.sh <backup_file>
#   ./scripts/restore-db.sh backups/database/seology_backup_20240315_120000.sql.gz
#
# Environment Variables Required:
#   DATABASE_URL - PostgreSQL connection string
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# Check if backup file argument is provided
if [ -z "$1" ]; then
    log_error "No backup file specified"
    echo ""
    echo "Usage: $0 <backup_file>"
    echo ""
    echo "Examples:"
    echo "  $0 backups/database/seology_backup_20240315_120000.sql.gz"
    echo "  $0 backups/database/seology_backup_20240315_120000.sql"
    echo ""
    exit 1
fi

BACKUP_FILE="$1"

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    log_error "Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    log_error "DATABASE_URL environment variable is not set"
    exit 1
fi

# Parse DATABASE_URL
if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+)(\?.*)?$ ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASSWORD="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]}"
    DB_PORT="${BASH_REMATCH[4]}"
    DB_NAME="${BASH_REMATCH[5]}"
else
    log_error "Failed to parse DATABASE_URL"
    exit 1
fi

log_info "Database restore for: $DB_NAME"
log_info "Backup file: $BACKUP_FILE"

# Safety confirmation
echo ""
log_warn "⚠️  WARNING: This will OVERWRITE the current database!"
log_warn "Database: $DB_NAME"
log_warn "Host: $DB_HOST"
echo ""
read -p "Are you sure you want to continue? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    log_info "Restore cancelled by user"
    exit 0
fi

# Create a safety backup of current database
SAFETY_BACKUP_DIR="./backups/pre-restore"
mkdir -p "$SAFETY_BACKUP_DIR"
SAFETY_BACKUP_FILE="$SAFETY_BACKUP_DIR/pre_restore_$(date +%Y%m%d_%H%M%S).sql.gz"

log_info "Creating safety backup of current database..."
export PGPASSWORD="$DB_PASSWORD"

if pg_dump \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="$DB_NAME" \
    --format=plain \
    --no-owner \
    --no-acl \
    --file="${SAFETY_BACKUP_FILE%.gz}" 2>&1 | grep -v "NOTICE"; then

    gzip "${SAFETY_BACKUP_FILE%.gz}"
    log_info "Safety backup created: $SAFETY_BACKUP_FILE"
else
    log_error "Failed to create safety backup!"
    log_error "Restore aborted for safety"
    exit 1
fi

# Handle compressed files
RESTORE_FILE="$BACKUP_FILE"
TEMP_EXTRACTED=false

if [[ $BACKUP_FILE == *.gz ]]; then
    log_info "Decompressing backup file..."
    RESTORE_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$RESTORE_FILE"
    TEMP_EXTRACTED=true
    log_info "Backup decompressed"
fi

# Drop existing connections to the database
log_info "Terminating existing database connections..."
psql \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="postgres" \
    --command="SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();" \
    > /dev/null 2>&1 || true

# Restore database
log_info "Restoring database from backup..."

if psql \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="$DB_NAME" \
    --file="$RESTORE_FILE" \
    > /dev/null 2>&1; then

    log_info "Database restored successfully!"
else
    log_error "Database restore failed!"
    log_error "Your original database is backed up at: $SAFETY_BACKUP_FILE"
    log_error "You can restore it by running this script with that backup file"

    # Clean up temp file
    if [ "$TEMP_EXTRACTED" = true ]; then
        rm -f "$RESTORE_FILE"
    fi

    exit 1
fi

unset PGPASSWORD

# Clean up temporary extracted file
if [ "$TEMP_EXTRACTED" = true ]; then
    rm -f "$RESTORE_FILE"
    log_info "Cleaned up temporary files"
fi

# Success summary
echo ""
log_info "✅ Database restore completed successfully!"
log_info "Database: $DB_NAME"
log_info "Restored from: $BACKUP_FILE"
log_info "Safety backup: $SAFETY_BACKUP_FILE"
echo ""
log_info "Run 'npx prisma generate' to update Prisma client if needed"
echo ""

exit 0
