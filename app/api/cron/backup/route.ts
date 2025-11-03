/**
 * Automated Backup Cron Job
 * Creates daily backups of database and critical files
 */

import { NextRequest, NextResponse } from 'next/server'
import { createBackup, listBackups } from '@/lib/backup'

export const dynamic = 'force-dynamic'

/**
 * POST /api/cron/backup
 * Trigger automated backup
 */
export async function POST(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Invalid cron secret' },
        },
        { status: 401 }
      )
    }

    // Create backup
    console.log('🔄 Starting automated backup...')
    const backupPath = await createBackup()

    // Get backup info
    const backups = await listBackups()
    const latestBackup = backups[0]

    return NextResponse.json({
      success: true,
      backup: {
        path: backupPath,
        name: latestBackup?.name,
        size: latestBackup?.size,
        created: latestBackup?.created,
      },
      totalBackups: backups.length,
    })
  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BACKUP_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/cron/backup
 * List all backups
 */
export async function GET(req: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = req.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Invalid cron secret' },
        },
        { status: 401 }
      )
    }

    const backups = await listBackups()

    return NextResponse.json({
      success: true,
      backups: backups.map((b) => ({
        name: b.name,
        size: b.size,
        sizeFormatted: formatBytes(b.size),
        created: b.created,
      })),
      total: backups.length,
    })
  } catch (error) {
    console.error('List backups error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'LIST_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}

/**
 * Format bytes to human-readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
