/**
 * API Route: Budget Management
 * GET: Get current budget settings
 * POST: Create/update budget
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withShopifyAuth } from '@/lib/shopify-session-middleware'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Secure authentication
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId

    // Get active budget
    const budget = await db.usageBudget.findFirst({
      where: {
        userId,
        isActive: true,
        periodStart: { lte: new Date() },
        periodEnd: { gte: new Date() },
      },
    })

    return NextResponse.json({
      success: true,
      data: budget || null,
    })
  } catch (error) {
    console.error('Error fetching budget:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch budget' } },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    // Secure authentication
    const authResult = await withShopifyAuth(req)
    if (!authResult.success) {
      return authResult.response
    }

    const { context } = authResult
    const userId = context.userId

    const body = await req.json()
    const { monthlyLimit, dailyLimit, alerts } = body

    // Validate
    if (!monthlyLimit || monthlyLimit <= 0) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_LIMIT', message: 'Monthly limit must be greater than 0' } },
        { status: 400 }
      )
    }

    // Deactivate existing budgets
    await db.usageBudget.updateMany({
      where: {
        userId,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    })

    // Create new budget for current month
    const periodStart = new Date()
    periodStart.setDate(1)
    periodStart.setHours(0, 0, 0, 0)

    const periodEnd = new Date(periodStart)
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    const budget = await db.usageBudget.create({
      data: {
        userId,
        periodStart,
        periodEnd,
        monthlyLimitUSD: monthlyLimit,
        dailyLimitUSD: dailyLimit || null,
        alertAt50Percent: alerts?.at50 ?? true,
        alertAt75Percent: alerts?.at75 ?? true,
        alertAt90Percent: alerts?.at90 ?? true,
        alertAt100Percent: alerts?.at100 ?? true,
        isActive: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: budget,
    })
  } catch (error) {
    console.error('Error setting budget:', error)
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to set budget' } },
      { status: 500 }
    )
  }
}
