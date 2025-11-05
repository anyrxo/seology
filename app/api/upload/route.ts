import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

/**
 * File Upload API - Vercel Serverless Compatible
 *
 * Converts files to base64 data URLs for immediate use in chat.
 * Works in serverless environments (no filesystem access needed).
 *
 * For production: Consider using S3, Cloudinary, or Vercel Blob storage
 * for persistent file storage beyond the current session.
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to upload files',
          },
        },
        { status: 401 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NO_FILE',
            message: 'No file provided',
          },
        },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_TOO_LARGE',
            message: `File size exceeds maximum of 10MB`,
          },
        },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FILE_TYPE',
            message: `File type ${file.type} is not supported`,
          },
        },
        { status: 400 }
      )
    }

    // Convert file to base64 data URL (works in serverless)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Return data URL for immediate use
    return NextResponse.json({
      success: true,
      data: {
        url: dataUrl, // base64 data URL instead of file path
        filename: file.name,
        size: file.size,
        type: file.type,
      },
    })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPLOAD_FAILED',
          message: 'Failed to upload file',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    )
  }
}
