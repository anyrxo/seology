import { Metadata } from 'next'
import StatusPageClient from './StatusPageClient'

export const metadata: Metadata = {
  title: 'System Status - SEOLOGY.AI',
  description: 'Check the current status of SEOLOGY.AI services. Monitor uptime, recent incidents, and subscribe to status updates.',
}

export default function StatusPage() {
  return <StatusPageClient />
}
