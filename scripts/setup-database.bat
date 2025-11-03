@echo off
REM SEOLOGY.AI - Database Setup Script (Windows)
REM Run this script to initialize the database for the first time

setlocal enabledelayedexpansion

echo ============================================
echo SEOLOGY.AI - Database Setup (Windows)
echo ============================================
echo.

REM Check if .env file exists
if not exist .env (
    echo Warning: .env file not found
    echo Creating .env from .env.example...

    if exist .env.example (
        copy .env.example .env >nul
        echo [OK] Created .env file
        echo [WARNING] Please edit .env and add your DATABASE_URL
        pause
        exit /b 1
    ) else (
        echo [ERROR] .env.example not found
        pause
        exit /b 1
    )
)

REM Check if DATABASE_URL is set
findstr /R "^DATABASE_URL=.*postgresql://" .env >nul
if errorlevel 1 (
    echo [ERROR] DATABASE_URL not configured in .env
    echo Please set DATABASE_URL to your PostgreSQL connection string
    echo Example: DATABASE_URL="postgresql://user:password@localhost:5432/seology"
    pause
    exit /b 1
)

REM Check if ENCRYPTION_KEY is set
findstr /R "^ENCRYPTION_KEY=.................................." .env >nul
if errorlevel 1 (
    echo Warning: ENCRYPTION_KEY not set or too short
    echo.
    echo Please generate an encryption key manually:
    echo.
    echo Option 1 - Using OpenSSL (if installed):
    echo   openssl rand -hex 32
    echo.
    echo Option 2 - Using PowerShell:
    echo   -join ((48..57) + (65..90) + (97..122) ^| Get-Random -Count 64 ^| ForEach-Object {[char]$_})
    echo.
    echo Add the generated key to your .env file:
    echo   ENCRYPTION_KEY=your_generated_key_here
    echo.
    pause
    exit /b 1
)

echo.
echo Step 1: Checking Prisma installation...
where npx >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npx not found. Please install Node.js
    pause
    exit /b 1
)
echo [OK] Prisma CLI available

echo.
echo Step 2: Validating schema...
call npx prisma validate
if errorlevel 1 (
    echo [ERROR] Schema validation failed
    pause
    exit /b 1
)
echo [OK] Schema is valid

echo.
echo Step 3: Generating Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo [ERROR] Failed to generate Prisma Client
    pause
    exit /b 1
)
echo [OK] Prisma Client generated

echo.
echo Step 4: Checking database connection...
echo SELECT 1; | npx prisma db execute --stdin >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Cannot connect to database
    echo Please check your DATABASE_URL in .env
    pause
    exit /b 1
)
echo [OK] Database connection successful

echo.
echo Step 5: Choose deployment strategy:
echo   1) Development (db push - no migration history)
echo   2) Production (migrate deploy - with migration history)
set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    echo.
    echo Pushing schema to database (development mode)...
    call npx prisma db push
    if errorlevel 1 (
        echo [ERROR] Failed to push schema
        pause
        exit /b 1
    )
    echo [OK] Schema pushed to database
) else if "%choice%"=="2" (
    echo.
    echo Creating initial migration...
    call npx prisma migrate dev --name init
    if errorlevel 1 (
        echo [ERROR] Failed to create migration
        pause
        exit /b 1
    )
    echo [OK] Migration created and applied
) else (
    echo [ERROR] Invalid choice
    pause
    exit /b 1
)

echo.
echo Step 6: Verifying database setup...
echo Opening Prisma Studio to verify...
echo Press Ctrl+C to close Prisma Studio when done
echo.

REM Wait 2 seconds before opening studio
timeout /t 2 /nobreak >nul

call npx prisma studio

echo.
echo ============================================
echo [OK] Database setup complete!
echo ============================================
echo.
echo Next steps:
echo   1. Review your database in Prisma Studio
echo   2. Run 'npm run dev' to start the development server
echo   3. Test the connection by creating a user
echo.
echo Documentation: See DATABASE_SETUP.md for details
echo.
pause
