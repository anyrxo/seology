@echo off
REM ============================================================================
REM Database Backup Script for SEOLOGY.AI (Windows)
REM
REM Features:
REM - PostgreSQL backup using pg_dump
REM - Automated backup rotation (keeps last 30 days)
REM - Compression to save storage space
REM - Error logging
REM
REM Usage:
REM   scripts\backup-db.bat
REM
REM Environment Variables Required:
REM   DATABASE_URL - PostgreSQL connection string
REM
REM Windows Task Scheduler Example (daily at 2 AM):
REM   schtasks /create /tn "SEOLOGY DB Backup" /tr "C:\path\to\scripts\backup-db.bat" /sc daily /st 02:00
REM ============================================================================

setlocal enabledelayedexpansion

REM Configuration
set BACKUP_DIR=backups\database
set RETENTION_DAYS=30

REM Generate timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set TIMESTAMP=%datetime:~0,8%_%datetime:~8,6%
set BACKUP_FILE=seology_backup_%TIMESTAMP%.sql
set COMPRESSED_FILE=%BACKUP_FILE%.gz

echo [INFO] %date% %time% - Starting database backup...

REM Check if DATABASE_URL is set
if "%DATABASE_URL%"=="" (
    echo [ERROR] %date% %time% - DATABASE_URL environment variable is not set
    echo [ERROR] Please set DATABASE_URL in your .env file or environment
    exit /b 1
)

REM Parse DATABASE_URL (simplified for Windows)
REM Note: For production, consider using a more robust parser or storing credentials separately

REM Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
    echo [INFO] %date% %time% - Created backup directory: %BACKUP_DIR%
)

REM Check if pg_dump is available
where pg_dump >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] %date% %time% - pg_dump command not found
    echo [ERROR] Please install PostgreSQL client tools
    echo [ERROR] Download from: https://www.postgresql.org/download/windows/
    exit /b 1
)

REM Note: Windows version uses DATABASE_URL directly with psql connection string
REM For more control, parse the URL and use individual connection parameters

echo [INFO] %date% %time% - Creating backup: %BACKUP_FILE%

REM Perform backup (requires pg_dump to be in PATH)
pg_dump "%DATABASE_URL%" --format=plain --no-owner --no-acl --file="%BACKUP_DIR%\%BACKUP_FILE%"

if %errorlevel% equ 0 (
    echo [INFO] %date% %time% - Backup created successfully
) else (
    echo [ERROR] %date% %time% - Backup failed!
    exit /b 1
)

REM Check if 7-Zip is available for compression
where 7z >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] %date% %time% - Compressing backup with 7-Zip...
    7z a -tgzip "%BACKUP_DIR%\%COMPRESSED_FILE%" "%BACKUP_DIR%\%BACKUP_FILE%" >nul
    if %errorlevel% equ 0 (
        echo [INFO] %date% %time% - Backup compressed: %COMPRESSED_FILE%
        del "%BACKUP_DIR%\%BACKUP_FILE%"
    ) else (
        echo [WARN] %date% %time% - Compression failed, keeping uncompressed backup
    )
) else (
    echo [WARN] %date% %time% - 7-Zip not found, skipping compression
    echo [WARN] Install 7-Zip from: https://www.7-zip.org/
)

REM Get backup file size
for %%I in ("%BACKUP_DIR%\%COMPRESSED_FILE%") do set BACKUP_SIZE=%%~zI
if "%BACKUP_SIZE%"=="" (
    for %%I in ("%BACKUP_DIR%\%BACKUP_FILE%") do set BACKUP_SIZE=%%~zI
)
set /a BACKUP_SIZE_MB=%BACKUP_SIZE% / 1048576
echo [INFO] %date% %time% - Backup size: %BACKUP_SIZE_MB% MB

REM Rotate old backups (keep last N days)
echo [INFO] %date% %time% - Rotating old backups (keeping last %RETENTION_DAYS% days)...

set DELETED_COUNT=0
forfiles /p "%BACKUP_DIR%" /m seology_backup_*.sql* /d -%RETENTION_DAYS% /c "cmd /c echo Deleting @file && del @path" 2>nul
if %errorlevel% equ 0 (
    echo [INFO] %date% %time% - Old backups deleted
) else (
    echo [INFO] %date% %time% - No old backups to delete
)

REM Count current backups
set BACKUP_COUNT=0
for %%f in ("%BACKUP_DIR%\seology_backup_*.*") do set /a BACKUP_COUNT+=1
echo [INFO] %date% %time% - Total backups: %BACKUP_COUNT%

REM Success summary
echo.
echo [INFO] %date% %time% - ✓ Backup completed successfully!
echo [INFO] Backup location: %BACKUP_DIR%\%COMPRESSED_FILE%
echo [INFO] Backup size: %BACKUP_SIZE_MB% MB
echo.

exit /b 0
