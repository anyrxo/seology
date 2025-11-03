import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkDatabase() {
  try {
    // Try to get a user
    const users = await prisma.user.findMany({ take: 1 })
    console.log('✅ Users found:', users.length)

    if (users.length > 0) {
      console.log('First user:', JSON.stringify(users[0], null, 2))
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ Error:', errorMessage)

    // Check if it's the role column error
    if (errorMessage.includes('role')) {
      console.log('\n🔧 The role column is missing from the database.')
      console.log('This happens when the schema was updated but db push didn\'t add the column.')
      console.log('\nRunning manual SQL to add the column...\n')

      try {
        // Add the role column with default value
        await prisma.$executeRawUnsafe(`
          ALTER TABLE "User"
          ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'USER';
        `)

        console.log('✅ Added role column successfully!')

        // Try again
        const users = await prisma.user.findMany({ take: 1 })
        console.log('✅ Users found after fix:', users.length)
        if (users.length > 0) {
          console.log('First user:', JSON.stringify(users[0], null, 2))
        }
      } catch (sqlError: unknown) {
        const sqlErrorMessage = sqlError instanceof Error ? sqlError.message : String(sqlError)
        console.error('❌ SQL Error:', sqlErrorMessage)
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase()
