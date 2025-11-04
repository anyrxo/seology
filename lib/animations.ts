/**
 * Animation Utilities for Framer Motion
 * Provides consistent animation variants across the application
 */

import { Variants } from 'framer-motion'

/**
 * Fade in animations
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Fade in with slide from bottom
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Fade in with slide from top
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Fade in with slide from left
 */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Fade in with slide from right
 */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    x: 10,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Scale animations
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Scale with bounce
 */
export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      scale: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Stagger container for list animations
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

/**
 * Stagger item for list animations
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Modal/Dialog animations
 */
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, delay: 0.1 }
  }
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 }
  }
}

/**
 * Dropdown animations
 */
export const dropdownContainer: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transformOrigin: "top"
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: { duration: 0.1 }
  }
}

/**
 * Toast/Notification animations
 */
export const toastSlideIn: Variants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
}

/**
 * Card hover effects (for use with whileHover)
 * Based on Webflow Dashflow X template patterns
 */
export const cardHover = {
  y: -4,
  boxShadow: '0 8px 24px 0 rgba(20, 20, 43, 0.15)',
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

export const cardHoverScale = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

export const cardHoverLift = {
  y: -4,
  scale: 1.01,
  boxShadow: '0 8px 24px 0 rgba(20, 20, 43, 0.15)',
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

/**
 * Button animations (based on Webflow .btn-primary and .btn-secondary)
 */
export const buttonPrimaryHover = {
  scale: 1.02,
  boxShadow: '0 2px 16px 1px rgba(74, 58, 255, 0.3)',
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

export const buttonSecondaryHover = {
  scale: 1.02,
  boxShadow: '0 2px 6px 0 rgba(20, 20, 43, 0.1)',
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

/**
 * Button tap effect (for use with whileTap)
 */
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
}

/**
 * Icon animations (based on Webflow icon hover patterns)
 */
export const iconHover = {
  scale: 1.1,
  color: 'var(--accent--primary-1)',
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

export const iconScaleHover = {
  scale: 1.04,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

/**
 * Icon rotate animation
 */
export const rotateIcon: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 180,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
}

/**
 * Sidebar link animations (based on Webflow .sidebar-link patterns)
 */
export const sidebarLinkHover = {
  backgroundColor: 'var(--neutral--100)',
  borderColor: 'var(--neutral--300)',
  scale: 1.01,
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const
  }
}

export const sidebarLinkActive = {
  backgroundColor: 'var(--secondary--color-3)',
  color: 'var(--neutral--100)',
  scale: 1.06,
  transition: {
    duration: 0.3,
    ease: [0.68, -0.55, 0.265, 1.55] as const // Bounce effect
  }
}

/**
 * Progress bar animation
 */
export const progressBar: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * Skeleton loading animation
 */
export const skeletonPulse: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

/**
 * Page transition animations
 */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * Scroll reveal animation
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * Ripple effect keyframes (for CSS)
 */
export const rippleKeyframes = `
  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`

/**
 * Spring configs for more dynamic animations
 */
export const springConfigs = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 14 },
  wobbly: { type: "spring" as const, stiffness: 180, damping: 12 },
  stiff: { type: "spring" as const, stiffness: 400, damping: 30 },
  slow: { type: "spring" as const, stiffness: 80, damping: 20 }
}

/**
 * Easing functions
 */
export const easings = {
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const
}

/**
 * Premium Landing Page Animations
 */

// Magnetic button hover effect
export const magneticHover = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1] as const
  }
}

export const magneticTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
}

// Card tilt effect (3D)
export const cardTilt = {
  rest: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// Glow effect on hover
export const glowHover = {
  borderColor: 'rgba(255, 255, 255, 0.3)',
  boxShadow: '0 0 30px rgba(255, 255, 255, 0.15), 0 0 60px rgba(255, 255, 255, 0.1)',
  transition: {
    duration: 0.3
  }
}

// Infinite pulse animation
export const pulseInfinite = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Float animation
export const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut'
  }
}

// Text gradient reveal
export const textGradientReveal: Variants = {
  hidden: {
    opacity: 0,
    backgroundPosition: '200% center'
  },
  visible: {
    opacity: 1,
    backgroundPosition: '0% center',
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Counter animation for stats
export const counterReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
}

// Scroll indicator pulse
export const scrollIndicatorPulse = {
  y: [0, 10, 0],
  opacity: [1, 0.5, 1],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
}

// Hero entrance animation
export const heroEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// Stagger fast for hero elements
export const staggerHero: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

// Background grid animation
export const gridAnimation = {
  opacity: [0.05, 0.15, 0.05],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut' as const
  }
}

// Viewport configs
export const defaultViewport = {
  once: true,
  margin: '-100px',
  amount: 0.3 as const
}

export const repeatViewport = {
  once: false,
  margin: '0px',
  amount: 0.5 as const
}

