import { useCallback, MouseEvent } from 'react'

interface RippleConfig {
  duration?: number
  color?: string
}

/**
 * Hook for creating ripple effect on click
 */
export function useRipple({ duration = 600, color = 'rgba(255, 255, 255, 0.3)' }: RippleConfig = {}) {
  const createRipple = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple ${duration}ms ease-out;
      `

      // Ensure parent has position relative
      if (window.getComputedStyle(button).position === 'static') {
        button.style.position = 'relative'
      }
      button.style.overflow = 'hidden'

      button.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, duration)
    },
    [color, duration]
  )

  return createRipple
}
