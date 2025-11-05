import { ComingSoon } from '@/components/marketing/ComingSoon'

export const metadata = {
  title: 'Roadmap - SEOLOGY.AI',
  description: 'Our product roadmap and upcoming features',
}

export default function RoadmapPage() {
  return (
    <ComingSoon
      title="Roadmap Coming Soon"
      description="We're working on an exciting roadmap to share our vision and upcoming features. Check back soon to see what we're building next!"
    />
  )
}
