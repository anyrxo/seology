import { Metadata } from 'next'
import TeamPageClient from './TeamPageClient'

export const metadata: Metadata = {
  title: 'Our Team - SEOLOGY.AI',
  description: 'Meet the talented team behind SEOLOGY.AI - SEO experts, AI engineers, and product leaders dedicated to revolutionizing SEO automation.',
}

export default function TeamPage() {
  return <TeamPageClient />
}