/**
 * CSS Animation Class Names
 * Use these for className when Framer Motion is not available
 * Based on Webflow Dashflow X template patterns
 */
export const animationClasses = {
  // Base transitions
  transition: 'transition-all duration-300 ease-in-out',
  transitionFast: 'transition-all duration-150 ease-in-out',
  transitionSlow: 'transition-all duration-500 ease-in-out',
  transitionTransform: 'transition-transform duration-300 ease-in-out',
  transitionColors: 'transition-colors duration-300 ease-in-out',
  transitionOpacity: 'transition-opacity duration-300 ease-in-out',
  transitionShadow: 'transition-shadow duration-300 ease-in-out',

  // Button animations (Webflow .btn-primary/.btn-secondary patterns)
  buttonHover: 'transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
  buttonPrimaryHover: 'transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_2px_16px_1px_rgba(74,58,255,0.3)] active:scale-[0.98]',
  buttonSecondaryHover: 'transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_2px_6px_0_rgba(20,20,43,0.1)] active:scale-[0.98]',

  // Card animations (Webflow card hover patterns)
  cardHover: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_0_rgba(20,20,43,0.15)]',
  cardHoverScale: 'transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_8px_24px_0_rgba(20,20,43,0.15)]',
  cardHoverLift: 'transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_24px_0_rgba(20,20,43,0.15)]',
  cardClickable: 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_0_rgba(20,20,43,0.15)] active:-translate-y-0.5 active:scale-[0.99]',

  // Icon animations
  iconHover: 'transition-all duration-300 hover:scale-110 hover:text-blue-500',
  iconScale: 'transition-transform duration-300 hover:scale-[1.04]',
  iconRotate: 'transition-transform duration-300 hover:rotate-180',
  iconBounce: 'transition-all duration-300 hover:scale-110 hover:-translate-y-0.5',

  // Sidebar link animations (Webflow .sidebar-link patterns)
  sidebarLink: 'transition-all duration-300 hover:bg-white hover:border-gray-300 hover:scale-[1.01]',
  sidebarLinkActive: 'transition-all duration-300 bg-blue-50 scale-[1.06]',

  // Dropdown animations
  dropdownEnter: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150',
  dropdownExit: 'animate-out fade-out-0 zoom-out-95 slide-out-to-top-2 duration-100',

  // Modal animations
  modalBackdrop: 'animate-in fade-in-0 duration-300',
  modalContent: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300',
  modalExit: 'animate-out fade-out-0 zoom-out-95 duration-200',

  // Hover effects
  hoverLift: 'hover:-translate-y-1',
  hoverLiftSmall: 'hover:-translate-y-0.5',
  hoverScale: 'hover:scale-105',
  hoverScaleSmall: 'hover:scale-[1.02]',
  hoverScaleLarge: 'hover:scale-110',
  hoverBrightness: 'hover:brightness-110',
  hoverOpacity: 'hover:opacity-85',
  hoverShadow: 'hover:shadow-lg',
  hoverShadowXL: 'hover:shadow-xl',

  // Active states
  activeScale: 'active:scale-95',
  activeScaleSmall: 'active:scale-[0.98]',
  activeBrightness: 'active:brightness-90',

  // Focus states
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
  focusRingInset: 'focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',

  // Combined common patterns
  interactive: 'transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500',
  link: 'transition-colors duration-300 hover:text-blue-500 hover:underline',
  linkSubtle: 'transition-colors duration-300 hover:text-blue-500',

  // Loading/skeleton animations
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  ping: 'animate-ping',

  // Stagger animations (use with group)
  staggerChild: 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300',
}

/**
 * Utility to combine multiple animation classes
 */
export function combineAnimations(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * FORM & INPUT MICRO-INTERACTIONS
 */

// Input shake on error
export const inputShake: Variants = {
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

// Success checkmark animation
export const successCheckmark: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 }
    }
  }
}

// Radio/checkbox selection
export const radioCheckAnimation: Variants = {
  unchecked: {
    scale: 0,
    opacity: 0
  },
  checked: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
}

// Form field focus animation
export const formFieldFocus: Variants = {
  blur: {
    scale: 1,
    borderColor: "rgb(55, 65, 81)" // gray-700
  },
  focus: {
    scale: 1.01,
    borderColor: "rgb(59, 130, 246)", // blue-500
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * DATA VISUALIZATION ANIMATIONS
 */

// Number count-up (to be used with custom hook)
export const numberReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
}

// Chart bar entrance (stagger from bottom)
export const chartBarEntrance: Variants = {
  hidden: {
    scaleY: 0,
    opacity: 0,
    originY: 1
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Donut chart segment draw
export const chartSegmentDraw: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1,
        ease: "easeInOut",
        delay: custom * 0.1
      },
      opacity: {
        duration: 0.2
      }
    }
  })
}

