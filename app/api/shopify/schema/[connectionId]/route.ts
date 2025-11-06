/**
 * Schema.org Structured Data API Routes
 *
 * GET    /api/shopify/schema/[connectionId] - List all schemas for a connection
 * POST   /api/shopify/schema/[connectionId] - Create/generate new schema
 * PUT    /api/shopify/schema/[connectionId] - Update existing schema
 * DELETE /api/shopify/schema/[connectionId] - Delete schema
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import {
  generateProductSchema,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
  validateSchema,
} from '@/lib/schema-generator'
import { shopifyGraphQL } from '@/lib/shopify-client'
import { StructuredDataStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

interface RouteParams {
  params: Promise<{
    connectionId: string
  }>
}

/**
 * GET /api/shopify/schema/[connectionId]
 * List all structured data schemas for a connection
 */
export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { connectionId } = await context.params

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const statusParam = searchParams.get('status')
    const schemaType = searchParams.get('schemaType')
    const resourceType = searchParams.get('resourceType')

    // Build query with proper typing
    const where: {
      connectionId: string
      status?: StructuredDataStatus
      schemaType?: string
      resourceType?: string
    } = {
      connectionId,
    }

    if (statusParam && Object.values(StructuredDataStatus).includes(statusParam as StructuredDataStatus)) {
      where.status = statusParam as StructuredDataStatus
    }
    if (schemaType) where.schemaType = schemaType
    if (resourceType) where.resourceType = resourceType

    // Fetch schemas
    const schemas = await db.structuredData.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    })

    // Parse JSON fields
    const parsedSchemas = schemas.map((schema) => ({
      ...schema,
      schemaJson: JSON.parse(schema.schemaJson),
      validationErrors: schema.validationErrors ? JSON.parse(schema.validationErrors) : null,
      beforeState: JSON.parse(schema.beforeState),
      afterState: JSON.parse(schema.afterState),
    }))

    return NextResponse.json({
      success: true,
      data: {
        schemas: parsedSchemas,
        total: schemas.length,
      },
    })
  } catch (error) {
    console.error('[Schema API] Error fetching schemas:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch schemas',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/shopify/schema/[connectionId]
 * Generate and create new structured data schema
 */
export async function POST(request: NextRequest, context: RouteParams) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { connectionId } = await context.params
    const body = await request.json()

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    const {
      schemaType,
      resourceType,
      resourceId,
      pageUrl,
      autoGenerate = true,
      schemaData,
    } = body

    let schemaJson: unknown

    // Generate schema based on type
    if (autoGenerate && schemaType) {
      switch (schemaType) {
        case 'Product':
          if (!resourceId) {
            return NextResponse.json(
              {
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'resourceId is required for Product schema' },
              },
              { status: 400 }
            )
          }
          // Fetch product data from Shopify
          const productQuery = `
            query {
              product(id: "${resourceId}") {
                id
                title
                description
                vendor
                featuredImage {
                  url
                  altText
                }
                variants(first: 1) {
                  edges {
                    node {
                      price
                      compareAtPrice
                      availableForSale
                    }
                  }
                }
                seo {
                  title
                  description
                }
              }
            }
          `

          const productResponse = await shopifyGraphQL<{
            product: {
              id: string
              title: string
              description: string
              vendor?: string
              featuredImage?: { url: string; altText?: string }
              variants: {
                edges: Array<{
                  node: {
                    price: string
                    compareAtPrice?: string
                    availableForSale: boolean
                  }
                }>
              }
              seo: { title?: string; description?: string }
            }
          }>(userId, connection.domain, { query: productQuery })

          if (productResponse.errors || !productResponse.data) {
            return NextResponse.json(
              {
                success: false,
                error: { code: 'SHOPIFY_API_ERROR', message: 'Failed to fetch product from Shopify' },
              },
              { status: 500 }
            )
          }

          const product = productResponse.data.product
          const variant = product.variants.edges[0]?.node

          schemaJson = generateProductSchema({
            name: product.seo.title || product.title,
            description: product.seo.description || product.description,
            image: product.featuredImage?.url,
            brand: product.vendor,
            price: variant ? parseFloat(variant.price) : undefined,
            currency: 'USD',
            availability: variant?.availableForSale ? 'InStock' : 'OutOfStock',
            url: pageUrl,
          }) as unknown
          break

        case 'Organization':
          schemaJson = generateOrganizationSchema({
            name: connection.displayName || connection.domain,
            url: `https://${connection.domain}`,
            logo: schemaData?.logo,
            description: schemaData?.description,
            email: schemaData?.email,
            phone: schemaData?.phone,
            socialProfiles: schemaData?.socialProfiles,
          }) as unknown
          break

        case 'BreadcrumbList':
          if (!pageUrl) {
            return NextResponse.json(
              {
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'pageUrl is required for BreadcrumbList schema' },
              },
              { status: 400 }
            )
          }
          const breadcrumbs = schemaData?.breadcrumbs || []
          schemaJson = generateBreadcrumbSchema(breadcrumbs) as unknown
          break

        case 'WebSite':
          schemaJson = generateWebSiteSchema({
            name: connection.displayName || connection.domain,
            url: `https://${connection.domain}`,
            description: schemaData?.description,
            searchUrl: schemaData?.searchUrl,
          }) as unknown
          break

        default:
          return NextResponse.json(
            {
              success: false,
              error: { code: 'VALIDATION_ERROR', message: `Unsupported schema type: ${schemaType}` },
            },
            { status: 400 }
          )
      }
    } else if (schemaData) {
      schemaJson = schemaData
    } else {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Either autoGenerate must be true or schemaData must be provided',
          },
        },
        { status: 400 }
      )
    }

    // Validate the schema
    const validation = validateSchema(schemaJson as Record<string, unknown>, schemaType)

    // Create schema record
    const schema = await db.structuredData.create({
      data: {
        connectionId,
        resourceType: resourceType || 'page',
        resourceId,
        pageUrl: pageUrl || `https://${connection.domain}`,
        schemaType,
        schemaJson: JSON.stringify(schemaJson),
        isValid: validation.isValid,
        validationErrors:
          validation.errors.length > 0 ? JSON.stringify(validation.errors) : null,
        status: validation.isValid ? StructuredDataStatus.VALID : StructuredDataStatus.INVALID,
        beforeState: JSON.stringify({}),
        afterState: JSON.stringify(schemaJson),
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          schema: {
            ...schema,
            schemaJson,
            validationErrors: validation.errors,
            warnings: validation.warnings,
          },
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Schema API] Error creating schema:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create schema',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/shopify/schema/[connectionId]
 * Update existing schema
 */
export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { connectionId } = await context.params
    const body = await request.json()

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    const { schemaId, schemaJson, status } = body

    if (!schemaId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'schemaId is required' } },
        { status: 400 }
      )
    }

    // Verify schema ownership
    const existingSchema = await db.structuredData.findFirst({
      where: {
        id: schemaId,
        connectionId,
      },
    })

    if (!existingSchema) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Schema not found' } },
        { status: 404 }
      )
    }

    const updateData: {
      schemaJson?: string
      isValid?: boolean
      validationErrors?: string | null
      status?: StructuredDataStatus
      lastValidatedAt?: Date
    } = {}

    if (schemaJson) {
      // Validate updated schema
      const validation = validateSchema(schemaJson, existingSchema.schemaType)
      updateData.schemaJson = JSON.stringify(schemaJson)
      updateData.isValid = validation.isValid
      updateData.validationErrors =
        validation.errors.length > 0 ? JSON.stringify(validation.errors) : null
      updateData.lastValidatedAt = new Date()
    }

    if (status && Object.values(StructuredDataStatus).includes(status)) {
      updateData.status = status as StructuredDataStatus
    }

    // Update schema
    const updatedSchema = await db.structuredData.update({
      where: { id: schemaId },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: {
        schema: {
          ...updatedSchema,
          schemaJson: JSON.parse(updatedSchema.schemaJson),
          validationErrors: updatedSchema.validationErrors
            ? JSON.parse(updatedSchema.validationErrors)
            : null,
        },
      },
    })
  } catch (error) {
    console.error('[Schema API] Error updating schema:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update schema',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/shopify/schema/[connectionId]
 * Delete schema
 */
export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { connectionId } = await context.params
    const searchParams = request.nextUrl.searchParams
    const schemaId = searchParams.get('schemaId')

    if (!schemaId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'schemaId is required' } },
        { status: 400 }
      )
    }

    // Verify connection ownership
    const connection = await db.connection.findFirst({
      where: {
        id: connectionId,
        userId,
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Connection not found' } },
        { status: 404 }
      )
    }

    // Verify schema ownership and delete
    const schema = await db.structuredData.findFirst({
      where: {
        id: schemaId,
        connectionId,
      },
    })

    if (!schema) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Schema not found' } },
        { status: 404 }
      )
    }

    await db.structuredData.delete({
      where: { id: schemaId },
    })

    return NextResponse.json({
      success: true,
      data: { message: 'Schema deleted successfully' },
    })
  } catch (error) {
    console.error('[Schema API] Error deleting schema:', error)
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to delete schema',
          details: error instanceof Error ? error.message : undefined,
        },
      },
      { status: 500 }
    )
  }
}
