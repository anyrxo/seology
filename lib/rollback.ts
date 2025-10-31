import { db } from './db'
import { Fix, Connection, Prisma } from '@prisma/client'
import { ShopifyService } from './shopify'
import { decrypt } from './encryption'

export interface RollbackResult {
  success: boolean
  error?: string
  restoredState?: any
}

/**
 * Rollback a fix to its previous state
 */
export async function rollbackFix(fixId: string, userId: string): Promise<RollbackResult> {
  try {
    // Get fix with related data
    const fix = await db.fix.findUnique({
      where: { id: fixId },
      include: {
        issue: {
          include: {
            site: {
              include: { connection: true },
            },
          },
        },
      },
    })

    if (!fix) {
      return { success: false, error: 'Fix not found' }
    }

    // Verify issue and site exist
    if (!fix.issue) {
      return { success: false, error: 'Fix has no associated issue' }
    }

    if (!fix.issue.site) {
      return { success: false, error: 'Issue has no associated site' }
    }

    // Verify user owns this site
    if (fix.issue.site.userId !== userId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if fix can be rolled back
    if (fix.status !== 'APPLIED') {
      return { success: false, error: 'Only applied fixes can be rolled back' }
    }

    if (!fix.rollbackExpiresAt) {
      return { success: false, error: 'Fix does not support rollback' }
    }

    // Check if rollback has expired
    if (new Date() > fix.rollbackExpiresAt) {
      return { success: false, error: 'Rollback period has expired (90 days)' }
    }

    if (!fix.beforeState) {
      return { success: false, error: 'No previous state available for rollback' }
    }

    const site = fix.issue.site
    const connection = site.connection

    if (!connection) {
      return { success: false, error: 'Site connection not found' }
    }

    // Update fix status
    await db.fix.update({
      where: { id: fixId },
      data: { status: 'ROLLING_BACK' },
    })

    // Perform rollback based on platform
    let result: RollbackResult

    if (connection.platform === 'SHOPIFY') {
      result = await rollbackShopifyFix(connection, fix)
    } else if (connection.platform === 'WORDPRESS') {
      result = await rollbackWordPressFix(connection, fix)
    } else {
      result = { success: false, error: `Platform ${connection.platform} not supported for rollback` }
    }

    // Update fix status based on result
    if (result.success) {
      await db.fix.update({
        where: { id: fixId },
        data: {
          status: 'ROLLED_BACK',
          rolledBackAt: new Date(),
        },
      })

      // Update issue status back to DETECTED
      if (fix.issueId) {
        await db.issue.update({
          where: { id: fix.issueId },
          data: {
            status: 'DETECTED',
            fixedAt: null,
          },
        })
      }

      // Create audit log
      await db.auditLog.create({
        data: {
          siteId: site.id,
          userId: userId,
          action: 'FIX_ROLLED_BACK',
          resource: 'fix',
          resourceId: fixId,
          details: {
            fixId: fixId,
            issueId: fix.issueId,
            fixType: fix.type,
            restoredState: result.restoredState,
          },
        },
      })
    } else {
      await db.fix.update({
        where: { id: fixId },
        data: {
          status: 'ROLLBACK_FAILED',
          error: result.error,
        },
      })
    }

    return result
  } catch (error) {
    console.error('Error rolling back fix:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Rollback a Shopify fix
 */
async function rollbackShopifyFix(connection: Connection, fix: Fix): Promise<RollbackResult> {
  try {
    if (!connection.accessToken) {
      throw new Error('No access token found for connection')
    }
    const token = await decrypt(connection.accessToken)
    const shopifyService = new ShopifyService(connection.domain, token)

    const beforeState = fix.beforeState as any

    switch (fix.type) {
      case 'UPDATE_PRODUCT_SEO':
        // Restore product SEO to previous state
        const productResult = await shopifyService.updateProductSEO(
          beforeState.productId,
          {
            title: beforeState.title,
            metafieldsGlobalTitleTag: beforeState.seoTitle,
            metafieldsGlobalDescriptionTag: beforeState.metaDescription,
            handle: beforeState.handle,
          }
        )
        return { success: true, restoredState: beforeState }

      case 'CREATE_REDIRECT':
        // Delete the redirect we created
        const redirectId = beforeState.redirectId
        if (redirectId) {
          await fetch(`https://${connection.domain}/admin/api/2024-01/redirects/${redirectId}.json`, {
            method: 'DELETE',
            headers: {
              'X-Shopify-Access-Token': token,
            },
          })
        }
        return { success: true, restoredState: { redirectDeleted: true } }

      case 'UPDATE_PAGE_SEO':
        // Restore page SEO using direct API call
        const pageResponse = await fetch(
          `https://${connection.domain}/admin/api/2024-01/pages/${beforeState.pageId}.json`,
          {
            method: 'PUT',
            headers: {
              'X-Shopify-Access-Token': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              page: {
                id: beforeState.pageId,
                title: beforeState.title,
                metafields: beforeState.metafields,
              },
            }),
          }
        )
        if (!pageResponse.ok) {
          throw new Error(`Shopify API error: ${pageResponse.statusText}`)
        }
        return { success: true, restoredState: beforeState }

      default:
        return { success: false, error: `Rollback not implemented for fix type: ${fix.type}` }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Shopify rollback failed',
    }
  }
}

/**
 * Rollback a WordPress fix
 */
async function rollbackWordPressFix(connection: Connection, fix: Fix): Promise<RollbackResult> {
  try {
    const credentials = connection.credentials as any
    const basicAuth = credentials.auth

    const beforeState = fix.beforeState as any

    switch (fix.type) {
      case 'UPDATE_POST_SEO':
        // Restore post meta
        const response = await fetch(
          `${connection.domain}/wp-json/wp/v2/posts/${beforeState.postId}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: beforeState.title,
              meta: {
                _yoast_wpseo_title: beforeState.seoTitle,
                _yoast_wpseo_metadesc: beforeState.metaDescription,
              },
            }),
          }
        )

        if (!response.ok) {
          throw new Error(`WordPress API error: ${response.statusText}`)
        }

        return { success: true, restoredState: beforeState }

      case 'UPDATE_PAGE_SEO':
        // Restore page meta
        const pageResponse = await fetch(
          `${connection.domain}/wp-json/wp/v2/pages/${beforeState.pageId}`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: beforeState.title,
              meta: {
                _yoast_wpseo_title: beforeState.seoTitle,
                _yoast_wpseo_metadesc: beforeState.metaDescription,
              },
            }),
          }
        )

        if (!pageResponse.ok) {
          throw new Error(`WordPress API error: ${pageResponse.statusText}`)
        }

        return { success: true, restoredState: beforeState }

      default:
        return { success: false, error: `Rollback not implemented for fix type: ${fix.type}` }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'WordPress rollback failed',
    }
  }
}

/**
 * Get all fixes eligible for rollback for a site
 */
export async function getRollbackableFixes(siteId: string, userId: string) {
  const fixes = await db.fix.findMany({
    where: {
      issue: {
        siteId: siteId,
        site: {
          userId: userId,
        },
      },
      status: 'APPLIED',
      rollbackExpiresAt: {
        gt: new Date(), // Not expired
      },
    },
    include: {
      issue: {
        select: {
          type: true,
          details: true,
          pageUrl: true,
        },
      },
    },
    orderBy: {
      appliedAt: 'desc',
    },
  })

  return fixes.map(fix => ({
    id: fix.id,
    type: fix.type,
    targetUrl: fix.targetUrl,
    appliedAt: fix.appliedAt,
    rollbackExpiresAt: fix.rollbackExpiresAt,
    issue: fix.issue,
    daysUntilExpiry: Math.floor(
      (fix.rollbackExpiresAt!.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    ),
  }))
}

/**
 * Clean up expired rollback data (run as a scheduled job)
 */
export async function cleanupExpiredRollbacks() {
  const expiredFixes = await db.fix.findMany({
    where: {
      status: 'APPLIED',
      rollbackExpiresAt: {
        lt: new Date(),
      },
    },
  })

  // Clear beforeState to save database space
  for (const fix of expiredFixes) {
    await db.fix.update({
      where: { id: fix.id },
      data: {
        beforeState: Prisma.JsonNull,
        rollbackExpiresAt: null,
      },
    })
  }

  return {
    cleaned: expiredFixes.length,
    message: `Cleaned up ${expiredFixes.length} expired rollback records`,
  }
}
