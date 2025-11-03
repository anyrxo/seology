#!/bin/bash

###############################################################################
# Database Backup Script for SEOLOGY.AI
#
# Features:
# - PostgreSQL backup using pg_dump
# - Automated backup rotation (keeps last 30 days)
# - Compression to save storage space
# - Backup verification
# - Error logging
#
# Usage:
#   ./scripts/backup-db.sh
#
# Environment Variables Required:
#   DATABASE_URL - PostgreSQL connection string
#
# Cron Example (daily at 2 AM):
#   0 2 * * * /path/to/scripts/backup-db.sh >> /var/log/seology-backup.log 2>&1
###############################################################################

set -e  # Exit on error

# Configuration
BACKUP_DIR="${BACKUP_DIR:-./backups/database}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="seology_backup_${TIMESTAMP}.sql"
COMPRESSED_FILE="${BACKUP_FILE}.gz"

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

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    log_error "DATABASE_URL environment variable is not set"
    log_error "Please set DATABASE_URL in your .env file or environment"
    exit 1
fi

# Parse DATABASE_URL
# Format: postgresql://user:password@host:port/database
if [[ $DATABASE_URL =~ postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+)(\?.*)?$ ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASSWORD="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]}"
    DB_PORT="${BASH_REMATCH[4]}"
    DB_NAME="${BASH_REMATCH[5]}"
else
    log_error "Failed to parse DATABASE_URL. Expected format: postgresql://user:password@host:port/database"
    exit 1
fi

log_info "Starting database backup for: $DB_NAME"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
    log_error "pg_dump command not found. Please install PostgreSQL client tools."
    log_error "Ubuntu/Debian: sudo apt-get install postgresql-client"
    log_error "MacOS: brew install postgresql"
    exit 1
fi

# Perform backup
log_info "Creating backup: $BACKUP_FILE"

export PGPASSWORD="$DB_PASSWORD"

if pg_dump \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --username="$DB_USER" \
    --dbname="$DB_NAME" \
    --format=plain \
    --no-owner \
    --no-acl \
    --verbose \
    --file="$BACKUP_DIR/$BACKUP_FILE" 2>&1 | grep -v "NOTICE"; then

    log_info "Backup created successfully"
else
    log_error "Backup failed!"
    exit 1
fi

unset PGPASSWORD

# Compress backup
log_info "Compressing backup..."
if gzip "$BACKUP_DIR/$BACKUP_FILE"; then
    log_info "Backup compressed: $COMPRESSED_FILE"
else
    log_error "Compression failed!"
    exit 1
fi

# Verify compressed file exists and has content
if [ -f "$BACKUP_DIR/$COMPRESSED_FILE" ] && [ -s "$BACKUP_DIR/$COMPRESSED_FILE" ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/$COMPRESSED_FILE" | cut -f1)
    log_info "Backup size: $BACKUP_SIZE"
else
    log_error "Compressed backup file is missing or empty!"
    exit 1
fi

# Rotate old backups (keep last N days)
log_info "Rotating old backups (keeping last $RETENTION_DAYS days)..."

DELETED_COUNT=0
while IFS= read -r -d '' file; do
    log_info "Deleting old backup: $(basename "$file")"
    rm "$file"
    ((DELETED_COUNT++))
done < <(find "$BACKUP_DIR" -name "seology_backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -print0)

if [ $DELETED_COUNT -gt 0 ]; then
    log_info "Deleted $DELETED_COUNT old backup(s)"
else
    log_info "No old backups to delete"
fi

# List current backups
BACKUP_COUNT=$(find "$BACKUP_DIR" -name "seology_backup_*.sql.gz" -type f | wc -l)
log_info "Total backups: $BACKUP_COUNT"

# Success summary
echo ""
log_info "✅ Backup completed successfully!"
log_info "Backup location: $BACKUP_DIR/$COMPRESSED_FILE"
log_info "Backup size: $BACKUP_SIZE"
echo ""

# Optional: Upload to cloud storage (uncomment and configure as needed)
# upload_to_s3() {
#     if command -v aws &> /dev/null; then
#         S3_BUCKET="your-backup-bucket"
#         S3_PATH="seology-backups/database/"
#
#         log_info "Uploading to S3: s3://$S3_BUCKET/$S3_PATH"
#
#         if aws s3 cp "$BACKUP_DIR/$COMPRESSED_FILE" "s3://$S3_BUCKET/$S3_PATH$COMPRESSED_FILE"; then
#             log_info "Successfully uploaded to S3"
#         else
#             log_warn "Failed to upload to S3"
#         fi
#     fi
# }
# upload_to_s3

exit 0
