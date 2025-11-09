/**
 * API Route: Live Executions Stream (Server-Sent Events)
 * Real-time streaming of agent execution updates
 */

import { NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Secure authentication
  const authResult = await withShopifyAuth(req)
  if (!authResult.success) {
    return authResult.response
  }

  const { context } = authResult
  const connectionId = context.connection.id

  // Create SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()

      // Function to send data
      const sendUpdate = async () => {
        try {
          // Fetch live executions (running or pending)
          const executions = await db.agentExecution.findMany({
            where: {
              connectionId,
              status: {
                in: ['PENDING', 'RUNNING'],
              },
            },
            include: {
              agent: {
                select: {
                  id: true,
                  name: true,
                  specialty: true,
                  icon: true,
                  color: true,
                },
              },
            },
            orderBy: {
              startedAt: 'desc',
            },
            take: 20,
          })

          // Calculate progress for running executions
          const executionsWithProgress = executions.map((ex) => {
            let progress = 0
            let currentStep = ''

            if (ex.status === 'RUNNING' && ex.startedAt) {
              const elapsed = Date.now() - new Date(ex.startedAt).getTime()
              // Estimate progress based on average execution time
              // If we have the agent's average execution time, use it
              progress = Math.min(95, (elapsed / (ex.duration || 60000)) * 100)
              currentStep = 'Processing...'
            }

            return {
              ...ex,
              progress,
              currentStep,
            }
          })

          // Send SSE message
          const message = `data: ${JSON.stringify(executionsWithProgress)}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('Error fetching live executions:', error)
        }
      }

      // Send initial update
      await sendUpdate()

      // Set up interval for updates
      const intervalId = setInterval(sendUpdate, 2000) // Every 2 seconds

      // Cleanup on close
      req.signal.addEventListener('abort', () => {
        clearInterval(intervalId)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}
