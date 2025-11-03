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
 */
export const cardHover = {
  y: -4,
  transition: {
    duration: 0.2,
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

/**
 * Button tap effect (for use with whileTap)
 */
export const buttonTap = {
  scale: 0.97,
  transition: { duration: 0.1 }
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
