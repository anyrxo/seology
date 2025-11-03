/**
 * Consistent spacing system for SEOLOGY.AI marketing site
 * Based on 8px grid system (Tailwind's spacing scale)
 *
 * Use these constants throughout the app for consistency
 */

export const spacing = {
  // Vertical section spacing
  section: {
    sm: 'py-16',      // 64px - Small sections
    md: 'py-24',      // 96px - Medium sections
    lg: 'py-32',      // 128px - Large sections (DEFAULT)
    xl: 'py-48',      // 192px - Extra large hero sections
  },

  // Container spacing
  container: {
    padding: 'px-4 sm:px-6 lg:px-8',
    maxWidth: 'max-w-7xl mx-auto',
  },

  // Component margins
  component: {
    xs: 'mb-8',       // 32px
    sm: 'mb-12',      // 48px
    md: 'mb-16',      // 64px
    lg: 'mb-24',      // 96px
    xl: 'mb-32',      // 128px
  },

  // Text spacing
  text: {
    heading: 'mb-6',  // 24px
    subheading: 'mb-4', // 16px
    paragraph: 'mb-8', // 32px
  },

  // Fixed header heights
  header: {
    announcement: 'h-12',  // 48px
    navbar: 'h-16',        // 64px
    total: 'pt-[112px]',   // 48px + 64px = 112px total top padding
    totalHeight: 112,      // For calculations
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

// Utility to combine spacing classes
export function combineSpacing(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

// Standard section class
export const sectionClass = combineSpacing(
  spacing.section.lg,
  spacing.container.padding
)

// Standard container class
export const containerClass = combineSpacing(
  spacing.container.maxWidth,
  spacing.container.padding
)
