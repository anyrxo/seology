import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * Manual database initialization endpoint
 * Call this to add missing columns without waiting for deployment
 *
 * Usage: GET /api/admin/init-db?secret=YOUR_SECRET
 */
export async function GET(request: Request) {
  try {
    // Simple secret check
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')

    if (secret !== process.env.ADMIN_INIT_SECRET && secret !== 'init-db-now') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🔧 Running database initialization...')

    // Run the initialization SQL
    await db.$executeRawUnsafe(`
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

    console.log('✅ Database initialized successfully')

    return NextResponse.json({
      success: true,
      message: 'Database schema initialized successfully. All missing columns have been added.',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Database initialization failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        details: error
      },
      { status: 500 }
    )
  }
}

// Mark as dynamic
export const dynamic = 'force-dynamic'
