/**
 * Blog Posts Data
 * SEOLOGY.AI blog content following aggressive direct-response style
 */

export interface BlogPost {
  slug: string
  title: string
  description: string
  author: string
  date: string
  category: string
  tags: string[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'seology-reviews-best-ai-seo-automation-2025',
    title: 'SEOLOGY Reviews: Why It\'s the Best AI SEO Automation Tool in 2025',
    description: 'Looking for real AI SEO automation reviews? SEOLOGY powers 2.3M+ monthly organic visitors—proving it\'s the only AI SEO tool that actually works.',
    author: 'Marcus Chen',
    date: 'January 15, 2025',
    category: 'Reviews',
    tags: ['#SEOLOGY', '#AISEOAutomation', '#SEOReviews', '#SEO2025'],
    featured: true,
  },
  {
    slug: 'ai-seo-tools-comparison-2025',
    title: 'AI SEO Tools Comparison: SEOLOGY vs Manual SEO (Real Results)',
    description: 'Most AI SEO tools are gimmicks. Here\'s why SEOLOGY is the only AI SEO automation platform with proven $18M in revenue generated.',
    author: 'Marcus Chen',
    date: 'January 12, 2025',
    category: 'Comparison',
    tags: ['#AISEOTools', '#SEOAutomation', '#SEOComparison'],
    featured: true,
  },
  {
    slug: 'shopify-seo-optimization-guide-2025',
    title: '21 Shopify SEO Optimization Tips That Actually Work in 2025',
    description: 'Stop wasting time on outdated Shopify SEO tactics. These 21 proven strategies generate real traffic and sales.',
    author: 'Sarah Park',
    date: 'January 10, 2025',
    category: 'Guides',
    tags: ['#ShopifySEO', '#EcommerceSEO', '#SEOTips'],
  },
]
