/**
 * Advanced SEO Knowledge Base
 * Genius-level SEO intelligence beyond any other tool
 *
 * This system contains:
 * - Latest algorithm updates and signals
 * - Advanced E-E-A-T optimization
 * - Technical SEO best practices
 * - Content optimization frameworks
 * - Schema markup strategies
 * - Core Web Vitals optimization
 * - International SEO patterns
 * - Voice search optimization
 * - AI search optimization (SGE, Perplexity, etc.)
 */

export interface SEOSignal {
  name: string
  category: 'technical' | 'content' | 'eeat' | 'ux' | 'authority' | 'emerging'
  importance: 'critical' | 'high' | 'medium' | 'low'
  weight: number // 0-100
  description: string
  implementation: string[]
  validation: string[]
  googleUpdate?: string
  lastUpdated: Date
}

export interface AlgorithmUpdate {
  name: string
  date: Date
  impact: 'major' | 'minor' | 'core'
  affectedSites: string[]
  winners: string[]
  losers: string[]
  keyChanges: string[]
  recoveryStrategies: string[]
}

export interface ContentOptimizationStrategy {
  pattern: string
  useCase: string
  targetIntent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  structure: {
    wordCountRange: [number, number]
    headingHierarchy: string[]
    requiredSections: string[]
    optionalSections: string[]
    internalLinks: number
    externalLinks: number
    mediaElements: string[]
  }
  eeatSignals: string[]
  schemaTypes: string[]
  conversionElements: string[]
  rankingProbability: number // 0-100
}

/**
 * LATEST GOOGLE ALGORITHM SIGNALS (2024-2025)
 */
