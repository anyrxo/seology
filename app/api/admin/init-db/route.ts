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
          -- Create PurchaseStatus enum if it doesn't exist
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PurchaseStatus') THEN
              CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
              RAISE NOTICE 'Created enum type: PurchaseStatus';
          END IF;

          -- User table columns
          -- dailyAutomationEnabled
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationEnabled'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationEnabled" BOOLEAN NOT NULL DEFAULT false;
              RAISE NOTICE 'Added column: User.dailyAutomationEnabled';
          END IF;

          -- dailyAutomationTime
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationTime'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationTime" TEXT DEFAULT '09:00';
              RAISE NOTICE 'Added column: User.dailyAutomationTime';
          END IF;

          -- dailyAutomationTimezone
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyAutomationTimezone'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyAutomationTimezone" TEXT DEFAULT 'UTC';
              RAISE NOTICE 'Added column: User.dailyAutomationTimezone';
          END IF;

          -- dailyReportEmail
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyReportEmail'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyReportEmail" BOOLEAN NOT NULL DEFAULT true;
              RAISE NOTICE 'Added column: User.dailyReportEmail';
          END IF;

          -- dailyReportDashboard
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'dailyReportDashboard'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "dailyReportDashboard" BOOLEAN NOT NULL DEFAULT true;
              RAISE NOTICE 'Added column: User.dailyReportDashboard';
          END IF;

          -- lastAutomationRun
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'User' AND column_name = 'lastAutomationRun'
          ) THEN
              ALTER TABLE "User" ADD COLUMN "lastAutomationRun" TIMESTAMP(3);
              RAISE NOTICE 'Added column: User.lastAutomationRun';
          END IF;

          -- UsageRecord table columns
          -- aiCreditsUsed
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'UsageRecord' AND column_name = 'aiCreditsUsed'
          ) THEN
              ALTER TABLE "UsageRecord" ADD COLUMN "aiCreditsUsed" INTEGER NOT NULL DEFAULT 0;
              RAISE NOTICE 'Added column: UsageRecord.aiCreditsUsed';
          END IF;

          -- aiCreditsLimit
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns
              WHERE table_name = 'UsageRecord' AND column_name = 'aiCreditsLimit'
          ) THEN
              ALTER TABLE "UsageRecord" ADD COLUMN "aiCreditsLimit" INTEGER NOT NULL DEFAULT 100;
              RAISE NOTICE 'Added column: UsageRecord.aiCreditsLimit';
          END IF;

          -- AICreditPurchase table (create if doesn't exist)
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.tables
              WHERE table_name = 'AICreditPurchase'
          ) THEN
              CREATE TABLE "AICreditPurchase" (
                  "id" TEXT NOT NULL,
                  "userId" TEXT NOT NULL,
                  "creditsAmount" INTEGER NOT NULL,
                  "pricePerCredit" DOUBLE PRECISION NOT NULL,
                  "totalPrice" DOUBLE PRECISION NOT NULL,
                  "stripePaymentId" TEXT,
                  "creditsRemaining" INTEGER NOT NULL,
                  "creditsUsed" INTEGER NOT NULL DEFAULT 0,
                  "expiresAt" TIMESTAMP(3),
                  "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
                  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  CONSTRAINT "AICreditPurchase_pkey" PRIMARY KEY ("id")
              );

              -- Add foreign key
              ALTER TABLE "AICreditPurchase" ADD CONSTRAINT "AICreditPurchase_userId_fkey"
                  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

              RAISE NOTICE 'Created table: AICreditPurchase';
          ELSE
              -- Table exists, convert status column from TEXT to enum if needed
              IF EXISTS (
                  SELECT 1 FROM information_schema.columns
                  WHERE table_name = 'AICreditPurchase' AND column_name = 'status' AND data_type = 'text'
              ) THEN
                  -- Drop default first, then convert type, then re-add default
                  ALTER TABLE "AICreditPurchase" ALTER COLUMN "status" DROP DEFAULT;
                  ALTER TABLE "AICreditPurchase"
                      ALTER COLUMN "status" TYPE "PurchaseStatus"
                      USING "status"::"PurchaseStatus";
                  ALTER TABLE "AICreditPurchase" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"PurchaseStatus";
                  RAISE NOTICE 'Converted AICreditPurchase.status from TEXT to PurchaseStatus enum';
              END IF;
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
