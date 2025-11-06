/**
 * API Route: Budget Management
 * GET: Get current budget settings
 * POST: Create/update budget
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const shop = req.nextUrl.searchParams.get('shop')

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

    // Get active budget
    const budget = await db.usageBudget.findFirst({
      where: {
        userId: connection.userId,
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
    const shop = req.nextUrl.searchParams.get('shop')
    const body = await req.json()

    if (!shop) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_SHOP', message: 'Shop parameter required' } },
        { status: 400 }
      )
    }

    // Get connection
    const connection = await db.connection.findFirst({
      where: {
        domain: shop,
        platform: 'SHOPIFY',
        status: 'CONNECTED',
      },
    })

    if (!connection) {
      return NextResponse.json(
        { success: false, error: { code: 'NO_CONNECTION', message: 'Shop not connected' } },
        { status: 404 }
      )
    }

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
        userId: connection.userId,
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
        userId: connection.userId,
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
