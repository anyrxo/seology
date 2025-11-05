const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'User'
        AND column_name LIKE 'daily%'
      ORDER BY column_name;
    `)

    console.log('Columns found:', result)

    if (result.length === 0) {
      console.log('\n❌ NO daily columns found! Running init script...')

      // Run the init SQL
      await prisma.$executeRawUnsafe(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'dailyAutomationEnabled'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "dailyAutomationEnabled" BOOLEAN NOT NULL DEFAULT false;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'dailyAutomationTime'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "dailyAutomationTime" TEXT DEFAULT '09:00';
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'dailyAutomationTimezone'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "dailyAutomationTimezone" TEXT DEFAULT 'UTC';
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'dailyReportEmail'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "dailyReportEmail" BOOLEAN NOT NULL DEFAULT true;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'dailyReportDashboard'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "dailyReportDashboard" BOOLEAN NOT NULL DEFAULT true;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM information_schema.columns
                WHERE table_name = 'User' AND column_name = 'lastAutomationRun'
            ) THEN
                ALTER TABLE "User" ADD COLUMN "lastAutomationRun" TIMESTAMP(3);
            END IF;
        END $$;
      `)

      console.log('✅ Columns added!')
    } else {
      console.log('✅ Columns already exist')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
