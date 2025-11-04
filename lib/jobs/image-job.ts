/**
 * Image SEO Background Jobs
 *
 * Handles long-running image scanning and optimization tasks
 * - SCAN_IMAGES: Crawl site and detect all images
 * - OPTIMIZE_IMAGES: Generate AI alt text and optimize images
 */

import { db } from '@/lib/db'
import { scanConnectionImages, storeScannedImages } from '@/lib/image-scanner'
import { processConnectionImagesWithAI } from '@/lib/image-ai'
import type { Job } from '@prisma/client'

interface ScanImagesJobPayload {
  connectionId: string
}

/**
 * Job: Scan site for images
 */
export async function executeScanImagesJob(job: Job): Promise<void> {
  const payload: ScanImagesJobPayload = JSON.parse(job.payload)
  const { connectionId } = payload
  const jobId = job.id

  try {
    // Update job status
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
        progress: 10
      }
    })

    // Get connection
    const connection = await db.connection.findUnique({
      where: { id: connectionId },
      include: {
        pages: {
          where: { httpStatus: 200 },
          select: { url: true }
        }
      }
    })

    if (!connection) {
      throw new Error(`Connection ${connectionId} not found`)
    }

    // Progress tracking
    const totalPages = connection.pages.length
    let processedPages = 0

    // Scan for images
    await db.job.update({
      where: { id: jobId },
      data: { progress: 20 }
    })

    const scanResult = await scanConnectionImages(connectionId)

    processedPages = totalPages
    await db.job.update({
      where: { id: jobId },
      data: { progress: 60 }
    })

    // Store images in database
    const stored = await storeScannedImages(connectionId, scanResult.images)

    await db.job.update({
      where: { id: jobId },
      data: { progress: 90 }
    })

    // Update connection with image counts
    await db.connection.update({
      where: { id: connectionId },
      data: {
        // Store metrics in connection for quick access
        updatedAt: new Date()
      }
    })

    // Mark job complete
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        progress: 100,
        completedAt: new Date(),
        result: JSON.stringify({
          totalImages: scanResult.totalImages,
          imagesWithAlt: scanResult.imagesWithAlt,
          imagesMissingAlt: scanResult.imagesMissingAlt,
          stored
        })
      }
    })
  } catch (error) {
    console.error(`Image scan job ${jobId} failed:`, error)

    // Mark job as failed
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
        failedAt: new Date()
      }
    })

    throw error
  }
}

interface OptimizeImagesJobPayload {
  connectionId: string
  batchId?: string
  onlyMissingAlt?: boolean
  maxImages?: number
}

/**
 * Job: Optimize images with AI
 */