// Progress bar fill animation (dynamic width)
export const progressFill: Variants = {
  hidden: {
    width: "0%",
    opacity: 0
  },
  visible: (width: number) => ({
    width: `${width}%`,
    opacity: 1,
    transition: {
      width: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1]
      },
      opacity: {
        duration: 0.2
      }
    }
  })
}

/**
 * NOTIFICATION & ALERT ANIMATIONS
 */

// Alert shake (for warnings/errors)
export const alertShake: Variants = {
  initial: { x: 0 },
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

// Notification badge pulse
export const badgePulse: Variants = {
  initial: {
    scale: 1,
    opacity: 1
  },
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Toast enter from different positions
export const toastSlideInBottom: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
}

export const toastSlideInTop: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
}

/**
 * NAVIGATION & MENU ANIMATIONS
 */

// Mobile sidebar slide
export const mobileSidebarSlide: Variants = {
  closed: {
    x: "-100%",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  open: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Tab switching animation
export const tabSwitch: Variants = {
  initial: {
    opacity: 0,
    y: 10
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Breadcrumb item fade in
export const breadcrumbItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  })
}

// Accordion expand/collapse
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      },
      opacity: {
        duration: 0.2
      }
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  }
}

/**
 * LOADING & SKELETON ANIMATIONS
 */

// Skeleton shimmer (wave effect)
export const skeletonShimmer: Variants = {
  initial: {
    backgroundPosition: "-200% 0"
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Spinner rotation
export const spinnerRotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

// Dots loading animation
export const dotsLoading: Variants = {
  animate: (index: number) => ({
    y: [0, -10, 0],
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: index * 0.1,
      ease: "easeInOut"
    }
  })
}

/**
 * CELEBRATION & SUCCESS ANIMATIONS
 */

// Confetti particle
export const confettiParticle: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 0
  },
  visible: (custom: { angle: number; distance: number; duration: number }) => ({
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1, 0.5],
    y: [0, -custom.distance, -custom.distance * 1.5, -custom.distance * 2],
    x: [0, Math.cos(custom.angle) * custom.distance * 0.5, Math.cos(custom.angle) * custom.distance, Math.cos(custom.angle) * custom.distance * 1.5],
    rotate: [0, 180, 360, 540],
    transition: {
      duration: custom.duration,
      ease: [0.4, 0, 0.2, 1]
    }
  })
}

// Success bounce
export const successBounce: Variants = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: [0, 1.2, 0.9, 1.05, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      times: [0, 0.4, 0.6, 0.8, 1],
      ease: "easeOut"
    }
  }
}

/**
 * SCROLL & PARALLAX ANIMATIONS
 */

// Parallax scroll (slower/faster than scroll)
export const parallaxScroll = (speed: number = 0.5) => ({
  initial: { y: 0 },
  scrolled: (scrollY: number) => ({
    y: scrollY * speed
  })
})

// Fade in on scroll (with viewport detection)
export const fadeInOnScroll: Variants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Scale in on scroll
export const scaleInOnScroll: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Slide in from left on scroll
export const slideInLeftOnScroll: Variants = {
  hidden: {
    opacity: 0,
    x: -100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Slide in from right on scroll
export const slideInRightOnScroll: Variants = {
  hidden: {
    opacity: 0,
    x: 100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * INTERACTIVE CARD ANIMATIONS
 */

// Card flip animation
export const cardFlip: Variants = {
  front: {
    rotateY: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  back: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Card expand (modal-like)
export const cardExpand: Variants = {
  collapsed: {
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  expanded: {
    scale: 1.05,
    zIndex: 10,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * SPECIALIZED MICRO-INTERACTIONS
 */

// Button loading state
export const buttonLoading: Variants = {
  initial: {
    width: "auto"
  },
  loading: {
    width: 40,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// Switch toggle
export const switchToggle: Variants = {
  off: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  on: {
    x: 20,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
}

// Tooltip arrow
export const tooltipArrow: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * PERFORMANCE-OPTIMIZED VARIANTS
 * These use transform properties only for best performance
 */

// GPU-accelerated fade
export const gpuFade: Variants = {
  hidden: {
    opacity: 0,
    transform: "translateZ(0)" // Force GPU acceleration
  },
  visible: {
    opacity: 1,
    transform: "translateZ(0)",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

// GPU-accelerated scale
export const gpuScale: Variants = {
  hidden: {
    opacity: 0,
    transform: "scale(0.95) translateZ(0)"
  },
  visible: {
    opacity: 1,
    transform: "scale(1) translateZ(0)",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

/**
 * VIEWPORT ANIMATION CONFIGS
 * Use these with framer-motion's viewport prop
 */
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3 as const
}

export const viewportConfigRepeating = {
  once: false,
  margin: "0px",
  amount: 0.5 as const
}

export const viewportConfigEager = {
  once: true,
  margin: "200px",
  amount: 0.1 as const
}
