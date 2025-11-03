/**
 * Typography System for SEOLOGY.AI
 *
 * Consistent typography classes for perfect visual hierarchy and readability
 */

export const typography = {
  // Headings
  h1: 'text-6xl md:text-7xl font-bold tracking-tight leading-none',
  h2: 'text-4xl md:text-5xl font-bold tracking-tight leading-tight',
  h3: 'text-2xl md:text-3xl font-semibold tracking-tight leading-snug',
  h4: 'text-xl md:text-2xl font-semibold leading-snug',
  h5: 'text-lg md:text-xl font-semibold leading-snug',
  h6: 'text-base md:text-lg font-semibold leading-normal',

  // Body Text
  'body-xl': 'text-lg md:text-xl leading-relaxed',
  'body-lg': 'text-base md:text-lg leading-relaxed',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm md:text-base leading-normal',
  caption: 'text-xs md:text-sm leading-normal',
  tiny: 'text-xs leading-normal',

  // Color Hierarchy
  color: {
    primary: 'text-white',
    secondary: 'text-white/80',
    tertiary: 'text-white/60',
    muted: 'text-white/40',
    disabled: 'text-white/20',
  },

  // Max Width for Readability
  width: {
    heading: 'max-w-4xl',
    'body-wide': 'max-w-3xl',
    body: 'max-w-2xl',
    narrow: 'max-w-xl',
  },

  // Letter Spacing
  tracking: {
    tight: 'tracking-tight', // -0.02em for headlines
    normal: 'tracking-normal', // 0 for subheadings and body
    wide: 'tracking-wide', // 0.02em for small text
  },

  // Line Height
  leading: {
    none: 'leading-none', // 1 for headlines
    tight: 'leading-tight', // 1.25 for subheadings
    snug: 'leading-snug', // 1.375 for larger body
    normal: 'leading-normal', // 1.5 for small text
    relaxed: 'leading-relaxed', // 1.625 for body text
    loose: 'leading-loose', // 2 for spacious text
  },
} as const

/**
 * Utility function to combine typography classes
 */
export function typo(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Common typography patterns
 */
export const typographyPatterns = {
  // Page Title Pattern
  pageTitle: typo(typography.h1, typography.color.primary, typography.width.heading),

  // Section Title Pattern
  sectionTitle: typo(typography.h2, typography.color.primary, typography.width.heading),

  // Subsection Title Pattern
  subsectionTitle: typo(typography.h3, typography.color.primary),

  // Card Title Pattern
  cardTitle: typo(typography.h4, typography.color.primary),

  // Large Body Pattern (for hero descriptions)
  heroBody: typo(typography['body-xl'], typography.color.tertiary, typography.width.body),

  // Regular Body Pattern
  body: typo(typography.body, typography.color.secondary, typography.width.body),

  // Small Body Pattern (for descriptions, metadata)
  smallBody: typo(typography['body-sm'], typography.color.tertiary),

  // Caption Pattern (for labels, hints)
  caption: typo(typography.caption, typography.color.muted, typography.tracking.wide),

  // Stats/Metrics Pattern
  stat: typo('text-3xl md:text-4xl font-bold tabular-nums', typography.color.primary),

  // Label Pattern
  label: typo(typography['body-sm'], typography.color.secondary, 'font-medium'),
} as const