export async function executeOptimizeImagesJob(job: Job): Promise<void> {
  const payload: OptimizeImagesJobPayload = JSON.parse(job.payload)
  const { connectionId, batchId, onlyMissingAlt = true, maxImages = 100 } = payload
  const jobId = job.id

  try {
    // Update job status
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'RUNNING',
        startedAt: new Date(),
        progress: 5
      }
    })

    // Create or get batch record
    let batch
    if (batchId) {
      batch = await db.imageOptimizationBatch.findUnique({
        where: { id: batchId }
      })
    } else {
      // Count images to process
      const imageCount = await db.imageAsset.count({
        where: {
          connectionId,
          ...(onlyMissingAlt ? { hasAltText: false, isDecorative: false } : {})
        }
      })

      batch = await db.imageOptimizationBatch.create({
        data: {
          connectionId,
          totalImages: Math.min(imageCount, maxImages),
          status: 'RUNNING',
          startedAt: new Date()
        }
      })
    }

    if (!batch) {
      throw new Error('Batch not found')
    }

    await db.job.update({
      where: { id: jobId },
      data: { progress: 10 }
    })

    // Process images with AI
    const result = await processConnectionImagesWithAI(connectionId, {
      onlyMissingAlt,
      maxImages
    })

    // Update progress as we go
    const progressPercent = Math.min(90, 10 + (result.processed / batch.totalImages) * 80)

    await db.job.update({
      where: { id: jobId },
      data: { progress: progressPercent }
    })

    // Update batch with results
    await db.imageOptimizationBatch.update({
      where: { id: batch.id },
      data: {
        processedImages: result.processed,
        optimizedImages: result.successful,
        failedImages: result.failed,
        progress: 100,
        status: 'COMPLETED',
        completedAt: new Date()
      }
    })

    // Calculate metrics
    const images = await db.imageAsset.findMany({
      where: {
        connectionId,
        status: 'OPTIMIZED'
      },
      select: {
        sizeBytes: true,
        optimizedSizeBytes: true
      }
    })

    const totalBytesSaved = images.reduce((sum, img) => {
      if (img.sizeBytes && img.optimizedSizeBytes) {
        return sum + (img.sizeBytes - img.optimizedSizeBytes)
      }
      return sum
    }, 0)

    const avgCompression = images.length > 0
      ? images.reduce((sum, img) => {
          if (img.sizeBytes && img.optimizedSizeBytes) {
            return sum + ((img.sizeBytes - img.optimizedSizeBytes) / img.sizeBytes) * 100
          }
          return sum
        }, 0) / images.length
      : 0

    await db.imageOptimizationBatch.update({
      where: { id: batch.id },
      data: {
        totalBytesSaved,
        avgCompressionRatio: avgCompression
      }
    })

    // Mark job complete
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        progress: 100,
        completedAt: new Date(),
        result: JSON.stringify({
          batchId: batch.id,
          processed: result.processed,
          successful: result.successful,
          failed: result.failed,
          totalBytesSaved,
          avgCompressionRatio: avgCompression
        })
      }
    })
  } catch (error) {
    console.error(`Image optimization job ${jobId} failed:`, error)

    // Update batch status
    if (batchId) {
      await db.imageOptimizationBatch.update({
        where: { id: batchId },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })
    }

    // Mark job as failed
    await db.job.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        error: error instanceof Error ? error.message : 'Unknown error',
        failedAt: new Date()
      }
    })

    throw error
  }
}

/**
 * Get image optimization progress for a connection
 */
export async function getImageOptimizationProgress(connectionId: string) {
  // Get latest batch
  const latestBatch = await db.imageOptimizationBatch.findFirst({
    where: { connectionId },
    orderBy: { createdAt: 'desc' }
  })

  if (!latestBatch) {
    return null
  }

  // Get associated job
  const job = await db.job.findFirst({
    where: {
      type: 'OPTIMIZE_IMAGES',
      connectionId,
      status: { in: ['PENDING', 'RUNNING'] }
    },
    orderBy: { createdAt: 'desc' }
  })

  return {
    batch: latestBatch,
    job,
    isRunning: latestBatch.status === 'RUNNING' || job?.status === 'RUNNING',
    progress: job?.progress || latestBatch.progress,
    estimatedCompletion: job?.estimatedCompletion || latestBatch.estimatedCompletion
  }
}

/**
 * Cancel an ongoing image optimization job
 */
export async function cancelImageOptimization(batchId: string) {
  // Update batch
  await db.imageOptimizationBatch.update({
    where: { id: batchId },
    data: {
      status: 'CANCELLED'
    }
  })

  // Cancel associated job
  // Find jobs by checking payload string
  const jobs = await db.job.findMany({
    where: {
      type: 'OPTIMIZE_IMAGES',
      status: { in: ['PENDING', 'RUNNING'] }
    }
  })

  // Filter jobs that match the batchId in payload
  const jobsToCancel = jobs.filter(job => {
    try {
      const payload = JSON.parse(job.payload)
      return payload.batchId === batchId
    } catch {
      return false
    }
  })

  // Cancel matching jobs
  for (const job of jobsToCancel) {
    await db.job.update({
      where: { id: job.id },
      data: { status: 'CANCELLED' }
    })
  }
}