export const GOOGLE_RANKING_SIGNALS: SEOSignal[] = [
  // === CRITICAL SIGNALS (90-100 weight) ===
  {
    name: 'Helpful Content System',
    category: 'content',
    importance: 'critical',
    weight: 95,
    description: 'Content created for humans, not search engines. Demonstrates first-hand experience and expertise.',
    implementation: [
      'Add author bylines with credentials and experience',
      'Include real case studies and examples',
      'Show original research, data, or insights',
      'Demonstrate hands-on testing and experience',
      'Add "About the Author" sections with real expertise',
      'Include personal anecdotes and perspectives',
      'Avoid AI-generated content without expert review',
      'Focus on satisfying user intent completely',
    ],
    validation: [
      'Content passes "first-hand experience" test',
      'Author credentials are prominently displayed',
      'Includes unique insights not found elsewhere',
      'Engagement metrics are above industry average',
    ],
    googleUpdate: 'September 2023 Helpful Content Update',
    lastUpdated: new Date('2024-09-01'),
  },
  {
    name: 'E-E-A-T (Experience, Expertise, Authoritativeness, Trust)',
    category: 'eeat',
    importance: 'critical',
    weight: 98,
    description: 'Demonstrates real experience, proven expertise, authority in the field, and trustworthiness.',
    implementation: [
      'Create detailed author bio pages with credentials',
      'Show professional certifications and qualifications',
      'Display years of experience in the field',
      'Include customer reviews and testimonials',
      'Add trust signals (SSL, security badges, contact info)',
      'Show editorial process and fact-checking standards',
      'Link to authoritative sources and citations',
      'Display clear content update dates',
      'Add "About Us" with company history and mission',
      'Include team member profiles with LinkedIn links',
      'Show industry recognition and awards',
    ],
    validation: [
      'Author credentials are verifiable',
      'Content includes expert quotes or interviews',
      'Site has clear contact information',
      'Privacy policy and terms are accessible',
      'HTTPS is enabled site-wide',
      'NAP (Name, Address, Phone) is consistent',
    ],
    googleUpdate: 'December 2022 E-E-A-T Addition',
    lastUpdated: new Date('2024-12-01'),
  },
  {
    name: 'Core Web Vitals',
    category: 'ux',
    importance: 'critical',
    weight: 92,
    description: 'Page experience metrics: LCP, INP, CLS - measuring loading, interactivity, visual stability.',
    implementation: [
      'Optimize Largest Contentful Paint (LCP < 2.5s)',
      'Improve Interaction to Next Paint (INP < 200ms)',
      'Minimize Cumulative Layout Shift (CLS < 0.1)',
      'Lazy load images below the fold',
      'Use WebP or AVIF image formats',
      'Implement critical CSS inline',
      'Defer non-critical JavaScript',
      'Use CDN for static assets',
      'Optimize server response time (TTFB < 600ms)',
      'Preload critical resources',
      'Set explicit width/height on images and embeds',
    ],
    validation: [
      'PageSpeed Insights scores 90+ for all metrics',
      'Chrome UX Report shows good metrics',
      'Real user monitoring confirms performance',
      'Mobile performance matches desktop',
    ],
    googleUpdate: 'June 2021 Page Experience Update',
    lastUpdated: new Date('2024-10-01'),
  },
  {
    name: 'Mobile-First Indexing',
    category: 'technical',
    importance: 'critical',
    weight: 95,
    description: 'Google predominantly uses mobile version for indexing and ranking.',
    implementation: [
      'Ensure responsive design across all devices',
      'Mobile content matches desktop content',
      'Touch targets are at least 48x48px',
      'Font size is readable (16px+ for body)',
      'No horizontal scrolling required',
      'Fast mobile page load times',
      'Avoid mobile interstitials',
      'Use mobile-friendly navigation',
      'Test with Mobile-Friendly Test tool',
    ],
    validation: [
      'Mobile-Friendly Test passes',
      'Mobile Usability report shows no issues',
      'Mobile speed score is 90+',
      'Content parity between mobile and desktop',
    ],
    googleUpdate: 'March 2021 Mobile-First Indexing',
    lastUpdated: new Date('2024-03-01'),
  },

  // === HIGH PRIORITY SIGNALS (75-89 weight) ===
  {
    name: 'Semantic Search & Entity Understanding',
    category: 'content',
    importance: 'high',
    weight: 88,
    description: 'Understanding topics, entities, and relationships beyond keywords.',
    implementation: [
      'Use Topic Clusters architecture',
      'Create pillar pages for main topics',
      'Build comprehensive subtopic coverage',
      'Use natural language and synonyms',
      'Include related entities and concepts',
      'Add FAQ sections addressing variations',
      'Implement breadcrumb navigation',
      'Use descriptive anchor text for internal links',
      'Create content hubs around topics',
    ],
    validation: [
      'All main entities are covered comprehensively',
      'Topic cluster architecture is complete',
      'Internal linking follows topic relationships',
      'Content addresses user intent at all stages',
    ],
    googleUpdate: 'BERT & MUM Updates (2019-2023)',
    lastUpdated: new Date('2024-06-01'),
  },
  {
    name: 'Content Freshness & Currency',
    category: 'content',
    importance: 'high',
    weight: 82,
    description: 'Up-to-date content, especially for time-sensitive topics.',
    implementation: [
      'Update content regularly (quarterly for evergreen)',
      'Add "Last Updated" dates prominently',
      'Include current year in titles where relevant',
      'Remove outdated information',
      'Add recent statistics and data',
      'Update images and screenshots',
      'Refresh examples with current trends',
      'Monitor Google Trends for topic shifts',
    ],
    validation: [
      'All dates are current',
      'Statistics are from the last 12 months',
      'No broken links or outdated references',
      'Content reflects latest industry practices',
    ],
    googleUpdate: 'Freshness Algorithm (2011, updated continuously)',
    lastUpdated: new Date('2024-08-01'),
  },
  {
    name: 'User Engagement Signals',
    category: 'ux',
    importance: 'high',
    weight: 85,
    description: 'How users interact with content: time on page, bounce rate, click-through rate.',
    implementation: [
      'Create compelling titles and meta descriptions',
      'Use hook paragraphs in first 100 words',
      'Add table of contents for long content',
      'Use engaging visuals and media',
      'Implement related content recommendations',
      'Add interactive elements (calculators, quizzes)',
      'Optimize for featured snippets',
      'Use clear CTAs',
      'Improve readability (short paragraphs, bullet points)',
    ],
    validation: [
      'Average time on page > 2 minutes',
      'Bounce rate < 60%',
      'Pages per session > 2',
      'CTR from SERP > 3%',
    ],
    googleUpdate: 'RankBrain (2015) & ongoing',
    lastUpdated: new Date('2024-07-01'),
  },
  {
    name: 'Structured Data & Schema Markup',
    category: 'technical',
    importance: 'high',
    weight: 80,
    description: 'Machine-readable data helping search engines understand content.',
    implementation: [
      'Add Article schema to blog posts',
      'Implement Product schema for e-commerce',
      'Use Review/Rating schema for testimonials',
      'Add FAQ schema for Q&A content',
      'Implement HowTo schema for tutorials',
      'Use Organization schema site-wide',
      'Add Breadcrumb schema for navigation',
      'Include LocalBusiness schema for local businesses',
      'Implement Event schema for events',
      'Use Video schema for video content',
    ],
    validation: [
      'Rich Results Test shows no errors',
      'Schema markup is visible in SERP features',
      'All required properties are present',
      'Schema is consistent across pages',
    ],
    googleUpdate: 'Continuous schema updates',
    lastUpdated: new Date('2024-11-01'),
  },
  {
    name: 'Page Speed & Performance',
    category: 'technical',
    importance: 'high',
    weight: 87,
    description: 'Overall page load speed and performance optimization.',
    implementation: [
      'Minimize HTTP requests',
      'Enable GZIP compression',
      'Minify CSS, JavaScript, HTML',
      'Optimize images (compress, resize, format)',
      'Use browser caching',
      'Implement lazy loading',
      'Remove render-blocking resources',
      'Use a Content Delivery Network (CDN)',
      'Optimize database queries',
      'Reduce server response time',
    ],
    validation: [
      'PageSpeed Insights score > 90',
      'Total page size < 1MB',
      'Page load time < 3 seconds',
      'Time to Interactive < 3.8s',
    ],
    googleUpdate: 'Speed Update (2018)',
    lastUpdated: new Date('2024-05-01'),
  },

  // === EMERGING SIGNALS (70-80 weight) ===
  {
    name: 'AI Search Optimization (SGE Ready)',
    category: 'emerging',
    importance: 'high',
    weight: 78,
    description: 'Optimization for AI-powered search experiences like Google SGE, ChatGPT, Perplexity.',
    implementation: [
      'Structure content in clear, quotable chunks',
      'Use definitive statements that can be cited',
      'Add comprehensive FAQ sections',
      'Include statistics and data points',
      'Format key points in lists',
      'Create comparison tables',
      'Add step-by-step instructions',
      'Use clear headings that answer questions',
      'Include summary sections',
      'Provide source citations and references',
    ],
    validation: [
      'Content appears in AI search results',
      'Key facts are accurately extracted',
      'Content is cited with proper attribution',
      'Answers are comprehensive and complete',
    ],
    googleUpdate: 'SGE Rollout (2024)',
    lastUpdated: new Date('2024-12-01'),
  },
  {
    name: 'Passage Ranking',
    category: 'content',
    importance: 'high',
    weight: 75,
    description: 'Google can rank individual passages within a page independently.',
    implementation: [
      'Create self-contained sections',
      'Use descriptive subheadings',
      'Answer specific questions in passages',
      'Include context in each section',
      'Use jump links for long content',
      'Optimize each section for different queries',
      'Add relevant keywords to each passage',
    ],
    validation: [
      'Each section can stand alone',
      'Subheadings are descriptive and keyword-rich',
      'Sections answer specific user queries',
      'No orphaned paragraphs without context',
    ],
    googleUpdate: 'Passage Ranking (October 2020)',
    lastUpdated: new Date('2024-04-01'),
  },
  {
    name: 'Video Content & YouTube Integration',
    category: 'content',
    importance: 'high',
    weight: 76,
    description: 'Video content ranking in universal search and video carousels.',
    implementation: [
      'Create video content for key topics',
      'Optimize YouTube video titles and descriptions',
      'Use video timestamps and chapters',
      'Add video transcripts',
      'Implement VideoObject schema',
      'Embed videos on relevant pages',
      'Create video sitemaps',
      'Use custom thumbnails',
      'Optimize video file names',
    ],
    validation: [
      'Videos appear in video carousels',
      'Video schema is properly implemented',
      'Transcripts are available',
      'Videos have high engagement rates',
    ],
    googleUpdate: 'Video best practices (ongoing)',
    lastUpdated: new Date('2024-09-01'),
  },

  // === MEDIUM PRIORITY SIGNALS (60-74 weight) ===
  {
    name: 'Internal Linking Architecture',
    category: 'technical',
    importance: 'medium',
    weight: 72,
    description: 'Strategic internal linking to distribute link equity and improve crawlability.',
    implementation: [
      'Link from high-authority pages to important pages',
      'Use descriptive anchor text',
      'Create hub pages linking to related content',
      'Implement breadcrumb navigation',
      'Add contextual links within content',
      'Avoid excessive internal links (keep under 100/page)',
      'Fix broken internal links',
      'Use nofollow sparingly',
    ],
    validation: [
      'All important pages are 3 clicks from homepage',
      'No orphaned pages',
      'Link equity flows logically',
      'Anchor text is varied and descriptive',
    ],
    googleUpdate: 'Core algorithm principle',
    lastUpdated: new Date('2024-02-01'),
  },
  {
    name: 'Backlink Profile Quality',
    category: 'authority',
    importance: 'medium',
    weight: 70,
    description: 'Quality and relevance of inbound links from other websites.',
    implementation: [
      'Earn links from high-authority domains',
      'Get links from relevant industry sites',
      'Create linkable assets (research, tools, guides)',
      'Build relationships with influencers',
      'Disavow toxic links',
      'Focus on diversity of linking domains',
      'Earn links naturally through great content',
      'Monitor new and lost links',
    ],
    validation: [
      'Domain Authority is increasing',
      'Link diversity is high',
      'No toxic links in profile',
      'Links are from relevant sites',
    ],
    googleUpdate: 'Penguin Update (2012) & ongoing',
    lastUpdated: new Date('2024-06-01'),
  },
  {
    name: 'Local SEO Signals',
    category: 'authority',
    importance: 'medium',
    weight: 68,
    description: 'Optimization for local search results and Google Business Profile.',
    implementation: [
      'Optimize Google Business Profile completely',
      'Maintain NAP consistency across web',
      'Earn local citations',
      'Get local business reviews',
      'Use LocalBusiness schema',
      'Create location-specific pages',
      'Optimize for "near me" searches',
      'Build local backlinks',
    ],
    validation: [
      'Google Business Profile is verified',
      'NAP is consistent across 50+ citations',
      'Reviews are 4.5+ stars average',
      'Local pack rankings are top 3',
    ],
    googleUpdate: 'Pigeon Update (2014) & ongoing',
    lastUpdated: new Date('2024-05-01'),
  },
]

