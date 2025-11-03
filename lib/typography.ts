/**
 * Typography System for SEOLOGY.AI
 *
 * Perfect typography scale following professional design principles
 * Based on modular scale with responsive variants
 */

export const typography = {
  // Display (Hero headings)
  display: {
    xl: 'text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none',
    lg: 'text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none',
    md: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight',
  },

  // Headings
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-snug',
  h5: 'text-lg md:text-xl lg:text-2xl font-semibold leading-normal',
  h6: 'text-base md:text-lg lg:text-xl font-semibold leading-normal',

  // Body Text
  body: {
    xl: 'text-xl leading-relaxed',
    lg: 'text-lg leading-relaxed',
    md: 'text-base leading-relaxed',
    sm: 'text-sm leading-normal',
    xs: 'text-xs leading-normal',
  },

  // Special Text Styles
  label: 'text-sm font-medium uppercase tracking-wide',
  caption: 'text-xs text-white/60',
  code: 'font-mono text-sm bg-white/10 px-1.5 py-0.5 rounded',
  stat: 'text-3xl md:text-4xl font-bold tabular-nums',

  // Font Weights
  weight: {
    light: 'font-light',      // 300
    normal: 'font-normal',    // 400
    medium: 'font-medium',    // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',        // 700
    extrabold: 'font-extrabold', // 800
    black: 'font-black',      // 900
  },

  // Line Heights
  leading: {
    none: 'leading-none',       // 1
    tight: 'leading-tight',     // 1.25
    snug: 'leading-snug',       // 1.375
    normal: 'leading-normal',   // 1.5
    relaxed: 'leading-relaxed', // 1.625
    loose: 'leading-loose',     // 2
  },

  // Letter Spacing
  tracking: {
    tighter: 'tracking-tighter', // -0.05em
    tight: 'tracking-tight',     // -0.025em
    normal: 'tracking-normal',   // 0
    wide: 'tracking-wide',       // 0.025em
    wider: 'tracking-wider',     // 0.05em
    widest: 'tracking-widest',   // 0.1em
  },

  // Color Hierarchy
  color: {
    primary: 'text-white',
    secondary: 'text-white/80',
    tertiary: 'text-white/60',
    muted: 'text-white/40',
    disabled: 'text-white/20',
  },

  // Text Alignment
  align: {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  },

  // Max Widths for Readability (optimal line length)
  width: {
    heading: 'max-w-4xl',   // ~768px for headings
    body: 'max-w-2xl',      // ~672px for body text (optimal 50-75ch)
    narrow: 'max-w-xl',     // ~576px for narrow content
    wide: 'max-w-6xl',      // ~1152px for wide layouts
  },
} as const

/**
 * Utility function to combine typography classes
 */
export function typo(...classes: (string | Record<string, string>)[]): string {
  return classes
    .filter(Boolean)
    .map(c => typeof c === 'string' ? c : Object.values(c).join(' '))
    .join(' ')
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
  heroBody: typo(typography.body.xl, typography.color.tertiary, typography.width.body),

  // Regular Body Pattern
  body: typo(typography.body.md, typography.color.secondary, typography.width.body),

  // Small Body Pattern (for descriptions, metadata)
  smallBody: typo(typography.body.sm, typography.color.tertiary),

  // Caption Pattern (for labels, hints)
  caption: typo(typography.caption, typography.color.muted, typography.tracking.wide),

  // Stats/Metrics Pattern
  stat: typo(typography.stat, typography.color.primary),

  // Label Pattern
  label: typo(typography.label, typography.color.secondary),
} as const

/**
 * Gradient Text Utilities
 * Premium gradient effects for headings and emphasis
 */
export const gradientText = {
  blue: 'bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent',
  purple: 'bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent',
  rainbow: 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent',
  white: 'bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent',
  shimmer: 'bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer',
  subtle: 'bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent',
  accent: 'bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 bg-clip-text text-transparent',
  gold: 'bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent',
} as const

/**
 * Text Effect Utilities
 * Additional text effects for premium feel
 */
export const textEffects = {
  glow: 'drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]',
  glowBlue: 'drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]',
  glowPurple: 'drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]',
  shadow: 'drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]',
  outline: '[text-shadow:_0_0_2px_rgb(0_0_0_/_100%)]',
} as const

/**
 * Helper function to get gradient class
 */
export function getGradientClass(variant: keyof typeof gradientText): string {
  return gradientText[variant]
}

/**
 * Helper function to combine heading with gradient
 */
export function getHeadingWithGradient(
  level: keyof typeof typography,
  gradient?: keyof typeof gradientText
): string {
  const base = typeof typography[level] === 'string' ? typography[level] : ''
  return gradient ? `${base} ${gradientText[gradient]}` : base
}
