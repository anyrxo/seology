/**
 * Database initialization script
 * Adds missing columns if they don't exist
 * Safe to run multiple times (idempotent)
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function initDatabase() {
  console.log('========================================')
  console.log('🔧 INITIALIZING DATABASE SCHEMA')
  console.log('========================================')
  console.log('Database URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
  console.log('Direct URL:', process.env.DIRECT_URL ? 'SET' : 'NOT SET')

  try {
    // Check if we need to add columns
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
          -- dailyAutomationEnabled
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationEnabled'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationEnabled" BOOLEAN NOT NULL DEFAULT false;
              RAISE NOTICE 'Added column: dailyAutomationEnabled';
          END IF;

          -- dailyAutomationTime
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationTime'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationTime" TEXT DEFAULT '09:00';
              RAISE NOTICE 'Added column: dailyAutomationTime';
          END IF;

          -- dailyAutomationTimezone
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationTimezone'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationTimezone" TEXT DEFAULT 'UTC';
              RAISE NOTICE 'Added column: dailyAutomationTimezone';
          END IF;

          -- dailyReportEmail
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyReportEmail'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyReportEmail" BOOLEAN NOT NULL DEFAULT true;
              RAISE NOTICE 'Added column: dailyReportEmail';
          END IF;

          -- dailyReportDashboard
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyReportDashboard'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyReportDashboard" BOOLEAN NOT NULL DEFAULT true;
              RAISE NOTICE 'Added column: dailyReportDashboard';
          END IF;

          -- lastAutomationRun
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'lastAutomationRun'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "lastAutomationRun" TIMESTAMP(3);
              RAISE NOTICE 'Added column: lastAutomationRun';
          END IF;
      END $$;
    `)

    console.log('========================================')
    console.log('✅ DATABASE SCHEMA INITIALIZED SUCCESSFULLY')
    console.log('========================================')
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

initDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
