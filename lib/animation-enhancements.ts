/**
 * Premium Animation Enhancements for SEOLOGY.AI
 * Advanced micro-interactions and smooth animations
 */

import { Variants } from 'framer-motion'

/**
 * ADVANCED SCROLL ANIMATIONS
 */

// Parallax scroll effect
export const parallaxScroll = (offset: number = 50) => ({
  y: [0, -offset],
  transition: {
    duration: 0,
    ease: 'linear',
  },
})

// Staggered reveal with custom timing
export const staggerReveal = (delayMultiplier: number = 0.1): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * delayMultiplier,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
})

// Advanced scroll reveal with multiple effects
export const advancedScrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/**
 * NUMBER COUNTER ANIMATIONS
 */

export interface CounterAnimationConfig {
  from?: number
  to: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

// Hook will be created separately
export const counterAnimation = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

/**
 * GRADIENT TEXT ANIMATIONS
 */

export const shimmerGradient: Variants = {
  initial: {
    backgroundPosition: '200% center',
  },
  animate: {
    backgroundPosition: '-200% center',
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const gradientWave: Variants = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * MAGNETIC CURSOR EFFECTS
 */

export const magneticConfig = {
  default: {
    damping: 15,
    stiffness: 150,
    mass: 0.1,
    strength: 0.3, // Enhanced from 0.2
  },
  strong: {
    damping: 10,
    stiffness: 200,
    mass: 0.1,
    strength: 0.5,
  },
  gentle: {
    damping: 20,
    stiffness: 100,
    mass: 0.15,
    strength: 0.15,
  },
}

/**
 * CARD & CONTAINER ANIMATIONS
 */

// Enhanced card hover with glow
export const cardHoverGlow: Variants = {
  rest: {
    scale: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 0 0 rgba(255, 255, 255, 0)',
  },
  hover: {
    scale: 1.03,
    y: -8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(255, 255, 255, 0.15)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Card with border reveal
export const borderRevealCard: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    borderColor: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      borderColor: {
        duration: 1,
        delay: 0.3,
      },
    },
  },
}

/**
 * BUTTON ANIMATIONS
 */

// Ripple effect animation
export const rippleEffect = {
  scale: [0, 4],
  opacity: [1, 0],
  transition: {
    duration: 0.6,
    ease: 'easeOut',
  },
}

// Button with loading spinner
export const buttonLoading: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Success checkmark animation
export const checkmarkReveal: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.1,
      },
    },
  },
}

/**
 * FORM INPUT ANIMATIONS
 */

// Floating label effect
export const floatingLabel: Variants = {
  inactive: {
    y: 0,
    scale: 1,
    color: 'rgba(255, 255, 255, 0.4)',
  },
  active: {
    y: -24,
    scale: 0.85,
    color: 'rgba(255, 255, 255, 0.9)',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Input focus glow
export const inputFocusGlow: Variants = {
  inactive: {
    boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  active: {
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 0.5)',
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Error shake animation
export const errorShake: Variants = {
  initial: { x: 0 },
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

/**
 * MODAL & DIALOG ANIMATIONS
 */

// Backdrop blur fade
export const backdropBlur: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
  },
}

// Modal scale with bounce
export const modalBounce: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

/**
 * NAVIGATION ANIMATIONS
 */

// Nav link underline expand
export const navLinkUnderline: Variants = {
  rest: {
    scaleX: 0,
    transformOrigin: 'center',
  },
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// Sidebar item slide
export const sidebarItemSlide: Variants = {
  inactive: {
    x: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  active: {
    x: 4,
    backgroundColor: 'rgba(37, 99, 235, 1)',
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hover: {
    x: 2,
    backgroundColor: 'rgba(31, 41, 55, 1)',
    transition: {
      duration: 0.2,
    },
  },
}

// Icon bounce on hover
export const iconBounce: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.2, 1],
    rotate: [0, -10, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
}

/**
 * LOADING STATES
 */

// Skeleton shimmer
export const skeletonShimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Spinner rotation
export const spinnerRotation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// Pulse animation
export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * DATA VISUALIZATION ANIMATIONS
 */

// Chart bar grow
export const chartBarGrow = (delay: number = 0): Variants => ({
  hidden: {
    scaleY: 0,
    transformOrigin: 'bottom',
  },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

// Progress fill
export const progressFill = (duration: number = 1): Variants => ({
  hidden: {
    scaleX: 0,
    transformOrigin: 'left',
  },
  visible: {
    scaleX: 1,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1],
    },
  },
})

/**
 * NOTIFICATION & TOAST ANIMATIONS
 */

// Slide in from right with bounce
export const toastSlideInBounce: Variants = {
  hidden: {
    x: 400,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  exit: {
    x: 400,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
}

// Badge pulse
export const badgePulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    boxShadow: [
      '0 0 0 0 rgba(239, 68, 68, 0.7)',
      '0 0 0 10px rgba(239, 68, 68, 0)',
      '0 0 0 0 rgba(239, 68, 68, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * CONFETTI & CELEBRATION ANIMATIONS
 */

// Confetti particle
export const confettiParticle = (index: number, total: number) => ({
  initial: {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
  },
  animate: {
    y: [0, -200 - Math.random() * 200, 600],
    x: [(index - total / 2) * 30, (index - total / 2) * 100],
    opacity: [1, 1, 0],
    rotate: [0, Math.random() * 720 - 360],
    scale: [1, 1.2, 0.5],
    transition: {
      duration: 2 + Math.random() * 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
})

// Success celebration
export const successCelebration: Variants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: {
    scale: [0, 1.2, 1],
    rotate: [- 180, 10, 0],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

/**
 * PAGE TRANSITIONS
 */

// Fade and slide page transition
export const pageTransitionSlide: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
}

// Scale page transition
export const pageTransitionScale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
}

/**
 * VIEWPORT CONFIGURATIONS
 */

export const viewportConfig = {
  default: {
    once: true,
    margin: '-100px',
    amount: 0.3 as const,
  },
  repeat: {
    once: false,
    margin: '0px',
    amount: 0.5 as const,
  },
  eager: {
    once: true,
    margin: '200px',
    amount: 0.1 as const,
  },
  lazy: {
    once: true,
    margin: '-200px',
    amount: 0.8 as const,
  },
}

/**
 * EASING PRESETS
 */

export const easingPresets = {
  smooth: [0.22, 1, 0.36, 1] as const,
  snappy: [0.4, 0, 0.2, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  linear: [0, 0, 1, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
}

/**
 * DURATION PRESETS (in milliseconds)
 */

export const durationPresets = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  medium: 0.4,
  slow: 0.6,
  verySlow: 1.0,
}