/**
 * CONTENT OPTIMIZATION STRATEGIES BY INTENT
 */
export const CONTENT_STRATEGIES: ContentOptimizationStrategy[] = [
  {
    pattern: 'Ultimate Guide',
    useCase: 'Comprehensive topic coverage for informational queries',
    targetIntent: 'informational',
    structure: {
      wordCountRange: [3000, 6000],
      headingHierarchy: ['H1', 'H2', 'H3', 'H4'],
      requiredSections: [
        'Table of Contents',
        'Introduction (What & Why)',
        'Core Content Sections',
        'Examples & Case Studies',
        'Step-by-Step Instructions',
        'Expert Tips & Best Practices',
        'Common Mistakes to Avoid',
        'FAQ Section',
        'Conclusion & Next Steps',
        'Author Bio',
      ],
      optionalSections: [
        'Video Tutorial',
        'Downloadable Checklist',
        'Related Resources',
        'Tool Recommendations',
      ],
      internalLinks: 15,
      externalLinks: 10,
      mediaElements: ['Images', 'Infographics', 'Videos', 'Screenshots'],
    },
    eeatSignals: [
      'Author credentials prominently displayed',
      'Original research or data',
      'Expert quotes and interviews',
      'Detailed case studies',
      'Up-to-date information',
      'Comprehensive coverage',
    ],
    schemaTypes: ['Article', 'HowTo', 'FAQ', 'Person (Author)'],
    conversionElements: [
      'Email opt-in for PDF version',
      'Related resource downloads',
      'Tool/product recommendations',
      'Newsletter subscription',
    ],
    rankingProbability: 85,
  },
  {
    pattern: 'Product Review',
    useCase: 'Detailed product analysis for commercial intent',
    targetIntent: 'commercial',
    structure: {
      wordCountRange: [2000, 3500],
      headingHierarchy: ['H1', 'H2', 'H3'],
      requiredSections: [
        'Product Overview',
        'Key Features & Specifications',
        'Pros & Cons',
        'Performance Testing Results',
        'Comparison with Alternatives',
        'Pricing & Value',
        'Who Should Buy This',
        'Where to Buy',
        'Final Verdict',
      ],
      optionalSections: [
        'Video Review',
        'Image Gallery',
        'User Testimonials',
        'Expert Recommendations',
      ],
      internalLinks: 8,
      externalLinks: 5,
      mediaElements: ['Product Photos', 'Comparison Tables', 'Video Review', 'Screenshots'],
    },
    eeatSignals: [
      'Hands-on testing evidence',
      'Original photos of product',
      'Detailed testing methodology',
      'Unbiased pros and cons',
      'Real usage period stated',
      'Author expertise in category',
    ],
    schemaTypes: ['Product', 'Review', 'AggregateRating', 'Author'],
    conversionElements: [
      'Buy Now buttons',
      'Price comparison widget',
      'Alternative product recommendations',
      'Affiliate disclosure',
    ],
    rankingProbability: 82,
  },
  {
    pattern: 'Local Service Page',
    useCase: 'Service offering for local searches',
    targetIntent: 'transactional',
    structure: {
      wordCountRange: [800, 1500],
      headingHierarchy: ['H1', 'H2', 'H3'],
      requiredSections: [
        'Service Overview',
        'Areas Served',
        'What is Included',
        'Pricing Information',
        'Why Choose Us',
        'Customer Reviews',
        'Contact Form',
        'Business Hours',
      ],
      optionalSections: [
        'Before/After Gallery',
        'Certifications',
        'FAQ',
        'Emergency Contact',
      ],
      internalLinks: 5,
      externalLinks: 2,
      mediaElements: ['Service Photos', 'Team Photos', 'Video Testimonials', 'Location Map'],
    },
    eeatSignals: [
      'Business credentials and licenses',
      'Years in business',
      'Customer testimonials',
      'Professional certifications',
      'Insurance and bonding info',
      'Local presence proof',
    ],
    schemaTypes: ['LocalBusiness', 'Service', 'AggregateRating', 'OpeningHours'],
    conversionElements: [
      'Click-to-call button',
      'Contact form',
      'Free quote request',
      'Online booking',
      'Live chat',
    ],
    rankingProbability: 78,
  },
  {
    pattern: 'Comparison Article',
    useCase: 'Product/service comparisons for decision-making',
    targetIntent: 'commercial',
    structure: {
      wordCountRange: [2500, 4000],
      headingHierarchy: ['H1', 'H2', 'H3'],
      requiredSections: [
        'Quick Summary',
        'Comparison Table',
        'Detailed Option 1 Review',
        'Detailed Option 2 Review',
        'Head-to-Head Comparison',
        'Which Should You Choose?',
        'Final Recommendation',
      ],
      optionalSections: [
        'Video Comparison',
        'User Polls',
        'Additional Alternatives',
      ],
      internalLinks: 10,
      externalLinks: 8,
      mediaElements: ['Comparison Tables', 'Side-by-side Images', 'Charts', 'Video'],
    },
    eeatSignals: [
      'Hands-on testing of both options',
      'Clear evaluation criteria',
      'Unbiased analysis',
      'Real-world use cases',
      'Expert recommendations',
    ],
    schemaTypes: ['Article', 'Review', 'Table'],
    conversionElements: [
      'Check Price buttons',
      'Read full review links',
      'Email recommendations',
    ],
    rankingProbability: 80,
  },
  {
    pattern: 'Listicle',
    useCase: 'Curated lists for quick information',
    targetIntent: 'informational',
    structure: {
      wordCountRange: [1500, 3000],
      headingHierarchy: ['H1', 'H2', 'H3'],
      requiredSections: [
        'Introduction',
        'Numbered List Items (7-25)',
        'Brief Conclusion',
      ],
      optionalSections: [
        'Methodology',
        'FAQ',
        'Related Lists',
      ],
      internalLinks: 12,
      externalLinks: 8,
      mediaElements: ['Featured Images', 'Item Photos', 'Infographic Summary'],
    },
    eeatSignals: [
      'Clear selection criteria',
      'Personal testing or research',
      'Up-to-date information',
      'Comprehensive coverage',
    ],
    schemaTypes: ['Article', 'ItemList'],
    conversionElements: [
      'Newsletter signup',
      'Download PDF version',
      'Share buttons',
    ],
    rankingProbability: 75,
  },
]

