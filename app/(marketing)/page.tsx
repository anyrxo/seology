import { Metadata } from 'next'
import LandingPageContent from '@/components/marketing/LandingPageContent'

export const metadata: Metadata = {
  title: 'SEOLOGY.AI - Stop Reporting SEO Issues. Start Fixing Them Automatically',
  description: 'The world\'s first AI-powered platform that doesn\'t just find SEO problems—it logs into your CMS and fixes them. Automatically.',
}

export default function LandingPage() {
  return <LandingPageContent />
}
