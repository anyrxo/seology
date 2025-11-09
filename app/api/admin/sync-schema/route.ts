import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

/**
 * POST /api/admin/sync-schema
 *
 * One-time endpoint to sync production database schema.
 * Creates missing tables and columns.
 *
 * Security: Protected by CRON_SECRET header
 */
export async function POST(request: NextRequest) {
  // Security check
  const authHeader = request.headers.get('authorization')
  const expectedAuth = `Bearer ${process.env.CRON_SECRET}`

  if (!authHeader || authHeader !== expectedAuth) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid or missing authorization header' },
      { status: 401 }
    )
  }

  console.log('🔄 Starting production schema sync...')

  try {
    // Get production database URL from environment
    const dbUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL

    if (!dbUrl) {
      throw new Error('No database URL found in environment')
    }

    console.log('✓ Database URL found')
    console.log(`  Host: ${new URL(dbUrl).host}`)

    // Run prisma db push with the production database URL
    // Use /tmp for npm cache as it's writable in Lambda
    // Specify schema file explicitly as it's in prisma/ folder
    const { stdout, stderr } = await execAsync(
      'npx --yes prisma db push --schema=./prisma/schema.prisma --accept-data-loss --skip-generate',
      {
        env: {
          ...process.env,
          DATABASE_URL: dbUrl,
          npm_config_cache: '/tmp/.npm',
          HOME: '/tmp'
        },
        timeout: 60000 // 60 second timeout
      }
    )

    console.log('✅ Schema sync complete!')
    console.log('stdout:', stdout)
    if (stderr) console.log('stderr:', stderr)

    return NextResponse.json({
      success: true,
      message: 'Production database schema synced successfully',
      details: {
        stdout: stdout || null,
        stderr: stderr || null,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: unknown) {
    console.error('❌ Schema sync failed')

    let errorMessage = 'Unknown error'
    let errorDetails = {}

    if (error instanceof Error) {
      errorMessage = error.message
      console.error('Error message:', errorMessage)
    }

    if (typeof error === 'object' && error !== null) {
      const execError = error as { stdout?: string; stderr?: string; code?: number }
      if (execError.stdout) {
        console.error('stdout:', execError.stdout)
        errorDetails = { ...errorDetails, stdout: execError.stdout }
      }
      if (execError.stderr) {
        console.error('stderr:', execError.stderr)
        errorDetails = { ...errorDetails, stderr: execError.stderr }
      }
      if (execError.code) {
        errorDetails = { ...errorDetails, exitCode: execError.code }
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Prevent caching
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
