-- Add daily automation fields to User table if they don't exist
DO $$
BEGIN
    -- dailyAutomationEnabled
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'dailyAutomationEnabled'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "dailyAutomationEnabled" BOOLEAN NOT NULL DEFAULT false;
    END IF;

    -- dailyAutomationTime
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'dailyAutomationTime'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "dailyAutomationTime" TEXT DEFAULT '09:00';
    END IF;

    -- dailyAutomationTimezone
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'dailyAutomationTimezone'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "dailyAutomationTimezone" TEXT DEFAULT 'UTC';
    END IF;

    -- dailyReportEmail
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'dailyReportEmail'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "dailyReportEmail" BOOLEAN NOT NULL DEFAULT true;
    END IF;

    -- dailyReportDashboard
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'dailyReportDashboard'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "dailyReportDashboard" BOOLEAN NOT NULL DEFAULT true;
    END IF;

    -- lastAutomationRun
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'lastAutomationRun'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "lastAutomationRun" TIMESTAMP(3);
    END IF;
END $$;