/**
 * SCHEMA MARKUP BEST PRACTICES
 */
export const SCHEMA_STRATEGIES = {
  // Most impactful schema types by use case
  ecommerce: [
    'Product',
    'AggregateRating',
    'Review',
    'Offer',
    'Brand',
    'Organization',
    'BreadcrumbList',
  ],
  blog: [
    'Article',
    'BlogPosting',
    'Person',
    'Organization',
    'BreadcrumbList',
    'FAQ',
    'HowTo',
  ],
  localBusiness: [
    'LocalBusiness',
    'Organization',
    'OpeningHoursSpecification',
    'AggregateRating',
    'Review',
    'PostalAddress',
  ],
  saas: [
    'SoftwareApplication',
    'Product',
    'AggregateRating',
    'Review',
    'Organization',
    'FAQ',
  ],
}

/**
 * ADVANCED SEO ANALYSIS FRAMEWORK
 */
export interface SEOAnalysisResult {
  overallScore: number // 0-100
  categoryScores: {
    technical: number
    content: number
    eeat: number
    ux: number
    authority: number
  }
  criticalIssues: SEOIssue[]
  opportunities: SEOOpportunity[]
  competitorGaps: CompetitorGap[]
  recommendations: SEORecommendation[]
  forecastedImpact: {
    trafficIncrease: string
    rankingImprovement: string
    timeToResults: string
  }
}

