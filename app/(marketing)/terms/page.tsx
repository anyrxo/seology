import { Metadata } from 'next'
import TermsPageClient from './TermsPageClient'

export const metadata: Metadata = {
  title: 'Terms of Service - SEOLOGY.AI',
  description: 'Read SEOLOGY.AI Terms of Service. Understand our terms, conditions, and policies for using our AI-powered SEO automation platform.',
}

export default function TermsPage() {
  return <TermsPageClient />
}
