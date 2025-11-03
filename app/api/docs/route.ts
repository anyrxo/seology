/**
 * API Documentation Endpoint
 * Generates OpenAPI/Swagger specification
 */

import { NextResponse } from 'next/server'
import { swaggerDefinition } from '@/lib/swagger'

export const dynamic = 'force-dynamic'

// OpenAPI paths documentation
const paths = {
  '/api/sites': {
    get: {
      tags: ['Sites'],
      summary: 'List user sites',
      description: 'Get all sites connected by the authenticated user',
      security: [{ ClerkAuth: [] }],
      responses: {
        '200': {
          description: 'List of sites',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  connections: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Connection' },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/sites/{id}/analyze': {
    post: {
      tags: ['Sites'],
      summary: 'Analyze site for SEO issues',
      description: 'Trigger AI analysis to detect SEO issues on the site',
      security: [{ ClerkAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Site connection ID',
        },
      ],
      responses: {
        '200': {
          description: 'Analysis started',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  jobId: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': { $ref: '#/components/responses/Unauthorized' },
        '404': { $ref: '#/components/responses/NotFound' },
      },
    },
  },
  '/api/fixes/execute': {
    post: {
      tags: ['Fixes'],
      summary: 'Execute SEO fixes',
      description: 'Execute fixes based on execution mode (AUTOMATIC, PLAN, or APPROVE)',
      security: [{ ClerkAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['siteId'],
              properties: {
                siteId: {
                  type: 'string',
                  format: 'uuid',
                  description: 'Site connection ID',
                },
                issueIds: {
                  type: 'array',
                  items: { type: 'string', format: 'uuid' },
                  description: 'Optional array of specific issue IDs to fix',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Fixes executed',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  message: { type: 'string' },
                  data: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/teams': {
    get: {
      tags: ['Teams'],
      summary: 'List user teams',
      description: 'Get all teams the authenticated user belongs to',
      security: [{ ClerkAuth: [] }],
      responses: {
        '200': {
          description: 'List of teams',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  teams: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Team' },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Teams'],
      summary: 'Create a team',
      description: 'Create a new team with the authenticated user as owner',
      security: [{ ClerkAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', minLength: 1 },
                description: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Team created',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  team: { $ref: '#/components/schemas/Team' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/teams/{id}/invite': {
    post: {
      tags: ['Teams'],
      summary: 'Invite user to team',
      description: 'Send email invitation to join the team',
      security: [{ ClerkAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
          description: 'Team ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email'],
              properties: {
                email: { type: 'string', format: 'email' },
                role: {
                  type: 'string',
                  enum: ['ADMIN', 'MEMBER', 'VIEWER'],
                  default: 'MEMBER',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Invitation sent',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  invitation: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/webhooks': {
    get: {
      tags: ['Webhooks'],
      summary: 'List webhooks',
      description: 'Get all webhooks for the authenticated user',
      security: [{ ClerkAuth: [] }],
      responses: {
        '200': {
          description: 'List of webhooks',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  webhooks: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Webhook' },
                  },
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Webhooks'],
      summary: 'Register webhook',
      description: 'Create a new webhook subscription',
      security: [{ ClerkAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['url', 'events'],
              properties: {
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
                secret: { type: 'string', description: 'Optional HMAC secret' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Webhook registered',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  webhook: { $ref: '#/components/schemas/Webhook' },
                },
              },
            },
          },
        },
      },
    },
  },
}

export async function GET() {
  const spec = {
    ...swaggerDefinition,
    paths,
  }

  return NextResponse.json(spec)
}
