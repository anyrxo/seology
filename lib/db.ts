import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaWrite: PrismaClient | undefined
}

// ============================================================================
// READ-OPTIMIZED CLIENT (with Prisma Accelerate)
// ============================================================================
// Uses DATABASE_URL with Prisma Accelerate for:
// - Global edge caching
// - Connection pooling
// - Lower latency for read operations
// - Best for: SELECT queries, data fetching
//
// NOTE: Prisma Accelerate does NOT support middleware ($use)
// Access tokens are encrypted in DB and must be manually decrypted when needed
// Use decrypt() from ./encryption when working with connection.accessToken
// ============================================================================
export const db = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// ============================================================================
// WRITE-OPTIMIZED CLIENT
// ============================================================================
// In production: Uses DATABASE_URL (Prisma Accelerate) - required for Vercel
// In development: Uses DIRECT_URL for lower latency
//
// NOTE: Vercel serverless functions cannot make direct database connections
// All production database access MUST go through Prisma Accelerate
// ============================================================================
export const dbWrite = globalForPrisma.prismaWrite ?? new PrismaClient({
  datasourceUrl: process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : (process.env.DIRECT_URL || process.env.DATABASE_URL),
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// ============================================================================
// USAGE GUIDELINES
// ============================================================================
// Use `db` for read operations:
//   const users = await db.user.findMany()
//   const site = await db.connection.findUnique({ where: { id } })
//
// Use `dbWrite` for write operations:
//   await dbWrite.connection.create({ data: {...} })
//   await dbWrite.fix.update({ where: { id }, data: {...} })
//
// Use `db` for transactions (Accelerate supports transactions):
//   await db.$transaction([
//     db.issue.create({ data: {...} }),
//     db.connection.update({ where: { id }, data: {...} })
//   ])
// ============================================================================

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
  globalForPrisma.prismaWrite = dbWrite
}