export interface SEOIssue {
  id: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string
  signal: string
  impact: string
  affectedPages: string[]
  fix: string
  priority: number
}

export interface SEOOpportunity {
  id: string
  type: string
  potentialImpact: 'high' | 'medium' | 'low'
  description: string
  implementation: string[]
  estimatedTrafficGain: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface CompetitorGap {
  competitor: string
  area: string
  theyHave: string
  youNeed: string
  priority: number
}

export interface SEORecommendation {
  id: string
  title: string
  category: string
  priority: number
  effort: 'low' | 'medium' | 'high'
  impact: 'low' | 'medium' | 'high'
  roi: number // 1-10
  steps: string[]
  resources: string[]
  timeline: string
}

/**
 * E-E-A-T SCORING SYSTEM
 */
export interface EEATScore {
  overall: number // 0-100
  experience: {
    score: number
    signals: string[]
    missing: string[]
  }
  expertise: {
    score: number
    signals: string[]
    missing: string[]
  }
  authoritativeness: {
    score: number
    signals: string[]
    missing: string[]
  }
  trust: {
    score: number
    signals: string[]
    missing: string[]
  }
  improvements: EEATImprovement[]
}

export interface EEATImprovement {
  area: 'experience' | 'expertise' | 'authoritativeness' | 'trust'
  action: string
  impact: number // 0-100
  difficulty: 'easy' | 'medium' | 'hard'
  examples: string[]
}

/**
 * CONTENT OPTIMIZATION SCORING
 */
export function analyzeContentQuality(content: string, keyword: string): {
  score: number
  readability: number
  keywordOptimization: number
  structure: number
  eeat: number
  improvements: string[]
} {
  // This would be implemented with NLP analysis
  // Placeholder for now
  return {
    score: 0,
    readability: 0,
    keywordOptimization: 0,
    structure: 0,
    eeat: 0,
    improvements: [],
  }
}

/**
 * COMPETITOR ANALYSIS FRAMEWORK
 */
export interface CompetitorAnalysis {
  competitor: string
  url: string
  domainAuthority: number
  contentGaps: string[]
  backlinks: number
  topKeywords: string[]
  contentStrategy: string
  strengths: string[]
  weaknesses: string[]
  opportunitiesToExploit: string[]
}
