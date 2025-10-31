/**
 * Billing and Subscription Types
 */

export type PlanName = 'STARTER' | 'GROWTH' | 'SCALE'

export type SubscriptionStatus =
  | 'ACTIVE'
  | 'CANCELED'
  | 'PAST_DUE'
  | 'UNPAID'
  | 'TRIALING'
  | 'FREE'

export interface SubscriptionData {
  id: string
  status: SubscriptionStatus
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  paymentMethod: PaymentMethod | null
}

export interface PaymentMethod {
  type: 'card'
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

export interface PlanData {
  name: string
  price: number
  features: string[]
  limits: PlanLimits
}

export interface PlanLimits {
  sites: number
  fixesPerMonth: number
  aiAnalyses: number
  executionModes: ('AUTOMATIC' | 'PLAN' | 'APPROVE')[]
}

export interface UsageData {
  fixesApplied: number
  aiCallsMade: number
  sitesConnected: number
}

export interface InvoiceData {
  id: string
  amount: number
  currency: string
  status: string
  created: Date
  invoicePdf: string | null
  hostedInvoiceUrl: string | null
}

export interface BillingData {
  subscription: SubscriptionData | null
  plan: PlanData
  usage: UsageData
  invoices: InvoiceData[]
}

export interface CreateCheckoutRequest {
  priceId: string
  planName: PlanName
}

export interface CreateCheckoutResponse {
  sessionId: string
  url: string
}

export interface PortalResponse {
  url: string
}
