/**
 * Performance-Optimized Animation Hooks
 *
 * All hooks in this module are optimized for 60fps animations:
 * - Use GPU-accelerated properties (transform, opacity)
 * - Leverage Intersection Observer for scroll detection
 * - Include proper cleanup to prevent memory leaks
 * - Support reduced motion preferences
 *
 * @module hooks
 */

// Scroll Animation Hooks
export {
  useScrollAnimation,
  useStaggeredAnimation,
} from './useScrollAnimation'

export {
  useInView,
  useFullyInView,
  useEnterView,
} from './useInView'

// Interaction Hooks
export {
  useMagneticHover,
  useMagneticCard,
  useMagneticButton,
} from './useMagneticHover'

// Parallax Hooks
export {
  useParallax,
  useViewportParallax,
  useHorizontalParallax,
  useScaleParallax,
  useOpacityParallax,
} from './useParallax'

// Legacy Hooks (consider migrating to new hooks above)
export { useScrollReveal } from './useScrollReveal'
export { useRipple } from './useRipple'
export { useKeyboardShortcut } from './useKeyboardShortcut'
export { useToast } from './useToast'
