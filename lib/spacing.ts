/**
 * Spacing System for SEOLOGY.AI
 *
 * Perfect 8px grid system for consistent visual rhythm
 * All spacing uses multiples of 8px (0.5rem increments)
 */

export const SPACING = {
  // Base unit: 8px
  // Use multiples of 8 for all spacing

  // Sections (vertical spacing for page sections)
  section: {
    xs: 'py-12',  // 96px
    sm: 'py-16',  // 128px
    md: 'py-24',  // 192px
    lg: 'py-32',  // 256px
    xl: 'py-40',  // 320px
  },

  // Containers
  container: {
    px: 'px-4 sm:px-6 lg:px-8',
    maxWidth: {
      sm: 'max-w-screen-sm',   // 640px
      md: 'max-w-screen-md',   // 768px
      lg: 'max-w-screen-lg',   // 1024px
      xl: 'max-w-screen-xl',   // 1280px
      '2xl': 'max-w-screen-2xl', // 1536px
      full: 'max-w-7xl',       // 1280px custom
    },
    mx: 'mx-auto',
  },

  // Gaps (between elements in flex/grid)
  gap: {
    xs: 'gap-2',   // 8px
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
  },

  // Stacks (vertical spacing between elements)
  stack: {
    xs: 'space-y-2',   // 8px
    sm: 'space-y-4',   // 16px
    md: 'space-y-6',   // 24px
    lg: 'space-y-8',   // 32px
    xl: 'space-y-12',  // 48px
  },

  // Cards/Components
  card: {
    padding: {
      sm: 'p-4',   // 16px
      md: 'p-6',   // 24px
      lg: 'p-8',   // 32px
      xl: 'p-12',  // 48px
    },
    gap: 'gap-6', // 24px between cards
  },

  // Header spacing
  header: {
    announcement: 48,  // px
    navbar: 64,        // px
    total: 112,        // px
  },

  // Grid system
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    },
    gap: 'gap-6',
  },

  // Z-index hierarchy
  zIndex: {
    modal: 'z-50',
    announcementBar: 'z-50',
    dropdown: 'z-40',
    navbar: 'z-40',
    mobileMenu: 'z-50',
    mobileOverlay: 'z-30',
    stickyHeader: 'z-30',
    content: 'z-10',
    background: 'z-0',
  },
} as const

/**
 * Legacy export for backwards compatibility
 * @deprecated Use SPACING instead
 */
export const spacing = SPACING

// Utility to combine spacing classes
export function combineSpacing(...classes: (string | Record<string, string>)[]): string {
  return classes
    .filter(Boolean)
    .map(c => typeof c === 'string' ? c : Object.values(c).join(' '))
    .join(' ')
}

// Standard section class
export const sectionClass = combineSpacing(
  spacing.section.lg,
  spacing.container.px
)

// Standard container class
export const containerClass = combineSpacing(
  spacing.container.maxWidth.full,
  spacing.container.px,
  spacing.container.mx
)
