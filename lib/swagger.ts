/**
 * Swagger/OpenAPI Documentation Configuration
 */

export const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'SEOLOGY.AI API',
    version: '1.0.0',
    description: 'AI-Powered SEO Automation Platform API Documentation',
    contact: {
      name: 'SEOLOGY.AI Support',
      email: 'support@seology.ai',
      url: 'https://seology.ai',
    },
    license: {
      name: 'Proprietary',
      url: 'https://seology.ai/terms',
    },
  },
  servers: [
    {
      url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      ClerkAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Clerk session token',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            description: 'Error message',
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
          },
        },
      },
      Connection: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          teamId: { type: 'string', format: 'uuid', nullable: true },
          platform: {
            type: 'string',
            enum: ['SHOPIFY', 'WORDPRESS', 'WIX', 'CUSTOM'],
          },
          domain: { type: 'string' },
          displayName: { type: 'string', nullable: true },
          status: {
            type: 'string',
            enum: ['PENDING', 'CONNECTED', 'ERROR', 'DISCONNECTED'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Issue: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          connectionId: { type: 'string', format: 'uuid' },
          type: { type: 'string' },
          title: { type: 'string' },
          severity: {
            type: 'string',
            enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
          },
          pageUrl: { type: 'string' },
          details: { type: 'string' },
          recommendation: { type: 'string', nullable: true },
          status: {
            type: 'string',
            enum: ['OPEN', 'IN_PROGRESS', 'FIXED', 'FAILED', 'IGNORED', 'DETECTED', 'FIXING'],
          },
          detectedAt: { type: 'string', format: 'date-time' },
          fixedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      Fix: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          connectionId: { type: 'string', format: 'uuid' },
          issueId: { type: 'string', format: 'uuid', nullable: true },
          description: { type: 'string' },
          type: { type: 'string' },
          targetUrl: { type: 'string', nullable: true },
          changes: { type: 'string' },
          status: {
            type: 'string',
            enum: ['PENDING', 'APPLIED', 'ROLLED_BACK', 'FAILED'],
          },
          appliedAt: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      Team: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
          ownerId: { type: 'string', format: 'uuid' },
          plan: {
            type: 'string',
            enum: ['STARTER', 'GROWTH', 'SCALE'],
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      TeamMember: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          teamId: { type: 'string', format: 'uuid' },
          userId: { type: 'string', format: 'uuid' },
          role: {
            type: 'string',
            enum: ['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'],
          },
          joinedAt: { type: 'string', format: 'date-time' },
        },
      },
      Webhook: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          url: { type: 'string', format: 'uri' },
          events: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'fix.applied',
                'fix.failed',
                'issue.detected',
                'site.connected',
                'site.disconnected',
                'analysis.completed',
              ],
            },
          },
          enabled: { type: 'boolean' },
          failureCount: { type: 'integer' },
          lastTriggeredAt: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
  security: [
    {
      ClerkAuth: [],
    },
  ],
  tags: [
    {
      name: 'Sites',
      description: 'Website connection management',
    },
    {
      name: 'Issues',
      description: 'SEO issues detection and management',
    },
    {
      name: 'Fixes',
      description: 'SEO fixes execution and rollback',
    },
    {
      name: 'Teams',
      description: 'Team collaboration and management',
    },
    {
      name: 'Webhooks',
      description: 'Webhook subscriptions for events',
    },
    {
      name: 'Analytics',
      description: 'Usage analytics and metrics',
    },
    {
      name: 'Admin',
      description: 'Administrative operations',
    },
  ],
}
